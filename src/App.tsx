import { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ReportPreview from './components/ReportPreview';
import DocumentModeSelector from './components/DocumentModeSelector';
import PromptModeSelector from './components/PromptModeSelector';
import Identification from './components/sections/Identification';
import Anamnese from './components/sections/Anamnese';
import ExamenPsychiatrique from './components/sections/ExamenPsychiatrique';
import BiometricData from './components/sections/BiometricData';
import ExamenFaits from './components/sections/ExamenFaits';
import RelationFaits from './components/sections/RelationFaits';
import Diagnostic from './components/sections/Diagnostic';
import EvaluationMedicoLegale from './components/sections/EvaluationMedicoLegale';
import Dangerosite from './components/sections/Dangerosite';
import EchellesPsychometriques from './components/sections/EchellesPsychometriques';
import Conclusions from './components/sections/Conclusions';
import PropositionsSoins from './components/sections/PropositionsSoins';
import PlaceholderSection from './components/sections/PlaceholderSection';
import UpdateNotification from './components/UpdateNotification';
import { FormData, INITIAL_FORM_DATA, SECTIONS, SectionId, CommentsData, DocumentMode, PromptMode } from './types';
import { exportFormData, importFormData } from './utils/fileIO';

const STORAGE_KEY = 'expertise_draft';

function deepMerge<T extends Record<string, unknown>>(defaults: T, saved: Partial<T>): T {
  const result = { ...defaults };
  for (const key of Object.keys(saved) as (keyof T)[]) {
    const sv = saved[key];
    const dv = defaults[key];
    if (sv && dv && typeof sv === 'object' && typeof dv === 'object' && !Array.isArray(sv)) {
      result[key] = deepMerge(dv as Record<string, unknown>, sv as Record<string, unknown>) as T[keyof T];
    } else if (sv !== undefined) {
      result[key] = sv as T[keyof T];
    }
  }
  return result;
}

function migrateEchelles(data: Record<string, unknown>): void {
  const arr = data.echelles_psychometriques;
  if (!Array.isArray(arr)) return;
  const valid = arr.filter(
    (e: unknown) => e && typeof e === 'object' && 'scaleType' in (e as Record<string, unknown>)
  );
  data.echelles_psychometriques = valid;
}

function loadDraft(): FormData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      migrateEchelles(parsed);
      return deepMerge(INITIAL_FORM_DATA, parsed);
    }
  } catch {
    // corrupt data — ignore
  }
  return INITIAL_FORM_DATA;
}

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('identification');
  const [formData, setFormData] = useState<FormData>(loadDraft);
  const [showPreview, setShowPreview] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(
    localStorage.getItem(STORAGE_KEY) ? new Date() : null
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      setLastSaved(new Date());
    }, 400);
    return () => clearTimeout(timer);
  }, [formData]);

  useEffect(() => {
    const hiddenSections = formData.documentMode === 'clinical'
      ? ['examen_faits', 'relation_faits', 'evaluation', 'dangerosite', 'conclusions']
      : ['propositions_soins'];

    if (hiddenSections.includes(activeSection)) {
      setActiveSection('identification');
    }
  }, [formData.documentMode, activeSection]);

  const handleNewExpertise = useCallback(() => {
    const confirmed = window.confirm(
      'Etes-vous sur de vouloir tout effacer pour commencer un nouveau rapport ?\n\nToutes les donnees saisies seront definitivement perdues.'
    );
    if (confirmed) {
      localStorage.removeItem(STORAGE_KEY);
      setFormData(INITIAL_FORM_DATA);
      setActiveSection('identification');
      setLastSaved(null);
      setShowPreview(false);
    }
  }, []);

  const handleExport = useCallback(() => {
    exportFormData(formData);
  }, [formData]);

  const handleImport = useCallback(async () => {
    const imported = await importFormData(INITIAL_FORM_DATA);
    if (imported) {
      setFormData(imported);
      setActiveSection('identification');
    }
  }, []);

  const commentProps = {
    commentaires: formData.commentaires,
    onCommentairesChange: (c: CommentsData) => setFormData((prev) => ({ ...prev, commentaires: c })),
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'identification':
        return (
          <Identification
            data={formData.identification}
            onChange={(data) => setFormData((prev) => ({ ...prev, identification: data }))}
            documentMode={formData.documentMode}
            {...commentProps}
          />
        );
      case 'anamnese':
        return (
          <Anamnese
            data={formData.anamnese}
            onChange={(data) => setFormData((prev) => ({ ...prev, anamnese: data }))}
            {...commentProps}
          />
        );
      case 'examen_psychiatrique':
        return (
          <ExamenPsychiatrique
            data={formData.examen_psychiatrique}
            onChange={(data) => setFormData((prev) => ({ ...prev, examen_psychiatrique: data }))}
            documentMode={formData.documentMode}
            {...commentProps}
          />
        );
      case 'biometric_data':
        return (
          <BiometricData
            data={formData.biometric_data}
            onChange={(data) => setFormData((prev) => ({ ...prev, biometric_data: data }))}
            {...commentProps}
          />
        );
      case 'examen_faits':
        return (
          <ExamenFaits
            data={formData.examen_faits}
            onChange={(data) => setFormData((prev) => ({ ...prev, examen_faits: data }))}
            {...commentProps}
          />
        );
      case 'relation_faits':
        return (
          <RelationFaits
            data={formData.relation_faits}
            onChange={(data) => setFormData((prev) => ({ ...prev, relation_faits: data }))}
            {...commentProps}
          />
        );
      case 'diagnostic':
        return (
          <Diagnostic
            data={formData.diagnostic}
            onChange={(data) => setFormData((prev) => ({ ...prev, diagnostic: data }))}
            documentMode={formData.documentMode}
            {...commentProps}
          />
        );
      case 'evaluation':
        return (
          <EvaluationMedicoLegale
            data={formData.evaluation}
            onChange={(data) => setFormData((prev) => ({ ...prev, evaluation: data }))}
            {...commentProps}
          />
        );
      case 'dangerosite':
        return (
          <Dangerosite
            data={formData.dangerosite}
            onChange={(data) => setFormData((prev) => ({ ...prev, dangerosite: data }))}
            {...commentProps}
          />
        );
      case 'echelles_psychometriques':
        return (
          <EchellesPsychometriques
            data={formData.echelles_psychometriques}
            onChange={(data) => setFormData((prev) => ({ ...prev, echelles_psychometriques: data }))}
            tdah={formData.tdah}
            onTdahChange={(data) => setFormData((prev) => ({ ...prev, tdah: data }))}
          />
        );
      case 'conclusions':
        return (
          <Conclusions
            data={formData.conclusions}
            onChange={(data) => setFormData((prev) => ({ ...prev, conclusions: data }))}
            {...commentProps}
          />
        );
      case 'propositions_soins':
        return (
          <PropositionsSoins
            data={formData.propositions_soins}
            onChange={(data) => setFormData((prev) => ({ ...prev, propositions_soins: data }))}
            {...commentProps}
          />
        );
      default: {
        const section = SECTIONS.find((s) => s.id === activeSection)!;
        return <PlaceholderSection section={section} />;
      }
    }
  };

  if (showPreview) {
    return <ReportPreview data={formData} onBack={() => setShowPreview(false)} />;
  }

  return (
    <>
      <UpdateNotification />
      <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={(section) => {
          setActiveSection(section);
          setIsMobileSidebarOpen(false);
        }}
        documentMode={formData.documentMode}
        authorName={formData.identification.carteA.authorName}
        titresExpert={formData.identification.carteA.titresExpert}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          activeSection={activeSection}
          onGenerateReport={() => setShowPreview(true)}
          onNewExpertise={handleNewExpertise}
          onExport={handleExport}
          onImport={handleImport}
          lastSaved={lastSaved}
          onMenuClick={() => setIsMobileSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-10">
            <DocumentModeSelector
              mode={formData.documentMode}
              onChange={(mode: DocumentMode) => setFormData((prev) => ({ ...prev, documentMode: mode }))}
            />
            <PromptModeSelector
              mode={formData.promptMode}
              onChange={(mode: PromptMode) => setFormData((prev) => ({ ...prev, promptMode: mode }))}
            />
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 md:p-8">
              {renderSection()}
            </div>
          </div>
        </main>
      </div>
    </div>
    </>
  );
}
