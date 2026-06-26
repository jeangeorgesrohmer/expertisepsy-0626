import { CarteAData, YesNoNR } from '../../../types/anamnese';
import { FormRow, SectionCard, StandaloneText } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';

interface Props {
  data: CarteAData;
  onChange: (data: CarteAData) => void;
}

export default function CarteA({ data, onChange }: Props) {
  const set = (field: keyof CarteAData, value: YesNoNR | string) =>
    onChange({ ...data, [field]: value });

  return (
    <SectionCard title="A. Antécédents médicaux">
      <FormRow label="Pathologie cardiovasculaire">
        <TriToggle value={data.pathologieCardiovasculaire} onChange={(v) => set('pathologieCardiovasculaire', v)} />
      </FormRow>
      <FormRow label="Pathologie neurologique">
        <TriToggle value={data.pathologieNeurologique} onChange={(v) => set('pathologieNeurologique', v)} />
      </FormRow>
      <FormRow label="Pathologie endocrinienne">
        <TriToggle value={data.pathologieEndocrinienne} onChange={(v) => set('pathologieEndocrinienne', v)} />
      </FormRow>
      <FormRow label="Pathologie infectieuse chronique">
        <TriToggle value={data.pathologieInfectieuseChronique} onChange={(v) => set('pathologieInfectieuseChronique', v)} />
      </FormRow>
      <FormRow label="Cancer">
        <TriToggle value={data.cancer} onChange={(v) => set('cancer', v)} />
      </FormRow>
      <FormRow label="Traumatisme crânien">
        <TriToggle value={data.traumatismeCranien} onChange={(v) => set('traumatismeCranien', v)} />
      </FormRow>
      <StandaloneText label="Autres (préciser)" value={data.autresMedicauxPreciser} onChange={(v) => set('autresMedicauxPreciser', v)} />
      <FormRow label="Déficit visuel">
        <TriToggle value={data.deficitVisuel} onChange={(v) => set('deficitVisuel', v)} />
      </FormRow>
      <FormRow label="Déficit auditif">
        <TriToggle value={data.deficitAuditif} onChange={(v) => set('deficitAuditif', v)} />
      </FormRow>
      <FormRow label="Aucun traitement médicamenteux en cours">
        <TriToggle value={data.aucunTraitementMedicamenteux} onChange={(v) => set('aucunTraitementMedicamenteux', v)} />
      </FormRow>
      <StandaloneText label="Si oui, préciser" value={data.traitementMedicamenteuxPreciser} onChange={(v) => set('traitementMedicamenteuxPreciser', v)} />
    </SectionCard>
  );
}
