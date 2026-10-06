import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PilotPlantHero } from './components/PilotPlantHero';
import { ReactorWhiteboard } from './components/ReactorWhiteboard';
import { TopicSelector } from './components/TopicSelector';
import { OutputView } from './components/OutputView';
import { GuideSettingsModal } from './components/GuideSettingsModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { REACTOR_TYPES_DATA } from './data/reactorsCurriculum';
import { parseMarkdownResources } from './utils/parser';
import { AlertCircle, CheckCircle2, Flame } from 'lucide-react';
const STORAGE_KEY_HISTORY = 'iq_academic_curator_history_reactors_v2';
const STORAGE_KEY_INSTITUTION = 'iq_academic_curator_institution_v2';
const STORAGE_KEY_BG = 'iq_academic_curator_bg_active_v2';
export default function App() {
    // Default to General Reactor Design Topic
    const defaultReactor = REACTOR_TYPES_DATA[0];
    const [selectedReactor, setSelectedReactor] = useState(defaultReactor);
    const [topic, setTopic] = useState(defaultReactor.topicTitle);
    const [academicLevel, setAcademicLevel] = useState('Pregrado Avanzado (Diseño y Operaciones)');
    const [resourcePreference, setResourcePreference] = useState('balanceado');
    const [language, setLanguage] = useState('es');
    const [customContext, setCustomContext] = useState('Taller de diseño de reactores en planta piloto (Batch, CSTR, PFR, PBR)');
    const [isLoading, setIsLoading] = useState(false);
    const [replacingIndex, setReplacingIndex] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    // Background toggle
    const [isBackgroundActive, setIsBackgroundActive] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY_BG);
            return saved !== null ? JSON.parse(saved) : true;
        }
        catch {
            return true;
        }
    });
    // Active guide resources
    const [currentGuide, setCurrentGuide] = useState({
        topic: defaultReactor.topicTitle,
        rawMarkdown: '',
        resources: defaultReactor.defaultResources || [],
        timestamp: new Date().toISOString(),
        academicLevel: 'Pregrado Avanzado (Diseño y Operaciones)',
    });
    // Institutional info
    const [institutionalInfo, setInstitutionalInfo] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY_INSTITUTION);
            if (saved)
                return JSON.parse(saved);
        }
        catch {
            // ignore
        }
        return {
            university: 'Universidad / Centro de Formación en Procesos Químicos',
            faculty: 'Departamento de Ingeniería Química - Planta Piloto Regional',
            course: 'Taller de Diseño de Reactores Químicos',
            code: 'IQ-REACT-301',
            instructor: 'Docente Experto en Cinética y Reactores',
            semester: '2026-I',
        };
    });
    // History state
    const [history, setHistory] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY_HISTORY);
            if (saved)
                return JSON.parse(saved);
        }
        catch {
            // ignore
        }
        return [];
    });
    // Modals state
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    // Save history to localStorage
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history));
        }
        catch {
            // ignore
        }
    }, [history]);
    // Save background preference
    const handleToggleBackground = () => {
        const nextVal = !isBackgroundActive;
        setIsBackgroundActive(nextVal);
        try {
            localStorage.setItem(STORAGE_KEY_BG, JSON.stringify(nextVal));
        }
        catch {
            // ignore
        }
    };
    // Save institutional info
    const handleSaveInstitution = (info) => {
        setInstitutionalInfo(info);
        try {
            localStorage.setItem(STORAGE_KEY_INSTITUTION, JSON.stringify(info));
        }
        catch {
            // ignore
        }
    };
    // Handle reactor selection from whiteboard or hero
    const handleSelectReactor = (reactor) => {
        setSelectedReactor(reactor);
        setTopic(reactor.topicTitle);
        const newGuide = {
            topic: reactor.topicTitle,
            rawMarkdown: '',
            resources: reactor.defaultResources,
            timestamp: new Date().toISOString(),
            academicLevel,
        };
        setCurrentGuide(newGuide);
        setErrorMessage(null);
    };
    // Quick select by short code
    const handleQuickSelectReactor = (code) => {
        const found = REACTOR_TYPES_DATA.find((r) => r.shortCode === code) || REACTOR_TYPES_DATA[0];
        handleSelectReactor(found);
    };
    // Generate live resources using backend Gemini + Google Search Grounding
    const handleGenerate = async () => {
        if (!topic.trim())
            return;
        setIsLoading(true);
        setErrorMessage(null);
        try {
            const res = await fetch('/api/generate-resources', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    topic: topic.trim(),
                    academicLevel,
                    resourcePreference,
                    language,
                    customContext,
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || 'Error al generar los recursos.');
            }
            // Parse output into structured resources
            const parsed = parseMarkdownResources(data.rawOutput, topic.trim());
            parsed.webSources = data.webSources;
            parsed.academicLevel = academicLevel;
            setCurrentGuide(parsed);
            // Save to history
            setHistory((prev) => [
                parsed,
                ...prev.filter((item) => item.topic.toLowerCase() !== parsed.topic.toLowerCase()).slice(0, 19),
            ]);
        }
        catch (err) {
            console.error(err);
            setErrorMessage(err.message || 'No fue posible conectar con el servicio de IA. Verifique la conexión o el servidor.');
        }
        finally {
            setIsLoading(false);
        }
    };
    // Replace single resource
    const handleFindAlternative = async (index) => {
        const currentRes = currentGuide.resources[index];
        setReplacingIndex(index);
        try {
            const res = await fetch('/api/alternative-resource', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    topic: currentGuide.topic,
                    resourceIndex: index,
                    currentTitle: currentRes?.title || '',
                    resourceType: currentRes?.type || 'artículo científico',
                }),
            });
            const data = await res.json();
            if (!res.ok)
                throw new Error(data.error || 'Error al buscar alternativa');
            // Parse single item
            const parsedAlternative = parseMarkdownResources(data.rawItem, currentGuide.topic);
            if (parsedAlternative.resources.length > 0) {
                const alt = parsedAlternative.resources[0];
                const updatedResources = [...currentGuide.resources];
                updatedResources[index] = {
                    ...alt,
                    id: `alt-${Date.now()}`,
                };
                setCurrentGuide({
                    ...currentGuide,
                    resources: updatedResources,
                });
            }
        }
        catch (e) {
            console.error(e);
            alert('No se pudo generar una alternativa: ' + e.message);
        }
        finally {
            setReplacingIndex(null);
        }
    };
    // Update resource locally
    const handleUpdateResource = (index, updated) => {
        const newRes = [...currentGuide.resources];
        newRes[index] = updated;
        setCurrentGuide({
            ...currentGuide,
            resources: newRes,
        });
    };
    // Delete item from history
    const handleDeleteHistoryItem = (index) => {
        setHistory((prev) => prev.filter((_, i) => i !== index));
    };
    return (_jsxs("div", { className: "min-h-screen relative flex flex-col font-sans selection:bg-orange-500 selection:text-white bg-slate-950 text-slate-100", children: [isBackgroundActive && (_jsxs("div", { className: "fixed inset-0 z-0 pointer-events-none overflow-hidden", children: [_jsx("img", { src: "/reactor_background.jpg", alt: "Planta Piloto de Reactores Qu\u00EDmicos", referrerPolicy: "no-referrer", className: "w-full h-full object-cover object-center filter saturate-150 brightness-40 blur-[1px] transform scale-105" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950/95" }), _jsx("div", { className: "absolute top-0 left-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl" }), _jsx("div", { className: "absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl" })] })), _jsx(Header, { onOpenHistory: () => setIsHistoryOpen(true), onOpenSettings: () => setIsSettingsOpen(true), savedCount: history.length, isBackgroundActive: isBackgroundActive, onToggleBackground: handleToggleBackground }), _jsxs("main", { className: "relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8", children: [_jsx(PilotPlantHero, { currentReactor: selectedReactor, isBackgroundActive: isBackgroundActive, onToggleBackground: handleToggleBackground, onQuickSelectReactor: handleQuickSelectReactor }), _jsx(ReactorWhiteboard, { selectedReactorId: selectedReactor.id, onSelectReactor: handleSelectReactor }), errorMessage && (_jsxs("div", { className: "bg-rose-950/90 border-2 border-rose-500 text-rose-100 p-4 rounded-2xl flex items-start gap-3 text-xs sm:text-sm shadow-xl animate-in fade-in", children: [_jsx(AlertCircle, { className: "w-5 h-5 text-rose-400 shrink-0 mt-0.5" }), _jsxs("div", { className: "flex-1", children: [_jsx("strong", { className: "font-bold block text-rose-200", children: "Aviso Pedag\u00F3gico:" }), errorMessage] }), _jsx("button", { onClick: () => setErrorMessage(null), className: "text-rose-300 hover:text-white font-black px-2 py-0.5 cursor-pointer", children: "Cerrar" })] })), _jsx(TopicSelector, { currentTopic: topic, onTopicChange: setTopic, onSelectReactor: handleSelectReactor, onGenerate: handleGenerate, isLoading: isLoading, academicLevel: academicLevel, setAcademicLevel: setAcademicLevel, resourcePreference: resourcePreference, setResourcePreference: setResourcePreference, language: language, setLanguage: setLanguage, customContext: customContext, setCustomContext: setCustomContext }), _jsx(OutputView, { data: currentGuide, onUpdateResource: handleUpdateResource, onFindAlternative: handleFindAlternative, replacingIndex: replacingIndex, institutionalInfo: institutionalInfo }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 pt-2", children: [_jsxs("div", { className: "bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-slate-900 border-2 border-amber-500/40 rounded-2xl p-5 text-xs space-y-2 shadow-lg backdrop-blur-md", children: [_jsxs("div", { className: "font-black text-amber-300 flex items-center gap-2 text-sm", children: [_jsx(CheckCircle2, { className: "w-4 h-4 text-amber-400 stroke-[3]" }), _jsx("span", { children: "Planta Piloto y Pr\u00E1ctica Experimental" })] }), _jsx("p", { className: "text-slate-300 leading-relaxed font-medium", children: "Alineado con pr\u00E1cticas de banco y planta piloto: operaci\u00F3n de tanques agitados CSTR, columnas tubulares PFR y lechos fijos catal\u00EDticos PBR con monitoreo de tiempo de residencia." })] }), _jsxs("div", { className: "bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-slate-900 border-2 border-cyan-500/40 rounded-2xl p-5 text-xs space-y-2 shadow-lg backdrop-blur-md", children: [_jsxs("div", { className: "font-black text-cyan-300 flex items-center gap-2 text-sm", children: [_jsx(CheckCircle2, { className: "w-4 h-4 text-cyan-400 stroke-[3]" }), _jsx("span", { children: "Fuentes Cient\u00EDficas Acreditadas (\u00DAltimos 12 meses)" })] }), _jsx("p", { className: "text-slate-300 leading-relaxed font-medium", children: "Publicaciones indexadas en AIChE Journal, Industrial & Engineering Chemistry Research, Chemical Engineering Science y videos t\u00E9cnicos de LearnChemE." })] }), _jsxs("div", { className: "bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-slate-900 border-2 border-emerald-500/40 rounded-2xl p-5 text-xs space-y-2 shadow-lg backdrop-blur-md", children: [_jsxs("div", { className: "font-black text-emerald-300 flex items-center gap-2 text-sm", children: [_jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-400 stroke-[3]" }), _jsx("span", { children: "Exportaci\u00F3n Multiformato en 1 Clic" })] }), _jsx("p", { className: "text-slate-300 leading-relaxed font-medium", children: "Copia directamente en Markdown oficial para Git/Notion, texto enriquecido con formato para Microsoft Word / Google Docs / Canvas LMS, o c\u00F3digo LaTeX." })] })] })] }), _jsx(GuideSettingsModal, { isOpen: isSettingsOpen, onClose: () => setIsSettingsOpen(false), info: institutionalInfo, onSave: handleSaveInstitution }), _jsx(HistoryDrawer, { isOpen: isHistoryOpen, onClose: () => setIsHistoryOpen(false), history: history, onSelect: (item) => {
                    setTopic(item.topic);
                    setCurrentGuide(item);
                }, onClear: () => setHistory([]), onDeleteItem: handleDeleteHistoryItem }), _jsx("footer", { className: "relative z-10 border-t border-orange-500/30 bg-slate-950/90 py-6 mt-12 text-center text-xs text-slate-400", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3", children: [_jsxs("div", { className: "flex items-center gap-2 font-bold text-slate-300", children: [_jsx(Flame, { className: "w-4 h-4 text-orange-500" }), _jsx("span", { children: "Taller de Dise\u00F1o de Reactores \u2022 Regional Planta Piloto de Procesos Qu\u00EDmicos" })] }), _jsx("div", { className: "text-slate-400", children: "Formato pedag\u00F3gico estricto: T\u00EDtulo \u2022 Descripci\u00F3n t\u00E9cnica \u2022 Enlace verificable" })] }) })] }));
}
