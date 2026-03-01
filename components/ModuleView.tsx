import React from 'react';
import { Module, ContentBlock } from '../types';
import { LabRenderer } from './InteractiveLabs';
import ReactMarkdown from 'react-markdown';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { useInView } from '../hooks/useInView';

interface ModuleViewProps {
  module: Module;
}

// Wrapper component to add scroll animation to blocks
const AnimatedBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ref, isInView] = useInView();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isInView ? 'animate-fadeInUp opacity-100' : 'opacity-0 translate-y-5'
      }`}
    >
      {children}
    </div>
  );
};

const BlockRenderer: React.FC<{ block: ContentBlock }> = ({ block }) => {
  switch (block.type) {
    case 'text':
      return (
        <AnimatedBlock>
          <p className="text-gray-700 leading-relaxed text-lg my-6 hover:text-gray-900 transition-all duration-300">{block.content}</p>
        </AnimatedBlock>
      );
    case 'video':
      return (
        <AnimatedBlock>
          <div className="my-8 aspect-video w-full rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            <iframe
              className="w-full h-full"
              src={block.content}
              title="Video Content"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </AnimatedBlock>
      );
    case 'note':
      return (
        <AnimatedBlock>
          <div className="my-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg hover:shadow-md hover:bg-yellow-100 transition-all duration-300 cursor-default">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">💡</span>
              <span className="font-bold text-yellow-800">Pro Tip</span>
            </div>
            <p className="text-yellow-900">{block.content}</p>
          </div>
        </AnimatedBlock>
      );

    case 'dropdown':
      const nestedBlocks =
        Array.isArray(block.children)
          ? block.children
          : Array.isArray(block.metadata?.blocks)
            ? block.metadata.blocks
            : [];

      return (
        <AnimatedBlock>
          <details className="my-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:shadow-md transition-all duration-300 group cursor-pointer">
            <summary className="cursor-pointer text-lg font-semibold text-slate-800 marker:text-slate-500 group-hover:text-slate-900 transition-all duration-300">
              {block.title || block.content || 'Expand'}
            </summary>
            <div className="mt-4 space-y-4 pl-2 border-l-2 border-slate-200 animate-fadeIn">
              {nestedBlocks.length > 0 ? (
                nestedBlocks.map((childBlock: ContentBlock) => <BlockRenderer key={childBlock.id} block={childBlock} />)
              ) : (
                <p className="text-slate-500">No dropdown content available.</p>
              )}
            </div>
          </details>
        </AnimatedBlock>
      );

    case 'latex': {
      const html = katex.renderToString(block.content, {
        throwOnError: false,
        displayMode: Boolean(block.metadata?.displayMode),
        output: 'html',
      });

      return (
        <AnimatedBlock>
          <div className="my-6 overflow-x-auto rounded-xl bg-white p-4 border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all duration-300">
            <div className="flex justify-center text-slate-900 [&_.katex]:text-3xl" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </AnimatedBlock>
      );
    }

    case 'image':
      if (block.metadata?.format === 'no-shadow') {
        return (
          <AnimatedBlock>
            <div className="my-8 max-w-3xl">
              <img
                className="rounded-2xl"
                src={`./images/${block.content}`}
                alt={block.metadata?.alt || ''}
              />
            </div>
          </AnimatedBlock>
        );
      }
      else {
        return (
          <AnimatedBlock>
            <div className="my-8 max-w-3xl">
              <img
                className="rounded-2xl shadow-xl"
                src={`./images/${block.content}`}
                alt={block.metadata?.alt || ''}
              />
            </div>
          </AnimatedBlock>
        );
      }

    case 'webimage':
      return (
        <AnimatedBlock>
          <div className="my-8">
            <img
              className="max-w-full rounded-2xl shadow-xl"
              src={block.content}
              alt={block.metadata?.alt || ''}
            />
          </div>
        </AnimatedBlock>
      );

    case 'markdown':
      return (
        <AnimatedBlock>
          <div className="my-6 text-gray-700 leading-relaxed">
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-6 mb-4 hover:text-gray-900 transition-colors" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-5 mb-3 hover:text-gray-900 transition-colors" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-4 mb-2 hover:text-gray-900 transition-colors" {...props} />,
                p: ({ node, ...props }) => <p className="text-gray-700 text-lg my-3 hover:text-gray-900 transition-colors" {...props} />,
                a: ({ node, ...props }) => <a className="text-blue-600 text-lg underline hover:text-blue-800 hover:scale-105 transition-all duration-300 inline-block" {...props} />,
                ul: ({ node, ...props }) => <ul className="text-lg list-disc list-inside my-3" {...props} />,
                ol: ({ node, ...props }) => <ol className="text-lg list-decimal list-inside my-3" {...props} />,
                li: ({ node, ...props }) => <li className="text-lg my-1 hover:text-gray-900 transition-colors" {...props} />,
                code: ({ node, ...props }) => <code className="text-lg bg-gray-100 px-2 py-1 rounded text-sm font-mono hover:bg-gray-200 transition-colors" {...props} />,
                strong: ({ node, ...props }) => <strong className="text-lg font-bold" {...props} />,
              }}
            >
              {block.content}
            </ReactMarkdown>
          </div>
        </AnimatedBlock>
      );

    case 'markdownfile':
      const [mdContent, setMdContent] = React.useState<string>('');
  
      React.useEffect(() => {
        import(`../markdownfiles/${block.content}.md?raw`).then(module => {
          setMdContent(module.default);
        });
      }, [block.content]);
      
      return (
        <AnimatedBlock>
          <div className="my-6 text-gray-700 leading-relaxed">
            <ReactMarkdown components={{
                h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-6 mb-4 hover:text-gray-900 transition-colors" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-5 mb-3 hover:text-gray-900 transition-colors" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-4 mb-2 hover:text-gray-900 transition-colors" {...props} />,
                p: ({ node, ...props }) => <p className="text-gray-700 text-lg my-3 hover:text-gray-900 transition-colors" {...props} />,
                a: ({ node, ...props }) => <a className="text-blue-600 text-lg underline hover:text-blue-800 hover:scale-105 transition-all duration-300 inline-block" {...props} />,
                ul: ({ node, ...props }) => <ul className="text-lg list-disc list-inside my-3" {...props} />,
                ol: ({ node, ...props }) => <ol className="text-lg list-decimal list-inside my-3" {...props} />,
                li: ({ node, ...props }) => <li className="text-lg my-1 hover:text-gray-900 transition-colors" {...props} />,
                code: ({ node, ...props }) => <code className="text-lg bg-gray-100 px-2 py-1 rounded text-sm font-mono hover:bg-gray-200 transition-colors" {...props} />,
                strong: ({ node, ...props }) => <strong className="text-lg font-bold" {...props} />,
              }}
              >
              {mdContent}
            </ReactMarkdown>
          </div>
        </AnimatedBlock>
      );

    default:
      return null;
  }
};

export const ModuleView: React.FC<ModuleViewProps> = ({ module }) => {
  return (
    <div className="max-w-full mx-auto px-2 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10 animate-fadeInUp">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4 hover:text-slate-800 transition-colors">{module.title}</h2>
        <p className="text-xl text-slate-500 hover:text-slate-600 transition-colors">{module.description}</p>
      </div>

      <div className="space-y-4">
        {module.blocks.length > 0 ? (
          module.blocks.map((block) => <BlockRenderer key={block.id} block={block} />)
        ) : (
          <AnimatedBlock>
            <div className="p-12 text-center bg-slate-100 rounded-3xl border-2 border-dashed border-slate-300 hover:bg-slate-200 hover:shadow-md transition-all duration-300">
              <span className="text-4xl mb-4 block animate-bounce">🚧</span>
              <h3 className="text-xl font-semibold text-slate-600">Module Under Construction</h3>
              <p className="text-slate-400 mt-2">Check back soon for high-quality learning content.</p>
            </div>
          </AnimatedBlock>
        )}
      </div>
    </div>
  );
};
