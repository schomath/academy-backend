
import React from 'react';
import { Course, Module } from '../types';
import { ModuleView } from './ModuleView';
import { useInView } from '../hooks/useInView';

interface CourseLandingProps {
  course: Course;
  currentModuleId: string | null;
  onSelectModule: (id: string) => void;
  onBack: () => void;
}

export const CourseLanding: React.FC<CourseLandingProps> = ({ course, currentModuleId, onSelectModule, onBack }) => {
  const activeModule = course.modules.find(m => m.id === currentModuleId);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Header */}
      {/* - Note, height is based on `py` and `gap` */}
      <div className="bg-slate-900 text-white py-6 px-6 sticky top-0 z-10 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors group"
              title="Back to Courses"
            >
              <span className="block transform group-hover:-translate-x-1 transition-transform">⬅️</span>
            </button>
            <div>
              <div className="flex items-center gap-3 mb-1 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                <span className="text-2xl">{course.emoji}</span>
                <span className="text-slate-400 uppercase tracking-widest text-xs font-bold">Course</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black hover:text-slate-100 transition-colors" style={{ animationDelay: '0.2s' }}>{course.title}</h1>
            </div>
          </div>
          {/* <div className="hidden lg:flex items-center gap-4 bg-slate-800 p-2 rounded-2xl">
             <div className="px-4 py-2 bg-slate-700 rounded-xl text-sm font-bold flex items-center gap-2">
               <span>📊</span> Progress: 0%
             </div>
             <div className="px-4 py-2 hover:bg-slate-700 cursor-pointer rounded-xl text-sm font-bold flex items-center gap-2 transition-colors">
               <span>📁</span> Materials
             </div>
          </div> */}
        </div>
      </div>

      <div className="max-w-10xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
        {/* Module Sidebar */}
        <aside className="w-full lg:w-80 flex-shrink-0 animate-slideInLeft">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Course Syllabus</h3>
          <div className="space-y-2">
            {course.modules.length > 0 ? (
              course.modules.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => onSelectModule(m.id)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-300 border-2 active:scale-95 hover:shadow-md ${
                    currentModuleId === m.id 
                      ? 'border-indigo-600 bg-indigo-50 shadow-sm animate-scaleIn'
                      : 'border-transparent hover:bg-slate-50 text-slate-600 hover:border-slate-200'
                  }`}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="flex items-start gap-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      currentModuleId === m.id ? 'bg-indigo-600 text-white scale-110' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {idx + 1}
                    </span>
                    <div>
                      <div className={`font-bold transition-colors ${currentModuleId === m.id ? 'text-indigo-900' : 'text-slate-900'}`}>{m.title}</div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{m.description}</p>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <p className="text-sm text-slate-400 italic">No modules published yet.</p>
            )}
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-grow min-h-[60vh] animate-slideInRight">
          {activeModule ? (
            <ModuleView module={activeModule} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-20">
              <div className="text-7xl animate-bounce">🔭</div>
              <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-3xl font-bold text-slate-900 hover:text-slate-700 transition-colors">Welcome to {course.title}</h2>
                <p className="text-slate-500 mt-2 max-w-md mx-auto hover:text-slate-600 transition-colors">{course.description}</p>
              </div>
              <p className="text-indigo-600 font-bold animate-pulse">Select a module from the sidebar to begin learning.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
