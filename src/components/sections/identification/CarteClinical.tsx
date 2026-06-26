import { ClinicalContextData } from '../../../types';
import { SectionCard } from '../../ui/FormRow';
import VoiceTextarea from '../../ui/VoiceTextarea';

interface Props {
  data: ClinicalContextData;
  onChange: (d: ClinicalContextData) => void;
}

const inputClass =
  'w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors';

const textareaClass =
  'w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors resize-y min-h-[80px] pr-10';

export default function CarteClinical({ data, onChange }: Props) {
  return (
    <SectionCard title="Contexte Clinique">
      <div className="py-2.5 border-b border-slate-50">
        <label className="block text-sm text-slate-700 mb-1.5">Médecin adresseur</label>
        <input
          type="text"
          className={inputClass}
          placeholder="Dr. [Nom du médecin traitant ou référent]"
          value={data.medecinAdresseur}
          onChange={(e) => onChange({ ...data, medecinAdresseur: e.target.value })}
        />
      </div>

      <div className="py-2.5">
        <label className="block text-sm text-slate-700 mb-1.5">
          Motif de la consultation / Contexte de la demande
        </label>
        <VoiceTextarea
          className={textareaClass}
          placeholder="Décrivez le motif de consultation et le contexte de la demande..."
          value={data.motifConsultation}
          onChange={(v) => onChange({ ...data, motifConsultation: v })}
        />
      </div>
    </SectionCard>
  );
}
