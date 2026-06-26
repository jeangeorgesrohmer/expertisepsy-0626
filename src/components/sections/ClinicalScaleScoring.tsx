import { useState } from 'react';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { SCALES, computeASRSPositiveCount, isASRSItemPositive, computePANSSSubscores, computeMoCAScore } from '../../constants/echellesActuarielles';
import type { ScaleItem } from '../../constants/echellesActuarielles';
import type { EchelleActuarielleComplete } from '../../types/dangerosite';
import { getClinicalInterpretation } from '../../utils/clinicalScaleInterpretation';
import VoiceTextarea from '../ui/VoiceTextarea';

interface Props {
  echelle: EchelleActuarielleComplete;
  onChange: (echelle: EchelleActuarielleComplete) => void;
  onRemove: () => void;
}

const THRESHOLDS_MAP: Record<string, string> = {
  MADRS: '0-6 (Absence) | 7-19 (Legere) | 20-34 (Moyenne) | 35-60 (Severe)',
  BPRS: '18-30 (Non significatif) | 31-40 (Leger) | 41-53 (Modere) | 54-126 (Severe)',
  AUDIT: '0-7 (Faible risque) | 8-15 (A risque) | 16-19 (Nocive) | 20-40 (Dependance probable)',
  'M-FAST': '0-5 (Profil valide) | 6-25 (Probabilite elevee de simulation)',
  MMSE: '27-30 (Normal) | 24-26 (Deficit leger) | 10-23 (Deficit modere) | <10 (Deficit severe)',
  'PCL-5': '<33 (Sous le seuil clinique) | >=33 (Probabilite elevee de TSPT)',
  ASRS: '<4 items positifs (Sous le seuil) | >=4 items positifs (Hautement compatible TDAH)',
  PANSS: '30-58 (Leger) | 59-75 (Modere) | 76-95 (Marque) | 96-210 (Severe)',
  'DAST-10': '0 (Aucun) | 1-2 (Faible) | 3-5 (Modere) | 6-8 (Eleve) | 9-10 (Severe)',
  MoCA: '>=26 (Normal) | <26 (Suspicion de deficit cognitif)',
  YMRS: '0-11 (Euthymie) | 12-19 (Hypomanie) | 20-30 (Manie moderee) | 31-60 (Manie severe)',
  CAM: 'Positif si criteres 1+2 presents ET critere 3 ou 4 present',
  MDAS: '0-6 (Absent/subclinique) | 7-12 (Leger) | 13-20 (Modere) | 21-30 (Severe) — Seuil diagnostique : >= 13',
};

function ItemRow({ item, currentScore, onScore, highlight }: {
  item: ScaleItem;
  currentScore: number | undefined;
  onScore: (id: string, value: number) => void;
  highlight?: boolean;
}) {
  return (
    <div className={`flex items-start gap-3 py-2 border-b border-slate-100 last:border-0 ${highlight ? 'bg-amber-50 -mx-1 px-1 rounded' : ''}`}>
      <div className="flex-1">
        <label className="text-sm text-slate-700 leading-tight">{item.label}</label>
      </div>
      <div className="flex items-center gap-1 flex-wrap shrink-0">
        {item.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onScore(item.id, option.value)}
            className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
              currentScore === option.value
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ClinicalScaleScoring({ echelle, onChange, onRemove }: Props) {
  const [isExpanded, setIsExpanded] = useState(true);
  const scale = SCALES[echelle.scaleType];

  if (!scale) return null;

  const isASRS = scale.scoringMode === 'count-positive';
  const isPANSS = echelle.scaleType === 'PANSS';
  const isMoCA = echelle.scaleType === 'MoCA';
  const panssScores = isPANSS ? computePANSSSubscores(echelle.scores) : null;

  let rawTotal: number;
  if (isPANSS) {
    rawTotal = panssScores!.total;
  } else if (isMoCA) {
    rawTotal = computeMoCAScore(echelle.scores);
  } else {
    rawTotal = Object.values(echelle.scores).reduce((sum, val) => sum + (val || 0), 0);
  }
  const displayScore = isASRS ? computeASRSPositiveCount(echelle.scores) : rawTotal;
  const interp = getClinicalInterpretation(echelle.scaleType, displayScore);
  const thresholds = THRESHOLDS_MAP[echelle.scaleType] ?? '';
  const scoredCount = Object.keys(echelle.scores).length;
  const totalItems = scale.items.length;

  const updateScore = (itemId: string, value: number) => {
    onChange({ ...echelle, scores: { ...echelle.scores, [itemId]: value } });
  };

  const renderItems = () => {
    if (scale.itemCategories) {
      return (
        <div className="space-y-5 mb-6">
          {scale.itemCategories.map((cat) => {
            const catItems = cat.itemIds.map((id) => scale.items.find((it) => it.id === id)!).filter(Boolean);
            const catScore = catItems.reduce((s, it) => s + (echelle.scores[it.id] || 0), 0);
            const catMax = catItems.reduce((s, it) => s + (it.maxPoints ?? Math.max(...it.options.map(o => o.value))), 0);
            return (
              <div key={cat.label}>
                <div className="flex items-center justify-between mb-2 pb-1 border-b-2 border-slate-200">
                  <h5 className="text-sm font-semibold text-slate-700">{cat.label}</h5>
                  <span className="text-xs font-medium text-slate-500">{catScore}/{catMax}</span>
                </div>
                <div className="space-y-1">
                  {catItems.map((item) => (
                    <ItemRow key={item.id} item={item} currentScore={echelle.scores[item.id]} onScore={updateScore} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div className="space-y-3 mb-6">
        {scale.items.map((item) => (
          <ItemRow
            key={item.id}
            item={item}
            currentScore={echelle.scores[item.id]}
            onScore={updateScore}
            highlight={isASRS && isASRSItemPositive(item, echelle.scores[item.id])}
          />
        ))}
      </div>
    );
  };

  const renderSignificantItems = () => {
    if (echelle.scaleType === 'M-FAST') {
      const positiveItems = scale.items.filter((item) => echelle.scores[item.id] === 1);
      if (positiveItems.length === 0) return null;
      return (
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h5 className="text-sm font-semibold text-amber-800 mb-2">Symptomes atypiques / discordants reperes :</h5>
          <ul className="space-y-1">
            {positiveItems.map((item) => (
              <li key={item.id} className="text-sm text-amber-900 flex items-start gap-2">
                <span className="text-amber-500 mt-0.5 shrink-0">&#x2022;</span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    if (echelle.scaleType === 'MMSE') {
      const errorItems = scale.items.filter((item) => echelle.scores[item.id] === 0);
      if (errorItems.length === 0) return null;
      return (
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h5 className="text-sm font-semibold text-amber-800 mb-2">Items echoues :</h5>
          <ul className="space-y-1">
            {errorItems.map((item) => (
              <li key={item.id} className="text-sm text-amber-900 flex items-start gap-2">
                <span className="text-amber-500 mt-0.5 shrink-0">&#x2022;</span>
                <span>{item.label} : Erreur</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    if (echelle.scaleType === 'PCL-5') {
      const significantItems = scale.items.filter((item) => (echelle.scores[item.id] ?? -1) >= 2);
      if (significantItems.length === 0) return null;
      const optionLabels: Record<number, string> = { 2: 'Moyennement', 3: 'Beaucoup', 4: 'Extremement' };
      return (
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h5 className="text-sm font-semibold text-amber-800 mb-2">Symptomes cliniquement significatifs (score &ge; 2) :</h5>
          <ul className="space-y-1">
            {significantItems.map((item) => {
              const val = echelle.scores[item.id];
              return (
                <li key={item.id} className="text-sm text-amber-900 flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5 shrink-0">&#x2022;</span>
                  <span>{item.label} : {optionLabels[val] ?? val} (Score: {val})</span>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }

    if (isPANSS && panssScores) {
      const panssLabels: Record<number, string> = { 2: 'Minime', 3: 'Leger', 4: 'Modere', 5: 'Mod. Severe', 6: 'Severe', 7: 'Extreme' };
      const presentItems = scale.items.filter((item) => (echelle.scores[item.id] ?? 1) > 1);
      return (
        <div className="mt-4 space-y-3">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h5 className="text-sm font-semibold text-slate-700 mb-2">Sous-scores PANSS :</h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div className="bg-white rounded-lg border border-slate-200 p-3 text-center">
                <div className="text-xs text-slate-500 mb-1">Positive (P)</div>
                <div className="font-bold text-slate-800">{panssScores.p}<span className="text-xs font-normal text-slate-400">/49</span></div>
              </div>
              <div className="bg-white rounded-lg border border-slate-200 p-3 text-center">
                <div className="text-xs text-slate-500 mb-1">Negative (N)</div>
                <div className="font-bold text-slate-800">{panssScores.n}<span className="text-xs font-normal text-slate-400">/49</span></div>
              </div>
              <div className="bg-white rounded-lg border border-slate-200 p-3 text-center">
                <div className="text-xs text-slate-500 mb-1">Generale (G)</div>
                <div className="font-bold text-slate-800">{panssScores.g}<span className="text-xs font-normal text-slate-400">/112</span></div>
              </div>
              <div className="bg-white rounded-lg border border-blue-200 p-3 text-center">
                <div className="text-xs text-blue-600 mb-1">Total PANSS</div>
                <div className="font-bold text-blue-800">{panssScores.total}<span className="text-xs font-normal text-blue-400">/210</span></div>
              </div>
            </div>
          </div>
          {presentItems.length > 0 && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h5 className="text-sm font-semibold text-amber-800 mb-2">Symptomes cliniquement presents (score &gt; 1) :</h5>
              <ul className="space-y-1">
                {presentItems.map((item) => {
                  const val = echelle.scores[item.id];
                  return (
                    <li key={item.id} className="text-sm text-amber-900 flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5 shrink-0">&#x2022;</span>
                      <span>{item.label} - {panssLabels[val] ?? val} ({val})</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      );
    }

    if (isASRS) {
      const positiveItems = scale.items.filter((item) => isASRSItemPositive(item, echelle.scores[item.id]));
      if (positiveItems.length === 0) return null;
      const optionLabels: Record<number, string> = { 0: 'Jamais', 1: 'Rarement', 2: 'Parfois', 3: 'Souvent', 4: 'Tres souvent' };
      return (
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h5 className="text-sm font-semibold text-amber-800 mb-2">Items positifs retenus :</h5>
          <ul className="space-y-1">
            {positiveItems.map((item) => {
              const val = echelle.scores[item.id];
              return (
                <li key={item.id} className="text-sm text-amber-900 flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5 shrink-0">&#x2022;</span>
                  <span>{item.label} : {optionLabels[val] ?? val} (Critere Positif retenu)</span>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }

    if (echelle.scaleType === 'DAST-10') {
      const scoredItems = scale.items.filter((item) => echelle.scores[item.id] === 1);
      if (scoredItems.length === 0) return null;
      return (
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h5 className="text-sm font-semibold text-amber-800 mb-2">Items positifs (1 point) :</h5>
          <ul className="space-y-1">
            {scoredItems.map((item) => {
              const isInverted = item.id === 'dast4' || item.id === 'dast5';
              const response = isInverted ? 'Non' : 'Oui';
              return (
                <li key={item.id} className="text-sm text-amber-900 flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5 shrink-0">&#x2022;</span>
                  <span>{item.label} : {response} (Score: 1)</span>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }

    if (isMoCA) {
      const deficientItems = scale.items.filter((item) => {
        if (item.id === 'moca_edu') return false;
        const val = echelle.scores[item.id];
        if (val === undefined) return false;
        const max = item.maxPoints ?? 1;
        return val < max;
      });
      if (deficientItems.length === 0) return null;
      return (
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h5 className="text-sm font-semibold text-amber-800 mb-2">Items deficitaires :</h5>
          <ul className="space-y-1">
            {deficientItems.map((item) => {
              const val = echelle.scores[item.id];
              const max = item.maxPoints ?? 1;
              const selectedOpt = item.options.find(o => o.value === val);
              return (
                <li key={item.id} className="text-sm text-amber-900 flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5 shrink-0">&#x2022;</span>
                  <span>{item.label} : {selectedOpt?.label ?? val} (Score: {val}/{max})</span>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }

    if (echelle.scaleType === 'YMRS') {
      const presentItems = scale.items.filter((item) => (echelle.scores[item.id] ?? 0) > 0);
      if (presentItems.length === 0) return null;
      return (
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h5 className="text-sm font-semibold text-amber-800 mb-2">Symptomes maniaques averes (score &gt; 0) :</h5>
          <ul className="space-y-1">
            {presentItems.map((item) => {
              const val = echelle.scores[item.id];
              const selectedOpt = item.options.find(o => o.value === val);
              return (
                <li key={item.id} className="text-sm text-amber-900 flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5 shrink-0">&#x2022;</span>
                  <span>{item.label} : {selectedOpt?.label ?? val} (Score: {val})</span>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }

    if (echelle.scaleType === 'CAM') {
      const c1 = (echelle.scores['cam1'] ?? 0) >= 1;
      const c2 = (echelle.scores['cam2'] ?? 0) >= 1;
      const c3 = (echelle.scores['cam3'] ?? 0) >= 1;
      const c4 = (echelle.scores['cam4'] ?? 0) >= 1;
      const positive = c1 && c2 && (c3 || c4);
      return (
        <div className={`mt-4 p-4 rounded-lg border ${positive ? 'bg-red-50 border-red-300' : 'bg-green-50 border-green-300'}`}>
          <h5 className={`text-sm font-semibold mb-2 ${positive ? 'text-red-800' : 'text-green-800'}`}>
            Algorithme diagnostique CAM : {positive ? 'DELIRIUM CONFIRME' : 'Delirium non retenu'}
          </h5>
          <ul className="space-y-1 text-sm">
            <li className={c1 ? 'text-red-900' : 'text-slate-500'}>
              Critere 1 (Debut aigu / Fluctuation) : {c1 ? 'Present' : 'Absent'}
            </li>
            <li className={c2 ? 'text-red-900' : 'text-slate-500'}>
              Critere 2 (Inattention) : {c2 ? 'Present' : 'Absent'}
            </li>
            <li className={c3 ? 'text-red-900' : 'text-slate-500'}>
              Critere 3 (Pensee desorganisee) : {c3 ? 'Present' : 'Absent'}
            </li>
            <li className={c4 ? 'text-red-900' : 'text-slate-500'}>
              Critere 4 (Conscience alteree) : {c4 ? 'Present' : 'Absent'}
            </li>
          </ul>
          <p className="mt-2 text-xs text-slate-600">
            Regle : Positif si criteres 1+2 presents ET (3 ou 4) present.
          </p>
        </div>
      );
    }

    if (echelle.scaleType === 'MDAS') {
      const presentItems = scale.items.filter((item) => (echelle.scores[item.id] ?? 0) > 0);
      if (presentItems.length === 0) return null;
      return (
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h5 className="text-sm font-semibold text-amber-800 mb-2">Symptomes confusionnels presents (score &gt; 0) :</h5>
          <ul className="space-y-1">
            {presentItems.map((item) => {
              const val = echelle.scores[item.id];
              const selectedOpt = item.options.find(o => o.value === val);
              return (
                <li key={item.id} className="text-sm text-amber-900 flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5 shrink-0">&#x2022;</span>
                  <span>{item.label} : {selectedOpt?.label ?? val} (Score: {val})</span>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="border border-slate-300 rounded-lg bg-white shadow-sm">
      <div className="p-4 bg-slate-50 border-b border-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex-1">
          <h3 className="font-semibold text-slate-800">{scale.fullName}</h3>
          <p className="text-sm text-slate-600 mt-1">{scale.description}</p>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
            <span className="font-medium text-blue-700">
              {isASRS
                ? `Items positifs : ${displayScore} / ${scale.maxScore}`
                : `Score total : ${displayScore} / ${scale.maxScore}`}
              {scale.minScore !== undefined ? ` (min : ${scale.minScore})` : ''}
            </span>
            {panssScores && (
              <span className="text-xs text-slate-600">
                P: {panssScores.p}/49 | N: {panssScores.n}/49 | G: {panssScores.g}/112
              </span>
            )}
            <span className="text-slate-500 text-xs">
              {scoredCount}/{totalItems} items cotes
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 px-3 py-1.5 hover:bg-slate-200 rounded-lg transition-colors text-sm font-medium text-slate-700"
          >
            {isExpanded ? <><ChevronUp size={18} /><span className="hidden sm:inline">Reduire</span></> : <><ChevronDown size={18} /><span className="hidden sm:inline">Developper</span></>}
          </button>
          <button
            onClick={onRemove}
            className="flex items-center gap-1 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium border border-red-300"
          >
            <Trash2 size={18} />
            <span className="hidden sm:inline">Supprimer</span>
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4">
          {renderItems()}

          {interp && (
            <div className="border-t border-slate-300 pt-4 mt-4">
              <h4 className="font-semibold text-slate-800 mb-3">
                Resultat {scale.name}
              </h4>

              <div className={`${interp.bg} border-l-4 ${interp.border} p-4 rounded-r-lg`}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-semibold text-slate-900">Interpretation :</span>
                    <span className={`font-bold ${interp.color}`}>{interp.level}</span>
                    <span className="text-slate-600">({displayScore}/{scale.maxScore})</span>
                  </div>
                  <p className="text-sm text-slate-700">{interp.description}</p>
                  <div className="mt-2 text-xs text-slate-600">
                    <span className="font-medium">Seuils de reference :</span> {thresholds}
                  </div>
                </div>
              </div>

              {renderSignificantItems()}
            </div>
          )}

          <div className="border-t border-slate-300 pt-4 mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Interpretation clinique et synthese
            </label>
            <VoiceTextarea
              value={echelle.syntheseClinique}
              onChange={(v) => onChange({ ...echelle, syntheseClinique: v })}
              placeholder="Analyse clinique detaillee integrant le score obtenu, le contexte clinique et la dynamique du patient..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-[120px] text-sm pr-10"
            />
          </div>
        </div>
      )}
    </div>
  );
}
