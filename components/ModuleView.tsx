import React from 'react';
import { Module, ContentBlock } from '../types';
import { LabRenderer } from './InteractiveLabs';
import ReactMarkdown from 'react-markdown';
import Plot from 'react-plotly.js';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { useInView } from '../hooks/useInView';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html, Center, Bounds } from '@react-three/drei';

// Pre-register all markdown files so Vite can statically analyze the glob.
// At runtime we look up the specific file by key.
const markdownModules = import.meta.glob('../markdownfiles/*.md', { query: '?raw', import: 'default' }) as Record<string, () => Promise<string>>;

interface ModuleViewProps {
  module: Module;
}

type PlotlyFigure = {
  data?: any[];
  layout?: Record<string, any>;
  frames?: any[];
  config?: Record<string, any>;
};

/**
 * This is a React Functional Component that wraps other content and
 * animates it when it comes into view while scrolling.
 * 
 * COMPONENT DECLARATION:
 * - `const AnimatedBlock` = We're creating a constant variable named AnimatedBlock
 * - `: React.FC<{ children: React.ReactNode }>` = TypeScript type annotation
 *   - React.FC means "React Functional Component"
 *   - <{ children: React.ReactNode }> defines the "props" (properties) this component accepts
 *   - "children" is a special prop that represents any content placed inside this component
 *   - React.ReactNode is a type that means "any valid React content" (text, elements, etc.)
 * 
 * ARROW FUNCTION SYNTAX:
 * - `= ({ children }) =>` is an arrow function (modern JavaScript function syntax)
 * - `({ children })` uses "destructuring" to extract the 'children' prop from the props object
 *   - Instead of writing `(props) => { ... props.children ... }`
 *   - We write `({ children }) => { ... children ... }` - it's a shortcut!
 */
const AnimatedBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  // CUSTOM HOOK - useInView():
  // A "hook" is a special React function that adds functionality to components
  // This hook detects when an element becomes visible on screen
  // 
  // ARRAY DESTRUCTURING:
  // - `const [ref, isInView]` extracts two values from the array returned by useInView()
  // - `ref` = A special reference object we attach to our HTML element to track it
  // - `isInView` = A boolean (true/false) that tells us if the element is visible on screen
  const [ref, isInView] = useInView();

  // RETURN STATEMENT:
  // Returns JSX (JavaScript XML) - looks like HTML but it's actually JavaScript
  // React converts this into real HTML elements in the browser
  return (
    <div
      // REF ATTRIBUTE:
      // Attaches our 'ref' to this div so useInView() can track when it's visible
      // Think of it like putting a tracking device on the element
      ref={ref}
      
      // CLASSNAME (CSS CLASSES):
      // Uses template literals (text inside backticks ` `) to dynamically build CSS classes
      // - `transition-all duration-700` = Always applied - makes changes animate smoothly over 700ms
      // - `${ ... }` = Template literal syntax to insert dynamic JavaScript expressions
      // 
      // TERNARY OPERATOR (conditional expression):
      // - Format: `condition ? valueIfTrue : valueIfFalse`
      // - `isInView ? 'animate-fadeInUp opacity-100' : 'opacity-0 translate-y-5'`
      // - If isInView is TRUE (element is visible): apply fade-in animation and full opacity
      // - If isInView is FALSE (element not visible yet): make it invisible and shifted down
      // 
      // Result: Element starts invisible and down, then animates up and fades in when scrolled into view
      className={`transition-all duration-700 ${
        isInView ? 'animate-fadeInUp opacity-100' : 'opacity-0 translate-y-5'
      }`}
    >
      {/* 
        CHILDREN PROP:
        - {children} renders whatever content is placed inside <AnimatedBlock>...</AnimatedBlock>
        - The curly braces {} mean "evaluate this JavaScript expression"
        - For example, if you write:
          <AnimatedBlock>
            <p>Hello World</p>
          </AnimatedBlock>
        - Then {children} will be replaced with <p>Hello World</p>
        - This makes AnimatedBlock a reusable wrapper for any content!
      */}
      {children}
    </div>
  );
};

/**
 * TooltipWrapper component
 * Displays a tooltip with nested content blocks when hovering over the wrapped content
 */
const TooltipWrapper: React.FC<{ children: React.ReactNode; tooltipBlocks: ContentBlock[]; showUnderline?: boolean }> = ({ children, tooltipBlocks, showUnderline = true }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [tooltipPos, setTooltipPos] = React.useState({ top: 0, left: 0 });
  const triggerRef = React.useRef<HTMLSpanElement>(null);
  const containerRef = React.useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      // Position tooltip above the trigger element, centered horizontally
      setTooltipPos({
        top: rect.top - 10, // Small gap above
        left: rect.left + rect.width / 2, // Center horizontally
      });
    }
    setIsVisible(true);
  };

  return (
    <span 
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span 
        ref={triggerRef}
        className={`cursor-help transition-all duration-200 px-1 ${
          showUnderline 
            ? 'border-b-2 border-dotted border-blue-500 hover:border-blue-700 hover:bg-blue-50' 
            : 'hover:bg-blue-50'
        }`}
      >
        {children}
      </span>
      {isVisible && (
        <div 
          className="fixed animate-fadeIn z-50"
          style={{
            top: `${tooltipPos.top}px`,
            left: `${tooltipPos.left}px`,
            transform: 'translate(-50%, -100%)',
            pointerEvents: 'auto'
          }}
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          <div className="bg-white rounded-lg shadow-2xl border-2 border-blue-200 p-4 overflow-y-auto max-h-96 pointer-events-auto" style={{ width: '320px' }}>
            {tooltipBlocks.map((block) => (
              <BlockRenderer key={block.id} block={block} />
            ))}
          </div>
          {/* Chat bubble pointer arrow */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{
              top: '100%',
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid rgb(229, 231, 235)', // border color
              marginTop: '-2px'
            }}
          />
          <div 
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{
              top: '100%',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid white', // bg color
            }}
          />
        </div>
      )}
    </span>
  );
};

const PlotlyFigureBlock: React.FC<{ block: ContentBlock }> = ({ block }) => {
  const requestedFigure = block.content.trim();
  const normalizedFigure = requestedFigure.endsWith('.json') ? requestedFigure : `${requestedFigure}.json`;
  const [figure, setFigure] = React.useState<PlotlyFigure | null>(null);
  const [loadError, setLoadError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isActive = true;

    setFigure(null);
    setLoadError(null);

    fetch(`./plotly/${normalizedFigure}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        return response.json();
      })
      .then((json: PlotlyFigure) => {
        if (isActive) {
          setFigure(json);
        }
      })
      .catch(() => {
        if (isActive) {
          setLoadError(`Unable to load Plotly figure: ${normalizedFigure}`);
        }
      });

    return () => {
      isActive = false;
    };
  }, [normalizedFigure]);

  if (loadError) {
    return (
      <AnimatedBlock>
        <div className="my-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700">
          {loadError}
        </div>
      </AnimatedBlock>
    );
  }

  if (!figure) {
    return (
      <AnimatedBlock>
        <div className="my-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-600">
          Loading Plotly figure...
        </div>
      </AnimatedBlock>
    );
  }

  if (!Array.isArray(figure.data)) {
    return (
      <AnimatedBlock>
        <div className="my-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700">
          Invalid Plotly figure format: {normalizedFigure}
        </div>
      </AnimatedBlock>
    );
  }

  const requestedHeight = Number(block.metadata?.height);
  const height = Number.isFinite(requestedHeight) && requestedHeight > 0 ? requestedHeight : 700;
  const layout: Record<string, any> = {
    ...(figure.layout || {}),
    autosize: true,
  };

  delete layout.width;
  if (block.metadata?.height) {
    layout.height = height;
  }

  const config: Record<string, any> = {
    ...(figure.config || {}),
    responsive: true,
  };

  if (typeof block.metadata?.showModeBar === 'boolean') {
    config.displayModeBar = block.metadata.showModeBar;
  }

  return (
    <AnimatedBlock>
      <div className="my-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
        {block.title ? (
          <h4 className="mb-4 text-xl font-semibold text-slate-800">{block.title}</h4>
        ) : null}
        <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <Plot
            data={figure.data}
            layout={layout}
            frames={Array.isArray(figure.frames) ? figure.frames : undefined}
            config={config}
            useResizeHandler
            style={{ width: '100%', height: `${height}px`, minWidth: '320px' }}
          />
        </div>
      </div>
    </AnimatedBlock>
  );
};

// ---------------------------------------------------------------------------
// Model3DBlock — renders a .glb file inside a three.js canvas
// ---------------------------------------------------------------------------

// Simple class-based error boundary so a failed model load shows a message
// instead of drei's frowny-face or a white screen.
class Model3DErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

const GLBModel: React.FC<{ url: string }> = ({ url }) => {
  const { scene } = useGLTF(url);
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
};

const Model3DBlock: React.FC<{ block: ContentBlock }> = ({ block }) => {
  const fileName = block.content.trim();
  const modelUrl = `./3dmodels/${fileName}`;
  const height = block.metadata?.height ?? 400;
  const autoRotate = block.metadata?.autoRotate !== false; // default true

  const errorFallback = (
    <div className="flex items-center justify-center h-full text-rose-500 text-sm gap-2">
      <span>⚠️</span>
      <span>Could not load 3D model: <code className="font-mono">{fileName}</code></span>
    </div>
  );

  return (
    <AnimatedBlock>
      <div className="my-8 rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
        {block.title && (
          <div className="px-4 pt-4">
            <h4 className="text-xl font-semibold text-slate-800">{block.title}</h4>
          </div>
        )}
        <div style={{ height: `${height}px` }}>
          <Model3DErrorBoundary fallback={errorFallback}>
            <React.Suspense fallback={
              <div className="flex items-center justify-center h-full text-slate-500">
                Loading 3D model…
              </div>
            }>
              <Canvas camera={{ position: [0, 1.5, 4], fov: 50, near: 0.01 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <Bounds fit clip observe>
                  <GLBModel url={modelUrl} />
                </Bounds>
                <OrbitControls autoRotate={autoRotate} enablePan={false} />
                <Environment preset="city" background={false} />
              </Canvas>
            </React.Suspense>
          </Model3DErrorBoundary>
        </div>
      </div>
    </AnimatedBlock>
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
          <div className="my-8 aspect-video rounded-2xl overflow-hidden shadow-xl border border-gray-200 max-w-xl">
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
    case 'youtubeplaylist':
      return (
        <AnimatedBlock>
          <div className="my-8 aspect-video rounded-2xl overflow-hidden shadow-xl border border-gray-200 max-w-3xl">
            <iframe
              className="w-full h-full"
              src={block.content}
              title={block.title || "YouTube Playlist"}
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

    case 'latextooltip': {
      const parts = block.metadata?.parts || [];
      const displayMode = Boolean(block.metadata?.displayMode);

      return (
        <AnimatedBlock>
          <div className="my-6 rounded-xl bg-white p-6 border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all duration-300">
            <div className="flex justify-center items-baseline text-slate-900 [&_.katex]:text-3xl" style={{ position: 'relative', overflow: 'visible' }}>
              {parts.map((part: any, idx: number) => {
                const partHtml = katex.renderToString(part.expression || '', {
                  throwOnError: false,
                  displayMode: false,
                  output: 'html',
                });
                
                // If this part has tooltip blocks, wrap it
                if (part.blocks && part.blocks.length > 0) {
                  return (
                    <TooltipWrapper key={idx} tooltipBlocks={part.blocks} showUnderline={false}>
                      <span className="inline-flex items-baseline" dangerouslySetInnerHTML={{ __html: partHtml }} />
                    </TooltipWrapper>
                  );
                }
                
                // Otherwise, just render the expression
                return <span key={idx} className="inline-flex items-baseline" dangerouslySetInnerHTML={{ __html: partHtml }} />;
              })}
            </div>
          </div>
        </AnimatedBlock>
      );
    }

    case 'image': {
      const maxWidthClass = block.metadata?.maxWidth || '3xl';
      const shadowClass = block.metadata?.format === 'no-shadow' ? '' : 'shadow-xl';
      
      return (
        <AnimatedBlock>
          <div className={`my-8 max-w-${maxWidthClass}`}>
            <img
              className={`rounded-2xl ${shadowClass}`}
              src={`./images/${block.content}`}
              alt={block.metadata?.alt || ''}
              style={block.metadata?.width ? { maxWidth: block.metadata.width } : undefined}
            />
          </div>
        </AnimatedBlock>
      );
    }

    case 'webimage': {
      const maxWidthClass = block.metadata?.maxWidth || 'full';
      
      return (
        <AnimatedBlock>
          <div className={`my-8 max-w-${maxWidthClass}`}>
            <img
              className="max-w-full rounded-2xl shadow-xl"
              src={block.content}
              alt={block.metadata?.alt || ''}
              style={block.metadata?.width ? { maxWidth: block.metadata.width } : undefined}
            />
          </div>
        </AnimatedBlock>
      );
    }

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

    case 'markdowntooltip': {
      const parts = block.metadata?.parts || [];

      // Helper function to find and wrap tooltip text in any React node tree
      const processNodeForTooltips = (node: React.ReactNode, keyPrefix: string = ''): React.ReactNode => {
        if (parts.length === 0) {
          return node;
        }

        // Handle string nodes - search for tooltip text
        if (typeof node === 'string') {
          return wrapTextWithTooltips(node, keyPrefix);
        }

        // Handle React elements (components like <code>, <em>, etc.)
        if (React.isValidElement(node)) {
          const element = node as React.ReactElement<any>;
          const children = element.props.children;
          
          // Special handling for <code> elements - check if the entire code content matches a tooltip
          if (element.type === 'code' && typeof children === 'string') {
            const matchingPart = parts.find((part: any) => part.text === children);
            if (matchingPart && matchingPart.blocks && matchingPart.blocks.length > 0) {
              return (
                <TooltipWrapper key={keyPrefix} tooltipBlocks={matchingPart.blocks}>
                  {element}
                </TooltipWrapper>
              );
            }
            // Also check if the code content is contained within any tooltip text
            return wrapTextWithTooltips(children, keyPrefix, (text) => 
              React.cloneElement(element, {}, text)
            );
          }

          // For other elements, recursively process their children
          if (children) {
            const processedChildren = React.Children.map(children, (child, idx) => 
              processNodeForTooltips(child, `${keyPrefix}-${idx}`)
            );
            return React.cloneElement(element, {}, processedChildren);
          }
        }

        return node;
      };

      // Helper function to wrap text segments with tooltip wrappers
      const wrapTextWithTooltips = (
        text: string, 
        keyPrefix: string,
        wrapper?: (content: React.ReactNode) => React.ReactNode
      ): React.ReactNode => {
        if (!text || parts.length === 0) {
          return wrapper ? wrapper(text) : text;
        }

        // Find all matches of tooltip text in this string
        const matches: Array<{ start: number; end: number; part: any }> = [];
        
        parts.forEach((part: any) => {
          const partText = part.text || '';
          let searchStart = 0;
          let index;
          
          while ((index = text.indexOf(partText, searchStart)) !== -1) {
            matches.push({
              start: index,
              end: index + partText.length,
              part: part
            });
            searchStart = index + 1;
          }
        });

        // If no matches found, return original text
        if (matches.length === 0) {
          return wrapper ? wrapper(text) : text;
        }

        // Sort matches by start position and remove overlaps
        matches.sort((a, b) => a.start - b.start);
        const nonOverlapping = matches.filter((match, idx) => {
          if (idx === 0) return true;
          return match.start >= matches[idx - 1].end;
        });

        // Build the result with tooltips
        const elements: React.ReactNode[] = [];
        let lastEnd = 0;

        nonOverlapping.forEach((match, idx) => {
          // Add text before this match
          if (match.start > lastEnd) {
            elements.push(text.substring(lastEnd, match.start));
          }

          // Add the tooltip-wrapped text
          const matchText = text.substring(match.start, match.end);
          if (match.part.blocks && match.part.blocks.length > 0) {
            elements.push(
              <TooltipWrapper key={`${keyPrefix}-tooltip-${idx}`} tooltipBlocks={match.part.blocks}>
                <span>{matchText}</span>
              </TooltipWrapper>
            );
          } else {
            elements.push(matchText);
          }

          lastEnd = match.end;
        });

        // Add remaining text
        if (lastEnd < text.length) {
          elements.push(text.substring(lastEnd));
        }

        // If a wrapper function was provided, wrap all elements
        if (wrapper) {
          return wrapper(elements);
        }

        return elements;
      };

      // Custom components for ReactMarkdown that handle tooltips
      const markdownComponents = {
        h1: ({ node, ...props }: any) => <h1 className="text-3xl font-bold mt-6 mb-4 hover:text-gray-900 transition-colors" {...props} />,
        h2: ({ node, ...props }: any) => <h2 className="text-2xl font-bold mt-5 mb-3 hover:text-gray-900 transition-colors" {...props} />,
        h3: ({ node, ...props }: any) => <h3 className="text-xl font-bold mt-4 mb-2 hover:text-gray-900 transition-colors" {...props} />,
        p: ({ node, children, ...props }: any) => (
          <p className="text-gray-700 text-lg my-3 hover:text-gray-900 transition-colors" {...props}>
            {React.Children.map(children, (child, idx) => processNodeForTooltips(child, `p-${idx}`))}
          </p>
        ),
        a: ({ node, ...props }: any) => <a className="text-blue-600 text-lg underline hover:text-blue-800 hover:scale-105 transition-all duration-300 inline-block" {...props} />,
        ul: ({ node, ...props }: any) => <ul className="text-lg list-disc list-inside my-3" {...props} />,
        ol: ({ node, ...props }: any) => <ol className="text-lg list-decimal list-inside my-3" {...props} />,
        li: ({ node, children, ...props }: any) => (
          <li className="text-lg my-1 hover:text-gray-900 transition-colors" {...props}>
            {React.Children.map(children, (child, idx) => processNodeForTooltips(child, `li-${idx}`))}
          </li>
        ),
        code: ({ node, children, ...props }: any) => {
          // Process children for tooltip matching
          const processedChildren = processNodeForTooltips(children, 'code');
          return (
            <code className="text-lg bg-gray-100 px-2 py-1 rounded text-sm font-mono hover:bg-gray-200 transition-colors" {...props}>
              {processedChildren}
            </code>
          );
        },
        strong: ({ node, children, ...props }: any) => (
          <strong className="text-lg font-bold" {...props}>
            {React.Children.map(children, (child, idx) => processNodeForTooltips(child, `strong-${idx}`))}
          </strong>
        ),
        em: ({ node, children, ...props }: any) => (
          <em {...props}>
            {React.Children.map(children, (child, idx) => processNodeForTooltips(child, `em-${idx}`))}
          </em>
        ),
      };

      return (
        <AnimatedBlock>
          <div className="my-6 text-gray-700 leading-relaxed">
            <ReactMarkdown components={markdownComponents}>
              {block.content}
            </ReactMarkdown>
          </div>
        </AnimatedBlock>
      );
    }

    case 'markdownfile': {
      const [mdContent, setMdContent] = React.useState<string>('');
  
      React.useEffect(() => {
        const key = `../markdownfiles/${block.content}.md`;
        const loader = markdownModules[key];
        if (loader) {
          loader().then((content) => setMdContent(content));
        }
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
    }

    case 'codetooltip': {
      const parts = block.metadata?.parts || [];
      const language = block.metadata?.language || '';
      
      // Function to render code with inline tooltips
      const renderCodeWithTooltips = () => {
        if (parts.length === 0) {
          return <code className="text-green-400 font-mono text-lg">{block.content}</code>;
        }

        let remainingCode = block.content;
        const elements: React.ReactNode[] = [];
        
        parts.forEach((part: any, idx: number) => {
          const partText = part.text || '';
          const partIndex = remainingCode.indexOf(partText);
          
          if (partIndex !== -1) {
            // Add text before this part
            if (partIndex > 0) {
              elements.push(
                <span key={`text-${idx}`} className="text-green-400">
                  {remainingCode.substring(0, partIndex)}
                </span>
              );
            }
            
            // Add the hoverable part
            if (part.blocks && part.blocks.length > 0) {
              elements.push(
                <TooltipWrapper key={`tooltip-${idx}`} tooltipBlocks={part.blocks}>
                  <span className="text-yellow-300">{partText}</span>
                </TooltipWrapper>
              );
            } else {
              elements.push(
                <span key={`part-${idx}`} className="text-green-400">{partText}</span>
              );
            }
            
            // Update remaining code
            remainingCode = remainingCode.substring(partIndex + partText.length);
          }
        });
        
        // Add any remaining code
        if (remainingCode.length > 0) {
          elements.push(
            <span key="remaining" className="text-green-400">
              {remainingCode}
            </span>
          );
        }
        
        return <code className="font-mono text-lg">{elements}</code>;
      };

      return (
        <AnimatedBlock>
          <div className="my-6 rounded-xl bg-slate-900 p-6 border border-slate-700 hover:shadow-lg hover:border-slate-600 transition-all duration-300">
            <div style={{ position: 'relative', overflow: 'visible' }}>
              <pre style={{ position: 'relative', overflow: 'visible', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                {renderCodeWithTooltips()}
              </pre>
            </div>
          </div>
        </AnimatedBlock>
      );
    }

    case 'plotly':
      return <PlotlyFigureBlock block={block} />;

    case 'model3d':
      return <Model3DBlock block={block} />;

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
