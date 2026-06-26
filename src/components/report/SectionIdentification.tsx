import type { IdentificationData } from '../../types';
import { SectionBlock, SubSection, DataBlock } from './SectionBlock';
import { IDENT_A, IDENT_B, IDENT_C, IDENT_D, IDENT_E } from './labels';

interface Props {
  data: IdentificationData;
}

export default function SectionIdentification({ data }: Props) {
  return (
    <SectionBlock title="I. Informations generales">
      <SubSection title="Identite du sujet" data={data.carteA} labels={IDENT_A} />
      <SubSection title="Type d'expertise" data={data.carteB} labels={IDENT_B} />
      <SubSection title="Qualite du sujet" data={data.carteC} labels={IDENT_C} />

      {data.carteD.rappelDesFaits.trim() && (
        <div>
          <h3 className="report-subsection-title">Rappel des faits</h3>
          <p className="report-text-block">{data.carteD.rappelDesFaits}</p>
        </div>
      )}

      {data.carteD.questionsMission.trim() && (
        <div>
          <h3 className="report-subsection-title">Questions de la mission</h3>
          <p className="report-text-block whitespace-pre-wrap">{data.carteD.questionsMission}</p>
        </div>
      )}

      <div>
        <h3 className="report-subsection-title">Documents consultes</h3>
        <DataBlock data={data.carteE} labels={IDENT_E} />
      </div>
    </SectionBlock>
  );
}
