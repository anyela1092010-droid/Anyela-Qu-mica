import React from 'react';
import { Flame, Eye, EyeOff, Layers, Activity, GraduationCap } from 'lucide-react';
import { ReactorTypeInfo } from '../data/reactorsCurriculum';

interface PilotPlantHeroProps {
  currentReactor: ReactorTypeInfo;
  isBackgroundActive: boolean;
  onToggleBackground: () => void;
  onQuickSelectReactor: (code: 'BATCH' | 'CSTR' | 'PFR' | 'PBR' | 'GENERAL') => void;
}

export const PilotPlantHero: React.FC<PilotPlantHeroProps> = ({
  currentReactor,
  isBackgroundActive,
  onToggleBackground,
  onQuickSelectReactor,
}) => {
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-orange-500/30 group">
      {/* Background image container */}
      <div className="absolute inset-0 z-0">
        <img
          src="/reactor_background.jpg"
          alt="Planta Piloto de Procesos Químicos y Taller de Diseño de Reactores"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter saturate-125 contrast-105 transition-transform duration-700 group-hover:scale-102"
        />
        {/* Dynamic Colorful Overlay with Orange/Cyan/Emerald accents */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/80 to-slate-900/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-orange-950/30" />
      </div>

      {/* Content over hero */}
      <div className="relative z-10 p-6 sm:p-8 md:p-10 text-white space-y-6 max-w-4xl">
        {/* Top Badges & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-orange-500 text-slate-950 shadow-lg shadow-orange-500/40 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 fill-slate-950" /> Planta Piloto de Procesos Químicos
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" /> Taller de Diseño de Reactores
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium text-amber-200 bg-amber-500/10 border border-amber-400/20 hidden sm:inline-flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" /> Docencia e Investigación
            </span>
          </div>

          {/* Toggle background view */}
          <button
            onClick={onToggleBackground}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all shadow-md cursor-pointer"
            title="Ajustar visibilidad del fondo fotográfico"
          >
            {isBackgroundActive ? (
              <>
                <Eye className="w-3.5 h-3.5 text-orange-400" />
                <span>Fondo Completo</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                <span>Fondo Suave</span>
              </>
            )}
          </button>
        </div>

        {/* Hero Title */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Diseño y Tipos de Reactores:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400">
              Batch, CSTR, PFR y PBR
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl font-medium drop-shadow-sm">
            Curador pedagógico especializado en cinética química y reactores homogéneos y heterogéneos. Genera la sección estricta de <strong className="text-amber-300 font-bold">Recursos de Actualidad</strong> (artículos indexados, videos de simulación y noticias de impacto industrial de los últimos 12 meses) para guías de trabajo y talleres de laboratorio.
          </p>
        </div>

        {/* Quick reactor selection pills directly on the hero */}
        <div className="pt-2">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-orange-400" />
            <span>Seleccionar Tipo de Reactor para Curaduría:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { code: 'GENERAL', label: 'Taller General (Todos los Reactores)', color: 'from-orange-500 to-amber-600' },
              { code: 'BATCH', label: 'Batch (Discontinuo / Por Lotes)', color: 'from-amber-500 to-orange-500' },
              { code: 'CSTR', label: 'CSTR (Tanque Agitado Continuo)', color: 'from-emerald-500 to-teal-600' },
              { code: 'PFR', label: 'PFR (Tubular Flujo Pistón)', color: 'from-cyan-500 to-blue-600' },
              { code: 'PBR', label: 'PBR (Lecho Empacado Catalítico)', color: 'from-purple-500 to-indigo-600' },
            ].map((btn) => {
              const isActive = currentReactor.shortCode === btn.code;
              return (
                <button
                  key={btn.code}
                  onClick={() => onQuickSelectReactor(btn.code as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? `bg-gradient-to-r ${btn.color} text-white ring-2 ring-white/50 scale-105`
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700/80 hover:text-white'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
                  <span>{btn.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
