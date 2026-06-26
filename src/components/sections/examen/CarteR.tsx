import { ExamenCarteRData, YesNoNR } from '../../../types/examen';
import { FormRow, SectionCard, InlineText } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';
import QuadToggle from '../../ui/QuadToggle';
import { Observance } from '../../../types/anamnese';

interface Props { data: ExamenCarteRData; onChange: (d: ExamenCarteRData) => void; }

export default function CarteR({ data, onChange }: Props) {
  const set = (field: keyof ExamenCarteRData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });
  return (
    <SectionCard title="R. Trouble deficit de l'attention avec ou sans hyperactivite (TDAH)">
      <FormRow label="TDAH présent :"><TriToggle value={data.presenceSyndrome} onChange={(v) => set('presenceSyndrome', v)} /></FormRow>
      <FormRow label="Antécédents de ce syndrome :"><TriToggle value={data.antecedentSyndrome} onChange={(v) => set('antecedentSyndrome', v)} /></FormRow>
      {(data.presenceSyndrome === 'Oui' || data.antecedentSyndrome === 'Oui') && (<>
      <FormRow label="Diagnostic pose"><TriToggle value={data.diagnosticPose} onChange={(v) => set('diagnosticPose', v)} /></FormRow>
      <FormRow label="Depuis"><InlineText value={data.depuis} onChange={(v) => onChange({ ...data, depuis: v })} /></FormRow>

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Diagnostic pose par</p>
      <FormRow label="Medecin generaliste"><TriToggle value={data.parMedecinGeneraliste} onChange={(v) => set('parMedecinGeneraliste', v)} /></FormRow>
      <FormRow label="Psychiatre"><TriToggle value={data.parPsychiatre} onChange={(v) => set('parPsychiatre', v)} /></FormRow>
      <FormRow label="Pedopsychiatre"><TriToggle value={data.parPedopsychiatre} onChange={(v) => set('parPedopsychiatre', v)} /></FormRow>
      <FormRow label="Neurologue"><TriToggle value={data.parNeurologue} onChange={(v) => set('parNeurologue', v)} /></FormRow>

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Symptomes d'inattention</p>
      <FormRow label="Difficulte a maintenir l'attention"><TriToggle value={data.difficulteMaintenirAttention} onChange={(v) => set('difficulteMaintenirAttention', v)} /></FormRow>
      <FormRow label="Distractibilite importante"><TriToggle value={data.distractibiliteImportante} onChange={(v) => set('distractibiliteImportante', v)} /></FormRow>
      <FormRow label="Oublis frequents"><TriToggle value={data.oublisFrequents} onChange={(v) => set('oublisFrequents', v)} /></FormRow>
      <FormRow label="Difficulte a organiser les taches"><TriToggle value={data.difficulteOrganiserTaches} onChange={(v) => set('difficulteOrganiserTaches', v)} /></FormRow>
      <FormRow label="Evitement des taches necessitant un effort mental"><TriToggle value={data.evitementTachesEffortMental} onChange={(v) => set('evitementTachesEffortMental', v)} /></FormRow>
      <FormRow label="Perte frequente d'objets"><TriToggle value={data.perteFrequenteObjets} onChange={(v) => set('perteFrequenteObjets', v)} /></FormRow>
      <FormRow label="Difficultes a suivre les instructions"><TriToggle value={data.difficulteSuivreInstructions} onChange={(v) => set('difficulteSuivreInstructions', v)} /></FormRow>

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Symptomes d'hyperactivite / impulsivite</p>
      <FormRow label="Agitation motrice"><TriToggle value={data.agitationMotrice} onChange={(v) => set('agitationMotrice', v)} /></FormRow>
      <FormRow label="Difficulte a rester assis"><TriToggle value={data.difficulteResterAssis} onChange={(v) => set('difficulteResterAssis', v)} /></FormRow>
      <FormRow label="Sentiment d'agitation interieure"><TriToggle value={data.sentimentAgitationInterieure} onChange={(v) => set('sentimentAgitationInterieure', v)} /></FormRow>
      <FormRow label="Difficulte a se detendre"><TriToggle value={data.difficulteSeDetendre} onChange={(v) => set('difficulteSeDetendre', v)} /></FormRow>
      <FormRow label="Loquacite excessive"><TriToggle value={data.loquaciteExcessive} onChange={(v) => set('loquaciteExcessive', v)} /></FormRow>
      <FormRow label="Interruption des autres"><TriToggle value={data.interruptionDesAutres} onChange={(v) => set('interruptionDesAutres', v)} /></FormRow>
      <FormRow label="Impulsivite dans les decisions"><TriToggle value={data.impulsiviteDecisions} onChange={(v) => set('impulsiviteDecisions', v)} /></FormRow>
      <FormRow label="Difficulte a attendre son tour"><TriToggle value={data.difficulteAttendreSonTour} onChange={(v) => set('difficulteAttendreSonTour', v)} /></FormRow>

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Retentissement fonctionnel actuel</p>
      <FormRow label="Professionnel"><TriToggle value={data.retentissementProfessionnel} onChange={(v) => set('retentissementProfessionnel', v)} /></FormRow>
      <FormRow label="Social"><TriToggle value={data.retentissementSocial} onChange={(v) => set('retentissementSocial', v)} /></FormRow>
      <FormRow label="Familial"><TriToggle value={data.retentissementFamilial} onChange={(v) => set('retentissementFamilial', v)} /></FormRow>
      <FormRow label="Judiciaire"><TriToggle value={data.retentissementJudiciaire} onChange={(v) => set('retentissementJudiciaire', v)} /></FormRow>

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Prise en charge actuelle</p>
      <FormRow label="Traitement medicamenteux"><TriToggle value={data.traitementMedicamenteux} onChange={(v) => set('traitementMedicamenteux', v)} /></FormRow>
      <FormRow label="Preciser"><InlineText value={data.traitementPreciser} onChange={(v) => onChange({ ...data, traitementPreciser: v })} /></FormRow>
      <FormRow label="Observance"><QuadToggle value={data.observance} onChange={(v: Observance) => onChange({ ...data, observance: v })} /></FormRow>
      <FormRow label="Suivi psychologique"><TriToggle value={data.suiviPsychologique} onChange={(v) => set('suiviPsychologique', v)} /></FormRow>
      <FormRow label="Amenagements professionnels/scolaires"><TriToggle value={data.amenagementsProfessionnelsScolaires} onChange={(v) => set('amenagementsProfessionnelsScolaires', v)} /></FormRow>
      </>)}
    </SectionCard>
  );
}
