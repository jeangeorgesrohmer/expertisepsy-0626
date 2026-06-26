import type { BiometricData as BiometricDataType } from '../../types/biometricData';
import type { CommentsData } from '../../types/commentaires';
import { SectionCard } from '../ui/FormRow';
import CommentField from '../ui/CommentField';
import { useMemo } from 'react';

interface Props {
  data: BiometricDataType;
  onChange: (data: BiometricDataType) => void;
  commentaires: CommentsData;
  onCommentairesChange: (c: CommentsData) => void;
}

function InputField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  unit,
  readOnly = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  unit?: string;
  readOnly?: boolean;
}) {
  return (
    <div className="py-2">
      <label className="block text-xs font-medium text-slate-500 mb-1.5">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type={type}
          className={`px-3 py-2 rounded-lg border border-slate-200 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors w-full sm:w-48 min-h-[2.75rem] ${
            readOnly ? 'bg-slate-50 cursor-not-allowed' : 'bg-white'
          }`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          readOnly={readOnly}
        />
        {unit && (
          <span className="text-sm text-slate-600 font-medium whitespace-nowrap">{unit}</span>
        )}
      </div>
    </div>
  );
}

export default function BiometricData({
  data,
  onChange,
  commentaires,
  onCommentairesChange,
}: Props) {
  const imc = useMemo(() => {
    const poids = parseFloat(data.poids);
    const taille = parseFloat(data.taille);

    if (!isNaN(poids) && !isNaN(taille) && taille > 0) {
      const tailleM = taille / 100;
      const calculatedIMC = poids / (tailleM * tailleM);
      return calculatedIMC.toFixed(1);
    }
    return '';
  }, [data.poids, data.taille]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">
          III bis. Constantes et données biométriques
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Données anthropométriques et constantes vitales.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <SectionCard title="Mesures et constantes">
            <div className="py-3 space-y-3">
              <InputField
                label="Poids"
                value={data.poids}
                onChange={(v) => onChange({ ...data, poids: v })}
                type="number"
                placeholder="0"
                unit="kg"
              />

              <InputField
                label="Taille"
                value={data.taille}
                onChange={(v) => onChange({ ...data, taille: v })}
                type="number"
                placeholder="0"
                unit="cm"
              />

              <InputField
                label="IMC (Indice de Masse Corporelle)"
                value={imc}
                onChange={() => {}}
                type="text"
                placeholder="Calculé automatiquement"
                unit="kg/m²"
                readOnly
              />

              <InputField
                label="Tension artérielle"
                value={data.tensionArterielle}
                onChange={(v) => onChange({ ...data, tensionArterielle: v })}
                type="text"
                placeholder="120/80"
                unit="mmHg"
              />

              <InputField
                label="Fréquence cardiaque"
                value={data.frequenceCardiaque}
                onChange={(v) => onChange({ ...data, frequenceCardiaque: v })}
                type="number"
                placeholder="0"
                unit="bpm"
              />
            </div>
          </SectionCard>
          <CommentField
            commentKey="biometric"
            commentaires={commentaires}
            onChange={onCommentairesChange}
          />
        </div>
      </div>
    </div>
  );
}
