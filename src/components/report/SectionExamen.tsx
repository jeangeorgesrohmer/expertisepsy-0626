import type { ExamenPsychiatriqueData } from '../../types';
import { SectionBlock, SubSection } from './SectionBlock';
import {
  EXAM_A, EXAM_B, EXAM_C, EXAM_D, EXAM_E, EXAM_F, EXAM_G,
  EXAM_H, EXAM_I, EXAM_J, EXAM_K, EXAM_L, EXAM_M, EXAM_N,
  EXAM_O, EXAM_O_BIS, EXAM_P, EXAM_Q, EXAM_R, EXAM_S, EXAM_T, EXAM_U,
  EXAM_V, EXAM_W, EXAM_X,
} from './labels';

interface Props {
  data: ExamenPsychiatriqueData;
}

export default function SectionExamen({ data }: Props) {
  return (
    <SectionBlock title="III. Examen psychiatrique">
      <SubSection title="Presentation et contact" data={data.carteA} labels={EXAM_A} />
      <SubSection title="Fonctions cognitives" data={data.carteB} labels={EXAM_B} />
      <SubSection title="Cognition sociale" data={data.carteC} labels={EXAM_C} />
      <SubSection title="Langage et discours" data={data.carteD} labels={EXAM_D} />
      <SubSection title="Syndrome depressif" data={data.carteE} labels={EXAM_E} />
      <SubSection title="Syndrome maniaque" data={data.carteF} labels={EXAM_F} />
      <SubSection title="Syndrome anxieux" data={data.carteG} labels={EXAM_G} />
      <SubSection title="Syndrome obsessionnel-compulsif" data={data.carteH} labels={EXAM_H} />
      <SubSection title="Stress post-traumatique" data={data.carteI} labels={EXAM_I} />
      <SubSection title="Syndrome delirant" data={data.carteJ} labels={EXAM_J} />
      <SubSection title="Syndrome hallucinatoire" data={data.carteK} labels={EXAM_K} />
      <SubSection title="Syndrome dissociatif" data={data.carteL} labels={EXAM_L} />
      <SubSection title="Syndrome catatonique" data={data.carteM} labels={EXAM_M} />
      <SubSection title="Symptomes negatifs" data={data.carteN} labels={EXAM_N} />
      <SubSection title="Syndrome confusionnel" data={data.carteO} labels={EXAM_O} />
      <SubSection title="Troubles lies a l'usage de substances" data={data.carteOBis} labels={EXAM_O_BIS} />
      <SubSection title="Syndrome dementiel" data={data.carteP} labels={EXAM_P} />
      <SubSection title="Troubles des conduites alimentaires" data={data.carteQ} labels={EXAM_Q} />
      <SubSection title="TDAH" data={data.carteR} labels={EXAM_R} />
      <SubSection title="Troubles du Spectre de l'Autisme (TSA)" data={data.carteW} labels={EXAM_W} />
      <SubSection title="Troubles paraphiliques" data={data.carteS} labels={EXAM_S} />
      <SubSection title="Troubles de la personnalite" data={data.carteT} labels={EXAM_T} />
      <SubSection title="Impulsivite et agressivite" data={data.carteU} labels={EXAM_U} />
      <SubSection title="Authenticite des troubles / Simulation" data={data.carteV} labels={EXAM_V} />
      <SubSection title="Troubles a symptomatologie somatique, psychogenes et pathomimies" data={data.carteX} labels={EXAM_X} />
    </SectionBlock>
  );
}
