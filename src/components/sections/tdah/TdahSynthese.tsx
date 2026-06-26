import { useState } from 'react';
import { Brain, Copy, Check } from 'lucide-react';
import type { TdahData, WfirsDomain } from '../../../types/tdah';
import VoiceTextarea from '../../ui/VoiceTextarea';

interface Props {
  tdah: TdahData;
  onTdahChange: (data: TdahData) => void;
}

const WFIRS_DOMAIN_LABELS: Record<string, string> = {
  famille: 'Famille',
  travail: 'Travail / Études',
  vieQuotidienne: 'Vie quotidienne',
  vieSociale: 'Vie sociale',
  estime: 'Estime de soi',
  risques: 'Activités à risque',
};

function computeDomainStats(domain: WfirsDomain) {
  const applicable = domain.items.filter((it) => it.score !== null);
  const significant = applicable.filter((it) => (it.score ?? 0) >= 2).length;
  const sum = applicable.reduce((s, it) => s + (it.score ?? 0), 0);
  const avg = applicable.length > 0 ? sum / applicable.length : null;
  return { avg, significant };
}

export function generateTdahSynthesis(tdah: TdahData): string {
  const { diva5, wfirs } = tdah;

  const inattentionEnfance = diva5.inattention.filter((c) => c.childhood).length;
  const inattentionAdulte = diva5.inattention.filter((c) => c.adult).length;
  const hyperEnfance = diva5.hyperactivite.filter((c) => c.childhood).length;
  const hyperAdulte = diva5.hyperactivite.filter((c) => c.adult).length;

  const seuil_ia_e = inattentionEnfance >= 6;
  const seuil_ia_a = inattentionAdulte >= 5;
  const seuil_hy_e = hyperEnfance >= 6;
  const seuil_hy_a = hyperAdulte >= 5;

  const lines: string[] = [];

  lines.push('=== DIVA-5 — Entretien clinique structuré TDAH ===');
  lines.push('');
  lines.push('Partie A — Inattention :');
  lines.push(`  Enfance : ${inattentionEnfance}/9 critères présents (seuil ≥ 6 : ${seuil_ia_e ? 'ATTEINT' : 'non atteint'})`);
  lines.push(`  Adulte : ${inattentionAdulte}/9 critères présents (seuil ≥ 5 : ${seuil_ia_a ? 'ATTEINT' : 'non atteint'})`);
  lines.push('');
  lines.push('Partie B — Hyperactivité/Impulsivité :');
  lines.push(`  Enfance : ${hyperEnfance}/9 critères présents (seuil ≥ 6 : ${seuil_hy_e ? 'ATTEINT' : 'non atteint'})`);
  lines.push(`  Adulte : ${hyperAdulte}/9 critères présents (seuil ≥ 5 : ${seuil_hy_a ? 'ATTEINT' : 'non atteint'})`);
  lines.push('');

  const retentissements: string[] = [];
  if (diva5.retentissementProfessionnel) retentissements.push('professionnel/scolaire');
  if (diva5.retentissementSocial) retentissements.push('social/relationnel');
  if (diva5.retentissementFamilial) retentissements.push('familial/conjugal');
  if (diva5.retentissementScolaire) retentissements.push('académique (historique)');
  if (diva5.autreRetentissement.trim()) retentissements.push(diva5.autreRetentissement.trim());

  lines.push('Partie C — Retentissement fonctionnel :');
  lines.push(retentissements.length > 0
    ? `  Domaines atteints : ${retentissements.join(', ')}`
    : '  Aucun retentissement coché');
  if (diva5.ageDebutSymptomes.trim()) {
    lines.push(`  Début des symptômes : ${diva5.ageDebutSymptomes}`);
  }
  lines.push('');

  const diagTdah = (seuil_ia_a || seuil_hy_a) && (seuil_ia_e || seuil_hy_e);
  lines.push(
    `Conclusion DIVA-5 : L'entretien clinique structuré DIVA-5 objective `
    + `${inattentionAdulte} critère(s) d'inattention`
    + (seuil_ia_a ? ' (seuil adulte atteint)' : '')
    + ` et ${hyperAdulte} critère(s) d'hyperactivité/impulsivité`
    + (seuil_hy_a ? ' (seuil adulte atteint)' : '')
    + ` à l'âge adulte. `
    + (diagTdah
      ? 'Ces résultats sont compatibles avec un diagnostic de TDAH selon les critères DSM-5.'
      : 'Ces résultats ne permettent pas de retenir un diagnostic de TDAH selon les critères DSM-5.')
  );
  lines.push('');

  lines.push('=== WFIRS — Évaluation du retentissement fonctionnel ===');
  lines.push('');

  const domainKeys = ['famille', 'travail', 'vieQuotidienne', 'vieSociale', 'estime', 'risques'] as const;
  const severeLabels: string[] = [];
  const moderateLabels: string[] = [];

  for (const key of domainKeys) {
    const stats = computeDomainStats((wfirs as Record<string, WfirsDomain>)[key]);
    const label = WFIRS_DOMAIN_LABELS[key];
    const avgStr = stats.avg !== null ? stats.avg.toFixed(2) : 'non évalué';
    const severity =
      stats.avg === null ? 'Non évalué'
      : stats.avg < 1 ? 'Aucun impact'
      : stats.avg < 2 ? 'Léger'
      : stats.avg < 2.5 ? 'Modéré'
      : 'Grave';
    lines.push(`  ${label} : score moyen = ${avgStr} (${severity}) — ${stats.significant} item(s) à impact significatif (≥ 2)`);
    if (stats.avg !== null && stats.avg >= 2.5) severeLabels.push(label);
    else if (stats.avg !== null && stats.avg >= 1.5) moderateLabels.push(label);
  }
  lines.push('');

  if (severeLabels.length > 0 || moderateLabels.length > 0) {
    lines.push("L'échelle WFIRS met en évidence :");
    if (severeLabels.length > 0) {
      lines.push(`  - Un retentissement grave dans : ${severeLabels.join(', ')}.`);
    }
    if (moderateLabels.length > 0) {
      lines.push(`  - Un retentissement modéré dans : ${moderateLabels.join(', ')}.`);
    }
  } else {
    lines.push("L'échelle WFIRS ne met pas en évidence de retentissement fonctionnel significatif.");
  }

  return lines.join('\n');
}

export default function TdahSynthese({ tdah, onTdahChange }: Props) {
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const text = generateTdahSynthesis(tdah);
    onTdahChange({ ...tdah, diva5: { ...tdah.diva5, synthese: text } });
  };

  const handleCopy = async () => {
    const text = tdah.diva5.synthese;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={handleGenerate}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <Brain size={16} />
          Générer la synthèse automatique
        </button>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!tdah.diva5.synthese}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Copié !' : 'Copier'}
        </button>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Synthèse TDAH — éditable avant insertion dans le rapport
          </p>
        </div>
        <div className="p-4">
          <VoiceTextarea
            rows={20}
            placeholder='Cliquez sur "Générer la synthèse automatique" ou rédigez directement...'
            value={tdah.diva5.synthese}
            onChange={(v) => onTdahChange({ ...tdah, diva5: { ...tdah.diva5, synthese: v } })}
            minHeight="400px"
          />
        </div>
      </div>
    </div>
  );
}
