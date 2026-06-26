import { Eye, ChevronRight, FilePlus, Save, Download, FolderOpen, Smartphone, Menu } from 'lucide-react';
import { SECTIONS, SectionId } from '../types';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface HeaderProps {
  activeSection: SectionId;
  onGenerateReport: () => void;
  onNewExpertise: () => void;
  onExport: () => void;
  onImport: () => void;
  lastSaved: Date | null;
  onMenuClick?: () => void;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export default function Header({
  activeSection,
  onGenerateReport,
  onNewExpertise,
  onExport,
  onImport,
  lastSaved,
  onMenuClick,
}: HeaderProps) {
  const section = SECTIONS.find((s) => s.id === activeSection);
  const { isInstallable, isInstalled, installApp } = usePWAInstall();

  return (
    <header className="min-h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 md:px-8 flex-shrink-0 gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
        >
          <Menu size={20} />
        </button>

        <nav className="hidden sm:flex items-center gap-2 text-sm">
          <span className="text-slate-400">Rapport</span>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="text-slate-700 font-medium">
            {section ? `${section.number}. ${section.label}` : ''}
          </span>
        </nav>
      </div>

      <div className="flex items-center gap-2 md:gap-3 flex-wrap">
        <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 mr-2">
          <Save size={12} className="text-emerald-500" />
          {lastSaved ? (
            <span className="hidden lg:inline">Sauvegarde auto. — {formatTime(lastSaved)}</span>
          ) : (
            <span className="hidden lg:inline">Sauvegarde automatique activee</span>
          )}
        </div>

        {isInstallable && !isInstalled && (
          <button
            onClick={installApp}
            className="hidden sm:flex items-center gap-2 px-3 md:px-4 py-2 border border-blue-300 bg-blue-50 hover:bg-blue-100 active:bg-blue-150 text-blue-700 text-sm font-medium rounded-lg transition-colors"
          >
            <Smartphone size={15} />
            <span className="hidden md:inline">Installer l'app</span>
          </button>
        )}

        <button
          onClick={onImport}
          className="flex items-center gap-2 px-3 md:px-4 py-2.5 md:py-2 border border-slate-200 hover:bg-slate-50 active:bg-slate-100 text-slate-600 text-sm font-medium rounded-lg transition-colors"
        >
          <FolderOpen size={15} />
          <span className="hidden sm:inline">Charger</span>
        </button>

        <button
          onClick={onExport}
          className="flex items-center gap-2 px-3 md:px-4 py-2.5 md:py-2 border border-teal-300 bg-teal-50 hover:bg-teal-100 active:bg-teal-150 text-teal-700 text-sm font-medium rounded-lg transition-colors"
        >
          <Download size={15} />
          <span className="hidden sm:inline">Sauvegarder</span>
        </button>

        <button
          onClick={onNewExpertise}
          className="hidden md:flex items-center gap-2 px-4 py-2 border border-slate-200 hover:bg-slate-50 active:bg-slate-100 text-slate-600 text-sm font-medium rounded-lg transition-colors"
        >
          <FilePlus size={15} />
          <span className="hidden lg:inline">Nouvelle expertise</span>
        </button>

        <button
          onClick={onGenerateReport}
          className="flex items-center gap-2 px-4 md:px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm shadow-blue-200"
        >
          <Eye size={15} />
          <span className="hidden sm:inline">Apercu du rapport</span>
        </button>
      </div>
    </header>
  );
}
