import { DocumentMode } from '../types';
import { FileText, Stethoscope } from 'lucide-react';

interface Props {
  mode: DocumentMode;
  onChange: (mode: DocumentMode) => void;
}

export default function DocumentModeSelector({ mode, onChange }: Props) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-slate-50 border border-blue-200 rounded-xl p-5 mb-6">
      <div className="flex items-center justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-slate-800 mb-1">Mode de rédaction</h3>
          <p className="text-xs text-slate-600">
            Sélectionnez le type de document à générer
          </p>
        </div>

        <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm border border-slate-200">
          <button
            onClick={() => onChange('expertise')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-md font-medium text-sm transition-all duration-200 ${
              mode === 'expertise'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            Expertise Médico-Légale
          </button>

          <button
            onClick={() => onChange('clinical')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-md font-medium text-sm transition-all duration-200 ${
              mode === 'clinical'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            Bilan Clinique Standard
          </button>
        </div>
      </div>
    </div>
  );
}
