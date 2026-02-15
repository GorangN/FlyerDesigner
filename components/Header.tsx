import React from 'react';
import { Icon } from './Icon';

interface HeaderProps {
  onOpenDocs: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDocs }) => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Update URL hash without jumping
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={(e) => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <Icon name="layout" color="%23ffffff" size={24} className="opacity-90" />
          <span className="text-white font-bold tracking-tight text-lg">FlyerDesigner</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a 
            href="#features" 
            onClick={(e) => scrollToSection(e, 'features')}
            className="hover:text-white transition-colors"
          >
            Features
          </a>
          <button 
            onClick={onOpenDocs}
            className="hover:text-white transition-colors"
          >
            Documentation
          </button>
          <a 
            href="https://github.com/GorangN/FlyerDesigner" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Icon name="brand-github" size={16} />
            GitHub
          </a>
        </div>

        <div className="hidden sm:block">
          <button 
            onClick={onOpenDocs}
            className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold hover:bg-zinc-200 transition-all inline-block"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};