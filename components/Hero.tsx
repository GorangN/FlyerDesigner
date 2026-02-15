import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';

interface HeroProps {
  onOpenDocs: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDocs }) => {
  /**
   * Animation Steps (Total 11):
   * 0: Action - Title Change
   * 1: Default
   * 2: Action - Format Change (DIN Lang)
   * 3: Default
   * 4: Action - Orientation Change (Landscape)
   * 5: Default
   * 6: Action - Layout Change (2-Fold)
   * 7: Action - Layout Change (3-Fold) (Directly after 2-fold to show layout flexibility)
   * 8: Default
   * 9: Action - Theme Change (Light)
   * 10: Default
   */
  const [activeStep, setActiveStep] = useState(0);

  // Default values
  const defaults = {
    title: 'FlyerDesigner',
    format: 'A5',
    orientation: 'portrait' as const,
    layout: 'simple' as const,
    theme: 'Dark' as const
  };

  // State variables for the current step
  let title: string = defaults.title;
  let format: string = defaults.format;
  let orientation: 'portrait' | 'landscape' = defaults.orientation;
  let layout: 'simple' | '2-fold' | '3-fold' = defaults.layout;
  let theme: 'Dark' | 'Light' = defaults.theme;
  let highlightedLine = -1;

  switch (activeStep) {
    case 0: // Action: Title
      title = 'Summer Sale';
      highlightedLine = 0;
      break;
    case 2: // Action: Format
      format = 'DIN Lang';
      highlightedLine = 1;
      break;
    case 4: // Action: Orientation
      orientation = 'landscape';
      highlightedLine = 2;
      break;
    case 6: // Action: Layout 2-fold
      layout = '2-fold';
      highlightedLine = 3;
      break;
    case 7: // Action: Layout 3-fold
      layout = '3-fold';
      highlightedLine = 3;
      break;
    case 9: // Action: Theme
      theme = 'Light';
      highlightedLine = 4;
      break;
    default: // Steps 1, 3, 5, 8, 10 are resets to Default
      highlightedLine = -1;
      break;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 11);
    }, 1300); 
    return () => clearInterval(interval);
  }, []);

  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    window.print();
  };

  const getLineClass = (lineIdx: number) => 
    `pl-4 py-1 transition-all duration-200 rounded-sm flex items-center gap-2 ${
      highlightedLine === lineIdx 
        ? 'text-white bg-indigo-500/10 border-l-2 border-indigo-500' 
        : 'text-zinc-500 border-l-2 border-transparent'
    }`;

  // Sizing Logic: Ensure same size panels and prevent container shake
  const isDIN = format === 'DIN Lang';
  const isLandscape = orientation === 'landscape';
  
  // Panels are the fundamental unit. Base dimensions for a single panel.
  // We use slightly smaller units to ensure 3-fold fits comfortably at 1:1 if possible
  const panelW = isDIN ? 200 : (isLandscape ? 400 : 280); 
  const panelH = isLandscape ? 280 : (isDIN ? 440 : 400);
  
  const multiplier = layout === '3-fold' ? 3 : (layout === '2-fold' ? 2 : 1);
  const mockupWidth = panelW * multiplier;
  const mockupHeight = panelH;
  
  // Stable scale calculation: 
  // We want to fill the preview area (approx 600px wide) without causing jumps.
  const maxAvailableWidth = 600;
  // If 3 panels * panelW > maxWidth, we scale down the whole group.
  // Otherwise scale is 1 to maintain crispness.
  const currentScale = mockupWidth > maxAvailableWidth ? maxAvailableWidth / mockupWidth : 1;

  return (
    <section className="relative pt-24 md:pt-40 pb-20 px-6 overflow-hidden" id="hero">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-indigo-500/5 blur-[140px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-[10px] font-medium uppercase tracking-widest mb-8 group hover:border-white/20 transition-colors cursor-default">
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Icon name="sparkles" size={14} color="%2371717a" />
            </motion.div>
            AI-Ready Template System
          </div>
          <h1 className="text-5xl md:text-8xl font-extrabold text-white tracking-tighter mb-8 leading-[0.9] md:leading-[0.85]">
            Print-Ready Flyers.<br />
            <span className="text-zinc-600">Powered by JSON.</span>
          </h1>
          <p className="text-base md:text-xl max-w-2xl mx-auto mb-12 text-zinc-400 leading-relaxed font-medium">
            The developer-first approach to print design. Edit one config file, let AI generate the content, and export production-ready PDFs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="https://github.com/GorangN/FlyerDesigner" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-black px-10 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95"
            >
              <Icon name="brand-github" color="%23000000" size={18} />
              Fork on GitHub
            </a>
            <button 
              onClick={onOpenDocs}
              className="border border-white/10 bg-white/5 text-white px-10 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all active:scale-95"
            >
              <Icon name="book" size={18} />
              View Docs
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative grid lg:grid-cols-2 gap-8 items-stretch"
        >
          {/* Code Editor */}
          <div className="glass-card rounded-2xl overflow-hidden shadow-2xl border border-white/5 hidden lg:block flex flex-col min-h-[650px]">
            <div className="bg-zinc-900/80 px-4 py-3 flex items-center gap-2 border-b border-white/5 shrink-0">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/30"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/30"></div>
              </div>
              <span className="text-[10px] text-zinc-500 ml-2 font-mono uppercase tracking-widest">flyer.config.json</span>
            </div>
            <div className="p-10 font-mono text-sm leading-6 overflow-x-auto bg-zinc-950/50 flex-grow flex flex-col justify-center">
              <code className="text-zinc-600">{"{"}</code><br />
              <div className="space-y-0.5 my-2">
                <code className={getLineClass(0)}>
                  "title": <span className="text-emerald-400">"{title}"</span>,
                </code><br />
                <code className={getLineClass(1)}>
                  "format": <span className="text-emerald-400">"{format}"</span>,
                </code><br />
                <code className={getLineClass(2)}>
                  "orientation": <span className="text-emerald-400">"{orientation}"</span>,
                </code><br />
                <code className={getLineClass(3)}>
                  "layout": <span className="text-emerald-400">"{layout}"</span>,
                </code><br />
                <code className={getLineClass(4)}>
                  "theme": <span className="text-indigo-400">"{theme}"</span>,
                </code><br />
                <code className={getLineClass(5)}>
                  "content": {"{"} <span className="text-zinc-700">...</span> {"}"}
                </code>
              </div>
              <code className="text-zinc-600">{"}"}</code>
            </div>
          </div>

          {/* Preview Panel - Fixed Min Height and width container to prevent site shake */}
          <div className="glass-card rounded-2xl overflow-hidden flex flex-col items-center justify-center bg-zinc-900/10 border border-white/5 relative min-h-[650px]">
            <div className="absolute top-6 right-6 flex items-center gap-2 z-50">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <span className="text-emerald-500 text-[10px] uppercase tracking-widest font-black">Live Preview</span>
            </div>

            {/* Stable container for the mockup - width is fixed to grid half, overflow handled inside */}
            <div className="w-full flex-grow flex items-center justify-center p-6 md:p-8 overflow-visible">
              <div className="relative flex items-center justify-center">
                <motion.div 
                  animate={{ 
                    width: mockupWidth,
                    height: mockupHeight,
                    scale: currentScale,
                    backgroundColor: theme === 'Dark' ? '#09090b' : '#ffffff',
                  }}
                  transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                  className="border border-white/10 rounded-sm shadow-[0_60px_100px_rgba(0,0,0,0.8)] relative p-0 flex overflow-hidden group origin-center"
                >
                  {/* Fold Overlays */}
                  <div className="absolute inset-0 pointer-events-none flex z-40">
                    {layout === '2-fold' && (
                      <div className="flex-1 border-r border-dashed border-zinc-500/20" />
                    )}
                    {layout === '3-fold' && (
                      <>
                        <div className="flex-1 border-r border-dashed border-zinc-500/20" />
                        <div className="flex-1 border-r border-dashed border-zinc-500/20" />
                      </>
                    )}
                  </div>
                  
                  <div className="flex w-full h-full">
                    {Array.from({ length: multiplier }).map((_, i) => (
                      <motion.div 
                        key={i}
                        initial={false}
                        animate={{ 
                          // Highlight borders slightly in dark mode
                          borderRight: (i < multiplier - 1) ? `1px solid ${theme === 'Dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` : 'none'
                        }}
                        className="flex-1 h-full p-8 flex flex-col justify-between items-center text-center relative"
                      >
                        <div className={`absolute -top-10 -right-10 w-48 h-48 bg-indigo-500 opacity-[0.02] rounded-full blur-3xl transition-all duration-1000`}></div>
                        
                        <div className="z-10 w-full flex flex-col items-center">
                          {/* Main Branding/Content only on front/last panel or simple layout */}
                          {((layout as string) === 'simple' || i === multiplier - 1) && (
                            <>
                              <motion.div 
                                animate={{ color: theme === 'Dark' ? '#818cf8' : '#4f46e5' }}
                                className="text-[9px] font-black tracking-[0.2em] uppercase mb-8"
                              >
                                {format} • {orientation}
                              </motion.div>
                              
                              <div className="flex items-center justify-center gap-4 mb-8">
                                <Icon name="layout" size={32} color={theme === 'Dark' ? "%23ffffff" : "%23000000"} />
                                <AnimatePresence mode="wait">
                                  <motion.span 
                                    key={title}
                                    initial={{ opacity: 0, y: 3 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -3 }}
                                    className={`font-black text-lg md:text-xl tracking-tighter ${theme === 'Dark' ? 'text-white' : 'text-zinc-950'}`}
                                  >
                                    {title}
                                  </motion.span>
                                </AnimatePresence>
                              </div>
                              <div className="h-1.5 w-12 bg-indigo-500 mb-8"></div>
                            </>
                          )}
                          
                          <div className="space-y-4 w-full px-4">
                            <div className={`h-2.5 w-full rounded-full ${theme === 'Dark' ? 'bg-zinc-900' : 'bg-zinc-100'}`}></div>
                            <div className={`h-2.5 w-5/6 rounded-full mx-auto ${theme === 'Dark' ? 'bg-zinc-900' : 'bg-zinc-100'}`}></div>
                            <div className={`h-2.5 w-4/6 rounded-full mx-auto ${theme === 'Dark' ? 'bg-zinc-900' : 'bg-zinc-100'}`}></div>
                          </div>
                        </div>

                        {((layout as string) === 'simple' || i === multiplier - 1) && (
                          <div className="w-full space-y-6 px-4">
                            <div className={`w-full h-20 rounded-2xl flex items-center justify-center border ${theme === 'Dark' ? 'bg-white/5 border-white/5' : 'bg-zinc-50 border-zinc-100'}`}>
                              <Icon name="code" color={theme === 'Dark' ? "%236366f1" : "%234f46e5"} size={36} className="opacity-60" />
                            </div>
                            <button 
                              onClick={handlePrint}
                              className={`w-full py-3.5 transition-all rounded-xl flex items-center justify-center gap-4 shadow-2xl active:scale-95 ${theme === 'Dark' ? 'bg-white text-black hover:bg-zinc-200' : 'bg-zinc-950 text-white hover:bg-zinc-800'}`}
                            >
                              <span className="font-black text-[10px] uppercase tracking-widest">Generate PDF</span>
                              <Icon name="printer" size={18} color={theme === 'Dark' ? "%23000000" : "%23ffffff"} />
                            </button>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="mt-4 flex flex-col items-center gap-3 shrink-0 pb-10">
              <div className="flex items-center gap-8 text-zinc-600 text-[11px] uppercase tracking-[0.3em] font-bold">
                <span>300 DPI</span>
                <span className="w-1.5 h-1.5 bg-zinc-800 rounded-full"></span>
                <span>CMYK READY</span>
                <span className="w-1.5 h-1.5 bg-zinc-800 rounded-full"></span>
                <span>PDF/X-1A</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
