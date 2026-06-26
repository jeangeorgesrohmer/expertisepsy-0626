export type YesNoNR = 'Oui' | 'Non' | 'NR';

export type NiveauRisque = 'Faible' | 'Modéré' | 'Élevé';

export type ScaleType = 'PCL-R' | 'HCR-20' | 'VRAG' | 'ODARA' | 'SARA' | 'SAVRY' | 'Static-99R' | 'Static-2002R' | 'SVR-20' | 'STABLE-2007' | 'START' | 'SSPI-2' | 'CPORT' | 'CASIC';

export interface EchelleActuarielle {
  id: string;
  nomEchelle: string;
  scoreTotal: string;
  niveauRisque: NiveauRisque | '';
  conclusionClinique: string;
}

export interface EchelleActuarielleComplete {
  id: string;
  scaleType: ScaleType;
  scores: Record<string, number>;
  protectiveScores?: Record<string, number>;
  strengthScores?: Record<string, number>;
  syntheseClinique: string;
}

export interface DangerositePsychiatrique {
  autrui: YesNoNR;
  soiMeme: YesNoNR;
  sexuelle: YesNoNR;
}

export interface RisqueRecidive {
  eleve: YesNoNR;
  moyen: YesNoNR;
  faible: YesNoNR;
}

export interface FacteursRisque {
  absenceCritique: YesNoNR;
  minimisationFaits: YesNoNR;
  troublePersonnalite: YesNoNR;
  troubleParaphilique: YesNoNR;
  addiction: YesNoNR;
  isolementSocial: YesNoNR;
  absenceSuivi: YesNoNR;
}

export interface FacteursProtection {
  conscienceTrouble: YesNoNR;
  demandeSoins: YesNoNR;
  soutienFamilial: YesNoNR;
  insertionSocioPro: YesNoNR;
}

export interface NecessiteSoins {
  urgence: YesNoNR;
  courtTerme: YesNoNR;
  ambulatoire: YesNoNR;
  hospitalisation: YesNoNR;
  injonctionSoins: YesNoNR;
  aucunSoin: YesNoNR;
}

export interface InjonctionSoinsDetails {
  suiviPsychiatrique: YesNoNR;
  suiviPsychologique: YesNoNR;
  suiviSexologique: YesNoNR;
  traitementMedicamenteux: YesNoNR;
  traitementAntiAndrogene: YesNoNR;
  addictologie: YesNoNR;
  tcc: YesNoNR;
  therapieGroupe: YesNoNR;
  autreTherapie: string;
}

export interface ModalitesInjonction {
  frequence: string;
  duree: string;
  structure: string;
  medecinCoordonnateur: YesNoNR;
}

export interface Pronostic {
  favorableSousTraitement: YesNoNR;
  reserve: YesNoNR;
  defavorable: YesNoNR;
}

export interface SyntheseJPS {
  sspi2: string;
  static2002r: string;
  discussionSVR20: string;
  conclusions: string;
}

export interface DangerositeData {
  evaluationActive: boolean;
  echelles: EchelleActuarielle[];
  echellesCompletes: EchelleActuarielleComplete[];
  syntheseJPS: SyntheseJPS;
  dangerositePsychiatrique: DangerositePsychiatrique;
  risqueRecidive: RisqueRecidive;
  facteursRisque: FacteursRisque;
  facteursProtection: FacteursProtection;
  necessiteSoins: NecessiteSoins;
  injonctionSoinsDetails: InjonctionSoinsDetails;
  modalitesInjonction: ModalitesInjonction;
  pronostic: Pronostic;
}

export const INITIAL_DANGEROSITE: DangerositeData = {
  evaluationActive: false,
  echelles: [],
  echellesCompletes: [],
  syntheseJPS: {
    sspi2: '',
    static2002r: '',
    discussionSVR20: '',
    conclusions: '',
  },
  dangerositePsychiatrique: {
    autrui: 'NR',
    soiMeme: 'NR',
    sexuelle: 'NR',
  },
  risqueRecidive: {
    eleve: 'NR',
    moyen: 'NR',
    faible: 'NR',
  },
  facteursRisque: {
    absenceCritique: 'NR',
    minimisationFaits: 'NR',
    troublePersonnalite: 'NR',
    troubleParaphilique: 'NR',
    addiction: 'NR',
    isolementSocial: 'NR',
    absenceSuivi: 'NR',
  },
  facteursProtection: {
    conscienceTrouble: 'NR',
    demandeSoins: 'NR',
    soutienFamilial: 'NR',
    insertionSocioPro: 'NR',
  },
  necessiteSoins: {
    urgence: 'NR',
    courtTerme: 'NR',
    ambulatoire: 'NR',
    hospitalisation: 'NR',
    injonctionSoins: 'NR',
    aucunSoin: 'NR',
  },
  injonctionSoinsDetails: {
    suiviPsychiatrique: 'NR',
    suiviPsychologique: 'NR',
    suiviSexologique: 'NR',
    traitementMedicamenteux: 'NR',
    traitementAntiAndrogene: 'NR',
    addictologie: 'NR',
    tcc: 'NR',
    therapieGroupe: 'NR',
    autreTherapie: '',
  },
  modalitesInjonction: {
    frequence: '',
    duree: '',
    structure: '',
    medecinCoordonnateur: 'NR',
  },
  pronostic: {
    favorableSousTraitement: 'NR',
    reserve: 'NR',
    defavorable: 'NR',
  },
};
