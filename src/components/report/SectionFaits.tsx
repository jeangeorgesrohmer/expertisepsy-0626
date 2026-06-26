import type { ExamenFaitsData } from '../../types';
import { SectionBlock, SubSection } from './SectionBlock';
import {
  FAITS_COMPREHENSION, FAITS_RECONNAISSANCE, FAITS_ETAT_MENTAL,
  FAITS_CONSCIENCE, FAITS_AMNESIE, FAITS_PREMEDITATION,
} from './labels';

interface Props {
  data: ExamenFaitsData;
}

export default function SectionFaits({ data }: Props) {
  return (
    <SectionBlock title="IV. Examen au moment des faits">
      <SubSection title="Comprehension des faits" data={data.comprehension} labels={FAITS_COMPREHENSION} />
      <SubSection title="Reconnaissance des faits" data={data.reconnaissance} labels={FAITS_RECONNAISSANCE} />
      <SubSection title="Etat mental au moment des faits" data={data.etatMental} labels={FAITS_ETAT_MENTAL} />
      <SubSection title="Conscience et lucidite" data={data.conscienceLucidite} labels={FAITS_CONSCIENCE} />
      <SubSection title="Amnesie des faits" data={data.amnesieFaits} labels={FAITS_AMNESIE} />
      <SubSection title="Premeditation" data={data.premeditation} labels={FAITS_PREMEDITATION} />
    </SectionBlock>
  );
}
