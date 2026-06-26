import { FileText, ListOrdered } from 'lucide-react';
import type { PromptMode } from '../types';

interface PromptModeSelectorProps {
  mode: PromptMode;
  onChange: (mode: PromptMode) => void;
}

export default function PromptModeSelector({ mode, onChange }: PromptModeSelectorProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-slate-600 mb-3">
        Mode de génération IA
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onChange('standard')}
          className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
            mode === 'standard'
              ? 'border-blue-500 bg-blue-50 text-blue-900'
              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
          }`}
        >
          <FileText size={20} className={mode === 'standard' ? 'text-blue-600' : 'text-slate-400'} />
          <div className="text-left">
            <div className="font-semibold text-sm">Prompt standard</div>
            <div className="text-xs mt-0.5 opacity-75">
              Génère uniquement le prompt IA détaillé
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onChange('with_summary')}
          className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
            mode === 'with_summary'
              ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
          }`}
        >
          <ListOrdered size={20} className={mode === 'with_summary' ? 'text-emerald-600' : 'text-slate-400'} />
          <div className="text-left">
            <div className="font-semibold text-sm">Avec résumé</div>
            <div className="text-xs mt-0.5 opacity-75">
              Génère le prompt IA + prompt de résumé
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
