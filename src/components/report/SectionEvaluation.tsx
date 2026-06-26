import type { EvaluationMedicoLegaleData } from '../../types';
import { SectionBlock } from './SectionBlock';

interface Props {
  data: EvaluationMedicoLegaleData;
}

function renderYesNoNR(val: string): string {
  if (val === 'Oui') return 'Oui';
  if (val === 'Non') return 'Non';
  return '';
}

function EvalItem({ title, verdict, verdictLabel, justification }: {
  title: string;
  verdict: string;
  verdictLabel: string;
  justification: string;
}) {
  if (!verdict && !justification.trim()) return null;
  return (
    <div>
      <h3 className="report-subsection-title">{title}</h3>
      {verdict && (
        <p style={{ fontSize: '0.8125rem', lineHeight: '1.5' }} className="mb-1">
          <span className="report-field-label">{verdictLabel} :</span>{' '}
          <span className="report-field-value">{verdict}</span>
        </p>
      )}
      {justification.trim() && (
        <p className="report-text-block mt-1">{justification}</p>
      )}
    </div>
  );
}

function SimpleYesNo({ label, value }: { label: string; value: string }) {
  const rendered = renderYesNoNR(value);
  if (!rendered) return null;
  return (
    <p style={{ fontSize: '0.8125rem', lineHeight: '1.5' }} className="mb-1">
      <span className="report-field-label">{label} :</span>{' '}
      <span className="report-field-value">{rendered}</span>
    </p>
  );
}

export default function SectionEvaluation({ data }: Props) {
  const a1 = renderYesNoNR(data.alinea1.aboli);
  const a2 = renderYesNoNR(data.alinea2.altere);
  const acc = renderYesNoNR(data.accessibilite.accessible);
  const gav = renderYesNoNR(data.accessibilite.compatibleGardeAVue);
  const apt = renderYesNoNR(data.accessibilite.apteComparaitre);

  const hasContent = a1 || a2 || acc || gav || apt
    || data.alinea1.justification.trim()
    || data.alinea2.justification.trim()
    || data.accessibilite.justification.trim();

  if (!hasContent) return null;

  return (
    <SectionBlock title="VII. Evaluation medico-legale">
      <EvalItem
        title="Article 122-1 alinea 1 — Abolition du discernement"
        verdict={a1}
        verdictLabel="Discernement aboli"
        justification={data.alinea1.justification}
      />
      <EvalItem
        title="Article 122-1 alinea 2 — Alteration du discernement"
        verdict={a2}
        verdictLabel="Discernement altere"
        justification={data.alinea2.justification}
      />
      <EvalItem
        title="Accessibilite a la sanction penale"
        verdict={acc}
        verdictLabel="Accessible"
        justification={data.accessibilite.justification}
      />
      {(gav || apt) && (
        <div>
          <SimpleYesNo label="Compatible avec garde a vue / incarceration" value={data.accessibilite.compatibleGardeAVue} />
          <SimpleYesNo label="Apte a comparaitre et se defendre" value={data.accessibilite.apteComparaitre} />
        </div>
      )}
    </SectionBlock>
  );
}
