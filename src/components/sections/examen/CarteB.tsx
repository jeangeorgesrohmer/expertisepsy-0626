import { ExamenCarteBData, NiveauIntellectuel, NIVEAU_INTELLECT_OPTIONS, YesNoNR } from '../../../types/examen';
import { FormRow, SectionCard } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';
import MultiToggle from '../../ui/MultiToggle';

interface Props { data: ExamenCarteBData; onChange: (d: ExamenCarteBData) => void; }

const niveauColor = (opt: NiveauIntellectuel) => {
  const map: Record<NiveauIntellectuel, string> = {
    Normal: 'bg-emerald-500 text-white border-emerald-500',
    Supérieur: 'bg-blue-500 text-white border-blue-500',
    Limite: 'bg-amber-400 text-white border-amber-400',
    Déficitaire: 'bg-red-500 text-white border-red-500',
    NR: 'bg-slate-100 text-slate-500 border-slate-200',
  };
  return map[opt];
};

export default function CarteB({ data, onChange }: Props) {
  const set = (field: keyof ExamenCarteBData, value: YesNoNR | NiveauIntellectuel) =>
    onChange({ ...data, [field]: value });
  return (
    <SectionCard title="B. Examen cognitif">
      <FormRow label="Vigilance normale"><TriToggle value={data.vigilanceNormale} onChange={(v) => set('vigilanceNormale', v)} /></FormRow>
      <FormRow label="Obnubilation"><TriToggle value={data.obnubilation} onChange={(v) => set('obnubilation', v)} /></FormRow>
      <FormRow label="Somnolence"><TriToggle value={data.somnolence} onChange={(v) => set('somnolence', v)} /></FormRow>
      <FormRow label="Stupeur"><TriToggle value={data.stupeur} onChange={(v) => set('stupeur', v)} /></FormRow>
      <FormRow label="Orienté(e) dans le temps"><TriToggle value={data.orienteTemps} onChange={(v) => set('orienteTemps', v)} /></FormRow>
      <FormRow label="Orienté(e) dans l'espace"><TriToggle value={data.orienteEspace} onChange={(v) => set('orienteEspace', v)} /></FormRow>
      <FormRow label="Orienté(e) par rapport à sa personne"><TriToggle value={data.orientePersonne} onChange={(v) => set('orientePersonne', v)} /></FormRow>
      <FormRow label="Attention préservée"><TriToggle value={data.attentionPreservee} onChange={(v) => set('attentionPreservee', v)} /></FormRow>
      <FormRow label="Distractibilité"><TriToggle value={data.distractibilite} onChange={(v) => set('distractibilite', v)} /></FormRow>
      <FormRow label="Fatigabilité attentionnelle"><TriToggle value={data.fatigabiliteAttentionnelle} onChange={(v) => set('fatigabiliteAttentionnelle', v)} /></FormRow>
      <FormRow label="Mémoire immédiate préservée"><TriToggle value={data.memoireImmediatePreservee} onChange={(v) => set('memoireImmediatePreservee', v)} /></FormRow>
      <FormRow label="Mémoire récente préservée"><TriToggle value={data.memoireRecentePreservee} onChange={(v) => set('memoireRecentePreservee', v)} /></FormRow>
      <FormRow label="Mémoire ancienne préservée"><TriToggle value={data.memoireAnciennePreservee} onChange={(v) => set('memoireAnciennePreservee', v)} /></FormRow>
      <FormRow label="Amnésie des faits"><TriToggle value={data.amnesieFaits} onChange={(v) => set('amnesieFaits', v)} /></FormRow>
      <FormRow label="Fausses reconnaissances"><TriToggle value={data.faussesReconnaissances} onChange={(v) => set('faussesReconnaissances', v)} /></FormRow>
      <FormRow label="Fabulations"><TriToggle value={data.fabulations} onChange={(v) => set('fabulations', v)} /></FormRow>
      <FormRow label="Niveau intellectuel estimé">
        <MultiToggle<NiveauIntellectuel>
          value={data.niveauIntellectuelEstime}
          options={NIVEAU_INTELLECT_OPTIONS}
          onChange={(v) => set('niveauIntellectuelEstime', v)}
          activeColor={niveauColor}
        />
      </FormRow>
      <FormRow label="Retard mental suspecté"><TriToggle value={data.retardMentalSuspecte} onChange={(v) => set('retardMentalSuspecte', v)} /></FormRow>
      <FormRow label="Aptitudes à l'insight"><TriToggle value={data.aptitudesInsight} onChange={(v) => set('aptitudesInsight', v)} /></FormRow>
      <FormRow label="Critique conservée"><TriToggle value={data.critiqueConservee} onChange={(v) => set('critiqueConservee', v)} /></FormRow>
      <FormRow label="Anosognosie"><TriToggle value={data.anosognosie} onChange={(v) => set('anosognosie', v)} /></FormRow>
    </SectionCard>
  );
}
