import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  X, 
  ExternalLink, 
  Terminal, 
  Eye, 
  Code 
} from 'lucide-react';
import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
  badge: string;
  title: string;
  actionText: string;
}

export default function Projects({ projects, badge, title, actionText }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="bg-slate-50 section-padding">
      <div className="section-container">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="section-badge">{badge}</span>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 mt-2">{title}</h2>
          </div>
          <button 
            type="button"
            className="hidden md:inline-flex items-center gap-1.5 font-mono text-xs font-bold text-slate-500 hover:text-primary transition-colors uppercase group"
          >
            {actionText} 
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200/60 card-hover cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Image with zoom and hover overlay */}
              <div className="relative aspect-video overflow-hidden bg-slate-100 border-b border-slate-100">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-350 flex items-center justify-center backdrop-blur-xs">
                  <div className="bg-white/95 text-primary p-3 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Data */}
              <div className="p-8">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-mono font-semibold uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-display text-xl font-bold text-slate-950 mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm font-sans text-slate-500 leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modern Pop-up Glass Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-2xl bg-white/95 rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50 z-10 fade-in flex flex-col max-h-[90vh]">
            {/* Header close button */}
            <button 
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 bg-slate-900/10 hover:bg-slate-900/20 text-slate-700 rounded-full transition-colors z-20"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Scrollable container */}
            <div className="overflow-y-auto">
              {/* Cover photo */}
              <div className="relative aspect-video w-full bg-slate-100">
                <img 
                  src={selectedProject.imageUrl} 
                  alt={selectedProject.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 flex gap-1.5 flex-wrap">
                  {selectedProject.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 text-xs font-mono font-semibold bg-white/90 text-primary rounded-full shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specs & description */}
              <div className="p-8 space-y-6">
                <div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">{selectedProject.title}</h3>
                  <div className="flex gap-4 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Terminal className="w-3.5 h-3.5 text-primary" /> Project ID: {selectedProject.id}
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="flex items-center gap-1">
                      <Code className="w-3.5 h-3.5 text-primary" /> Tech Setup Done
                    </span>
                  </div>
                </div>

                <div className="h-px bg-slate-100" />

                <div className="space-y-4">
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Описание проекта</h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-sans">
                    {selectedProject.description}
                  </p>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed">
                    Этот проект спроектирован с упором на превосходную масштабируемость, оптимизацию трафика и адаптивную адаптацию под мобильные устройства. Включает комплексное управление данными, надежное разграничение уровней API и удобный интерфейс.
                  </p>
                </div>

                <div className="h-px bg-slate-100" />

                {/* Submitting links */}
                <div className="flex gap-4">
                  <a 
                    href={selectedProject.projectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 primary-gradient-bg hover:shadow-lg hover:shadow-primary/20 text-white font-mono text-xs font-medium py-3.5 rounded-xl flex items-center justify-center gap-1.5 transition-all"
                  >
                    Перейти к проекту <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button 
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs font-medium py-3.5 rounded-xl transition-all"
                  >
                    Закрыть окно
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
