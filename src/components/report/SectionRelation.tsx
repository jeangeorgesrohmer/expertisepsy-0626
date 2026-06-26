import type { RelationFaitsData } from '../../types';
import { SectionBlock, SubSection } from './SectionBlock';
import { REL_EXPLICATIONS, REL_CAUSALITE } from './labels';

interface Props {
  data: RelationFaitsData;
}

export default function SectionRelation({ data }: Props) {
  return (
    <SectionBlock title="V. Relation faits / etat mental">
      <SubSection title="Explications psychiatriques des faits" data={data.explications} labels={REL_EXPLICATIONS} />
      <SubSection title="Lien de causalite" data={data.causalite} labels={REL_CAUSALITE} />
    </SectionBlock>
  );
}
