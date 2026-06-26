import type { YesNoNR } from '../../types/anamnese';
import type { EvaluationMedicoLegaleData } from '../../types/evaluationMedicoLegale';
import type { CommentsData } from '../../types/commentaires';
import { SectionCard } from '../ui/FormRow';
import { Scale } from 'lucide-react';
import CommentField from '../ui/CommentField';
import VoiceTextarea from '../ui/VoiceTextarea';

interface Props {
  data: EvaluationMedicoLegaleData;
  onChange: (data: EvaluationMedicoLegaleData) => void;
  commentaires: CommentsData;
  onCommentairesChange: (c: CommentsData) => void;
}

interface LegalRadioOption {
  value: YesNoNR;
  label: string;
}

function LegalRadioGroup({
  options,
  value,
  onChange,
}: {
  options: LegalRadioOption[];
  value: YesNoNR;
  onChange: (v: YesNoNR) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {options.map((opt) => {
        const selected = value === opt.value;
        let base =
          'px-4 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer';
        if (selected && opt.value === 'Oui')
          base += ' bg-emerald-500 text-white border-emerald-500 shadow-sm';
        else if (selected && opt.value === 'Non')
          base += ' bg-red-500 text-white border-red-500 shadow-sm';
        else if (selected && opt.value === 'NR')
          base += ' bg-slate-200 text-slate-600 border-slate-300 shadow-sm';
        else
          base +=
            ' bg-white text-slate-400 border-slate-200 hover:border-slate-300 hover:text-slate-600';
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={base}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function JustificationArea({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mt-4">
      <label className="block text-xs font-medium text-slate-500 mb-1.5">
        Justification :
      </label>
      <VoiceTextarea
        rows={4}
        className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors resize-y pr-10"
        placeholder="Justifier la reponse..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function ArticleBadge({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Scale size={14} className="text-blue-500 flex-shrink-0" />
      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
        {text}
      </span>
    </div>
  );
}

const ALINEA1_OPTIONS: LegalRadioOption[] = [
  { value: 'Oui', label: 'Oui (irresponsabilite penale totale)' },
  { value: 'Non', label: 'Non' },
  { value: 'NR', label: 'NR' },
];

const ALINEA2_OPTIONS: LegalRadioOption[] = [
  { value: 'Oui', label: 'Oui (responsabilite penale attenuee)' },
  { value: 'Non', label: 'Non' },
  { value: 'NR', label: 'NR' },
];

const ACCESSIBILITE_OPTIONS: LegalRadioOption[] = [
  { value: 'Oui', label: 'Oui' },
  { value: 'Non', label: 'Non' },
  { value: 'NR', label: 'NR' },
];

export default function EvaluationMedicoLegale({ data, onChange, commentaires, onCommentairesChange }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">
          VII. Evaluation medico-legale
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Appreciation de la responsabilite penale et de l'accessibilite a une
          sanction.
        </p>
      </div>

      <div className="space-y-5">
        <div>
        <SectionCard title="A. Article 122-1 alinea 1 du Code penal — Abolition du discernement">
          <div className="py-3">
            <ArticleBadge text="Art. 122-1 al. 1 CP" />
            <p className="text-sm text-slate-700 leading-relaxed">
              Au moment des faits, le sujet presentait-il un trouble psychique
              ou neuropsychique ayant{' '}
              <span className="font-semibold text-slate-900">aboli</span> son
              discernement ou le controle de ses actes ?
            </p>
            <LegalRadioGroup
              options={ALINEA1_OPTIONS}
              value={data.alinea1.aboli}
              onChange={(v) =>
                onChange({
                  ...data,
                  alinea1: { ...data.alinea1, aboli: v },
                })
              }
            />
            <JustificationArea
              value={data.alinea1.justification}
              onChange={(v) =>
                onChange({
                  ...data,
                  alinea1: { ...data.alinea1, justification: v },
                })
              }
            />
          </div>
        </SectionCard>
        <CommentField commentKey="eval.alinea1" commentaires={commentaires} onChange={onCommentairesChange} />
        </div>

        <div>
        <SectionCard title="B. Article 122-1 alinea 2 du Code penal — Alteration du discernement">
          <div className="py-3">
            <ArticleBadge text="Art. 122-1 al. 2 CP" />
            <p className="text-sm text-slate-700 leading-relaxed">
              Au moment des faits, le sujet presentait-il un trouble psychique
              ou neuropsychique ayant{' '}
              <span className="font-semibold text-slate-900">altere</span> son
              discernement ou entrave le controle de ses actes ?
            </p>
            <LegalRadioGroup
              options={ALINEA2_OPTIONS}
              value={data.alinea2.altere}
              onChange={(v) =>
                onChange({
                  ...data,
                  alinea2: { ...data.alinea2, altere: v },
                })
              }
            />
            <JustificationArea
              value={data.alinea2.justification}
              onChange={(v) =>
                onChange({
                  ...data,
                  alinea2: { ...data.alinea2, justification: v },
                })
              }
            />
          </div>
        </SectionCard>
        <CommentField commentKey="eval.alinea2" commentaires={commentaires} onChange={onCommentairesChange} />
        </div>

        <div>
        <SectionCard title="C. Accessibilite a une sanction penale">
          <div className="py-3">
            <p className="text-sm text-slate-700 leading-relaxed">
              Le sujet est-il accessible a une sanction penale ?
            </p>
            <LegalRadioGroup
              options={ACCESSIBILITE_OPTIONS}
              value={data.accessibilite.accessible}
              onChange={(v) =>
                onChange({
                  ...data,
                  accessibilite: { ...data.accessibilite, accessible: v },
                })
              }
            />
            <JustificationArea
              value={data.accessibilite.justification}
              onChange={(v) =>
                onChange({
                  ...data,
                  accessibilite: { ...data.accessibilite, justification: v },
                })
              }
            />

            <div className="mt-6 pt-4 border-t border-slate-100 space-y-4">
              <div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  L'etat mental actuel est-il compatible avec une mesure de garde a vue ou d'incarceration ?
                </p>
                <LegalRadioGroup
                  options={ACCESSIBILITE_OPTIONS}
                  value={data.accessibilite.compatibleGardeAVue}
                  onChange={(v) =>
                    onChange({
                      ...data,
                      accessibilite: { ...data.accessibilite, compatibleGardeAVue: v },
                    })
                  }
                />
              </div>
              <div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Le sujet est-il apte a comparaitre et a se defendre utilement devant la juridiction ?
                </p>
                <LegalRadioGroup
                  options={ACCESSIBILITE_OPTIONS}
                  value={data.accessibilite.apteComparaitre}
                  onChange={(v) =>
                    onChange({
                      ...data,
                      accessibilite: { ...data.accessibilite, apteComparaitre: v },
                    })
                  }
                />
              </div>
            </div>
          </div>
        </SectionCard>
        <CommentField commentKey="eval.accessibilite" commentaires={commentaires} onChange={onCommentairesChange} />
        </div>
      </div>
    </div>
  );
}
