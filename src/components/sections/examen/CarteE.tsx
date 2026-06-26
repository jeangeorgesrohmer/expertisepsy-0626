import { ExamenCarteEData, YesNoNR } from '../../../types/examen';
import { FormRow, SectionCard } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';

interface Props { data: ExamenCarteEData; onChange: (d: ExamenCarteEData) => void; }

export default function CarteE({ data, onChange }: Props) {
  const set = (field: keyof ExamenCarteEData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });
  return (
    <SectionCard title="E. Syndrome dépressif">
      <FormRow label="Syndrome dépressif présent :"><TriToggle value={data.presenceSyndrome} onChange={(v) => set('presenceSyndrome', v)} /></FormRow>
      <FormRow label="Antécédents de ce syndrome :"><TriToggle value={data.antecedentSyndrome} onChange={(v) => set('antecedentSyndrome', v)} /></FormRow>
      {(data.presenceSyndrome === 'Oui' || data.antecedentSyndrome === 'Oui') && (
        <>
          <FormRow label="Tristesse de l'humeur"><TriToggle value={data.tristesseHumeur} onChange={(v) => set('tristesseHumeur', v)} /></FormRow>
          <FormRow label="Anhédonie"><TriToggle value={data.anhedonie} onChange={(v) => set('anhedonie', v)} /></FormRow>
          <FormRow label="Perte d'intérêt"><TriToggle value={data.perteInteret} onChange={(v) => set('perteInteret', v)} /></FormRow>
          <FormRow label="Émoussement affectif"><TriToggle value={data.emoussementAffectif} onChange={(v) => set('emoussementAffectif', v)} /></FormRow>
          <FormRow label="Douleur morale présente"><TriToggle value={data.douleurMoralePresente} onChange={(v) => set('douleurMoralePresente', v)} /></FormRow>
          <FormRow label="Douleur morale intense"><TriToggle value={data.douleurMoraleIntense} onChange={(v) => set('douleurMoraleIntense', v)} /></FormRow>
          <FormRow label="Culpabilité"><TriToggle value={data.culpabilite} onChange={(v) => set('culpabilite', v)} /></FormRow>
          <FormRow label="Sentiment d'indignité"><TriToggle value={data.sentimentIndignite} onChange={(v) => set('sentimentIndignite', v)} /></FormRow>
          <FormRow label="Dévalorisation"><TriToggle value={data.devalorisation} onChange={(v) => set('devalorisation', v)} /></FormRow>
          <FormRow label="Sentiment d'incapacité"><TriToggle value={data.sentimentIncapacite} onChange={(v) => set('sentimentIncapacite', v)} /></FormRow>
          <FormRow label="Auto-accusations"><TriToggle value={data.autoAccusations} onChange={(v) => set('autoAccusations', v)} /></FormRow>
          <FormRow label="Pessimisme"><TriToggle value={data.pessimisme} onChange={(v) => set('pessimisme', v)} /></FormRow>
          <FormRow label="Désespoir"><TriToggle value={data.desespoir} onChange={(v) => set('desespoir', v)} /></FormRow>
          <FormRow label="Idées de mort"><TriToggle value={data.ideesMort} onChange={(v) => set('ideesMort', v)} /></FormRow>
          <FormRow label="Idées suicidaires"><TriToggle value={data.ideesSuicidaires} onChange={(v) => set('ideesSuicidaires', v)} /></FormRow>
          <FormRow label="Scénario suicidaire"><TriToggle value={data.scenarioSuicidaire} onChange={(v) => set('scenarioSuicidaire', v)} /></FormRow>
          <FormRow label="Intention suicidaire"><TriToggle value={data.intentionSuicidaire} onChange={(v) => set('intentionSuicidaire', v)} /></FormRow>
          <FormRow label="Risque suicidaire immédiat"><TriToggle value={data.risqueSuicidaireImmédiat} onChange={(v) => set('risqueSuicidaireImmédiat', v)} /></FormRow>
          <FormRow label="Troubles du sommeil"><TriToggle value={data.troublesSommeil} onChange={(v) => set('troublesSommeil', v)} /></FormRow>
          <FormRow label="Insomnie d'endormissement"><TriToggle value={data.insomniesEndormissement} onChange={(v) => set('insomniesEndormissement', v)} /></FormRow>
          <FormRow label="Insomnie de milieu de nuit"><TriToggle value={data.insomnieMilieuNuit} onChange={(v) => set('insomnieMilieuNuit', v)} /></FormRow>
          <FormRow label="Réveil précoce"><TriToggle value={data.reveilPrecoce} onChange={(v) => set('reveilPrecoce', v)} /></FormRow>
          <FormRow label="Hypersomnie"><TriToggle value={data.hypersomnie} onChange={(v) => set('hypersomnie', v)} /></FormRow>
          <FormRow label="Troubles de l'appétit"><TriToggle value={data.troublesAppetit} onChange={(v) => set('troublesAppetit', v)} /></FormRow>
          <FormRow label="Anorexie"><TriToggle value={data.anorexie} onChange={(v) => set('anorexie', v)} /></FormRow>
          <FormRow label="Hyperphagie"><TriToggle value={data.hyperphagie} onChange={(v) => set('hyperphagie', v)} /></FormRow>
          <FormRow label="Variation pondérale"><TriToggle value={data.variationPonderale} onChange={(v) => set('variationPonderale', v)} /></FormRow>
          <FormRow label="Asthénie"><TriToggle value={data.asthenie} onChange={(v) => set('asthenie', v)} /></FormRow>
          <FormRow label="Perte d'énergie"><TriToggle value={data.perteEnergie} onChange={(v) => set('perteEnergie', v)} /></FormRow>
          <FormRow label="Troubles de la libido"><TriToggle value={data.troublesLibido} onChange={(v) => set('troublesLibido', v)} /></FormRow>
          <FormRow label="Bradypsychie"><TriToggle value={data.bradypsychie} onChange={(v) => set('bradypsychie', v)} /></FormRow>
          <FormRow label="Bradykinésie"><TriToggle value={data.bradykinesie} onChange={(v) => set('bradykinesie', v)} /></FormRow>
          <FormRow label="Hypomimie"><TriToggle value={data.hypomimie} onChange={(v) => set('hypomimie', v)} /></FormRow>
          <FormRow label="Clinophilie"><TriToggle value={data.clinophilie} onChange={(v) => set('clinophilie', v)} /></FormRow>
          <FormRow label="Aggravation matinale"><TriToggle value={data.aggravationMatinale} onChange={(v) => set('aggravationMatinale', v)} /></FormRow>
        </>
      )}
    </SectionCard>
  );
}
