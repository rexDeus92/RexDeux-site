import React, { useState } from 'react';
import { 
  Terminal, 
  ArrowRight, 
  Settings, 
  Sparkles,
  Github,
  Linkedin,
  Twitter,
  FileDown 
} from 'lucide-react';

// Data imports
import contentJson from './data/content.json';
import portfolioJson from './data/portfolio.json';

// Component imports
import TechStack from './components/TechStack';
import Services from './components/Services';
import Projects from './components/Projects';
import ContactForm from './components/ContactForm';
import LiveEditor from './components/LiveEditor';

// Types
import { ContentData, PortfolioData } from './types';

export default function App() {
  const [content, setContent] = useState<ContentData>(contentJson as ContentData);
  const [portfolio, setPortfolio] = useState<PortfolioData>(portfolioJson as PortfolioData);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');

  // Let's allow resetting states on demand
  const handleReset = () => {
    if (window.confirm('Сбросить все измененные данные к исходным?')) {
      setContent(contentJson as ContentData);
      setPortfolio(portfolioJson as PortfolioData);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800 selection:bg-primary/20 relative selection:text-primary">
      
      {/* Dot Grid background overlay */}
      <div className="fixed inset-0 dot-grid pointer-events-none z-0" />

      {/* Floating dev mode helper pill */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <button
          type="button"
          onClick={() => setIsEditorOpen(prev => !prev)}
          className="flex items-center gap-2 primary-gradient-bg text-white hover:shadow-xl hover:shadow-primary/30 text-xs px-4 py-3 rounded-full font-mono font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
        >
          <Settings className="w-4 h-4 animate-spin-slow" />
          Редактор
        </button>
      </div>

      {/* Navigation bar */}
      <nav className="fixed top-0 w-full glass-panel z-40 shadow-sm border-b border-slate-100">
        <div className="flex justify-between items-center px-6 md:px-20 py-4 max-w-[1280px] mx-auto w-full">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Terminal className="w-5 h-5" />
            </div>
            <span className="font-display text-xl font-extrabold tracking-tighter text-slate-950 uppercase">
              {content.siteName}
            </span>
          </div>

          {/* Links */}
          <div className="hidden md:flex gap-8 items-center font-mono text-xs font-semibold tracking-wider uppercase text-slate-500">
            {content.navigation.map((item) => (
              <a 
                key={item.label}
                href={item.href}
                className="hover:text-primary transition-colors py-1 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Hire actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsEditorOpen(prev => !prev)}
              className="md:hidden p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
              title="Открыть редактор"
            >
              <Settings className="w-5 h-5" />
            </button>
            <a 
              href="#contact"
              className="btn-primary-gradient"
            >
              Hire Me
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-24">
        
        {/* Hero split layout */}
        <section 
          id="hero" 
          className="pr-6 md:pr-20 pb-16 md:pb-28 max-w-[1280px] mx-auto min-h-[85vh] flex flex-col lg:flex-row items-center justify-between gap-12"
          style={{ paddingLeft: '81px', paddingTop: '0px' }}
        >
          
          {/* Text block */}
          <div className="lg:w-3/5 space-y-6 text-center lg:text-left fade-in">
            <div className="badge-pill">
              <Sparkles className="w-4 h-4 text-primary fill-current animate-pulse" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
                {content.hero.badgeText}
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-extrabold text-slate-950 tracking-tight leading-[1.05]">
              {content.hero.titlePrefix} <br />
              <span className="gradient-text">{content.hero.titleSuffix}</span>
            </h1>

            <p className="font-sans text-base md:text-lg text-slate-500 max-w-xl leading-relaxed">
              {content.hero.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
              <a 
                href="#projects"
                className="btn-primary-gradient-lg group"
              >
                {content.hero.viewWorkButton}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a 
                href="#stack"
                className="btn-secondary-lg"
              >
                {content.hero.techButton}
              </a>
            </div>
          </div>

          {/* Portrait card block */}
          <div className="lg:w-2/5 relative group w-full max-w-sm lg:max-w-none">
            {/* Soft glowing ambient circle backplate */}
            <div className="absolute -inset-4 primary-gradient-bg opacity-10 blur-3xl group-hover:opacity-15 transition-opacity" />
            
            <div className="relative bg-white p-3 rounded-3xl shadow-xl overflow-hidden glass-panel border border-slate-100">
              <img 
                src={content.hero.avatarUrl} 
                alt="Portrait" 
                referrerPolicy="no-referrer"
                className="w-full h-auto rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 object-cover aspect-[0.74]"
              />
            </div>

            {/* Glowing active card badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4.5 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center min-w-[95px]">
              <span className="font-display text-3xl font-extrabold text-primary leading-none">
                {content.hero.experienceValue}
              </span>
              <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center mt-1.5 leading-tight">
                {content.hero.experienceSuffix.split(' ').map((w, i) => (
                  <span key={w + i} className="block">{w}</span>
                ))}
              </span>
            </div>
          </div>

        </section>

        {/* Tech Stack section components */}
        <TechStack 
          stack={portfolio.techStack} 
          title={content.sections.stack.title} 
        />

        {/* Services / Bento grid section components */}
        <Services 
          services={portfolio.services}
          badge={content.sections.services.badge}
          title={content.sections.services.title}
        />

        {/* Selected works portfolio list section */}
        <Projects 
          projects={portfolio.projects}
          badge={content.sections.portfolio.badge}
          title={content.sections.portfolio.title}
          actionText={content.sections.portfolio.actionText}
        />

        {/* About section with stats cards */}
        <section id="about" className="px-6 md:px-20 py-24 max-w-[1000px] mx-auto text-center relative z-10">
          <span className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">
            {content.sections.about.badge}
          </span>
          <h2 className="font-display text-4xl font-extrabold text-slate-950 mt-4 mb-8 leading-snug">
            {content.sections.about.title}
          </h2>

          <div className="space-y-6 text-slate-500 max-w-3xl mx-auto text-sm leading-relaxed font-sans">
            {content.sections.about.paragraphs.map((p, idx) => (
              <p key={idx} className="text-base">
                {p}
              </p>
            ))}
          </div>

          {/* Stats metrics block */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-16 border-t border-slate-200/60">
            {content.sections.about.stats.map((stat, idx) => (
              <div key={stat.value + idx} className="p-4 bg-white/40 border border-slate-100 rounded-2xl flex flex-col justify-center">
                <div className="font-display text-4xl font-extrabold text-primary">
                  {stat.value}
                </div>
                <div className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact form view section */}
        <ContactForm 
          title={content.sections.contact.title}
          description={content.sections.contact.description}
          email={content.sections.contact.email}
          telegram={content.sections.contact.telegram}
          submitButtonText={content.sections.contact.submitButton}
          successTitle={content.sections.contact.successTitle}
          successMessage={content.sections.contact.successMessage}
        />

      </main>

      {/* Footer layout */}
      <footer className="bg-white border-t border-slate-100 py-16 relative z-10 mt-12 select-none">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-20 max-w-[1280px] mx-auto w-full gap-8">
          
          <div className="text-center md:text-left space-y-2">
            <span className="font-display text-lg font-black text-primary tracking-tighter uppercase">
              {content.siteName}
            </span>
            <p className="font-mono text-[10px] text-slate-400 tracking-wider">
              © {new Date().getFullYear()} {content.siteName}. {content.footer.tagline}
            </p>
          </div>

          {/* Social connections links */}
          <div className="flex flex-wrap justify-center gap-6 font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">
            {content.footer.links.map((link) => (
              <a 
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors hover:scale-105 transform active:scale-95"
              >
                {link.label}
              </a>
            ))}
          </div>

        </div>
      </footer>

      {/* Developer editing suite */}
      <LiveEditor 
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        content={content}
        setContent={setContent}
        portfolio={portfolio}
        setPortfolio={setPortfolio}
        onReset={handleReset}
      />

    </div>
  );
}
