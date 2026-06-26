import { YesNoNR } from '../../types/anamnese';

interface TriToggleProps {
  value: YesNoNR;
  onChange: (val: YesNoNR) => void;
}

const OPTIONS: YesNoNR[] = ['Oui', 'Non', 'NR'];

const styles: Record<YesNoNR, string> = {
  Oui: 'bg-emerald-500 text-white border-emerald-500',
  Non: 'bg-red-500 text-white border-red-500',
  NR: 'bg-slate-100 text-slate-500 border-slate-200',
};

const idle = 'bg-white text-slate-400 border-slate-200 hover:border-slate-300 hover:text-slate-600';

export default function TriToggle({ value, onChange }: TriToggleProps) {
  return (
    <div className="flex rounded-lg border border-slate-200 overflow-hidden flex-shrink-0">
      {OPTIONS.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-3 py-2 text-sm font-semibold border-r last:border-r-0 border-slate-200 transition-colors min-h-[2.75rem] ${
            value === opt ? styles[opt] : idle
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
