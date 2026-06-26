import { YesNoNR } from './anamnese';
import { AnamneseData, INITIAL_ANAMNESE } from './anamnese';
import { ExamenPsychiatriqueData, INITIAL_EXAMEN } from './examen';
import { BiometricData, INITIAL_BIOMETRIC_DATA } from './biometricData';
import { ExamenFaitsData, INITIAL_FAITS } from './faits';
import { RelationFaitsData, INITIAL_RELATION_FAITS } from './relationFaits';
import { EvaluationMedicoLegaleData, INITIAL_EVALUATION_MEDICO_LEGALE } from './evaluationMedicoLegale';
import { DiagnosticData, INITIAL_DIAGNOSTIC } from './diagnostic';
import { DangerositeData, INITIAL_DANGEROSITE } from './dangerosite';
import { ConclusionsData, INITIAL_CONCLUSIONS } from './conclusions';
import { TdahData, INITIAL_TDAH } from './tdah';
import type { CommentsData } from './commentaires';

export type { AnamneseData, ExamenPsychiatriqueData, BiometricData, ExamenFaitsData, RelationFaitsData, EvaluationMedicoLegaleData, DiagnosticData, DangerositeData, ConclusionsData, CommentsData, TdahData };

export type DocumentMode = 'expertise' | 'clinical';

export type PromptMode = 'standard' | 'with_summary';

export type SectionId =
  | 'identification'
  | 'anamnese'
  | 'examen_psychiatrique'
  | 'biometric_data'
  | 'examen_faits'
  | 'relation_faits'
  | 'diagnostic'
  | 'evaluation'
  | 'dangerosite'
  | 'echelles_psychometriques'
  | 'conclusions'
  | 'propositions_soins';

export type { EchelleActuarielleComplete } from './dangerosite';
export type EchellesPsychometriquesData = import('./dangerosite').EchelleActuarielleComplete[];

export const INITIAL_ECHELLES_PSYCHOMETRIQUES: EchellesPsychometriquesData = [];

export interface SectionItem {
  id: SectionId;
  label: string;
  number: string;
}

export interface IdentCarteAData {
  authorName: string;
  titresExpert: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  age: string;
  lieuExamen: string;
  dateExamen: string;
  dureeExamen: string;
  requerant: string;
}

export interface IdentCarteBData {
  expertisePenale: YesNoNR;
  identiteMagistratDemandeur: string;
  expertiseCivile: YesNoNR;
  examenSurRequisition: YesNoNR;
  identiteOPJ: string;
  examenSurCommissionRogatoire: YesNoNR;
}

export interface IdentCarteCData {
  misEnCause: YesNoNR;
  victime: YesNoNR;
  temoin: YesNoNR;
}

export interface IdentCarteDData {
  rappelDesFaits: string;
  questionsMission: string;
}

export interface IdentCarteEData {
  pvAudition: YesNoNR;
  dossierMedical: YesNoNR;
  certificatsMedicaux: YesNoNR;
  rapportsExpertiseAnterieurs: YesNoNR;
  autresPreciser: string;
}

export interface ClinicalContextData {
  medecinAdresseur: string;
  motifConsultation: string;
}

export interface PropositionsSoinsData {
  propositionsTherapeutiques: string;
  orientationSoins: string;
  demarchesMedicoSociales: string;
}

export interface IdentificationData {
  carteA: IdentCarteAData;
  carteB: IdentCarteBData;
  carteC: IdentCarteCData;
  carteD: IdentCarteDData;
  carteE: IdentCarteEData;
  clinicalContext: ClinicalContextData;
}

export interface FormData {
  documentMode: DocumentMode;
  promptMode: PromptMode;
  identification: IdentificationData;
  anamnese: AnamneseData;
  examen_psychiatrique: ExamenPsychiatriqueData;
  biometric_data: BiometricData;
  examen_faits: ExamenFaitsData;
  relation_faits: RelationFaitsData;
  diagnostic: DiagnosticData;
  evaluation: EvaluationMedicoLegaleData;
  dangerosite: DangerositeData;
  echelles_psychometriques: EchellesPsychometriquesData;
  tdah: TdahData;
  conclusions: ConclusionsData;
  propositions_soins: PropositionsSoinsData;
  commentaires: CommentsData;
}

export const SECTIONS: SectionItem[] = [
  { id: 'identification', number: 'I', label: 'Identification' },
  { id: 'anamnese', number: 'II', label: 'Anamnèse biographique' },
  { id: 'examen_psychiatrique', number: 'III', label: 'Examen psychiatrique' },
  { id: 'biometric_data', number: 'III bis', label: 'Constantes et données biométriques' },
  { id: 'examen_faits', number: 'IV', label: "Examen au moment des faits" },
  { id: 'relation_faits', number: 'V', label: 'Relation faits / état mental' },
  { id: 'diagnostic', number: 'VI', label: 'Diagnostic' },
  { id: 'evaluation', number: 'VII', label: 'Évaluation médico-légale' },
  { id: 'dangerosite', number: 'VIII', label: 'Dangerosité' },
  { id: 'echelles_psychometriques', number: 'VIII bis', label: 'Échelles psychométriques & TDAH' },
  { id: 'conclusions', number: 'IX', label: 'Conclusions' },
];

export const INITIAL_IDENTIFICATION: IdentificationData = {
  carteA: {
    authorName: 'Docteur Jean-Georges Rohmer',
    titresExpert: 'Psychiatre au CRAVS Alsace',
    nom: '',
    prenom: '',
    dateNaissance: '',
    age: '',
    lieuExamen: '',
    dateExamen: '',
    dureeExamen: '',
    requerant: '',
  },
  carteB: {
    expertisePenale: 'NR',
    identiteMagistratDemandeur: '',
    expertiseCivile: 'NR',
    examenSurRequisition: 'NR',
    identiteOPJ: '',
    examenSurCommissionRogatoire: 'NR',
  },
  carteC: {
    misEnCause: 'NR',
    victime: 'NR',
    temoin: 'NR',
  },
  carteD: {
    rappelDesFaits: '',
    questionsMission: '',
  },
  carteE: {
    pvAudition: 'NR',
    dossierMedical: 'NR',
    certificatsMedicaux: 'NR',
    rapportsExpertiseAnterieurs: 'NR',
    autresPreciser: '',
  },
  clinicalContext: {
    medecinAdresseur: '',
    motifConsultation: '',
  },
};

export const INITIAL_PROPOSITIONS_SOINS: PropositionsSoinsData = {
  propositionsTherapeutiques: '',
  orientationSoins: '',
  demarchesMedicoSociales: '',
};

export const INITIAL_FORM_DATA: FormData = {
  documentMode: 'expertise',
  promptMode: 'standard',
  identification: INITIAL_IDENTIFICATION,
  anamnese: INITIAL_ANAMNESE,
  examen_psychiatrique: INITIAL_EXAMEN,
  biometric_data: INITIAL_BIOMETRIC_DATA,
  examen_faits: INITIAL_FAITS,
  relation_faits: INITIAL_RELATION_FAITS,
  diagnostic: INITIAL_DIAGNOSTIC,
  evaluation: INITIAL_EVALUATION_MEDICO_LEGALE,
  dangerosite: INITIAL_DANGEROSITE,
  echelles_psychometriques: INITIAL_ECHELLES_PSYCHOMETRIQUES,
  tdah: INITIAL_TDAH,
  conclusions: INITIAL_CONCLUSIONS,
  propositions_soins: INITIAL_PROPOSITIONS_SOINS,
  commentaires: {},
};
