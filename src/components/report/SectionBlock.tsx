interface FieldEntry {
  label: string;
  value: string;
}

function extractFields(
  data: Record<string, unknown>,
  labels: Record<string, string>
): FieldEntry[] {
  const entries: FieldEntry[] = [];
  for (const [key, label] of Object.entries(labels)) {
    const val = data[key];
    if (val === undefined || val === null) continue;
    if (typeof val === 'boolean') {
      if (val) entries.push({ label, value: 'Oui' });
    } else if (typeof val === 'string') {
      if (val === 'NR' || val.trim() === '') continue;
      entries.push({ label, value: val });
    }
  }
  return entries;
}

interface SectionBlockProps {
  title: string;
  children: React.ReactNode;
}

export function SectionBlock({ title, children }: SectionBlockProps) {
  return (
    <section className="report-section">
      <h2 className="report-section-title">{title}</h2>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

interface SubSectionProps {
  title: string;
  data: Record<string, unknown>;
  labels: Record<string, string>;
}

export function SubSection({ title, data, labels }: SubSectionProps) {
  const fields = extractFields(data, labels);
  if (fields.length === 0) return null;

  return (
    <div>
      <h3 className="report-subsection-title">{title}</h3>
      <FieldList fields={fields} />
    </div>
  );
}

interface FieldListProps {
  fields: FieldEntry[];
}

export function FieldList({ fields }: FieldListProps) {
  if (fields.length === 0) return null;

  const useGrid = fields.length >= 3 && fields.every((f) => f.value.length < 50);

  if (useGrid) {
    return (
      <div className="report-field-grid">
        {fields.map((f, i) => (
          <div key={i} className="report-field-item">
            <span className="report-field-label">{f.label} :</span>
            <span className="report-field-value">{f.value}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <ul className="space-y-1">
      {fields.map((f, i) => (
        <li key={i} className="report-field-item flex gap-1.5" style={{ fontSize: '0.8125rem', lineHeight: '1.5' }}>
          <span className="report-field-label">{f.label} :</span>
          <span className="report-field-value">{f.value}</span>
        </li>
      ))}
    </ul>
  );
}

interface TextBlockProps {
  label: string;
  value: string;
}

export function TextBlock({ label, value }: TextBlockProps) {
  if (!value || value.trim() === '') return null;
  return (
    <div>
      <h3 className="report-subsection-title">{label}</h3>
      <p className="report-text-block">{value}</p>
    </div>
  );
}

interface DataBlockProps {
  data: Record<string, unknown>;
  labels: Record<string, string>;
}

export function DataBlock({ data, labels }: DataBlockProps) {
  const fields = extractFields(data, labels);
  if (fields.length === 0) return null;
  return <FieldList fields={fields} />;
}
