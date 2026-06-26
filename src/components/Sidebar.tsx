import { ClipboardList, FileText, X } from 'lucide-react';
import { SECTIONS, SectionId, DocumentMode } from '../types';

interface SidebarProps {
  activeSection: SectionId;
  onSectionChange: (id: SectionId) => void;
  documentMode: DocumentMode;
  authorName: string;
  titresExpert?: string;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({ activeSection, onSectionChange, documentMode, authorName, titresExpert, isMobileOpen = false, onMobileClose }: SidebarProps) {
  const visibleSections = SECTIONS.filter((section) => {
    if (documentMode === 'clinical') {
      return !['examen_faits', 'relation_faits', 'evaluation', 'dangerosite', 'conclusions'].includes(section.id);
    }
    return section.id !== 'propositions_soins';
  });

  const sectionsToDisplay = documentMode === 'clinical'
    ? [
        ...visibleSections.map((section, index) => ({
          ...section,
          number: ['I', 'II', 'III', 'III bis', 'IV'][index] || section.number,
        })),
        { id: 'propositions_soins' as SectionId, number: 'V', label: 'Propositions de Soins' },
      ]
    : visibleSections;

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 min-h-screen bg-slate-900 flex flex-col border-r border-slate-800
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="px-6 py-7 border-b border-slate-800">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                <ClipboardList size={18} className="text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">
                  Examen psychiatrique
                </p>
                <p className="text-slate-300 text-xs leading-tight mt-0.5 font-medium">
                  {authorName || 'Docteur Jean-Georges Rohmer'}
                </p>
                {titresExpert && (
                  <p className="text-slate-500 text-xs leading-tight mt-0.5">
                    {titresExpert}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={onMobileClose}
              className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest px-3 mb-3">
          Sections du rapport
        </p>
        <ul className="space-y-0.5">
          {sectionsToDisplay.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <li key={section.id}>
                <button
                  onClick={() => onSectionChange(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 group ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                      isActive
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-300'
                    }`}
                  >
                    {section.number}
                  </span>
                  <span className="text-sm font-medium leading-tight">{section.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-3 py-4 border-t border-slate-800">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50">
          <FileText size={14} className="text-slate-500" />
          <p className="text-slate-500 text-xs">Données non persistées (RGPD)</p>
        </div>
      </div>
    </aside>
    </>
  );
}
