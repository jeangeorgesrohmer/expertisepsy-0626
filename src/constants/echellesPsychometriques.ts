export interface EchellePsychometriqueDefinition {
  id: string;
  nom: string;
  symptomatologie: string;
  scoreMin: number;
  scoreMax: number;
  interpretation: (score: number) => string;
}

export const ECHELLES_PSYCHOMETRIQUES: EchellePsychometriqueDefinition[] = [
  {
    id: 'MADRS',
    nom: 'MADRS',
    symptomatologie: "l'intensité dépressive",
    scoreMin: 0,
    scoreMax: 60,
    interpretation: (s) =>
      s <= 6 ? 'une absence de dépression' :
      s <= 19 ? 'une dépression légère' :
      s <= 34 ? 'une dépression modérée' :
      'une dépression sévère',
  },
  {
    id: 'HDRS',
    nom: 'HDRS (Hamilton)',
    symptomatologie: "la sévérité de la dépression",
    scoreMin: 0,
    scoreMax: 52,
    interpretation: (s) =>
      s <= 7 ? 'une absence de dépression' :
      s <= 13 ? 'une dépression légère' :
      s <= 18 ? 'une dépression modérée' :
      s <= 22 ? 'une dépression sévère' :
      'une dépression très sévère',
  },
  {
    id: 'PANSS',
    nom: 'PANSS',
    symptomatologie: "la symptomatologie schizophrénique (syndromes positif, négatif et général)",
    scoreMin: 30,
    scoreMax: 210,
    interpretation: (s) =>
      s <= 58 ? 'une psychopathologie légère' :
      s <= 75 ? 'une psychopathologie modérée' :
      s <= 99 ? 'une psychopathologie sévère' :
      'une psychopathologie très sévère',
  },
  {
    id: 'BPRS',
    nom: 'BPRS',
    symptomatologie: "la sévérité des symptômes psychiatriques généraux",
    scoreMin: 18,
    scoreMax: 126,
    interpretation: (s) =>
      s <= 31 ? 'une symptomatologie légère' :
      s <= 41 ? 'une symptomatologie modérée' :
      'une symptomatologie sévère',
  },
  {
    id: 'YMRS',
    nom: 'YMRS',
    symptomatologie: "l'intensité maniaque",
    scoreMin: 0,
    scoreMax: 60,
    interpretation: (s) =>
      s <= 12 ? 'une absence de manie' :
      s <= 19 ? 'une hypomanie' :
      s <= 25 ? 'une manie légère à modérée' :
      'une manie sévère',
  },
  {
    id: 'GAF',
    nom: 'GAF',
    symptomatologie: "le fonctionnement global (symptômes et adaptation sociale)",
    scoreMin: 1,
    scoreMax: 100,
    interpretation: (s) =>
      s >= 71 ? 'un fonctionnement global satisfaisant' :
      s >= 51 ? 'des difficultés modérées de fonctionnement' :
      s >= 31 ? 'des difficultés sérieuses de fonctionnement' :
      'une altération majeure du fonctionnement',
  },
  {
    id: 'MoCA',
    nom: 'MoCA',
    symptomatologie: "les fonctions cognitives (dépistage des troubles neurocognitifs)",
    scoreMin: 0,
    scoreMax: 30,
    interpretation: (s) =>
      s >= 26 ? 'un fonctionnement cognitif normal' :
      s >= 18 ? 'un déficit cognitif léger' :
      s >= 10 ? 'un déficit cognitif modéré' :
      'un déficit cognitif sévère',
  },
  {
    id: 'MMSE',
    nom: 'MMSE',
    symptomatologie: "l'état cognitif global (orientation, mémoire, attention, langage)",
    scoreMin: 0,
    scoreMax: 30,
    interpretation: (s) =>
      s >= 27 ? 'un état cognitif normal' :
      s >= 21 ? 'un déficit cognitif léger' :
      s >= 10 ? 'un déficit cognitif modéré' :
      'un déficit cognitif sévère',
  },
  {
    id: 'AUDIT',
    nom: 'AUDIT',
    symptomatologie: "les conduites d'alcoolisation (consommation, dépendance, problèmes liés)",
    scoreMin: 0,
    scoreMax: 40,
    interpretation: (s) =>
      s <= 7 ? 'une consommation à faible risque' :
      s <= 12 ? 'une consommation à risque' :
      s <= 19 ? 'une dépendance alcoolique probable' :
      'une dépendance alcoolique sévère',
  },
  {
    id: 'PCL5',
    nom: 'PCL-5 (PTSD)',
    symptomatologie: "la sévérité du syndrome de stress post-traumatique (DSM-5)",
    scoreMin: 0,
    scoreMax: 80,
    interpretation: (s) =>
      s <= 32 ? 'une symptomatologie sous le seuil clinique' :
      s <= 49 ? 'un ESPT probable d\'intensité modérée' :
      'un ESPT probable d\'intensité sévère',
  },
  {
    id: 'IES-R',
    nom: 'IES-R',
    symptomatologie: "la réaction post-traumatique (intrusion, évitement, hypervigilance)",
    scoreMin: 0,
    scoreMax: 88,
    interpretation: (s) =>
      s <= 24 ? 'une réaction de stress sous le seuil clinique' :
      s <= 37 ? 'une réaction post-traumatique modérée' :
      'une réaction post-traumatique sévère',
  },
  {
    id: 'CGI',
    nom: 'CGI',
    symptomatologie: "la sévérité globale de la pathologie psychiatrique (impression clinique globale)",
    scoreMin: 1,
    scoreMax: 7,
    interpretation: (s) =>
      s === 1 ? 'un état normal, sans signe de maladie' :
      s === 2 ? 'un état limite de maladie' :
      s === 3 ? 'une maladie légère' :
      s === 4 ? 'une maladie modérée' :
      s === 5 ? 'une maladie marquée' :
      s === 6 ? 'une maladie sévère' :
      'une maladie parmi les plus sévères',
  },
  {
    id: 'Y-BOCS',
    nom: 'Y-BOCS',
    symptomatologie: "la sévérité des obsessions et compulsions",
    scoreMin: 0,
    scoreMax: 40,
    interpretation: (s) =>
      s <= 7 ? 'un TOC sous-clinique' :
      s <= 15 ? 'un TOC léger' :
      s <= 23 ? 'un TOC modéré' :
      s <= 31 ? 'un TOC sévère' :
      'un TOC extrêmement sévère',
  },
];

export function getEchelleById(id: string): EchellePsychometriqueDefinition | undefined {
  return ECHELLES_PSYCHOMETRIQUES.find((e) => e.id === id);
}
