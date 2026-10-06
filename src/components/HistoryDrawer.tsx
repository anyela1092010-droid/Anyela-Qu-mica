import React from 'react';
import { AcademicGuideResources } from '../types';
import { X, Trash2, ArrowRight, History, Calendar, BookOpen } from 'lucide-react';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: AcademicGuideResources[];
  onSelect: (item: AcademicGuideResources) => void;
  onClear: () => void;
  onDeleteItem: (index: number) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelect,
  onClear,
  onDeleteItem,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-800" />
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Historial de Guías Curadas
              </h3>
              <p className="text-xs text-slate-500">
                {history.length} {history.length === 1 ? 'guía guardada' : 'guías guardadas'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-16 text-slate-400 space-y-2">
              <BookOpen className="w-10 h-10 mx-auto stroke-1" />
              <p className="text-sm font-medium">Aún no hay guías en el historial</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Las secciones de Recursos de Actualidad que generes se guardarán automáticamente aquí para su reutilización.
              </p>
            </div>
          ) : (
            history.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 hover:bg-white border border-slate-200 hover:border-emerald-500 rounded-xl p-3.5 transition-all text-xs space-y-2 group"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-900">
                    {item.topic}
                  </h4>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteItem(idx);
                    }}
                    className="text-slate-400 hover:text-rose-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Eliminar del historial"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-slate-500 text-[11px] flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                  <span className="font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    {item.resources.length} recursos
                  </span>
                </div>

                <button
                  onClick={() => {
                    onSelect(item);
                    onClose();
                  }}
                  className="w-full mt-2 py-1.5 px-3 bg-white hover:bg-emerald-700 hover:text-white border border-slate-200 hover:border-emerald-700 text-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Cargar en el editor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center text-xs">
            <span className="text-slate-500">Almacenado localmente</span>
            <button
              onClick={onClear}
              className="text-rose-600 hover:text-rose-800 font-semibold hover:underline"
            >
              Borrar todo el historial
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
