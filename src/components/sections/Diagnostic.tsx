import type { DiagnosticData, DiagnosticPrincipal } from '../../types/diagnostic';
import { INITIAL_DIAGNOSTIC_PRINCIPAL } from '../../types/diagnostic';
import type { CommentsData } from '../../types/commentaires';
import { DocumentMode } from '../../types';
import { SectionCard } from '../ui/FormRow';
import { Check } from 'lucide-react';
import CommentField from '../ui/CommentField';
import VoiceTextarea from '../ui/VoiceTextarea';

interface Props {
  data: DiagnosticData;
  onChange: (data: DiagnosticData) => void;
  commentaires: CommentsData;
  onCommentairesChange: (c: CommentsData) => void;
  documentMode?: DocumentMode;
}

function Checkbox({
  checked,
  onChange,
  label,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="py-1.5">
      <div
        role="checkbox"
        aria-checked={checked}
        tabIndex={0}
        onClick={() => onChange(!checked)}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            onChange(!checked);
          }
        }}
        className="flex items-start gap-3 cursor-pointer group"
      >
        <span
          className={`mt-0.5 w-6 h-6 rounded flex-shrink-0 flex items-center justify-center border-2 transition-all ${
            checked
              ? 'bg-blue-500 border-blue-500 text-white'
              : 'border-slate-300 bg-white group-hover:border-slate-400'
          }`}
        >
          {checked && <Check size={14} strokeWidth={3} />}
        </span>
        <span className="text-sm text-slate-700 leading-snug select-none">
          {label}
        </span>
      </div>
      {checked && children && <div className="ml-8 mt-1.5">{children}</div>}
    </div>
  );
}

function PrecisionInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <input
      type="text"
      className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors w-full sm:w-64 min-h-[2.75rem]"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="py-2">
      <label className="block text-xs font-medium text-slate-500 mb-1.5">
        {label}
      </label>
      <VoiceTextarea
        rows={4}
        className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors resize-y pr-10"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default function Diagnostic({ data, onChange, commentaires, onCommentairesChange, documentMode }: Props) {
  const p = data.principal;

  const setPrincipal = (partial: Partial<DiagnosticPrincipal>) => {
    if (partial.absencePathologie === true) {
      onChange({
        ...data,
        principal: { ...INITIAL_DIAGNOSTIC_PRINCIPAL, absencePathologie: true },
      });
      return;
    }
    onChange({
      ...data,
      principal: { ...data.principal, ...partial },
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">
          VI. Diagnostic psychiatrique
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Classification diagnostique et elements complementaires.
        </p>
      </div>

      <div className="space-y-5">
        <div>
        <SectionCard title="A. Diagnostic principal">
          <div className="py-3 space-y-0.5">
            <Checkbox
              checked={p.absencePathologie}
              onChange={(v) => setPrincipal({ absencePathologie: v })}
              label="Absence de pathologie psychiatrique"
            />

            {!p.absencePathologie && <>
            <Checkbox
              checked={p.troubleDepressif}
              onChange={(v) => setPrincipal({ troubleDepressif: v })}
              label="Trouble depressif caracterise"
            >
              <PrecisionInput
                value={p.troubleDepressifPrecision}
                onChange={(v) => setPrincipal({ troubleDepressifPrecision: v })}
                placeholder="Preciser : leger / moyen / severe"
              />
            </Checkbox>

            <Checkbox
              checked={p.troubleBipolaire}
              onChange={(v) => setPrincipal({ troubleBipolaire: v })}
              label="Trouble bipolaire"
            />

            <Checkbox
              checked={p.schizophrenie}
              onChange={(v) => setPrincipal({ schizophrenie: v })}
              label="Schizophrenie"
            />

            <Checkbox
              checked={p.troubleDelirant}
              onChange={(v) => setPrincipal({ troubleDelirant: v })}
              label="Trouble delirant persistant"
            />

            <Checkbox
              checked={p.troubleSchizoAffectif}
              onChange={(v) => setPrincipal({ troubleSchizoAffectif: v })}
              label="Trouble schizo-affectif"
            />

            <Checkbox
              checked={p.troubleAdaptation}
              onChange={(v) => setPrincipal({ troubleAdaptation: v })}
              label="Trouble de l'adaptation"
            />

            <Checkbox
              checked={p.etatStressPostTraumatique}
              onChange={(v) => setPrincipal({ etatStressPostTraumatique: v })}
              label="Etat de stress post-traumatique"
            />

            <Checkbox
              checked={p.troubleAnxieuxGeneralise}
              onChange={(v) => setPrincipal({ troubleAnxieuxGeneralise: v })}
              label="Trouble anxieux generalise"
            />

            <Checkbox
              checked={p.troublePanique}
              onChange={(v) => setPrincipal({ troublePanique: v })}
              label="Trouble panique"
            />

            <Checkbox
              checked={p.toc}
              onChange={(v) => setPrincipal({ toc: v })}
              label="Trouble obsessionnel-compulsif"
            />

            <Checkbox
              checked={p.troubleUsageAlcool}
              onChange={(v) => setPrincipal({ troubleUsageAlcool: v })}
              label="Trouble de l'usage de l'alcool"
            />

            <Checkbox
              checked={p.troubleUsageSubstances}
              onChange={(v) => setPrincipal({ troubleUsageSubstances: v })}
              label="Trouble de l'usage de substances"
            />

            <Checkbox
              checked={p.troublePersonnalite}
              onChange={(v) => setPrincipal({ troublePersonnalite: v })}
              label="Trouble de la personnalite"
            >
              <PrecisionInput
                value={p.troublePersonnaliteType}
                onChange={(v) => setPrincipal({ troublePersonnaliteType: v })}
                placeholder="Preciser type :"
              />
            </Checkbox>

            <Checkbox
              checked={p.troubleParaphilique}
              onChange={(v) => setPrincipal({ troubleParaphilique: v })}
              label="Trouble paraphilique"
            >
              <PrecisionInput
                value={p.troubleParaphiliqueType}
                onChange={(v) => setPrincipal({ troubleParaphiliqueType: v })}
                placeholder="Preciser type :"
              />
            </Checkbox>

            <Checkbox
              checked={p.retardMental}
              onChange={(v) => setPrincipal({ retardMental: v })}
              label="Retard mental"
            >
              <PrecisionInput
                value={p.retardMentalDegre}
                onChange={(v) => setPrincipal({ retardMentalDegre: v })}
                placeholder="Preciser degre :"
              />
            </Checkbox>

            <Checkbox
              checked={p.syndromeDementiel}
              onChange={(v) => setPrincipal({ syndromeDementiel: v })}
              label="Syndrome dementiel"
            />

            <Checkbox
              checked={p.autre}
              onChange={(v) => setPrincipal({ autre: v })}
              label="Autre"
            >
              <PrecisionInput
                value={p.autrePrecision}
                onChange={(v) => setPrincipal({ autrePrecision: v })}
                placeholder="Preciser :"
              />
            </Checkbox>
            </>}
          </div>
        </SectionCard>
        <CommentField commentKey="diag.principal" commentaires={commentaires} onChange={onCommentairesChange} />
        </div>

        <div>
        <SectionCard title="B. Elements complementaires">
          <div className="py-3 space-y-3">
            <TextArea
              label="Diagnostic(s) associe(s) :"
              value={data.diagnosticsAssocies}
              onChange={(v) => onChange({ ...data, diagnosticsAssocies: v })}
              placeholder="Indiquer les diagnostics associes..."
            />
            <TextArea
              label="Comorbidites :"
              value={data.comorbidites}
              onChange={(v) => onChange({ ...data, comorbidites: v })}
              placeholder="Indiquer les comorbidites..."
            />
            {documentMode !== 'clinical' && (
              <TextArea
                label="Elements determinants pour la comprehension des faits :"
                value={data.elementsDeterminants}
                onChange={(v) => onChange({ ...data, elementsDeterminants: v })}
                placeholder="Decrire les elements determinants..."
              />
            )}
          </div>
        </SectionCard>
        <CommentField commentKey="diag.complementaires" commentaires={commentaires} onChange={onCommentairesChange} />
        </div>
      </div>
    </div>
  );
}
