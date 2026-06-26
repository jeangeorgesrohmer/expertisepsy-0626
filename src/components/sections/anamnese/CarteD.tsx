import { CarteDData, YesNoNR } from '../../../types/anamnese';
import { FormRow, SectionCard, StandaloneText, StandaloneNumber } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';

interface Props {
  data: CarteDData;
  onChange: (data: CarteDData) => void;
}

export default function CarteD({ data, onChange }: Props) {
  const set = (field: keyof CarteDData, value: YesNoNR | string) =>
    onChange({ ...data, [field]: value });

  return (
    <SectionCard title="D. Antécédents judiciaires">
      <FormRow label="Aucun">
        <TriToggle value={data.aucunAntecedentJudiciaire} onChange={(v) => set('aucunAntecedentJudiciaire', v)} />
      </FormRow>
      <FormRow label="Condamnation(s) antérieure(s)">
        <TriToggle value={data.condamnationsAnterieures} onChange={(v) => set('condamnationsAnterieures', v)} />
      </FormRow>
      <StandaloneText label="Nature" value={data.condamnationsNature} onChange={(v) => set('condamnationsNature', v)} />
      <FormRow label="Incarcération antérieure">
        <TriToggle value={data.incarcerationAnterieure} onChange={(v) => set('incarcerationAnterieure', v)} />
      </FormRow>
      <StandaloneNumber label="Nombre" value={data.incarcerationNombre} onChange={(v) => set('incarcerationNombre', v)} />
      <StandaloneText label="Durée" value={data.incarcerationDuree} onChange={(v) => set('incarcerationDuree', v)} placeholder="ex: 6 mois, 2 ans" />
      <StandaloneNumber label="Age du 1er contact avec la Justice" value={data.agePremierContactJustice} onChange={(v) => set('agePremierContactJustice', v)} placeholder="Âge" />
      <FormRow label="Antécédents infractions sexuelles">
        <TriToggle value={data.antecedentsInfractionsSexuelles} onChange={(v) => set('antecedentsInfractionsSexuelles', v)} />
      </FormRow>
      <StandaloneText label="Nature" value={data.infractionsSexuellesNature} onChange={(v) => set('infractionsSexuellesNature', v)} />
      <FormRow label="Inscription au FIJAIS">
        <TriToggle value={data.inscriptionFIJAIS} onChange={(v) => set('inscriptionFIJAIS', v)} />
      </FormRow>
      <FormRow label="Procédures en cours">
        <TriToggle value={data.proceduresEnCours} onChange={(v) => set('proceduresEnCours', v)} />
      </FormRow>
      <StandaloneText label="Nature" value={data.proceduresEnCoursNature} onChange={(v) => set('proceduresEnCoursNature', v)} />
    </SectionCard>
  );
}
