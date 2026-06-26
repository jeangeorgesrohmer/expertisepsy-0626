import { YesNoNR, Observance } from './anamnese';
export type { YesNoNR, Observance };

export type NiveauIntellectuel = 'Normal' | 'Supérieur' | 'Limite' | 'Déficitaire' | 'NR';
export type NiveauEmpathie = 'Préservée' | 'Diminuée' | 'Abolie' | 'NR';

export const NIVEAU_INTELLECT_OPTIONS = ['Normal', 'Supérieur', 'Limite', 'Déficitaire', 'NR'] as const;
export const EMPATHIE_OPTIONS = ['Préservée', 'Diminuée', 'Abolie', 'NR'] as const;

const NR: YesNoNR = 'NR';

export interface ExamenCarteAData {
  cooperant: YesNoNR;
  reticent: YesNoNR;
  mutique: YesNoNR;
  hostile: YesNoNR;
  mefiant: YesNoNR;
  tenueVestimentaireAdaptee: YesNoNR;
  hygieneCorrecte: YesNoNR;
  negligence: YesNoNR;
  contactConserve: YesNoNR;
  contactFroid: YesNoNR;
  contactFuyant: YesNoNR;
  contactAdhesif: YesNoNR;
}

export interface ExamenCarteBData {
  vigilanceNormale: YesNoNR;
  obnubilation: YesNoNR;
  somnolence: YesNoNR;
  stupeur: YesNoNR;
  orienteTemps: YesNoNR;
  orienteEspace: YesNoNR;
  orientePersonne: YesNoNR;
  attentionPreservee: YesNoNR;
  distractibilite: YesNoNR;
  fatigabiliteAttentionnelle: YesNoNR;
  memoireImmediatePreservee: YesNoNR;
  memoireRecentePreservee: YesNoNR;
  memoireAnciennePreservee: YesNoNR;
  amnesieFaits: YesNoNR;
  faussesReconnaissances: YesNoNR;
  fabulations: YesNoNR;
  niveauIntellectuelEstime: NiveauIntellectuel;
  retardMentalSuspecte: YesNoNR;
  aptitudesInsight: YesNoNR;
  critiqueConservee: YesNoNR;
  anosognosie: YesNoNR;
}

export interface ExamenCarteCData {
  reconnaissanceEmotionsFaciales: YesNoNR;
  comprehensionEtatMentalAutrui: YesNoNR;
  difficultesPdvAutrui: YesNoNR;
  difficultesSousEntendus: YesNoNR;
  interpretationsLitterales: YesNoNR;
  comprehensionReglesImplicites: YesNoNR;
  difficultesBehaviorContextSocial: YesNoNR;
  interpretationsPersecut: YesNoNR;
  naivete: YesNoNR;
  empathieCognitive: NiveauEmpathie;
  empathieEmotionnelle: NiveauEmpathie;
  comportementAdapte: YesNoNR;
  inhibitionMarquee: YesNoNR;
  intrusivite: YesNoNR;
  difficulteDistanceInterpersonnelle: YesNoNR;
  retentissementVieFamiliale: YesNoNR;
  retentissementVieProfessionnelle: YesNoNR;
  retentissementRelationsAffectives: YesNoNR;
}

export interface ExamenCarteDData {
  discoursCohérent: YesNoNR;
  discoursLogique: YesNoNR;
  proposAdaptes: YesNoNR;
  mythomanie: YesNoNR;
  mensongesUtilitaires: YesNoNR;
  debitNormal: YesNoNR;
  debitRalenti: YesNoNR;
  debitAccelere: YesNoNR;
  logorrhee: YesNoNR;
  barrages: YesNoNR;
  fading: YesNoNR;
  coqALane: YesNoNR;
  incoherence: YesNoNR;
  schizophasie: YesNoNR;
  perseverations: YesNoNR;
  tangentialite: YesNoNR;
  prolixite: YesNoNR;
  neologismesPresents: YesNoNR;
}

export interface ExamenCarteEData {
  presenceSyndrome: YesNoNR;
  antecedentSyndrome: YesNoNR;
  tristesseHumeur: YesNoNR;
  anhedonie: YesNoNR;
  perteInteret: YesNoNR;
  emoussementAffectif: YesNoNR;
  douleurMoralePresente: YesNoNR;
  douleurMoraleIntense: YesNoNR;
  culpabilite: YesNoNR;
  sentimentIndignite: YesNoNR;
  devalorisation: YesNoNR;
  sentimentIncapacite: YesNoNR;
  autoAccusations: YesNoNR;
  pessimisme: YesNoNR;
  desespoir: YesNoNR;
  ideesMort: YesNoNR;
  ideesSuicidaires: YesNoNR;
  scenarioSuicidaire: YesNoNR;
  intentionSuicidaire: YesNoNR;
  risqueSuicidaireImmédiat: YesNoNR;
  troublesSommeil: YesNoNR;
  insomniesEndormissement: YesNoNR;
  insomnieMilieuNuit: YesNoNR;
  reveilPrecoce: YesNoNR;
  hypersomnie: YesNoNR;
  troublesAppetit: YesNoNR;
  anorexie: YesNoNR;
  hyperphagie: YesNoNR;
  variationPonderale: YesNoNR;
  asthenie: YesNoNR;
  perteEnergie: YesNoNR;
  troublesLibido: YesNoNR;
  bradypsychie: YesNoNR;
  bradykinesie: YesNoNR;
  hypomimie: YesNoNR;
  clinophilie: YesNoNR;
  aggravationMatinale: YesNoNR;
}

export interface ExamenCarteFData {
  presenceSyndrome: YesNoNR;
  antecedentSyndrome: YesNoNR;
  exaltationHumeur: YesNoNR;
  euphorie: YesNoNR;
  irritabilite: YesNoNR;
  labilitieEmotionnelle: YesNoNR;
  agitationPsychomotrice: YesNoNR;
  hyperactivite: YesNoNR;
  desinhibition: YesNoNR;
  familiariteExcessive: YesNoNR;
  tachypsychie: YesNoNR;
  fuiteIdees: YesNoNR;
  logorrhee: YesNoNR;
  coqALane: YesNoNR;
  megalomanie: YesNoNR;
  projetsIrrealistes: YesNoNR;
  suresTimationSoi: YesNoNR;
  conduitesARisque: YesNoNR;
  achatsInconsideres: YesNoNR;
  desinhibitionSexuelle: YesNoNR;
  ideesDelirantes: YesNoNR;
  hallucinations: YesNoNR;
}

export interface ExamenCarteGData {
  presenceSyndrome: YesNoNR;
  antecedentSyndrome: YesNoNR;
  inquietudeExcessive: YesNoNR;
  ruminationsAnxieuses: YesNoNR;
  peurSansObjet: YesNoNR;
  anticipationAnxieuse: YesNoNR;
  sentimentDangerImminent: YesNoNR;
  palpitations: YesNoNR;
  sueurs: YesNoNR;
  tremblements: YesNoNR;
  oppressionThoracique: YesNoNR;
  dyspnee: YesNoNR;
  nausees: YesNoNR;
  paresthesies: YesNoNR;
  vertiges: YesNoNR;
  antecedentAttaquesPanique: YesNoNR;
  attaquesPaniqueRecurrentes: YesNoNR;
  peurMourir: YesNoNR;
  peurDevenirFou: YesNoNR;
  agoraphobie: YesNoNR;
  phobieSociale: YesNoNR;
  phobiesSpecifiques: YesNoNR;
  conduitesEvitement: YesNoNR;
  retentissementFonctionnel: YesNoNR;
}

export interface ExamenCarteHData {
  presenceSyndrome: YesNoNR;
  antecedentSyndrome: YesNoNR;
  penseesObsedantes: YesNoNR;
  ideesIntrusives: YesNoNR;
  caractereEgoDystonique: YesNoNR;
  lutteAnxieuse: YesNoNR;
  rituelsCompulsifs: YesNoNR;
  verifications: YesNoNR;
  lavage: YesNoNR;
  rangement: YesNoNR;
  comptage: YesNoNR;
  souffrancePsychique: YesNoNR;
  retentissementFonctionnel: YesNoNR;
}

export interface ExamenCarteIData {
  presenceSyndrome: YesNoNR;
  antecedentSyndrome: YesNoNR;
  souvenirsintrusive: YesNoNR;
  cauchemars: YesNoNR;
  flashbacks: YesNoNR;
  detresseRappelTraumatisme: YesNoNR;
  evitementPenseesTraumatisme: YesNoNR;
  evitementLieuxPersonnes: YesNoNR;
  amnesieCertainsAspects: YesNoNR;
  croyancesNegativesSoi: YesNoNR;
  culpabilitePersistante: YesNoNR;
  emoussementAffectif: YesNoNR;
  detachement: YesNoNR;
  hypervigilance: YesNoNR;
  sursautsExageres: YesNoNR;
  irritabilite: YesNoNR;
  troublesDuSommeil: YesNoNR;
}

export interface ExamenCarteJData {
  presenceSyndrome: YesNoNR;
  antecedentSyndrome: YesNoNR;
  presenceIdeesDelirantes: YesNoNR;
  adhesionTotale: YesNoNR;
  adhesionPartielle: YesNoNR;
  persecution: YesNoNR;
  prejudice: YesNoNR;
  reference: YesNoNR;
  influence: YesNoNR;
  megalomanie: YesNoNR;
  mystique: YesNoNR;
  erotomaniaque: YesNoNR;
  jalousie: YesNoNR;
  hypocondriaque: YesNoNR;
  ruine: YesNoNR;
  culpabilite: YesNoNR;
  nihilismeCotard: YesNoNR;
  mecanismeInterpretatifs: YesNoNR;
  mecanismeImaginatifs: YesNoNR;
  mecanismeHallucinatoires: YesNoNR;
  mecanismeIntuitifs: YesNoNR;
  systematise: YesNoNR;
  nonSystematise: YesNoNR;
  hermetique: YesNoNR;
  enSecteur: YesNoNR;
  envahissant: YesNoNR;
  angoisse: YesNoNR;
  perplexite: YesNoNR;
  passageActeHeteroAgressif: YesNoNR;
  passageActeAutoAgressif: YesNoNR;
}

export interface ExamenCarteKData {
  presenceSyndrome: YesNoNR;
  antecedentSyndrome: YesNoNR;
  hallucinationsAcousticoVerbales: YesNoNR;
  voixCommentantActes: YesNoNR;
  voixDialoguantEntreElles: YesNoNR;
  voixImperatives: YesNoNR;
  hallucinationsVisuelles: YesNoNR;
  hallucinationsOlfactives: YesNoNR;
  hallucinationsCenesthesiques: YesNoNR;
  illusions: YesNoNR;
}

export interface ExamenCarteLData {
  presenceSyndrome: YesNoNR;
  antecedentSyndrome: YesNoNR;
  discordanceIdeoAffective: YesNoNR;
  reactionsEmotionnellesInadaptees: YesNoNR;
  riresImmotives: YesNoNR;
  barrages: YesNoNR;
  fading: YesNoNR;
  diffluence: YesNoNR;
  bizarreriesComportementales: YesNoNR;
  manieres: YesNoNR;
  paramimies: YesNoNR;
  ambivalence: YesNoNR;
}

export interface ExamenCarteMData {
  presenceSyndrome: YesNoNR;
  antecedentSyndrome: YesNoNR;
  catalepsie: YesNoNR;
  flexibiliteCireuse: YesNoNR;
  negativisme: YesNoNR;
  stereotypiesMotrices: YesNoNR;
  stereotypiesVerbales: YesNoNR;
  echolalieEchopraxie: YesNoNR;
  stupeurCatatonique: YesNoNR;
  agitationCatatonique: YesNoNR;
}

export interface ExamenCarteNData {
  presenceSyndrome: YesNoNR;
  antecedentSyndrome: YesNoNR;
  emoussementAffectif: YesNoNR;
  aboulie: YesNoNR;
  apragmatisme: YesNoNR;
  retraitSocial: YesNoNR;
  alogie: YesNoNR;
  anhedonie: YesNoNR;
}

export interface ExamenCarteOData {
  presenceSyndrome: YesNoNR;
  antecedentSyndrome: YesNoNR;
  obnubilation: YesNoNR;
  fluctuations: YesNoNR;
  desorientationTemporoSpatiale: YesNoNR;
  amnesieAnterograde: YesNoNR;
  perplexiteAnxieuse: YesNoNR;
  onirisme: YesNoNR;
  debutAigu: YesNoNR;
}

export interface ExamenCarteOBisData {
  troubleUsageSubstancesPresent: YesNoNR;
  antecedentSyndrome: YesNoNR;
  symptomesEbriete: YesNoNR;
  symptomesSevrage: YesNoNR;
  modifPsychoComportementales: YesNoNR;
  foetorAlcoolique: YesNoNR;
  dysarthrie: YesNoNR;
  ataxieEquilibre: YesNoNR;
  tremblementsSubstances: YesNoNR;
  sueursSubstances: YesNoNR;
  signesDenutrition: YesNoNR;
}

export interface ExamenCartePData {
  presenceSyndrome: YesNoNR;
  oublisAMesure: YesNoNR;
  amnesieRetrograde: YesNoNR;
  troublesFonctionsExecutives: YesNoNR;
  troublesGnosiques: YesNoNR;
  troublesPraxiques: YesNoNR;
  aphasie: YesNoNR;
  manqueDuMot: YesNoNR;
  perteAutonomie: YesNoNR;
  evolutionProgressive: YesNoNR;
}

export interface ExamenCarteQData {
  presenceSyndrome: YesNoNR;
  antecedentSyndrome: YesNoNR;
  restrictionAlimentaire: YesNoNR;
  peurDeGrossir: YesNoNR;
  distorsionImageCorporelle: YesNoNR;
  amenorrhee: YesNoNR;
  accesBoulimiques: YesNoNR;
  conduitesCompensatoires: YesNoNR;
  hyperphagieBoulimique: YesNoNR;
}

export interface ExamenCarteRData {
  presenceSyndrome: YesNoNR;
  antecedentSyndrome: YesNoNR;
  diagnosticPose: YesNoNR;
  depuis: string;
  parMedecinGeneraliste: YesNoNR;
  parPsychiatre: YesNoNR;
  parPedopsychiatre: YesNoNR;
  parNeurologue: YesNoNR;
  difficulteMaintenirAttention: YesNoNR;
  distractibiliteImportante: YesNoNR;
  oublisFrequents: YesNoNR;
  difficulteOrganiserTaches: YesNoNR;
  evitementTachesEffortMental: YesNoNR;
  perteFrequenteObjets: YesNoNR;
  difficulteSuivreInstructions: YesNoNR;
  agitationMotrice: YesNoNR;
  difficulteResterAssis: YesNoNR;
  sentimentAgitationInterieure: YesNoNR;
  difficulteSeDetendre: YesNoNR;
  loquaciteExcessive: YesNoNR;
  interruptionDesAutres: YesNoNR;
  impulsiviteDecisions: YesNoNR;
  difficulteAttendreSonTour: YesNoNR;
  retentissementProfessionnel: YesNoNR;
  retentissementSocial: YesNoNR;
  retentissementFamilial: YesNoNR;
  retentissementJudiciaire: YesNoNR;
  traitementMedicamenteux: YesNoNR;
  traitementPreciser: string;
  observance: Observance;
  suiviPsychologique: YesNoNR;
  amenagementsProfessionnelsScolaires: YesNoNR;
}

export type SexeVictimes = 'Filles' | 'Garcons' | 'Les deux' | 'NR';
export type FrequenceFantasmes = 'Occasionnels' | 'Frequents' | 'Permanents' | 'NR';
export type EfficaciteNiveau = 'Bonne' | 'Partielle' | 'Absente' | 'NR';
export type EvolutionParaphilie = 'Stable' | 'Aggravation' | 'Diminution' | 'NR';
export type CapaciteControle = 'Bonne' | 'Partielle' | 'Faible' | 'Absente' | 'NR';

export const SEXE_VICTIMES_OPTIONS = ['Filles', 'Garcons', 'Les deux', 'NR'] as const;
export const FREQUENCE_FANTASMES_OPTIONS = ['Occasionnels', 'Frequents', 'Permanents', 'NR'] as const;
export const EFFICACITE_OPTIONS = ['Bonne', 'Partielle', 'Absente', 'NR'] as const;
export const EVOLUTION_PARAPHILIE_OPTIONS = ['Stable', 'Aggravation', 'Diminution', 'NR'] as const;
export const CAPACITE_CONTROLE_OPTIONS = ['Bonne', 'Partielle', 'Faible', 'Absente', 'NR'] as const;

export interface ExamenCarteSData {
  presenceSyndrome: YesNoNR;
  antecedentSyndrome: YesNoNR;
  rapportesParSujet: YesNoNR;
  reconnus: YesNoNR;
  nies: YesNoNR;
  pedophilieAttraction: YesNoNR;
  pedophilieAgeVictimes: string;
  pedophilieSexeVictimes: SexeVictimes;
  pedophiliePassagesActe: YesNoNR;
  pedophilieExclusif: YesNoNR;
  pedophilieNonExclusif: YesNoNR;
  hebephilieAttraction: YesNoNR;
  exhibitionnismeExposition: YesNoNR;
  exhibitionnismeFrequence: string;
  exhibitionnismeContexte: string;
  voyeurismeObservation: YesNoNR;
  voyeurismeFrequence: string;
  frotteurismeContact: YesNoNR;
  sadismeExcitation: YesNoNR;
  sadismeFantasmes: YesNoNR;
  sadismePassagesActe: YesNoNR;
  masochismeExcitation: YesNoNR;
  fetichismeObjets: YesNoNR;
  fetichismeTypeObjet: string;
  transvestismeExcitation: YesNoNR;
  zoophilieActivite: YesNoNR;
  necrophilieAttraction: YesNoNR;
  autresParaphiliesPreciser: string;
  fantasmesPresentDepuis: string;
  fantasmesFrequence: FrequenceFantasmes;
  fantasmesDetresse: YesNoNR;
  fantasmesTentativesControle: YesNoNR;
  fantasmesEfficacite: EfficaciteNiveau;
  passageActeAntecedents: YesNoNR;
  passageActeNombreEstime: string;
  passageActeAgePremier: string;
  passageActeEvolution: EvolutionParaphilie;
  passageActeContexte: string;
  pornoReguliere: YesNoNR;
  pornoFrequence: string;
  pornoLegaleStandard: YesNoNR;
  pornoImpliquantMineurs: YesNoNR;
  pornoViolente: YesNoNR;
  pornoAutre: YesNoNR;
  pornoEscalade: YesNoNR;
  connaissanceCaractereIllegal: YesNoNR;
  comprehensionPrejudiceVictimes: YesNoNR;
  minimisationInterdit: YesNoNR;
  deniInterdit: YesNoNR;
  controleCapacite: CapaciteControle;
  controleFacteursDeclenchants: string;
  controleStrategiesEvitement: string;
  rationalisations: YesNoNR;
  minimisationDistorsion: YesNoNR;
  attributionResponsabiliteVictime: YesNoNR;
  deniGravite: YesNoNR;
  empathiePresente: YesNoNR;
  empathiePartielle: YesNoNR;
  empathieAbsence: YesNoNR;
  demandeSpontanee: YesNoNR;
  acceptationPriseEnCharge: YesNoNR;
  refusSoins: YesNoNR;
  ambivalence: YesNoNR;
  suiviSexologique: YesNoNR;
  tcc: YesNoNR;
  traitementAntiAndrogene: YesNoNR;
  antecedentsObservance: Observance;
  antecedentsEfficacite: EfficaciteNiveau;
}

export interface ExamenCarteTData {
  presenceSyndrome: YesNoNR;
  antecedentSyndrome: YesNoNR;
  troubleSelectionne: string;
  criteresCoches: string[];
  fonctionnementPervers: boolean;
  criteresPervers: string[];
  elementsCliniquesComplementaires: string;
}

export interface ExamenCarteUData {
  presenceSyndrome: YesNoNR;
  antecedentSyndrome: YesNoNR;
  passagesActeImpulsifs: YesNoNR;
  difficulteControlerColere: YesNoNR;
  intoleranceFrustration: YesNoNR;
  antecedentsViolence: YesNoNR;
  violenceVerbale: YesNoNR;
  violencePhysique: YesNoNR;
  violenceInstrumentale: YesNoNR;
  violenceReactionnelle: YesNoNR;
  dangerositePourAutrui: YesNoNR;
  dangerositePourSoi: YesNoNR;
}

export interface ExamenCarteVData {
  presenceSyndrome: YesNoNR;
  antecedentSyndrome: YesNoNR;
  suspicionSimulation: YesNoNR;
  exagerationSymptomes: YesNoNR;
  productionSymptomesAbsurdes: YesNoNR;
  reticenceOppositionCalculee: YesNoNR;
  incoherenceObservationPlaintes: YesNoNR;
}

export interface ExamenCarteWData {
  presenceSyndrome: YesNoNR;
  antecedentSyndrome: YesNoNR;
  diagnosticOuSuspicionTSA: YesNoNR;
  troublesInteractionsSociales: YesNoNR;
  interetsRestreintsStereotypies: YesNoNR;
  particularitesSensorielles: YesNoNR;
}

export interface ExamenCarteXData {
  presenceSyndrome: YesNoNR;
  antecedentSyndrome: YesNoNR;
  troubleSymptomatologieSomatique: YesNoNR;
  crainteExcessiveMaladie: YesNoNR;
  troubleConversion: YesNoNR;
  troubleFacticePathomimie: YesNoNR;
  syndromeMunchhausen: YesNoNR;
  syndromeMunchhausenProcuration: YesNoNR;
  facteursPsychologiquesAggravants: YesNoNR;
}

export interface ExamenPsychiatriqueData {
  carteA: ExamenCarteAData;
  carteB: ExamenCarteBData;
  carteC: ExamenCarteCData;
  carteD: ExamenCarteDData;
  carteE: ExamenCarteEData;
  carteF: ExamenCarteFData;
  carteG: ExamenCarteGData;
  carteH: ExamenCarteHData;
  carteI: ExamenCarteIData;
  carteJ: ExamenCarteJData;
  carteK: ExamenCarteKData;
  carteL: ExamenCarteLData;
  carteM: ExamenCarteMData;
  carteN: ExamenCarteNData;
  carteO: ExamenCarteOData;
  carteOBis: ExamenCarteOBisData;
  carteP: ExamenCartePData;
  carteQ: ExamenCarteQData;
  carteR: ExamenCarteRData;
  carteS: ExamenCarteSData;
  carteT: ExamenCarteTData;
  carteU: ExamenCarteUData;
  carteV: ExamenCarteVData;
  carteW: ExamenCarteWData;
  carteX: ExamenCarteXData;
}

export const INITIAL_EXAMEN: ExamenPsychiatriqueData = {
  carteA: {
    cooperant: NR, reticent: NR, mutique: NR, hostile: NR, mefiant: NR,
    tenueVestimentaireAdaptee: NR, hygieneCorrecte: NR, negligence: NR,
    contactConserve: NR, contactFroid: NR, contactFuyant: NR, contactAdhesif: NR,
  },
  carteB: {
    vigilanceNormale: NR, obnubilation: NR, somnolence: NR, stupeur: NR,
    orienteTemps: NR, orienteEspace: NR, orientePersonne: NR,
    attentionPreservee: NR, distractibilite: NR, fatigabiliteAttentionnelle: NR,
    memoireImmediatePreservee: NR, memoireRecentePreservee: NR, memoireAnciennePreservee: NR,
    amnesieFaits: NR, faussesReconnaissances: NR, fabulations: NR,
    niveauIntellectuelEstime: 'NR', retardMentalSuspecte: NR,
    aptitudesInsight: NR, critiqueConservee: NR, anosognosie: NR,
  },
  carteC: {
    reconnaissanceEmotionsFaciales: NR, comprehensionEtatMentalAutrui: NR,
    difficultesPdvAutrui: NR, difficultesSousEntendus: NR, interpretationsLitterales: NR,
    comprehensionReglesImplicites: NR, difficultesBehaviorContextSocial: NR,
    interpretationsPersecut: NR, naivete: NR,
    empathieCognitive: 'NR', empathieEmotionnelle: 'NR',
    comportementAdapte: NR, inhibitionMarquee: NR, intrusivite: NR,
    difficulteDistanceInterpersonnelle: NR, retentissementVieFamiliale: NR,
    retentissementVieProfessionnelle: NR, retentissementRelationsAffectives: NR,
  },
  carteD: {
    discoursCohérent: NR, discoursLogique: NR, proposAdaptes: NR, mythomanie: NR,
    mensongesUtilitaires: NR, debitNormal: NR, debitRalenti: NR, debitAccelere: NR,
    logorrhee: NR, barrages: NR, fading: NR, coqALane: NR, incoherence: NR,
    schizophasie: NR, perseverations: NR, tangentialite: NR, prolixite: NR,
    neologismesPresents: NR,
  },
  carteE: {
    presenceSyndrome: NR, antecedentSyndrome: NR, tristesseHumeur: NR, anhedonie: NR, perteInteret: NR, emoussementAffectif: NR,
    douleurMoralePresente: NR, douleurMoraleIntense: NR, culpabilite: NR,
    sentimentIndignite: NR, devalorisation: NR, sentimentIncapacite: NR,
    autoAccusations: NR, pessimisme: NR, desespoir: NR, ideesMort: NR,
    ideesSuicidaires: NR, scenarioSuicidaire: NR, intentionSuicidaire: NR,
    risqueSuicidaireImmédiat: NR, troublesSommeil: NR, insomniesEndormissement: NR,
    insomnieMilieuNuit: NR, reveilPrecoce: NR, hypersomnie: NR, troublesAppetit: NR,
    anorexie: NR, hyperphagie: NR, variationPonderale: NR, asthenie: NR,
    perteEnergie: NR, troublesLibido: NR, bradypsychie: NR, bradykinesie: NR,
    hypomimie: NR, clinophilie: NR, aggravationMatinale: NR,
  },
  carteF: {
    presenceSyndrome: NR, antecedentSyndrome: NR, exaltationHumeur: NR, euphorie: NR, irritabilite: NR, labilitieEmotionnelle: NR,
    agitationPsychomotrice: NR, hyperactivite: NR, desinhibition: NR,
    familiariteExcessive: NR, tachypsychie: NR, fuiteIdees: NR, logorrhee: NR,
    coqALane: NR, megalomanie: NR, projetsIrrealistes: NR, suresTimationSoi: NR,
    conduitesARisque: NR, achatsInconsideres: NR, desinhibitionSexuelle: NR,
    ideesDelirantes: NR, hallucinations: NR,
  },
  carteG: {
    presenceSyndrome: NR, antecedentSyndrome: NR, inquietudeExcessive: NR, ruminationsAnxieuses: NR, peurSansObjet: NR,
    anticipationAnxieuse: NR, sentimentDangerImminent: NR, palpitations: NR,
    sueurs: NR, tremblements: NR, oppressionThoracique: NR, dyspnee: NR,
    nausees: NR, paresthesies: NR, vertiges: NR, antecedentAttaquesPanique: NR,
    attaquesPaniqueRecurrentes: NR, peurMourir: NR, peurDevenirFou: NR,
    agoraphobie: NR, phobieSociale: NR, phobiesSpecifiques: NR,
    conduitesEvitement: NR, retentissementFonctionnel: NR,
  },
  carteH: {
    presenceSyndrome: NR, antecedentSyndrome: NR, penseesObsedantes: NR, ideesIntrusives: NR, caractereEgoDystonique: NR,
    lutteAnxieuse: NR, rituelsCompulsifs: NR, verifications: NR, lavage: NR,
    rangement: NR, comptage: NR, souffrancePsychique: NR, retentissementFonctionnel: NR,
  },
  carteI: {
    presenceSyndrome: NR, antecedentSyndrome: NR, souvenirsintrusive: NR, cauchemars: NR, flashbacks: NR, detresseRappelTraumatisme: NR,
    evitementPenseesTraumatisme: NR, evitementLieuxPersonnes: NR, amnesieCertainsAspects: NR,
    croyancesNegativesSoi: NR, culpabilitePersistante: NR, emoussementAffectif: NR,
    detachement: NR, hypervigilance: NR, sursautsExageres: NR, irritabilite: NR,
    troublesDuSommeil: NR,
  },
  carteJ: {
    presenceSyndrome: NR, antecedentSyndrome: NR, presenceIdeesDelirantes: NR, adhesionTotale: NR, adhesionPartielle: NR,
    persecution: NR, prejudice: NR, reference: NR, influence: NR, megalomanie: NR,
    mystique: NR, erotomaniaque: NR, jalousie: NR, hypocondriaque: NR,
    ruine: NR, culpabilite: NR, nihilismeCotard: NR,
    mecanismeInterpretatifs: NR, mecanismeImaginatifs: NR,
    mecanismeHallucinatoires: NR, mecanismeIntuitifs: NR,
    systematise: NR, nonSystematise: NR, hermetique: NR,
    enSecteur: NR, envahissant: NR,
    angoisse: NR, perplexite: NR,
    passageActeHeteroAgressif: NR, passageActeAutoAgressif: NR,
  },
  carteK: {
    presenceSyndrome: NR, antecedentSyndrome: NR, hallucinationsAcousticoVerbales: NR, voixCommentantActes: NR,
    voixDialoguantEntreElles: NR, voixImperatives: NR,
    hallucinationsVisuelles: NR, hallucinationsOlfactives: NR,
    hallucinationsCenesthesiques: NR, illusions: NR,
  },
  carteL: {
    presenceSyndrome: NR, antecedentSyndrome: NR, discordanceIdeoAffective: NR, reactionsEmotionnellesInadaptees: NR,
    riresImmotives: NR, barrages: NR, fading: NR, diffluence: NR,
    bizarreriesComportementales: NR, manieres: NR, paramimies: NR, ambivalence: NR,
  },
  carteM: {
    presenceSyndrome: NR, antecedentSyndrome: NR, catalepsie: NR, flexibiliteCireuse: NR, negativisme: NR,
    stereotypiesMotrices: NR, stereotypiesVerbales: NR,
    echolalieEchopraxie: NR, stupeurCatatonique: NR, agitationCatatonique: NR,
  },
  carteN: {
    presenceSyndrome: NR, antecedentSyndrome: NR, emoussementAffectif: NR, aboulie: NR, apragmatisme: NR,
    retraitSocial: NR, alogie: NR, anhedonie: NR,
  },
  carteO: {
    presenceSyndrome: NR, antecedentSyndrome: NR, obnubilation: NR, fluctuations: NR, desorientationTemporoSpatiale: NR,
    amnesieAnterograde: NR, perplexiteAnxieuse: NR, onirisme: NR, debutAigu: NR,
  },
  carteOBis: {
    troubleUsageSubstancesPresent: NR, antecedentSyndrome: NR, symptomesEbriete: NR, symptomesSevrage: NR,
    modifPsychoComportementales: NR, foetorAlcoolique: NR, dysarthrie: NR,
    ataxieEquilibre: NR, tremblementsSubstances: NR, sueursSubstances: NR,
    signesDenutrition: NR,
  },
  carteP: {
    presenceSyndrome: NR, oublisAMesure: NR, amnesieRetrograde: NR, troublesFonctionsExecutives: NR,
    troublesGnosiques: NR, troublesPraxiques: NR, aphasie: NR,
    manqueDuMot: NR, perteAutonomie: NR, evolutionProgressive: NR,
  },
  carteQ: {
    presenceSyndrome: NR, antecedentSyndrome: NR, restrictionAlimentaire: NR, peurDeGrossir: NR, distorsionImageCorporelle: NR,
    amenorrhee: NR, accesBoulimiques: NR, conduitesCompensatoires: NR,
    hyperphagieBoulimique: NR,
  },
  carteR: {
    presenceSyndrome: NR, antecedentSyndrome: NR, diagnosticPose: NR, depuis: '', parMedecinGeneraliste: NR, parPsychiatre: NR,
    parPedopsychiatre: NR, parNeurologue: NR,
    difficulteMaintenirAttention: NR, distractibiliteImportante: NR, oublisFrequents: NR,
    difficulteOrganiserTaches: NR, evitementTachesEffortMental: NR,
    perteFrequenteObjets: NR, difficulteSuivreInstructions: NR,
    agitationMotrice: NR, difficulteResterAssis: NR, sentimentAgitationInterieure: NR,
    difficulteSeDetendre: NR, loquaciteExcessive: NR, interruptionDesAutres: NR,
    impulsiviteDecisions: NR, difficulteAttendreSonTour: NR,
    retentissementProfessionnel: NR, retentissementSocial: NR,
    retentissementFamilial: NR, retentissementJudiciaire: NR,
    traitementMedicamenteux: NR, traitementPreciser: '', observance: 'NR',
    suiviPsychologique: NR, amenagementsProfessionnelsScolaires: NR,
  },
  carteS: {
    presenceSyndrome: NR, antecedentSyndrome: NR, rapportesParSujet: NR, reconnus: NR, nies: NR,
    pedophilieAttraction: NR, pedophilieAgeVictimes: '', pedophilieSexeVictimes: 'NR',
    pedophiliePassagesActe: NR, pedophilieExclusif: NR, pedophilieNonExclusif: NR,
    hebephilieAttraction: NR,
    exhibitionnismeExposition: NR, exhibitionnismeFrequence: '', exhibitionnismeContexte: '',
    voyeurismeObservation: NR, voyeurismeFrequence: '',
    frotteurismeContact: NR,
    sadismeExcitation: NR, sadismeFantasmes: NR, sadismePassagesActe: NR,
    masochismeExcitation: NR,
    fetichismeObjets: NR, fetichismeTypeObjet: '',
    transvestismeExcitation: NR, zoophilieActivite: NR, necrophilieAttraction: NR,
    autresParaphiliesPreciser: '',
    fantasmesPresentDepuis: '', fantasmesFrequence: 'NR', fantasmesDetresse: NR,
    fantasmesTentativesControle: NR, fantasmesEfficacite: 'NR',
    passageActeAntecedents: NR, passageActeNombreEstime: '', passageActeAgePremier: '',
    passageActeEvolution: 'NR', passageActeContexte: '',
    pornoReguliere: NR, pornoFrequence: '', pornoLegaleStandard: NR,
    pornoImpliquantMineurs: NR, pornoViolente: NR, pornoAutre: NR, pornoEscalade: NR,
    connaissanceCaractereIllegal: NR, comprehensionPrejudiceVictimes: NR,
    minimisationInterdit: NR, deniInterdit: NR,
    controleCapacite: 'NR', controleFacteursDeclenchants: '', controleStrategiesEvitement: '',
    rationalisations: NR, minimisationDistorsion: NR,
    attributionResponsabiliteVictime: NR, deniGravite: NR,
    empathiePresente: NR, empathiePartielle: NR, empathieAbsence: NR,
    demandeSpontanee: NR, acceptationPriseEnCharge: NR, refusSoins: NR, ambivalence: NR,
    suiviSexologique: NR, tcc: NR, traitementAntiAndrogene: NR,
    antecedentsObservance: 'NR', antecedentsEfficacite: 'NR',
  },
  carteT: {
    presenceSyndrome: NR,
    antecedentSyndrome: NR,
    troubleSelectionne: '',
    criteresCoches: [],
    fonctionnementPervers: false,
    criteresPervers: [],
    elementsCliniquesComplementaires: '',
  },
  carteU: {
    presenceSyndrome: NR, antecedentSyndrome: NR, passagesActeImpulsifs: NR, difficulteControlerColere: NR, intoleranceFrustration: NR,
    antecedentsViolence: NR, violenceVerbale: NR, violencePhysique: NR,
    violenceInstrumentale: NR, violenceReactionnelle: NR,
    dangerositePourAutrui: NR, dangerositePourSoi: NR,
  },
  carteV: {
    presenceSyndrome: NR, antecedentSyndrome: NR, suspicionSimulation: NR, exagerationSymptomes: NR, productionSymptomesAbsurdes: NR,
    reticenceOppositionCalculee: NR, incoherenceObservationPlaintes: NR,
  },
  carteW: {
    presenceSyndrome: NR, antecedentSyndrome: NR, diagnosticOuSuspicionTSA: NR, troublesInteractionsSociales: NR,
    interetsRestreintsStereotypies: NR, particularitesSensorielles: NR,
  },
  carteX: {
    presenceSyndrome: NR, antecedentSyndrome: NR, troubleSymptomatologieSomatique: NR, crainteExcessiveMaladie: NR,
    troubleConversion: NR, troubleFacticePathomimie: NR, syndromeMunchhausen: NR,
    syndromeMunchhausenProcuration: NR, facteursPsychologiquesAggravants: NR,
  },
};
