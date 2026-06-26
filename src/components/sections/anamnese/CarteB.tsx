import { CarteBData, Observance, YesNoNR } from '../../../types/anamnese';
import { FormRow, SectionCard, StandaloneText, StandaloneNumber } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';
import QuadToggle from '../../ui/QuadToggle';

interface Props {
  data: CarteBData;
  onChange: (data: CarteBData) => void;
}

export default function CarteB({ data, onChange }: Props) {
  const set = (field: keyof CarteBData, value: YesNoNR | Observance | string) =>
    onChange({ ...data, [field]: value });

  return (
    <SectionCard title="B. Antécédents psychiatriques">
      <FormRow label="Jamais hospitalisé(e)">
        <TriToggle value={data.jamaisHospitalise} onChange={(v) => set('jamaisHospitalise', v)} />
      </FormRow>
      <FormRow label="Hospitalisation libre">
        <TriToggle value={data.hospitalisationLibre} onChange={(v) => set('hospitalisationLibre', v)} />
      </FormRow>
      <FormRow label="Hospitalisation sous contrainte">
        <TriToggle value={data.hospitalisationSousContrainte} onChange={(v) => set('hospitalisationSousContrainte', v)} />
      </FormRow>
      <FormRow label="Hospitalisation en cours">
        <TriToggle value={data.hospitalisationEnCours} onChange={(v) => set('hospitalisationEnCours', v)} />
      </FormRow>
      <StandaloneNumber label="Nombre d'hospitalisations" value={data.nombreHospitalisations} onChange={(v) => set('nombreHospitalisations', v)} />
      <StandaloneText label="Date(s)" value={data.datesHospitalisations} onChange={(v) => set('datesHospitalisations', v)} placeholder="ex: 03/2018, 11/2021" />
      <FormRow label="Suivi psychiatrique en cours">
        <TriToggle value={data.suiviPsychiatriqueEnCours} onChange={(v) => set('suiviPsychiatriqueEnCours', v)} />
      </FormRow>
      <FormRow label="Suivi psychologique en cours">
        <TriToggle value={data.suiviPsychologiqueEnCours} onChange={(v) => set('suiviPsychologiqueEnCours', v)} />
      </FormRow>
      <FormRow label="Suivi antérieur">
        <TriToggle value={data.suiviAnterieur} onChange={(v) => set('suiviAnterieur', v)} />
      </FormRow>
      <FormRow label="Jamais suivi">
        <TriToggle value={data.jamaisSuivi} onChange={(v) => set('jamaisSuivi', v)} />
      </FormRow>
      <FormRow label="Antidépresseur">
        <TriToggle value={data.antidepresseur} onChange={(v) => set('antidepresseur', v)} />
      </FormRow>
      <FormRow label="Anxiolytique">
        <TriToggle value={data.anxiolytique} onChange={(v) => set('anxiolytique', v)} />
      </FormRow>
      <FormRow label="Hypnotique">
        <TriToggle value={data.hypnotique} onChange={(v) => set('hypnotique', v)} />
      </FormRow>
      <FormRow label="Neuroleptique">
        <TriToggle value={data.neuroleptique} onChange={(v) => set('neuroleptique', v)} />
      </FormRow>
      <FormRow label="Thymorégulateur">
        <TriToggle value={data.thymoregulateur} onChange={(v) => set('thymoregulateur', v)} />
      </FormRow>
      <FormRow label="Anti-androgène">
        <TriToggle value={data.antiAndrogene} onChange={(v) => set('antiAndrogene', v)} />
      </FormRow>
      <FormRow label="Observance du traitement">
        <QuadToggle value={data.observanceTraitement} onChange={(v) => set('observanceTraitement', v)} />
      </FormRow>
      <StandaloneText label="Autres traitements (préciser)" value={data.autresTraitementsPreciser} onChange={(v) => set('autresTraitementsPreciser', v)} />
      <FormRow label="Tentative de suicide">
        <TriToggle value={data.tentativeSuicide} onChange={(v) => set('tentativeSuicide', v)} />
      </FormRow>
      <StandaloneNumber label="Nombre de TS" value={data.nombreTS} onChange={(v) => set('nombreTS', v)} />
      <StandaloneText label="Date(s) des TS" value={data.datesTS} onChange={(v) => set('datesTS', v)} />
      <StandaloneText label="Moyen(s) utilisé(s)" value={data.moyensUtilises} onChange={(v) => set('moyensUtilises', v)} />
      <FormRow label="Scarifications">
        <TriToggle value={data.scarifications} onChange={(v) => set('scarifications', v)} />
      </FormRow>
      <FormRow label="Automutilations">
        <TriToggle value={data.automutilations} onChange={(v) => set('automutilations', v)} />
      </FormRow>
      <FormRow label="Rupture de soins / arret du traitement avant les faits">
        <TriToggle value={data.ruptureSoinsAvantFaits} onChange={(v) => set('ruptureSoinsAvantFaits', v)} />
      </FormRow>
    </SectionCard>
  );
}
