import { useState, useMemo } from 'react';
import { ArrowLeft, Printer, Bot, FileText, List } from 'lucide-react';
import type { FormData } from '../types';
import { generateAIPrompt, generateSummaryPrompt } from '../utils/generateAIPrompt';
import AIPromptPanel from './AIPromptPanel';
import SectionIdentification from './report/SectionIdentification';
import SectionAnamnese from './report/SectionAnamnese';
import SectionExamen from './report/SectionExamen';
import SectionBiometric from './report/SectionBiometric';
import SectionFaits from './report/SectionFaits';
import SectionRelation from './report/SectionRelation';
import SectionDiagnostic from './report/SectionDiagnostic';
import SectionEvaluation from './report/SectionEvaluation';
import SectionDangerosite from './report/SectionDangerosite';
import SectionConclusions from './report/SectionConclusions';
import SummaryView from './report/SummaryView';

interface ReportPreviewProps {
  data: FormData;
  onBack: () => void;
}

type ViewMode = 'detailed' | 'summary';

export default function ReportPreview({ data, onBack }: ReportPreviewProps) {
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('detailed');

  const promptText = useMemo(
    () => (showAIPrompt ? generateAIPrompt(data) : ''),
    [showAIPrompt, data]
  );

  const summaryPrompt = useMemo(
    () => (showAIPrompt && data.promptMode === 'with_summary' ? generateSummaryPrompt(data) : undefined),
    [showAIPrompt, data]
  );

  const subjectName = [data.identification.carteA.prenom, data.identification.carteA.nom]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="min-h-screen bg-stone-200/60 print:bg-white">
      <div className="print:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-50 active:bg-stone-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={16} />
            Retour
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'detailed' ? 'summary' : 'detailed')}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors border ${
                viewMode === 'summary'
                  ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                  : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
              }`}
              title={viewMode === 'detailed' ? 'Passer à la vue résumé' : 'Passer à la vue détaillée'}
            >
              {viewMode === 'detailed' ? <FileText size={16} /> : <List size={16} />}
              {viewMode === 'detailed' ? 'Vue résumé' : 'Vue détaillée'}
            </button>

            <button
              onClick={() => setShowAIPrompt((v) => !v)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors border ${
                showAIPrompt
                  ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                  : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <Bot size={16} />
              Prompt IA
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-5 py-2.5 bg-stone-800 hover:bg-stone-900 active:bg-stone-950 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
            >
              <Printer size={16} />
              Imprimer / PDF
            </button>
          </div>
        </div>
      </div>

      {showAIPrompt && (
        <div className="print:hidden">
          <AIPromptPanel
            promptText={promptText}
            summaryPrompt={summaryPrompt}
            onClose={() => setShowAIPrompt(false)}
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto py-10 px-4 print:py-0 print:px-0 print:max-w-none">
        <article
          className="bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_30px_rgba(0,0,0,0.06)] print:shadow-none rounded print:rounded-none px-16 py-16 print:px-0 print:py-0 report-document"
        >
          <header className="text-center mb-14 pb-8 border-b border-stone-300">
            <p className="text-xs uppercase tracking-[0.25em] text-stone-400 mb-4">
              Confidentiel — Usage medical
            </p>
            <h1 className="text-2xl font-bold uppercase tracking-widest text-stone-900 mb-1">
              Rapport d'expertise
            </h1>
            <h2 className="text-lg font-semibold uppercase tracking-wider text-stone-700 mb-6">
              psychiatrique
            </h2>
            {subjectName && (
              <p className="text-base text-stone-600 mt-4">
                Concernant : <span className="font-semibold text-stone-900">{subjectName}</span>
              </p>
            )}
            {data.identification.carteA.dateExamen && (
              <p className="text-sm text-stone-400 mt-2">
                Examen du {data.identification.carteA.dateExamen}
              </p>
            )}
          </header>

          <div className="space-y-10">
            {viewMode === 'summary' ? (
              <SummaryView data={data} />
            ) : (
              <>
                <SectionIdentification data={data.identification} />
                <SectionAnamnese data={data.anamnese} />
                <SectionExamen data={data.examen_psychiatrique} />
                <SectionBiometric data={data.biometric_data} />
                <SectionFaits data={data.examen_faits} />
                <SectionRelation data={data.relation_faits} />
                <SectionDiagnostic data={data.diagnostic} />
                <SectionEvaluation data={data.evaluation} />
                <SectionDangerosite data={data.dangerosite} />
                <SectionConclusions data={data.conclusions} />
              </>
            )}
          </div>

          <footer className="mt-16 pt-6 border-t border-stone-200 text-center">
            <p className="text-xs text-stone-400 tracking-wide">
              Document genere automatiquement — Usage medical confidentiel
            </p>
          </footer>
        </article>
      </div>
    </div>
  );
}
