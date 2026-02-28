
export type ContentBlockType = 'text' | 'video' | 'lab' | 'assignment' | 'note' | 'image' | 'markdown' | 'markdownfile';

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  title?: string;
  content: string; // Text content, video URL, or Lab identifier
  metadata?: any;
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
