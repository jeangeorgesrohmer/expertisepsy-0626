import { ExamenCarteUData, YesNoNR } from '../../../types/examen';
import { FormRow, SectionCard } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';

interface Props { data: ExamenCarteUData; onChange: (d: ExamenCarteUData) => void; }

export default function CarteU({ data, onChange }: Props) {
  const set = (field: keyof ExamenCarteUData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });
  return (
    <SectionCard title="V. Impulsivite et hetero-agressivite">
      <FormRow label="Syndrome impulsif/agressivité présent :"><TriToggle value={data.presenceSyndrome} onChange={(v) => set('presenceSyndrome', v)} /></FormRow>
      <FormRow label="Antécédents de ce syndrome :"><TriToggle value={data.antecedentSyndrome} onChange={(v) => set('antecedentSyndrome', v)} /></FormRow>
      {(data.presenceSyndrome === 'Oui' || data.antecedentSyndrome === 'Oui') && (<>
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pb-1">Impulsivite</p>
      <FormRow label="Passages a l'acte impulsifs"><TriToggle value={data.passagesActeImpulsifs} onChange={(v) => set('passagesActeImpulsifs', v)} /></FormRow>
      <FormRow label="Difficulte a controler la colere"><TriToggle value={data.difficulteControlerColere} onChange={(v) => set('difficulteControlerColere', v)} /></FormRow>
      <FormRow label="Intolerance a la frustration"><TriToggle value={data.intoleranceFrustration} onChange={(v) => set('intoleranceFrustration', v)} /></FormRow>

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Agressivite</p>
      <FormRow label="Antecedents de violence"><TriToggle value={data.antecedentsViolence} onChange={(v) => set('antecedentsViolence', v)} /></FormRow>
      <FormRow label="Violence verbale"><TriToggle value={data.violenceVerbale} onChange={(v) => set('violenceVerbale', v)} /></FormRow>
      <FormRow label="Violence physique"><TriToggle value={data.violencePhysique} onChange={(v) => set('violencePhysique', v)} /></FormRow>
      <FormRow label="Violence instrumentale"><TriToggle value={data.violenceInstrumentale} onChange={(v) => set('violenceInstrumentale', v)} /></FormRow>
      <FormRow label="Violence reactionnelle"><TriToggle value={data.violenceReactionnelle} onChange={(v) => set('violenceReactionnelle', v)} /></FormRow>

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Dangerosite</p>
      <FormRow label="Dangerosite pour autrui"><TriToggle value={data.dangerositePourAutrui} onChange={(v) => set('dangerositePourAutrui', v)} /></FormRow>
      <FormRow label="Dangerosite pour soi"><TriToggle value={data.dangerositePourSoi} onChange={(v) => set('dangerositePourSoi', v)} /></FormRow>
      </>)}
    </SectionCard>
  );
}
