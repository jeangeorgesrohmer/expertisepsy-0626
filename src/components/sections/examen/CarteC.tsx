import { ExamenCarteCData, NiveauEmpathie, EMPATHIE_OPTIONS, YesNoNR } from '../../../types/examen';
import { FormRow, SectionCard } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';
import MultiToggle from '../../ui/MultiToggle';

interface Props { data: ExamenCarteCData; onChange: (d: ExamenCarteCData) => void; }

const empathieColor = (opt: NiveauEmpathie) => {
  const map: Record<NiveauEmpathie, string> = {
    Préservée: 'bg-emerald-500 text-white border-emerald-500',
    Diminuée: 'bg-amber-400 text-white border-amber-400',
    Abolie: 'bg-red-500 text-white border-red-500',
    NR: 'bg-slate-100 text-slate-500 border-slate-200',
  };
  return map[opt];
};

export default function CarteC({ data, onChange }: Props) {
  const set = (field: keyof ExamenCarteCData, value: YesNoNR | NiveauEmpathie) =>
    onChange({ ...data, [field]: value });
  return (
    <SectionCard title="C. Cognition sociale">
      <FormRow label="Reconnaissance des émotions faciales préservée"><TriToggle value={data.reconnaissanceEmotionsFaciales} onChange={(v) => set('reconnaissanceEmotionsFaciales', v)} /></FormRow>
      <FormRow label="Compréhension de l'état mental d'autrui (intentions, croyances, désirs) préservée"><TriToggle value={data.comprehensionEtatMentalAutrui} onChange={(v) => set('comprehensionEtatMentalAutrui', v)} /></FormRow>
      <FormRow label="Difficultés à se représenter le point de vue d'autrui"><TriToggle value={data.difficultesPdvAutrui} onChange={(v) => set('difficultesPdvAutrui', v)} /></FormRow>
      <FormRow label="Difficultés à comprendre les sous-entendus / ironie / second degré"><TriToggle value={data.difficultesSousEntendus} onChange={(v) => set('difficultesSousEntendus', v)} /></FormRow>
      <FormRow label="Interprétations littérales fréquentes"><TriToggle value={data.interpretationsLitterales} onChange={(v) => set('interpretationsLitterales', v)} /></FormRow>
      <FormRow label="Compréhension des règles sociales implicites préservée"><TriToggle value={data.comprehensionReglesImplicites} onChange={(v) => set('comprehensionReglesImplicites', v)} /></FormRow>
      <FormRow label="Difficultés à adapter son comportement au contexte social"><TriToggle value={data.difficultesBehaviorContextSocial} onChange={(v) => set('difficultesBehaviorContextSocial', v)} /></FormRow>
      <FormRow label="Tendance à des interprétations persécutrices / méfiantes des situations sociales"><TriToggle value={data.interpretationsPersecut} onChange={(v) => set('interpretationsPersecut', v)} /></FormRow>
      <FormRow label="Naïveté / suggestibilité excessive"><TriToggle value={data.naivete} onChange={(v) => set('naivete', v)} /></FormRow>
      <FormRow label="Empathie cognitive (compréhension de ce que l'autre ressent)">
        <MultiToggle<NiveauEmpathie>
          value={data.empathieCognitive}
          options={EMPATHIE_OPTIONS}
          onChange={(v) => set('empathieCognitive', v)}
          activeColor={empathieColor}
        />
      </FormRow>
      <FormRow label="Empathie émotionnelle (partage affectif)">
        <MultiToggle<NiveauEmpathie>
          value={data.empathieEmotionnelle}
          options={EMPATHIE_OPTIONS}
          onChange={(v) => set('empathieEmotionnelle', v)}
          activeColor={empathieColor}
        />
      </FormRow>
      <FormRow label="Comportement globalement adapté"><TriToggle value={data.comportementAdapte} onChange={(v) => set('comportementAdapte', v)} /></FormRow>
      <FormRow label="Inhibition marquée"><TriToggle value={data.inhibitionMarquee} onChange={(v) => set('inhibitionMarquee', v)} /></FormRow>
      <FormRow label="Intrusivité / familiarité excessive"><TriToggle value={data.intrusivite} onChange={(v) => set('intrusivite', v)} /></FormRow>
      <FormRow label="Difficultés à respecter la distance interpersonnelle"><TriToggle value={data.difficulteDistanceInterpersonnelle} onChange={(v) => set('difficulteDistanceInterpersonnelle', v)} /></FormRow>
      <FormRow label="Retentissement sur la vie familiale"><TriToggle value={data.retentissementVieFamiliale} onChange={(v) => set('retentissementVieFamiliale', v)} /></FormRow>
      <FormRow label="Retentissement sur la vie professionnelle / scolaire"><TriToggle value={data.retentissementVieProfessionnelle} onChange={(v) => set('retentissementVieProfessionnelle', v)} /></FormRow>
      <FormRow label="Retentissement sur la capacité à établir / maintenir des relations affectives"><TriToggle value={data.retentissementRelationsAffectives} onChange={(v) => set('retentissementRelationsAffectives', v)} /></FormRow>
    </SectionCard>
  );
}
