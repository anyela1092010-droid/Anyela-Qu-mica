import { ChemicalResource, AcademicGuideResources } from '../types';

/**
 * Parses the strict markdown format produced by Gemini or user:
 * ### Recursos de Actualidad: [TEMA_CLASE]
 * - **[Título]**: [Breve descripción técnica]
 *   - Enlace: [URL]
 */
export function parseMarkdownResources(markdown: string, fallbackTopic: string = ''): AcademicGuideResources {
  const lines = markdown.split('\n');
  let topic = fallbackTopic;
  const resources: ChemicalResource[] = [];

  // Match topic header: ### Recursos de Actualidad: [TEMA_CLASE] or ### Recursos de Actualidad: TEMA
  const headerMatch = markdown.match(/###\s+Recursos de Actualidad:\s*(?:\[(.*?)\]|(.*))/i);
  if (headerMatch) {
    topic = (headerMatch[1] || headerMatch[2] || '').trim();
    if (!topic && fallbackTopic) topic = fallbackTopic;
  }

  // Check for "Sin recursos de actualidad validados para este tema"
  if (markdown.toLowerCase().includes('sin recursos de actualidad validados para este tema')) {
    return {
      topic: topic || fallbackTopic,
      rawMarkdown: markdown,
      resources: [],
      timestamp: new Date().toISOString(),
    };
  }

  // Regex to extract items:
  // - **Title**: description
  //   - Enlace: URL
  const itemRegex = /-\s+\*\*([^*]+)\*\*:\s*([\s\S]*?)(?=(?:-\s+\*\*)|$)/g;
  let match: RegExpExecArray | null;

  let index = 1;
  while ((match = itemRegex.exec(markdown)) !== null) {
    const rawTitle = match[1].trim();
    const rest = match[2].trim();

    // Look for link inside the bullet: - Enlace: URL or [URL] or Enlace: https://...
    let url = '';
    let description = rest;

    const urlMatch = rest.match(/-\s*Enlace:\s*(?:\[(.*?)\]\((.*?)\)|\[?(https?:\/\/[^\s\]\)]+)\]?)/i);
    if (urlMatch) {
      url = urlMatch[2] || urlMatch[3] || urlMatch[1] || '';
      // Remove the link line from description
      description = rest.replace(/-\s*Enlace:\s*[\s\S]*$/i, '').trim();
    } else {
      // Fallback simple url search in text
      const fallbackUrlMatch = rest.match(/(https?:\/\/[^\s\)]+)/i);
      if (fallbackUrlMatch) {
        url = fallbackUrlMatch[1];
        description = rest.replace(/-\s*Enlace:?\s*/i, '').replace(url, '').trim();
      }
    }

    // Determine type
    const lowerDesc = (rawTitle + ' ' + description).toLowerCase();
    let type: ChemicalResource['type'] = 'otro';
    if (lowerDesc.includes('video') || lowerDesc.includes('youtube') || lowerDesc.includes('seminario audiovisual') || lowerDesc.includes('simulaci')) {
      type = 'video';
    } else if (lowerDesc.includes('artículo') || lowerDesc.includes('investigación') || lowerDesc.includes('paper') || lowerDesc.includes('journal') || lowerDesc.includes('acs') || lowerDesc.includes('aiche') || lowerDesc.includes('elsevier') || lowerDesc.includes('sciencedirect')) {
      type = 'articulo';
    } else if (lowerDesc.includes('industrial') || lowerDesc.includes('planta') || lowerDesc.includes('noticia') || lowerDesc.includes('c&en') || lowerDesc.includes('icis') || lowerDesc.includes('caso')) {
      type = 'industrial';
    }

    // Extract publisher/source name from URL or title
    let sourceName = detectSourceFromUrl(url);
    if (!sourceName && (rawTitle.includes('(') || description.includes('('))) {
      const pMatch = (rawTitle + ' ' + description).match(/\(([^)]+)\)/);
      if (pMatch) sourceName = pMatch[1];
    }

    resources.push({
      id: `parsed-${index}`,
      title: rawTitle,
      description: cleanDescription(description),
      url: url.trim(),
      type,
      sourceName: sourceName || 'Fuente de Ingeniería Química',
      verified: !!url.startsWith('http'),
    });

    index++;
  }

  return {
    topic: topic || fallbackTopic,
    rawMarkdown: markdown,
    resources,
    timestamp: new Date().toISOString(),
  };
}

function cleanDescription(desc: string): string {
  return desc
    .replace(/^-\s*/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function detectSourceFromUrl(url: string): string {
  if (!url) return '';
  const u = url.toLowerCase();
  if (u.includes('aiche.org') || u.includes('aiche.onlinelibrary')) return 'AIChE (American Institute of Chemical Engineers)';
  if (u.includes('pubs.acs.org') || u.includes('cen.acs.org')) return 'ACS Publications (American Chemical Society)';
  if (u.includes('sciencedirect.com') || u.includes('elsevier.com')) return 'Elsevier / ScienceDirect';
  if (u.includes('nature.com')) return 'Nature Chemical Engineering / Springer';
  if (u.includes('rsc.org')) return 'Royal Society of Chemistry (RSC)';
  if (u.includes('wiley.com')) return 'Wiley Online Library';
  if (u.includes('youtube.com') || u.includes('youtu.be')) return 'YouTube / Conferencia Técnica';
  if (u.includes('csb.gov')) return 'US Chemical Safety Board (CSB)';
  if (u.includes('chemengonline.com')) return 'Chemical Engineering Magazine';
  if (u.includes('chemicalprocessing.com')) return 'Chemical Processing';
  if (u.includes('icis.com')) return 'ICIS Chemical News';
  if (u.includes('springer.com')) return 'Springer Link';
  return '';
}

/**
 * Builds the exact markdown string requested:
 * ### Recursos de Actualidad: [TEMA_CLASE]
 * - **[Título]**: [Breve descripción técnica]
 *   - Enlace: [URL]
 */
export function formatToOfficialMarkdown(topic: string, resources: ChemicalResource[]): string {
  if (resources.length === 0) {
    return `### Recursos de Actualidad: [${topic}]\nSin recursos de actualidad validados para este tema`;
  }

  const items = resources
    .map(
      (r) => `- **${r.title}**: ${r.description}
  - Enlace: ${r.url || 'https://www.aiche.org'}`
    )
    .join('\n');

  return `### Recursos de Actualidad: [${topic}]\n${items}`;
}

/**
 * Generates LaTeX snippet for academic syllabus / work guides
 */
export function formatToLatex(topic: string, resources: ChemicalResource[]): string {
  if (resources.length === 0) {
    return `\\subsubsection*{Recursos de Actualidad: ${topic}}\nSin recursos de actualidad validados para este tema.`;
  }

  const items = resources
    .map(
      (r) => `  \\item \\textbf{${escapeLatex(r.title)}}: ${escapeLatex(r.description)} \\\\
  \\textit{Enlace:} \\url{${r.url}}`
    )
    .join('\n');

  return `\\subsubsection*{Recursos de Actualidad: ${escapeLatex(topic)}}
\\begin{itemize}
${items}
\\end{itemize}`;
}

function escapeLatex(text: string): string {
  return text
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/\$/g, '\\$')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}');
}

/**
 * Formats guide header for academic chemical engineering syllabus
 */
export function formatGuideHeader(data: {
  university: string;
  faculty: string;
  course: string;
  code: string;
  instructor: string;
  semester: string;
  topic: string;
}): string {
  return `================================================================================
${data.university.toUpperCase()}
${data.faculty.toUpperCase()}
GUÍA DE TRABAJO ACADÉMICO / TALLER DE INGENIERÍA QUÍMICA
--------------------------------------------------------------------------------
Asignatura: ${data.course} (${data.code}) | Período: ${data.semester}
Profesor(a): ${data.instructor}
Tema de la Sesión: ${data.topic}
================================================================================`;
}
