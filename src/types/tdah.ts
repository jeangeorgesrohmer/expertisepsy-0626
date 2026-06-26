// ──────────────────────────────────────────────────────
// DIVA-5 — Entretien clinique structuré pour TDAH adulte
// ──────────────────────────────────────────────────────

export interface Diva5CriterionData {
  childhood: boolean;
  adult: boolean;
  notes: string;
}

export interface Diva5Data {
  // Partie A — Inattention (9 critères DSM-5)
  inattention: Diva5CriterionData[];
  // Partie B — Hyperactivité/Impulsivité (9 critères DSM-5)
  hyperactivite: Diva5CriterionData[];
  // Partie C — Retentissement et critères d'exclusion
  ageDebutSymptomes: string;
  retentissementProfessionnel: boolean;
  retentissementSocial: boolean;
  retentissementFamilial: boolean;
  retentissementScolaire: boolean;
  autreRetentissement: string;
  exclusionSchizophrenie: boolean;
  exclusionTroubleHumeur: boolean;
  exclusionTroubleAnxieux: boolean;
  exclusionAutre: string;
  notesPartieC: string;
  synthese: string;
}

const makeCriterion = (): Diva5CriterionData => ({ childhood: false, adult: false, notes: '' });

export const INITIAL_DIVA5: Diva5Data = {
  inattention: Array.from({ length: 9 }, makeCriterion),
  hyperactivite: Array.from({ length: 9 }, makeCriterion),
  ageDebutSymptomes: '',
  retentissementProfessionnel: false,
  retentissementSocial: false,
  retentissementFamilial: false,
  retentissementScolaire: false,
  autreRetentissement: '',
  exclusionSchizophrenie: false,
  exclusionTroubleHumeur: false,
  exclusionTroubleAnxieux: false,
  exclusionAutre: '',
  notesPartieC: '',
  synthese: '',
};

// ──────────────────────────────────────────────────────
// WFIRS — Weiss Functional Impairment Rating Scale
// ──────────────────────────────────────────────────────

export type WfirsScore = 0 | 1 | 2 | 3 | null; // null = N/A

export interface WfirsItem {
  score: WfirsScore;
}

export interface WfirsDomain {
  items: WfirsItem[];
}

export interface WfirsData {
  famille: WfirsDomain;
  travail: WfirsDomain;
  vieQuotidienne: WfirsDomain;
  vieSociale: WfirsDomain;
  estime: WfirsDomain;
  risques: WfirsDomain;
  synthese: string;
}

const makeItems = (n: number): WfirsItem[] =>
  Array.from({ length: n }, () => ({ score: null }));

export const INITIAL_WFIRS: WfirsData = {
  famille: { items: makeItems(9) },
  travail: { items: makeItems(8) },
  vieQuotidienne: { items: makeItems(10) },
  vieSociale: { items: makeItems(8) },
  estime: { items: makeItems(6) },
  risques: { items: makeItems(7) },
  synthese: '',
};

// Combined module data
export interface TdahData {
  diva5: Diva5Data;
  wfirs: WfirsData;
}

export const INITIAL_TDAH: TdahData = {
  diva5: INITIAL_DIVA5,
  wfirs: INITIAL_WFIRS,
};
