import type { DiagnosticData } from '../../types';
import { SectionBlock, SubSection, TextBlock } from './SectionBlock';
import { DIAG_PRINCIPAL } from './labels';

interface Props {
  data: DiagnosticData;
}

export default function SectionDiagnostic({ data }: Props) {
  return (
    <SectionBlock title="VI. Diagnostic">
      <SubSection title="Diagnostic principal" data={data.principal} labels={DIAG_PRINCIPAL} />
      <TextBlock label="Diagnostics associes" value={data.diagnosticsAssocies} />
      <TextBlock label="Comorbidites" value={data.comorbidites} />
      <TextBlock label="Elements determinants" value={data.elementsDeterminants} />
    </SectionBlock>
  );
}
