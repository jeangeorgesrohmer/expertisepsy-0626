import { ExamenCarteSData, YesNoNR } from '../../../types/examen';
import { FormRow, SectionCard } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';
import CarteSTypes from './CarteSTypes';
import CarteSCaracteristiques from './CarteSCaracteristiques';
import CarteSEvaluation from './CarteSEvaluation';

interface Props { data: ExamenCarteSData; onChange: (d: ExamenCarteSData) => void; }

export default function CarteS({ data, onChange }: Props) {
  return (
    <SectionCard title="T. Paraphilies et troubles du comportement sexuel">
      <FormRow label="Trouble paraphilique présent :"><TriToggle value={data.presenceSyndrome} onChange={(v: YesNoNR) => onChange({ ...data, presenceSyndrome: v })} /></FormRow>
      <FormRow label="Antécédents de ce trouble :"><TriToggle value={data.antecedentSyndrome} onChange={(v: YesNoNR) => onChange({ ...data, antecedentSyndrome: v })} /></FormRow>
      {(data.presenceSyndrome === 'Oui' || data.antecedentSyndrome === 'Oui') && (<>
      <CarteSTypes data={data} onChange={onChange} />
      <CarteSCaracteristiques data={data} onChange={onChange} />
      <CarteSEvaluation data={data} onChange={onChange} />
      </>)}
    </SectionCard>
  );
}
