import React from 'react';
import { 
  Rocket, 
  Brain, 
  Palette, 
  Bolt, 
  Wrench, 
  HelpCircle 
} from 'lucide-react';
import { Service } from '../types';

interface ServicesProps {
  services: Service[];
  badge: string;
  title: string;
}

// Icon helper mapping strings from json to real lucide react icons
const iconMap: Record<string, React.ComponentType<any>> = {
  rocket: Rocket,
  brain: Brain,
  palette: Palette,
  bolt: Bolt,
  support: Wrench,
};

export default function Services({ services, badge, title }: ServicesProps) {
  return (
    <section id="services" className="section-container section-padding">
      <div className="mb-16">
        <span className="section-badge">{badge}</span>
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 mt-2">{title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => {
          const IconComponent = iconMap[service.icon] || HelpCircle;
          
          // Render different styles based on featured flag to mimic the beautiful bento grid
          if (service.featured) {
            return (
              <div 
                key={service.id} 
                className="md:col-span-2 p-10 rounded-3xl bg-white border border-slate-200 card-hover relative overflow-hidden group flex flex-col justify-between"
              >
                {/* Decorative radial gradient subtle blur */}
                <div className="absolute -right-20 -bottom-20 w-72 h-72 primary-gradient-bg opacity-5 rounded-full group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col h-full justify-between space-y-8">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                    <p className="font-sans text-sm line-clamp-3 leading-relaxed text-slate-500 max-w-xl">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex gap-2 flex-wrap pt-4">
                    {service.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-3.5 py-1 bg-slate-100 text-slate-600 rounded-full font-mono text-[11px] font-semibold tracking-wide uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          }

          // Dark AI Card Styling
          if (service.bgTheme === 'dark') {
            return (
              <div 
                key={service.id} 
                className="p-10 rounded-3xl bg-slate-950 text-white card-hover relative overflow-hidden flex flex-col justify-between group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent pointer-events-none" />
                
                <div className="relative z-10 flex flex-col h-full justify-between space-y-6">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-white/10 text-primary flex items-center justify-center mb-6">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-slate-100 mb-4">{service.title}</h3>
                    <p className="font-sans text-sm leading-relaxed text-slate-400">
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="flex gap-2 flex-wrap pt-4">
                    {service.tags.slice(0, 2).map(tag => (
                      <span 
                        key={tag} 
                        className="px-3 py-0.5 bg-white/10 text-slate-300 rounded-full font-mono text-[10px] tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          }

          // Standard Glass Panel Styling
          return (
            <div 
              key={service.id} 
              className="p-10 rounded-3xl bg-white border border-slate-200 card-hover flex flex-col justify-between"
            >
              <div className="flex flex-col h-full justify-between space-y-6">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                  <p className="font-sans text-sm leading-relaxed text-slate-500">
                    {service.description}
                  </p>
                </div>

                <div className="flex gap-2 flex-wrap pt-4">
                  {service.tags.slice(0, 2).map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-0.5 bg-slate-100 text-slate-600 rounded-full font-mono text-[10px] tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
