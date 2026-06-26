export type ScaleType = 'PCL-R' | 'HCR-20' | 'VRAG' | 'ODARA' | 'SARA' | 'SAVRY' | 'Static-99R' | 'SVR-20' | 'STABLE-2007' | 'START' | 'SSPI-2' | 'Static-2002R' | 'MADRS' | 'BPRS' | 'AUDIT' | 'M-FAST' | 'MMSE' | 'PCL-5' | 'ASRS' | 'PANSS' | 'DAST-10' | 'MoCA' | 'YMRS' | 'CPORT' | 'CASIC' | 'CAM' | 'MDAS';

export interface ScaleItem {
  id: string;
  label: string;
  options: ScaleOption[];
  positiveThreshold?: number;
  maxPoints?: number;
}

export interface ScaleOption {
  value: number;
  label: string;
}

export interface ItemCategory {
  label: string;
  itemIds: string[];
}

export interface ScaleDefinition {
  name: ScaleType;
  fullName: string;
  description: string;
  items: ScaleItem[];
  protectiveItems?: ScaleItem[];
  maxScore: number;
  hasDualScoring?: boolean;
  minScore?: number;
  itemCategories?: ItemCategory[];
  scoringMode?: 'sum' | 'count-positive';
}

const PCL_R_ITEMS: ScaleItem[] = [
  { id: 'pcl1', label: '1. Loquacité et charme superficiel', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'pcl2', label: '2. Surestimation de soi', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'pcl3', label: '3. Besoin de stimulation / tendance à l\'ennui', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'pcl4', label: '4. Mensonge pathologique', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'pcl5', label: '5. Manipulation', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'pcl6', label: '6. Absence de remords ou de culpabilité', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'pcl7', label: '7. Émotions superficielles', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'pcl8', label: '8. Insensibilité et manque d\'empathie', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'pcl9', label: '9. Mode de vie parasitaire', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'pcl10', label: '10. Manque de maîtrise de soi', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'pcl11', label: '11. Comportement sexuel précoce, varié et polymorphe', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'pcl12', label: '12. Troubles du comportement précoces', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'pcl13', label: '13. Absence de buts réalistes à long terme', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'pcl14', label: '14. Impulsivité', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'pcl15', label: '15. Irresponsabilité', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'pcl16', label: '16. Incapacité à assumer la responsabilité de ses actes', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'pcl17', label: '17. Relations maritales de courte durée', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'pcl18', label: '18. Délinquance juvénile', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'pcl19', label: '19. Violation des conditions de mise en liberté conditionnelle', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'pcl20', label: '20. Versatilité criminelle', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
];

const HCR_20_ITEMS: ScaleItem[] = [
  { id: 'hcr1', label: 'H1. Violence antérieure', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'hcr2', label: 'H2. Jeune âge à la première violence', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'hcr3', label: 'H3. Instabilité des relations intimes', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'hcr4', label: 'H4. Problèmes d\'emploi', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'hcr5', label: 'H5. Abus de substances', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'hcr6', label: 'H6. Maladie mentale majeure', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'hcr7', label: 'H7. Psychopathie', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'hcr8', label: 'H8. Inadaptation précoce', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'hcr9', label: 'H9. Trouble de la personnalité', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'hcr10', label: 'H10. Échec antérieur de surveillance', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'hcr11', label: 'C1. Manque de prise de conscience', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'hcr12', label: 'C2. Attitudes négatives', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'hcr13', label: 'C3. Symptômes actifs de maladie mentale majeure', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'hcr14', label: 'C4. Impulsivité', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'hcr15', label: 'C5. Non-réponse au traitement', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'hcr16', label: 'R1. Absence de plans réalisables', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'hcr17', label: 'R2. Exposition à des déstabilisateurs', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'hcr18', label: 'R3. Manque de soutien personnel', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'hcr19', label: 'R4. Non-observance des mesures de remédiation', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'hcr20', label: 'R5. Stress', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
];

const VRAG_ITEMS: ScaleItem[] = [
  { id: 'vrag1', label: '1. Score PCL-R (échelle de 0 à 34)', options: Array.from({ length: 35 }, (_, i) => ({ value: i, label: i.toString() })) },
  { id: 'vrag2', label: '2. Évaluation de l\'adaptation à l\'école élémentaire', options: [{ value: 0, label: '0 (Bon)' }, { value: 1, label: '1 (Moyen)' }, { value: 2, label: '2 (Faible)' }] },
  { id: 'vrag3', label: '3. Âge à l\'infraction index', options: [{ value: 0, label: '< 39 ans' }, { value: 1, label: '≥ 39 ans' }] },
  { id: 'vrag4', label: '4. A vécu avec les deux parents jusqu\'à 16 ans', options: [{ value: 0, label: 'Non' }, { value: 1, label: 'Oui' }] },
  { id: 'vrag5', label: '5. Échec de libération conditionnelle antérieure', options: [{ value: 0, label: 'Non' }, { value: 1, label: 'Oui' }] },
  { id: 'vrag6', label: '6. Trouble de personnalité antisociale (DSM)', options: [{ value: 0, label: 'Non' }, { value: 1, label: 'Oui' }] },
  { id: 'vrag7', label: '7. Abus d\'alcool (avant infraction)', options: [{ value: 0, label: 'Non' }, { value: 1, label: 'Oui' }] },
  { id: 'vrag8', label: '8. État civil (infraction index)', options: [{ value: 0, label: 'Marié' }, { value: 1, label: 'Non marié' }] },
  { id: 'vrag9', label: '9. Schizophrénie (DSM)', options: [{ value: 0, label: 'Oui' }, { value: 1, label: 'Non' }] },
  { id: 'vrag10', label: '10. Nombre de condamnations antérieures pour infractions violentes', options: [{ value: 0, label: '0' }, { value: 1, label: '1-2' }, { value: 2, label: '≥ 3' }] },
  { id: 'vrag11', label: '11. Sexe de la victime (infraction index)', options: [{ value: 0, label: 'Homme' }, { value: 1, label: 'Femme' }] },
  { id: 'vrag12', label: '12. Blessure à la victime (infraction index)', options: [{ value: 0, label: 'Décès/grave' }, { value: 1, label: 'Mineure/aucune' }] },
];

const ODARA_ITEMS: ScaleItem[] = [
  { id: 'odara1', label: '1. Antécédents de violence conjugale', options: [{ value: 0, label: 'Non (0)' }, { value: 1, label: 'Oui (1)' }] },
  { id: 'odara2', label: '2. Antécédents d\'emprisonnement', options: [{ value: 0, label: 'Non (0)' }, { value: 1, label: 'Oui (1)' }] },
  { id: 'odara3', label: '3. Violence contre d\'autres personnes', options: [{ value: 0, label: 'Non (0)' }, { value: 1, label: 'Oui (1)' }] },
  { id: 'odara4', label: '4. Enfant(s) d\'une autre union (victime)', options: [{ value: 0, label: 'Non (0)' }, { value: 1, label: 'Oui (1)' }] },
  { id: 'odara5', label: '5. Menaces de mort ou d\'utilisation d\'une arme', options: [{ value: 0, label: 'Non (0)' }, { value: 1, label: 'Oui (1)' }] },
  { id: 'odara6', label: '6. Tentative d\'étranglement', options: [{ value: 0, label: 'Non (0)' }, { value: 1, label: 'Oui (1)' }] },
  { id: 'odara7', label: '7. Agression sexuelle / agression pendant la grossesse', options: [{ value: 0, label: 'Non (0)' }, { value: 1, label: 'Oui (1)' }] },
  { id: 'odara8', label: '8. Abus de drogue', options: [{ value: 0, label: 'Non (0)' }, { value: 1, label: 'Oui (1)' }] },
  { id: 'odara9', label: '9. Abus d\'alcool', options: [{ value: 0, label: 'Non (0)' }, { value: 1, label: 'Oui (1)' }] },
  { id: 'odara10', label: '10. Harcèlement ou comportement de contrôle', options: [{ value: 0, label: 'Non (0)' }, { value: 1, label: 'Oui (1)' }] },
  { id: 'odara11', label: '11. Barrières à l\'accès au soutien (victime)', options: [{ value: 0, label: 'Non (0)' }, { value: 1, label: 'Oui (1)' }] },
  { id: 'odara12', label: '12. Problèmes de santé mentale', options: [{ value: 0, label: 'Non (0)' }, { value: 1, label: 'Oui (1)' }] },
  { id: 'odara13', label: '13. Agression récente (≤ 5 ans)', options: [{ value: 0, label: 'Non (0)' }, { value: 1, label: 'Oui (1)' }] },
];

const SARA_ITEMS: ScaleItem[] = [
  { id: 'sara1', label: '1. Antécédents de violence conjugale', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'sara2', label: '2. Antécédents de violence hors du foyer', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'sara3', label: '3. Violation des ordonnances du tribunal', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'sara4', label: '4. Escalade récente de la violence', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'sara5', label: '5. Violation des conditions de la libération conditionnelle', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'sara6', label: '6. Attitudes extrêmement réductrices/minorisantes envers les femmes', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'sara7', label: '7. Problèmes relationnels récents', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'sara8', label: '8. Problèmes d\'emploi récents', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'sara9', label: '9. Victime et/ou témoin de violence familiale (enfance)', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'sara10', label: '10. Problèmes récents liés à la consommation de substances', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'sara11', label: '11. Idées suicidaires/homicidaires récentes', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'sara12', label: '12. Symptômes psychotiques et/ou maniaques récents', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'sara13', label: '13. Trouble de la personnalité avec colère, impulsivité, instabilité', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'sara14', label: '14. Antécédents de non-conformité au traitement', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'sara15', label: '15. Menaces ou tentatives de blessures graves récentes', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'sara16', label: '16. Utilisation d\'armes et/ou menaces crédibles de mort', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'sara17', label: '17. Escalade de la fréquence ou gravité de l\'agression', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'sara18', label: '18. Harcèlement excessif et/ou préoccupations jalouses', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'sara19', label: '19. Attitudes minimisantes ou dénigrantes envers la violence', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'sara20', label: '20. Intensification du conflit conjugal et/ou séparation', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
];

const SAVRY_RISK_ITEMS: ScaleItem[] = [
  { id: 'savry1', label: 'H1. Antécédents de violence', options: [{ value: 0, label: '0 (Faible)' }, { value: 1, label: '1 (Modéré)' }, { value: 2, label: '2 (Élevé)' }] },
  { id: 'savry2', label: 'H2. Antécédents de violence non violente', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'savry3', label: 'H3. Début précoce de la violence', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'savry4', label: 'H4. Échec antérieur de mesures', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'savry5', label: 'H5. Antécédents d\'automutilation ou tentatives de suicide', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'savry6', label: 'H6. Exposition à la violence familiale', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'savry7', label: 'H7. Antécédents de maltraitance/négligence infantile', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'savry8', label: 'H8. Séparation parentale', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'savry9', label: 'H9. Stress familial', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'savry10', label: 'H10. Faible rendement scolaire', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'savry11', label: 'S1. Attitudes négatives', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'savry12', label: 'S2. Recherche de risque/impulsivité', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'savry13', label: 'S3. Problèmes de gestion de la colère', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'savry14', label: 'S4. Faible niveau d\'empathie', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'savry15', label: 'S5. Déficit d\'attention/hyperactivité', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'savry16', label: 'S6. Faibles intérêts/engagement scolaire ou professionnel', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'savry17', label: 'C1. Rejet par les pairs', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'savry18', label: 'C2. Stress ou mauvaise adaptation à l\'école ou au travail', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'savry19', label: 'C3. Manque de soutien personnel', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'savry20', label: 'C4. Voisinage communautaire désorganisé', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'savry21', label: 'I1. Utilisation de substances', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'savry22', label: 'I2. Colère / Faible contrôle affectif', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'savry23', label: 'I3. Traumatisme / Exposition à la violence', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'savry24', label: 'I4. Affiliation à des pairs délinquants', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
];

const SAVRY_PROTECTIVE_ITEMS: ScaleItem[] = [
  { id: 'savryP1', label: 'P1. Engagement prosocial', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'savryP2', label: 'P2. Soutien social fort', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'savryP3', label: 'P3. Forte attachement et liens', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'savryP4', label: 'P4. Attitude positive envers l\'intervention', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'savryP5', label: 'P5. Forte engagement scolaire ou professionnel', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'savryP6', label: 'P6. Personnalité résiliente', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
];

const STATIC_99R_ITEMS: ScaleItem[] = [
  { id: 'static1', label: '1. Âge à la libération', options: [{ value: 1, label: '18-34 ans (1)' }, { value: 0, label: '35-39 ans (0)' }, { value: -1, label: '40-59 ans (-1)' }, { value: -3, label: '60+ ans (-3)' }] },
  { id: 'static2', label: '2. Vie maritale (2 ans ou +)', options: [{ value: 0, label: 'Oui (0)' }, { value: 1, label: 'Non (1)' }] },
  { id: 'static3', label: '3. Condamnations antérieures pour infractions sexuelles', options: [{ value: 0, label: '0 (0)' }, { value: 1, label: '1-2 (1)' }, { value: 2, label: '3-5 (2)' }, { value: 3, label: '6+ (3)' }] },
  { id: 'static4', label: '4. Condamnations antérieures pour infractions avec violence non sexuelle', options: [{ value: 0, label: 'Non (0)' }, { value: 1, label: 'Oui (1)' }] },
  { id: 'static5', label: '5. Condamnations antérieures non violentes', options: [{ value: 0, label: '0-1 (0)' }, { value: 1, label: '2+ (1)' }] },
  { id: 'static6', label: '6. Infractions sexuelles antérieures', options: [{ value: 0, label: '0 (0)' }, { value: 1, label: '1-2 (1)' }, { value: 2, label: '3-5 (2)' }, { value: 3, label: '6+ (3)' }] },
  { id: 'static7', label: '7. Victimes non apparentées', options: [{ value: 0, label: 'Non (0)' }, { value: 1, label: 'Oui (1)' }] },
  { id: 'static8', label: '8. Victimes inconnues', options: [{ value: 0, label: 'Non (0)' }, { value: 1, label: 'Oui (1)' }] },
  { id: 'static9', label: '9. Victimes masculines', options: [{ value: 0, label: 'Non (0)' }, { value: 1, label: 'Oui (1)' }] },
  { id: 'static10', label: '10. Jeunesse de la victime (victime < 12 ans)', options: [{ value: 0, label: 'Non (0)' }, { value: 1, label: 'Oui (1)' }] },
];

const OUI_NON_01 = [{ value: 0, label: 'Non (0)' }, { value: 1, label: 'Oui (1)' }];

const SSPI_2_ITEMS: ScaleItem[] = [
  { id: 'sspi1', label: '1. Au moins une victime de sexe masculin', options: OUI_NON_01 },
  { id: 'sspi2', label: '2. Plus d\'une victime enfant', options: OUI_NON_01 },
  { id: 'sspi3', label: '3. Au moins une victime âgée de moins de 12 ans', options: OUI_NON_01 },
  { id: 'sspi4', label: '4. Au moins une victime enfant non apparentée (extrafamiliale)', options: OUI_NON_01 },
  { id: 'sspi5', label: '5. Consommation de matériel pédopornographique (images d\'abus sexuels d\'enfants)', options: OUI_NON_01 },
];

const STATIC_2002R_ITEMS: ScaleItem[] = [
  { id: 'st2002_1', label: '1. Âge à la libération', options: [{ value: 2, label: '18-24 ans (2)' }, { value: 1, label: '25-34 ans (1)' }, { value: 0, label: '35-49 ans (0)' }, { value: -2, label: '50+ ans (-2)' }] },
  { id: 'st2002_2', label: '2. Occasions de condamnation antérieures pour infractions sexuelles', options: [{ value: 0, label: 'Aucune (0)' }, { value: 1, label: '1 (1)' }, { value: 2, label: '2-3 (2)' }, { value: 3, label: '4+ (3)' }] },
  { id: 'st2002_3', label: '3. Arrestation juvénile pour infraction sexuelle ET condamnation adulte pour une infraction sexuelle distincte', options: OUI_NON_01 },
  { id: 'st2002_4', label: '4. Taux élevé d\'infractions sexuelles (rythme de commission)', options: OUI_NON_01 },
  { id: 'st2002_5', label: '5. Condamnation pour infraction sexuelle sans contact', options: OUI_NON_01 },
  { id: 'st2002_6', label: '6. Au moins une victime de sexe masculin', options: OUI_NON_01 },
  { id: 'st2002_7', label: '7. Deux victimes ou plus de moins de 12 ans, dont au moins une non apparentée', options: OUI_NON_01 },
  { id: 'st2002_8', label: '8. Au moins une victime non apparentée', options: OUI_NON_01 },
  { id: 'st2002_9', label: '9. Au moins une victime inconnue (étrangère)', options: OUI_NON_01 },
  { id: 'st2002_10', label: '10. Toute implication antérieure avec le système de justice pénale', options: OUI_NON_01 },
  { id: 'st2002_11', label: '11. Occasions de condamnation antérieures (toutes infractions confondues)', options: [{ value: 0, label: 'Moins de 3 (0)' }, { value: 1, label: '3-13 (1)' }, { value: 2, label: '14+ (2)' }] },
  { id: 'st2002_12', label: '12. Rupture de surveillance communautaire (violation de contrôle judiciaire, probation...)', options: OUI_NON_01 },
  { id: 'st2002_13', label: '13. Moins de 36 mois en liberté sans infraction avant l\'infraction sexuelle index', options: OUI_NON_01 },
  { id: 'st2002_14', label: '14. Toute condamnation antérieure pour violence non sexuelle', options: OUI_NON_01 },
];

const STATIC_2002R_CATEGORIES: ItemCategory[] = [
  { label: 'Âge', itemIds: ['st2002_1'] },
  { label: 'Persistance des infractions sexuelles', itemIds: ['st2002_2', 'st2002_3', 'st2002_4'] },
  { label: 'Intérêts sexuels déviants', itemIds: ['st2002_5', 'st2002_6', 'st2002_7'] },
  { label: 'Relation aux victimes', itemIds: ['st2002_8', 'st2002_9'] },
  { label: 'Criminalité générale', itemIds: ['st2002_10', 'st2002_11', 'st2002_12', 'st2002_13', 'st2002_14'] },
];

export interface Static2002RSubscores {
  age: number;
  persistenceRaw: number;
  persistence: number;
  deviant: number;
  relationship: number;
  generalRaw: number;
  general: number;
  total: number;
}

// Recodage des sous-échelles conformément aux règles de cotation Static-2002 :
// Persistance (brut 0-5) -> 0=0, 1=1, 2-3=2, 4-5=3 ; Criminalité générale (brut 0-6) -> 0=0, 1-2=1, 3-4=2, 5-6=3.
export function computeStatic2002RScore(scores: Record<string, number>): Static2002RSubscores {
  const v = (id: string) => scores[id] || 0;
  const age = v('st2002_1');
  const persistenceRaw = v('st2002_2') + v('st2002_3') + v('st2002_4');
  const persistence = persistenceRaw === 0 ? 0 : persistenceRaw === 1 ? 1 : persistenceRaw <= 3 ? 2 : 3;
  const deviant = v('st2002_5') + v('st2002_6') + v('st2002_7');
  const relationship = v('st2002_8') + v('st2002_9');
  const generalRaw = v('st2002_10') + v('st2002_11') + v('st2002_12') + v('st2002_13') + v('st2002_14');
  const general = generalRaw === 0 ? 0 : generalRaw <= 2 ? 1 : generalRaw <= 4 ? 2 : 3;
  return { age, persistenceRaw, persistence, deviant, relationship, generalRaw, general, total: age + persistence + deviant + relationship + general };
}

const STABLE_2007_ITEMS: ScaleItem[] = [
  { id: 'stable1', label: '1. Déficits significatifs dans les relations intimes', options: [{ value: 0, label: '0 (Absent)' }, { value: 1, label: '1 (Partiel)' }, { value: 2, label: '2 (Présent)' }] },
  { id: 'stable2', label: '2. Préoccupations sexuelles émotionnelles identifiées', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'stable3', label: '3. Hostilité envers les femmes', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'stable4', label: '4. Attitude générale de tolérance envers les comportements sexuels déviants', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'stable5', label: '5. Manque de souci pour autrui', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'stable6', label: '6. Manque de résolution de problèmes', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'stable7', label: '7. Impulsivité', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'stable8', label: '8. Faible autorégulation comportementale', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'stable9', label: '9. Orientation sexuelle déviante', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'stable10', label: '10. Coopération avec la supervision', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'stable11', label: '11. Toxicomanie', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'stable12', label: '12. Influences sociales négatives', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'stable13', label: '13. Stabilité générale (emploi/logement)', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
];

const SVR_20_ITEMS: ScaleItem[] = [
  { id: 'svr1', label: '1. Déviation sexuelle', options: [{ value: 0, label: '0 (Absent)' }, { value: 1, label: '1 (Partiel)' }, { value: 2, label: '2 (Présent)' }] },
  { id: 'svr2', label: '2. Préoccupations sexuelles permanentes', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'svr3', label: '3. Attitudes qui soutiennent ou tolèrent les délits sexuels', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'svr4', label: '4. Personnalité psychopathique', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'svr5', label: '5. Troubles mentaux majeurs', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'svr6', label: '6. Abus de substances', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'svr7', label: '7. Idées suicidaires/homicidaires', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'svr8', label: '8. Problèmes relationnels', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'svr9', label: '9. Problèmes d\'emploi', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'svr10', label: '10. Antécédents de violence non sexuelle', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'svr11', label: '11. Antécédents de délits sexuels non violents', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'svr12', label: '12. Antécédents de délits sexuels violents', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'svr13', label: '13. Âge au moment du premier délit sexuel', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'svr14', label: '14. Haute fréquence des délits sexuels', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'svr15', label: '15. Victimes multiples', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'svr16', label: '16. Diversité des victimes', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'svr17', label: '17. Escalade physique dans les délits sexuels', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'svr18', label: '18. Minimisation extrême ou déni des délits sexuels', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'svr19', label: '19. Absence de plans réalistes', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'svr20', label: '20. Attitude négative envers l\'intervention', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
];

const START_ITEMS: ScaleItem[] = [
  { id: 'start1', label: '1. Relations sociales', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'start2', label: '2. Activités professionnelles', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'start3', label: '3. Activités récréatives', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'start4', label: '4. Résidences', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'start5', label: '5. Consommation de substances', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'start6', label: '6. Attitudes', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'start7', label: '7. État mental', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'start8', label: '8. Symptômes émotionnels', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'start9', label: '9. Impulsivité', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'start10', label: '10. Traumatisme', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'start11', label: '11. Ressources externes', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'start12', label: '12. Prévention de la violence', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'start13', label: '13. Conduite générale', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'start14', label: '14. Autorégulation', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'start15', label: '15. Adhésion au traitement', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'start16', label: '16. Planification du traitement', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'start17', label: '17. Réactivité', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'start18', label: '18. Matériel', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'start19', label: '19. Gestion', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
  { id: 'start20', label: '20. Règles institutionnelles', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }] },
];

export const SCALES: Record<ScaleType, ScaleDefinition> = {
  'PCL-R': {
    name: 'PCL-R',
    fullName: 'Psychopathy Checklist-Revised (PCL-R)',
    description: 'Évaluation des traits de personnalité psychopathique (20 items cotés 0-1-2)',
    items: PCL_R_ITEMS,
    maxScore: 40,
  },
  'HCR-20': {
    name: 'HCR-20',
    fullName: 'Historical-Clinical-Risk Management-20',
    description: 'Évaluation structurée du risque de violence (20 items cotés 0-1-2)',
    items: HCR_20_ITEMS,
    maxScore: 40,
  },
  'VRAG': {
    name: 'VRAG',
    fullName: 'Violence Risk Appraisal Guide',
    description: 'Guide d\'évaluation du risque de violence (12 items pondérés)',
    items: VRAG_ITEMS,
    maxScore: 100,
  },
  'ODARA': {
    name: 'ODARA',
    fullName: 'Ontario Domestic Assault Risk Assessment',
    description: 'Évaluation du risque de violence conjugale (13 items cotés 0-1)',
    items: ODARA_ITEMS,
    maxScore: 13,
  },
  'SARA': {
    name: 'SARA',
    fullName: 'Spousal Assault Risk Assessment',
    description: 'Évaluation structurée du risque d\'agression conjugale (20 items cotés 0-1-2)',
    items: SARA_ITEMS,
    maxScore: 40,
  },
  'SAVRY': {
    name: 'SAVRY',
    fullName: 'Structured Assessment of Violence Risk in Youth',
    description: 'Évaluation du risque de violence chez les jeunes (24 items de risque + 6 facteurs de protection)',
    items: SAVRY_RISK_ITEMS,
    protectiveItems: SAVRY_PROTECTIVE_ITEMS,
    maxScore: 48,
  },
  'Static-99R': {
    name: 'Static-99R',
    fullName: 'Static-99R (Revised)',
    description: 'Évaluation actuarielle du risque de récidive sexuelle (10 items historiques)',
    items: STATIC_99R_ITEMS,
    maxScore: 12,
    minScore: -3,
  },
  'STABLE-2007': {
    name: 'STABLE-2007',
    fullName: 'STABLE-2007',
    description: 'Évaluation actuarielle dynamique du risque de récidive sexuelle (13 facteurs dynamiques cotés 0-2)',
    items: STABLE_2007_ITEMS,
    maxScore: 26,
  },
  'SVR-20': {
    name: 'SVR-20',
    fullName: 'Sexual Violence Risk-20',
    description: 'Évaluation clinico-actuarielle du risque de violence sexuelle (20 items avec jugement clinique structuré)',
    items: SVR_20_ITEMS,
    maxScore: 40,
  },
  'START': {
    name: 'START',
    fullName: 'Short-Term Assessment of Risk and Treatability',
    description: 'Évaluation du risque à court terme et de la traitabilité (20 items avec double cotation Vulnérabilité/Force)',
    items: START_ITEMS,
    maxScore: 40,
    hasDualScoring: true,
  },
  'SSPI-2': {
    name: 'SSPI-2',
    fullName: 'Screening Scale for Pedophilic Interests-2 (SSPI-2)',
    description: 'Dépistage des intérêts sexuels pédophiliques à partir des caractéristiques des victimes (5 items binaires, score /5)',
    items: SSPI_2_ITEMS,
    maxScore: 5,
  },
  'Static-2002R': {
    name: 'Static-2002R',
    fullName: 'Static-2002R',
    description: 'Évaluation actuarielle du risque de récidive sexuelle — 14 items en 5 domaines avec recodage par sous-échelles (score total de -2 à 13)',
    items: STATIC_2002R_ITEMS,
    maxScore: 13,
    minScore: -2,
    itemCategories: STATIC_2002R_CATEGORIES,
  },
};

const MADRS_OPTIONS = [0, 1, 2, 3, 4, 5, 6].map((v) => ({ value: v, label: String(v) }));

const MADRS_ITEMS: ScaleItem[] = [
  { id: 'madrs1', label: '1. Tristesse apparente', options: MADRS_OPTIONS },
  { id: 'madrs2', label: '2. Tristesse exprimée', options: MADRS_OPTIONS },
  { id: 'madrs3', label: '3. Tension intérieure', options: MADRS_OPTIONS },
  { id: 'madrs4', label: '4. Réduction du sommeil', options: MADRS_OPTIONS },
  { id: 'madrs5', label: '5. Réduction de l\'appétit', options: MADRS_OPTIONS },
  { id: 'madrs6', label: '6. Difficultés de concentration', options: MADRS_OPTIONS },
  { id: 'madrs7', label: '7. Lassitude', options: MADRS_OPTIONS },
  { id: 'madrs8', label: '8. Incapacité à ressentir', options: MADRS_OPTIONS },
  { id: 'madrs9', label: '9. Pensées pessimistes', options: MADRS_OPTIONS },
  { id: 'madrs10', label: '10. Idées suicidaires', options: MADRS_OPTIONS },
];

const BPRS_OPTIONS = [1, 2, 3, 4, 5, 6, 7].map((v) => ({ value: v, label: String(v) }));

const BPRS_ITEMS: ScaleItem[] = [
  { id: 'bprs1', label: '1. Préoccupation somatique', options: BPRS_OPTIONS },
  { id: 'bprs2', label: '2. Anxiété', options: BPRS_OPTIONS },
  { id: 'bprs3', label: '3. Retrait affectif', options: BPRS_OPTIONS },
  { id: 'bprs4', label: '4. Désorganisation conceptuelle', options: BPRS_OPTIONS },
  { id: 'bprs5', label: '5. Culpabilité', options: BPRS_OPTIONS },
  { id: 'bprs6', label: '6. Tension', options: BPRS_OPTIONS },
  { id: 'bprs7', label: '7. Manières et Postures', options: BPRS_OPTIONS },
  { id: 'bprs8', label: '8. Mégalomanie', options: BPRS_OPTIONS },
  { id: 'bprs9', label: '9. Humeur dépressive', options: BPRS_OPTIONS },
  { id: 'bprs10', label: '10. Hostilité', options: BPRS_OPTIONS },
  { id: 'bprs11', label: '11. Méfiance', options: BPRS_OPTIONS },
  { id: 'bprs12', label: '12. Comportement hallucinatoire', options: BPRS_OPTIONS },
  { id: 'bprs13', label: '13. Ralentissement moteur', options: BPRS_OPTIONS },
  { id: 'bprs14', label: '14. Non-coopération', options: BPRS_OPTIONS },
  { id: 'bprs15', label: '15. Pensées bizarres', options: BPRS_OPTIONS },
  { id: 'bprs16', label: '16. Émoussement affectif', options: BPRS_OPTIONS },
  { id: 'bprs17', label: '17. Excitation', options: BPRS_OPTIONS },
  { id: 'bprs18', label: '18. Désorientation', options: BPRS_OPTIONS },
];

(SCALES as Record<string, ScaleDefinition>)['MADRS'] = {
  name: 'MADRS',
  fullName: 'Montgomery-Åsberg Depression Rating Scale (MADRS)',
  description: 'Évaluation de l\'intensité dépressive — 10 items cotés de 0 à 6 (score total /60)',
  items: MADRS_ITEMS,
  maxScore: 60,
};

(SCALES as Record<string, ScaleDefinition>)['BPRS'] = {
  name: 'BPRS',
  fullName: 'Brief Psychiatric Rating Scale (BPRS)',
  description: 'Évaluation de la symptomatologie psychotique — 18 items cotés de 1 à 7 (score total /126)',
  items: BPRS_ITEMS,
  maxScore: 126,
  minScore: 18,
};

const AUDIT_OPTIONS_0_4 = [0, 1, 2, 3, 4].map((v) => ({ value: v, label: String(v) }));
const AUDIT_OPTIONS_0_2_4 = [
  { value: 0, label: '0' },
  { value: 2, label: '2' },
  { value: 4, label: '4' },
];

const AUDIT_ITEMS: ScaleItem[] = [
  { id: 'audit1', label: '1. Fréquence de consommation d\'alcool', options: AUDIT_OPTIONS_0_4 },
  { id: 'audit2', label: '2. Nombre de verres un jour de consommation typique', options: AUDIT_OPTIONS_0_4 },
  { id: 'audit3', label: '3. Fréquence de consommation de 6 verres ou plus', options: AUDIT_OPTIONS_0_4 },
  { id: 'audit4', label: '4. Incapacité de s\'arrêter de boire', options: AUDIT_OPTIONS_0_4 },
  { id: 'audit5', label: '5. Incapacité de remplir ses obligations', options: AUDIT_OPTIONS_0_4 },
  { id: 'audit6', label: '6. Besoin d\'un premier verre le matin', options: AUDIT_OPTIONS_0_4 },
  { id: 'audit7', label: '7. Culpabilité après avoir bu', options: AUDIT_OPTIONS_0_4 },
  { id: 'audit8', label: '8. Incapacité de se rappeler la veille', options: AUDIT_OPTIONS_0_4 },
  { id: 'audit9', label: '9. Blessures liées à la consommation', options: AUDIT_OPTIONS_0_2_4 },
  { id: 'audit10', label: '10. Inquiétude de l\'entourage', options: AUDIT_OPTIONS_0_2_4 },
];

const MFAST_OPTIONS = [
  { value: 0, label: 'Non' },
  { value: 1, label: 'Oui' },
];

const MFAST_LABELS = [
  'Humeur dépressive décrite de manière constante, sans aucune fluctuation diurne',
  'Déclaration d\'une incapacité totale à ressentir la moindre émotion (anesthésie affective absolue)',
  'Affirmation que les hallucinations auditives ne s\'arrêtent jamais, ne serait-ce qu\'une seconde',
  'Description de voix ordonnant systématiquement et uniquement des comportements illégaux',
  'Plaintes d\'hallucinations visuelles décrites uniquement en noir et blanc',
  'Allégation que tous les souvenirs d\'enfance ont été soudainement et intégralement effacés',
  'Co-occurrence déclarée d\'une amnésie totale et d\'une hypervigilance',
  'Déclaration de symptômes psychotiques qui n\'apparaissent que lorsque le sujet est seul',
  'Affirmation que les traitements psychotropes aggravent systématiquement les voix',
  'Rapport de délires visuels extrêmement détaillés, constants et scénarisés',
  'Description d\'une paralysie totale survenant uniquement en période de stress',
  'Plaintes de douleurs insupportables et migrantes sans aucune cause organique',
  'Discordance flagrante entre l\'intensité décrite des troubles et l\'observation clinique à l\'entretien',
  'Patient affirmant soudainement ne pas savoir comment il s\'appelle ni où il se trouve',
  'Rapport de voix s\'exprimant dans une langue totalement inconnue du patient',
  'Affirmation que l\'ensemble des symptômes a commencé instantanément après la commission des faits',
  'Déclaration d\'une incapacité totale à effectuer des tâches simples (hygiène, repas) non objectivée par le dossier',
  'Patient décrivant ses symptômes de manière stéréotypée, très théâtrale ou "livresque"',
  'Revendication d\'une "folie" évidente pour justifier spontanément ses actes',
  'Allégation de multiples personnalités qui commanditent exclusivement les actes délictueux',
  'Le patient approuve immédiatement des symptômes absurdes suggérés par l\'examinateur (suggestibilité)',
  'Le patient accepte spontanément l\'idée que ses maux physiques sont causés par des forces externes irrationnelles',
  'Affirmation de l\'existence de complots mondiaux spécifiquement et uniquement dirigés contre lui',
  'Plainte d\'hallucinations olfactives continues et isolées sans cause organique',
  'Maintien d\'un contact visuel et d\'une concentration excellents malgré la plainte d\'un chaos mental absolu',
];

const MFAST_ITEMS: ScaleItem[] = MFAST_LABELS.map((label, i) => ({
  id: `mfast${i + 1}`,
  label: `${i + 1}. ${label}`,
  options: MFAST_OPTIONS,
}));

(SCALES as Record<string, ScaleDefinition>)['AUDIT'] = {
  name: 'AUDIT',
  fullName: 'Alcohol Use Disorders Identification Test (AUDIT)',
  description: 'Dépistage des conduites d\'alcoolisation à risque — 10 items (score total /40)',
  items: AUDIT_ITEMS,
  maxScore: 40,
};

(SCALES as Record<string, ScaleDefinition>)['M-FAST'] = {
  name: 'M-FAST',
  fullName: 'Miller Forensic Assessment of Symptoms Test (M-FAST)',
  description: 'Évaluation de la validité des symptômes rapportés — 25 items binaires (score total /25)',
  items: MFAST_ITEMS,
  maxScore: 25,
};

// --- MMSE ---
const MMSE_OPTIONS = [
  { value: 1, label: 'Correct (1)' },
  { value: 0, label: 'Erreur (0)' },
];

const MMSE_ITEMS: ScaleItem[] = [
  { id: 'mmse_o1', label: 'Année ?', options: MMSE_OPTIONS },
  { id: 'mmse_o2', label: 'Saison ?', options: MMSE_OPTIONS },
  { id: 'mmse_o3', label: 'Mois ?', options: MMSE_OPTIONS },
  { id: 'mmse_o4', label: 'Jour du mois ?', options: MMSE_OPTIONS },
  { id: 'mmse_o5', label: 'Jour de la semaine ?', options: MMSE_OPTIONS },
  { id: 'mmse_o6', label: 'Hôpital / Cabinet ?', options: MMSE_OPTIONS },
  { id: 'mmse_o7', label: 'Étage ?', options: MMSE_OPTIONS },
  { id: 'mmse_o8', label: 'Ville ?', options: MMSE_OPTIONS },
  { id: 'mmse_o9', label: 'Département ?', options: MMSE_OPTIONS },
  { id: 'mmse_o10', label: 'Pays ?', options: MMSE_OPTIONS },
  { id: 'mmse_a1', label: 'Répétition mot 1 (ex: Cigare)', options: MMSE_OPTIONS },
  { id: 'mmse_a2', label: 'Répétition mot 2 (ex: Fleur)', options: MMSE_OPTIONS },
  { id: 'mmse_a3', label: 'Répétition mot 3 (ex: Porte)', options: MMSE_OPTIONS },
  { id: 'mmse_c1', label: '100 - 7 = 93', options: MMSE_OPTIONS },
  { id: 'mmse_c2', label: '93 - 7 = 86', options: MMSE_OPTIONS },
  { id: 'mmse_c3', label: '86 - 7 = 79', options: MMSE_OPTIONS },
  { id: 'mmse_c4', label: '79 - 7 = 72', options: MMSE_OPTIONS },
  { id: 'mmse_c5', label: '72 - 7 = 65', options: MMSE_OPTIONS },
  { id: 'mmse_r1', label: 'Rappel mot 1', options: MMSE_OPTIONS },
  { id: 'mmse_r2', label: 'Rappel mot 2', options: MMSE_OPTIONS },
  { id: 'mmse_r3', label: 'Rappel mot 3', options: MMSE_OPTIONS },
  { id: 'mmse_l1', label: 'Montrer un crayon — Dénomination', options: MMSE_OPTIONS },
  { id: 'mmse_l2', label: 'Montrer une montre — Dénomination', options: MMSE_OPTIONS },
  { id: 'mmse_l3', label: 'Répéter "Pas de mais, de si, ni de et"', options: MMSE_OPTIONS },
  { id: 'mmse_l4', label: 'Prendre le papier avec la main droite', options: MMSE_OPTIONS },
  { id: 'mmse_l5', label: 'Plier le papier en deux', options: MMSE_OPTIONS },
  { id: 'mmse_l6', label: 'Jeter le papier par terre', options: MMSE_OPTIONS },
  { id: 'mmse_l7', label: 'Lire et exécuter "Fermez les yeux"', options: MMSE_OPTIONS },
  { id: 'mmse_l8', label: 'Écrire une phrase spontanée', options: MMSE_OPTIONS },
  { id: 'mmse_p1', label: 'Copier le dessin de 2 pentagones croisés', options: MMSE_OPTIONS },
];

const MMSE_CATEGORIES: ItemCategory[] = [
  { label: 'Orientation temporelle et spatiale', itemIds: ['mmse_o1', 'mmse_o2', 'mmse_o3', 'mmse_o4', 'mmse_o5', 'mmse_o6', 'mmse_o7', 'mmse_o8', 'mmse_o9', 'mmse_o10'] },
  { label: 'Apprentissage', itemIds: ['mmse_a1', 'mmse_a2', 'mmse_a3'] },
  { label: 'Attention et calcul', itemIds: ['mmse_c1', 'mmse_c2', 'mmse_c3', 'mmse_c4', 'mmse_c5'] },
  { label: 'Rappel', itemIds: ['mmse_r1', 'mmse_r2', 'mmse_r3'] },
  { label: 'Langage', itemIds: ['mmse_l1', 'mmse_l2', 'mmse_l3', 'mmse_l4', 'mmse_l5', 'mmse_l6', 'mmse_l7', 'mmse_l8'] },
  { label: 'Praxie visuoconstructive', itemIds: ['mmse_p1'] },
];

(SCALES as Record<string, ScaleDefinition>)['MMSE'] = {
  name: 'MMSE',
  fullName: 'Mini-Mental State Examination (MMSE)',
  description: 'Évaluation rapide des fonctions cognitives — 30 items binaires (score total /30)',
  items: MMSE_ITEMS,
  maxScore: 30,
  itemCategories: MMSE_CATEGORIES,
};

// --- PCL-5 ---
const PCL5_OPTIONS = [
  { value: 0, label: 'Pas du tout (0)' },
  { value: 1, label: 'Un peu (1)' },
  { value: 2, label: 'Moyennement (2)' },
  { value: 3, label: 'Beaucoup (3)' },
  { value: 4, label: 'Extrêmement (4)' },
];

const PCL5_LABELS = [
  'Des souvenirs répétitifs, troublants et involontaires de l\'expérience stressante ?',
  'Des rêves répétitifs et troublants de l\'expérience stressante ?',
  'L\'impression soudaine d\'agir ou de ressentir les choses comme si l\'expérience stressante se reproduisait ?',
  'Un sentiment de grande contrariété lorsque quelque chose vous rappelait l\'expérience stressante ?',
  'De fortes réactions physiques lorsque quelque chose vous rappelait l\'expérience stressante ?',
  'Le fait d\'éviter les souvenirs, les pensées ou les sentiments en lien avec l\'expérience stressante ?',
  'Le fait d\'éviter les rappels externes de l\'expérience stressante ?',
  'L\'incapacité à vous rappeler une partie importante de l\'expérience stressante ?',
  'Avoir de fortes croyances ou attentes négatives envers vous-même, les autres ou le monde ?',
  'Vous blâmer ou blâmer d\'autres personnes pour l\'expérience stressante ?',
  'Avoir des sentiments négatifs marqués (peur, horreur, colère, culpabilité, honte) ?',
  'Une perte d\'intérêt pour des activités qui vous intéressaient auparavant ?',
  'Vous sentir distant(e) ou coupé(e) des autres ?',
  'L\'incapacité à ressentir des émotions positives ?',
  'Un comportement irritable, faire des crises de colère ou agir de façon agressive ?',
  'Adopter un comportement très imprudent ou destructeur ?',
  'Vous sentir hypervigilant(e), sur vos gardes ?',
  'Être très facilement sursauté(e) ?',
  'Des difficultés à vous concentrer ?',
  'Des difficultés à trouver le sommeil ou à rester endormi(e) ?',
];

const PCL5_ITEMS: ScaleItem[] = PCL5_LABELS.map((label, i) => ({
  id: `pcl5_${i + 1}`,
  label: `${i + 1}. ${label}`,
  options: PCL5_OPTIONS,
}));

(SCALES as Record<string, ScaleDefinition>)['PCL-5'] = {
  name: 'PCL-5',
  fullName: 'PTSD Checklist for DSM-5 (PCL-5)',
  description: 'Évaluation du Trouble Stress Post-Traumatique — 20 items cotés de 0 à 4 (score total /80)',
  items: PCL5_ITEMS,
  maxScore: 80,
};

// --- ASRS v1.1 ---
const ASRS_OPTIONS = [
  { value: 0, label: 'Jamais' },
  { value: 1, label: 'Rarement' },
  { value: 2, label: 'Parfois' },
  { value: 3, label: 'Souvent' },
  { value: 4, label: 'Très souvent' },
];

const ASRS_ITEMS: ScaleItem[] = [
  { id: 'asrs1', label: '1. À quelle fréquence avez-vous des difficultés à finaliser les détails d\'un projet une fois que les parties stimulantes ont été réalisées ?', options: ASRS_OPTIONS, positiveThreshold: 2 },
  { id: 'asrs2', label: '2. À quelle fréquence avez-vous des difficultés à ordonner les choses lorsque vous devez accomplir une tâche qui demande de l\'organisation ?', options: ASRS_OPTIONS, positiveThreshold: 2 },
  { id: 'asrs3', label: '3. À quelle fréquence avez-vous des difficultés à vous souvenir des rendez-vous ou de vos obligations ?', options: ASRS_OPTIONS, positiveThreshold: 2 },
  { id: 'asrs4', label: '4. Lorsque vous avez une tâche qui demande beaucoup de réflexion, à quelle fréquence l\'évitez-vous ou repoussez-vous le moment de vous y mettre ?', options: ASRS_OPTIONS, positiveThreshold: 3 },
  { id: 'asrs5', label: '5. À quelle fréquence vous arrive-t-il de remuer les mains ou les pieds lorsque vous devez rester assis pendant une longue période ?', options: ASRS_OPTIONS, positiveThreshold: 3 },
  { id: 'asrs6', label: '6. À quelle fréquence vous sentez-vous excessivement actif et poussé à faire des choses, comme si vous étiez "monté(e) sur des ressorts" ?', options: ASRS_OPTIONS, positiveThreshold: 3 },
];

(SCALES as Record<string, ScaleDefinition>)['ASRS'] = {
  name: 'ASRS',
  fullName: 'Adult ADHD Self-Report Scale v1.1 (ASRS)',
  description: 'Dépistage du TDAH adulte — 6 items, score = nombre d\'items positifs (/6)',
  items: ASRS_ITEMS,
  maxScore: 6,
  scoringMode: 'count-positive',
};

// --- PANSS ---
const PANSS_OPTIONS = [
  { value: 1, label: '1 - Absent' },
  { value: 2, label: '2 - Minime' },
  { value: 3, label: '3 - Léger' },
  { value: 4, label: '4 - Modéré' },
  { value: 5, label: '5 - Mod. Sévère' },
  { value: 6, label: '6 - Sévère' },
  { value: 7, label: '7 - Extrême' },
];

const PANSS_P_ITEMS: ScaleItem[] = [
  { id: 'panss_p1', label: 'P1. Idées délirantes', options: PANSS_OPTIONS },
  { id: 'panss_p2', label: 'P2. Désorganisation conceptuelle', options: PANSS_OPTIONS },
  { id: 'panss_p3', label: 'P3. Comportement hallucinatoire', options: PANSS_OPTIONS },
  { id: 'panss_p4', label: 'P4. Excitation', options: PANSS_OPTIONS },
  { id: 'panss_p5', label: 'P5. Idées de grandeur', options: PANSS_OPTIONS },
  { id: 'panss_p6', label: 'P6. Méfiance / Persécution', options: PANSS_OPTIONS },
  { id: 'panss_p7', label: 'P7. Hostilité', options: PANSS_OPTIONS },
];

const PANSS_N_ITEMS: ScaleItem[] = [
  { id: 'panss_n1', label: 'N1. Émoussement affectif', options: PANSS_OPTIONS },
  { id: 'panss_n2', label: 'N2. Retrait affectif', options: PANSS_OPTIONS },
  { id: 'panss_n3', label: 'N3. Mauvais contact (Rapport)', options: PANSS_OPTIONS },
  { id: 'panss_n4', label: 'N4. Retrait social apathique', options: PANSS_OPTIONS },
  { id: 'panss_n5', label: 'N5. Difficulté de la pensée abstraite', options: PANSS_OPTIONS },
  { id: 'panss_n6', label: 'N6. Manque de spontanéité et de fluidité de la conversation', options: PANSS_OPTIONS },
  { id: 'panss_n7', label: 'N7. Pensée stéréotypée', options: PANSS_OPTIONS },
];

const PANSS_G_ITEMS: ScaleItem[] = [
  { id: 'panss_g1', label: 'G1. Préoccupations somatiques', options: PANSS_OPTIONS },
  { id: 'panss_g2', label: 'G2. Anxiété', options: PANSS_OPTIONS },
  { id: 'panss_g3', label: 'G3. Sentiments de culpabilité', options: PANSS_OPTIONS },
  { id: 'panss_g4', label: 'G4. Tension', options: PANSS_OPTIONS },
  { id: 'panss_g5', label: 'G5. Maniérisme et postures', options: PANSS_OPTIONS },
  { id: 'panss_g6', label: 'G6. Dépression', options: PANSS_OPTIONS },
  { id: 'panss_g7', label: 'G7. Retard moteur', options: PANSS_OPTIONS },
  { id: 'panss_g8', label: 'G8. Non-coopération', options: PANSS_OPTIONS },
  { id: 'panss_g9', label: 'G9. Contenus de pensée inhabituels', options: PANSS_OPTIONS },
  { id: 'panss_g10', label: 'G10. Désorientation', options: PANSS_OPTIONS },
  { id: 'panss_g11', label: 'G11. Mauvaise attention', options: PANSS_OPTIONS },
  { id: 'panss_g12', label: 'G12. Manque de jugement et de conscience de la maladie', options: PANSS_OPTIONS },
  { id: 'panss_g13', label: 'G13. Trouble de la volition', options: PANSS_OPTIONS },
  { id: 'panss_g14', label: 'G14. Mauvais contrôle des impulsions', options: PANSS_OPTIONS },
  { id: 'panss_g15', label: 'G15. Préoccupation', options: PANSS_OPTIONS },
  { id: 'panss_g16', label: 'G16. Évitement social actif', options: PANSS_OPTIONS },
];

const PANSS_ALL_ITEMS: ScaleItem[] = [...PANSS_P_ITEMS, ...PANSS_N_ITEMS, ...PANSS_G_ITEMS];

const PANSS_CATEGORIES: ItemCategory[] = [
  { label: 'Échelle Positive (P)', itemIds: PANSS_P_ITEMS.map((i) => i.id) },
  { label: 'Échelle Négative (N)', itemIds: PANSS_N_ITEMS.map((i) => i.id) },
  { label: 'Psychopathologie Générale (G)', itemIds: PANSS_G_ITEMS.map((i) => i.id) },
];

(SCALES as Record<string, ScaleDefinition>)['PANSS'] = {
  name: 'PANSS',
  fullName: 'Positive and Negative Syndrome Scale (PANSS)',
  description: 'Évaluation de la schizophrénie — 30 items cotés de 1 à 7 (score total /210, min 30)',
  items: PANSS_ALL_ITEMS,
  maxScore: 210,
  minScore: 30,
  itemCategories: PANSS_CATEGORIES,
};

export const PANSS_P_IDS = PANSS_P_ITEMS.map((i) => i.id);
export const PANSS_N_IDS = PANSS_N_ITEMS.map((i) => i.id);
export const PANSS_G_IDS = PANSS_G_ITEMS.map((i) => i.id);

export function computePANSSSubscores(scores: Record<string, number>) {
  const sub = (ids: string[]) => ids.reduce((s, id) => s + (scores[id] ?? 1), 0);
  const p = sub(PANSS_P_IDS);
  const n = sub(PANSS_N_IDS);
  const g = sub(PANSS_G_IDS);
  return { p, n, g, total: p + n + g };
}

// --- DAST-10 ---
const DAST_OPTIONS_STANDARD = [
  { value: 0, label: 'Non (0)' },
  { value: 1, label: 'Oui (1)' },
];

const DAST_OPTIONS_INVERTED = [
  { value: 1, label: 'Non (1)' },
  { value: 0, label: 'Oui (0)' },
];

const DAST_ITEMS: ScaleItem[] = [
  { id: 'dast1', label: '1. Avez-vous consommé des drogues à des fins non médicales ?', options: DAST_OPTIONS_STANDARD },
  { id: 'dast2', label: '2. Avez-vous abusé de médicaments prescrits sur ordonnance ?', options: DAST_OPTIONS_STANDARD },
  { id: 'dast3', label: '3. Consommez-vous plus d\'une drogue à la fois ?', options: DAST_OPTIONS_STANDARD },
  { id: 'dast4', label: '4. Arrivez-vous à passer une semaine sans consommer de drogue ? (Score inversé)', options: DAST_OPTIONS_INVERTED },
  { id: 'dast5', label: '5. Êtes-vous toujours capable d\'arrêter de consommer de la drogue quand vous le voulez ? (Score inversé)', options: DAST_OPTIONS_INVERTED },
  { id: 'dast6', label: '6. Avez-vous déjà eu des trous de mémoire ou des flashbacks à la suite de votre consommation de drogues ?', options: DAST_OPTIONS_STANDARD },
  { id: 'dast7', label: '7. Vous sentez-vous parfois coupable de votre consommation de drogues ?', options: DAST_OPTIONS_STANDARD },
  { id: 'dast8', label: '8. Votre entourage se plaint-il de votre consommation de drogues ?', options: DAST_OPTIONS_STANDARD },
  { id: 'dast9', label: '9. La consommation de drogues a-t-elle créé des problèmes avec votre entourage ?', options: DAST_OPTIONS_STANDARD },
  { id: 'dast10', label: '10. Avez-vous déjà eu des problèmes avec la justice en raison de votre consommation de drogues ?', options: DAST_OPTIONS_STANDARD },
];

(SCALES as Record<string, ScaleDefinition>)['DAST-10'] = {
  name: 'DAST-10',
  fullName: 'Drug Abuse Screening Test (DAST-10)',
  description: 'Dépistage de l\'abus de substances — 10 items binaires (score total /10)',
  items: DAST_ITEMS,
  maxScore: 10,
};

// --- MoCA ---
const MOCA_BINARY = [
  { value: 1, label: 'Correct (1)' },
  { value: 0, label: 'Erreur (0)' },
];

const MOCA_MEMORY = [
  { value: 1, label: 'Rappel libre (1)' },
  { value: 0, label: 'Échec (0)' },
];

const MOCA_SERIAL = [
  { value: 3, label: '4-5 correctes (3)' },
  { value: 2, label: '2-3 correctes (2)' },
  { value: 1, label: '1 correcte (1)' },
  { value: 0, label: '0 correcte (0)' },
];

const MOCA_EDU = [
  { value: 1, label: 'Oui (+1 pt)' },
  { value: 0, label: 'Non' },
];

const MOCA_ITEMS: ScaleItem[] = [
  { id: 'moca_ve1', label: 'Pistes (Trail Making)', options: MOCA_BINARY, maxPoints: 1 },
  { id: 'moca_ve2', label: 'Copie du Cube', options: MOCA_BINARY, maxPoints: 1 },
  { id: 'moca_ve3', label: 'Dessin de l\'horloge — Contour', options: MOCA_BINARY, maxPoints: 1 },
  { id: 'moca_ve4', label: 'Dessin de l\'horloge — Chiffres', options: MOCA_BINARY, maxPoints: 1 },
  { id: 'moca_ve5', label: 'Dessin de l\'horloge — Aiguilles', options: MOCA_BINARY, maxPoints: 1 },
  { id: 'moca_d1', label: 'Dénomination : Lion', options: MOCA_BINARY, maxPoints: 1 },
  { id: 'moca_d2', label: 'Dénomination : Rhinocéros', options: MOCA_BINARY, maxPoints: 1 },
  { id: 'moca_d3', label: 'Dénomination : Chameau', options: MOCA_BINARY, maxPoints: 1 },
  { id: 'moca_at1', label: 'Répétition de chiffres à l\'endroit', options: MOCA_BINARY, maxPoints: 1 },
  { id: 'moca_at2', label: 'Répétition de chiffres à l\'envers', options: MOCA_BINARY, maxPoints: 1 },
  { id: 'moca_at3', label: 'Taper de la main à la lettre A', options: MOCA_BINARY, maxPoints: 1 },
  { id: 'moca_at4', label: 'Soustractions en série de 7 (100-7...)', options: MOCA_SERIAL, maxPoints: 3 },
  { id: 'moca_la1', label: 'Répétition de la phrase 1', options: MOCA_BINARY, maxPoints: 1 },
  { id: 'moca_la2', label: 'Répétition de la phrase 2', options: MOCA_BINARY, maxPoints: 1 },
  { id: 'moca_la3', label: 'Fluidité verbale (mots en F, > 11 mots en 1 min)', options: MOCA_BINARY, maxPoints: 1 },
  { id: 'moca_ab1', label: 'Similitude Train — Bicyclette', options: MOCA_BINARY, maxPoints: 1 },
  { id: 'moca_ab2', label: 'Similitude Montre — Règle', options: MOCA_BINARY, maxPoints: 1 },
  { id: 'moca_rd1', label: 'Rappel différé : Visage', options: MOCA_MEMORY, maxPoints: 1 },
  { id: 'moca_rd2', label: 'Rappel différé : Velours', options: MOCA_MEMORY, maxPoints: 1 },
  { id: 'moca_rd3', label: 'Rappel différé : Église', options: MOCA_MEMORY, maxPoints: 1 },
  { id: 'moca_rd4', label: 'Rappel différé : Marguerite', options: MOCA_MEMORY, maxPoints: 1 },
  { id: 'moca_rd5', label: 'Rappel différé : Rouge', options: MOCA_MEMORY, maxPoints: 1 },
  { id: 'moca_or1', label: 'Orientation : Date', options: MOCA_BINARY, maxPoints: 1 },
  { id: 'moca_or2', label: 'Orientation : Mois', options: MOCA_BINARY, maxPoints: 1 },
  { id: 'moca_or3', label: 'Orientation : Année', options: MOCA_BINARY, maxPoints: 1 },
  { id: 'moca_or4', label: 'Orientation : Jour', options: MOCA_BINARY, maxPoints: 1 },
  { id: 'moca_or5', label: 'Orientation : Endroit', options: MOCA_BINARY, maxPoints: 1 },
  { id: 'moca_or6', label: 'Orientation : Ville', options: MOCA_BINARY, maxPoints: 1 },
  { id: 'moca_edu', label: 'Scolarité de 12 ans ou moins (+1 point, plafonné à 30)', options: MOCA_EDU, maxPoints: 1 },
];

const MOCA_CATEGORIES: ItemCategory[] = [
  { label: 'Visuospatial / Exécutif', itemIds: ['moca_ve1', 'moca_ve2', 'moca_ve3', 'moca_ve4', 'moca_ve5'] },
  { label: 'Dénomination', itemIds: ['moca_d1', 'moca_d2', 'moca_d3'] },
  { label: 'Attention', itemIds: ['moca_at1', 'moca_at2', 'moca_at3', 'moca_at4'] },
  { label: 'Langage', itemIds: ['moca_la1', 'moca_la2', 'moca_la3'] },
  { label: 'Abstraction', itemIds: ['moca_ab1', 'moca_ab2'] },
  { label: 'Rappel Différé (Mémoire)', itemIds: ['moca_rd1', 'moca_rd2', 'moca_rd3', 'moca_rd4', 'moca_rd5'] },
  { label: 'Orientation', itemIds: ['moca_or1', 'moca_or2', 'moca_or3', 'moca_or4', 'moca_or5', 'moca_or6'] },
  { label: 'Correction pour scolarité', itemIds: ['moca_edu'] },
];

(SCALES as Record<string, ScaleDefinition>)['MoCA'] = {
  name: 'MoCA',
  fullName: 'Montreal Cognitive Assessment (MoCA)',
  description: 'Évaluation des fonctions cognitives et exécutives — score total /30 (plafonné)',
  items: MOCA_ITEMS,
  maxScore: 30,
  itemCategories: MOCA_CATEGORIES,
  scoringMode: 'sum',
};

export function computeMoCAScore(scores: Record<string, number>): number {
  const raw = MOCA_ITEMS.reduce((s, item) => s + (scores[item.id] || 0), 0);
  return Math.min(raw, 30);
}

// --- YMRS ---
const YMRS_OPTS_04 = (labels: string[]) =>
  labels.map((l, i) => ({ value: i, label: `(${i}) ${l}` }));

const YMRS_OPTS_DOUBLE = (labels: string[]) =>
  labels.map((l, i) => ({ value: i * 2, label: `(${i * 2}) ${l}` }));

const YMRS_ITEMS: ScaleItem[] = [
  { id: 'ymrs1', label: '1. Humeur exaltée', options: YMRS_OPTS_04([
    'Absente / Normale',
    'Légèrement élevée',
    'Élevée de façon nette',
    'Exaltée, rires inappropriés',
    'Extrêmement exaltée, euphorie débordante',
  ]) },
  { id: 'ymrs2', label: '2. Activité motrice / Énergie', options: YMRS_OPTS_04([
    'Normale',
    'Augmentation subjective',
    'Animé, gestes amples',
    'Agitation motrice modérée',
    'Agitation motrice continue',
  ]) },
  { id: 'ymrs3', label: '3. Intérêt sexuel', options: YMRS_OPTS_04([
    'Normal',
    'Légère augmentation',
    'Augmentation nette, propos suggestifs',
    'Hypersexualité évidente',
    'Comportement sexuel totalement inadapté',
  ]) },
  { id: 'ymrs4', label: '4. Sommeil', options: YMRS_OPTS_04([
    'Normal',
    'Diminution d\'1h par rapport à la normale',
    'Diminution de moitié',
    'Diminue à quelques heures seulement',
    'Pas de sommeil du tout',
  ]) },
  { id: 'ymrs5', label: '5. Irritabilité', options: YMRS_OPTS_DOUBLE([
    'Absente',
    'Subjectivement accrue',
    'Irritable par moments',
    'Souvent irritable, cassant',
    'Hostile, non coopérant',
  ]) },
  { id: 'ymrs6', label: '6. Débit et volume verbal', options: YMRS_OPTS_DOUBLE([
    'Normal',
    'Légèrement augmenté, rapide',
    'Rapide mais interruptible',
    'Logorrhée, difficile à interrompre',
    'Incoercible, impossible à interrompre',
  ]) },
  { id: 'ymrs7', label: '7. Troubles du langage / Fuite des idées', options: YMRS_OPTS_04([
    'Absents',
    'Discours circonstancié, distractible',
    'Déraillement, fuite des idées modérée',
    'Fuite des idées sévère, coq à l\'âne',
    'Incohérence totale',
  ]) },
  { id: 'ymrs8', label: '8. Contenu de la pensée', options: YMRS_OPTS_DOUBLE([
    'Normal',
    'Projets multiples, idées de grandeur légères',
    'Idées de grandeur nettes, paranoïa légère',
    'Délire de grandeur ou de persécution',
    'Délire totalement désorganisé, hallucinations',
  ]) },
  { id: 'ymrs9', label: '9. Comportement perturbateur / Agressif', options: YMRS_OPTS_DOUBLE([
    'Absent',
    'Sarcastique, provoquant',
    'Exigeant, menaçant',
    'Menaces physiques, destruction d\'objets',
    'Assaut, violence physique',
  ]) },
  { id: 'ymrs10', label: '10. Apparence', options: YMRS_OPTS_04([
    'Appropriée',
    'Négligence légère, apparence tendue',
    'Débraillé, excentricité modérée',
    'Maquillage outrancier, tenue bizarre',
    'Tenue totalement inadaptée, nudité',
  ]) },
  { id: 'ymrs11', label: '11. Conscience du trouble / Insight', options: YMRS_OPTS_04([
    'Excellente (conscience de la maladie)',
    'Admet des changements mais nie la maladie',
    'Admet la maladie mais la minimise fortement',
    'Nie totalement être malade',
    'Accuse les autres, interprétation délirante de sa situation',
  ]) },
];

(SCALES as Record<string, ScaleDefinition>)['YMRS'] = {
  name: 'YMRS',
  fullName: 'Young Mania Rating Scale (YMRS)',
  description: 'Évaluation de la symptomatologie maniaque — 11 items, cotation asymétrique (score total /60)',
  items: YMRS_ITEMS,
  maxScore: 60,
};

const BINARY_OPTIONS: ScaleOption[] = [
  { value: 0, label: '0 - Non / Absent' },
  { value: 1, label: '1 - Oui / Présent' },
];

const CASIC_ITEMS: ScaleItem[] = [
  { id: 'casic1', label: '1. Célibataire de toujours (jamais cohabité > 2 ans)', options: BINARY_OPTIONS },
  { id: 'casic2', label: '2. Présence de vidéos violentes ou de sadisme dans le MASM saisi', options: BINARY_OPTIONS },
  { id: 'casic3', label: '3. Présence de récits textuels (fictions/chats) impliquant des abus sur enfants', options: BINARY_OPTIONS },
  { id: 'casic4', label: '4. Tentatives/réussite d\'entrer en contact textuel en ligne avec un mineur (grooming)', options: BINARY_OPTIONS },
  { id: 'casic5', label: '5. Possession d\'images de nudité non délictuelle / photos volées de mineurs', options: BINARY_OPTIONS },
  { id: 'casic6', label: '6. Plus de 50% de MASM impliquant de très jeunes enfants (pré-pubères)', options: BINARY_OPTIONS },
];

(SCALES as Record<string, ScaleDefinition>)['CASIC'] = {
  name: 'CASIC',
  fullName: 'CASIC (Correlates of Admission of Sexual Interest in Children)',
  description: 'Évaluation des indicateurs comportementaux d\'intérêt sexuel envers les enfants — 6 critères binaires (score /6). Un score ≥ 3 valide l\'Item 5 du CPORT.',
  items: CASIC_ITEMS,
  maxScore: 6,
};

const CPORT_ITEMS: ScaleItem[] = [
  { id: 'cport1', label: '1. Âge à l\'infraction index ≤ 35 ans', options: BINARY_OPTIONS },
  { id: 'cport2', label: '2. Antécédents judiciaires généraux (sexuels ou non)', options: BINARY_OPTIONS },
  { id: 'cport3', label: '3. Échec d\'une liberté conditionnelle, probation ou sursis', options: BINARY_OPTIONS },
  { id: 'cport4', label: '4. Antécédents d\'infraction sexuelle avec contact physique', options: BINARY_OPTIONS },
  { id: 'cport5', label: '5. Intérêt pédophilique/hébéphilique avéré (aveu, diagnostic ou CASIC ≥ 3)', options: BINARY_OPTIONS },
  { id: 'cport6', label: '6. Contenu majoritairement masculin dans le MASM saisi (> 50% garçons)', options: BINARY_OPTIONS },
  { id: 'cport7', label: '7. Contenu majoritairement masculin dans les autres images (> 50% garçons)', options: BINARY_OPTIONS },
];

(SCALES as Record<string, ScaleDefinition>)['CPORT'] = {
  name: 'CPORT',
  fullName: 'CPORT (Child Pornography Offender Risk Tool)',
  description: 'Évaluation actuarielle du risque de récidive pour les infractions MASM — 7 items binaires (score /7). Catégories : 0=Très faible, 1=Faible-Modéré, 2=Modéré-Élevé, 3-4=Élevé, 5-7=Très Élevé.',
  items: CPORT_ITEMS,
  maxScore: 7,
};

const CAM_YES_NO_OPTIONS: ScaleOption[] = [
  { value: 0, label: 'Non' },
  { value: 1, label: 'Oui' },
];

const CAM_SEVERITY_OPTIONS: ScaleOption[] = [
  { value: 0, label: 'Non' },
  { value: 1, label: 'Légère' },
  { value: 2, label: 'Marquée' },
];

const CAM_ITEMS: ScaleItem[] = [
  { id: 'cam1', label: '1. Début aigu et fluctuation — Modification aiguë de l\'état mental avec fluctuations au cours de la journée', options: CAM_YES_NO_OPTIONS },
  { id: 'cam2', label: '2. Inattention — Difficulté à focaliser, maintenir ou déplacer l\'attention', options: CAM_SEVERITY_OPTIONS },
  { id: 'cam3', label: '3. Pensée désorganisée — Discours incohérent, désorganisé ou illogique', options: CAM_YES_NO_OPTIONS },
  { id: 'cam4', label: '4. Niveau de conscience altéré — Hypervigilance, léthargie, stupeur ou coma', options: CAM_YES_NO_OPTIONS },
];

(SCALES as Record<string, ScaleDefinition>)['CAM'] = {
  name: 'CAM',
  fullName: 'CAM (Confusion Assessment Method)',
  description: 'Dépistage du syndrome confusionnel (delirium) — 4 critères diagnostiques. Positif si critères 1+2 présents ET critère 3 ou 4 présent.',
  items: CAM_ITEMS,
  maxScore: 4,
};

const MDAS_OPTIONS: ScaleOption[] = [
  { value: 0, label: '0 - Absent' },
  { value: 1, label: '1 - Léger' },
  { value: 2, label: '2 - Modéré' },
  { value: 3, label: '3 - Sévère' },
];

const MDAS_ITEMS: ScaleItem[] = [
  { id: 'mdas1', label: '1. Niveau de conscience réduit', options: MDAS_OPTIONS },
  { id: 'mdas2', label: '2. Désorientation', options: MDAS_OPTIONS },
  { id: 'mdas3', label: '3. Troubles cognitifs à court terme (mémoire)', options: MDAS_OPTIONS },
  { id: 'mdas4', label: '4. Troubles cognitifs à long terme', options: MDAS_OPTIONS },
  { id: 'mdas5', label: '5. Perturbation de l\'expérience perceptuelle (illusions / hallucinations)', options: MDAS_OPTIONS },
  { id: 'mdas6', label: '6. Désorganisation de la pensée', options: MDAS_OPTIONS },
  { id: 'mdas7', label: '7. Délire (contenu de pensée thématisé)', options: MDAS_OPTIONS },
  { id: 'mdas8', label: '8. Labilité affective', options: MDAS_OPTIONS },
  { id: 'mdas9', label: '9. Perturbation psychomotrice (agitation ou ralentissement)', options: MDAS_OPTIONS },
  { id: 'mdas10', label: '10. Perturbation du cycle veille-sommeil', options: MDAS_OPTIONS },
];

(SCALES as Record<string, ScaleDefinition>)['MDAS'] = {
  name: 'MDAS',
  fullName: 'MDAS (Memorial Delirium Assessment Scale)',
  description: 'Évaluation de la sévérité du syndrome confusionnel — 10 items cotés de 0 à 3 (score total /30). Seuil diagnostique : ≥ 13.',
  items: MDAS_ITEMS,
  maxScore: 30,
};

export const SCALE_NAMES: ScaleType[] = ['PCL-R', 'HCR-20', 'VRAG', 'ODARA', 'SARA', 'SAVRY', 'Static-99R', 'Static-2002R', 'SVR-20', 'STABLE-2007', 'START', 'SSPI-2', 'CASIC', 'CPORT'];

export interface ClinicalScaleCategory {
  label: string;
  scales: ScaleType[];
}

export const CLINICAL_SCALE_CATEGORIES: ClinicalScaleCategory[] = [
  { label: 'Troubles de l\'humeur / Psychose', scales: ['MADRS', 'BPRS', 'PANSS', 'YMRS'] },
  { label: 'Cognition', scales: ['MMSE', 'MoCA'] },
  { label: 'Syndrome Confusionnel / Delirium', scales: ['CAM', 'MDAS'] },
  { label: 'Trauma', scales: ['PCL-5'] },
  { label: 'Addictologie', scales: ['AUDIT', 'DAST-10'] },
  { label: 'Validité et Simulation', scales: ['M-FAST'] },
  { label: 'TDAH', scales: ['ASRS'] },
];

export const CLINICAL_SCALE_NAMES: ScaleType[] = CLINICAL_SCALE_CATEGORIES.flatMap((c) => c.scales);

export function computeASRSPositiveCount(scores: Record<string, number>): number {
  return ASRS_ITEMS.filter((item) => {
    const val = scores[item.id];
    return val !== undefined && item.positiveThreshold !== undefined && val >= item.positiveThreshold;
  }).length;
}

export function isASRSItemPositive(item: ScaleItem, value: number | undefined): boolean {
  if (value === undefined || item.positiveThreshold === undefined) return false;
  return value >= item.positiveThreshold;
}
