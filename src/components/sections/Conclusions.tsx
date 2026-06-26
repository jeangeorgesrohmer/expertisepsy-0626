import type { ConclusionsData } from '../../types/conclusions';
import type { CommentsData } from '../../types/commentaires';
import { SectionCard } from '../ui/FormRow';
import CommentField from '../ui/CommentField';
import VoiceTextarea from '../ui/VoiceTextarea';

interface Props {
  data: ConclusionsData;
  onChange: (data: ConclusionsData) => void;
  commentaires: CommentsData;
  onCommentairesChange: (c: CommentsData) => void;
}

const textareaBase =
  'w-full rounded-lg border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors resize-vertical px-3.5 py-2.5 leading-relaxed pr-10';

function Carte1({ data, onChange }: Props) {
  return (
    <SectionCard title="A. Synthese et reponses aux questions">
      <div className="py-3 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Synthese clinique et medico-legale :
          </label>
          <VoiceTextarea
            className={`${textareaBase} min-h-[160px]`}
            placeholder="Resume clinique et medico-legal du cas..."
            value={data.syntheseClinique}
            onChange={(v) => onChange({ ...data, syntheseClinique: v })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Reponses aux questions posees dans la mission d'expertise :
          </label>
          <VoiceTextarea
            className={`${textareaBase} min-h-[240px]`}
            placeholder="Reponses detaillees aux questions de l'ordonnance de mission..."
            value={data.reponsesQuestionsOrdonnance}
            onChange={(v) => onChange({ ...data, reponsesQuestionsOrdonnance: v })}
          />
        </div>
      </div>
    </SectionCard>
  );
}

function Carte2({ data, onChange }: Props) {
  return (
    <SectionCard title="B. Observations finales et cloture">
      <div className="py-3 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Observations finales eventuelles :
          </label>
          <VoiceTextarea
            className={`${textareaBase} min-h-[100px]`}
            placeholder="Observations complementaires..."
            value={data.observationsFinales}
            onChange={(v) => onChange({ ...data, observationsFinales: v })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Fait a :
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors"
              placeholder="Lieu de redaction..."
              value={data.lieuRedaction}
              onChange={(e) => onChange({ ...data, lieuRedaction: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Le :
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors"
              value={data.dateRedaction}
              onChange={(e) => onChange({ ...data, dateRedaction: e.target.value })}
            />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

export default function Conclusions({ data, onChange, commentaires, onCommentairesChange }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">
          IX. Conclusions
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Synthese de l'expertise, reponses aux questions de la mission et cloture du rapport.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <Carte1 data={data} onChange={onChange} />
          <CommentField commentKey="concl.carte1" commentaires={commentaires} onChange={onCommentairesChange} />
        </div>
        <div>
          <Carte2 data={data} onChange={onChange} />
          <CommentField commentKey="concl.carte2" commentaires={commentaires} onChange={onCommentairesChange} />
        </div>
      </div>
    </div>
  );
}
