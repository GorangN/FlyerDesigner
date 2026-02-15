import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from './Icon';

const features = [
  {
    title: "JSON-Driven Design",
    description: "Colors, fonts, and branding all centralized in one config file. Change one hex code and update 100 panels.",
    icon: "palette",
    className: "md:col-span-2",
    color: "%233b82f6"
  },
  {
    title: "Multiple Formats",
    description: "A5 (148×210mm) and A6 (105×148mm) supported with portrait/landscape toggles.",
    icon: "ruler",
    className: "md:col-span-1",
    color: "%23ffffff"
  },
  {
    title: "Flexible Layouts",
    description: "Switch between Simple, 2-Fold, and 3-Fold arrangements with zero manual adjustment.",
    icon: "file",
    className: "md:col-span-1",
    color: "%23ffffff"
  },
  {
    title: "Print-Ready Output",
    description: "High-DPI CMYK mapping and automatic 3mm bleeds. Pixel-perfect WYSIWYG printing.",
    icon: "printer",
    className: "md:col-span-2",
    color: "%2310b981"
  },
  {
    title: "AI-Native Engine",
    description: "Template placeholders designed for direct injection from LLMs like GPT-4 or Claude.",
    icon: "robot",
    className: "md:col-span-1",
    color: "%23ffffff"
  },
  {
    title: "Spread View",
    description: "Panels displayed side-by-side like a physical sheet, complete with fold line markers.",
    icon: "layout",
    className: "md:col-span-2",
    color: "%238b5cf6"
  }
];

export const BentoGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {features.map((feature, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className={`${feature.className} glass-card p-6 md:p-8 rounded-3xl flex flex-col justify-between group overflow-hidden relative min-h-[220px] md:min-h-[280px] hover:border-white/20 transition-all`}
        >
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform">
              <Icon name={feature.icon} size={24} color={feature.color} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              {feature.description}
            </p>
          </div>
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        </motion.div>
      ))}
    </div>
  );
};