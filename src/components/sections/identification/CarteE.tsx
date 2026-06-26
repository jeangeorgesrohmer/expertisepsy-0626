import { IdentCarteEData } from '../../../types';
import { YesNoNR } from '../../../types/anamnese';
import { DocumentMode } from '../../../types';
import { FormRow, SectionCard } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';

interface Props {
  data: IdentCarteEData;
  onChange: (d: IdentCarteEData) => void;
  documentMode?: DocumentMode;
}

const inputClass =
  'w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors';

export default function CarteE({ data, onChange, documentMode }: Props) {
  const setToggle = (field: keyof IdentCarteEData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });

  return (
    <SectionCard title="E. Pi&egrave;ces du dossier consult&eacute;es">
      {documentMode !== 'clinical' && (
        <FormRow label="Proc&egrave;s-verbal d'audition">
          <TriToggle value={data.pvAudition} onChange={(v) => setToggle('pvAudition', v)} />
        </FormRow>
      )}
      <FormRow label="Dossier m&eacute;dical">
        <TriToggle value={data.dossierMedical} onChange={(v) => setToggle('dossierMedical', v)} />
      </FormRow>
      <FormRow label="Certificats m&eacute;dicaux">
        <TriToggle value={data.certificatsMedicaux} onChange={(v) => setToggle('certificatsMedicaux', v)} />
      </FormRow>
      <FormRow label="Rapports d'expertise ant&eacute;rieurs">
        <TriToggle value={data.rapportsExpertiseAnterieurs} onChange={(v) => setToggle('rapportsExpertiseAnterieurs', v)} />
      </FormRow>
      <div className="py-2.5 border-b border-slate-50 last:border-b-0">
        <label className="block text-sm text-slate-700 mb-1.5">Autres (pr&eacute;ciser)</label>
        <input type="text" className={inputClass} placeholder="Pr&eacute;ciser..." value={data.autresPreciser} onChange={(e) => onChange({ ...data, autresPreciser: e.target.value })} />
      </div>
    </SectionCard>
  );
}
