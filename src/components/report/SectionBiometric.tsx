import type { BiometricData } from '../../types/biometricData';
import { SectionBlock } from './SectionBlock';

interface Props {
  data: BiometricData;
}

export default function SectionBiometric({ data }: Props) {
  const hasData =
    data.poids ||
    data.taille ||
    data.tensionArterielle ||
    data.frequenceCardiaque;

  if (!hasData) return null;

  const calculateIMC = (poids: string, taille: string): string => {
    const p = parseFloat(poids);
    const t = parseFloat(taille);
    if (!isNaN(p) && !isNaN(t) && t > 0) {
      const tailleM = t / 100;
      const imc = p / (tailleM * tailleM);
      return imc.toFixed(1);
    }
    return '';
  };

  const imc = calculateIMC(data.poids, data.taille);

  const items: string[] = [];

  if (data.poids) {
    items.push(`Poids : ${data.poids} kg`);
  }

  if (data.taille) {
    items.push(`Taille : ${data.taille} cm`);
  }

  if (imc) {
    items.push(`IMC : ${imc} kg/m²`);
  }

  if (data.tensionArterielle) {
    items.push(`Tension artérielle : ${data.tensionArterielle} mmHg`);
  }

  if (data.frequenceCardiaque) {
    items.push(`Fréquence cardiaque : ${data.frequenceCardiaque} bpm`);
  }

  return (
    <SectionBlock number="III bis" title="Constantes et données biométriques">
      {items.map((item, index) => (
        <p key={index} className="text-stone-700 leading-relaxed">
          {item}
        </p>
      ))}
    </SectionBlock>
  );
}
