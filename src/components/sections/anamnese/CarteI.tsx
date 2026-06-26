import { CarteIData, YesNoNR } from '../../../types/anamnese';
import { FormRow, SectionCard, StandaloneText, StandaloneNumber, InlineText } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';

interface Props {
  data: CarteIData;
  onChange: (data: CarteIData) => void;
}

export default function CarteI({ data, onChange }: Props) {
  const set = (field: keyof CarteIData, value: YesNoNR | string) =>
    onChange({ ...data, [field]: value });

  return (
    <SectionCard title="I. Histoire psychosexuelle">
      <FormRow label="Éducation sexuelle reçue">
        <TriToggle value={data.educationSexuelleRecue} onChange={(v) => set('educationSexuelleRecue', v)} />
      </FormRow>
      <StandaloneNumber label="Âge des premières relations sexuelles" value={data.agePremieresRelationsSexuelles} onChange={(v) => set('agePremieresRelationsSexuelles', v)} placeholder="Âge" />
      <FormRow label="Relations sexuelles consenties">
        <TriToggle value={data.relationsSexuellesConsenties} onChange={(v) => set('relationsSexuellesConsenties', v)} />
      </FormRow>
      <FormRow label="Hétérosexuelle">
        <TriToggle value={data.heterosexuelle} onChange={(v) => set('heterosexuelle', v)} />
      </FormRow>
      <FormRow label="Homosexuelle">
        <TriToggle value={data.homosexuelle} onChange={(v) => set('homosexuelle', v)} />
      </FormRow>
      <FormRow label="Bisexuelle">
        <TriToggle value={data.bisexuelle} onChange={(v) => set('bisexuelle', v)} />
      </FormRow>
      <FormRow label="Autres">
        <TriToggle value={data.autresOrientations} onChange={(v) => set('autresOrientations', v)} />
      </FormRow>
      <FormRow label="Activité sexuelle">
        <TriToggle value={data.activiteSexuelle} onChange={(v) => set('activiteSexuelle', v)} />
      </FormRow>
      <FormRow label="Satisfaction sexuelle">
        <TriToggle value={data.satisfactionSexuelle} onChange={(v) => set('satisfactionSexuelle', v)} />
      </FormRow>
      <FormRow label="Troubles sexuels">
        <TriToggle value={data.troublesSexuels} onChange={(v) => set('troublesSexuels', v)} />
        <InlineText value={data.troublesSexuelsPreciser} onChange={(v) => set('troublesSexuelsPreciser', v)} placeholder="Préciser" />
      </FormRow>
      <FormRow label="Dans l'enfance (victimisation)">
        <TriToggle value={data.victimisationEnfance} onChange={(v) => set('victimisationEnfance', v)} />
      </FormRow>
      <FormRow label="À l'âge adulte (victimisation)">
        <TriToggle value={data.victimisationAdulte} onChange={(v) => set('victimisationAdulte', v)} />
      </FormRow>
      <StandaloneText label="Préciser victimisation" value={data.victimisationPreciser} onChange={(v) => set('victimisationPreciser', v)} />
    </SectionCard>
  );
}
