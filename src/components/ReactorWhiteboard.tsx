import React from 'react';
import { REACTOR_TYPES_DATA, ReactorTypeInfo } from '../data/reactorsCurriculum';
import { Timer, RotateCw, ArrowRightCircle, Boxes, Flame, Sparkles, Check, ChevronRight, BookOpen, Clock, Activity } from 'lucide-react';

interface ReactorWhiteboardProps {
  selectedReactorId: string;
  onSelectReactor: (reactor: ReactorTypeInfo) => void;
}

export const ReactorWhiteboard: React.FC<ReactorWhiteboardProps> = ({
  selectedReactorId,
  onSelectReactor,
}) => {
  const getIcon = (shortCode: string) => {
    switch (shortCode) {
      case 'BATCH':
        return <Timer className="w-4 h-4 text-amber-400" />;
      case 'CSTR':
        return <RotateCw className="w-4 h-4 text-emerald-400" />;
      case 'PFR':
        return <ArrowRightCircle className="w-4 h-4 text-cyan-400" />;
      case 'PBR':
        return <Boxes className="w-4 h-4 text-purple-400" />;
      default:
        return <Flame className="w-4 h-4 text-orange-400" />;
    }
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl border-2 border-slate-700/80 shadow-2xl p-5 sm:p-6 text-white space-y-5 overflow-hidden relative">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-cyan-500/20 via-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header replicating the pilot plant banner */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-orange-500 text-slate-950 shadow-md shadow-orange-500/30 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 fill-slate-950" /> Taller de Planta Piloto
            </span>
            <span className="text-xs text-amber-300 font-semibold hidden sm:inline-flex items-center gap-1">
              <Activity className="w-3.5 h-3.5" /> Procesos Químicos • Ingeniería de Reactores
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white mt-1.5 tracking-tight flex items-center gap-2">
            <span>Diferentes Tipos de Reactores:</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 font-black">
              BATCH, CSTR, PFR, PBR
            </span>
          </h3>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-400 block font-medium">Tema Focalizado:</span>
          <span className="text-xs sm:text-sm font-bold text-amber-400 font-mono">
            Diseño y Tipo de Reactores
          </span>
        </div>
      </div>

      {/* Interactive Reactor Selector Pills */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-5 gap-2">
        {REACTOR_TYPES_DATA.map((r) => {
          const isSelected = selectedReactorId === r.id;
          return (
            <button
              key={r.id}
              onClick={() => onSelectReactor(r)}
              className={`p-3 rounded-xl border text-left transition-all duration-200 relative overflow-hidden group cursor-pointer ${
                isSelected
                  ? 'border-orange-400 bg-slate-800/95 shadow-lg shadow-orange-500/20 ring-2 ring-orange-400/50 scale-[1.02]'
                  : 'border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-extrabold px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-200 group-hover:text-white">
                  {r.shortCode}
                </span>
                {getIcon(r.shortCode)}
              </div>
              <div className="text-xs font-bold text-slate-200 mt-2 line-clamp-1 group-hover:text-white">
                {r.name.split(':')[0]}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                {r.residenceTimeExample}
              </div>

              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Authentic Whiteboard Table replicated from image */}
      <div className="relative z-10 bg-slate-950/70 border border-slate-800 rounded-xl overflow-hidden shadow-inner">
        <div className="px-4 py-2.5 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs font-bold text-slate-300">
          <span className="uppercase tracking-wider flex items-center gap-1.5 text-amber-400">
            <BookOpen className="w-3.5 h-3.5" />
            Matriz Comparativa de Diseño (Pizarra de Laboratorio):
          </span>
          <span className="text-[11px] text-slate-400 font-normal">
            Haz clic en cualquier reactor para cargar sus recursos de actualidad
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/40 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 px-3.5">Reactor</th>
                <th className="py-2.5 px-3.5">Modo de Operación</th>
                <th className="py-2.5 px-3.5">Tiempo Residencia (τ)</th>
                <th className="py-2.5 px-3.5">Ecuación de Diseño</th>
                <th className="py-2.5 px-3.5">Aplicaciones Industriales</th>
                <th className="py-2.5 px-3.5 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {REACTOR_TYPES_DATA.filter((x) => x.id !== 'general').map((item) => {
                const isSelected = selectedReactorId === item.id;
                return (
                  <tr
                    key={item.id}
                    onClick={() => onSelectReactor(item)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-orange-500/15 text-white'
                        : 'hover:bg-slate-800/40 text-slate-300'
                    }`}
                  >
                    <td className="py-2.5 px-3.5 font-bold">
                      <div className="flex items-center gap-2">
                        {getIcon(item.shortCode)}
                        <span className="font-mono text-amber-300 font-bold">{item.shortCode}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3.5 text-slate-300 font-medium">
                      {item.modeOfOperation}
                    </td>
                    <td className="py-2.5 px-3.5 font-mono text-cyan-300">
                      {item.residenceTimeExample}
                    </td>
                    <td className="py-2.5 px-3.5 font-mono text-emerald-300 text-[11px]">
                      {item.designEquation}
                    </td>
                    <td className="py-2.5 px-3.5 text-slate-300 max-w-xs truncate">
                      {item.industrialApplications}
                    </td>
                    <td className="py-2.5 px-3.5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectReactor(item);
                        }}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold inline-flex items-center gap-1 transition-all ${
                          isSelected
                            ? 'bg-orange-500 text-slate-950 shadow-xs'
                            : 'bg-slate-800 text-slate-300 hover:bg-orange-500 hover:text-slate-950'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3 h-3" /> Activo
                          </>
                        ) : (
                          <>
                            <span>Curar</span>
                            <ChevronRight className="w-3 h-3" />
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
