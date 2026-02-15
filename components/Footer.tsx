import React from 'react';
import { Icon } from './Icon';

interface FooterProps {
  onOpenDocs: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDocs }) => {
  return (
    <footer className="mt-20 border-t border-white/5 py-12 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <Icon name="layout" size={20} color="%23ffffff" />
            <span className="text-white font-bold tracking-tight">FlyerDesigner</span>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-zinc-600">
            © 2026 FlyerDesigner. Open Source under MIT.
          </p>
        </div>
        <div className="flex items-center gap-6">
          <a className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2 text-sm" href="https://github.com/GorangN/FlyerDesigner" target="_blank" rel="noopener noreferrer">
            <Icon name="brand-github" size={18} />
            GitHub
          </a>
          <button 
            onClick={onOpenDocs}
            className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2 text-sm"
          >
            <Icon name="book" size={18} />
            Documentation
          </button>
          <a className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2 text-sm" href="https://x.com" target="_blank" rel="noopener noreferrer">
            <Icon name="brand-x" size={18} />
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
};