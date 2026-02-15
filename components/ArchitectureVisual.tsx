import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from './Icon';

export const ArchitectureVisual: React.FC = () => {
  const steps = [
    { name: "flyer-config.json", icon: "settings", type: "Input" },
    { name: "template-engine.js", icon: "binary", type: "Logic" },
    { name: "template.html", icon: "code", type: "Shell" },
    { name: "Physical Output", icon: "printer", type: "Print" }
  ];

  return (
    <div className="relative py-12">
      <div className="hidden md:flex items-center justify-between px-12 relative z-10">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col items-center text-center gap-4 w-48"
            >
              <div className="w-16 h-16 rounded-full glass-card border-white/10 flex items-center justify-center relative shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                <Icon name={step.icon} size={28} color={i === 0 ? "%233b82f6" : i === 3 ? "%2310b981" : "%23ffffff"} />
                <div className="absolute -top-2 -right-2 bg-zinc-800 text-[8px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded border border-white/5">
                  {step.type}
                </div>
              </div>
              <div>
                <div className="text-white font-mono text-sm mb-1">{step.name}</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-tighter">Step {i + 1}</div>
              </div>
            </motion.div>
            
            {i < steps.length - 1 && (
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                whileInView={{ opacity: 1, width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 + 0.1, duration: 0.5 }}
                className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent mx-4"
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile Stack */}
      <div className="flex md:hidden flex-col gap-12 items-center">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-3">
             <div className="w-16 h-16 rounded-full glass-card border-white/10 flex items-center justify-center relative">
                <Icon name={step.icon} size={28} />
             </div>
             <div className="text-white font-mono text-sm">{step.name}</div>
             {i < steps.length - 1 && <Icon name="arrow-narrow-down" className="mt-4 opacity-30" />}
          </div>
        ))}
      </div>
    </div>
  );
};