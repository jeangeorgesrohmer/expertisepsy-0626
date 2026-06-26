import { AnamneseData } from '../../types/anamnese';
import type { CommentsData } from '../../types/commentaires';
import CommentField from '../ui/CommentField';
import CarteA from './anamnese/CarteA';
import CarteB from './anamnese/CarteB';
import CarteC from './anamnese/CarteC';
import CarteD from './anamnese/CarteD';
import CarteE from './anamnese/CarteE';
import CarteF from './anamnese/CarteF';
import CarteG from './anamnese/CarteG';
import CarteH from './anamnese/CarteH';
import CarteI from './anamnese/CarteI';

interface Props {
  data: AnamneseData;
  onChange: (data: AnamneseData) => void;
  commentaires: CommentsData;
  onCommentairesChange: (c: CommentsData) => void;
}

export default function Anamnese({ data, onChange, commentaires, onCommentairesChange }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">II. Anamnese biographique</h2>
        <p className="text-slate-500 text-sm mt-1">
          Antecedents medicaux, psychiatriques, judiciaires, biographiques et psychosexuels du sujet expertise.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <CarteA data={data.carteA} onChange={(v) => onChange({ ...data, carteA: v })} />
          <CommentField commentKey="anam.carteA" commentaires={commentaires} onChange={onCommentairesChange} />
        </div>
        <div>
          <CarteB data={data.carteB} onChange={(v) => onChange({ ...data, carteB: v })} />
          <CommentField commentKey="anam.carteB" commentaires={commentaires} onChange={onCommentairesChange} />
        </div>
        <div>
          <CarteC data={data.carteC} onChange={(v) => onChange({ ...data, carteC: v })} />
          <CommentField commentKey="anam.carteC" commentaires={commentaires} onChange={onCommentairesChange} />
        </div>
        <div>
          <CarteD data={data.carteD} onChange={(v) => onChange({ ...data, carteD: v })} />
          <CommentField commentKey="anam.carteD" commentaires={commentaires} onChange={onCommentairesChange} />
        </div>
        <div>
          <CarteE data={data.carteE} onChange={(v) => onChange({ ...data, carteE: v })} />
          <CommentField commentKey="anam.carteE" commentaires={commentaires} onChange={onCommentairesChange} />
        </div>
        <div>
          <CarteF data={data.carteF} onChange={(v) => onChange({ ...data, carteF: v })} />
          <CommentField commentKey="anam.carteF" commentaires={commentaires} onChange={onCommentairesChange} />
        </div>
        <div>
          <CarteG data={data.carteG} onChange={(v) => onChange({ ...data, carteG: v })} />
          <CommentField commentKey="anam.carteG" commentaires={commentaires} onChange={onCommentairesChange} />
        </div>
        <div>
          <CarteH data={data.carteH} onChange={(v) => onChange({ ...data, carteH: v })} />
          <CommentField commentKey="anam.carteH" commentaires={commentaires} onChange={onCommentairesChange} />
        </div>
        <div>
          <CarteI data={data.carteI} onChange={(v) => onChange({ ...data, carteI: v })} />
          <CommentField commentKey="anam.carteI" commentaires={commentaires} onChange={onCommentairesChange} />
        </div>
      </div>
    </div>
  );
}
