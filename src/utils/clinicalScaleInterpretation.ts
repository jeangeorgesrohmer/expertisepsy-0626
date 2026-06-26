import type { ScaleType } from '../constants/echellesActuarielles';

export interface ScaleInterpretation {
  level: string;
  description: string;
  color: string;
  bg: string;
  border: string;
}

function getMADRSInterpretation(score: number): ScaleInterpretation {
  if (score <= 6) {
    return { level: 'Absence', description: 'Score suggestif d\'une absence d\'anomalie dépressive cliniquement significative.', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-500' };
  } else if (score <= 19) {
    return { level: 'Légère', description: 'Score suggestif d\'une dépression légère.', color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-500' };
  } else if (score <= 34) {
    return { level: 'Moyenne', description: 'Score suggestif d\'une dépression moyenne.', color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-500' };
  }
  return { level: 'Sévère', description: 'Score suggestif d\'une dépression sévère.', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-500' };
}

function getBPRSInterpretation(score: number): ScaleInterpretation {
  if (score <= 30) {
    return { level: 'Non significatif', description: 'Symptomatologie psychotique non significative.', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-500' };
  } else if (score <= 40) {
    return { level: 'Légère', description: 'Symptomatologie psychotique légère.', color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-500' };
  } else if (score <= 53) {
    return { level: 'Modérée', description: 'Symptomatologie psychotique modérée.', color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-500' };
  }
  return { level: 'Sévère', description: 'Symptomatologie psychotique sévère.', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-500' };
}

function getAUDITInterpretation(score: number): ScaleInterpretation {
  if (score <= 7) {
    return { level: 'Faible risque', description: 'Consommation à faible risque.', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-500' };
  } else if (score <= 15) {
    return { level: 'À risque', description: 'Consommation à risque.', color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-500' };
  } else if (score <= 19) {
    return { level: 'Nocive', description: 'Consommation nocive.', color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-500' };
  }
  return { level: 'Dépendance probable', description: 'Dépendance probable.', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-500' };
}

function getMFASTInterpretation(score: number): ScaleInterpretation {
  if (score <= 5) {
    return { level: 'Profil valide', description: 'Profil valide — absence d\'exagération significative des symptômes.', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-500' };
  }
  return { level: 'Probabilité élevée de simulation', description: 'Probabilité élevée de simulation ou d\'exagération des symptômes (score >= 6).', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-500' };
}

function getMMSEInterpretation(score: number): ScaleInterpretation {
  if (score >= 27) {
    return { level: 'Normal', description: 'Fonctions cognitives normales.', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-500' };
  } else if (score >= 24) {
    return { level: 'Suspicion de déficit léger', description: 'Suspicion de déficit cognitif léger.', color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-500' };
  } else if (score >= 10) {
    return { level: 'Déficit modéré', description: 'Déficit cognitif modéré.', color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-500' };
  }
  return { level: 'Déficit sévère', description: 'Déficit cognitif sévère.', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-500' };
}

function getPCL5Interpretation(score: number): ScaleInterpretation {
  if (score >= 33) {
    return { level: 'Probabilité élevée de TSPT', description: 'Probabilité élevée d\'un Trouble Stress Post-Traumatique (TSPT).', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-500' };
  }
  return { level: 'Sous le seuil clinique', description: 'Symptômes sous le seuil clinique du TSPT.', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-500' };
}

function getASRSInterpretation(positiveCount: number): ScaleInterpretation {
  if (positiveCount >= 4) {
    return { level: 'Hautement compatible TDAH', description: 'Symptômes hautement compatibles avec un TDAH de l\'adulte. Investigation approfondie recommandée.', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-500' };
  }
  return { level: 'Sous le seuil clinique', description: 'Symptômes TDAH sous le seuil clinique.', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-500' };
}

function getPANSSInterpretation(score: number): ScaleInterpretation {
  if (score <= 58) {
    return { level: 'Symptomatologie légère', description: 'Symptomatologie schizophrénique légère ou en rémission.', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-500' };
  } else if (score <= 75) {
    return { level: 'Symptomatologie modérée', description: 'Symptomatologie schizophrénique modérée.', color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-500' };
  } else if (score <= 95) {
    return { level: 'Symptomatologie marquée', description: 'Symptomatologie schizophrénique marquée.', color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-500' };
  }
  return { level: 'Symptomatologie sévère', description: 'Symptomatologie schizophrénique sévère.', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-500' };
}

function getDAST10Interpretation(score: number): ScaleInterpretation {
  if (score === 0) {
    return { level: 'Aucun problème', description: 'Aucun problème signalé lié à la consommation de substances.', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-500' };
  } else if (score <= 2) {
    return { level: 'Risque faible', description: 'Niveau de risque faible lié à la consommation de substances.', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-500' };
  } else if (score <= 5) {
    return { level: 'Risque modéré', description: 'Niveau de risque modéré lié à la consommation de substances.', color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-500' };
  } else if (score <= 8) {
    return { level: 'Risque élevé', description: 'Niveau de risque élevé lié à la consommation de substances.', color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-500' };
  }
  return { level: 'Risque sévère', description: 'Niveau de risque sévère — dépendance probable.', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-500' };
}

function getMoCAInterpretation(score: number): ScaleInterpretation {
  if (score >= 26) {
    return { level: 'Normal', description: 'Fonctions cognitives normales.', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-500' };
  }
  return { level: 'Suspicion de déficit cognitif', description: 'Suspicion de déficit cognitif (atteinte possible des fonctions exécutives ou mnésiques).', color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-500' };
}

function getYMRSInterpretation(score: number): ScaleInterpretation {
  if (score <= 11) {
    return { level: 'Euthymie', description: 'Absence de symptomatologie maniaque significative (Euthymie).', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-500' };
  } else if (score <= 19) {
    return { level: 'Hypomanie / État mixte', description: 'Hypomanie ou état mixte.', color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-500' };
  } else if (score <= 30) {
    return { level: 'Manie modérée', description: 'Syndrome maniaque modéré.', color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-500' };
  }
  return { level: 'Manie sévère', description: 'Syndrome maniaque sévère.', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-500' };
}

function getCAMInterpretation(score: number): ScaleInterpretation {
  if (score <= 1) {
    return { level: 'Délirium peu probable', description: 'Critères insuffisants pour retenir un syndrome confusionnel. Le diagnostic CAM requiert les critères 1 et 2, plus le critère 3 ou 4.', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-500' };
  } else if (score === 2) {
    return { level: 'Critères partiels', description: 'Présence partielle de critères — évaluation complémentaire recommandée. La confirmation diagnostique nécessite l\'association critère 1+2 ET critère 3 ou 4.', color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-500' };
  } else if (score === 3) {
    return { level: 'Délirium probable', description: 'Critères compatibles avec un syndrome confusionnel. Évaluation clinique approfondie nécessaire pour confirmer.', color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-500' };
  }
  return { level: 'Délirium confirmé', description: 'Ensemble des critères diagnostiques du syndrome confusionnel (delirium) présents selon la CAM. Prise en charge urgente recommandée.', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-500' };
}

function getMDASInterpretation(score: number): ScaleInterpretation {
  if (score < 7) {
    return { level: 'Absent ou subclinique', description: 'Score faible — syndrome confusionnel absent ou subclinique.', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-500' };
  } else if (score <= 12) {
    return { level: 'Delirium léger', description: 'Score évocateur d\'un delirium de sévérité légère (seuil diagnostic : ≥ 13).', color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-500' };
  } else if (score <= 20) {
    return { level: 'Delirium modéré', description: 'Delirium de sévérité modérée. Prise en charge pluridisciplinaire recommandée.', color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-500' };
  }
  return { level: 'Delirium sévère', description: 'Delirium sévère. Prise en charge médicale urgente requise.', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-500' };
}

const interpreters: Partial<Record<ScaleType, (score: number) => ScaleInterpretation>> = {
  MADRS: getMADRSInterpretation,
  BPRS: getBPRSInterpretation,
  AUDIT: getAUDITInterpretation,
  'M-FAST': getMFASTInterpretation,
  MMSE: getMMSEInterpretation,
  'PCL-5': getPCL5Interpretation,
  ASRS: getASRSInterpretation,
  PANSS: getPANSSInterpretation,
  'DAST-10': getDAST10Interpretation,
  MoCA: getMoCAInterpretation,
  YMRS: getYMRSInterpretation,
  CAM: getCAMInterpretation,
  MDAS: getMDASInterpretation,
};

export function getClinicalInterpretation(scaleType: ScaleType, score: number): ScaleInterpretation | null {
  const fn = interpreters[scaleType];
  return fn ? fn(score) : null;
}
