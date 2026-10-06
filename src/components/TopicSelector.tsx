import React, { useState } from 'react';
import { REACTOR_TYPES_DATA, ReactorTypeInfo } from '../data/reactorsCurriculum';
import { Sparkles, Flame, Check, SlidersHorizontal, Layers } from 'lucide-react';

interface TopicSelectorProps {
  currentTopic: string;
  onTopicChange: (topic: string) => void;
  onSelectReactor: (reactor: ReactorTypeInfo) => void;
  onGenerate: () => void;
  isLoading: boolean;
  academicLevel: string;
  setAcademicLevel: (lvl: string) => void;
  resourcePreference: string;
  setResourcePreference: (pref: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  customContext: string;
  setCustomContext: (ctx: string) => void;
}

export const TopicSelector: React.FC<TopicSelectorProps> = ({
  currentTopic,
  onTopicChange,
  onSelectReactor,
  onGenerate,
  isLoading,
  academicLevel,
  setAcademicLevel,
  resourcePreference,
  setResourcePreference,
  language,
  setLanguage,
  customContext,
  setCustomContext,
}) => {
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

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

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl border-2 border-orange-200 shadow-xl p-5 sm:p-7 space-y-6">
      {/* Header section with pedagogical explanation */}
      <div className="border-b border-orange-100 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-orange-950 bg-gradient-to-r from-orange-400 to-amber-300 px-3 py-1 rounded-full shadow-xs">
            Paso 1: Definir Tema de la Clase [TEMA_CLASE]
          </span>
          <span className="text-xs text-orange-700 font-bold bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full">
            Tema Focal: <strong className="text-orange-900">Reactores, Diseño y Tipos de Reactores</strong>
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 tracking-tight">
          Configuración Pedagógica del Taller de Reactores
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
          Selecciona o edita el tema específico sobre diseño y tipos de reactores químicos (Batch, CSTR, PFR, PBR). El curador identificará los 3 recursos externos de mayor relevancia publicados en los últimos 12 meses.
        </p>
      </div>

      {/* Main input for [TEMA_CLASE] */}
      <div className="space-y-2">
        <label className="block text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-orange-500" />
          Tema Específico de la Sesión [TEMA_CLASE]:
        </label>
        <div className="relative">
          <input
            type="text"
            value={currentTopic}
            onChange={(e) => onTopicChange(e.target.value)}
            placeholder="Ej: Diseño y Tipos de Reactores Químicos: Batch, CSTR, PFR y PBR..."
            className="w-full pl-4 pr-36 py-3.5 text-sm text-slate-900 font-medium bg-gradient-to-r from-orange-50/50 to-amber-50/30 border-2 border-orange-300 rounded-2xl focus:outline-none focus:ring-3 focus:ring-orange-500 focus:bg-white transition-all shadow-inner"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && currentTopic.trim() && !isLoading) {
                onGenerate();
              }
            }}
          />
          <button
            onClick={onGenerate}
            disabled={isLoading || !currentTopic.trim()}
            className="absolute right-2 top-2 bottom-2 px-5 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 disabled:from-slate-300 disabled:to-slate-400 text-white rounded-xl text-xs font-black flex items-center gap-2 transition-all shadow-md cursor-pointer disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Curando...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                <span>Generar Recursos</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Colorful Quick Subtopics Grid */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-orange-900">
            <Layers className="w-4 h-4 text-orange-600" />
            Temas Prediseñados del Curso de Reactores:
          </span>
          <span className="text-[11px] text-slate-500">Haz clic para autocompletar</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {subtopics.map((st, idx) => {
            const isSelected = currentTopic === st.title;
            return (
              <div
                key={idx}
                onClick={() => {
                  onTopicChange(st.title);
                  // If matching reactor type, also trigger
                  const found = REACTOR_TYPES_DATA.find((r) => r.shortCode === st.code);
                  if (found) onSelectReactor(found);
                }}
                className={`p-3 rounded-2xl border-2 text-left cursor-pointer transition-all duration-200 relative group overflow-hidden ${
                  isSelected
                    ? 'border-orange-500 bg-orange-50/80 shadow-md ring-2 ring-orange-500/40 scale-[1.02]'
                    : 'border-slate-200 bg-white hover:border-orange-400 hover:bg-orange-50/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${st.color} shadow-xs`}
                  >
                    {st.tag}
                  </span>
                  {isSelected && (
                    <div className="w-4 h-4 rounded-full bg-orange-600 text-white flex items-center justify-center text-[10px]">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                </div>
                <h4 className="text-xs font-bold text-slate-900 mt-2 line-clamp-2 leading-snug group-hover:text-orange-950">
                  {st.title}
                </h4>
              </div>
            );
          })}
        </div>
      </div>

      {/* Colorful Configuration Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 p-4 rounded-2xl border border-orange-200 text-xs">
        {/* Nivel Académico */}
        <div>
          <label className="block font-bold text-orange-950 mb-1">
            Nivel Académico del Curso:
          </label>
          <select
            value={academicLevel}
            onChange={(e) => setAcademicLevel(e.target.value)}
            className="w-full bg-white border border-orange-300 rounded-xl px-3 py-2 text-slate-800 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none shadow-xs"
          >
            <option value="Pregrado Avanzado (Diseño y Operaciones)">Pregrado Avanzado (Diseño y Operaciones)</option>
            <option value="Taller de Planta Piloto y Laboratorio">Taller de Planta Piloto y Laboratorio</option>
            <option value="Pregrado Inicial (Cinética Química)">Pregrado Inicial (Cinética Química)</option>
            <option value="Maestría y Postgrado (Reactores Avanzados)">Maestría y Postgrado (Reactores Avanzados)</option>
          </select>
        </div>

        {/* Enfoque de Recursos */}
        <div>
          <label className="block font-bold text-orange-950 mb-1">
            Estructura de Recursos:
          </label>
          <select
            value={resourcePreference}
            onChange={(e) => setResourcePreference(e.target.value)}
            className="w-full bg-white border border-orange-300 rounded-xl px-3 py-2 text-slate-800 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none shadow-xs"
          >
            <option value="balanceado">Mix Balanceado (1 Paper + 1 Video + 1 Caso Ind.)</option>
            <option value="investigacion">3 Artículos Científicos (AIChE, ACS, Elsevier)</option>
            <option value="industrial">3 Casos / Noticias Industriales (C&EN, ICIS)</option>
            <option value="videos">3 Videos Técnicos / Simulaciones (LearnChemE, MIT)</option>
          </select>
        </div>

        {/* Idioma de Justificación */}
        <div>
          <label className="block font-bold text-orange-950 mb-1">
            Idioma de Justificación:
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-white border border-orange-300 rounded-xl px-3 py-2 text-slate-800 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none shadow-xs"
          >
            <option value="es">Español (Docencia Universitaria Iberoamericana)</option>
            <option value="en">English (International Syllabus Format)</option>
          </select>
        </div>
      </div>

      {/* Advanced context toggle */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-xs text-orange-700 hover:text-orange-900 font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>{showAdvanced ? 'Ocultar notas adicionales' : '+ Agregar objetivos específicos del laboratorio / software (Aspen, Python, MATLAB)'}</span>
        </button>
        {showAdvanced && (
          <div className="mt-2.5 animate-in fade-in duration-200">
            <textarea
              value={customContext}
              onChange={(e) => setCustomContext(e.target.value)}
              placeholder="Ej: Práctica de laboratorio en planta piloto con reactor encamisado CSTR y PFR tubular, midiendo conversión por conductimetría y simulación en Aspen Plus."
              rows={2}
              className="w-full p-3 text-xs text-slate-800 bg-orange-50/50 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
            />
          </div>
        )}
      </div>
    </div>
  );
};
