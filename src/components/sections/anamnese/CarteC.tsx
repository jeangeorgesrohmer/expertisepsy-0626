import { CarteCData, Observance, YesNoNR } from '../../../types/anamnese';
import { FormRow, SectionCard, StandaloneText, InlineText } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';
import QuadToggle from '../../ui/QuadToggle';

interface Props {
  data: CarteCData;
  onChange: (data: CarteCData) => void;
}

const CONSUMPTION_TYPES = [
  { value: '', label: 'Sélectionner...' },
  { value: 'Dépendance', label: 'Dépendance' },
  { value: 'Usage nocif pour la santé', label: 'Usage nocif pour la santé' },
  { value: 'Usage récréatif', label: 'Usage récréatif' },
  { value: 'Usage occasionnel', label: 'Usage occasionnel' },
];

export default function CarteC({ data, onChange }: Props) {
  const set = (field: keyof CarteCData, value: YesNoNR | Observance | string) =>
    onChange({ ...data, [field]: value });

  return (
    <SectionCard title="C. Addictologie">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pb-2">Alcool</p>
      <FormRow label="Non consommateur">
        <TriToggle value={data.alcoolNonConsommateur} onChange={(v) => set('alcoolNonConsommateur', v)} />
      </FormRow>
      <FormRow label="Consommation occasionnelle">
        <TriToggle value={data.alcoolConsommationOccasionnelle} onChange={(v) => set('alcoolConsommationOccasionnelle', v)} />
      </FormRow>
      <FormRow label="Consommation régulière">
        <TriToggle value={data.alcoolConsommationReguliere} onChange={(v) => set('alcoolConsommationReguliere', v)} />
      </FormRow>
      <FormRow label="Consommation quotidienne">
        <TriToggle value={data.alcoolConsommationQuotidienne} onChange={(v) => set('alcoolConsommationQuotidienne', v)} />
      </FormRow>
      <StandaloneText
        label="Quantité estimée/jour"
        value={data.alcoolQuantiteEstimeeJour}
        onChange={(v) => set('alcoolQuantiteEstimeeJour', v)}
        placeholder="ex: 2 verres/jour"
      />
      <FormRow label="Alcoolo-dépendance">
        <TriToggle value={data.alcooloDependance} onChange={(v) => set('alcooloDependance', v)} />
      </FormRow>
      <FormRow label="Antécédents de sevrage">
        <TriToggle value={data.antecedentsSevrage} onChange={(v) => set('antecedentsSevrage', v)} />
      </FormRow>
      <FormRow label="Antécédents de delirium tremens">
        <TriToggle value={data.antecedentsDeliriumTremens} onChange={(v) => set('antecedentsDeliriumTremens', v)} />
      </FormRow>

      <div className="border-l-2 border-blue-200 pl-3 py-2 my-2 bg-blue-50/30 rounded">
        <FormRow label="Antécédents de consommation significative (actuellement sevré/abstinent)">
          <TriToggle value={data.alcoolAntecedents} onChange={(v) => set('alcoolAntecedents', v)} />
        </FormRow>
        {data.alcoolAntecedents === 'Oui' && (
          <div className="space-y-2 mt-2 ml-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Durée de la consommation passée</label>
              <input
                type="text"
                className="w-full px-2.5 py-1.5 text-sm rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                placeholder="ex: 10 ans, quelques mois..."
                value={data.alcoolAntecedentsDuree}
                onChange={(e) => set('alcoolAntecedentsDuree', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Type de consommation</label>
              <select
                className="w-full px-2.5 py-1.5 text-sm rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-white"
                value={data.alcoolAntecedentsType}
                onChange={(e) => set('alcoolAntecedentsType', e.target.value)}
              >
                {CONSUMPTION_TYPES.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-3 pb-2">Substances psychoactives</p>

      <div className="space-y-3">
        <div>
          <FormRow label="Cannabis">
            <TriToggle value={data.cannabis} onChange={(v) => set('cannabis', v)} />
            <InlineText value={data.cannabisFrequence} onChange={(v) => set('cannabisFrequence', v)} placeholder="Fréquence" />
          </FormRow>
          {data.cannabis !== 'Oui' && (
            <div className="border-l-2 border-blue-200 pl-3 py-2 mt-2 bg-blue-50/30 rounded">
              <FormRow label="Antécédents de consommation (actuellement abstinent)">
                <TriToggle value={data.cannabisAntecedents} onChange={(v) => set('cannabisAntecedents', v)} />
              </FormRow>
              {data.cannabisAntecedents === 'Oui' && (
                <div className="space-y-2 mt-2 ml-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Durée</label>
                    <input
                      type="text"
                      className="w-full px-2.5 py-1.5 text-sm rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      placeholder="ex: 5 ans"
                      value={data.cannabisAntecedentsDuree}
                      onChange={(e) => set('cannabisAntecedentsDuree', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Type</label>
                    <select
                      className="w-full px-2.5 py-1.5 text-sm rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-white"
                      value={data.cannabisAntecedentsType}
                      onChange={(e) => set('cannabisAntecedentsType', e.target.value)}
                    >
                      {CONSUMPTION_TYPES.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <FormRow label="Cocaïne">
            <TriToggle value={data.cocaine} onChange={(v) => set('cocaine', v)} />
            <InlineText value={data.cocaineFrequence} onChange={(v) => set('cocaineFrequence', v)} placeholder="Fréquence" />
          </FormRow>
          {data.cocaine !== 'Oui' && (
            <div className="border-l-2 border-blue-200 pl-3 py-2 mt-2 bg-blue-50/30 rounded">
              <FormRow label="Antécédents de consommation (actuellement abstinent)">
                <TriToggle value={data.cocaineAntecedents} onChange={(v) => set('cocaineAntecedents', v)} />
              </FormRow>
              {data.cocaineAntecedents === 'Oui' && (
                <div className="space-y-2 mt-2 ml-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Durée</label>
                    <input
                      type="text"
                      className="w-full px-2.5 py-1.5 text-sm rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      placeholder="ex: 2 ans"
                      value={data.cocaineAntecedentsDuree}
                      onChange={(e) => set('cocaineAntecedentsDuree', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Type</label>
                    <select
                      className="w-full px-2.5 py-1.5 text-sm rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-white"
                      value={data.cocaineAntecedentsType}
                      onChange={(e) => set('cocaineAntecedentsType', e.target.value)}
                    >
                      {CONSUMPTION_TYPES.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <FormRow label="Héroïne">
            <TriToggle value={data.heroine} onChange={(v) => set('heroine', v)} />
            <InlineText value={data.heroineFrequence} onChange={(v) => set('heroineFrequence', v)} placeholder="Fréquence" />
          </FormRow>
          {data.heroine !== 'Oui' && (
            <div className="border-l-2 border-blue-200 pl-3 py-2 mt-2 bg-blue-50/30 rounded">
              <FormRow label="Antécédents de consommation (actuellement abstinent)">
                <TriToggle value={data.heroineAntecedents} onChange={(v) => set('heroineAntecedents', v)} />
              </FormRow>
              {data.heroineAntecedents === 'Oui' && (
                <div className="space-y-2 mt-2 ml-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Durée</label>
                    <input
                      type="text"
                      className="w-full px-2.5 py-1.5 text-sm rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      placeholder="ex: 3 ans"
                      value={data.heroineAntecedentsDuree}
                      onChange={(e) => set('heroineAntecedentsDuree', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Type</label>
                    <select
                      className="w-full px-2.5 py-1.5 text-sm rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-white"
                      value={data.heroineAntecedentsType}
                      onChange={(e) => set('heroineAntecedentsType', e.target.value)}
                    >
                      {CONSUMPTION_TYPES.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <FormRow label="Amphétamines">
            <TriToggle value={data.amphetamines} onChange={(v) => set('amphetamines', v)} />
            <InlineText value={data.amphetaminesFrequence} onChange={(v) => set('amphetaminesFrequence', v)} placeholder="Fréquence" />
          </FormRow>
          {data.amphetamines !== 'Oui' && (
            <div className="border-l-2 border-blue-200 pl-3 py-2 mt-2 bg-blue-50/30 rounded">
              <FormRow label="Antécédents de consommation (actuellement abstinent)">
                <TriToggle value={data.amphetaminesAntecedents} onChange={(v) => set('amphetaminesAntecedents', v)} />
              </FormRow>
              {data.amphetaminesAntecedents === 'Oui' && (
                <div className="space-y-2 mt-2 ml-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Durée</label>
                    <input
                      type="text"
                      className="w-full px-2.5 py-1.5 text-sm rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      placeholder="ex: 1 an"
                      value={data.amphetaminesAntecedentsDuree}
                      onChange={(e) => set('amphetaminesAntecedentsDuree', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Type</label>
                    <select
                      className="w-full px-2.5 py-1.5 text-sm rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-white"
                      value={data.amphetaminesAntecedentsType}
                      onChange={(e) => set('amphetaminesAntecedentsType', e.target.value)}
                    >
                      {CONSUMPTION_TYPES.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <FormRow label="MDMA/Ecstasy">
            <TriToggle value={data.mdmaEcstasy} onChange={(v) => set('mdmaEcstasy', v)} />
            <InlineText value={data.mdmaEcstasyFrequence} onChange={(v) => set('mdmaEcstasyFrequence', v)} placeholder="Fréquence" />
          </FormRow>
          {data.mdmaEcstasy !== 'Oui' && (
            <div className="border-l-2 border-blue-200 pl-3 py-2 mt-2 bg-blue-50/30 rounded">
              <FormRow label="Antécédents de consommation (actuellement abstinent)">
                <TriToggle value={data.mdmaEcstasyAntecedents} onChange={(v) => set('mdmaEcstasyAntecedents', v)} />
              </FormRow>
              {data.mdmaEcstasyAntecedents === 'Oui' && (
                <div className="space-y-2 mt-2 ml-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Durée</label>
                    <input
                      type="text"
                      className="w-full px-2.5 py-1.5 text-sm rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      placeholder="ex: quelques mois"
                      value={data.mdmaEcstasyAntecedentsDuree}
                      onChange={(e) => set('mdmaEcstasyAntecedentsDuree', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Type</label>
                    <select
                      className="w-full px-2.5 py-1.5 text-sm rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-white"
                      value={data.mdmaEcstasyAntecedentsType}
                      onChange={(e) => set('mdmaEcstasyAntecedentsType', e.target.value)}
                    >
                      {CONSUMPTION_TYPES.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <FormRow label="Autres">
            <TriToggle value={data.autresDrogues} onChange={(v) => set('autresDrogues', v)} />
            <InlineText value={data.autresDroguesPreciser} onChange={(v) => set('autresDroguesPreciser', v)} placeholder="Préciser" />
          </FormRow>
          {data.autresDrogues !== 'Oui' && (
            <div className="border-l-2 border-blue-200 pl-3 py-2 mt-2 bg-blue-50/30 rounded">
              <FormRow label="Antécédents de consommation (actuellement abstinent)">
                <TriToggle value={data.autresDroguesAntecedents} onChange={(v) => set('autresDroguesAntecedents', v)} />
              </FormRow>
              {data.autresDroguesAntecedents === 'Oui' && (
                <div className="space-y-2 mt-2 ml-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Durée</label>
                    <input
                      type="text"
                      className="w-full px-2.5 py-1.5 text-sm rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      placeholder="ex: 2 ans"
                      value={data.autresDroguesAntecedentsDuree}
                      onChange={(e) => set('autresDroguesAntecedentsDuree', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Type</label>
                    <select
                      className="w-full px-2.5 py-1.5 text-sm rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-white"
                      value={data.autresDroguesAntecedentsType}
                      onChange={(e) => set('autresDroguesAntecedentsType', e.target.value)}
                    >
                      {CONSUMPTION_TYPES.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-4 pb-2">Traitements de substitution</p>
      <FormRow label="Méthadone">
        <TriToggle value={data.methadone} onChange={(v) => set('methadone', v)} />
      </FormRow>
      <FormRow label="Buprénorphine (Subutex)">
        <TriToggle value={data.buprenorphine} onChange={(v) => set('buprenorphine', v)} />
      </FormRow>
      <FormRow label="Observance substitution">
        <QuadToggle value={data.observanceSubstitution} onChange={(v) => set('observanceSubstitution', v)} />
      </FormRow>

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-4 pb-2">Tabac</p>
      <FormRow label="Non-fumeur">
        <TriToggle value={data.nonFumeur} onChange={(v) => set('nonFumeur', v)} />
      </FormRow>
      <FormRow label="Fumeur">
        <TriToggle value={data.fumeur} onChange={(v) => set('fumeur', v)} />
        <InlineText value={data.fumeurQuantiteJour} onChange={(v) => set('fumeurQuantiteJour', v)} placeholder="Quantité/jour" />
      </FormRow>

      {data.fumeur !== 'Oui' && (
        <div className="border-l-2 border-blue-200 pl-3 py-2 mt-2 bg-blue-50/30 rounded">
          <FormRow label="Antécédents de tabagisme (actuellement sevré/non-fumeur)">
            <TriToggle value={data.fumeurAntecedents} onChange={(v) => set('fumeurAntecedents', v)} />
          </FormRow>
          {data.fumeurAntecedents === 'Oui' && (
            <div className="space-y-2 mt-2 ml-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Durée du tabagisme passé</label>
                <input
                  type="text"
                  className="w-full px-2.5 py-1.5 text-sm rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  placeholder="ex: 20 ans, 1 paquet/jour pendant 10 ans..."
                  value={data.fumeurAntecedentsDuree}
                  onChange={(e) => set('fumeurAntecedentsDuree', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Type de consommation</label>
                <select
                  className="w-full px-2.5 py-1.5 text-sm rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-white"
                  value={data.fumeurAntecedentsType}
                  onChange={(e) => set('fumeurAntecedentsType', e.target.value)}
                >
                  {CONSUMPTION_TYPES.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      )}

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-4 pb-2">Addictions comportementales (sans substance)</p>
      <FormRow label="Jeu pathologique (jeux d'argent, casino, paris sportifs)">
        <TriToggle value={data.jeuPathologique} onChange={(v) => set('jeuPathologique', v)} />
      </FormRow>
      <FormRow label="Achats compulsifs">
        <TriToggle value={data.achatsCompulsifs} onChange={(v) => set('achatsCompulsifs', v)} />
      </FormRow>
      <FormRow label="Addiction aux écrans / jeux vidéo">
        <TriToggle value={data.addictionEcransJeuxVideo} onChange={(v) => set('addictionEcransJeuxVideo', v)} />
      </FormRow>
    </SectionCard>
  );
}
