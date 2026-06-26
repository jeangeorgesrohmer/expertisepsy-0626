import type { AnamneseData } from '../../types';
import { SectionBlock, SubSection } from './SectionBlock';
import {
  ANAM_A, ANAM_B, ANAM_C, ANAM_D,
  ANAM_E, ANAM_F, ANAM_G, ANAM_H, ANAM_I,
} from './labels';

interface Props {
  data: AnamneseData;
}

export default function SectionAnamnese({ data }: Props) {
  return (
    <SectionBlock title="II. Anamnese biographique">
      <SubSection title="Antecedents medicaux" data={data.carteA} labels={ANAM_A} />
      <SubSection title="Antecedents psychiatriques" data={data.carteB} labels={ANAM_B} />
      <SubSection title="Conduites addictives" data={data.carteC} labels={ANAM_C} />
      <SubSection title="Antecedents judiciaires" data={data.carteD} labels={ANAM_D} />
      <SubSection title="Histoire familiale" data={data.carteE} labels={ANAM_E} />
      <SubSection title="Parcours scolaire" data={data.carteF} labels={ANAM_F} />
      <SubSection title="Situation professionnelle" data={data.carteG} labels={ANAM_G} />
      <SubSection title="Situation personnelle et sociale" data={data.carteH} labels={ANAM_H} />
      <SubSection title="Vie sexuelle" data={data.carteI} labels={ANAM_I} />
    </SectionBlock>
  );
}
