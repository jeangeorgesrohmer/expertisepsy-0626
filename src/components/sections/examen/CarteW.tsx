import { ExamenCarteWData, YesNoNR } from '../../../types/examen';
import { FormRow, SectionCard } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';

interface Props { data: ExamenCarteWData; onChange: (d: ExamenCarteWData) => void; }

export default function CarteW({ data, onChange }: Props) {
  const set = (field: keyof ExamenCarteWData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });
  return (
    <SectionCard title="S. Troubles du Spectre de l'Autisme (TSA)">
      <FormRow label="TSA présent :">
        <TriToggle value={data.presenceSyndrome} onChange={(v) => set('presenceSyndrome', v)} />
      </FormRow>
      <FormRow label="Antécédents de ce syndrome :">
        <TriToggle value={data.antecedentSyndrome} onChange={(v) => set('antecedentSyndrome', v)} />
      </FormRow>
      {(data.presenceSyndrome === 'Oui' || data.antecedentSyndrome === 'Oui') && (<>
      <FormRow label="Diagnostic etabli ou suspicion clinique de TSA">
        <TriToggle value={data.diagnosticOuSuspicionTSA} onChange={(v) => set('diagnosticOuSuspicionTSA', v)} />
      </FormRow>
      <FormRow label="Troubles des interactions sociales reciproques">
        <TriToggle value={data.troublesInteractionsSociales} onChange={(v) => set('troublesInteractionsSociales', v)} />
      </FormRow>
      <FormRow label="Interets restreints / Stereotypies">
        <TriToggle value={data.interetsRestreintsStereotypies} onChange={(v) => set('interetsRestreintsStereotypies', v)} />
      </FormRow>
      <FormRow label="Particularites sensorielles">
        <TriToggle value={data.particularitesSensorielles} onChange={(v) => set('particularitesSensorielles', v)} />
      </FormRow>
      </>)}
    </SectionCard>
  );
}
