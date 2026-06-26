import type { ConclusionsData } from '../../types/conclusions';
import { SectionBlock, TextBlock } from './SectionBlock';

interface Props {
  data: ConclusionsData;
}

export default function SectionConclusions({ data }: Props) {
  const hasContent =
    data.syntheseClinique.trim() ||
    data.reponsesQuestionsOrdonnance.trim() ||
    data.observationsFinales.trim() ||
    data.lieuRedaction.trim() ||
    data.dateRedaction.trim();

  if (!hasContent) return null;

  return (
    <SectionBlock title="IX. Conclusions">
      <TextBlock label="Synthese clinique" value={data.syntheseClinique} />
      <TextBlock label="Reponses aux questions de l'ordonnance" value={data.reponsesQuestionsOrdonnance} />
      <TextBlock label="Observations finales" value={data.observationsFinales} />

      {(data.lieuRedaction.trim() || data.dateRedaction.trim()) && (
        <div className="mt-6 pt-4 border-t border-stone-200 text-right">
          <p style={{ fontSize: '0.875rem' }} className="text-stone-700 italic">
            {data.lieuRedaction.trim() && data.dateRedaction.trim()
              ? `Fait a ${data.lieuRedaction}, le ${data.dateRedaction}`
              : data.lieuRedaction.trim()
                ? `Fait a ${data.lieuRedaction}`
                : `Le ${data.dateRedaction}`}
          </p>
        </div>
      )}
    </SectionBlock>
  );
}
