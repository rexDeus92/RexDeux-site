import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw, 
  FileText, 
  Briefcase, 
  Terminal,
  Grid,
  Heart,
  Plus,
  Trash2
} from 'lucide-react';
import { ContentData, PortfolioData, Project, TechItem, Service } from '../types';

interface LiveEditorProps {
  isOpen: boolean;
  onClose: () => void;
  content: ContentData;
  setContent: React.Dispatch<React.SetStateAction<ContentData>>;
  portfolio: PortfolioData;
  setPortfolio: React.Dispatch<React.SetStateAction<PortfolioData>>;
  onReset: () => void;
}

export default function LiveEditor({
  isOpen,
  onClose,
  content,
  setContent,
  portfolio,
  setPortfolio,
  onReset
}: LiveEditorProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'portfolio' | 'raw'>('content');
  const [copiedRaw, setCopiedRaw] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleTextChange = (path: string[], value: string) => {
    setContent(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      let current = copy;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return copy;
    });
  };

  const handleProjectChange = (index: number, key: keyof Project, value: any) => {
    setPortfolio(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy.projects[index][key] = value;
      return copy;
    });
  };

  const handleAddProject = () => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      title: "Новый проект",
      description: "Описание вашего удивительного проекта.",
      tags: ["React", "CSS"],
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjmpv2J4XRgyXRskNqFbQkAkbMwSkJVHXQ4o1PW9SMZrq-3D6RSGqFaIvTgiJ_F1JKSQC2-osRtGi0bNKmnLSLn-mWxHC52idiOb49Nt6NSONlAzbX0ESUUU8HPbC8a9RnOqfUQLb3OKwQNVhoirr75VXD6cDFUN7TfW3FnzavaaWJx3Fcxh42flW2bAPwPouOA32KGn1U_GLTw80T3sDNMuiDm0ypF6dBtUxc3M8f5ENJPw_eje15j3XR24axuDkN4XWz8ABDyzI3",
      projectUrl: "#"
    };

    setPortfolio(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const handleRemoveProject = (index: number) => {
    setPortfolio(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-slate-950 text-slate-100 z-50 shadow-2xl border-l border-slate-800 flex flex-col justify-between transition-all duration-300 transform translate-x-0">
      
      {/* Header */}
      <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Terminal className="text-primary w-5 h-5" />
          <h2 className="font-display font-bold text-lg tracking-tight">Редактор контента (DevMode)</h2>
        </div>
        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={onReset}
            title="Сбросить все изменения"
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mode selectors */}
      <div className="grid grid-cols-3 border-b border-slate-800 bg-slate-900/30">
        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`py-3 text-xs font-mono tracking-wider uppercase border-b-2 font-semibold transition-all ${
            activeTab === 'content' ? 'border-primary text-slate-100 bg-slate-900/60' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5 inline mr-1.5" />
          Общие Тексты
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('portfolio')}
          className={`py-3 text-xs font-mono tracking-wider uppercase border-b-2 font-semibold transition-all ${
            activeTab === 'portfolio' ? 'border-primary text-slate-100 bg-slate-900/60' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5 inline mr-1.5" />
          Портфолио
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('raw')}
          className={`py-3 text-xs font-mono tracking-wider uppercase border-b-2 font-semibold transition-all ${
            activeTab === 'raw' ? 'border-primary text-slate-100 bg-slate-900/60' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Grid className="w-3.5 h-3.5 inline mr-1.5" />
          JSON Экспорт
        </button>
      </div>

      {/* Editor Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {activeTab === 'content' && (
          <div className="space-y-6 fade-in">
            {/* Site Identity */}
            <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800/40 space-y-4">
              <h3 className="font-mono text-xs font-bold text-primary flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Основное
              </h3>
              <div>
                <label className="editor-label">Название сайта</label>
                <input 
                  type="text" 
                  value={content.siteName} 
                  onChange={(e) => handleTextChange(['siteName'], e.target.value)}
                  className="editor-input"
                />
              </div>
            </div>

            {/* Hero elements */}
            <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800/40 space-y-4">
              <h3 className="font-mono text-xs font-bold text-primary flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Герой секция (Главная)
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="editor-label">Доступность (Тег)</label>
                  <input 
                    type="text" 
                    value={content.hero.badgeText} 
                    onChange={(e) => handleTextChange(['hero', 'badgeText'], e.target.value)}
                    className="editor-input"
                  />
                </div>
                <div>
                  <label className="editor-label">Статус под фото</label>
                  <input 
                    type="text" 
                    value={content.hero.statusIndicator} 
                    onChange={(e) => handleTextChange(['hero', 'statusIndicator'], e.target.value)}
                    className="editor-input"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="editor-label">Заголовок нач.</label>
                  <input 
                    type="text" 
                    value={content.hero.titlePrefix} 
                    onChange={(e) => handleTextChange(['hero', 'titlePrefix'], e.target.value)}
                    className="editor-input"
                  />
                </div>
                <div>
                  <label className="editor-label">Заголовок кон.</label>
                  <input 
                    type="text" 
                    value={content.hero.titleSuffix} 
                    onChange={(e) => handleTextChange(['hero', 'titleSuffix'], e.target.value)}
                    className="editor-input"
                  />
                </div>
              </div>
              <div>
                <label className="editor-label">Главная фотография (URL)</label>
                <input 
                  type="text" 
                  value={content.hero.avatarUrl} 
                  onChange={(e) => handleTextChange(['hero', 'avatarUrl'], e.target.value)}
                  className="editor-input text-xs font-mono"
                />
              </div>
              <div>
                <label className="editor-label">Главное описание</label>
                <textarea 
                  rows={3}
                  value={content.hero.description} 
                  onChange={(e) => handleTextChange(['hero', 'description'], e.target.value)}
                  className="editor-input"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="editor-label">Опыт (Цифра)</label>
                  <input 
                    type="text" 
                    value={content.hero.experienceValue} 
                    onChange={(e) => handleTextChange(['hero', 'experienceValue'], e.target.value)}
                    className="editor-input"
                  />
                </div>
                <div>
                  <label className="editor-label">Опыт (Подпись)</label>
                  <input 
                    type="text" 
                    value={content.hero.experienceSuffix} 
                    onChange={(e) => handleTextChange(['hero', 'experienceSuffix'], e.target.value)}
                    className="editor-input"
                  />
                </div>
              </div>
            </div>

            {/* About text section */}
            <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800/40 space-y-4">
              <h3 className="font-mono text-xs font-bold text-primary flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Раздел "Обо мне"
              </h3>
              <div>
                <label className="editor-label">Заголовок раздела</label>
                <input 
                  type="text" 
                  value={content.sections.about.title} 
                  onChange={(e) => handleTextChange(['sections', 'about', 'title'], e.target.value)}
                  className="editor-input"
                />
              </div>
              <div>
                <label className="editor-label">Абзац 1</label>
                <textarea 
                  rows={3}
                  value={content.sections.about.paragraphs[0] || ""} 
                  onChange={(e) => {
                    const nextParas = [...content.sections.about.paragraphs];
                    nextParas[0] = e.target.value;
                    setContent(prev => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        about: { ...prev.sections.about, paragraphs: nextParas }
                      }
                    }));
                  }}
                  className="editor-input"
                />
              </div>
              <div>
                <label className="editor-label">Абзац 2</label>
                <textarea 
                  rows={3}
                  value={content.sections.about.paragraphs[1] || ""} 
                  onChange={(e) => {
                    const nextParas = [...content.sections.about.paragraphs];
                    nextParas[1] = e.target.value;
                    setContent(prev => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        about: { ...prev.sections.about, paragraphs: nextParas }
                      }
                    }));
                  }}
                  className="editor-input"
                />
              </div>
            </div>

            {/* Contact details */}
            <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800/40 space-y-4">
              <h3 className="font-mono text-xs font-bold text-primary flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Контакты & Соцсети
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="editor-label">Email</label>
                  <input 
                    type="text" 
                    value={content.sections.contact.email} 
                    onChange={(e) => handleTextChange(['sections', 'contact', 'email'], e.target.value)}
                    className="editor-input"
                  />
                </div>
                <div>
                  <label className="editor-label">Telegram</label>
                  <input 
                    type="text" 
                    value={content.sections.contact.telegram} 
                    onChange={(e) => handleTextChange(['sections', 'contact', 'telegram'], e.target.value)}
                    className="editor-input"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="space-y-6 fade-in">
            <div className="flex justify-between items-center">
              <h3 className="font-mono text-xs font-bold text-primary uppercase tracking-wide">
                Редактирование проектов ({portfolio.projects.length})
              </h3>
              <button
                type="button"
                onClick={handleAddProject}
                className="inline-flex items-center gap-1 text-xs py-1.5 px-3 bg-primary text-white rounded-lg hover:bg-primary-container font-mono transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Добавить
              </button>
            </div>

            <div className="space-y-4">
              {portfolio.projects.map((project, index) => (
                <div key={project.id} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => handleRemoveProject(index)}
                    title="Удалить проект"
                    className="absolute top-4 right-4 p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="pr-8">
                    <span className="text-[10px] font-mono text-primary font-semibold uppercase">Проект {index + 1}</span>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 font-mono mb-1">Название проекта</label>
                    <input 
                      type="text" 
                      value={project.title} 
                      onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg py-1.5 px-2.5 text-sm focus:outline-none focus:border-primary text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 font-mono mb-1">Описание проекта</label>
                    <textarea 
                      rows={2}
                      value={project.description} 
                      onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg py-1.5 px-2.5 text-sm focus:outline-none focus:border-primary text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 font-mono mb-1">Теги (через запятую)</label>
                    <input 
                      type="text" 
                      value={project.tags.join(', ')} 
                      onChange={(e) => {
                        const tags = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
                        handleProjectChange(index, 'tags', tags);
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg py-1.5 px-2.5 text-xs font-mono focus:outline-none focus:border-primary text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 font-mono mb-1">Ссылка на фото обложки (URL)</label>
                    <input 
                      type="text" 
                      value={project.imageUrl} 
                      onChange={(e) => handleProjectChange(index, 'imageUrl', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg py-1.5 px-2.5 text-xs font-mono focus:outline-none focus:border-primary text-slate-200"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'raw' && (
          <div className="space-y-6 fade-in h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="bg-amber-950/40 border border-amber-900/50 p-4 rounded-xl text-xs text-amber-300 leading-relaxed">
                <strong>💡 Как сохранить изменения насовсем?</strong>
                <p className="mt-1">
                  1. Отредактируйте любые тексты или проекты в первых двух вкладках.<br />
                  2. Скопируйте JSON-код по кнопкам ниже.<br />
                  3. Замените содержимое файлов в проекте:<br />
                  &nbsp;&nbsp;• Тексты → в <code className="bg-slate-900 px-1 font-mono rounded">/src/data/content.json</code><br />
                  &nbsp;&nbsp;• Проекты/Стек → в <code className="bg-slate-900 px-1 font-mono rounded">/src/data/portfolio.json</code>
                </p>
              </div>

              {/* Copy content.json */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-slate-300">Содержимое для content.json:</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(JSON.stringify(content, null, 2), 'content')}
                    className="inline-flex items-center gap-1.5 text-xs py-1 px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors font-mono"
                  >
                    {copiedType === 'content' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-400" /> Скопировано!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Копировать
                      </>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <pre className="p-3 bg-slate-900 border border-slate-850 rounded-xl text-[10px] font-mono text-slate-400 max-h-48 overflow-y-auto w-full select-all">
                    {JSON.stringify(content, null, 2)}
                  </pre>
                </div>
              </div>

              {/* Copy portfolio.json */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-slate-300">Содержимое для portfolio.json:</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(JSON.stringify(portfolio, null, 2), 'portfolio')}
                    className="inline-flex items-center gap-1.5 text-xs py-1 px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors font-mono"
                  >
                    {copiedType === 'portfolio' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-400" /> Скопировано!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Копировать
                      </>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <pre className="p-3 bg-slate-900 border border-slate-850 rounded-xl text-[10px] font-mono text-slate-400 max-h-48 overflow-y-auto w-full select-all">
                    {JSON.stringify(portfolio, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-between items-center text-[10px] text-slate-500 font-mono">
        <span className="flex items-center gap-1">
          Made with <Heart className="w-3 h-3 text-red-500 fill-current" /> by DevCanvas
        </span>
        <span>v1.0.0</span>
      </div>

    </div>
  );
}
