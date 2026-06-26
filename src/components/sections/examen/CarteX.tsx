import { ExamenCarteXData, YesNoNR } from '../../../types/examen';
import { FormRow, SectionCard } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';

interface Props { data: ExamenCarteXData; onChange: (d: ExamenCarteXData) => void; }

export default function CarteX({ data, onChange }: Props) {
  const set = (field: keyof ExamenCarteXData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });
  return (
    <SectionCard title="X. Troubles a symptomatologie somatique, psychogenes et pathomimies">
      <FormRow label="Troubles somatoformes présents :">
        <TriToggle value={data.presenceSyndrome} onChange={(v) => set('presenceSyndrome', v)} />
      </FormRow>
      <FormRow label="Antécédents de ce syndrome :">
        <TriToggle value={data.antecedentSyndrome} onChange={(v) => set('antecedentSyndrome', v)} />
      </FormRow>
      {(data.presenceSyndrome === 'Oui' || data.antecedentSyndrome === 'Oui') && (<>
      <FormRow label="Trouble a symptomatologie somatique (plaintes physiques excessives et invalidantes)">
        <TriToggle value={data.troubleSymptomatologieSomatique} onChange={(v) => set('troubleSymptomatologieSomatique', v)} />
      </FormRow>
      <FormRow label="Crainte excessive d'avoir une maladie (Hypocondrie)">
        <TriToggle value={data.crainteExcessiveMaladie} onChange={(v) => set('crainteExcessiveMaladie', v)} />
      </FormRow>
      <FormRow label="Trouble de conversion / trouble neurologique fonctionnel (Deficit moteur, sensitif, CNEP)">
        <TriToggle value={data.troubleConversion} onChange={(v) => set('troubleConversion', v)} />
      </FormRow>
      <FormRow label="Trouble factice / Pathomimie classique (Production intentionnelle de symptomes)">
        <TriToggle value={data.troubleFacticePathomimie} onChange={(v) => set('troubleFacticePathomimie', v)} />
      </FormRow>
      <FormRow label="Syndrome de Munchhausen (formes graves et chroniques avec peregrinations medicales)">
        <TriToggle value={data.syndromeMunchhausen} onChange={(v) => set('syndromeMunchhausen', v)} />
      </FormRow>
      <FormRow label="Syndrome de Munchhausen par procuration (trouble factice impose a autrui)">
        <TriToggle value={data.syndromeMunchhausenProcuration} onChange={(v) => set('syndromeMunchhausenProcuration', v)} />
      </FormRow>
      <FormRow label="Facteurs psychologiques aggravant une affection medicale">
        <TriToggle value={data.facteursPsychologiquesAggravants} onChange={(v) => set('facteursPsychologiquesAggravants', v)} />
      </FormRow>
      </>)}
    </SectionCard>
  );
}
