import { ExamenCarteVData, YesNoNR } from '../../../types/examen';
import { FormRow, SectionCard } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';

interface Props { data: ExamenCarteVData; onChange: (d: ExamenCarteVData) => void; }

export default function CarteV({ data, onChange }: Props) {
  const set = (field: keyof ExamenCarteVData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });
  return (
    <SectionCard title="W. Authenticite des troubles / Simulation">
      <FormRow label="Suspicion de simulation présente :">
        <TriToggle value={data.presenceSyndrome} onChange={(v) => set('presenceSyndrome', v)} />
      </FormRow>
      <FormRow label="Antécédents de ce syndrome :">
        <TriToggle value={data.antecedentSyndrome} onChange={(v) => set('antecedentSyndrome', v)} />
      </FormRow>
      {(data.presenceSyndrome === 'Oui' || data.antecedentSyndrome === 'Oui') && (<>
      <FormRow label="Suspicion de simulation (Malingering)">
        <TriToggle value={data.suspicionSimulation} onChange={(v) => set('suspicionSimulation', v)} />
      </FormRow>
      <FormRow label="Exageration des symptomes">
        <TriToggle value={data.exagerationSymptomes} onChange={(v) => set('exagerationSymptomes', v)} />
      </FormRow>
      <FormRow label="Production de symptomes absurdes (Syndrome de Ganser)">
        <TriToggle value={data.productionSymptomesAbsurdes} onChange={(v) => set('productionSymptomesAbsurdes', v)} />
      </FormRow>
      <FormRow label="Reticence / Opposition calculee">
        <TriToggle value={data.reticenceOppositionCalculee} onChange={(v) => set('reticenceOppositionCalculee', v)} />
      </FormRow>
      <FormRow label="Incoherence entre observation clinique et intensite des plaintes">
        <TriToggle value={data.incoherenceObservationPlaintes} onChange={(v) => set('incoherenceObservationPlaintes', v)} />
      </FormRow>
      </>)}
    </SectionCard>
  );
}
