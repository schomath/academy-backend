
// React is the core library for building UI components. We also pull in some
// hooks (useState, useEffect) which let us manage state and side-effects in
// functional components. In this file we primarily use useState.
import React, { useState, useEffect } from 'react';

import './index.css'; // Importing our global CSS file where Tailwind is included

// CATEGORIES is just a constant list of data defined in data.ts. It's the
// source of truth for what categories and courses our app can show.
import { CATEGORIES } from './data';

// These types help TypeScript understand the shape of our data. "Category",
// "Course", and "AppState" describe objects we use throughout the app.
import { Category, Course, AppState } from './types';

// This component renders the full view of a selected course with its modules.
// We show it when the user has drilled down into a course.
import { CourseLanding } from './components/CourseLanding';

// CategoryCard is a reusable component that shows one curriculum category
// (e.g. "AI" or "Mechatronics"). It can be expanded to reveal the courses
// inside that category. We type the props so that TypeScript will catch
// mistakes during development.
const CategoryCard: React.FC<{ 
  category: Category; 
  isExpanded: boolean; 
  onToggle: () => void;
  onSelectCourse: (course: Course) => void;
}> = ({ category, isExpanded, onToggle, onSelectCourse }) => { // destructure
// the props for easier access

  // Maps a category color name to a Tailwind gradient string. We use this
  // when the card is expanded so the header has a nice colored background.
  const colorMap: Record<string, string> = {
    blue: 'from-blue-500 to-indigo-600',
    purple: 'from-purple-500 to-pink-600',
    emerald: 'from-emerald-500 to-teal-600'
  };

  return (
    // outer card wrapper with margin, shadow, and rounded corners
    <div className="mb-6 overflow-hidden bg-white rounded-3xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 active:scale-95">
      {/* clickable header area */}
      <div 
        onClick={onToggle} // toggle expansion when header is clicked
        className={`p-8 cursor-pointer flex items-center justify-between bg-gradient-to-r transition-all duration-500 ${isExpanded ? colorMap[category.color] : 'bg-white hover:bg-slate-50'}`}
      >
        <div className="flex items-center gap-6">
          {/* emoji/icon representing the category */}
          <div className={`text-4xl w-20 h-20 rounded-2xl flex items-center justify-center transition-all transform ${
            isExpanded 
              ? 'bg-white/20 shadow-inner scale-110' 
              : 'bg-slate-100 hover:scale-105 hover:bg-slate-200'
          }`}>
            {category.emoji}
          </div>
          <div>
            {/* title and description change color when expanded */}
            <h2 className={`text-2xl font-black transition-colors ${isExpanded ? 'text-white' : 'text-slate-900 hover:text-slate-700'}`}>{category.title}</h2>
            <p className={`text-sm transition-colors ${isExpanded ? 'text-white/80' : 'text-slate-500 hover:text-slate-600'}`}>{category.description}</p>
          </div>
        </div>
        {/* chevron that rotates when expanded */}
        <div className={`text-2xl transition-all duration-500 transform ${isExpanded ? 'rotate-180 text-white scale-125' : 'text-slate-400 hover:text-slate-600 hover:scale-110'}`}>
          ▼
        </div>
      </div>
      
      {/* show courses only when expanded */}
      {isExpanded && (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeInUp">
          {category.courses.map((course, idx) => (
            // each course is rendered as a button so it can be clicked
            <button
              key={course.id}
              onClick={() => onSelectCourse(course)}
              className="group text-left p-4 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300 active:scale-95 animate-scaleIn hover:shadow-md"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="text-2xl mb-2 group-hover:scale-125 transition-transform duration-300 inline-block">{course.emoji}</div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-700 transition-colors">{course.title}</h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 group-hover:text-slate-600 transition-colors">{course.description}</p>
              {/* simple hover effect for enrollment call to action */}
              <div className="mt-3 flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                Enroll Now ➔
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function App() {
  // "view" holds the current position of the user in our app. We store
  // which category/course/module is selected. Initially nothing is selected
  // (everything is null). setView lets us update this state.
  const [view, setView] = useState<AppState>({
    currentCategoryId: null,
    currentCourseId: null,
    currentModuleId: null
  });

  // This piece of state tracks which category card (if any) is currently
  // expanded to show its courses. We use null to mean "none expanded".
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);

  // Called when the user clicks on a course inside an expanded category.
  // We need to figure out which category the course belongs to (by searching
  // the CATEGORIES array) and then update our view state. We also reset the
  // module selection since we're at the course level now. Finally, scroll to
  // the top of the page so the user sees the course landing view.
  const handleSelectCourse = (course: Course) => {
    setView({
      currentCategoryId: CATEGORIES.find(c => c.courses.some(cs => cs.id === course.id))?.id || null,
      currentCourseId: course.id,
      currentModuleId: null
    });
    window.scrollTo(0, 0);
  };

  // Based on the view state we just computed above, try to look up the
  // matching objects from our static data. These values will be undefined
  // when nothing is selected.
  const currentCategory = CATEGORIES.find(c => c.id === view.currentCategoryId);
  const currentCourse = currentCategory?.courses.find(cs => cs.id === view.currentCourseId);

  // If a course is selected, we render the CourseLanding component and
  // short-circuit the normal homepage view. This makes the component behave
  // like a simple router: show a different screen based on state.
  if (currentCourse) {
    return (
      <CourseLanding 
        course={currentCourse} 
        currentModuleId={view.currentModuleId}
        // when a module is clicked inside the landing view, update state
        onSelectModule={(id) => setView(prev => ({ ...prev, currentModuleId: id }))}
        // back button clears everything and returns to main page
        onBack={() => setView({ currentCategoryId: null, currentCourseId: null, currentModuleId: null })}
      />
    );
  }

  return (
    // The outermost <div> ensures our page takes up at least the full height of
    // the screen and adds bottom padding so content doesn't bump into the
    // footer.
    <div className="min-h-screen pb-20 transition-colors duration-300">
      {/* Hero Section */}
      {/* This header is the first thing users see on the homepage. It includes
          a small label, a big title, and a short description. All styling is
          done with Tailwind utility classes. */}
      <header className="px-6 pt-20 pb-16 max-w-6xl mx-auto text-center">
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 rounded-full border border-indigo-100 animate-slideInLeft">
          Academy landing page
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight animate-fadeInUp hover:text-slate-800 transition-colors" style={{ animationDelay: '0.1s' }}>
          Schoen's STEM Repository
        </h1>
        <p className="mt-8 text-xl text-slate-500 max-w-2xl mx-auto font-medium animate-fadeInUp hover:text-slate-600 transition-colors" style={{ animationDelay: '0.2s' }}>
          Please choose a course from below to get started.
        </p>
      </header>

      {/* Categories Grid */}
      {/* This <main> section lists all the curriculum domains by mapping over the
          CATEGORIES array and rendering a <CategoryCard> for each one. */}
      <main className="max-w-6xl mx-auto px-6">
        <div className="mb-10 flex items-center justify-between animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] hover:text-slate-500 transition-colors">Curriculum Domains</h2>
          {/* Simple visual pager dots, the last one is highlighted */}
          <div className="flex gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-400 transition-colors animate-pulse"></span>
            <span className="w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-400 transition-colors animate-pulse" style={{ animationDelay: '0.1s' }}></span>
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" style={{ animationDelay: '0.2s' }}></span>
          </div>
        </div>
        
        <div className="space-y-4">
          {CATEGORIES.map((category, idx) => (
            // For each category we render a card and pass in props that
            // describe its state and behavior.
            <div key={category.id} className="animate-fadeInUp" style={{ animationDelay: `${(idx + 3) * 0.1}s` }}>
              <CategoryCard
                category={category}
                isExpanded={expandedCategoryId === category.id}
                onToggle={() => setExpandedCategoryId(expandedCategoryId === category.id ? null : category.id)}
                onSelectCourse={handleSelectCourse}
              />
            </div>
          ))}
        </div>
      </main>

      {/* Footer / Stats */}
      {/* The bottom of the page includes some branding and statistics. It's
          mostly static content arranged with Tailwind grid utilities. */}
      {/* <footer className="mt-20 border-t border-slate-200 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
           <div>
              <div className="text-2xl font-black text-slate-900 mb-4">EduSphere<span className="text-indigo-600">.</span></div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Empowering students with hands-on labs and expert-led curriculum in Mechatronics, AI, and Computer Science.
              </p>
           </div>
           <div className="flex justify-around md:justify-start md:gap-12 col-span-2">
              <div>
                <div className="text-3xl font-black text-slate-900">12+</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Courses</div>
              </div>
              <div>
                <div className="text-3xl font-black text-slate-900">500+</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Modules</div>
              </div>
              <div>
                <div className="text-3xl font-black text-slate-900">1k+</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Students</div>
              </div>
           </div>
        </div>
      </footer> */}
    </div>
  );
}
