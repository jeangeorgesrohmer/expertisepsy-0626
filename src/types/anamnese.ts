export type YesNoNR = 'Oui' | 'Non' | 'NR';
export type Observance = 'Bonne' | 'Moyenne' | 'Mauvaise' | 'NR';

export interface CarteAData {
  pathologieCardiovasculaire: YesNoNR;
  pathologieNeurologique: YesNoNR;
  pathologieEndocrinienne: YesNoNR;
  pathologieInfectieuseChronique: YesNoNR;
  cancer: YesNoNR;
  traumatismeCranien: YesNoNR;
  autresMedicauxPreciser: string;
  deficitVisuel: YesNoNR;
  deficitAuditif: YesNoNR;
  aucunTraitementMedicamenteux: YesNoNR;
  traitementMedicamenteuxPreciser: string;
}

export interface CarteBData {
  jamaisHospitalise: YesNoNR;
  hospitalisationLibre: YesNoNR;
  hospitalisationSousContrainte: YesNoNR;
  hospitalisationEnCours: YesNoNR;
  nombreHospitalisations: string;
  datesHospitalisations: string;
  suiviPsychiatriqueEnCours: YesNoNR;
  suiviPsychologiqueEnCours: YesNoNR;
  suiviAnterieur: YesNoNR;
  jamaisSuivi: YesNoNR;
  antidepresseur: YesNoNR;
  anxiolytique: YesNoNR;
  hypnotique: YesNoNR;
  neuroleptique: YesNoNR;
  thymoregulateur: YesNoNR;
  antiAndrogene: YesNoNR;
  observanceTraitement: Observance;
  autresTraitementsPreciser: string;
  tentativeSuicide: YesNoNR;
  nombreTS: string;
  datesTS: string;
  moyensUtilises: string;
  scarifications: YesNoNR;
  automutilations: YesNoNR;
  ruptureSoinsAvantFaits: YesNoNR;
}

export interface CarteCData {
  alcoolNonConsommateur: YesNoNR;
  alcoolConsommationOccasionnelle: YesNoNR;
  alcoolConsommationReguliere: YesNoNR;
  alcoolConsommationQuotidienne: YesNoNR;
  alcoolQuantiteEstimeeJour: string;
  alcooloDependance: YesNoNR;
  antecedentsSevrage: YesNoNR;
  antecedentsDeliriumTremens: YesNoNR;
  alcoolAntecedents: YesNoNR;
  alcoolAntecedentsDuree: string;
  alcoolAntecedentsType: string;
  cannabis: YesNoNR;
  cannabisFrequence: string;
  cannabisAntecedents: YesNoNR;
  cannabisAntecedentsDuree: string;
  cannabisAntecedentsType: string;
  cocaine: YesNoNR;
  cocaineFrequence: string;
  cocaineAntecedents: YesNoNR;
  cocaineAntecedentsDuree: string;
  cocaineAntecedentsType: string;
  heroine: YesNoNR;
  heroineFrequence: string;
  heroineAntecedents: YesNoNR;
  heroineAntecedentsDuree: string;
  heroineAntecedentsType: string;
  amphetamines: YesNoNR;
  amphetaminesFrequence: string;
  amphetaminesAntecedents: YesNoNR;
  amphetaminesAntecedentsDuree: string;
  amphetaminesAntecedentsType: string;
  mdmaEcstasy: YesNoNR;
  mdmaEcstasyFrequence: string;
  mdmaEcstasyAntecedents: YesNoNR;
  mdmaEcstasyAntecedentsDuree: string;
  mdmaEcstasyAntecedentsType: string;
  autresDrogues: YesNoNR;
  autresDroguesPreciser: string;
  autresDroguesAntecedents: YesNoNR;
  autresDroguesAntecedentsDuree: string;
  autresDroguesAntecedentsType: string;
  methadone: YesNoNR;
  buprenorphine: YesNoNR;
  observanceSubstitution: Observance;
  nonFumeur: YesNoNR;
  fumeur: YesNoNR;
  fumeurQuantiteJour: string;
  fumeurAntecedents: YesNoNR;
  fumeurAntecedentsDuree: string;
  fumeurAntecedentsType: string;
  jeuPathologique: YesNoNR;
  achatsCompulsifs: YesNoNR;
  addictionEcransJeuxVideo: YesNoNR;
}

export interface CarteDData {
  aucunAntecedentJudiciaire: YesNoNR;
  condamnationsAnterieures: YesNoNR;
  condamnationsNature: string;
  incarcerationAnterieure: YesNoNR;
  incarcerationNombre: string;
  incarcerationDuree: string;
  agePremierContactJustice: string;
  antecedentsInfractionsSexuelles: YesNoNR;
  infractionsSexuellesNature: string;
  inscriptionFIJAIS: YesNoNR;
  proceduresEnCours: YesNoNR;
  proceduresEnCoursNature: string;
}

export interface CarteEData {
  mereEnVie: YesNoNR;
  pereEnVie: YesNoNR;
  vieCommune: YesNoNR;
  fratrie: YesNoNR;
  fratrieNombre: string;
  rangFratrie: string;
  pathologiePsychiatriquesFamille: YesNoNR;
  suicidesFamille: YesNoNR;
  alcoolismeFamilial: YesNoNR;
  violencesPhysiques: YesNoNR;
  violencesPsychologiques: YesNoNR;
  violencesSexuelles: YesNoNR;
  negligence: YesNoNR;
  carenceAffectiveMajeure: YesNoNR;
  carenceEducativePrecoce: YesNoNR;
  placementEnfance: YesNoNR;
  placementDuree: string;
}

export interface CarteFData {
  scolariteNormale: YesNoNR;
  redoublements: YesNoNR;
  redoublementsNombre: string;
  orientationSpecialisee: YesNoNR;
  diplomeObtenu: string;
  troublesDys: YesNoNR;
  difficultesApprentissages: YesNoNR;
  troublesComportementEcole: YesNoNR;
  descolarisation: YesNoNR;
  victimeHarcelementScolaire: YesNoNR;
}

export interface CarteGData {
  enActivite: YesNoNR;
  auChomage: YesNoNR;
  enArretMaladie: YesNoNR;
  invalidite: YesNoNR;
  retraite: YesNoNR;
  profession: string;
  stabiliteProfessionnelle: YesNoNR;
  changementsFréquentsEmploi: YesNoNR;
  conflitsProfessionnels: YesNoNR;
}

export interface CarteHData {
  celibataire: YesNoNR;
  enCouple: YesNoNR;
  marie: YesNoNR;
  divorce: YesNoNR;
  separe: YesNoNR;
  veuf: YesNoNR;
  enfants: YesNoNR;
  enfantsNombre: string;
  contactRegulierEnfants: YesNoNR;
  mesuresJudiciairesEnfants: YesNoNR;
  domicileStable: YesNoNR;
  sansDomicileFixe: YesNoNR;
  heberge: YesNoNR;
  enInstitution: YesNoNR;
  isolementSocial: YesNoNR;
  relationsAmicales: YesNoNR;
  relationsFamilialesPreservees: YesNoNR;
  tutelle: YesNoNR;
  curatelle: YesNoNR;
  curatelleSimple: YesNoNR;
  curatelleRenforcee: YesNoNR;
  sauvegardeDejustice: YesNoNR;
  habilitationFamiliale: YesNoNR;
  mandatProtectionFuture: YesNoNR;
  mesureProtection: YesNoNR;
  dateMiseEnPlace: string;
  membreFamille: YesNoNR;
  mandataireJudiciaire: YesNoNR;
  preciserTuteurCurateur: string;
  dateRenouvellementPrevue: string;
}

export interface CarteIData {
  educationSexuelleRecue: YesNoNR;
  agePremieresRelationsSexuelles: string;
  relationsSexuellesConsenties: YesNoNR;
  heterosexuelle: YesNoNR;
  homosexuelle: YesNoNR;
  bisexuelle: YesNoNR;
  autresOrientations: YesNoNR;
  activiteSexuelle: YesNoNR;
  satisfactionSexuelle: YesNoNR;
  troublesSexuels: YesNoNR;
  troublesSexuelsPreciser: string;
  victimisationEnfance: YesNoNR;
  victimisationAdulte: YesNoNR;
  victimisationPreciser: string;
}

export interface AnamneseData {
  carteA: CarteAData;
  carteB: CarteBData;
  carteC: CarteCData;
  carteD: CarteDData;
  carteE: CarteEData;
  carteF: CarteFData;
  carteG: CarteGData;
  carteH: CarteHData;
  carteI: CarteIData;
}

const NR: YesNoNR = 'NR';
const NR4: Observance = 'NR';

export const INITIAL_ANAMNESE: AnamneseData = {
  carteA: {
    pathologieCardiovasculaire: NR, pathologieNeurologique: NR, pathologieEndocrinienne: NR,
    pathologieInfectieuseChronique: NR, cancer: NR, traumatismeCranien: NR,
    autresMedicauxPreciser: '', deficitVisuel: NR, deficitAuditif: NR,
    aucunTraitementMedicamenteux: NR, traitementMedicamenteuxPreciser: '',
  },
  carteB: {
    jamaisHospitalise: NR, hospitalisationLibre: NR, hospitalisationSousContrainte: NR,
    hospitalisationEnCours: NR, nombreHospitalisations: '', datesHospitalisations: '',
    suiviPsychiatriqueEnCours: NR, suiviPsychologiqueEnCours: NR, suiviAnterieur: NR,
    jamaisSuivi: NR, antidepresseur: NR, anxiolytique: NR, hypnotique: NR, neuroleptique: NR,
    thymoregulateur: NR, antiAndrogene: NR, observanceTraitement: NR4,
    autresTraitementsPreciser: '', tentativeSuicide: NR, nombreTS: '', datesTS: '',
    moyensUtilises: '', scarifications: NR, automutilations: NR,
    ruptureSoinsAvantFaits: NR,
  },
  carteC: {
    alcoolNonConsommateur: NR, alcoolConsommationOccasionnelle: NR, alcoolConsommationReguliere: NR,
    alcoolConsommationQuotidienne: NR, alcoolQuantiteEstimeeJour: '', alcooloDependance: NR,
    antecedentsSevrage: NR, antecedentsDeliriumTremens: NR,
    alcoolAntecedents: NR, alcoolAntecedentsDuree: '', alcoolAntecedentsType: '',
    cannabis: NR, cannabisFrequence: '',
    cannabisAntecedents: NR, cannabisAntecedentsDuree: '', cannabisAntecedentsType: '',
    cocaine: NR, cocaineFrequence: '',
    cocaineAntecedents: NR, cocaineAntecedentsDuree: '', cocaineAntecedentsType: '',
    heroine: NR, heroineFrequence: '',
    heroineAntecedents: NR, heroineAntecedentsDuree: '', heroineAntecedentsType: '',
    amphetamines: NR, amphetaminesFrequence: '',
    amphetaminesAntecedents: NR, amphetaminesAntecedentsDuree: '', amphetaminesAntecedentsType: '',
    mdmaEcstasy: NR, mdmaEcstasyFrequence: '',
    mdmaEcstasyAntecedents: NR, mdmaEcstasyAntecedentsDuree: '', mdmaEcstasyAntecedentsType: '',
    autresDrogues: NR, autresDroguesPreciser: '',
    autresDroguesAntecedents: NR, autresDroguesAntecedentsDuree: '', autresDroguesAntecedentsType: '',
    methadone: NR, buprenorphine: NR, observanceSubstitution: NR4,
    nonFumeur: NR, fumeur: NR, fumeurQuantiteJour: '',
    fumeurAntecedents: NR, fumeurAntecedentsDuree: '', fumeurAntecedentsType: '',
    jeuPathologique: NR, achatsCompulsifs: NR, addictionEcransJeuxVideo: NR,
  },
  carteD: {
    aucunAntecedentJudiciaire: NR, condamnationsAnterieures: NR, condamnationsNature: '',
    incarcerationAnterieure: NR, incarcerationNombre: '', incarcerationDuree: '',
    agePremierContactJustice: '', antecedentsInfractionsSexuelles: NR,
    infractionsSexuellesNature: '', inscriptionFIJAIS: NR, proceduresEnCours: NR,
    proceduresEnCoursNature: '',
  },
  carteE: {
    mereEnVie: NR, pereEnVie: NR, vieCommune: NR, fratrie: NR, fratrieNombre: '',
    rangFratrie: '', pathologiePsychiatriquesFamille: NR, suicidesFamille: NR,
    alcoolismeFamilial: NR, violencesPhysiques: NR, violencesPsychologiques: NR,
    violencesSexuelles: NR, negligence: NR,
    carenceAffectiveMajeure: NR, carenceEducativePrecoce: NR,
    placementEnfance: NR, placementDuree: '',
  },
  carteF: {
    scolariteNormale: NR, redoublements: NR, redoublementsNombre: '', orientationSpecialisee: NR,
    diplomeObtenu: '', troublesDys: NR, difficultesApprentissages: NR,
    troublesComportementEcole: NR, descolarisation: NR, victimeHarcelementScolaire: NR,
  },
  carteG: {
    enActivite: NR, auChomage: NR, enArretMaladie: NR, invalidite: NR, retraite: NR,
    profession: '', stabiliteProfessionnelle: NR, changementsFréquentsEmploi: NR,
    conflitsProfessionnels: NR,
  },
  carteH: {
    celibataire: NR, enCouple: NR, marie: NR, divorce: NR, separe: NR, veuf: NR,
    enfants: NR, enfantsNombre: '', contactRegulierEnfants: NR, mesuresJudiciairesEnfants: NR,
    domicileStable: NR, sansDomicileFixe: NR, heberge: NR, enInstitution: NR,
    isolementSocial: NR, relationsAmicales: NR, relationsFamilialesPreservees: NR,
    tutelle: NR, curatelle: NR, curatelleSimple: NR, curatelleRenforcee: NR,
    sauvegardeDejustice: NR, habilitationFamiliale: NR, mandatProtectionFuture: NR,
    mesureProtection: NR, dateMiseEnPlace: '', membreFamille: NR, mandataireJudiciaire: NR,
    preciserTuteurCurateur: '', dateRenouvellementPrevue: '',
  },
  carteI: {
    educationSexuelleRecue: NR, agePremieresRelationsSexuelles: '', relationsSexuellesConsenties: NR,
    heterosexuelle: NR, homosexuelle: NR, bisexuelle: NR, autresOrientations: NR,
    activiteSexuelle: NR, satisfactionSexuelle: NR, troublesSexuels: NR,
    troublesSexuelsPreciser: '', victimisationEnfance: NR, victimisationAdulte: NR,
    victimisationPreciser: '',
  },
};
