import React, { useState } from 'react';
import { AcademicGuideResources, ChemicalResource } from '../types';
import { ResourceCard } from './ResourceCard';
import { formatToOfficialMarkdown, formatToLatex, formatGuideHeader } from '../utils/parser';
import { Copy, Check, Download, Printer, FileText, Code, Eye, Share2, Sparkles, AlertCircle, RefreshCw, Layers } from 'lucide-react';

interface OutputViewProps {
  data: AcademicGuideResources;
  onUpdateResource: (index: number, updated: ChemicalResource) => void;
  onFindAlternative: (index: number) => void;
  replacingIndex: number | null;
  institutionalInfo: {
    university: string;
    faculty: string;
    course: string;
    code: string;
    instructor: string;
    semester: string;
  };
}

export const OutputView: React.FC<OutputViewProps> = ({
  data,
  onUpdateResource,
  onFindAlternative,
  replacingIndex,
  institutionalInfo,
}) => {
  const [activeTab, setActiveTab] = useState<'cards' | 'markdown' | 'guide'>('markdown');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const officialMarkdown = formatToOfficialMarkdown(data.topic, data.resources);
  const latexCode = formatToLatex(data.topic, data.resources);
  const isNoResources = data.resources.length === 0;

  // Copy helpers
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  // Copy rich text format (HTML) for pasting directly into Word, Docs, Canvas, Moodle
  const handleCopyRichText = () => {
    const htmlContent = `
      <h3>Recursos de Actualidad: ${data.topic}</h3>
      <ul>
        ${data.resources
          .map(
            (r) => `
          <li>
            <strong>${r.title}</strong>: ${r.description}
            <ul>
              <li>Enlace: <a href="${r.url}">${r.url}</a></li>
            </ul>
          </li>
        `
          )
          .join('')}
      </ul>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const textBlob = new Blob([officialMarkdown], { type: 'text/plain' });
    const item = new ClipboardItem({
      'text/html': blob,
      'text/plain': textBlob,
    });

    navigator.clipboard.write([item]).then(() => {
      setCopiedType('rich-text');
      setTimeout(() => setCopiedType(null), 2500);
    });
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([officialMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recursos-actualidad-${data.topic.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl border-2 border-orange-200 shadow-xl overflow-hidden">
      {/* Top Bar with Title & View Tabs */}
      <div className="border-b border-orange-200 bg-gradient-to-r from-orange-50/80 via-amber-50/60 to-yellow-50/80 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-orange-950 bg-gradient-to-r from-orange-400 to-amber-300 px-2.5 py-0.5 rounded-full shadow-xs">
              Paso 2: Resultado Pedagógico
            </span>
            <span className="text-xs text-orange-800 font-bold">
              Formato Oficial de Guía Académica
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-black text-slate-900 mt-1 flex items-center gap-2">
            <span>Sección Curada: {data.topic}</span>
          </h2>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center bg-slate-900/90 p-1.5 rounded-2xl text-xs font-bold text-white shadow-md">
          <button
            onClick={() => setActiveTab('markdown')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'markdown'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Formato Oficial (Markdown)</span>
          </button>
          <button
            onClick={() => setActiveTab('cards')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'cards'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Tarjetas de Inspección ({data.resources.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Guía de Trabajo Completa</span>
          </button>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="bg-slate-100/90 border-b border-slate-200 px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-slate-700 font-bold">
          <span>Acciones de exportación y copiado directo:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Copy Official Markdown */}
          <button
            onClick={() => handleCopy(officialMarkdown, 'markdown')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white rounded-xl font-black shadow-md transition-all cursor-pointer"
          >
            {copiedType === 'markdown' ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>¡Markdown Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Markdown</span>
              </>
            )}
          </button>

          {/* Copy Rich Text (Word / LMS) */}
          <button
            onClick={handleCopyRichText}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 rounded-xl font-bold transition-all shadow-xs cursor-pointer"
            title="Copiar texto con formato listo para pegar en Word, Google Docs o Canvas"
          >
            {copiedType === 'rich-text' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                <span className="text-emerald-700">¡Copiado para Word!</span>
              </>
            ) : (
              <>
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Copiar para Word / Docs</span>
              </>
            )}
          </button>

          {/* Copy LaTeX */}
          <button
            onClick={() => handleCopy(latexCode, 'latex')}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 rounded-xl font-bold transition-all shadow-xs cursor-pointer"
            title="Copiar snippet en formato LaTeX para guías compiladas"
          >
            {copiedType === 'latex' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                <span>¡LaTeX Copiado!</span>
              </>
            ) : (
              <>
                <Code className="w-3.5 h-3.5 text-purple-600" />
                <span>LaTeX</span>
              </>
            )}
          </button>

          {/* Download .md */}
          <button
            onClick={handleDownloadMarkdown}
            className="p-2 text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border-2 border-slate-300 rounded-xl transition-colors shadow-xs cursor-pointer"
            title="Descargar archivo Markdown (.md)"
          >
            <Download className="w-4 h-4 text-orange-600" />
          </button>

          {/* Print preview */}
          <button
            onClick={handlePrint}
            className="p-2 text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border-2 border-slate-300 rounded-xl transition-colors shadow-xs cursor-pointer"
            title="Imprimir o Exportar PDF"
          >
            <Printer className="w-4 h-4 text-cyan-600" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-6">
        {isNoResources ? (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center space-y-2">
            <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
            <h3 className="text-sm font-bold text-amber-900">
              Sin recursos de actualidad validados para este tema
            </h3>
            <p className="text-xs text-amber-700 max-w-lg mx-auto">
              No se encontraron fuentes de alta calidad verificables publicadas en los últimos 12 meses que cumplan con los estándares pedagógicos rigurosos para este tema específico.
            </p>
          </div>
        ) : activeTab === 'markdown' ? (
          /* TAB 1: EXACT OFFICIAL MARKDOWN FORMAT AS REQUESTED */
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700">
                Salida en Formato Estricto Solicitado:
              </span>
              <span className="text-[11px] bg-slate-100 px-2 py-0.5 rounded font-mono">
                3 recursos • markdown estándar
              </span>
            </div>

            <div className="relative group">
              <pre className="w-full bg-slate-900 text-slate-100 p-5 rounded-xl font-mono text-xs sm:text-sm overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-inner border border-slate-800">
                {officialMarkdown}
              </pre>

              <button
                onClick={() => handleCopy(officialMarkdown, 'markdown')}
                className="absolute top-3 right-3 px-3 py-1.5 bg-slate-800/90 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-all border border-slate-700"
              >
                {copiedType === 'markdown' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick explanation of pedagogical fidelity */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-xs text-emerald-900 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Estructura pedagógica validada:</strong> Cada recurso incluye su título técnico, justificación pedagógica directa (sin introducciones de relleno) y enlace verificado publicado en los últimos 12 meses.
              </div>
            </div>
          </div>
        ) : activeTab === 'cards' ? (
          /* TAB 2: INTERACTIVE CARDS WITH INLINE EDITING & ALTERNATIVES */
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700">
                Inspección, Edición y Enlaces Externos:
              </span>
              <span className="text-[11px] text-slate-500">
                Puedes ajustar textos o buscar alternativas para cualquier recurso individual
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {data.resources.map((resource, idx) => (
                <ResourceCard
                  key={resource.id || idx}
                  resource={resource}
                  index={idx}
                  onUpdate={(updated) => onUpdateResource(idx, updated)}
                  onFindAlternative={onFindAlternative}
                  isReplacing={replacingIndex === idx}
                />
              ))}
            </div>
          </div>
        ) : (
          /* TAB 3: FULL ACADEMIC GUIDE SIMULATION */
          <div className="bg-white border-2 border-slate-300 rounded-xl p-6 sm:p-8 max-w-3xl mx-auto shadow-sm space-y-6 font-serif text-slate-900 printable-guide">
            {/* Academic Guide Header */}
            <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
              <h3 className="text-xs uppercase tracking-widest font-sans font-bold text-slate-600">
                {institutionalInfo.university || 'UNIVERSIDAD NACIONAL / FACULTAD DE INGENIERÍA'}
              </h3>
              <h4 className="text-sm uppercase tracking-wider font-sans font-bold text-slate-800">
                {institutionalInfo.faculty || 'DEPARTAMENTO DE INGENIERÍA QUÍMICA Y AMBIENTAL'}
              </h4>
              <div className="py-1">
                <span className="inline-block px-3 py-1 bg-slate-100 font-sans font-bold text-xs rounded border border-slate-300">
                  GUÍA DE TRABAJO ACADÉMICO / TALLER DE CLASE
                </span>
              </div>
              <div className="text-xs font-sans text-slate-600 grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 mt-2">
                <div className="text-left">
                  <strong>Asignatura:</strong> {institutionalInfo.course} ({institutionalInfo.code})
                </div>
                <div className="text-right">
                  <strong>Período:</strong> {institutionalInfo.semester}
                </div>
                <div className="text-left">
                  <strong>Docente:</strong> {institutionalInfo.instructor}
                </div>
                <div className="text-right">
                  <strong>Nivel:</strong> {data.academicLevel || 'Pregrado Avanzado'}
                </div>
              </div>
            </div>

            {/* Guide Body */}
            <div className="space-y-4 font-sans text-xs sm:text-sm">
              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                <h5 className="font-bold text-xs uppercase text-slate-700">Tema de la Sesión:</h5>
                <p className="text-base font-bold text-slate-900">{data.topic}</p>
              </div>

              {/* Exact Curated Section */}
              <div className="pt-2">
                <h4 className="text-base font-bold text-slate-900 border-b border-slate-300 pb-1 mb-3">
                  Recursos de Actualidad: {data.topic}
                </h4>

                <ul className="space-y-3 pl-4 list-disc text-xs sm:text-sm leading-relaxed">
                  {data.resources.map((r, i) => (
                    <li key={i} className="pl-1">
                      <strong className="text-slate-900 font-bold">{r.title}:</strong>{' '}
                      <span className="text-slate-800">{r.description}</span>
                      <div className="mt-1 pl-4 text-xs font-mono text-emerald-800">
                        • Enlace:{' '}
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-emerald-900"
                        >
                          {r.url}
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions for Students */}
              <div className="pt-4 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                <h5 className="font-bold uppercase text-slate-800">Consigna para el estudiante:</h5>
                <p>
                  Revisar los recursos de actualidad anteriores previo al inicio del taller. Cada equipo seleccionará uno de los casos o publicaciones para discutir en la sesión de plenaria cómo los principios de ingeniería química expuestos se aplican a la resolución del problema técnico planteado.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Web Sources Grounding Footer (if search grounding metadata exists) */}
      {data.webSources && data.webSources.length > 0 && (
        <div className="bg-slate-50 border-t border-slate-200 px-4 sm:px-6 py-3 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 font-semibold text-slate-700 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Fuentes indexadas por Google Search Grounding:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.webSources.map((source, sIdx) => (
              <a
                key={sIdx}
                href={source.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] bg-white border border-slate-200 px-2 py-0.5 rounded text-emerald-700 hover:underline max-w-xs truncate"
              >
                {source.title || source.uri}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
