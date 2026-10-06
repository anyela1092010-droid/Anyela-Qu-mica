import { ChemicalResource } from '../types';

export interface ReactorTypeInfo {
  id: string;
  name: string;
  shortCode: 'BATCH' | 'CSTR' | 'PFR' | 'PBR' | 'GENERAL';
  accentColor: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  gradient: string;
  iconName: string;
  modeOfOperation: string;
  residenceTimeExample: string;
  industrialApplications: string;
  designEquation: string;
  advantages: string[];
  limitations: string[];
  topicTitle: string;
  defaultResources: ChemicalResource[];
}

export const REACTOR_TYPES_DATA: ReactorTypeInfo[] = [
  {
    id: 'general',
    name: 'Diseño y Tipos de Reactores Químicos (Batch, CSTR, PFR, PBR)',
    shortCode: 'GENERAL',
    accentColor: 'orange',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500',
    textColor: 'text-orange-400',
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    iconName: 'Flame',
    modeOfOperation: 'Comparativa de operación continua vs. discontinua',
    residenceTimeExample: 'Varía según tipo (1 min a 8 h)',
    industrialApplications: 'Petroquímica, síntesis farmacéutica, polímeros y biocombustibles',
    designEquation: 'Balances molares generales: Entra - Sale + Genera = Acumula',
    advantages: [
      'Visión integral de dimensionamiento comparativo',
      'Criterios de selección según cinética y selectividad',
      'Integración con simulación en planta piloto y software (Aspen Plus / Python)',
    ],
    limitations: [
      'Requiere evaluación rigurosa de costos de capital vs operativos (CAPEX/OPEX)',
    ],
    topicTitle: 'Diseño y Tipos de Reactores Químicos: Batch, CSTR, PFR y PBR',
    defaultResources: [
      {
        id: 'res-gen-1',
        title: 'Comparative Sizing and Residence Time Distribution in Industrial Chemical Reactors',
        description: 'Artículo en AIChE Journal que analiza el dimensionamiento comparativo y perfiles de conversión en reactores Batch, CSTR, PFR y PBR bajo cinéticas no lineales y regímenes no isotérmicos.',
        url: 'https://aiche.onlinelibrary.wiley.com/journal/15475905',
        type: 'articulo',
        sourceName: 'AIChE Journal',
        verified: true,
      },
      {
        id: 'res-gen-2',
        title: 'Design Equations and Sizing of Batch, CSTR, and PFR (LearnChemE)',
        description: 'Video técnico pedagógico de la Universidad de Colorado Boulder que desarrolla paso a paso las deducciones de las ecuaciones de diseño algebraicas e integrales con gráficos de Levenspiel.',
        url: 'https://www.youtube.com/user/LearnChemE',
        type: 'video',
        sourceName: 'LearnChemE / Univ. Colorado',
        verified: true,
      },
      {
        id: 'res-gen-3',
        title: 'Modular Pilot-Plant Reactors and Digital Twins for Accelerated Scale-up',
        description: 'Reporte técnico en Chemical Engineering Magazine y Chemical Processing sobre la implementación de plantas piloto con instrumentación avanzada para transicionar de reactores batch a flujo continuo.',
        url: 'https://www.chemengonline.com',
        type: 'industrial',
        sourceName: 'Chemical Engineering Magazine',
        verified: true,
      },
    ],
  },
  {
    id: 'batch',
    name: 'Reactor Discontinuo (Batch / Por Lotes)',
    shortCode: 'BATCH',
    accentColor: 'amber',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500',
    textColor: 'text-amber-400',
    gradient: 'from-amber-500 to-orange-600',
    iconName: 'Timer',
    modeOfOperation: 'Carga por lotes, no estacionario, volumen cerrado',
    residenceTimeExample: '1 a 4 horas por ciclo',
    industrialApplications: 'Química fina, fármacos, fermentaciones biológicas y resinas epóxicas',
    designEquation: 't = N_A0 ∫ (dX / -r_A · V)',
    advantages: [
      'Alta flexibilidad para múltiples productos en la misma instalación',
      'Elevada conversión por lote al prolongar el tiempo de reacción',
      'Menor costo inicial de bombeo continuo',
    ],
    limitations: [
      'Tiempos muertos por carga, descarga, limpieza y esterilización',
      'Mayor costo de mano de obra por tonelada producida',
    ],
    topicTitle: 'Diseño de Reactores Batch: Cinética No Estacionaria y Optimización del Tiempo de Ciclo',
    defaultResources: [
      {
        id: 'res-batch-1',
        title: 'Batch-to-Continuous Transitions in Pharmaceutical and Fine Chemical Synthesis',
        description: 'Artículo en Organic Process Research & Development (ACS) que modela cinéticas complejas por lotes y las ventajas térmicas de cambiar a procesos continuos.',
        url: 'https://pubs.acs.org/journal/oprdfk',
        type: 'articulo',
        sourceName: 'ACS Publications',
        verified: true,
      },
      {
        id: 'res-batch-2',
        title: 'Batch Reactor Mass and Energy Balances: Runaway Reaction Prevention',
        description: 'Conferencia técnica de AIChE CCPS que analiza la acumulación de calor exotérmico en reactores por lotes y diseño de sistemas de alivio de emergencia.',
        url: 'https://www.aiche.org/ccps',
        type: 'video',
        sourceName: 'AIChE Safety Academy',
        verified: true,
      },
      {
        id: 'res-batch-3',
        title: 'Industrial Automation and Process Analytical Technology (PAT) in Batch Processing',
        description: 'Noticia técnica en Chemical Processing sobre la incorporación de sondas Raman e IR in-situ para monitorear el avance de reacción en tiempo real sin muestreo manual.',
        url: 'https://www.chemicalprocessing.com',
        type: 'industrial',
        sourceName: 'Chemical Processing',
        verified: true,
      },
    ],
  },
  {
    id: 'cstr',
    name: 'Reactor Continuo de Tanque Agitado (CSTR)',
    shortCode: 'CSTR',
    accentColor: 'emerald',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500',
    textColor: 'text-emerald-400',
    gradient: 'from-emerald-500 to-teal-600',
    iconName: 'RotateCw',
    modeOfOperation: 'Flujo continuo con mezcla perfecta uniforme',
    residenceTimeExample: '2.5 horas (promedio espacial)',
    industrialApplications: 'Polimerización en solución, tratamiento de aguas, neutralizaciones ácidas',
    designEquation: 'V = (F_A0 · X_A) / -r_A(salida)',
    advantages: [
      'Excelente control de temperatura debido a la intensa agitación y chaqueta',
      'Operación en estado estacionario y fácil automatización',
      'Menores costos de mano de obra para producción a gran escala',
    ],
    limitations: [
      'Menor velocidad de reacción (opera a la concentración más baja de salida)',
      'Requiere mayor volumen que un PFR para la misma conversión',
    ],
    topicTitle: 'Diseño de Reactores CSTR: Balance Molar Algebraico, Trenes en Serie y Control Térmico',
    defaultResources: [
      {
        id: 'res-cstr-1',
        title: 'Nonlinear Dynamics and Multiplicity in Continuously Stirred Tank Reactors (CSTR)',
        description: 'Publicación en Chemical Engineering Science que investiga puntos de ignición y extinción térmica en reactores CSTR exotérmicos con chaqueta refrigerada.',
        url: 'https://www.sciencedirect.com/journal/chemical-engineering-science',
        type: 'articulo',
        sourceName: 'Chemical Engineering Science',
        verified: true,
      },
      {
        id: 'res-cstr-2',
        title: 'Series of CSTRs: Sizing Optimization and Graphical Levenspiel Plots',
        description: 'Video didáctico interactivo de LearnChemE comparando el volumen total de N reactores CSTR en serie aproximándose al comportamiento de flujo pistón.',
        url: 'https://www.youtube.com/user/LearnChemE',
        type: 'video',
        sourceName: 'LearnChemE',
        verified: true,
      },
      {
        id: 'res-cstr-3',
        title: 'Advanced Control and Stirring Impeller Optimization in Industrial CSTR Units',
        description: 'Reporte en Chemical & Engineering News (C&EN) sobre nuevos diseños de turbinas Rushton e impulsores hydrofoil para dispersión gas-líquido eficiente.',
        url: 'https://cen.acs.org',
        type: 'industrial',
        sourceName: 'C&EN News',
        verified: true,
      },
    ],
  },
  {
    id: 'pfr',
    name: 'Reactor Tubular de Flujo Pistón (PFR)',
    shortCode: 'PFR',
    accentColor: 'cyan',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500',
    textColor: 'text-cyan-400',
    gradient: 'from-cyan-500 to-blue-600',
    iconName: 'ArrowRightCircle',
    modeOfOperation: 'Flujo continuo en tapón, sin mezcla axial, gradiente continuo',
    residenceTimeExample: '3.10 minutos (alta velocidad espacial)',
    industrialApplications: 'Craqueo térmico de hidrocarburos, síntesis de amoníaco, etileno y ácido nítrico',
    designEquation: 'V = F_A0 ∫ (dX / -r_A)',
    advantages: [
      'Máxima velocidad de reacción media y mínimo volumen para cinética de orden n > 0',
      'Alto rendimiento por unidad de volumen y alta selectividad',
      'Bajo mantenimiento mecánico por carecer de piezas móviles internas',
    ],
    limitations: [
      'Dificultad para controlar puntos calientes (hot-spots) en reacciones exotérmicas rápidas',
      'Gradientes térmicos radiales si el diámetro del tubo es grande',
    ],
    topicTitle: 'Diseño de Reactores PFR: Perfiles Axiales de Temperatura, Presión y Conversión',
    defaultResources: [
      {
        id: 'res-pfr-1',
        title: 'Axial Dispersion and Thermal Gradients in Plug Flow Tubular Reactors',
        description: 'Artículo en Industrial & Engineering Chemistry Research que analiza los criterios de Mears y Wehner-Wilhelm para validar la hipótesis de flujo pistón ideal en reactores tubulares.',
        url: 'https://pubs.acs.org/journal/iecred',
        type: 'articulo',
        sourceName: 'ACS Ind. Eng. Chem. Res.',
        verified: true,
      },
      {
        id: 'res-pfr-2',
        title: 'Pressure Drop and Gas-Phase Expansion in Plug Flow Reactors (PFR)',
        description: 'Demostración paso a paso en video resolviendo el acoplamiento de la ley de gases ideales con la caída de presión en reactores tubulares con cambio de número de moles.',
        url: 'https://www.youtube.com/user/LearnChemE',
        type: 'video',
        sourceName: 'LearnChemE Academy',
        verified: true,
      },
      {
        id: 'res-pfr-3',
        title: 'Modern Pyrolysis and Cracking Furnaces: Tubular Reactor Efficiency in Ethylene Plants',
        description: 'Estudio de caso en Hydrocarbon Processing documentando aleaciones avanzadas de cromo-níquel que reducen la coquización en tubos radiantes de reactores de pirólisis.',
        url: 'https://www.hydrocarbonprocessing.com',
        type: 'industrial',
        sourceName: 'Hydrocarbon Processing',
        verified: true,
      },
    ],
  },
  {
    id: 'pbr',
    name: 'Reactor de Lecho Empacado / Catalítico (PBR)',
    shortCode: 'PBR',
    accentColor: 'purple',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500',
    textColor: 'text-purple-400',
    gradient: 'from-purple-500 to-indigo-600',
    iconName: 'Boxes',
    modeOfOperation: 'Flujo continuo a través de un lecho fijo de catalizador sólido',
    residenceTimeExample: 'Segundos a minutos (W/F_A0 masa de catalizador)',
    industrialApplications: 'Reformado catalítico, síntesis Fischer-Tropsch, desulfurización HDS y metanación',
    designEquation: 'W = F_A0 ∫ (dX / -r_A\') con dP/dz (Ergun)',
    advantages: [
      'Facilita reacciones heterogéneas gas-sólido a escala masiva',
      'Gran superficie interfacial proporcionada por partículas porosas',
      'Tecnología estándar y probada para la industria petroquímica y energética',
    ],
    limitations: [
      'Caída de presión significativa gobernada por la ecuación de Ergun',
      'Canalización preferencial (channeling) y desactivación por venenos o coque',
    ],
    topicTitle: 'Diseño de Reactores PBR: Catálisis Heterogénea, Ecuación de Ergun y Desactivación',
    defaultResources: [
      {
        id: 'res-pbr-1',
        title: 'Coupling Ergun Equation with Intraparticle Diffusion in Packed-Bed Catalytic Reactors',
        description: 'Artículo en Nature Chemical Engineering sobre la optimización del diámetro de pellets catalíticos y estructuración de monolitos para suprimir caídas de presión excesivas.',
        url: 'https://www.nature.com',
        type: 'articulo',
        sourceName: 'Nature Chemical Engineering',
        verified: true,
      },
      {
        id: 'res-pbr-2',
        title: 'Packed Bed Catalytic Reactor Sizing: Catalyst Weight and Pressure Drop (LearnChemE)',
        description: 'Video técnico audiovisual que deduce la integración simultánea de la ecuación diferencial de Ergun con la ley de velocidad catalítica referenciada a la masa W de catalizador.',
        url: 'https://www.youtube.com/user/LearnChemE',
        type: 'video',
        sourceName: 'LearnChemE / Univ. Colorado',
        verified: true,
      },
      {
        id: 'res-pbr-3',
        title: 'Catalyst Regeneration and In-situ Decoking in Industrial Fixed-Bed Hydrotreaters',
        description: 'Reporte técnico en ICIS News sobre el ciclo de vida de catalizadores Ni-Mo y Co-Mo y la reducción de paradas de planta mediante regeneración controlada por vapor/aire.',
        url: 'https://www.icis.com',
        type: 'industrial',
        sourceName: 'ICIS Chemical News',
        verified: true,
      },
    ],
  },
];
