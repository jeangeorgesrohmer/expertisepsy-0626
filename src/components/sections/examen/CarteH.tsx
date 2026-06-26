import { ExamenCarteHData, YesNoNR } from '../../../types/examen';
import { FormRow, SectionCard } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';

interface Props { data: ExamenCarteHData; onChange: (d: ExamenCarteHData) => void; }

export default function CarteH({ data, onChange }: Props) {
  const set = (field: keyof ExamenCarteHData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });
  return (
    <SectionCard title="H. Troubles obsessionnels-compulsifs">
      <FormRow label="TOC présent :"><TriToggle value={data.presenceSyndrome} onChange={(v) => set('presenceSyndrome', v)} /></FormRow>
      <FormRow label="Antécédents de ce syndrome :"><TriToggle value={data.antecedentSyndrome} onChange={(v) => set('antecedentSyndrome', v)} /></FormRow>
      {(data.presenceSyndrome === 'Oui' || data.antecedentSyndrome === 'Oui') && (
        <>
          <FormRow label="Pensées obsédantes"><TriToggle value={data.penseesObsedantes} onChange={(v) => set('penseesObsedantes', v)} /></FormRow>
          <FormRow label="Idées intrusives"><TriToggle value={data.ideesIntrusives} onChange={(v) => set('ideesIntrusives', v)} /></FormRow>
          <FormRow label="Caractère ego-dystonique"><TriToggle value={data.caractereEgoDystonique} onChange={(v) => set('caractereEgoDystonique', v)} /></FormRow>
          <FormRow label="Lutte anxieuse"><TriToggle value={data.lutteAnxieuse} onChange={(v) => set('lutteAnxieuse', v)} /></FormRow>
          <FormRow label="Rituels compulsifs"><TriToggle value={data.rituelsCompulsifs} onChange={(v) => set('rituelsCompulsifs', v)} /></FormRow>
          <FormRow label="Vérifications"><TriToggle value={data.verifications} onChange={(v) => set('verifications', v)} /></FormRow>
          <FormRow label="Lavage"><TriToggle value={data.lavage} onChange={(v) => set('lavage', v)} /></FormRow>
          <FormRow label="Rangement"><TriToggle value={data.rangement} onChange={(v) => set('rangement', v)} /></FormRow>
          <FormRow label="Comptage"><TriToggle value={data.comptage} onChange={(v) => set('comptage', v)} /></FormRow>
          <FormRow label="Souffrance psychique"><TriToggle value={data.souffrancePsychique} onChange={(v) => set('souffrancePsychique', v)} /></FormRow>
          <FormRow label="Retentissement fonctionnel"><TriToggle value={data.retentissementFonctionnel} onChange={(v) => set('retentissementFonctionnel', v)} /></FormRow>
        </>
      )}
    </SectionCard>
  );
}
