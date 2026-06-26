import { YesNoNR } from './anamnese';
export type { YesNoNR };

const NR: YesNoNR = 'NR';

export interface ComprehensionFaitsData {
  comprendNatureFaits: YesNoNR;
  comprendPorteeActes: YesNoNR;
  comprendCaractereIllegal: YesNoNR;
  rappelFaits: string;
}

export interface ReconnaissanceFaitsData {
  reconnaissanceTotale: YesNoNR;
  reconnaissancePartielle: YesNoNR;
  minimisation: YesNoNR;
  deniTotal: YesNoNR;
  negationQualification: YesNoNR;
}

export interface EtatMentalFaitsData {
  pathologiePsychiatriqueActive: YesNoNR;
  symptomesPsychotiques: YesNoNR;
  intoxicationAlcoolique: YesNoNR;
  intoxicationStupefiants: YesNoNR;
  etatConfusionnel: YesNoNR;
  etatEmotionnelParticulier: YesNoNR;
}

export interface ConscienceLuciditeData {
  conscienceClaire: YesNoNR;
  alterationConscience: YesNoNR;
}

export interface AmnesieFaitsData {
  totale: YesNoNR;
  partielle: YesNoNR;
  absente: YesNoNR;
  lacunaire: YesNoNR;
  alleguee: YesNoNR;
}

export interface PremditationData {
  signesPremeditation: YesNoNR;
  acteImpulsif: YesNoNR;
}

export interface ExamenFaitsData {
  comprehension: ComprehensionFaitsData;
  reconnaissance: ReconnaissanceFaitsData;
  etatMental: EtatMentalFaitsData;
  conscienceLucidite: ConscienceLuciditeData;
  amnesieFaits: AmnesieFaitsData;
  premeditation: PremditationData;
}

export const INITIAL_FAITS: ExamenFaitsData = {
  comprehension: {
    comprendNatureFaits: NR,
    comprendPorteeActes: NR,
    comprendCaractereIllegal: NR,
    rappelFaits: '',
  },
  reconnaissance: {
    reconnaissanceTotale: NR,
    reconnaissancePartielle: NR,
    minimisation: NR,
    deniTotal: NR,
    negationQualification: NR,
  },
  etatMental: {
    pathologiePsychiatriqueActive: NR,
    symptomesPsychotiques: NR,
    intoxicationAlcoolique: NR,
    intoxicationStupefiants: NR,
    etatConfusionnel: NR,
    etatEmotionnelParticulier: NR,
  },
  conscienceLucidite: {
    conscienceClaire: NR,
    alterationConscience: NR,
  },
  amnesieFaits: {
    totale: NR,
    partielle: NR,
    absente: NR,
    lacunaire: NR,
    alleguee: NR,
  },
  premeditation: {
    signesPremeditation: NR,
    acteImpulsif: NR,
  },
};
