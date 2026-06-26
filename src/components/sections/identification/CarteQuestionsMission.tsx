import { SectionCard } from '../../ui/FormRow';
import VoiceTextarea from '../../ui/VoiceTextarea';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const textareaClass =
  'w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors resize-y pr-10';

export default function CarteQuestionsMission({ value, onChange }: Props) {
  return (
    <SectionCard title="Questions de la mission d'expertise">
      <div className="py-2.5">
        <label className="block text-sm text-slate-700 mb-1.5">
          Questions de la mission d'expertise (à coller in extenso)
        </label>
        <VoiceTextarea
          className={textareaClass}
          rows={10}
          placeholder="Collez ici les questions exactes telles que formulées dans la réquisition..."
          value={value}
          onChange={onChange}
        />
      </div>
    </SectionCard>
  );
}
