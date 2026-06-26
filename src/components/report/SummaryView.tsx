import type { FormData } from '../../types';
import { SCALES } from '../../constants/echellesActuarielles';
import { generateTdahSynthesis } from '../sections/tdah/TdahSynthese';

interface SummaryViewProps {
  data: FormData;
}

function renderParagraph(title: string, content: string | undefined) {
  if (!content || content.trim() === '' || content === 'NR') return null;
  return (
    <div className="mb-4">
      <h3 className="font-semibold text-stone-800 mb-2">{title}</h3>
      <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">{content}</p>
    </div>
  );
}

function renderList(title: string, items: string[]) {
  if (items.length === 0) return null;
  return (
    <div className="mb-4">
      <h3 className="font-semibold text-stone-800 mb-2">{title}</h3>
      <ul className="list-disc list-inside space-y-1 text-stone-700">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function collectYesFields(data: Record<string, unknown>, labels: Record<string, string>): string[] {
  const items: string[] = [];
  for (const [key, label] of Object.entries(labels)) {
    const val = data[key];
    if (val === true || val === 'Oui') {
      items.push(label);
    }
  }
  return items;
}

function collectTextFields(data: Record<string, unknown>, labels: Record<string, string>): string[] {
  const items: string[] = [];
  for (const [key, label] of Object.entries(labels)) {
    const val = data[key];
    if (typeof val === 'string' && val.trim() !== '' && val !== 'NR') {
      items.push(`${label}: ${val}`);
    }
  }
  return items;
}

export default function SummaryView({ data }: SummaryViewProps) {
  const isExpertise = data.documentMode === 'expertise';
  const subjectName = [data.identification.carteA.prenom, data.identification.carteA.nom]
    .filter(Boolean)
    .join(' ');

  // Collecte des syndromes présents
  const syndromesPresents: string[] = [];
  if (data.examen_psychiatrique.carteE.presenceSyndrome === 'Oui') syndromesPresents.push('Syndrome dépressif');
  if (data.examen_psychiatrique.carteF.presenceSyndrome === 'Oui') syndromesPresents.push('Syndrome maniaque');
  if (data.examen_psychiatrique.carteG.presenceSyndrome === 'Oui') syndromesPresents.push('Syndrome anxieux');
  if (data.examen_psychiatrique.carteH.presenceSyndrome === 'Oui') syndromesPresents.push('TOC');
  if (data.examen_psychiatrique.carteI.presenceSyndrome === 'Oui') syndromesPresents.push('Stress post-traumatique');
  if (data.examen_psychiatrique.carteJ.presenceSyndrome === 'Oui') syndromesPresents.push('Syndrome délirant');
  if (data.examen_psychiatrique.carteK.presenceSyndrome === 'Oui') syndromesPresents.push('Syndrome hallucinatoire');
  if (data.examen_psychiatrique.carteL.presenceSyndrome === 'Oui') syndromesPresents.push('Syndrome dissociatif');
  if (data.examen_psychiatrique.carteM.presenceSyndrome === 'Oui') syndromesPresents.push('Syndrome catatonique');
  if (data.examen_psychiatrique.carteN.presenceSyndrome === 'Oui') syndromesPresents.push('Symptômes négatifs');
  if (data.examen_psychiatrique.carteO.presenceSyndrome === 'Oui') syndromesPresents.push('Syndrome confusionnel');
  if (data.examen_psychiatrique.carteOBis.presenceSyndrome === 'Oui') syndromesPresents.push('Troubles liés aux substances');
  if (data.examen_psychiatrique.carteP.presenceSyndrome === 'Oui') syndromesPresents.push('Syndrome démentiel');
  if (data.examen_psychiatrique.carteQ.presenceSyndrome === 'Oui') syndromesPresents.push('TCA');
  if (data.examen_psychiatrique.carteR.presenceSyndrome === 'Oui') syndromesPresents.push('TDAH');
  if (data.examen_psychiatrique.carteW.presenceSyndrome === 'Oui') syndromesPresents.push('TSA');
  if (data.examen_psychiatrique.carteS.presenceSyndrome === 'Oui') syndromesPresents.push('Troubles paraphiliques');
  if (data.examen_psychiatrique.carteT.presenceSyndrome === 'Oui') syndromesPresents.push('Troubles de la personnalité');

  return (
    <div className="space-y-8 text-stone-900">
      {/* Section I - Informations générales */}
      <section>
        <h2 className="text-xl font-bold uppercase tracking-wider text-stone-900 mb-4 pb-2 border-b-2 border-stone-300">
          I. Informations générales
        </h2>

        <div className="space-y-3 text-sm">
          {subjectName && <p><span className="font-semibold">Sujet :</span> {subjectName}</p>}
          {data.identification.carteA.age && <p><span className="font-semibold">Âge :</span> {data.identification.carteA.age} ans</p>}
          {data.identification.carteA.lieuExamen && <p><span className="font-semibold">Lieu :</span> {data.identification.carteA.lieuExamen}</p>}
          {data.identification.carteA.dateExamen && <p><span className="font-semibold">Date :</span> {data.identification.carteA.dateExamen}</p>}
          {data.identification.carteA.dureeExamen && <p><span className="font-semibold">Durée :</span> {data.identification.carteA.dureeExamen}</p>}
        </div>

        {isExpertise && (
          <>
            {renderParagraph('Rappel des faits', data.identification.carteD.rappelDesFaits)}
            {renderParagraph('Questions de la mission', data.identification.carteD.questionsMission)}
          </>
        )}

        {!isExpertise && (
          <>
            {renderParagraph('Médecin adresseur', data.identification.clinicalContext.medecinAdresseur)}
            {renderParagraph('Motif de consultation', data.identification.clinicalContext.motifConsultation)}
          </>
        )}
      </section>

      {/* Section II - Anamnèse */}
      <section>
        <h2 className="text-xl font-bold uppercase tracking-wider text-stone-900 mb-4 pb-2 border-b-2 border-stone-300">
          II. Anamnèse biographique
        </h2>

        {renderParagraph('Antécédents médicaux', data.anamnese.carteA.antecedentsMedicaux)}
        {renderParagraph('Antécédents psychiatriques', data.anamnese.carteB.suiviPsychiatrique)}
        {renderParagraph('Antécédents judiciaires', data.anamnese.carteD.antecedentsJudiciaires)}
        {renderParagraph('Histoire familiale', data.anamnese.carteE.contexteEducatif)}
        {renderParagraph('Parcours scolaire', data.anamnese.carteF.niveauScolaire)}
        {renderParagraph('Situation professionnelle', data.anamnese.carteG.situationProfessionnelle)}
        {renderParagraph('Situation personnelle', data.anamnese.carteH.situationActuelle)}
      </section>

      {/* Section III - Examen psychiatrique */}
      <section>
        <h2 className="text-xl font-bold uppercase tracking-wider text-stone-900 mb-4 pb-2 border-b-2 border-stone-300">
          III. Examen psychiatrique
        </h2>

        {renderParagraph('Présentation générale', data.examen_psychiatrique.carteA.presentation)}
        {renderParagraph('Contact', data.examen_psychiatrique.carteA.qualiteContact)}
        {renderParagraph('Fonctions cognitives', data.examen_psychiatrique.carteB.orientation)}
        {renderParagraph('Cognition sociale', data.examen_psychiatrique.carteC.insight)}

        {renderList('Syndromes psychiatriques retrouvés', syndromesPresents)}

        {data.examen_psychiatrique.carteT.presenceSyndrome === 'Oui' && data.examen_psychiatrique.carteT.troubleSelectionne && (
          <div className="mb-4">
            <h3 className="font-semibold text-stone-800 mb-2">Trouble de la personnalité</h3>
            <p className="text-stone-700">Type : {data.examen_psychiatrique.carteT.troubleSelectionne}</p>
            {data.examen_psychiatrique.carteT.criteresCoches && data.examen_psychiatrique.carteT.criteresCoches.length > 0 && (
              <p className="text-stone-700 mt-1">Critères : {data.examen_psychiatrique.carteT.criteresCoches.join(', ')}</p>
            )}
          </div>
        )}
      </section>

      {/* Constantes biométriques */}
      {(data.biometric_data.poids || data.biometric_data.taille) && (
        <section>
          <h2 className="text-xl font-bold uppercase tracking-wider text-stone-900 mb-4 pb-2 border-b-2 border-stone-300">
            Données biométriques
          </h2>
          <div className="space-y-1 text-sm">
            {data.biometric_data.poids && <p><span className="font-semibold">Poids :</span> {data.biometric_data.poids} kg</p>}
            {data.biometric_data.taille && <p><span className="font-semibold">Taille :</span> {data.biometric_data.taille} cm</p>}
            {data.biometric_data.tensionArterielle && <p><span className="font-semibold">TA :</span> {data.biometric_data.tensionArterielle} mmHg</p>}
            {data.biometric_data.frequenceCardiaque && <p><span className="font-semibold">FC :</span> {data.biometric_data.frequenceCardiaque} bpm</p>}
          </div>
        </section>
      )}

      {/* Examen des faits (expertise uniquement) */}
      {isExpertise && (
        <section>
          <h2 className="text-xl font-bold uppercase tracking-wider text-stone-900 mb-4 pb-2 border-b-2 border-stone-300">
            IV. Examen au moment des faits
          </h2>
          {renderParagraph('Compréhension des faits', data.examen_faits.comprehension.comprehension)}
          {renderParagraph('Reconnaissance', data.examen_faits.reconnaissance.reconnaissance)}
          {renderParagraph('État mental', data.examen_faits.etatMental.troublePresent)}
          {data.examen_faits.amnesieFaits.amnesie === 'Oui' && (
            renderParagraph('Amnésie', 'Présence d\'amnésie des faits')
          )}
        </section>
      )}

      {/* Diagnostic */}
      <section>
        <h2 className="text-xl font-bold uppercase tracking-wider text-stone-900 mb-4 pb-2 border-b-2 border-stone-300">
          {isExpertise ? 'VI' : 'IV'}. Diagnostic
        </h2>
        {renderParagraph('Diagnostic principal', data.diagnostic.principal.diagnostic)}
        {renderParagraph('Diagnostics associés', data.diagnostic.diagnosticsAssocies)}
        {renderParagraph('Comorbidités', data.diagnostic.comorbidites)}
      </section>

      {/* Évaluation médico-légale (expertise uniquement) */}
      {isExpertise && (
        <>
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wider text-stone-900 mb-4 pb-2 border-b-2 border-stone-300">
              VII. Évaluation médico-légale
            </h2>

            {data.evaluation.alinea1.aboli !== 'NR' && (
              <div className="mb-4">
                <h3 className="font-semibold text-stone-800 mb-2">Article 122-1 alinéa 1 (Abolition du discernement)</h3>
                <p className="text-stone-700">{data.evaluation.alinea1.aboli}</p>
                {renderParagraph('Justification', data.evaluation.alinea1.justification)}
              </div>
            )}

            {data.evaluation.alinea2.altere !== 'NR' && (
              <div className="mb-4">
                <h3 className="font-semibold text-stone-800 mb-2">Article 122-1 alinéa 2 (Altération du discernement)</h3>
                <p className="text-stone-700">{data.evaluation.alinea2.altere}</p>
                {renderParagraph('Justification', data.evaluation.alinea2.justification)}
              </div>
            )}

            {data.evaluation.accessibilite.accessible !== 'NR' && (
              <div className="mb-4">
                <h3 className="font-semibold text-stone-800 mb-2">Accessibilité à la sanction pénale</h3>
                <p className="text-stone-700">{data.evaluation.accessibilite.accessible}</p>
              </div>
            )}
          </section>

          {/* Dangerosité */}
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wider text-stone-900 mb-4 pb-2 border-b-2 border-stone-300">
              VIII. Dangerosité et risque de récidive
            </h2>

            {data.dangerosite.evaluationActive && data.dangerosite.echellesCompletes && data.dangerosite.echellesCompletes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-stone-800 mb-3">Échelles actuarielles cotées</h3>
                {data.dangerosite.echellesCompletes.map((echelle, idx) => {
                  const scaleDefinition = SCALES[echelle.scaleType];
                  if (!scaleDefinition) return null;

                  const riskTotal = Object.values(echelle.scores).reduce((sum: number, val: any) => sum + (val || 0), 0);

                  return (
                    <div key={idx} className="mb-4 p-3 bg-stone-50 rounded">
                      <p className="font-medium text-stone-900">{scaleDefinition.fullName}</p>
                      <p className="text-sm text-stone-700 mt-1">Score total : {riskTotal}/{scaleDefinition.maxScore}</p>
                      {echelle.syntheseClinique && (
                        <p className="text-sm text-stone-600 mt-2 italic">{echelle.syntheseClinique}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {renderParagraph('Dangerosité psychiatrique', data.dangerosite.dangerositePsychiatrique.dangerositePresente)}
            {renderParagraph('Risque de récidive', data.dangerosite.risqueRecidive.risqueRecidive)}
            {renderParagraph('Nécessité de soins', data.dangerosite.necessiteSoins.necessiteSoins)}
            {renderParagraph('Injonction de soins', data.dangerosite.injonctionSoinsDetails.injonctionSoins)}
            {renderParagraph('Pronostic', data.dangerosite.pronostic.pronostic)}
          </section>

          {/* Conclusions */}
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wider text-stone-900 mb-4 pb-2 border-b-2 border-stone-300">
              VIII bis. Échelles d'évaluation clinique
            </h2>

            {/* Échelles psychométriques cotées */}
            {data.echelles_psychometriques && data.echelles_psychometriques.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-stone-800 mb-3">Échelles cliniques cotées</h3>
                {data.echelles_psychometriques.map((echelle, idx) => {
                  const scaleDefinition = SCALES[echelle.scaleType];
                  if (!scaleDefinition) return null;
                  const total = Object.values(echelle.scores).reduce((s: number, v: any) => s + (v || 0), 0);
                  return (
                    <div key={idx} className="mb-3 p-3 bg-stone-50 rounded">
                      <p className="font-medium text-stone-900">{scaleDefinition.fullName}</p>
                      <p className="text-sm text-stone-700 mt-1">Score total : {total}/{scaleDefinition.maxScore}</p>
                      {echelle.syntheseClinique && (
                        <p className="text-sm text-stone-600 mt-1 italic">{echelle.syntheseClinique}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* TDAH — DIVA-5 / WFIRS */}
            {(() => {
              const tdahSynthese = data.tdah?.diva5?.synthese?.trim();
              const hasAnyDiva5 = data.tdah?.diva5?.inattention?.some((c) => c.adult || c.childhood) ||
                data.tdah?.diva5?.hyperactivite?.some((c) => c.adult || c.childhood);
              if (!tdahSynthese && !hasAnyDiva5) return null;
              const text = tdahSynthese || generateTdahSynthesis(data.tdah);
              return (
                <div className="mb-4">
                  <h3 className="font-semibold text-stone-800 mb-2">Évaluation TDAH (DIVA-5 / WFIRS)</h3>
                  <pre className="text-sm text-stone-700 whitespace-pre-wrap font-sans leading-relaxed">{text}</pre>
                </div>
              );
            })()}
          </section>

          {/* Conclusions */}
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wider text-stone-900 mb-4 pb-2 border-b-2 border-stone-300">
              IX. Conclusions
            </h2>
            {renderParagraph('Synthèse clinique', data.conclusions.syntheseClinique)}
            {renderParagraph('Réponses aux questions', data.conclusions.reponsesQuestionsOrdonnance)}
            {renderParagraph('Observations finales', data.conclusions.observationsFinales)}
          </section>
        </>
      )}

      {/* Propositions de soins (mode clinique uniquement) */}
      {!isExpertise && (
        <section>
          <h2 className="text-xl font-bold uppercase tracking-wider text-stone-900 mb-4 pb-2 border-b-2 border-stone-300">
            V. Propositions de soins
          </h2>
          {renderParagraph('Propositions thérapeutiques', data.propositions_soins.propositionsTherapeutiques)}
          {renderParagraph('Orientation de soins', data.propositions_soins.orientationSoins)}
          {renderParagraph('Démarches médico-sociales', data.propositions_soins.demarchesMedicoSociales)}
        </section>
      )}
    </div>
  );
}
