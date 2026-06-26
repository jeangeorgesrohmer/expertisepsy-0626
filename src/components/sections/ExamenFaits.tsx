import {
  ExamenFaitsData,
  ComprehensionFaitsData,
  ReconnaissanceFaitsData,
  EtatMentalFaitsData,
  ConscienceLuciditeData,
  AmnesieFaitsData,
  PremditationData,
  YesNoNR,
} from '../../types/faits';
import type { CommentsData } from '../../types/commentaires';
import { FormRow, SectionCard } from '../ui/FormRow';
import TriToggle from '../ui/TriToggle';
import CommentField from '../ui/CommentField';
import VoiceTextarea from '../ui/VoiceTextarea';

interface Props {
  data: ExamenFaitsData;
  onChange: (data: ExamenFaitsData) => void;
  commentaires: CommentsData;
  onCommentairesChange: (c: CommentsData) => void;
}

function ComprehensionSection({
  data,
  onChange,
}: {
  data: ComprehensionFaitsData;
  onChange: (d: ComprehensionFaitsData) => void;
}) {
  const set = (field: keyof ComprehensionFaitsData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });

  return (
    <SectionCard title="A. Capacite a comprendre la nature des faits">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pb-1">
        Comprehension des faits reproches
      </p>
      <FormRow label="Comprend la nature des faits">
        <TriToggle value={data.comprendNatureFaits} onChange={(v) => set('comprendNatureFaits', v)} />
      </FormRow>
      <FormRow label="Comprend la portee de ses actes">
        <TriToggle value={data.comprendPorteeActes} onChange={(v) => set('comprendPorteeActes', v)} />
      </FormRow>
      <FormRow label="Comprend le caractere illegal">
        <TriToggle value={data.comprendCaractereIllegal} onChange={(v) => set('comprendCaractereIllegal', v)} />
      </FormRow>

      <div className="pt-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">Rappel des faits</label>
        <VoiceTextarea
          className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors resize-y min-h-[120px] pr-10"
          placeholder="Decrire le rappel des faits tel que rapporte par le sujet..."
          value={data.rappelFaits}
          onChange={(v) => onChange({ ...data, rappelFaits: v })}
          rows={6}
        />
      </div>
    </SectionCard>
  );
}

function ReconnaissanceSection({
  data,
  onChange,
}: {
  data: ReconnaissanceFaitsData;
  onChange: (d: ReconnaissanceFaitsData) => void;
}) {
  const set = (field: keyof ReconnaissanceFaitsData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });

  return (
    <SectionCard title="B. Reconnaissance des faits">
      <FormRow label="Reconnaissance totale">
        <TriToggle value={data.reconnaissanceTotale} onChange={(v) => set('reconnaissanceTotale', v)} />
      </FormRow>
      <FormRow label="Reconnaissance partielle">
        <TriToggle value={data.reconnaissancePartielle} onChange={(v) => set('reconnaissancePartielle', v)} />
      </FormRow>
      <FormRow label="Minimisation">
        <TriToggle value={data.minimisation} onChange={(v) => set('minimisation', v)} />
      </FormRow>
      <FormRow label="Deni total">
        <TriToggle value={data.deniTotal} onChange={(v) => set('deniTotal', v)} />
      </FormRow>
      <FormRow label="Negation de la qualification">
        <TriToggle value={data.negationQualification} onChange={(v) => set('negationQualification', v)} />
      </FormRow>
    </SectionCard>
  );
}

function EtatMentalSection({
  data,
  onChange,
}: {
  data: EtatMentalFaitsData;
  onChange: (d: EtatMentalFaitsData) => void;
}) {
  const set = (field: keyof EtatMentalFaitsData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });

  return (
    <SectionCard title="C. Etat mental au moment des faits (d'apres l'anamnese)">
      <FormRow label="Pathologie psychiatrique active">
        <TriToggle value={data.pathologiePsychiatriqueActive} onChange={(v) => set('pathologiePsychiatriqueActive', v)} />
      </FormRow>
      <FormRow label="Symptomes psychotiques">
        <TriToggle value={data.symptomesPsychotiques} onChange={(v) => set('symptomesPsychotiques', v)} />
      </FormRow>
      <FormRow label="Intoxication alcoolique">
        <TriToggle value={data.intoxicationAlcoolique} onChange={(v) => set('intoxicationAlcoolique', v)} />
      </FormRow>
      <FormRow label="Intoxication aux stupefiants">
        <TriToggle value={data.intoxicationStupefiants} onChange={(v) => set('intoxicationStupefiants', v)} />
      </FormRow>
      <FormRow label="Etat confusionnel">
        <TriToggle value={data.etatConfusionnel} onChange={(v) => set('etatConfusionnel', v)} />
      </FormRow>
      <FormRow label="Etat emotionnel particulier">
        <TriToggle value={data.etatEmotionnelParticulier} onChange={(v) => set('etatEmotionnelParticulier', v)} />
      </FormRow>
    </SectionCard>
  );
}

function ConscienceSection({
  data,
  onChange,
}: {
  data: ConscienceLuciditeData;
  onChange: (d: ConscienceLuciditeData) => void;
}) {
  const set = (field: keyof ConscienceLuciditeData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });

  return (
    <SectionCard title="D. Conscience et lucidite au moment des faits">
      <FormRow label="Conscience claire">
        <TriToggle value={data.conscienceClaire} onChange={(v) => set('conscienceClaire', v)} />
      </FormRow>
      <FormRow label="Alteration de la conscience">
        <TriToggle value={data.alterationConscience} onChange={(v) => set('alterationConscience', v)} />
      </FormRow>
    </SectionCard>
  );
}

function AmnesieSection({
  data,
  onChange,
}: {
  data: AmnesieFaitsData;
  onChange: (d: AmnesieFaitsData) => void;
}) {
  const set = (field: keyof AmnesieFaitsData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });

  return (
    <SectionCard title="E. Amnesie des faits">
      <FormRow label="Totale">
        <TriToggle value={data.totale} onChange={(v) => set('totale', v)} />
      </FormRow>
      <FormRow label="Partielle">
        <TriToggle value={data.partielle} onChange={(v) => set('partielle', v)} />
      </FormRow>
      <FormRow label="Absente">
        <TriToggle value={data.absente} onChange={(v) => set('absente', v)} />
      </FormRow>
      <FormRow label="Lacunaire">
        <TriToggle value={data.lacunaire} onChange={(v) => set('lacunaire', v)} />
      </FormRow>
      <FormRow label="Alleguee">
        <TriToggle value={data.alleguee} onChange={(v) => set('alleguee', v)} />
      </FormRow>
    </SectionCard>
  );
}

function PremediationSection({
  data,
  onChange,
}: {
  data: PremditationData;
  onChange: (d: PremditationData) => void;
}) {
  const set = (field: keyof PremditationData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });

  return (
    <SectionCard title="F. Premeditation">
      <FormRow label="Signes de premeditation">
        <TriToggle value={data.signesPremeditation} onChange={(v) => set('signesPremeditation', v)} />
      </FormRow>
      <FormRow label="Acte impulsif">
        <TriToggle value={data.acteImpulsif} onChange={(v) => set('acteImpulsif', v)} />
      </FormRow>
    </SectionCard>
  );
}

export default function ExamenFaits({ data, onChange, commentaires, onCommentairesChange }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">IV. Examen au moment des faits</h2>
        <p className="text-slate-500 text-sm mt-1">
          Analyse de la comprehension, de l'etat mental et des circonstances au moment des faits reproches.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <ComprehensionSection
            data={data.comprehension}
            onChange={(v) => onChange({ ...data, comprehension: v })}
          />
          <CommentField commentKey="faits.comprehension" commentaires={commentaires} onChange={onCommentairesChange} />
        </div>
        <div>
          <ReconnaissanceSection
            data={data.reconnaissance}
            onChange={(v) => onChange({ ...data, reconnaissance: v })}
          />
          <CommentField commentKey="faits.reconnaissance" commentaires={commentaires} onChange={onCommentairesChange} />
        </div>
        <div>
          <EtatMentalSection
            data={data.etatMental}
            onChange={(v) => onChange({ ...data, etatMental: v })}
          />
          <CommentField commentKey="faits.etatMental" commentaires={commentaires} onChange={onCommentairesChange} />
        </div>
        <div>
          <ConscienceSection
            data={data.conscienceLucidite}
            onChange={(v) => onChange({ ...data, conscienceLucidite: v })}
          />
          <CommentField commentKey="faits.conscience" commentaires={commentaires} onChange={onCommentairesChange} />
        </div>
        <div>
          <AmnesieSection
            data={data.amnesieFaits}
            onChange={(v) => onChange({ ...data, amnesieFaits: v })}
          />
          <CommentField commentKey="faits.amnesie" commentaires={commentaires} onChange={onCommentairesChange} />
        </div>
        <div>
          <PremediationSection
            data={data.premeditation}
            onChange={(v) => onChange({ ...data, premeditation: v })}
          />
          <CommentField commentKey="faits.premeditation" commentaires={commentaires} onChange={onCommentairesChange} />
        </div>
      </div>
    </div>
  );
}
