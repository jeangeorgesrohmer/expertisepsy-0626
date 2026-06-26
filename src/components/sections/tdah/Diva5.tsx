import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Diva5Data, Diva5CriterionData } from '../../types/tdah';
import VoiceTextarea from '../../ui/VoiceTextarea';

interface Props {
  data: Diva5Data;
  onChange: (data: Diva5Data) => void;
}

const INATTENTION_CRITERIA = [
  {
    label: 'A1 — Difficulté à maintenir son attention',
    examples: [
      'Fait des erreurs d\'inattention dans le travail, les devoirs ou autres activités',
      'Difficulté à soutenir l\'attention dans les tâches ou jeux',
      'Semble ne pas écouter quand on lui parle directement',
    ],
  },
  {
    label: 'A2 — Difficulté à organiser les tâches et activités',
    examples: [
      'Ne termine pas les tâches entreprises',
      'Difficultés à organiser son travail',
      'Évite ou n\'aime pas les activités qui requièrent un effort mental soutenu',
    ],
  },
  {
    label: 'A3 — Facilement distrait par des stimuli extérieurs',
    examples: [
      'Distrait par des bruits, mouvements ou pensées parasites',
      'Perd facilement le fil de ce qu\'il faisait',
      'Se laisse interrompre facilement',
    ],
  },
  {
    label: 'A4 — Oublis fréquents dans les activités quotidiennes',
    examples: [
      'Oublie les rendez-vous, les tâches ménagères, les démarches',
      'Perd régulièrement des objets nécessaires',
      'Oublie des messages, de rappeler, de répondre',
    ],
  },
  {
    label: 'A5 — Perd fréquemment les objets nécessaires',
    examples: [
      'Clés, portefeuille, téléphone, lunettes, documents',
      'Range les objets puis ne retrouve plus où',
    ],
  },
  {
    label: 'A6 — Évite ou remet à plus tard les tâches demandant un effort cognitif',
    examples: [
      'Procrastination chronique',
      'Évite la paperasse, les formulaires, la comptabilité',
      'Reporte indéfiniment les tâches administratives',
    ],
  },
  {
    label: 'A7 — Ne suit pas les instructions jusqu\'au bout / ne termine pas les tâches',
    examples: [
      'Commence mais abandonne avant la fin',
      'Difficulté à enchaîner les étapes d\'une tâche complexe',
    ],
  },
  {
    label: 'A8 — N\'écoute pas quand on lui parle directement',
    examples: [
      'Paraît préoccupé, absent',
      'Doit se faire répéter les informations',
      'Difficulté à maintenir la conversation',
    ],
  },
  {
    label: 'A9 — Facilement oublieux dans les activités quotidiennes',
    examples: [
      'Oublie les obligations courantes',
      'Difficultés à se souvenir d\'informations importantes sans aide-mémoire',
    ],
  },
];

const HYPERACTIVITE_CRITERIA = [
  {
    label: 'H1 — Remue souvent les mains ou les pieds, se tortille sur son siège',
    examples: [
      'Tapote des doigts, agite les jambes',
      'Tics moteurs liés à l\'agitation',
      'Se balance sur sa chaise',
    ],
  },
  {
    label: 'H2 — Se lève souvent en classe ou dans d\'autres situations',
    examples: [
      'Difficulté à rester assis lors de réunions, repas, loisirs',
      'Besoin de changer de position fréquemment',
    ],
  },
  {
    label: 'H3 — Court ou grimpe dans des situations inappropriées',
    examples: [
      'Chez l\'adulte : sentiment de fébrilité interne, agitation intérieure',
      'Difficulté à se détendre complètement',
    ],
  },
  {
    label: 'H4 — Incapable de jouer calmement ou de se livrer à des activités de loisirs',
    examples: [
      'Besoin constant de stimulation ou d\'activité',
      'Difficulté à regarder un film sans rien faire d\'autre',
    ],
  },
  {
    label: 'H5 — Est souvent « sur la brèche » ou agit comme s\'il était « monté sur ressorts »',
    examples: [
      'Impression de ne jamais pouvoir s\'arrêter',
      'Sensation d\'un moteur intérieur',
    ],
  },
  {
    label: 'H6 — Parle souvent trop',
    examples: [
      'Monopolise les conversations',
      'Parle sans s\'arrêter, coupe facilement la parole',
    ],
  },
  {
    label: 'I1 — Répond aux questions avant qu\'elles ne soient entièrement posées (Impulsivité)',
    examples: [
      'Termine les phrases des autres',
      'Répond avant la fin de la question',
    ],
  },
  {
    label: 'I2 — A du mal à attendre son tour',
    examples: [
      'Difficulté dans les files d\'attente',
      'Impatience, irritabilité si contraint d\'attendre',
      'Coupe la parole fréquemment',
    ],
  },
  {
    label: 'I3 — Interrompt souvent les autres ou impose sa présence',
    examples: [
      'S\'immisce dans les conversations ou les activités d\'autrui',
      'Achète, décide, s\'engage sans réfléchir aux conséquences',
    ],
  },
];

function CriterionRow({
  criterion,
  data,
  onChange,
}: {
  criterion: typeof INATTENTION_CRITERIA[0];
  data: Diva5CriterionData;
  onChange: (d: Diva5CriterionData) => void;
}) {
  const [showExamples, setShowExamples] = useState(false);

  return (
    <div className="border border-slate-200 rounded-xl bg-white overflow-hidden">
      <div className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-start gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 leading-snug">{criterion.label}</p>
            <button
              type="button"
              onClick={() => setShowExamples((v) => !v)}
              className="mt-1 inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 transition-colors"
            >
              {showExamples ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              {showExamples ? 'Masquer les exemples' : 'Voir les exemples cliniques'}
            </button>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={data.childhood}
                  onChange={(e) => onChange({ ...data, childhood: e.target.checked })}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors ${data.childhood ? 'bg-amber-500' : 'bg-slate-200'}`} />
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${data.childhood ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
              <span className={`text-xs font-medium ${data.childhood ? 'text-amber-700' : 'text-slate-400'}`}>
                Enfance
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={data.adult}
                  onChange={(e) => onChange({ ...data, adult: e.target.checked })}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors ${data.adult ? 'bg-blue-600' : 'bg-slate-200'}`} />
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${data.adult ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
              <span className={`text-xs font-medium ${data.adult ? 'text-blue-700' : 'text-slate-400'}`}>
                Adulte
              </span>
            </label>
          </div>
        </div>

        {showExamples && (
          <ul className="mt-3 space-y-1 pl-3 border-l-2 border-blue-100">
            {criterion.examples.map((ex, i) => (
              <li key={i} className="text-xs text-slate-500 leading-snug">
                {ex}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-3">
          <VoiceTextarea
            rows={2}
            placeholder="Notes / Exemples de l'expertisé..."
            value={data.notes}
            onChange={(v) => onChange({ ...data, notes: v })}
            minHeight="48px"
          />
        </div>
      </div>
    </div>
  );
}

function ScoreBadge({ count, threshold, label }: { count: number; threshold: number; label: string }) {
  const met = count >= threshold;
  return (
    <div className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 ${
      met
        ? 'bg-red-50 border-red-400 text-red-800'
        : count >= threshold - 1
        ? 'bg-amber-50 border-amber-400 text-amber-800'
        : 'bg-slate-50 border-slate-200 text-slate-600'
    }`}>
      <span className="text-sm font-semibold">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold">{count}</span>
        <span className="text-sm opacity-70">/ {threshold} requis</span>
        {met && <span className="text-xs font-bold bg-red-200 text-red-800 px-2 py-0.5 rounded-full">Seuil atteint</span>}
      </div>
    </div>
  );
}

export default function Diva5({ data, onChange }: Props) {
  const [activeTab, setActiveTab] = useState<'A' | 'B' | 'C'>('A');

  const childhoodInattention = data.inattention.filter((c) => c.childhood).length;
  const adultInattention = data.inattention.filter((c) => c.adult).length;
  const childhoodHyper = data.hyperactivite.filter((c) => c.childhood).length;
  const adultHyper = data.hyperactivite.filter((c) => c.adult).length;

  const updateInattention = (idx: number, criterion: Diva5CriterionData) => {
    const updated = [...data.inattention];
    updated[idx] = criterion;
    onChange({ ...data, inattention: updated });
  };

  const updateHyperactivite = (idx: number, criterion: Diva5CriterionData) => {
    const updated = [...data.hyperactivite];
    updated[idx] = criterion;
    onChange({ ...data, hyperactivite: updated });
  };

  const tabs = [
    { id: 'A' as const, label: 'A — Inattention', count: adultInattention, threshold: 5 },
    { id: 'B' as const, label: 'B — Hyperactivité/Impulsivité', count: adultHyper, threshold: 5 },
    { id: 'C' as const, label: 'C — Retentissement', count: null, threshold: null },
  ];

  return (
    <div className="space-y-6">
      {/* Score summary bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Inattention</p>
          <ScoreBadge count={childhoodInattention} threshold={6} label="Enfance (≥ 6/9)" />
          <ScoreBadge count={adultInattention} threshold={5} label="Adulte (≥ 5/9)" />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Hyperactivité / Impulsivité</p>
          <ScoreBadge count={childhoodHyper} threshold={6} label="Enfance (≥ 6/9)" />
          <ScoreBadge count={adultHyper} threshold={5} label="Adulte (≥ 5/9)" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.id}</span>
            {tab.count !== null && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                tab.count >= (tab.threshold ?? 5)
                  ? 'bg-red-100 text-red-700'
                  : 'bg-slate-200 text-slate-600'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Partie A */}
      {activeTab === 'A' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base font-semibold text-slate-800">Partie A — Inattention</h3>
            <div className="flex gap-2 text-xs text-slate-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> Enfance</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-600 inline-block" /> Adulte</span>
            </div>
          </div>
          {INATTENTION_CRITERIA.map((criterion, idx) => (
            <CriterionRow
              key={idx}
              criterion={criterion}
              data={data.inattention[idx]}
              onChange={(d) => updateInattention(idx, d)}
            />
          ))}
        </div>
      )}

      {/* Partie B */}
      {activeTab === 'B' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base font-semibold text-slate-800">Partie B — Hyperactivité / Impulsivité</h3>
            <div className="flex gap-2 text-xs text-slate-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> Enfance</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-600 inline-block" /> Adulte</span>
            </div>
          </div>
          {HYPERACTIVITE_CRITERIA.map((criterion, idx) => (
            <CriterionRow
              key={idx}
              criterion={criterion}
              data={data.hyperactivite[idx]}
              onChange={(d) => updateHyperactivite(idx, d)}
            />
          ))}
        </div>
      )}

      {/* Partie C */}
      {activeTab === 'C' && (
        <div className="space-y-5">
          <h3 className="text-base font-semibold text-slate-800">Partie C — Retentissement et critères d'exclusion</h3>

          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
            <h4 className="text-sm font-semibold text-slate-700">Âge de début des symptômes</h4>
            <div>
              <label className="text-xs text-slate-500 block mb-1">Plusieurs symptômes présents avant l'âge de 12 ans ?</label>
              <input
                type="text"
                value={data.ageDebutSymptomes}
                onChange={(e) => onChange({ ...data, ageDebutSymptomes: e.target.value })}
                placeholder="Préciser l'âge ou les circonstances..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
            <h4 className="text-sm font-semibold text-slate-700">Retentissement fonctionnel (au moins 2 domaines)</h4>
            {[
              { key: 'retentissementProfessionnel' as const, label: 'Professionnel / Scolaire' },
              { key: 'retentissementSocial' as const, label: 'Social / Relationnel' },
              { key: 'retentissementFamilial' as const, label: 'Familial / Conjugal' },
              { key: 'retentissementScolaire' as const, label: 'Académique (historique)' },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer">
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={data[key]}
                    onChange={(e) => onChange({ ...data, [key]: e.target.checked })}
                    className="sr-only"
                  />
                  <div className={`w-10 h-6 rounded-full transition-colors ${data[key] ? 'bg-blue-600' : 'bg-slate-200'}`} />
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${data[key] ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
                <span className={`text-sm ${data[key] ? 'text-blue-700 font-medium' : 'text-slate-600'}`}>{label}</span>
              </label>
            ))}
            <VoiceTextarea
              rows={2}
              placeholder="Autre retentissement à préciser..."
              value={data.autreRetentissement}
              onChange={(v) => onChange({ ...data, autreRetentissement: v })}
              minHeight="48px"
            />
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
            <h4 className="text-sm font-semibold text-slate-700">Diagnostics différentiels à exclure</h4>
            <p className="text-xs text-slate-500">Les symptômes ne sont pas mieux expliqués par :</p>
            {[
              { key: 'exclusionSchizophrenie' as const, label: 'Schizophrénie ou autre trouble psychotique' },
              { key: 'exclusionTroubleHumeur' as const, label: 'Trouble de l\'humeur (dépression, bipolarité)' },
              { key: 'exclusionTroubleAnxieux' as const, label: 'Trouble anxieux / État de stress' },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer">
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={data[key]}
                    onChange={(e) => onChange({ ...data, [key]: e.target.checked })}
                    className="sr-only"
                  />
                  <div className={`w-10 h-6 rounded-full transition-colors ${data[key] ? 'bg-amber-500' : 'bg-slate-200'}`} />
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${data[key] ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
                <span className={`text-sm ${data[key] ? 'text-amber-700 font-medium' : 'text-slate-600'}`}>{label}</span>
              </label>
            ))}
            <VoiceTextarea
              rows={2}
              placeholder="Autre diagnostic différentiel..."
              value={data.exclusionAutre}
              onChange={(v) => onChange({ ...data, exclusionAutre: v })}
              minHeight="48px"
            />
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Notes complémentaires (Partie C)</h4>
            <VoiceTextarea
              rows={4}
              placeholder="Observations cliniques concernant le retentissement et les exclusions..."
              value={data.notesPartieC}
              onChange={(v) => onChange({ ...data, notesPartieC: v })}
            />
          </div>
        </div>
      )}
    </div>
  );
}
