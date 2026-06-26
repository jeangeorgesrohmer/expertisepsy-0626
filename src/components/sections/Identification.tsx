import { IdentificationData, DocumentMode } from '../../types';
import type { CommentsData } from '../../types/commentaires';
import CommentField from '../ui/CommentField';
import CarteA from './identification/CarteA';
import CarteB from './identification/CarteB';
import CarteC from './identification/CarteC';
import CarteD from './identification/CarteD';
import CarteQuestionsMission from './identification/CarteQuestionsMission';
import CarteE from './identification/CarteE';
import CarteClinical from './identification/CarteClinical';

interface Props {
  data: IdentificationData;
  onChange: (data: IdentificationData) => void;
  commentaires: CommentsData;
  onCommentairesChange: (c: CommentsData) => void;
  documentMode: DocumentMode;
}

export default function Identification({ data, onChange, commentaires, onCommentairesChange, documentMode }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">I. Identification</h2>
        <p className="text-slate-500 text-sm mt-1">
          {documentMode === 'expertise'
            ? "Informations d'identité du sujet examiné et contexte de la mission."
            : "Informations d'identité du patient et contexte de la consultation."}
        </p>
      </div>

      <div>
        <CarteA data={data.carteA} onChange={(d) => onChange({ ...data, carteA: d })} documentMode={documentMode} />
        <CommentField commentKey="ident.carteA" commentaires={commentaires} onChange={onCommentairesChange} />
      </div>

      {documentMode === 'expertise' && (
        <>
          <div>
            <CarteB data={data.carteB} onChange={(d) => onChange({ ...data, carteB: d })} />
            <CommentField commentKey="ident.carteB" commentaires={commentaires} onChange={onCommentairesChange} />
          </div>
          <div>
            <CarteC data={data.carteC} onChange={(d) => onChange({ ...data, carteC: d })} />
            <CommentField commentKey="ident.carteC" commentaires={commentaires} onChange={onCommentairesChange} />
          </div>
          <div>
            <CarteD data={data.carteD} onChange={(d) => onChange({ ...data, carteD: d })} />
            <CommentField commentKey="ident.carteD" commentaires={commentaires} onChange={onCommentairesChange} />
          </div>
          <div>
            <CarteQuestionsMission
              value={data.carteD.questionsMission}
              onChange={(v) => onChange({ ...data, carteD: { ...data.carteD, questionsMission: v } })}
            />
            <CommentField commentKey="ident.carteQM" commentaires={commentaires} onChange={onCommentairesChange} />
          </div>
        </>
      )}

      {documentMode === 'clinical' && (
        <div>
          <CarteClinical
            data={data.clinicalContext}
            onChange={(d) => onChange({ ...data, clinicalContext: d })}
          />
          <CommentField commentKey="ident.clinical" commentaires={commentaires} onChange={onCommentairesChange} />
        </div>
      )}

      <div>
        <CarteE data={data.carteE} onChange={(d) => onChange({ ...data, carteE: d })} documentMode={documentMode} />
        <CommentField commentKey="ident.carteE" commentaires={commentaires} onChange={onCommentairesChange} />
      </div>
    </div>
  );
}
