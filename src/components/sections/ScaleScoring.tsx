import { useState } from 'react';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { SCALES, computeStatic2002RScore } from '../../constants/echellesActuarielles';
import type { EchelleActuarielleComplete } from '../../types/dangerosite';
import VoiceTextarea from '../ui/VoiceTextarea';

interface Props {
  echelle: EchelleActuarielleComplete;
  onChange: (echelle: EchelleActuarielleComplete) => void;
  onRemove: () => void;
}

export default function ScaleScoring({ echelle, onChange, onRemove }: Props) {
  const [isExpanded, setIsExpanded] = useState(true);
  const scale = SCALES[echelle.scaleType];

  const calculateTotal = () => {
    const riskTotal = Object.values(echelle.scores).reduce((sum, val) => sum + (val || 0), 0);
    const protectiveTotal = echelle.protectiveScores
      ? Object.values(echelle.protectiveScores).reduce((sum, val) => sum + (val || 0), 0)
      : 0;
    return { riskTotal, protectiveTotal, total: riskTotal + protectiveTotal };
  };

  const calculatePCLRSubscores = () => {
    if (echelle.scaleType !== 'PCL-R') return null;

    const facet1Items = ['pcl1', 'pcl2', 'pcl4', 'pcl5'];
    const facet2Items = ['pcl6', 'pcl7', 'pcl8', 'pcl16'];
    const facet3Items = ['pcl3', 'pcl9', 'pcl13', 'pcl14', 'pcl15'];
    const facet4Items = ['pcl10', 'pcl12', 'pcl18', 'pcl19', 'pcl20'];

    const facet1 = facet1Items.reduce((sum, id) => sum + (echelle.scores[id] || 0), 0);
    const facet2 = facet2Items.reduce((sum, id) => sum + (echelle.scores[id] || 0), 0);
    const facet3 = facet3Items.reduce((sum, id) => sum + (echelle.scores[id] || 0), 0);
    const facet4 = facet4Items.reduce((sum, id) => sum + (echelle.scores[id] || 0), 0);

    const factor1 = facet1 + facet2;
    const factor2 = facet3 + facet4;

    return { facet1, facet2, facet3, facet4, factor1, factor2 };
  };

  const getPCLRInterpretation = (score: number) => {
    if (score < 21) {
      return { level: 'Faible', description: 'Score suggestif d\'une absence de traits psychopathiques significatifs.', color: 'text-green-700', bg: 'bg-green-50' };
    } else if (score < 30) {
      return { level: 'Moyen', description: 'Score indicatif de traits psychopathiques modérés. Une évaluation approfondie est recommandée.', color: 'text-orange-700', bg: 'bg-orange-50' };
    } else {
      return { level: 'Élevé', description: 'Score compatible avec un diagnostic de psychopathie clinique. Risque significatif de récidive violente.', color: 'text-red-700', bg: 'bg-red-50' };
    }
  };

  const calculateHCR20Subscores = () => {
    if (echelle.scaleType !== 'HCR-20') return null;

    const historicalItems = ['hcr1', 'hcr2', 'hcr3', 'hcr4', 'hcr5', 'hcr6', 'hcr7', 'hcr8', 'hcr9', 'hcr10'];
    const clinicalItems = ['hcr11', 'hcr12', 'hcr13', 'hcr14', 'hcr15'];
    const riskManagementItems = ['hcr16', 'hcr17', 'hcr18', 'hcr19', 'hcr20'];

    const historical = historicalItems.reduce((sum, id) => sum + (echelle.scores[id] || 0), 0);
    const clinical = clinicalItems.reduce((sum, id) => sum + (echelle.scores[id] || 0), 0);
    const riskManagement = riskManagementItems.reduce((sum, id) => sum + (echelle.scores[id] || 0), 0);

    return { historical, clinical, riskManagement };
  };

  const getHCR20Interpretation = (score: number) => {
    if (score < 15) {
      return { level: 'Faible', description: 'Risque de violence à venir considéré comme faible. Facteurs de risque limités.', color: 'text-green-700', bg: 'bg-green-50' };
    } else if (score < 25) {
      return { level: 'Modéré', description: 'Risque de violence à venir modéré. Présence de facteurs de risque nécessitant surveillance et intervention.', color: 'text-orange-700', bg: 'bg-orange-50' };
    } else {
      return { level: 'Élevé', description: 'Risque de violence à venir élevé. Facteurs de risque significatifs nécessitant gestion intensive.', color: 'text-red-700', bg: 'bg-red-50' };
    }
  };

  const getVRAGInterpretation = (score: number) => {
    if (score < -21) {
      return { level: 'Catégorie 1 (Très faible)', description: 'Probabilité de récidive violente : 0-8% à 7 ans. Risque très faible.', color: 'text-green-700', bg: 'bg-green-50' };
    } else if (score < -5) {
      return { level: 'Catégorie 2-3 (Faible)', description: 'Probabilité de récidive violente : 9-17% à 7 ans. Risque faible.', color: 'text-green-600', bg: 'bg-green-50' };
    } else if (score < 4) {
      return { level: 'Catégorie 4-5 (Faible-Modéré)', description: 'Probabilité de récidive violente : 18-31% à 7 ans. Risque faible à modéré.', color: 'text-yellow-700', bg: 'bg-yellow-50' };
    } else if (score < 12) {
      return { level: 'Catégorie 6-7 (Modéré)', description: 'Probabilité de récidive violente : 32-48% à 7 ans. Risque modéré.', color: 'text-orange-700', bg: 'bg-orange-50' };
    } else if (score < 24) {
      return { level: 'Catégorie 8 (Élevé)', description: 'Probabilité de récidive violente : 49-58% à 7 ans. Risque élevé.', color: 'text-red-600', bg: 'bg-red-50' };
    } else {
      return { level: 'Catégorie 9 (Très élevé)', description: 'Probabilité de récidive violente : 59-100% à 7 ans. Risque très élevé.', color: 'text-red-700', bg: 'bg-red-50' };
    }
  };

  const getODARAInterpretation = (score: number) => {
    if (score < 3) {
      return { level: 'Faible', description: 'Probabilité de récidive de violence conjugale à 5 ans : environ 6%. Risque faible.', color: 'text-green-700', bg: 'bg-green-50' };
    } else if (score < 5) {
      return { level: 'Modéré', description: 'Probabilité de récidive de violence conjugale à 5 ans : environ 19%. Risque modéré.', color: 'text-orange-700', bg: 'bg-orange-50' };
    } else {
      return { level: 'Élevé', description: 'Probabilité de récidive de violence conjugale à 5 ans : supérieure à 35%. Risque élevé.', color: 'text-red-700', bg: 'bg-red-50' };
    }
  };

  const calculateSARASubscores = () => {
    if (echelle.scaleType !== 'SARA') return null;

    const criminalHistoryItems = ['sara1', 'sara2', 'sara3', 'sara4', 'sara5'];
    const psychosocialItems = ['sara6', 'sara7', 'sara8', 'sara9', 'sara10'];
    const spouseAssaultItems = ['sara11', 'sara12', 'sara13', 'sara14', 'sara15'];
    const currentOffenseItems = ['sara16', 'sara17', 'sara18', 'sara19', 'sara20'];

    const criminalHistory = criminalHistoryItems.reduce((sum, id) => sum + (echelle.scores[id] || 0), 0);
    const psychosocial = psychosocialItems.reduce((sum, id) => sum + (echelle.scores[id] || 0), 0);
    const spouseAssault = spouseAssaultItems.reduce((sum, id) => sum + (echelle.scores[id] || 0), 0);
    const currentOffense = currentOffenseItems.reduce((sum, id) => sum + (echelle.scores[id] || 0), 0);

    return { criminalHistory, psychosocial, spouseAssault, currentOffense };
  };

  const getSARAInterpretation = (score: number) => {
    if (score < 15) {
      return { level: 'Faible', description: 'Risque d\'agression conjugale faible. Facteurs de risque limités.', color: 'text-green-700', bg: 'bg-green-50' };
    } else if (score < 25) {
      return { level: 'Modéré', description: 'Risque d\'agression conjugale modéré. Surveillance et intervention recommandées.', color: 'text-orange-700', bg: 'bg-orange-50' };
    } else {
      return { level: 'Élevé', description: 'Risque d\'agression conjugale élevé. Intervention immédiate et gestion intensive nécessaires.', color: 'text-red-700', bg: 'bg-red-50' };
    }
  };

  const calculateSAVRYSubscores = () => {
    if (echelle.scaleType !== 'SAVRY') return null;

    const historicalItems = ['savry1', 'savry2', 'savry3', 'savry4', 'savry5', 'savry6', 'savry7', 'savry8', 'savry9', 'savry10'];
    const socialItems = ['savry11', 'savry12', 'savry13', 'savry14', 'savry15', 'savry16'];
    const contextualItems = ['savry17', 'savry18', 'savry19', 'savry20'];
    const individualItems = ['savry21', 'savry22', 'savry23', 'savry24'];
    const protectiveItems = ['savryP1', 'savryP2', 'savryP3', 'savryP4', 'savryP5', 'savryP6'];

    const historical = historicalItems.reduce((sum, id) => sum + (echelle.scores[id] || 0), 0);
    const social = socialItems.reduce((sum, id) => sum + (echelle.scores[id] || 0), 0);
    const contextual = contextualItems.reduce((sum, id) => sum + (echelle.scores[id] || 0), 0);
    const individual = individualItems.reduce((sum, id) => sum + (echelle.scores[id] || 0), 0);
    const protective = protectiveItems.reduce((sum, id) => sum + (echelle.protectiveScores?.[id] || 0), 0);

    return { historical, social, contextual, individual, protective };
  };

  const getSAVRYInterpretation = (riskScore: number, protectiveScore: number) => {
    if (riskScore < 15) {
      return { level: 'Faible', description: 'Risque de violence chez ce jeune considéré comme faible. Présence de facteurs de protection renforçant le pronostic.', color: 'text-green-700', bg: 'bg-green-50' };
    } else if (riskScore < 30) {
      return { level: 'Modéré', description: 'Risque de violence modéré. Équilibre entre facteurs de risque et de protection à considérer dans la prise en charge.', color: 'text-orange-700', bg: 'bg-orange-50' };
    } else {
      return { level: 'Élevé', description: 'Risque de violence élevé. Intervention intensive nécessaire, avec renforcement des facteurs de protection.', color: 'text-red-700', bg: 'bg-red-50' };
    }
  };

  const getStatic99RInterpretation = (score: number) => {
    if (score <= 1) {
      return { level: 'Catégorie I (Faible)', description: 'Risque de récidive sexuelle faible. Probabilité de récidive à 5 ans : 3-7%.', color: 'text-green-700', bg: 'bg-green-50' };
    } else if (score <= 3) {
      return { level: 'Catégorie II (Faible-Moyen)', description: 'Risque de récidive sexuelle faible à moyen. Probabilité de récidive à 5 ans : 7-11%.', color: 'text-green-600', bg: 'bg-green-50' };
    } else if (score <= 5) {
      return { level: 'Catégorie III (Moyen-Élevé)', description: 'Risque de récidive sexuelle moyen à élevé. Probabilité de récidive à 5 ans : 12-16%.', color: 'text-yellow-700', bg: 'bg-yellow-50' };
    } else if (score <= 7) {
      return { level: 'Catégorie IVa (Élevé)', description: 'Risque de récidive sexuelle élevé. Probabilité de récidive à 5 ans : 17-25%.', color: 'text-orange-700', bg: 'bg-orange-50' };
    } else {
      return { level: 'Catégorie IVb (Très élevé)', description: 'Risque de récidive sexuelle très élevé. Probabilité de récidive à 5 ans : supérieure à 25%.', color: 'text-red-700', bg: 'bg-red-50' };
    }
  };

  const getStable2007Interpretation = (score: number) => {
    if (score < 5) {
      return { level: 'Faible', description: 'Facteurs de risque dynamiques faibles. Les facteurs de risque actuels sont limités. À croiser avec le Static-99R pour évaluation complète.', color: 'text-green-700', bg: 'bg-green-50' };
    } else if (score < 12) {
      return { level: 'Modéré', description: 'Facteurs de risque dynamiques modérés. Présence de facteurs de risque nécessitant intervention ciblée. À croiser avec le Static-99R pour évaluation complète.', color: 'text-orange-700', bg: 'bg-orange-50' };
    } else {
      return { level: 'Élevé', description: 'Facteurs de risque dynamiques élevés. Facteurs de risque significatifs nécessitant intervention intensive. À croiser avec le Static-99R pour évaluation complète.', color: 'text-red-700', bg: 'bg-red-50' };
    }
  };

  const getSSPI2Interpretation = (score: number) => {
    if (score <= 1) {
      return { level: 'Faible', description: 'Indicateurs comportementaux d\'intérêts pédophiliques limités. Probabilité faible d\'intérêts sexuels pédophiliques sur la base des caractéristiques des victimes.', color: 'text-green-700', bg: 'bg-green-50' };
    } else if (score === 2) {
      return { level: 'Modéré', description: 'Présence de certains indicateurs comportementaux. Une évaluation sexologique approfondie est recommandée.', color: 'text-orange-700', bg: 'bg-orange-50' };
    } else {
      return { level: 'Élevé', description: 'Indicateurs comportementaux multiples évocateurs d\'intérêts sexuels pédophiliques. Évaluation spécialisée approfondie fortement recommandée (entretien sexologique, évaluation phallométrique si disponible).', color: 'text-red-700', bg: 'bg-red-50' };
    }
  };

  const getStatic2002RInterpretation = (score: number) => {
    if (score <= 1) {
      return { level: 'Niveau I (Très faible)', description: 'Risque de récidive sexuelle très faible, bien inférieur à la moyenne des auteurs d\'infractions sexuelles.', color: 'text-green-700', bg: 'bg-green-50' };
    } else if (score <= 3) {
      return { level: 'Niveau II (Inférieur à la moyenne)', description: 'Risque de récidive sexuelle inférieur à la moyenne des auteurs d\'infractions sexuelles.', color: 'text-green-600', bg: 'bg-green-50' };
    } else if (score <= 5) {
      return { level: 'Niveau III (Moyen)', description: 'Risque de récidive sexuelle dans la moyenne des auteurs d\'infractions sexuelles.', color: 'text-yellow-700', bg: 'bg-yellow-50' };
    } else if (score <= 7) {
      return { level: 'Niveau IVa (Supérieur à la moyenne)', description: 'Risque de récidive sexuelle supérieur à la moyenne. Mesures de gestion du risque et prise en charge structurée recommandées.', color: 'text-orange-700', bg: 'bg-orange-50' };
    } else {
      return { level: 'Niveau IVb (Bien supérieur à la moyenne)', description: 'Risque de récidive sexuelle bien supérieur à la moyenne. Gestion intensive du risque et prise en charge spécialisée nécessaires.', color: 'text-red-700', bg: 'bg-red-50' };
    }
  };

  const getCASICInterpretation = (score: number) => {
    if (score <= 1) {
      return { level: 'Faible', description: 'Peu d\'indicateurs comportementaux d\'intérêt sexuel envers les enfants. Le déni du sujet ne peut être invalidé par les seuls indicateurs de la CASIC.', color: 'text-green-700', bg: 'bg-green-50' };
    } else if (score === 2) {
      return { level: 'Modéré', description: 'Présence de certains indicateurs comportementaux. Résultat insuffisant pour forcer l\'Item 5 du CPORT, mais une évaluation approfondie est recommandée.', color: 'text-orange-700', bg: 'bg-orange-50' };
    } else {
      return { level: 'Significatif (seuil atteint)', description: `Score CASIC ≥ 3 : les indicateurs comportementaux valident cliniquement un intérêt pédophilique malgré le déni. Si le CPORT est coté, l'Item 5 doit être forcé à 1.`, color: 'text-red-700', bg: 'bg-red-50' };
    }
  };

  const getCPORTInterpretation = (score: number) => {
    if (score === 0) {
      return { level: 'Très Faible', description: 'Aucun facteur de risque statique identifié. Risque relatif de récidive très faible parmi les auteurs d\'infractions MASM.', color: 'text-green-700', bg: 'bg-green-50' };
    } else if (score === 1) {
      return { level: 'Faible-Modéré', description: 'Un facteur de risque identifié. Risque relatif faible à modéré.', color: 'text-green-600', bg: 'bg-green-50' };
    } else if (score === 2) {
      return { level: 'Modéré-Élevé', description: 'Deux facteurs de risque identifiés. Risque relatif modéré à élevé nécessitant une surveillance.', color: 'text-orange-700', bg: 'bg-orange-50' };
    } else if (score <= 4) {
      return { level: 'Élevé', description: 'Plusieurs facteurs de risque identifiés. Risque relatif élevé nécessitant une gestion active et une prise en charge structurée.', color: 'text-red-600', bg: 'bg-red-50' };
    } else {
      return { level: 'Très Élevé', description: 'Facteurs de risque multiples et cumulés. Risque relatif très élevé nécessitant une gestion intensive du risque.', color: 'text-red-700', bg: 'bg-red-50' };
    }
  };

  const calculateSTARTSubscores = () => {
    if (echelle.scaleType !== 'START') return null;

    const vulnerabilityTotal = Object.values(echelle.scores).reduce((sum, val) => sum + (val || 0), 0);
    const strengthTotal = echelle.strengthScores
      ? Object.values(echelle.strengthScores).reduce((sum, val) => sum + (val || 0), 0)
      : 0;

    return { vulnerabilityTotal, strengthTotal };
  };

  const updateScore = (itemId: string, value: number) => {
    onChange({
      ...echelle,
      scores: { ...echelle.scores, [itemId]: value },
    });
  };

  const updateProtectiveScore = (itemId: string, value: number) => {
    onChange({
      ...echelle,
      protectiveScores: { ...(echelle.protectiveScores || {}), [itemId]: value },
    });
  };

  const updateStrengthScore = (itemId: string, value: number) => {
    onChange({
      ...echelle,
      strengthScores: { ...(echelle.strengthScores || {}), [itemId]: value },
    });
  };

  const { riskTotal, protectiveTotal, total } = calculateTotal();

  const getMaxItemValue = () => {
    const allOptions = scale.items[0]?.options || [];
    return Math.max(...allOptions.map(opt => opt.value));
  };

  const maxItemValue = getMaxItemValue();

  const pclrSubscores = calculatePCLRSubscores();
  const pclrInterpretation = echelle.scaleType === 'PCL-R' ? getPCLRInterpretation(total) : null;

  const hcr20Subscores = calculateHCR20Subscores();
  const hcr20Interpretation = echelle.scaleType === 'HCR-20' ? getHCR20Interpretation(total) : null;

  const vragInterpretation = echelle.scaleType === 'VRAG' ? getVRAGInterpretation(total) : null;

  const odaraInterpretation = echelle.scaleType === 'ODARA' ? getODARAInterpretation(total) : null;

  const saraSubscores = calculateSARASubscores();
  const saraInterpretation = echelle.scaleType === 'SARA' ? getSARAInterpretation(total) : null;

  const savrySubscores = calculateSAVRYSubscores();
  const savryInterpretation = echelle.scaleType === 'SAVRY' ? getSAVRYInterpretation(riskTotal, protectiveTotal) : null;

  const static99RInterpretation = echelle.scaleType === 'Static-99R' ? getStatic99RInterpretation(total) : null;

  const stable2007Interpretation = echelle.scaleType === 'STABLE-2007' ? getStable2007Interpretation(total) : null;

  const startSubscores = calculateSTARTSubscores();

  const static2002RSubscores = echelle.scaleType === 'Static-2002R' ? computeStatic2002RScore(echelle.scores) : null;
  const static2002RInterpretation = static2002RSubscores ? getStatic2002RInterpretation(static2002RSubscores.total) : null;
  const sspi2Interpretation = echelle.scaleType === 'SSPI-2' ? getSSPI2Interpretation(total) : null;
  const casicInterpretation = echelle.scaleType === 'CASIC' ? getCASICInterpretation(total) : null;
  const cportInterpretation = echelle.scaleType === 'CPORT' ? getCPORTInterpretation(total) : null;

  const displayTotal = static2002RSubscores ? static2002RSubscores.total : total;

  const isSexualViolenceScale = ['Static-99R', 'Static-2002R', 'SVR-20', 'STABLE-2007', 'SSPI-2', 'CASIC', 'CPORT'].includes(echelle.scaleType);

  return (
    <div className="border border-slate-300 rounded-lg bg-white shadow-sm">
      <div className="p-4 bg-slate-50 border-b border-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex-1">
          <h3 className="font-semibold text-slate-800">{scale.fullName}</h3>
          <p className="text-sm text-slate-600 mt-1">{scale.description}</p>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
            {echelle.scaleType === 'START' && startSubscores ? (
              <>
                <span className="font-medium text-red-700">
                  Vulnérabilités : {startSubscores.vulnerabilityTotal} / {scale.maxScore}
                </span>
                <span className="font-medium text-green-700">
                  Forces : {startSubscores.strengthTotal} / {scale.maxScore}
                </span>
              </>
            ) : (
              <>
                <span className="font-medium text-blue-700">
                  Score total : {echelle.scaleType === 'SAVRY' ? `${riskTotal} (risque)` : displayTotal} / {scale.maxScore}{scale.minScore !== undefined ? ` (min: ${scale.minScore})` : ''}
                </span>
                {echelle.scaleType === 'SAVRY' && protectiveTotal > 0 && (
                  <span className="font-medium text-green-700">
                    Protection : {protectiveTotal}
                  </span>
                )}
              </>
            )}
            {isSexualViolenceScale && (
              <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-1 rounded">
                {echelle.scaleType === 'SSPI-2' ? 'Dépistage des intérêts PÉDOPHILIQUES' : 'Risque de violence SEXUELLE'}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 px-3 py-1.5 hover:bg-slate-200 rounded-lg transition-colors text-sm font-medium text-slate-700"
            title={isExpanded ? 'Réduire' : 'Développer'}
          >
            {isExpanded ? (
              <>
                <ChevronUp size={18} />
                <span className="hidden sm:inline">Réduire</span>
              </>
            ) : (
              <>
                <ChevronDown size={18} />
                <span className="hidden sm:inline">Développer</span>
              </>
            )}
          </button>
          <button
            onClick={onRemove}
            className="flex items-center gap-1 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium border border-red-300"
            title="Supprimer cette échelle"
          >
            <Trash2 size={18} />
            <span className="hidden sm:inline">Supprimer</span>
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4">
          {echelle.scaleType === 'START' ? (
            <div className="space-y-3 mb-6">
              <div className="grid grid-cols-3 gap-2 pb-2 border-b-2 border-slate-300 font-semibold text-sm text-slate-700">
                <div>Item</div>
                <div className="text-center">Vulnérabilité</div>
                <div className="text-center">Force</div>
              </div>
              {scale.items.map((item) => {
                const vulnerabilityScore = echelle.scores[item.id];
                const strengthScore = echelle.strengthScores?.[item.id];
                return (
                  <div key={item.id} className="grid grid-cols-3 gap-2 py-2 border-b border-slate-100 last:border-0 items-center">
                    <div className="text-sm text-slate-700 leading-tight">
                      {item.label}
                    </div>
                    <div className="flex items-center justify-center gap-1 flex-wrap">
                      {item.options.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => updateScore(item.id, option.value)}
                          className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
                            vulnerabilityScore === option.value
                              ? 'bg-red-600 text-white'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center justify-center gap-1 flex-wrap">
                      {item.options.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => updateStrengthScore(item.id, option.value)}
                          className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
                            strengthScore === option.value
                              ? 'bg-green-600 text-white'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3 mb-6">
              {scale.items.map((item) => {
                const currentScore = echelle.scores[item.id];
                const useManyOptions = item.options.length > 10;

                return (
                  <div key={item.id} className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">
                    <div className="flex-1">
                      <label className="text-sm text-slate-700 leading-tight">
                        {item.label}
                      </label>
                    </div>
                    {useManyOptions ? (
                      <div className="w-32">
                        <select
                          value={currentScore ?? ''}
                          onChange={(e) => updateScore(item.id, Number(e.target.value))}
                          className="w-full px-3 py-1.5 text-sm font-medium border border-slate-300 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                          <option value="">Sélectionner</option>
                          {item.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 flex-wrap">
                        {item.options.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => updateScore(item.id, option.value)}
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
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {scale.protectiveItems && scale.protectiveItems.length > 0 && (
            <div className="border-t border-slate-300 pt-4 mt-4">
              <h4 className="font-semibold text-slate-800 mb-3">Facteurs de protection</h4>
              <div className="space-y-3 mb-6">
                {scale.protectiveItems.map((item) => {
                  const currentScore = echelle.protectiveScores?.[item.id];
                  const useManyOptions = item.options.length > 10;

                  return (
                    <div key={item.id} className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">
                      <div className="flex-1">
                        <label className="text-sm text-slate-700 leading-tight">
                          {item.label}
                        </label>
                      </div>
                      {useManyOptions ? (
                        <div className="w-32">
                          <select
                            value={currentScore ?? ''}
                            onChange={(e) => updateProtectiveScore(item.id, Number(e.target.value))}
                            className="w-full px-3 py-1.5 text-sm font-medium border border-slate-300 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                          >
                            <option value="">Sélectionner</option>
                            {item.options.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 flex-wrap">
                          {item.options.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => updateProtectiveScore(item.id, option.value)}
                              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                                currentScore === option.value
                                  ? 'bg-green-600 text-white'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {hcr20Subscores && hcr20Interpretation && (
            <div className="border-t border-slate-300 pt-4 mt-4">
              <h4 className="font-semibold text-slate-800 mb-3">Analyse par domaines HCR-20</h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h5 className="font-medium text-blue-900 mb-2">Facteurs Historiques (H) ({hcr20Subscores.historical}/20)</h5>
                  <div className="text-xs text-slate-600">
                    Items H1-H10 : Violence antérieure, âge première violence, instabilité relationnelle, problèmes d'emploi, abus substances, maladie mentale, psychopathie, inadaptation précoce, trouble personnalité, échec surveillance
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <h5 className="font-medium text-green-900 mb-2">Facteurs Cliniques (C) ({hcr20Subscores.clinical}/10)</h5>
                  <div className="text-xs text-slate-600">
                    Items C1-C5 : Manque prise conscience, attitudes négatives, symptômes actifs, impulsivité, non-réponse traitement
                  </div>
                </div>

                <div className="bg-amber-50 p-3 rounded-lg">
                  <h5 className="font-medium text-amber-900 mb-2">Gestion du Risque (R) ({hcr20Subscores.riskManagement}/10)</h5>
                  <div className="text-xs text-slate-600">
                    Items R1-R5 : Absence plans réalisables, exposition déstabilisateurs, manque soutien, non-observance, stress
                  </div>
                </div>
              </div>

              <div className={`${hcr20Interpretation.bg} border-l-4 ${hcr20Interpretation.color.replace('text-', 'border-')} p-4 rounded-r-lg`}>
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-900">Évaluation du risque de violence :</span>
                      <span className={`font-bold ${hcr20Interpretation.color}`}>{hcr20Interpretation.level}</span>
                      <span className="text-slate-600">({total}/40)</span>
                    </div>
                    <p className="text-sm text-slate-700">{hcr20Interpretation.description}</p>
                    <div className="mt-2 text-xs text-slate-600">
                      <span className="font-medium">Seuils indicatifs :</span> 0-14 (Faible) | 15-24 (Modéré) | 25-40 (Élevé)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {vragInterpretation && (
            <div className="border-t border-slate-300 pt-4 mt-4">
              <h4 className="font-semibold text-slate-800 mb-3">Analyse VRAG</h4>

              <div className={`${vragInterpretation.bg} border-l-4 ${vragInterpretation.color.replace('text-', 'border-')} p-4 rounded-r-lg`}>
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-900">Évaluation actuarielle VRAG :</span>
                      <span className={`font-bold ${vragInterpretation.color}`}>{vragInterpretation.level}</span>
                      <span className="text-slate-600">(Score : {total})</span>
                    </div>
                    <p className="text-sm text-slate-700">{vragInterpretation.description}</p>
                    <div className="mt-3 text-xs text-slate-600 bg-white p-2 rounded border border-slate-200">
                      <div className="font-medium mb-1">Distribution des catégories VRAG :</div>
                      <div className="space-y-0.5">
                        <div>Cat. 1 (&lt;-21) : 0-8% | Cat. 2-3 (-21 à -5) : 9-17% | Cat. 4-5 (-5 à 4) : 18-31%</div>
                        <div>Cat. 6-7 (4 à 12) : 32-48% | Cat. 8 (12 à 24) : 49-58% | Cat. 9 (≥24) : 59-100%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {odaraInterpretation && (
            <div className="border-t border-slate-300 pt-4 mt-4">
              <h4 className="font-semibold text-slate-800 mb-3">Analyse ODARA</h4>

              <div className={`${odaraInterpretation.bg} border-l-4 ${odaraInterpretation.color.replace('text-', 'border-')} p-4 rounded-r-lg`}>
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-900">Risque de violence conjugale :</span>
                      <span className={`font-bold ${odaraInterpretation.color}`}>{odaraInterpretation.level}</span>
                      <span className="text-slate-600">({total}/13)</span>
                    </div>
                    <p className="text-sm text-slate-700">{odaraInterpretation.description}</p>
                    <div className="mt-2 text-xs text-slate-600">
                      <span className="font-medium">Seuils de référence :</span> 0-2 (Faible ~6%) | 3-4 (Modéré ~19%) | 5+ (Élevé ~35%+)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {saraSubscores && saraInterpretation && (
            <div className="border-t border-slate-300 pt-4 mt-4">
              <h4 className="font-semibold text-slate-800 mb-3">Analyse par domaines SARA</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h5 className="font-medium text-blue-900 mb-2">Antécédents criminels ({saraSubscores.criminalHistory}/10)</h5>
                  <div className="text-xs text-slate-600">Items 1-5 : Violence conjugale, emprisonnement, violence générale, escalade, violations</div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <h5 className="font-medium text-green-900 mb-2">Adaptation psychosociale ({saraSubscores.psychosocial}/10)</h5>
                  <div className="text-xs text-slate-600">Items 6-10 : Attitudes, relations, emploi, enfance, substances</div>
                </div>

                <div className="bg-amber-50 p-3 rounded-lg">
                  <h5 className="font-medium text-amber-900 mb-2">Agression conjugale ({saraSubscores.spouseAssault}/10)</h5>
                  <div className="text-xs text-slate-600">Items 11-15 : Idées, symptômes, personnalité, traitement, menaces</div>
                </div>

                <div className="bg-red-50 p-3 rounded-lg">
                  <h5 className="font-medium text-red-900 mb-2">Infraction actuelle ({saraSubscores.currentOffense}/10)</h5>
                  <div className="text-xs text-slate-600">Items 16-20 : Armes, escalade, harcèlement, attitudes, conflit</div>
                </div>
              </div>

              <div className={`${saraInterpretation.bg} border-l-4 ${saraInterpretation.color.replace('text-', 'border-')} p-4 rounded-r-lg`}>
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-900">Risque d'agression conjugale :</span>
                      <span className={`font-bold ${saraInterpretation.color}`}>{saraInterpretation.level}</span>
                      <span className="text-slate-600">({total}/40)</span>
                    </div>
                    <p className="text-sm text-slate-700">{saraInterpretation.description}</p>
                    <div className="mt-2 text-xs text-slate-600">
                      <span className="font-medium">Seuils indicatifs :</span> 0-14 (Faible) | 15-24 (Modéré) | 25-40 (Élevé)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {savrySubscores && savryInterpretation && (
            <div className="border-t border-slate-300 pt-4 mt-4">
              <h4 className="font-semibold text-slate-800 mb-3">Analyse SAVRY par domaines</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h5 className="font-medium text-blue-900 mb-2">Facteurs Historiques (H) ({savrySubscores.historical}/20)</h5>
                  <div className="text-xs text-slate-600">Items H1-H10 : Violence, délinquance, échec mesures, automutilation, exposition, maltraitance, séparation, stress familial, échec scolaire</div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <h5 className="font-medium text-green-900 mb-2">Facteurs Sociaux (S) ({savrySubscores.social}/12)</h5>
                  <div className="text-xs text-slate-600">Items S1-S6 : Attitudes, impulsivité, colère, empathie, attention, engagement</div>
                </div>

                <div className="bg-amber-50 p-3 rounded-lg">
                  <h5 className="font-medium text-amber-900 mb-2">Facteurs Contextuels (C) ({savrySubscores.contextual}/8)</h5>
                  <div className="text-xs text-slate-600">Items C1-C4 : Rejet pairs, stress école/travail, soutien, voisinage</div>
                </div>

                <div className="bg-red-50 p-3 rounded-lg">
                  <h5 className="font-medium text-red-900 mb-2">Facteurs Individuels (I) ({savrySubscores.individual}/8)</h5>
                  <div className="text-xs text-slate-600">Items I1-I4 : Substances, colère, traumatisme, pairs délinquants</div>
                </div>
              </div>

              <div className="bg-teal-50 border-l-4 border-teal-700 p-4 rounded-r-lg mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-slate-900">Facteurs de Protection :</span>
                  <span className="font-bold text-teal-700">{savrySubscores.protective}/12</span>
                </div>
                <div className="text-xs text-slate-600">
                  P1-P6 : Engagement prosocial, soutien social, attachement, attitude positive intervention, engagement scolaire/professionnel, résilience
                </div>
              </div>

              <div className={`${savryInterpretation.bg} border-l-4 ${savryInterpretation.color.replace('text-', 'border-')} p-4 rounded-r-lg`}>
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-900">Risque de violence (jeune) :</span>
                      <span className={`font-bold ${savryInterpretation.color}`}>{savryInterpretation.level}</span>
                      <span className="text-slate-600">(Risque : {riskTotal}/48)</span>
                    </div>
                    <p className="text-sm text-slate-700">{savryInterpretation.description}</p>
                    <div className="mt-2 text-xs text-slate-600">
                      <span className="font-medium">Seuils indicatifs :</span> 0-14 (Faible) | 15-29 (Modéré) | 30-48 (Élevé)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {pclrSubscores && pclrInterpretation && (
            <div className="border-t border-slate-300 pt-4 mt-4">
              <h4 className="font-semibold text-slate-800 mb-3">Analyse factorielle PCL-R</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h5 className="font-medium text-blue-900 mb-2">Facteur 1 : Interpersonnel/Affectif ({pclrSubscores.factor1}/16)</h5>
                  <div className="space-y-1 text-sm text-slate-700">
                    <div className="flex justify-between">
                      <span>Facette 1 : Interpersonnel</span>
                      <span className="font-medium">{pclrSubscores.facet1}/8</span>
                    </div>
                    <div className="text-xs text-slate-600 pl-2">Items 1, 2, 4, 5 (charme, grandiosité, mensonge, manipulation)</div>
                    <div className="flex justify-between mt-2">
                      <span>Facette 2 : Affectif</span>
                      <span className="font-medium">{pclrSubscores.facet2}/8</span>
                    </div>
                    <div className="text-xs text-slate-600 pl-2">Items 6, 7, 8, 16 (absence remords, émotions superficielles, empathie, responsabilité)</div>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg">
                  <h5 className="font-medium text-slate-900 mb-2">Facteur 2 : Style de vie/Antisocial ({pclrSubscores.factor2}/20)</h5>
                  <div className="space-y-1 text-sm text-slate-700">
                    <div className="flex justify-between">
                      <span>Facette 3 : Style de vie</span>
                      <span className="font-medium">{pclrSubscores.facet3}/10</span>
                    </div>
                    <div className="text-xs text-slate-600 pl-2">Items 3, 9, 13, 14, 15 (stimulation, parasitisme, buts, impulsivité, irresponsabilité)</div>
                    <div className="flex justify-between mt-2">
                      <span>Facette 4 : Antisocial</span>
                      <span className="font-medium">{pclrSubscores.facet4}/10</span>
                    </div>
                    <div className="text-xs text-slate-600 pl-2">Items 10, 12, 18, 19, 20 (maîtrise, troubles précoces, délinquance, violation, versatilité)</div>
                  </div>
                </div>
              </div>

              <div className={`${pclrInterpretation.bg} border-l-4 ${pclrInterpretation.color.replace('text-', 'border-')} p-4 rounded-r-lg`}>
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-900">Interprétation du score total :</span>
                      <span className={`font-bold ${pclrInterpretation.color}`}>{pclrInterpretation.level}</span>
                      <span className="text-slate-600">({total}/40)</span>
                    </div>
                    <p className="text-sm text-slate-700">{pclrInterpretation.description}</p>
                    <div className="mt-2 text-xs text-slate-600">
                      <span className="font-medium">Seuils de référence :</span> 0-20 (Faible) | 21-29 (Moyen) | 30-40 (Élevé)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {static99RInterpretation && (
            <div className="border-t border-slate-300 pt-4 mt-4">
              <h4 className="font-semibold text-slate-800 mb-3">Analyse Static-99R</h4>

              <div className={`${static99RInterpretation.bg} border-l-4 ${static99RInterpretation.color.replace('text-', 'border-')} p-4 rounded-r-lg`}>
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-900">Évaluation actuarielle Static-99R :</span>
                      <span className={`font-bold ${static99RInterpretation.color}`}>{static99RInterpretation.level}</span>
                      <span className="text-slate-600">(Score : {total})</span>
                    </div>
                    <p className="text-sm text-slate-700">{static99RInterpretation.description}</p>
                    <div className="mt-3 text-xs text-slate-600 bg-white p-2 rounded border border-slate-200">
                      <div className="font-medium mb-1">Distribution des catégories Static-99R :</div>
                      <div className="space-y-0.5">
                        <div>Cat. I (-3 à 1) : 3-7% | Cat. II (2-3) : 7-11% | Cat. III (4-5) : 12-16%</div>
                        <div>Cat. IVa (6-7) : 17-25% | Cat. IVb (8+) : &gt;25%</div>
                      </div>
                    </div>
                    <div className="mt-2 px-2 py-1 bg-rose-50 border border-rose-200 rounded text-xs text-rose-800">
                      <span className="font-semibold">Important :</span> Cette échelle évalue spécifiquement le risque de récidive SEXUELLE.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {static2002RSubscores && static2002RInterpretation && (
            <div className="border-t border-slate-300 pt-4 mt-4">
              <h4 className="font-semibold text-slate-800 mb-3">Analyse Static-2002R par sous-échelles</h4>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                  <div className="text-xs text-slate-500 mb-1">Âge</div>
                  <div className="font-bold text-slate-800">{static2002RSubscores.age}<span className="text-xs font-normal text-slate-400"> (-2 à 2)</span></div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-center">
                  <div className="text-xs text-blue-700 mb-1">Persistance</div>
                  <div className="font-bold text-slate-800">{static2002RSubscores.persistence}<span className="text-xs font-normal text-slate-400">/3</span></div>
                  <div className="text-[10px] text-slate-500">brut : {static2002RSubscores.persistenceRaw}/5</div>
                </div>
                <div className="bg-rose-50 p-3 rounded-lg border border-rose-200 text-center">
                  <div className="text-xs text-rose-700 mb-1">Intérêts déviants</div>
                  <div className="font-bold text-slate-800">{static2002RSubscores.deviant}<span className="text-xs font-normal text-slate-400">/3</span></div>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-center">
                  <div className="text-xs text-amber-700 mb-1">Relation victimes</div>
                  <div className="font-bold text-slate-800">{static2002RSubscores.relationship}<span className="text-xs font-normal text-slate-400">/2</span></div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                  <div className="text-xs text-slate-600 mb-1">Criminalité générale</div>
                  <div className="font-bold text-slate-800">{static2002RSubscores.general}<span className="text-xs font-normal text-slate-400">/3</span></div>
                  <div className="text-[10px] text-slate-500">brut : {static2002RSubscores.generalRaw}/6</div>
                </div>
              </div>

              <div className={`${static2002RInterpretation.bg} border-l-4 ${static2002RInterpretation.color.replace('text-', 'border-')} p-4 rounded-r-lg`}>
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold text-slate-900">Évaluation actuarielle Static-2002R :</span>
                      <span className={`font-bold ${static2002RInterpretation.color}`}>{static2002RInterpretation.level}</span>
                      <span className="text-slate-600">(Score : {static2002RSubscores.total})</span>
                    </div>
                    <p className="text-sm text-slate-700">{static2002RInterpretation.description}</p>
                    <div className="mt-3 text-xs text-slate-600 bg-white p-2 rounded border border-slate-200">
                      <div className="font-medium mb-1">Niveaux de risque standardisés Static-2002R :</div>
                      <div>Niveau I (-2 à 1) | Niveau II (2-3) | Niveau III (4-5) | Niveau IVa (6-7) | Niveau IVb (8+)</div>
                    </div>
                    <div className="mt-2 px-2 py-1 bg-rose-50 border border-rose-200 rounded text-xs text-rose-800">
                      <span className="font-semibold">Important :</span> Cette échelle évalue spécifiquement le risque de récidive SEXUELLE. Le score total intègre le recodage des sous-échelles Persistance et Criminalité générale conformément au manuel de cotation.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {sspi2Interpretation && (
            <div className="border-t border-slate-300 pt-4 mt-4">
              <h4 className="font-semibold text-slate-800 mb-3">Analyse SSPI-2</h4>

              <div className={`${sspi2Interpretation.bg} border-l-4 ${sspi2Interpretation.color.replace('text-', 'border-')} p-4 rounded-r-lg`}>
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold text-slate-900">Dépistage des intérêts pédophiliques :</span>
                      <span className={`font-bold ${sspi2Interpretation.color}`}>{sspi2Interpretation.level}</span>
                      <span className="text-slate-600">({total}/5)</span>
                    </div>
                    <p className="text-sm text-slate-700">{sspi2Interpretation.description}</p>
                    <div className="mt-2 text-xs text-slate-600">
                      <span className="font-medium">Seuils indicatifs :</span> 0-1 (Faible) | 2 (Modéré) | 3-5 (Élevé)
                    </div>
                    <div className="mt-2 px-2 py-1 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800">
                      <span className="font-semibold">Limite méthodologique :</span> La SSPI-2 est un outil de DÉPISTAGE fondé sur les caractéristiques des victimes. Elle ne constitue pas un diagnostic de trouble pédophilique, qui requiert une évaluation clinique complète (critères DSM-5-TR / CIM-11).
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {stable2007Interpretation && (
            <div className="border-t border-slate-300 pt-4 mt-4">
              <h4 className="font-semibold text-slate-800 mb-3">Analyse STABLE-2007</h4>

              <div className={`${stable2007Interpretation.bg} border-l-4 ${stable2007Interpretation.color.replace('text-', 'border-')} p-4 rounded-r-lg`}>
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-900">Facteurs dynamiques STABLE-2007 :</span>
                      <span className={`font-bold ${stable2007Interpretation.color}`}>{stable2007Interpretation.level}</span>
                      <span className="text-slate-600">({total}/26)</span>
                    </div>
                    <p className="text-sm text-slate-700">{stable2007Interpretation.description}</p>
                    <div className="mt-2 text-xs text-slate-600">
                      <span className="font-medium">Seuils de référence :</span> 0-4 (Faible) | 5-11 (Modéré) | 12+ (Élevé)
                    </div>
                    <div className="mt-2 px-2 py-1 bg-rose-50 border border-rose-200 rounded text-xs text-rose-800">
                      <span className="font-semibold">Important :</span> Cette échelle évalue spécifiquement le risque de récidive SEXUELLE. À croiser avec le Static-99R pour une évaluation complète.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {echelle.scaleType === 'SVR-20' && (
            <div className="border-t border-slate-300 pt-4 mt-4">
              <h4 className="font-semibold text-slate-800 mb-3">Analyse SVR-20</h4>

              <div className="bg-blue-50 border-l-4 border-blue-700 p-4 rounded-r-lg mb-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-900">Score total SVR-20 :</span>
                      <span className="font-bold text-blue-700">{total}/40</span>
                    </div>
                    <p className="text-sm text-slate-700 mt-2">
                      Le SVR-20 est un instrument de jugement clinique structuré. Le score total est informatif mais ne détermine pas automatiquement le niveau de risque.
                    </p>
                    <div className="mt-3 px-3 py-2 bg-white border border-blue-200 rounded text-sm text-blue-900">
                      <span className="font-semibold">Jugement clinique requis :</span> Le clinicien doit déterminer le niveau de risque final (Faible, Modéré, Élevé) en intégrant l'ensemble des facteurs évalués, le contexte clinique et la dynamique du patient.
                    </div>
                    <div className="mt-2 px-2 py-1 bg-rose-50 border border-rose-200 rounded text-xs text-rose-800">
                      <span className="font-semibold">Important :</span> Cette échelle évalue spécifiquement le risque de violence SEXUELLE.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {casicInterpretation && (
            <div className="border-t border-slate-300 pt-4 mt-4">
              <h4 className="font-semibold text-slate-800 mb-3">Analyse CASIC</h4>
              <div className={`${casicInterpretation.bg} border-l-4 ${casicInterpretation.color.replace('text-', 'border-')} p-4 rounded-r-lg`}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-semibold text-slate-900">Indicateurs comportementaux :</span>
                    <span className={`font-bold ${casicInterpretation.color}`}>{casicInterpretation.level}</span>
                    <span className="text-slate-600">({total}/6)</span>
                  </div>
                  <p className="text-sm text-slate-700">{casicInterpretation.description}</p>
                  <div className="mt-2 text-xs text-slate-600">
                    <span className="font-medium">Seuils :</span> 0-1 (Faible) | 2 (Modere) | 3+ (Significatif - force Item 5 CPORT)
                  </div>
                  {total >= 3 && (
                    <div className="mt-2 px-2 py-1 bg-red-50 border border-red-300 rounded text-xs text-red-800">
                      <span className="font-semibold">Regle d'equivalence CPORT :</span> Score CASIC ≥ 3 atteint. Si le CPORT est cote, l'Item 5 (Interet pedophilique avere) doit etre force a 1.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {cportInterpretation && (
            <div className="border-t border-slate-300 pt-4 mt-4">
              <h4 className="font-semibold text-slate-800 mb-3">Analyse CPORT</h4>
              <div className={`${cportInterpretation.bg} border-l-4 ${cportInterpretation.color.replace('text-', 'border-')} p-4 rounded-r-lg`}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-semibold text-slate-900">Niveau de risque relatif :</span>
                    <span className={`font-bold ${cportInterpretation.color}`}>{cportInterpretation.level}</span>
                    <span className="text-slate-600">({total}/7)</span>
                  </div>
                  <p className="text-sm text-slate-700">{cportInterpretation.description}</p>
                  <div className="mt-2 text-xs text-slate-600">
                    <span className="font-medium">Categories de risque :</span> 0 (Tres faible) | 1 (Faible-Modere) | 2 (Modere-Eleve) | 3-4 (Eleve) | 5-7 (Tres Eleve)
                  </div>
                  <div className="mt-2 px-2 py-1 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800">
                    <span className="font-semibold">Note methodologique :</span> Le CPORT est un outil actuariel specifique aux infractions MASM. L'Item 5 peut etre force a 1 si la CASIC ≥ 3 (regle d'equivalence).
                  </div>
                </div>
              </div>
            </div>
          )}

          {echelle.scaleType === 'START' && startSubscores && (
            <div className="border-t border-slate-300 pt-4 mt-4">
              <h4 className="font-semibold text-slate-800 mb-3">Analyse START (Risque à court terme)</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <h5 className="font-medium text-red-900 mb-2">Total Vulnérabilités : {startSubscores.vulnerabilityTotal}/40</h5>
                  <div className="text-xs text-slate-600">
                    Score des facteurs de risque actuels sur les 20 domaines évalués.
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <h5 className="font-medium text-green-900 mb-2">Total Forces : {startSubscores.strengthTotal}/40</h5>
                  <div className="text-xs text-slate-600">
                    Score des facteurs de protection et ressources sur les 20 domaines évalués.
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-700 p-4 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-900">Évaluation START :</span>
                      <span className="font-bold text-blue-700">Court terme</span>
                    </div>
                    <p className="text-sm text-slate-700 mt-2">
                      Le START évalue le risque à court terme et la traitabilité sur 20 domaines avec une double perspective : vulnérabilités (risques) et forces (facteurs de protection).
                    </p>
                    <div className="mt-3 px-3 py-2 bg-white border border-blue-200 rounded text-sm text-blue-900">
                      <span className="font-semibold">Jugement clinique requis :</span> Le niveau de risque final (Faible, Modéré, Élevé) doit être déterminé par le clinicien en considérant l'équilibre entre vulnérabilités et forces, ainsi que le contexte clinique global.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="border-t border-slate-300 pt-4 mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Interprétation clinique et synthèse du risque
            </label>
            <VoiceTextarea
              value={echelle.syntheseClinique}
              onChange={(v) => onChange({ ...echelle, syntheseClinique: v })}
              placeholder="Analyse clinique détaillée intégrant les scores obtenus, le contexte et la dynamique du patient..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-[120px] text-sm pr-10"
            />
          </div>
        </div>
      )}
    </div>
  );
}
