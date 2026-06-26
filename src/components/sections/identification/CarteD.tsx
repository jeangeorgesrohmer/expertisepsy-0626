import { IdentCarteDData } from '../../../types';
import { SectionCard } from '../../ui/FormRow';
import VoiceTextarea from '../../ui/VoiceTextarea';

interface Props {
  data: IdentCarteDData;
  onChange: (d: IdentCarteDData) => void;
}

const textareaClass =
  'w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors resize-y min-h-[160px] pr-10';

export default function CarteD({ data, onChange }: Props) {
  return (
    <SectionCard title="D. Rappel des faits">
      <div className="py-2.5">
        <label className="block text-sm text-slate-700 mb-1.5">Rappel des faits (Motif de la mission)</label>
        <VoiceTextarea
          className={textareaClass}
          placeholder="Décrivez les faits et le motif de la mission..."
          value={data.rappelDesFaits}
          onChange={(v) => onChange({ ...data, rappelDesFaits: v })}
        />
      </div>
    </SectionCard>
  );
}
