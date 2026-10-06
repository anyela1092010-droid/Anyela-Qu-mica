import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { ExternalLink, RefreshCw, FileText, Video, Building2, Edit3, Save, X, Globe } from 'lucide-react';
export const ResourceCard = ({ resource, index, onUpdate, onFindAlternative, isReplacing, }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(resource.title);
    const [editDescription, setEditDescription] = useState(resource.description);
    const [editUrl, setEditUrl] = useState(resource.url);
    const handleSave = () => {
        onUpdate({
            ...resource,
            title: editTitle.trim(),
            description: editDescription.trim(),
            url: editUrl.trim(),
        });
        setIsEditing(false);
    };
    const handleCancel = () => {
        setEditTitle(resource.title);
        setEditDescription(resource.description);
        setEditUrl(resource.url);
        setIsEditing(false);
    };
    // Badge styling depending on resource type
    const getTypeBadge = () => {
        switch (resource.type) {
            case 'video':
                return (_jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-500/15 text-rose-700 border border-rose-300 shadow-xs", children: [_jsx(Video, { className: "w-3.5 h-3.5 text-rose-600" }), " Video T\u00E9cnico / Simulaci\u00F3n"] }));
            case 'industrial':
                return (_jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-500/15 text-amber-800 border border-amber-300 shadow-xs", children: [_jsx(Building2, { className: "w-3.5 h-3.5 text-amber-600" }), " Noticia / Planta Industrial"] }));
            case 'articulo':
            default:
                return (_jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-cyan-500/15 text-cyan-800 border border-cyan-300 shadow-xs", children: [_jsx(FileText, { className: "w-3.5 h-3.5 text-cyan-600" }), " Art\u00EDculo Cient\u00EDfico Indexado"] }));
        }
    };
    const getNumberColor = () => {
        if (index === 0)
            return 'bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 shadow-amber-500/30';
        if (index === 1)
            return 'bg-gradient-to-tr from-cyan-500 to-blue-500 text-white shadow-cyan-500/30';
        return 'bg-gradient-to-tr from-emerald-500 to-teal-500 text-white shadow-emerald-500/30';
    };
    return (_jsxs("div", { className: "bg-white border-2 border-orange-200/80 rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-lg hover:border-orange-400 transition-all space-y-4 relative group", children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 border-b border-orange-100 pb-3", children: [_jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx("span", { className: `w-7 h-7 rounded-full text-xs font-black flex items-center justify-center shadow-md ${getNumberColor()}`, children: index + 1 }), getTypeBadge(), resource.sourceName && (_jsxs("span", { className: "text-[11px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-lg flex items-center gap-1", children: [_jsx(Globe, { className: "w-3 h-3 text-slate-400" }), resource.sourceName] }))] }), _jsx("div", { className: "flex items-center gap-1.5 text-xs", children: !isEditing ? (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => setIsEditing(true), className: "p-1.5 text-slate-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors cursor-pointer", title: "Editar recurso", children: _jsx(Edit3, { className: "w-4 h-4" }) }), _jsxs("button", { onClick: () => onFindAlternative(index), disabled: isReplacing, className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-orange-800 hover:text-orange-950 bg-orange-50 hover:bg-orange-100 rounded-xl text-xs font-bold border border-orange-200 transition-all disabled:opacity-50 cursor-pointer shadow-xs", title: "Buscar otra publicaci\u00F3n o recurso equivalente de los \u00FAltimos 12 meses", children: [_jsx(RefreshCw, { className: `w-3.5 h-3.5 ${isReplacing ? 'animate-spin' : ''}` }), _jsx("span", { className: "hidden sm:inline", children: "Buscar alternativa" })] })] })) : (_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsxs("button", { onClick: handleSave, className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl text-xs font-black shadow-xs cursor-pointer", children: [_jsx(Save, { className: "w-3.5 h-3.5" }), " Guardar"] }), _jsx("button", { onClick: handleCancel, className: "p-1.5 text-slate-500 hover:bg-slate-100 rounded-xl cursor-pointer", children: _jsx(X, { className: "w-4 h-4" }) })] })) })] }), !isEditing ? (_jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "text-sm sm:text-base font-bold text-slate-900 leading-snug", children: resource.title }), _jsxs("div", { className: "text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/60 p-3 rounded-lg border border-slate-100", children: [_jsx("span", { className: "font-semibold text-slate-900 block text-xs uppercase tracking-wider mb-0.5 text-emerald-900", children: "Justificaci\u00F3n Pedag\u00F3gica y Relevancia T\u00E9cnica:" }), resource.description] }), _jsxs("div", { className: "pt-1 flex items-center justify-between flex-wrap gap-2", children: [_jsxs("div", { className: "flex items-center gap-1.5 text-xs text-slate-600", children: [_jsx("span", { className: "font-semibold text-slate-800", children: "Enlace:" }), resource.url ? (_jsxs("a", { href: resource.url, target: "_blank", rel: "noopener noreferrer", className: "text-emerald-700 hover:text-emerald-900 hover:underline font-mono text-[11px] sm:text-xs flex items-center gap-1 break-all", children: [_jsx("span", { className: "max-w-md truncate", children: resource.url }), _jsx(ExternalLink, { className: "w-3 h-3 shrink-0" })] })) : (_jsx("span", { className: "text-amber-700 italic text-xs", children: "Sin enlace configurado" }))] }), resource.url && (_jsxs("a", { href: resource.url, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-1 px-3 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 transition-colors", children: [_jsx("span", { children: "Abrir recurso" }), _jsx(ExternalLink, { className: "w-3 h-3" })] }))] })] })) : (_jsxs("div", { className: "space-y-3 pt-1", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: "T\u00EDtulo del recurso:" }), _jsx("input", { type: "text", value: editTitle, onChange: (e) => setEditTitle(e.target.value), className: "w-full text-xs sm:text-sm p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: "Justificaci\u00F3n t\u00E9cnica y pedag\u00F3gica:" }), _jsx("textarea", { rows: 3, value: editDescription, onChange: (e) => setEditDescription(e.target.value), className: "w-full text-xs sm:text-sm p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: "URL verificable:" }), _jsx("input", { type: "url", value: editUrl, onChange: (e) => setEditUrl(e.target.value), className: "w-full text-xs font-mono p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600" })] })] }))] }));
};
