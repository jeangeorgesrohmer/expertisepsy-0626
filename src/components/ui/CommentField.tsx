import { MessageSquarePlus } from 'lucide-react';
import type { CommentsData } from '../../types/commentaires';
import VoiceTextarea from './VoiceTextarea';

interface Props {
  commentKey: string;
  commentaires: CommentsData;
  onChange: (commentaires: CommentsData) => void;
}

export default function CommentField({ commentKey, commentaires, onChange }: Props) {
  const entry = commentaires[commentKey] ?? { has: false, text: '' };

  const toggle = () => {
    onChange({
      ...commentaires,
      [commentKey]: { has: !entry.has, text: entry.text },
    });
  };

  const setText = (text: string) => {
    onChange({
      ...commentaires,
      [commentKey]: { has: entry.has, text },
    });
  };

  return (
    <div className="mt-1 px-1">
      <button
        type="button"
        onClick={toggle}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${
          entry.has
            ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            : 'text-slate-400 hover:text-slate-500 hover:bg-slate-50'
        }`}
      >
        <MessageSquarePlus size={13} />
        <span>{entry.has ? 'Commentaire actif' : 'Ajouter un commentaire'}</span>
      </button>

      {entry.has && (
        <div className="mt-2 mb-1">
          <VoiceTextarea
            rows={3}
            placeholder="Saisir votre commentaire..."
            value={entry.text}
            onChange={setText}
          />
        </div>
      )}
    </div>
  );
}
