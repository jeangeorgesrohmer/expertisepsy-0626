import { YesNoNR } from './anamnese';
export type { YesNoNR };

const NR: YesNoNR = 'NR';

export interface ExplicationsFaitsData {
  pathologiePsychiatrique: YesNoNR;
  troubleHumeur: YesNoNR;
  delire: YesNoNR;
  hallucinations: YesNoNR;
  intoxication: YesNoNR;
  troublePersonnalite: YesNoNR;
  troubleParaphilique: YesNoNR;
  deficienceIntellectuelle: YesNoNR;
  aucunePathologieMentale: YesNoNR;
}

export interface LienCausaliteData {
  lienDirect: YesNoNR;
  lienEssentiel: YesNoNR;
  lienIndirect: YesNoNR;
  facteurContributif: YesNoNR;
  absenceDeLien: YesNoNR;
  faitsPossiblesSansTroubles: YesNoNR;
}

export interface RelationFaitsData {
  explications: ExplicationsFaitsData;
  causalite: LienCausaliteData;
}

export const INITIAL_RELATION_FAITS: RelationFaitsData = {
  explications: {
    pathologiePsychiatrique: NR,
    troubleHumeur: NR,
    delire: NR,
    hallucinations: NR,
    intoxication: NR,
    troublePersonnalite: NR,
    troubleParaphilique: NR,
    deficienceIntellectuelle: NR,
    aucunePathologieMentale: NR,
  },
  causalite: {
    lienDirect: NR,
    lienEssentiel: NR,
    lienIndirect: NR,
    facteurContributif: NR,
    absenceDeLien: NR,
    faitsPossiblesSansTroubles: NR,
  },
};
