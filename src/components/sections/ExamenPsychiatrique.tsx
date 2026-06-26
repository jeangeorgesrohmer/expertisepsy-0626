import { ExamenPsychiatriqueData } from '../../types/examen';
import { DocumentMode } from '../../types';
import type { CommentsData } from '../../types/commentaires';
import CommentField from '../ui/CommentField';
import CarteA from './examen/CarteA';
import CarteB from './examen/CarteB';
import CarteC from './examen/CarteC';
import CarteD from './examen/CarteD';
import CarteE from './examen/CarteE';
import CarteF from './examen/CarteF';
import CarteG from './examen/CarteG';
import CarteH from './examen/CarteH';
import CarteI from './examen/CarteI';
import CarteJ from './examen/CarteJ';
import CarteK from './examen/CarteK';
import CarteL from './examen/CarteL';
import CarteM from './examen/CarteM';
import CarteN from './examen/CarteN';
import CarteO from './examen/CarteO';
import CarteOBis from './examen/CarteOBis';
import CarteP from './examen/CarteP';
import CarteQ from './examen/CarteQ';
import CarteR from './examen/CarteR';
import CarteS from './examen/CarteS';
import CarteT from './examen/CarteT';
import CarteU from './examen/CarteU';
import CarteV from './examen/CarteV';
import CarteW from './examen/CarteW';
import CarteX from './examen/CarteX';

interface Props {
  data: ExamenPsychiatriqueData;
  onChange: (data: ExamenPsychiatriqueData) => void;
  commentaires: CommentsData;
  onCommentairesChange: (c: CommentsData) => void;
  documentMode?: DocumentMode;
}

const CARTE_KEYS = [
  'carteA', 'carteB', 'carteC', 'carteD', 'carteE', 'carteF', 'carteG',
  'carteH', 'carteI', 'carteJ', 'carteK', 'carteL', 'carteM', 'carteN',
  'carteO', 'carteOBis', 'carteP', 'carteQ', 'carteR', 'carteW', 'carteS', 'carteT', 'carteU', 'carteV', 'carteX',
] as const;

const CARTE_COMPONENTS = {
  carteA: CarteA, carteB: CarteB, carteC: CarteC, carteD: CarteD,
  carteE: CarteE, carteF: CarteF, carteG: CarteG, carteH: CarteH,
  carteI: CarteI, carteJ: CarteJ, carteK: CarteK, carteL: CarteL,
  carteM: CarteM, carteN: CarteN, carteO: CarteO, carteOBis: CarteOBis,
  carteP: CarteP, carteQ: CarteQ, carteR: CarteR, carteS: CarteS,
  carteT: CarteT, carteU: CarteU, carteV: CarteV, carteW: CarteW, carteX: CarteX,
} as Record<string, React.ComponentType<{ data: never; onChange: (d: never) => void }>>;

export default function ExamenPsychiatrique({ data, onChange, commentaires, onCommentairesChange, documentMode }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">III. Examen psychiatrique</h2>
        <p className="text-slate-500 text-sm mt-1">
          {documentMode === 'clinical'
            ? "Evaluation clinique au moment de l'examen : conditions, cognition, langage, syndromes et troubles."
            : "Evaluation clinique au moment de l'expertise : conditions, cognition, langage, syndromes et troubles."}
        </p>
      </div>

      <div className="space-y-5">
        {CARTE_KEYS.map((key) => {
          const Comp = CARTE_COMPONENTS[key];
          return (
            <div key={key}>
              <Comp
                data={data[key] as never}
                onChange={(v: never) => onChange({ ...data, [key]: v })}
              />
              <CommentField
                commentKey={`exam.${key}`}
                commentaires={commentaires}
                onChange={onCommentairesChange}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
