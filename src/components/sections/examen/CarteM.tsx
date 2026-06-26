import { ExamenCarteMData, YesNoNR } from '../../../types/examen';
import { FormRow, SectionCard } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';

interface Props { data: ExamenCarteMData; onChange: (d: ExamenCarteMData) => void; }

export default function CarteM({ data, onChange }: Props) {
  const set = (field: keyof ExamenCarteMData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });
  return (
    <SectionCard title="M. Syndrome catatonique">
      <FormRow label="Syndrome catatonique présent :"><TriToggle value={data.presenceSyndrome} onChange={(v) => set('presenceSyndrome', v)} /></FormRow>
      <FormRow label="Antécédents de ce syndrome :"><TriToggle value={data.antecedentSyndrome} onChange={(v) => set('antecedentSyndrome', v)} /></FormRow>
      {(data.presenceSyndrome === 'Oui' || data.antecedentSyndrome === 'Oui') && (
        <>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pb-1">Hypertonie</p>
          <FormRow label="Catalepsie"><TriToggle value={data.catalepsie} onChange={(v) => set('catalepsie', v)} /></FormRow>
          <FormRow label="Flexibilit&eacute; cireuse"><TriToggle value={data.flexibiliteCireuse} onChange={(v) => set('flexibiliteCireuse', v)} /></FormRow>
          <FormRow label="N&eacute;gativisme"><TriToggle value={data.negativisme} onChange={(v) => set('negativisme', v)} /></FormRow>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">St&eacute;r&eacute;otypies</p>
          <FormRow label="Motrices"><TriToggle value={data.stereotypiesMotrices} onChange={(v) => set('stereotypiesMotrices', v)} /></FormRow>
          <FormRow label="Verbales"><TriToggle value={data.stereotypiesVerbales} onChange={(v) => set('stereotypiesVerbales', v)} /></FormRow>
          <FormRow label="&Eacute;cholalie / &Eacute;chopraxie"><TriToggle value={data.echolalieEchopraxie} onChange={(v) => set('echolalieEchopraxie', v)} /></FormRow>
          <FormRow label="Stupeur catatonique"><TriToggle value={data.stupeurCatatonique} onChange={(v) => set('stupeurCatatonique', v)} /></FormRow>
          <FormRow label="Agitation catatonique"><TriToggle value={data.agitationCatatonique} onChange={(v) => set('agitationCatatonique', v)} /></FormRow>
        </>
      )}
    </SectionCard>
  );
}
