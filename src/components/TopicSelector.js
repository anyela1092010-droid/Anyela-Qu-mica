import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { REACTOR_TYPES_DATA } from '../data/reactorsCurriculum';
import { Sparkles, Flame, Check, SlidersHorizontal, Layers } from 'lucide-react';
export const TopicSelector = ({ currentTopic, onTopicChange, onSelectReactor, onGenerate, isLoading, academicLevel, setAcademicLevel, resourcePreference, setResourcePreference, language, setLanguage, customContext, setCustomContext, }) => {
    const [showAdvanced, setShowAdvanced] = useState(false);
    const subtopics = [
        {
            title: 'Diseño y Tipos de Reactores Químicos: Batch, CSTR, PFR y PBR',
            code: 'GENERAL',
            tag: 'Taller General',
            color: 'from-orange-500 to-amber-600',
        },
        {
            title: 'Diseño de Reactores Batch: Cinética No Estacionaria y Optimización del Tiempo de Ciclo',
            code: 'BATCH',
            tag: 'Discontinuo',
            color: 'from-amber-500 to-yellow-600',
        },
        {
            title: 'Diseño de Reactores CSTR: Balance Molar Algebraico, Trenes en Serie y Control Térmico',
            code: 'CSTR',
            tag: 'Tanque Agitado',
            color: 'from-emerald-500 to-teal-600',
        },
        {
            title: 'Diseño de Reactores PFR: Perfiles Axiales de Temperatura, Presión y Conversión',
            code: 'PFR',
            tag: 'Flujo Pistón',
            color: 'from-cyan-500 to-blue-600',
        },
        {
            title: 'Diseño de Reactores PBR: Catálisis Heterogénea, Ecuación de Ergun y Desactivación',
            code: 'PBR',
            tag: 'Lecho Empacado',
            color: 'from-purple-500 to-indigo-600',
        },
        {
            title: 'Reactores Catalíticos de Lecho Fluidizado e Hidrodinámica Gas-Sólido de Kunii-Levenspiel',
            code: 'FLUID',
            tag: 'Lecho Fluidizado',
            color: 'from-rose-500 to-pink-600',
        },
        {
            title: 'Transición de Síntesis Batch a Flujo Continuo (Flow Chemistry y Microrreactores)',
            code: 'FLOW',
            tag: 'Flow Chemistry',
            color: 'from-fuchsia-500 to-purple-600',
        },
        {
            title: 'Seguridad en Reactores Exotérmicos: Descontrol Térmico (Thermal Runaway) y Alivio HAZOP',
            code: 'SAFETY',
            tag: 'Seguridad HAZOP',
            color: 'from-red-500 to-orange-600',
        },
    ];
    return (_jsxs("div", { className: "bg-white/95 backdrop-blur-md rounded-3xl border-2 border-orange-200 shadow-xl p-5 sm:p-7 space-y-6", children: [_jsxs("div", { className: "border-b border-orange-100 pb-4", children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [_jsx("span", { className: "text-xs font-black uppercase tracking-wider text-orange-950 bg-gradient-to-r from-orange-400 to-amber-300 px-3 py-1 rounded-full shadow-xs", children: "Paso 1: Definir Tema de la Clase [TEMA_CLASE]" }), _jsxs("span", { className: "text-xs text-orange-700 font-bold bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full", children: ["Tema Focal: ", _jsx("strong", { className: "text-orange-900", children: "Reactores, Dise\u00F1o y Tipos de Reactores" })] })] }), _jsx("h2", { className: "text-xl sm:text-2xl font-black text-slate-900 mt-2 tracking-tight", children: "Configuraci\u00F3n Pedag\u00F3gica del Taller de Reactores" }), _jsx("p", { className: "text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed", children: "Selecciona o edita el tema espec\u00EDfico sobre dise\u00F1o y tipos de reactores qu\u00EDmicos (Batch, CSTR, PFR, PBR). El curador identificar\u00E1 los 3 recursos externos de mayor relevancia publicados en los \u00FAltimos 12 meses." })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("label", { className: "block text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5", children: [_jsx(Flame, { className: "w-4 h-4 text-orange-500" }), "Tema Espec\u00EDfico de la Sesi\u00F3n [TEMA_CLASE]:"] }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: "text", value: currentTopic, onChange: (e) => onTopicChange(e.target.value), placeholder: "Ej: Dise\u00F1o y Tipos de Reactores Qu\u00EDmicos: Batch, CSTR, PFR y PBR...", className: "w-full pl-4 pr-36 py-3.5 text-sm text-slate-900 font-medium bg-gradient-to-r from-orange-50/50 to-amber-50/30 border-2 border-orange-300 rounded-2xl focus:outline-none focus:ring-3 focus:ring-orange-500 focus:bg-white transition-all shadow-inner", onKeyDown: (e) => {
                                    if (e.key === 'Enter' && currentTopic.trim() && !isLoading) {
                                        onGenerate();
                                    }
                                } }), _jsx("button", { onClick: onGenerate, disabled: isLoading || !currentTopic.trim(), className: "absolute right-2 top-2 bottom-2 px-5 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 disabled:from-slate-300 disabled:to-slate-400 text-white rounded-xl text-xs font-black flex items-center gap-2 transition-all shadow-md cursor-pointer disabled:cursor-not-allowed", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }), _jsx("span", { children: "Curando..." })] })) : (_jsxs(_Fragment, { children: [_jsx(Sparkles, { className: "w-4 h-4 text-yellow-300 animate-pulse" }), _jsx("span", { children: "Generar Recursos" })] })) })] })] }), _jsxs("div", { className: "space-y-2.5 pt-1", children: [_jsxs("div", { className: "flex items-center justify-between text-xs font-bold text-slate-700", children: [_jsxs("span", { className: "flex items-center gap-1.5 uppercase tracking-wider text-orange-900", children: [_jsx(Layers, { className: "w-4 h-4 text-orange-600" }), "Temas Predise\u00F1ados del Curso de Reactores:"] }), _jsx("span", { className: "text-[11px] text-slate-500", children: "Haz clic para autocompletar" })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5", children: subtopics.map((st, idx) => {
                            const isSelected = currentTopic === st.title;
                            return (_jsxs("div", { onClick: () => {
                                    onTopicChange(st.title);
                                    // If matching reactor type, also trigger
                                    const found = REACTOR_TYPES_DATA.find((r) => r.shortCode === st.code);
                                    if (found)
                                        onSelectReactor(found);
                                }, className: `p-3 rounded-2xl border-2 text-left cursor-pointer transition-all duration-200 relative group overflow-hidden ${isSelected
                                    ? 'border-orange-500 bg-orange-50/80 shadow-md ring-2 ring-orange-500/40 scale-[1.02]'
                                    : 'border-slate-200 bg-white hover:border-orange-400 hover:bg-orange-50/30'}`, children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: `text-[10px] font-black uppercase px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${st.color} shadow-xs`, children: st.tag }), isSelected && (_jsx("div", { className: "w-4 h-4 rounded-full bg-orange-600 text-white flex items-center justify-center text-[10px]", children: _jsx(Check, { className: "w-2.5 h-2.5 stroke-[3]" }) }))] }), _jsx("h4", { className: "text-xs font-bold text-slate-900 mt-2 line-clamp-2 leading-snug group-hover:text-orange-950", children: st.title })] }, idx));
                        }) })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 p-4 rounded-2xl border border-orange-200 text-xs", children: [_jsxs("div", { children: [_jsx("label", { className: "block font-bold text-orange-950 mb-1", children: "Nivel Acad\u00E9mico del Curso:" }), _jsxs("select", { value: academicLevel, onChange: (e) => setAcademicLevel(e.target.value), className: "w-full bg-white border border-orange-300 rounded-xl px-3 py-2 text-slate-800 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none shadow-xs", children: [_jsx("option", { value: "Pregrado Avanzado (Dise\u00F1o y Operaciones)", children: "Pregrado Avanzado (Dise\u00F1o y Operaciones)" }), _jsx("option", { value: "Taller de Planta Piloto y Laboratorio", children: "Taller de Planta Piloto y Laboratorio" }), _jsx("option", { value: "Pregrado Inicial (Cin\u00E9tica Qu\u00EDmica)", children: "Pregrado Inicial (Cin\u00E9tica Qu\u00EDmica)" }), _jsx("option", { value: "Maestr\u00EDa y Postgrado (Reactores Avanzados)", children: "Maestr\u00EDa y Postgrado (Reactores Avanzados)" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block font-bold text-orange-950 mb-1", children: "Estructura de Recursos:" }), _jsxs("select", { value: resourcePreference, onChange: (e) => setResourcePreference(e.target.value), className: "w-full bg-white border border-orange-300 rounded-xl px-3 py-2 text-slate-800 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none shadow-xs", children: [_jsx("option", { value: "balanceado", children: "Mix Balanceado (1 Paper + 1 Video + 1 Caso Ind.)" }), _jsx("option", { value: "investigacion", children: "3 Art\u00EDculos Cient\u00EDficos (AIChE, ACS, Elsevier)" }), _jsx("option", { value: "industrial", children: "3 Casos / Noticias Industriales (C&EN, ICIS)" }), _jsx("option", { value: "videos", children: "3 Videos T\u00E9cnicos / Simulaciones (LearnChemE, MIT)" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block font-bold text-orange-950 mb-1", children: "Idioma de Justificaci\u00F3n:" }), _jsxs("select", { value: language, onChange: (e) => setLanguage(e.target.value), className: "w-full bg-white border border-orange-300 rounded-xl px-3 py-2 text-slate-800 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none shadow-xs", children: [_jsx("option", { value: "es", children: "Espa\u00F1ol (Docencia Universitaria Iberoamericana)" }), _jsx("option", { value: "en", children: "English (International Syllabus Format)" })] })] })] }), _jsxs("div", { className: "pt-1", children: [_jsxs("button", { type: "button", onClick: () => setShowAdvanced(!showAdvanced), className: "text-xs text-orange-700 hover:text-orange-900 font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer", children: [_jsx(SlidersHorizontal, { className: "w-3.5 h-3.5" }), _jsx("span", { children: showAdvanced ? 'Ocultar notas adicionales' : '+ Agregar objetivos específicos del laboratorio / software (Aspen, Python, MATLAB)' })] }), showAdvanced && (_jsx("div", { className: "mt-2.5 animate-in fade-in duration-200", children: _jsx("textarea", { value: customContext, onChange: (e) => setCustomContext(e.target.value), placeholder: "Ej: Pr\u00E1ctica de laboratorio en planta piloto con reactor encamisado CSTR y PFR tubular, midiendo conversi\u00F3n por conductimetr\u00EDa y simulaci\u00F3n en Aspen Plus.", rows: 2, className: "w-full p-3 text-xs text-slate-800 bg-orange-50/50 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium" }) }))] })] }));
};
