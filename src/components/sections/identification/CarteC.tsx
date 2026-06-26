import { IdentCarteCData } from '../../../types';
import { YesNoNR } from '../../../types/anamnese';
import { FormRow, SectionCard } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';

interface Props {
  data: IdentCarteCData;
  onChange: (d: IdentCarteCData) => void;
}

export default function CarteC({ data, onChange }: Props) {
  const set = (field: keyof IdentCarteCData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });

  return (
    <SectionCard title="C. Qualit&eacute; de l'examin&eacute;(e)">
      <FormRow label="Mis(e) en cause">
        <TriToggle value={data.misEnCause} onChange={(v) => set('misEnCause', v)} />
      </FormRow>
      <FormRow label="Victime">
        <TriToggle value={data.victime} onChange={(v) => set('victime', v)} />
      </FormRow>
      <FormRow label="T&eacute;moin">
        <TriToggle value={data.temoin} onChange={(v) => set('temoin', v)} />
      </FormRow>
    </SectionCard>
  );
}
