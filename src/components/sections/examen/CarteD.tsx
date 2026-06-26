import { ExamenCarteDData, YesNoNR } from '../../../types/examen';
import { FormRow, SectionCard } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';

interface Props { data: ExamenCarteDData; onChange: (d: ExamenCarteDData) => void; }

export default function CarteD({ data, onChange }: Props) {
  const set = (field: keyof ExamenCarteDData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });
  return (
    <SectionCard title="D. Langage et discours">
      <FormRow label="Discours cohérent"><TriToggle value={data.discoursCohérent} onChange={(v) => set('discoursCohérent', v)} /></FormRow>
      <FormRow label="Discours logique"><TriToggle value={data.discoursLogique} onChange={(v) => set('discoursLogique', v)} /></FormRow>
      <FormRow label="Propos adaptés"><TriToggle value={data.proposAdaptes} onChange={(v) => set('proposAdaptes', v)} /></FormRow>
      <FormRow label="Mythomanie"><TriToggle value={data.mythomanie} onChange={(v) => set('mythomanie', v)} /></FormRow>
      <FormRow label="Mensonges utilitaires"><TriToggle value={data.mensongesUtilitaires} onChange={(v) => set('mensongesUtilitaires', v)} /></FormRow>
      <FormRow label="Normal (Débit)"><TriToggle value={data.debitNormal} onChange={(v) => set('debitNormal', v)} /></FormRow>
      <FormRow label="Ralenti"><TriToggle value={data.debitRalenti} onChange={(v) => set('debitRalenti', v)} /></FormRow>
      <FormRow label="Accéléré"><TriToggle value={data.debitAccelere} onChange={(v) => set('debitAccelere', v)} /></FormRow>
      <FormRow label="Logorrhée"><TriToggle value={data.logorrhee} onChange={(v) => set('logorrhee', v)} /></FormRow>
      <FormRow label="Barrages"><TriToggle value={data.barrages} onChange={(v) => set('barrages', v)} /></FormRow>
      <FormRow label="Fading"><TriToggle value={data.fading} onChange={(v) => set('fading', v)} /></FormRow>
      <FormRow label="Coq-à-l'âne"><TriToggle value={data.coqALane} onChange={(v) => set('coqALane', v)} /></FormRow>
      <FormRow label="Incohérence"><TriToggle value={data.incoherence} onChange={(v) => set('incoherence', v)} /></FormRow>
      <FormRow label="Schizophasie"><TriToggle value={data.schizophasie} onChange={(v) => set('schizophasie', v)} /></FormRow>
      <FormRow label="Persévérations"><TriToggle value={data.perseverations} onChange={(v) => set('perseverations', v)} /></FormRow>
      <FormRow label="Tangentialité"><TriToggle value={data.tangentialite} onChange={(v) => set('tangentialite', v)} /></FormRow>
      <FormRow label="Prolixité"><TriToggle value={data.prolixite} onChange={(v) => set('prolixite', v)} /></FormRow>
      <FormRow label="Néologismes présents"><TriToggle value={data.neologismesPresents} onChange={(v) => set('neologismesPresents', v)} /></FormRow>
    </SectionCard>
  );
}
