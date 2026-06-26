import type { FormData } from '../types';
import type { CommentsData } from '../types/commentaires';
import * as L from '../components/report/labels';
import { SCALES, computeASRSPositiveCount, isASRSItemPositive, computePANSSSubscores, computeMoCAScore, computeStatic2002RScore } from '../constants/echellesActuarielles';
import { getClinicalInterpretation } from './clinicalScaleInterpretation';

const ANONYMIZED_KEYS = new Set([
  'nom', 'prenom', 'dateNaissance',
  'identiteMagistratDemandeur', 'identiteOPJ', 'requerant',
]);

function extractLines(
  data: Record<string, unknown>,
  labels: Record<string, string>
): string[] {
  const lines: string[] = [];
  for (const [key, label] of Object.entries(labels)) {
    if (ANONYMIZED_KEYS.has(key)) continue;
    const val = data[key];
    if (val === undefined || val === null) continue;
    if (typeof val === 'boolean') {
      if (val) lines.push(`- ${label} : Oui`);
    } else if (typeof val === 'string') {
      if (val === 'NR' || val.trim() === '') continue;
      lines.push(`- ${label} : ${val}`);
    }
  }
  return lines;
}

function addSubSection(
  output: string[],
  title: string,
  data: Record<string, unknown>,
  labels: Record<string, string>
) {
  const lines = extractLines(data, labels);
  if (lines.length === 0) return;
  output.push('');
  output.push(`  ${title} :`);
  output.push(...lines);
}

function addComment(output: string[], key: string, comments: CommentsData) {
  const entry = comments[key];
  if (entry?.has && entry.text.trim()) {
    output.push(`  Commentaire de l'expert : ${entry.text.trim()}`);
  }
}

function addAddictionHistory(output: string[], carteC: any) {
  const substances = [
    { name: 'alcool', label: 'alcool', currentKey: null, antKey: 'alcoolAntecedents', durKey: 'alcoolAntecedentsDuree', typeKey: 'alcoolAntecedentsType' },
    { name: 'cannabis', label: 'cannabis', currentKey: 'cannabis', antKey: 'cannabisAntecedents', durKey: 'cannabisAntecedentsDuree', typeKey: 'cannabisAntecedentsType' },
    { name: 'cocaine', label: 'cocaïne', currentKey: 'cocaine', antKey: 'cocaineAntecedents', durKey: 'cocaineAntecedentsDuree', typeKey: 'cocaineAntecedentsType' },
    { name: 'heroine', label: 'héroïne', currentKey: 'heroine', antKey: 'heroineAntecedents', durKey: 'heroineAntecedentsDuree', typeKey: 'heroineAntecedentsType' },
    { name: 'amphetamines', label: 'amphétamines', currentKey: 'amphetamines', antKey: 'amphetaminesAntecedents', durKey: 'amphetaminesAntecedentsDuree', typeKey: 'amphetaminesAntecedentsType' },
    { name: 'mdmaEcstasy', label: 'MDMA/Ecstasy', currentKey: 'mdmaEcstasy', antKey: 'mdmaEcstasyAntecedents', durKey: 'mdmaEcstasyAntecedentsDuree', typeKey: 'mdmaEcstasyAntecedentsType' },
    { name: 'autres', label: 'autres substances', currentKey: 'autresDrogues', antKey: 'autresDroguesAntecedents', durKey: 'autresDroguesAntecedentsDuree', typeKey: 'autresDroguesAntecedentsType' },
    { name: 'tabac', label: 'tabac', currentKey: 'fumeur', antKey: 'fumeurAntecedents', durKey: 'fumeurAntecedentsDuree', typeKey: 'fumeurAntecedentsType' },
  ];

  const historyLines: string[] = [];

  for (const sub of substances) {
    const hasAntecedents = carteC[sub.antKey] === 'Oui';
    const isCurrentlyUsing = sub.currentKey ? carteC[sub.currentKey] === 'Oui' : false;

    if (hasAntecedents && !isCurrentlyUsing) {
      const duration = carteC[sub.durKey]?.trim();
      const type = carteC[sub.typeKey]?.trim();

      let line = `Le sujet présente des antécédents de consommation de ${sub.label}`;

      if (duration) {
        line += `, d'une durée de ${duration}`;
      }

      if (type) {
        line += `, évaluée comme ${type.toLowerCase()}`;
      }

      line += '. Il est actuellement abstinent/sevré.';
      historyLines.push(`- ${line}`);
    }
  }

  if (historyLines.length > 0) {
    output.push('');
  output.push(`  Antécédents de consommation (actuellement sevré/abstinent) :`);
    output.push(...historyLines);
  }
}

function addPersonalityDisorder(output: string[], carteT: any) {
  if (carteT.presenceSyndrome !== 'Oui') return;

  const troubleSelectionne = carteT.troubleSelectionne?.trim();
  const hasTroubleDSM = troubleSelectionne && troubleSelectionne !== '';
  const hasFonctionnementPervers = carteT.fonctionnementPervers === true;

  if (!hasTroubleDSM && !hasFonctionnementPervers) return;

  const clusterMap: Record<string, string> = {
    'Paranoïaque': 'A',
    'Schizoïde': 'A',
    'Schizotypique': 'A',
    'Antisociale': 'B',
    'Borderline': 'B',
    'Histrionique': 'B',
    'Narcissique': 'B',
    'Évitante': 'C',
    'Dépendante': 'C',
    'Obsessionnelle-compulsive': 'C',
  };

  output.push('');
  output.push('  Troubles de la personnalite :');

  if (hasTroubleDSM) {
    const cluster = clusterMap[troubleSelectionne];
    let mainLine = `- L'examen met en évidence une personnalité de type ${troubleSelectionne}`;
    if (cluster) {
      mainLine += ` (Cluster ${cluster})`;
    }
    if (carteT.criteresCoches && carteT.criteresCoches.length > 0) {
      mainLine += `, étayée par les traits cliniques suivants : ${carteT.criteresCoches.join(', ')}.`;
    } else {
      mainLine += '.';
    }
    output.push(mainLine);
  }

  if (hasFonctionnementPervers) {
    let perverseLine = `- L'examen clinique met ${hasTroubleDSM ? 'également ' : ''}en évidence un fonctionnement de type pervers`;
    if (carteT.criteresPervers && carteT.criteresPervers.length > 0) {
      perverseLine += `, caractérisé par les éléments suivants : ${carteT.criteresPervers.join(', ')}.`;
    } else {
      perverseLine += '.';
    }
    output.push(perverseLine);
  }

  if (carteT.elementsCliniquesComplementaires?.trim()) {
    output.push(`- Précisions cliniques : ${carteT.elementsCliniquesComplementaires.trim()}`);
  }
}

function addEchellesActuarielles(output: string[], dangerosite: any) {
  if (!dangerosite.evaluationActive) {
    return;
  }

  const echellesCompletes = dangerosite.echellesCompletes || [];
  if (echellesCompletes.length === 0) return;

  output.push('');
  output.push('  === SYNTHÈSE DE LA DANGEROSITÉ ET DU RISQUE DE RÉCIDIVE ===');
  output.push(`- Dans le cadre de cette expertise de dangerosité, des outils clinico-actuariels structurés ont été cotés pour évaluer objectivement le risque de récidive.`);
  output.push('');
  output.push('  ⚠️ DIRECTIVE STRICTE POUR L\'IA :');
  output.push(`  L'expert a évalué le risque de récidive à l'aide d'outils structurés. Tu dois rédiger un paragraphe de synthèse médico-légale en distinguant clairement :`);
  output.push(`  1. Les facteurs de risque STATIQUES/HISTORIQUES (antécédents, caractéristiques immuables)`);
  output.push(`  2. Les facteurs de risque DYNAMIQUES/ÉVOLUTIFS (actuels, modifiables par le traitement)`);
  output.push(`  3. Les facteurs de PROTECTION/FORCES (éléments favorables, ressources du patient)`);
  output.push(`  Ne te contente pas de lister les scores. Intègre la synthèse clinique de l'expert et contextualise les résultats des échelles dans une argumentation cohérente et nuancée.`);
  output.push('');
  output.push('  === Détails des échelles cotées ===');

  for (const echelle of echellesCompletes) {
    const scaleDefinition = SCALES[echelle.scaleType];
    if (!scaleDefinition) continue;

    const riskTotal = Object.values(echelle.scores).reduce((sum: number, val: any) => sum + (val || 0), 0);
    const protectiveTotal = echelle.protectiveScores
      ? Object.values(echelle.protectiveScores).reduce((sum: number, val: any) => sum + (val || 0), 0)
      : 0;
    const strengthTotal = echelle.strengthScores
      ? Object.values(echelle.strengthScores).reduce((sum: number, val: any) => sum + (val || 0), 0)
      : 0;

    output.push('');
    output.push(`  - Échelle ${scaleDefinition.fullName}`);

    const isSexualViolenceScale = ['Static-99R', 'Static-2002R', 'SVR-20', 'STABLE-2007', 'CASIC', 'CPORT'].includes(echelle.scaleType);
    if (isSexualViolenceScale) {
      output.push(`    ⚠️ IMPORTANT : Cette échelle évalue spécifiquement le risque de violence ou récidive SEXUELLE.`);
    }
    if (echelle.scaleType === 'SSPI-2') {
      output.push(`    ⚠️ IMPORTANT : Cette échelle est un outil de DÉPISTAGE des intérêts sexuels pédophiliques fondé sur les caractéristiques des victimes. Elle ne constitue pas un diagnostic de trouble pédophilique.`);
    }

    if (echelle.scaleType === 'START') {
      output.push(`    Évaluation START (risque à court terme et traitabilité) :`);
      output.push(`    Score total de vulnérabilité : ${riskTotal}/${scaleDefinition.maxScore}`);
      output.push(`    Score total des facteurs de protection/forces : ${strengthTotal}/${scaleDefinition.maxScore}`);
      output.push(`    Note : Le START évalue le risque à court terme avec une double perspective (vulnérabilités et forces). Le niveau de risque clinique doit être déterminé par le clinicien.`);
    } else if (echelle.scaleType === 'SAVRY') {
      output.push(`    Score de risque : ${riskTotal}/${scaleDefinition.maxScore}`);
      if (protectiveTotal > 0) {
        output.push(`    Score de protection : ${protectiveTotal}`);
      }
    } else if (echelle.scaleType === 'SVR-20') {
      output.push(`    Score total : ${riskTotal}/${scaleDefinition.maxScore}`);
      output.push(`    Note : Le SVR-20 est un instrument de jugement clinique structuré. Le score total est informatif mais le niveau de risque final doit être déterminé par le clinicien.`);
    } else if (echelle.scaleType === 'Static-99R') {
      output.push(`    Score total : ${riskTotal}/${scaleDefinition.maxScore} (échelle de ${scaleDefinition.minScore} à ${scaleDefinition.maxScore})`);
    } else if (echelle.scaleType === 'Static-2002R') {
      const sub = computeStatic2002RScore(echelle.scores);
      const niveau = sub.total <= 1 ? 'Niveau I (Très faible)' : sub.total <= 3 ? 'Niveau II (Inférieur à la moyenne)' : sub.total <= 5 ? 'Niveau III (Moyen)' : sub.total <= 7 ? 'Niveau IVa (Supérieur à la moyenne)' : 'Niveau IVb (Bien supérieur à la moyenne)';
      output.push(`    Score total : ${sub.total} (échelle de -2 à 13, après recodage des sous-échelles)`);
      output.push(`    Niveau de risque standardisé : ${niveau}`);
      output.push(`    Sous-échelles — Âge : ${sub.age} | Persistance des infractions sexuelles : ${sub.persistence}/3 (brut ${sub.persistenceRaw}/5) | Intérêts sexuels déviants : ${sub.deviant}/3 | Relation aux victimes : ${sub.relationship}/2 | Criminalité générale : ${sub.general}/3 (brut ${sub.generalRaw}/6)`);
      output.push(`    Note : Le Static-2002R évalue le risque de récidive sexuelle à partir de facteurs STATIQUES. À croiser avec les facteurs dynamiques (SVR-20, STABLE-2007) dans le cadre du jugement professionnel structuré.`);
      const positiveItems = scaleDefinition.items
        .filter((item: any) => (echelle.scores[item.id] || 0) > 0)
        .map((item: any) => {
          const opt = item.options.find((o: any) => o.value === echelle.scores[item.id]);
          return `${item.label.replace(/^\d+\.\s*/, '')} : ${opt?.label ?? echelle.scores[item.id]}`;
        });
      if (positiveItems.length > 0) {
        output.push(`    Items cotés positivement : ${positiveItems.join(' | ')}`);
      }
    } else if (echelle.scaleType === 'SSPI-2') {
      const niveau = riskTotal <= 1 ? 'Faible' : riskTotal === 2 ? 'Modéré' : 'Élevé';
      output.push(`    Score total : ${riskTotal}/5`);
      output.push(`    Niveau indicatif d'intérêts pédophiliques : ${niveau}`);
      output.push(`    Note : Plus le score est élevé, plus la probabilité d'intérêts sexuels pédophiliques est importante. Un score ≥ 3 justifie une évaluation sexologique spécialisée approfondie.`);
    } else if (echelle.scaleType === 'STABLE-2007') {
      output.push(`    Score total : ${riskTotal}/${scaleDefinition.maxScore}`);
      output.push(`    Note : Le STABLE-2007 évalue les facteurs de risque dynamiques. À croiser avec le Static-99R pour une évaluation complète.`);
    } else if (echelle.scaleType === 'CASIC') {
      const casicNiveau = riskTotal <= 1 ? 'Faible' : riskTotal === 2 ? 'Modéré' : 'Significatif (seuil atteint)';
      output.push(`    Score total : ${riskTotal}/6`);
      output.push(`    Niveau : ${casicNiveau}`);
      const casicPositive = scaleDefinition.items
        .filter((item: any) => echelle.scores[item.id] === 1)
        .map((item: any) => item.label.replace(/^\d+\.\s*/, ''));
      if (casicPositive.length > 0) {
        output.push(`    Critères présents : ${casicPositive.join(' | ')}`);
      }
      if (riskTotal >= 3) {
        output.push(`    RÈGLE D'ÉQUIVALENCE ACTIVÉE : Score CASIC ≥ 3 → L'Item 5 du CPORT (Intérêt pédophilique avéré) doit être coté à 1 même si le sujet est dans le déni.`);
      }
      output.push(`    Note : La CASIC évalue les indicateurs comportementaux d'intérêt sexuel envers les enfants. Un score ≥ 3 valide cliniquement l'Item 5 du CPORT malgré le déni du sujet.`);
    } else if (echelle.scaleType === 'CPORT') {
      const cportNiveau = riskTotal === 0 ? 'TRÈS FAIBLE' : riskTotal === 1 ? 'FAIBLE-MODÉRÉ' : riskTotal === 2 ? 'MODÉRÉ-ÉLEVÉ' : riskTotal <= 4 ? 'ÉLEVÉ' : 'TRÈS ÉLEVÉ';
      output.push(`    Score total : ${riskTotal}/7`);
      output.push(`    Catégorie de risque : ${cportNiveau}`);
      const cportPositive = scaleDefinition.items
        .filter((item: any) => echelle.scores[item.id] === 1)
        .map((item: any) => item.label.replace(/^\d+\.\s*/, ''));
      if (cportPositive.length > 0) {
        output.push(`    Items cotés positivement : ${cportPositive.join(' | ')}`);
      }
      output.push(`    Correspondance : 0=Très Faible | 1=Faible-Modéré | 2=Modéré-Élevé | 3-4=Élevé | 5-7=Très Élevé`);
      output.push(`    Note : Le CPORT est un outil actuariel spécifique aux infractions liées au MASM. L'Item 5 peut être forcé à 1 par la règle d'équivalence CASIC ≥ 3.`);
      output.push(`    CONSIGNE POUR L'IA : Rédige dans le rapport une sous-section "Évaluation Actuarielle du Risque (CPORT)" présentant chaque item avec sa justification clinique, le score total, la catégorie de risque en MAJUSCULES, et une analyse clinique intégrative de 3-4 lignes articulant ces facteurs statiques avec la dynamique actuelle du sujet.`);
    } else {
      output.push(`    Score total : ${riskTotal}/${scaleDefinition.maxScore}`);
    }

    const maxItemValue = echelle.scaleType === 'Static-2002R'
      ? -1
      : Math.max(...(scaleDefinition.items[0]?.options?.map((o: any) => o.value) || [0]));
    const significantItems: string[] = [];

    for (const item of scaleDefinition.items) {
      const score = echelle.scores[item.id];
      if (score === maxItemValue && maxItemValue > 0) {
        const labelWithoutNumber = item.label.replace(/^[A-Z]?\d+\.\s*/, '').replace(/^\d+\.\s*/, '');
        significantItems.push(labelWithoutNumber);
      }
    }

    if (significantItems.length > 0) {
      output.push(`    Items cotés au maximum (significatifs) : ${significantItems.join(', ')}`);
    }

    if (echelle.scaleType === 'START' && echelle.strengthScores) {
      const strengthSignificantItems: string[] = [];
      const maxStrengthValue = Math.max(...(scaleDefinition.items[0]?.options?.map((o: any) => o.value) || [0]));

      for (const item of scaleDefinition.items) {
        const score = echelle.strengthScores[item.id];
        if (score === maxStrengthValue && maxStrengthValue > 0) {
          const labelWithoutNumber = item.label.replace(/^[A-Z]?\d+\.\s*/, '').replace(/^\d+\.\s*/, '');
          strengthSignificantItems.push(labelWithoutNumber);
        }
      }

      if (strengthSignificantItems.length > 0) {
        output.push(`    Forces significatives (START) : ${strengthSignificantItems.join(', ')}`);
      }
    }

    if (scaleDefinition.protectiveItems && echelle.protectiveScores) {
      const protectiveSignificantItems: string[] = [];
      const maxProtectiveValue = Math.max(...(scaleDefinition.protectiveItems[0]?.options?.map((o: any) => o.value) || [0]));

      for (const item of scaleDefinition.protectiveItems) {
        const score = echelle.protectiveScores[item.id];
        if (score === maxProtectiveValue && maxProtectiveValue > 0) {
          const labelWithoutNumber = item.label.replace(/^[A-Z]?\d+\.\s*/, '').replace(/^\d+\.\s*/, '');
          protectiveSignificantItems.push(labelWithoutNumber);
        }
      }

      if (protectiveSignificantItems.length > 0) {
        output.push(`    Facteurs de protection significatifs : ${protectiveSignificantItems.join(', ')}`);
      }
    }

    if (echelle.syntheseClinique?.trim()) {
      output.push(`    Synthèse clinique du rédacteur : ${echelle.syntheseClinique.trim()}`);
    }
  }

  const jps = dangerosite.syntheseJPS;
  const hasJPS = jps && [jps.sspi2, jps.static2002r, jps.discussionSVR20, jps.conclusions].some((t: string) => t?.trim());
  if (hasJPS) {
    output.push('');
    output.push("  === SYNTHÈSE JPS (Jugement Professionnel Structuré) — Risque de récidive sexuelle ===");
    if (jps.sspi2?.trim()) {
      output.push(`  1. SSPI-2 (intérêts pédophiliques) : ${jps.sspi2.trim()}`);
    }
    if (jps.static2002r?.trim()) {
      output.push(`  2. Static-2002R (facteurs statiques de récidive sexuelle) : ${jps.static2002r.trim()}`);
    }
    if (jps.discussionSVR20?.trim()) {
      output.push(`  3. Discussion clinique et intégration au SVR-20 (facteurs dynamiques) : ${jps.discussionSVR20.trim()}`);
    }
    if (jps.conclusions?.trim()) {
      output.push(`  4. Conclusions et recommandations de l'expert (évaluation JPS) : ${jps.conclusions.trim()}`);
    }
    output.push(`  CONSIGNE : Cette synthèse JPS rédigée par l'expert fait autorité. Intègre-la fidèlement dans la synthèse médico-légale en articulant mesures actuarielles (Static-2002R), dépistage (SSPI-2) et jugement clinique structuré (SVR-20).`);
  }

  output.push('');
  output.push("  CONSIGNE IMPORTANTE POUR L'IA : Tu dois rédiger une synthèse argumentée et structurée sur la dangerosité psychiatrique et criminologique en intégrant les scores des échelles fournies ci-dessus et la clinique du patient. Cette synthèse doit être cohérente, nuancée et s'appuyer sur l'ensemble des éléments cliniques recueillis lors de l'examen. Prends particulièrement en compte les items cotés au maximum qui représentent les facteurs de risque les plus significatifs.");
}

function buildInstructionsDiagnostiques(examen: any): string[] {
  const isPresentOrAntecedent = (key: string) =>
    examen[key]?.presenceSyndrome === 'Oui' || examen[key]?.antecedentSyndrome === 'Oui';

  const hasDepressif = isPresentOrAntecedent('carteE');
  const hasManiaque = isPresentOrAntecedent('carteF');
  const regleA = hasDepressif && hasManiaque;

  const psychotiques = ['carteJ', 'carteK', 'carteL', 'carteM', 'carteN'];
  const hasPsychotique = psychotiques.some(isPresentOrAntecedent);
  const regleB = regleA && hasPsychotique;

  const hasDesorganisation = isPresentOrAntecedent('carteL');
  const schizAssocies = ['carteJ', 'carteK', 'carteM', 'carteN'];
  const hasSchizAssocie = schizAssocies.some(isPresentOrAntecedent);
  const regleC = hasDesorganisation && !regleB;

  const instructions: string[] = [];

  if (regleB) {
    instructions.push(
      "-> Au vu de la coexistence de troubles thymiques (maniaque/dépressif) et de la lignée psychotique/dissociative, tu devras impérativement discuter et argumenter l'hypothèse d'un trouble schizo-affectif (ou schizophrénie dysthymique)."
    );
  } else {
    if (regleA) {
      instructions.push(
        "-> Au vu de la présence actuelle ou passée d'épisodes maniaques et dépressifs, tu devras impérativement discuter et argumenter l'hypothèse clinique d'un trouble bipolaire."
      );
    }
    if (regleC) {
      const assocLabel = hasSchizAssocie
        ? " (isolé ou associé à d'autres éléments psychotiques)"
        : " isolé";
      instructions.push(
        `-> Au vu de la présence d'un syndrome de désorganisation${assocLabel}, tu devras impérativement discuter et argumenter l'hypothèse clinique d'un syndrome schizophrénique.`
      );
    }
  }

  return instructions;
}

function addEvocationDiagnostique(output: string[], examen: any) {
  const instructions = buildInstructionsDiagnostiques(examen);
  if (instructions.length === 0) return;

  output.push('');
  output.push('=== ÉVOCATION DIAGNOSTIQUE AUTOMATIQUE ===');
  output.push(...instructions.map((i) => `- ${i.replace(/^-> /, '')}`));
}

function addAntecedentsSymptomatologiques(output: string[], examen: any) {
  const syndromes = [
    { key: 'carteE', label: 'Syndrome dépressif', presenceKey: 'presenceSyndrome', labelMap: L.EXAM_E },
    { key: 'carteF', label: 'Syndrome maniaque/hypomaniaque', presenceKey: 'presenceSyndrome', labelMap: L.EXAM_F },
    { key: 'carteG', label: 'Syndrome anxieux', presenceKey: 'presenceSyndrome', labelMap: L.EXAM_G },
    { key: 'carteH', label: 'Troubles obsessionnels-compulsifs (TOC)', presenceKey: 'presenceSyndrome', labelMap: L.EXAM_H },
    { key: 'carteI', label: 'Syndrome psychotraumatique (ESPT)', presenceKey: 'presenceSyndrome', labelMap: L.EXAM_I },
    { key: 'carteJ', label: 'Syndrome délirant', presenceKey: 'presenceSyndrome', labelMap: L.EXAM_J },
    { key: 'carteK', label: 'Syndrome hallucinatoire', presenceKey: 'presenceSyndrome', labelMap: L.EXAM_K },
    { key: 'carteL', label: 'Syndrome de désorganisation (dissociation)', presenceKey: 'presenceSyndrome', labelMap: L.EXAM_L },
    { key: 'carteM', label: 'Syndrome catatonique', presenceKey: 'presenceSyndrome', labelMap: L.EXAM_M },
    { key: 'carteN', label: 'Syndrome déficitaire (négatif)', presenceKey: 'presenceSyndrome', labelMap: L.EXAM_N },
    { key: 'carteO', label: 'Syndrome confusionnel', presenceKey: 'presenceSyndrome', labelMap: L.EXAM_O },
    { key: 'carteOBis', label: "Troubles liés à l'usage de substances", presenceKey: 'troubleUsageSubstancesPresent', labelMap: L.EXAM_O_BIS },
    { key: 'carteQ', label: 'Troubles des conduites alimentaires (TCA)', presenceKey: 'presenceSyndrome', labelMap: L.EXAM_Q },
    { key: 'carteR', label: 'TDAH', presenceKey: 'presenceSyndrome', labelMap: L.EXAM_R },
    { key: 'carteW', label: 'Troubles du Spectre de l\'Autisme (TSA)', presenceKey: 'presenceSyndrome', labelMap: L.EXAM_W },
    { key: 'carteS', label: 'Troubles paraphiliques', presenceKey: 'presenceSyndrome', labelMap: L.EXAM_S },
    { key: 'carteT', label: 'Troubles de la personnalité', presenceKey: 'presenceSyndrome', labelMap: L.EXAM_T },
    { key: 'carteU', label: 'Impulsivité et hétéro-agressivité', presenceKey: 'presenceSyndrome', labelMap: L.EXAM_U },
    { key: 'carteV', label: 'Authenticité des troubles / Simulation', presenceKey: 'presenceSyndrome', labelMap: L.EXAM_V },
    { key: 'carteX', label: 'Troubles à symptomatologie somatique et pathomimies', presenceKey: 'presenceSyndrome', labelMap: L.EXAM_X },
  ];

  const antecedentLines: string[] = [];

  for (const syndrome of syndromes) {
    const carte = examen[syndrome.key];
    if (!carte || carte.antecedentSyndrome !== 'Oui') continue;

    const symptoms: string[] = [];
    for (const [field, val] of Object.entries(carte)) {
      if (field === 'antecedentSyndrome' || field === syndrome.presenceKey) continue;
      if (field === 'criteresCoches' && Array.isArray(val) && val.length > 0) {
        symptoms.push(...(val as string[]));
        continue;
      }
      if (field === 'criteresPervers' && Array.isArray(val) && val.length > 0) {
        symptoms.push(...(val as string[]));
        continue;
      }
      if (typeof val === 'string' && val === 'Oui') {
        const humanLabel = (syndrome.labelMap as Record<string, string>)[field];
        symptoms.push(humanLabel || field);
      }
    }

    let line = `- On note la présence d'antécédents de ${syndrome.label}`;
    if (symptoms.length > 0) {
      line += ` avec : ${symptoms.join(', ')}`;
    }
    line += '.';
    antecedentLines.push(line);
  }

  output.push('');
  output.push('=== ANTÉCÉDENTS PSYCHIATRIQUES SYMPTOMATOLOGIQUES ===');
  if (antecedentLines.length === 0) {
    output.push('- Aucun antécédent symptomatologique spécifique relevé à l\'interrogatoire.');
  } else {
    output.push(...antecedentLines);
  }
}

export function generateAIPrompt(data: FormData): string {
  const isExpertise = data.documentMode === 'expertise';
  const authorName = data.identification.carteA.authorName || 'Docteur Jean-Georges Rohmer';
  const titresExpert = data.identification.carteA.titresExpert || 'Psychiatre au CRAVS Alsace';

  const requerant =
    (data.identification.carteA.requerant ?? '').trim() ||
    (data.identification.carteB.identiteMagistratDemandeur ?? '').trim() ||
    (data.identification.carteB.identiteOPJ ?? '').trim() ||
    '[Identité du demandeur non renseignée]';

  const preamble = isExpertise
    ? `Tu agis en tant qu'assistant de rédaction pour ${authorName}, expert en psychiatrie légale, au CRAVS Alsace. Ta mission est de rédiger un rapport d'expertise psychiatrique exhaustif et médico-légal à partir des données brutes d'évaluation qui te seront fournies.

1. MISE EN FORME ET STYLE RÉDACTIONNEL (TRÈS IMPORTANT)
- Style littéraire et juridique : Rédige dans un français classique, fluide et professionnel, propre à la tradition de l'expertise psychiatrique française. Utilise des paragraphes rédigés avec des connecteurs logiques. Évite absolument le style télégraphique et limite au maximum l'usage des listes à puces.
- Aération et clarté : Le document doit être très lisible. Utilise des sauts de ligne marqués entre chaque paragraphe.
- Séparation des chapitres : Utilise des séparateurs visuels clairs (comme les lignes horizontales --- en Markdown) avant chaque grand chapitre (I, II, III, etc.) pour bien structurer le document.

2. RÈGLES D'ANONYMISATION ET D'INTRODUCTION ABSOLUES
- Anonymisation : Tu dois IMPÉRATIVEMENT utiliser uniquement les INITIALES réelles du sujet examiné, déduites de son nom et prénom figurant dans les données brutes (par exemple, pour "Henri Caron" tu écriras "M. H. C."), jamais son nom complet, dans tout le rapport. ATTENTION : "M. H. C." n'est qu'un exemple de format — ne recopie JAMAIS ces initiales d'exemple, calcule toujours les initiales à partir de l'identité réelle du sujet fournie dans les données.
- Introduction : Tu dois commencer le rapport STRICTEMENT par ce modèle exact (remplace les valeurs entre crochets par les données) :
"Je soussigné ${authorName}, ${titresExpert}, désigné en date du [Date de la mission] par ${requerant} avec pour mission :
- d'examiner : [INITIALES RÉELLES DU SUJET, calculées à partir de son nom et prénom dans les données] né(e) le [Date de naissance]
mis en cause pour : [Motifs / rappel des faits]
- et de répondre aux questions suivantes :
[Lister ici l'intégralité des questions posées]
certifie avoir personnellement rempli ma mission et en consigne le rapport ci-dessous. Le sujet a été examiné à [Lieu de l'examen] le [Date de l'examen]."

3. SECTION III : EXAMEN PSYCHIATRIQUE ET LOGIQUE TEMPORELLE
- Séparation stricte : Tu dois maintenir une frontière étanche entre l'état clinique actuel (transversal, le jour de l'examen) et les antécédents psychiatriques (longitudinal). Ne déduis pas un état actuel atténué à partir de symptômes passés.
- Dynamique Évolutive : À la fin de la section III, rédige systématiquement un sous-chapitre intitulé "Synthèse Clinique Évolutive". Ce paragraphe doit établir un lien comparatif entre les antécédents et l'état observé le jour de l'examen (stabilisation, amélioration, dégradation) et formuler une hypothèse sur l'origine de cette évolution (évolution naturelle, impact des traitements, iatrogénie, événement intercurrent).

4. SECTION VI : INSTRUCTIONS DIAGNOSTIQUES
- Tu dois justifier cliniquement chaque diagnostic posé (schizophrénie, trouble bipolaire, trouble schizo-affectif, etc.) en argumentant systématiquement à partir des syndromes (actuels ou passés) cochés dans l'observation.

5. SECTION VII : ÉVALUATION MÉDICO-LÉGALE ET RÉPONSES AUX QUESTIONS
- Dans cette section, tu dois reprendre une par une les questions posées par l'autorité mandante (mentionnées dans l'introduction).
- Pour chaque question, tu dois formuler une réponse claire, argumentée et rédigée, qui doit être déduite logiquement des éléments cliniques et biographiques exposés dans les chapitres précédents. L'argumentation est primordiale. Les réponses doivent être concises, formulées en quelques lignes au maximum.

Après avoir rédigé cette introduction stricte, tu rédigeras le reste du rapport de manière détaillée, clinique et argumentée en te basant sur les données suivantes :`
    : `Tu agis en tant que ${authorName}, ${titresExpert}. Ce rapport est rédigé par : ${authorName}. Ta mission est de rédiger un compte-rendu de bilan psychiatrique clinique complet et professionnel, à partir de données brutes d'évaluation qui te seront fournies par l'utilisateur.

### RÈGLES ABSOLUES DE RÉDACTION :

1. **Mise en page aérée et structurée :** Utilise systématiquement le Markdown pour structurer visuellement le texte. Utilise des lignes séparatrices (---) entre chaque grande section pour délimiter nettement les parties. Crée de vrais paragraphes distincts, toujours séparés par un saut de ligne franc.

2. **Style rédactionnel clinique et littéraire :** Il est strictement interdit d'utiliser un style télégraphique (les successions de puces isolées sans texte articulé sont à proscrire). Le texte doit être rédigé sous forme de phrases complètes, articulées par des connecteurs logiques fluides (il convient de noter que, par ailleurs, néanmoins, à l'examen on observe, etc.). Le ton doit refléter la rigueur de la psychiatrie clinique : objectif, nuancé, employant une terminologie médicale exacte.

3. **Logique déductive et fidélité aux données :** Le texte généré doit découler strictement et logiquement des données brutes d'observation fournies. Tu dois expliciter le lien entre les symptômes observés (ou leur absence) et la conclusion clinique de façon argumentée.

4. **Génération DYNAMIQUE de la clinique :** La section "Examen du patient" doit s'adapter au patient. Tu dois créer un paragraphe rédigé dédié pour CHAQUE pathologie/syndrome marqué comme "Oui/Présent" dans les données brutes.

5. **Exhaustivité clinique (Syndromes non retrouvés) :** Dans la sous-partie "Autres lignées syndromiques explorées", tu dois IMPÉRATIVEMENT formuler un paragraphe rédigé listant TOUS les syndromes marqués "Non/Absent" dans les données brutes. Cela certifie la rigueur de ton évaluation (ex: "L'examen ne retrouve par ailleurs aucun argument en faveur de...").

6. **Vocabulaire :** Utilise TOUJOURS le terme "patient" ou "patient(e)" et non "examiné" ou "mis en cause".

7. **Propositions thérapeutiques :** La conclusion doit impérativement inclure des recommandations thérapeutiques précises, une orientation de soins et des démarches médico-sociales si nécessaire, rédigées sous forme de texte continu et argumenté.

### STRUCTURE STRICTE À RESPECTER (Génère le rapport exactement avec cette trame) :

${isExpertise ? `**I. RAPPEL DE LA MISSION**` : `**I. CONTEXTE DE LA CONSULTATION**`}

${isExpertise ? `**Je soussigné ${authorName}, ${titresExpert}, requis en date du** [À COMPLÉTER] **par** [À COMPLÉTER, ex: Officier De Police Judiciaire] **avec pour mission de :**

**Bien vouloir procéder à l'examen psychiatrique de :**
**M.(Mme)** [Déduire le nom et le genre du sujet]
**Né(e) le** [À COMPLÉTER] **à** [À COMPLÉTER]
**Demeurant :** [À COMPLÉTER]

**Motif de la réquisition :**
[Rédiger ici le résumé des faits ou le motif de la réquisition tiré des données brutes]

**Et répondre aux questions suivantes :**
[⚠️ Insérer ici in extenso la liste exacte des questions figurant dans les données brutes sous la rubrique "Questions de la mission"]

*Certifie avoir personnellement rempli ma mission et en consigne le rapport ci-dessous.*
*Monsieur/Madame [Nom du sujet] a été examiné(e) à [Lieu de l'examen] le [Date de l'examen].*

---

⚖️ **CONCLUSIONS MÉDICO-LÉGALES (Synthèse rapide)**
**Sur les faits**
[Génère 3 ou 4 puces avec un emoji ✅ ou ⚠️ résumant la reconnaissance des faits et l'existence d'un lien avec la pathologie]
**Sur la dangerosité**
[Génère 2 ou 3 puces avec un emoji ✅ ou ⚠️ résumant l'évaluation de la dangerosité psychiatrique et le risque de récidive]
**Sur la responsabilité pénale**
[Génère des puces avec un emoji ✅ ou ⚠️ statuant synthétiquement sur l'abolition/altération du discernement (art 122-1) et l'accessibilité à la sanction]

💊 **TRAITEMENT ET PRONOSTIC**
[Génère un court paragraphe résumant le diagnostic principal, la curabilité, et les recommandations d'injonction ou d'obligation de soins]

---

**Circonstances de l'examen**
[Rédige le rappel des faits reprochés, les documents consultés et l'attitude globale du sujet face aux accusations lors de la garde à vue ou de l'examen]` : `**COMPTE-RENDU DE BILAN PSYCHIATRIQUE CLINIQUE**

**Patient :** [Nom et Prénom du patient]
**Date de naissance :** [À COMPLÉTER]
**Âge :** [À COMPLÉTER]
**Date de l'examen :** [Date de l'examen]
**Lieu de l'examen :** [Lieu]

**Médecin adresseur :** [Médecin traitant ou référent]
**Motif de consultation :** [Rédiger le motif de consultation et le contexte de la demande]

---

📋 **SYNTHÈSE CLINIQUE**
[Génère un paragraphe de synthèse résumant les principaux éléments cliniques, le diagnostic retenu et l'orientation thérapeutique proposée]

---

**Circonstances de l'évaluation**
[Rédige les documents consultés, les conditions de l'examen et l'attitude générale du patient lors de la consultation]`}

**Antécédents médicaux et chirurgicaux**
[Rédige les antécédents somatiques et traitements en cours]

**Antécédents psychiatriques**
[Rédige l'histoire psychiatrique, les hospitalisations, les suivis, les traitements et l'observance]

**Antécédents addictifs**
[Rédige les consommations de toxiques, alcool, tabac, âge de début et quantité]

**Antécédents judiciaires du sujet**
[Rédige les condamnations éventuelles et l'inscription au FIJAIS]

**Antécédents scolaires et professionnels**
[Rédige le parcours scolaire, les troubles du comportement dans l'enfance, et l'insertion professionnelle actuelle]

**Vie familiale et personnelle**
[Rédige la situation familiale, le statut marital, la dynamique relationnelle, affective et la vie sexuelle]

**Examen ${isExpertise ? 'du sujet' : 'du patient'}**
- **Présentation, contact et langage :** [Décris l'attitude générale, l'hygiène, la qualité du contact et la forme du discours]
- **Fonctions cognitives et cognition sociale :** [Décris l'orientation, l'attention, la mémoire, le niveau intellectuel, l'insight, l'anosognosie et les capacités d'empathie]
- **[GÉNÉRATION DYNAMIQUE DES SYNDROMES POSITIFS] :** [⚠️ CRUCIAL : Crée une sous-section distincte en gras (ex: **Syndrome dépressif :**, **Troubles de la personnalité :**, **Syndrome psychotique :**, etc.) pour CHAQUE pathologie marquée comme PRÉSENTE ("Oui") dans les données brutes, et développe ses symptômes cliniques.]
- **Autres lignées syndromiques explorées :** [⚠️ RÈGLE ABSOLUE : Rédige ici un paragraphe exhaustif listant formellement TOUS les autres syndromes qui sont ABSENTS (marqués "Non") dans les données pour prouver qu'ils ont été recherchés en vain.]

${isExpertise ? `**Discussion**
[Rédige une synthèse psychopathologique complète. Tu dois impérativement lier l'état mental au moment des faits (criminogenèse) avec l'acte reproché, et discuter cliniquement les facteurs de risque et de protection concernant la récidive.]

**Dangerosité et évaluation du risque de récidive**
[Rédige l'évaluation de la dangerosité psychiatrique et criminologique, en intégrant les facteurs de risque statiques et dynamiques, les facteurs de protection, et les résultats des échelles actuarielles cotées (y compris CASIC et CPORT si elles figurent dans les données).]

**Conclusions**
[⚠️ RÈGLE ABSOLUE : Reprends ici textuellement et dans l'ordre EXACT les questions figurant dans les données brutes sous la rubrique "Questions de la mission".
Sous chaque question, rédige une réponse claire, directe et argumentée, en justifiant ta conclusion par des éléments précis tirés de ton évaluation clinique (trouble mental, discernement, dangerosité, curabilité, etc.). Si aucune question n'est fournie dans les données brutes, utilise alors les questions médico-légales classiques.]` : `**Discussion et synthèse psychopathologique**
[Rédige une synthèse psychopathologique complète intégrant l'histoire du patient, les éléments biographiques, l'état mental actuel et les facteurs de vulnérabilité.]

**Conclusion et Propositions de Soins**

**Diagnostic retenu :** [Énonce le diagnostic principal et les comorbidités éventuelles]

**Propositions thérapeutiques :**
[Détaille les traitements médicamenteux recommandés, les approches psychothérapeutiques préconisées et toute autre intervention thérapeutique pertinente]

**Orientation de soins :**
[Précise le cadre de soins recommandé : suivi ambulatoire en CMP, hospitalisation, structure spécialisée, etc.]

**Démarches médico-sociales :**
[Liste les démarches administratives à entreprendre : dossier MDPH, demande d'ALD, arrêt de travail, accompagnement social, etc.]`}

**Fait à [Lieu de l'examen], le [Date de l'examen]**
**${authorName}**

Voici les données brutes de l'évaluation :`;

  const c = data.commentaires ?? {};

  const directivesStyle = isExpertise
    ? null
    : `⚠️ DIRECTIVES DE STYLE RÉDACTIONNEL (TRÈS IMPORTANT) : Tu rédiges un rapport psychiatrique clinique officiel. Ton style ne doit en aucun cas être télégraphique.
PROSE LITTÉRAIRE ET CLINIQUE : Rédige sous forme de paragraphes construits, fluides et argumentés. Utilise un vocabulaire médical précis et un style professionnel soigné.
INTERDICTION DU STYLE TÉLÉGRAPHIQUE : Banni les listes à puces excessives, les tirets isolés ou les phrases nominales hachées (sauf si strictement indispensable pour énumérer des critères précis).
LIAISON ET FLUIDITÉ : Utilise des connecteurs logiques (Il convient de noter que, par ailleurs, néanmoins, à l'examen on observe, etc.) pour lier tes idées. Les symptômes et données doivent être intégrés dans une narration clinique fluide.
PLAN RESPECTÉ : Tu dois conserver la structure en chapitres et les titres demandés, mais le contenu sous ces titres doit être rédigé sous forme de texte continu et soigné.`;

  const output: string[] = directivesStyle
    ? [preamble, '', directivesStyle, '']
    : [preamble, ''];

  output.push('=== I. INFORMATIONS GENERALES ===');
  if (data.identification.carteA.age) {
    output.push(`- Age ${isExpertise ? 'du sujet' : 'du patient'} : ${data.identification.carteA.age}`);
  }
  if (data.identification.carteA.lieuExamen) {
    output.push(`- Lieu de l'examen : ${data.identification.carteA.lieuExamen}`);
  }
  if (data.identification.carteA.dateExamen) {
    output.push(`- Date de l'examen : ${data.identification.carteA.dateExamen}`);
  }
  if (data.identification.carteA.dureeExamen) {
    output.push(`- Duree de l'examen : ${data.identification.carteA.dureeExamen}`);
  }
  addComment(output, 'ident.carteA', c);

  if (isExpertise) {
    addSubSection(output, 'Type d\'expertise', data.identification.carteB, L.IDENT_B);
    addComment(output, 'ident.carteB', c);
    addSubSection(output, 'Qualite du sujet', data.identification.carteC, L.IDENT_C);
    addComment(output, 'ident.carteC', c);
    if (data.identification.carteD.rappelDesFaits.trim()) {
      output.push(`\n  Rappel des faits :`);
      output.push(`- ${data.identification.carteD.rappelDesFaits}`);
    }
    if (data.identification.carteD.questionsMission.trim()) {
      output.push(`\n  Questions de la mission :`);
      output.push(`- ${data.identification.carteD.questionsMission}`);
    }
    addComment(output, 'ident.carteD', c);
    addComment(output, 'ident.carteQM', c);
  } else {
    if (data.identification.clinicalContext.medecinAdresseur.trim()) {
      output.push(`\n  Medecin adresseur :`);
      output.push(`- ${data.identification.clinicalContext.medecinAdresseur}`);
    }
    if (data.identification.clinicalContext.motifConsultation.trim()) {
      output.push(`\n  Motif de consultation :`);
      output.push(`- ${data.identification.clinicalContext.motifConsultation}`);
    }
    addComment(output, 'ident.clinical', c);
  }

  addSubSection(output, 'Documents consultes', data.identification.carteE, L.IDENT_E);
  addComment(output, 'ident.carteE', c);

  output.push('');
  output.push('=== II. ANAMNESE BIOGRAPHIQUE ===');
  addSubSection(output, 'Antecedents medicaux', data.anamnese.carteA, L.ANAM_A);
  addComment(output, 'anam.carteA', c);
  addSubSection(output, 'Antecedents psychiatriques', data.anamnese.carteB, L.ANAM_B);
  addComment(output, 'anam.carteB', c);
  addSubSection(output, 'Conduites addictives', data.anamnese.carteC, L.ANAM_C);
  addAddictionHistory(output, data.anamnese.carteC);
  addComment(output, 'anam.carteC', c);
  addSubSection(output, 'Antecedents judiciaires', data.anamnese.carteD, L.ANAM_D);
  addComment(output, 'anam.carteD', c);
  addSubSection(output, 'Histoire familiale', data.anamnese.carteE, L.ANAM_E);
  addComment(output, 'anam.carteE', c);
  addSubSection(output, 'Parcours scolaire', data.anamnese.carteF, L.ANAM_F);
  addComment(output, 'anam.carteF', c);
  addSubSection(output, 'Situation professionnelle', data.anamnese.carteG, L.ANAM_G);
  addComment(output, 'anam.carteG', c);
  addSubSection(output, 'Situation personnelle et sociale', data.anamnese.carteH, L.ANAM_H);
  addComment(output, 'anam.carteH', c);
  addSubSection(output, 'Vie sexuelle', data.anamnese.carteI, L.ANAM_I);
  addComment(output, 'anam.carteI', c);

  output.push('');
  output.push('⚠️ RÈGLE STRICTE POUR LA SECTION III (EXAMEN PSYCHIATRIQUE) :');
  output.push("Tu dois faire une distinction ABSOLUE entre la symptomatologie ACTUELLE (constatée le jour de l'examen) et les ANTÉCÉDENTS (éléments passés).");
  output.push("Ne mélange JAMAIS les deux temporalités.");
  output.push("Si un syndrome est noté 'Présent : Non' ou absent dans les données actuelles, tu dois conclure à l'absence de ce syndrome actuel, SANS utiliser les données des antécédents pour justifier des symptômes actuels atténués.");
  output.push("Rédige l'examen en deux temps clairs : d'abord l'évaluation transversale (l'état actuel au moment de l'examen), puis l'évaluation longitudinale (les antécédents psychiatriques listés dans la sous-section dédiée). Les antécédents doivent rester au passé.");
  output.push('');
  output.push("À la toute fin de la Section III, après avoir décrit de manière strictement séparée l'état clinique actuel d'une part, et les antécédents psychiatriques d'autre part, tu dois IMPÉRATIVEMENT rédiger un paragraphe de synthèse intitulé \"Analyse Clinique Évolutive\".");
  output.push("Dans ce paragraphe, tu dois :");
  output.push("- Établir un lien comparatif clair entre les antécédents décrits et l'état observé le jour de l'expertise (ex : s'agit-il d'une stabilisation, d'une rémission partielle ou totale, d'une aggravation, ou d'une chronicisation ?).");
  output.push("- Formuler une analyse clinique sur l'origine probable de cette évolution temporelle (ex : évolution naturelle de la pathologie, efficacité thérapeutique, iatrogénie, rupture de soins, impact d'un événement de vie intercurrent).");
  output.push("- Rédiger cette analyse sous forme de texte continu, fluide et argumenté (style médico-légal et littéraire). L'utilisation de listes à puces est strictement interdite pour ce paragraphe de synthèse.");
  output.push('');
  output.push('=== III. EXAMEN PSYCHIATRIQUE ===');
  addSubSection(output, 'Presentation et contact', data.examen_psychiatrique.carteA, L.EXAM_A);
  addComment(output, 'exam.carteA', c);

  const hasBiometricData =
    data.biometric_data.poids ||
    data.biometric_data.taille ||
    data.biometric_data.tensionArterielle ||
    data.biometric_data.frequenceCardiaque;

  if (hasBiometricData) {
    output.push('');
    output.push('=== III bis. CONSTANTES ET DONNEES BIOMETRIQUES ===');
    if (data.biometric_data.poids) {
      output.push(`- Poids : ${data.biometric_data.poids} kg`);
    }
    if (data.biometric_data.taille) {
      output.push(`- Taille : ${data.biometric_data.taille} cm`);
    }
    if (data.biometric_data.poids && data.biometric_data.taille) {
      const poids = parseFloat(data.biometric_data.poids);
      const taille = parseFloat(data.biometric_data.taille);
      if (!isNaN(poids) && !isNaN(taille) && taille > 0) {
        const tailleM = taille / 100;
        const imc = (poids / (tailleM * tailleM)).toFixed(1);
        output.push(`- IMC : ${imc} kg/m²`);
      }
    }
    if (data.biometric_data.tensionArterielle) {
      output.push(`- Tension arterielle : ${data.biometric_data.tensionArterielle} mmHg`);
    }
    if (data.biometric_data.frequenceCardiaque) {
      output.push(`- Frequence cardiaque : ${data.biometric_data.frequenceCardiaque} bpm`);
    }
    addComment(output, 'biometric', c);
  }
  addSubSection(output, 'Fonctions cognitives', data.examen_psychiatrique.carteB, L.EXAM_B);
  addComment(output, 'exam.carteB', c);
  addSubSection(output, 'Cognition sociale', data.examen_psychiatrique.carteC, L.EXAM_C);
  addComment(output, 'exam.carteC', c);
  addSubSection(output, 'Langage et discours', data.examen_psychiatrique.carteD, L.EXAM_D);
  addComment(output, 'exam.carteD', c);
  addSubSection(output, 'Syndrome depressif', data.examen_psychiatrique.carteE, L.EXAM_E);
  addComment(output, 'exam.carteE', c);
  addSubSection(output, 'Syndrome maniaque', data.examen_psychiatrique.carteF, L.EXAM_F);
  addComment(output, 'exam.carteF', c);
  addSubSection(output, 'Syndrome anxieux', data.examen_psychiatrique.carteG, L.EXAM_G);
  addComment(output, 'exam.carteG', c);
  addSubSection(output, 'TOC', data.examen_psychiatrique.carteH, L.EXAM_H);
  addComment(output, 'exam.carteH', c);
  addSubSection(output, 'Stress post-traumatique', data.examen_psychiatrique.carteI, L.EXAM_I);
  addComment(output, 'exam.carteI', c);
  addSubSection(output, 'Syndrome delirant', data.examen_psychiatrique.carteJ, L.EXAM_J);
  addComment(output, 'exam.carteJ', c);
  addSubSection(output, 'Syndrome hallucinatoire', data.examen_psychiatrique.carteK, L.EXAM_K);
  addComment(output, 'exam.carteK', c);
  addSubSection(output, 'Syndrome dissociatif', data.examen_psychiatrique.carteL, L.EXAM_L);
  addComment(output, 'exam.carteL', c);
  addSubSection(output, 'Syndrome catatonique', data.examen_psychiatrique.carteM, L.EXAM_M);
  addComment(output, 'exam.carteM', c);
  addSubSection(output, 'Symptomes negatifs', data.examen_psychiatrique.carteN, L.EXAM_N);
  addComment(output, 'exam.carteN', c);
  addSubSection(output, 'Syndrome confusionnel', data.examen_psychiatrique.carteO, L.EXAM_O);
  addComment(output, 'exam.carteO', c);
  addSubSection(output, 'Troubles lies a l\'usage de substances', data.examen_psychiatrique.carteOBis, L.EXAM_O_BIS);
  addComment(output, 'exam.carteOBis', c);
  addSubSection(output, 'Syndrome dementiel', data.examen_psychiatrique.carteP, L.EXAM_P);
  addComment(output, 'exam.carteP', c);
  addSubSection(output, 'TCA', data.examen_psychiatrique.carteQ, L.EXAM_Q);
  addComment(output, 'exam.carteQ', c);
  addSubSection(output, 'TDAH', data.examen_psychiatrique.carteR, L.EXAM_R);
  addComment(output, 'exam.carteR', c);
  addSubSection(output, 'Troubles du Spectre de l\'Autisme (TSA)', data.examen_psychiatrique.carteW, L.EXAM_W);
  addComment(output, 'exam.carteW', c);
  addSubSection(output, 'Troubles paraphiliques', data.examen_psychiatrique.carteS, L.EXAM_S);
  addComment(output, 'exam.carteS', c);
  addPersonalityDisorder(output, data.examen_psychiatrique.carteT);
  addComment(output, 'exam.carteT', c);
  addSubSection(output, 'Impulsivite et agressivite', data.examen_psychiatrique.carteU, L.EXAM_U);
  addComment(output, 'exam.carteU', c);
  addSubSection(output, 'Authenticite des troubles / Simulation', data.examen_psychiatrique.carteV, L.EXAM_V);
  addComment(output, 'exam.carteV', c);
  addSubSection(output, 'Troubles a symptomatologie somatique, psychogenes et pathomimies', data.examen_psychiatrique.carteX, L.EXAM_X);
  addComment(output, 'exam.carteX', c);

  addAntecedentsSymptomatologiques(output, data.examen_psychiatrique);
  addEvocationDiagnostique(output, data.examen_psychiatrique);

  if (isExpertise) {
    output.push('');
    output.push('=== IV. EXAMEN AU MOMENT DES FAITS ===');
    addSubSection(output, 'Comprehension des faits', data.examen_faits.comprehension, L.FAITS_COMPREHENSION);
    addComment(output, 'faits.comprehension', c);
    addSubSection(output, 'Reconnaissance', data.examen_faits.reconnaissance, L.FAITS_RECONNAISSANCE);
    addComment(output, 'faits.reconnaissance', c);
    addSubSection(output, 'Etat mental', data.examen_faits.etatMental, L.FAITS_ETAT_MENTAL);
    addComment(output, 'faits.etatMental', c);
    addSubSection(output, 'Conscience', data.examen_faits.conscienceLucidite, L.FAITS_CONSCIENCE);
    addComment(output, 'faits.conscience', c);
    addSubSection(output, 'Amnesie', data.examen_faits.amnesieFaits, L.FAITS_AMNESIE);
    addComment(output, 'faits.amnesie', c);
    addSubSection(output, 'Premeditation', data.examen_faits.premeditation, L.FAITS_PREMEDITATION);
    addComment(output, 'faits.premeditation', c);

    output.push('');
    output.push('=== V. RELATION FAITS / ETAT MENTAL ===');
    addSubSection(output, 'Explications psychiatriques', data.relation_faits.explications, L.REL_EXPLICATIONS);
    addComment(output, 'rel.explications', c);
    addSubSection(output, 'Lien de causalite', data.relation_faits.causalite, L.REL_CAUSALITE);
    addComment(output, 'rel.causalite', c);
  }

  const instructionsDiag = buildInstructionsDiagnostiques(data.examen_psychiatrique);
  if (instructionsDiag.length > 0) {
    output.push('');
    output.push('⚠️ INSTRUCTIONS DIAGNOSTIQUES OBLIGATOIRES POUR LA RÉDACTION :');
    output.push(...instructionsDiag);
  }

  const sectionNumber = isExpertise ? 'VI' : 'IV';
  output.push('');
  output.push(`=== ${sectionNumber}. DIAGNOSTIC ===`);
  addSubSection(output, 'Diagnostic principal', data.diagnostic.principal, L.DIAG_PRINCIPAL);
  addComment(output, 'diag.principal', c);
  if (data.diagnostic.diagnosticsAssocies?.trim()) {
    output.push(`\n  Diagnostics associes :`);
    output.push(`- ${data.diagnostic.diagnosticsAssocies}`);
  }
  if (data.diagnostic.comorbidites?.trim()) {
    output.push(`\n  Comorbidites :`);
    output.push(`- ${data.diagnostic.comorbidites}`);
  }
  if (data.diagnostic.elementsDeterminants?.trim()) {
    output.push(`\n  Elements determinants :`);
    output.push(`- ${data.diagnostic.elementsDeterminants}`);
  }
  addComment(output, 'diag.complementaires', c);

  if (isExpertise) {
    output.push('');
    output.push('=== VII. EVALUATION MEDICO-LEGALE ===');
    const { alinea1, alinea2, accessibilite } = data.evaluation;
    if (alinea1.aboli !== 'NR') {
      output.push(`- Art. 122-1 al.1 (Abolition du discernement) : ${alinea1.aboli}`);
    }
    if (alinea1.justification.trim()) {
      output.push(`- Justification al.1 : ${alinea1.justification}`);
    }
    addComment(output, 'eval.alinea1', c);
    if (alinea2.altere !== 'NR') {
      output.push(`- Art. 122-1 al.2 (Alteration du discernement) : ${alinea2.altere}`);
    }
    if (alinea2.justification.trim()) {
      output.push(`- Justification al.2 : ${alinea2.justification}`);
    }
    addComment(output, 'eval.alinea2', c);
    if (accessibilite.accessible !== 'NR') {
      output.push(`- Accessibilite a la sanction penale : ${accessibilite.accessible}`);
    }
    if (accessibilite.justification.trim()) {
      output.push(`- Justification accessibilite : ${accessibilite.justification}`);
    }
    if (accessibilite.compatibleGardeAVue !== 'NR') {
      output.push(`- Compatible avec garde a vue / incarceration : ${accessibilite.compatibleGardeAVue}`);
    }
    if (accessibilite.apteComparaitre !== 'NR') {
      output.push(`- Apte a comparaitre et se defendre : ${accessibilite.apteComparaitre}`);
    }
    addComment(output, 'eval.accessibilite', c);

    output.push('');
    output.push('=== VIII. DANGEROSITE ===');
    addEchellesActuarielles(output, data.dangerosite);
    addSubSection(output, 'Dangerosite psychiatrique', data.dangerosite.dangerositePsychiatrique, L.DANG_PSYCHIATRIQUE);
    addSubSection(output, 'Risque de recidive', data.dangerosite.risqueRecidive, L.DANG_RECIDIVE);
    addComment(output, 'dang.carte1', c);
    addSubSection(output, 'Facteurs de risque', data.dangerosite.facteursRisque, L.DANG_FACTEURS_RISQUE);
    addSubSection(output, 'Facteurs de protection', data.dangerosite.facteursProtection, L.DANG_FACTEURS_PROTECTION);
    addComment(output, 'dang.carte2', c);
    addSubSection(output, 'Necessite de soins', data.dangerosite.necessiteSoins, L.DANG_NECESSITE_SOINS);
    addSubSection(output, 'Injonction de soins', data.dangerosite.injonctionSoinsDetails, L.DANG_INJONCTION);
    addSubSection(output, 'Modalites', data.dangerosite.modalitesInjonction, L.DANG_MODALITES);
    addSubSection(output, 'Pronostic', data.dangerosite.pronostic, L.DANG_PRONOSTIC);
    addComment(output, 'dang.carte3', c);
  }

  const echellesCliniques = data.echelles_psychometriques ?? [];
  if (echellesCliniques.length > 0) {
    const scoredEchelles = echellesCliniques.filter(
      (e) => e.scaleType && Object.keys(e.scores).length > 0
    );
    if (scoredEchelles.length > 0) {
      output.push('');
      output.push("=== ÉCHELLES D'ÉVALUATION CLINIQUE ===");
      for (const entry of scoredEchelles) {
        const scale = SCALES[entry.scaleType];
        if (!scale) continue;
        const isPANSS = entry.scaleType === 'PANSS';
        const isMoCA = entry.scaleType === 'MoCA';
        const panssScores = isPANSS ? computePANSSSubscores(entry.scores) : null;
        let rawTotal: number;
        if (isPANSS) {
          rawTotal = panssScores!.total;
        } else if (isMoCA) {
          rawTotal = computeMoCAScore(entry.scores);
        } else {
          rawTotal = Object.values(entry.scores).reduce((sum, v) => sum + (v || 0), 0);
        }
        const isASRS = scale.scoringMode === 'count-positive';
        const displayScore = isASRS ? computeASRSPositiveCount(entry.scores) : rawTotal;
        const interp = getClinicalInterpretation(entry.scaleType, displayScore);

        output.push(`\n  ${scale.fullName} :`);

        if (isPANSS) {
          const panssLabels: Record<number, string> = { 2: 'Minime', 3: 'Léger', 4: 'Modéré', 5: 'Modérément Sévère', 6: 'Sévère', 7: 'Extrême' };
          const presentItems = scale.items.filter((item) => (entry.scores[item.id] ?? 1) > 1);
          if (presentItems.length > 0) {
            output.push('- Symptômes cliniquement présents (score > 1) :');
            for (const item of presentItems) {
              const v = entry.scores[item.id];
              output.push(`  - ${item.label} - ${panssLabels[v] ?? v} (${v})`);
            }
          }
          output.push(`- Score Positif (P) : ${panssScores!.p}/49`);
          output.push(`- Score Négatif (N) : ${panssScores!.n}/49`);
          output.push(`- Score Général (G) : ${panssScores!.g}/112`);
          output.push(`- Score Total PANSS : ${panssScores!.total}/210`);
        } else if (entry.scaleType === 'M-FAST') {
          const positiveItems = scale.items.filter((item) => entry.scores[item.id] === 1);
          if (positiveItems.length > 0) {
            output.push('- Symptômes atypiques / discordants repérés :');
            for (const item of positiveItems) {
              output.push(`  - ${item.label}`);
            }
          }
        } else if (entry.scaleType === 'MMSE') {
          const errorItems = scale.items.filter((item) => entry.scores[item.id] === 0);
          if (errorItems.length > 0) {
            output.push('- Items échoués :');
            for (const item of errorItems) {
              output.push(`  - ${item.label} : Erreur (Score: 0)`);
            }
          }
        } else if (entry.scaleType === 'PCL-5') {
          const significantItems = scale.items.filter((item) => (entry.scores[item.id] ?? -1) >= 2);
          if (significantItems.length > 0) {
            const pcl5Labels: Record<number, string> = { 2: 'Moyennement', 3: 'Beaucoup', 4: 'Extrêmement' };
            output.push('- Symptômes cliniquement significatifs (score >= 2) :');
            for (const item of significantItems) {
              const v = entry.scores[item.id];
              output.push(`  - ${item.label} : ${pcl5Labels[v] ?? v} (Score: ${v})`);
            }
          }
        } else if (isASRS) {
          const positiveItems = scale.items.filter((item) => isASRSItemPositive(item, entry.scores[item.id]));
          const asrsLabels: Record<number, string> = { 0: 'Jamais', 1: 'Rarement', 2: 'Parfois', 3: 'Souvent', 4: 'Très souvent' };
          if (positiveItems.length > 0) {
            output.push('- Items positifs retenus :');
            for (const item of positiveItems) {
              const v = entry.scores[item.id];
              output.push(`  - ${item.label} : ${asrsLabels[v] ?? v} (Critère Positif retenu)`);
            }
          }
        } else if (entry.scaleType === 'DAST-10') {
          const scoredItems = scale.items.filter((item) => entry.scores[item.id] === 1);
          if (scoredItems.length > 0) {
            output.push('- Items positifs (1 point) :');
            for (const item of scoredItems) {
              const isInverted = item.id === 'dast4' || item.id === 'dast5';
              const response = isInverted ? 'Non' : 'Oui';
              output.push(`  - ${item.label} : ${response} (Score: 1)`);
            }
          }
        } else if (isMoCA) {
          const deficientItems = scale.items.filter((item) => {
            if (item.id === 'moca_edu') return false;
            const val = entry.scores[item.id];
            if (val === undefined) return false;
            const max = item.maxPoints ?? 1;
            return val < max;
          });
          if (deficientItems.length > 0) {
            output.push('- Items déficitaires :');
            for (const item of deficientItems) {
              const v = entry.scores[item.id];
              const max = item.maxPoints ?? 1;
              const selectedOpt = item.options.find(o => o.value === v);
              output.push(`  - ${item.label} : ${selectedOpt?.label ?? v} (Score: ${v}/${max})`);
            }
          }
          if (entry.scores['moca_edu'] === 1) {
            output.push('- Correction scolarité <= 12 ans : +1 point appliqué');
          }
        } else if (entry.scaleType === 'YMRS') {
          const presentItems = scale.items.filter((item) => (entry.scores[item.id] ?? 0) > 0);
          if (presentItems.length > 0) {
            output.push('- Symptômes maniaques avérés (score > 0) :');
            for (const item of presentItems) {
              const v = entry.scores[item.id];
              const selectedOpt = item.options.find(o => o.value === v);
              output.push(`  - ${item.label} : ${selectedOpt?.label ?? v} (Score: ${v})`);
            }
          }
        } else if (entry.scaleType === 'CAM') {
          const c1 = (entry.scores['cam1'] ?? 0) >= 1;
          const c2 = (entry.scores['cam2'] ?? 0) >= 1;
          const c3 = (entry.scores['cam3'] ?? 0) >= 1;
          const c4 = (entry.scores['cam4'] ?? 0) >= 1;
          const camPositive = c1 && c2 && (c3 || c4);
          output.push(`- Critère 1 (Début aigu / Fluctuation) : ${c1 ? 'Présent' : 'Absent'}`);
          output.push(`- Critère 2 (Inattention) : ${c2 ? 'Présent (score : ' + entry.scores['cam2'] + ')' : 'Absent'}`);
          output.push(`- Critère 3 (Pensée désorganisée) : ${c3 ? 'Présent' : 'Absent'}`);
          output.push(`- Critère 4 (Conscience altérée) : ${c4 ? 'Présent' : 'Absent'}`);
          output.push(`- RÉSULTAT DIAGNOSTIQUE CAM : ${camPositive ? 'DELIRIUM CONFIRMÉ (critères 1+2 présents ET critère 3 ou 4 présent)' : 'Délirium non retenu selon la CAM'}`);
        } else if (entry.scaleType === 'MDAS') {
          const presentItems = scale.items.filter((item) => (entry.scores[item.id] ?? 0) > 0);
          if (presentItems.length > 0) {
            output.push('- Symptômes confusionnels présents (score > 0) :');
            for (const item of presentItems) {
              const v = entry.scores[item.id];
              const selectedOpt = item.options.find(o => o.value === v);
              output.push(`  - ${item.label} : ${selectedOpt?.label ?? v} (Score: ${v})`);
            }
          }
          const mdasNiveau = rawTotal < 7 ? 'Absent/subclinique' : rawTotal <= 12 ? 'Léger (sous seuil)' : rawTotal <= 20 ? 'Modéré' : 'Sévère';
          output.push(`- Sévérité MDAS : ${mdasNiveau} (seuil diagnostique : ≥ 13)`);
        } else {
          for (const item of scale.items) {
            const s = entry.scores[item.id];
            if (s !== undefined) {
              output.push(`  - ${item.label} : ${s}`);
            }
          }
        }

        output.push(`- Score total : ${displayScore}/${scale.maxScore}`);
        if (interp) {
          output.push(`- Interprétation : ${interp.description}`);
        }
        if (entry.syntheseClinique?.trim()) {
          output.push(`- Commentaire clinique : ${entry.syntheseClinique}`);
        }
      }
    }
  }

  if (isExpertise) {
    output.push('');
    output.push('=== IX. CONCLUSIONS ===');
    if (data.conclusions.syntheseClinique?.trim()) {
      output.push(`\n  Synthese clinique :`);
      output.push(`- ${data.conclusions.syntheseClinique}`);
    }
    if (data.conclusions.reponsesQuestionsOrdonnance?.trim()) {
      output.push(`\n  Reponses aux questions de l'ordonnance :`);
      output.push(`- ${data.conclusions.reponsesQuestionsOrdonnance}`);
    }
    addComment(output, 'concl.carte1', c);
    if (data.conclusions.observationsFinales?.trim()) {
      output.push(`\n  Observations finales :`);
      output.push(`- ${data.conclusions.observationsFinales}`);
    }
    addComment(output, 'concl.carte2', c);
  } else {
    output.push('');
    output.push('=== V. PROPOSITIONS DE SOINS ===');
    if (data.propositions_soins.propositionsTherapeutiques?.trim()) {
      output.push(`\n  Propositions therapeutiques :`);
      output.push(`- ${data.propositions_soins.propositionsTherapeutiques}`);
    }
    if (data.propositions_soins.orientationSoins?.trim()) {
      output.push(`\n  Orientation de soins :`);
      output.push(`- ${data.propositions_soins.orientationSoins}`);
    }
    if (data.propositions_soins.demarchesMedicoSociales?.trim()) {
      output.push(`\n  Demarches medico-sociales :`);
      output.push(`- ${data.propositions_soins.demarchesMedicoSociales}`);
    }
    addComment(output, 'soins.therapeutiques', c);
    addComment(output, 'soins.orientation', c);
    addComment(output, 'soins.medico_social', c);
  }

  return output.join('\n');
}

export function generateSummaryPrompt(data: FormData): string {
  const isExpertise = data.documentMode === 'expertise';
  const authorName = data.identification.carteA.authorName || 'Docteur Jean-Georges Rohmer';
  const titresExpert = data.identification.carteA.titresExpert || 'Psychiatre au CRAVS Alsace';

  const preamble = isExpertise
    ? `Tu agis en tant que ${authorName}, ${titresExpert}. Tu viens de générer un rapport d'expertise psychiatrique complet. Ta mission maintenant est de produire un RÉSUMÉ SYNTHÉTIQUE du rapport que tu as rédigé.`
    : `Tu agis en tant que ${authorName}, ${titresExpert}. Tu viens de générer un compte-rendu de bilan psychiatrique clinique complet. Ta mission maintenant est de produire un RÉSUMÉ SYNTHÉTIQUE du compte-rendu que tu as rédigé.`;

  const instructions = isExpertise
    ? `### STYLE : SYNTHÈSE PERCUTANTE AVEC ÉMOJIS ET PUCES

**Rédige un résumé synthétique (2-3 pages max). Style télégraphique, structuré par émojis et puces. Destiné aux magistrats et avocats : aller directement au but, sans fioritures littéraires. Les données doivent découler fidèlement des données brutes d'observation.**

⚠️ RÈGLE ABSOLUE DE FORMATAGE — EMPLACEMENT DES ÉMOJIS :
Tous les émojis doivent TOUJOURS être placés en PREMIÈRE POSITION ABSOLUE de leur ligne, suivis d'un espace, puis du texte ou du formatage Markdown.
✅ CORRECT : 📋 **IDENTIFICATION** / 🟢 Favorable / 💊 Rispéridone 2mg/j
❌ INTERDIT : placer un émoji après une puce (• 🟢 Favorable est interdit) ou en milieu/fin de ligne.

---

📋 **IDENTIFICATION**
🔹 Âge : [X ans]
🔹 Initiales : [Initiales uniquement — jamais le nom complet]
🔹 Faits reprochés : [résumé en 1 ligne]

---

🔍 **SYNTHÈSE ANAMNESTIQUE**
🔹 Antécédents psychiatriques : [liste concise]
🔹 Antécédents addictifs : [liste concise]
🔹 Parcours marquant : [éléments clés]

---

🧠 **TABLEAU CLINIQUE ACTUEL**
🔹 Présentation/contact : [description concise]
🔹 Syndromes identifiés : [liste avec intensité]
🔹 Fonctions cognitives : [éléments clés]
🔹 Insight : [niveau]

---

📈 **DYNAMIQUE ÉVOLUTIVE**
🔹 Évolution : [stabilisation / amélioration / dégradation / chronicisation]
🔹 Hypothèse explicative : [évolution naturelle / efficacité thérapeutique / iatrogénie / rupture de soins / événement intercurrent]

---

⚕️ **DIAGNOSTIC**
🔹 Principal : [diagnostic DSM/CIM]
🔹 Comorbidités : [liste si pertinent]

---

⚖️ **ÉTAT MENTAL AU MOMENT DES FAITS**
🔹 Discernement : [capacité au moment des faits]
🔹 Lien pathologie/acte : [explication concise]
🔹 Reconnaissance : [attitude face aux faits]

🔹 **RESPONSABILITÉ PÉNALE (Art. 122-1 CP)**
✅ Abolition discernement (al.1) : OUI / ❌ NON → [justification 1 ligne]
✅ Altération discernement (al.2) : OUI / ❌ NON → [justification 1 ligne]
✅ Accessibilité sanction : OUI / ❌ NON → [précisions]

---

🚨 **DANGEROSITÉ & RÉCIDIVE**
🟢 Niveau dangerosité : FAIBLE / 🟡 MODÉRÉ / 🔴 ÉLEVÉ
🟢 Risque récidive : FAIBLE / 🟡 MODÉRÉ / 🔴 ÉLEVÉ
🔹 Facteurs risque : [2-3 items max]
🔹 Facteurs protection : [2-3 items max]

---

💊 **SOINS & PRONOSTIC**
🔹 Nécessité soins : OUI / NON
🔹 Injonction/Obligation soins : OUI / NON
🔹 Prise en charge : [type en 1 ligne]
🟢 Pronostic : FAVORABLE / 🟡 RÉSERVÉ / 🔴 DÉFAVORABLE`
    : `### STYLE : SYNTHÈSE PERCUTANTE AVEC ÉMOJIS ET PUCES

**Rédige un résumé synthétique (1-2 pages max). Style télégraphique, structuré par émojis et puces. Destiné aux professionnels de santé : aller directement au but, sans fioritures littéraires. Les données doivent découler fidèlement des données brutes d'observation.**

⚠️ RÈGLE ABSOLUE DE FORMATAGE — EMPLACEMENT DES ÉMOJIS :
Tous les émojis doivent TOUJOURS être placés en PREMIÈRE POSITION ABSOLUE de leur ligne, suivis d'un espace, puis du texte ou du formatage Markdown.
✅ CORRECT : 📋 **IDENTIFICATION** / 🟢 Favorable / 💊 Rispéridone 2mg/j
❌ INTERDIT : placer un émoji après une puce (• 🟢 Favorable est interdit) ou en milieu/fin de ligne.

---

📋 **IDENTIFICATION**
🔹 Âge : [X ans]
🔹 Motif consultation : [résumé en 1 ligne]
🔹 Médecin adresseur : [nom]

---

🔍 **SYNTHÈSE ANAMNESTIQUE**
🔹 Antécédents psychiatriques : [liste concise]
🔹 Antécédents addictifs : [liste concise]
🔹 Parcours marquant : [éléments clés]

---

🧠 **TABLEAU CLINIQUE ACTUEL**
🔹 Présentation/contact : [description concise]
🔹 Syndromes identifiés : [liste avec intensité]
🔹 Fonctions cognitives : [éléments clés]
🔹 Insight : [niveau]

---

📈 **DYNAMIQUE ÉVOLUTIVE**
🔹 Évolution : [stabilisation / amélioration / dégradation / chronicisation]
🔹 Hypothèse explicative : [efficacité thérapeutique / rupture de soins / événement intercurrent / évolution naturelle]

---

⚕️ **DIAGNOSTIC**
🔹 Principal : [diagnostic DSM/CIM]
🔹 Comorbidités : [liste si pertinent]

---

💊 **TRAITEMENT MÉDICAMENTEUX**
💊 [Molécule 1, classe, posologie]
💊 [Molécule 2, classe, posologie]

🧠 **PSYCHOTHÉRAPIE & ACCOMPAGNEMENT**
🔹 [Type de psychothérapie et autres interventions]

🏥 **ORIENTATION DE SOINS**
🔹 Cadre : [CMP ambulatoire / Hospitalisation / Structure spécialisée]
🔹 Fréquence : [rythme préconisé]

---

📋 **DÉMARCHES MÉDICO-SOCIALES**
🔹 [MDPH, ALD, arrêt travail, accompagnement social, etc.]

---

📊 **PRONOSTIC**
🟢 FAVORABLE / 🟡 RÉSERVÉ / 🔴 DÉFAVORABLE
🔹 Justification : [1 ligne]`;

  return `${preamble}

${instructions}

---

**RAPPEL : Ce résumé doit être autonome et compréhensible sans consultation du rapport complet. Il doit capturer l'essentiel de l'évaluation clinique et des conclusions ${isExpertise ? 'médico-légales' : 'thérapeutiques'}, en reflétant fidèlement les données d'observation fournies.**`;
}

