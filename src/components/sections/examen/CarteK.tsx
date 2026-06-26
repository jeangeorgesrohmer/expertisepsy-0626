import { ExamenCarteKData, YesNoNR } from '../../../types/examen';
import { FormRow, SectionCard } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';

interface Props { data: ExamenCarteKData; onChange: (d: ExamenCarteKData) => void; }

export default function CarteK({ data, onChange }: Props) {
  const set = (field: keyof ExamenCarteKData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });
  return (
    <SectionCard title="K. Hallucinations et troubles de la perception">
      <FormRow label="Syndrome hallucinatoire présent :"><TriToggle value={data.presenceSyndrome} onChange={(v) => set('presenceSyndrome', v)} /></FormRow>
      <FormRow label="Antécédents de ce syndrome :"><TriToggle value={data.antecedentSyndrome} onChange={(v) => set('antecedentSyndrome', v)} /></FormRow>
      {(data.presenceSyndrome === 'Oui' || data.antecedentSyndrome === 'Oui') && (
        <>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pb-1">Hallucinations acoustico-verbales</p>
          <FormRow label="Presentes"><TriToggle value={data.hallucinationsAcousticoVerbales} onChange={(v) => set('hallucinationsAcousticoVerbales', v)} /></FormRow>
          <FormRow label="Voix commentant les actes"><TriToggle value={data.voixCommentantActes} onChange={(v) => set('voixCommentantActes', v)} /></FormRow>
          <FormRow label="Voix dialoguant entre elles"><TriToggle value={data.voixDialoguantEntreElles} onChange={(v) => set('voixDialoguantEntreElles', v)} /></FormRow>
          <FormRow label="Voix imperatives"><TriToggle value={data.voixImperatives} onChange={(v) => set('voixImperatives', v)} /></FormRow>

          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Autres hallucinations</p>
          <FormRow label="Hallucinations visuelles"><TriToggle value={data.hallucinationsVisuelles} onChange={(v) => set('hallucinationsVisuelles', v)} /></FormRow>
          <FormRow label="Hallucinations olfactives"><TriToggle value={data.hallucinationsOlfactives} onChange={(v) => set('hallucinationsOlfactives', v)} /></FormRow>
          <FormRow label="Hallucinations cenesthesiques"><TriToggle value={data.hallucinationsCenesthesiques} onChange={(v) => set('hallucinationsCenesthesiques', v)} /></FormRow>

          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Illusions</p>
          <FormRow label="Presentes"><TriToggle value={data.illusions} onChange={(v) => set('illusions', v)} /></FormRow>
        </>
      )}
    </SectionCard>
  );
}
