import { ExamenCarteTData, YesNoNR } from '../../../types/examen';
import { SectionCard, FormRow } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';
import { CLUSTERS, PERVERSE_FUNCTIONING_CRITERIA, getDisorderByName, PersonalityDisorder } from '../../../constants/personalityDisorders';
import VoiceTextarea from '../../ui/VoiceTextarea';

interface Props {
  data: ExamenCarteTData;
  onChange: (d: ExamenCarteTData) => void;
}

export default function CarteT({ data, onChange }: Props) {
  const selectedDisorder = data.troubleSelectionne ? getDisorderByName(data.troubleSelectionne as PersonalityDisorder) : null;

  const handleTroubleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({
      ...data,
      troubleSelectionne: e.target.value,
      criteresCoches: [],
    });
  };

  const handleCritereToggle = (critere: string) => {
    const newCriteres = data.criteresCoches.includes(critere)
      ? data.criteresCoches.filter((c) => c !== critere)
      : [...data.criteresCoches, critere];
    onChange({ ...data, criteresCoches: newCriteres });
  };

  const handleCriterePerversToggle = (critere: string) => {
    const newCriteres = data.criteresPervers.includes(critere)
      ? data.criteresPervers.filter((c) => c !== critere)
      : [...data.criteresPervers, critere];
    onChange({ ...data, criteresPervers: newCriteres });
  };

  return (
    <SectionCard title="U. Troubles de la personnalite">
      <FormRow label="Trouble de la personnalité présent :">
        <TriToggle
          value={data.presenceSyndrome}
          onChange={(v: YesNoNR) => onChange({ ...data, presenceSyndrome: v })}
        />
      </FormRow>
      <FormRow label="Antécédents de ce trouble :">
        <TriToggle
          value={data.antecedentSyndrome}
          onChange={(v: YesNoNR) => onChange({ ...data, antecedentSyndrome: v })}
        />
      </FormRow>

      {(data.presenceSyndrome === 'Oui' || data.antecedentSyndrome === 'Oui') && (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Type de trouble de la personnalite (DSM-5)
            </label>
            <select
              value={data.troubleSelectionne}
              onChange={handleTroubleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900"
            >
              <option value="">-- Selectionner un trouble --</option>
              {Object.entries(CLUSTERS).map(([clusterKey, cluster]) => (
                <optgroup key={clusterKey} label={cluster.name}>
                  {cluster.disorders.map((disorder) => (
                    <option key={disorder} value={disorder}>
                      {disorder}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {selectedDisorder && (
            <>
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Criteres diagnostiques presents (DSM-5)
                </label>
                <div className="space-y-2 bg-slate-50 p-4 rounded-lg">
                  {selectedDisorder.criteria.map((critere, index) => (
                    <label
                      key={index}
                      className="flex items-start gap-3 p-2 hover:bg-white rounded cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={data.criteresCoches.includes(critere)}
                        onChange={() => handleCritereToggle(critere)}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                      />
                      <span className="text-sm text-slate-700 flex-1">{critere}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-2 text-xs text-slate-500">
                  {data.criteresCoches.length} critere(s) selectionne(s) sur {selectedDisorder.criteria.length}
                </div>
              </div>
            </>
          )}

          <div className="mb-6 border-t border-slate-200 pt-6">
            <label className="flex items-center gap-3 mb-4 cursor-pointer">
              <input
                type="checkbox"
                checked={data.fonctionnementPervers}
                onChange={(e) => onChange({ ...data, fonctionnementPervers: e.target.checked, criteresPervers: e.target.checked ? data.criteresPervers : [] })}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
              />
              <span className="text-sm font-medium text-slate-700">
                Fonctionnement pervers / Amenagement pervers (Hors DSM)
              </span>
            </label>

            {data.fonctionnementPervers && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Criteres cliniques presents
                  </label>
                  <div className="space-y-2 bg-amber-50 p-4 rounded-lg border border-amber-200">
                    {PERVERSE_FUNCTIONING_CRITERIA.map((critere, index) => (
                      <label
                        key={index}
                        className="flex items-start gap-3 p-2 hover:bg-white rounded cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={data.criteresPervers.includes(critere)}
                          onChange={() => handleCriterePerversToggle(critere)}
                          className="mt-1 h-4 w-4 text-amber-600 focus:ring-amber-500 border-slate-300 rounded"
                        />
                        <span className="text-sm text-slate-700 flex-1">{critere}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-slate-500">
                    {data.criteresPervers.length} critere(s) selectionne(s) sur {PERVERSE_FUNCTIONING_CRITERIA.length}
                  </div>
                </div>
              </>
            )}
          </div>

          {(selectedDisorder || data.fonctionnementPervers) && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Elements cliniques complementaires
              </label>
              <VoiceTextarea
                value={data.elementsCliniquesComplementaires}
                onChange={(v) => onChange({ ...data, elementsCliniquesComplementaires: v })}
                placeholder="Illustrez les traits de personnalite avec des exemples cliniques specifiques au patient..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-[100px] text-sm pr-10"
              />
            </div>
          )}
        </>
      )}
    </SectionCard>
  );
}
