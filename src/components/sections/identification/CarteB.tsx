import { IdentCarteBData } from '../../../types';
import { YesNoNR } from '../../../types/anamnese';
import { FormRow, SectionCard } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';

interface Props {
  data: IdentCarteBData;
  onChange: (d: IdentCarteBData) => void;
}

const inputClass =
  'w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors';

function TextRow({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="py-2.5 border-b border-slate-50 last:border-b-0">
      <label className="block text-sm text-slate-700 mb-1.5">{label}</label>
      <input type="text" className={inputClass} placeholder={placeholder ?? 'Pr\u00e9ciser...'} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export default function CarteB({ data, onChange }: Props) {
  const setToggle = (field: keyof IdentCarteBData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });
  const setText = (field: keyof IdentCarteBData, value: string) =>
    onChange({ ...data, [field]: value });

  return (
    <SectionCard title="B. Cadre de l'expertise">
      <FormRow label="Expertise p&eacute;nale">
        <TriToggle value={data.expertisePenale} onChange={(v) => setToggle('expertisePenale', v)} />
      </FormRow>
      <TextRow label="Identit&eacute; du Magistrat demandeur" value={data.identiteMagistratDemandeur} onChange={(v) => setText('identiteMagistratDemandeur', v)} placeholder="Nom du Magistrat" />
      <FormRow label="Expertise civile">
        <TriToggle value={data.expertiseCivile} onChange={(v) => setToggle('expertiseCivile', v)} />
      </FormRow>
      <FormRow label="Examen sur r&eacute;quisition">
        <TriToggle value={data.examenSurRequisition} onChange={(v) => setToggle('examenSurRequisition', v)} />
      </FormRow>
      <TextRow label="Identit&eacute; de l'Officier de Police Judiciaire ayant r&eacute;dig&eacute; la r&eacute;quisition" value={data.identiteOPJ} onChange={(v) => setText('identiteOPJ', v)} placeholder="Nom de l'OPJ" />
      <FormRow label="Examen sur commission rogatoire">
        <TriToggle value={data.examenSurCommissionRogatoire} onChange={(v) => setToggle('examenSurCommissionRogatoire', v)} />
      </FormRow>
    </SectionCard>
  );
}
