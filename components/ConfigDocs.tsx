import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from './Icon';

const configSections = [
  {
    title: "Colors",
    icon: "palette",
    desc: "Define your brand palette. The engine generates CSS variables for primary, secondary, text, and accents.",
    fields: ["primary", "secondary", "background", "textMain"]
  },
  {
    title: "Format",
    icon: "ruler",
    desc: "Control dimensions. Toggle between A5 and A6 paper sizes with orientation shifts.",
    fields: ["active", "orientation", "width", "height"]
  },
  {
    title: "Layout",
    icon: "layout",
    desc: "Panel orchestration. Choose 2 (Simple), 4 (2-fold), or 6 (3-fold) panels.",
    fields: ["active", "options", "panels"]
  },
  {
    title: "Panels",
    icon: "pencil",
    desc: "Content injection. AI-ready fields for role, heading, subheading, and rich HTML body.",
    fields: ["role", "heading", "body", "footer"]
  }
];

export const ConfigDocs: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4 border-b border-white/5 pb-4">
        <Icon name="settings" size={24} color="%233b82f6" />
        <h3 className="text-2xl font-bold text-white tracking-tight">Configuration Reference</h3>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {configSections.map((sec, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-2 text-white font-bold mb-3 uppercase text-xs tracking-widest">
              <Icon name={sec.icon} size={14} />
              {sec.title}
            </div>
            <p className="text-sm text-zinc-500 mb-4 leading-relaxed">{sec.desc}</p>
            <div className="flex flex-wrap gap-2">
              {sec.fields.map(f => (
                <span key={f} className="px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-[10px] font-mono text-zinc-400">
                  {f}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};