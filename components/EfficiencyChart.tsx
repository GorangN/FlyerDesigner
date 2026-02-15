import React from 'react';
import { motion } from 'framer-motion';

export const EfficiencyChart: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-white text-3xl font-bold tracking-tight mb-4">Stop fighting layout engines.</h2>
        <p className="text-zinc-500">Declare your intent, we handle the CMYK, bleeds, and DPI.</p>
      </motion.div>
      
      <div className="space-y-8 glass-card p-8 md:p-12 rounded-2xl relative overflow-hidden">
        {/* Item 1 */}
        <div className="relative z-10">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-medium text-zinc-300">Manual Design Tools (Figma/Illustrator)</span>
            <span className="text-xs text-zinc-500">2 Hours</span>
          </div>
          <div className="h-2.5 w-full bg-zinc-900 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '15%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-red-500/60 rounded-full"
            />
          </div>
        </div>

        {/* Item 2 */}
        <div className="relative z-10">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-medium text-white flex items-center gap-2">
              FlyerDesigner
              <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded uppercase tracking-widest font-bold">Recommended</span>
            </span>
            <span className="text-xs text-indigo-400 font-bold">2 Minutes</span>
          </div>
          <div className="h-3 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              className="h-full bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.3)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};