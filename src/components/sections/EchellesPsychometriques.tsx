import { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import type { EchelleActuarielleComplete } from '../../types/dangerosite';
import type { TdahData } from '../../types/tdah';
import { SCALES, CLINICAL_SCALE_CATEGORIES, CLINICAL_SCALE_NAMES, ScaleType } from '../../constants/echellesActuarielles';
import ClinicalScaleScoring from './ClinicalScaleScoring';
import Diva5 from './tdah/Diva5';
import Wfirs from './tdah/Wfirs';
import TdahSynthese from './tdah/TdahSynthese';

interface Props {
  data: EchelleActuarielleComplete[];
  onChange: (data: EchelleActuarielleComplete[]) => void;
  tdah: TdahData;
  onTdahChange: (data: TdahData) => void;
}

type ActiveTab = 'echelles' | 'diva5' | 'wfirs' | 'tdah_synthese';

function createEntry(scaleType: ScaleType): EchelleActuarielleComplete {
  return {
    id: `${scaleType}-${Date.now()}`,
    scaleType,
    scores: {},
    syntheseClinique: '',
  };
}

export default function EchellesPsychometriques({ data, onChange, tdah, onTdahChange }: Props) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('echelles');
  const [selectOpen, setSelectOpen] = useState(false);

  const validData = data.filter((e) => e.scaleType && SCALES[e.scaleType]);
  const activeTypes = new Set(validData.map((e) => e.scaleType));

  const addEchelle = (type: ScaleType) => {
    if (activeTypes.has(type)) return;
    onChange([...data, createEntry(type)]);
    setSelectOpen(false);
  };

  const updateEntry = (id: string, updated: EchelleActuarielleComplete) => {
    onChange(data.map((e) => (e.id === id ? updated : e)));
  };

  const removeEntry = (id: string) => {
    onChange(data.filter((e) => e.id !== id));
  };

  const hasAvailable = CLINICAL_SCALE_NAMES.some((t) => !activeTypes.has(t));

  const tabs: { id: ActiveTab; label: string; sub: string }[] = [
    { id: 'echelles', label: 'Échelles cliniques', sub: `${validData.length} cotée${validData.length !== 1 ? 's' : ''}` },
    { id: 'diva5', label: 'DIVA-5', sub: 'Entretien TDAH' },
    { id: 'wfirs', label: 'WFIRS', sub: 'Retentissement' },
    { id: 'tdah_synthese', label: 'Synthèse TDAH', sub: 'Rapport' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">
          VIII bis. Échelles d'évaluation clinique
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Cotation des échelles cliniques · Entretien DIVA-5 · Retentissement WFIRS
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 flex flex-col items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <span>{tab.label}</span>
            <span className="text-xs font-normal text-slate-400 mt-0.5">{tab.sub}</span>
          </button>
        ))}
      </div>

      {/* ── Echelles cliniques ── */}
      {activeTab === 'echelles' && (
        <div className="space-y-6">
          <div className="relative">
            <button
              type="button"
              onClick={() => setSelectOpen((v) => !v)}
              disabled={!hasAvailable}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus size={16} />
              Ajouter une échelle
              <ChevronDown size={14} className={`transition-transform ${selectOpen ? 'rotate-180' : ''}`} />
            </button>

            {selectOpen && hasAvailable && (
              <div className="absolute top-full left-0 mt-1 z-20 w-[26rem] bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden">
                {CLINICAL_SCALE_CATEGORIES.map((cat) => {
                  const available = cat.scales.filter((t) => !activeTypes.has(t));
                  if (available.length === 0) return null;
                  return (
                    <div key={cat.label}>
                      <div className="px-4 py-2 bg-slate-50 border-b border-slate-200">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{cat.label}</span>
                      </div>
                      {available.map((type) => {
                        const scale = SCALES[type];
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => addEchelle(type)}
                            className="w-full flex flex-col items-start gap-0.5 px-4 py-3 hover:bg-slate-50 text-left border-b border-slate-100 last:border-b-0 transition-colors"
                          >
                            <span className="text-sm font-semibold text-slate-800">{scale.fullName}</span>
                            <span className="text-xs text-slate-500 leading-snug">{scale.description}</span>
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            )}

            {selectOpen && (
              <div className="fixed inset-0 z-10" onClick={() => setSelectOpen(false)} />
            )}
          </div>

          {validData.length === 0 ? (
            <div className="text-center py-14 bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <p className="text-sm text-slate-400 mb-1">Aucune échelle sélectionnée.</p>
              <p className="text-xs text-slate-400">Cliquez sur "Ajouter une échelle" pour commencer la cotation.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {validData.map((echelle) => (
                <ClinicalScaleScoring
                  key={echelle.id}
                  echelle={echelle}
                  onChange={(updated) => updateEntry(echelle.id, updated)}
                  onRemove={() => removeEntry(echelle.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── DIVA-5 ── */}
      {activeTab === 'diva5' && (
        <Diva5
          data={tdah.diva5}
          onChange={(d) => onTdahChange({ ...tdah, diva5: d })}
        />
      )}

      {/* ── WFIRS ── */}
      {activeTab === 'wfirs' && (
        <Wfirs
          data={tdah.wfirs}
          onChange={(w) => onTdahChange({ ...tdah, wfirs: w })}
        />
      )}

      {/* ── Synthèse TDAH ── */}
      {activeTab === 'tdah_synthese' && (
        <TdahSynthese
          tdah={tdah}
          onTdahChange={onTdahChange}
        />
      )}
    </div>
  );
}
