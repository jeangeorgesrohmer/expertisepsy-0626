import { ExamenCarteOData, YesNoNR } from '../../../types/examen';
import { FormRow, SectionCard } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';

interface Props { data: ExamenCarteOData; onChange: (d: ExamenCarteOData) => void; }

export default function CarteO({ data, onChange }: Props) {
  const set = (field: keyof ExamenCarteOData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });
  return (
    <SectionCard title="O. Syndrome confusionnel">
      <FormRow label="Syndrome confusionnel présent :"><TriToggle value={data.presenceSyndrome} onChange={(v) => set('presenceSyndrome', v)} /></FormRow>
      <FormRow label="Antécédents de ce syndrome :"><TriToggle value={data.antecedentSyndrome} onChange={(v) => set('antecedentSyndrome', v)} /></FormRow>
      {(data.presenceSyndrome === 'Oui' || data.antecedentSyndrome === 'Oui') && (
        <>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pb-1">Alt&eacute;ration de la vigilance</p>
          <FormRow label="Obnubilation"><TriToggle value={data.obnubilation} onChange={(v) => set('obnubilation', v)} /></FormRow>
          <FormRow label="Fluctuations"><TriToggle value={data.fluctuations} onChange={(v) => set('fluctuations', v)} /></FormRow>
          <FormRow label="D&eacute;sorientation temporo-spatiale"><TriToggle value={data.desorientationTemporoSpatiale} onChange={(v) => set('desorientationTemporoSpatiale', v)} /></FormRow>
          <FormRow label="Amn&eacute;sie ant&eacute;rograde"><TriToggle value={data.amnesieAnterograde} onChange={(v) => set('amnesieAnterograde', v)} /></FormRow>
          <FormRow label="Perplexit&eacute; anxieuse"><TriToggle value={data.perplexiteAnxieuse} onChange={(v) => set('perplexiteAnxieuse', v)} /></FormRow>
          <FormRow label="Onirisme"><TriToggle value={data.onirisme} onChange={(v) => set('onirisme', v)} /></FormRow>
          <FormRow label="D&eacute;but aigu"><TriToggle value={data.debutAigu} onChange={(v) => set('debutAigu', v)} /></FormRow>
        </>
      )}
    </SectionCard>
  );
}
