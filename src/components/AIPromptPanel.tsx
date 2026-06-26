import { useState } from 'react';
import { Copy, Check, X } from 'lucide-react';

interface AIPromptPanelProps {
  promptText: string;
  summaryPrompt?: string;
  onClose: () => void;
}

export default function AIPromptPanel({ promptText, summaryPrompt, onClose }: AIPromptPanelProps) {
  const [copiedMain, setCopiedMain] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const handleCopy = async (text: string, isSummary: boolean) => {
    try {
      await navigator.clipboard.writeText(text);
      if (isSummary) {
        setCopiedSummary(true);
        setTimeout(() => setCopiedSummary(false), 2500);
      } else {
        setCopiedMain(true);
        setTimeout(() => setCopiedMain(false), 2500);
      }
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      if (isSummary) {
        setCopiedSummary(true);
        setTimeout(() => setCopiedSummary(false), 2500);
      } else {
        setCopiedMain(true);
        setTimeout(() => setCopiedMain(false), 2500);
      }
    }
  };

  return (
    <div className="print:hidden bg-slate-50 border-b border-slate-200">
      <div className="max-w-[850px] mx-auto px-6 py-4 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-700">
            Prompts anonymisés pour IA externe
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                1. Prompt principal - Génération du rapport
              </h4>
              <button
                onClick={() => handleCopy(promptText, false)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  copiedMain
                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 active:bg-slate-100'
                }`}
              >
                {copiedMain ? <Check size={12} /> : <Copy size={12} />}
                {copiedMain ? 'Copié !' : 'Copier'}
              </button>
            </div>
            <textarea
              readOnly
              value={promptText}
              className="w-full h-64 p-4 text-xs font-mono text-slate-700 bg-white border border-slate-200 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
            />
            <p className="mt-2 text-xs text-slate-500">
              Copiez ce prompt dans votre IA préférée pour générer le rapport complet
            </p>
          </div>

          {summaryPrompt && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
                  2. Prompt de résumé - Synthèse du rapport
                </h4>
                <button
                  onClick={() => handleCopy(summaryPrompt, true)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    copiedSummary
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 active:bg-slate-100'
                  }`}
                >
                  {copiedSummary ? <Check size={12} /> : <Copy size={12} />}
                  {copiedSummary ? 'Copié !' : 'Copier'}
                </button>
              </div>
              <textarea
                readOnly
                value={summaryPrompt}
                className="w-full h-48 p-4 text-xs font-mono text-slate-700 bg-white border border-emerald-200 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
              />
              <p className="mt-2 text-xs text-emerald-600">
                Après avoir obtenu le rapport complet, copiez ce prompt dans votre IA pour obtenir un résumé synthétique
              </p>
            </div>
          )}
        </div>

        <div className="pt-2 border-t border-slate-200">
          <p className="text-xs text-slate-400">
            Ces textes ne contiennent aucune donnée nominative. Vous pouvez les coller dans l'IA de votre choix.
          </p>
        </div>
      </div>
    </div>
  );
}
