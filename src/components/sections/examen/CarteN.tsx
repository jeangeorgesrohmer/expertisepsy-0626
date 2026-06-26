import { ExamenCarteNData, YesNoNR } from '../../../types/examen';
import { FormRow, SectionCard } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';

interface Props { data: ExamenCarteNData; onChange: (d: ExamenCarteNData) => void; }

export default function CarteN({ data, onChange }: Props) {
  const set = (field: keyof ExamenCarteNData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });
  return (
    <SectionCard title="N. Syndrome d&eacute;ficitaire (n&eacute;gatif)">
      <FormRow label="Syndrome déficitaire présent :"><TriToggle value={data.presenceSyndrome} onChange={(v) => set('presenceSyndrome', v)} /></FormRow>
      <FormRow label="Antécédents de ce syndrome :"><TriToggle value={data.antecedentSyndrome} onChange={(v) => set('antecedentSyndrome', v)} /></FormRow>
      {(data.presenceSyndrome === 'Oui' || data.antecedentSyndrome === 'Oui') && (
        <>
          <FormRow label="&Eacute;moussement affectif"><TriToggle value={data.emoussementAffectif} onChange={(v) => set('emoussementAffectif', v)} /></FormRow>
          <FormRow label="Aboulie"><TriToggle value={data.aboulie} onChange={(v) => set('aboulie', v)} /></FormRow>
          <FormRow label="Apragmatisme"><TriToggle value={data.apragmatisme} onChange={(v) => set('apragmatisme', v)} /></FormRow>
          <FormRow label="Retrait social"><TriToggle value={data.retraitSocial} onChange={(v) => set('retraitSocial', v)} /></FormRow>
          <FormRow label="Alogie"><TriToggle value={data.alogie} onChange={(v) => set('alogie', v)} /></FormRow>
          <FormRow label="Anh&eacute;donie"><TriToggle value={data.anhedonie} onChange={(v) => set('anhedonie', v)} /></FormRow>
        </>
      )}
    </SectionCard>
  );
}
