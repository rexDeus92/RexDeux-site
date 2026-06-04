import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  MessageSquare, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react';

interface ContactFormProps {
  title: string;
  description: string;
  email: string;
  telegram: string;
  submitButtonText: string;
  successTitle: string;
  successMessage: string;
}

export default function ContactForm({
  title,
  description,
  email,
  telegram,
  submitButtonText,
  successTitle,
  successMessage
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Landing Page',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Пожалуйста, заполните необходимые поля формы.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate real server side or persistent delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset after some time
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: '',
          email: '',
          projectType: 'Landing Page',
          message: ''
        });
      }, 5000);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section id="contact" className="section-container section-padding relative z-10">
      <div className="glass-panel border border-slate-200/60 rounded-[32px] overflow-hidden shadow-xl flex flex-col md:flex-row bg-white/90">
        
        {/* Left column info */}
        <div className="md:w-2/5 primary-gradient-bg p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Decorative glowing gradient circle */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <h2 className="font-display text-4xl font-extrabold tracking-tight mb-4">{title}</h2>
            <p className="font-sans text-sm opacity-90 leading-relaxed max-w-sm">
              {description}
            </p>
          </div>

          <div className="mt-16 sm:mt-24 space-y-6 relative z-10">
            {/* Email contact row */}
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div className="font-sans">
                <span className="block font-mono text-[10px] uppercase tracking-wider opacity-60">Email</span>
                <a href={`mailto:${email}`} className="font-bold text-sm tracking-wide hover:underline text-white">
                  {email}
                </a>
              </div>
            </div>

            {/* Telegram contact row */}
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div className="font-sans">
                <span className="block font-mono text-[10px] uppercase tracking-wider opacity-60">Telegram</span>
                <span className="font-bold text-sm tracking-wide text-white">
                  {telegram}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom attribution */}
          <div className="mt-12 text-[10px] font-mono opacity-40">
            DevCanvas Portfolio Engine
          </div>
        </div>

        {/* Right column form */}
        <div className="md:w-3/5 p-12 bg-white flex flex-col justify-center min-h-[450px]">
          {isSuccess ? (
            <div className="text-center space-y-4 fade-in py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 mb-2">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-display text-2xl font-bold text-slate-900">{successTitle}</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                {successMessage}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name-input" className="label-premium">
                    Имя *
                  </label>
                  <input 
                    id="name-input"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Иван Иванов"
                    className="input-premium"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email-input" className="label-premium">
                    Email *
                  </label>
                  <input 
                    id="email-input"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="ivan@example.com"
                    className="input-premium"
                  />
                </div>

              </div>

              {/* Project Type Grid */}
              <div className="space-y-2">
                <label htmlFor="project-type-select" className="label-premium">
                  Тип проекта
                </label>
                <select 
                  id="project-type-select"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className="input-premium appearance-none cursor-pointer"
                >
                  <option value="Landing Page">Landing Page</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="SaaS Platform">SaaS Platform</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message-textarea" className="label-premium">
                  Сообщение *
                </label>
                <textarea 
                  id="message-textarea"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Опишите вашу идею..."
                  className="input-premium resize-none"
                />
              </div>

              {/* Submit button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full primary-gradient-bg text-white py-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Отправка...
                  </>
                ) : (
                  <>
                    {submitButtonText} <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}
