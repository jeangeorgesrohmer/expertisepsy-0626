import { PropositionsSoinsData } from '../../types';
import type { CommentsData } from '../../types/commentaires';
import CommentField from '../ui/CommentField';
import VoiceTextarea from '../ui/VoiceTextarea';

interface Props {
  data: PropositionsSoinsData;
  onChange: (data: PropositionsSoinsData) => void;
  commentaires: CommentsData;
  onCommentairesChange: (c: CommentsData) => void;
}

const textareaClass =
  'w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors resize-y min-h-[120px] pr-10';

export default function PropositionsSoins({
  data,
  onChange,
  commentaires,
  onCommentairesChange,
}: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">
          X. Conclusion et Propositions de Soins
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Synthèse thérapeutique et recommandations de prise en charge.
        </p>
      </div>

      <div className="bg-slate-50 rounded-lg p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Propositions thérapeutiques
          </label>
          <p className="text-xs text-slate-500 mb-2">
            Traitements médicamenteux, psychothérapie, autres approches thérapeutiques recommandées
          </p>
          <VoiceTextarea
            className={textareaClass}
            placeholder="Ex: Instauration d'un traitement antidépresseur, psychothérapie cognitive et comportementale..."
            value={data.propositionsTherapeutiques}
            onChange={(v) => onChange({ ...data, propositionsTherapeutiques: v })}
          />
        </div>

        <CommentField
          commentKey="soins.therapeutiques"
          commentaires={commentaires}
          onChange={onCommentairesChange}
        />

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Orientation de soins
          </label>
          <p className="text-xs text-slate-500 mb-2">
            Suivi ambulatoire, hospitalisation, structure spécialisée
          </p>
          <VoiceTextarea
            className={textareaClass}
            placeholder="Ex: Suivi ambulatoire en CMP, hospitalisation en unité de crise, orientation vers CSAPA..."
            value={data.orientationSoins}
            onChange={(v) => onChange({ ...data, orientationSoins: v })}
          />
        </div>

        <CommentField
          commentKey="soins.orientation"
          commentaires={commentaires}
          onChange={onCommentairesChange}
        />

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Démarches médico-sociales
          </label>
          <p className="text-xs text-slate-500 mb-2">
            MDPH, ALD, arrêt de travail, autres démarches administratives
          </p>
          <VoiceTextarea
            className={textareaClass}
            placeholder="Ex: Constitution dossier MDPH pour reconnaissance handicap, demande ALD 23..."
            value={data.demarchesMedicoSociales}
            onChange={(v) => onChange({ ...data, demarchesMedicoSociales: v })}
          />
        </div>

        <CommentField
          commentKey="soins.medico_social"
          commentaires={commentaires}
          onChange={onCommentairesChange}
        />
      </div>
    </div>
  );
}
