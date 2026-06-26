import { ExamenCarteIData, YesNoNR } from '../../../types/examen';
import { FormRow, SectionCard } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';

interface Props { data: ExamenCarteIData; onChange: (d: ExamenCarteIData) => void; }

export default function CarteI({ data, onChange }: Props) {
  const set = (field: keyof ExamenCarteIData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });
  return (
    <SectionCard title="I. Syndrome psychotraumatique (ESPT)">
      <FormRow label="Syndrome psychotraumatique présent :"><TriToggle value={data.presenceSyndrome} onChange={(v) => set('presenceSyndrome', v)} /></FormRow>
      <FormRow label="Antécédents de ce syndrome :"><TriToggle value={data.antecedentSyndrome} onChange={(v) => set('antecedentSyndrome', v)} /></FormRow>
      {(data.presenceSyndrome === 'Oui' || data.antecedentSyndrome === 'Oui') && (
        <>
          <FormRow label="Souvenirs intrusifs"><TriToggle value={data.souvenirsintrusive} onChange={(v) => set('souvenirsintrusive', v)} /></FormRow>
          <FormRow label="Cauchemars"><TriToggle value={data.cauchemars} onChange={(v) => set('cauchemars', v)} /></FormRow>
          <FormRow label="Flashbacks"><TriToggle value={data.flashbacks} onChange={(v) => set('flashbacks', v)} /></FormRow>
          <FormRow label="Détresse lors de rappel du traumatisme"><TriToggle value={data.detresseRappelTraumatisme} onChange={(v) => set('detresseRappelTraumatisme', v)} /></FormRow>
          <FormRow label="Évitement de pensées liées au traumatisme"><TriToggle value={data.evitementPenseesTraumatisme} onChange={(v) => set('evitementPenseesTraumatisme', v)} /></FormRow>
          <FormRow label="Évitement de lieux/personnes rappelant le traumatisme"><TriToggle value={data.evitementLieuxPersonnes} onChange={(v) => set('evitementLieuxPersonnes', v)} /></FormRow>
          <FormRow label="Amnésie de certains aspects du traumatisme"><TriToggle value={data.amnesieCertainsAspects} onChange={(v) => set('amnesieCertainsAspects', v)} /></FormRow>
          <FormRow label="Croyances négatives sur soi"><TriToggle value={data.croyancesNegativesSoi} onChange={(v) => set('croyancesNegativesSoi', v)} /></FormRow>
          <FormRow label="Culpabilité persistante"><TriToggle value={data.culpabilitePersistante} onChange={(v) => set('culpabilitePersistante', v)} /></FormRow>
          <FormRow label="Émoussement affectif"><TriToggle value={data.emoussementAffectif} onChange={(v) => set('emoussementAffectif', v)} /></FormRow>
          <FormRow label="Détachement"><TriToggle value={data.detachement} onChange={(v) => set('detachement', v)} /></FormRow>
          <FormRow label="Hypervigilance"><TriToggle value={data.hypervigilance} onChange={(v) => set('hypervigilance', v)} /></FormRow>
          <FormRow label="Sursauts exagérés"><TriToggle value={data.sursautsExageres} onChange={(v) => set('sursautsExageres', v)} /></FormRow>
          <FormRow label="Irritabilité"><TriToggle value={data.irritabilite} onChange={(v) => set('irritabilite', v)} /></FormRow>
          <FormRow label="Troubles du sommeil"><TriToggle value={data.troublesDuSommeil} onChange={(v) => set('troublesDuSommeil', v)} /></FormRow>
        </>
      )}
    </SectionCard>
  );
}
