
import React from 'react';
import { Module, ContentBlock } from '../types';
import { LabRenderer } from './InteractiveLabs';
import ReactMarkdown from 'react-markdown';

interface ModuleViewProps {
  module: Module;
}

const BlockRenderer: React.FC<{ block: ContentBlock }> = ({ block }) => {
  switch (block.type) {
    case 'text':
      // text-gray-700: text color (light gray)
      // leading-relaxed: line height spacing (more vertical space between lines)
      // text-lg: font size (large)
      // my-6: vertical margin (spacing above and below)
      return <p className="text-gray-700 leading-relaxed text-lg my-6">{block.content}</p>;
    case 'video':
      return (
        <div className="my-8 aspect-video w-full rounded-2xl overflow-hidden shadow-xl border border-gray-200">
          <iframe
            className="w-full h-full"
            src={block.content}
            title="Video Content"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
    // case 'lab':
    //   return (
    //     <div className="my-8">
    //       {block.title && <h3 className="text-xl font-bold mb-4 text-gray-800">{block.title}</h3>}
    //       <LabRenderer labId={block.content} />
    //     </div>
    //   );
    case 'note':
      return (
        <div className="my-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💡</span>
            <span className="font-bold text-yellow-800">Pro Tip</span>
          </div>
          <p className="text-yellow-900">{block.content}</p>
        </div>
      );

    case 'image':
      // local images stored in public/images are copied to dist at build time
      // the `content` field should be the filename (e.g. "diagram.png").
      if (block.metadata?.format === 'no-shadow') {
        return (
          <div className="my-8 max-w-3xl">
            {/* max-w-full: prevent the image from exceeding its container width */}
            {/* rounded-2xl: apply large rounded corners to the image */}
            {/* shadow-xl: add an extra-large box shadow for visual depth */}
            <img
              className="rounded-2xl"
              src={`/images/${block.content}`}
              alt={block.metadata?.alt || ''}
            />
          </div>
        );
      }
      else {
        return (
          <div className="my-8 max-w-3xl">
            {/* max-w-full: prevent the image from exceeding its container width */}
            {/* rounded-2xl: apply large rounded corners to the image */}
            {/* shadow-xl: add an extra-large box shadow for visual depth */}
            <img
              className="rounded-2xl shadow-xl"
              src={`/images/${block.content}`}
              alt={block.metadata?.alt || ''}
            />
          </div>
        );
      }
      

    case 'webimage':
      return (
        <div className="my-8">
          {/* max-w-full: prevent the image from exceeding its container width */}
          {/* rounded-2xl: apply large rounded corners to the image */}
          {/* shadow-xl: add an extra-large box shadow for visual depth */}
          <img
            className="max-w-full rounded-2x1 shadow-x2"
            src={block.content}
            alt={block.metadata?.alt || ''}
          />
        </div>
      );

    case 'markdown':
      return (
        <div className="my-6 text-gray-700 leading-relaxed">
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-6 mb-4" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-5 mb-3" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
              p: ({ node, ...props }) => <p className="text-gray-700 text-lg my-3" {...props} />,
              a: ({ node, ...props }) => <a className="text-blue-600 text-lg underline hover:text-blue-800" {...props} />,
              ul: ({ node, ...props }) => <ul className="text-lg list-disc list-inside my-3" {...props} />,
              ol: ({ node, ...props }) => <ol className="text-lg list-decimal list-inside my-3" {...props} />,
              li: ({ node, ...props }) => <li className="text-lg my-1" {...props} />,
              code: ({ node, ...props }) => <code className="text-lg bg-gray-100 px-2 py-1 rounded text-sm font-mono" {...props} />,
              strong: ({ node, ...props }) => <strong className="text-lg font-bold" {...props} />,
            }}
          >
            {block.content}
          </ReactMarkdown>
        </div>
      );


    case 'markdownfile':
      const [mdContent, setMdContent] = React.useState<string>('');
  
      React.useEffect(() => {
        import(`../markdownfiles/${block.content}.md?raw`).then(module => {
          setMdContent(module.default);
        });
      }, [block.content]);
      
      return (
        <div className="my-6 text-gray-700 leading-relaxed">
          <ReactMarkdown components={{
              h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-6 mb-4" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-5 mb-3" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
              p: ({ node, ...props }) => <p className="text-gray-700 text-lg my-3" {...props} />,
              a: ({ node, ...props }) => <a className="text-blue-600 text-lg underline hover:text-blue-800" {...props} />,
              ul: ({ node, ...props }) => <ul className="text-lg list-disc list-inside my-3" {...props} />,
              ol: ({ node, ...props }) => <ol className="text-lg list-decimal list-inside my-3" {...props} />,
              li: ({ node, ...props }) => <li className="text-lg my-1" {...props} />,
              code: ({ node, ...props }) => <code className="text-lg bg-gray-100 px-2 py-1 rounded text-sm font-mono" {...props} />,
              strong: ({ node, ...props }) => <strong className="text-lg font-bold" {...props} />,
            }}
            >
            {mdContent}
          </ReactMarkdown>
        </div>
      );

    default:
      return null;
  }
};

export const ModuleView: React.FC<ModuleViewProps> = ({ module }) => {
  return (
    <div className="max-w-full mx-auto px-2 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    {/* <div className="max-w-4xl mx-auto py-8 animate-in fade-in slide-in-from-bottom-4 duration-500"> */}
      <div className="mb-10">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4">{module.title}</h2>
        <p className="text-xl text-slate-500">{module.description}</p>
      </div>

      <div className="space-y-4">
        {module.blocks.length > 0 ? (
          module.blocks.map((block) => <BlockRenderer key={block.id} block={block} />)
        ) : (
          <div className="p-12 text-center bg-slate-100 rounded-3xl border-2 border-dashed border-slate-300">
            <span className="text-4xl mb-4 block">🚧</span>
            <h3 className="text-xl font-semibold text-slate-600">Module Under Construction</h3>
            <p className="text-slate-400 mt-2">Check back soon for high-quality learning content.</p>
          </div>
        )}
      </div>
    </div>
  );
};
