import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from './Icon';

export const Terminal: React.FC = () => {
  return (
    <div className="w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[#0c0c0e] rounded-xl border border-zinc-800 shadow-2xl overflow-hidden font-mono text-xs md:text-sm"
      >
        <div className="bg-zinc-900/50 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
          </div>
          <span className="text-zinc-600 text-[10px] uppercase tracking-widest flex items-center gap-2">
            <Icon name="terminal-2" size={12} />
            Quick Start
          </span>
          <div className="w-8"></div>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-2"># 1. Clone repository</div>
            <div className="flex gap-3">
              <span className="text-zinc-600 select-none">$</span>
              <div className="flex flex-wrap gap-x-2">
                <span className="text-indigo-400">git clone</span>
                <span className="text-zinc-300">https://github.com/GorangN/FlyerDesigner.git</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-2"># 2. Start designing</div>
            <div className="flex gap-3">
              <span className="text-zinc-600 select-none">$</span>
              <div className="flex gap-x-2">
                <span className="text-indigo-400">cd</span>
                <span className="text-zinc-300">FlyerDesigner</span>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-zinc-600 select-none">$</span>
              <div className="flex gap-x-2">
                <span className="text-emerald-400">npx</span>
                <span className="text-zinc-300">serve .</span>
              </div>
            </div>
          </div>
          
          <div className="pt-4 text-zinc-600 italic text-[11px] md:text-xs">
            # Local server running at http://localhost:3000
          </div>
        </div>
      </motion.div>
    </div>
  );
};