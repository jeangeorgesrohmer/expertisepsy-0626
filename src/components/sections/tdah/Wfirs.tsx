import { useState } from 'react';
import type { WfirsData, WfirsScore, WfirsDomain } from '../../types/tdah';

interface Props {
  data: WfirsData;
  onChange: (data: WfirsData) => void;
}

type DomainKey = keyof Omit<WfirsData, 'synthese'>;

const DOMAINS: { key: DomainKey; label: string; color: string }[] = [
  { key: 'famille', label: 'Famille', color: 'blue' },
  { key: 'travail', label: 'Travail / Études', color: 'violet' },
  { key: 'vieQuotidienne', label: 'Vie quotidienne', color: 'teal' },
  { key: 'vieSociale', label: 'Vie sociale', color: 'orange' },
  { key: 'estime', label: 'Estime de soi', color: 'pink' },
  { key: 'risques', label: 'Activités à risque', color: 'red' },
];

const DOMAIN_ITEMS: Record<DomainKey, string[]> = {
  famille: [
    'S\'entend bien avec les membres de sa famille',
    'Participe aux activités familiales',
    'Contribue aux tâches ménagères',
    'N\'est pas une source de conflit pour la famille',
    'A des relations stables avec son/sa partenaire',
    'Assure ses responsabilités parentales',
    'Gère correctement les finances du foyer',
    'Se rappelle les événements importants (anniversaires, rendez-vous)',
    'Gère bien les crises et situations stressantes en famille',
  ],
  travail: [
    'Arrive à l\'heure au travail',
    'Respecte les délais et les priorités',
    'Maintient une qualité de travail satisfaisante',
    'Entretient de bonnes relations avec les collègues',
    'Est capable de suivre les instructions',
    'Gère bien les tâches multiples et l\'organisation',
    'Conserve son emploi / poursuit ses études',
    'Son rendement professionnel est satisfaisant',
  ],
  vieQuotidienne: [
    'Gère ses finances personnelles',
    'Paie ses factures à temps',
    'S\'occupe de son logement (ménage, entretien)',
    'Prend soin de sa santé (médecin, traitements)',
    'Prépare ses repas régulièrement',
    'Effectue ses courses et démarches administratives',
    'Gère son temps au quotidien',
    'Conduit de manière sécuritaire',
    'Respecte ses obligations légales',
    'Maintient une bonne hygiène personnelle',
  ],
  vieSociale: [
    'Maintient des amitiés à long terme',
    'Participe à des activités de groupe',
    'N\'est pas impulsif dans ses relations',
    'Est à l\'aise dans les interactions sociales',
    'Fait preuve d\'empathie envers les autres',
    'Gère bien les conflits interpersonnels',
    'S\'intègre dans de nouveaux groupes',
    'N\'a pas de comportements socialement inadaptés',
  ],
  estime: [
    'Se perçoit de façon positive',
    'Est satisfait de ses accomplissements',
    'N\'est pas découragé par ses difficultés',
    'Se sent capable de réussir ses projets',
    'Ne se déprécie pas face aux erreurs',
    'A un sentiment de valeur personnelle stable',
  ],
  risques: [
    'Ne prend pas de risques excessifs (physiques, financiers)',
    'Évite les comportements impulsifs à risque',
    'N\'abuse pas d\'alcool ou de substances',
    'Ne s\'engage pas dans des comportements sexuels à risque',
    'Respecte la loi',
    'Gère son agressivité',
    'N\'a pas de comportements d\'automutilation ou suicidaires',
  ],
};

const SCORE_OPTIONS: { value: WfirsScore; label: string; short: string; color: string }[] = [
  { value: 0, label: '0 — Aucun impact', short: '0', color: 'bg-green-100 text-green-800 border-green-300' },
  { value: 1, label: '1 — Léger', short: '1', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  { value: 2, label: '2 — Modéré', short: '2', color: 'bg-orange-100 text-orange-800 border-orange-300' },
  { value: 3, label: '3 — Grave', short: '3', color: 'bg-red-100 text-red-800 border-red-300' },
  { value: null, label: 'N/A', short: 'N/A', color: 'bg-slate-100 text-slate-500 border-slate-200' },
];

function computeDomainStats(domain: WfirsDomain) {
  const applicable = domain.items.filter((it) => it.score !== null);
  const significant = applicable.filter((it) => (it.score ?? 0) >= 2).length;
  const sum = applicable.reduce((s, it) => s + (it.score ?? 0), 0);
  const avg = applicable.length > 0 ? sum / applicable.length : null;
  return { applicable: applicable.length, total: domain.items.length, avg, significant };
}

function avgColor(avg: number | null) {
  if (avg === null) return 'text-slate-400';
  if (avg < 1) return 'text-green-700';
  if (avg < 2) return 'text-yellow-700';
  if (avg < 2.5) return 'text-orange-700';
  return 'text-red-700';
}

function avgBg(avg: number | null) {
  if (avg === null) return 'bg-slate-50 border-slate-200';
  if (avg < 1) return 'bg-green-50 border-green-300';
  if (avg < 2) return 'bg-yellow-50 border-yellow-300';
  if (avg < 2.5) return 'bg-orange-50 border-orange-300';
  return 'bg-red-50 border-red-300';
}

function ProgressBar({ avg }: { avg: number | null }) {
  if (avg === null) return <div className="h-2 bg-slate-100 rounded-full" />;
  const pct = Math.min(100, (avg / 3) * 100);
  const barColor = avg < 1 ? 'bg-green-500' : avg < 2 ? 'bg-yellow-500' : avg < 2.5 ? 'bg-orange-500' : 'bg-red-500';
  return (
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
      <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export default function Wfirs({ data, onChange }: Props) {
  const [activeDomain, setActiveDomain] = useState<DomainKey>('famille');

  const updateItem = (domainKey: DomainKey, idx: number, score: WfirsScore) => {
    const domain = data[domainKey] as WfirsDomain;
    const items = [...domain.items];
    items[idx] = { score };
    onChange({ ...data, [domainKey]: { ...domain, items } });
  };

  const currentDomain = data[activeDomain] as WfirsDomain;
  const currentItems = DOMAIN_ITEMS[activeDomain];
  const { applicable, total, avg, significant } = computeDomainStats(currentDomain);

  return (
    <div className="space-y-5">
      {/* Domain summary grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {DOMAINS.map(({ key, label }) => {
          const stats = computeDomainStats(data[key] as WfirsDomain);
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveDomain(key)}
              className={`flex flex-col items-start p-3 rounded-xl border-2 transition-all text-left ${
                activeDomain === key
                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                  : `${avgBg(stats.avg)} hover:border-slate-300`
              }`}
            >
              <span className="text-xs font-semibold text-slate-700 leading-tight">{label}</span>
              <div className="mt-1.5 w-full">
                <ProgressBar avg={stats.avg} />
              </div>
              <span className={`mt-1 text-base font-bold ${avgColor(stats.avg)}`}>
                {stats.avg !== null ? stats.avg.toFixed(1) : '—'}
              </span>
              {stats.significant > 0 && (
                <span className="text-xs text-red-600 font-medium">{stats.significant} item{stats.significant > 1 ? 's' : ''} ≥ 2</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active domain scoring */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className={`px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${avgBg(avg)}`}>
          <div>
            <h4 className="text-sm font-bold text-slate-800">
              {DOMAINS.find((d) => d.key === activeDomain)?.label}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">{applicable}/{total} items cotés</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className={`px-3 py-1.5 rounded-lg border font-semibold ${avgBg(avg)}`}>
              <span className={avgColor(avg)}>
                Moy : {avg !== null ? avg.toFixed(2) : '—'}
              </span>
            </div>
            {significant > 0 && (
              <div className="px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-700 font-semibold text-xs">
                {significant} item{significant > 1 ? 's' : ''} à impact significatif (≥ 2)
              </div>
            )}
          </div>
        </div>

        <div className="divide-y divide-slate-50">
          {currentItems.map((item, idx) => {
            const itemData = currentDomain.items[idx];
            const currentScore = itemData?.score ?? null;
            return (
              <div key={idx} className="px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2">
                <p className="flex-1 text-sm text-slate-700 leading-snug">
                  <span className="text-slate-400 text-xs mr-1.5">{idx + 1}.</span>
                  {item}
                </p>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {SCORE_OPTIONS.map((opt) => (
                    <button
                      key={String(opt.value)}
                      type="button"
                      onClick={() => updateItem(activeDomain, idx, opt.value)}
                      className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                        currentScore === opt.value
                          ? `${opt.color} border-current shadow-sm scale-105`
                          : 'bg-slate-50 text-slate-400 border-slate-200 hover:border-slate-300 hover:text-slate-600'
                      }`}
                    >
                      {opt.short}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 justify-center">
        {SCORE_OPTIONS.map((opt) => (
          <span key={String(opt.value)} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border ${opt.color}`}>
            <span className="font-bold">{opt.short}</span>
            <span>{opt.label === 'N/A' ? 'Non applicable' : opt.label.split('—')[1]?.trim()}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
