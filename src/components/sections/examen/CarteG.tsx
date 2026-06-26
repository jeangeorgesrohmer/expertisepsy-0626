import { ExamenCarteGData, YesNoNR } from '../../../types/examen';
import { FormRow, SectionCard } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';

interface Props { data: ExamenCarteGData; onChange: (d: ExamenCarteGData) => void; }

export default function CarteG({ data, onChange }: Props) {
  const set = (field: keyof ExamenCarteGData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });
  return (
    <SectionCard title="G. Syndrome anxieux">
      <FormRow label="Syndrome anxieux présent :"><TriToggle value={data.presenceSyndrome} onChange={(v) => set('presenceSyndrome', v)} /></FormRow>
      <FormRow label="Antécédents de ce syndrome :"><TriToggle value={data.antecedentSyndrome} onChange={(v) => set('antecedentSyndrome', v)} /></FormRow>
      {(data.presenceSyndrome === 'Oui' || data.antecedentSyndrome === 'Oui') && (
        <>
          <FormRow label="Inquiétude excessive"><TriToggle value={data.inquietudeExcessive} onChange={(v) => set('inquietudeExcessive', v)} /></FormRow>
          <FormRow label="Ruminations anxieuses"><TriToggle value={data.ruminationsAnxieuses} onChange={(v) => set('ruminationsAnxieuses', v)} /></FormRow>
          <FormRow label="Peur sans objet"><TriToggle value={data.peurSansObjet} onChange={(v) => set('peurSansObjet', v)} /></FormRow>
          <FormRow label="Anticipation anxieuse"><TriToggle value={data.anticipationAnxieuse} onChange={(v) => set('anticipationAnxieuse', v)} /></FormRow>
          <FormRow label="Sentiment de danger imminent"><TriToggle value={data.sentimentDangerImminent} onChange={(v) => set('sentimentDangerImminent', v)} /></FormRow>
          <FormRow label="Palpitations"><TriToggle value={data.palpitations} onChange={(v) => set('palpitations', v)} /></FormRow>
          <FormRow label="Sueurs"><TriToggle value={data.sueurs} onChange={(v) => set('sueurs', v)} /></FormRow>
          <FormRow label="Tremblements"><TriToggle value={data.tremblements} onChange={(v) => set('tremblements', v)} /></FormRow>
          <FormRow label="Oppression thoracique"><TriToggle value={data.oppressionThoracique} onChange={(v) => set('oppressionThoracique', v)} /></FormRow>
          <FormRow label="Dyspnée"><TriToggle value={data.dyspnee} onChange={(v) => set('dyspnee', v)} /></FormRow>
          <FormRow label="Nausées"><TriToggle value={data.nausees} onChange={(v) => set('nausees', v)} /></FormRow>
          <FormRow label="Paresthésies"><TriToggle value={data.paresthesies} onChange={(v) => set('paresthesies', v)} /></FormRow>
          <FormRow label="Vertiges"><TriToggle value={data.vertiges} onChange={(v) => set('vertiges', v)} /></FormRow>
          <FormRow label="Antécédent d'attaques de panique"><TriToggle value={data.antecedentAttaquesPanique} onChange={(v) => set('antecedentAttaquesPanique', v)} /></FormRow>
          <FormRow label="Attaques de panique récurrentes"><TriToggle value={data.attaquesPaniqueRecurrentes} onChange={(v) => set('attaquesPaniqueRecurrentes', v)} /></FormRow>
          <FormRow label="Peur de mourir lors des crises"><TriToggle value={data.peurMourir} onChange={(v) => set('peurMourir', v)} /></FormRow>
          <FormRow label="Peur de devenir fou"><TriToggle value={data.peurDevenirFou} onChange={(v) => set('peurDevenirFou', v)} /></FormRow>
          <FormRow label="Agoraphobie"><TriToggle value={data.agoraphobie} onChange={(v) => set('agoraphobie', v)} /></FormRow>
          <FormRow label="Phobie sociale"><TriToggle value={data.phobieSociale} onChange={(v) => set('phobieSociale', v)} /></FormRow>
          <FormRow label="Phobies spécifiques"><TriToggle value={data.phobiesSpecifiques} onChange={(v) => set('phobiesSpecifiques', v)} /></FormRow>
          <FormRow label="Conduites d'évitement présentes"><TriToggle value={data.conduitesEvitement} onChange={(v) => set('conduitesEvitement', v)} /></FormRow>
          <FormRow label="Retentissement fonctionnel"><TriToggle value={data.retentissementFonctionnel} onChange={(v) => set('retentissementFonctionnel', v)} /></FormRow>
        </>
      )}
    </SectionCard>
  );
}
