import { ExamenCarteLData, YesNoNR } from '../../../types/examen';
import { FormRow, SectionCard } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';

interface Props { data: ExamenCarteLData; onChange: (d: ExamenCarteLData) => void; }

export default function CarteL({ data, onChange }: Props) {
  const set = (field: keyof ExamenCarteLData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });
  return (
    <SectionCard title="L. Syndrome de desorganisation (dissociation)">
      <FormRow label="Syndrome dissociatif présent :"><TriToggle value={data.presenceSyndrome} onChange={(v) => set('presenceSyndrome', v)} /></FormRow>
      <FormRow label="Antécédents de ce syndrome :"><TriToggle value={data.antecedentSyndrome} onChange={(v) => set('antecedentSyndrome', v)} /></FormRow>
      {(data.presenceSyndrome === 'Oui' || data.antecedentSyndrome === 'Oui') && (
        <>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pb-1">Discordance ideo-affective</p>
          <FormRow label="Presente"><TriToggle value={data.discordanceIdeoAffective} onChange={(v) => set('discordanceIdeoAffective', v)} /></FormRow>
          <FormRow label="Reactions emotionnelles inadaptees"><TriToggle value={data.reactionsEmotionnellesInadaptees} onChange={(v) => set('reactionsEmotionnellesInadaptees', v)} /></FormRow>
          <FormRow label="Rires immotives"><TriToggle value={data.riresImmotives} onChange={(v) => set('riresImmotives', v)} /></FormRow>

          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Troubles du cours de la pensee</p>
          <FormRow label="Barrages"><TriToggle value={data.barrages} onChange={(v) => set('barrages', v)} /></FormRow>
          <FormRow label="Fading"><TriToggle value={data.fading} onChange={(v) => set('fading', v)} /></FormRow>
          <FormRow label="Diffluence"><TriToggle value={data.diffluence} onChange={(v) => set('diffluence', v)} /></FormRow>

          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Bizarreries comportementales</p>
          <FormRow label="Presentes"><TriToggle value={data.bizarreriesComportementales} onChange={(v) => set('bizarreriesComportementales', v)} /></FormRow>
          <FormRow label="Manieres"><TriToggle value={data.manieres} onChange={(v) => set('manieres', v)} /></FormRow>
          <FormRow label="Paramimies"><TriToggle value={data.paramimies} onChange={(v) => set('paramimies', v)} /></FormRow>

          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Ambivalence</p>
          <FormRow label="Presente"><TriToggle value={data.ambivalence} onChange={(v) => set('ambivalence', v)} /></FormRow>
        </>
      )}
    </SectionCard>
  );
}
