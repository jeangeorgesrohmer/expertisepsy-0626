import { ExamenCarteFData, YesNoNR } from '../../../types/examen';
import { FormRow, SectionCard } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';

interface Props { data: ExamenCarteFData; onChange: (d: ExamenCarteFData) => void; }

export default function CarteF({ data, onChange }: Props) {
  const set = (field: keyof ExamenCarteFData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });
  return (
    <SectionCard title="F. Syndrome maniaque/hypomaniaque">
      <FormRow label="Syndrome maniaque/hypomaniaque présent :"><TriToggle value={data.presenceSyndrome} onChange={(v) => set('presenceSyndrome', v)} /></FormRow>
      <FormRow label="Antécédents de ce syndrome :"><TriToggle value={data.antecedentSyndrome} onChange={(v) => set('antecedentSyndrome', v)} /></FormRow>
      {(data.presenceSyndrome === 'Oui' || data.antecedentSyndrome === 'Oui') && (
        <>
          <FormRow label="Exaltation de l'humeur"><TriToggle value={data.exaltationHumeur} onChange={(v) => set('exaltationHumeur', v)} /></FormRow>
          <FormRow label="Euphorie"><TriToggle value={data.euphorie} onChange={(v) => set('euphorie', v)} /></FormRow>
          <FormRow label="Irritabilité"><TriToggle value={data.irritabilite} onChange={(v) => set('irritabilite', v)} /></FormRow>
          <FormRow label="Labilité émotionnelle"><TriToggle value={data.labilitieEmotionnelle} onChange={(v) => set('labilitieEmotionnelle', v)} /></FormRow>
          <FormRow label="Agitation psychomotrice"><TriToggle value={data.agitationPsychomotrice} onChange={(v) => set('agitationPsychomotrice', v)} /></FormRow>
          <FormRow label="Hyperactivité"><TriToggle value={data.hyperactivite} onChange={(v) => set('hyperactivite', v)} /></FormRow>
          <FormRow label="Désinhibition"><TriToggle value={data.desinhibition} onChange={(v) => set('desinhibition', v)} /></FormRow>
          <FormRow label="Familiarité excessive"><TriToggle value={data.familiariteExcessive} onChange={(v) => set('familiariteExcessive', v)} /></FormRow>
          <FormRow label="Tachypsychie"><TriToggle value={data.tachypsychie} onChange={(v) => set('tachypsychie', v)} /></FormRow>
          <FormRow label="Fuite des idées"><TriToggle value={data.fuiteIdees} onChange={(v) => set('fuiteIdees', v)} /></FormRow>
          <FormRow label="Logorrhée"><TriToggle value={data.logorrhee} onChange={(v) => set('logorrhee', v)} /></FormRow>
          <FormRow label="Coq-à-l'âne"><TriToggle value={data.coqALane} onChange={(v) => set('coqALane', v)} /></FormRow>
          <FormRow label="Mégalomanie"><TriToggle value={data.megalomanie} onChange={(v) => set('megalomanie', v)} /></FormRow>
          <FormRow label="Projets irréalistes"><TriToggle value={data.projetsIrrealistes} onChange={(v) => set('projetsIrrealistes', v)} /></FormRow>
          <FormRow label="Surestimation de soi"><TriToggle value={data.suresTimationSoi} onChange={(v) => set('suresTimationSoi', v)} /></FormRow>
          <FormRow label="Conduites à risque"><TriToggle value={data.conduitesARisque} onChange={(v) => set('conduitesARisque', v)} /></FormRow>
          <FormRow label="Achats inconsidérés"><TriToggle value={data.achatsInconsideres} onChange={(v) => set('achatsInconsideres', v)} /></FormRow>
          <FormRow label="Désinhibition sexuelle"><TriToggle value={data.desinhibitionSexuelle} onChange={(v) => set('desinhibitionSexuelle', v)} /></FormRow>
          <FormRow label="Idées délirantes"><TriToggle value={data.ideesDelirantes} onChange={(v) => set('ideesDelirantes', v)} /></FormRow>
          <FormRow label="Hallucinations"><TriToggle value={data.hallucinations} onChange={(v) => set('hallucinations', v)} /></FormRow>
        </>
      )}
    </SectionCard>
  );
}
