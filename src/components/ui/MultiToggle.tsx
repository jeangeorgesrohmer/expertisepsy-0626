interface MultiToggleProps<T extends string> {
  value: T;
  options: readonly T[];
  onChange: (val: T) => void;
  activeColor?: (opt: T) => string;
}

const defaultIdle = 'bg-white text-slate-400 border-slate-200 hover:border-slate-300 hover:text-slate-600';

export default function MultiToggle<T extends string>({
  value,
  options,
  onChange,
  activeColor,
}: MultiToggleProps<T>) {
  const getActive = (opt: T) => {
    if (activeColor) return activeColor(opt);
    return 'bg-blue-500 text-white border-blue-500';
  };

  return (
    <div className="flex rounded-lg border border-slate-200 overflow-hidden flex-shrink-0">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-3 py-2 text-sm font-semibold border-r last:border-r-0 border-slate-200 transition-colors min-h-[2.75rem] ${
            value === opt ? getActive(opt) : defaultIdle
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
