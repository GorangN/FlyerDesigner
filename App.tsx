import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EfficiencyChart } from './components/EfficiencyChart';
import { BentoGrid } from './components/BentoGrid';
import { Terminal } from './components/Terminal';
import { ArchitectureVisual } from './components/ArchitectureVisual';
import { ConfigDocs } from './components/ConfigDocs';
import { Footer } from './components/Footer';
import { Documentation } from './components/Documentation';

const App: React.FC = () => {
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  // Prevent body scroll when docs are open
  useEffect(() => {
    if (isDocsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isDocsOpen]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-400 selection:bg-white selection:text-black relative overflow-x-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[100%] md:w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[100%] md:w-[50%] h-[50%] rounded-full bg-violet-900/10 blur-[120px]"></div>
      </div>

      <Header onOpenDocs={() => setIsDocsOpen(true)} />
      
      <main>
        <Hero onOpenDocs={() => setIsDocsOpen(true)} />
        
        <section id="efficiency" className="py-20 md:py-32 px-6 bg-zinc-950/50 border-y border-white/5">
          <EfficiencyChart />
        </section>

        <section id="features" className="py-20 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tight mb-4">Core Capabilities</h2>
              <p className="text-zinc-500 max-w-2xl mx-auto">Everything you need to move from raw data to physical media in seconds.</p>
            </div>
            <BentoGrid />
          </div>
        </section>

        <section id="workflow" className="py-20 md:py-32 px-6 bg-zinc-900/20">
          <div className="max-w-7xl mx-auto space-y-32">
            <div className="text-center">
              <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tight mb-4">Architecture & Workflow</h2>
              <p className="text-zinc-500">A logic-first pipeline designed for automation and consistency.</p>
            </div>
            
            <ArchitectureVisual />
            
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <Terminal />
              <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/5">
                <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                  Project Structure
                </h3>
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-blue-400">flyer-config.json</span>
                    <span className="text-zinc-500 text-right">Design settings & content</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-blue-400">template.html</span>
                    <span className="text-zinc-500 text-right">HTML shell with Tailwind</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-blue-400">template-engine.js</span>
                    <span className="text-zinc-500 text-right">Dynamic DOM builder</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-blue-400">styles.css</span>
                    <span className="text-zinc-500 text-right">Print-specific CSS</span>
                  </div>
                </div>
              </div>
            </div>

            <ConfigDocs />
          </div>
        </section>
      </main>
      
      <Footer onOpenDocs={() => setIsDocsOpen(true)} />

      <AnimatePresence>
        {isDocsOpen && (
          <Documentation onClose={() => setIsDocsOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;