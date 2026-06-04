import React from 'react';
import { TechItem } from '../types';

interface TechStackProps {
  stack: TechItem[];
  title: string;
}

export default function TechStack({ stack, title }: TechStackProps) {
  return (
    <section id="stack" className="bg-slate-50/50 section-padding border-y border-slate-100 overflow-hidden relative">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 mb-4">{title}</h2>
          <div className="h-1.5 w-16 primary-gradient-bg mx-auto rounded-full" />
        </div>

        <div className="flex flex-wrap justify-center gap-5">
          {stack.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col items-center justify-center w-[135px] p-5 sm:p-6 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/60 card-hover hover:border-primary/30 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-xl bg-slate-50/50 p-2.5 transition-all duration-300 hover:scale-105">
                {item.imageUrl ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 object-contain"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center font-bold text-white text-xl font-display">
                    {item.letter || item.name[0]}
                  </div>
                )}
              </div>
              <span className="font-mono text-xs font-semibold text-slate-800 tracking-wider">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
