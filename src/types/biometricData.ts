export interface BiometricData {
  poids: string;
  taille: string;
  tensionArterielle: string;
  frequenceCardiaque: string;
}

export const INITIAL_BIOMETRIC_DATA: BiometricData = {
  poids: '',
  taille: '',
  tensionArterielle: '',
  frequenceCardiaque: '',
};
