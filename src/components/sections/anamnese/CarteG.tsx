import { CarteGData, YesNoNR } from '../../../types/anamnese';
import { FormRow, SectionCard, StandaloneText } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';

interface Props {
  data: CarteGData;
  onChange: (data: CarteGData) => void;
}

export default function CarteG({ data, onChange }: Props) {
  const set = (field: keyof CarteGData, value: YesNoNR | string) =>
    onChange({ ...data, [field]: value });

  return (
    <SectionCard title="G. Situation professionnelle">
      <FormRow label="En activité">
        <TriToggle value={data.enActivite} onChange={(v) => set('enActivite', v)} />
      </FormRow>
      <FormRow label="Au chômage">
        <TriToggle value={data.auChomage} onChange={(v) => set('auChomage', v)} />
      </FormRow>
      <FormRow label="En arrêt maladie">
        <TriToggle value={data.enArretMaladie} onChange={(v) => set('enArretMaladie', v)} />
      </FormRow>
      <FormRow label="Invalidité">
        <TriToggle value={data.invalidite} onChange={(v) => set('invalidite', v)} />
      </FormRow>
      <FormRow label="Retraité(e)">
        <TriToggle value={data.retraite} onChange={(v) => set('retraite', v)} />
      </FormRow>
      <StandaloneText label="Profession" value={data.profession} onChange={(v) => set('profession', v)} placeholder="Intitulé du poste / métier" />
      <FormRow label="Stabilité professionnelle">
        <TriToggle value={data.stabiliteProfessionnelle} onChange={(v) => set('stabiliteProfessionnelle', v)} />
      </FormRow>
      <FormRow label="Changements fréquents d'emploi">
        <TriToggle value={data.changementsFréquentsEmploi} onChange={(v) => set('changementsFréquentsEmploi', v)} />
      </FormRow>
      <FormRow label="Conflits professionnels">
        <TriToggle value={data.conflitsProfessionnels} onChange={(v) => set('conflitsProfessionnels', v)} />
      </FormRow>
    </SectionCard>
  );
}
