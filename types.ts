
export type ContentBlockType = 'text' | 'webimage' | 'image' | 'video' | 'lab' | 'assignment' | 'note' |  'markdown' | 'markdownfile' | 'dropdown';

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  title?: string;
  content: string; // Text content, video URL, or Lab identifier
  children?: ContentBlock[];
  metadata?: any;
  formatdata?: any;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  blocks: ContentBlock[];
}

export interface Course {
  id: string;
  title: string;
  emoji: string;
  description: string;
  modules: Module[];
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
