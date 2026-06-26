import { ExamenCarteQData, YesNoNR } from '../../../types/examen';
import { FormRow, SectionCard } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';

interface Props { data: ExamenCarteQData; onChange: (d: ExamenCarteQData) => void; }

export default function CarteQ({ data, onChange }: Props) {
  const set = (field: keyof ExamenCarteQData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });
  return (
    <SectionCard title="Q. Troubles du comportement alimentaire">
      <FormRow label="TCA présent :"><TriToggle value={data.presenceSyndrome} onChange={(v) => set('presenceSyndrome', v)} /></FormRow>
      <FormRow label="Antécédents de ce syndrome :"><TriToggle value={data.antecedentSyndrome} onChange={(v) => set('antecedentSyndrome', v)} /></FormRow>
      {(data.presenceSyndrome === 'Oui' || data.antecedentSyndrome === 'Oui') && (
        <>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pb-1">Anorexie mentale</p>
          <FormRow label="Restriction alimentaire"><TriToggle value={data.restrictionAlimentaire} onChange={(v) => set('restrictionAlimentaire', v)} /></FormRow>
          <FormRow label="Peur de grossir"><TriToggle value={data.peurDeGrossir} onChange={(v) => set('peurDeGrossir', v)} /></FormRow>
          <FormRow label="Distorsion de l'image corporelle"><TriToggle value={data.distorsionImageCorporelle} onChange={(v) => set('distorsionImageCorporelle', v)} /></FormRow>
          <FormRow label="Am&eacute;norrh&eacute;e"><TriToggle value={data.amenorrhee} onChange={(v) => set('amenorrhee', v)} /></FormRow>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Boulimie</p>
          <FormRow label="Acc&egrave;s boulimiques"><TriToggle value={data.accesBoulimiques} onChange={(v) => set('accesBoulimiques', v)} /></FormRow>
          <FormRow label="Conduites compensatoires"><TriToggle value={data.conduitesCompensatoires} onChange={(v) => set('conduitesCompensatoires', v)} /></FormRow>
          <FormRow label="Hyperphagie boulimique"><TriToggle value={data.hyperphagieBoulimique} onChange={(v) => set('hyperphagieBoulimique', v)} /></FormRow>
        </>
      )}
    </SectionCard>
  );
}
