import { Construction } from 'lucide-react';
import { SectionItem } from '../../types';

interface PlaceholderSectionProps {
  section: SectionItem;
}

export default function PlaceholderSection({ section }: PlaceholderSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-5">
        <Construction size={24} className="text-slate-400" />
      </div>
      <h2 className="text-lg font-semibold text-slate-700 mb-2">
        {section.number}. {section.label}
      </h2>
      <p className="text-slate-400 text-sm max-w-sm">
        Cette section sera disponible dans une prochaine version. Complétez d'abord la section I.
      </p>
    </div>
  );
}
