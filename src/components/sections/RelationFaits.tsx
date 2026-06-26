import {
  RelationFaitsData,
  ExplicationsFaitsData,
  LienCausaliteData,
  YesNoNR,
} from '../../types/relationFaits';
import type { CommentsData } from '../../types/commentaires';
import { FormRow, SectionCard } from '../ui/FormRow';
import TriToggle from '../ui/TriToggle';
import CommentField from '../ui/CommentField';

interface Props {
  data: RelationFaitsData;
  onChange: (data: RelationFaitsData) => void;
  commentaires: CommentsData;
  onCommentairesChange: (c: CommentsData) => void;
}

function ExplicationsSection({
  data,
  onChange,
}: {
  data: ExplicationsFaitsData;
  onChange: (d: ExplicationsFaitsData) => void;
}) {
  const set = (field: keyof ExplicationsFaitsData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });

  return (
    <SectionCard title="A. Les faits peuvent-ils etre expliques par">
      <FormRow label="Une pathologie psychiatrique">
        <TriToggle value={data.pathologiePsychiatrique} onChange={(v) => set('pathologiePsychiatrique', v)} />
      </FormRow>
      <FormRow label="Un trouble de l'humeur">
        <TriToggle value={data.troubleHumeur} onChange={(v) => set('troubleHumeur', v)} />
      </FormRow>
      <FormRow label="Un delire">
        <TriToggle value={data.delire} onChange={(v) => set('delire', v)} />
      </FormRow>
      <FormRow label="Des hallucinations">
        <TriToggle value={data.hallucinations} onChange={(v) => set('hallucinations', v)} />
      </FormRow>
      <FormRow label="Une intoxication">
        <TriToggle value={data.intoxication} onChange={(v) => set('intoxication', v)} />
      </FormRow>
      <FormRow label="Un trouble de la personnalite">
        <TriToggle value={data.troublePersonnalite} onChange={(v) => set('troublePersonnalite', v)} />
      </FormRow>
      <FormRow label="Un trouble paraphilique">
        <TriToggle value={data.troubleParaphilique} onChange={(v) => set('troubleParaphilique', v)} />
      </FormRow>
      <FormRow label="Une deficience intellectuelle">
        <TriToggle value={data.deficienceIntellectuelle} onChange={(v) => set('deficienceIntellectuelle', v)} />
      </FormRow>
      <FormRow label="Aucune pathologie mentale">
        <TriToggle value={data.aucunePathologieMentale} onChange={(v) => set('aucunePathologieMentale', v)} />
      </FormRow>
    </SectionCard>
  );
}

function CausaliteSection({
  data,
  onChange,
}: {
  data: LienCausaliteData;
  onChange: (d: LienCausaliteData) => void;
}) {
  const set = (field: keyof LienCausaliteData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });

  return (
    <SectionCard title="B. Lien de causalite">
      <FormRow label="Lien direct">
        <TriToggle value={data.lienDirect} onChange={(v) => set('lienDirect', v)} />
      </FormRow>
      <FormRow label="Lien essentiel">
        <TriToggle value={data.lienEssentiel} onChange={(v) => set('lienEssentiel', v)} />
      </FormRow>
      <FormRow label="Lien indirect">
        <TriToggle value={data.lienIndirect} onChange={(v) => set('lienIndirect', v)} />
      </FormRow>
      <FormRow label="Facteur contributif">
        <TriToggle value={data.facteurContributif} onChange={(v) => set('facteurContributif', v)} />
      </FormRow>
      <FormRow label="Absence de lien">
        <TriToggle value={data.absenceDeLien} onChange={(v) => set('absenceDeLien', v)} />
      </FormRow>
      <FormRow label="Sans ces troubles, les faits auraient-ils ete possibles dans les memes conditions ?">
        <TriToggle value={data.faitsPossiblesSansTroubles} onChange={(v) => set('faitsPossiblesSansTroubles', v)} />
      </FormRow>
    </SectionCard>
  );
}

export default function RelationFaits({ data, onChange, commentaires, onCommentairesChange }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">V. Relation entre l'etat mental et les faits</h2>
        <p className="text-slate-500 text-sm mt-1">
          Analyse du lien entre la pathologie eventuelle et les faits reproches.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <ExplicationsSection
            data={data.explications}
            onChange={(v) => onChange({ ...data, explications: v })}
          />
          <CommentField commentKey="rel.explications" commentaires={commentaires} onChange={onCommentairesChange} />
        </div>
        <div>
          <CausaliteSection
            data={data.causalite}
            onChange={(v) => onChange({ ...data, causalite: v })}
          />
          <CommentField commentKey="rel.causalite" commentaires={commentaires} onChange={onCommentairesChange} />
        </div>
      </div>
    </div>
  );
}
