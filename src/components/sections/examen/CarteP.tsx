import { ExamenCartePData, YesNoNR } from '../../../types/examen';
import { FormRow, SectionCard } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';

interface Props { data: ExamenCartePData; onChange: (d: ExamenCartePData) => void; }

export default function CarteP({ data, onChange }: Props) {
  const set = (field: keyof ExamenCartePData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });
  return (
    <SectionCard title="P. Syndrome d&eacute;mentiel">
      <FormRow label="Syndrome démentiel présent :"><TriToggle value={data.presenceSyndrome} onChange={(v) => set('presenceSyndrome', v)} /></FormRow>
      {data.presenceSyndrome === 'Oui' && (
        <>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pb-1">Troubles mn&eacute;siques</p>
          <FormRow label="Oublis &agrave; mesure"><TriToggle value={data.oublisAMesure} onChange={(v) => set('oublisAMesure', v)} /></FormRow>
          <FormRow label="Amn&eacute;sie r&eacute;trograde"><TriToggle value={data.amnesieRetrograde} onChange={(v) => set('amnesieRetrograde', v)} /></FormRow>
          <FormRow label="Troubles des fonctions ex&eacute;cutives"><TriToggle value={data.troublesFonctionsExecutives} onChange={(v) => set('troublesFonctionsExecutives', v)} /></FormRow>
          <FormRow label="Troubles gnosiques"><TriToggle value={data.troublesGnosiques} onChange={(v) => set('troublesGnosiques', v)} /></FormRow>
          <FormRow label="Troubles praxiques"><TriToggle value={data.troublesPraxiques} onChange={(v) => set('troublesPraxiques', v)} /></FormRow>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Troubles du langage</p>
          <FormRow label="Aphasie"><TriToggle value={data.aphasie} onChange={(v) => set('aphasie', v)} /></FormRow>
          <FormRow label="Manque du mot"><TriToggle value={data.manqueDuMot} onChange={(v) => set('manqueDuMot', v)} /></FormRow>
          <FormRow label="Perte d'autonomie"><TriToggle value={data.perteAutonomie} onChange={(v) => set('perteAutonomie', v)} /></FormRow>
          <FormRow label="&Eacute;volution progressive"><TriToggle value={data.evolutionProgressive} onChange={(v) => set('evolutionProgressive', v)} /></FormRow>
        </>
      )}
    </SectionCard>
  );
}
