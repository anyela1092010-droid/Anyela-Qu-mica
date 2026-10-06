export interface ChemicalResource {
  id: string;
  title: string;
  description: string;
  url: string;
  type?: 'articulo' | 'video' | 'industrial' | 'otro';
  sourceName?: string;
  date?: string;
  verified?: boolean;
}

export interface AcademicGuideResources {
  topic: string;
  rawMarkdown: string;
  resources: ChemicalResource[];
  timestamp: string;
  courseName?: string;
  instructorName?: string;
  academicLevel?: string;
  webSources?: { title: string; uri: string }[];
}

export interface CurriculumTopic {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  defaultResources?: ChemicalResource[];
}

export interface TopicCategory {
  name: string;
  iconName: string;
  color: string;
  topics: CurriculumTopic[];
}
