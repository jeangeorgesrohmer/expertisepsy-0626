import { ExamenCarteAData, YesNoNR } from '../../../types/examen';
import { FormRow, SectionCard } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';

interface Props { data: ExamenCarteAData; onChange: (d: ExamenCarteAData) => void; }

export default function CarteA({ data, onChange }: Props) {
  const set = (field: keyof ExamenCarteAData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });
  return (
    <SectionCard title="A. Conditions de l'examen">
      <FormRow label="Coopérant(e)"><TriToggle value={data.cooperant} onChange={(v) => set('cooperant', v)} /></FormRow>
      <FormRow label="Réticent(e)"><TriToggle value={data.reticent} onChange={(v) => set('reticent', v)} /></FormRow>
      <FormRow label="Mutique"><TriToggle value={data.mutique} onChange={(v) => set('mutique', v)} /></FormRow>
      <FormRow label="Hostile"><TriToggle value={data.hostile} onChange={(v) => set('hostile', v)} /></FormRow>
      <FormRow label="Méfiant(e)"><TriToggle value={data.mefiant} onChange={(v) => set('mefiant', v)} /></FormRow>
      <FormRow label="Tenue vestimentaire adaptée"><TriToggle value={data.tenueVestimentaireAdaptee} onChange={(v) => set('tenueVestimentaireAdaptee', v)} /></FormRow>
      <FormRow label="Hygiène correcte"><TriToggle value={data.hygieneCorrecte} onChange={(v) => set('hygieneCorrecte', v)} /></FormRow>
      <FormRow label="Négligence"><TriToggle value={data.negligence} onChange={(v) => set('negligence', v)} /></FormRow>
      <FormRow label="Contact conservé"><TriToggle value={data.contactConserve} onChange={(v) => set('contactConserve', v)} /></FormRow>
      <FormRow label="Contact froid"><TriToggle value={data.contactFroid} onChange={(v) => set('contactFroid', v)} /></FormRow>
      <FormRow label="Contact fuyant"><TriToggle value={data.contactFuyant} onChange={(v) => set('contactFuyant', v)} /></FormRow>
      <FormRow label="Contact adhésif"><TriToggle value={data.contactAdhesif} onChange={(v) => set('contactAdhesif', v)} /></FormRow>
    </SectionCard>
  );
}
