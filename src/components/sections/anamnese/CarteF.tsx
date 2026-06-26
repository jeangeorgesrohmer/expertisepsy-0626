import { CarteFData, YesNoNR } from '../../../types/anamnese';
import { FormRow, SectionCard, StandaloneText, InlineNumber } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';

interface Props {
  data: CarteFData;
  onChange: (data: CarteFData) => void;
}

export default function CarteF({ data, onChange }: Props) {
  const set = (field: keyof CarteFData, value: YesNoNR | string) =>
    onChange({ ...data, [field]: value });

  return (
    <SectionCard title="F. Scolarité et formation">
      <FormRow label="Scolarité normale">
        <TriToggle value={data.scolariteNormale} onChange={(v) => set('scolariteNormale', v)} />
      </FormRow>
      <FormRow label="Redoublement(s)">
        <TriToggle value={data.redoublements} onChange={(v) => set('redoublements', v)} />
        <InlineNumber value={data.redoublementsNombre} onChange={(v) => set('redoublementsNombre', v)} placeholder="Nombre" />
      </FormRow>
      <FormRow label="Orientation spécialisée">
        <TriToggle value={data.orientationSpecialisee} onChange={(v) => set('orientationSpecialisee', v)} />
      </FormRow>
      <StandaloneText label="Diplôme obtenu" value={data.diplomeObtenu} onChange={(v) => set('diplomeObtenu', v)} />
      <FormRow label="Troubles dys (dyslexie, etc.)">
        <TriToggle value={data.troublesDys} onChange={(v) => set('troublesDys', v)} />
      </FormRow>
      <FormRow label="Difficultés globales dans les apprentissages">
        <TriToggle value={data.difficultesApprentissages} onChange={(v) => set('difficultesApprentissages', v)} />
      </FormRow>
      <FormRow label="Troubles du comportement à l'école">
        <TriToggle value={data.troublesComportementEcole} onChange={(v) => set('troublesComportementEcole', v)} />
      </FormRow>
      <FormRow label="Déscolarisation">
        <TriToggle value={data.descolarisation} onChange={(v) => set('descolarisation', v)} />
      </FormRow>
      <FormRow label="Victime de harcèlement scolaire">
        <TriToggle value={data.victimeHarcelementScolaire} onChange={(v) => set('victimeHarcelementScolaire', v)} />
      </FormRow>
    </SectionCard>
  );
}
