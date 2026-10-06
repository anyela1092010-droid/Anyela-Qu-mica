import React from 'react';
import { Flame, History, Settings, Activity, Palette } from 'lucide-react';

interface HeaderProps {
  onOpenHistory: () => void;
  onOpenSettings: () => void;
  savedCount: number;
  isBackgroundActive: boolean;
  onToggleBackground: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenHistory,
  onOpenSettings,
  savedCount,
  isBackgroundActive,
  onToggleBackground,
}) => {
  return (
    <header className="border-b border-orange-500/30 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 shadow-lg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Academic Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 shadow-lg shadow-orange-500/40">
              <Flame className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black tracking-wider uppercase text-slate-950 bg-gradient-to-r from-orange-400 to-amber-300 px-2 py-0.5 rounded-md shadow-xs">
                  Ingeniería Química
                </span>
                <span className="text-xs text-amber-300 hidden sm:inline-flex items-center gap-1 font-bold">
                  <Activity className="w-3.5 h-3.5" /> Diseño y Tipos de Reactores
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-black text-white leading-tight">
                Curador de Recursos: <span className="text-amber-400">Batch, CSTR, PFR, PBR</span>
              </h1>
            </div>
          </div>

          {/* Right badges & Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Background Toggle Button */}
            <button
              onClick={onToggleBackground}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer ${
                isBackgroundActive
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
              title="Alternar fondo fotográfico de la planta piloto"
            >
              <Palette className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Fondo Planta</span>
            </button>

            {/* Guide Settings / Institutional info */}
            <button
              onClick={onOpenSettings}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 transition-colors shadow-xs cursor-pointer"
              title="Configurar datos institucionales de la guía"
            >
              <Settings className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Datos Guía</span>
            </button>

            {/* History Button */}
            <button
              onClick={onOpenHistory}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black text-orange-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 transition-colors relative shadow-md shadow-amber-400/20 cursor-pointer"
              title="Historial de guías generadas"
            >
              <History className="w-3.5 h-3.5 fill-orange-950/20" />
              <span className="hidden sm:inline">Historial</span>
              {savedCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 bg-slate-950 text-amber-300 text-[10px] rounded-full font-black">
                  {savedCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
