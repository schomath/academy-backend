
export type ContentBlockType = 'text' | 'webimage' | 'image' | 'video' | 'youtubeplaylist' | 'lab' | 'assignment' | 'note' |  'markdown' | 'markdownfile' | 'dropdown' | 'latex' | 'latextooltip' | 'codetooltip' | 'markdowntooltip' | 'plotly';

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  title?: string;
  content: string; // Text content, video URL, or Lab identifier
  children?: ContentBlock[];
  metadata?: any;
  formatdata?: any;
  childrenBlocks?: ContentBlock[]; // For dropdowns, the nested blocks
}

export interface Module {
  id: string;
  title: string;
  description: string;
  blocks: ContentBlock[];
}

export interface ModuleCategory {
  id: string;
  title: string;
  emoji?: string;
  modules: Module[];
}

export interface Course {
  id: string;
  title: string;
  emoji: string;
  description: string;
  modules: Module[];
  moduleCategories?: ModuleCategory[];
}

export interface Category {
  id: string;
  title: string;
  emoji: string;
  description: string;
  courses: Course[];
  color: string;
}

export interface AppState {
  currentCategoryId: string | null;
  currentCourseId: string | null;
  currentModuleId: string | null;
}
