import { ExamenCarteSData, YesNoNR, SEXE_VICTIMES_OPTIONS, SexeVictimes } from '../../../types/examen';
import { FormRow } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';
import MultiToggle from '../../ui/MultiToggle';
import { InlineText } from '../../ui/FormRow';

interface Props { data: ExamenCarteSData; onChange: (d: ExamenCarteSData) => void; }

export default function CarteSTypes({ data, onChange }: Props) {
  const set = (field: keyof ExamenCarteSData, value: YesNoNR) =>
    onChange({ ...data, [field]: value });
  return (
    <>
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pb-1">Presence de fantasmes / comportements</p>
      <FormRow label="Rapportes par le sujet"><TriToggle value={data.rapportesParSujet} onChange={(v) => set('rapportesParSujet', v)} /></FormRow>
      <FormRow label="Reconnus"><TriToggle value={data.reconnus} onChange={(v) => set('reconnus', v)} /></FormRow>
      <FormRow label="Nies"><TriToggle value={data.nies} onChange={(v) => set('nies', v)} /></FormRow>

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Pedophilie</p>
      <FormRow label="Attraction sexuelle enfants prepuberes"><TriToggle value={data.pedophilieAttraction} onChange={(v) => set('pedophilieAttraction', v)} /></FormRow>
      <FormRow label="Age des victimes"><InlineText value={data.pedophilieAgeVictimes} onChange={(v) => onChange({ ...data, pedophilieAgeVictimes: v })} /></FormRow>
      <FormRow label="Sexe des victimes"><MultiToggle<SexeVictimes> value={data.pedophilieSexeVictimes} options={SEXE_VICTIMES_OPTIONS} onChange={(v) => onChange({ ...data, pedophilieSexeVictimes: v })} /></FormRow>
      <FormRow label="Passages a l'acte"><TriToggle value={data.pedophiliePassagesActe} onChange={(v) => set('pedophiliePassagesActe', v)} /></FormRow>
      <FormRow label="Exclusif"><TriToggle value={data.pedophilieExclusif} onChange={(v) => set('pedophilieExclusif', v)} /></FormRow>
      <FormRow label="Non exclusif"><TriToggle value={data.pedophilieNonExclusif} onChange={(v) => set('pedophilieNonExclusif', v)} /></FormRow>

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Hebephilie</p>
      <FormRow label="Attraction sexuelle adolescents puberes"><TriToggle value={data.hebephilieAttraction} onChange={(v) => set('hebephilieAttraction', v)} /></FormRow>

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Exhibitionnisme</p>
      <FormRow label="Exposition organes genitaux"><TriToggle value={data.exhibitionnismeExposition} onChange={(v) => set('exhibitionnismeExposition', v)} /></FormRow>
      <FormRow label="Frequence"><InlineText value={data.exhibitionnismeFrequence} onChange={(v) => onChange({ ...data, exhibitionnismeFrequence: v })} /></FormRow>
      <FormRow label="Contexte"><InlineText value={data.exhibitionnismeContexte} onChange={(v) => onChange({ ...data, exhibitionnismeContexte: v })} /></FormRow>

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Voyeurisme</p>
      <FormRow label="Observation personnes nues / activite sexuelle"><TriToggle value={data.voyeurismeObservation} onChange={(v) => set('voyeurismeObservation', v)} /></FormRow>
      <FormRow label="Frequence"><InlineText value={data.voyeurismeFrequence} onChange={(v) => onChange({ ...data, voyeurismeFrequence: v })} /></FormRow>

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Frotteurisme</p>
      <FormRow label="Contact / frottement personne non consentante"><TriToggle value={data.frotteurismeContact} onChange={(v) => set('frotteurismeContact', v)} /></FormRow>

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Sadisme sexuel</p>
      <FormRow label="Excitation souffrance d'autrui"><TriToggle value={data.sadismeExcitation} onChange={(v) => set('sadismeExcitation', v)} /></FormRow>
      <FormRow label="Fantasmes"><TriToggle value={data.sadismeFantasmes} onChange={(v) => set('sadismeFantasmes', v)} /></FormRow>
      <FormRow label="Passages a l'acte"><TriToggle value={data.sadismePassagesActe} onChange={(v) => set('sadismePassagesActe', v)} /></FormRow>

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Masochisme sexuel</p>
      <FormRow label="Excitation subir humiliation / souffrance"><TriToggle value={data.masochismeExcitation} onChange={(v) => set('masochismeExcitation', v)} /></FormRow>

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Fetichisme</p>
      <FormRow label="Utilisation objets inanimes"><TriToggle value={data.fetichismeObjets} onChange={(v) => set('fetichismeObjets', v)} /></FormRow>
      <FormRow label="Type d'objet"><InlineText value={data.fetichismeTypeObjet} onChange={(v) => onChange({ ...data, fetichismeTypeObjet: v })} /></FormRow>

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Transvestisme fetichiste</p>
      <FormRow label="Excitation port vetements sexe oppose"><TriToggle value={data.transvestismeExcitation} onChange={(v) => set('transvestismeExcitation', v)} /></FormRow>

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Zoophilie</p>
      <FormRow label="Activite sexuelle animaux"><TriToggle value={data.zoophilieActivite} onChange={(v) => set('zoophilieActivite', v)} /></FormRow>

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Necrophilie</p>
      <FormRow label="Attraction envers cadavres"><TriToggle value={data.necrophilieAttraction} onChange={(v) => set('necrophilieAttraction', v)} /></FormRow>

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-1">Autres paraphilies</p>
      <FormRow label="Preciser"><InlineText value={data.autresParaphiliesPreciser} onChange={(v) => onChange({ ...data, autresParaphiliesPreciser: v })} /></FormRow>
    </>
  );
}
