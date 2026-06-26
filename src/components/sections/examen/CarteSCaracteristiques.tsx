import {
  ExamenCarteSData, YesNoNR,
  FREQUENCE_FANTASMES_OPTIONS, FrequenceFantasmes,
  EFFICACITE_OPTIONS, EfficaciteNiveau,
  EVOLUTION_PARAPHILIE_OPTIONS, EvolutionParaphilie,
} from '../../../types/examen';
import { FormRow, InlineText } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';
import MultiToggle from '../../ui/MultiToggle';

interface Props { data: ExamenCarteSData; onChange: (d: ExamenCarteSData) => void; }

export default function CarteSCaracteristiques({ data, onChange }: Props) {
  const set = (field: keyof ExamenCarteSData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });
  return (
    <>
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Caracteristiques des fantasmes</p>
      <FormRow label="Presents depuis"><InlineText value={data.fantasmesPresentDepuis} onChange={(v) => onChange({ ...data, fantasmesPresentDepuis: v })} /></FormRow>
      <FormRow label="Frequence"><MultiToggle<FrequenceFantasmes> value={data.fantasmesFrequence} options={FREQUENCE_FANTASMES_OPTIONS} onChange={(v) => onChange({ ...data, fantasmesFrequence: v })} /></FormRow>
      <FormRow label="Detresse associee"><TriToggle value={data.fantasmesDetresse} onChange={(v) => set('fantasmesDetresse', v)} /></FormRow>
      <FormRow label="Tentatives de controle"><TriToggle value={data.fantasmesTentativesControle} onChange={(v) => set('fantasmesTentativesControle', v)} /></FormRow>
      <FormRow label="Efficacite des tentatives"><MultiToggle<EfficaciteNiveau> value={data.fantasmesEfficacite} options={EFFICACITE_OPTIONS} onChange={(v) => onChange({ ...data, fantasmesEfficacite: v })} /></FormRow>

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Passage a l'acte paraphilique</p>
      <FormRow label="Antecedents"><TriToggle value={data.passageActeAntecedents} onChange={(v) => set('passageActeAntecedents', v)} /></FormRow>
      <FormRow label="Nombre estime"><InlineText value={data.passageActeNombreEstime} onChange={(v) => onChange({ ...data, passageActeNombreEstime: v })} /></FormRow>
      <FormRow label="Age du premier passage"><InlineText value={data.passageActeAgePremier} onChange={(v) => onChange({ ...data, passageActeAgePremier: v })} /></FormRow>
      <FormRow label="Evolution"><MultiToggle<EvolutionParaphilie> value={data.passageActeEvolution} options={EVOLUTION_PARAPHILIE_OPTIONS} onChange={(v) => onChange({ ...data, passageActeEvolution: v })} /></FormRow>
      <FormRow label="Contexte"><InlineText value={data.passageActeContexte} onChange={(v) => onChange({ ...data, passageActeContexte: v })} /></FormRow>

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Consommation de pornographie</p>
      <FormRow label="Reguliere"><TriToggle value={data.pornoReguliere} onChange={(v) => set('pornoReguliere', v)} /></FormRow>
      <FormRow label="Frequence"><InlineText value={data.pornoFrequence} onChange={(v) => onChange({ ...data, pornoFrequence: v })} /></FormRow>
      <FormRow label="Legale standard"><TriToggle value={data.pornoLegaleStandard} onChange={(v) => set('pornoLegaleStandard', v)} /></FormRow>
      <FormRow label="Impliquant mineurs"><TriToggle value={data.pornoImpliquantMineurs} onChange={(v) => set('pornoImpliquantMineurs', v)} /></FormRow>
      <FormRow label="Violente"><TriToggle value={data.pornoViolente} onChange={(v) => set('pornoViolente', v)} /></FormRow>
      <FormRow label="Autre"><TriToggle value={data.pornoAutre} onChange={(v) => set('pornoAutre', v)} /></FormRow>
      <FormRow label="Escalade dans le contenu"><TriToggle value={data.pornoEscalade} onChange={(v) => set('pornoEscalade', v)} /></FormRow>
    </>
  );
}
