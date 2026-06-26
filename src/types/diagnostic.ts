export interface DiagnosticPrincipal {
  absencePathologie: boolean;
  troubleDepressif: boolean;
  troubleDepressifPrecision: string;
  troubleBipolaire: boolean;
  schizophrenie: boolean;
  troubleDelirant: boolean;
  troubleSchizoAffectif: boolean;
  troubleAdaptation: boolean;
  etatStressPostTraumatique: boolean;
  troubleAnxieuxGeneralise: boolean;
  troublePanique: boolean;
  toc: boolean;
  troubleUsageAlcool: boolean;
  troubleUsageSubstances: boolean;
  troublePersonnalite: boolean;
  troublePersonnaliteType: string;
  troubleParaphilique: boolean;
  troubleParaphiliqueType: string;
  retardMental: boolean;
  retardMentalDegre: string;
  syndromeDementiel: boolean;
  autre: boolean;
  autrePrecision: string;
}

export interface DiagnosticData {
  principal: DiagnosticPrincipal;
  diagnosticsAssocies: string;
  comorbidites: string;
  elementsDeterminants: string;
}

export const INITIAL_DIAGNOSTIC_PRINCIPAL: DiagnosticPrincipal = {
  absencePathologie: false,
  troubleDepressif: false,
  troubleDepressifPrecision: '',
  troubleBipolaire: false,
  schizophrenie: false,
  troubleDelirant: false,
  troubleSchizoAffectif: false,
  troubleAdaptation: false,
  etatStressPostTraumatique: false,
  troubleAnxieuxGeneralise: false,
  troublePanique: false,
  toc: false,
  troubleUsageAlcool: false,
  troubleUsageSubstances: false,
  troublePersonnalite: false,
  troublePersonnaliteType: '',
  troubleParaphilique: false,
  troubleParaphiliqueType: '',
  retardMental: false,
  retardMentalDegre: '',
  syndromeDementiel: false,
  autre: false,
  autrePrecision: '',
};

export const INITIAL_DIAGNOSTIC: DiagnosticData = {
  principal: INITIAL_DIAGNOSTIC_PRINCIPAL,
  diagnosticsAssocies: '',
  comorbidites: '',
  elementsDeterminants: '',
};
