import { Observance } from '../../types/anamnese';

interface QuadToggleProps {
  value: Observance;
  onChange: (val: Observance) => void;
}

const OPTIONS: Observance[] = ['Bonne', 'Moyenne', 'Mauvaise', 'NR'];

const styles: Record<Observance, string> = {
  Bonne: 'bg-emerald-500 text-white border-emerald-500',
  Moyenne: 'bg-amber-400 text-white border-amber-400',
  Mauvaise: 'bg-red-500 text-white border-red-500',
  NR: 'bg-slate-100 text-slate-500 border-slate-200',
};

const idle = 'bg-white text-slate-400 border-slate-200 hover:border-slate-300 hover:text-slate-600';

export default function QuadToggle({ value, onChange }: QuadToggleProps) {
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
