import {
  ExamenCarteSData, YesNoNR,
  CAPACITE_CONTROLE_OPTIONS, CapaciteControle,
  EFFICACITE_OPTIONS, EfficaciteNiveau,
} from '../../../types/examen';
import { Observance } from '../../../types/anamnese';
import { FormRow, InlineText } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';
import MultiToggle from '../../ui/MultiToggle';
import QuadToggle from '../../ui/QuadToggle';

interface Props { data: ExamenCarteSData; onChange: (d: ExamenCarteSData) => void; }

export default function CarteSEvaluation({ data, onChange }: Props) {
  const set = (field: keyof ExamenCarteSData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });
  return (
    <>
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Comprehension de l'interdit</p>
      <FormRow label="Connaissance caractere illegal"><TriToggle value={data.connaissanceCaractereIllegal} onChange={(v) => set('connaissanceCaractereIllegal', v)} /></FormRow>
      <FormRow label="Comprehension prejudice victimes"><TriToggle value={data.comprehensionPrejudiceVictimes} onChange={(v) => set('comprehensionPrejudiceVictimes', v)} /></FormRow>
      <FormRow label="Minimisation"><TriToggle value={data.minimisationInterdit} onChange={(v) => set('minimisationInterdit', v)} /></FormRow>
      <FormRow label="Deni"><TriToggle value={data.deniInterdit} onChange={(v) => set('deniInterdit', v)} /></FormRow>

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Controle des impulsions</p>
      <FormRow label="Capacite"><MultiToggle<CapaciteControle> value={data.controleCapacite} options={CAPACITE_CONTROLE_OPTIONS} onChange={(v) => onChange({ ...data, controleCapacite: v })} /></FormRow>
      <FormRow label="Facteurs declenchants"><InlineText value={data.controleFacteursDeclenchants} onChange={(v) => onChange({ ...data, controleFacteursDeclenchants: v })} /></FormRow>
      <FormRow label="Strategies d'evitement"><InlineText value={data.controleStrategiesEvitement} onChange={(v) => onChange({ ...data, controleStrategiesEvitement: v })} /></FormRow>

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Distorsions cognitives</p>
      <FormRow label="Rationalisations"><TriToggle value={data.rationalisations} onChange={(v) => set('rationalisations', v)} /></FormRow>
      <FormRow label="Minimisation"><TriToggle value={data.minimisationDistorsion} onChange={(v) => set('minimisationDistorsion', v)} /></FormRow>
      <FormRow label="Attribution responsabilite victime"><TriToggle value={data.attributionResponsabiliteVictime} onChange={(v) => set('attributionResponsabiliteVictime', v)} /></FormRow>
      <FormRow label="Deni de gravite"><TriToggle value={data.deniGravite} onChange={(v) => set('deniGravite', v)} /></FormRow>

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Empathie envers victimes</p>
      <FormRow label="Presente"><TriToggle value={data.empathiePresente} onChange={(v) => set('empathiePresente', v)} /></FormRow>
      <FormRow label="Partielle"><TriToggle value={data.empathiePartielle} onChange={(v) => set('empathiePartielle', v)} /></FormRow>
      <FormRow label="Absence"><TriToggle value={data.empathieAbsence} onChange={(v) => set('empathieAbsence', v)} /></FormRow>

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Demande de soins</p>
      <FormRow label="Spontanee"><TriToggle value={data.demandeSpontanee} onChange={(v) => set('demandeSpontanee', v)} /></FormRow>
      <FormRow label="Acceptation prise en charge"><TriToggle value={data.acceptationPriseEnCharge} onChange={(v) => set('acceptationPriseEnCharge', v)} /></FormRow>
      <FormRow label="Refus"><TriToggle value={data.refusSoins} onChange={(v) => set('refusSoins', v)} /></FormRow>
      <FormRow label="Ambivalence"><TriToggle value={data.ambivalence} onChange={(v) => set('ambivalence', v)} /></FormRow>

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Antecedents de prise en charge</p>
      <FormRow label="Suivi sexologique"><TriToggle value={data.suiviSexologique} onChange={(v) => set('suiviSexologique', v)} /></FormRow>
      <FormRow label="TCC"><TriToggle value={data.tcc} onChange={(v) => set('tcc', v)} /></FormRow>
      <FormRow label="Traitement anti-androgene"><TriToggle value={data.traitementAntiAndrogene} onChange={(v) => set('traitementAntiAndrogene', v)} /></FormRow>
      <FormRow label="Observance"><QuadToggle value={data.antecedentsObservance} onChange={(v: Observance) => onChange({ ...data, antecedentsObservance: v })} /></FormRow>
      <FormRow label="Efficacite"><MultiToggle<EfficaciteNiveau> value={data.antecedentsEfficacite} options={EFFICACITE_OPTIONS} onChange={(v) => onChange({ ...data, antecedentsEfficacite: v })} /></FormRow>
    </>
  );
}
