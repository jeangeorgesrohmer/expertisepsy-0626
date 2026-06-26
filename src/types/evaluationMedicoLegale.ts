import type { YesNoNR } from './anamnese';

export interface Article122_1_Alinea1 {
  aboli: YesNoNR;
  justification: string;
}

export interface Article122_1_Alinea2 {
  altere: YesNoNR;
  justification: string;
}

export interface AccessibiliteSanction {
  accessible: YesNoNR;
  justification: string;
  compatibleGardeAVue: YesNoNR;
  apteComparaitre: YesNoNR;
}

export interface EvaluationMedicoLegaleData {
  alinea1: Article122_1_Alinea1;
  alinea2: Article122_1_Alinea2;
  accessibilite: AccessibiliteSanction;
}

export const INITIAL_EVALUATION_MEDICO_LEGALE: EvaluationMedicoLegaleData = {
  alinea1: { aboli: 'NR', justification: '' },
  alinea2: { altere: 'NR', justification: '' },
  accessibilite: { accessible: 'NR', justification: '', compatibleGardeAVue: 'NR', apteComparaitre: 'NR' },
};
