import { ExamenCarteJData, YesNoNR } from '../../../types/examen';
import { FormRow, SectionCard } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';

interface Props { data: ExamenCarteJData; onChange: (d: ExamenCarteJData) => void; }

export default function CarteJ({ data, onChange }: Props) {
  const set = (field: keyof ExamenCarteJData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });
  return (
    <SectionCard title="J. Syndrome delirant">
      <FormRow label="Syndrome délirant présent :"><TriToggle value={data.presenceSyndrome} onChange={(v) => set('presenceSyndrome', v)} /></FormRow>
      <FormRow label="Antécédents de ce syndrome :"><TriToggle value={data.antecedentSyndrome} onChange={(v) => set('antecedentSyndrome', v)} /></FormRow>
      {(data.presenceSyndrome === 'Oui' || data.antecedentSyndrome === 'Oui') && (
        <>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pb-1">Idees delirantes</p>
          <FormRow label="Presence d'idees delirantes"><TriToggle value={data.presenceIdeesDelirantes} onChange={(v) => set('presenceIdeesDelirantes', v)} /></FormRow>
          <FormRow label="Adhesion totale"><TriToggle value={data.adhesionTotale} onChange={(v) => set('adhesionTotale', v)} /></FormRow>
          <FormRow label="Adhesion partielle"><TriToggle value={data.adhesionPartielle} onChange={(v) => set('adhesionPartielle', v)} /></FormRow>

          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Themes delirants</p>
          <FormRow label="Persecution"><TriToggle value={data.persecution} onChange={(v) => set('persecution', v)} /></FormRow>
          <FormRow label="Prejudice"><TriToggle value={data.prejudice} onChange={(v) => set('prejudice', v)} /></FormRow>
          <FormRow label="Reference"><TriToggle value={data.reference} onChange={(v) => set('reference', v)} /></FormRow>
          <FormRow label="Influence"><TriToggle value={data.influence} onChange={(v) => set('influence', v)} /></FormRow>
          <FormRow label="Megalomanie"><TriToggle value={data.megalomanie} onChange={(v) => set('megalomanie', v)} /></FormRow>
          <FormRow label="Mystique"><TriToggle value={data.mystique} onChange={(v) => set('mystique', v)} /></FormRow>
          <FormRow label="Erotomaniaque"><TriToggle value={data.erotomaniaque} onChange={(v) => set('erotomaniaque', v)} /></FormRow>
          <FormRow label="Jalousie"><TriToggle value={data.jalousie} onChange={(v) => set('jalousie', v)} /></FormRow>
          <FormRow label="Hypocondriaque"><TriToggle value={data.hypocondriaque} onChange={(v) => set('hypocondriaque', v)} /></FormRow>
          <FormRow label="Ruine"><TriToggle value={data.ruine} onChange={(v) => set('ruine', v)} /></FormRow>
          <FormRow label="Culpabilite"><TriToggle value={data.culpabilite} onChange={(v) => set('culpabilite', v)} /></FormRow>
          <FormRow label="Nihilisme (Cotard)"><TriToggle value={data.nihilismeCotard} onChange={(v) => set('nihilismeCotard', v)} /></FormRow>

          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Mecanismes delirants</p>
          <FormRow label="Interpretatifs"><TriToggle value={data.mecanismeInterpretatifs} onChange={(v) => set('mecanismeInterpretatifs', v)} /></FormRow>
          <FormRow label="Imaginatifs"><TriToggle value={data.mecanismeImaginatifs} onChange={(v) => set('mecanismeImaginatifs', v)} /></FormRow>
          <FormRow label="Hallucinatoires"><TriToggle value={data.mecanismeHallucinatoires} onChange={(v) => set('mecanismeHallucinatoires', v)} /></FormRow>
          <FormRow label="Intuitifs"><TriToggle value={data.mecanismeIntuitifs} onChange={(v) => set('mecanismeIntuitifs', v)} /></FormRow>

          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Structure du delire</p>
          <FormRow label="Systematise"><TriToggle value={data.systematise} onChange={(v) => set('systematise', v)} /></FormRow>
          <FormRow label="Non systematise"><TriToggle value={data.nonSystematise} onChange={(v) => set('nonSystematise', v)} /></FormRow>
          <FormRow label="Hermetique"><TriToggle value={data.hermetique} onChange={(v) => set('hermetique', v)} /></FormRow>

          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Extension</p>
          <FormRow label="En secteur"><TriToggle value={data.enSecteur} onChange={(v) => set('enSecteur', v)} /></FormRow>
          <FormRow label="Envahissant"><TriToggle value={data.envahissant} onChange={(v) => set('envahissant', v)} /></FormRow>

          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Retentissement thymique</p>
          <FormRow label="Angoisse"><TriToggle value={data.angoisse} onChange={(v) => set('angoisse', v)} /></FormRow>
          <FormRow label="Perplexite"><TriToggle value={data.perplexite} onChange={(v) => set('perplexite', v)} /></FormRow>

          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Dangerosite liee au delire</p>
          <FormRow label="Passage a l'acte hetero-agressif possible"><TriToggle value={data.passageActeHeteroAgressif} onChange={(v) => set('passageActeHeteroAgressif', v)} /></FormRow>
          <FormRow label="Passage a l'acte auto-agressif possible"><TriToggle value={data.passageActeAutoAgressif} onChange={(v) => set('passageActeAutoAgressif', v)} /></FormRow>
        </>
      )}
    </SectionCard>
  );
}
