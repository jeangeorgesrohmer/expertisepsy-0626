import type { DangerositeData } from '../../types';
import { SectionBlock, SubSection } from './SectionBlock';
import {
  DANG_PSYCHIATRIQUE, DANG_RECIDIVE, DANG_FACTEURS_RISQUE,
  DANG_FACTEURS_PROTECTION, DANG_NECESSITE_SOINS,
  DANG_INJONCTION, DANG_MODALITES, DANG_PRONOSTIC,
} from './labels';
import { SCALES } from '../../constants/echellesActuarielles';

interface Props {
  data: DangerositeData;
}

function getRiskLevelColor(score: number, scaleType: string): string {
  if (scaleType === 'Static-99R') {
    if (score <= 1) return 'text-green-700';
    if (score <= 3) return 'text-green-600';
    if (score <= 5) return 'text-yellow-700';
    if (score <= 7) return 'text-orange-700';
    return 'text-red-700';
  } else if (scaleType === 'STABLE-2007') {
    if (score < 5) return 'text-green-700';
    if (score < 12) return 'text-orange-700';
    return 'text-red-700';
  } else if (scaleType === 'PCL-R') {
    if (score < 21) return 'text-green-700';
    if (score < 30) return 'text-orange-700';
    return 'text-red-700';
  } else if (scaleType === 'HCR-20') {
    if (score < 15) return 'text-green-700';
    if (score < 25) return 'text-orange-700';
    return 'text-red-700';
  } else if (scaleType === 'VRAG') {
    if (score < -5) return 'text-green-700';
    if (score < 12) return 'text-orange-700';
    return 'text-red-700';
  } else if (scaleType === 'ODARA') {
    if (score < 3) return 'text-green-700';
    if (score < 5) return 'text-orange-700';
    return 'text-red-700';
  } else if (scaleType === 'SARA' || scaleType === 'SAVRY' || scaleType === 'SVR-20') {
    if (score < 15) return 'text-green-700';
    if (score < 25) return 'text-orange-700';
    return 'text-red-700';
  }
  return 'text-stone-700';
}

function getRiskLevelLabel(score: number, scaleType: string): string {
  if (scaleType === 'Static-99R') {
    if (score <= 1) return 'Catégorie I (Faible)';
    if (score <= 3) return 'Catégorie II (Faible-Moyen)';
    if (score <= 5) return 'Catégorie III (Moyen-Élevé)';
    if (score <= 7) return 'Catégorie IVa (Élevé)';
    return 'Catégorie IVb (Très élevé)';
  } else if (scaleType === 'STABLE-2007') {
    if (score < 5) return 'Faible';
    if (score < 12) return 'Modéré';
    return 'Élevé';
  } else if (scaleType === 'PCL-R') {
    if (score < 21) return 'Faible';
    if (score < 30) return 'Moyen';
    return 'Élevé';
  } else if (scaleType === 'HCR-20') {
    if (score < 15) return 'Faible';
    if (score < 25) return 'Modéré';
    return 'Élevé';
  } else if (scaleType === 'VRAG') {
    if (score < -21) return 'Catégorie 1 (Très faible)';
    if (score < -5) return 'Catégorie 2-3 (Faible)';
    if (score < 4) return 'Catégorie 4-5 (Faible-Modéré)';
    if (score < 12) return 'Catégorie 6-7 (Modéré)';
    if (score < 24) return 'Catégorie 8 (Élevé)';
    return 'Catégorie 9 (Très élevé)';
  } else if (scaleType === 'ODARA') {
    if (score < 3) return 'Faible';
    if (score < 5) return 'Modéré';
    return 'Élevé';
  } else if (scaleType === 'SARA' || scaleType === 'SAVRY' || scaleType === 'SVR-20') {
    if (score < 15) return 'Faible';
    if (score < 25) return 'Modéré';
    return 'Élevé';
  }
  return 'Non déterminé';
}

export default function SectionDangerosite({ data }: Props) {
  const hasScales = data.echellesCompletes && data.echellesCompletes.length > 0;

  return (
    <SectionBlock title="VIII. Dangerosite">
      {hasScales && (
        <div className="mb-8 print:break-inside-avoid">
          <h3 className="text-base font-bold text-stone-800 mb-4 border-b border-stone-300 pb-2">
            Évaluation structurée du risque de récidive
          </h3>
          <div className="space-y-6">
            {data.echellesCompletes.map((echelle) => {
              const scaleDefinition = SCALES[echelle.scaleType];
              if (!scaleDefinition) return null;

              const riskTotal = Object.values(echelle.scores).reduce((sum, val) => sum + (val || 0), 0);
              const protectiveTotal = echelle.protectiveScores
                ? Object.values(echelle.protectiveScores).reduce((sum, val) => sum + (val || 0), 0)
                : 0;
              const strengthTotal = echelle.strengthScores
                ? Object.values(echelle.strengthScores).reduce((sum, val) => sum + (val || 0), 0)
                : 0;

              const isSexualViolenceScale = ['Static-99R', 'SVR-20', 'STABLE-2007'].includes(echelle.scaleType);
              const riskColor = getRiskLevelColor(riskTotal, echelle.scaleType);
              const riskLabel = getRiskLevelLabel(riskTotal, echelle.scaleType);

              return (
                <div key={echelle.id} className="border border-stone-200 rounded-sm p-4 print:break-inside-avoid bg-stone-50 print:bg-white">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-stone-900 mb-1">
                        {scaleDefinition.fullName}
                      </h4>
                      <p className="text-xs text-stone-600 mb-2">{scaleDefinition.description}</p>
                      {isSexualViolenceScale && (
                        <p className="text-xs font-semibold text-rose-700 bg-rose-50 inline-block px-2 py-0.5 rounded">
                          ⚠️ Évaluation du risque de violence SEXUELLE
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    {echelle.scaleType === 'START' ? (
                      <>
                        <div className="bg-white print:bg-stone-50 p-3 rounded border border-stone-200">
                          <div className="text-xs text-stone-500 uppercase tracking-wide mb-1">Total Vulnérabilités</div>
                          <div className="text-xl font-bold text-red-700">
                            {riskTotal} <span className="text-sm text-stone-500">/ {scaleDefinition.maxScore}</span>
                          </div>
                        </div>
                        <div className="bg-white print:bg-stone-50 p-3 rounded border border-stone-200">
                          <div className="text-xs text-stone-500 uppercase tracking-wide mb-1">Total Forces</div>
                          <div className="text-xl font-bold text-green-700">
                            {strengthTotal} <span className="text-sm text-stone-500">/ {scaleDefinition.maxScore}</span>
                          </div>
                        </div>
                      </>
                    ) : echelle.scaleType === 'SAVRY' ? (
                      <>
                        <div className="bg-white print:bg-stone-50 p-3 rounded border border-stone-200">
                          <div className="text-xs text-stone-500 uppercase tracking-wide mb-1">Score de risque</div>
                          <div className="text-xl font-bold text-stone-900">
                            {riskTotal} <span className="text-sm text-stone-500">/ {scaleDefinition.maxScore}</span>
                          </div>
                        </div>
                        <div className="bg-white print:bg-stone-50 p-3 rounded border border-stone-200">
                          <div className="text-xs text-stone-500 uppercase tracking-wide mb-1">Score de protection</div>
                          <div className="text-xl font-bold text-green-700">
                            {protectiveTotal}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-white print:bg-stone-50 p-3 rounded border border-stone-200">
                          <div className="text-xs text-stone-500 uppercase tracking-wide mb-1">Score total</div>
                          <div className="text-xl font-bold text-stone-900">
                            {riskTotal} <span className="text-sm text-stone-500">/ {scaleDefinition.maxScore}</span>
                            {scaleDefinition.minScore !== undefined && (
                              <span className="text-xs text-stone-400 ml-1">(min: {scaleDefinition.minScore})</span>
                            )}
                          </div>
                        </div>
                        <div className="bg-white print:bg-stone-50 p-3 rounded border border-stone-200">
                          <div className="text-xs text-stone-500 uppercase tracking-wide mb-1">Niveau de risque</div>
                          <div className={`text-base font-bold ${riskColor}`}>
                            {riskLabel}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {echelle.syntheseClinique?.trim() && (
                    <div className="bg-white print:bg-stone-50 p-3 rounded border border-stone-200 mt-3">
                      <div className="text-xs font-semibold text-stone-700 uppercase tracking-wide mb-2">
                        Synthèse clinique de l'expert
                      </div>
                      <p className="text-sm text-stone-700 italic leading-relaxed">
                        {echelle.syntheseClinique}
                      </p>
                    </div>
                  )}

                  {(echelle.scaleType === 'SVR-20' || echelle.scaleType === 'START') && (
                    <div className="mt-3 text-xs text-blue-700 bg-blue-50 p-2 rounded border border-blue-200">
                      <span className="font-semibold">Note :</span> Cette échelle requiert un jugement clinique structuré. Le score total est informatif mais le niveau de risque final est déterminé par le clinicien.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <SubSection title="Dangerosite psychiatrique" data={data.dangerositePsychiatrique} labels={DANG_PSYCHIATRIQUE} />
      <SubSection title="Risque de recidive" data={data.risqueRecidive} labels={DANG_RECIDIVE} />
      <SubSection title="Facteurs de risque" data={data.facteursRisque} labels={DANG_FACTEURS_RISQUE} />
      <SubSection title="Facteurs de protection" data={data.facteursProtection} labels={DANG_FACTEURS_PROTECTION} />
      <SubSection title="Necessite de soins" data={data.necessiteSoins} labels={DANG_NECESSITE_SOINS} />
      <SubSection title="Details injonction de soins" data={data.injonctionSoinsDetails} labels={DANG_INJONCTION} />
      <SubSection title="Modalites" data={data.modalitesInjonction} labels={DANG_MODALITES} />
      <SubSection title="Pronostic" data={data.pronostic} labels={DANG_PRONOSTIC} />
    </SectionBlock>
  );
}
