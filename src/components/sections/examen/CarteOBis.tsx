import { ExamenCarteOBisData, YesNoNR } from '../../../types/examen';
import { FormRow, SectionCard } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';

interface Props { data: ExamenCarteOBisData; onChange: (d: ExamenCarteOBisData) => void; }

export default function CarteOBis({ data, onChange }: Props) {
  const set = (field: keyof ExamenCarteOBisData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });
  return (
    <SectionCard title="O bis. Troubles li&eacute;s &agrave; l'usage de substances (Intoxication / Sevrage)">
      <FormRow label="Troubles liés aux substances présents à l'examen :"><TriToggle value={data.troubleUsageSubstancesPresent} onChange={(v) => set('troubleUsageSubstancesPresent', v)} /></FormRow>
      <FormRow label="Antécédents de ces troubles :"><TriToggle value={data.antecedentSyndrome} onChange={(v) => set('antecedentSyndrome', v)} /></FormRow>
      {(data.troubleUsageSubstancesPresent === 'Oui' || data.antecedentSyndrome === 'Oui') && (
        <>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pb-1">Signes cliniques</p>
          <FormRow label="Sympt&ocirc;mes d'intoxication / d'&eacute;bri&eacute;t&eacute;"><TriToggle value={data.symptomesEbriete} onChange={(v) => set('symptomesEbriete', v)} /></FormRow>
          <FormRow label="Sympt&ocirc;mes de sevrage (manque)"><TriToggle value={data.symptomesSevrage} onChange={(v) => set('symptomesSevrage', v)} /></FormRow>
          <FormRow label="Modifications psycho-comportementales (d&eacute;sinhibition, labilit&eacute;...)"><TriToggle value={data.modifPsychoComportementales} onChange={(v) => set('modifPsychoComportementales', v)} /></FormRow>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pb-1 pt-3">Signes physiques</p>
          <FormRow label="F&oelig;tor alcoolique (haleine)"><TriToggle value={data.foetorAlcoolique} onChange={(v) => set('foetorAlcoolique', v)} /></FormRow>
          <FormRow label="Dysarthrie / &Eacute;locution p&acirc;teuse"><TriToggle value={data.dysarthrie} onChange={(v) => set('dysarthrie', v)} /></FormRow>
          <FormRow label="Troubles de l'&eacute;quilibre / Ataxie motrice"><TriToggle value={data.ataxieEquilibre} onChange={(v) => set('ataxieEquilibre', v)} /></FormRow>
          <FormRow label="Tremblements"><TriToggle value={data.tremblementsSubstances} onChange={(v) => set('tremblementsSubstances', v)} /></FormRow>
          <FormRow label="Sueurs / Signes v&eacute;g&eacute;tatifs"><TriToggle value={data.sueursSubstances} onChange={(v) => set('sueursSubstances', v)} /></FormRow>
          <FormRow label="Signes physiques de d&eacute;nutrition / h&eacute;patom&eacute;galie"><TriToggle value={data.signesDenutrition} onChange={(v) => set('signesDenutrition', v)} /></FormRow>
        </>
      )}
    </SectionCard>
  );
}
