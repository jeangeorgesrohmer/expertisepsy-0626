export type PersonalityDisorder =
  | 'Paranoïaque'
  | 'Schizoïde'
  | 'Schizotypique'
  | 'Antisociale'
  | 'Borderline'
  | 'Histrionique'
  | 'Narcissique'
  | 'Évitante'
  | 'Dépendante'
  | 'Obsessionnelle-compulsive';

export type Cluster = 'A' | 'B' | 'C';

export interface PersonalityDisorderDefinition {
  name: PersonalityDisorder;
  cluster: Cluster;
  criteria: string[];
}

export const PERSONALITY_DISORDERS: PersonalityDisorderDefinition[] = [
  {
    name: 'Paranoïaque',
    cluster: 'A',
    criteria: [
      'Méfiance soupçonneuse envahissante envers les autres',
      'Doute de la loyauté ou de la fidélité des autres',
      'Réticence à se confier par crainte que l\'information soit utilisée contre soi',
      'Interprète des significations cachées menaçantes dans des événements anodins',
      'Garde rancune de façon persistante',
      'Perçoit des attaques contre sa personne ou sa réputation',
      'Doute de la fidélité du conjoint ou partenaire sexuel',
    ],
  },
  {
    name: 'Schizoïde',
    cluster: 'A',
    criteria: [
      'Ne recherche ni n\'apprécie les relations proches',
      'Choisit presque toujours des activités solitaires',
      'Peu ou pas d\'intérêt pour les expériences sexuelles avec autrui',
      'Prend plaisir dans peu ou aucune activité',
      'Absence de relations amicales proches en dehors de la famille immédiate',
      'Indifférent aux éloges ou à la critique d\'autrui',
      'Froideur, détachement ou émoussement de l\'affectivité',
    ],
  },
  {
    name: 'Schizotypique',
    cluster: 'A',
    criteria: [
      'Idées de référence',
      'Croyances bizarres ou pensée magique influençant le comportement',
      'Perceptions inhabituelles incluant des illusions corporelles',
      'Pensée et langage bizarres (vagues, circonstanciés, métaphoriques)',
      'Idéation méfiante ou persécutoire',
      'Inadéquation ou pauvreté des affects',
      'Comportement ou apparence bizarre, excentrique ou singulier',
      'Absence d\'amis proches ou de confidents en dehors de la famille immédiate',
      'Anxiété sociale excessive qui ne diminue pas avec la familiarisation',
    ],
  },
  {
    name: 'Antisociale',
    cluster: 'B',
    criteria: [
      'Incapacité à se conformer aux normes sociales et aux lois',
      'Tendance à tromper par profit ou par plaisir (mensonges répétés, escroqueries)',
      'Impulsivité ou incapacité à planifier à l\'avance',
      'Irritabilité et agressivité (bagarres ou agressions répétées)',
      'Mépris irresponsable de sa sécurité ou de celle d\'autrui',
      'Irresponsabilité persistante (incapacité à honorer des obligations)',
      'Absence de remords (indifférence ou rationalisation après avoir blessé autrui)',
    ],
  },
  {
    name: 'Borderline',
    cluster: 'B',
    criteria: [
      'Efforts effrénés pour éviter les abandons réels ou imaginés',
      'Relations interpersonnelles instables et intenses (alternance idéalisation/dévalorisation)',
      'Perturbation de l\'identité (image ou sentiment de soi instable)',
      'Impulsivité dans au moins deux domaines dommageables (dépenses, sexualité, toxicomanie, conduite, crises de boulimie)',
      'Répétition de comportements, gestes ou menaces suicidaires, ou d\'automutilations',
      'Instabilité affective due à une réactivité marquée de l\'humeur',
      'Sentiments chroniques de vide',
      'Colères intenses et inappropriées ou difficulté à contrôler sa colère',
      'Idéation persécutoire transitoire ou symptômes dissociatifs sévères liés au stress',
    ],
  },
  {
    name: 'Histrionique',
    cluster: 'B',
    criteria: [
      'Mal à l\'aise dans les situations où il/elle n\'est pas au centre de l\'attention',
      'Interactions avec autrui marquées par un comportement de séduction sexuelle inappropriée',
      'Manifestation d\'émotions rapidement changeantes et superficielles',
      'Utilise régulièrement l\'apparence physique pour attirer l\'attention',
      'Manière de parler trop subjective et pauvre en détails',
      'Dramatisation, théâtralisme et expression exagérée des émotions',
      'Suggestibilité (facilement influencé par autrui ou les circonstances)',
      'Considère les relations comme plus intimes qu\'elles ne le sont',
    ],
  },
  {
    name: 'Narcissique',
    cluster: 'B',
    criteria: [
      'Sentiment grandiose de sa propre importance',
      'Préoccupation par des fantaisies de succès illimité, pouvoir, beauté ou amour idéal',
      'Pense être "spécial" et ne devoir être compris que par des institutions ou personnes d\'un haut niveau',
      'Besoin excessif d\'être admiré',
      'Sentiment que tout lui est dû',
      'Exploitation interpersonnelle (utilise autrui pour ses propres fins)',
      'Manque d\'empathie : réticent à reconnaître ou identifier les sentiments d\'autrui',
      'Envie souvent les autres ou pense que les autres l\'envient',
      'Comportements ou attitudes arrogants et hautains',
    ],
  },
  {
    name: 'Évitante',
    cluster: 'C',
    criteria: [
      'Évite les activités sociales ou professionnelles impliquant des contacts par crainte d\'être critiqué ou rejeté',
      'Réticence à s\'impliquer avec autrui à moins d\'être certain d\'être aimé',
      'Est réservé dans les relations intimes par crainte d\'être ridiculisé',
      'Craint d\'être critiqué ou rejeté dans les situations sociales',
      'Est inhibé dans les situations interpersonnelles nouvelles à cause d\'un sentiment de ne pas être à la hauteur',
      'Se perçoit comme socialement incompétent, sans attrait ou inférieur',
      'Réticence inhabituelle à prendre des risques personnels ou à s\'engager dans de nouvelles activités par crainte d\'éprouver de l\'embarras',
    ],
  },
  {
    name: 'Dépendante',
    cluster: 'C',
    criteria: [
      'Difficultés à prendre des décisions quotidiennes sans être rassuré ou conseillé de manière excessive',
      'Besoin que d\'autres assument les responsabilités dans la plupart des domaines importants de sa vie',
      'Difficulté à exprimer un désaccord par crainte de perdre le soutien ou l\'approbation',
      'Difficulté à initier des projets ou faire des choses seul par manque de confiance en son jugement',
      'Va trop loin dans ses efforts pour obtenir le soutien d\'autrui (jusqu\'à se porter volontaire pour des tâches désagréables)',
      'Se sent mal à l\'aise ou impuissant quand seul par crainte d\'être incapable de se débrouiller',
      'Recherche de manière urgente une nouvelle relation comme source de soutien quand une relation proche se termine',
      'Préoccupation irréaliste par la crainte d\'être laissé à se débrouiller seul',
    ],
  },
  {
    name: 'Obsessionnelle-compulsive',
    cluster: 'C',
    criteria: [
      'Préoccupation par les détails, règles, listes, ordre, organisation ou horaires au point que le but principal de l\'activité est perdu',
      'Perfectionnisme qui entrave l\'achèvement des tâches',
      'Dévotion excessive pour le travail et la productivité à l\'exclusion des loisirs et amitiés',
      'Conscience excessive, scrupuleux, rigidité concernant la morale, l\'éthique ou les valeurs',
      'Incapacité à jeter des objets usés ou sans valeur',
      'Réticence à déléguer ou travailler avec autrui à moins que les autres ne se soumettent à sa façon de faire',
      'Avarice envers soi-même et autrui (argent perçu comme devant être thésaurisé)',
      'Rigidité et entêtement',
    ],
  },
];

export const CLUSTERS: Record<Cluster, { name: string; disorders: PersonalityDisorder[] }> = {
  A: {
    name: 'Cluster A (Excentrique/Bizarre)',
    disorders: ['Paranoïaque', 'Schizoïde', 'Schizotypique'],
  },
  B: {
    name: 'Cluster B (Dramatique/Émotionnel/Erratique)',
    disorders: ['Antisociale', 'Borderline', 'Histrionique', 'Narcissique'],
  },
  C: {
    name: 'Cluster C (Anxieux/Craintif)',
    disorders: ['Évitante', 'Dépendante', 'Obsessionnelle-compulsive'],
  },
};

export const PERVERSE_FUNCTIONING_CRITERIA = [
  'Instrumentalisation et chosification de l\'autre',
  'Jouissance dans l\'emprise, la manipulation ou la transgression',
  'Déni de l\'altérité et de la souffrance d\'autrui',
  'Inversion de la culpabilité (rejet systématique de la faute sur l\'autre)',
  'Absence de conflit intrapsychique lors des passages à l\'acte',
];

export function getDisorderByName(name: PersonalityDisorder): PersonalityDisorderDefinition | undefined {
  return PERSONALITY_DISORDERS.find((d) => d.name === name);
}
