export interface ConclusionsData {
  syntheseClinique: string;
  reponsesQuestionsOrdonnance: string;
  observationsFinales: string;
  lieuRedaction: string;
  dateRedaction: string;
}

export const INITIAL_CONCLUSIONS: ConclusionsData = {
  syntheseClinique: '',
  reponsesQuestionsOrdonnance: '',
  observationsFinales: '',
  lieuRedaction: '',
  dateRedaction: '',
};
