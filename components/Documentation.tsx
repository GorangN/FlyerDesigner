import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from './Icon';

interface DocumentationProps {
  onClose: () => void;
}

export const Documentation: React.FC<DocumentationProps> = ({ onClose }) => {
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col md:flex-row shadow-2xl overflow-hidden"
    >
      {/* Background Dimmer (clickable to close) */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm -z-10"
        onClick={onClose}
      ></div>

      {/* Main Panel */}
      <div className="w-full md:w-[85vw] lg:w-[75vw] xl:w-[65vw] ml-auto h-full bg-zinc-950 border-l border-white/10 flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.5)]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-zinc-900/30 backdrop-blur sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <Icon name="book" size={24} color="%23ffffff" />
            <h2 className="text-white font-bold tracking-tight text-lg">Documentation</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/10"
            aria-label="Close Documentation"
          >
            <Icon name="x" size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-6 md:px-12 py-12 custom-scrollbar">
          <div className="max-w-4xl mx-auto space-y-16 pb-24">
            
            {/* Intro Section */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-zinc-900 rounded-2xl border border-white/10">
                   <Icon name="palette" size={40} color="%2364748B" />
                </div>
                <div>
                   <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter">Flyer Designer</h1>
                   <p className="text-zinc-500 uppercase tracking-widest text-xs font-bold mt-1">AI-Ready Template System</p>
                </div>
              </div>

              <blockquote className="border-l-4 border-indigo-500 bg-indigo-500/5 p-6 rounded-r-2xl italic text-lg text-zinc-300">
                Fork this project and create stunning print flyers powered by AI. Just edit one JSON file — colors, format, layout — and let AI fill in the content.
              </blockquote>

              <div className="flex flex-wrap gap-4 pt-4">
                <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-3 py-1 rounded text-xs font-bold">License: MIT</span>
                <span className="bg-blue-500/10 text-blue-500 border border-blue-500/20 px-3 py-1 rounded text-xs font-bold">Version: 1.0.0</span>
                <span className="bg-zinc-800 text-zinc-400 px-3 py-1 rounded text-xs font-bold flex items-center gap-2">
                  <Icon name="brand-github" size={14} /> github-repo
                </span>
              </div>
            </section>

            <hr className="border-white/5" />

            {/* Features Section */}
            <section className="space-y-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Icon name="sparkles" size={32} color="%2364748B" />
                Features
              </h2>
              <ul className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: "palette", text: "JSON-driven design — Colors, fonts, branding all in one config file" },
                  { icon: "ruler", text: "Multiple formats — A5 (148×210mm) and A6 (105×148mm), portrait or landscape" },
                  { icon: "file", text: "Flexible layouts — Simple greeting card, 2-fold (4 panels), 3-fold (6 panels)" },
                  { icon: "printer", text: "Print-ready — Ctrl+P or click the print button, WYSIWYG output" },
                  { icon: "robot", text: "AI-ready — Empty template with placeholders, designed for AI content injection" },
                  { icon: "layout", text: "Spread view — Panels displayed side-by-side like the physical sheet, with fold lines" },
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 p-4 glass-card rounded-xl border-white/5">
                    <Icon name={item.icon} size={20} color="%2364748B" className="shrink-0" />
                    <span className="text-sm text-zinc-300 leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Quick Start Section */}
            <section className="space-y-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Icon name="rocket" size={32} color="%2364748B" />
                Quick Start
              </h2>
              <div className="bg-black rounded-xl p-6 border border-white/5 font-mono text-sm leading-relaxed overflow-x-auto">
                <div className="text-zinc-600 mb-2"># 1. Fork & clone</div>
                <div className="mb-4">
                  <span className="text-indigo-400">git clone</span> https://github.com/YOUR_USERNAME/FlyerDesigner.git<br />
                  <span className="text-indigo-400">cd</span> FlyerDesigner
                </div>
                <div className="text-zinc-600 mb-2"># 2. Open in browser (use Live Server or any local server)</div>
                <div>
                  <span className="text-emerald-400">npx</span> -y serve .
                </div>
              </div>
              <p className="text-sm text-zinc-500 italic">
                Open <code className="text-zinc-300">http://localhost:3000/template.html</code> and you'll see your empty flyer template with placeholder panels.
              </p>
            </section>

            {/* Architecture Section */}
            <section className="space-y-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Icon name="sitemap" size={32} color="%2364748B" />
                Architecture
              </h2>
              
              <div className="p-8 glass-card rounded-2xl border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 bg-zinc-900 border border-white/5 rounded-lg text-blue-400 font-mono text-xs">flyer-config.json</div>
                  <Icon name="arrow-narrow-down" className="md:rotate-[-90deg] opacity-20" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 bg-zinc-900 border border-white/5 rounded-lg text-indigo-400 font-mono text-xs">template-engine.js</div>
                  <Icon name="arrow-narrow-down" className="md:rotate-[-90deg] opacity-20" />
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="p-3 bg-zinc-900 border border-white/5 rounded-lg text-white font-mono text-xs">template.html</div>
                  <Icon name="arrow-narrow-down" className="md:rotate-[-90deg] opacity-20" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-lg text-emerald-400 font-mono text-xs">Physical Output</div>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-white/5">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-white font-bold">
                    <tr>
                      <th className="px-6 py-4 border-b border-white/5">File</th>
                      <th className="px-6 py-4 border-b border-white/5">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="px-6 py-4 font-mono text-blue-400">flyer-config.json</td>
                      <td className="px-6 py-4">All settings: colors, format, layout, fonts, branding, panel content</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-mono text-blue-400">template.html</td>
                      <td className="px-6 py-4">HTML shell with Tailwind CSS, print button, dynamic container</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-mono text-blue-400">template-engine.js</td>
                      <td className="px-6 py-4">Reads JSON config → sets CSS variables → builds spreads & panels</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-mono text-blue-400">styles.css</td>
                      <td className="px-6 py-4">Spread layout, fold lines, cards, icons, print styles</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Configuration Reference Section */}
            <section className="space-y-12">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Icon name="settings" size={32} color="%2364748B" />
                Configuration (flyer-config.json)
              </h2>

              {/* Colors subsection */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Icon name="palette" size={24} color="%2364748B" />
                  Colors
                </h3>
                <p className="text-zinc-500 text-sm">Define your brand's color palette here. The engine uses these values to generate CSS variables.</p>
                <div className="bg-black rounded-xl p-6 border border-white/5 mb-6">
                  <pre className="text-xs text-zinc-300 overflow-x-auto">
{`"colors": {
    "primary": "#FFC700",
    "primaryText": "#050505",
    "secondary": "#050505",
    "secondaryText": "#FCFCFC",
    "background": "#FCFCFC",
    "textMain": "#050505",
    "textMuted": "#64748B",
    "accent": "#FFC700",
    "border": "#E2E8F0"
}`}
                  </pre>
                </div>
              </div>

              {/* Format subsection */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Icon name="ruler" size={24} color="%2364748B" />
                  Format & Orientation
                </h3>
                <div className="bg-black rounded-xl p-6 border border-white/5">
                  <pre className="text-xs text-zinc-300 overflow-x-auto">
{`"format": {
    "active": "A6",
    "orientation": "portrait",
    "options": {
        "A5": { "width": "148mm", "height": "210mm" },
        "A6": { "width": "105mm", "height": "148mm" }
    }
}`}
                  </pre>
                </div>
              </div>

              {/* Layout subsection */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Icon name="file" size={24} color="%2364748B" />
                  Layout
                </h3>
                <div className="bg-black rounded-xl p-6 border border-white/5">
                   <pre className="text-xs text-zinc-300 overflow-x-auto">
{`"layout": {
    "active": "simple",
    "options": {
        "simple":  { "label": "Simple Greeting Card", "panels": 2 },
        "2-fold":   { "label": "2-Fold",             "panels": 4 },
        "3-fold":   { "label": "3-Fold (Tri-Fold)", "panels": 6 }
    }
}`}
                   </pre>
                </div>
              </div>
            </section>

            {/* Utility Classes Section */}
            <section className="space-y-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Icon name="puzzle" size={32} color="%2364748B" />
                Available CSS Utility Classes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { tag: ".card", desc: "White rounded card with border" },
                  { tag: ".card--primary", desc: "Card with primary background color" },
                  { tag: ".card--dark", desc: "Dark card (gray-900) with white text" },
                  { tag: ".card--soft", desc: "Subtle primary-tinted card" },
                  { tag: ".icon-box", desc: "Circular icon container" },
                  { tag: ".cta-block", desc: "Dark CTA / QR code section" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col p-4 bg-zinc-900 border border-white/5 rounded-xl">
                    <span className="font-mono text-xs text-indigo-400 mb-1">{item.tag}</span>
                    <span className="text-sm text-zinc-500">{item.desc}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* AI Usage Section */}
            <section className="space-y-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Icon name="robot" size={32} color="%2364748B" />
                AI Usage
              </h2>
              <div className="glass-card p-8 rounded-2xl border-white/5 space-y-4">
                <p className="text-zinc-300 leading-relaxed">This template is designed for AI-powered flyer generation:</p>
                <ol className="list-decimal list-inside space-y-2 text-zinc-400 text-sm">
                  <li>AI reads <span className="text-indigo-400 font-mono">flyer-config.json</span> to understand design constraints</li>
                  <li>AI fills the <span className="text-indigo-400 font-mono">panels</span> section with content</li>
                  <li>AI adjusts colors and branding to match the client</li>
                </ol>
                <div className="mt-8">
                  <h4 className="text-white font-bold mb-3 text-sm">Example Prompt</h4>
                  <div className="p-4 bg-black rounded-lg border border-white/10 text-xs text-zinc-400 italic">
                    "Create a flyer for 'Café Sunshine' using the FlyerDesigner template. Format: A5, Layout: 2-fold. Primary color: #2D5016 (forest green)... Update flyer-config.json accordingly."
                  </div>
                </div>
              </div>
            </section>

            {/* Printing Section */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Icon name="printer" size={32} color="%2364748B" />
                Printing
              </h2>
              <div className="flex flex-wrap gap-3">
                {["Margins: None", "Background Graphics: Enabled", "Save as PDF", "WYSIWYG"].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest">{tag}</span>
                ))}
              </div>
            </section>

            <hr className="border-white/5" />

            <section className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Icon name="license" size={32} color="%2364748B" />
                <h2 className="text-2xl font-bold text-white">License</h2>
              </div>
              <p className="text-zinc-500">MIT — Feel free to fork, modify, and use for your projects.</p>
            </section>

          </div>
        </div>
      </div>
    </motion.div>
  );
};