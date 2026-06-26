import { CarteEData, YesNoNR } from '../../../types/anamnese';
import { FormRow, SectionCard, StandaloneText, InlineNumber } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';

interface Props {
  data: CarteEData;
  onChange: (data: CarteEData) => void;
}

export default function CarteE({ data, onChange }: Props) {
  const set = (field: keyof CarteEData, value: YesNoNR | string) =>
    onChange({ ...data, [field]: value });

  return (
    <SectionCard title="E. Antécédents familiaux">
      <FormRow label="Mère en vie">
        <TriToggle value={data.mereEnVie} onChange={(v) => set('mereEnVie', v)} />
      </FormRow>
      <FormRow label="Père en vie">
        <TriToggle value={data.pereEnVie} onChange={(v) => set('pereEnVie', v)} />
      </FormRow>
      <FormRow label="Vie commune">
        <TriToggle value={data.vieCommune} onChange={(v) => set('vieCommune', v)} />
      </FormRow>
      <FormRow label="Fratrie">
        <TriToggle value={data.fratrie} onChange={(v) => set('fratrie', v)} />
        <InlineNumber value={data.fratrieNombre} onChange={(v) => set('fratrieNombre', v)} placeholder="Nombre" />
      </FormRow>
      <FormRow label="Rang dans la fratrie">
        <InlineNumber value={data.rangFratrie} onChange={(v) => set('rangFratrie', v)} placeholder="Rang" />
      </FormRow>
      <FormRow label="Pathologie psychiatrique dans la famille">
        <TriToggle value={data.pathologiePsychiatriquesFamille} onChange={(v) => set('pathologiePsychiatriquesFamille', v)} />
      </FormRow>
      <FormRow label="Suicide(s) dans la famille">
        <TriToggle value={data.suicidesFamille} onChange={(v) => set('suicidesFamille', v)} />
      </FormRow>
      <FormRow label="Alcoolisme familial">
        <TriToggle value={data.alcoolismeFamilial} onChange={(v) => set('alcoolismeFamilial', v)} />
      </FormRow>
      <FormRow label="Violences physiques">
        <TriToggle value={data.violencesPhysiques} onChange={(v) => set('violencesPhysiques', v)} />
      </FormRow>
      <FormRow label="Violences psychologiques">
        <TriToggle value={data.violencesPsychologiques} onChange={(v) => set('violencesPsychologiques', v)} />
      </FormRow>
      <FormRow label="Violences sexuelles">
        <TriToggle value={data.violencesSexuelles} onChange={(v) => set('violencesSexuelles', v)} />
      </FormRow>
      <FormRow label="Négligence">
        <TriToggle value={data.negligence} onChange={(v) => set('negligence', v)} />
      </FormRow>
      <FormRow label="Carence affective majeure">
        <TriToggle value={data.carenceAffectiveMajeure} onChange={(v) => set('carenceAffectiveMajeure', v)} />
      </FormRow>
      <FormRow label="Carence educative precoce">
        <TriToggle value={data.carenceEducativePrecoce} onChange={(v) => set('carenceEducativePrecoce', v)} />
      </FormRow>
      <FormRow label="Placement(s) durant l'enfance">
        <TriToggle value={data.placementEnfance} onChange={(v) => set('placementEnfance', v)} />
      </FormRow>
      <StandaloneText label="Durée des Placement(s)" value={data.placementDuree} onChange={(v) => set('placementDuree', v)} />
    </SectionCard>
  );
}
