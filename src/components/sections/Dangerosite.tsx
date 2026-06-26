import type {
  DangerositeData,
  DangerositePsychiatrique,
  RisqueRecidive,
  FacteursRisque,
  FacteursProtection,
  NecessiteSoins,
  InjonctionSoinsDetails,
  ModalitesInjonction,
  Pronostic,
  YesNoNR,
  EchelleActuarielle,
  EchelleActuarielleComplete,
  NiveauRisque,
  ScaleType,
  SyntheseJPS,
} from '../../types/dangerosite';
import { FormRow, SectionCard, StandaloneText } from '../ui/FormRow';
import TriToggle from '../ui/TriToggle';
import VoiceTextarea from '../ui/VoiceTextarea';
import { Plus, Trash2 } from 'lucide-react';
import { SCALE_NAMES } from '../../constants/echellesActuarielles';
import ScaleScoring from './ScaleScoring';
import { useState } from 'react';

interface Props {
  data: DangerositeData;
  onChange: (data: DangerositeData) => void;
}

function Carte1({
  danger,
  risque,
  onDangerChange,
  onRisqueChange,
}: {
  danger: DangerositePsychiatrique;
  risque: RisqueRecidive;
  onDangerChange: (d: DangerositePsychiatrique) => void;
  onRisqueChange: (d: RisqueRecidive) => void;
}) {
  const setD = (f: keyof DangerositePsychiatrique, v: YesNoNR) =>
    onDangerChange({ ...danger, [f]: v });
  const setR = (f: keyof RisqueRecidive, v: YesNoNR) =>
    onRisqueChange({ ...risque, [f]: v });

  return (
    <SectionCard title="A. Dangerosite psychiatrique et risque de recidive">
      <FormRow label="Dangerosite pour autrui">
        <TriToggle value={danger.autrui} onChange={(v) => setD('autrui', v)} />
      </FormRow>
      <FormRow label="Dangerosite pour soi-meme">
        <TriToggle value={danger.soiMeme} onChange={(v) => setD('soiMeme', v)} />
      </FormRow>
      <FormRow label="Dangerosite sexuelle">
        <TriToggle value={danger.sexuelle} onChange={(v) => setD('sexuelle', v)} />
      </FormRow>

      <div className="my-3 border-t border-slate-200" />

      <p className="text-xs font-medium text-slate-500 mb-1">Risque de recidive</p>
      <FormRow label="Eleve">
        <TriToggle value={risque.eleve} onChange={(v) => setR('eleve', v)} />
      </FormRow>
      <FormRow label="Moyen">
        <TriToggle value={risque.moyen} onChange={(v) => setR('moyen', v)} />
      </FormRow>
      <FormRow label="Faible">
        <TriToggle value={risque.faible} onChange={(v) => setR('faible', v)} />
      </FormRow>
    </SectionCard>
  );
}

function Carte2({
  risque,
  protection,
  onRisqueChange,
  onProtectionChange,
}: {
  risque: FacteursRisque;
  protection: FacteursProtection;
  onRisqueChange: (d: FacteursRisque) => void;
  onProtectionChange: (d: FacteursProtection) => void;
}) {
  const setR = (f: keyof FacteursRisque, v: YesNoNR) =>
    onRisqueChange({ ...risque, [f]: v });
  const setP = (f: keyof FacteursProtection, v: YesNoNR) =>
    onProtectionChange({ ...protection, [f]: v });

  return (
    <SectionCard title="B. Facteurs influencant le risque">
      <p className="text-xs font-medium text-slate-500 mb-1 pt-2">Facteurs de risque de recidive</p>
      <FormRow label="Absence de critique">
        <TriToggle value={risque.absenceCritique} onChange={(v) => setR('absenceCritique', v)} />
      </FormRow>
      <FormRow label="Minimisation des faits">
        <TriToggle value={risque.minimisationFaits} onChange={(v) => setR('minimisationFaits', v)} />
      </FormRow>
      <FormRow label="Trouble de la personnalite">
        <TriToggle value={risque.troublePersonnalite} onChange={(v) => setR('troublePersonnalite', v)} />
      </FormRow>
      <FormRow label="Trouble paraphilique non traite">
        <TriToggle value={risque.troubleParaphilique} onChange={(v) => setR('troubleParaphilique', v)} />
      </FormRow>
      <FormRow label="Addiction non controlee">
        <TriToggle value={risque.addiction} onChange={(v) => setR('addiction', v)} />
      </FormRow>
      <FormRow label="Isolement social">
        <TriToggle value={risque.isolementSocial} onChange={(v) => setR('isolementSocial', v)} />
      </FormRow>
      <FormRow label="Absence de suivi">
        <TriToggle value={risque.absenceSuivi} onChange={(v) => setR('absenceSuivi', v)} />
      </FormRow>

      <div className="my-3 border-t border-slate-200" />

      <p className="text-xs font-medium text-slate-500 mb-1">Facteurs de protection</p>
      <FormRow label="Conscience du trouble">
        <TriToggle value={protection.conscienceTrouble} onChange={(v) => setP('conscienceTrouble', v)} />
      </FormRow>
      <FormRow label="Demande de soins">
        <TriToggle value={protection.demandeSoins} onChange={(v) => setP('demandeSoins', v)} />
      </FormRow>
      <FormRow label="Soutien familial">
        <TriToggle value={protection.soutienFamilial} onChange={(v) => setP('soutienFamilial', v)} />
      </FormRow>
      <FormRow label="Insertion socioprofessionnelle">
        <TriToggle value={protection.insertionSocioPro} onChange={(v) => setP('insertionSocioPro', v)} />
      </FormRow>
    </SectionCard>
  );
}

function Carte3({
  soins,
  injonction,
  modalites,
  pronostic,
  onSoinsChange,
  onInjonctionChange,
  onModalitesChange,
  onPronosticChange,
}: {
  soins: NecessiteSoins;
  injonction: InjonctionSoinsDetails;
  modalites: ModalitesInjonction;
  pronostic: Pronostic;
  onSoinsChange: (d: NecessiteSoins) => void;
  onInjonctionChange: (d: InjonctionSoinsDetails) => void;
  onModalitesChange: (d: ModalitesInjonction) => void;
  onPronosticChange: (d: Pronostic) => void;
}) {
  const setS = (f: keyof NecessiteSoins, v: YesNoNR) =>
    onSoinsChange({ ...soins, [f]: v });
  const setI = (f: keyof InjonctionSoinsDetails, v: YesNoNR | string) =>
    onInjonctionChange({ ...injonction, [f]: v });
  const setM = (f: keyof ModalitesInjonction, v: YesNoNR | string) =>
    onModalitesChange({ ...modalites, [f]: v });
  const setP = (f: keyof Pronostic, v: YesNoNR) =>
    onPronosticChange({ ...pronostic, [f]: v });

  const showInjonction = soins.injonctionSoins === 'Oui';

  return (
    <SectionCard title="C. Prise en charge et pronostic">
      <p className="text-xs font-medium text-slate-500 mb-1 pt-2">Necessite de soins psychiatriques</p>
      <FormRow label="En urgence">
        <TriToggle value={soins.urgence} onChange={(v) => setS('urgence', v)} />
      </FormRow>
      <FormRow label="A court terme">
        <TriToggle value={soins.courtTerme} onChange={(v) => setS('courtTerme', v)} />
      </FormRow>
      <FormRow label="Suivi ambulatoire">
        <TriToggle value={soins.ambulatoire} onChange={(v) => setS('ambulatoire', v)} />
      </FormRow>
      <FormRow label="Hospitalisation recommandee">
        <TriToggle value={soins.hospitalisation} onChange={(v) => setS('hospitalisation', v)} />
      </FormRow>
      <FormRow label="Injonction de soins">
        <TriToggle value={soins.injonctionSoins} onChange={(v) => setS('injonctionSoins', v)} />
      </FormRow>
      <FormRow label="Aucun soin necessaire">
        <TriToggle value={soins.aucunSoin} onChange={(v) => setS('aucunSoin', v)} />
      </FormRow>

      {showInjonction && (
        <>
          <div className="my-3 border-t border-slate-200" />
          <p className="text-xs font-medium text-slate-500 mb-1">
            Si injonction de soins recommandee, preciser
          </p>
          <FormRow label="Suivi psychiatrique">
            <TriToggle value={injonction.suiviPsychiatrique} onChange={(v) => setI('suiviPsychiatrique', v)} />
          </FormRow>
          <FormRow label="Suivi psychologique">
            <TriToggle value={injonction.suiviPsychologique} onChange={(v) => setI('suiviPsychologique', v)} />
          </FormRow>
          <FormRow label="Suivi sexologique">
            <TriToggle value={injonction.suiviSexologique} onChange={(v) => setI('suiviSexologique', v)} />
          </FormRow>
          <FormRow label="Traitement medicamenteux">
            <TriToggle value={injonction.traitementMedicamenteux} onChange={(v) => setI('traitementMedicamenteux', v)} />
          </FormRow>
          <FormRow label="Traitement anti-androgene">
            <TriToggle value={injonction.traitementAntiAndrogene} onChange={(v) => setI('traitementAntiAndrogene', v)} />
          </FormRow>
          <FormRow label="Prise en charge addictologique">
            <TriToggle value={injonction.addictologie} onChange={(v) => setI('addictologie', v)} />
          </FormRow>
          <FormRow label="Therapie cognitive et comportementale">
            <TriToggle value={injonction.tcc} onChange={(v) => setI('tcc', v)} />
          </FormRow>
          <FormRow label="Therapie de groupe">
            <TriToggle value={injonction.therapieGroupe} onChange={(v) => setI('therapieGroupe', v)} />
          </FormRow>
          <StandaloneText
            label="Autre therapie specifique (preciser) :"
            value={injonction.autreTherapie}
            onChange={(v) => setI('autreTherapie', v)}
            placeholder="Preciser la therapie..."
          />

          <div className="my-3 border-t border-slate-200" />
          <p className="text-xs font-medium text-slate-500 mb-1">Modalites de l'injonction de soins</p>
          <StandaloneText
            label="Frequence recommandee :"
            value={modalites.frequence}
            onChange={(v) => setM('frequence', v)}
            placeholder="Ex : hebdomadaire, bimensuelle..."
          />
          <StandaloneText
            label="Duree recommandee :"
            value={modalites.duree}
            onChange={(v) => setM('duree', v)}
            placeholder="Ex : 2 ans, 5 ans..."
          />
          <StandaloneText
            label="Structure de soins recommandee :"
            value={modalites.structure}
            onChange={(v) => setM('structure', v)}
            placeholder="Ex : CMP, hopital de jour..."
          />
          <FormRow label="Medecin coordonnateur souhaitable">
            <TriToggle value={modalites.medecinCoordonnateur} onChange={(v) => setM('medecinCoordonnateur', v)} />
          </FormRow>
        </>
      )}

      <div className="my-3 border-t border-slate-200" />

      <p className="text-xs font-medium text-slate-500 mb-1">Pronostic</p>
      <FormRow label="Favorable sous traitement">
        <TriToggle value={pronostic.favorableSousTraitement} onChange={(v) => setP('favorableSousTraitement', v)} />
      </FormRow>
      <FormRow label="Reserve">
        <TriToggle value={pronostic.reserve} onChange={(v) => setP('reserve', v)} />
      </FormRow>
      <FormRow label="Defavorable">
        <TriToggle value={pronostic.defavorable} onChange={(v) => setP('defavorable', v)} />
      </FormRow>
    </SectionCard>
  );
}

function CarteEchellesCompletes({
  echelles,
  onChange,
}: {
  echelles: EchelleActuarielleComplete[];
  onChange: (e: EchelleActuarielleComplete[]) => void;
}) {
  const [showSelector, setShowSelector] = useState(false);

  const addEchelle = (scaleType: ScaleType) => {
    const newEchelle: EchelleActuarielleComplete = {
      id: Date.now().toString(),
      scaleType,
      scores: {},
      protectiveScores: scaleType === 'SAVRY' ? {} : undefined,
      syntheseClinique: '',
    };
    onChange([...echelles, newEchelle]);
    setShowSelector(false);
  };

  const removeEchelle = (id: string) => {
    onChange(echelles.filter((e) => e.id !== id));
  };

  const updateEchelle = (id: string, updatedEchelle: EchelleActuarielleComplete) => {
    onChange(echelles.map((e) => (e.id === id ? updatedEchelle : e)));
  };

  const usedScales = new Set(echelles.map((e) => e.scaleType));
  const availableScales = SCALE_NAMES.filter((name) => !usedScales.has(name));

  return (
    <SectionCard title="Échelles clinico-actuarielles standardisées">
      <div className="mb-4">
        <p className="text-sm text-slate-600 mb-3">
          Outils d'évaluation standardisés du risque de récidive et de dangerosité avec cotation détaillée.
        </p>

        {!showSelector ? (
          <button
            onClick={() => setShowSelector(true)}
            disabled={availableScales.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            <Plus size={18} />
            Ajouter une échelle de dangerosité
          </button>
        ) : (
          <div className="bg-slate-50 border border-slate-300 rounded-lg p-4">
            <h4 className="font-medium text-slate-700 mb-2">
              Sélectionner une échelle à coter
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
              {availableScales.map((scaleName) => (
                <button
                  key={scaleName}
                  onClick={() => addEchelle(scaleName)}
                  className="px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-blue-50 hover:border-blue-500 transition-colors text-sm font-medium text-slate-700"
                >
                  {scaleName}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowSelector(false)}
              className="text-sm text-slate-600 hover:text-slate-800"
            >
              Annuler
            </button>
          </div>
        )}

        {availableScales.length === 0 && !showSelector && (
          <p className="text-sm text-slate-500 mt-2">
            Toutes les échelles disponibles ont été ajoutées.
          </p>
        )}
      </div>

      {echelles.length === 0 && (
        <div className="text-center py-8 text-slate-400 text-sm">
          Aucune échelle ajoutée. Cliquez sur "Ajouter une échelle de dangerosité" pour commencer la cotation.
        </div>
      )}

      <div className="space-y-4">
        {echelles.map((echelle) => (
          <ScaleScoring
            key={echelle.id}
            echelle={echelle}
            onChange={(updated) => updateEchelle(echelle.id, updated)}
            onRemove={() => removeEchelle(echelle.id)}
          />
        ))}
      </div>
    </SectionCard>
  );
}

const JPS_FIELDS: { key: keyof SyntheseJPS; label: string; hint: string; placeholder: string }[] = [
  {
    key: 'sspi2',
    label: '1. SSPI-2 — Intérêts pédophiliques (dépistage)',
    hint: 'Score obtenu, indicateurs présents (sexe et âge des victimes, lien, pédopornographie) et implications quant à la probabilité d\'intérêts sexuels pédophiliques.',
    placeholder: 'Ex : SSPI-2 coté à X/5. La présence de victimes masculines extrafamiliales constitue un indicateur fort d\'intérêts pédophiliques...',
  },
  {
    key: 'static2002r',
    label: '2. Static-2002R — Risque actuariel de récidive sexuelle (facteurs statiques)',
    hint: 'Score total, niveau de risque standardisé (I à IVb), sous-échelles saillantes (persistance, intérêts déviants, criminalité générale) et positionnement par rapport aux normes.',
    placeholder: 'Ex : Static-2002R coté à X (Niveau ...). Le profil est marqué par la persistance des infractions sexuelles, tandis que la criminalité générale reste faible...',
  },
  {
    key: 'discussionSVR20',
    label: '3. Discussion clinique — Intégration au jugement professionnel structuré (SVR-20)',
    hint: 'Croisement des résultats actuariels (SSPI-2, Static-2002R) avec les facteurs dynamiques du SVR-20 : convergences, divergences, facteurs aggravants ou protecteurs actuels, et pondération par le jugement clinique.',
    placeholder: 'Ex : Les résultats actuariels convergent avec les facteurs dynamiques relevés au SVR-20 (déni partiel, absence de suivi). Toutefois, l\'engagement récent dans les soins module ce constat...',
  },
  {
    key: 'conclusions',
    label: '4. Conclusions générales et recommandations (évaluation JPS du risque)',
    hint: 'Niveau de risque global retenu par l\'expert, scénarios de récidive envisagés, et recommandations de prise en charge et de gestion du risque.',
    placeholder: 'Ex : Au terme de l\'évaluation structurée, le risque de récidive d\'actes pédophiliques est estimé ... Il est recommandé...',
  },
];

function CarteSyntheseJPS({
  synthese,
  onChange,
}: {
  synthese: SyntheseJPS;
  onChange: (s: SyntheseJPS) => void;
}) {
  return (
    <SectionCard title="Synthèse JPS — Risque de récidive sexuelle (SSPI-2 / Static-2002R / SVR-20)">
      <p className="text-sm text-slate-600 mb-4">
        Canevas de jugement professionnel structuré (JPS) : intégration des mesures actuarielles et de dépistage avec
        l'évaluation clinique structurée du SVR-20 pour formuler une conclusion globale sur le risque de récidive sexuelle.
      </p>
      <div className="space-y-5">
        {JPS_FIELDS.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-semibold text-slate-700 mb-1">{field.label}</label>
            <p className="text-xs text-slate-500 mb-2">{field.hint}</p>
            <VoiceTextarea
              value={synthese[field.key]}
              onChange={(v) => onChange({ ...synthese, [field.key]: v })}
              placeholder={field.placeholder}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-[100px] text-sm pr-10"
            />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export default function Dangerosite({ data, onChange }: Props) {
  const update = <K extends keyof DangerositeData>(key: K, val: DangerositeData[K]) =>
    onChange({ ...data, [key]: val });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">
          VIII. Dangerosite et pronostic
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Evaluation de la dangerosite, des facteurs de risque et de protection, et du pronostic.
        </p>
      </div>

      <SectionCard title="Configuration de l'évaluation">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.evaluationActive}
              onChange={(e) => update('evaluationActive', e.target.checked)}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
            />
            <span className="text-sm font-medium text-slate-700">
              Expertise de dangerosité (inclure les échelles clinico-actuarielles)
            </span>
          </label>
        </div>
        <p className="text-xs text-slate-500 mt-2 ml-8">
          Active l'évaluation approfondie du risque avec outils actuariels standardisés (HCR-20, PCL-R, STATIC-99, etc.)
        </p>
      </SectionCard>

      {data.evaluationActive && (
        <CarteEchellesCompletes
          echelles={data.echellesCompletes}
          onChange={(e) => update('echellesCompletes', e)}
        />
      )}

      {data.evaluationActive &&
        data.echellesCompletes.some((e) => ['SSPI-2', 'Static-2002R', 'SVR-20'].includes(e.scaleType)) && (
          <CarteSyntheseJPS
            synthese={data.syntheseJPS}
            onChange={(s) => update('syntheseJPS', s)}
          />
        )}

      <div className="space-y-5">
        <Carte1
          danger={data.dangerositePsychiatrique}
          risque={data.risqueRecidive}
          onDangerChange={(v) => update('dangerositePsychiatrique', v)}
          onRisqueChange={(v) => update('risqueRecidive', v)}
        />
        <Carte2
          risque={data.facteursRisque}
          protection={data.facteursProtection}
          onRisqueChange={(v) => update('facteursRisque', v)}
          onProtectionChange={(v) => update('facteursProtection', v)}
        />
        <Carte3
          soins={data.necessiteSoins}
          injonction={data.injonctionSoinsDetails}
          modalites={data.modalitesInjonction}
          pronostic={data.pronostic}
          onSoinsChange={(v) => update('necessiteSoins', v)}
          onInjonctionChange={(v) => update('injonctionSoinsDetails', v)}
          onModalitesChange={(v) => update('modalitesInjonction', v)}
          onPronosticChange={(v) => update('pronostic', v)}
        />
      </div>
    </div>
  );
}

