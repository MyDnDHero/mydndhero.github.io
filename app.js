/* Compagnon v1.1.0. Code original MIT ; données SRD 5.1 sous CC BY 4.0 ; résumés originaux. Voir ATTRIBUTIONS.md. */
(()=>{
"use strict";

// Module : data
/** Constantes de règles D&D 5e (2014) : caractéristiques, compétences, classes de base, tables.
 * Données mécaniques et résumés originaux. Voir ATTRIBUTIONS.md pour les sources et licences.
 */
const APP_VERSION = "1.1.0";
const SCHEMA_VERSION = 2;
const ABILITIES = {
  str: { name: "Force", short: "FOR", help: "Attaques de mêlée, Athlétisme, charge portée." },
  dex: { name: "Dextérité", short: "DEX", help: "Initiative, CA, discrétion, armes à distance et de finesse." },
  con: { name: "Constitution", short: "CON", help: "Points de vie à chaque niveau, concentration." },
  int: { name: "Intelligence", short: "INT", help: "Savoirs, Investigation, magie du magicien." },
  wis: { name: "Sagesse", short: "SAG", help: "Perception, Perspicacité, magie du clerc, du druide et du rôdeur." },
  cha: { name: "Charisme", short: "CHA", help: "Relations, magie du barde, du paladin, de l’ensorceleur et de l’occultiste." },
};
const SKILLS = {
  acrobatics: ["Acrobaties", "dex"],
  arcana: ["Arcanes", "int"],
  athletics: ["Athlétisme", "str"],
  stealth: ["Discrétion", "dex"],
  animal: ["Dressage", "wis"],
  sleight: ["Escamotage", "dex"],
  history: ["Histoire", "int"],
  intimidation: ["Intimidation", "cha"],
  investigation: ["Investigation", "int"],
  medicine: ["Médecine", "wis"],
  nature: ["Nature", "int"],
  perception: ["Perception", "wis"],
  insight: ["Perspicacité", "wis"],
  persuasion: ["Persuasion", "cha"],
  religion: ["Religion", "int"],
  performance: ["Représentation", "cha"],
  survival: ["Survie", "wis"],
  deception: ["Tromperie", "cha"],
};
const ALL_SKILLS = Object.keys(SKILLS);
const ALIGNMENTS = [
  "Loyal bon",
  "Neutre bon",
  "Chaotique bon",
  "Loyal neutre",
  "Neutre",
  "Chaotique neutre",
  "Loyal mauvais",
  "Neutre mauvais",
  "Chaotique mauvais",
];
const DRAGONS = {
  black: ["Noir", "acide", "ligne de 1,50 × 9 m", "DEX"],
  blue: ["Bleu", "foudre", "ligne de 1,50 × 9 m", "DEX"],
  brass: ["Airain", "feu", "ligne de 1,50 × 9 m", "DEX"],
  bronze: ["Bronze", "foudre", "ligne de 1,50 × 9 m", "DEX"],
  copper: ["Cuivre", "acide", "ligne de 1,50 × 9 m", "DEX"],
  gold: ["Or", "feu", "cône de 4,50 m", "DEX"],
  green: ["Vert", "poison", "cône de 4,50 m", "CON"],
  red: ["Rouge", "feu", "cône de 4,50 m", "DEX"],
  silver: ["Argent", "froid", "cône de 4,50 m", "CON"],
  white: ["Blanc", "froid", "cône de 4,50 m", "CON"],
};
const CLASSES = {
  barbarian: {
    name: "Barbare",
    icon: "axe",
    role: "Mêlée, endurance",
    die: 12,
    primary: ["str", "con", "dex"],
    saves: ["str", "con"],
    skills: ["animal", "athletics", "intimidation", "nature", "perception", "survival"],
    pick: 2,
    armors: ["light", "medium", "shield"],
    weapons: ["simple", "martial"],
    subLevel: 3,
    subLabel: "Voie primitive",
    caster: "none",
    desc: "Tu encaisses les coups et entres en rage pour frapper plus fort. Une classe frontale, simple à jouer, avec peu de ressources à suivre.",
  },
  bard: {
    name: "Barde",
    icon: "music",
    role: "Soutien, magie, polyvalence",
    die: 8,
    primary: ["cha", "dex", "con"],
    saves: ["dex", "cha"],
    skills: ALL_SKILLS,
    pick: 3,
    armors: ["light"],
    weapons: ["simple", "hand-crossbow", "longsword", "rapier", "shortsword"],
    subLevel: 3,
    subLabel: "Collège bardique",
    caster: "full",
    ability: "cha",
    spellMode: "known",
    desc: "Tu inspires tes alliés, touches à toutes les compétences et lances des sorts avec le Charisme. Tes sorts connus sont un choix durable.",
  },
  cleric: {
    name: "Clerc",
    icon: "sun",
    role: "Protection, soins, magie divine",
    die: 8,
    primary: ["wis", "con", "str"],
    saves: ["wis", "cha"],
    skills: ["history", "insight", "medicine", "persuasion", "religion"],
    pick: 2,
    armors: ["light", "medium", "shield"],
    weapons: ["simple"],
    subLevel: 1,
    subLabel: "Domaine divin",
    caster: "full",
    ability: "wis",
    spellMode: "prepared",
    desc: "Tu prépares chaque jour tes sorts parmi toute la liste du clerc. Ton domaine, choisi dès le niveau 1, oriente ton style : soin, combat, savoir, tempête...",
  },
  druid: {
    name: "Druide",
    icon: "leaf",
    role: "Nature, contrôle, métamorphose",
    die: 8,
    primary: ["wis", "con", "dex"],
    saves: ["int", "wis"],
    skills: ["arcana", "animal", "insight", "medicine", "nature", "perception", "religion", "survival"],
    pick: 2,
    armors: ["light", "medium", "shield"],
    weapons: ["club", "dagger", "dart", "javelin", "mace", "quarterstaff", "scimitar", "sickle", "sling", "spear"],
    subLevel: 2,
    subLabel: "Cercle druidique",
    caster: "full",
    ability: "wis",
    spellMode: "prepared",
    desc: "Tu prépares des sorts de nature et prends forme animale dès le niveau 2. Les druides refusent de porter du métal.",
  },
  fighter: {
    name: "Guerrier",
    icon: "swords",
    role: "Armes, défense, constance",
    die: 10,
    primary: ["str", "con", "dex"],
    saves: ["str", "con"],
    skills: ["acrobatics", "animal", "athletics", "history", "insight", "intimidation", "perception", "survival"],
    pick: 2,
    armors: ["light", "medium", "heavy", "shield"],
    weapons: ["simple", "martial"],
    subLevel: 3,
    subLabel: "Archétype martial",
    caster: "none",
    desc: "Toutes les armes, toutes les armures, plus d’attaques que quiconque. Ton style de combat donne tout de suite une direction à ton personnage.",
  },
  monk: {
    name: "Moine",
    icon: "wind",
    role: "Mobilité, arts martiaux",
    die: 8,
    primary: ["dex", "wis", "con"],
    saves: ["str", "dex"],
    skills: ["acrobatics", "athletics", "history", "insight", "religion", "stealth"],
    pick: 2,
    armors: [],
    weapons: ["simple", "shortsword"],
    subLevel: 3,
    subLabel: "Tradition monastique",
    caster: "none",
    desc: "Sans armure ni bouclier, ta Sagesse renforce ta défense. Le ki, dès le niveau 2, alimente des techniques rapides et revient au repos court.",
  },
  paladin: {
    name: "Paladin",
    icon: "shield",
    role: "Défense, soins, serment",
    die: 10,
    primary: ["str", "cha", "con"],
    saves: ["wis", "cha"],
    skills: ["athletics", "insight", "intimidation", "medicine", "persuasion", "religion"],
    pick: 2,
    armors: ["light", "medium", "heavy", "shield"],
    weapons: ["simple", "martial"],
    subLevel: 3,
    subLabel: "Serment sacré",
    caster: "half",
    ability: "cha",
    spellMode: "prepared",
    desc: "Armes lourdes, armure et magie divine. Tes sorts arrivent au niveau 2 et le Charisme renforce tes auras protectrices.",
  },
  ranger: {
    name: "Rôdeur",
    icon: "bow",
    role: "Exploration, armes, nature",
    die: 10,
    primary: ["dex", "wis", "con"],
    saves: ["str", "dex"],
    skills: ["animal", "athletics", "insight", "investigation", "nature", "perception", "stealth", "survival"],
    pick: 3,
    armors: ["light", "medium", "shield"],
    weapons: ["simple", "martial"],
    subLevel: 3,
    subLabel: "Archétype de rôdeur",
    caster: "half",
    ability: "wis",
    spellMode: "known",
    desc: "Pisteur et tireur, tu connais le terrain et tes ennemis. Style de combat et premiers sorts au niveau 2.",
  },
  rogue: {
    name: "Roublard",
    icon: "dagger",
    role: "Précision, discrétion, expertise",
    die: 8,
    primary: ["dex", "con", "int"],
    saves: ["dex", "int"],
    skills: [
      "acrobatics",
      "athletics",
      "deception",
      "insight",
      "intimidation",
      "investigation",
      "perception",
      "performance",
      "persuasion",
      "sleight",
      "stealth",
    ],
    pick: 4,
    armors: ["light"],
    weapons: ["simple", "hand-crossbow", "longsword", "rapier", "shortsword"],
    subLevel: 3,
    subLabel: "Archétype de roublard",
    caster: "none",
    desc: "Quatre compétences, deux expertises et une attaque sournoise qui grandit à chaque niveau impair. Le spécialiste des situations délicates.",
  },
  sorcerer: {
    name: "Ensorceleur",
    icon: "flame",
    role: "Magie innée, métamagie",
    die: 6,
    primary: ["cha", "con", "dex"],
    saves: ["con", "cha"],
    skills: ["arcana", "deception", "insight", "intimidation", "persuasion", "religion"],
    pick: 2,
    armors: [],
    weapons: ["dagger", "dart", "sling", "quarterstaff", "light-crossbow"],
    subLevel: 1,
    subLabel: "Origine magique",
    caster: "full",
    ability: "cha",
    spellMode: "known",
    desc: "Peu de sorts connus, mais une magie souple grâce aux points de sorcellerie et à la métamagie. Ton origine se choisit dès le niveau 1.",
  },
  warlock: {
    name: "Occultiste",
    icon: "moon",
    role: "Pacte, manifestations, magie",
    die: 8,
    primary: ["cha", "con", "dex"],
    saves: ["wis", "cha"],
    skills: ["arcana", "deception", "history", "intimidation", "investigation", "nature", "religion"],
    pick: 2,
    armors: ["light"],
    weapons: ["simple"],
    subLevel: 1,
    subLabel: "Patron d’Outremonde",
    caster: "pact",
    ability: "cha",
    spellMode: "known",
    desc: "Peu d’emplacements, mais ils reviennent au repos court et sont toujours au niveau maximal. Les manifestations occultes donnent des pouvoirs permanents.",
  },
  wizard: {
    name: "Magicien",
    icon: "book",
    role: "Grimoire, polyvalence magique",
    die: 6,
    primary: ["int", "con", "dex"],
    saves: ["int", "wis"],
    skills: ["arcana", "history", "insight", "investigation", "medicine", "religion"],
    pick: 2,
    armors: [],
    weapons: ["dagger", "dart", "sling", "quarterstaff", "light-crossbow"],
    subLevel: 2,
    subLabel: "Tradition arcanique",
    caster: "full",
    ability: "int",
    spellMode: "book",
    desc: "Le plus vaste choix de sorts du jeu. Tu les copies dans ton grimoire et en prépares une partie chaque jour.",
  },
};
const FULL_SLOTS = [
  [],
  [2],
  [3],
  [4, 2],
  [4, 3],
  [4, 3, 2],
  [4, 3, 3],
  [4, 3, 3, 1],
  [4, 3, 3, 2],
  [4, 3, 3, 3, 1],
  [4, 3, 3, 3, 2],
  [4, 3, 3, 3, 2, 1],
  [4, 3, 3, 3, 2, 1],
  [4, 3, 3, 3, 2, 1, 1],
  [4, 3, 3, 3, 2, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1, 1],
  [4, 3, 3, 3, 3, 1, 1, 1, 1],
  [4, 3, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 3, 2, 2, 1, 1],
];
const XP_THRESHOLDS = [
  0, 0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000,
  305000, 355000,
];
const CONDITIONS = {
  "À terre":
    "Se relever coûte la moitié du déplacement. Tes attaques sont désavantagées. Les attaques à 1,50 m contre toi sont avantagées ; les plus éloignées sont désavantagées.",
  Agrippé: "Ta vitesse devient 0. L’état se termine si l’agrippeur est neutralisé ou si tu es déplacé hors de sa portée.",
  Assourdi: "Tu n’entends pas et rates automatiquement les tests qui nécessitent l’ouïe.",
  Aveuglé: "Tu ne vois pas. Tes attaques sont désavantagées et celles qui te visent sont avantagées.",
  Charmé: "Tu ne peux pas attaquer le charmeur ni le viser avec un effet nuisible. Il est avantagé aux interactions sociales avec toi.",
  Effrayé: "Désavantage aux tests et attaques tant que la source de peur est visible. Tu ne peux pas t’en approcher volontairement.",
  Empoisonné: "Désavantage aux attaques et aux tests de caractéristique.",
  Entravé: "Vitesse 0. Tes attaques et sauvegardes DEX sont désavantagées ; les attaques contre toi sont avantagées.",
  Étourdi: "Neutralisé, immobile, parole hésitante. Échec automatique aux sauvegardes FOR/DEX. Les attaques contre toi sont avantagées.",
  Inconscient:
    "Neutralisé, sans perception, à terre ; tu lâches ce que tu tiens. Échec automatique aux sauvegardes FOR/DEX. Les attaques contre toi sont avantagées, et celles à 1,50 m qui touchent sont critiques.",
  Invisible:
    "Tu ne peux pas être vu sans moyen spécial. Tes attaques sont avantagées, celles contre toi désavantagées ; bruit et traces peuvent te révéler.",
  Neutralisé: "Tu ne peux faire ni action ni réaction. La concentration prend fin.",
  Paralysé:
    "Neutralisé, immobile, incapable de parler. Échec aux sauvegardes FOR/DEX. Les attaques contre toi sont avantagées et les touches à 1,50 m sont critiques.",
  Pétrifié:
    "Changé en pierre, neutralisé et inconscient de ton environnement. Résistance à tous les dégâts, immunité au poison et aux maladies.",
};
const EXHAUSTION = [
  "Aucun effet",
  "Désavantage aux tests de caractéristique",
  "Vitesse divisée par deux",
  "Désavantage aux attaques et aux sauvegardes",
  "PV maximum divisés par deux",
  "Vitesse réduite à 0",
  "Mort",
];
const SRD_URL = "https://media.wizards.com/2023/downloads/dnd/SRD_CC_v5.1_FR.pdf";


// Module : catalog
/** Catalogue du Manuel des joueurs 2014 : langues, outils, armes, armures, équipement
 * et compléments de classe (outils, langues, or et équipement de départ, multiclassage).
 * Poids en kilogrammes (1 lb = 0,5 kg), portées en mètres. Résumés originaux.
 */
const LANGUAGES = {
  common: { name: "Commun", script: "Commun", type: "standard", speakers: "Humains" },
  dwarvish: { name: "Nain", script: "Nain", type: "standard", speakers: "Nains" },
  elvish: { name: "Elfique", script: "Elfique", type: "standard", speakers: "Elfes" },
  giant: { name: "Géant", script: "Nain", type: "standard", speakers: "Ogres, géants" },
  gnomish: { name: "Gnome", script: "Nain", type: "standard", speakers: "Gnomes" },
  goblin: { name: "Gobelin", script: "Nain", type: "standard", speakers: "Gobelinoïdes" },
  halfling: { name: "Halfelin", script: "Commun", type: "standard", speakers: "Halfelins" },
  orc: { name: "Orc", script: "Nain", type: "standard", speakers: "Orcs" },
  abyssal: { name: "Abyssal", script: "Infernal", type: "exotic", speakers: "Démons" },
  celestial: { name: "Céleste", script: "Céleste", type: "exotic", speakers: "Célestes" },
  draconic: { name: "Draconique", script: "Draconique", type: "exotic", speakers: "Dragons, drakéides" },
  deepSpeech: { name: "Profond", script: "Aucune", type: "exotic", speakers: "Aboleths, manteleurs" },
  infernal: { name: "Infernal", script: "Infernal", type: "exotic", speakers: "Diables" },
  primordial: { name: "Primordial", script: "Nain", type: "exotic", speakers: "Élémentaires" },
  sylvan: { name: "Sylvestre", script: "Elfique", type: "exotic", speakers: "Créatures féeriques" },
  undercommon: { name: "Commun des profondeurs", script: "Elfique", type: "exotic", speakers: "Marchands de l’Outreterre" },
  druidic: {
    name: "Druidique",
    script: "Signes secrets",
    type: "secret",
    speakers: "Druides",
    note: "Langue secrète que les druides ne doivent pas enseigner aux autres. Un message caché ainsi se remarque avec un test de Sagesse (Perception) DD 15, mais ne se déchiffre pas sans magie.",
  },
  thievesCant: {
    name: "Argot des voleurs",
    script: "Signes secrets",
    type: "secret",
    speakers: "Roublards",
    note: "Jargon codé glissé dans une conversation ordinaire, que seul un autre initié comprend, plus des signes secrets pour de courts messages. Faire passer une idée ainsi prend quatre fois plus de temps que de la dire clairement.",
  },
};

const TOOLS = {
  "alchemists-supplies": { name: "Matériel d’alchimiste", kind: "artisan", weight: 4, cost: "50 po" },
  "brewers-supplies": { name: "Matériel de brasseur", kind: "artisan", weight: 4.5, cost: "20 po" },
  "calligraphers-supplies": { name: "Matériel de calligraphe", kind: "artisan", weight: 2.5, cost: "10 po" },
  "painters-supplies": { name: "Matériel de peintre", kind: "artisan", weight: 2.5, cost: "10 po" },
  "jewelers-tools": { name: "Outils de bijoutier", kind: "artisan", weight: 1, cost: "25 po" },
  "tinkers-tools": { name: "Outils de bricoleur", kind: "artisan", weight: 5, cost: "50 po" },
  "cartographers-tools": { name: "Outils de cartographe", kind: "artisan", weight: 3, cost: "15 po" },
  "carpenters-tools": { name: "Outils de charpentier", kind: "artisan", weight: 3, cost: "8 po" },
  "cobblers-tools": { name: "Outils de cordonnier", kind: "artisan", weight: 2.5, cost: "5 po" },
  "smiths-tools": { name: "Outils de forgeron", kind: "artisan", weight: 4, cost: "20 po" },
  "masons-tools": { name: "Outils de maçon", kind: "artisan", weight: 4, cost: "10 po" },
  "woodcarvers-tools": { name: "Outils de menuisier", kind: "artisan", weight: 2.5, cost: "1 po" },
  "potters-tools": { name: "Outils de potier", kind: "artisan", weight: 1.5, cost: "10 po" },
  "glassblowers-tools": { name: "Outils de souffleur de verre", kind: "artisan", weight: 2.5, cost: "30 po" },
  "leatherworkers-tools": { name: "Outils de tanneur", kind: "artisan", weight: 2.5, cost: "5 po" },
  "weavers-tools": { name: "Outils de tisserand", kind: "artisan", weight: 2.5, cost: "1 po" },
  "cooks-utensils": { name: "Ustensiles de cuisinier", kind: "artisan", weight: 4, cost: "1 po" },
  "forgery-kit": { name: "Kit de contrefaçon", kind: "kit", weight: 2.5, cost: "15 po" },
  "disguise-kit": { name: "Kit de déguisement", kind: "kit", weight: 1.5, cost: "25 po" },
  "poisoners-kit": { name: "Kit d’empoisonneur", kind: "kit", weight: 1, cost: "50 po" },
  "herbalism-kit": { name: "Kit d’herboriste", kind: "kit", weight: 1.5, cost: "5 po" },
  "navigators-tools": { name: "Outils de navigateur", kind: "kit", weight: 1, cost: "25 po" },
  "thieves-tools": { name: "Outils de voleur", kind: "kit", weight: 0.5, cost: "25 po" },
  "dice-set": { name: "Dés", kind: "gaming", weight: 0, cost: "1 pa" },
  "dragonchess-set": { name: "Jeu d’échecs draconiques", kind: "gaming", weight: 0.25, cost: "1 po" },
  "playing-card-set": { name: "Jeu de cartes", kind: "gaming", weight: 0, cost: "5 pa" },
  "three-dragon-ante-set": { name: "Jeu des Dragons", kind: "gaming", weight: 0, cost: "1 po" },
  shawm: { name: "Chalemie", kind: "music", weight: 0.5, cost: "2 po" },
  horn: { name: "Cor", kind: "music", weight: 1, cost: "3 po" },
  bagpipes: { name: "Cornemuse", kind: "music", weight: 3, cost: "30 po" },
  flute: { name: "Flûte", kind: "music", weight: 0.5, cost: "2 po" },
  "pan-flute": { name: "Flûte de pan", kind: "music", weight: 1, cost: "12 po" },
  lute: { name: "Luth", kind: "music", weight: 1, cost: "35 po" },
  lyre: { name: "Lyre", kind: "music", weight: 1, cost: "30 po" },
  drum: { name: "Tambour", kind: "music", weight: 1.5, cost: "6 po" },
  dulcimer: { name: "Tympanon", kind: "music", weight: 5, cost: "25 po" },
  viol: { name: "Viole", kind: "music", weight: 0.5, cost: "30 po" },
  "vehicles-land": { name: "Véhicules (terrestres)", kind: "vehicle", weight: 0, cost: "variable" },
  "vehicles-water": { name: "Véhicules (aquatiques)", kind: "vehicle", weight: 0, cost: "variable" },
};

const WEAPONS = {
  unarmed: {
    name: "Frappe à mains nues",
    damage: "1",
    type: "contondants",
    group: "simple",
    weight: 0,
    special: "Pas une arme à proprement parler : 1 + modificateur de Force, toujours maîtrisée.",
  },
  quarterstaff: { name: "Bâton", damage: "1d6", type: "contondants", group: "simple", versatile: "1d8", weight: 2, cost: "2 pa" },
  dagger: {
    name: "Dague",
    damage: "1d4",
    type: "perforants",
    group: "simple",
    finesse: true,
    light: true,
    thrown: true,
    range: "6/18 m",
    weight: 0.5,
    cost: "2 po",
  },
  club: { name: "Gourdin", damage: "1d4", type: "contondants", group: "simple", light: true, weight: 1, cost: "1 pa" },
  handaxe: {
    name: "Hachette",
    damage: "1d6",
    type: "tranchants",
    group: "simple",
    light: true,
    thrown: true,
    range: "6/18 m",
    weight: 1,
    cost: "5 po",
  },
  javelin: { name: "Javeline", damage: "1d6", type: "perforants", group: "simple", thrown: true, range: "9/36 m", weight: 1, cost: "5 pa" },
  spear: {
    name: "Lance",
    damage: "1d6",
    type: "perforants",
    group: "simple",
    thrown: true,
    range: "6/18 m",
    versatile: "1d8",
    weight: 1.5,
    cost: "1 po",
  },
  "light-hammer": {
    name: "Marteau léger",
    damage: "1d4",
    type: "contondants",
    group: "simple",
    light: true,
    thrown: true,
    range: "6/18 m",
    weight: 1,
    cost: "2 po",
  },
  mace: { name: "Masse d’armes", damage: "1d6", type: "contondants", group: "simple", weight: 2, cost: "5 po" },
  greatclub: { name: "Massue", damage: "1d8", type: "contondants", group: "simple", two: true, weight: 5, cost: "2 pa" },
  sickle: { name: "Serpe", damage: "1d4", type: "tranchants", group: "simple", light: true, weight: 1, cost: "1 po" },
  "light-crossbow": {
    name: "Arbalète légère",
    damage: "1d8",
    type: "perforants",
    group: "simple",
    ranged: true,
    two: true,
    loading: true,
    ammunition: "crossbow-bolts",
    range: "24/96 m",
    weight: 2.5,
    cost: "25 po",
  },
  shortbow: {
    name: "Arc court",
    damage: "1d6",
    type: "perforants",
    group: "simple",
    ranged: true,
    two: true,
    ammunition: "arrows",
    range: "24/96 m",
    weight: 1,
    cost: "25 po",
  },
  dart: {
    name: "Fléchette",
    damage: "1d4",
    type: "perforants",
    group: "simple",
    ranged: true,
    finesse: true,
    thrown: true,
    range: "6/18 m",
    weight: 0.125,
    cost: "5 pc",
  },
  sling: {
    name: "Fronde",
    damage: "1d4",
    type: "contondants",
    group: "simple",
    ranged: true,
    ammunition: "sling-bullets",
    range: "9/36 m",
    weight: 0,
    cost: "1 pa",
  },
  scimitar: {
    name: "Cimeterre",
    damage: "1d6",
    type: "tranchants",
    group: "martial",
    finesse: true,
    light: true,
    weight: 1.5,
    cost: "25 po",
  },
  glaive: {
    name: "Coutille",
    damage: "1d10",
    type: "tranchants",
    group: "martial",
    heavy: true,
    reach: true,
    two: true,
    weight: 3,
    cost: "20 po",
  },
  greatsword: {
    name: "Épée à deux mains",
    damage: "2d6",
    type: "tranchants",
    group: "martial",
    heavy: true,
    two: true,
    weight: 3,
    cost: "50 po",
  },
  shortsword: {
    name: "Épée courte",
    damage: "1d6",
    type: "perforants",
    group: "martial",
    finesse: true,
    light: true,
    weight: 1,
    cost: "10 po",
  },
  longsword: {
    name: "Épée longue",
    damage: "1d8",
    type: "tranchants",
    group: "martial",
    versatile: "1d10",
    weight: 1.5,
    cost: "15 po",
  },
  flail: { name: "Fléau d’armes", damage: "1d8", type: "contondants", group: "martial", weight: 1, cost: "10 po" },
  whip: {
    name: "Fouet",
    damage: "1d4",
    type: "tranchants",
    group: "martial",
    finesse: true,
    reach: true,
    weight: 1.5,
    cost: "2 po",
  },
  greataxe: {
    name: "Hache à deux mains",
    damage: "1d12",
    type: "tranchants",
    group: "martial",
    heavy: true,
    two: true,
    weight: 3.5,
    cost: "30 po",
  },
  battleaxe: {
    name: "Hache d’armes",
    damage: "1d8",
    type: "tranchants",
    group: "martial",
    versatile: "1d10",
    weight: 2,
    cost: "10 po",
  },
  halberd: {
    name: "Hallebarde",
    damage: "1d10",
    type: "tranchants",
    group: "martial",
    heavy: true,
    reach: true,
    two: true,
    weight: 3,
    cost: "20 po",
  },
  lance: {
    name: "Lance d’arçon",
    damage: "1d12",
    type: "perforants",
    group: "martial",
    reach: true,
    special: "Désavantage aux attaques contre une cible à 1,50 m ou moins. Hors monture, elle se manie à deux mains.",
    weight: 3,
    cost: "10 po",
  },
  maul: { name: "Maillet", damage: "2d6", type: "contondants", group: "martial", heavy: true, two: true, weight: 5, cost: "10 po" },
  warhammer: {
    name: "Marteau de guerre",
    damage: "1d8",
    type: "contondants",
    group: "martial",
    versatile: "1d10",
    weight: 1,
    cost: "15 po",
  },
  morningstar: { name: "Morgenstern", damage: "1d8", type: "perforants", group: "martial", weight: 2, cost: "15 po" },
  "war-pick": { name: "Pic de guerre", damage: "1d8", type: "perforants", group: "martial", weight: 1, cost: "5 po" },
  pike: {
    name: "Pique",
    damage: "1d10",
    type: "perforants",
    group: "martial",
    heavy: true,
    reach: true,
    two: true,
    weight: 9,
    cost: "5 po",
  },
  rapier: { name: "Rapière", damage: "1d8", type: "perforants", group: "martial", finesse: true, weight: 1, cost: "25 po" },
  trident: {
    name: "Trident",
    damage: "1d6",
    type: "perforants",
    group: "martial",
    thrown: true,
    range: "6/18 m",
    versatile: "1d8",
    weight: 2,
    cost: "5 po",
  },
  "hand-crossbow": {
    name: "Arbalète de poing",
    damage: "1d6",
    type: "perforants",
    group: "martial",
    ranged: true,
    light: true,
    loading: true,
    ammunition: "crossbow-bolts",
    range: "9/36 m",
    weight: 1.5,
    cost: "75 po",
  },
  "heavy-crossbow": {
    name: "Arbalète lourde",
    damage: "1d10",
    type: "perforants",
    group: "martial",
    ranged: true,
    heavy: true,
    two: true,
    loading: true,
    ammunition: "crossbow-bolts",
    range: "30/120 m",
    weight: 9,
    cost: "50 po",
  },
  longbow: {
    name: "Arc long",
    damage: "1d8",
    type: "perforants",
    group: "martial",
    ranged: true,
    heavy: true,
    two: true,
    ammunition: "arrows",
    range: "45/180 m",
    weight: 1,
    cost: "50 po",
  },
  net: {
    name: "Filet",
    damage: "0",
    type: "aucun",
    group: "martial",
    ranged: true,
    thrown: true,
    range: "1,50/4,50 m",
    special:
      "Aucun dégât. Une créature de taille G ou inférieure touchée est entravée jusqu’à sa libération (sans effet sur une créature informe ou de taille TG ou plus). Libération : test de Force DD 10 par une action, par elle ou une créature à portée, ou 5 dégâts tranchants infligés au filet (CA 10), qui est alors détruit. Une attaque au filet est toujours ta seule attaque de l’action, de l’action bonus ou de la réaction.",
    weight: 1.5,
    cost: "1 po",
  },
  blowgun: {
    name: "Sarbacane",
    damage: "1",
    type: "perforants",
    group: "martial",
    ranged: true,
    loading: true,
    ammunition: "blowgun-needles",
    range: "7,50/30 m",
    weight: 0.5,
    cost: "10 po",
  },
};

const ARMORS = {
  none: { name: "Sans armure", base: 10, dex: 99, type: "none", weight: 0 },
  padded: { name: "Armure matelassée", base: 11, dex: 99, type: "light", stealth: true, weight: 4, cost: "5 po" },
  leather: { name: "Armure de cuir", base: 11, dex: 99, type: "light", weight: 5, cost: "10 po" },
  studded: { name: "Cuir clouté", base: 12, dex: 99, type: "light", weight: 6.5, cost: "45 po" },
  hide: { name: "Armure de peaux", base: 12, dex: 2, type: "medium", weight: 6, cost: "10 po" },
  chainshirt: { name: "Chemise de mailles", base: 13, dex: 2, type: "medium", weight: 10, cost: "50 po" },
  scale: { name: "Armure d’écailles", base: 14, dex: 2, type: "medium", stealth: true, weight: 22.5, cost: "50 po" },
  breastplate: { name: "Cuirasse", base: 14, dex: 2, type: "medium", weight: 10, cost: "400 po" },
  halfplate: { name: "Demi-plate", base: 15, dex: 2, type: "medium", stealth: true, weight: 20, cost: "750 po" },
  ring: { name: "Broigne", base: 14, dex: 0, type: "heavy", stealth: true, weight: 20, cost: "30 po" },
  chain: { name: "Cotte de mailles", base: 16, dex: 0, type: "heavy", str: 13, stealth: true, weight: 27.5, cost: "75 po" },
  splint: { name: "Clibanion", base: 17, dex: 0, type: "heavy", str: 15, stealth: true, weight: 30, cost: "200 po" },
  plate: { name: "Harnois", base: 18, dex: 0, type: "heavy", str: 15, stealth: true, weight: 32.5, cost: "1500 po" },
  shield: { name: "Bouclier", type: "shield", bonus: 2, weight: 3, cost: "10 po" },
};

const GEAR = {
  "burglars-pack": {
    name: "Sac de cambrioleur",
    kind: "pack",
    weight: 23.75,
    cost: "16 po",
    contents:
      "Sac à dos, sac de 1 000 billes, 3 m de ficelle, cloche, 5 bougies, pied-de-biche, marteau, 10 pitons, lanterne à capote, 2 flasques d’huile, 5 jours de rations, boîte d’allume-feu, gourde, et 15 m de corde en chanvre attachés sur le côté.",
  },
  "diplomats-pack": {
    name: "Sac de diplomate",
    kind: "pack",
    weight: 18,
    cost: "39 po",
    contents:
      "Coffre, 2 étuis à cartes ou parchemins, vêtements fins, bouteille d’encre, plume d’écriture, lampe, 2 flasques d’huile, 5 feuilles de papier, fiole de parfum, cire à cacheter, savon.",
  },
  "dungeoneers-pack": {
    name: "Sac d’exploration souterraine",
    kind: "pack",
    weight: 30.75,
    cost: "12 po",
    contents:
      "Sac à dos, pied-de-biche, marteau, 10 pitons, 10 torches, boîte d’allume-feu, 10 jours de rations, gourde, et 15 m de corde en chanvre attachés sur le côté.",
  },
  "entertainers-pack": {
    name: "Sac d’artiste",
    kind: "pack",
    weight: 19,
    cost: "40 po",
    contents: "Sac à dos, sac de couchage, 2 costumes, 5 bougies, 5 jours de rations, gourde, kit de déguisement.",
  },
  "explorers-pack": {
    name: "Sac d’explorateur",
    kind: "pack",
    weight: 29.5,
    cost: "10 po",
    contents:
      "Sac à dos, sac de couchage, gamelle, boîte d’allume-feu, 10 torches, 10 jours de rations, gourde, et 15 m de corde en chanvre attachés sur le côté.",
  },
  "priests-pack": {
    name: "Sac d’ecclésiastique",
    kind: "pack",
    weight: 12,
    cost: "19 po",
    contents:
      "Sac à dos, couverture, 10 bougies, boîte d’allume-feu, boîte à aumônes, 2 pains d’encens, encensoir, habits de cérémonie, 2 jours de rations, gourde.",
  },
  "scholars-pack": {
    name: "Sac d’érudit",
    kind: "pack",
    weight: 5,
    cost: "40 po",
    contents:
      "Sac à dos, livre de connaissances, bouteille d’encre, plume d’écriture, 10 feuilles de parchemin, petit sac de sable, petit couteau.",
  },
  arrows: { name: "Flèches (20)", kind: "ammo", count: 20, weight: 0.5, cost: "1 po" },
  "crossbow-bolts": { name: "Carreaux d’arbalète (20)", kind: "ammo", count: 20, weight: 0.75, cost: "1 po" },
  "sling-bullets": { name: "Billes de fronde (20)", kind: "ammo", count: 20, weight: 0.75, cost: "4 pc" },
  "blowgun-needles": { name: "Aiguilles de sarbacane (50)", kind: "ammo", count: 50, weight: 0.5, cost: "1 po" },
  "arcane-focus": {
    name: "Focaliseur arcanique",
    kind: "focus",
    focus: "arcane",
    weight: 0.5,
    cost: "5 à 20 po",
    forms: ["crystal", "orb", "rod", "staff", "wand"],
    note: "Forme au choix (boule de cristal, orbe, sceptre, bâton ou baguette). Remplace les composantes matérielles sans coût indiqué pour l’ensorceleur, l’occultiste et le magicien.",
  },
  crystal: { name: "Boule de cristal", kind: "focus", focus: "arcane", weight: 0.5, cost: "10 po" },
  orb: { name: "Orbe", kind: "focus", focus: "arcane", weight: 1.5, cost: "20 po" },
  rod: { name: "Sceptre", kind: "focus", focus: "arcane", weight: 1, cost: "10 po" },
  staff: { name: "Bâton (focaliseur arcanique)", kind: "focus", focus: "arcane", weight: 2, cost: "5 po" },
  wand: { name: "Baguette", kind: "focus", focus: "arcane", weight: 0.5, cost: "10 po" },
  "druidic-focus": {
    name: "Focaliseur druidique",
    kind: "focus",
    focus: "druidic",
    weight: 0,
    cost: "1 à 10 po",
    forms: ["sprig-of-mistletoe", "totem", "wooden-staff", "yew-wand"],
    note: "Forme au choix (branche de gui, totem, bâton en bois ou baguette d’if). Remplace les composantes matérielles sans coût indiqué pour le druide.",
  },
  "sprig-of-mistletoe": { name: "Branche de gui", kind: "focus", focus: "druidic", weight: 0, cost: "1 po" },
  totem: { name: "Totem", kind: "focus", focus: "druidic", weight: 0, cost: "1 po" },
  "wooden-staff": { name: "Bâton en bois (focaliseur druidique)", kind: "focus", focus: "druidic", weight: 2, cost: "5 po" },
  "yew-wand": { name: "Baguette d’if", kind: "focus", focus: "druidic", weight: 0.5, cost: "10 po" },
  "holy-symbol": {
    name: "Symbole sacré",
    kind: "focus",
    focus: "holy",
    weight: 0.5,
    cost: "5 po",
    forms: ["amulet", "emblem", "reliquary"],
    note: "Forme au choix (amulette, emblème ou reliquaire). Focaliseur du clerc et du paladin : tenu en main, porté bien en vue ou arboré sur le bouclier.",
  },
  amulet: { name: "Amulette", kind: "focus", focus: "holy", weight: 0.5, cost: "5 po" },
  emblem: { name: "Emblème", kind: "focus", focus: "holy", weight: 0, cost: "5 po" },
  reliquary: { name: "Reliquaire", kind: "focus", focus: "holy", weight: 1, cost: "5 po" },
  "component-pouch": {
    name: "Sacoche à composantes",
    kind: "magic",
    weight: 1,
    cost: "25 po",
    note: "Petite sacoche étanche à compartiments : remplace les composantes matérielles sans coût indiqué.",
  },
  spellbook: {
    name: "Grimoire",
    kind: "magic",
    weight: 1.5,
    cost: "50 po",
    note: "Livre de 100 pages de vélin où le magicien consigne ses sorts.",
  },
  backpack: { name: "Sac à dos", kind: "gear", weight: 2.5, cost: "2 po" },
  pouch: { name: "Sacoche", kind: "gear", weight: 0.5, cost: "5 pa" },
  sack: { name: "Sac", kind: "gear", weight: 0.25, cost: "1 pc" },
  quiver: { name: "Carquois", kind: "gear", weight: 0.5, cost: "1 po", note: "Contient jusqu’à 20 flèches." },
  "crossbow-bolt-case": { name: "Étui à carreaux", kind: "gear", weight: 0.5, cost: "1 po", note: "Contient jusqu’à 20 carreaux." },
  chest: { name: "Coffre", kind: "gear", weight: 12.5, cost: "5 po" },
  "map-case": { name: "Étui à cartes ou parchemins", kind: "gear", weight: 0.5, cost: "1 po" },
  bedroll: { name: "Sac de couchage", kind: "gear", weight: 3.5, cost: "1 po" },
  blanket: { name: "Couverture", kind: "gear", weight: 1.5, cost: "5 pa" },
  candle: {
    name: "Bougie",
    kind: "gear",
    weight: 0,
    cost: "1 pc",
    note: "1 heure : lumière vive sur 1,50 m, puis faible sur 1,50 m de plus.",
  },
  torch: {
    name: "Torche",
    kind: "gear",
    weight: 0.5,
    cost: "1 pc",
    note: "1 heure : lumière vive sur 6 m, puis faible sur 6 m de plus.",
  },
  lamp: {
    name: "Lampe",
    kind: "gear",
    weight: 0.5,
    cost: "5 pa",
    note: "Lumière vive sur 4,50 m, puis faible sur 9 m de plus ; 6 heures par flasque d’huile.",
  },
  "hooded-lantern": {
    name: "Lanterne à capote",
    kind: "gear",
    weight: 1,
    cost: "5 po",
    note: "Lumière vive sur 9 m, puis faible sur 9 m de plus ; 6 heures par flasque d’huile. Capote baissée : lumière faible sur 1,50 m.",
  },
  oil: { name: "Huile (flasque)", kind: "gear", weight: 0.5, cost: "1 pa" },
  tinderbox: { name: "Boîte d’allume-feu", kind: "gear", weight: 0.5, cost: "5 pa" },
  crowbar: {
    name: "Pied-de-biche",
    kind: "gear",
    weight: 2.5,
    cost: "2 po",
    note: "Avantage aux tests de Force quand l’effet de levier peut jouer.",
  },
  hammer: { name: "Marteau", kind: "gear", weight: 1.5, cost: "1 po" },
  piton: { name: "Piton", kind: "gear", weight: 0.125, cost: "5 pc" },
  "hempen-rope": { name: "Corde en chanvre (15 m)", kind: "gear", weight: 5, cost: "1 po" },
  "silk-rope": { name: "Corde en soie (15 m)", kind: "gear", weight: 2.5, cost: "10 po" },
  string: { name: "Ficelle (3 m)", kind: "gear", weight: 0, cost: "1 pc" },
  rations: { name: "Rations (1 jour)", kind: "gear", weight: 1, cost: "5 pa" },
  waterskin: { name: "Gourde", kind: "gear", weight: 2.5, cost: "2 pa", note: "Poids une fois pleine." },
  "mess-kit": { name: "Gamelle", kind: "gear", weight: 0.5, cost: "2 pa" },
  "iron-pot": { name: "Pot en fer", kind: "gear", weight: 5, cost: "2 po" },
  shovel: { name: "Pelle", kind: "gear", weight: 2.5, cost: "2 po" },
  "hunting-trap": { name: "Piège à mâchoires", kind: "gear", weight: 12.5, cost: "5 po" },
  "ball-bearings": { name: "Billes (sac de 1 000)", kind: "gear", weight: 1, cost: "1 po" },
  bell: { name: "Cloche", kind: "gear", weight: 0, cost: "1 po" },
  ink: { name: "Encre (bouteille de 30 ml)", kind: "gear", weight: 0, cost: "10 po" },
  "ink-pen": { name: "Plume d’écriture", kind: "gear", weight: 0, cost: "2 pc" },
  parchment: { name: "Parchemin (une feuille)", kind: "gear", weight: 0, cost: "1 pa" },
  paper: { name: "Papier (une feuille)", kind: "gear", weight: 0, cost: "2 pa" },
  "sealing-wax": { name: "Cire à cacheter", kind: "gear", weight: 0, cost: "5 pa" },
  book: { name: "Livre", kind: "gear", weight: 2.5, cost: "25 po" },
  "signet-ring": { name: "Chevalière", kind: "gear", weight: 0, cost: "5 po" },
  perfume: { name: "Parfum (fiole)", kind: "gear", weight: 0, cost: "5 po" },
  soap: { name: "Savon", kind: "gear", weight: 0, cost: "2 pc" },
  "clothes-common": { name: "Vêtements communs", kind: "gear", weight: 1.5, cost: "5 pa" },
  "clothes-costume": { name: "Costume", kind: "gear", weight: 2, cost: "5 po" },
  "clothes-fine": { name: "Vêtements fins", kind: "gear", weight: 3, cost: "15 po" },
  "clothes-travelers": { name: "Vêtements de voyage", kind: "gear", weight: 2, cost: "2 po" },
  "healers-kit": {
    name: "Trousse de soins",
    kind: "gear",
    weight: 1.5,
    cost: "5 po",
    note: "10 utilisations. Par une action, stabilise une créature à 0 PV sans test de Sagesse (Médecine).",
  },
  "potion-of-healing": {
    name: "Potion de guérison",
    kind: "gear",
    weight: 0.25,
    cost: "50 po",
    note: "Rend 2d4 + 2 PV. La boire ou la faire boire demande une action.",
  },
};

const _catalogArtisan = [
  "alchemists-supplies",
  "brewers-supplies",
  "calligraphers-supplies",
  "painters-supplies",
  "jewelers-tools",
  "tinkers-tools",
  "cartographers-tools",
  "carpenters-tools",
  "cobblers-tools",
  "smiths-tools",
  "masons-tools",
  "woodcarvers-tools",
  "potters-tools",
  "glassblowers-tools",
  "leatherworkers-tools",
  "weavers-tools",
  "cooks-utensils",
];
const _catalogMusic = ["shawm", "horn", "bagpipes", "flute", "pan-flute", "lute", "lyre", "drum", "dulcimer", "viol"];
const _catalogPacks = {
  burglar: { label: "Sac de cambrioleur", items: [["burglars-pack", 1]] },
  diplomat: { label: "Sac de diplomate", items: [["diplomats-pack", 1]] },
  dungeoneer: { label: "Sac d’exploration souterraine", items: [["dungeoneers-pack", 1]] },
  entertainer: { label: "Sac d’artiste", items: [["entertainers-pack", 1]] },
  explorer: { label: "Sac d’explorateur", items: [["explorers-pack", 1]] },
  priest: { label: "Sac d’ecclésiastique", items: [["priests-pack", 1]] },
  scholar: { label: "Sac d’érudit", items: [["scholars-pack", 1]] },
};
const _catalogCrossbow = { label: "Arbalète légère et 20 carreaux", items: [["light-crossbow", 1], ["crossbow-bolts", 1]] };
const _catalogAnySimple = { label: "Une arme courante", items: [["@simple", 1]] };
const _catalogArcane = {
  options: [
    { label: "Sacoche à composantes", items: [["component-pouch", 1]] },
    { label: "Focaliseur arcanique", items: [["arcane-focus", 1]] },
  ],
};

const CLASS_EXTRAS = {
  barbarian: {
    tools: [],
    toolChoice: null,
    languages: [],
    startingGold: "2d4 × 10 po",
    startingEquipment: [
      {
        options: [
          { label: "Hache à deux mains", items: [["greataxe", 1]] },
          { label: "Une arme de guerre de corps à corps", items: [["@martial-melee", 1]] },
        ],
      },
      { options: [{ label: "Deux hachettes", items: [["handaxe", 2]] }, _catalogAnySimple] },
      { options: [{ label: "Sac d’explorateur et quatre javelines", items: [["explorers-pack", 1], ["javelin", 4]] }] },
    ],
    multiclass: { prereq: { abilities: { str: 13 } }, grants: { armor: ["shield"], weapons: ["simple", "martial"] } },
  },
  bard: {
    tools: [],
    toolChoice: { count: 3, from: "music" },
    languages: [],
    startingGold: "5d4 × 10 po",
    startingEquipment: [
      {
        options: [
          { label: "Rapière", items: [["rapier", 1]] },
          { label: "Épée longue", items: [["longsword", 1]] },
          _catalogAnySimple,
        ],
      },
      { options: [_catalogPacks.diplomat, _catalogPacks.entertainer] },
      {
        options: [
          { label: "Luth", items: [["lute", 1]] },
          { label: "Un autre instrument de musique", items: [["@instrument", 1]] },
        ],
      },
      { options: [{ label: "Armure de cuir et dague", items: [["leather", 1], ["dagger", 1]] }] },
    ],
    multiclass: {
      prereq: { abilities: { cha: 13 } },
      grants: { armor: ["light"], skillChoice: { count: 1 }, toolChoice: { count: 1, from: "music" } },
    },
  },
  cleric: {
    tools: [],
    toolChoice: null,
    languages: [],
    startingGold: "5d4 × 10 po",
    startingEquipment: [
      {
        options: [
          { label: "Masse d’armes", items: [["mace", 1]] },
          { label: "Marteau de guerre (si tu le maîtrises)", items: [["warhammer", 1]] },
        ],
      },
      {
        options: [
          { label: "Armure d’écailles", items: [["scale", 1]] },
          { label: "Armure de cuir", items: [["leather", 1]] },
          { label: "Cotte de mailles (si tu la maîtrises)", items: [["chain", 1]] },
        ],
      },
      { options: [_catalogCrossbow, _catalogAnySimple] },
      { options: [_catalogPacks.priest, _catalogPacks.explorer] },
      { options: [{ label: "Bouclier et symbole sacré", items: [["shield", 1], ["holy-symbol", 1]] }] },
    ],
    multiclass: { prereq: { abilities: { wis: 13 } }, grants: { armor: ["light", "medium", "shield"] } },
  },
  druid: {
    tools: ["herbalism-kit"],
    toolChoice: null,
    languages: ["druidic"],
    startingGold: "2d4 × 10 po",
    startingEquipment: [
      { options: [{ label: "Bouclier en bois", items: [["shield", 1]] }, _catalogAnySimple] },
      {
        options: [
          { label: "Cimeterre", items: [["scimitar", 1]] },
          { label: "Une arme courante de corps à corps", items: [["@simple-melee", 1]] },
        ],
      },
      {
        options: [
          {
            label: "Armure de cuir, sac d’explorateur et focaliseur druidique",
            items: [["leather", 1], ["explorers-pack", 1], ["druidic-focus", 1]],
          },
        ],
      },
    ],
    multiclass: { prereq: { abilities: { wis: 13 } }, grants: { armor: ["light", "medium", "shield"] } },
  },
  fighter: {
    tools: [],
    toolChoice: null,
    languages: [],
    startingGold: "5d4 × 10 po",
    startingEquipment: [
      {
        options: [
          { label: "Cotte de mailles", items: [["chain", 1]] },
          { label: "Armure de cuir, arc long et 20 flèches", items: [["leather", 1], ["longbow", 1], ["arrows", 1]] },
        ],
      },
      {
        options: [
          { label: "Une arme de guerre et un bouclier", items: [["@martial", 1], ["shield", 1]] },
          { label: "Deux armes de guerre", items: [["@martial", 2]] },
        ],
      },
      { options: [_catalogCrossbow, { label: "Deux hachettes", items: [["handaxe", 2]] }] },
      { options: [_catalogPacks.dungeoneer, _catalogPacks.explorer] },
    ],
    multiclass: {
      prereq: { anyAbility: { str: 13, dex: 13 } },
      grants: { armor: ["light", "medium", "shield"], weapons: ["simple", "martial"] },
    },
  },
  monk: {
    tools: [],
    toolChoice: { count: 1, from: [..._catalogArtisan, ..._catalogMusic] },
    languages: [],
    startingGold: "5d4 po",
    startingEquipment: [
      { options: [{ label: "Épée courte", items: [["shortsword", 1]] }, _catalogAnySimple] },
      { options: [_catalogPacks.dungeoneer, _catalogPacks.explorer] },
      { options: [{ label: "10 fléchettes", items: [["dart", 10]] }] },
    ],
    multiclass: { prereq: { abilities: { dex: 13, wis: 13 } }, grants: { weapons: ["simple", "shortsword"] } },
  },
  paladin: {
    tools: [],
    toolChoice: null,
    languages: [],
    startingGold: "5d4 × 10 po",
    startingEquipment: [
      {
        options: [
          { label: "Une arme de guerre et un bouclier", items: [["@martial", 1], ["shield", 1]] },
          { label: "Deux armes de guerre", items: [["@martial", 2]] },
        ],
      },
      {
        options: [
          { label: "Cinq javelines", items: [["javelin", 5]] },
          { label: "Une arme courante de corps à corps", items: [["@simple-melee", 1]] },
        ],
      },
      { options: [_catalogPacks.priest, _catalogPacks.explorer] },
      { options: [{ label: "Cotte de mailles et symbole sacré", items: [["chain", 1], ["holy-symbol", 1]] }] },
    ],
    multiclass: {
      prereq: { abilities: { str: 13, cha: 13 } },
      grants: { armor: ["light", "medium", "shield"], weapons: ["simple", "martial"] },
    },
  },
  ranger: {
    tools: [],
    toolChoice: null,
    languages: [],
    startingGold: "5d4 × 10 po",
    startingEquipment: [
      {
        options: [
          { label: "Armure d’écailles", items: [["scale", 1]] },
          { label: "Armure de cuir", items: [["leather", 1]] },
        ],
      },
      {
        options: [
          { label: "Deux épées courtes", items: [["shortsword", 2]] },
          { label: "Deux armes courantes de corps à corps", items: [["@simple-melee", 2]] },
        ],
      },
      { options: [_catalogPacks.dungeoneer, _catalogPacks.explorer] },
      { options: [{ label: "Arc long et carquois de 20 flèches", items: [["longbow", 1], ["quiver", 1], ["arrows", 1]] }] },
    ],
    multiclass: {
      prereq: { abilities: { dex: 13, wis: 13 } },
      grants: {
        armor: ["light", "medium", "shield"],
        weapons: ["simple", "martial"],
        skillChoice: {
          count: 1,
          from: ["animal", "athletics", "insight", "investigation", "nature", "perception", "stealth", "survival"],
        },
      },
    },
  },
  rogue: {
    tools: ["thieves-tools"],
    toolChoice: null,
    languages: ["thievesCant"],
    startingGold: "4d4 × 10 po",
    startingEquipment: [
      {
        options: [
          { label: "Rapière", items: [["rapier", 1]] },
          { label: "Épée courte", items: [["shortsword", 1]] },
        ],
      },
      {
        options: [
          { label: "Arc court et carquois de 20 flèches", items: [["shortbow", 1], ["quiver", 1], ["arrows", 1]] },
          { label: "Épée courte", items: [["shortsword", 1]] },
        ],
      },
      { options: [_catalogPacks.burglar, _catalogPacks.dungeoneer, _catalogPacks.explorer] },
      {
        options: [
          {
            label: "Armure de cuir, deux dagues et outils de voleur",
            items: [["leather", 1], ["dagger", 2], ["thieves-tools", 1]],
          },
        ],
      },
    ],
    multiclass: {
      prereq: { abilities: { dex: 13 } },
      grants: {
        armor: ["light"],
        skillChoice: {
          count: 1,
          from: [
            "acrobatics",
            "athletics",
            "deception",
            "insight",
            "intimidation",
            "investigation",
            "perception",
            "performance",
            "persuasion",
            "sleight",
            "stealth",
          ],
        },
        tools: ["thieves-tools"],
      },
    },
  },
  sorcerer: {
    tools: [],
    toolChoice: null,
    languages: [],
    startingGold: "3d4 × 10 po",
    startingEquipment: [
      { options: [_catalogCrossbow, _catalogAnySimple] },
      _catalogArcane,
      { options: [_catalogPacks.dungeoneer, _catalogPacks.explorer] },
      { options: [{ label: "Deux dagues", items: [["dagger", 2]] }] },
    ],
    multiclass: { prereq: { abilities: { cha: 13 } }, grants: {} },
  },
  warlock: {
    tools: [],
    toolChoice: null,
    languages: [],
    startingGold: "4d4 × 10 po",
    startingEquipment: [
      { options: [_catalogCrossbow, _catalogAnySimple] },
      _catalogArcane,
      { options: [_catalogPacks.scholar, _catalogPacks.dungeoneer] },
      {
        options: [
          {
            label: "Armure de cuir, une arme courante et deux dagues",
            items: [["leather", 1], ["@simple", 1], ["dagger", 2]],
          },
        ],
      },
    ],
    multiclass: { prereq: { abilities: { cha: 13 } }, grants: { armor: ["light"], weapons: ["simple"] } },
  },
  wizard: {
    tools: [],
    toolChoice: null,
    languages: [],
    startingGold: "4d4 × 10 po",
    startingEquipment: [
      {
        options: [
          { label: "Bâton", items: [["quarterstaff", 1]] },
          { label: "Dague", items: [["dagger", 1]] },
        ],
      },
      _catalogArcane,
      { options: [_catalogPacks.scholar, _catalogPacks.explorer] },
      { options: [{ label: "Grimoire", items: [["spellbook", 1]] }] },
    ],
    multiclass: { prereq: { abilities: { int: 13 } }, grants: {} },
  },
};


// Module : beasts
/** Bêtes pour la forme sauvage (règles 2014).
 * Statistiques du SRD 5.1 (CC BY 4.0) et, pour trois dinosaures, du Bestiaire 2014 (source "mm").
 * cr : facteur de puissance ; ac : classe d’armure ; hp : points de vie moyens ; speed en mètres.
 * common : animal courant, considéré comme déjà vu par le druide. */
const BEASTS = [
  { id: "eagle", name: "Aigle", cr: 0, size: "P", ac: 12, hp: 3, hd: "1d6", speed: { walk: 3, fly: 18 }, common: true, source: "srd" },
  { id: "spider", name: "Araignée", cr: 0, size: "TP", ac: 12, hp: 1, hd: "1d4-1", speed: { walk: 6, climb: 6 }, common: true, source: "srd" },
  { id: "baboon", name: "Babouin", cr: 0, size: "P", ac: 12, hp: 3, hd: "1d6", speed: { walk: 9, climb: 9 }, common: true, source: "srd" },
  { id: "weasel", name: "Belette", cr: 0, size: "TP", ac: 13, hp: 1, hd: "1d4-1", speed: { walk: 9 }, common: true, source: "srd" },
  { id: "badger", name: "Blaireau", cr: 0, size: "TP", ac: 10, hp: 3, hd: "1d4+1", speed: { walk: 6, burrow: 1.5 }, common: true, source: "srd" },
  { id: "deer", name: "Cerf", cr: 0, size: "M", ac: 13, hp: 4, hd: "1d8", speed: { walk: 15 }, common: true, source: "srd" },
  { id: "jackal", name: "Chacal", cr: 0, size: "P", ac: 12, hp: 3, hd: "1d6", speed: { walk: 12 }, common: true, source: "srd" },
  { id: "cat", name: "Chat", cr: 0, size: "TP", ac: 12, hp: 2, hd: "1d4", speed: { walk: 12, climb: 9 }, common: true, source: "srd" },
  { id: "bat", name: "Chauve-souris", cr: 0, size: "TP", ac: 12, hp: 1, hd: "1d4-1", speed: { walk: 1.5, fly: 9 }, common: true, source: "srd" },
  { id: "owl", name: "Chouette", cr: 0, size: "TP", ac: 11, hp: 1, hd: "1d4-1", speed: { walk: 1.5, fly: 18 }, common: true, source: "srd" },
  { id: "goat", name: "Chèvre", cr: 0, size: "M", ac: 10, hp: 4, hd: "1d8", speed: { walk: 12 }, common: true, source: "srd" },
  { id: "raven", name: "Corbeau", cr: 0, size: "TP", ac: 12, hp: 1, hd: "1d4-1", speed: { walk: 3, fly: 15 }, common: true, source: "srd" },
  { id: "crab", name: "Crabe", cr: 0, size: "TP", ac: 11, hp: 2, hd: "1d4", speed: { walk: 6, swim: 6 }, common: true, source: "srd" },
  { id: "hawk", name: "Faucon", cr: 0, size: "TP", ac: 13, hp: 1, hd: "1d4-1", speed: { walk: 3, fly: 18 }, common: true, source: "srd" },
  { id: "frog", name: "Grenouille", cr: 0, size: "TP", ac: 11, hp: 1, hd: "1d4-1", speed: { walk: 6, swim: 6 }, common: true, source: "srd" },
  { id: "sea-horse", name: "Hippocampe", cr: 0, size: "TP", ac: 11, hp: 1, hd: "1d4-1", speed: { swim: 6 }, common: true, source: "srd" },
  { id: "hyena", name: "Hyène", cr: 0, size: "M", ac: 11, hp: 5, hd: "1d8+1", speed: { walk: 15 }, common: true, source: "srd" },
  { id: "lizard", name: "Lézard", cr: 0, size: "TP", ac: 10, hp: 2, hd: "1d4", speed: { walk: 6, climb: 6 }, common: true, source: "srd" },
  { id: "octopus", name: "Pieuvre", cr: 0, size: "P", ac: 12, hp: 3, hd: "1d6", speed: { walk: 1.5, swim: 9 }, common: true, source: "srd" },
  { id: "quipper", name: "Piranha", cr: 0, size: "TP", ac: 13, hp: 1, hd: "1d4-1", speed: { swim: 12 }, common: true, source: "srd" },
  { id: "rat", name: "Rat", cr: 0, size: "TP", ac: 10, hp: 1, hd: "1d4-1", speed: { walk: 6 }, common: true, source: "srd" },
  { id: "giant-fire-beetle", name: "Scarabée de feu géant", cr: 0, size: "P", ac: 13, hp: 4, hd: "1d6+1", speed: { walk: 9 }, common: false, source: "srd" },
  { id: "scorpion", name: "Scorpion", cr: 0, size: "TP", ac: 11, hp: 1, hd: "1d4-1", speed: { walk: 3 }, common: true, source: "srd" },
  { id: "vulture", name: "Vautour", cr: 0, size: "M", ac: 10, hp: 5, hd: "1d8+1", speed: { walk: 3, fly: 15 }, common: true, source: "srd" },
  { id: "giant-weasel", name: "Belette géante", cr: 0.125, size: "M", ac: 13, hp: 9, hd: "2d8", speed: { walk: 12 }, common: false, source: "srd" },
  { id: "camel", name: "Chameau", cr: 0.125, size: "G", ac: 9, hp: 15, hd: "2d10+4", speed: { walk: 15 }, common: true, source: "srd" },
  { id: "giant-crab", name: "Crabe géant", cr: 0.125, size: "M", ac: 15, hp: 13, hd: "3d8", speed: { walk: 9, swim: 9 }, common: false, source: "srd" },
  { id: "blood-hawk", name: "Faucon de sang", cr: 0.125, size: "P", ac: 12, hp: 7, hd: "2d6", speed: { walk: 3, fly: 18 }, common: false, source: "srd" },
  { id: "mastiff", name: "Molosse", cr: 0.125, size: "M", ac: 12, hp: 5, hd: "1d8+1", speed: { walk: 12 }, common: true, source: "srd" },
  { id: "mule", name: "Mule", cr: 0.125, size: "M", ac: 10, hp: 11, hd: "2d8+2", speed: { walk: 12 }, common: true, source: "srd" },
  { id: "pony", name: "Poney", cr: 0.125, size: "M", ac: 10, hp: 11, hd: "2d8+2", speed: { walk: 12 }, common: true, source: "srd" },
  { id: "giant-rat", name: "Rat géant", cr: 0.125, size: "P", ac: 12, hp: 7, hd: "2d6", speed: { walk: 9 }, common: false, source: "srd" },
  { id: "poisonous-snake", name: "Serpent venimeux", cr: 0.125, size: "TP", ac: 13, hp: 2, hd: "1d4", speed: { walk: 9, swim: 9 }, common: true, source: "srd" },
  { id: "flying-snake", name: "Serpent volant", cr: 0.125, size: "TP", ac: 14, hp: 5, hd: "2d4", speed: { walk: 9, fly: 18, swim: 9 }, common: false, source: "srd" },
  { id: "stirge", name: "Strige", cr: 0.125, size: "TP", ac: 14, hp: 2, hd: "1d4", speed: { walk: 3, fly: 12 }, common: false, source: "srd" },
  { id: "giant-wolf-spider", name: "Araignée-loup géante", cr: 0.25, size: "M", ac: 13, hp: 11, hd: "2d8+2", speed: { walk: 12, climb: 12 }, common: false, source: "srd" },
  { id: "axe-beak", name: "Bec de hache", cr: 0.25, size: "G", ac: 11, hp: 19, hd: "3d10+3", speed: { walk: 15 }, common: false, source: "srd" },
  { id: "giant-badger", name: "Blaireau géant", cr: 0.25, size: "M", ac: 10, hp: 13, hd: "2d8+4", speed: { walk: 9, burrow: 3 }, common: false, source: "srd" },
  { id: "giant-bat", name: "Chauve-souris géante", cr: 0.25, size: "G", ac: 13, hp: 22, hd: "4d10", speed: { walk: 3, fly: 18 }, common: false, source: "srd" },
  { id: "riding-horse", name: "Cheval de selle", cr: 0.25, size: "G", ac: 10, hp: 13, hd: "2d10+2", speed: { walk: 18 }, common: true, source: "srd" },
  { id: "draft-horse", name: "Cheval de trait", cr: 0.25, size: "G", ac: 10, hp: 19, hd: "3d10+3", speed: { walk: 12 }, common: true, source: "srd" },
  { id: "giant-owl", name: "Chouette géante", cr: 0.25, size: "G", ac: 12, hp: 19, hd: "3d10+3", speed: { walk: 1.5, fly: 18 }, common: false, source: "srd" },
  { id: "giant-frog", name: "Grenouille géante", cr: 0.25, size: "M", ac: 11, hp: 18, hd: "4d8", speed: { walk: 9, swim: 9 }, common: false, source: "srd" },
  { id: "wolf", name: "Loup", cr: 0.25, size: "M", ac: 13, hp: 11, hd: "2d8+2", speed: { walk: 12 }, common: true, source: "srd" },
  { id: "giant-lizard", name: "Lézard géant", cr: 0.25, size: "G", ac: 12, hp: 19, hd: "3d10+3", speed: { walk: 9, climb: 9 }, common: false, source: "srd" },
  { id: "giant-centipede", name: "Mille-pattes géant", cr: 0.25, size: "P", ac: 13, hp: 4, hd: "1d6+1", speed: { walk: 9, climb: 9 }, common: false, source: "srd" },
  { id: "panther", name: "Panthère", cr: 0.25, size: "M", ac: 12, hp: 13, hd: "3d8", speed: { walk: 15, climb: 12 }, common: true, source: "srd" },
  { id: "pteranodon", name: "Ptéranodon", cr: 0.25, size: "M", ac: 13, hp: 13, hd: "3d8", speed: { walk: 3, fly: 18 }, common: false, source: "mm" },
  { id: "boar", name: "Sanglier", cr: 0.25, size: "M", ac: 11, hp: 11, hd: "2d8+2", speed: { walk: 12 }, common: true, source: "srd" },
  { id: "constrictor-snake", name: "Serpent constricteur", cr: 0.25, size: "G", ac: 12, hp: 13, hd: "2d10+2", speed: { walk: 9, swim: 9 }, common: true, source: "srd" },
  { id: "giant-poisonous-snake", name: "Serpent venimeux géant", cr: 0.25, size: "M", ac: 14, hp: 11, hd: "2d8+2", speed: { walk: 9, swim: 9 }, common: false, source: "srd" },
  { id: "elk", name: "Élan", cr: 0.25, size: "G", ac: 10, hp: 13, hd: "2d10+2", speed: { walk: 15 }, common: true, source: "srd" },
  { id: "warhorse", name: "Cheval de guerre", cr: 0.5, size: "G", ac: 11, hp: 19, hd: "3d10+3", speed: { walk: 18 }, common: true, source: "srd" },
  { id: "giant-goat", name: "Chèvre géante", cr: 0.5, size: "G", ac: 11, hp: 19, hd: "3d10+3", speed: { walk: 12 }, common: false, source: "srd" },
  { id: "crocodile", name: "Crocodile", cr: 0.5, size: "G", ac: 12, hp: 19, hd: "3d10+3", speed: { walk: 6, swim: 6 }, common: true, source: "srd" },
  { id: "ape", name: "Grand singe", cr: 0.5, size: "M", ac: 12, hp: 19, hd: "3d8+6", speed: { walk: 9, climb: 9 }, common: true, source: "srd" },
  { id: "giant-wasp", name: "Guêpe géante", cr: 0.5, size: "M", ac: 12, hp: 13, hd: "3d8", speed: { walk: 3, fly: 15, swim: 15 }, common: false, source: "srd" },
  { id: "giant-sea-horse", name: "Hippocampe géant", cr: 0.5, size: "G", ac: 13, hp: 16, hd: "3d10", speed: { swim: 12 }, common: false, source: "srd" },
  { id: "black-bear", name: "Ours noir", cr: 0.5, size: "M", ac: 11, hp: 19, hd: "3d8+6", speed: { walk: 12, climb: 9 }, common: true, source: "srd" },
  { id: "reef-shark", name: "Requin de récif", cr: 0.5, size: "M", ac: 12, hp: 22, hd: "4d8+4", speed: { swim: 12 }, common: true, source: "srd" },
  { id: "giant-eagle", name: "Aigle géant", cr: 1, size: "G", ac: 13, hp: 26, hd: "4d10+4", speed: { walk: 3, fly: 24 }, common: false, source: "srd" },
  { id: "giant-spider", name: "Araignée géante", cr: 1, size: "G", ac: 14, hp: 26, hd: "4d10+4", speed: { walk: 9, climb: 9 }, common: false, source: "srd" },
  { id: "giant-toad", name: "Crapaud géant", cr: 1, size: "G", ac: 11, hp: 39, hd: "6d10+6", speed: { walk: 6, swim: 12 }, common: false, source: "srd" },
  { id: "giant-hyena", name: "Hyène géante", cr: 1, size: "G", ac: 12, hp: 45, hd: "6d10+12", speed: { walk: 15 }, common: false, source: "srd" },
  { id: "lion", name: "Lion", cr: 1, size: "G", ac: 12, hp: 26, hd: "4d10+4", speed: { walk: 15 }, common: true, source: "srd" },
  { id: "dire-wolf", name: "Loup sanguinaire", cr: 1, size: "G", ac: 14, hp: 37, hd: "5d10+10", speed: { walk: 15 }, common: false, source: "srd" },
  { id: "brown-bear", name: "Ours brun", cr: 1, size: "G", ac: 11, hp: 34, hd: "4d10+12", speed: { walk: 12, climb: 9 }, common: true, source: "srd" },
  { id: "giant-octopus", name: "Pieuvre géante", cr: 1, size: "G", ac: 11, hp: 52, hd: "8d10+8", speed: { walk: 3, swim: 18 }, common: false, source: "srd" },
  { id: "tiger", name: "Tigre", cr: 1, size: "G", ac: 12, hp: 37, hd: "5d10+10", speed: { walk: 12 }, common: true, source: "srd" },
  { id: "giant-vulture", name: "Vautour géant", cr: 1, size: "G", ac: 10, hp: 22, hd: "3d10+6", speed: { walk: 3, fly: 18 }, common: false, source: "srd" },
  { id: "allosaurus", name: "Allosaure", cr: 2, size: "G", ac: 13, hp: 51, hd: "6d10+18", speed: { walk: 18 }, common: false, source: "mm" },
  { id: "polar-bear", name: "Ours polaire", cr: 2, size: "G", ac: 12, hp: 42, hd: "5d10+15", speed: { walk: 12, swim: 9 }, common: true, source: "srd" },
  { id: "plesiosaurus", name: "Plésiosaure", cr: 2, size: "G", ac: 13, hp: 68, hd: "8d10+24", speed: { walk: 6, swim: 12 }, common: false, source: "srd" },
  { id: "hunter-shark", name: "Requin-chasseur", cr: 2, size: "G", ac: 12, hp: 45, hd: "6d10+12", speed: { swim: 12 }, common: true, source: "srd" },
  { id: "rhinoceros", name: "Rhinocéros", cr: 2, size: "G", ac: 11, hp: 45, hd: "6d10+12", speed: { walk: 12 }, common: true, source: "srd" },
  { id: "giant-boar", name: "Sanglier géant", cr: 2, size: "G", ac: 12, hp: 42, hd: "5d10+15", speed: { walk: 12 }, common: false, source: "srd" },
  { id: "giant-constrictor-snake", name: "Serpent constricteur géant", cr: 2, size: "TG", ac: 12, hp: 60, hd: "8d12+8", speed: { walk: 9, swim: 9 }, common: false, source: "srd" },
  { id: "saber-toothed-tiger", name: "Tigre à dents de sabre", cr: 2, size: "G", ac: 12, hp: 52, hd: "7d10+14", speed: { walk: 12 }, common: false, source: "srd" },
  { id: "giant-elk", name: "Élan géant", cr: 2, size: "TG", ac: 14, hp: 42, hd: "5d12+10", speed: { walk: 18 }, common: false, source: "srd" },
  { id: "ankylosaurus", name: "Ankylosaure", cr: 3, size: "TG", ac: 15, hp: 68, hd: "8d12+16", speed: { walk: 9 }, common: false, source: "mm" },
  { id: "giant-scorpion", name: "Scorpion géant", cr: 3, size: "G", ac: 15, hp: 52, hd: "7d10+14", speed: { walk: 12 }, common: false, source: "srd" },
  { id: "killer-whale", name: "Épaulard", cr: 3, size: "TG", ac: 12, hp: 90, hd: "12d12+12", speed: { swim: 18 }, common: true, source: "srd" },
  { id: "elephant", name: "Éléphant", cr: 4, size: "TG", ac: 12, hp: 76, hd: "8d12+24", speed: { walk: 12 }, common: true, source: "srd" },
  { id: "giant-crocodile", name: "Crocodile géant", cr: 5, size: "TG", ac: 14, hp: 85, hd: "9d12+27", speed: { walk: 9, swim: 15 }, common: false, source: "srd" },
  { id: "giant-shark", name: "Requin géant", cr: 5, size: "TG", ac: 13, hp: 126, hd: "11d12+55", speed: { swim: 15 }, common: false, source: "srd" },
  { id: "triceratops", name: "Tricératops", cr: 5, size: "TG", ac: 13, hp: 95, hd: "10d12+30", speed: { walk: 15 }, common: false, source: "srd" },
  { id: "mammoth", name: "Mammouth", cr: 6, size: "TG", ac: 13, hp: 126, hd: "11d12+55", speed: { walk: 12 }, common: false, source: "srd" },
  { id: "giant-ape", name: "Singe géant", cr: 7, size: "TG", ac: 12, hp: 157, hd: "15d12+60", speed: { walk: 12, climb: 12 }, common: false, source: "srd" },
  { id: "tyrannosaurus-rex", name: "Tyrannosaure", cr: 8, size: "TG", ac: 13, hp: 136, hd: "13d12+52", speed: { walk: 15 }, common: false, source: "srd" },
];


// Module : races
/** Races et sous-races jouables du Manuel des joueurs 2014.
 * Résumés originaux : aides de jeu, pas une reproduction du livre.
 * Format : voir le contrat de données (objet « grants »).
 */
const _racesTrait = {
  darkvision: [
    "Vision dans le noir",
    "Jusqu’à 18 m, tu vois en lumière faible comme en lumière vive et dans l’obscurité comme en lumière faible, sans distinguer les couleurs.",
  ],
  dwarfSpeed: ["Vitesse", "7,50 m, et le port d’une armure lourde ne la réduit pas."],
  dwarfResilience: ["Résistance naine", "Avantage aux sauvegardes contre le poison et résistance aux dégâts de poison."],
  dwarfWeapons: [
    "Entraînement aux armes naines",
    "Maîtrise de la hache d’armes, de la hachette, du marteau léger et du marteau de guerre.",
  ],
  dwarfTools: [
    "Maîtrise des outils",
    "Un outil d’artisan au choix : outils de forgeron, matériel de brasseur ou outils de maçon.",
  ],
  stonecunning: [
    "Connaissance de la pierre",
    "Pour un test d’Intelligence (Histoire) sur l’origine d’un ouvrage en pierre, tu es considéré comme maîtrisant la compétence et tu doubles ton bonus de maîtrise.",
  ],
  keenSenses: ["Sens aiguisés", "Maîtrise de la compétence Perception."],
  feyAncestry: ["Ascendance féerique", "Avantage aux sauvegardes contre l’état charmé, et la magie ne peut pas t’endormir."],
  trance: [
    "Transe",
    "Tu ne dors pas : 4 heures de méditation, en restant à demi conscient, te reposent autant que 8 heures de sommeil.",
  ],
  elfWeapons: [
    "Entraînement aux armes elfiques",
    "Maîtrise de l’épée longue, de l’épée courte, de l’arc court et de l’arc long.",
  ],
  lucky: [
    "Chanceux",
    "Quand tu obtiens 1 au d20 sur un jet d’attaque, un test de caractéristique ou un jet de sauvegarde, tu relances le dé et tu dois garder le nouveau résultat.",
  ],
  brave: ["Brave", "Avantage aux sauvegardes contre l’état effrayé."],
  nimbleness: ["Agilité halfeline", "Tu peux traverser l’espace de toute créature d’une taille supérieure à la tienne."],
  gnomeCunning: ["Ruse gnome", "Avantage aux sauvegardes d’Intelligence, de Sagesse et de Charisme contre la magie."],
};
const _racesDwarfWeapons = ["battleaxe", "handaxe", "light-hammer", "warhammer"];
const _racesDwarfTools = { count: 1, from: ["smiths-tools", "brewers-supplies", "masons-tools"] };
const _racesElfWeapons = ["longsword", "shortsword", "shortbow", "longbow"];

const RACES = {
  human: {
    name: "Humain",
    group: "Humain",
    source: "srd",
    subtitle: "La polyvalence avant tout",
    desc: "Un +1 à chaque caractéristique et une langue de plus : aucune faiblesse, aucune spécialité. Une bonne origine pour découvrir n’importe quelle classe.",
    size: "M",
    speed: 9,
    traits: [
      ["Augmentation de caractéristiques", "+1 à chacune des six caractéristiques."],
      ["Langues", "Commun, plus une langue de ton choix."],
    ],
    grants: {
      abilities: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
      languages: ["common"],
      languageChoice: { count: 1 },
    },
  },
  humanVariant: {
    name: "Humain variante",
    group: "Humain",
    source: "phb",
    subtitle: "Un don dès le départ",
    desc: "Deux +1 au choix, une compétence et surtout un don dès le niveau 1. Règle optionnelle à valider avec le MJ, idéale pour bâtir un concept précis.",
    size: "M",
    speed: 9,
    traits: [
      ["Augmentation de caractéristiques", "+1 à deux caractéristiques différentes de ton choix."],
      ["Compétence", "Maîtrise d’une compétence de ton choix."],
      ["Don", "Un don de ton choix, dont tu dois remplir les prérequis."],
      ["Langues", "Commun, plus une langue de ton choix."],
    ],
    grants: {
      abilityChoice: { count: 2, amount: 1 },
      skillChoice: { count: 1 },
      feat: 1,
      languages: ["common"],
      languageChoice: { count: 1 },
    },
  },
  hillDwarf: {
    name: "Nain des collines",
    group: "Nain",
    source: "srd",
    subtitle: "Solide, endurant, perspicace",
    desc: "Des PV en plus à chaque niveau, de la Sagesse et une forte résistance au poison. Parfait pour un clerc, un druide ou tout personnage qui doit tenir la ligne.",
    size: "M",
    speed: 7.5,
    traits: [
      _racesTrait.dwarfSpeed,
      _racesTrait.darkvision,
      _racesTrait.dwarfResilience,
      _racesTrait.dwarfWeapons,
      _racesTrait.dwarfTools,
      _racesTrait.stonecunning,
      ["Ténacité naine", "+1 PV maximum par niveau de personnage, rétroactivement."],
    ],
    grants: {
      abilities: { con: 2, wis: 1 },
      darkvision: 18,
      hpPerLevel: 1,
      resistances: ["poison"],
      weapons: _racesDwarfWeapons,
      toolChoice: _racesDwarfTools,
      languages: ["common", "dwarvish"],
      heavyArmorNoSpeedPenalty: true,
    },
  },
  mountainDwarf: {
    name: "Nain des montagnes",
    group: "Nain",
    source: "phb",
    subtitle: "Force, armure et ténacité",
    desc: "+2 en Force et en Constitution, plus les armures légères et intermédiaires. Idéal pour un guerrier ou un paladin, précieux pour un lanceur de sorts peu protégé.",
    size: "M",
    speed: 7.5,
    traits: [
      _racesTrait.dwarfSpeed,
      _racesTrait.darkvision,
      _racesTrait.dwarfResilience,
      _racesTrait.dwarfWeapons,
      _racesTrait.dwarfTools,
      _racesTrait.stonecunning,
      ["Formation au port des armures naines", "Maîtrise des armures légères et intermédiaires."],
    ],
    grants: {
      abilities: { con: 2, str: 2 },
      darkvision: 18,
      resistances: ["poison"],
      armor: ["light", "medium"],
      weapons: _racesDwarfWeapons,
      toolChoice: _racesDwarfTools,
      languages: ["common", "dwarvish"],
      heavyArmorNoSpeedPenalty: true,
    },
  },
  highElf: {
    name: "Haut-elfe",
    group: "Elfe",
    source: "srd",
    subtitle: "Précision et affinité magique",
    desc: "Dextérité, Intelligence, un sort mineur de magicien et une langue de plus. Convient au magicien, à l’archer ou au roublard érudit.",
    size: "M",
    speed: 9,
    traits: [
      _racesTrait.darkvision,
      _racesTrait.keenSenses,
      _racesTrait.feyAncestry,
      _racesTrait.trance,
      _racesTrait.elfWeapons,
      ["Sort mineur", "Un sort mineur de la liste du magicien, au choix ; caractéristique d’incantation : Intelligence."],
      ["Langue supplémentaire", "Une langue de plus, au choix."],
    ],
    grants: {
      abilities: { dex: 2, int: 1 },
      darkvision: 18,
      skills: ["perception"],
      weapons: _racesElfWeapons,
      cantripChoice: { count: 1, list: "wizard", ability: "int" },
      languages: ["common", "elvish"],
      languageChoice: { count: 1 },
    },
  },
  woodElf: {
    name: "Elfe des bois",
    group: "Elfe",
    source: "phb",
    subtitle: "Rapide, discret, sylvestre",
    desc: "Dextérité, Sagesse et 10,50 m de vitesse, avec l’art de se fondre dans la nature. Parfait pour un rôdeur, un moine ou un druide.",
    size: "M",
    speed: 10.5,
    traits: [
      _racesTrait.darkvision,
      _racesTrait.keenSenses,
      _racesTrait.feyAncestry,
      _racesTrait.trance,
      _racesTrait.elfWeapons,
      ["Foulée légère", "Ta vitesse de base passe à 10,50 m."],
      [
        "Cachette naturelle",
        "Tu peux tenter de te cacher même si seul un phénomène naturel te masque légèrement : feuillage, forte pluie, chute de neige, brume, etc.",
      ],
    ],
    grants: {
      abilities: { dex: 2, wis: 1 },
      darkvision: 18,
      skills: ["perception"],
      weapons: _racesElfWeapons,
      languages: ["common", "elvish"],
    },
  },
  drow: {
    name: "Elfe noir (drow)",
    group: "Elfe",
    source: "phb",
    subtitle: "Magie innée des profondeurs",
    desc: "Dextérité, Charisme, vision dans le noir à 36 m et magie innée, au prix d’une vraie gêne en plein soleil. Pour un ensorceleur, un occultiste ou un roublard des ombres.",
    size: "M",
    speed: 9,
    traits: [
      ["Vision dans le noir supérieure", "Comme la vision dans le noir, mais jusqu’à 36 m."],
      _racesTrait.keenSenses,
      _racesTrait.feyAncestry,
      _racesTrait.trance,
      [
        "Sensibilité au soleil",
        "Désavantage aux jets d’attaque et aux tests de Sagesse (Perception) basés sur la vue quand toi, ta cible ou ce que tu cherches à percevoir êtes en plein soleil.",
      ],
      [
        "Magie drow",
        "Sort mineur lumières dansantes. Au niveau 3 : lueurs féeriques, une fois par repos long. Au niveau 5 : ténèbres, une fois par repos long. Caractéristique d’incantation : Charisme.",
      ],
      ["Entraînement aux armes drows", "Maîtrise de la rapière, de l’épée courte et de l’arbalète de poing."],
    ],
    grants: {
      abilities: { dex: 2, cha: 1 },
      darkvision: 36,
      skills: ["perception"],
      weapons: ["rapier", "shortsword", "hand-crossbow"],
      cantrips: [{ id: "dancing-lights", ability: "cha" }],
      innateSpells: [
        { id: "faerie-fire", minLevel: 3, ability: "cha", castLevel: 1, reset: "long" },
        { id: "darkness", minLevel: 5, ability: "cha", castLevel: 2, reset: "long" },
      ],
      languages: ["common", "elvish"],
    },
  },
  lightfoot: {
    name: "Halfelin pied-léger",
    group: "Halfelin",
    source: "srd",
    subtitle: "Discret, chanceux, insaisissable",
    desc: "Dextérité, Charisme et une chance qui efface les 1 naturels. Le roublard, le barde ou l’occultiste idéal, capable de se cacher derrière ses alliés.",
    size: "P",
    speed: 7.5,
    traits: [
      _racesTrait.lucky,
      _racesTrait.brave,
      _racesTrait.nimbleness,
      ["Discrétion naturelle", "Tu peux tenter de te cacher derrière une créature d’au moins une taille de plus que toi."],
    ],
    grants: {
      abilities: { dex: 2, cha: 1 },
      languages: ["common", "halfling"],
    },
  },
  stout: {
    name: "Halfelin robuste",
    group: "Halfelin",
    source: "phb",
    subtitle: "Petit, chanceux et coriace",
    desc: "Dextérité, Constitution et la chance halfeline, avec une résistance au poison digne d’un nain. Un petit aventurier coriace, très bon roublard ou rôdeur.",
    size: "P",
    speed: 7.5,
    traits: [
      _racesTrait.lucky,
      _racesTrait.brave,
      _racesTrait.nimbleness,
      ["Résistance des robustes", "Avantage aux sauvegardes contre le poison et résistance aux dégâts de poison."],
    ],
    grants: {
      abilities: { dex: 2, con: 1 },
      resistances: ["poison"],
      languages: ["common", "halfling"],
    },
  },
  dragonborn: {
    name: "Drakéide",
    group: "Drakéide",
    source: "srd",
    subtitle: "Un héritage draconique",
    desc: "Force, Charisme et un souffle draconique qui frappe toute une zone. Taillé pour le paladin, le guerrier ou l’ensorceleur.",
    size: "M",
    speed: 9,
    dragonChoice: true,
    traits: [
      [
        "Ascendance draconique",
        "Choisis un type de dragon : il fixe le type de dégâts et la forme de ton souffle, ainsi que ta résistance.",
      ],
      [
        "Souffle",
        "Une action, une fois par repos court ou long : ligne de 1,50 × 9 m ou cône de 4,50 m selon l’ascendance. Sauvegarde de DEX ou de CON selon l’ascendance, DD 8 + mod. de CON + bonus de maîtrise ; 2d6 dégâts, moitié en cas de réussite. 3d6 au niveau 6, 4d6 au niveau 11, 5d6 au niveau 16.",
      ],
      ["Résistance aux dégâts", "Résistance au type de dégâts associé à ton ascendance."],
    ],
    grants: {
      abilities: { str: 2, cha: 1 },
      languages: ["common", "draconic"],
    },
  },
  forestGnome: {
    name: "Gnome des forêts",
    group: "Gnome",
    source: "phb",
    subtitle: "Illusions et amis des bois",
    desc: "Intelligence, Dextérité, résistance mentale à la magie et illusions innées. Idéal pour un magicien illusionniste ou un roublard malicieux.",
    size: "P",
    speed: 7.5,
    traits: [
      _racesTrait.darkvision,
      _racesTrait.gnomeCunning,
      ["Illusionniste-né", "Tu connais le sort mineur illusion mineure ; caractéristique d’incantation : Intelligence."],
      [
        "Communication avec les petits animaux",
        "Par des sons et des gestes, tu transmets des idées simples aux bêtes de taille P ou inférieure.",
      ],
    ],
    grants: {
      abilities: { int: 2, dex: 1 },
      darkvision: 18,
      cantrips: [{ id: "minor-illusion", ability: "int" }],
      languages: ["common", "gnomish"],
    },
  },
  rockGnome: {
    name: "Gnome des roches",
    group: "Gnome",
    source: "srd",
    subtitle: "Ingéniosité et ténacité",
    desc: "Intelligence, Constitution, résistance mentale à la magie et talents d’inventeur. Un magicien ou un érudit plus robuste que la moyenne.",
    size: "P",
    speed: 7.5,
    traits: [
      _racesTrait.darkvision,
      _racesTrait.gnomeCunning,
      [
        "Connaissance en ingénierie",
        "Pour un test d’Intelligence (Histoire) sur un objet magique, alchimique ou technologique, tu ajoutes le double de ton bonus de maîtrise au lieu de l’éventuel bonus habituel.",
      ],
      [
        "Bricoleur",
        "Maîtrise des outils de bricoleur. En 1 heure et avec 10 po de matériaux, tu fabriques un mécanisme de taille TP (CA 5, 1 PV) : jouet mécanique, allume-feu ou boîte à musique. Il cesse de fonctionner après 24 heures, sauf si tu passes 1 heure à l’entretenir ; une action suffit pour le démonter et récupérer les matériaux. Trois mécanismes actifs au maximum.",
      ],
    ],
    grants: {
      abilities: { int: 2, con: 1 },
      darkvision: 18,
      tools: ["tinkers-tools"],
      languages: ["common", "gnomish"],
    },
  },
  halfElf: {
    name: "Demi-elfe",
    group: "Demi-elfe",
    source: "srd",
    subtitle: "Charisme et talents au choix",
    desc: "+2 en Charisme, +1 à deux autres caractéristiques et deux compétences au choix. Une origine souple, taillée pour le barde, le paladin, l’ensorceleur ou l’occultiste.",
    size: "M",
    speed: 9,
    traits: [
      ["Augmentation de caractéristiques", "+2 en Charisme et +1 à deux autres caractéristiques différentes, au choix."],
      _racesTrait.darkvision,
      _racesTrait.feyAncestry,
      ["Polyvalence", "Maîtrise de deux compétences de ton choix."],
      ["Langues", "Commun, elfique et une langue de ton choix."],
    ],
    grants: {
      abilities: { cha: 2 },
      abilityChoice: { count: 2, amount: 1, from: ["str", "dex", "con", "int", "wis"] },
      darkvision: 18,
      skillChoice: { count: 2 },
      languages: ["common", "elvish"],
      languageChoice: { count: 1 },
    },
  },
  halfOrc: {
    name: "Demi-orc",
    group: "Demi-orc",
    source: "srd",
    subtitle: "Force et refus de tomber",
    desc: "Force, Constitution, critiques dévastateurs et refus de tomber à 0 PV. Parfait pour un barbare, un guerrier ou un paladin.",
    size: "M",
    speed: 9,
    traits: [
      _racesTrait.darkvision,
      ["Menaçant", "Maîtrise de la compétence Intimidation."],
      [
        "Endurance implacable",
        "Quand tu tombes à 0 PV sans être tué sur le coup, tu peux rester à 1 PV à la place. Une fois par repos long.",
      ],
      [
        "Attaques sauvages",
        "Sur un coup critique avec une arme de corps à corps, tu lances un dé de dégâts de l’arme de plus et tu l’ajoutes aux dégâts du critique.",
      ],
    ],
    grants: {
      abilities: { str: 2, con: 1 },
      darkvision: 18,
      skills: ["intimidation"],
      languages: ["common", "orc"],
      resources: [
        {
          id: "relentlessEndurance",
          name: "Endurance implacable",
          max: 1,
          reset: "long",
          note: "À 0 PV sans mourir sur le coup : tu restes à 1 PV.",
        },
      ],
    },
  },
  tiefling: {
    name: "Tieffelin",
    group: "Tieffelin",
    source: "srd",
    subtitle: "Présence et héritage infernal",
    desc: "Charisme, Intelligence, résistance au feu et magie infernale innée. Un choix naturel pour l’occultiste, l’ensorceleur ou le barde.",
    size: "M",
    speed: 9,
    traits: [
      _racesTrait.darkvision,
      ["Résistance infernale", "Résistance aux dégâts de feu."],
      [
        "Ascendance infernale",
        "Sort mineur thaumaturgie. Au niveau 3 : représailles infernales, lancé comme un sort de niveau 2, une fois par repos long. Au niveau 5 : ténèbres, une fois par repos long. Caractéristique d’incantation : Charisme.",
      ],
    ],
    grants: {
      abilities: { int: 1, cha: 2 },
      darkvision: 18,
      resistances: ["feu"],
      cantrips: [{ id: "thaumaturgy", ability: "cha" }],
      innateSpells: [
        { id: "hellish-rebuke", minLevel: 3, ability: "cha", castLevel: 2, reset: "long" },
        { id: "darkness", minLevel: 5, ability: "cha", castLevel: 2, reset: "long" },
      ],
      languages: ["common", "infernal"],
    },
  },
};


// Module : backgrounds
/** Historiques du Manuel des joueurs 2014.
 * Résumés originaux : aides de jeu, pas une reproduction du livre.
 * Les tables de traits de personnalité, idéaux, liens et défauts ne sont pas reprises.
 */
const BACKGROUNDS = {
  acolyte: {
    name: "Acolyte",
    source: "srd",
    desc: "Tu as servi dans un temple : tu connais ses rites, ses textes sacrés et la communauté de ses fidèles.",
    skills: ["insight", "religion"],
    grants: { languageChoice: { count: 2 } },
    feature: [
      "Abri du fidèle",
      "Les fidèles de ta religion te respectent et t’entretiennent, toi seul, à un train de vie modeste. Toi et ton groupe êtes soignés gratuitement dans les lieux de culte de ta foi (composantes matérielles à ta charge). Tu es lié à un temple où tu as une résidence et dont les prêtres t’aident, tant que la demande n’est pas dangereuse et que tu restes en bons termes avec eux.",
    ],
    equipment:
      "Symbole sacré, livre de prières ou moulin à prières, 5 bâtonnets d’encens, habits de cérémonie, vêtements communs, bourse",
    gold: 15,
    variants: [],
  },
  charlatan: {
    name: "Charlatan",
    source: "phb",
    desc: "Escroc de talent, tu sais mentir avec aplomb, changer d’apparence et vivre sous une fausse identité.",
    skills: ["deception", "sleight"],
    grants: { tools: ["disguise-kit", "forgery-kit"] },
    feature: [
      "Fausse identité",
      "Tu disposes d’une seconde identité complète : papiers, relations établies et déguisements pour l’endosser. Tu sais aussi contrefaire documents officiels et lettres personnelles, à condition d’avoir vu un modèle du document ou de l’écriture à imiter.",
    ],
    equipment:
      "Vêtements fins, kit de déguisement, accessoires d’escroquerie au choix (10 fioles bouchées de liquide coloré, dés pipés, jeu de cartes marquées ou chevalière d’un duc imaginaire), bourse",
    gold: 15,
    variants: [],
  },
  criminal: {
    name: "Criminel",
    source: "phb",
    desc: "Voleur, contrebandier ou receleur, tu as vécu en marge de la loi et tu connais les réseaux de la pègre.",
    skills: ["deception", "stealth"],
    grants: { tools: ["thieves-tools"], toolChoice: { count: 1, from: "gaming" } },
    feature: [
      "Accointances avec la pègre",
      "Tu as un contact sûr qui te relie à un réseau de criminels. Tu sais lui faire parvenir des messages et recevoir les siens, même de très loin, grâce à des messagers, des caravaniers corrompus et des marins louches que tu connais.",
    ],
    equipment: "Pied-de-biche, vêtements communs sombres avec capuche, bourse",
    gold: 15,
    variants: [
      {
        id: "spy",
        name: "Espion",
        note: "Mêmes maîtrises et même aptitude : tu as exercé ces talents comme agent de renseignement plutôt que comme criminel.",
      },
    ],
  },
  entertainer: {
    name: "Artiste",
    source: "phb",
    desc: "Musicien, acrobate, conteur ou comédien, tu vis de tes représentations et de l’enthousiasme du public.",
    skills: ["acrobatics", "performance"],
    grants: { tools: ["disguise-kit"], toolChoice: { count: 1, from: "music" } },
    feature: [
      "À la demande du public",
      "Tu trouves toujours où te produire : auberge, cirque, théâtre, voire cour noble. Si tu joues chaque soir, tu y es logé et nourri gratuitement, à un niveau modeste ou confortable selon l’établissement. Dans les villes où tu t’es produit, ceux qui te reconnaissent te sont en général favorables.",
    ],
    equipment:
      "Instrument de musique au choix, gage d’un admirateur (lettre d’amour, mèche de cheveux ou babiole), costume, bourse",
    gold: 15,
    variants: [
      {
        id: "gladiator",
        name: "Gladiateur",
        note: "Ton numéro est un combat spectaculaire, dans une arène ou des combats clandestins. Tu peux remplacer l’instrument de musique de ton équipement par une arme bon marché mais insolite, comme un trident ou un filet.",
      },
    ],
  },
  folkHero: {
    name: "Héros du peuple",
    source: "phb",
    desc: "Issu des gens simples, tu t’es dressé contre une injustice et le peuple te considère comme l’un des siens.",
    skills: ["animal", "survival"],
    grants: { tools: ["vehicles-land"], toolChoice: { count: 1, from: "artisan" } },
    feature: [
      "Hospitalité rustique",
      "Tu te fonds sans peine parmi les gens du peuple : ils t’offrent une cachette, un lit ou un endroit où te remettre, et te protègent de la loi ou de tes poursuivants, sans toutefois risquer leur vie pour toi. Cela ne vaut plus si tu t’es montré dangereux pour eux.",
    ],
    equipment: "Outils d’artisan au choix, pelle, pot en fer, vêtements communs, bourse",
    gold: 10,
    variants: [],
  },
  guildArtisan: {
    name: "Artisan de guilde",
    source: "phb",
    desc: "Artisan reconnu au sein d’une guilde, tu maîtrises un métier et connais les réseaux du commerce.",
    skills: ["insight", "persuasion"],
    grants: { toolChoice: { count: 1, from: "artisan" }, languageChoice: { count: 1 } },
    feature: [
      "Membre de guilde",
      "Les membres de ta guilde te logent et te nourrissent au besoin, et paient tes funérailles. La guilde te soutient si tu es accusé d’un crime et que ton innocence ou ta cause est défendable, et peut t’ouvrir les portes de personnages politiques puissants (souvent contre un don). Cotisation : 5 po par mois ; les retards doivent être rattrapés pour garder ses faveurs.",
    ],
    equipment: "Outils d’artisan au choix, lettre de recommandation de ta guilde, vêtements de voyage, bourse",
    gold: 15,
    variants: [
      {
        id: "guildMerchant",
        name: "Marchand de guilde",
        note: "Guilde de négociants, de caravaniers ou de boutiquiers. Au lieu de la maîtrise d’un outil d’artisan, tu peux prendre les outils de navigateur ou une langue de plus ; au lieu des outils d’artisan de ton équipement, une mule et une charrette.",
      },
    ],
  },
  hermit: {
    name: "Ermite",
    source: "phb",
    desc: "Tu as vécu des années à l’écart du monde, et ta retraite t’a mené à une découverte singulière.",
    skills: ["medicine", "religion"],
    grants: { tools: ["herbalism-kit"], languageChoice: { count: 1 } },
    feature: [
      "Découverte",
      "Ta longue retraite t’a révélé un secret unique et puissant : une vérité sur le cosmos ou les dieux, un lieu que nul n’a vu, un fait oublié ou une relique capable de réécrire l’histoire. Sa nature et ses conséquences se définissent avec le MJ.",
    ],
    equipment:
      "Étui à parchemins rempli de notes d’études ou de prières, couverture d’hiver, vêtements communs, kit d’herboriste",
    gold: 5,
    variants: [],
  },
  noble: {
    name: "Noble",
    source: "phb",
    desc: "Né dans une famille titrée, tu connais l’étiquette, les intrigues du pouvoir et les privilèges de ton rang.",
    skills: ["history", "persuasion"],
    grants: { toolChoice: { count: 1, from: "gaming" }, languageChoice: { count: 1 } },
    feature: [
      "Apanage de la noblesse",
      "Ton rang dispose les gens en ta faveur : la haute société t’accueille, on présume que tu as le droit d’être là où tu te trouves, et les gens du peuple s’efforcent de te satisfaire. Tu peux obtenir une audience auprès d’un noble local si nécessaire.",
    ],
    equipment: "Vêtements fins, chevalière, parchemin de généalogie, bourse",
    gold: 25,
    variants: [
      {
        id: "knight",
        name: "Chevalier",
        note: "Chevalier lié à un suzerain. Prends l’aptitude Domestiques à la place d’Apanage de la noblesse : l’un de tes trois serviteurs est un écuyer de naissance noble, les deux autres peuvent être un palefrenier et un valet d’armes.",
        feature: [
          "Domestiques",
          "Trois serviteurs fidèles à ta famille accomplissent pour toi les tâches courantes (messages, intendance, service). Ils ne combattent pas, ne te suivent pas dans les lieux manifestement dangereux et te quittent si tu les mets souvent en danger ou si tu les maltraites.",
        ],
      },
    ],
  },
  outlander: {
    name: "Sauvageon",
    source: "phb",
    desc: "Élevé loin de la civilisation, tu sais te repérer et survivre dans les terres sauvages.",
    skills: ["athletics", "survival"],
    grants: { toolChoice: { count: 1, from: "music" }, languageChoice: { count: 1 } },
    feature: [
      "Éternel vagabond",
      "Ta mémoire des cartes et des lieux est excellente : tu te souviens toujours de la disposition générale du terrain, des habitations et des points notables autour de toi. Chaque jour, tu trouves de quoi manger et de l’eau potable pour toi et jusqu’à cinq autres personnes, si la nature en offre.",
    ],
    equipment: "Bâton, piège à mâchoires, trophée d’un animal que tu as tué, vêtements de voyage, bourse",
    gold: 10,
    variants: [],
  },
  sage: {
    name: "Sage",
    source: "phb",
    desc: "Érudit, tu as consacré des années à l’étude et tu sais où chercher le savoir qui te manque.",
    skills: ["arcana", "history"],
    grants: { languageChoice: { count: 2 } },
    feature: [
      "Chercheur",
      "Quand tu ignores une information, tu sais souvent où et auprès de qui l’obtenir : bibliothèque, scriptorium, université, savant. Le MJ peut décider qu’elle est presque inaccessible, voire introuvable, ou qu’il faut une aventure pour la découvrir.",
    ],
    equipment:
      "Bouteille d’encre noire, plume d’écriture, petit couteau, lettre d’un collègue mort posant une question encore sans réponse, vêtements communs, bourse",
    gold: 10,
    variants: [],
  },
  sailor: {
    name: "Marin",
    source: "phb",
    desc: "Tu as navigué des années sur un navire, rompu aux manœuvres, aux tempêtes et à la vie d’équipage.",
    skills: ["athletics", "perception"],
    grants: { tools: ["navigators-tools", "vehicles-water"] },
    feature: [
      "Place à bord",
      "Tu obtiens au besoin un passage gratuit sur un voilier pour toi et tes compagnons, en échange d’un coup de main à l’équipage pendant le voyage. Comme c’est une faveur, ni la date ni l’itinéraire ne sont garantis : le MJ fixe la durée du trajet.",
    ],
    equipment:
      "Cabillot (s’utilise comme un gourdin), 15 m de corde en soie, porte-bonheur (patte de lapin, pierre percée ou babiole), vêtements communs, bourse",
    gold: 10,
    variants: [
      {
        id: "pirate",
        name: "Pirate",
        note: "Tu as écumé les mers comme pirate. Tu peux prendre l’aptitude Mauvaise réputation à la place de Place à bord.",
        feature: [
          "Mauvaise réputation",
          "Ta réputation fait peur : dans une ville, tu peux commettre de petits délits (refuser de payer ton repas, enfoncer la porte d’une échoppe) sans être inquiété, car la plupart des gens n’osent pas te dénoncer.",
        ],
      },
    ],
  },
  soldier: {
    name: "Soldat",
    source: "phb",
    desc: "Ancien militaire, tu as connu la guerre, la discipline et la hiérarchie des armées.",
    skills: ["athletics", "intimidation"],
    grants: { tools: ["vehicles-land"], toolChoice: { count: 1, from: "gaming" } },
    feature: [
      "Grade militaire",
      "Tu as conservé ton grade : les soldats fidèles à ton ancienne armée reconnaissent ton autorité et ceux de rang inférieur t’obéissent. Tu peux réquisitionner temporairement du matériel simple ou des chevaux, et tu as en général accès aux camps et forteresses alliés.",
    ],
    equipment:
      "Insigne de grade, trophée pris à un ennemi (dague, lame brisée ou morceau d’étendard), dés en os ou jeu de cartes, vêtements communs, bourse",
    gold: 10,
    variants: [],
  },
  urchin: {
    name: "Enfant des rues",
    source: "phb",
    desc: "Orphelin livré à lui-même, tu as survécu en ville grâce à ta ruse, ta discrétion et tes doigts agiles.",
    skills: ["sleight", "stealth"],
    grants: { tools: ["disguise-kit", "thieves-tools"] },
    feature: [
      "Secrets de la ville",
      "Tu connais les raccourcis et les passages cachés des villes. Hors combat, toi et les compagnons que tu guides vous déplacez entre deux points d’une ville deux fois plus vite que la normale.",
    ],
    equipment:
      "Petit couteau, carte de ta ville natale, souris apprivoisée, souvenir de tes parents, vêtements communs, bourse",
    gold: 10,
    variants: [],
  },
};


// Module : feats
/** Dons du Manuel des joueurs 2014 (42).
 * Résumés originaux : aides de jeu, pas une reproduction du livre.
 * Ce qui se chiffre est dans « grants » ; le reste est décrit dans « summary ».
 */
const _featsManeuvers = {
  menacingAttack: [
    "Attaque menaçante",
    "Quand tu touches avec une arme, ajoute le dé aux dégâts ; la cible fait une sauvegarde de Sagesse ou est effrayée par toi jusqu’à la fin de ton prochain tour.",
  ],
  precisionAttack: [
    "Attaque précise",
    "Ajoute le dé à un jet d’attaque avec une arme, avant ou après le jet, mais avant que ses effets ne soient appliqués.",
  ],
  sweepingAttack: [
    "Balayage",
    "Quand tu touches au corps à corps, choisis une autre créature à 1,50 m de la cible et à ton allonge : si ton jet d’attaque l’aurait touchée, elle subit des dégâts égaux au dé, du même type.",
  ],
  tripAttack: [
    "Croc-en-jambe",
    "Quand tu touches avec une arme, ajoute le dé aux dégâts ; une cible de taille G ou inférieure fait une sauvegarde de Force ou tombe à terre.",
  ],
  disarmingAttack: [
    "Désarmement",
    "Quand tu touches avec une arme, ajoute le dé aux dégâts ; la cible fait une sauvegarde de Force ou lâche à ses pieds un objet qu’elle tient, à ton choix.",
  ],
  distractingStrike: [
    "Diversion",
    "Quand tu touches avec une arme, ajoute le dé aux dégâts ; la prochaine attaque d’un autre que toi contre cette cible, avant le début de ton prochain tour, a l’avantage.",
  ],
  feintingAttack: [
    "Feinte",
    "Action bonus : vise une créature à 1,50 m. Tu as l’avantage à ta prochaine attaque contre elle ce tour-ci, et le dé s’ajoute aux dégâts si elle touche.",
  ],
  lungingAttack: [
    "Fente",
    "Lors d’une attaque d’arme au corps à corps à ton tour, ton allonge augmente de 1,50 m ; si tu touches, ajoute le dé aux dégâts.",
  ],
  commandersStrike: [
    "Instruction",
    "Quand tu utilises l’action Attaquer, renonce à une attaque et utilise une action bonus : un allié qui te voit ou t’entend fait aussitôt une attaque d’arme par sa réaction, en ajoutant le dé aux dégâts.",
  ],
  evasiveFootwork: ["Jeu de jambes défensif", "Quand tu te déplaces, ajoute le dé à ta CA jusqu’à la fin de ce déplacement."],
  maneuveringAttack: [
    "Manœuvre tactique",
    "Quand tu touches avec une arme, ajoute le dé aux dégâts ; un allié qui te voit ou t’entend peut, par sa réaction, se déplacer de la moitié de sa vitesse sans provoquer d’attaque d’opportunité de ta cible.",
  ],
  parry: [
    "Parade",
    "Quand une créature te blesse avec une attaque au corps à corps, ta réaction réduit les dégâts du résultat du dé + ton modificateur de Dextérité.",
  ],
  goadingAttack: [
    "Provocation",
    "Quand tu touches avec une arme, ajoute le dé aux dégâts ; la cible fait une sauvegarde de Sagesse ou a un désavantage à ses attaques contre d’autres que toi jusqu’à la fin de ton prochain tour.",
  ],
  rally: [
    "Regain",
    "Action bonus : un allié qui te voit ou t’entend gagne des PV temporaires égaux au dé + ton modificateur de Charisme.",
  ],
  pushingAttack: [
    "Repousser",
    "Quand tu touches avec une arme, ajoute le dé aux dégâts ; une cible de taille G ou inférieure fait une sauvegarde de Force ou est repoussée de 4,50 m au plus.",
  ],
  riposte: [
    "Riposte",
    "Quand une créature te rate au corps à corps, ta réaction te permet de l’attaquer avec une arme de corps à corps ; si tu touches, ajoute le dé aux dégâts.",
  ],
};

const FEATS = {
  elementalAdept: {
    name: "Adepte élémentaire",
    source: "phb",
    prereq: { spellcaster: true },
    repeatable: true,
    summary:
      "Choisis acide, froid, feu, foudre ou tonnerre. Tes sorts ignorent la résistance à ce type de dégâts, et quand tu lances les dégâts d’un de tes sorts de ce type, chaque 1 obtenu sur un dé compte comme un 2. Tu peux prendre ce don plusieurs fois, avec un type différent à chaque fois.",
    grants: {
      optionChoice: {
        key: "element",
        title: "Type de dégâts",
        count: 1,
        options: {
          acid: ["Acide", "Tes sorts ignorent la résistance à l’acide ; les 1 de leurs dés de dégâts d’acide comptent comme des 2."],
          cold: ["Froid", "Tes sorts ignorent la résistance au froid ; les 1 de leurs dés de dégâts de froid comptent comme des 2."],
          fire: ["Feu", "Tes sorts ignorent la résistance au feu ; les 1 de leurs dés de dégâts de feu comptent comme des 2."],
          lightning: [
            "Foudre",
            "Tes sorts ignorent la résistance à la foudre ; les 1 de leurs dés de dégâts de foudre comptent comme des 2.",
          ],
          thunder: [
            "Tonnerre",
            "Tes sorts ignorent la résistance au tonnerre ; les 1 de leurs dés de dégâts de tonnerre comptent comme des 2.",
          ],
        },
      },
    },
  },
  martialAdept: {
    name: "Adepte martial",
    source: "phb",
    prereq: null,
    summary:
      "Tu apprends deux manœuvres du Maître de guerre et gagnes un dé de supériorité, un d6, qui s’ajoute à ceux d’une autre source et se récupère après un repos court ou long. DD des manœuvres : 8 + bonus de maîtrise + modificateur de Force ou de Dextérité (au choix).",
    grants: {
      optionChoice: { key: "maneuvers", title: "Manœuvres", count: 2, options: _featsManeuvers },
      resources: [
        {
          id: "martialAdeptDie",
          name: "Dé de supériorité (d6)",
          max: 1,
          reset: "short",
          note: "Alimente les manœuvres apprises grâce à Adepte martial.",
        },
      ],
    },
  },
  athlete: {
    name: "Athlète",
    source: "phb",
    prereq: null,
    summary:
      "+1 en Force ou en Dextérité (max. 20). Te relever quand tu es à terre ne coûte que 1,50 m de déplacement, et escalader ne coûte pas de déplacement supplémentaire. Un saut en longueur ou en hauteur avec élan ne demande que 1,50 m de course.",
    grants: { abilityChoice: { count: 1, amount: 1, from: ["str", "dex"] } },
  },
  savageAttacker: {
    name: "Attaquant sauvage",
    source: "phb",
    prereq: null,
    summary:
      "Une fois par tour, quand tu lances les dégâts d’une attaque d’arme au corps à corps, tu peux relancer les dés de dégâts de l’arme et garder l’un ou l’autre total.",
    grants: {},
  },
  tavernBrawler: {
    name: "Bagarreur de tavernes",
    source: "phb",
    prereq: null,
    summary:
      "+1 en Force ou en Constitution (max. 20). Tu maîtrises les armes improvisées et tes attaques à mains nues infligent 1d4. Quand tu touches une créature à ton tour avec une attaque à mains nues ou une arme improvisée, tu peux tenter de l’agripper par une action bonus.",
    grants: { abilityChoice: { count: 1, amount: 1, from: ["str", "con"] } },
  },
  lucky: {
    name: "Chanceux",
    source: "phb",
    prereq: null,
    summary:
      "3 points de chance par repos long. Dépense-en un pour lancer un d20 de plus lors d’un jet d’attaque, d’un test de caractéristique ou d’un jet de sauvegarde, après le jet mais avant d’en connaître l’issue, et choisis le dé à garder. Quand on t’attaque, tu peux aussi lancer un d20 et choisir lequel des deux dés l’attaquant utilise. Deux points de chance dépensés sur un même jet s’annulent.",
    grants: { resources: [{ id: "luckPoints", name: "Points de chance", max: 3, reset: "long" }] },
  },
  dualWielder: {
    name: "Combattant à deux armes",
    source: "phb",
    prereq: null,
    summary:
      "+1 à la CA quand tu tiens une arme de corps à corps distincte dans chaque main. Tu peux combattre à deux armes même si tes armes de corps à corps à une main ne sont pas légères, et tu dégaines ou rengaines deux armes à une main là où tu n’en sortirais qu’une.",
    grants: {},
  },
  mountedCombatant: {
    name: "Combattant monté",
    source: "phb",
    prereq: null,
    summary:
      "Sur une monture : avantage aux attaques au corps à corps contre une créature non montée plus petite que ta monture ; tu peux faire en sorte qu’une attaque visant ta monture te vise à la place ; si ta monture doit faire une sauvegarde de Dextérité pour demi-dégâts, elle ne subit aucun dégât en cas de réussite et la moitié en cas d’échec.",
    grants: {},
  },
  actor: {
    name: "Comédien",
    source: "phb",
    prereq: null,
    summary:
      "+1 en Charisme (max. 20). Avantage aux tests de Charisme (Tromperie) et (Représentation) pour te faire passer pour quelqu’un d’autre. Tu imites la voix d’une personne ou les cris d’une créature entendus pendant au moins 1 minute ; un auditeur décèle l’imitation en réussissant un test de Sagesse (Perspicacité) opposé à ton test de Charisme (Tromperie).",
    grants: { abilityChoice: { count: 1, amount: 1, from: ["cha"] } },
  },
  skulker: {
    name: "Discret",
    source: "phb",
    prereq: { abilities: { dex: 13 } },
    summary:
      "Tu peux tenter de te cacher quand tu n’es que légèrement masqué. Si tu es caché et rates une attaque d’arme à distance, ta position n’est pas révélée. La lumière faible ne te donne pas de désavantage aux tests de Sagesse (Perception) basés sur la vue.",
    grants: {},
  },
  skilled: {
    name: "Doué",
    source: "phb",
    prereq: null,
    summary: "Tu gagnes la maîtrise de trois compétences ou outils de ton choix, dans n’importe quelle combinaison.",
    grants: { skillOrToolChoice: { count: 3 } },
  },
  defensiveDuelist: {
    name: "Duelliste défensif",
    source: "phb",
    prereq: { abilities: { dex: 13 } },
    summary:
      "Quand tu manies une arme de finesse que tu maîtrises et qu’une créature te touche avec une attaque au corps à corps, ta réaction ajoute ton bonus de maîtrise à ta CA contre cette attaque, ce qui peut la faire échouer.",
    grants: {},
  },
  durable: {
    name: "Endurant",
    source: "phb",
    prereq: null,
    summary:
      "+1 en Constitution (max. 20). Quand tu lances un dé de vie pour récupérer des PV, tu en récupères au moins deux fois ton modificateur de Constitution (minimum 2).",
    grants: { abilityChoice: { count: 1, amount: 1, from: ["con"] } },
  },
  keenMind: {
    name: "Esprit affûté",
    source: "phb",
    prereq: null,
    summary:
      "+1 en Intelligence (max. 20). Tu sais toujours où se trouve le nord et combien d’heures il reste avant le prochain lever ou coucher du soleil. Tu te rappelles avec précision tout ce que tu as vu ou entendu au cours du dernier mois.",
    grants: { abilityChoice: { count: 1, amount: 1, from: ["int"] } },
  },
  charger: {
    name: "Expert de la charge",
    source: "phb",
    prereq: null,
    summary:
      "Quand tu utilises l’action Foncer, tu peux faire une attaque d’arme au corps à corps ou pousser une créature par une action bonus. Si tu as parcouru au moins 3 m en ligne droite juste avant : +5 aux dégâts de l’attaque si elle touche, ou la créature poussée recule de 3 m au plus.",
    grants: {},
  },
  dungeonDelver: {
    name: "Explorateur de donjons",
    source: "phb",
    prereq: null,
    summary:
      "Avantage aux tests de Sagesse (Perception) et d’Intelligence (Investigation) pour détecter les portes secrètes, et aux sauvegardes contre les pièges. Résistance aux dégâts des pièges. Voyager à allure rapide ne réduit pas ta Perception passive de 5.",
    grants: {},
  },
  magicInitiate: {
    name: "Initié à la magie",
    source: "phb",
    prereq: null,
    special: "magicInitiate",
    summary:
      "Choisis une classe : barde, clerc, druide, ensorceleur, magicien ou occultiste. Tu apprends deux sorts mineurs de sa liste et un sort de niveau 1, que tu peux lancer à son niveau le plus bas une fois par repos long grâce à ce don. Caractéristique d’incantation : Charisme (barde, ensorceleur, occultiste), Sagesse (clerc, druide) ou Intelligence (magicien).",
    grants: {},
  },
  linguist: {
    name: "Linguiste",
    source: "phb",
    prereq: null,
    summary:
      "+1 en Intelligence (max. 20). Tu apprends trois langues de ton choix. Tu sais créer des codes écrits : pour en déchiffrer un sans ton aide ni magie, il faut réussir un test d’Intelligence de DD égal à ta valeur d’Intelligence + ton bonus de maîtrise.",
    grants: { abilityChoice: { count: 1, amount: 1, from: ["int"] }, languageChoice: { count: 3 } },
  },
  grappler: {
    name: "Lutteur",
    source: "srd",
    prereq: { abilities: { str: 13 } },
    summary:
      "Avantage aux jets d’attaque contre une créature que tu agrippes. Par une action, tu peux tenter d’immobiliser une créature que tu agrippes : nouveau test de lutte ; en cas de réussite, elle et toi êtes entravés jusqu’à la fin de l’empoignade.",
    grants: {},
  },
  warCaster: {
    name: "Mage de guerre",
    source: "phb",
    prereq: { spellcaster: true },
    summary:
      "Avantage aux sauvegardes de Constitution pour maintenir ta concentration quand tu subis des dégâts. Tu accomplis les composantes somatiques même avec une arme ou un bouclier en main. Quand une créature hostile provoque ton attaque d’opportunité, tu peux à la place lui lancer par ta réaction un sort de temps d’incantation d’une action qui ne cible qu’elle.",
    grants: {},
  },
  spellSniper: {
    name: "Mage offensif",
    source: "phb",
    prereq: { spellcaster: true },
    special: "spellSniper",
    summary:
      "La portée de tes sorts qui demandent un jet d’attaque est doublée, et tes attaques de sort à distance ignorent les abris partiels et importants. Tu apprends un sort mineur à jet d’attaque, pris dans la liste du barde, du clerc, du druide, de l’ensorceleur, du magicien ou de l’occultiste ; sa caractéristique d’incantation dépend de cette liste (CHA, SAG ou INT).",
    grants: {},
  },
  ritualCaster: {
    name: "Magie rituelle",
    source: "phb",
    prereq: { anyAbility: { int: 13, wis: 13 } },
    special: "ritualCaster",
    summary:
      "Choisis une classe : barde, clerc, druide, ensorceleur, magicien ou occultiste. Tu possèdes un livre de rituels contenant deux sorts de niveau 1 de sa liste ayant l’étiquette rituel, que tu ne peux lancer que comme rituels, avec la caractéristique d’incantation de cette classe. Tu peux y copier d’autres rituels de cette liste trouvés par écrit, de niveau au plus égal à la moitié de ton niveau (arrondie au supérieur) : 2 heures et 50 po par niveau de sort.",
    grants: {},
  },
  weaponMaster: {
    name: "Maître d’armes",
    source: "phb",
    prereq: null,
    summary: "+1 en Force ou en Dextérité (max. 20). Tu maîtrises quatre armes de ton choix, courantes ou de guerre.",
    grants: { abilityChoice: { count: 1, amount: 1, from: ["str", "dex"] }, weaponChoice: { count: 4, from: "any" } },
  },
  polearmMaster: {
    name: "Maître d’hast",
    source: "phb",
    prereq: null,
    summary:
      "Quand tu utilises l’action Attaquer avec seulement une coutille, une hallebarde, un bâton ou une lance, tu peux frapper avec l’autre extrémité par une action bonus : 1d4 dégâts contondants, même modificateur de caractéristique. Avec une coutille, une hallebarde, une pique, un bâton ou une lance en main, une créature qui entre dans ton allonge provoque une attaque d’opportunité de ta part.",
    grants: {},
  },
  greatWeaponMaster: {
    name: "Maître des armes à deux mains",
    source: "phb",
    prereq: null,
    summary:
      "Quand tu fais un coup critique avec une arme de corps à corps ou réduis une créature à 0 PV avec une telle arme, tu peux faire une attaque d’arme au corps à corps par une action bonus. Avant d’attaquer avec une arme lourde de corps à corps que tu maîtrises, tu peux accepter un malus de 5 au jet d’attaque ; si l’attaque touche, elle inflige 10 dégâts de plus.",
    grants: {},
  },
  mediumArmorMaster: {
    name: "Maître des armures intermédiaires",
    source: "phb",
    prereq: { armor: "medium" },
    summary:
      "Une armure intermédiaire ne t’impose plus de désavantage aux tests de Dextérité (Discrétion). Avec une Dextérité de 16 ou plus, tu ajoutes jusqu’à 3 (au lieu de 2) à ta CA en armure intermédiaire.",
    grants: {},
  },
  heavyArmorMaster: {
    name: "Maître des armures lourdes",
    source: "phb",
    prereq: { armor: "heavy" },
    summary:
      "+1 en Force (max. 20). Quand tu portes une armure lourde, les dégâts contondants, perforants et tranchants que tu subis des armes non magiques sont réduits de 3.",
    grants: { abilityChoice: { count: 1, amount: 1, from: ["str"] } },
  },
  shieldMaster: {
    name: "Maître des boucliers",
    source: "phb",
    prereq: null,
    summary:
      "Si tu utilises l’action Attaquer à ton tour, tu peux tenter de pousser avec ton bouclier une créature à 1,50 m par une action bonus. Si tu n’es pas neutralisé, tu ajoutes le bonus de CA de ton bouclier à tes sauvegardes de Dextérité contre un sort ou un effet néfaste qui ne cible que toi. Contre un effet qui permet une sauvegarde de Dextérité pour demi-dégâts, ta réaction te fait subir zéro dégât en cas de réussite.",
    grants: {},
  },
  crossbowExpert: {
    name: "Maître-arbalétrier",
    source: "phb",
    prereq: null,
    summary:
      "Tu ignores la propriété chargement des arbalètes que tu maîtrises. Être à 1,50 m d’une créature hostile ne te donne pas de désavantage à tes attaques à distance. Quand tu utilises l’action Attaquer avec une arme à une main, tu peux attaquer avec une arbalète de poing que tu tiens par une action bonus.",
    grants: {},
  },
  inspiringLeader: {
    name: "Meneur exaltant",
    source: "phb",
    prereq: { abilities: { cha: 13 } },
    summary:
      "En 10 minutes de discours, jusqu’à six créatures amies (toi compris) à 9 m ou moins, qui te voient ou t’entendent et te comprennent, gagnent des PV temporaires égaux à ton niveau + ton modificateur de Charisme. Une créature n’en bénéficie à nouveau qu’après un repos court ou long.",
    grants: {
      resources: [
        {
          id: "inspiringLeader",
          name: "Discours exaltant",
          max: 1,
          reset: "short",
          note: (ctx) =>
            `10 minutes, jusqu’à six créatures : ${(ctx.charLevel ?? ctx.level) + ctx.mods.cha} PV temporaires chacune. Une créature n’en profite qu’une fois entre deux repos.`,
        },
      ],
    },
  },
  mobile: {
    name: "Mobile",
    source: "phb",
    prereq: null,
    summary:
      "+3 m de vitesse. Quand tu utilises l’action Foncer, le terrain difficile ne te coûte pas de déplacement supplémentaire ce tour-ci. Quand tu attaques une créature au corps à corps, touchée ou non, elle ne peut plus te porter d’attaque d’opportunité jusqu’à la fin de ton tour.",
    grants: { speed: 3 },
  },
  observant: {
    name: "Observateur",
    source: "phb",
    prereq: null,
    summary:
      "+1 en Intelligence ou en Sagesse (max. 20). Si tu vois la bouche d’une créature qui parle une langue que tu comprends, tu lis sur ses lèvres. +5 à ta Sagesse (Perception) passive et à ton Intelligence (Investigation) passive.",
    grants: { abilityChoice: { count: 1, amount: 1, from: ["int", "wis"] }, passive: { perception: 5, investigation: 5 } },
  },
  moderatelyArmored: {
    name: "Protection intermédiaire",
    source: "phb",
    prereq: { armor: "light" },
    summary: "+1 en Force ou en Dextérité (max. 20). Tu maîtrises les armures intermédiaires et les boucliers.",
    grants: { abilityChoice: { count: 1, amount: 1, from: ["str", "dex"] }, armor: ["medium", "shield"] },
  },
  lightlyArmored: {
    name: "Protection légère",
    source: "phb",
    prereq: null,
    summary: "+1 en Force ou en Dextérité (max. 20). Tu maîtrises les armures légères.",
    grants: { abilityChoice: { count: 1, amount: 1, from: ["str", "dex"] }, armor: ["light"] },
  },
  heavilyArmored: {
    name: "Protection lourde",
    source: "phb",
    prereq: { armor: "medium" },
    summary: "+1 en Force (max. 20). Tu maîtrises les armures lourdes.",
    grants: { abilityChoice: { count: 1, amount: 1, from: ["str"] }, armor: ["heavy"] },
  },
  resilient: {
    name: "Résilient",
    source: "phb",
    prereq: null,
    summary: "+1 à une caractéristique de ton choix (max. 20), et tu maîtrises les jets de sauvegarde de cette caractéristique.",
    grants: { abilityChoice: { count: 1, amount: 1 }, saveFromAbilityChoice: true },
  },
  tough: {
    name: "Robuste",
    source: "phb",
    prereq: null,
    summary: "Tes PV maximum augmentent de 2 par niveau de personnage, rétroactivement, puis de 2 à chaque niveau gagné.",
    grants: { hpPerLevel: 2 },
  },
  sentinel: {
    name: "Sentinelle",
    source: "phb",
    prereq: null,
    summary:
      "Une créature touchée par ton attaque d’opportunité voit sa vitesse tomber à 0 jusqu’à la fin du tour. Se désengager ne protège pas de tes attaques d’opportunité. Quand une créature à 1,50 m ou moins attaque une autre cible que toi (qui n’a pas ce don), ta réaction te permet de l’attaquer avec une arme de corps à corps.",
    grants: {},
  },
  healer: {
    name: "Soigneur",
    source: "phb",
    prereq: null,
    summary:
      "Quand tu stabilises une créature mourante avec une trousse de soins, elle récupère aussi 1 PV. Par une action, tu peux dépenser une utilisation de trousse de soins pour rendre à une créature 1d6 + 4 PV, plus un nombre de PV égal à son nombre maximum de dés de vie ; une même créature n’en profite qu’une fois entre deux repos courts ou longs.",
    grants: {},
  },
  sharpshooter: {
    name: "Tireur d’élite",
    source: "phb",
    prereq: null,
    summary:
      "Attaquer à longue portée ne te donne pas de désavantage avec une arme à distance, et tes attaques d’arme à distance ignorent les abris partiels et importants. Avant d’attaquer avec une arme à distance que tu maîtrises, tu peux accepter un malus de 5 au jet d’attaque ; si l’attaque touche, elle inflige 10 dégâts de plus.",
    grants: {},
  },
  mageSlayer: {
    name: "Tueur de mages",
    source: "phb",
    prereq: null,
    summary:
      "Quand une créature à 1,50 m ou moins lance un sort, ta réaction te permet de l’attaquer avec une arme de corps à corps. Une créature qui se concentre et que tu blesses a un désavantage à sa sauvegarde de concentration. Avantage aux sauvegardes contre les sorts lancés par une créature à 1,50 m ou moins.",
    grants: {},
  },
  alert: {
    name: "Vigilant",
    source: "phb",
    prereq: null,
    summary:
      "+5 à l’initiative. Tu ne peux pas être surpris tant que tu es conscient. Une créature que tu ne vois pas n’a pas l’avantage à ses attaques contre toi pour cette seule raison.",
    grants: { initiative: 5 },
  },
};


// Module : features
/** Aptitudes de classe, Manuel des joueurs 2014 : résumés originaux en français.
 * FEATURES ne contient que les aptitudes de la classe de base (niveaux 1 à 20) ;
 * les aptitudes de sous-classe sont dans subclasses.js et les améliorations
 * de caractéristiques sont gérées par le moteur. Format : [niveau, nom, résumé]. */
const FEATURES = {
  barbarian: [
    [1, "Rage", "Action bonus, sans armure lourde : pendant 1 minute, avantage aux tests et sauvegardes de FOR, bonus aux dégâts des attaques d’arme au corps à corps utilisant la FOR (+2 ; +3 au niveau 9, +4 au niveau 16) et résistance aux dégâts contondants, perforants et tranchants. Ni sorts ni concentration. Fin anticipée si tu tombes inconscient ou si ton tour s’achève sans que tu aies attaqué une créature hostile ni subi de dégâts depuis ton tour précédent. Utilisations par repos long : 2, puis 3 au niveau 3, 4 au niveau 6, 5 au niveau 12, 6 au niveau 17, illimitées au niveau 20."],
    [1, "Défense sans armure", "Sans armure, ta CA est égale à 10 + mod. DEX + mod. CON ; un bouclier reste permis."],
    [2, "Attaque téméraire", "Lors de ta première attaque d’un tour, tu peux attaquer témérairement : avantage à tes attaques d’arme au corps à corps utilisant la FOR pendant ce tour, mais les attaques contre toi ont l’avantage jusqu’à ton prochain tour."],
    [2, "Sens du danger", "Avantage aux sauvegardes de DEX contre les effets que tu peux voir (pièges, sorts, etc.), sauf si tu es aveuglé, assourdi ou neutralisé."],
    [3, "Voie primitive", "Choisis ta voie : Berserker ou Guerrier totem. Elle t’accorde des aptitudes aux niveaux 3, 6, 10 et 14."],
    [5, "Attaque supplémentaire", "Tu attaques deux fois, au lieu d’une, quand tu effectues l’action Attaquer à ton tour."],
    [5, "Déplacement rapide", "Ta vitesse augmente de 3 m tant que tu ne portes pas d’armure lourde."],
    [7, "Instinct sauvage", "Avantage aux jets d’initiative. Si tu es surpris au début d’un combat sans être neutralisé, tu agis normalement à ton premier tour à condition d’entrer en rage avant toute autre chose."],
    [9, "Critique brutal", "Sur un coup critique avec une attaque au corps à corps, lance un dé de dégâts de l’arme supplémentaire ; deux dés au niveau 13, trois au niveau 17."],
    [11, "Rage implacable", "En rage, si tu tombes à 0 PV sans être tué sur le coup, une sauvegarde de CON DD 10 te laisse à 1 PV. Chaque nouvelle tentative augmente le DD de 5 ; il revient à 10 après un repos court ou long."],
    [15, "Rage persistante", "Ta rage ne prend fin prématurément que si tu tombes inconscient ou si tu choisis de l’arrêter."],
    [18, "Puissance indomptable", "Si le total d’un de tes tests de FOR est inférieur à ta valeur de Force, utilise cette valeur à la place."],
    [20, "Champion primitif", "Ta Force et ta Constitution augmentent de 4, et leur maximum passe à 24."],
  ],
  bard: [
    [1, "Incantation", "Sorts de barde, caractéristique d’incantation : CHA. Tu connais un nombre fixe de sorts (un peut être remplacé à chaque niveau de barde), tu peux lancer en rituel ceux qui le permettent, et un instrument de musique sert de focaliseur."],
    [1, "Inspiration bardique", "Action bonus : une autre créature qui t’entend à 18 m reçoit un dé d’inspiration (d6 ; d8 au niveau 5, d10 au niveau 10, d12 au niveau 15). Dans les 10 minutes, elle peut l’ajouter à un test de caractéristique, un jet d’attaque ou une sauvegarde, après avoir vu le d20. Une seule inspiration à la fois par créature. Utilisations = mod. CHA (min. 1) par repos long."],
    [2, "Touche-à-tout", "Ajoute la moitié de ton bonus de maîtrise, arrondie à l’inférieur, à tout test de caractéristique qui ne l’inclut pas déjà."],
    [2, "Chant reposant", "Pendant un repos court, si tu joues ou chantes, toi et les créatures amicales qui t’entendent récupérez 1d6 PV de plus en dépensant au moins un dé de vie (d8 au niveau 9, d10 au niveau 13, d12 au niveau 17)."],
    [3, "Collège bardique", "Choisis ton collège : Savoir ou Vaillance. Il t’accorde des aptitudes aux niveaux 3, 6 et 14."],
    [3, "Expertise", "Choisis deux compétences que tu maîtrises : ton bonus de maîtrise est doublé pour elles. Deux de plus au niveau 10."],
    [5, "Source d’inspiration", "Tu récupères toutes tes utilisations d’Inspiration bardique après un repos court ou long."],
    [6, "Contre-charme", "Action : jusqu’à la fin de ton prochain tour, toi et les créatures amicales à 9 m qui t’entendent avez l’avantage aux sauvegardes contre les états charmé et effrayé. L’effet cesse si tu es neutralisé ou réduit au silence, ou si tu l’arrêtes."],
    [10, "Secrets magiques", "Apprends deux sorts de n’importe quelle classe (sorts mineurs ou d’un niveau que tu peux lancer) ; ils deviennent des sorts de barde et comptent dans tes sorts connus. Deux de plus aux niveaux 14 et 18."],
    [20, "Inspiration supérieure", "Quand tu lances l’initiative sans aucune utilisation d’Inspiration bardique restante, tu en récupères une."],
  ],
  cleric: [
    [1, "Incantation", "Sorts de clerc, caractéristique d’incantation : SAG. Après un repos long, prépare mod. SAG + niveau de clerc sorts (min. 1) ; tes sorts de domaine sont préparés en plus. Rituels possibles s’ils sont préparés ; un symbole sacré sert de focaliseur."],
    [1, "Domaine divin", "Choisis le domaine de ta divinité. Il t’accorde des sorts de domaine toujours préparés et des aptitudes aux niveaux 1, 2, 6, 8 et 17."],
    [2, "Conduit divin", "Une utilisation par repos court ou long, deux à partir du niveau 6, trois au niveau 18. Chaque utilisation déclenche une option : Renvoi des morts-vivants ou une option de ton domaine. Le DD est celui de tes sorts."],
    [2, "Conduit divin : renvoi des morts-vivants", "Action : chaque mort-vivant qui te voit ou t’entend à 9 m fait une sauvegarde de SAG. En cas d’échec, il est renvoyé pendant 1 minute ou jusqu’à ce qu’il subisse des dégâts : il doit s’éloigner de toi, ne peut pas réagir et ne peut que Foncer ou tenter de se libérer (Esquiver s’il est bloqué)."],
    [5, "Destruction des morts-vivants", "Un mort-vivant qui rate sa sauvegarde contre ton Renvoi est détruit si son FP est de 1/2 ou moins ; FP 1 au niveau 8, FP 2 au niveau 11, FP 3 au niveau 14, FP 4 au niveau 17."],
    [10, "Intervention divine", "Action : décris l’aide demandée et lance 1d100 ; si le résultat est inférieur ou égal à ton niveau de clerc, ta divinité intervient (effet au choix du MJ). Après une intervention, attends 7 jours ; sinon, réessaie après un repos long."],
    [20, "Intervention divine supérieure", "Ton appel à l’Intervention divine réussit automatiquement, sans jet."],
  ],
  druid: [
    [1, "Druidique", "Tu connais le druidique, langue secrète des druides, et peux y dissimuler des messages : un test de SAG (Perception) DD 15 en révèle la présence, mais pas le sens sans magie."],
    [1, "Incantation", "Sorts de druide, caractéristique d’incantation : SAG. Après un repos long, prépare mod. SAG + niveau de druide sorts (min. 1). Rituels possibles s’ils sont préparés ; un focaliseur druidique peut servir."],
    [2, "Forme sauvage", "Action : prends la forme d’une bête que tu as déjà vue (FP 1/4 au plus, sans vitesse de nage ni de vol), deux fois par repos court ou long, pour au plus la moitié de ton niveau de druide en heures. Tu gardes INT, SAG, CHA et tes maîtrises mais ne lances pas de sorts. Retour par action bonus, ou à 0 PV (les dégâts en excès te sont reportés)."],
    [2, "Cercle druidique", "Choisis ton cercle : Terre ou Lune. Il t’accorde des aptitudes aux niveaux 2, 6, 10 et 14."],
    [4, "Forme sauvage améliorée (FP 1/2)", "Tes formes sauvages peuvent atteindre le FP 1/2 et avoir une vitesse de nage (toujours pas de vol)."],
    [8, "Forme sauvage améliorée (FP 1)", "Tes formes sauvages peuvent atteindre le FP 1 et avoir une vitesse de vol."],
    [18, "Jeunesse éternelle", "Tu ne vieillis plus que d’un an tous les dix ans."],
    [18, "Incantation animale", "Sous forme sauvage, tu peux lancer beaucoup de tes sorts de druide en accomplissant leurs composantes verbales et somatiques, mais sans pouvoir fournir les composantes matérielles."],
    [20, "Archidruide", "Forme sauvage illimitée. Sous toutes tes formes, tu ignores les composantes verbales et somatiques de tes sorts de druide, ainsi que leurs composantes matérielles sans coût et non consommées."],
  ],
  fighter: [
    [1, "Style de combat", "Choisis un style de combat parmi les six proposés ; un même style ne peut pas être pris deux fois."],
    [1, "Second souffle", "Action bonus : récupère 1d10 + ton niveau de guerrier PV. Une fois par repos court ou long."],
    [2, "Fougue", "À ton tour, effectue une action supplémentaire. Une fois par repos court ou long ; deux fois à partir du niveau 17, mais une seule par tour."],
    [3, "Archétype martial", "Choisis ton archétype : Champion, Maître de guerre ou Chevalier occulte. Il t’accorde des aptitudes aux niveaux 3, 7, 10, 15 et 18."],
    [5, "Attaque supplémentaire", "Deux attaques quand tu effectues l’action Attaquer à ton tour ; trois au niveau 11, quatre au niveau 20."],
    [9, "Inflexible", "Relance une sauvegarde ratée ; tu dois garder le nouveau résultat. Une fois par repos long ; deux au niveau 13, trois au niveau 17."],
  ],
  monk: [
    [1, "Défense sans armure", "Sans armure ni bouclier, ta CA est égale à 10 + mod. DEX + mod. SAG."],
    [1, "Arts martiaux", "Sans armure ni bouclier, avec une frappe à mains nues ou une arme de moine (épée courte ou arme courante de corps à corps sans les propriétés deux mains et lourde) : DEX au lieu de FOR possible, dé d’arts martiaux à la place des dégâts normaux (d4 ; d6 au niveau 5, d8 au niveau 11, d10 au niveau 17), et une frappe à mains nues en action bonus quand tu effectues l’action Attaquer avec ces armes."],
    [2, "Ki", "Points de ki = niveau de moine, récupérés après un repos court ou long dont 30 minutes de méditation. DD des effets de ki = 8 + maîtrise + mod. SAG. Pour 1 ki, en action bonus : Déluge de coups (deux frappes à mains nues juste après l’action Attaquer), Défense patiente (Esquiver) ou Déplacement aérien (Se désengager ou Foncer, distance de saut doublée pour le tour)."],
    [2, "Déplacement sans armure", "Sans armure ni bouclier, ta vitesse augmente de 3 m ; +4,50 m au niveau 6, +6 m au niveau 10, +7,50 m au niveau 14, +9 m au niveau 18."],
    [3, "Tradition monastique", "Choisis ta tradition : Paume, Ombre ou Quatre éléments. Elle t’accorde des aptitudes aux niveaux 3, 6, 11 et 17."],
    [3, "Parade de projectiles", "Réaction quand une attaque à distance avec une arme te touche : réduis les dégâts de 1d10 + mod. DEX + niveau de moine. S’ils tombent à 0 et que tu as une main libre, tu attrapes le projectile (s’il tient dans une main) et peux le relancer aussitôt pour 1 ki (attaque maîtrisée, portée 6/18 m)."],
    [4, "Chute ralentie", "Réaction quand tu chutes : réduis les dégâts de chute de 5 × ton niveau de moine."],
    [5, "Attaque supplémentaire", "Tu attaques deux fois, au lieu d’une, quand tu effectues l’action Attaquer à ton tour."],
    [5, "Frappe étourdissante", "Quand tu touches une créature avec une attaque d’arme au corps à corps, dépense 1 ki : elle fait une sauvegarde de CON ou est étourdie jusqu’à la fin de ton prochain tour."],
    [6, "Frappes de ki", "Tes frappes à mains nues comptent comme magiques pour vaincre les résistances et immunités aux attaques non magiques."],
    [7, "Esquive totale", "Contre un effet qui permet une sauvegarde de DEX pour subir la moitié des dégâts : aucun dégât si tu réussis, moitié si tu échoues."],
    [7, "Sérénité", "Action : mets fin à un effet qui te charme ou t’effraie."],
    [9, "Déplacement sans armure amélioré", "Pendant ton tour, tu peux te déplacer sur des surfaces verticales et sur des liquides sans tomber durant ton mouvement."],
    [10, "Pureté physique", "Tu es immunisé contre les maladies et le poison."],
    [13, "Langue du soleil et de la lune", "Tu comprends toutes les langues parlées, et toute créature qui comprend une langue comprend ce que tu dis."],
    [14, "Âme de diamant", "Maîtrise de tous les jets de sauvegarde. Après une sauvegarde ratée, dépense 1 ki pour la relancer (le second résultat s’impose)."],
    [15, "Jeunesse éternelle", "Tu ne subis plus la fragilité de l’âge ni le vieillissement magique, et tu n’as plus besoin de manger ni de boire."],
    [18, "Désertion de l’âme", "Action et 4 ki : invisible pendant 1 minute, avec résistance à tous les dégâts sauf de force. Action et 8 ki : lance projection astrale sans composantes matérielles, sur toi seul."],
    [20, "Perfection de l’être", "Quand tu lances l’initiative sans aucun point de ki, tu en récupères 4."],
  ],
  paladin: [
    [1, "Sens divin", "Action : jusqu’à la fin de ton prochain tour, tu connais la position et le type des célestes, fiélons et morts-vivants à 18 m (hors abri total), ainsi que les lieux et objets consacrés ou profanés. Utilisations = 1 + mod. CHA par repos long."],
    [1, "Imposition des mains", "Réserve de 5 × niveau de paladin PV, remplie après un repos long. Action, au contact : rends des PV puisés dans la réserve, ou dépense 5 points pour guérir une maladie ou neutraliser un poison. Sans effet sur les morts-vivants et les artificiels."],
    [2, "Style de combat", "Choisis un style : Arme à deux mains, Défense, Duel ou Protection."],
    [2, "Incantation", "Sorts de paladin, caractéristique d’incantation : CHA. Après un repos long, prépare mod. CHA + moitié du niveau de paladin (arrondie à l’inférieur) sorts, min. 1 ; tes sorts de serment sont préparés en plus. Un symbole sacré sert de focaliseur."],
    [2, "Châtiment divin", "Quand tu touches avec une attaque d’arme au corps à corps, dépense un emplacement de sort : +2d8 dégâts radiants avec un emplacement de niveau 1, +1d8 par niveau au-delà (5d8 au maximum), +1d8 contre un mort-vivant ou un fiélon."],
    [3, "Santé divine", "Tu es immunisé contre les maladies."],
    [3, "Serment sacré", "Prête serment : Dévotion, Anciens ou Vengeance. Tu gagnes des sorts de serment toujours préparés, des options de Conduit divin (une utilisation par repos court ou long, DD de tes sorts) et des aptitudes aux niveaux 3, 7, 15 et 20."],
    [5, "Attaque supplémentaire", "Tu attaques deux fois, au lieu d’une, quand tu effectues l’action Attaquer à ton tour."],
    [6, "Aura de protection", "Tant que tu es conscient, toi et les créatures amicales à 3 m ajoutez ton mod. CHA (min. +1) à vos jets de sauvegarde."],
    [10, "Aura de courage", "Tant que tu es conscient, toi et les créatures amicales à 3 m ne pouvez pas être effrayés."],
    [11, "Châtiment divin amélioré", "Chaque attaque d’arme au corps à corps qui touche inflige 1d8 dégâts radiants de plus, en plus d’un éventuel Châtiment divin."],
    [14, "Contact purifiant", "Action : mets fin à un sort qui t’affecte ou qui affecte une créature consentante que tu touches. Utilisations = mod. CHA (min. 1) par repos long."],
    [18, "Amélioration d’auras", "Le rayon de tes auras passe de 3 m à 9 m."],
  ],
  ranger: [
    [1, "Ennemi juré", "Choisis un type de créatures (aberrations, artificiels, bêtes, célestes, dragons, élémentaires, fées, fiélons, géants, monstruosités, morts-vivants, plantes ou vases) ou deux races d’humanoïdes. Avantage aux tests de SAG (Survie) pour les pister et d’INT pour te rappeler des informations sur eux ; tu apprends une langue qu’ils parlent, le cas échéant."],
    [1, "Explorateur-né", "Choisis un terrain de prédilection (arctique, désert, forêt, littoral, marais, montagne, Outreterre ou plaine). Pour les tests d’INT ou de SAG qui y sont liés, ton bonus de maîtrise est doublé s’il s’applique. En voyage d’au moins une heure dans ce terrain : pas de ralentissement dû au terrain difficile, impossible de se perdre sauf par magie, vigilance permanente, discrétion à allure normale si tu es seul, nourriture doublée et informations précises sur les traces."],
    [2, "Style de combat", "Choisis un style : Archerie, Combat à deux armes, Défense ou Duel."],
    [2, "Incantation", "Sorts de rôdeur, caractéristique d’incantation : SAG. Tu connais un nombre fixe de sorts, dont un peut être remplacé à chaque niveau de rôdeur."],
    [3, "Archétype de rôdeur", "Choisis ton archétype : Chasseur ou Maître des bêtes. Il t’accorde des aptitudes aux niveaux 3, 7, 11 et 15."],
    [3, "Vigilance primitive", "Action et un emplacement de sort de rôdeur : pendant 1 minute par niveau de l’emplacement, tu sais si des aberrations, célestes, dragons, élémentaires, fées, fiélons ou morts-vivants sont présents à 1,5 km (9 km dans un terrain de prédilection), sans connaître leur position ni leur nombre."],
    [5, "Attaque supplémentaire", "Tu attaques deux fois, au lieu d’une, quand tu effectues l’action Attaquer à ton tour."],
    [6, "Amélioration de l’Ennemi juré et de l’Explorateur-né", "Choisis un ennemi juré et un terrain de prédilection supplémentaires."],
    [8, "Foulée tellurique", "Le terrain difficile non magique ne te coûte pas de déplacement supplémentaire, et les plantes non magiques ne te ralentissent ni ne te blessent. Avantage aux sauvegardes contre les plantes créées ou manipulées par magie pour gêner le mouvement."],
    [10, "Amélioration de l’Explorateur-né", "Choisis un troisième terrain de prédilection."],
    [10, "Camouflage naturel", "En 1 minute, avec de la boue, des plantes ou de la suie, camoufle-toi contre une surface solide au moins aussi grande que toi : +10 aux tests de DEX (Discrétion) tant que tu restes immobile sans agir. Tout déplacement, action ou réaction t’oblige à recommencer."],
    [14, "Amélioration de l’Ennemi juré", "Choisis un troisième ennemi juré."],
    [14, "Disparition", "Tu peux te Cacher en action bonus, et on ne peut plus te pister par des moyens non magiques, sauf si tu le veux."],
    [18, "Sens sauvages", "Pas de désavantage pour attaquer une créature que tu ne vois pas. Si tu n’es ni aveuglé ni assourdi, tu connais la position des créatures invisibles à 9 m qui ne se cachent pas de toi."],
    [20, "Tueur implacable", "Une fois à chacun de tes tours, ajoute ton mod. SAG au jet d’attaque ou de dégâts d’une attaque contre un de tes ennemis jurés, avant ou après le jet mais avant ses effets."],
  ],
  rogue: [
    [1, "Expertise", "Double ton bonus de maîtrise pour deux compétences maîtrisées, ou pour une compétence et les outils de voleur. Deux choix de plus au niveau 6."],
    [1, "Attaque sournoise", "Une fois par tour, +1d6 dégâts à une créature touchée avec une arme de finesse ou à distance, si tu as l’avantage, ou si un autre ennemi non neutralisé de la cible est à 1,50 m d’elle et que tu n’as pas le désavantage. +1d6 tous les deux niveaux : 2d6 au niveau 3, jusqu’à 10d6 au niveau 19."],
    [1, "Jargon des voleurs", "Tu connais l’argot, les signes et les symboles secrets des voleurs ; glisser un message caché dans une conversation prend quatre fois plus de temps que de le dire clairement."],
    [2, "Ruse", "À chacun de tes tours, action bonus pour Foncer, Se désengager ou Se cacher."],
    [3, "Archétype de roublard", "Choisis ton archétype : Voleur, Assassin ou Escroc arcanique. Il t’accorde des aptitudes aux niveaux 3, 9, 13 et 17."],
    [5, "Esquive instinctive", "Réaction quand un attaquant que tu vois te touche : les dégâts de cette attaque sont réduits de moitié."],
    [7, "Esquive totale", "Contre un effet qui permet une sauvegarde de DEX pour subir la moitié des dégâts : aucun dégât si tu réussis, moitié si tu échoues."],
    [11, "Savoir-faire", "Pour un test de caractéristique où tu ajoutes ton bonus de maîtrise, un résultat de 9 ou moins au d20 compte comme un 10."],
    [14, "Perception aveugle", "Si tu peux entendre, tu connais la position de toute créature cachée ou invisible à 3 m de toi."],
    [15, "Esprit fuyant", "Tu gagnes la maîtrise des jets de sauvegarde de SAG."],
    [18, "Insaisissable", "Tant que tu n’es pas neutralisé, aucun jet d’attaque contre toi ne bénéficie de l’avantage."],
    [20, "Coup de chance", "Transforme une attaque ratée contre une cible à portée en coup au but, ou un test de caractéristique raté en 20 naturel. Une fois par repos court ou long."],
  ],
  sorcerer: [
    [1, "Incantation", "Sorts d’ensorceleur, caractéristique d’incantation : CHA. Tu connais un nombre fixe de sorts, dont un peut être remplacé à chaque niveau ; un focaliseur arcanique peut servir."],
    [1, "Origine magique", "Choisis la source de ton pouvoir : Lignée draconique ou Magie sauvage. Elle t’accorde des aptitudes aux niveaux 1, 6, 14 et 18."],
    [2, "Source de magie", "Points de sorcellerie = niveau d’ensorceleur, récupérés après un repos long. Flexibilité des sorts, en action bonus : crée un emplacement contre des points (niveau 1 : 2 ; niveau 2 : 3 ; niveau 3 : 5 ; niveau 4 : 6 ; niveau 5 : 7 ; il disparaît au repos long), ou convertis un emplacement en autant de points que son niveau."],
    [3, "Métamagie", "Choisis deux options de métamagie, puis une de plus aux niveaux 10 et 17. Une seule option par sort, sauf indication contraire."],
    [20, "Restauration ensorcelée", "Tu récupères 4 points de sorcellerie dépensés à la fin d’un repos court."],
  ],
  warlock: [
    [1, "Patron d’Outremonde", "Choisis ton patron : le Fiélon, l’Archifée ou le Grand Ancien. Il élargit la liste où tu choisis tes sorts d’occultiste et t’accorde des aptitudes aux niveaux 1, 6, 10 et 14."],
    [1, "Magie de pacte", "Sorts d’occultiste, caractéristique d’incantation : CHA. Tu connais un nombre fixe de sorts (un peut être remplacé à chaque niveau). Tes rares emplacements sont tous du même niveau (5 au maximum) et reviennent après un repos court ou long. Un focaliseur arcanique peut servir."],
    [2, "Manifestations occultes", "Tu connais deux manifestations, puis 3 au niveau 5, 4 au niveau 7, 5 au niveau 9, 6 au niveau 12, 7 au niveau 15 et 8 au niveau 18. À chaque niveau, tu peux en remplacer une ; les prérequis de niveau portent sur ton niveau d’occultiste."],
    [3, "Faveur de pacte", "Ton patron t’accorde un pacte : chaîne, lame ou grimoire."],
    [11, "Arcanum mystique", "Choisis un sort d’occultiste de niveau 6, lançable une fois par repos long sans emplacement. Un sort de niveau 7 s’ajoute au niveau 13, de niveau 8 au niveau 15 et de niveau 9 au niveau 17."],
    [20, "Maître de l’occulte", "Après 1 minute passée à implorer ton patron, récupère tous tes emplacements de Magie de pacte. Une fois par repos long."],
  ],
  wizard: [
    [1, "Incantation", "Sorts de magicien, caractéristique d’incantation : INT. Après un repos long, prépare mod. INT + niveau de magicien sorts de ton grimoire (min. 1). Tu peux lancer en rituel tout sort rituel de ton grimoire, même non préparé. Un focaliseur arcanique peut servir."],
    [1, "Grimoire", "Il contient au départ six sorts de magicien de niveau 1 ; chaque niveau gagné y ajoute gratuitement deux sorts d’un niveau que tu peux lancer. Copier un sort trouvé coûte 2 heures et 50 po par niveau du sort."],
    [1, "Restauration arcanique", "Une fois par jour, à la fin d’un repos court, récupère des emplacements dont la somme des niveaux ne dépasse pas la moitié de ton niveau de magicien (arrondie au supérieur), aucun de niveau 6 ou plus."],
    [2, "Tradition arcanique", "Choisis ton école parmi les huit traditions. Elle t’accorde des aptitudes aux niveaux 2, 6, 10 et 14."],
    [18, "Maîtrise des sorts", "Choisis un sort de niveau 1 et un sort de niveau 2 de ton grimoire : tant qu’ils sont préparés, tu les lances à leur niveau de base sans emplacement. 8 heures d’étude permettent de changer ces choix."],
    [20, "Sorts de prédilection", "Choisis deux sorts de niveau 3 de ton grimoire : toujours préparés sans compter dans ton quota, chacun lançable une fois au niveau 3 sans emplacement par repos court ou long."],
  ],
};

/** Styles de combat (guerrier : les six ; paladin et rôdeur : quatre chacun). */
const STYLES = {
  archery: ["Archerie", "+2 aux jets d’attaque avec les armes à distance."],
  defense: ["Défense", "+1 à la CA tant que tu portes une armure."],
  dueling: ["Duel", "Quand tu manies une arme de corps à corps d’une seule main et aucune autre arme, +2 aux dégâts de cette arme."],
  greatWeapon: ["Arme à deux mains", "Avec une arme de corps à corps tenue à deux mains (propriété deux mains ou polyvalente), relance un 1 ou un 2 obtenu sur un dé de dégâts ; le nouveau résultat s’impose."],
  protection: ["Protection", "Si tu portes un bouclier, réaction quand une créature que tu vois attaque une autre cible à 1,50 m de toi : elle a le désavantage à ce jet d’attaque."],
  twoWeapon: ["Combat à deux armes", "Quand tu combats à deux armes, ajoute ton modificateur de caractéristique aux dégâts de l’attaque de la seconde arme."],
};

/** Options de métamagie de l’ensorceleur (coût en points de sorcellerie). */
const METAMAGIC = {
  careful: ["Sort prévenant", "1 point : quand ton sort impose une sauvegarde, jusqu’à mod. CHA créatures de ton choix (min. 1) la réussissent automatiquement."],
  distant: ["Sort ample", "1 point : double la portée d’un sort d’au moins 1,50 m ; une portée de contact devient 9 m."],
  empowered: ["Sort renforcé", "1 point : relance jusqu’à mod. CHA dés de dégâts (min. 1) et garde les nouveaux résultats. Utilisable même avec une autre option sur le même sort."],
  extended: ["Sort étendu", "1 point : double la durée d’un sort d’au moins 1 minute, sans dépasser 24 heures."],
  heightened: ["Sort intensifié", "3 points : une cible du sort a le désavantage à sa première sauvegarde contre lui."],
  quickened: ["Sort accéléré", "2 points : un sort dont l’incantation prend 1 action se lance en action bonus."],
  subtle: ["Sort subtil", "1 point : le sort se lance sans composantes verbales ni somatiques."],
  twinned: ["Sort jumeau", "Points = niveau du sort (1 pour un sort mineur) : un sort qui ne cible qu’une créature, sans portée personnelle, vise aussi une seconde créature à portée."],
};

/** Faveurs de pacte de l’occultiste (niveau 3). */
const PACT_BOONS = {
  chain: ["Pacte de la chaîne", "Tu apprends appel de familier, lançable en rituel, avec quatre formes spéciales possibles : diablotin, pseudodragon, quasit ou esprit follet. Quand tu effectues l’action Attaquer, tu peux renoncer à une de tes attaques pour que ton familier attaque avec sa réaction."],
  blade: ["Pacte de la lame", "Action : crée dans ta main vide une arme de corps à corps de pacte, de la forme de ton choix ; tu la maîtrises et elle compte comme magique. Elle disparaît si elle reste à plus de 1,50 m de toi pendant 1 minute, si tu la renvoies ou si tu meurs. Un rituel d’une heure (repos court possible) lie une arme magique, hors artefact ou arme douée de conscience, qui devient ton arme de pacte."],
  tome: ["Pacte du grimoire", "Ton Livre des ombres contient trois sorts mineurs choisis dans n’importe quelles listes de classe ; tant que tu l’as sur toi, tu les lances à volonté et ils comptent comme sorts d’occultiste. Un livre perdu se remplace par une cérémonie d’une heure pendant un repos court ou long."],
};

/** Manifestations occultes du Manuel des joueurs 2014 (32).
 * minLevel = niveau d’occultiste requis ; requires = sort mineur requis ; pact = faveur requise. */
const INVOCATIONS = {
  agonizing: { name: "Décharge déchirante", summary: "Ajoute ton mod. CHA aux dégâts de chaque rayon de décharge occulte qui touche.", minLevel: 2, requires: "eldritch-blast", pact: null, grants: {} },
  armor: { name: "Armure d’ombres", summary: "Lance armure de mage sur toi à volonté, sans emplacement ni composante matérielle.", minLevel: 2, requires: null, pact: null, grants: { innateSpells: [{ id: "mage-armor", minLevel: 2, ability: "cha", castLevel: 1 }] } },
  ascendant: { name: "Pas aérien", summary: "Lance lévitation sur toi à volonté, sans emplacement ni composante matérielle.", minLevel: 9, requires: null, pact: null, grants: { innateSpells: [{ id: "levitate", minLevel: 9, ability: "cha", castLevel: 2 }] } },
  beast: { name: "Langage animal", summary: "Lance communication avec les animaux à volonté, sans emplacement.", minLevel: 2, requires: null, pact: null, grants: { innateSpells: [{ id: "speak-with-animals", minLevel: 2, ability: "cha", castLevel: 1 }] } },
  beguiling: { name: "Présence captivante", summary: "Tu gagnes la maîtrise des compétences Tromperie et Persuasion.", minLevel: 2, requires: null, pact: null, grants: { skills: ["deception", "persuasion"] } },
  bewitching: { name: "Murmures ensorcelants", summary: "Une fois par repos long, lance compulsion en dépensant un emplacement de Magie de pacte.", minLevel: 7, requires: null, pact: null, grants: { innateSpells: [{ id: "compulsion", minLevel: 7, ability: "cha", reset: "long" }] } },
  book: { name: "Livre des secrets anciens", summary: "Ton Livre des ombres reçoit deux sorts de niveau 1 ayant l’étiquette rituel, pris dans n’importe quelles listes ; tu les lances uniquement en rituel. Tu peux aussi lancer en rituel tes sorts d’occultiste connus qui le permettent, et copier dans le livre d’autres rituels trouvés, de niveau au plus égal à la moitié de ton niveau d’occultiste (arrondie au supérieur), pour 2 heures et 50 po par niveau.", minLevel: 2, requires: null, pact: "tome", grants: {} },
  chains: { name: "Chaînes des Carcères", summary: "Lance immobilisation de monstre à volonté sur un céleste, un fiélon ou un élémentaire, sans emplacement ni composante matérielle ; une même créature ne peut être reprise pour cible qu’après un repos long.", minLevel: 15, requires: null, pact: "chain", grants: { innateSpells: [{ id: "hold-monster", minLevel: 15, ability: "cha", castLevel: 5 }] } },
  sight: { name: "Vision du diable", summary: "Tu vois normalement dans les ténèbres, magiques ou non, jusqu’à 36 m.", minLevel: 2, requires: null, pact: null, grants: { darkvision: 36 } },
  dreadful: { name: "Mot d’effroi", summary: "Une fois par repos long, lance confusion en dépensant un emplacement de Magie de pacte.", minLevel: 7, requires: null, pact: null, grants: { innateSpells: [{ id: "confusion", minLevel: 7, ability: "cha", reset: "long" }] } },
  eldritchSight: { name: "Vision occulte", summary: "Lance détection de la magie à volonté, sans emplacement.", minLevel: 2, requires: null, pact: null, grants: { innateSpells: [{ id: "detect-magic", minLevel: 2, ability: "cha", castLevel: 1 }] } },
  spear: { name: "Lance occulte", summary: "La portée de ta décharge occulte passe à 90 m.", minLevel: 2, requires: "eldritch-blast", pact: null, grants: {} },
  eyes: { name: "Œil du gardien des runes", summary: "Tu peux lire toutes les écritures.", minLevel: 2, requires: null, pact: null, grants: {} },
  vigor: { name: "Vigueur fiélonne", summary: "Lance simulacre de vie sur toi à volonté, comme sort de niveau 1, sans emplacement ni composante matérielle.", minLevel: 2, requires: null, pact: null, grants: { innateSpells: [{ id: "false-life", minLevel: 2, ability: "cha", castLevel: 1 }] } },
  gaze: { name: "Perception transférée", summary: "Action : touche un humanoïde consentant et perçois par ses sens jusqu’à la fin de ton prochain tour ; une action à chaque tour prolonge le lien tant que vous êtes sur le même plan. Pendant ce temps, tu es aveugle et sourd à ton propre environnement.", minLevel: 2, requires: null, pact: null, grants: {} },
  lifedrinker: { name: "Buveuse de vie", summary: "Quand tu touches avec ton arme de pacte, la cible subit des dégâts nécrotiques supplémentaires égaux à ton mod. CHA (min. 1).", minLevel: 12, requires: null, pact: "blade", grants: {} },
  mask: { name: "Mille visages", summary: "Lance déguisement à volonté, sans emplacement.", minLevel: 2, requires: null, pact: null, grants: { innateSpells: [{ id: "disguise-self", minLevel: 2, ability: "cha", castLevel: 1 }] } },
  myriad: { name: "Maître des formes", summary: "Lance modification d’apparence à volonté, sans emplacement.", minLevel: 15, requires: null, pact: null, grants: { innateSpells: [{ id: "alter-self", minLevel: 15, ability: "cha", castLevel: 2 }] } },
  minions: { name: "Sbires du chaos", summary: "Une fois par repos long, lance invocation d’élémentaire en dépensant un emplacement de Magie de pacte.", minLevel: 9, requires: null, pact: null, grants: { innateSpells: [{ id: "conjure-elemental", minLevel: 9, ability: "cha", reset: "long" }] } },
  mire: { name: "Lenteur de l’esprit", summary: "Une fois par repos long, lance lenteur en dépensant un emplacement de Magie de pacte.", minLevel: 5, requires: null, pact: null, grants: { innateSpells: [{ id: "slow", minLevel: 5, ability: "cha", reset: "long" }] } },
  misty: { name: "Visions embrumées", summary: "Lance image silencieuse à volonté, sans emplacement ni composante matérielle.", minLevel: 2, requires: null, pact: null, grants: { innateSpells: [{ id: "silent-image", minLevel: 2, ability: "cha", castLevel: 1 }] } },
  shadows: { name: "Maître des ombres", summary: "Dans une zone de lumière faible ou de ténèbres, action : tu deviens invisible jusqu’à ce que tu te déplaces ou fasses une action ou une réaction.", minLevel: 5, requires: null, pact: null, grants: {} },
  leap: { name: "Saut d’Outremonde", summary: "Lance saut sur toi à volonté, sans emplacement ni composante matérielle.", minLevel: 9, requires: null, pact: null, grants: { innateSpells: [{ id: "jump", minLevel: 9, ability: "cha", castLevel: 1 }] } },
  repelling: { name: "Décharge répulsive", summary: "Chaque rayon de décharge occulte qui touche une créature peut la repousser de 3 m en ligne droite, loin de toi.", minLevel: 2, requires: "eldritch-blast", pact: null, grants: {} },
  sculptor: { name: "Sculpteur de chair", summary: "Une fois par repos long, lance métamorphose en dépensant un emplacement de Magie de pacte.", minLevel: 7, requires: null, pact: null, grants: { innateSpells: [{ id: "polymorph", minLevel: 7, ability: "cha", reset: "long" }] } },
  omen: { name: "Sombre présage", summary: "Une fois par repos long, lance malédiction en dépensant un emplacement de Magie de pacte.", minLevel: 5, requires: null, pact: null, grants: { innateSpells: [{ id: "bestow-curse", minLevel: 5, ability: "cha", reset: "long" }] } },
  fiveFates: { name: "Voleur des cinq destinées", summary: "Une fois par repos long, lance imprécation en dépensant un emplacement de Magie de pacte.", minLevel: 2, requires: null, pact: null, grants: { innateSpells: [{ id: "bane", minLevel: 2, ability: "cha", reset: "long" }] } },
  thirst: { name: "Lame assoiffée", summary: "Tu attaques deux fois avec ton arme de pacte, au lieu d’une, quand tu effectues l’action Attaquer à ton tour.", minLevel: 5, requires: null, pact: "blade", grants: { extraAttack: 2 } },
  visions: { name: "Royaumes lointains", summary: "Lance œil magique à volonté, sans emplacement.", minLevel: 15, requires: null, pact: null, grants: { innateSpells: [{ id: "arcane-eye", minLevel: 15, ability: "cha", castLevel: 4 }] } },
  voice: { name: "Voix du maître des Chaînes", summary: "Tant que ton familier est sur le même plan que toi, tu communiques avec lui par télépathie, perçois par ses sens et peux parler par sa bouche avec ta propre voix.", minLevel: 2, requires: null, pact: "chain", grants: {} },
  whispers: { name: "Murmures de la tombe", summary: "Lance communication avec les morts à volonté, sans emplacement.", minLevel: 9, requires: null, pact: null, grants: { innateSpells: [{ id: "speak-with-dead", minLevel: 9, ability: "cha", castLevel: 3 }] } },
  witchSight: { name: "Vision de sorcier", summary: "Tu vois la véritable forme des métamorphes et des créatures dissimulées par une illusion ou une transmutation, à 9 m et en ligne de vue.", minLevel: 15, requires: null, pact: null, grants: {} },
};

/** Manœuvres du Maître de guerre (16). Chacune dépense un dé de supériorité ; une seule par attaque. */
const MANEUVERS = {
  commandersStrike: ["Instruction", "Quand tu effectues l’action Attaquer, renonce à une de tes attaques et utilise ton action bonus : un allié qui te voit ou t’entend peut faire une attaque d’arme avec sa réaction, en ajoutant le dé de supériorité à ses dégâts."],
  disarmingAttack: ["Désarmement", "Après un coup au but avec une arme, ajoute le dé de supériorité aux dégâts ; la cible réussit une sauvegarde de FOR ou lâche un objet de ton choix qu’elle tient, qui tombe à ses pieds."],
  distractingStrike: ["Diversion", "Après un coup au but avec une arme, ajoute le dé de supériorité aux dégâts ; la prochaine attaque d’un autre que toi contre cette cible a l’avantage, si elle a lieu avant le début de ton prochain tour."],
  evasiveFootwork: ["Jeu de jambes défensif", "Quand tu te déplaces, lance le dé de supériorité et ajoute le résultat à ta CA jusqu’à la fin de ce déplacement."],
  feintingAttack: ["Feinte", "Action bonus à ton tour : feinte contre une créature à 1,50 m ; tu as l’avantage à ta prochaine attaque contre elle pendant ce tour et, si elle touche, le dé de supériorité s’ajoute aux dégâts."],
  goadingAttack: ["Provocation", "Après un coup au but avec une arme, ajoute le dé de supériorité aux dégâts ; la cible réussit une sauvegarde de SAG ou a le désavantage à ses attaques contre d’autres cibles que toi jusqu’à la fin de ton prochain tour."],
  lungingAttack: ["Fente", "À ton tour, pour une attaque d’arme au corps à corps, ton allonge augmente de 1,50 m ; si l’attaque touche, ajoute le dé de supériorité aux dégâts."],
  maneuveringAttack: ["Manœuvre tactique", "Après un coup au but avec une arme, ajoute le dé de supériorité aux dégâts ; un allié qui te voit ou t’entend peut, avec sa réaction, se déplacer de la moitié de sa vitesse sans provoquer d’attaque d’opportunité de ta cible."],
  menacingAttack: ["Attaque menaçante", "Après un coup au but avec une arme, ajoute le dé de supériorité aux dégâts ; la cible réussit une sauvegarde de SAG ou est effrayée par toi jusqu’à la fin de ton prochain tour."],
  parry: ["Parade", "Réaction quand une créature t’inflige des dégâts avec une attaque au corps à corps : réduis-les du résultat du dé de supériorité + ton mod. DEX."],
  precisionAttack: ["Attaque précise", "Ajoute le dé de supériorité à un jet d’attaque avec une arme, avant ou après le jet, mais avant d’en connaître les effets."],
  pushingAttack: ["Repousser", "Après un coup au but avec une arme, ajoute le dé de supériorité aux dégâts ; une cible de taille G ou inférieure réussit une sauvegarde de FOR ou est repoussée de 4,50 m."],
  rally: ["Regain", "Action bonus à ton tour : un allié qui te voit ou t’entend gagne des PV temporaires égaux au résultat du dé de supériorité + ton mod. CHA."],
  riposte: ["Riposte", "Réaction quand une créature te rate au corps à corps : fais une attaque d’arme au corps à corps contre elle ; si elle touche, ajoute le dé de supériorité aux dégâts."],
  sweepingAttack: ["Balayage", "Après un coup au but au corps à corps, vise une autre créature à 1,50 m de la cible et à ton allonge : si ton jet d’attaque l’aurait touchée, elle subit le résultat du dé de supériorité en dégâts, du même type que l’attaque."],
  tripAttack: ["Croc-en-jambe", "Après un coup au but avec une arme, ajoute le dé de supériorité aux dégâts ; une cible de taille G ou inférieure réussit une sauvegarde de FOR ou tombe à terre."],
};

/** Disciplines élémentaires de la Voie des quatre éléments : [nom, résumé, niveau de moine minimum, coût].
 * Lien élémentaire, connu d’office, est décrit dans la sous-classe. Les disciplines qui lancent un sort
 * se passent de composantes matérielles et peuvent être renforcées avec du ki supplémentaire. */
const DISCIPLINES = {
  breathOfWinter: ["Souffle de l’hiver", "Lance cône de froid.", 17, "6 ki"],
  clenchNorthWind: ["Étreinte du vent du nord", "Lance immobilisation de personne.", 6, "3 ki"],
  eternalMountain: ["Défense de la montagne éternelle", "Lance peau de pierre, sur toi uniquement.", 17, "5 ki"],
  fangsFireSnake: ["Crochets du serpent de feu", "Quand tu effectues l’action Attaquer, ton allonge à mains nues augmente de 3 m pour cette action et le reste du tour, et tes coups infligent des dégâts de feu au lieu de contondants ; 1 ki de plus sur un coup au but ajoute 1d10 dégâts de feu.", 3, "1 ki"],
  fistFourThunders: ["Poing des quatre tonnerres", "Lance vague tonnante.", 3, "2 ki"],
  fistUnbrokenAir: ["Poing de l’air", "Action : une créature à 9 m fait une sauvegarde de FOR ; échec : 3d10 dégâts contondants (+1d10 par ki supplémentaire), repoussée de 6 m et jetée à terre ; réussite : moitié des dégâts, sans autre effet.", 3, "2 ki"],
  flamesPhoenix: ["Flammes du phénix", "Lance boule de feu.", 11, "4 ki"],
  gongSummit: ["Gong du sommet", "Lance fracassement.", 6, "3 ki"],
  mistStance: ["Posture de brume", "Lance forme gazeuse, sur toi uniquement.", 11, "4 ki"],
  rideWind: ["Destrier des vents", "Lance vol, sur toi uniquement.", 11, "4 ki"],
  riverHungryFlame: ["Torrent de flammes voraces", "Lance mur de feu.", 17, "5 ki"],
  rushGaleSpirits: ["Ruée des esprits du vent", "Lance bourrasque.", 3, "2 ki"],
  shapeFlowingRiver: ["Façonnage de la rivière", "Action : dans une zone d’eau ou de glace de 9 m de côté au plus, à 36 m, change l’eau en glace (ou l’inverse) et remodèle la glace (mur, tranchée, pilier, élévation) sur au plus la moitié de la plus grande dimension de la zone, sans piéger ni blesser de créature.", 3, "1 ki"],
  sweepingCinder: ["Frappe de cendres", "Lance mains brûlantes.", 3, "2 ki"],
  waterWhip: ["Fouet de l’onde", "Action : une créature que tu vois à 9 m fait une sauvegarde de DEX ; échec : 3d10 dégâts contondants (+1d10 par ki supplémentaire), et tu la jettes à terre ou l’attires de 7,50 m vers toi ; réussite : moitié des dégâts, sans autre effet.", 3, "2 ki"],
  waveRollingEarth: ["Vague de terre grondante", "Lance mur de pierre.", 17, "6 ki"],
};


// Module : subclasses
/** Sous-classes du Manuel des joueurs 2014 (40), résumés originaux en français.
 * Tous les niveaux sont des niveaux de la classe concernée. grants : objet G du contrat, indexé par niveau de classe.
 * Les Conduits divins du clerc et du paladin sont comptés par la classe : seules leurs options figurent ici.
 * Les options de choix renvoient soit à un objet { id: [nom, résumé] }, soit à une table de features.js. */
const SUBCLASSES = {
  barbarian: {
    berserker: {
      name: "Voie du berserker",
      source: "srd",
      desc: "Une fureur sans retenue : la frénésie donne une attaque de plus à chaque tour, au prix de l’épuisement. Pour qui veut frapper fort et souvent.",
      features: [
        [3, "Frénésie", "Quand tu entres en rage, tu peux choisir la frénésie : jusqu’à la fin de cette rage, une attaque d’arme au corps à corps en action bonus à chacun de tes tours suivants. À la fin de la rage, tu subis un niveau d’épuisement."],
        [6, "Rage aveugle", "En rage, tu ne peux être ni charmé ni effrayé ; un tel effet déjà présent est suspendu pendant la rage."],
        [10, "Présence intimidante", "Action : une créature que tu vois à 9 m, et qui te voit ou t’entend, réussit une sauvegarde de SAG (DD 8 + maîtrise + mod. CHA) ou est effrayée par toi jusqu’à la fin de ton prochain tour. Une action à chaque tour prolonge l’effet, qui cesse si elle finit son tour hors de ta vue ou à plus de 18 m. Après une réussite, elle est immunisée pendant 24 heures."],
        [14, "Représailles", "Quand une créature à 1,50 m de toi t’inflige des dégâts, ta réaction te permet de lui porter une attaque d’arme au corps à corps."],
      ],
      grants: {},
      resources: [],
      choices: [],
    },
    totemWarrior: {
      name: "Voie du guerrier totem",
      source: "phb",
      desc: "Un barbare guidé par l’esprit d’un animal : l’ours pour encaisser, l’aigle pour la mobilité, le loup pour épauler les alliés. Chaque palier permet un animal différent.",
      features: [
        [3, "Quêteur spirituel", "Tu peux lancer sens animal et communication avec les animaux, uniquement sous forme de rituel."],
        [3, "Esprit totem", "Choisis un animal totem et porte un objet qui le représente. Ours : en rage, résistance à tous les dégâts sauf psychiques. Aigle : en rage sans armure lourde, les attaques d’opportunité contre toi ont le désavantage et tu peux Foncer en action bonus. Loup : en rage, tes alliés ont l’avantage aux attaques au corps à corps contre toute créature hostile à 1,50 m de toi."],
        [6, "Aspect de la bête", "Choisis un animal. Ours : capacité de charge doublée et avantage aux tests de FOR pour pousser, tirer, soulever ou briser. Aigle : vision nette jusqu’à 1,5 km et pas de désavantage aux tests de SAG (Perception) en lumière faible. Loup : en voyage, pistage à allure rapide et discrétion à allure normale."],
        [10, "Marcheur spirituel", "Tu peux lancer communion avec la nature, uniquement sous forme de rituel ; un esprit de ton animal totem t’apporte les réponses."],
        [14, "Lien totémique", "Choisis un animal. Ours : en rage, les créatures hostiles à 1,50 m de toi ont le désavantage pour attaquer une autre cible que toi. Aigle : en rage, vitesse de vol égale à ta vitesse de marche, mais tu tombes si tu finis ton tour en l’air. Loup : en rage, quand tu touches au corps à corps une créature de taille G ou inférieure, action bonus pour la jeter à terre."],
      ],
      grants: {
        3: { innateSpells: [{ id: "beast-sense", minLevel: 3, ability: "wis", castLevel: 2, ritualOnly: true }, { id: "speak-with-animals", minLevel: 3, ability: "wis", castLevel: 1, ritualOnly: true }] },
        10: { innateSpells: [{ id: "commune-with-nature", minLevel: 10, ability: "wis", castLevel: 5, ritualOnly: true }] },
      },
      resources: [],
      choices: [
        {
          key: "totemSpirit",
          title: "Esprit totem",
          help: "Animal choisi au niveau 3 ; tu portes un objet qui le représente.",
          levels: { 3: 1 },
          options: {
            bear: ["Ours", "En rage, résistance à tous les dégâts sauf psychiques."],
            eagle: ["Aigle", "En rage sans armure lourde, les attaques d’opportunité contre toi ont le désavantage et tu peux Foncer en action bonus."],
            wolf: ["Loup", "En rage, tes alliés ont l’avantage aux attaques au corps à corps contre toute créature hostile à 1,50 m de toi."],
          },
        },
        {
          key: "beastAspect",
          title: "Aspect de la bête",
          help: "Animal choisi au niveau 6, identique ou non au précédent.",
          levels: { 6: 1 },
          options: {
            bear: ["Ours", "Capacité de charge (porter, pousser, tirer, soulever) doublée et avantage aux tests de FOR pour pousser, tirer, soulever ou briser un objet."],
            eagle: ["Aigle", "Vision nette jusqu’à 1,5 km, avec des détails comme à 30 m ; la lumière faible n’impose pas de désavantage à tes tests de SAG (Perception)."],
            wolf: ["Loup", "En voyage, tu pistes les créatures à allure rapide et te déplaces discrètement à allure normale."],
          },
        },
        {
          key: "totemicAttunement",
          title: "Lien totémique",
          help: "Animal choisi au niveau 14, identique ou non aux précédents.",
          levels: { 14: 1 },
          options: {
            bear: ["Ours", "En rage, les créatures hostiles à 1,50 m de toi ont le désavantage pour attaquer une autre cible que toi, sauf si elles ne peuvent ni te voir ni t’entendre ou ne peuvent pas être effrayées."],
            eagle: ["Aigle", "En rage, vitesse de vol égale à ta vitesse de marche, par courtes envolées : tu tombes si tu finis ton tour en l’air sans autre soutien."],
            wolf: ["Loup", "En rage, quand tu touches une créature de taille G ou inférieure avec une attaque d’arme au corps à corps, action bonus pour la jeter à terre."],
          },
        },
      ],
    },
  },

  bard: {
    lore: {
      name: "Collège du savoir",
      source: "srd",
      desc: "Le barde érudit : davantage de compétences, des sorts pris dans toutes les listes et des répliques qui sabotent les jets adverses.",
      features: [
        [3, "Maîtrises supplémentaires", "Maîtrise de trois compétences de ton choix."],
        [3, "Mots cinglants", "Réaction quand une créature que tu vois à 18 m fait un jet d’attaque, un test de caractéristique ou un jet de dégâts : dépense une Inspiration bardique et soustrais le dé à son résultat, après le jet mais avant que l’issue soit connue ou les dégâts infligés. Sans effet si elle ne t’entend pas ou ne peut pas être charmée."],
        [6, "Secrets magiques supplémentaires", "Apprends deux sorts de n’importe quelle classe (sorts mineurs ou d’un niveau que tu peux lancer). Ils comptent comme sorts de barde mais pas dans ton nombre de sorts connus."],
        [14, "Compétence hors-pair", "Quand tu fais un test de caractéristique, dépense une Inspiration bardique pour ajouter le dé au résultat, après avoir vu le d20 mais avant de connaître l’issue."],
      ],
      grants: { 3: { skillChoice: { count: 3 } }, 6: { spellsKnownBonus: 2 } },
      resources: [],
      choices: [],
    },
    valor: {
      name: "Collège de la vaillance",
      source: "phb",
      desc: "Le barde des champs de bataille : armure intermédiaire, armes de guerre, attaque supplémentaire et inspiration qui renforce coups et défense.",
      features: [
        [3, "Maîtrises supplémentaires", "Maîtrise des armures intermédiaires, des boucliers et des armes de guerre."],
        [3, "Inspiration martiale", "Une créature qui a ton dé d’Inspiration bardique peut aussi l’ajouter à un jet de dégâts d’arme qu’elle vient de faire, ou, avec sa réaction, à sa CA contre une attaque qui la vise, après le jet mais avant de savoir s’il touche."],
        [6, "Attaque supplémentaire", "Tu attaques deux fois, au lieu d’une, quand tu effectues l’action Attaquer à ton tour."],
        [14, "Magie de combat", "Quand tu utilises ton action pour lancer un sort de barde, tu peux faire une attaque avec une arme en action bonus."],
      ],
      grants: { 3: { armor: ["medium", "shield"], weapons: ["martial"] }, 6: { extraAttack: 2 } },
      resources: [],
      choices: [],
    },
  },

  cleric: {
    knowledge: {
      name: "Domaine du savoir",
      source: "phb",
      desc: "Le clerc érudit : langues, expertise dans les connaissances, maîtrise temporaire de n’importe quelle compétence et lecture des pensées.",
      features: [
        [1, "Bénédictions du savoir", "Deux langues de ton choix, et maîtrise de deux compétences parmi Arcanes, Histoire, Nature et Religion, avec un bonus de maîtrise doublé pour elles."],
        [2, "Conduit divin : savoir ancestral", "Action : choisis une compétence ou un outil ; tu le maîtrises pendant 10 minutes."],
        [6, "Conduit divin : lecture des pensées", "Action : une créature que tu vois à 18 m fait une sauvegarde de SAG. Échec : pendant 1 minute, tu lis ses pensées superficielles tant qu’elle reste à 18 m, et une action te permet d’y mettre fin pour lui lancer suggestion sans emplacement (échec automatique à la sauvegarde). Réussite : immunisée jusqu’à ton prochain repos long."],
        [8, "Incantation puissante", "Ajoute ton mod. SAG aux dégâts de tes sorts mineurs de clerc."],
        [17, "Visions du passé", "Après au moins 1 minute de méditation (concentration, au plus autant de minutes que ta valeur de SAG), reçois des visions : en tenant un objet, comment ses récents possesseurs l’ont obtenu et perdu et l’événement marquant le plus récent ; ou sur les lieux (cube de 15 m au plus), un événement important par minute, en remontant jusqu’à autant de jours que ta valeur de SAG. Une fois par repos court ou long."],
      ],
      grants: { 1: { languageChoice: { count: 2 }, skillChoice: { count: 2, from: ["arcana", "history", "nature", "religion"], expertise: true } } },
      alwaysPrepared: [[1, "command", "identify"], [3, "augury", "suggestion"], [5, "nondetection", "speak-with-dead"], [7, "arcane-eye", "confusion"], [9, "legend-lore", "scrying"]],
      resources: [{ id: "visionsOfThePast", name: "Visions du passé", max: 1, reset: "short", minLevel: 17 }],
      choices: [],
    },
    life: {
      name: "Domaine de la vie",
      source: "srd",
      desc: "Le soigneur par excellence : armure lourde, soins renforcés et rendus en masse. Idéal pour garder tout le groupe debout.",
      features: [
        [1, "Maîtrise supplémentaire", "Maîtrise des armures lourdes."],
        [1, "Disciple de la vie", "Tes sorts de niveau 1 ou plus qui rendent des PV en rendent 2 + niveau du sort de plus."],
        [2, "Conduit divin : préservation de la vie", "Action : répartis jusqu’à 5 × ton niveau de clerc PV entre des créatures à 9 m, sans porter aucune au-delà de la moitié de ses PV maximum. Sans effet sur les morts-vivants et les artificiels."],
        [6, "Guérisseur béni", "Quand un de tes sorts de niveau 1 ou plus rend des PV à une autre créature que toi, tu récupères 2 + niveau du sort PV."],
        [8, "Frappe divine", "Une fois à chacun de tes tours, une attaque d’arme qui touche inflige 1d8 dégâts radiants de plus ; 2d8 au niveau 14."],
        [17, "Guérison suprême", "Quand un sort te fait lancer des dés pour rendre des PV, utilise le maximum de chaque dé au lieu de le lancer."],
      ],
      grants: { 1: { armor: ["heavy"] } },
      alwaysPrepared: [[1, "bless", "cure-wounds"], [3, "lesser-restoration", "spiritual-weapon"], [5, "beacon-of-hope", "revivify"], [7, "death-ward", "guardian-of-faith"], [9, "mass-cure-wounds", "raise-dead"]],
      resources: [],
      choices: [],
    },
    light: {
      name: "Domaine de la lumière",
      source: "phb",
      desc: "Un clerc offensif qui manie le feu et le radiant : sorts de zone, éclats qui gênent les attaquants et aura solaire.",
      features: [
        [1, "Sort mineur supplémentaire", "Tu connais le sort mineur lumière, en plus de ton quota."],
        [1, "Illumination protectrice", "Réaction quand une créature que tu vois à 9 m t’attaque : un éclat de lumière lui impose le désavantage, sauf si elle ne peut pas être aveuglée. Utilisations = mod. SAG (min. 1) par repos long."],
        [2, "Conduit divin : radiance de l’aube", "Action : dissipe toute obscurité magique à 9 m ; chaque créature hostile à 9 m fait une sauvegarde de CON : 2d10 + niveau de clerc dégâts radiants, moitié en cas de réussite (l’abri total protège)."],
        [6, "Illumination améliorée", "Tu peux aussi utiliser Illumination protectrice quand une créature que tu vois à 9 m attaque une autre créature que toi."],
        [8, "Incantation puissante", "Ajoute ton mod. SAG aux dégâts de tes sorts mineurs de clerc."],
        [17, "Halo de lumière", "Action : aura de lumière du soleil pendant 1 minute (lumière vive sur 18 m, faible sur 9 m de plus), révocable par une action. Tes ennemis dans la lumière vive ont le désavantage aux sauvegardes contre les sorts qui infligent des dégâts de feu ou radiants."],
      ],
      grants: { 1: { cantrips: [{ id: "light", ability: "wis" }] } },
      alwaysPrepared: [[1, "burning-hands", "faerie-fire"], [3, "flaming-sphere", "scorching-ray"], [5, "daylight", "fireball"], [7, "guardian-of-faith", "wall-of-fire"], [9, "flame-strike", "scrying"]],
      resources: [{ id: "wardingFlare", name: "Illumination protectrice", max: (ctx) => Math.max(1, ctx.mods.wis), reset: "long" }],
      choices: [],
    },
    nature: {
      name: "Domaine de la nature",
      source: "phb",
      desc: "Un clerc proche des druides : armure lourde, sort mineur druidique, charme des bêtes et des plantes, protection contre les éléments.",
      features: [
        [1, "Acolyte de la nature", "Un sort mineur de druide de ton choix, en plus de ton quota, et maîtrise d’une compétence parmi Dressage, Nature et Survie."],
        [1, "Maîtrise supplémentaire", "Maîtrise des armures lourdes."],
        [2, "Conduit divin : charme des animaux et des plantes", "Action : chaque bête ou créature végétale qui te voit à 9 m fait une sauvegarde de SAG ; échec : charmée pendant 1 minute ou jusqu’à ce qu’elle subisse des dégâts, et amicale envers toi et tes compagnons."],
        [6, "Atténuation des éléments", "Réaction quand toi ou une créature à 9 m subissez des dégâts d’acide, de froid, de feu, de foudre ou de tonnerre : résistance contre cette source de dégâts."],
        [8, "Frappe divine", "Une fois à chacun de tes tours, une attaque d’arme qui touche inflige 1d8 dégâts de froid, de feu ou de foudre (au choix) de plus ; 2d8 au niveau 14."],
        [17, "Maître de la nature", "Action bonus : donne des ordres verbaux aux créatures charmées par ton Conduit divin ; chacune les exécute à son prochain tour."],
      ],
      grants: { 1: { armor: ["heavy"], cantripChoice: { count: 1, list: "druid", ability: "wis" }, skillChoice: { count: 1, from: ["animal", "nature", "survival"] } } },
      alwaysPrepared: [[1, "animal-friendship", "speak-with-animals"], [3, "barkskin", "spike-growth"], [5, "plant-growth", "wind-wall"], [7, "dominate-beast", "grasping-vine"], [9, "insect-plague", "tree-stride"]],
      resources: [],
      choices: [],
    },
    tempest: {
      name: "Domaine de la tempête",
      source: "phb",
      desc: "Un clerc guerrier qui commande au tonnerre et à la foudre : armes de guerre, armure lourde, représailles électriques et dégâts maximisés.",
      features: [
        [1, "Maîtrises supplémentaires", "Maîtrise des armes de guerre et des armures lourdes."],
        [1, "Fureur de l’ouragan", "Réaction quand une créature que tu vois à 1,50 m te touche : elle fait une sauvegarde de DEX et subit 2d8 dégâts de foudre ou de tonnerre (au choix), moitié en cas de réussite. Utilisations = mod. SAG (min. 1) par repos long."],
        [2, "Conduit divin : fureur destructrice", "Quand tu lances des dés de dégâts de foudre ou de tonnerre, utilise ton Conduit divin pour infliger le maximum au lieu de lancer les dés."],
        [6, "Frappe de l’éclair", "Quand tu infliges des dégâts de foudre à une créature de taille G ou inférieure, tu peux aussi la repousser de 3 m."],
        [8, "Frappe divine", "Une fois à chacun de tes tours, une attaque d’arme qui touche inflige 1d8 dégâts de tonnerre de plus ; 2d8 au niveau 14."],
        [17, "Enfant de la tempête", "Vitesse de vol égale à ta vitesse de marche, sauf sous terre ou en intérieur."],
      ],
      grants: { 1: { armor: ["heavy"], weapons: ["martial"] } },
      alwaysPrepared: [[1, "fog-cloud", "thunderwave"], [3, "gust-of-wind", "shatter"], [5, "call-lightning", "sleet-storm"], [7, "control-water", "ice-storm"], [9, "destructive-wave", "insect-plague"]],
      resources: [{ id: "wrathOfTheStorm", name: "Fureur de l’ouragan", max: (ctx) => Math.max(1, ctx.mods.wis), reset: "long" }],
      choices: [],
    },
    trickery: {
      name: "Domaine de la duperie",
      source: "phb",
      desc: "Le clerc des ruses et des faux-semblants : discrétion bénie, répliques illusoires de soi et invisibilité.",
      features: [
        [1, "Bénédiction de l’escroc", "Action : une créature consentante autre que toi, que tu touches, a l’avantage aux tests de DEX (Discrétion) pendant 1 heure ou jusqu’à ce que tu réutilises cette aptitude."],
        [2, "Conduit divin : invocation de réplique", "Action : crée une réplique illusoire de toi dans un espace libre visible à 9 m, pendant 1 minute (concentration). Action bonus : déplace-la de 9 m, sans t’éloigner de plus de 36 m. Tu peux lancer tes sorts depuis sa position, et tu as l’avantage aux attaques contre une créature qui voit la réplique si vous êtes tous deux à 1,50 m d’elle."],
        [6, "Conduit divin : linceul d’ombre", "Action : tu deviens invisible jusqu’à la fin de ton prochain tour, ou jusqu’à ce que tu attaques ou lances un sort."],
        [8, "Frappe divine", "Une fois à chacun de tes tours, une attaque d’arme qui touche inflige 1d8 dégâts de poison de plus ; 2d8 au niveau 14."],
        [17, "Réplique améliorée", "Ton Invocation de réplique crée jusqu’à quatre répliques, et une action bonus déplace celles que tu veux de 9 m (36 m de toi au plus)."],
      ],
      grants: {},
      alwaysPrepared: [[1, "charm-person", "disguise-self"], [3, "mirror-image", "pass-without-trace"], [5, "blink", "dispel-magic"], [7, "dimension-door", "polymorph"], [9, "dominate-person", "modify-memory"]],
      resources: [],
      choices: [],
    },
    war: {
      name: "Domaine de la guerre",
      source: "phb",
      desc: "Le clerc combattant : armes de guerre, armure lourde, attaques en action bonus et coups guidés par la foi.",
      features: [
        [1, "Maîtrises supplémentaires", "Maîtrise des armes de guerre et des armures lourdes."],
        [1, "Prêtre de guerre", "Quand tu effectues l’action Attaquer, tu peux faire une attaque avec une arme en action bonus. Utilisations = mod. SAG (min. 1) par repos long."],
        [2, "Conduit divin : frappe guidée", "+10 à un de tes jets d’attaque, décidé après le jet mais avant de savoir s’il touche."],
        [6, "Conduit divin : bénédiction du dieu de la guerre", "Réaction : +10 au jet d’attaque d’une créature à 9 m, décidé après le jet mais avant de savoir s’il touche."],
        [8, "Frappe divine", "Une fois à chacun de tes tours, une attaque d’arme qui touche inflige 1d8 dégâts de plus, du même type que ceux de l’arme ; 2d8 au niveau 14."],
        [17, "Avatar de bataille", "Résistance aux dégâts contondants, perforants et tranchants infligés par des armes non magiques."],
      ],
      grants: { 1: { armor: ["heavy"], weapons: ["martial"] } },
      alwaysPrepared: [[1, "divine-favor", "shield-of-faith"], [3, "magic-weapon", "spiritual-weapon"], [5, "crusaders-mantle", "spirit-guardians"], [7, "freedom-of-movement", "stoneskin"], [9, "flame-strike", "hold-monster"]],
      resources: [{ id: "warPriest", name: "Prêtre de guerre", max: (ctx) => Math.max(1, ctx.mods.wis), reset: "long" }],
      choices: [],
    },
  },

  druid: {
    land: {
      name: "Cercle de la terre",
      source: "srd",
      desc: "Le druide lanceur de sorts : un sort mineur de plus, des emplacements récupérés en repos court et des sorts liés à son terrain d’origine.",
      features: [
        [2, "Sort mineur supplémentaire", "Tu apprends un sort mineur de druide supplémentaire."],
        [2, "Récupération naturelle", "Pendant un repos court, récupère des emplacements dont la somme des niveaux ne dépasse pas la moitié de ton niveau de druide (arrondie au supérieur), aucun de niveau 6 ou plus. Une fois par repos long."],
        [3, "Sorts de cercle", "Selon le terrain choisi au niveau 2, des sorts s’ajoutent aux niveaux 3, 5, 7 et 9 : toujours préparés, hors quota, et considérés comme sorts de druide même s’ils ne sont pas sur ta liste."],
        [6, "Foulée tellurique", "Le terrain difficile non magique ne te coûte pas de déplacement supplémentaire, et les plantes non magiques ne te ralentissent ni ne te blessent. Avantage aux sauvegardes contre les plantes créées ou manipulées par magie pour gêner le mouvement."],
        [10, "Protégé de dame Nature", "Les élémentaires et les fées ne peuvent ni te charmer ni t’effrayer, et tu es immunisé contre le poison et les maladies."],
        [14, "Sanctuaire de dame Nature", "Une bête ou une créature végétale qui veut t’attaquer fait d’abord une sauvegarde de SAG contre ton DD de sorts : sur un échec, elle doit choisir une autre cible ou l’attaque rate automatiquement ; sur une réussite, elle est immunisée pendant 24 heures. Elle connaît cet effet avant d’attaquer."],
      ],
      grants: { 2: { extraCantrips: 1 }, 10: { immunities: ["poison"] } },
      landSpells: {
        arctic: [[3, "hold-person", "spike-growth"], [5, "sleet-storm", "slow"], [7, "freedom-of-movement", "ice-storm"], [9, "commune-with-nature", "cone-of-cold"]],
        coast: [[3, "mirror-image", "misty-step"], [5, "water-breathing", "water-walk"], [7, "control-water", "freedom-of-movement"], [9, "conjure-elemental", "scrying"]],
        desert: [[3, "blur", "silence"], [5, "create-food-and-water", "protection-from-energy"], [7, "blight", "hallucinatory-terrain"], [9, "insect-plague", "wall-of-stone"]],
        forest: [[3, "barkskin", "spider-climb"], [5, "call-lightning", "plant-growth"], [7, "divination", "freedom-of-movement"], [9, "commune-with-nature", "tree-stride"]],
        grassland: [[3, "invisibility", "pass-without-trace"], [5, "daylight", "haste"], [7, "divination", "freedom-of-movement"], [9, "dream", "insect-plague"]],
        mountain: [[3, "spider-climb", "spike-growth"], [5, "lightning-bolt", "meld-into-stone"], [7, "stone-shape", "stoneskin"], [9, "passwall", "wall-of-stone"]],
        swamp: [[3, "darkness", "melfs-acid-arrow"], [5, "water-walk", "stinking-cloud"], [7, "freedom-of-movement", "locate-creature"], [9, "insect-plague", "scrying"]],
        underdark: [[3, "spider-climb", "web"], [5, "gaseous-form", "stinking-cloud"], [7, "greater-invisibility", "stone-shape"], [9, "cloudkill", "insect-plague"]],
      },
      resources: [
        {
          id: "naturalRecovery",
          name: "Récupération naturelle",
          max: 1,
          reset: "long",
          minLevel: 2,
          note: (ctx) => `Pendant un repos court : emplacements totalisant au plus ${Math.ceil(ctx.level / 2)} niveaux, aucun de niveau 6 ou plus.`,
        },
      ],
      choices: [
        {
          key: "land",
          title: "Terrain du cercle",
          help: "Le terrain où tu es devenu druide : il fixe tes sorts de cercle des niveaux 3, 5, 7 et 9.",
          levels: { 2: 1 },
          options: {
            arctic: ["Arctique", "Froid et entraves : glace, lenteur, immobilisation."],
            coast: ["Littoral", "Eau et mobilité : respiration aquatique, marche sur l’onde, contrôle de l’eau."],
            desert: ["Désert", "Survie et mirages : flou, silence, nourriture, terrain illusoire."],
            forest: ["Forêt", "Bois et orages : écorce, croissance végétale, foudre, voyage par les arbres."],
            grassland: ["Plaine", "Vitesse et lumière : invisibilité, hâte, lumière du jour, songe."],
            mountain: ["Montagne", "Roc et hauteurs : escalade, fusion dans la pierre, murs de pierre."],
            swamp: ["Marais", "Poison et ténèbres : acide, nuage puant, localisation."],
            underdark: ["Outreterre", "Souterrains : toiles, forme gazeuse, façonnage de la pierre."],
          },
        },
      ],
    },
    moon: {
      name: "Cercle de la lune",
      source: "phb",
      desc: "Le druide métamorphe : des formes sauvages puissantes prises en action bonus, puis des formes d’élémentaire. Idéal pour combattre au contact.",
      features: [
        [2, "Forme sauvage de combat", "Forme sauvage en action bonus au lieu d’une action. Transformé, une action bonus et un emplacement de sort te rendent 1d8 PV par niveau de l’emplacement."],
        [2, "Formes du cercle", "Ta Forme sauvage peut atteindre le FP 1 (les limites de nage et de vol de la classe s’appliquent toujours) ; à partir du niveau 6, FP maximal = niveau de druide ÷ 3, arrondi à l’inférieur."],
        [6, "Frappe primitive", "En forme de bête, tes attaques comptent comme magiques pour vaincre les résistances et immunités aux attaques non magiques."],
        [10, "Forme sauvage élémentaire", "Dépense deux utilisations de Forme sauvage d’un coup pour devenir un élémentaire de l’air, de la terre, du feu ou de l’eau."],
        [14, "Mille formes", "Tu peux lancer modification d’apparence à volonté."],
      ],
      grants: { 14: { innateSpells: [{ id: "alter-self", minLevel: 14, ability: "wis", castLevel: 2 }] } },
      resources: [],
      choices: [],
    },
  },

  fighter: {
    champion: {
      name: "Champion",
      source: "srd",
      desc: "Le guerrier le plus simple à jouer : des critiques plus fréquents, un athlétisme accru et un second style de combat.",
      features: [
        [3, "Critique amélioré", "Tes attaques avec une arme sont des coups critiques sur 19 ou 20 au d20."],
        [7, "Athlète accompli", "Ajoute la moitié de ton bonus de maîtrise (arrondie au supérieur) aux tests de FOR, DEX ou CON qui ne l’incluent pas déjà. Ton saut en longueur avec élan s’allonge de 30 cm par point de mod. FOR."],
        [10, "Style de combat supplémentaire", "Choisis un deuxième style de combat, différent du premier."],
        [15, "Critique supérieur", "Tes attaques avec une arme sont des coups critiques sur 18 à 20 au d20."],
        [18, "Survivant", "Au début de chacun de tes tours, si tu as au plus la moitié de tes PV (mais au moins 1), récupère 5 + mod. CON PV."],
      ],
      grants: {},
      resources: [],
      choices: [{ key: "secondStyle", title: "Style de combat supplémentaire", help: "Un style différent de celui choisi au niveau 1.", levels: { 10: 1 }, options: "STYLES" }],
    },
    battleMaster: {
      name: "Maître de guerre",
      source: "phb",
      desc: "Le tacticien : des dés de supériorité alimentent des manœuvres pour désarmer, renverser, protéger ou aider les alliés.",
      features: [
        [3, "Supériorité martiale", "Tu apprends trois manœuvres (deux de plus aux niveaux 7, 10 et 15, avec la possibilité d’en échanger une à chacun de ces niveaux). Quatre dés de supériorité (d8), cinq au niveau 7 et six au niveau 15, récupérés après un repos court ou long ; une seule manœuvre par attaque. DD des manœuvres = 8 + maîtrise + mod. FOR ou DEX."],
        [3, "Disciple martial", "Maîtrise d’un type d’outils d’artisan de ton choix."],
        [7, "Observation de l’ennemi", "Après 1 minute à observer ou côtoyer une créature hors combat, apprends si elle t’est égale, supérieure ou inférieure sur deux critères au choix : FOR, DEX, CON, CA, PV actuels, niveaux de classe totaux ou niveaux de guerrier."],
        [10, "Supériorité martiale améliorée", "Tes dés de supériorité deviennent des d10, puis des d12 au niveau 18."],
        [15, "Implacable", "Quand tu lances l’initiative sans aucun dé de supériorité, tu en récupères un."],
        [18, "Supériorité martiale améliorée (d12)", "Tes dés de supériorité deviennent des d12."],
      ],
      grants: { 3: { toolChoice: { count: 1, from: "artisan" } } },
      resources: [
        {
          id: "superiorityDice",
          name: "Dés de supériorité",
          max: (ctx) => (ctx.level >= 15 ? 6 : ctx.level >= 7 ? 5 : 4),
          reset: "short",
          minLevel: 3,
          note: (ctx) => `d${ctx.level >= 18 ? 12 : ctx.level >= 10 ? 10 : 8} · DD des manœuvres ${8 + ctx.prof + Math.max(ctx.mods.str, ctx.mods.dex)}`,
        },
      ],
      choices: [{ key: "maneuvers", title: "Manœuvres", help: "Trois au niveau 3, puis deux de plus aux niveaux 7, 10 et 15.", levels: { 3: 3, 7: 2, 10: 2, 15: 2 }, options: "MANEUVERS" }],
    },
    eldritchKnight: {
      name: "Chevalier occulte",
      source: "phb",
      desc: "Un guerrier qui mêle l’arme et la magie de magicien (surtout abjuration et évocation) : protections, attaques après un sort et téléportation.",
      features: [
        [3, "Incantation", "Sorts de magicien, caractéristique d’incantation : INT, au rythme d’un tiers de lanceur. Deux sorts mineurs (trois au niveau 10). Tes sorts connus sont des sorts d’abjuration ou d’évocation, sauf ceux appris aux niveaux 3, 8, 14 et 20, qui peuvent venir de n’importe quelle école ; un peut être échangé à chaque niveau."],
        [3, "Lien avec une arme", "Un rituel d’une heure (possible pendant un repos court) te lie à une arme, deux au maximum : on ne peut te désarmer de celle-ci sauf si tu es neutralisé, et une action bonus la téléporte dans ta main si elle est sur le même plan."],
        [7, "Magie de guerre", "Quand tu utilises ton action pour lancer un sort mineur, tu peux faire une attaque avec une arme en action bonus."],
        [10, "Frappe occulte", "Une créature que tu touches avec une attaque d’arme a le désavantage à sa prochaine sauvegarde contre un de tes sorts avant la fin de ton prochain tour."],
        [15, "Charge arcanique", "Quand tu utilises Fougue, tu peux te téléporter jusqu’à 9 m vers un espace inoccupé que tu vois, avant ou après l’action supplémentaire."],
        [18, "Magie de guerre améliorée", "Quand tu utilises ton action pour lancer un sort, tu peux faire une attaque avec une arme en action bonus."],
      ],
      grants: {},
      spellcasting: {
        type: "third",
        ability: "int",
        list: "wizard",
        schools: ["Abjuration", "Évocation"],
        fixedCantrips: [],
        cantrips: { 3: 2, 10: 3 },
        known: [0, 0, 3, 4, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10, 10, 11, 11, 11, 12, 13],
      },
      resources: [],
      choices: [],
    },
  },

  monk: {
    openHand: {
      name: "Voie de la paume",
      source: "srd",
      desc: "La maîtrise du combat à mains nues : des déluges de coups qui renversent ou repoussent, une autoguérison et une frappe fatale.",
      features: [
        [3, "Technique de la paume", "Chaque attaque de Déluge de coups qui touche peut imposer un effet au choix : sauvegarde de DEX ou la cible tombe à terre ; sauvegarde de FOR ou elle est repoussée de 4,50 m ; ou elle ne peut plus réagir jusqu’à la fin de ton prochain tour."],
        [6, "Plénitude physique", "Action : récupère 3 × ton niveau de moine PV. Une fois par repos long."],
        [11, "Tranquillité", "À la fin d’un repos long, tu bénéficies de l’effet du sort sanctuaire jusqu’au début de ton prochain repos long (DD 8 + mod. SAG + maîtrise). Il prend fin comme le sort, par exemple si tu attaques."],
        [17, "Paume frémissante", "Quand tu touches avec une frappe à mains nues, 3 ki créent des vibrations qui durent autant de jours que ton niveau de moine. Par une action, sur le même plan, tu y mets fin : sauvegarde de CON, échec : la cible tombe à 0 PV ; réussite : 10d10 dégâts nécrotiques. Une seule cible à la fois."],
      ],
      grants: {},
      resources: [{ id: "wholenessOfBody", name: "Plénitude physique", max: 1, reset: "long", minLevel: 6, note: (ctx) => `Action : récupère ${3 * ctx.level} PV.` }],
      choices: [],
    },
    shadow: {
      name: "Voie de l’ombre",
      source: "phb",
      desc: "Le moine de l’ombre, façon ninja : sorts d’ombre payés en ki, téléportation de pénombre en pénombre et invisibilité.",
      features: [
        [3, "Arts des ombres", "Action et 2 ki : lance ténèbres, vision dans le noir, passage sans trace ou silence, sans composante matérielle. Tu apprends aussi le sort mineur illusion mineure."],
        [6, "Foulée d’ombre", "Dans la lumière faible ou les ténèbres, action bonus : téléporte-toi jusqu’à 18 m vers un espace inoccupé que tu vois, lui aussi dans la lumière faible ou les ténèbres ; avantage à ta première attaque au corps à corps avant la fin du tour."],
        [11, "Linceul d’ombre", "Dans la lumière faible ou les ténèbres, action : tu deviens invisible jusqu’à ce que tu attaques, lances un sort ou te retrouves en lumière vive."],
        [17, "Opportuniste", "Quand une créature à 1,50 m de toi est touchée par l’attaque d’une autre créature, ta réaction te permet de lui porter une attaque au corps à corps."],
      ],
      grants: { 3: { cantrips: [{ id: "minor-illusion", ability: "wis" }] } },
      resources: [],
      choices: [],
    },
    fourElements: {
      name: "Voie des quatre éléments",
      source: "phb",
      desc: "Le moine élémentaliste : il dépense son ki pour des disciplines de feu, d’eau, d’air et de terre, souvent sous forme de sorts.",
      features: [
        [3, "Disciple des éléments", "Tu connais Lien élémentaire et une discipline élémentaire, puis une de plus aux niveaux 6, 11 et 17 (avec la possibilité d’en échanger une à chaque fois). Les disciplines qui lancent un sort n’exigent pas de composante matérielle et utilisent ton DD de ki ; du ki supplémentaire augmente le niveau du sort, dans la limite de 2 ki par sort, 3 au niveau 5, 4 au niveau 9, 5 au niveau 13 et 6 au niveau 17."],
        [3, "Lien élémentaire", "Action, à 9 m : effet sensoriel élémentaire inoffensif ; allumer ou éteindre une bougie, une torche ou un petit feu ; réchauffer ou refroidir 0,5 kg de matière inerte pendant 1 heure ; ou modeler grossièrement de la terre, du feu, de l’eau ou de la brume tenant dans un cube de 30 cm de côté pendant 1 minute."],
        [6, "Nouvelle discipline (niveau 6)", "Apprends une discipline élémentaire de plus ; tu peux aussi remplacer une discipline connue par une autre. Étreinte du vent du nord et Gong du sommet deviennent accessibles."],
        [11, "Nouvelle discipline (niveau 11)", "Apprends une discipline élémentaire de plus, avec le même droit d’échange. Destrier des vents, Flammes du phénix et Posture de brume deviennent accessibles."],
        [17, "Nouvelle discipline (niveau 17)", "Apprends une discipline élémentaire de plus, avec le même droit d’échange. Défense de la montagne éternelle, Souffle de l’hiver, Torrent de flammes voraces et Vague de terre grondante deviennent accessibles."],
      ],
      grants: {},
      resources: [],
      choices: [{ key: "disciplines", title: "Disciplines élémentaires", help: "Une au niveau 3 (en plus de Lien élémentaire), puis une aux niveaux 6, 11 et 17, en respectant le niveau minimum de chaque discipline.", levels: { 3: 1, 6: 1, 11: 1, 17: 1 }, options: "DISCIPLINES" }],
    },
  },

  paladin: {
    devotion: {
      name: "Serment de dévotion",
      source: "srd",
      desc: "Le chevalier idéal, fidèle à l’honnêteté, au courage et à la protection des innocents : arme sacrée, immunité au charme et nimbe de lumière.",
      features: [
        [3, "Conduit divin : arme sacrée", "Action : pendant 1 minute, ajoute ton mod. CHA (min. +1) aux jets d’attaque avec l’arme que tu tiens ; elle devient magique et émet une lumière vive sur 6 m (faible sur 6 m de plus). L’effet cesse si tu lâches l’arme ou tombes inconscient."],
        [3, "Conduit divin : renvoi des impies", "Action : chaque fiélon ou mort-vivant qui te voit ou t’entend à 9 m fait une sauvegarde de SAG ; échec : renvoyé pendant 1 minute ou jusqu’à ce qu’il subisse des dégâts."],
        [7, "Aura de dévotion", "Tant que tu es conscient, toi et les créatures amicales à 3 m (9 m au niveau 18) ne pouvez pas être charmés."],
        [15, "Pureté de l’esprit", "Tu es en permanence sous l’effet du sort protection contre le mal et le bien."],
        [20, "Nimbe sacré", "Action : pendant 1 minute, lumière vive sur 9 m (faible sur 9 m de plus) ; tout ennemi qui commence son tour dans la lumière vive subit 10 dégâts radiants, et tu as l’avantage aux sauvegardes contre les sorts des fiélons et des morts-vivants. Une fois par repos long."],
      ],
      grants: {},
      alwaysPrepared: [[3, "protection-evil-good", "sanctuary"], [5, "lesser-restoration", "zone-of-truth"], [9, "beacon-of-hope", "dispel-magic"], [13, "freedom-of-movement", "guardian-of-faith"], [17, "commune", "flame-strike"]],
      resources: [{ id: "holyNimbus", name: "Nimbe sacré", max: 1, reset: "long", minLevel: 20 }],
      choices: [],
    },
    ancients: {
      name: "Serment des anciens",
      source: "phb",
      desc: "Le gardien de la lumière et de la vie : magie de la nature, résistance aux sorts pour le groupe et refus de tomber.",
      features: [
        [3, "Conduit divin : courroux de la nature", "Action : des lianes spectrales saisissent une créature que tu vois à 3 m ; elle réussit une sauvegarde de FOR ou de DEX (à son choix) ou elle est entravée, puis retente la sauvegarde à la fin de chacun de ses tours pour se libérer."],
        [3, "Conduit divin : renvoi des infidèles", "Action : chaque fée ou fiélon qui t’entend à 9 m fait une sauvegarde de SAG ; échec : renvoyé pendant 1 minute ou jusqu’à ce qu’il subisse des dégâts, et sa véritable forme est révélée si une illusion ou une métamorphose la cachait."],
        [7, "Aura de garde", "Toi et les créatures amicales à 3 m (9 m au niveau 18) avez la résistance aux dégâts infligés par les sorts."],
        [15, "Sentinelle immortelle", "Quand tu tombes à 0 PV sans être tué sur le coup, tu peux rester à 1 PV, une fois par repos long. Tu ne subis plus les effets de l’âge et ne peux pas être vieilli par magie."],
        [20, "Champion antique", "Action : transformation de 1 minute. Au début de chacun de tes tours, tu récupères 10 PV ; tes sorts de paladin de 1 action se lancent en action bonus ; les ennemis à 3 m ont le désavantage aux sauvegardes contre tes sorts de paladin et ton Conduit divin. Une fois par repos long."],
      ],
      grants: {},
      alwaysPrepared: [[3, "ensnaring-strike", "speak-with-animals"], [5, "moonbeam", "misty-step"], [9, "plant-growth", "protection-from-energy"], [13, "ice-storm", "stoneskin"], [17, "commune-with-nature", "tree-stride"]],
      resources: [
        { id: "undyingSentinel", name: "Sentinelle immortelle", max: 1, reset: "long", minLevel: 15 },
        { id: "elderChampion", name: "Champion antique", max: 1, reset: "long", minLevel: 20 },
      ],
      choices: [],
    },
    vengeance: {
      name: "Serment de vengeance",
      source: "phb",
      desc: "Le chasseur implacable des grands malfaiteurs : il désigne une cible, la poursuit sans relâche et la punit.",
      features: [
        [3, "Conduit divin : conspuer l’ennemi", "Action : une créature que tu vois à 18 m fait une sauvegarde de SAG (désavantage pour les fiélons et les morts-vivants), sauf si elle est immunisée contre la peur. Échec : effrayée pendant 1 minute ou jusqu’à ce qu’elle subisse des dégâts, avec une vitesse de 0. Réussite : vitesse réduite de moitié pour la même durée."],
        [3, "Conduit divin : vœu d’hostilité", "Action bonus : avantage à tes jets d’attaque contre une créature que tu vois à 3 m, pendant 1 minute ou jusqu’à ce qu’elle tombe à 0 PV ou inconsciente."],
        [7, "Vengeur implacable", "Quand tu touches avec une attaque d’opportunité, tu peux te déplacer de la moitié de ta vitesse dans la même réaction, sans provoquer d’attaques d’opportunité."],
        [15, "Âme vengeresse", "Quand la cible de ton Vœu d’hostilité attaque, ta réaction te permet de lui porter une attaque d’arme au corps à corps si elle est à portée."],
        [20, "Ange de la vengeance", "Action : transformation de 1 heure. Des ailes te donnent une vitesse de vol de 18 m, et une aura de 9 m impose à tout ennemi qui y entre ou y commence son tour pour la première fois du combat une sauvegarde de SAG, sous peine d’être effrayé pendant 1 minute ou jusqu’à ce qu’il subisse des dégâts ; les attaques contre lui ont alors l’avantage. Une fois par repos long."],
      ],
      grants: {},
      alwaysPrepared: [[3, "bane", "hunters-mark"], [5, "hold-person", "misty-step"], [9, "haste", "protection-from-energy"], [13, "banishment", "dimension-door"], [17, "hold-monster", "scrying"]],
      resources: [{ id: "avengingAngel", name: "Ange de la vengeance", max: 1, reset: "long", minLevel: 20 }],
      choices: [],
    },
  },

  ranger: {
    hunter: {
      name: "Chasseur",
      source: "srd",
      desc: "Le rôdeur rempart contre les menaces : des techniques au choix contre les grandes créatures comme contre les groupes.",
      features: [
        [3, "Proie du chasseur", "Choisis une technique : Tueur de colosses, Tueur de géants ou Briseur de hordes."],
        [7, "Tactiques défensives", "Choisis une technique : Échapper à la horde, Défense contre les attaques multiples ou Moral d’acier."],
        [11, "Attaques multiples", "Choisis une technique : Volée ou Attaque tourbillonnante."],
        [15, "Défense du chasseur supérieure", "Choisis une technique : Esquive totale, Retour de bâton ou Esquive instinctive."],
      ],
      grants: {},
      resources: [],
      choices: [
        {
          key: "hunter3",
          title: "Proie du chasseur",
          help: "Une technique au niveau 3.",
          levels: { 3: 1 },
          options: {
            colossus: ["Tueur de colosses", "Une fois par tour, une attaque d’arme qui touche une créature déjà blessée (sous son maximum de PV) lui inflige 1d8 dégâts de plus."],
            giant: ["Tueur de géants", "Réaction quand une créature de taille G ou plus à 1,50 m de toi te touche ou te rate : attaque-la aussitôt, si tu la vois."],
            horde: ["Briseur de hordes", "Une fois à chacun de tes tours, après une attaque d’arme, fais une autre attaque avec la même arme contre une autre créature à 1,50 m de la première cible et à ta portée."],
          },
        },
        {
          key: "hunter7",
          title: "Tactiques défensives",
          help: "Une technique au niveau 7.",
          levels: { 7: 1 },
          options: {
            multi: ["Défense contre les attaques multiples", "Quand une créature te touche, tu gagnes +4 à la CA contre ses attaques suivantes jusqu’à la fin du tour."],
            escape: ["Échapper à la horde", "Les attaques d’opportunité contre toi ont le désavantage."],
            steel: ["Moral d’acier", "Avantage aux sauvegardes contre l’état effrayé."],
          },
        },
        {
          key: "hunter11",
          title: "Attaques multiples",
          help: "Une technique au niveau 11.",
          levels: { 11: 1 },
          options: {
            volley: ["Volée", "Action : une attaque à distance contre chaque créature de ton choix à 3 m d’un point que tu vois, à portée de ton arme ; une munition et un jet d’attaque par cible."],
            whirlwind: ["Attaque tourbillonnante", "Action : une attaque au corps à corps contre chaque créature de ton choix à 1,50 m de toi, avec un jet d’attaque par cible."],
          },
        },
        {
          key: "hunter15",
          title: "Défense du chasseur supérieure",
          help: "Une technique au niveau 15.",
          levels: { 15: 1 },
          options: {
            evasion: ["Esquive totale", "Contre un effet à sauvegarde de DEX pour moitié dégâts : aucun dégât si tu réussis, moitié si tu échoues."],
            stand: ["Retour de bâton", "Réaction quand une créature hostile te rate au corps à corps : elle doit répéter cette attaque contre une autre créature de ton choix, autre qu’elle-même."],
            dodge: ["Esquive instinctive", "Réaction quand un attaquant que tu vois te touche : les dégâts de cette attaque sont réduits de moitié."],
          },
        },
      ],
    },
    beastMaster: {
      name: "Maître des bêtes",
      source: "phb",
      desc: "Un rôdeur lié à un compagnon animal qui combat à ses ordres, puis partage ses sorts.",
      features: [
        [3, "Compagnon du rôdeur", "Une bête de taille M ou inférieure et de FP 1/4 au plus t’accompagne. Elle ajoute ton bonus de maîtrise à sa CA, à ses jets d’attaque et de dégâts, à ses sauvegardes et compétences maîtrisées ; ses PV maximum valent le plus élevé entre son maximum normal et 4 × ton niveau de rôdeur. Elle agit à ton initiative : par ton action, ordonne-lui Attaquer, Foncer, Se désengager, Esquiver ou Aider ; sans ordre, elle Esquive, mais elle agit seule si tu es neutralisé ou absent et n’a pas besoin d’ordre pour réagir. Avec Attaque supplémentaire, tu fais une attaque d’arme quand tu lui ordonnes d’attaquer. Si elle meurt, 8 heures de lien magique avec une bête non hostile la remplacent."],
        [7, "Entraînement exceptionnel", "À ton tour, si ta bête n’attaque pas, une action bonus lui ordonne de Foncer, Se désengager, Esquiver ou Aider. Ses attaques comptent désormais comme magiques pour vaincre résistances et immunités."],
        [11, "Fureur bestiale", "Ta bête fait deux attaques quand tu lui ordonnes d’Attaquer."],
        [15, "Partage des sorts", "Quand tu lances un sort qui te cible, il peut aussi affecter ta bête si elle est à 9 m de toi."],
      ],
      grants: {},
      resources: [],
      choices: [],
    },
  },

  rogue: {
    thief: {
      name: "Voleur",
      source: "srd",
      desc: "Le cambrioleur agile : actions bonus pour manipuler objets et outils, escalade facile, discrétion accrue et objets magiques sans restriction.",
      features: [
        [3, "Mains lestes", "Ta Ruse permet aussi, en action bonus, un test de DEX (Escamotage), l’usage d’outils de voleur pour désamorcer un piège ou crocheter une serrure, ou l’action Utiliser un objet."],
        [3, "Monte-en-l’air", "Escalader ne te coûte plus de déplacement supplémentaire, et ton saut en longueur avec élan s’allonge de 30 cm par point de mod. DEX."],
        [9, "Discrétion suprême", "Avantage aux tests de DEX (Discrétion) si tu ne te déplaces pas de plus de la moitié de ta vitesse pendant le tour."],
        [13, "Utilisation d’objets magiques", "Tu ignores toutes les conditions de classe, de race et de niveau pour utiliser les objets magiques."],
        [17, "Réflexes de voleur", "Au premier round de chaque combat, tu joues deux tours : à ton initiative, puis à ton initiative moins 10. Impossible si tu es surpris."],
      ],
      grants: {},
      resources: [],
      choices: [],
    },
    assassin: {
      name: "Assassin",
      source: "phb",
      desc: "Le tueur qui frappe le premier : critiques automatiques contre les cibles surprises, déguisements, poisons et fausses identités.",
      features: [
        [3, "Maîtrises supplémentaires", "Maîtrise du matériel de déguisement et du matériel d’empoisonneur."],
        [3, "Assassinat", "Avantage aux jets d’attaque contre toute créature qui n’a pas encore joué de tour dans le combat ; tout coup au but contre une créature surprise est un coup critique."],
        [9, "Expert en infiltration", "En sept jours et pour 25 po, établis une fausse identité solide (histoire, profession, relations) ; tu ne peux pas reprendre l’identité d’une personne existante."],
        [13, "Imposteur", "Après au moins 3 heures à étudier la voix, l’écriture et les manières d’une personne, tu l’imites sans faille ; face à une créature méfiante, avantage aux tests de CHA (Tromperie) pour ne pas être démasqué."],
        [17, "Frappe meurtrière", "Quand tu touches une créature surprise, elle fait une sauvegarde de CON (DD 8 + mod. DEX + maîtrise) ; en cas d’échec, les dégâts de ton attaque contre elle sont doublés."],
      ],
      grants: { 3: { tools: ["disguise-kit", "poisoners-kit"] } },
      resources: [],
      choices: [],
    },
    arcaneTrickster: {
      name: "Escroc arcanique",
      source: "phb",
      desc: "Un roublard qui ajoute la magie d’enchantement et d’illusion à ses ruses, avec une main de mage invisible pour voler à distance.",
      features: [
        [3, "Incantation", "Sorts de magicien, caractéristique d’incantation : INT, au rythme d’un tiers de lanceur. Tu connais main de mage et deux autres sorts mineurs (un de plus au niveau 10). Tes sorts connus sont des sorts d’enchantement ou d’illusion, sauf ceux appris aux niveaux 3, 8, 14 et 20, qui peuvent venir de n’importe quelle école ; un peut être échangé à chaque niveau."],
        [3, "Escamotage et main de mage", "Ta main de mage est invisible et peut ranger ou prendre un objet dans un contenant porté par une autre créature, ou utiliser des outils de voleur à distance ; sans être remarquée si tu réussis un test de DEX (Escamotage) opposé à la SAG (Perception) de la créature. Ta Ruse permet de la contrôler en action bonus."],
        [9, "Embuscade magique", "Si tu es caché d’une créature quand tu lui lances un sort, elle a le désavantage à ses sauvegardes contre ce sort pendant ce tour."],
        [13, "Escroc polyvalent", "Action bonus : ta main de mage distrait une créature à 1,50 m d’elle ; tu as l’avantage à tes jets d’attaque contre cette créature jusqu’à la fin du tour."],
        [17, "Voleur de sort", "Réaction quand une créature lance un sort qui te cible ou t’inclut dans sa zone : elle fait une sauvegarde avec sa caractéristique d’incantation contre ton DD. Échec : le sort est sans effet sur toi et, s’il est de niveau 1 ou plus et d’un niveau que tu peux lancer, tu le connais pendant 8 heures, durant lesquelles elle ne peut plus le lancer. Une fois par repos long."],
      ],
      grants: {},
      spellcasting: {
        type: "third",
        ability: "int",
        list: "wizard",
        schools: ["Enchantement", "Illusion"],
        fixedCantrips: ["mage-hand"],
        cantrips: { 3: 2, 10: 3 },
        known: [0, 0, 3, 4, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10, 10, 11, 11, 11, 12, 13],
      },
      resources: [{ id: "spellThief", name: "Voleur de sort", max: 1, reset: "long", minLevel: 17 }],
      choices: [],
    },
  },

  sorcerer: {
    draconic: {
      name: "Lignée draconique",
      source: "srd",
      desc: "Une magie héritée d’un ancêtre dragon : plus de PV, des écailles qui protègent sans armure, puis affinité élémentaire et ailes.",
      features: [
        [1, "Ancêtre draconique", "Choisis un type de dragon : il fixe le type de dégâts de tes aptitudes de lignée. Tu parles, lis et écris le draconique, et ton bonus de maîtrise est doublé pour tes tests de CHA face aux dragons, s’il s’applique."],
        [1, "Résistance draconique", "Tes PV maximum augmentent de 1 par niveau d’ensorceleur. Sans armure, ta CA est égale à 13 + mod. DEX."],
        [6, "Affinité élémentaire", "Quand tu lances un sort qui inflige le type de dégâts de ton ascendance, ajoute ton mod. CHA à un jet de dégâts de ce sort ; tu peux en même temps dépenser 1 point de sorcellerie pour obtenir la résistance à ce type de dégâts pendant 1 heure."],
        [14, "Ailes draconiques", "Action bonus : déploie ou replie des ailes qui te donnent une vitesse de vol égale à ta vitesse actuelle. Impossible avec une armure non adaptée ; des vêtements non adaptés peuvent être détruits."],
        [18, "Présence draconique", "Action et 5 points de sorcellerie : aura d’émerveillement ou de terreur de 18 m pendant 1 minute (concentration). Chaque créature hostile qui y commence son tour réussit une sauvegarde de SAG ou est charmée (émerveillement) ou effrayée (terreur) jusqu’à la fin de l’aura ; une réussite l’immunise pendant 24 heures."],
      ],
      grants: { 1: { languages: ["draconic"], hpPerClassLevel: 1, unarmoredDefense: { base: 13, abilities: ["dex"] } } },
      dragonChoice: true,
      resources: [],
      choices: [],
    },
    wildMagic: {
      name: "Magie sauvage",
      source: "phb",
      desc: "Une magie chaotique et imprévisible : avantages ponctuels, chance infléchie et déferlements aléatoires de magie sauvage.",
      features: [
        [1, "Pic de magie sauvage", "Juste après que tu lances un sort d’ensorceleur de niveau 1 ou plus, le MJ peut te faire lancer un d20 ; sur un 1, lance sur la table de la magie sauvage pour un effet aléatoire."],
        [1, "Marée du chaos", "Gagne l’avantage à un jet d’attaque, un test de caractéristique ou une sauvegarde. Une fois par repos long ; d’ici là, le MJ peut te faire lancer sur la table de la magie sauvage après un sort d’ensorceleur de niveau 1 ou plus, ce qui te rend cette utilisation."],
        [6, "Chance forcée", "Réaction et 2 points de sorcellerie quand une créature que tu vois fait un jet d’attaque, un test de caractéristique ou une sauvegarde : lance 1d4 et ajoute-le à son jet ou retranche-le, après le jet mais avant ses effets."],
        [14, "Chaos contrôlé", "Quand tu lances sur la table de la magie sauvage, lance deux fois et choisis le résultat."],
        [18, "Bombardement de sort", "Une fois par tour, quand un dé de dégâts d’un de tes sorts donne son maximum, relance un de ces dés et ajoute ce résultat aux dégâts."],
      ],
      grants: {},
      resources: [{ id: "tidesOfChaos", name: "Marée du chaos", max: 1, reset: "long", note: "Aussi récupérée quand le MJ te fait lancer sur la table de la magie sauvage." }],
      choices: [],
    },
  },

  warlock: {
    fiend: {
      name: "Le Fiélon",
      source: "srd",
      desc: "Un pacte avec une puissance infernale : sorts de feu, PV temporaires à chaque ennemi abattu, résistance au choix.",
      features: [
        [1, "Bénédiction du ténébreux", "Quand tu réduis une créature hostile à 0 PV, gagne des PV temporaires égaux à mod. CHA + niveau d’occultiste (min. 1)."],
        [6, "Chance du ténébreux", "Ajoute 1d10 à un de tes tests de caractéristique ou jets de sauvegarde, après le jet mais avant ses effets. Une fois par repos court ou long."],
        [10, "Résistance fiélonne", "À la fin d’un repos court ou long, choisis un type de dégâts : tu y résistes jusqu’à ce que tu en choisisses un autre. Les armes magiques ou en argent ignorent cette résistance."],
        [14, "Traversée des enfers", "Quand tu touches une créature avec une attaque, tu peux l’envoyer à travers les plans inférieurs : elle disparaît et revient à la fin de ton prochain tour à son emplacement (ou au plus proche disponible). Si ce n’est pas un fiélon, elle subit 10d10 dégâts psychiques. Une fois par repos long."],
      ],
      grants: {},
      expandedSpells: [[1, "burning-hands", "command"], [2, "blindness-deafness", "scorching-ray"], [3, "fireball", "stinking-cloud"], [4, "fire-shield", "wall-of-fire"], [5, "flame-strike", "hallow"]],
      resources: [
        { id: "darkOnesOwnLuck", name: "Chance du ténébreux", max: 1, reset: "short", minLevel: 6 },
        { id: "hurlThroughHell", name: "Traversée des enfers", max: 1, reset: "long", minLevel: 14 },
      ],
      choices: [],
    },
    archfey: {
      name: "L’Archifée",
      source: "phb",
      desc: "Un pacte avec un seigneur des fées : charme, peur, fuite brumeuse et illusions cauchemardesques.",
      features: [
        [1, "Présence féerique", "Action : chaque créature dans un cube de 3 m d’arête partant de toi réussit une sauvegarde de SAG contre ton DD de sorts ou est charmée ou effrayée par toi (au choix) jusqu’à la fin de ton prochain tour. Une fois par repos court ou long."],
        [6, "Échappatoire brumeuse", "Réaction quand tu subis des dégâts : deviens invisible et téléporte-toi jusqu’à 18 m vers un espace inoccupé que tu vois ; l’invisibilité dure jusqu’au début de ton prochain tour ou jusqu’à ce que tu attaques ou lances un sort. Une fois par repos court ou long."],
        [10, "Défenses captivantes", "Tu es immunisé contre l’état charmé. Quand une créature tente de te charmer, ta réaction peut lui retourner l’effet : sauvegarde de SAG contre ton DD, sinon elle est charmée par toi pendant 1 minute ou jusqu’à ce qu’elle subisse des dégâts."],
        [14, "Sombre délire", "Action : une créature que tu vois à 18 m réussit une sauvegarde de SAG ou est charmée ou effrayée par toi (au choix) pendant 1 minute ou jusqu’à la fin de ta concentration, en se croyant perdue dans un royaume brumeux ; l’effet cesse si elle subit des dégâts. Une fois par repos court ou long."],
      ],
      grants: {},
      expandedSpells: [[1, "faerie-fire", "sleep"], [2, "calm-emotions", "phantasmal-force"], [3, "blink", "plant-growth"], [4, "dominate-beast", "greater-invisibility"], [5, "dominate-person", "seeming"]],
      resources: [
        { id: "feyPresence", name: "Présence féerique", max: 1, reset: "short" },
        { id: "mistyEscape", name: "Échappatoire brumeuse", max: 1, reset: "short", minLevel: 6 },
        { id: "darkDelirium", name: "Sombre délire", max: 1, reset: "short", minLevel: 14 },
      ],
      choices: [],
    },
    greatOldOne: {
      name: "Le Grand Ancien",
      source: "phb",
      desc: "Un pacte avec une entité indicible : télépathie, protection de l’esprit et emprise sur la volonté d’autrui.",
      features: [
        [1, "Esprit éveillé", "Tu communiques par télépathie avec toute créature que tu vois à 9 m ; pas besoin de langue commune, mais elle doit comprendre au moins une langue."],
        [6, "Protection entropique", "Réaction quand une créature t’attaque : elle a le désavantage ; si elle te rate, tu as l’avantage à ta prochaine attaque contre elle avant la fin de ton prochain tour. Une fois par repos court ou long."],
        [10, "Bouclier mental", "Personne ne peut lire tes pensées sans ton accord. Résistance aux dégâts psychiques, et une créature qui t’en inflige subit autant de dégâts que toi."],
        [14, "Asservissement", "Action : touche un humanoïde neutralisé ; il est charmé par toi jusqu’à ce que délivrance des malédictions soit lancé sur lui, que l’état charmé lui soit retiré ou que tu réutilises cette aptitude. Vous communiquez par télépathie tant que vous êtes sur le même plan."],
      ],
      grants: { 10: { resistances: ["psychique"] } },
      expandedSpells: [[1, "dissonant-whispers", "tashas-hideous-laughter"], [2, "detect-thoughts", "phantasmal-force"], [3, "clairvoyance", "sending"], [4, "dominate-beast", "evards-black-tentacles"], [5, "dominate-person", "telekinesis"]],
      resources: [{ id: "entropicWard", name: "Protection entropique", max: 1, reset: "short", minLevel: 6 }],
      choices: [],
    },
  },

  wizard: {
    abjuration: {
      name: "École d’abjuration",
      source: "phb",
      desc: "Le magicien protecteur : une protection arcanique absorbe les dégâts, puis protège les alliés et renforce les contre-magies.",
      features: [
        [2, "Abjurateur érudit", "Copier un sort d’abjuration dans ton grimoire coûte moitié moins de temps et d’or."],
        [2, "Protection arcanique", "Quand tu lances un sort d’abjuration de niveau 1 ou plus, tu peux créer une protection qui dure jusqu’à ton prochain repos long : ses PV (maximum 2 × niveau de magicien + mod. INT) absorbent les dégâts que tu subis. Chaque sort d’abjuration de niveau 1 ou plus lui rend 2 × niveau du sort PV. Création une fois par repos long."],
        [6, "Protection projetée", "Réaction quand une créature que tu vois à 9 m subit des dégâts : ta Protection arcanique les absorbe à sa place."],
        [10, "Abjuration améliorée", "Ajoute ton bonus de maîtrise aux tests de caractéristique que demandent tes sorts d’abjuration, comme contresort ou dissipation de la magie."],
        [14, "Résistance aux sorts", "Avantage aux sauvegardes contre les sorts et résistance aux dégâts des sorts."],
      ],
      grants: {},
      resources: [{ id: "arcaneWard", name: "Protection arcanique", max: (ctx) => Math.max(0, 2 * ctx.level + ctx.mods.int), reset: "long", minLevel: 2, note: "PV de la protection ; chaque sort d’abjuration de niveau 1 ou plus lui rend 2 × niveau du sort PV." }],
      choices: [],
    },
    divination: {
      name: "École de divination",
      source: "phb",
      desc: "Le magicien qui entrevoit l’avenir : il remplace des jets de dés par ses présages et récupère des emplacements avec ses divinations.",
      features: [
        [2, "Devin érudit", "Copier un sort de divination dans ton grimoire coûte moitié moins de temps et d’or."],
        [2, "Présage", "Après chaque repos long, lance deux d20 et note-les. Tu peux remplacer par l’un d’eux un jet d’attaque, une sauvegarde ou un test de caractéristique fait par toi ou une créature que tu vois, avant le jet ; une fois par tour. Les résultats inutilisés sont perdus au repos long suivant."],
        [6, "Divination experte", "Quand tu lances un sort de divination de niveau 2 ou plus avec un emplacement, récupère un emplacement dépensé de niveau inférieur à ce sort, et de niveau 5 au plus."],
        [10, "Troisième œil", "Action : jusqu’à ton prochain repos ou jusqu’à être neutralisé, choisis un bénéfice : vision dans le noir à 18 m, vision du plan Éthéré à 18 m, lecture de toutes les langues, ou vision des créatures et objets invisibles à 3 m. Une fois par repos court ou long."],
        [14, "Présage supérieur", "Ton Présage te donne trois d20 au lieu de deux."],
      ],
      grants: {},
      resources: [
        { id: "portent", name: "Présage", max: (ctx) => (ctx.level >= 14 ? 3 : 2), reset: "long", minLevel: 2, note: "d20 tirés après chaque repos long, à substituer à un jet (une fois par tour)." },
        { id: "thirdEye", name: "Troisième œil", max: 1, reset: "short", minLevel: 10 },
      ],
      choices: [],
    },
    enchantment: {
      name: "École d’enchantement",
      source: "phb",
      desc: "Le magicien qui manipule les esprits : regard hypnotique, attaques détournées et enchantements qui touchent deux cibles.",
      features: [
        [2, "Enchanteur érudit", "Copier un sort d’enchantement dans ton grimoire coûte moitié moins de temps et d’or."],
        [2, "Regard hypnotique", "Action : une créature que tu vois à 1,50 m, et qui te voit ou t’entend, réussit une sauvegarde de SAG contre ton DD ou est charmée jusqu’à la fin de ton prochain tour (vitesse 0, neutralisée, hébétée). Une action à chaque tour prolonge l’effet, qui cesse si tu t’éloignes de plus de 1,50 m, si elle ne te voit ni ne t’entend plus, ou si elle subit des dégâts. Ensuite, ou après une réussite, plus d’usage contre elle avant ton prochain repos long."],
        [6, "Charme instinctif", "Réaction quand une créature que tu vois à 9 m t’attaque, si une autre créature est à portée de l’attaque : sauvegarde de SAG contre ton DD, sinon elle doit viser la créature la plus proche d’elle, autre que toi et elle-même. Après une réussite, plus d’usage contre elle avant ton prochain repos long. Sans effet sur les créatures insensibles au charme."],
        [10, "Partage d’enchantement", "Un sort d’enchantement de niveau 1 ou plus qui ne cible qu’une créature peut en cibler une seconde."],
        [14, "Altération mémorielle", "Quand un de tes sorts d’enchantement charme des créatures, l’une d’elles peut ne pas s’en rendre compte. Une fois avant la fin du sort, une action la force à réussir une sauvegarde d’INT contre ton DD, sinon elle oublie jusqu’à 1 + mod. CHA heures (min. 1, sans dépasser la durée du sort) passées sous le charme."],
      ],
      grants: {},
      resources: [],
      choices: [],
    },
    evocation: {
      name: "École d’évocation",
      source: "srd",
      desc: "Le magicien des dégâts : des sorts de zone qui épargnent les alliés et des sorts mineurs qui blessent toujours.",
      features: [
        [2, "Évocateur érudit", "Copier un sort d’évocation dans ton grimoire coûte moitié moins de temps et d’or."],
        [2, "Façonneur de sorts", "Quand tu lances un sort d’évocation qui affecte des créatures que tu vois, choisis-en jusqu’à 1 + niveau du sort : elles réussissent automatiquement leur sauvegarde et ne subissent aucun dégât si une réussite devait leur en infliger la moitié."],
        [6, "Sort mineur puissant", "Une créature qui réussit sa sauvegarde contre un de tes sorts mineurs subit quand même la moitié de ses dégâts, sans ses autres effets."],
        [10, "Évocation améliorée", "Ajoute ton mod. INT à un jet de dégâts de chacun de tes sorts d’évocation de magicien."],
        [14, "Surcharge magique", "Quand tu lances un sort de magicien de niveau 1 à 5 qui inflige des dégâts, inflige-en le maximum. Sans contrecoup la première fois ; chaque usage suivant avant un repos long t’inflige 2d12 dégâts nécrotiques par niveau du sort, +1d12 par niveau à chaque nouvel usage, en ignorant résistance et immunité."],
      ],
      grants: {},
      resources: [{ id: "overchannel", name: "Surcharge magique", max: 1, reset: "long", minLevel: 14, note: "Usage sans contrecoup ; les suivants avant un repos long infligent des dégâts nécrotiques croissants." }],
      choices: [],
    },
    illusion: {
      name: "École d’illusion",
      source: "phb",
      desc: "Le magicien des faux-semblants : illusions plus riches et modifiables, double qui détourne une attaque, puis objets illusoires rendus réels.",
      features: [
        [2, "Illusionniste érudit", "Copier un sort d’illusion dans ton grimoire coûte moitié moins de temps et d’or."],
        [2, "Illusion mineure améliorée", "Tu apprends illusion mineure, hors quota (si tu la connais déjà, un autre sort mineur de magicien), et elle peut créer à la fois un son et une image."],
        [6, "Illusions malléables", "Pour un de tes sorts d’illusion d’au moins 1 minute, une action te permet de modifier l’illusion dans les limites du sort, si tu la vois."],
        [10, "Double illusoire", "Réaction quand une créature t’attaque : un double illusoire s’interpose et l’attaque te rate automatiquement. Une fois par repos court ou long."],
        [14, "Réalité illusoire", "Quand tu lances un sort d’illusion de niveau 1 ou plus, une action bonus pendant sa durée rend réel, pendant 1 minute, un objet inanimé et non magique de l’illusion. Il ne peut ni infliger de dégâts ni blesser directement."],
      ],
      grants: { 2: { cantrips: [{ id: "minor-illusion", ability: "int" }] } },
      resources: [{ id: "illusorySelf", name: "Double illusoire", max: 1, reset: "short", minLevel: 10 }],
      choices: [],
    },
    conjuration: {
      name: "École d’invocation",
      source: "phb",
      desc: "Le magicien des créations et des déplacements : objets conjurés, téléportation et créatures convoquées plus résistantes.",
      features: [
        [2, "Invocateur érudit", "Copier un sort d’invocation dans ton grimoire coûte moitié moins de temps et d’or."],
        [2, "Invocation mineure", "Action : fais apparaître dans ta main ou au sol à 3 m un objet inanimé et non magique que tu as déjà vu, de 90 cm de côté et 5 kg au plus ; il émet une lumière faible sur 1,50 m. Il disparaît au bout d’une heure, si tu réutilises l’aptitude, ou s’il subit ou inflige des dégâts."],
        [6, "Permutation", "Action : téléporte-toi jusqu’à 9 m vers un espace inoccupé que tu vois, ou échange ta place avec une créature consentante de taille P ou M à cette distance. Nouvel usage après un repos long ou après avoir lancé un sort d’invocation de niveau 1 ou plus."],
        [10, "Invocation consciencieuse", "Ta concentration sur un sort d’invocation ne peut pas être rompue par des dégâts."],
        [14, "Convocations coriaces", "Toute créature que tu convoques ou crées avec un sort d’invocation a 30 PV temporaires."],
      ],
      grants: {},
      resources: [{ id: "benignTransposition", name: "Permutation", max: 1, reset: "long", minLevel: 6, note: "Aussi récupérée en lançant un sort d’invocation de niveau 1 ou plus." }],
      choices: [],
    },
    necromancy: {
      name: "École de nécromancie",
      source: "phb",
      desc: "Le magicien des forces de vie et de mort : soins en tuant, morts-vivants renforcés, puis contrôle des morts-vivants.",
      features: [
        [2, "Nécromancien érudit", "Copier un sort de nécromancie dans ton grimoire coûte moitié moins de temps et d’or."],
        [2, "Sinistre moisson", "Une fois par tour, quand un de tes sorts de niveau 1 ou plus tue une ou plusieurs créatures, récupère 2 × niveau du sort PV, ou 3 × pour un sort de nécromancie. Rien pour les artificiels et les morts-vivants."],
        [6, "Serviteurs morts-vivants", "Animation des morts s’ajoute gratuitement à ton grimoire et anime un cadavre ou un tas d’os de plus. Les morts-vivants que tu crées par nécromancie ajoutent ton niveau de magicien à leurs PV maximum et ton bonus de maîtrise à leurs dégâts d’arme."],
        [10, "Insensibilité à la non-vie", "Résistance aux dégâts nécrotiques, et ton maximum de PV ne peut pas être réduit."],
        [14, "Contrôle des morts-vivants", "Action : un mort-vivant que tu vois à 18 m fait une sauvegarde de CHA contre ton DD (avantage si son INT est de 8 ou plus). Échec : il t’obéit jusqu’à ce que tu réutilises l’aptitude ; avec 12 ou plus en INT, il retente la sauvegarde à chaque heure. Réussite : plus d’usage contre lui."],
      ],
      grants: { 10: { resistances: ["nécrotique"] } },
      resources: [],
      choices: [],
    },
    transmutation: {
      name: "École de transmutation",
      source: "phb",
      desc: "Le magicien qui change la matière : alchimie mineure, pierre aux bienfaits variables, métamorphose gratuite et prodiges de transmutation.",
      features: [
        [2, "Transmutateur érudit", "Copier un sort de transmutation dans ton grimoire coûte moitié moins de temps et d’or."],
        [2, "Alchimie mineure", "Change temporairement un objet non magique en bois, pierre (hors gemme), fer, cuivre ou argent en un autre de ces matériaux : 10 minutes par cube de 30 cm de côté. Il reprend sa nature au bout d’une heure ou si ta concentration est rompue."],
        [6, "Pierre du transmutateur", "En 8 heures, crée une pierre qui confère à son porteur un bienfait au choix : vision dans le noir à 18 m, +3 m de vitesse sans être encombré, maîtrise des sauvegardes de CON, ou résistance à l’acide, au froid, au feu, à la foudre ou au tonnerre. Chaque sort de transmutation de niveau 1 ou plus permet de changer le bienfait si tu la portes. Une nouvelle pierre désactive l’ancienne."],
        [10, "Métamorphe", "Métamorphose s’ajoute gratuitement à ton grimoire. Une fois par repos court ou long, lance-le sans emplacement, sur toi seul, pour devenir une bête de FP 1 au plus."],
        [14, "Maître transmutateur", "Action : consume la magie de ta pierre pour un effet : transformation majeure d’un objet non magique (cube de 1,50 m au plus, 10 minutes de manipulation), panacée (guérit malédictions, maladies et poisons et rend tous les PV), rappel à la vie sans emplacement, ou rajeunissement de 3d10 ans (13 ans au minimum). La pierre est détruite et ne peut pas être refaite avant un repos long."],
      ],
      grants: { 10: { innateSpells: [{ id: "polymorph", minLevel: 10, ability: "int", castLevel: 4, reset: "short" }] } },
      resources: [{ id: "masterTransmuter", name: "Maître transmutateur", max: 1, reset: "long", minLevel: 14 }],
      choices: [],
    },
  },
};


// Module : spells-a
/** Sorts du Manuel des joueurs 2014, niveaux 0 à 3 (sorts mineurs compris).
 * Résumés originaux et concis, pas les textes intégraux. Noms officiels de la traduction française 2014.
 * Colonnes : id | nom | niveau | école | classes | incantation | portée | durée | drapeaux | composantes | résumé | source
 * Classes : b barde, c clerc, d druide, p paladin, r rôdeur, s ensorceleur, o occultiste, m magicien (listes de base uniquement).
 * Drapeaux : C concentration, R rituel. Source : "srd" (SRD 5.1) ou "phb" (Manuel des joueurs seulement).
 */
const SPELL_ROWS_A = [
  // Niveau 0 : sorts mineurs (27)
  ["friends", "Amis", 0, "Enchantement", "bsom", "1 action", "Personnelle", "1 minute", "C", "S, M", "Tu as l’avantage aux tests de CHA visant une créature de ton choix qui ne t’est pas hostile. À la fin du sort, elle comprend que tu l’as influencée par magie et devient hostile envers toi.", "phb"],
  ["acid-splash", "Aspersion d’acide", 0, "Invocation", "sm", "1 action", "18 m", "Instantanée", "", "V, S", "Vise une créature, ou deux créatures situées à 1,50 m l’une de l’autre. Sauvegarde de DEX : 1d6 acide en cas d’échec. 2d6 au niveau 5, 3d6 au niveau 11, 4d6 au niveau 17.", "srd"],
  ["guidance", "Assistance", 0, "Divination", "cd", "1 action", "Contact", "1 minute", "C", "V, S", "Une créature consentante touchée peut, une fois avant la fin du sort, ajouter 1d4 à un test de caractéristique de son choix, avant ou après le jet. Le sort prend alors fin.", "srd"],
  ["poison-spray", "Bouffée de poison", 0, "Invocation", "dsom", "1 action", "3 m", "Instantanée", "", "V, S", "Une créature visible à portée fait une sauvegarde de CON. Échec : 1d12 poison. 2d12 au niveau 5, 3d12 au niveau 11, 4d12 au niveau 17.", "srd"],
  ["chill-touch", "Contact glacial", 0, "Nécromancie", "som", "1 action", "36 m", "1 round", "", "V, S", "Attaque de sort à distance : 1d8 nécrotiques, et la cible ne peut pas récupérer de PV jusqu’au début de ton prochain tour. Un mort-vivant touché a aussi un désavantage à ses attaques contre toi jusqu’à la fin de ton prochain tour. 2d8 au niveau 5, 3d8 au niveau 11, 4d8 au niveau 17.", "srd"],
  ["true-strike", "Coup au but", 0, "Divination", "bsom", "1 action", "9 m", "1 round", "C", "S", "Tu cibles une créature visible et perces ses défenses : à ton prochain tour, ta première attaque contre elle se fait avec l’avantage, si le sort n’a pas pris fin.", "srd"],
  ["eldritch-blast", "Décharge occulte", 0, "Évocation", "o", "1 action", "36 m", "Instantanée", "", "V, S", "Attaque de sort à distance : 1d10 force. Deux rayons au niveau 5, trois au niveau 11, quatre au niveau 17 ; chaque rayon a son propre jet d’attaque et peut viser une cible différente.", "srd"],
  ["druidcraft", "Druidisme", 0, "Transmutation", "d", "1 action", "9 m", "Instantanée", "", "V, S", "Un effet naturel mineur au choix : prédire la météo locale des 24 prochaines heures, faire éclore une fleur ou une graine, produire un effet sensoriel inoffensif (feuilles qui tombent, brise, odeur) dans un cube de 1,50 m, ou allumer ou éteindre une bougie, une torche ou un petit feu de camp.", "srd"],
  ["sacred-flame", "Flamme sacrée", 0, "Évocation", "c", "1 action", "18 m", "Instantanée", "", "V, S", "Une créature visible fait une sauvegarde de DEX, sans bénéficier d’un abri. Échec : 1d8 radiants. 2d8 au niveau 5, 3d8 au niveau 11, 4d8 au niveau 17.", "srd"],
  ["produce-flame", "Flammes", 0, "Invocation", "d", "1 action", "Personnelle", "10 minutes", "", "V, S", "Une flamme qui ne te brûle pas apparaît dans ta main et éclaire vivement sur 3 m et faiblement sur 3 m de plus. Tu peux la lancer (à l’incantation ou par une action) : attaque de sort à distance contre une créature à 9 m, 1d8 feu ; le sort prend alors fin. 2d8 au niveau 5, 3d8 au niveau 11, 4d8 au niveau 17.", "srd"],
  ["thorn-whip", "Fouet épineux", 0, "Transmutation", "d", "1 action", "9 m", "Instantanée", "", "V, S, M", "Attaque de sort au corps à corps contre une créature à portée : 1d6 perforants, et une cible de taille G ou inférieure est tirée de 3 m vers toi. 2d6 au niveau 5, 3d6 au niveau 11, 4d6 au niveau 17.", "phb"],
  ["shillelagh", "Gourdin magique", 0, "Transmutation", "d", "1 action bonus", "Contact", "1 minute", "", "V, S, M", "Ton gourdin ou ton bâton devient magique pendant 1 minute : ses jets d’attaque et de dégâts utilisent ta caractéristique d’incantation au lieu de la FOR, et son dé de dégâts devient un d8. Le sort prend fin si tu lâches l’arme ou relances le sort.", "srd"],
  ["minor-illusion", "Illusion mineure", 0, "Illusion", "bsom", "1 action", "9 m", "1 minute", "", "S, M", "Crée un son, ou l’image d’un objet tenant dans un cube de 1,50 m, pendant 1 minute. L’image n’émet ni lumière, ni son, ni odeur, et un contact physique la trahit. Une créature qui l’examine (action) la perce sur un test d’INT (Investigation) contre ton DD de sort.", "srd"],
  ["light", "Lumière", 0, "Évocation", "bcsm", "1 action", "Contact", "1 heure", "", "V, M", "Un objet de 3 m au plus émet une lumière vive sur 6 m et faible sur 6 m de plus, de la couleur de ton choix ; le couvrir d’un objet opaque bloque la lumière. Si une créature hostile tient ou porte l’objet, elle l’évite par une sauvegarde de DEX réussie. Relancer le sort met fin au précédent.", "srd"],
  ["dancing-lights", "Lumières dansantes", 0, "Évocation", "bsm", "1 action", "36 m", "1 minute", "C", "V, S, M", "Crée jusqu’à quatre lumières de la taille d’une torche, ou une forme vaguement humanoïde de taille M, qui éclairent faiblement sur 3 m. Par une action bonus, tu les déplaces de 18 m ; chacune doit rester à 6 m d’une autre et s’éteint si elle sort de la portée.", "srd"],
  ["mage-hand", "Main de mage", 0, "Invocation", "bsom", "1 action", "9 m", "1 minute", "", "V, S", "Une main spectrale apparaît. Par une action, tu la diriges (9 m de déplacement) pour manipuler un objet, ouvrir une porte ou un contenant non verrouillé, ranger ou sortir un objet d’un contenant ouvert, ou verser un flacon. Elle ne peut ni attaquer, ni activer un objet magique, ni porter plus de 5 kg, et disparaît à plus de 9 m de toi.", "srd"],
  ["message", "Message", 0, "Transmutation", "bsm", "1 action", "36 m", "1 round", "", "V, S, M", "Tu murmures un message à une créature à portée ; elle seule l’entend et peut te répondre de même. Tu peux viser une créature hors de vue si tu connais sa position, le message contournant les angles. Bloqué par le silence magique, 30 cm de pierre, 2,5 cm de métal ordinaire, une feuille de plomb ou 90 cm de bois.", "srd"],
  ["vicious-mockery", "Moquerie cruelle", 0, "Enchantement", "b", "1 action", "18 m", "Instantanée", "", "V", "Une créature visible qui t’entend (même sans te comprendre) fait une sauvegarde de SAG. Échec : 1d4 psychiques et désavantage à son prochain jet d’attaque avant la fin de son prochain tour. 2d4 au niveau 5, 3d4 au niveau 11, 4d4 au niveau 17.", "srd"],
  ["shocking-grasp", "Poigne électrique", 0, "Évocation", "sm", "1 action", "Contact", "Instantanée", "", "V, S", "Attaque de sort au corps à corps, avec l’avantage si la cible porte une armure en métal : 1d8 foudre, et la cible ne peut pas prendre de réaction avant le début de son prochain tour. 2d8 au niveau 5, 3d8 au niveau 11, 4d8 au niveau 17.", "srd"],
  ["prestidigitation", "Prestidigitation", 0, "Transmutation", "bsom", "1 action", "3 m", "Jusqu’à 1 heure", "", "V, S", "Petit tour au choix : effet sensoriel inoffensif ; allumer ou éteindre une petite flamme ; nettoyer ou salir un objet (cube de 30 cm) ; réchauffer, refroidir, parfumer ou marquer de la matière inerte pendant 1 heure ; babiole ou image illusoire tenant dans la main jusqu’à ton prochain tour. Trois effets durables à la fois au plus.", "srd"],
  ["blade-ward", "Protection contre les armes", 0, "Abjuration", "bsom", "1 action", "Personnelle", "1 round", "", "V, S", "Jusqu’à la fin de ton prochain tour, tu as la résistance aux dégâts contondants, perforants et tranchants infligés par les attaques avec une arme.", "phb"],
  ["ray-of-frost", "Rayon de givre", 0, "Évocation", "sm", "1 action", "18 m", "Instantanée", "", "V, S", "Attaque de sort à distance : 1d8 froid, et la vitesse de la cible diminue de 3 m jusqu’au début de ton prochain tour. 2d8 au niveau 5, 3d8 au niveau 11, 4d8 au niveau 17.", "srd"],
  ["mending", "Réparation", 0, "Transmutation", "bcdsm", "1 minute", "Contact", "Instantanée", "", "V, S, M", "Répare une cassure ou une déchirure unique de 30 cm au plus sur un objet touché (maillon brisé, clé cassée, accroc, outre qui fuit), sans laisser de trace. Peut réparer physiquement un objet magique, mais ne lui rend pas sa magie.", "srd"],
  ["resistance", "Résistance", 0, "Abjuration", "cd", "1 action", "Contact", "1 minute", "C", "V, S, M", "Une créature consentante touchée peut, une fois avant la fin du sort, ajouter 1d4 à un jet de sauvegarde de son choix, avant ou après le jet. Le sort prend alors fin.", "srd"],
  ["spare-the-dying", "Stabilisation", 0, "Nécromancie", "c", "1 action", "Contact", "Instantanée", "", "V, S", "Une créature vivante touchée qui est à 0 PV devient stable, sans regagner de PV. Sans effet sur les morts-vivants et les créatures artificielles.", "srd"],
  ["thaumaturgy", "Thaumaturgie", 0, "Transmutation", "c", "1 action", "9 m", "Jusqu’à 1 minute", "", "V", "Prodige mineur au choix : voix trois fois plus forte, flammes qui vacillent ou changent de couleur, légères secousses du sol, bruit soudain (tonnerre, cri, murmures), porte ou fenêtre non verrouillée qui s’ouvre ou claque, yeux transformés. Jusqu’à trois effets d’une minute actifs à la fois.", "srd"],
  ["fire-bolt", "Trait de feu", 0, "Évocation", "sm", "1 action", "36 m", "Instantanée", "", "V, S", "Attaque de sort à distance contre une créature ou un objet : 1d10 feu. Enflamme un objet inflammable touché s’il n’est ni porté ni tenu. 2d10 au niveau 5, 3d10 au niveau 11, 4d10 au niveau 17.", "srd"],

  // Niveau 1 (62)
  ["alarm", "Alarme", 1, "Abjuration", "rm", "1 minute", "9 m", "8 heures", "R", "V, S, M", "Protège une porte, une fenêtre ou une zone tenant dans un cube de 6 m. Une créature de taille TP ou plus qui y entre déclenche l’alarme, sauf celles que tu as désignées : alarme mentale qui te réveille (si tu es à 1,5 km ou moins) ou son de clochette audible à 18 m pendant 10 secondes.", "srd"],
  ["animal-friendship", "Amitié avec les animaux", 1, "Enchantement", "bdr", "1 action", "9 m", "24 heures", "", "V, S, M", "Une bête visible fait une sauvegarde de SAG ou est charmée par toi pendant 24 heures ; une bête d’INT 4 ou plus n’est pas affectée. Le sort prend fin si toi ou tes compagnons lui faites du mal. Niveaux supérieurs : une bête de plus par niveau au-delà du 1er.", "srd"],
  ["find-familiar", "Appel de familier", 1, "Invocation", "m", "1 heure", "3 m", "Instantanée", "R", "V, S, M (charbon, encens et herbes pour 10 po, consommés)", "Un esprit céleste, féerique ou fiélon prend la forme d’un petit animal de ton choix (chat, chauve-souris, chouette, corbeau, serpent venimeux, araignée…). Il agit seul, n’attaque pas, mais délivre tes sorts de contact ; télépathie à 30 m et, par une action, tu perçois par ses sens. Tu peux le renvoyer dans une poche dimensionnelle et l’en rappeler.", "srd"],
  ["armor-of-agathys", "Armure d’Agathys", 1, "Abjuration", "o", "1 action", "Personnelle", "1 heure", "", "V, S, M", "Tu gagnes 5 PV temporaires pendant 1 heure. Tant qu’il t’en reste, une créature qui te touche avec une attaque au corps à corps subit 5 dégâts de froid. Niveaux supérieurs : +5 PV temporaires et +5 dégâts de froid par niveau au-delà du 1er.", "phb"],
  ["mage-armor", "Armure de mage", 1, "Abjuration", "sm", "1 action", "Contact", "8 heures", "", "V, S, M", "Une créature consentante qui ne porte pas d’armure a une CA de base de 13 + son modificateur de DEX pendant 8 heures. Le sort prend fin si elle revêt une armure ou si tu le congédies par une action.", "srd"],
  ["goodberry", "Baies nourricières", 1, "Transmutation", "dr", "1 action", "Contact", "Instantanée", "", "V, S, M", "Jusqu’à dix baies magiques apparaissent dans ta main et gardent leur pouvoir 24 heures. Manger une baie (action) rend 1 PV et nourrit une créature pour la journée.", "srd"],
  ["bless", "Bénédiction", 1, "Enchantement", "cp", "1 action", "9 m", "1 minute", "C", "V, S, M", "Jusqu’à trois créatures à portée ajoutent 1d4 à chacun de leurs jets d’attaque et de sauvegarde pendant la durée. Niveaux supérieurs : une cible de plus par niveau au-delà du 1er.", "srd"],
  ["inflict-wounds", "Blessure", 1, "Nécromancie", "c", "1 action", "Contact", "Instantanée", "", "V, S", "Attaque de sort au corps à corps contre une créature à ta portée : 3d10 nécrotiques. Niveaux supérieurs : +1d10 par niveau au-delà du 1er.", "srd"],
  ["shield", "Bouclier", 1, "Abjuration", "sm", "1 réaction, quand une attaque te touche ou que projectile magique te vise", "Personnelle", "1 round", "", "V, S", "Jusqu’au début de ton prochain tour, tu gagnes +5 à la CA, y compris contre l’attaque déclenchante, et projectile magique ne t’inflige aucun dégât.", "srd"],
  ["shield-of-faith", "Bouclier de la foi", 1, "Abjuration", "cp", "1 action bonus", "18 m", "10 minutes", "C", "V, S, M", "Un champ scintillant entoure une créature de ton choix à portée et lui donne +2 à la CA pendant la durée.", "srd"],
  ["charm-person", "Charme-personne", 1, "Enchantement", "bdsom", "1 action", "9 m", "1 heure", "", "V, S", "Un humanoïde visible fait une sauvegarde de SAG, avec l’avantage si toi ou tes compagnons le combattez. Échec : charmé et amical envers toi pendant 1 heure ou jusqu’à ce que vous lui nuisiez ; il sait ensuite qu’il a été charmé. Niveaux supérieurs : une cible de plus par niveau au-delà du 1er (à 9 m les unes des autres).", "srd"],
  ["searing-smite", "Châtiment calcinant", 1, "Évocation", "p", "1 action bonus", "Personnelle", "1 minute", "C", "V", "Ta prochaine attaque d’arme au corps à corps qui touche inflige 1d6 feu de plus et embrase la cible. Au début de chacun de ses tours, elle fait une sauvegarde de CON : 1d6 feu en cas d’échec ; une réussite met fin au sort, tout comme une action pour éteindre les flammes. Niveaux supérieurs : dégâts initiaux +1d6 par niveau au-delà du 1er.", "phb"],
  ["wrathful-smite", "Châtiment courroucé", 1, "Évocation", "p", "1 action bonus", "Personnelle", "1 minute", "C", "V", "Ta prochaine attaque d’arme au corps à corps qui touche inflige 1d6 psychiques de plus, et la cible fait une sauvegarde de SAG ou est effrayée par toi jusqu’à la fin du sort. Par une action, elle peut faire un test de SAG contre ton DD pour y mettre fin.", "phb"],
  ["thunderous-smite", "Châtiment tonitruant", 1, "Évocation", "p", "1 action bonus", "Personnelle", "1 minute", "C", "V", "Ta prochaine attaque d’arme au corps à corps qui touche résonne jusqu’à 90 m et inflige 2d6 tonnerre de plus. La cible fait une sauvegarde de FOR ou est repoussée de 3 m et tombe à terre.", "phb"],
  ["speak-with-animals", "Communication avec les animaux", 1, "Divination", "bdr", "1 action", "Personnelle", "10 minutes", "R", "V, S", "Pendant 10 minutes, tu comprends les bêtes et peux communiquer verbalement avec elles. Leur intelligence limite leurs réponses, mais elles peuvent au moins te renseigner sur les lieux et les monstres alentour, et rendre un petit service si le MJ l’accepte.", "srd"],
  ["comprehend-languages", "Compréhension des langues", 1, "Divination", "bsom", "1 action", "Personnelle", "1 heure", "R", "V, S, M", "Pendant 1 heure, tu comprends le sens littéral de toute langue parlée que tu entends, et de tout texte écrit que tu touches (environ 1 minute par page). Ne déchiffre ni les messages codés ni les symboles magiques qui ne font pas partie d’une langue.", "srd"],
  ["color-spray", "Couleurs dansantes", 1, "Illusion", "sm", "1 action", "Personnelle (cône de 4,50 m)", "1 round", "", "V, S, M", "Lance 6d10 : c’est le total de PV de créatures affectées dans un cône de 4,50 m, sans sauvegarde, de celle qui a le moins de PV actuels à la plus robuste. Chacune est aveuglée jusqu’à la fin de ton prochain tour. Les créatures inconscientes ou qui ne voient pas sont ignorées. Niveaux supérieurs : +2d10 par niveau au-delà du 1er.", "srd"],
  ["create-or-destroy-water", "Création ou destruction d’eau", 1, "Transmutation", "cd", "1 action", "9 m", "Instantanée", "", "V, S, M", "Crée jusqu’à 40 litres d’eau potable dans un récipient ouvert, ou une pluie qui éteint les flammes exposées dans un cube de 9 m. Ou détruit jusqu’à 40 litres d’eau d’un récipient ouvert, ou le brouillard d’un cube de 9 m. Niveaux supérieurs : +40 litres, ou +1,50 m d’arête, par niveau au-delà du 1er.", "srd"],
  ["disguise-self", "Déguisement", 1, "Illusion", "bsm", "1 action", "Personnelle", "1 heure", "", "V, S", "Pendant 1 heure, tu modifies l’apparence de ton corps, de tes vêtements et de ton équipement : jusqu’à 30 cm de plus ou de moins, plus mince ou plus gros, mais même morphologie. L’illusion ne résiste pas au toucher. Une créature qui l’examine (action) la perce sur un test d’INT (Investigation) contre ton DD de sort.", "srd"],
  ["detect-magic", "Détection de la magie", 1, "Divination", "bcdprsm", "1 action", "Personnelle", "10 minutes", "CR", "V, S", "Pendant la durée, tu perçois la présence de magie à 9 m de toi. Par une action, tu vois une aura autour de toute créature ou de tout objet magique visible dans la zone et apprends l’école de magie éventuelle. Bloqué par 30 cm de pierre, 2,5 cm de métal ordinaire, une feuille de plomb ou 90 cm de bois ou de terre.", "srd"],
  ["detect-evil-and-good", "Détection du mal et du bien", 1, "Divination", "cp", "1 action", "Personnelle", "10 minutes", "C", "V, S", "Pendant la durée, tu sais si une aberration, un céleste, un élémentaire, une fée, un fiélon ou un mort-vivant se trouve à 9 m de toi, et où ; tu détectes aussi les lieux et objets consacrés ou profanés. Bloqué par 30 cm de pierre, 2,5 cm de métal ordinaire, une feuille de plomb ou 90 cm de bois ou de terre.", "srd"],
  ["detect-poison-and-disease", "Détection du poison et des maladies", 1, "Divination", "cdpr", "1 action", "Personnelle", "10 minutes", "CR", "V, S, M", "Pendant la durée, tu perçois la présence et l’emplacement des poisons, des créatures venimeuses et des maladies à 9 m de toi, et identifies chaque fois leur nature. Bloqué par 30 cm de pierre, 2,5 cm de métal ordinaire, une feuille de plomb ou 90 cm de bois ou de terre.", "srd"],
  ["tensers-floating-disk", "Disque flottant de Tenser", 1, "Invocation", "m", "1 action", "9 m", "1 heure", "R", "V, S, M", "Un disque de force de 90 cm de diamètre flotte à 90 cm du sol et porte jusqu’à 250 kg. Il te suit en restant à 6 m de toi et franchit escaliers et pentes, mais pas un dénivelé de 3 m ou plus. Le sort prend fin si tu t’en éloignes à plus de 30 m ou s’il est surchargé, et sa charge tombe.", "srd"],
  ["compelled-duel", "Duel forcé", 1, "Enchantement", "p", "1 action bonus", "9 m", "1 minute", "C", "V", "Une créature visible fait une sauvegarde de SAG. Échec : désavantage à ses attaques contre d’autres que toi, et sauvegarde de SAG requise pour s’éloigner à plus de 9 m de toi. Fin si tu attaques ou vises par un sort une autre créature, si un allié la blesse ou lui lance un sort nuisible, ou si tu finis ton tour à plus de 9 m d’elle.", "phb"],
  ["guiding-bolt", "Éclair traçant", 1, "Évocation", "c", "1 action", "36 m", "1 round", "", "V, S", "Attaque de sort à distance : 4d6 radiants. Le prochain jet d’attaque contre la cible avant la fin de ton prochain tour a l’avantage. Niveaux supérieurs : +1d6 par niveau au-delà du 1er.", "srd"],
  ["entangle", "Enchevêtrement", 1, "Invocation", "d", "1 action", "27 m", "1 minute", "C", "V, S", "Des plantes envahissent un carré de 6 m de côté, qui devient un terrain difficile. Chaque créature présente à l’apparition des plantes fait une sauvegarde de FOR ou est entravée ; elle peut se libérer par une action et un test de FOR contre ton DD.", "srd"],
  ["divine-favor", "Faveur divine", 1, "Évocation", "p", "1 action bonus", "Personnelle", "1 minute", "C", "V, S", "Pendant la durée, tes attaques avec une arme infligent 1d4 dégâts radiants supplémentaires quand elles touchent.", "srd"],
  ["feather-fall", "Feuille morte", 1, "Transmutation", "bsm", "1 réaction, quand une créature à 18 m ou moins (toi compris) tombe", "18 m", "1 minute", "", "V, M", "Jusqu’à cinq créatures en chute à portée descendent à 18 m par round. Si elles atterrissent avant la fin du sort, elles ne subissent aucun dégât de chute et retombent sur leurs pieds ; le sort prend alors fin pour elles.", "srd"],
  ["bane", "Fléau", 1, "Enchantement", "bc", "1 action", "9 m", "1 minute", "C", "V, S, M", "Jusqu’à trois créatures visibles font une sauvegarde de CHA. Échec : pendant la durée, elles retranchent 1d4 de chacun de leurs jets d’attaque et de sauvegarde. Niveaux supérieurs : une cible de plus par niveau au-delà du 1er.", "srd"],
  ["tashas-hideous-laughter", "Fou rire de Tasha", 1, "Enchantement", "bm", "1 action", "9 m", "1 minute", "C", "V, S, M", "Une créature visible fait une sauvegarde de SAG ou est prise d’un fou rire : à terre, neutralisée et incapable de se relever. Une créature d’INT 4 ou moins n’est pas affectée. Elle refait la sauvegarde à la fin de chacun de ses tours et chaque fois qu’elle subit des dégâts (avec l’avantage dans ce cas) ; une réussite met fin au sort.", "srd"],
  ["ensnaring-strike", "Frappe piégeuse", 1, "Invocation", "r", "1 action bonus", "Personnelle", "1 minute", "C", "V", "À ta prochaine attaque d’arme qui touche, des ronces surgissent : la cible fait une sauvegarde de FOR (avantage si elle est de taille G ou plus) ou est entravée et subit 1d6 perforants au début de chacun de ses tours. Une action et un test de FOR contre ton DD la libèrent. Niveaux supérieurs : +1d6 par niveau au-delà du 1er.", "phb"],
  ["grease", "Graisse", 1, "Invocation", "m", "1 action", "18 m", "1 minute", "", "V, S, M", "Un carré de 3 m de côté devient glissant et forme un terrain difficile pendant 1 minute. Chaque créature présente à l’incantation, qui y entre ou qui y termine son tour fait une sauvegarde de DEX ou tombe à terre.", "srd"],
  ["longstrider", "Grande foulée", 1, "Transmutation", "bdrm", "1 action", "Contact", "1 heure", "", "V, S, M", "La vitesse d’une créature touchée augmente de 3 m pendant 1 heure. Niveaux supérieurs : une cible de plus par niveau au-delà du 1er.", "srd"],
  ["hail-of-thorns", "Grêle d’épines", 1, "Invocation", "r", "1 action bonus", "Personnelle", "1 minute", "C", "V", "La prochaine fois que tu touches une créature avec une attaque d’arme à distance, des épines frappent la cible et chaque créature à 1,50 m d’elle : sauvegarde de DEX, 1d10 perforants en cas d’échec, moitié en cas de réussite. Niveaux supérieurs : +1d10 par niveau au-delà du 1er (6d10 au maximum).", "phb"],
  ["heroism", "Héroïsme", 1, "Enchantement", "bp", "1 action", "Contact", "1 minute", "C", "V, S", "Une créature consentante touchée est immunisée contre l’état effrayé et gagne, au début de chacun de ses tours, des PV temporaires égaux à ton modificateur de caractéristique d’incantation. Elle perd ceux qui restent à la fin du sort. Niveaux supérieurs : une cible de plus par niveau au-delà du 1er.", "srd"],
  ["identify", "Identification", 1, "Divination", "bm", "1 minute", "Contact", "Instantanée", "R", "V, S, M (perle d’au moins 100 po et plume de chouette)", "Tu apprends les propriétés d’un objet magique touché, comment s’en servir, s’il demande un lien et combien de charges il lui reste, ainsi que les sorts qui l’affectent ou l’ont créé. Sur une créature, tu apprends quels sorts l’affectent actuellement.", "srd"],
  ["silent-image", "Image silencieuse", 1, "Illusion", "bsm", "1 action", "18 m", "10 minutes", "C", "V, S, M", "Crée l’image visuelle d’un objet, d’une créature ou d’un phénomène tenant dans un cube de 4,50 m, sans son, odeur ni autre effet sensoriel. Par une action, tu la déplaces et l’animes. Un contact physique la trahit ; une créature qui l’examine (action) la perce sur un test d’INT (Investigation) contre ton DD de sort.", "srd"],
  ["command", "Injonction", 1, "Enchantement", "cp", "1 action", "18 m", "1 round", "", "V", "Tu donnes un ordre d’un mot (approche, lâche, fuis, rampe, halte…) à une créature visible : sauvegarde de SAG ou elle obéit à son prochain tour. Sans effet sur un mort-vivant, si elle ne comprend pas ta langue ou si l’ordre lui est directement nuisible. Niveaux supérieurs : une cible de plus par niveau au-delà du 1er (à 9 m les unes des autres).", "srd"],
  ["faerie-fire", "Lueurs féeriques", 1, "Évocation", "bd", "1 action", "18 m", "1 minute", "C", "V", "Les objets d’un cube de 6 m se parent de lumière bleue, verte ou violette ; les créatures de la zone aussi, sauf si elles réussissent une sauvegarde de DEX. Les cibles émettent une lumière faible sur 3 m, ne profitent pas de l’invisibilité, et les attaques contre elles ont l’avantage si l’attaquant les voit.", "srd"],
  ["burning-hands", "Mains brûlantes", 1, "Évocation", "sm", "1 action", "Personnelle (cône de 4,50 m)", "Instantanée", "", "V, S", "Chaque créature dans un cône de 4,50 m fait une sauvegarde de DEX : 3d6 feu en cas d’échec, moitié en cas de réussite. Enflamme les objets inflammables de la zone ni portés ni tenus. Niveaux supérieurs : +1d6 par niveau au-delà du 1er.", "srd"],
  ["hex", "Maléfice", 1, "Enchantement", "o", "1 action bonus", "27 m", "1 heure", "C", "V, S, M", "Une créature visible est maudite : tes attaques qui la touchent infligent 1d6 nécrotiques de plus, et elle a un désavantage aux tests de la caractéristique de ton choix. Si elle tombe à 0 PV, une action bonus à un tour suivant transfère la malédiction. Niveaux supérieurs : 8 heures au niveau 3 ou 4, 24 heures au niveau 5 ou plus.", "phb"],
  ["hunters-mark", "Marque du chasseur", 1, "Divination", "r", "1 action bonus", "27 m", "1 heure", "C", "V", "Une créature visible est marquée : tes attaques avec une arme qui la touchent infligent 1d6 dégâts de plus, et tu as l’avantage aux tests de SAG (Perception ou Survie) pour la trouver. Si elle tombe à 0 PV, une action bonus à un tour suivant déplace la marque. Niveaux supérieurs : 8 heures au niveau 3 ou 4, 24 heures au niveau 5 ou plus.", "srd"],
  ["healing-word", "Mot de guérison", 1, "Évocation", "bcd", "1 action bonus", "18 m", "Instantanée", "", "V", "Une créature visible à portée récupère 1d4 + ton modificateur de caractéristique d’incantation PV. Sans effet sur les morts-vivants et les créatures artificielles. Niveaux supérieurs : +1d4 par niveau au-delà du 1er.", "srd"],
  ["dissonant-whispers", "Murmures dissonants", 1, "Enchantement", "b", "1 action", "18 m", "Instantanée", "", "V", "Une créature de ton choix qui t’entend fait une sauvegarde de SAG (réussite automatique si elle est assourdie). Échec : 3d6 psychiques, et elle doit aussitôt utiliser sa réaction, si possible, pour s’éloigner de toi de toute sa vitesse. Réussite : moitié des dégâts. Niveaux supérieurs : +1d6 par niveau au-delà du 1er.", "phb"],
  ["fog-cloud", "Nappe de brouillard", 1, "Invocation", "drsm", "1 action", "36 m", "1 heure", "C", "V, S", "Une sphère de brouillard de 6 m de rayon, qui contourne les angles, rend sa zone fortement obscurcie. Un vent d’au moins 15 km/h la disperse. Niveaux supérieurs : rayon +6 m par niveau au-delà du 1er.", "srd"],
  ["chromatic-orb", "Orbe chromatique", 1, "Évocation", "sm", "1 action", "27 m", "Instantanée", "", "V, S, M (diamant d’au moins 50 po)", "Choisis acide, froid, feu, foudre, poison ou tonnerre, puis fais une attaque de sort à distance contre une créature : 3d8 dégâts du type choisi. Niveaux supérieurs : +1d8 par niveau au-delà du 1er.", "phb"],
  ["magic-missile", "Projectile magique", 1, "Évocation", "sm", "1 action", "36 m", "Instantanée", "", "V, S", "Trois fléchettes de force touchent automatiquement et simultanément les créatures visibles de ton choix à portée : 1d4 + 1 force chacune, sur une ou plusieurs cibles. Niveaux supérieurs : une fléchette de plus par niveau au-delà du 1er.", "srd"],
  ["protection-evil-good", "Protection contre le mal et le bien", 1, "Abjuration", "cpom", "1 action", "Contact", "10 minutes", "C", "V, S, M (eau bénite ou poudre d’argent et de fer, consommées)", "Une créature consentante touchée est protégée des aberrations, célestes, élémentaires, fées, fiélons et morts-vivants : ils ont un désavantage à leurs attaques contre elle et ne peuvent ni la charmer, ni l’effrayer, ni la posséder. Si elle subit déjà un tel effet, elle a l’avantage à la nouvelle sauvegarde contre lui.", "srd"],
  ["purify-food-and-drink", "Purification de nourriture et d’eau", 1, "Transmutation", "cdp", "1 action", "3 m", "Instantanée", "R", "V, S", "Toute la nourriture et la boisson non magiques dans une sphère de 1,50 m de rayon sont purifiées : débarrassées de tout poison et de toute maladie.", "srd"],
  ["ray-of-sickness", "Rayon empoisonné", 1, "Nécromancie", "sm", "1 action", "18 m", "Instantanée", "", "V, S", "Attaque de sort à distance : 2d8 poison, et la cible fait une sauvegarde de CON ou est empoisonnée jusqu’à la fin de ton prochain tour. Niveaux supérieurs : +1d8 par niveau au-delà du 1er.", "phb"],
  ["expeditious-retreat", "Repli expéditif", 1, "Transmutation", "som", "1 action bonus", "Personnelle", "10 minutes", "C", "V, S", "Tu effectues l’action Foncer au moment de l’incantation, puis tu peux la refaire par une action bonus à chacun de tes tours jusqu’à la fin du sort.", "srd"],
  ["hellish-rebuke", "Représailles infernales", 1, "Évocation", "o", "1 réaction, quand une créature visible à 18 m ou moins te blesse", "18 m", "Instantanée", "", "V, S", "La créature qui vient de te blesser est entourée de flammes et fait une sauvegarde de DEX : 2d10 feu en cas d’échec, moitié en cas de réussite. Niveaux supérieurs : +1d10 par niveau au-delà du 1er.", "srd"],
  ["sanctuary", "Sanctuaire", 1, "Abjuration", "c", "1 action bonus", "9 m", "1 minute", "", "V, S, M", "Toute créature qui veut attaquer la créature protégée ou la viser avec un sort nuisible doit d’abord réussir une sauvegarde de SAG, sinon elle choisit une autre cible ou perd son attaque ou son sort. Ne protège pas des effets de zone. Prend fin si la créature protégée attaque, inflige des dégâts ou lance un sort affectant un ennemi.", "srd"],
  ["jump", "Saut", 1, "Transmutation", "drsm", "1 action", "Contact", "1 minute", "", "V, S, M", "La distance de saut d’une créature touchée est triplée pendant 1 minute.", "srd"],
  ["unseen-servant", "Serviteur invisible", 1, "Invocation", "bom", "1 action", "18 m", "1 heure", "R", "V, S, M", "Une force invisible et sans forme (CA 10, 1 PV, FOR 2) accomplit des tâches simples : porter, nettoyer, plier, allumer un feu, servir. Par une action bonus, tu lui donnes un ordre et elle se déplace de 4,50 m. Elle ne peut pas attaquer ; le sort prend fin si elle s’éloigne à plus de 18 m de toi ou tombe à 0 PV.", "srd"],
  ["false-life", "Simulacre de vie", 1, "Nécromancie", "sm", "1 action", "Personnelle", "1 heure", "", "V, S, M", "Tu gagnes 1d4 + 4 PV temporaires pendant 1 heure. Niveaux supérieurs : +5 PV temporaires par niveau au-delà du 1er.", "srd"],
  ["cure-wounds", "Soins", 1, "Évocation", "bcdpr", "1 action", "Contact", "Instantanée", "", "V, S", "Une créature touchée récupère 1d8 + ton modificateur de caractéristique d’incantation PV. Sans effet sur les morts-vivants et les créatures artificielles. Niveaux supérieurs : +1d8 par niveau au-delà du 1er.", "srd"],
  ["sleep", "Sommeil", 1, "Enchantement", "bsm", "1 action", "27 m", "1 minute", "", "V, S, M", "Lance 5d8 : c’est le total de PV de créatures endormies dans une sphère de 6 m de rayon, sans sauvegarde, en commençant par celle qui a le moins de PV. Elles dorment 1 minute, sauf si on les blesse ou les réveille (action) ; morts-vivants et créatures immunisées contre le charme sont épargnés. Niveaux supérieurs : +2d8 par niveau au-delà du 1er.", "srd"],
  ["arms-of-hadar", "Tentacules de Hadar", 1, "Invocation", "o", "1 action", "Personnelle (rayon de 3 m)", "Instantanée", "", "V, S", "Des tentacules sombres frappent chaque créature à 3 m de toi : sauvegarde de FOR. Échec : 2d6 nécrotiques et aucune réaction possible jusqu’à son prochain tour. Réussite : moitié des dégâts seulement. Niveaux supérieurs : +1d6 par niveau au-delà du 1er.", "phb"],
  ["illusory-script", "Texte illusoire", 1, "Illusion", "bom", "1 minute", "Contact", "10 jours", "R", "S, M (encre au plomb d’au moins 10 po, consommée)", "Tu écris sur un parchemin ou un papier un message que seules les créatures désignées peuvent lire. Pour les autres, il ressemble à une écriture inconnue ou magique, ou à un tout autre message de ton choix. Dure 10 jours ; une créature dotée de vision véritable lit le vrai message.", "srd"],
  ["witch-bolt", "Trait ensorcelé", 1, "Évocation", "som", "1 action", "9 m", "1 minute", "C", "V, S, M", "Attaque de sort à distance : 1d12 foudre. Ensuite, à chacun de tes tours, tu peux utiliser ton action pour infliger automatiquement 1d12 foudre à la cible. Le sort cesse si tu fais autre chose de ton action, ou si la cible sort de portée ou obtient un abri total. Niveaux supérieurs : dégâts initiaux +1d12 par niveau au-delà du 1er.", "phb"],
  ["thunderwave", "Vague tonnante", 1, "Évocation", "bdsm", "1 action", "Personnelle (cube de 4,50 m)", "Instantanée", "", "V, S", "Chaque créature dans un cube de 4,50 m partant de toi fait une sauvegarde de CON : 2d8 tonnerre et repoussée de 3 m en cas d’échec, moitié des dégâts sans recul en cas de réussite. Les objets non fixés sont aussi repoussés, et le fracas s’entend à 90 m. Niveaux supérieurs : +1d8 par niveau au-delà du 1er.", "srd"],

  // Niveau 2 (59)
  ["enlarge-reduce", "Agrandissement/Rapetissement", 2, "Transmutation", "sm", "1 action", "9 m", "1 minute", "C", "V, S, M", "Une créature visible, ou un objet ni porté ni tenu, grandit (taille doublée, une catégorie de plus, avantage aux tests et sauvegardes de FOR, armes +1d4 dégâts) ou rapetisse (taille divisée par deux, une catégorie de moins, désavantage à ces mêmes jets, armes -1d4 dégâts, minimum 1). Une créature qui refuse fait une sauvegarde de CON.", "srd"],
  ["aid", "Aide", 2, "Abjuration", "cp", "1 action", "9 m", "8 heures", "", "V, S, M", "Jusqu’à trois créatures à portée voient leurs PV maximum et actuels augmenter de 5 pendant 8 heures. Niveaux supérieurs : +5 PV par niveau au-delà du 2e.", "srd"],
  ["enhance-ability", "Amélioration de caractéristique", 2, "Transmutation", "bcds", "1 action", "Contact", "1 heure", "C", "V, S, M", "Une créature touchée a l’avantage aux tests d’une caractéristique choisie, avec un bonus selon le cas : CON (2d6 PV temporaires), FOR (capacité de charge doublée), DEX (aucun dégât d’une chute de 6 m ou moins si elle n’est pas neutralisée), INT, SAG ou CHA. Niveaux supérieurs : une cible de plus par niveau au-delà du 2e.", "srd"],
  ["calm-emotions", "Apaisement des émotions", 2, "Enchantement", "bc", "1 action", "18 m", "1 minute", "C", "V, S", "Chaque humanoïde dans une sphère de 6 m de rayon fait une sauvegarde de CHA (il peut choisir d’échouer). Échec, au choix : les effets qui le charment ou l’effraient sont suspendus pendant la durée, ou il devient indifférent envers les créatures de ton choix qui lui sont hostiles (jusqu’à ce qu’on le blesse, lui ou ses amis).", "srd"],
  ["find-steed", "Appel de destrier", 2, "Invocation", "p", "10 minutes", "9 m", "Instantanée", "", "V, S", "Un esprit céleste, féerique ou fiélon prend la forme d’une monture loyale (cheval de guerre, poney, chameau, élan ou molosse) d’au moins 6 en INT, avec qui tu communiques par télépathie à 1,5 km. Monté, tu peux lui faire profiter des sorts que tu lances sur toi seul. À 0 PV, elle disparaît ; relancer le sort la rappelle (une seule à la fois).", "srd"],
  ["magic-weapon", "Arme magique", 2, "Transmutation", "pm", "1 action bonus", "Contact", "1 heure", "C", "V, S", "Une arme non magique touchée devient magique et gagne +1 aux jets d’attaque et de dégâts. Niveaux supérieurs : +2 avec un emplacement de niveau 4 ou 5, +3 de niveau 6 ou plus.", "srd"],
  ["spiritual-weapon", "Arme spirituelle", 2, "Évocation", "c", "1 action bonus", "18 m", "1 minute", "", "V, S", "Une arme spectrale flotte pendant 1 minute, sans concentration. À l’incantation, puis par une action bonus à chacun de tes tours (en la déplaçant de 6 m), elle frappe une créature à 1,50 m d’elle : attaque de sort au corps à corps, 1d8 + ton modificateur d’incantation force. Niveaux supérieurs : +1d8 tous les deux niveaux au-delà du 2e.", "srd"],
  ["augury", "Augure", 2, "Divination", "c", "1 minute", "Personnelle", "Instantanée", "R", "V, S, M (bâtonnets, osselets ou jetons gravés d’au moins 25 po)", "Tu reçois un présage sur une action précise que tu comptes mener dans les 30 prochaines minutes : bénéfique, néfaste, les deux, ou ni l’un ni l’autre. Chaque lancement supplémentaire avant un repos long ajoute 25 % de chances cumulatives d’obtenir une réponse aléatoire.", "srd"],
  ["nystuls-magic-aura", "Aura magique de Nystul", 2, "Illusion", "m", "1 action", "Contact", "24 heures", "", "V, S, M", "Trompe la divination sur une créature consentante ou un objet non porté : fausse aura (l’objet paraît magique ou non, ou d’une autre école, à détection de la magie) ou masque (la créature paraît d’un autre type aux effets qui détectent les types). Relancé chaque jour pendant 30 jours sur la même cible, il dure jusqu’à dissipation.", "srd"],
  ["magic-mouth", "Bouche magique", 2, "Illusion", "bm", "1 minute", "9 m", "Jusqu’à dissipation", "R", "V, S, M (rayon de miel et poudre de jade d’au moins 10 po, consommés)", "Tu caches dans un objet un message de 25 mots au plus (10 minutes de parole maximum) et un déclencheur visuel ou sonore à 9 m. Le moment venu, une bouche magique apparaît et le récite de ta voix. Le sort peut s’arrêter après ce message ou le répéter à chaque déclenchement.", "srd"],
  ["gust-of-wind", "Bourrasque", 2, "Évocation", "dsm", "1 action", "Personnelle (ligne de 18 m)", "1 minute", "C", "V, S, M", "Un vent violent souffle depuis toi sur une ligne de 18 m de long et 3 m de large : une créature qui y commence son tour fait une sauvegarde de FOR ou est repoussée de 4,50 m, et avancer vers toi coûte double. Il disperse gaz et vapeurs et éteint les flammes nues. Par une action bonus, tu changes sa direction.", "srd"],
  ["blindness-deafness", "Cécité/Surdité", 2, "Nécromancie", "bcsm", "1 action", "9 m", "1 minute", "", "V", "Une créature visible fait une sauvegarde de CON ou devient aveuglée ou assourdie (au choix) pendant 1 minute, sans concentration. Elle refait la sauvegarde à la fin de chacun de ses tours ; une réussite met fin au sort. Niveaux supérieurs : une cible de plus par niveau au-delà du 2e.", "srd"],
  ["branding-smite", "Châtiment révélateur", 2, "Évocation", "p", "1 action bonus", "Personnelle", "1 minute", "C", "V", "Ta prochaine attaque d’arme qui touche inflige 2d6 radiants de plus. Une cible invisible redevient visible ; jusqu’à la fin du sort, elle émet une lumière faible sur 1,50 m et ne peut pas devenir invisible. Niveaux supérieurs : +1d6 par niveau au-delà du 2e.", "srd"],
  ["rope-trick", "Corde enchantée", 2, "Transmutation", "m", "1 action", "Contact", "1 heure", "", "V, S, M", "Une corde de 18 m au plus se dresse ; en haut, une entrée invisible mène à un espace extradimensionnel pour huit créatures de taille M ou moins, où l’on peut hisser la corde. Ni attaques ni sorts ne franchissent l’entrée, mais on voit dehors par une fenêtre de 90 cm sur 1,50 m. À la fin du sort, tout ce qui s’y trouve tombe.", "srd"],
  ["cordon-of-arrows", "Cordon de flèches", 2, "Transmutation", "r", "1 action", "1,50 m", "8 heures", "", "V, S, M", "Tu plantes quatre munitions non magiques. Quand une créature autre que toi arrive à 9 m d’elles pour la première fois de son tour ou y finit son tour, une munition la frappe puis se détruit : sauvegarde de DEX ou 1d6 perforants. Tu peux épargner des créatures désignées. Niveaux supérieurs : +2 munitions par niveau au-delà du 2e.", "phb"],
  ["crown-of-madness", "Couronne du dément", 2, "Enchantement", "bsom", "1 action", "36 m", "1 minute", "C", "V, S", "Un humanoïde visible fait une sauvegarde de SAG ou est charmé : à chacun de ses tours, avant de bouger, il doit attaquer au corps à corps une créature que tu désignes mentalement. Tu dois utiliser ton action à chacun de tes tours suivants pour maintenir le sort. Il refait la sauvegarde à la fin de chacun de ses tours.", "phb"],
  ["spike-growth", "Croissance d’épines", 2, "Transmutation", "dr", "1 action", "45 m", "10 minutes", "C", "V, S, M", "Le sol d’une zone de 6 m de rayon se hérisse d’épines camouflées et devient un terrain difficile. Une créature qui s’y déplace subit 2d4 perforants par tranche de 1,50 m parcourue. Repérer le danger avant d’y entrer demande un test de SAG (Perception) contre ton DD.", "srd"],
  ["knock", "Déblocage", 2, "Transmutation", "bsm", "1 action", "18 m", "Instantanée", "", "V", "Un objet visible fermé, coincé ou verrouillé (porte, coffre, menottes, cadenas) s’ouvre ; s’il a plusieurs serrures, une seule cède. Un verrou magique est suspendu 10 minutes. Un grand coup, audible à 90 m, retentit.", "srd"],
  ["detect-thoughts", "Détection des pensées", 2, "Divination", "bsm", "1 action", "Personnelle", "1 minute", "C", "V, S, M", "Par une action, tu lis les pensées superficielles d’une créature visible à 9 m (INT 4 ou plus, parlant une langue) ; une autre action sonde plus loin : sauvegarde de SAG ou tu perçois raisonnement et émotions, sinon le sort cesse. Tu détectes aussi les créatures pensantes cachées à 9 m. Bloqué par 60 cm de pierre, 5 cm de métal ou du plomb.", "srd"],
  ["enthrall", "Discours captivant", 2, "Enchantement", "bo", "1 action", "18 m", "1 minute", "", "V, S", "Les créatures de ton choix qui te voient et t’entendent font une sauvegarde de SAG, avec l’avantage si toi ou tes compagnons les combattez. Échec : désavantage aux tests de SAG (Perception) pour percevoir toute autre créature que toi, tant qu’elles t’entendent. Le sort cesse si tu es neutralisé ou ne peux plus parler.", "srd"],
  ["continual-flame", "Flamme éternelle", 2, "Évocation", "cm", "1 action", "Contact", "Jusqu’à dissipation", "", "V, S, M (poudre de rubis de 50 po, consommée)", "Un objet touché porte une flamme aussi lumineuse qu’une torche, qui ne chauffe pas et ne consomme pas d’oxygène. On peut la couvrir ou la cacher, mais pas l’étouffer ni l’éteindre.", "srd"],
  ["melfs-acid-arrow", "Flèche acide de Melf", 2, "Évocation", "m", "1 action", "27 m", "Instantanée", "", "V, S, M", "Attaque de sort à distance. Touché : 4d4 acide immédiatement, puis 2d4 acide à la fin du prochain tour de la cible. Raté : moitié des dégâts initiaux, et rien ensuite. Niveaux supérieurs : +1d4 aux dégâts initiaux et aux dégâts suivants par niveau au-delà du 2e.", "srd"],
  ["blur", "Flou", 2, "Illusion", "sm", "1 action", "Personnelle", "1 minute", "C", "V", "Ton corps devient flou : les attaques contre toi ont un désavantage, sauf de la part des créatures qui ne dépendent pas de la vue (vision aveugle) ou percent les illusions (vision véritable).", "srd"],
  ["phantasmal-force", "Force fantasmagorique", 2, "Illusion", "bsm", "1 action", "18 m", "1 minute", "C", "V, S, M", "Une créature visible fait une sauvegarde d’INT ou perçoit un fantasme de ton choix (cube de 3 m au plus) qu’elle seule voit et croit réel. À chacun de tes tours, s’il peut logiquement blesser, il lui inflige 1d6 psychiques quand elle est dedans ou à 1,50 m. Par une action, elle le perce sur un test d’INT (Investigation) contre ton DD.", "phb"],
  ["misty-step", "Foulée brumeuse", 2, "Invocation", "som", "1 action bonus", "Personnelle", "Instantanée", "", "V", "Entouré d’une brume argentée, tu te téléportes jusqu’à 9 m vers un espace inoccupé que tu vois.", "srd"],
  ["shatter", "Fracassement", 2, "Évocation", "bsom", "1 action", "18 m", "Instantanée", "", "V, S, M", "Un bruit assourdissant éclate dans une sphère de 3 m de rayon : chaque créature fait une sauvegarde de CON, 3d8 tonnerre, moitié si réussite ; celles faites de matière inorganique (pierre, cristal, métal) ont un désavantage. Les objets non portés sont aussi touchés. Niveaux supérieurs : +1d8 par niveau au-delà du 2e.", "srd"],
  ["mirror-image", "Image miroir", 2, "Illusion", "som", "1 action", "Personnelle", "1 minute", "", "V, S", "Trois doubles illusoires t’entourent pendant 1 minute, sans concentration. Quand une attaque te vise, lance 1d20 : 6+ avec trois doubles, 8+ avec deux, 11+ avec un, et c’est un double qui est visé (CA 10 + ton modificateur de DEX ; détruit s’il est touché). Inutile contre les créatures qui ne voient pas ou ont la vision aveugle ou véritable.", "srd"],
  ["hold-person", "Immobilisation de personne", 2, "Enchantement", "bcdsom", "1 action", "18 m", "1 minute", "C", "V, S, M", "Un humanoïde visible fait une sauvegarde de SAG ou est paralysé. Il refait la sauvegarde à la fin de chacun de ses tours ; une réussite met fin au sort pour lui. Niveaux supérieurs : un humanoïde de plus par niveau au-delà du 2e (à 9 m les uns des autres).", "srd"],
  ["invisibility", "Invisibilité", 2, "Illusion", "bsom", "1 action", "Contact", "1 heure", "C", "V, S, M", "Une créature touchée devient invisible, ainsi que ce qu’elle porte et tient. Le sort prend fin pour elle dès qu’elle attaque ou lance un sort. Niveaux supérieurs : une cible de plus par niveau au-delà du 2e.", "srd"],
  ["flame-blade", "Lame de feu", 2, "Évocation", "d", "1 action bonus", "Personnelle", "10 minutes", "C", "V, S, M", "Une lame de feu apparaît dans ta main libre ; si tu la lâches, elle disparaît et revient par une action bonus. Par une action, attaque de sort au corps à corps : 3d6 feu. Elle éclaire vivement sur 3 m et faiblement sur 3 m de plus. Niveaux supérieurs : +1d6 tous les deux niveaux au-delà du 2e.", "srd"],
  ["levitate", "Lévitation", 2, "Transmutation", "sm", "1 action", "18 m", "10 minutes", "C", "V, S, M", "Une créature ou un objet non fixé de 250 kg au plus s’élève jusqu’à 6 m et reste suspendu (sauvegarde de CON si la créature refuse) ; à ton tour, tu modifies son altitude de 6 m au plus. La cible ne se déplace qu’en prenant appui sur des surfaces fixes. À la fin du sort, elle redescend doucement.", "srd"],
  ["warding-bond", "Lien de protection", 2, "Abjuration", "c", "1 action", "Contact", "1 heure", "", "V, S, M (deux anneaux de platine d’au moins 50 po chacun, portés pendant la durée)", "La créature touchée gagne +1 à la CA et aux jets de sauvegarde et la résistance à tous les dégâts ; chaque fois qu’elle subit des dégâts, tu subis les mêmes. Le sort prend fin si tu tombes à 0 PV ou si vous êtes séparés de plus de 18 m.", "srd"],
  ["locate-animals-or-plants", "Localisation d’animaux ou de plantes", 2, "Divination", "bdr", "1 action", "Personnelle", "Instantanée", "R", "V, S, M", "Nomme une espèce de bête ou de plante : tu apprends la direction et la distance du spécimen le plus proche dans un rayon de 7,5 km, s’il y en a un.", "srd"],
  ["locate-object", "Localisation d’objet", 2, "Divination", "bcdprm", "1 action", "Personnelle", "10 minutes", "C", "V, S, M", "Tu sens la direction d’un objet à 300 m ou moins : un objet précis que tu as déjà vu de près, ou l’exemplaire le plus proche d’un type d’objet (bijou, meuble…). Une couche de plomb, même fine, bloque le sort.", "srd"],
  ["animal-messenger", "Messager animal", 2, "Enchantement", "bdr", "1 action", "9 m", "24 heures", "R", "V, S, M", "Une bête de taille TP porte un message de 25 mots au plus vers un lieu que tu as déjà visité, à un destinataire que tu décris. Elle parcourt environ 75 km par 24 heures en volant (37,5 km sinon) et délivre le message de ta voix. Niveaux supérieurs : durée +48 heures par niveau au-delà du 2e.", "srd"],
  ["heat-metal", "Métal brûlant", 2, "Transmutation", "bd", "1 action", "18 m", "1 minute", "C", "V, S, M", "Un objet en métal manufacturé visible rougit : 2d8 feu à qui le touche, de nouveau par une action bonus à chacun de tes tours. La créature brûlée fait une sauvegarde de CON ou lâche l’objet si elle le peut ; si elle le garde, désavantage aux attaques et tests jusqu’à ton prochain tour. Niveaux supérieurs : +1d8 par niveau au-delà du 2e.", "srd"],
  ["alter-self", "Modification d’apparence", 2, "Transmutation", "sm", "1 action", "Personnelle", "1 heure", "C", "V, S", "Choisis une forme, modifiable par une action : adaptation aquatique (branchies, vitesse de nage égale à ta vitesse) ; apparence modifiée (traits, taille, voix, sans changer de catégorie de taille ni de morphologie) ; ou armes naturelles magiques (griffes, crocs…) maîtrisées, à 1d6 dégâts, avec +1 à l’attaque et aux dégâts.", "srd"],
  ["cloud-of-daggers", "Nuée de dagues", 2, "Invocation", "bsom", "1 action", "18 m", "1 minute", "C", "V, S, M", "Des dagues tournoient dans un cube de 1,50 m. Une créature subit 4d4 tranchants quand elle y entre pour la première fois de son tour ou y commence son tour, sans sauvegarde. Niveaux supérieurs : +2d4 par niveau au-delà du 2e.", "phb"],
  ["pass-without-trace", "Passage sans trace", 2, "Abjuration", "dr", "1 action", "Personnelle", "1 heure", "C", "V, S, M", "Toi et chaque créature de ton choix à 9 m de toi gagnez +10 aux tests de DEX (Discrétion), ne laissez aucune trace et ne pouvez être pistés que par magie.", "srd"],
  ["spider-climb", "Pattes d’araignée", 2, "Transmutation", "som", "1 action", "Contact", "1 heure", "C", "V, S, M", "Une créature consentante touchée peut se déplacer sur les murs et au plafond, même tête en bas, en gardant les mains libres. Elle obtient une vitesse d’escalade égale à sa vitesse au sol.", "srd"],
  ["barkskin", "Peau d’écorce", 2, "Transmutation", "dr", "1 action", "Contact", "1 heure", "C", "V, S, M", "La peau d’une créature consentante touchée devient dure comme l’écorce : sa CA ne peut pas être inférieure à 16, quelle que soit son armure.", "srd"],
  ["gentle-repose", "Préservation des morts", 2, "Nécromancie", "cm", "1 action", "Contact", "10 jours", "R", "V, S, M", "Un cadavre touché est protégé de la décomposition et ne peut pas devenir un mort-vivant pendant 10 jours. Ces jours ne comptent pas dans le délai des sorts qui ramènent à la vie, comme rappel à la vie.", "srd"],
  ["prayer-of-healing", "Prière de guérison", 2, "Évocation", "c", "10 minutes", "9 m", "Instantanée", "", "V", "Jusqu’à six créatures visibles à portée récupèrent chacune 2d8 + ton modificateur de caractéristique d’incantation PV. Sans effet sur les morts-vivants et les créatures artificielles. Niveaux supérieurs : +1d8 par niveau au-delà du 2e.", "srd"],
  ["protection-from-poison", "Protection contre le poison", 2, "Abjuration", "cdpr", "1 action", "Contact", "1 heure", "", "V, S", "Neutralise un poison affectant la créature touchée (un seul, tiré au hasard s’il y en a plusieurs). Pendant 1 heure, elle a l’avantage aux sauvegardes contre l’état empoisonné et la résistance aux dégâts de poison.", "srd"],
  ["ray-of-enfeeblement", "Rayon affaiblissant", 2, "Nécromancie", "om", "1 action", "18 m", "1 minute", "C", "V, S", "Attaque de sort à distance. Touchée, la cible n’inflige que la moitié des dégâts avec ses attaques d’arme basées sur la FOR. Elle fait une sauvegarde de CON à la fin de chacun de ses tours ; une réussite met fin au sort.", "srd"],
  ["scorching-ray", "Rayon ardent", 2, "Évocation", "sm", "1 action", "36 m", "Instantanée", "", "V, S", "Trois rayons de feu, chacun avec sa propre attaque de sort à distance : 2d6 feu par rayon qui touche. Ils peuvent viser une ou plusieurs cibles. Niveaux supérieurs : un rayon de plus par niveau au-delà du 2e.", "srd"],
  ["moonbeam", "Rayon de lune", 2, "Évocation", "d", "1 action", "36 m", "1 minute", "C", "V, S, M", "Un cylindre de lumière de 1,50 m de rayon apparaît ; une action le déplace de 18 m. Une créature qui y entre pour la première fois de son tour ou y commence son tour fait une sauvegarde de CON : 2d10 radiants, moitié si réussite (désavantage pour un métamorphe, qui reprend sa forme s’il échoue). Niveaux supérieurs : +1d10 par niveau au-delà du 2e.", "srd"],
  ["lesser-restoration", "Restauration partielle", 2, "Abjuration", "bcdpr", "1 action", "Contact", "Instantanée", "", "V, S", "Met fin à une maladie ou à un état affectant une créature touchée : aveuglé, assourdi, paralysé ou empoisonné.", "srd"],
  ["beast-sense", "Sens animal", 2, "Divination", "dr", "1 action", "Contact", "1 heure", "CR", "S", "Tu touches une bête consentante. Par une action, tu perçois par ses yeux et ses oreilles (et profites de ses sens spéciaux) jusqu’à ce que tu reprennes tes propres sens par une action ; pendant ce temps, tu es aveuglé et assourdi quant à ton propre environnement.", "phb"],
  ["find-traps", "Sens des pièges", 2, "Divination", "cdr", "1 action", "36 m", "Instantanée", "", "V, S", "Tu sens la présence de tout piège à portée et en vue, magique ou non, conçu pour nuire par surprise. Tu apprends la nature générale du danger, mais pas l’emplacement exact du piège.", "srd"],
  ["silence", "Silence", 2, "Illusion", "bcr", "1 action", "36 m", "10 minutes", "CR", "V, S", "Aucun son ne peut naître dans une sphère de 6 m de rayon ni la traverser. Ce qui s’y trouve entièrement est immunisé contre les dégâts de tonnerre ; les créatures y sont assourdies et ne peuvent pas lancer de sort à composante verbale.", "srd"],
  ["flaming-sphere", "Sphère de feu", 2, "Invocation", "dm", "1 action", "18 m", "1 minute", "C", "V, S, M", "Une sphère de feu de 1,50 m de diamètre apparaît et éclaire sur 6 m. Une créature qui finit son tour à 1,50 m d’elle fait une sauvegarde de DEX : 2d6 feu, moitié si réussite. Par une action bonus, tu la déplaces de 9 m ; si elle percute une créature, même sauvegarde, et elle s’arrête. Niveaux supérieurs : +1d6 par niveau au-delà du 2e.", "srd"],
  ["suggestion", "Suggestion", 2, "Enchantement", "bsom", "1 action", "9 m", "8 heures", "C", "V, M", "Tu suggères une conduite d’apparence raisonnable, en une ou deux phrases, à une créature visible qui t’entend et te comprend : sauvegarde de SAG ou elle la suit au mieux pendant la durée. Une demande manifestement nuisible échoue ; les créatures immunisées contre le charme ne sont pas affectées. Le sort cesse si toi ou tes compagnons la blessez.", "srd"],
  ["darkness", "Ténèbres", 2, "Évocation", "som", "1 action", "18 m", "10 minutes", "C", "V, M", "Des ténèbres magiques remplissent une sphère de 4,50 m de rayon, qui contourne les angles : la vision dans le noir ne les perce pas et aucune lumière non magique ne les éclaire. Placées sur un objet, elles le suivent, et le couvrir les bloque. Dissipe toute lumière d’un sort de niveau 2 ou moins qui chevauche la zone.", "srd"],
  ["web", "Toile d’araignée", 2, "Invocation", "sm", "1 action", "18 m", "1 heure", "C", "V, S, M", "Des toiles collantes emplissent un cube de 6 m tendu entre des surfaces : terrain difficile, légèrement obscurci. Une créature qui y commence son tour ou y entre fait une sauvegarde de DEX ou est entravée ; une action et un test de FOR contre ton DD la libèrent. Inflammables : 2d4 feu à qui commence son tour dans les toiles en feu.", "srd"],
  ["arcane-lock", "Verrou magique", 2, "Abjuration", "m", "1 action", "Contact", "Jusqu’à dissipation", "", "V, S, M (poudre d’or d’au moins 25 po, consommée)", "Verrouille magiquement une porte, une fenêtre, un coffre ou un autre accès fermé ; toi et les créatures désignées l’ouvrez normalement, et un mot de passe peut le suspendre 1 minute. Pour les autres, le DD pour le forcer ou le crocheter augmente de 10. Déblocage le suspend 10 minutes.", "srd"],
  ["darkvision", "Vision dans le noir", 2, "Transmutation", "drsm", "1 action", "Contact", "8 heures", "", "V, S, M", "Une créature consentante touchée obtient la vision dans le noir à 18 m pendant 8 heures.", "srd"],
  ["see-invisibility", "Voir l’invisible", 2, "Divination", "bsm", "1 action", "Personnelle", "1 heure", "", "V, S, M", "Pendant 1 heure, tu vois les créatures et objets invisibles comme s’ils étaient visibles, et tu vois dans le plan Éthéré, où créatures et objets paraissent fantomatiques et translucides.", "srd"],
  ["zone-of-truth", "Zone de vérité", 2, "Enchantement", "bcp", "1 action", "18 m", "10 minutes", "", "V, S", "Une sphère de 4,50 m de rayon empêche le mensonge : une créature qui y entre pour la première fois de son tour ou y commence son tour fait une sauvegarde de CHA, sinon elle ne peut pas mentir délibérément tant qu’elle y reste. Tu sais qui a réussi. Elle peut rester évasive ou se taire.", "srd"],

  // Niveau 3 (50)
  ["animate-dead", "Animation des morts", 3, "Nécromancie", "cm", "1 minute", "3 m", "Instantanée", "", "V, S, M", "Un tas d’os ou le cadavre d’un humanoïde de taille M ou P devient un squelette ou un zombie à tes ordres. Par une action bonus, tu commandes tes créatures à 18 m. Le contrôle dure 24 heures ; relancer le sort le renouvelle pour jusqu’à quatre créatures. Niveaux supérieurs : deux morts-vivants de plus (créés ou maintenus) par niveau au-delà du 3e.", "srd"],
  ["nondetection", "Antidétection", 3, "Abjuration", "brm", "1 action", "Contact", "8 heures", "", "V, S, M (poudre de diamant de 25 po, consommée)", "Pendant 8 heures, une créature consentante, un lieu ou un objet de 3 m au plus dans chaque dimension ne peut pas être ciblé par la magie de divination ni perçu par des capteurs de scrutation magiques.", "srd"],
  ["call-lightning", "Appel de la foudre", 3, "Invocation", "d", "1 action", "36 m", "10 minutes", "C", "V, S", "Un nuage d’orage apparaît 30 m au-dessus de toi (le sort échoue s’il n’a pas la place). À l’incantation, puis par une action à chacun de tes tours, un éclair frappe sous le nuage : chaque créature à 1,50 m fait une sauvegarde de DEX, 3d10 foudre, moitié si réussite (+1d10 par temps d’orage). Niveaux supérieurs : +1d10 par niveau au-delà du 3e.", "srd"],
  ["elemental-weapon", "Arme élémentaire", 3, "Transmutation", "p", "1 action", "Contact", "1 heure", "C", "V, S", "Une arme non magique touchée devient magique. Choisis acide, froid, feu, foudre ou tonnerre : elle gagne +1 aux jets d’attaque et inflige 1d4 dégâts de plus de ce type. Niveaux supérieurs : +2 et 2d4 avec un emplacement de niveau 5 ou 6, +3 et 3d4 de niveau 7 ou plus.", "phb"],
  ["aura-of-vitality", "Aura de vitalité", 3, "Évocation", "p", "1 action", "Personnelle (rayon de 9 m)", "1 minute", "C", "V", "Une aura de 9 m de rayon centrée sur toi se déplace avec toi. Jusqu’à la fin du sort, par une action bonus, tu rends 2d6 PV à une créature dans l’aura (toi compris).", "phb"],
  ["crusaders-mantle", "Aura du croisé", 3, "Évocation", "p", "1 action", "Personnelle", "1 minute", "C", "V", "Une aura de 9 m de rayon centrée sur toi se déplace avec toi. Chaque créature non hostile dans l’aura (toi compris) inflige 1d4 radiants de plus quand elle touche avec une attaque d’arme.", "phb"],
  ["fireball", "Boule de feu", 3, "Évocation", "sm", "1 action", "45 m", "Instantanée", "", "V, S, M", "Une explosion de flammes remplit une sphère de 6 m de rayon : chaque créature fait une sauvegarde de DEX, 8d6 feu en cas d’échec, moitié en cas de réussite. Le feu contourne les angles et enflamme les objets inflammables ni portés ni tenus. Niveaux supérieurs : +1d6 par niveau au-delà du 3e.", "srd"],
  ["magic-circle", "Cercle magique", 3, "Abjuration", "cpom", "1 minute", "3 m", "1 heure", "", "V, S, M (eau bénite ou poudre d’argent et de fer d’au moins 100 po, consommées)", "Un cylindre de 3 m de rayon et 6 m de haut entrave les célestes, élémentaires, fées, fiélons ou morts-vivants choisis : entrée impossible (sauvegarde de CHA pour s’y téléporter), désavantage à leurs attaques contre ceux qui sont dedans, ni charme, ni peur, ni possession sur eux. Inversable pour les retenir dedans. Niveaux supérieurs : +1 heure par niveau au-delà du 3e.", "srd"],
  ["blinding-smite", "Châtiment aveuglant", 3, "Évocation", "p", "1 action bonus", "Personnelle", "1 minute", "C", "V", "Ta prochaine attaque d’arme au corps à corps qui touche inflige 3d8 radiants de plus, et la cible fait une sauvegarde de CON ou est aveuglée jusqu’à la fin du sort. Elle refait la sauvegarde à la fin de chacun de ses tours ; une réussite met fin à la cécité.", "phb"],
  ["clairvoyance", "Clairvoyance", 3, "Divination", "bcsm", "10 minutes", "1,5 km", "10 minutes", "C", "V, S, M (focaliseur d’au moins 100 po)", "Un capteur invisible apparaît dans un lieu familier ou évident à portée, même derrière une porte ou un mur. Tu vois ou entends (au choix, modifiable par une action) à travers lui comme si tu y étais. Une créature qui voit l’invisible aperçoit un orbe lumineux de la taille d’un poing.", "srd"],
  ["blink", "Clignotement", 3, "Transmutation", "sm", "1 action", "Personnelle", "1 minute", "", "V, S", "Pendant 1 minute, à la fin de chacun de tes tours, lance 1d20 : sur 11 ou plus, tu passes dans le plan Éthéré jusqu’au début de ton prochain tour, puis reviens dans un espace libre que tu vois à 3 m au plus de ton point de départ. Dans l’Éthéré, seules les créatures de ce plan peuvent t’affecter, et tu ne peux affecter qu’elles.", "srd"],
  ["sending", "Communication à distance", 3, "Évocation", "bcm", "1 action", "Illimitée", "1 round", "", "V, S, M", "Tu envoies un message de 25 mots au plus à une créature que tu connais ; elle l’entend dans sa tête, te reconnaît si elle te connaît et peut répondre aussitôt de la même façon. Toute créature d’INT 1 ou plus en comprend le sens. Aucune limite de distance, mais 5 % de risque d’échec vers un autre plan.", "srd"],
  ["speak-with-dead", "Communication avec les morts", 3, "Nécromancie", "bc", "1 action", "3 m", "10 minutes", "", "V, S, M", "Un cadavre doté d’une bouche répond à jusqu’à cinq questions en 10 minutes, avec ce qu’il savait de son vivant, souvent de façon brève ou énigmatique et sans obligation d’être honnête. Inefficace sur un mort-vivant ou sur un corps déjà visé par ce sort au cours des 10 derniers jours.", "srd"],
  ["speak-with-plants", "Communication avec les plantes", 3, "Transmutation", "bdr", "1 action", "Personnelle (rayon de 9 m)", "10 minutes", "", "V, S", "Les plantes à 9 m de toi s’éveillent : tu peux les interroger sur ce qui s’est passé dans la zone depuis un jour et leur donner des ordres simples. Tu peux aussi rendre normal un terrain difficile dû à la végétation, ou l’inverse, pendant la durée.", "srd"],
  ["counterspell", "Contresort", 3, "Abjuration", "som", "1 réaction, quand tu vois une créature à 18 m ou moins lancer un sort", "18 m", "Instantanée", "", "S", "Tu interromps le sort qu’une créature est en train de lancer. Un sort de niveau 3 ou moins échoue sans effet ; pour un sort de niveau supérieur, fais un test de ta caractéristique d’incantation DD 10 + niveau du sort pour l’annuler. Niveaux supérieurs : annule d’office tout sort de niveau inférieur ou égal à l’emplacement utilisé.", "srd"],
  ["create-food-and-water", "Création de nourriture et d’eau", 3, "Invocation", "cp", "1 action", "9 m", "Instantanée", "", "V, S", "Crée 22,5 kg de nourriture et 120 litres d’eau potable, de quoi sustenter quinze humanoïdes ou cinq montures pendant 24 heures. La nourriture, fade mais nourrissante, se gâte au bout de 24 heures ; l’eau reste saine.", "srd"],
  ["plant-growth", "Croissance végétale", 3, "Transmutation", "bdr", "1 action ou 8 heures", "45 m", "Instantanée", "", "V, S", "En 1 action : la végétation normale dans un rayon de 30 m devient si dense qu’y avancer coûte 4 fois plus de mouvement (tu peux exclure des zones). En 8 heures : les plantes dans un rayon de 750 m sont enrichies pendant un an et donnent deux fois plus de récoltes.", "srd"],
  ["remove-curse", "Délivrance des malédictions", 3, "Abjuration", "cpom", "1 action", "Contact", "Instantanée", "", "V, S", "Toutes les malédictions affectant une créature ou un objet touché prennent fin. Celle d’un objet magique maudit persiste, mais son porteur n’est plus lié à lui et peut s’en débarrasser.", "srd"],
  ["dispel-magic", "Dissipation de la magie", 3, "Abjuration", "bcdpsom", "1 action", "36 m", "Instantanée", "", "V, S", "Vise une créature, un objet ou un effet magique : tout sort de niveau 3 ou moins qui l’affecte prend fin. Pour chaque sort de niveau supérieur, fais un test de ta caractéristique d’incantation DD 10 + niveau du sort pour y mettre fin. Niveaux supérieurs : dissipe d’office les sorts de niveau inférieur ou égal à l’emplacement utilisé.", "srd"],
  ["tongues", "Don des langues", 3, "Divination", "bcsom", "1 action", "Contact", "1 heure", "", "V, M", "Pendant 1 heure, la créature touchée comprend toute langue parlée qu’elle entend, et quiconque connaît au moins une langue et l’entend comprend ce qu’elle dit.", "srd"],
  ["lightning-bolt", "Éclair", 3, "Évocation", "sm", "1 action", "Personnelle (ligne de 30 m)", "Instantanée", "", "V, S, M", "Un éclair jaillit sur une ligne de 30 m de long et 1,50 m de large. Chaque créature dans la ligne fait une sauvegarde de DEX : 8d6 foudre en cas d’échec, moitié en cas de réussite. Enflamme les objets inflammables ni portés ni tenus. Niveaux supérieurs : +1d6 par niveau au-delà du 3e.", "srd"],
  ["spirit-guardians", "Esprits gardiens", 3, "Invocation", "c", "1 action", "Personnelle (rayon de 4,50 m)", "10 minutes", "C", "V, S, M", "Des esprits t’entourent sur 4,50 m ; tu épargnes les créatures de ton choix. Pour les autres, la zone coûte double en mouvement, et y entrer pour la première fois du tour ou y commencer son tour impose une sauvegarde de SAG : 3d8 radiants (nécrotiques si tu es mauvais), moitié si réussite. Niveaux supérieurs : +1d8 par niveau au-delà du 3e.", "srd"],
  ["lightning-arrow", "Flèche de foudre", 3, "Transmutation", "r", "1 action bonus", "Personnelle", "1 minute", "C", "V, S", "Ta prochaine attaque d’arme à distance change la munition (ou l’arme lancée) en éclair : 4d8 foudre si elle touche, moitié si elle rate, au lieu des dégâts normaux. Dans tous les cas, chaque créature à 3 m de la cible fait une sauvegarde de DEX : 2d8 foudre, moitié si réussite. Niveaux supérieurs : +1d8 aux deux effets par niveau au-delà du 3e.", "phb"],
  ["gaseous-form", "Forme gazeuse", 3, "Transmutation", "som", "1 action", "Contact", "1 heure", "C", "V, S, M", "Une créature consentante et son équipement deviennent un nuage brumeux : vol à 3 m en restant en suspension, passage par la moindre fissure, résistance aux dégâts non magiques, avantage aux sauvegardes de FOR, DEX et CON. Elle ne peut ni parler, ni manipuler d’objets, ni attaquer, ni lancer de sorts. Prend fin si elle tombe à 0 PV.", "srd"],
  ["meld-into-stone", "Fusion dans la pierre", 3, "Transmutation", "cd", "1 action", "Contact", "8 heures", "R", "V, S", "Tu te fonds, avec ton équipement, dans un bloc de pierre assez grand pour te contenir : aucune trace, tu ne vois pas dehors et as un désavantage aux tests de SAG (Perception) pour entendre. Tu ressors par où tu es entré. Une altération partielle de la pierre t’expulse avec 6d6 contondants, sa destruction avec 50 contondants.", "srd"],
  ["glyph-of-warding", "Glyphe de protection", 3, "Abjuration", "bcm", "1 heure", "Contact", "Jusqu’à dissipation ou déclenchement", "", "V, S, M (encens et poudre de diamant d’au moins 200 po, consommés)", "Glyphe presque invisible, repérable par un test d’INT (Investigation), tracé sur une surface ou dans un objet refermable, avec un déclencheur ; brisé si déplacé de plus de 3 m. Runes explosives : sphère de 6 m de rayon, sauvegarde de DEX, 5d8 acide, froid, feu, foudre ou tonnerre, moitié si réussite. Glyphe de sort : libère un sort de niveau 3 ou moins stocké à la création. Niveaux supérieurs : runes +1d8 par niveau au-delà du 3e ; sort stocké jusqu’au niveau de l’emplacement.", "srd"],
  ["haste", "Hâte", 3, "Transmutation", "sm", "1 action", "9 m", "1 minute", "C", "V, S, M", "Une créature consentante visible a sa vitesse doublée, +2 à la CA, l’avantage aux sauvegardes de DEX et une action supplémentaire à chacun de ses tours (une seule attaque d’arme, Foncer, Se désengager, Se cacher ou Utiliser un objet). À la fin du sort, elle ne peut ni se déplacer ni agir jusqu’après son prochain tour.", "srd"],
  ["major-image", "Image majeure", 3, "Illusion", "bsom", "1 action", "36 m", "10 minutes", "C", "V, S, M", "Crée l’image d’un objet, d’une créature ou d’un phénomène (cube de 6 m au plus) avec sons, odeurs et température, sans pouvoir blesser ; une action la déplace et l’anime. Un contact la trahit, et un test d’INT (Investigation) contre ton DD (action) la perce. Niveaux supérieurs : au niveau 6 ou plus, dure jusqu’à dissipation, sans concentration.", "srd"],
  ["conjure-animals", "Invocation d’animaux", 3, "Invocation", "dr", "1 action", "18 m", "1 heure", "C", "V, S", "Des esprits féeriques prennent la forme de bêtes : une de FP 2, deux de FP 1, quatre de FP 1/2 ou huit de FP 1/4 au plus. Amicales, elles agissent à leur propre initiative et obéissent à tes ordres verbaux ; chacune disparaît à 0 PV. Niveaux supérieurs : deux fois plus de bêtes au niveau 5, trois fois au niveau 7, quatre fois au niveau 9.", "srd"],
  ["conjure-barrage", "Invocation de projectiles", 3, "Invocation", "r", "1 action", "Personnelle (cône de 18 m)", "Instantanée", "", "V, S, M", "Tu lances une arme non magique ou tires une munition non magique, qui se démultiplie en une volée de projectiles dans un cône de 18 m. Chaque créature dans la zone fait une sauvegarde de DEX : 3d8 dégâts du type de l’arme ou de la munition, moitié si réussite.", "phb"],
  ["slow", "Lenteur", 3, "Transmutation", "sm", "1 action", "36 m", "1 minute", "C", "V, S, M", "Jusqu’à six créatures dans un cube de 12 m font une sauvegarde de SAG. Échec : vitesse réduite de moitié, -2 à la CA et aux sauvegardes de DEX, aucune réaction, une action ou une action bonus par tour, une seule attaque ; un sort d’une action peut être retardé d’un tour (1d20 : 11 ou plus). Nouvelle sauvegarde à la fin de chacun de ses tours.", "srd"],
  ["beacon-of-hope", "Lueur d’espoir", 3, "Abjuration", "c", "1 action", "9 m", "1 minute", "C", "V, S", "Autant de créatures que tu veux à portée ont l’avantage aux sauvegardes de SAG et aux jets de sauvegarde contre la mort, et récupèrent le maximum possible de PV de tout soin reçu pendant la durée.", "srd"],
  ["daylight", "Lumière du jour", 3, "Évocation", "cdprs", "1 action", "18 m", "1 heure", "", "V, S", "Une sphère de 18 m de rayon répand une lumière vive, prolongée par une lumière faible sur 18 m. Placée sur un objet, elle le suit ; le couvrir d’un objet opaque bloque la lumière. Dissipe les ténèbres d’un sort de niveau 3 ou moins qui chevauchent la zone.", "srd"],
  ["bestow-curse", "Malédiction", 3, "Nécromancie", "bcm", "1 action", "Contact", "1 minute", "C", "V, S", "Une créature touchée fait une sauvegarde de SAG ou subit une malédiction au choix : désavantage aux tests et sauvegardes d’une caractéristique ; désavantage aux attaques contre toi ; sauvegarde de SAG à chacun de ses tours sous peine de perdre son action ; ou 1d8 nécrotiques de plus quand tes attaques et sorts la touchent. Niveaux supérieurs : 10 minutes (niv. 4), 8 heures (niv. 5), 24 heures (niv. 7), permanent (niv. 9), sans concentration dès le niveau 5.", "srd"],
  ["water-walk", "Marche sur l’eau", 3, "Transmutation", "cdrs", "1 action", "9 m", "1 heure", "R", "V, S, M", "Jusqu’à dix créatures consentantes visibles peuvent marcher sur tout liquide (eau, acide, boue, neige, sables mouvants, lave) comme sur un sol ferme ; la chaleur de la lave reste dangereuse. Une cible immergée remonte à la surface à 18 m par round.", "srd"],
  ["phantom-steed", "Monture fantôme", 3, "Illusion", "m", "1 minute", "9 m", "1 heure", "R", "V, S", "Une monture quasi réelle de taille G, harnachée, apparaît : profil d’un cheval de selle, mais vitesse de 30 m (15 km par heure), pour toi ou une créature choisie. Elle disparaît si elle subit des dégâts ou si tu la congédies par une action. À la fin du sort, le cavalier a 1 minute pour descendre.", "srd"],
  ["feign-death", "Mort simulée", 3, "Nécromancie", "bcdm", "1 action", "Contact", "1 heure", "R", "V, S, M", "Une créature consentante tombe dans une catalepsie indiscernable de la mort, même par magie : aveuglée, neutralisée, vitesse 0, résistance à tous les dégâts sauf psychiques. Ses maladies et poisons sont suspendus pendant la durée. Tu peux mettre fin au sort en la touchant (action).", "srd"],
  ["mass-healing-word", "Mot de guérison de groupe", 3, "Évocation", "c", "1 action bonus", "18 m", "Instantanée", "", "V", "Jusqu’à six créatures visibles à portée récupèrent chacune 1d4 + ton modificateur de caractéristique d’incantation PV. Sans effet sur les morts-vivants et les créatures artificielles. Niveaux supérieurs : +1d4 par niveau au-delà du 3e.", "srd"],
  ["hypnotic-pattern", "Motif hypnotique", 3, "Illusion", "bsom", "1 action", "36 m", "1 minute", "C", "S, M", "Un motif de couleurs remplit un cube de 9 m. Chaque créature de la zone qui le voit fait une sauvegarde de SAG ou est charmée pendant la durée : neutralisée et vitesse de 0. L’effet cesse pour elle si elle subit des dégâts ou si quelqu’un la secoue par une action.", "srd"],
  ["wind-wall", "Mur de vent", 3, "Évocation", "dr", "1 action", "36 m", "1 minute", "C", "V, S, M", "Un mur de vent de 15 m de long, 4,50 m de haut et 30 cm d’épaisseur, de tracé libre, surgit du sol : chaque créature dans sa zone fait une sauvegarde de FOR, 3d8 contondants, moitié si réussite. Il repousse gaz et brouillards, arrête les volants de taille P ou moins et fait rater les flèches, carreaux et projectiles ordinaires qui le traversent.", "srd"],
  ["stinking-cloud", "Nuage nauséabond", 3, "Invocation", "bsm", "1 action", "27 m", "1 minute", "C", "V, S, M", "Une sphère de gaz jaunâtre de 6 m de rayon contourne les angles et rend la zone fortement obscurcie. Toute créature entièrement dedans au début de son tour fait une sauvegarde de CON contre le poison ; si elle échoue, elle perd son action de ce tour à vomir. Un vent modéré disperse le nuage en 4 rounds, un vent fort en 1 round.", "srd"],
  ["tiny-hut", "Petite hutte de Léomund", 3, "Évocation", "bm", "1 minute", "Personnelle (hémisphère de 3 m de rayon)", "8 heures", "R", "V, S, M", "Un dôme de force immobile de 3 m de rayon t’abrite avec jusqu’à neuf créatures de taille M ou moins ; créatures, objets, sorts et effets extérieurs ne le traversent pas, mais ceux présents à l’incantation entrent et sortent librement. L’intérieur reste sec et tempéré, opaque vu de dehors. Le sort prend fin si tu sors.", "srd"],
  ["fear", "Peur", 3, "Illusion", "bsom", "1 action", "Personnelle (cône de 9 m)", "1 minute", "C", "V, S, M", "Chaque créature dans un cône de 9 m fait une sauvegarde de SAG. Échec : elle lâche ce qu’elle tient et est effrayée ; à chacun de ses tours, elle doit Foncer pour s’éloigner de toi par le chemin le plus sûr. Si elle termine son tour hors de ta vue, elle refait la sauvegarde pour s’en libérer.", "srd"],
  ["protection-from-energy", "Protection contre une énergie", 3, "Abjuration", "cdrsm", "1 action", "Contact", "1 heure", "C", "V, S", "Une créature consentante touchée obtient la résistance à un type de dégâts de ton choix : acide, froid, feu, foudre ou tonnerre, pendant la durée.", "srd"],
  ["water-breathing", "Respiration aquatique", 3, "Transmutation", "drsm", "1 action", "9 m", "24 heures", "R", "V, S, M", "Jusqu’à dix créatures consentantes visibles à portée peuvent respirer sous l’eau pendant 24 heures, tout en gardant leur respiration normale.", "srd"],
  ["revivify", "Retour à la vie", 3, "Nécromancie", "cp", "1 action", "Contact", "Instantanée", "", "V, S, M (diamants d’une valeur de 300 po, consommés)", "Une créature morte depuis une minute au plus revient à la vie avec 1 PV. Inefficace si elle est morte de vieillesse ; ne restaure pas les parties du corps manquantes.", "srd"],
  ["sleet-storm", "Tempête de neige", 3, "Invocation", "dsm", "1 action", "45 m", "1 minute", "C", "V, S, M", "Un cylindre de 12 m de rayon et 6 m de haut est fortement obscurci, éteint les flammes nues et forme un terrain difficile verglacé. Y entrer pour la première fois du tour ou y commencer son tour : sauvegarde de DEX ou chute à terre. Une créature concentrée dans la zone doit réussir une sauvegarde de CON contre ton DD pour rester concentrée.", "srd"],
  ["vampiric-touch", "Toucher du vampire", 3, "Nécromancie", "om", "1 action", "Personnelle", "1 minute", "C", "V, S", "Attaque de sort au corps à corps contre une créature à ta portée : 3d6 nécrotiques, et tu récupères en PV la moitié des dégâts infligés. Tu peux refaire l’attaque par une action à chacun de tes tours jusqu’à la fin du sort. Niveaux supérieurs : +1d6 par niveau au-delà du 3e.", "srd"],
  ["fly", "Vol", 3, "Transmutation", "som", "1 action", "Contact", "10 minutes", "C", "V, S, M", "Une créature consentante touchée obtient une vitesse de vol de 18 m. À la fin du sort, elle tombe si elle est encore en l’air et ne peut pas l’empêcher. Niveaux supérieurs : une cible de plus par niveau au-delà du 3e.", "srd"],
  ["hunger-of-hadar", "Voracité de Hadar", 3, "Invocation", "o", "1 action", "45 m", "1 minute", "C", "V, S, M", "Une sphère de 6 m de rayon de ténèbres glaciales, qu’aucune lumière ne peut éclairer, forme un terrain difficile ; les créatures entièrement dedans sont aveuglées. Une créature qui y commence son tour subit 2d6 froid ; une créature qui y termine son tour fait une sauvegarde de DEX ou subit 2d6 acide.", "phb"],
];


// Module : spells-b
/** Sorts du Manuel des joueurs 2014, niveaux 4 à 9, triés par niveau puis par nom français. Résumés originaux.
 * Colonnes : id | nom | niveau | école | classes | incantation | portée | durée | drapeaux | composantes | résumé | source
 */
const SPELL_ROWS_B = [
  ["phantasmal-killer", "Assassin imaginaire", 4, "Illusion", "m", "1 action", "36 m", "1 minute", "C", "V, S", "Une créature visible fait une sauvegarde de SAG ou est effrayée par l’incarnation de ses pires peurs, visible d’elle seule. À la fin de chacun de ses tours, elle refait la sauvegarde : échec, 4d10 dégâts psychiques ; réussite, le sort prend fin. Niveaux supérieurs : +1d10 par niveau au-delà du 4e.", "srd"],
  ["aura-of-purity", "Aura de pureté", 4, "Abjuration", "p", "1 action", "Personnelle (rayon de 9 m)", "10 minutes", "C", "V", "Aura centrée sur toi. Toi et chaque créature non hostile qui s’y trouve ne pouvez pas contracter de maladie, avez la résistance aux dégâts de poison et l’avantage aux sauvegardes contre les effets qui aveuglent, charment, assourdissent, effraient, paralysent, empoisonnent ou étourdissent.", "phb"],
  ["aura-of-life", "Aura de vie", 4, "Abjuration", "p", "1 action", "Personnelle (rayon de 9 m)", "10 minutes", "C", "V", "Aura centrée sur toi. Toi et chaque créature non hostile qui s’y trouve avez la résistance aux dégâts nécrotiques, et vos PV maximum ne peuvent pas être réduits ; une créature vivante non hostile qui commence son tour dans l’aura à 0 PV récupère 1 PV.", "phb"],
  ["banishment", "Bannissement", 4, "Abjuration", "cpsom", "1 action", "18 m", "1 minute", "C", "V, S, M", "Une créature visible fait une sauvegarde de CHA ou est bannie. Originaire de ton plan, elle est neutralisée dans un demi-plan inoffensif et revient à la fin du sort ; venue d’un autre plan, elle retourne sur son plan natal et n’en revient pas si le sort dure 1 minute complète. Niveaux supérieurs : +1 cible par niveau au-delà du 4e.", "srd"],
  ["fire-shield", "Bouclier de feu", 4, "Évocation", "m", "1 action", "Personnelle", "10 minutes", "", "V, S, M", "Des flammes t’enveloppent (lumière vive sur 3 m, faible sur 3 m de plus). Bouclier chaud : résistance au froid ; bouclier froid : résistance au feu. Toute créature à 1,50 m qui te touche avec une attaque au corps à corps subit 2d8 dégâts de feu (bouclier chaud) ou de froid (bouclier froid). Tu peux y mettre fin par une action.", "srd"],
  ["staggering-smite", "Châtiment débilitant", 4, "Évocation", "p", "1 action bonus", "Personnelle", "1 minute", "C", "V", "Ta prochaine attaque d’arme au corps à corps réussie pendant la durée inflige 4d6 dégâts psychiques supplémentaires. La cible fait une sauvegarde de SAG ; échec : jusqu’à la fin de son prochain tour, elle a le désavantage aux jets d’attaque et aux tests de caractéristique et ne peut pas réagir.", "phb"],
  ["mordenkainens-faithful-hound", "Chien de garde de Mordenkainen", 4, "Invocation", "m", "1 action", "9 m", "8 heures", "", "V, S, M", "Un chien fantôme invisible et invulnérable garde un espace tant que tu restes à 30 m. Il voit l’invisible et le plan Éthéré, ignore les illusions et aboie si une créature de taille P ou plus approche à 9 m sans dire le mot de passe. Au début de chacun de tes tours, il mord une créature hostile à 1,50 m (ton bonus d’attaque de sort) : 4d8 perforants.", "srd"],
  ["leomunds-secret-chest", "Coffre secret de Léomund", 4, "Invocation", "m", "1 action", "Contact", "Instantanée", "", "V, S, M (coffre de 5 000 po et sa réplique miniature de 50 po)", "Cache sur le plan Éthéré un coffre (90 × 60 × 60 cm au plus) et son contenu non vivant ; par une action en touchant la réplique, tu le fais apparaître à 1,50 m de toi ou le renvoies. Après 60 jours, 5 % de risque cumulatif par jour que le sort cesse (il cesse aussi si la réplique est détruite) : le coffre resté sur le plan Éthéré est alors perdu.", "srd"],
  ["compulsion", "Compulsion", 4, "Enchantement", "b", "1 action", "9 m", "1 minute", "C", "V, S", "Les créatures de ton choix à portée qui t’entendent font une sauvegarde de SAG (immunité si elles ne peuvent pas être charmées). Par une action bonus à chacun de tes tours, tu désignes une direction horizontale : chaque cible affectée doit s’y déplacer au maximum à son tour (elle peut agir avant), puis refait la sauvegarde pour se libérer.", "srd"],
  ["confusion", "Confusion", 4, "Enchantement", "bdsm", "1 action", "27 m", "1 minute", "C", "V, S, M", "Sphère de 3 m de rayon : sauvegarde de SAG. Une cible affectée ne peut pas réagir et lance 1d10 au début de chaque tour : 1, déplacement au hasard sans action ; 2 à 6, rien ; 7 ou 8, attaque au corps à corps une créature au hasard à son allonge ; 9 ou 10, agit normalement. Nouvelle sauvegarde à la fin de chacun de ses tours. Niveaux supérieurs : rayon +1,50 m par niveau au-delà du 4e.", "srd"],
  ["control-water", "Contrôle de l’eau", 4, "Transmutation", "cdm", "1 action", "90 m", "10 minutes", "C", "V, S, M", "Contrôle l’eau dans un cube de 30 m d’arête au plus ; par une action, tu répètes ou changes d’effet : crue (niveau +6 m, ou vague qui emporte les embarcations), séparation des eaux en tranchée, courant redirigé, ou tourbillon (sauvegarde de FOR à l’entrée ou en début de tour : 2d8 contondants et piégé, moitié et libre si réussite).", "srd"],
  ["divination", "Divination", 4, "Divination", "c", "1 action", "Personnelle", "Instantanée", "R", "V, S, M (encens et offrande d’au moins 25 po, consommés)", "Tu poses une seule question sur un objectif, un événement ou une activité prévu dans les 7 prochains jours ; le MJ répond honnêtement, par une courte phrase, une rime énigmatique ou un présage. Chaque lancement supplémentaire avant un repos long ajoute 25 % de risque cumulatif d’obtenir une réponse aléatoire.", "srd"],
  ["dominate-beast", "Domination de bête", 4, "Enchantement", "ds", "1 action", "18 m", "1 minute", "C", "V, S", "Une bête visible fait une sauvegarde de SAG (avantage si ton groupe la combat). Échec : charmée, elle suit tes ordres télépathiques, et par une action tu contrôles totalement ses actes et réactions ; nouvelle sauvegarde chaque fois qu’elle subit des dégâts. Niveaux supérieurs : 10 minutes (niv. 5), 1 heure (6), 8 heures (7 ou plus).", "srd"],
  ["fabricate", "Fabrication", 4, "Transmutation", "m", "10 minutes", "36 m", "Instantanée", "", "V, S", "Transforme des matières premières visibles en un objet de même matière : taille G au plus (cube de 3 m), ou M au plus (cube de 1,50 m) pour le métal, la pierre ou un autre minéral. Pas de créature ni d’objet magique ; un objet exigeant un savoir-faire (arme, armure, bijou, verre) demande la maîtrise des outils d’artisan adaptés.", "srd"],
  ["stone-shape", "Façonnage de la pierre", 4, "Transmutation", "cdm", "1 action", "Contact", "Instantanée", "", "V, S, M", "Remodèle à ta guise un objet en pierre de taille M au plus ou une section de pierre de 1,50 m au plus dans chaque dimension : arme, statue, coffre, passage dans un mur de moins de 1,50 m d’épaisseur, porte scellée. L’objet peut avoir jusqu’à deux charnières et un loquet, sans mécanisme plus fin.", "srd"],
  ["blight", "Flétrissement", 4, "Nécromancie", "dsom", "1 action", "9 m", "Instantanée", "", "V, S", "Une créature visible fait une sauvegarde de CON : 8d8 dégâts nécrotiques, moitié si réussite. Sans effet sur les morts-vivants et les artificiels ; une créature végétale a le désavantage et subit le maximum, une plante non magique se flétrit et meurt. Niveaux supérieurs : +1d8 par niveau au-delà du 4e.", "srd"],
  ["guardian-of-faith", "Gardien de la foi", 4, "Invocation", "c", "1 action", "9 m", "8 heures", "", "V", "Un gardien spectral de taille G apparaît dans un espace libre visible et y reste immobile. Toute créature hostile qui arrive pour la première fois du tour à 3 m ou moins de lui fait une sauvegarde de DEX : 20 dégâts radiants, moitié si réussite. Il disparaît après avoir infligé 60 dégâts au total.", "srd"],
  ["giant-insect", "Insecte géant", 4, "Transmutation", "d", "1 action", "9 m", "10 minutes", "C", "V, S", "Transforme jusqu’à dix mille-pattes, trois araignées, cinq guêpes ou un scorpion à portée en versions géantes qui obéissent à tes ordres verbaux et agissent à ton tour en combat. Chacun redevient normal à 0 PV, à la fin du sort ou quand tu y mets fin par une action ; le MJ a leurs statistiques.", "srd"],
  ["greater-invisibility", "Invisibilité supérieure", 4, "Illusion", "bsm", "1 action", "Contact", "1 minute", "C", "V, S", "Toi ou une créature touchée devenez invisible, ainsi que tout ce que la cible porte, pour toute la durée. Contrairement à Invisibilité, attaquer ou lancer un sort ne met pas fin à l’effet.", "srd"],
  ["conjure-minor-elementals", "Invocation d’élémentaires mineurs", 4, "Invocation", "dm", "1 minute", "27 m", "1 heure", "C", "V, S", "Fait apparaître au choix un élémentaire de FP 2 au plus, deux de FP 1, quatre de FP 1/2 ou huit de FP 1/4. Amicaux envers ton groupe, ils agissent à leur propre initiative et obéissent à tes ordres verbaux (sans ordre, ils se défendent) ; le MJ a leurs statistiques. Niveaux supérieurs : nombre doublé au niveau 6, triplé au niveau 8.", "srd"],
  ["conjure-woodland-beings", "Invocation d’êtres sylvestres", 4, "Invocation", "dr", "1 action", "18 m", "1 heure", "C", "V, S, M", "Fait apparaître au choix une fée de FP 2 au plus, deux de FP 1, quatre de FP 1/2 ou huit de FP 1/4. Amicales envers ton groupe, elles agissent à leur propre initiative et obéissent à tes ordres verbaux (sans ordre, elles se défendent) ; le MJ a leurs statistiques. Niveaux supérieurs : nombre doublé au niveau 6, triplé au niveau 8.", "srd"],
  ["grasping-vine", "Liane avide", 4, "Invocation", "dr", "1 action bonus", "9 m", "1 minute", "C", "V, S", "Une liane surgit du sol dans un espace libre visible à portée. À l’incantation, puis par une action bonus à chacun de tes tours, elle fouette une créature visible à 9 m d’elle : sauvegarde de DEX ou la cible est tirée de 6 m en ligne droite vers la liane.", "phb"],
  ["freedom-of-movement", "Liberté de mouvement", 4, "Abjuration", "bcdr", "1 action", "Contact", "1 heure", "", "V, S, M", "La cible ignore le terrain difficile, et aucun sort ni effet magique ne peut réduire sa vitesse, la paralyser ou l’entraver. Elle échappe automatiquement à une entrave non magique (menottes, empoignade) en dépensant 1,50 m de déplacement, et ne subit aucune pénalité de déplacement ni d’attaque sous l’eau.", "srd"],
  ["locate-creature", "Localisation de créature", 4, "Divination", "bcdprm", "1 action", "Personnelle", "1 heure", "C", "V, S, M", "Tu sens la direction d’une créature précise que tu connais, ou de la plus proche d’une espèce que tu as déjà vue de près (9 m), si elle est à 300 m ou moins ; tu sais aussi si elle se déplace. Échoue si la cible a changé de forme ou si une eau courante d’au moins 3 m de large barre le chemin direct.", "srd"],
  ["polymorph", "Métamorphose", 4, "Transmutation", "bdsm", "1 action", "18 m", "1 heure", "C", "V, S, M", "Transforme une créature visible (sauvegarde de SAG si elle refuse ; sans effet sur un métamorphe ou à 0 PV) en bête de FP au plus égal au sien ou à son niveau. Elle prend statistiques et PV de la bête mais garde sa personnalité, sans parler ni lancer de sorts ; à 0 PV, elle retrouve sa forme et ses PV, l’excédent de dégâts étant reporté.", "srd"],
  ["wall-of-fire", "Mur de feu", 4, "Évocation", "dsm", "1 action", "36 m", "1 minute", "C", "V, S, M", "Mur opaque de 18 m de long, 6 m de haut et 30 cm d’épaisseur, ou anneau de 6 m de diamètre. À son apparition, sauvegarde de DEX dans la zone : 5d8 feu, moitié si réussite. Le côté choisi inflige 5d8 feu à qui termine son tour à 3 m de lui ou dans le mur, ou y entre pour la première fois du tour. Niveaux supérieurs : +1d8 par niveau au-delà du 4e.", "srd"],
  ["arcane-eye", "Œil magique", 4, "Divination", "m", "1 action", "9 m", "1 heure", "C", "V, S, M", "Crée un œil invisible et intangible qui flotte à portée et te transmet ce qu’il voit dans toutes les directions (vision normale et dans le noir à 9 m). Par une action, tu le déplaces de 9 m, sans limite de distance mais pas vers un autre plan ; il ne traverse pas les obstacles solides mais passe par une ouverture de 2,5 cm.", "srd"],
  ["stoneskin", "Peau de pierre", 4, "Abjuration", "drsm", "1 action", "Contact", "1 heure", "C", "V, S, M (poussière de diamant de 100 po, consommée)", "La chair d’une créature consentante touchée devient dure comme la pierre : elle obtient la résistance aux dégâts contondants, perforants et tranchants non magiques pour toute la durée.", "srd"],
  ["dimension-door", "Porte dimensionnelle", 4, "Invocation", "bsom", "1 action", "150 m", "Instantanée", "", "V", "Tu te téléportes en un point à portée que tu vois, visualises ou décris (distance et direction), avec ce que tu portes, et peux emmener une créature consentante de ta taille ou plus petite située à 1,50 m de toi. Si la destination est occupée, chaque voyageur subit 4d6 dégâts de force et la téléportation échoue.", "srd"],
  ["death-ward", "Protection contre la mort", 4, "Abjuration", "cp", "1 action", "Contact", "8 heures", "", "V, S", "La première fois que la cible devrait tomber à 0 PV à cause de dégâts, elle tombe à 1 PV à la place. Si elle subit un effet qui la tuerait instantanément sans infliger de dégâts, cet effet est annulé. Dans les deux cas, le sort prend alors fin.", "srd"],
  ["mordenkainens-private-sanctum", "Sanctuaire privé de Mordenkainen", 4, "Abjuration", "m", "10 minutes", "36 m", "24 heures", "", "V, S, M", "Protège un cube de 1,50 m à 30 m d’arête, au choix : sons bloqués, limite opaque (même à la vision dans le noir), divination impossible (capteurs et ciblage), téléportation et voyage planaire bloqués. Lancé chaque jour au même endroit pendant un an, il devient permanent. Niveaux supérieurs : arête +30 m par niveau au-delà du 4e.", "srd"],
  ["otilukes-resilient-sphere", "Sphère résiliente d’Otiluke", 4, "Évocation", "m", "1 action", "9 m", "1 minute", "C", "V, S, M", "Une sphère de force enferme une créature ou un objet de taille G au plus (sauvegarde de DEX si la créature refuse). Rien ne la traverse, dans un sens comme dans l’autre ; elle est immunisée à tous les dégâts et seule une Désintégration la détruit. L’occupant y respire et peut la faire rouler à la moitié de sa vitesse.", "srd"],
  ["ice-storm", "Tempête de grêle", 4, "Évocation", "dsm", "1 action", "90 m", "Instantanée", "", "V, S, M", "Cylindre de 6 m de rayon et 12 m de haut : sauvegarde de DEX, 2d8 dégâts contondants et 4d6 de froid, moitié si réussite. La zone devient un terrain difficile jusqu’à la fin de ton prochain tour. Niveaux supérieurs : +1d8 contondants par niveau au-delà du 4e.", "srd"],
  ["evards-black-tentacles", "Tentacules noirs d’Evard", 4, "Invocation", "m", "1 action", "27 m", "1 minute", "C", "V, S, M", "Un carré de 6 m de côté se couvre de tentacules et devient un terrain difficile. Une créature qui y entre pour la première fois du tour ou y commence son tour fait une sauvegarde de DEX ou subit 3d6 contondants et est entravée ; entravée, elle subit 3d6 à chaque début de tour et peut se libérer par une action (test de FOR ou de DEX contre ton DD).", "srd"],
  ["hallucinatory-terrain", "Terrain hallucinatoire", 4, "Illusion", "bdom", "10 minutes", "90 m", "24 heures", "", "V, S, M", "Dans un cube de 45 m d’arête, un terrain naturel prend l’apparence, les sons et les odeurs d’un autre terrain naturel ; le toucher ne change pas, ni les constructions, l’équipement et les créatures. Une créature qui l’examine de près peut tenter un test d’INT (Investigation) contre ton DD pour percer l’illusion.", "srd"],

  ["animate-objects", "Animation d’objets", 5, "Transmutation", "bsm", "1 action", "36 m", "1 minute", "C", "V, S", "Anime jusqu’à dix objets non magiques non portés (un M compte pour deux, un G pour quatre, un TG pour huit), qui t’obéissent ; par une action bonus, tu donnes un ordre à ceux situés à 150 m. Profils : TP 20 PV, CA 18, +8, 1d4 + 4 ; P 25 PV, CA 16, +6, 1d8 + 2 ; M 40 PV, CA 13, +5, 2d6 + 1 ; G 50 PV, CA 10, +6, 2d10 + 2 ; TG 80 PV, CA 10, +8, 2d12 + 4. Niveaux supérieurs : +2 objets par niveau au-delà du 5e.", "srd"],
  ["seeming", "Apparence trompeuse", 5, "Illusion", "bsm", "1 action", "9 m", "8 heures", "", "V, S", "Donne une apparence illusoire (corps, vêtements, équipement) à autant de créatures visibles à portée que tu veux ; une cible non consentante résiste par une sauvegarde de CHA. Taille modifiable de 30 cm, morphologie générale conservée. L’illusion ne résiste pas au toucher ; un examen (action, test d’INT (Investigation) contre ton DD) la révèle.", "srd"],
  ["cloudkill", "Brume mortelle", 5, "Invocation", "sm", "1 action", "36 m", "10 minutes", "C", "V, S", "Sphère de brouillard toxique de 6 m de rayon, à visibilité nulle. Qui y entre pour la première fois du tour ou y commence son tour fait une sauvegarde de CON (même en apnée) : 5d8 poison, moitié si réussite. Le nuage s’éloigne de toi de 3 m au début de chacun de tes tours. Niveaux supérieurs : +1d8 par niveau au-delà du 5e.", "srd"],
  ["circle-of-power", "Cercle de pouvoir", 5, "Abjuration", "p", "1 action", "Personnelle (rayon de 9 m)", "10 minutes", "C", "V", "Aura centrée sur toi. Toi et les créatures amicales qui s’y trouvent avez l’avantage aux sauvegardes contre les sorts et autres effets magiques ; contre un effet qui inflige la moitié des dégâts en cas de réussite, une sauvegarde réussie n’inflige aucun dégât.", "phb"],
  ["teleportation-circle", "Cercle de téléportation", 5, "Invocation", "bsm", "1 minute", "3 m", "1 round", "", "V, M (craies et encres de 50 po, consommées)", "Tu traces un cercle de 3 m de diamètre relié à un cercle permanent du même plan dont tu connais la séquence ; jusqu’à la fin de ton prochain tour, qui entre dans le portail arrive à 1,50 m du cercle de destination. Tu connais deux séquences au départ (choix du MJ). Lancé au même endroit chaque jour pendant un an, il crée un cercle permanent.", "srd"],
  ["banishing-smite", "Châtiment du ban", 5, "Abjuration", "p", "1 action bonus", "Personnelle", "1 minute", "C", "V", "Ta prochaine attaque d’arme réussie pendant la durée inflige 5d10 dégâts de force supplémentaires. Si la cible tombe alors à 50 PV ou moins, elle est bannie : vers son plan natal si elle vient d’un autre plan, sinon dans un demi-plan inoffensif où elle reste neutralisée jusqu’à la fin du sort.", "phb"],
  ["flame-strike", "Colonne de flamme", 5, "Évocation", "c", "1 action", "18 m", "Instantanée", "", "V, S, M", "Cylindre de 3 m de rayon et 12 m de haut : sauvegarde de DEX, 4d6 dégâts de feu et 4d6 radiants, moitié si réussite. Niveaux supérieurs : +1d6 de feu ou radiant (au choix) par niveau au-delà du 5e.", "srd"],
  ["commune", "Communion", 5, "Divination", "c", "1 minute", "Personnelle", "1 minute", "R", "V, S, M", "Tu poses jusqu’à trois questions fermées à ta divinité ou à un intermédiaire divin et reçois des réponses exactes (« oui », « non », « incertain », ou une courte phrase si un mot induirait en erreur). Chaque lancement supplémentaire avant un repos long ajoute 25 % de risque cumulatif de n’obtenir aucune réponse.", "srd"],
  ["commune-with-nature", "Communion avec la nature", 5, "Divination", "dr", "1 minute", "Personnelle", "Instantanée", "R", "V, S", "Tu apprends jusqu’à trois faits de ton choix sur les environs (4,5 km en extérieur, 90 m dans un souterrain naturel) : relief et cours d’eau ; plantes, minéraux, animaux ou peuples dominants ; célestes, fées, fiélons, élémentaires ou morts-vivants puissants ; influences planaires ; bâtiments. Sans effet dans les lieux construits (villes, donjons).", "srd"],
  ["cone-of-cold", "Cône de froid", 5, "Évocation", "sm", "1 action", "Personnelle (cône de 18 m)", "Instantanée", "", "V, S, M", "Chaque créature dans le cône fait une sauvegarde de CON : 8d8 dégâts de froid, moitié si réussite. Une créature tuée par ce sort devient une statue gelée jusqu’à ce qu’elle dégèle. Niveaux supérieurs : +1d8 par niveau au-delà du 5e.", "srd"],
  ["contact-other-plane", "Contact avec un autre plan", 5, "Divination", "om", "1 minute", "Personnelle", "1 minute", "R", "V", "Tu contactes mentalement une entité d’un autre plan. Sauvegarde d’INT DD 15 : échec, 6d6 dégâts psychiques et folie jusqu’à un repos long (aucune action, ni lecture ni compréhension, propos incohérents ; Restauration supérieure y met fin) ; réussite, jusqu’à cinq questions auxquelles le MJ répond d’un mot (« oui », « non », « peut-être », « jamais », « hors sujet », « incertain »).", "srd"],
  ["contagion", "Contagion", 5, "Nécromancie", "cd", "1 action", "Contact", "7 jours", "", "V, S", "Attaque de sort au corps à corps : la cible contracte la maladie de ton choix, fixée pour 7 jours après trois sauvegardes de CON ratées (une à chaque fin de tour), guérie après trois réussies. Effets : désavantage SAG et aveuglée ; désavantage FOR (tests, sauvegardes, attaques) ; désavantage aux tests de CHA et vulnérabilité à tous les dégâts ; désavantage INT et confusion en combat ; désavantage DEX (tests, sauvegardes, attaques) ; désavantage CON et étourdie un tour à chaque dégât.", "srd"],
  ["antilife-shell", "Coquille antivie", 5, "Abjuration", "d", "1 action", "Personnelle (rayon de 3 m)", "1 heure", "C", "V, S", "Une barrière de 3 m de rayon se déplace avec toi et empêche toute créature autre qu’un mort-vivant ou un artificiel de la franchir ou d’y passer un membre, mais pas de lancer des sorts ou d’attaquer à distance ou avec une arme à allonge au travers. Le sort prend fin si tu te déplaces de façon à forcer une créature à traverser la barrière.", "srd"],
  ["creation", "Création", 5, "Illusion", "sm", "1 minute", "9 m", "Spéciale", "", "V, S, M", "Crée avec de la matière de l’Ombre un objet non vivant de forme et de matière déjà vues, tenant dans un cube de 1,50 m. Durée selon la matière : végétale 1 jour, pierre ou cristal 12 heures, métal précieux 1 heure, gemmes 10 minutes, adamantium ou mithral 1 minute ; il fait échouer tout sort qui l’utilise comme composante. Niveaux supérieurs : arête +1,50 m par niveau au-delà du 5e.", "srd"],
  ["dispel-evil-and-good", "Dissipation du mal et du bien", 5, "Abjuration", "cp", "1 action", "Personnelle", "1 minute", "C", "V, S, M", "Les célestes, élémentaires, fées, fiélons et morts-vivants ont le désavantage pour t’attaquer. Tu peux y mettre fin par une action pour libérer une créature touchée d’un charme, d’une terreur ou d’une possession dus à ces créatures, ou pour renvoyer l’une d’elles sur son plan (attaque de sort au corps à corps, puis sauvegarde de CHA).", "srd"],
  ["dominate-person", "Domination de personne", 5, "Enchantement", "bsm", "1 action", "18 m", "1 minute", "C", "V, S", "Un humanoïde visible fait une sauvegarde de SAG (avantage si ton groupe le combat). Échec : charmé, il suit tes ordres télépathiques, et par une action tu contrôles totalement ses actes et réactions ; nouvelle sauvegarde chaque fois qu’il subit des dégâts. Niveaux supérieurs : 10 minutes (niv. 6), 1 heure (7), 8 heures (8 ou plus).", "srd"],
  ["mislead", "Double illusoire", 5, "Illusion", "bm", "1 action", "Personnelle", "1 heure", "C", "S", "Tu deviens invisible tandis qu’un double illusoire apparaît à ta place ; l’invisibilité cesse si tu attaques ou lances un sort. Par une action, tu déplaces le double (jusqu’à deux fois ta vitesse) et le fais parler ou agir ; par une action bonus, tu passes de tes sens aux siens, et tu es alors aveuglé et assourdi pour ce qui t’entoure.", "srd"],
  ["planar-binding", "Entrave planaire", 5, "Abjuration", "bcdm", "1 heure", "18 m", "24 heures", "", "V, S, M (joyau de 1 000 po, consommé)", "Un céleste, un élémentaire, une fée ou un fiélon resté à portée toute l’incantation (souvent piégé dans un cercle magique) fait une sauvegarde de CHA. Échec : il doit te servir au mieux pendant la durée, et un sort qui l’a convoqué est prolongé d’autant. Niveaux supérieurs : 10 jours (niv. 6), 30 jours (7), 180 jours (8), un an et un jour (9).", "srd"],
  ["awaken", "Éveil", 5, "Transmutation", "bd", "8 heures", "Contact", "Instantanée", "", "V, S, M (agate de 1 000 po, consommée)", "Une bête ou une plante de taille TG au plus, d’INT 3 ou moins, obtient une INT de 10 et parle une langue que tu connais ; une plante peut bouger branches et racines et perçoit comme un humain. Elle est charmée par toi pendant 30 jours ou jusqu’à ce que ton groupe lui nuise, puis choisit de rester amicale ou non selon ton attitude.", "srd"],
  ["insect-plague", "Fléau d’insectes", 5, "Invocation", "cds", "1 action", "90 m", "10 minutes", "C", "V, S, M", "Une nuée de criquets remplit une sphère de 6 m de rayon : visibilité réduite et terrain difficile. Sauvegarde de CON à l’apparition, puis quand une créature y entre pour la première fois du tour ou y termine son tour : 4d10 perforants, moitié si réussite. Niveaux supérieurs : +1d10 par niveau au-delà du 5e.", "srd"],
  ["hold-monster", "Immobilisation de monstre", 5, "Enchantement", "bsom", "1 action", "27 m", "1 minute", "C", "V, S, M", "Une créature visible fait une sauvegarde de SAG ou est paralysée ; elle refait la sauvegarde à la fin de chacun de ses tours pour se libérer. Sans effet sur les morts-vivants. Niveaux supérieurs : +1 cible par niveau au-delà du 5e, les cibles devant être à 9 m ou moins les unes des autres.", "srd"],
  ["conjure-elemental", "Invocation d’élémentaire", 5, "Invocation", "dm", "1 minute", "27 m", "1 heure", "C", "V, S, M", "Un élémentaire de FP 5 au plus surgit d’un cube de 3 m d’air, de terre, de feu ou d’eau à portée ; amical, il agit à sa propre initiative et obéit à tes ordres verbaux. Si ta concentration est rompue, il devient hostile, ne peut plus être renvoyé et disparaît 1 heure après son arrivée. Niveaux supérieurs : FP +1 par niveau au-delà du 5e.", "srd"],
  ["conjure-volley", "Invocation de volée", 5, "Invocation", "r", "1 action", "45 m", "Instantanée", "", "V, S, M", "Tu tires une munition ou lances une arme non magique vers un point à portée : des centaines de copies s’abattent sur un cylindre de 12 m de rayon et 6 m de haut. Chaque créature dans la zone fait une sauvegarde de DEX : 8d8 dégâts du type de l’arme, moitié si réussite.", "phb"],
  ["rarys-telepathic-bond", "Lien télépathique de Rary", 5, "Divination", "m", "1 action", "9 m", "1 heure", "R", "V, S, M", "Relie télépathiquement jusqu’à huit créatures consentantes de ton choix à portée (INT 3 ou plus). Pendant la durée, elles communiquent par la pensée sans langue commune, à n’importe quelle distance sur le même plan.", "srd"],
  ["bigbys-hand", "Main de Bigby", 5, "Évocation", "m", "1 action", "36 m", "1 minute", "C", "V, S, M", "Une main de force de taille G (CA 20, PV égaux à tes PV maximum, FOR 26) apparaît. À l’incantation puis par une action bonus, tu la déplaces de 18 m et choisis : poing (attaque de sort au corps à corps, 4d8 force), poussée (opposition de FOR), étreinte (empoigne une créature TG au plus, puis l’écrase pour 2d6 + ton modificateur par une action bonus) ou interposition (abri partiel). Niveaux supérieurs : +2d8 au poing et +2d6 à l’écrasement par niveau au-delà du 5e.", "srd"],
  ["modify-memory", "Modification de mémoire", 5, "Enchantement", "bm", "1 action", "9 m", "1 minute", "C", "V, S", "Une créature fait une sauvegarde de SAG (avantage si tu la combats) ou est charmée et neutralisée. Tu peux effacer, raviver, modifier ou inventer le souvenir d’un événement de 10 minutes au plus vécu dans les dernières 24 heures, en le décrivant dans une langue qu’elle comprend ; des dégâts ou un autre sort annulent tout. Niveaux supérieurs : souvenir remontant à 7 jours (niv. 6), 30 jours (7), 1 an (8), sans limite (9).", "srd"],
  ["wall-of-force", "Mur de force", 5, "Évocation", "m", "1 action", "36 m", "10 minutes", "C", "V, S, M", "Mur invisible de force : dôme ou sphère de 3 m de rayon au plus, ou surface de dix panneaux contigus de 3 m × 3 m. Rien ne le traverse physiquement, y compris sur le plan Éthéré ; immunisé à tous les dégâts et à Dissipation de la magie, il est détruit par Désintégration. Une créature sur son tracé est repoussée du côté de ton choix.", "srd"],
  ["wall-of-stone", "Mur de pierre", 5, "Évocation", "dsm", "1 action", "36 m", "10 minutes", "C", "V, S, M", "Mur de pierre : dix panneaux contigus de 3 m × 3 m sur 15 cm d’épaisseur (ou 3 m × 6 m sur 7,5 cm), de forme libre s’il s’appuie sur de la pierre (pont, rampe, créneaux). Chaque panneau a CA 15 et 30 PV par 2,5 cm d’épaisseur ; une créature encerclée peut s’échapper (sauvegarde de DEX). Concentration maintenue toute la durée : mur permanent.", "srd"],
  ["legend-lore", "Mythes et légendes", 5, "Divination", "bcm", "10 minutes", "Personnelle", "Instantanée", "", "V, S, M (encens de 250 po, consommé, et 4 lamelles d’ivoire de 50 po)", "Nomme ou décris une personne, un lieu ou un objet : tu reçois un bref résumé des légendes importantes qui s’y rattachent (récits actuels, histoires oubliées, voire savoirs secrets). Rien si le sujet n’a pas d’importance légendaire ; plus tu en sais déjà, plus l’information est précise.", "srd"],
  ["tree-stride", "Passage par les arbres", 5, "Invocation", "dr", "1 action", "Personnelle", "1 minute", "C", "V, S", "Une fois par round, tu peux entrer dans un arbre vivant au moins aussi grand que toi (1,50 m de déplacement) et ressortir à 1,50 m d’un autre arbre de même espèce situé à 150 m ou moins (1,50 m de plus). Tu connais l’emplacement de ces arbres et dois finir chaque tour hors d’un arbre.", "srd"],
  ["passwall", "Passe-muraille", 5, "Transmutation", "m", "1 action", "9 m", "1 heure", "", "V, S, M", "Ouvre un passage dans une surface de bois, de plâtre ou de pierre visible (mur, plafond, sol), jusqu’à 1,50 m de large, 2,40 m de haut et 6 m de profondeur, sans fragiliser la structure. À la fin du sort, ce qui se trouve dans le passage est expulsé sans dommage vers l’espace libre le plus proche de la surface.", "srd"],
  ["geas", "Quête", 5, "Enchantement", "bcdpm", "1 minute", "18 m", "30 jours", "", "V", "Une créature visible qui te comprend fait une sauvegarde de SAG ou est charmée et doit accomplir le service ou respecter l’interdit que tu fixes (pas d’ordre suicidaire) ; chaque fois qu’elle agit directement contre tes instructions, elle subit 5d10 dégâts psychiques, une fois par jour au plus. Délivrance des malédictions, Restauration supérieure ou Souhait y mettent fin. Niveaux supérieurs : 1 an aux niveaux 7 et 8, permanent au niveau 9.", "srd"],
  ["raise-dead", "Rappel à la vie", 5, "Nécromancie", "bcp", "1 heure", "Contact", "Instantanée", "", "V, S, M (diamant de 500 po, consommé)", "Ramène à la vie avec 1 PV une créature morte depuis 10 jours au plus, si son âme est libre et consentante (pas un mort-vivant) ; neutralise poisons et maladies non magiques, ferme les blessures mais ne rend pas les parties manquantes (échec sans organe vital). Malus de −4 aux attaques, sauvegardes et tests, réduit de 1 à chaque repos long.", "srd"],
  ["reincarnate", "Réincarnation", 5, "Transmutation", "d", "1 heure", "Contact", "Instantanée", "", "V, S, M (huiles et onguents rares de 1 000 po, consommés)", "Un humanoïde mort depuis 10 jours au plus (ou un fragment de son corps) reçoit un nouveau corps adulte si son âme est libre et consentante. Le MJ détermine sa nouvelle race (table d100 ou choix) ; la créature garde ses souvenirs et ses capacités, mais remplace ses traits raciaux par ceux de sa nouvelle race.", "srd"],
  ["greater-restoration", "Restauration supérieure", 5, "Abjuration", "bcd", "1 action", "Contact", "Instantanée", "", "V, S, M (poussière de diamant de 100 po, consommée)", "La créature touchée perd un niveau d’épuisement, ou tu mets fin à l’un de ces effets : un charme ou une pétrification, une malédiction (y compris le lien avec un objet maudit), une réduction d’une valeur de caractéristique, ou un effet réduisant ses PV maximum.", "srd"],
  ["hallow", "Sanctification", 5, "Évocation", "c", "24 heures", "Contact", "Jusqu’à dissipation", "", "V, S, M (herbes, huiles et encens de 1 000 po, consommés)", "Consacre une zone de 18 m de rayon au plus : célestes, élémentaires, fées, fiélons et morts-vivants (types exclus au choix) ne peuvent pas y entrer ni y charmer, effrayer ou posséder quiconque. Tu y lies un effet : courage, ténèbres, lumière du jour, protection ou vulnérabilité à une énergie, repos éternel, blocage des voyages extradimensionnels, peur, silence ou langues ; les créatures visées y résistent par une sauvegarde de CHA.", "srd"],
  ["scrying", "Scrutation", 5, "Divination", "bcdom", "10 minutes", "Personnelle", "10 minutes", "C", "V, S, M (focaliseur de 1 000 po)", "Tu vois et entends une créature du même plan. Elle fait une sauvegarde de SAG modifiée par ce que tu sais d’elle (ouï-dire +5, rencontrée +0, bien connue −5) et ton lien (portrait −2, objet ou vêtement −4, fragment du corps −10). Échec : un capteur invisible la suit à 3 m ; réussite : immunisée à ce sort 24 heures. Tu peux aussi viser un lieu déjà vu (capteur fixe).", "srd"],
  ["mass-cure-wounds", "Soins de groupe", 5, "Évocation", "bcd", "1 action", "18 m", "Instantanée", "", "V, S", "Jusqu’à six créatures de ton choix dans une sphère de 9 m de rayon centrée sur un point à portée récupèrent chacune 3d8 + ton modificateur de caractéristique d’incantation PV. Sans effet sur les morts-vivants et les artificiels. Niveaux supérieurs : +1d8 par niveau au-delà du 5e.", "srd"],
  ["dream", "Songe", 5, "Illusion", "bom", "1 minute", "Spéciale", "8 heures", "", "V, S, M", "Toi ou un messager consentant entrez en transe pour visiter les rêves d’une créature connue du même plan (sans effet sur qui ne dort pas) : conversation et décor modelable tant qu’elle dort. Le messager peut aussi paraître monstrueux, délivrer dix mots et imposer une sauvegarde de SAG : échec, cauchemar qui annule le repos et 3d6 psychiques au réveil (désavantage si tu as un fragment de son corps).", "srd"],
  ["telekinesis", "Télékinésie", 5, "Transmutation", "sm", "1 action", "18 m", "10 minutes", "C", "V, S", "À l’incantation puis par une action à chaque tour, tu agis par la pensée sur une créature ou un objet visible. Créature TG au plus : test de ta caractéristique d’incantation contre sa FOR ; si tu gagnes, tu la déplaces de 9 m et elle est entravée jusqu’à la fin de ton prochain tour. Objet de 500 kg au plus : déplacé de 9 m (opposition s’il est tenu) ; manipulations fines possibles.", "srd"],
  ["destructive-wave", "Vague destructrice", 5, "Évocation", "p", "1 action", "Personnelle (rayon de 9 m)", "Instantanée", "", "V", "Chaque créature de ton choix à 9 m de toi fait une sauvegarde de CON. Échec : 5d6 dégâts de tonnerre plus 5d6 radiants ou nécrotiques (au choix) et elle tombe à terre ; réussite : moitié des dégâts et elle reste debout.", "phb"],
  ["swift-quiver", "Carquois magique", 5, "Transmutation", "r", "1 action bonus", "Contact", "1 minute", "C", "V, S, M", "Ton carquois fournit des munitions non magiques à l’infini. À chacun de tes tours, par une action bonus, tu peux faire deux attaques avec une arme qui utilise ces munitions. Les munitions créées disparaissent à la fin du sort, qui cesse si le carquois quitte ta possession.", "phb"],

  ["planar-ally", "Allié planaire", 6, "Invocation", "c", "10 minutes", "18 m", "Instantanée", "", "V, S", "Une entité puissante que tu connais (dieu, primordial, prince démon...) t’envoie un céleste, un élémentaire ou un fiélon qui lui est loyal. Il n’est pas obligé de t’aider : tu négocies un service contre paiement, à titre indicatif 100 po par minute, 1 000 po par heure ou 10 000 po par jour (10 jours au plus), selon la tâche et la créature.", "srd"],
  ["blade-barrier", "Barrière de lames", 6, "Évocation", "c", "1 action", "27 m", "10 minutes", "C", "V, S", "Mur de lames tournoyantes de 30 m de long, 6 m de haut et 1,50 m d’épaisseur au plus, ou anneau de 18 m de diamètre ; il procure un abri aux trois quarts et son espace est un terrain difficile. Une créature qui y entre pour la première fois du tour ou y commence son tour fait une sauvegarde de DEX : 6d10 tranchants, moitié si réussite.", "srd"],
  ["circle-of-death", "Cercle de mort", 6, "Nécromancie", "som", "1 action", "45 m", "Instantanée", "", "V, S, M (poudre de perle noire de 500 po)", "Une sphère d’énergie négative de 18 m de rayon se propage depuis un point à portée : chaque créature dans la zone fait une sauvegarde de CON, 8d6 dégâts nécrotiques, moitié si réussite. Niveaux supérieurs : +2d6 par niveau au-delà du 6e.", "srd"],
  ["chain-lightning", "Chaîne d’éclairs", 6, "Évocation", "sm", "1 action", "45 m", "Instantanée", "", "V, S, M", "Un éclair frappe une cible visible puis rebondit sur jusqu’à trois autres cibles situées à 9 m ou moins de la première (créatures ou objets, une seule fois chacun). Chaque cible fait une sauvegarde de DEX : 10d8 foudre, moitié si réussite. Niveaux supérieurs : +1 cible secondaire par niveau au-delà du 6e.", "srd"],
  ["harm", "Contamination", 6, "Nécromancie", "c", "1 action", "18 m", "Instantanée", "", "V, S", "Une créature visible fait une sauvegarde de CON : 14d6 dégâts nécrotiques, moitié si réussite, sans pouvoir la faire descendre sous 1 PV. En cas d’échec, ses PV maximum sont aussi réduits du montant subi pendant 1 heure (un effet qui guérit les maladies y met fin).", "srd"],
  ["drawmijs-instant-summons", "Convocations instantanées de Drawmij", 6, "Invocation", "m", "1 minute", "Contact", "Jusqu’à dissipation", "R", "V, S, M (saphir de 1 000 po)", "Marque un objet de 5 kg au plus et de 1,80 m de long au plus, dont le nom s’inscrit sur le saphir. Plus tard, par une action, tu prononces ce nom et broies le saphir : l’objet apparaît dans ta main, quelle que soit la distance ou le plan ; si une créature le tient, tu apprends plutôt qui elle est et où elle se trouve approximativement.", "srd"],
  ["create-undead", "Création de mort-vivant", 6, "Nécromancie", "com", "1 minute", "3 m", "Instantanée", "", "V, S, M (onyx noir de 150 po par cadavre)", "Se lance de nuit. Jusqu’à trois cadavres d’humanoïdes P ou M deviennent des goules sous ton contrôle pendant 24 heures (ordres mentaux par action bonus, à 36 m) ; le relancer avant l’échéance prolonge ce contrôle. Niveaux supérieurs : 4 goules (niv. 7) ; 5 goules, ou 2 blêmes ou nécrophages (8) ; 6 goules, 3 blêmes ou nécrophages, ou 2 momies (9).", "srd"],
  ["ottos-irresistible-dance", "Danse irrésistible d’Otto", 6, "Enchantement", "bm", "1 action", "9 m", "1 minute", "C", "V", "Une créature visible (sauf si elle ne peut pas être charmée) se met à danser sur place, sans sauvegarde initiale : elle consacre tout son déplacement à danser, a le désavantage aux jets d’attaque et aux sauvegardes de DEX, et les attaques contre elle ont l’avantage. Par une action, elle peut faire une sauvegarde de SAG pour mettre fin au sort.", "srd"],
  ["disintegrate", "Désintégration", 6, "Transmutation", "sm", "1 action", "18 m", "Instantanée", "", "V, S, M", "Un rayon vise une créature, un objet ou une création de force visible. Une créature fait une sauvegarde de DEX ou subit 10d6 + 40 dégâts de force ; à 0 PV, elle tombe en poussière avec son équipement non magique (seuls Résurrection suprême ou Souhait la ramènent). Un objet non magique de taille G au plus ou une création de force est désintégré (un cube de 3 m s’il est plus grand). Niveaux supérieurs : +3d6 par niveau au-delà du 6e.", "srd"],
  ["heroes-feast", "Festin des héros", 6, "Invocation", "cd", "10 minutes", "9 m", "Instantanée", "", "V, S, M (coupe incrustée de gemmes de 1 000 po, consommée)", "Fait apparaître un festin que jusqu’à douze créatures consomment en 1 heure. Ensuite, pendant 24 heures, chaque convive est guéri des maladies et du poison, immunisé au poison et à l’état effrayé, a l’avantage aux sauvegardes de SAG, et gagne 2d10 PV maximum ainsi qu’autant de PV.", "srd"],
  ["globe-of-invulnerability", "Globe d’invulnérabilité", 6, "Abjuration", "sm", "1 action", "Personnelle (rayon de 3 m)", "1 minute", "C", "V, S, M", "Barrière immobile de 3 m de rayon autour de toi : un sort de niveau 5 ou moins lancé de l’extérieur n’a aucun effet sur ce qui se trouve à l’intérieur, même avec un emplacement supérieur, et la zone est exclue de ses zones d’effet. Niveaux supérieurs : bloque un niveau de sort de plus par niveau au-delà du 6e.", "srd"],
  ["heal", "Guérison", 6, "Évocation", "cd", "1 action", "18 m", "Instantanée", "", "V, S", "Une créature visible récupère 70 PV et guérit de la cécité, de la surdité et de toutes ses maladies. Sans effet sur les morts-vivants et les artificiels. Niveaux supérieurs : +10 PV par niveau au-delà du 6e.", "srd"],
  ["programmed-illusion", "Illusion programmée", 6, "Illusion", "bm", "1 action", "36 m", "Jusqu’à dissipation", "", "V, S, M (laine et poudre de jade de 25 po)", "Crée une illusion visuelle et sonore (cube de 9 m au plus) qui se déclenche à une condition visible ou audible survenant à 9 m de la zone, joue un scénario de 5 minutes au plus, puis reste inactive 10 minutes avant de pouvoir se rejouer. Le contact la trahit ; un examen (action, test d’INT (Investigation) contre ton DD) permet de la percer.", "srd"],
  ["forbiddance", "Interdiction", 6, "Abjuration", "c", "10 minutes", "Contact", "1 jour", "R", "V, S, M (eau bénite, encens rare et poudre de rubis de 1 000 po)", "Protège jusqu’à 3 600 m² de sol, sur 9 m de haut, contre la téléportation, les portails et le voyage planaire. Les types choisis (célestes, élémentaires, fées, fiélons, morts-vivants) subissent 5d10 dégâts radiants ou nécrotiques en y entrant pour la première fois du tour ou en y commençant leur tour, sauf s’ils disent le mot de passe. Lancé 30 jours de suite au même endroit, il dure jusqu’à dissipation.", "srd"],
  ["conjure-fey", "Invocation de fée", 6, "Invocation", "do", "1 minute", "27 m", "1 heure", "C", "V, S", "Convoque une fée, ou un esprit féerique à forme de bête, de FP 6 au plus ; amicale, elle agit à sa propre initiative et obéit à tes ordres verbaux compatibles avec son alignement. Si ta concentration est rompue, elle devient hostile et ne disparaît que 1 heure après son arrivée. Niveaux supérieurs : FP +1 par niveau au-delà du 6e.", "srd"],
  ["wind-walk", "Marche sur le vent", 6, "Transmutation", "d", "1 minute", "9 m", "8 heures", "", "V, S, M", "Toi et jusqu’à dix créatures consentantes visibles prenez une forme nuageuse : vitesse de vol de 90 m, résistance aux armes non magiques, seules actions possibles Foncer ou reprendre forme. Changer de forme prend 1 minute (neutralisé, immobile). Si le sort cesse en vol, la créature descend sans danger de 18 m par round pendant 1 minute.", "srd"],
  ["eyebite", "Mauvais œil", 6, "Nécromancie", "bsom", "1 action", "Personnelle", "1 minute", "C", "V, S", "À l’incantation puis par une action à chacun de tes tours, une créature visible à 18 m fait une sauvegarde de SAG ou subit l’effet de ton choix : endormie (jusqu’à subir des dégâts ou être secouée), paniquée (effrayée, elle doit Foncer pour te fuir jusqu’à être hors de vue à 18 m) ou malade (désavantage aux attaques et aux tests, sauvegarde à chaque fin de tour). Qui a réussi sa sauvegarde ne peut plus être visé.", "srd"],
  ["word-of-recall", "Mot de retour", 6, "Invocation", "c", "1 action", "1,50 m", "Instantanée", "", "V", "Toi et jusqu’à cinq créatures consentantes à 1,50 m de toi êtes téléportés au sanctuaire que tu as désigné au préalable en lançant ce sort dans un lieu (temple...) consacré ou fortement lié à ta divinité. Sans sanctuaire désigné, le sort n’a aucun effet.", "srd"],
  ["wall-of-thorns", "Mur d’épines", 6, "Invocation", "d", "1 action", "36 m", "10 minutes", "C", "V, S, M", "Mur de ronces opaque (18 m de long, 3 m de haut, 1,50 m d’épaisseur, ou cercle de 6 m de diamètre et 6 m de haut) : sauvegarde de DEX dans la zone à son apparition, 7d8 perforants, moitié si réussite. Le traverser coûte 4 fois plus de déplacement ; y entrer pour la première fois du tour ou y finir son tour impose une sauvegarde de DEX : 7d8 tranchants, moitié si réussite. Niveaux supérieurs : +1d8 aux deux par niveau au-delà du 6e.", "srd"],
  ["wall-of-ice", "Mur de glace", 6, "Évocation", "m", "1 action", "36 m", "10 minutes", "C", "V, S, M", "Mur de glace de 30 cm d’épaisseur : dôme ou sphère de 3 m de rayon, ou dix panneaux de 3 m × 3 m. Une créature sur son tracé est repoussée et fait une sauvegarde de DEX : 10d6 froid, moitié si réussite. Chaque section a CA 12, 30 PV et une vulnérabilité au feu ; détruite, elle laisse un air glacial (sauvegarde de CON en le traversant, 5d6 froid, moitié si réussite). Niveaux supérieurs : +2d6 (apparition) et +1d6 (air glacial) par niveau au-delà du 6e.", "srd"],
  ["flesh-to-stone", "Pétrification", 6, "Transmutation", "om", "1 action", "18 m", "1 minute", "C", "V, S, M", "Une créature de chair visible fait une sauvegarde de CON ou est entravée. Elle refait la sauvegarde à la fin de chacun de ses tours : trois réussites mettent fin au sort, trois échecs la pétrifient. Si tu maintiens ta concentration toute la durée, la pétrification dure jusqu’à ce qu’on la lève.", "srd"],
  ["arcane-gate", "Portail magique", 6, "Invocation", "som", "1 action", "150 m", "10 minutes", "C", "V, S", "Ouvre deux portails circulaires reliés de 3 m de diamètre au-dessus de points du sol visibles, l’un à 3 m de toi, l’autre à 150 m au plus (échec si l’un apparaît sur une créature). Ce qui entre par la face active de l’un ressort par l’autre ; leur brume bloque la vue. Par une action bonus, tu peux faire pivoter les anneaux.", "phb"],
  ["contingency", "Prévoyance", 6, "Évocation", "m", "10 minutes", "Personnelle", "10 jours", "", "V, S, M (statuette de toi ornée de gemmes de 1 500 po)", "Tu lances en même temps un sort de niveau 5 au plus (1 action, pouvant te cibler), en dépensant les deux emplacements ; ce sort se déclenche sur toi seul dès que survient la circonstance que tu as décrite, puis Prévoyance prend fin. Une seule Prévoyance active à la fois ; elle cesse si tu n’as plus la statuette sur toi.", "srd"],
  ["guards-and-wards", "Protections et sceaux", 6, "Abjuration", "bm", "10 minutes", "Contact", "24 heures", "", "V, S, M (baguette d’argent de 10 po, entre autres)", "Protège jusqu’à 225 m² de sol sur 6 m de haut, de forme libre, avec exemptions ou mot de passe : couloirs noyés de brouillard où l’on risque (50 %) de partir dans le mauvais sens ; portes verrouillées magiquement, dix pouvant passer pour des murs ; escaliers couverts de toiles ; plus un effet au choix (lumières dansantes, bouche magique, nuage nauséabond, bourrasque ou suggestion). Lancé chaque jour pendant un an, il devient permanent.", "srd"],
  ["sunbeam", "Rayon de soleil", 6, "Évocation", "dsm", "1 action", "Personnelle (ligne de 18 m)", "1 minute", "C", "V, S, M", "Un rayon de 18 m sur 1,50 m : sauvegarde de CON, 6d8 radiants et aveuglement jusqu’à ton prochain tour, moitié sans aveuglement si réussite (désavantage pour les morts-vivants et les vases). Par une action, tu peux créer un nouveau rayon à chaque tour ; ta main émet une lumière du soleil (vive sur 9 m, faible sur 9 m de plus).", "srd"],
  ["find-the-path", "Sens de l’orientation", 6, "Divination", "bcd", "1 minute", "Personnelle", "1 jour", "C", "V, S, M (outils divinatoires de 100 po et objet du lieu recherché)", "Tu connais en permanence la distance et la direction d’un lieu fixe et précis qui t’est familier sur le même plan, et à chaque embranchement tu sais quel chemin est le plus court et le plus direct (pas forcément le plus sûr). Échoue si la destination est sur un autre plan, mobile ou trop vague (« un repaire de dragon »).", "srd"],
  ["otilukes-freezing-sphere", "Sphère glaciale d’Otiluke", 6, "Évocation", "m", "1 action", "90 m", "Instantanée", "", "V, S, M", "Un globe explose en sphère de 18 m de rayon : sauvegarde de CON, 10d6 froid, moitié si réussite. Sur de l’eau, il gèle un carré de 9 m de côté sur 15 cm pendant 1 minute, piégeant les nageurs (test de FOR contre ton DD pour se libérer). Tu peux garder le globe pour le lancer plus tard (12 m, ou à la fronde) ; il explose seul au bout de 1 minute. Niveaux supérieurs : +1d6 par niveau au-delà du 6e.", "srd"],
  ["mass-suggestion", "Suggestion de groupe", 6, "Enchantement", "bsom", "1 action", "18 m", "24 heures", "", "V, M", "Jusqu’à douze créatures visibles qui te comprennent font une sauvegarde de SAG ou suivent une suggestion raisonnable d’une ou deux phrases (pas d’acte manifestement nuisible). Immunité si elles ne peuvent pas être charmées ; fin pour une cible que ton groupe blesse. Niveaux supérieurs : 10 jours (niv. 7), 30 jours (8), un an et un jour (9).", "srd"],
  ["move-earth", "Terraformage", 6, "Transmutation", "dsm", "1 action", "36 m", "2 heures", "C", "V, S, M", "Remodèle la terre, le sable ou l’argile d’une zone de 12 m de côté au plus (élever ou abaisser le sol, creuser ou combler une tranchée, ériger ou araser un mur, former un pilier) sur 6 m au plus. Chaque modification prend 10 minutes, puis tu peux changer de zone. Sans effet sur la pierre ; trop lent pour piéger ou blesser des créatures.", "srd"],
  ["magic-jar", "Urne magique", 6, "Nécromancie", "m", "1 minute", "Personnelle", "Jusqu’à dissipation", "", "V, S, M (réceptacle orné de 500 po)", "Ton âme quitte ton corps, inerte, pour le réceptacle ; de là, tu peux regagner ton corps ou tenter de posséder un humanoïde visible à 30 m : s’il rate une sauvegarde de CHA, son âme passe dans le réceptacle et tu contrôles son corps en gardant INT, SAG, CHA et aptitudes de classe (réussite : immunisé 24 heures). Si l’hôte meurt, sauvegarde de CHA contre ton DD pour regagner le réceptacle, sinon tu meurs ; tu meurs aussi si ton corps est mort ou à plus de 30 m à ton retour.", "srd"],
  ["true-seeing", "Vision suprême", 6, "Divination", "bcsom", "1 action", "Contact", "1 heure", "", "V, S, M (onguent de 25 po, consommé)", "La créature consentante touchée obtient la vision véritable à 36 m : elle voit l’invisible et dans le plan Éthéré, perce les illusions, discerne la forme réelle des métamorphes et repère les portes secrètes dissimulées par magie.", "srd"],
  ["transport-via-plants", "Voie végétale", 6, "Invocation", "d", "1 action", "3 m", "1 round", "", "V, S", "Relie une plante inanimée de taille G ou plus à portée à une autre plante du même plan, à n’importe quelle distance, que tu as déjà vue ou touchée. Jusqu’à la fin du round, toute créature peut entrer dans la première et sortir de la seconde en dépensant 1,50 m de déplacement.", "srd"],

  ["delayed-blast-fireball", "Boule de feu à retardement", 7, "Évocation", "sm", "1 action", "45 m", "1 minute", "C", "V, S, M", "Une perle lumineuse flotte au point choisi ; à la fin du sort (concentration rompue ou volonté), elle explose en sphère de 6 m de rayon : sauvegarde de DEX, 12d6 feu, moitié si réussite, +1d6 par tour fini sans explosion. Qui touche la perle fait une sauvegarde de DEX : échec, elle explose ; réussite, il peut la lancer à 12 m. Niveaux supérieurs : +1d6 de base par niveau au-delà du 7e.", "srd"],
  ["forcecage", "Cage de force", 7, "Évocation", "bom", "1 action", "30 m", "1 heure", "", "V, S, M (poussière de rubis de 1 500 po)", "Prison de force invisible et immobile : cage de 6 m de côté (barreaux espacés de 1,25 cm) ou boîte pleine de 3 m de côté qui bloque toute matière et les sorts lancés au travers. Une créature entièrement dans la zone est piégée, les autres sont repoussées ; en sortir par téléportation ou voyage planaire exige une sauvegarde de CHA. Insensible à Dissipation de la magie ; bloque aussi le plan Éthéré.", "srd"],
  ["plane-shift", "Changement de plan", 7, "Invocation", "cdsom", "1 action", "Contact", "Instantanée", "", "V, S, M (tige fourchue de 250 po, accordée à un plan)", "Toi et jusqu’à huit créatures consentantes vous tenant par la main êtes transportés vers un autre plan, près d’une destination décrite à grands traits ou sur un cercle de téléportation connu. Contre une créature non consentante : attaque de sort au corps à corps puis sauvegarde de CHA, sinon elle est expédiée en un lieu aléatoire du plan choisi.", "srd"],
  ["sequester", "Dissimulation suprême", 7, "Transmutation", "m", "1 action", "Contact", "Jusqu’à dissipation", "", "V, S, M (poussière de diamant, d’émeraude, de rubis et de saphir de 5 000 po, consommée)", "Une créature consentante ou un objet touché devient invisible et indétectable par la divination et les capteurs de scrutation ; une créature entre en animation suspendue et ne vieillit plus. Le sort cesse si la cible subit des dégâts ou quand se réalise la condition que tu as fixée, perceptible à 1,5 km ou moins de la cible.", "srd"],
  ["finger-of-death", "Doigt de mort", 7, "Nécromancie", "som", "1 action", "18 m", "Instantanée", "", "V, S", "Une créature visible fait une sauvegarde de CON : 7d8 + 30 dégâts nécrotiques, moitié si réussite. Un humanoïde tué par ce sort se relève au début de ton tour suivant en zombi qui obéit en permanence à tes ordres verbaux.", "srd"],
  ["mordenkainens-sword", "Épée de Mordenkainen", 7, "Évocation", "bm", "1 action", "18 m", "1 minute", "C", "V, S, M (épée miniature en platine de 250 po)", "Une épée de force flotte à portée. À son apparition, tu fais une attaque de sort au corps à corps contre une cible à 1,50 m d’elle : 3d10 dégâts de force. Par une action bonus à chacun de tes tours, tu la déplaces de 6 m vers un point visible et répètes l’attaque contre la même cible ou une autre.", "srd"],
  ["etherealness", "Forme éthérée", 7, "Transmutation", "bcsom", "1 action", "Personnelle", "8 heures", "", "V, S", "Tu passes dans la Frontière éthérée (fin possible par une action) : tu traverses les objets, vois ton plan d’origine en gris jusqu’à 18 m et n’interagis qu’avec le plan Éthéré ; monter ou descendre coûte double. À ton retour dans un espace occupé, tu es déplacé et subis 2 dégâts de force par tranche de 30 cm. Niveaux supérieurs : jusqu’à trois créatures consentantes (toi compris) à 3 m de toi par niveau au-delà du 7e.", "srd"],
  ["reverse-gravity", "Inversion de la gravité", 7, "Transmutation", "dsm", "1 action", "30 m", "1 minute", "C", "V, S, M", "Inverse la gravité dans un cylindre de 15 m de rayon et 30 m de haut. Créatures et objets non ancrés tombent vers le haut (sauvegarde de DEX pour s’agripper à un point fixe à portée de main) et subissent les dégâts de chute s’ils heurtent un plafond, sinon flottent au sommet ; à la fin du sort, tout retombe.", "srd"],
  ["conjure-celestial", "Invocation de céleste", 7, "Invocation", "c", "1 minute", "27 m", "1 heure", "C", "V, S", "Convoque un céleste de FP 4 au plus, amical envers ton groupe : il agit à sa propre initiative, obéit à tes ordres verbaux compatibles avec son alignement et se contente de se défendre sans ordre. Il disparaît à 0 PV ou à la fin du sort. Niveaux supérieurs : FP 5 au plus avec un emplacement de niveau 9.", "srd"],
  ["mordenkainens-magnificent-mansion", "Manoir somptueux de Mordenkainen", 7, "Invocation", "bm", "1 minute", "90 m", "24 heures", "", "V, S, M (portail en ivoire, marbre poli et cuillère d’argent, de 5 po chacun)", "Crée une demeure extradimensionnelle (50 cubes de 3 m d’arête au plus, plan et décor au choix) dont l’entrée n’admet que les créatures désignées ; tu l’ouvres ou la fermes à 9 m. On y trouve un banquet pour 100 personnes et 100 serviteurs obéissants incapables de nuire. Rien n’en sort ; à la fin, les occupants sont expulsés près de l’entrée.", "srd"],
  ["mirage-arcane", "Mirage", 7, "Illusion", "bdm", "10 minutes", "Vue", "10 jours", "", "V, S", "Une zone d’au plus 1,5 km de côté prend l’apparence, les sons, les odeurs et même la consistance d’un autre terrain (forme générale conservée) ; tu peux modifier ou ajouter des constructions, pas des créatures, et rendre le terrain difficile ou praticable. La vision véritable révèle le vrai terrain, mais l’illusion reste tangible.", "srd"],
  ["divine-word", "Parole divine", 7, "Évocation", "c", "1 action bonus", "9 m", "Instantanée", "", "V", "Les créatures de ton choix visibles qui t’entendent font une sauvegarde de CHA. Échec, selon leurs PV actuels : 50 ou moins, assourdies 1 minute ; 40 ou moins, aussi aveuglées, 10 minutes ; 30 ou moins, aussi étourdies, 1 heure ; 20 ou moins, tuées. Un céleste, élémentaire, fée ou fiélon qui échoue est renvoyé sur son plan et ne peut revenir avant 24 heures (sauf par Souhait).", "srd"],
  ["project-image", "Projection d’image", 7, "Illusion", "bm", "1 action", "750 km", "1 jour", "C", "V, S, M (réplique de toi de 5 po)", "Crée une copie illusoire et intangible de toi en un lieu déjà vu à portée, malgré les obstacles. Par une action, tu la déplaces (jusqu’à deux fois ta vitesse) et la fais parler ou agir ; par une action bonus, tu utilises ses sens au lieu des tiens (tu es alors aveuglé et assourdi pour ce qui t’entoure). Elle disparaît si elle subit des dégâts ; le contact ou un examen réussi (INT (Investigation) contre ton DD) la trahit.", "srd"],
  ["prismatic-spray", "Rayons prismatiques", 7, "Évocation", "sm", "1 action", "Personnelle (cône de 18 m)", "Instantanée", "", "V, S", "Chaque créature dans le cône fait une sauvegarde de DEX et lance 1d8 pour la couleur qui la frappe : 1 à 5, 10d6 dégâts (feu, acide, foudre, poison ou froid), moitié si réussite ; en cas d’échec, 6 entrave puis impose des sauvegardes de CON (trois échecs : pétrification définitive) et 7 aveugle puis impose une sauvegarde de SAG (échec : exil sur un autre plan) ; 8, deux rayons (relancer deux fois, en relançant les 8).", "srd"],
  ["regenerate", "Régénération", 7, "Transmutation", "bcd", "1 minute", "Contact", "1 heure", "", "V, S, M", "La créature touchée récupère 4d8 + 15 PV, puis 1 PV au début de chacun de ses tours pendant la durée. Ses membres tranchés repoussent en 2 minutes, ou se ressoudent aussitôt si tu tiens la partie coupée contre le moignon.", "srd"],
  ["resurrection", "Résurrection", 7, "Nécromancie", "bc", "1 heure", "Contact", "Instantanée", "", "V, S, M (diamant de 1 000 po, consommé)", "Ramène à la vie avec tous ses PV une créature morte depuis un siècle au plus, ni de vieillesse ni morte-vivante, si son âme est libre et consentante ; neutralise poisons et maladies normales, ferme les blessures et restaure les parties manquantes. Malus de −4 aux attaques, sauvegardes et tests, réduit de 1 par repos long. Mort d’un an ou plus : jusqu’à ton repos long, tu ne peux plus lancer de sorts et as le désavantage aux attaques, tests et sauvegardes.", "srd"],
  ["simulacrum", "Simulacre", 7, "Illusion", "m", "12 heures", "Contact", "Jusqu’à dissipation", "", "V, S, M (neige ou glace, fragment de la créature et poudre de rubis de 1 500 po, consommée)", "Façonne dans la neige ou la glace le double d’une bête ou d’un humanoïde présent pendant toute l’incantation : mêmes statistiques, mais moitié des PV maximum et aucun équipement ; il t’obéit et agit à ton tour. Il ne progresse pas et ne récupère pas ses emplacements de sorts ; réparation en laboratoire à 100 po par PV. Il fond à 0 PV ; relancer le sort détruit le précédent.", "srd"],
  ["symbol", "Symbole", 7, "Abjuration", "bcm", "1 minute", "Contact", "Jusqu’à dissipation ou déclenchement", "", "V, S, M (mercure, phosphore et poudres de diamant et d’opale de 1 000 po, consommés)", "Inscrit un glyphe presque invisible (INT (Investigation) contre ton DD pour le repérer) sur une surface de 3 m de diamètre au plus ou dans un objet refermable, avec le déclencheur de ton choix. Activé, il affecte pendant 10 minutes les créatures dans une sphère de 18 m de rayon : mort (CON, 10d10 nécrotiques, moitié si réussite), discorde (CON), peur (SAG), désespoir (CHA), folie (INT), douleur (CON), sommeil (SAG) ou étourdissement (SAG).", "srd"],
  ["teleport", "Téléportation", 7, "Invocation", "bsm", "1 action", "3 m", "Instantanée", "", "V", "Transporte instantanément toi et jusqu’à huit créatures consentantes visibles à portée, ou un objet tenant dans un cube de 3 m, vers une destination connue du même plan. Selon ta familiarité avec le lieu (table d100 du MJ), tu arrives à destination, à côté, dans un lieu similaire, ou subis un incident (3d10 dégâts de force par voyageur, puis nouveau jet) ; arrivée garantie vers un cercle permanent ou avec un objet lié au lieu.", "srd"],
  ["fire-storm", "Tempête de feu", 7, "Évocation", "cds", "1 action", "45 m", "Instantanée", "", "V, S", "Jusqu’à dix cubes de 3 m d’arête disposés à ta guise, chacun accolé à un autre par une face : chaque créature dans la zone fait une sauvegarde de DEX, 7d10 feu, moitié si réussite. Les objets inflammables non portés s’embrasent ; tu peux épargner la végétation.", "srd"],

  ["holy-aura", "Aura sacrée", 8, "Abjuration", "c", "1 action", "Personnelle", "1 minute", "C", "V, S, M (reliquaire de 1 000 po)", "Les créatures de ton choix à 9 m de toi à l’incantation émettent une faible lumière, ont l’avantage à toutes leurs sauvegardes et imposent le désavantage aux attaques contre elles. Un fiélon ou un mort-vivant qui touche l’une d’elles au corps à corps fait une sauvegarde de CON ou est aveuglé jusqu’à la fin du sort.", "srd"],
  ["antipathy-sympathy", "Aversion/Attirance", 8, "Enchantement", "dm", "1 heure", "18 m", "10 jours", "", "V, S, M", "Une cible (objet ou créature TG au plus, ou zone cubique de 60 m d’arête au plus) repousse ou attire un type de créatures intelligentes que tu nommes. Une telle créature qui la voit ou s’en approche à 18 m fait une sauvegarde de SAG ; aversion : effrayée, elle s’éloigne hors de vue ; attirance : elle doit s’approcher et ne peut pas s’éloigner volontairement. Nouvelles sauvegardes hors de portée et toutes les 24 heures.", "srd"],
  ["glibness", "Bagou", 8, "Transmutation", "bo", "1 action", "Personnelle", "1 heure", "", "V", "Pendant la durée, tu peux remplacer le résultat du dé de tes tests de CHA par 15. De plus, quoi que tu dises, la magie qui détecte le mensonge indique que tu dis la vérité.", "srd"],
  ["antimagic-field", "Champ antimagie", 8, "Abjuration", "cm", "1 action", "Personnelle (rayon de 3 m)", "1 heure", "C", "V, S, M", "Sphère invisible de 3 m de rayon centrée sur toi où l’on ne peut pas lancer de sorts : sorts, effets magiques et propriétés des objets magiques y sont suspendus (leur durée s’écoule), les créatures convoquées ou créées par magie disparaissent temporairement, téléportation et voyage planaire échouent. Seuls les artefacts et les divinités y échappent ; Dissipation de la magie est sans effet sur le champ.", "srd"],
  ["clone", "Clone", 8, "Nécromancie", "m", "1 heure", "Contact", "Instantanée", "", "V, S, M (diamant de 1 000 po et chair de la créature, consommés ; réceptacle de 2 000 po)", "Fait croître dans un réceptacle scellé un double inerte d’une créature vivante, adulte en 120 jours (ou plus jeune si tu le souhaites). Si l’original meurt ensuite, son âme libre et consentante passe dans le clone, identique en personnalité, souvenirs et capacités mais sans équipement ; l’ancien corps ne peut plus être ramené à la vie.", "srd"],
  ["control-weather", "Contrôle du climat", 8, "Transmutation", "cdm", "10 minutes", "Personnelle (rayon de 7,5 km)", "8 heures", "C", "V, S, M", "En extérieur, tu modifies la météo à 7,5 km autour de toi : précipitations, température et vent (direction comprise), d’un cran à la fois sur chaque échelle. Chaque changement met 1d4 × 10 minutes à se produire. Le sort cesse si tu n’as plus le ciel au-dessus de toi ; ensuite, le temps redevient normal progressivement.", "srd"],
  ["maze", "Dédale", 8, "Invocation", "m", "1 action", "18 m", "10 minutes", "C", "V, S", "Bannit une créature visible, sans sauvegarde, dans un demi-plan labyrinthique. Par une action, elle peut tenter d’en sortir par un test d’INT DD 20 (réussite automatique pour un minotaure ou un goristro). À la fin du sort, elle réapparaît à l’endroit qu’elle a quitté ou à l’espace libre le plus proche.", "srd"],
  ["demiplane", "Demi-plan", 8, "Invocation", "om", "1 action", "18 m", "1 heure", "", "S", "Crée sur une surface plane une porte d’ombre menant à un demi-plan : une pièce vide de 9 m de côté, en bois ou en pierre. À la fin du sort, la porte disparaît et ce qui reste à l’intérieur y est piégé. Tu peux relier la porte à un demi-plan créé lors d’un lancement précédent, ou à celui d’un autre lanceur si tu en connais la nature et le contenu.", "srd"],
  ["dominate-monster", "Domination de monstre", 8, "Enchantement", "bsom", "1 action", "18 m", "1 heure", "C", "V, S", "Une créature visible fait une sauvegarde de SAG (avantage si ton groupe la combat). Échec : charmée, elle suit tes ordres télépathiques, et par une action tu contrôles totalement ses actes et réactions ; nouvelle sauvegarde chaque fois qu’elle subit des dégâts. Niveaux supérieurs : 8 heures avec un emplacement de niveau 9.", "srd"],
  ["sunburst", "Éclat du soleil", 8, "Évocation", "dsm", "1 action", "45 m", "Instantanée", "", "V, S, M", "Lumière solaire dans un rayon de 18 m : sauvegarde de CON, 12d6 radiants et aveuglement 1 minute, moitié sans aveuglement si réussite (désavantage pour les morts-vivants et les vases). Un aveuglé refait la sauvegarde à la fin de chacun de ses tours. Dissipe les ténèbres magiques de la zone.", "srd"],
  ["feeblemind", "Esprit faible", 8, "Enchantement", "bdom", "1 action", "45 m", "Instantanée", "", "V, S, M", "Une créature visible subit 4d6 dégâts psychiques et fait une sauvegarde d’INT. Échec : son INT et son CHA tombent à 1 ; elle ne peut plus lancer de sorts, activer d’objet magique, comprendre ni communiquer, mais reconnaît, suit et protège ses amis. Nouvelle sauvegarde tous les 30 jours ; Restauration supérieure, Guérison ou Souhait y mettent fin.", "srd"],
  ["mind-blank", "Esprit impénétrable", 8, "Abjuration", "bm", "1 action", "Contact", "24 heures", "", "V, S", "Pendant la durée, une créature consentante touchée est immunisée aux dégâts psychiques, aux effets qui perçoivent ses émotions ou lisent ses pensées, aux sorts de divination et à l’état charmé. Même un Souhait ne peut affecter son esprit ou obtenir des informations sur elle.", "srd"],
  ["animal-shapes", "Formes animales", 8, "Transmutation", "d", "1 action", "9 m", "24 heures", "C", "V, S", "Transforme autant de créatures consentantes visibles que tu veux en bêtes de taille G au plus et de FP 4 au plus (forme différente possible pour chacune) ; par une action, tu peux leur donner de nouvelles formes. Elles prennent statistiques et PV de la bête mais gardent INT, SAG, CHA et alignement, sans parler ni lancer de sorts ; à 0 PV, elles reprennent leur forme et l’excédent de dégâts est reporté.", "srd"],
  ["power-word-stun", "Mot de pouvoir étourdissant", 8, "Enchantement", "bsom", "1 action", "18 m", "Instantanée", "", "V", "Une créature visible ayant 150 PV ou moins est étourdie, sans sauvegarde initiale ; au-delà, le sort n’a aucun effet. Elle fait une sauvegarde de CON à la fin de chacun de ses tours pour mettre fin à l’étourdissement.", "srd"],
  ["incendiary-cloud", "Nuage incendiaire", 8, "Invocation", "sm", "1 action", "45 m", "1 minute", "C", "V, S", "Sphère de fumée et de braises de 6 m de rayon, à visibilité nulle (un vent modéré la disperse). Sauvegarde de DEX à son apparition, puis quand une créature y entre pour la première fois du tour ou y termine son tour : 10d8 feu, moitié si réussite. Au début de chacun de tes tours, le nuage s’éloigne de toi de 3 m dans la direction de ton choix.", "srd"],
  ["telepathy", "Télépathie", 8, "Évocation", "m", "1 action", "Illimitée", "24 heures", "", "V, S, M", "Crée un lien télépathique entre toi et une créature consentante que tu connais bien, n’importe où sur le même plan : vous échangez instantanément mots, images, sons et autres sensations, et elle te reconnaît et comprend tes messages même sans langue commune (INT 1 suffit). Le sort cesse si l’un de vous change de plan.", "phb"],
  ["earthquake", "Tremblement de terre", 8, "Évocation", "cds", "1 action", "150 m", "1 minute", "C", "V, S, M", "Séisme dans un cercle de 30 m de rayon : terrain difficile, sauvegarde de CON pour garder sa concentration, et sauvegarde de DEX à l’incantation puis à la fin de chacun de tes tours pour ne pas tomber à terre. 1d6 fissures de 1d10 × 3 m de profondeur s’ouvrent au tour suivant (DEX pour ne pas y tomber). Les structures subissent 50 contondants par tour ; un effondrement inflige 5d6 contondants et ensevelit (DEX, moitié si réussite ; FOR (Athlétisme) DD 20 pour sortir).", "srd"],
  ["tsunami", "Tsunami", 8, "Invocation", "d", "1 minute", "Vue", "6 rounds", "C", "V, S", "Un mur d’eau de 90 m de long, 90 m de haut et 15 m d’épaisseur au plus apparaît : sauvegarde de FOR, 6d10 contondants, moitié si réussite. Au début de chacun de tes tours, il avance de 15 m en emportant les créatures (sauvegarde de FOR ou 5d10 contondants, une fois par round), puis sa hauteur baisse de 15 m et les dégâts de 1d10. Se déplacer dedans exige un test de FOR (Athlétisme) contre ton DD.", "phb"],

  ["time-stop", "Arrêt du temps", 9, "Transmutation", "sm", "1 action", "Personnelle", "Instantanée", "", "V", "Le temps s’arrête pour tous sauf toi : tu joues 1d4 + 1 tours d’affilée en agissant et en te déplaçant normalement. Le sort prend fin si une de tes actions ou un effet que tu crées affecte une autre créature ou un objet porté par autrui, ou si tu t’éloignes à plus de 300 m du point d’incantation.", "srd"],
  ["shapechange", "Changement de forme", 9, "Transmutation", "dm", "1 action", "Personnelle", "1 heure", "C", "V, S, M (diadème de jade de 1 500 po)", "Tu prends la forme d’une créature déjà vue de FP inférieur ou égal à ton niveau (ni artificiel ni mort-vivant), sans niveaux de classe ni trait Incantation : ses statistiques, PV et DV, en gardant alignement, INT, SAG, CHA, maîtrises et aptitudes utilisables, sans actions légendaires ni actions de repaire. À 0 PV, tu reprends ta forme, l’excédent étant reporté. Par une action, tu peux changer de forme (sans regagner de PV).", "srd"],
  ["imprisonment", "Emprisonnement", 9, "Abjuration", "om", "1 minute", "9 m", "Jusqu’à dissipation", "", "V, S, M (effigie de la cible et composante spéciale de 500 po par DV)", "Une créature visible fait une sauvegarde de SAG ou est emprisonnée (réussite : immunisée à ce sort) ; elle n’a plus besoin de respirer ni de manger, ne vieillit pas et échappe à la divination. Formes : enfouissement dans une sphère de force, chaînes, demi-plan clos, réduction à 2,5 cm dans une gemme ou sommeil sans fin. Tu fixes une condition de libération raisonnable ; seule une Dissipation de la magie de niveau 9 y met fin.", "srd"],
  ["weird", "Ennemi subconscient", 9, "Illusion", "m", "1 action", "36 m", "1 minute", "C", "V, S", "Chaque créature dans une sphère de 9 m de rayon fait une sauvegarde de SAG ou est effrayée par l’incarnation de ses pires cauchemars, visible d’elle seule. À la fin de chacun de ses tours, elle refait la sauvegarde : échec, 4d10 dégâts psychiques ; réussite, le sort prend fin pour elle.", "srd"],
  ["mass-heal", "Guérison de groupe", 9, "Évocation", "c", "1 action", "18 m", "Instantanée", "", "V, S", "Répartis jusqu’à 700 PV comme tu le souhaites entre autant de créatures visibles à portée que tu veux. Elles guérissent aussi de toutes leurs maladies et des effets qui les aveuglent ou les assourdissent. Sans effet sur les morts-vivants et les artificiels.", "srd"],
  ["true-polymorph", "Métamorphose suprême", 9, "Transmutation", "bom", "1 action", "9 m", "1 heure", "C", "V, S, M", "Transforme une créature ou un objet non magique visible (sauvegarde de SAG si la créature refuse) : créature en autre créature de FP inférieur ou égal (statistiques remplacées, personnalité conservée), objet en créature de FP 9 au plus et pas plus grande que lui (amicale, tu la diriges), ou créature en objet. Sans effet sur un métamorphe ou une créature à 0 PV. Concentration maintenue 1 heure : l’effet devient permanent jusqu’à dissipation.", "srd"],
  ["power-word-heal", "Mot de pouvoir guérisseur", 9, "Évocation", "b", "1 action", "Contact", "Instantanée", "", "V, S", "La créature touchée récupère tous ses PV, et les états charmé, effrayé, paralysé et étourdi prennent fin. Si elle est à terre, elle peut se relever par sa réaction. Sans effet sur les morts-vivants et les artificiels.", "phb"],
  ["power-word-kill", "Mot de pouvoir mortel", 9, "Enchantement", "bsom", "1 action", "18 m", "Instantanée", "", "V", "Une créature visible ayant 100 PV ou moins meurt instantanément, sans sauvegarde. Si elle a plus de 100 PV, le sort n’a aucun effet.", "srd"],
  ["prismatic-wall", "Mur prismatique", 9, "Abjuration", "m", "1 action", "18 m", "10 minutes", "", "V, S", "Mur opaque de 27 m de long, 9 m de haut et 2,5 cm d’épaisseur, ou sphère de 9 m de diamètre, à sept couches ; une créature non désignée qui approche à 6 m fait une sauvegarde de CON ou est aveuglée 1 minute. Traverser impose une sauvegarde de DEX par couche : rouge, orange, jaune, verte, bleue, 10d6 (feu, acide, foudre, poison, froid ; moitié si réussite) ; indigo, pétrification progressive ; violette, exil sur un autre plan. Chaque couche se détruit par un moyen précis, dans l’ordre.", "srd"],
  ["meteor-swarm", "Nuée de météores", 9, "Évocation", "sm", "1 action", "1,5 km", "Instantanée", "", "V, S", "Quatre météores s’abattent sur des points visibles à portée, chacun sur une sphère de 12 m de rayon qui contourne les angles. Sauvegarde de DEX : 20d6 feu et 20d6 contondants, moitié si réussite ; une créature prise dans plusieurs sphères n’est affectée qu’une fois. Les objets inflammables non portés s’embrasent.", "srd"],
  ["gate", "Portail", 9, "Invocation", "csm", "1 action", "18 m", "1 minute", "C", "V, S, M (diamant de 5 000 po)", "Ouvre un portail circulaire de 1,50 m à 6 m de diamètre vers un lieu précis d’un autre plan ; on ne le franchit que par sa face avant, et divinités et maîtres planaires peuvent l’empêcher de s’ouvrir chez eux. Si tu prononces le nom d’une créature d’un autre plan, le portail s’ouvre près d’elle et l’attire jusqu’à toi, sans t’en donner le contrôle.", "srd"],
  ["foresight", "Prémonition", 9, "Divination", "bdom", "1 minute", "Contact", "8 heures", "", "V, S, M", "La créature consentante touchée ne peut pas être surprise, a l’avantage à ses jets d’attaque, tests de caractéristique et sauvegardes, et les autres créatures ont le désavantage pour l’attaquer. Le sort prend fin si tu le relances avant son terme.", "srd"],
  ["astral-projection", "Projection astrale", 9, "Nécromancie", "com", "1 heure", "3 m", "Spéciale", "", "V, S, M (par cible : hyacinthe de 1 000 po et barre d’argent de 100 po, consommées)", "Toi et jusqu’à huit créatures consentantes projetez vos corps astraux dans le plan Astral ; vos corps restent inconscients, en animation suspendue. La forme astrale reprend tes statistiques et possessions, reliée au corps par une corde d’argent (tranchée, elle te tue) ; entrer dans un autre plan y transporte ton corps, et les dégâts subis en forme astrale ne l’affectent pas. Le sort cesse sur ordre (action), à 0 PV ou par dissipation.", "srd"],
  ["true-resurrection", "Résurrection suprême", 9, "Nécromancie", "cd", "1 heure", "Contact", "Instantanée", "", "V, S, M (eau bénite et diamants de 25 000 po, consommés)", "Ramène à la vie avec tous ses PV une créature morte depuis 200 ans au plus, sauf de vieillesse, si son âme est libre et consentante ; referme les blessures, neutralise poisons, maladies et malédictions, remplace organes et membres. Si le corps n’existe plus, tu prononces son nom et elle apparaît dans un nouveau corps à 3 m de toi.", "srd"],
  ["wish", "Souhait", 9, "Invocation", "sm", "1 action", "Personnelle", "Instantanée", "", "V", "Reproduit un sort de niveau 8 ou moins sans ses conditions ni composantes coûteuses. Sinon : objet non magique de 25 000 po au plus, soins complets et Restauration supérieure pour vingt créatures, résistance à un type de dégâts ou immunité à un sort (8 heures) pour dix créatures, relance d’un jet du dernier round, ou vœu libre arbitré par le MJ. Ces usages coûtent 1d10 nécrotiques par niveau de sort lancé avant un repos long, FOR à 3 pendant 2d4 jours, 33 % de risque de perdre Souhait.", "srd"],
  ["storm-of-vengeance", "Tempête vengeresse", 9, "Invocation", "d", "1 action", "Vue", "1 minute", "C", "V, S", "Un nuage d’orage de 108 m de rayon se forme : sauvegarde de CON pour les créatures dessous (échec : 2d6 tonnerre et assourdies 5 minutes). Tours suivants : pluie acide (1d6 acide), six éclairs sur des cibles choisies (sauvegarde de DEX, 10d6 foudre, moitié si réussite), grêle (2d6 contondants), puis jusqu’au 10e round vent glacial et pluie (terrain difficile, visibilité nulle, 1d6 froid par round, attaques à distance impossibles).", "srd"],
];


// Module : spells
/** Catalogue des sorts du Manuel des joueurs 2014 : résumés originaux, non les textes intégraux.
 * Identifiants stables, indépendants de la traduction. Aucune requête réseau.
 */
const _spellClassNames = { b: "bard", c: "cleric", d: "druid", p: "paladin", r: "ranger", s: "sorcerer", o: "warlock", m: "wizard" };
const SPELLS = [...SPELL_ROWS_A, ...SPELL_ROWS_B].map(
  ([id, name, level, school, classes, casting, range, duration, flags, components, description, source]) => ({
    id,
    name,
    level,
    school,
    classes: [...classes].map((k) => _spellClassNames[k]).filter(Boolean),
    casting,
    range,
    duration,
    concentration: flags.includes("C"),
    ritual: flags.includes("R"),
    components,
    description,
    source: source || "srd",
    custom: false,
  }),
);
const SPELL_SCHOOLS = ["Abjuration", "Divination", "Enchantement", "Évocation", "Illusion", "Invocation", "Nécromancie", "Transmutation"];


// Module : engine
/** Moteur de règles D&D 5e (2014) : calculs purs, sans accès au DOM ni au stockage.
 * Modèle de personnage version 2 : multiclassage, sous-races, sous-classes, dons, choix génériques (picks).
 */

/* ------------------------------------------------------------------ outils */
const clone = (value) => JSON.parse(JSON.stringify(value));
const clamp = (n, min, max) => Math.max(min, Math.min(max, Number(n) || 0));
const mod = (score) => Math.floor((Number(score) - 10) / 2);
const signed = (n) => (n >= 0 ? `+${n}` : String(n).replace("-", "−"));
const uid = () =>
  globalThis.crypto?.randomUUID?.() || `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
const formatMeters = (m) => `${String(Math.round(m * 100) / 100).replace(".", ",")} m`;
const _uniq = (list) => [...new Set(list)];
const _asArray = (v) => (v == null ? [] : Array.isArray(v) ? v : [v]);

const DEFAULT_SUBCLASS = {
  barbarian: "berserker",
  bard: "lore",
  cleric: "life",
  druid: "land",
  fighter: "champion",
  monk: "openHand",
  paladin: "devotion",
  ranger: "hunter",
  rogue: "thief",
  sorcerer: "draconic",
  warlock: "fiend",
  wizard: "evocation",
};
const _CASTER_CLASSES = ["bard", "cleric", "druid", "sorcerer", "warlock", "wizard"];
const MULTICLASS_SPELL_CLASSES = _CASTER_CLASSES;

/* ------------------------------------------------------------- structure */
const levelOf = (c) => c.levels.length;
const primaryClassId = (c) => c.levels[0]?.classId || c.classId;
function classLevels(c, upTo = 20) {
  const out = [];
  for (const l of c.levels) {
    if (l.level > upTo) break;
    const entry = out.find((x) => x.classId === l.classId);
    if (entry) entry.level++;
    else out.push({ classId: l.classId, level: 1 });
  }
  return out;
}
const classLevel = (c, classId, upTo = 20) =>
  c.levels.filter((l) => l.level <= upTo && l.classId === classId).length;
/** Niveau de classe atteint au niveau de personnage donné, pour la classe prise à ce niveau. */
const classLevelAt = (c, charLevel) => classLevel(c, c.levels[charLevel - 1]?.classId, charLevel);
const raceOf = (c) => (c.raceId === "custom" ? _customRace(c) : RACES[c.raceId] || RACES.human);
function _customRace(c) {
  const r = c.customRace || {};
  return {
    name: r.name || "Origine maison",
    group: "Maison",
    source: "homebrew",
    subtitle: r.subtitle || "Création de la table",
    desc: r.description || "",
    size: r.size || "M",
    speed: Number(r.speed) || 9,
    traits: (r.traits || []).filter((t) => Array.isArray(t)),
    grants: { abilities: r.bonuses || {}, languages: ["common"], languageChoice: { count: Number(r.languageCount) || 1 } },
  };
}
function backgroundOf(c) {
  const b = c.background || {};
  if (b.id && b.id !== "custom" && BACKGROUNDS[b.id]) return { id: b.id, ...BACKGROUNDS[b.id] };
  return {
    id: "custom",
    name: b.name || "Historique personnalisé",
    source: "homebrew",
    desc: "Historique conçu avec le MJ : deux compétences, deux langues ou outils au total, une aptitude.",
    skills: _asArray(b.skills),
    grants: { toolOrLanguageChoice: { count: 2 } },
    feature: [b.featureName || "Aptitude d’historique", b.feature || "À définir avec le MJ."],
    equipment: b.equipment || "",
    gold: 0,
  };
}
const backgroundSkills = (c) => _asArray(backgroundOf(c).skills);
const isASI = (classId, classLvl) =>
  [4, 8, 12, 16, 19, ...(classId === "fighter" ? [6, 14] : []), ...(classId === "rogue" ? [10] : [])].includes(classLvl);
function defaultLevel(classId, charLevel, classLvl = charLevel) {
  return {
    level: charLevel,
    classId,
    hpDie: charLevel === 1 ? CLASSES[classId].die : CLASSES[classId].die / 2 + 1,
    choices: {},
    asi: isASI(classId, classLvl)
      ? { mode: "ability", a: CLASSES[classId].primary[0], b: CLASSES[classId].primary[0], featId: "", featName: "", featDescription: "" }
      : null,
  };
}
function subclassOf(c, classId, upTo = 20) {
  const lvl = classLevel(c, classId, upTo),
    id = c.subclasses?.[classId];
  if (!id || !lvl || lvl < CLASSES[classId].subLevel) return null;
  if (id === "custom")
    return {
      id,
      custom: true,
      name: c.customSubclasses?.[classId]?.name || "Sous-classe maison",
      description: c.customSubclasses?.[classId]?.description || "",
      data: null,
    };
  const data = SUBCLASSES[classId]?.[id];
  return data ? { id, data, name: data.name } : null;
}
const hasSubclass = (c, classId, subId) => subclassOf(c, classId)?.id === subId;

/* --------------------------------------------------------- personnages */
function recommendedAbilities(classId) {
  const priorities = [
    ...CLASSES[classId].primary,
    ...Object.keys(ABILITIES).filter((a) => !CLASSES[classId].primary.includes(a)),
  ];
  return Object.fromEntries(priorities.map((a, i) => [a, [15, 14, 13, 12, 10, 8][i]]));
}
function defaultEquipment(classId) {
  const defaults = {
    barbarian: ["none", ["greataxe", "handaxe"], false],
    bard: ["leather", ["rapier", "dagger"], false],
    cleric: ["scale", ["mace", "light-crossbow"], true],
    druid: ["leather", ["scimitar"], true],
    fighter: ["chain", ["longsword", "light-crossbow"], true],
    monk: ["none", ["unarmed", "shortsword"], false],
    paladin: ["chain", ["longsword", "javelin"], true],
    ranger: ["scale", ["longbow", "shortsword"], false],
    rogue: ["leather", ["rapier", "shortbow"], false],
    sorcerer: ["none", ["dagger", "light-crossbow"], false],
    warlock: ["leather", ["dagger", "light-crossbow"], false],
    wizard: ["none", ["quarterstaff", "dagger"], false],
  };
  const [armor, weapons, shield] = defaults[classId] || defaults.fighter;
  return {
    armor,
    shield,
    weapons: weapons.filter((id) => WEAPONS[id] || id === "unarmed").map((id) => ({ id, magic: 0, twoHands: false })),
    armorBonus: 0,
    mageArmor: false,
  };
}
function createCharacter(classId = "fighter") {
  const now = new Date().toISOString();
  const bgSkills = _asArray(BACKGROUNDS.acolyte?.skills);
  return {
    id: uid(),
    schemaVersion: SCHEMA_VERSION,
    name: "",
    raceId: "human",
    classId,
    abilityMethod: "standard",
    abilities: recommendedAbilities(classId),
    picks: {},
    raceFeat: null,
    customRace: { name: "Origine maison", subtitle: "Création de la table", bonuses: {}, speed: 9, size: "M", languageCount: 1, traits: [], description: "" },
    background: { id: "acolyte", name: "", skills: [], featureName: "", feature: "", equipment: "", description: "", tools: "", languages: "" },
    skills: CLASSES[classId].skills.filter((s) => !bgSkills.includes(s)).slice(0, CLASSES[classId].pick),
    subclasses: CLASSES[classId].subLevel === 1 ? { [classId]: DEFAULT_SUBCLASS[classId] } : {},
    customSubclasses: {},
    alignment: "",
    languages: "",
    biography: "",
    notes: "",
    details: { age: "", height: "", weight: "", eyes: "", skin: "", hair: "", traits: "", ideals: "", bonds: "", flaws: "" },
    xp: 0,
    levels: [defaultLevel(classId, 1)],
    spells: { known: [], prepared: [], sources: {}, arcana: {}, allowExceptions: false },
    equipment: defaultEquipment(classId),
    startKit: { mode: "kit", choices: {}, picks: {} },
    beasts: { seen: [], unseen: [] },
    inventory: [],
    gold: 0,
    custom: { traits: [], spells: [] },
    adjustments: { hp: 0, ac: 0, speed: 0, initiative: 0, attack: 0, damage: 0, abilities: { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 } },
    state: {
      hp: 1,
      tempHp: 0,
      hitDiceSpent: {},
      slotsUsed: {},
      pactUsed: 0,
      resourcesUsed: {},
      conditions: [],
      exhaustion: 0,
      concentration: null,
      deathSuccess: 0,
      deathFailure: 0,
    },
    createdAt: now,
    updatedAt: now,
  };
}

/* -------------------------------------------------------------- migration */
/** Convertit une fiche version 1 (mono-classe) en version 2. Ne modifie pas l’objet reçu. */
function migrateCharacter(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return raw;
  if (raw.schemaVersion === SCHEMA_VERSION) return raw;
  if (raw.schemaVersion !== 1) return raw;
  const c = clone(raw),
    classId = c.classId in CLASSES ? c.classId : "fighter";
  c.levels = (c.levels || []).map((l, i) => ({ ...l, level: i + 1, classId }));
  if (c.levels[0]) c.levels[0].hpDie = CLASSES[classId].die;
  for (const l of c.levels) if (l.asi && l.asi.mode === "feat") l.asi.featId = l.asi.featName === "Lutteur" ? "grappler" : "custom";
  c.subclasses = {};
  c.customSubclasses = {};
  if (c.subclassMode === "custom") {
    c.subclasses[classId] = "custom";
    c.customSubclasses[classId] = { name: c.customSubclass?.name || "", description: c.customSubclass?.description || "" };
  } else if (c.levels.length >= CLASSES[classId].subLevel) c.subclasses[classId] = DEFAULT_SUBCLASS[classId];
  delete c.subclassMode;
  delete c.customSubclass;
  const rc = c.raceChoices || {};
  c.picks = {};
  if (c.raceId === "halfElf") {
    c.picks["race|abilityChoice"] = _uniq(_asArray(rc.abilities).filter((a) => a !== "cha")).slice(0, 2);
    c.picks["race|skillChoice"] = _uniq(_asArray(rc.skills)).slice(0, 2);
  }
  if (c.raceId === "highElf" && rc.cantripId) c.picks["race|cantripChoice"] = [rc.cantripId];
  if (c.raceId === "dragonborn") c.picks["race|dragon"] = [rc.dragon || "red"];
  delete c.raceChoices;
  c.raceFeat = null;
  const b = c.background || {};
  c.background =
    b.type === "custom"
      ? {
          id: "custom",
          name: b.name || "Historique personnalisé",
          skills: _asArray(b.skills),
          featureName: "",
          feature: b.description || "",
          equipment: "",
          description: "",
          tools: b.tools || "",
          languages: b.languages || "",
        }
      : { id: "acolyte", name: "", skills: [], featureName: "", feature: "", equipment: "", description: b.description || "", tools: b.tools || "", languages: b.languages || "" };
  const e = c.equipment || {};
  c.equipment = {
    armor: e.armor in ARMORS ? e.armor : "none",
    shield: !!e.shield,
    weapons: [{ id: e.weapon || "unarmed", magic: Number(e.magicWeapon) || 0, twoHands: !!e.twoHands }],
    armorBonus: Number(e.armorBonus) || 0,
    mageArmor: !!e.mageArmor,
  };
  c.details = { age: "", height: "", weight: "", eyes: "", skin: "", hair: "", traits: "", ideals: "", bonds: "", flaws: "" };
  c.startKit = { mode: "done", choices: {}, picks: {} };
  c.beasts = { seen: [], unseen: [] };
  c.spells = { known: [], prepared: [], arcana: {}, allowExceptions: false, ...(c.spells || {}), sources: {} };
  const s = c.state || {};
  const spent = Number(s.hitDiceSpent) || 0;
  s.hitDiceSpent = spent ? { [CLASSES[classId].die]: spent } : {};
  s.pactUsed = 0;
  if (classId === "warlock") {
    const slotLevel = Math.min(5, Math.ceil(c.levels.length / 2));
    s.pactUsed = Number(s.slotsUsed?.[slotLevel]) || 0;
    s.slotsUsed = {};
  }
  c.state = s;
  c.schemaVersion = SCHEMA_VERSION;
  return c;
}

/* ------------------------------------------------- sources et choix (picks) */
const pickPath = (sourceKey, field) => `${sourceKey}|${field}`;
const picksOf = (c, sourceKey, field) => _asArray(c.picks?.[pickPath(sourceKey, field)]);
function _featSource(c, featId, key, label, charLevel) {
  const feat = FEATS[featId];
  if (!feat) return null;
  return { key, label: `Don : ${feat.name}`, grants: feat.grants || {}, level: charLevel, charLevel, kind: "feat", featId };
}
/** Liste ordonnée des sources qui accordent des effets, jusqu’au niveau de personnage donné. */
function grantSources(c, upTo = levelOf(c)) {
  const charLevel = Math.min(upTo, levelOf(c)),
    out = [];
  const race = raceOf(c);
  out.push({ key: "race", label: race.name, grants: race.grants || {}, level: charLevel, charLevel, kind: "race" });
  if (race.grants?.feat && c.raceFeat) {
    const src = _featSource(c, c.raceFeat, "feat|race", race.name, charLevel);
    if (src) out.push(src);
  }
  const bg = backgroundOf(c);
  out.push({ key: "bg", label: bg.name, grants: bg.grants || {}, level: charLevel, charLevel, kind: "background" });
  classLevels(c, charLevel).forEach(({ classId, level }, index) => {
    const cls = CLASSES[classId],
      extra = CLASS_EXTRAS?.[classId] || {};
    const grants =
      index === 0
        ? {
            armor: cls.armors,
            weapons: cls.weapons,
            saves: cls.saves,
            tools: extra.tools || [],
            toolChoice: extra.toolChoice || undefined,
            languages: extra.languages || [],
          }
        : { ...(extra.multiclass?.grants || {}), languages: extra.languages || [] };
    out.push({ key: `class|${classId}`, label: cls.name, grants, level, charLevel, classId, kind: index === 0 ? "class" : "multiclass" });
    const sub = subclassOf(c, classId, charLevel);
    if (sub?.data?.grants)
      for (const [lvl, g] of Object.entries(sub.data.grants))
        if (Number(lvl) <= level)
          out.push({ key: `sub|${classId}|${lvl}`, label: sub.name, grants: g, level, charLevel, classId, kind: "subclass" });
  });
  for (const l of c.levels) {
    if (l.level > charLevel) break;
    if (l.asi?.mode === "feat" && l.asi.featId && l.asi.featId !== "custom") {
      const src = _featSource(c, l.asi.featId, `feat|L${l.level}`, "", charLevel);
      if (src) out.push(src);
    }
  }
  for (const l of c.levels)
    if (l.level <= charLevel && l.classId === "ranger" && [1, 6, 14].includes(classLevelAt(c, l.level)))
      out.push({
        key: `ranger|enemy|L${l.level}`,
        label: "Ennemi juré",
        grants: { languageChoice: { count: 1, optional: true } },
        level: classLevel(c, "ranger", charLevel),
        charLevel,
        classId: "ranger",
        kind: "class",
      });
  if (allChoices(c, "pact", charLevel)[0] === "tome")
    out.push({
      key: "pact|tome",
      label: "Pacte du grimoire",
      grants: { cantripChoice: { count: 3, list: "*", ability: "cha" } },
      level: classLevel(c, "warlock", charLevel),
      charLevel,
      classId: "warlock",
      kind: "pact",
    });
  for (const id of allChoices(c, "invocations", charLevel)) {
    const inv = INVOCATIONS?.[id];
    if (inv?.grants && Object.keys(inv.grants).length)
      out.push({ key: `inv|${id}`, label: `Manifestation : ${inv.name}`, grants: inv.grants, level: classLevel(c, "warlock", charLevel), charLevel, classId: "warlock", kind: "invocation" });
  }
  return out;
}
function allChoices(c, key, upTo = 20) {
  return c.levels
    .filter((l) => l.level <= upTo)
    .flatMap((l) => _asArray(l.choices?.[key]));
}
function _emptyAcc() {
  return {
    abilities: { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 },
    skills: new Set(),
    expertise: new Set(),
    tools: new Set(),
    languages: new Set(),
    armor: new Set(),
    weapons: new Set(),
    saves: new Set(),
    hpFlat: 0,
    speed: 0,
    initiative: 0,
    darkvision: 0,
    passive: { perception: 0, investigation: 0 },
    resistances: new Set(),
    immunities: new Set(),
    cantrips: [],
    innate: [],
    rituals: [],
    resources: [],
    extraAttack: 1,
    unarmored: [],
    heavyArmorNoSpeedPenalty: false,
    featSlots: 0,
    extraCantrips: {},
    spellsKnownBonus: {},
    options: {},
    feats: [],
  };
}
function _resolveToolOptions(from) {
  const all = Object.keys(TOOLS || {});
  if (Array.isArray(from)) return from.filter((t) => TOOLS[t]);
  if (from === "artisan" || from === "music" || from === "gaming") return all.filter((t) => TOOLS[t].kind === from);
  return all;
}
/** Un choix dont la liste d’options ne dépasse pas le nombre à choisir s’applique tout seul. */
const _forcedFrom = (cfg) => (cfg && Array.isArray(cfg.from) && cfg.from.length && cfg.from.length <= cfg.count ? cfg.from : null);
function _applyGrants(acc, c, src) {
  const g = src.grants || {},
    pick = (field, count) => _forcedFrom(g[field]) || picksOf(c, src.key, field).slice(0, count ?? 99);
  for (const [a, n] of Object.entries(g.abilities || {})) if (a in acc.abilities) acc.abilities[a] += Number(n) || 0;
  if (g.abilityChoice)
    for (const a of pick("abilityChoice", g.abilityChoice.count))
      if (a in acc.abilities) {
        acc.abilities[a] += g.abilityChoice.amount ?? 1;
        if (g.saveFromAbilityChoice) acc.saves.add(a);
      }
  for (const s of g.skills || []) acc.skills.add(s);
  if (g.skillChoice)
    for (const s of pick("skillChoice", g.skillChoice.count))
      if (s in SKILLS) {
        acc.skills.add(s);
        if (g.skillChoice.expertise) acc.expertise.add(s);
      }
  if (g.skillOrToolChoice)
    for (const x of pick("skillOrToolChoice", g.skillOrToolChoice.count)) (x in SKILLS ? acc.skills : acc.tools).add(x);
  for (const s of g.expertise || []) acc.expertise.add(s);
  if (g.expertiseChoice) for (const s of pick("expertiseChoice", g.expertiseChoice.count)) acc.expertise.add(s);
  for (const t of g.tools || []) acc.tools.add(t);
  if (g.toolChoice) for (const t of pick("toolChoice", g.toolChoice.count)) acc.tools.add(t);
  for (const l of g.languages || []) acc.languages.add(l);
  if (g.languageChoice) for (const l of pick("languageChoice", g.languageChoice.count)) acc.languages.add(l);
  if (g.toolOrLanguageChoice)
    for (const x of pick("toolOrLanguageChoice", g.toolOrLanguageChoice.count)) (LANGUAGES?.[x] ? acc.languages : acc.tools).add(x);
  for (const a of g.armor || []) acc.armor.add(a);
  for (const w of g.weapons || []) acc.weapons.add(w);
  if (g.weaponChoice) for (const w of pick("weaponChoice", g.weaponChoice.count)) acc.weapons.add(w);
  for (const s of g.saves || []) acc.saves.add(s);
  acc.hpFlat += (Number(g.hpPerLevel) || 0) * src.charLevel + (Number(g.hpPerClassLevel) || 0) * src.level;
  acc.speed += Number(g.speed) || 0;
  acc.initiative += Number(g.initiative) || 0;
  acc.darkvision = Math.max(acc.darkvision, Number(g.darkvision) || 0);
  acc.passive.perception += Number(g.passive?.perception) || 0;
  acc.passive.investigation += Number(g.passive?.investigation) || 0;
  for (const r of g.resistances || []) acc.resistances.add(r);
  for (const r of g.immunities || []) acc.immunities.add(r);
  const classAbility = src.classId ? CLASSES[src.classId].ability : null;
  for (const x of g.cantrips || [])
    acc.cantrips.push({ id: x.id, ability: x.ability === "class" ? classAbility : x.ability, source: src.label, sourceKey: src.key });
  if (g.cantripChoice)
    for (const id of pick("cantripChoice", g.cantripChoice.count))
      acc.cantrips.push({
        id,
        ability: g.cantripChoice.ability === "class" || !g.cantripChoice.ability ? classAbility || "int" : g.cantripChoice.ability,
        source: src.label,
        sourceKey: src.key,
      });
  for (const x of g.innateSpells || [])
    if ((x.minLevel || 1) <= src.level) {
      const ability = x.ability === "class" ? classAbility : x.ability;
      if (x.ritualOnly) acc.rituals.push({ id: x.id, ability, source: src.label, sourceKey: src.key });
      else acc.innate.push({ ...x, ability, source: src.label, sourceKey: src.key, usesPactSlot: src.kind === "invocation" && x.reset === "long" && !x.castLevel });
    }
  if (g.optionChoice) acc.options[pickPath(src.key, g.optionChoice.key)] = pick(g.optionChoice.key, g.optionChoice.count);
  if (g.extraAttack) acc.extraAttack = Math.max(acc.extraAttack, Number(g.extraAttack));
  if (g.unarmoredDefense) acc.unarmored.push({ ...g.unarmoredDefense, source: src.label });
  if (g.heavyArmorNoSpeedPenalty) acc.heavyArmorNoSpeedPenalty = true;
  if (g.feat) acc.featSlots += Number(g.feat) || 0;
  if (src.classId && g.extraCantrips) acc.extraCantrips[src.classId] = (acc.extraCantrips[src.classId] || 0) + Number(g.extraCantrips);
  if (src.classId && g.spellsKnownBonus)
    acc.spellsKnownBonus[src.classId] = (acc.spellsKnownBonus[src.classId] || 0) + Number(g.spellsKnownBonus);
  for (const r of g.resources || [])
    if ((r.minLevel || 1) <= src.level) acc.resources.push({ ...r, ctxLevel: src.level, source: src.label, classId: src.classId });
  if (src.kind === "feat") {
    acc.feats.push(src.featId);
    const feat = FEATS[src.featId] || {},
      klass = picksOf(c, src.key, "class")[0];
    const ability = klass && CLASSES[klass] ? CLASSES[klass].ability : "int";
    if (feat.special === "magicInitiate" && klass) {
      for (const id of picksOf(c, src.key, "cantrips").slice(0, 2)) acc.cantrips.push({ id, ability, source: src.label, sourceKey: src.key });
      for (const id of picksOf(c, src.key, "spells").slice(0, 1))
        acc.innate.push({ id, ability, castLevel: 1, reset: "long", source: src.label, sourceKey: src.key });
    }
    if (feat.special === "spellSniper" && klass)
      for (const id of picksOf(c, src.key, "cantrips").slice(0, 1)) acc.cantrips.push({ id, ability, source: src.label, sourceKey: src.key });
    if (feat.special === "ritualCaster" && klass)
      for (const id of picksOf(c, src.key, "spells")) acc.rituals.push({ id, ability, source: src.label, sourceKey: src.key });
  }
}
/** Agrège tous les effets accordés (race, historique, classes, sous-classes, dons, manifestations). */
function collect(c, upTo = levelOf(c)) {
  const acc = _emptyAcc();
  for (const src of grantSources(c, upTo)) _applyGrants(acc, c, src);
  if (allChoices(c, "pact", upTo)[0] === "chain")
    acc.rituals.push({ id: "find-familiar", ability: "cha", source: "Pacte de la chaîne", sourceKey: "pact|chain" });
  for (const sc of spellcasters(c))
    if (sc.type === "third" && classLevel(c, sc.classId, upTo) >= 3)
      for (const id of sc.config.fixedCantrips || [])
        acc.cantrips.push({ id, ability: sc.ability, source: sc.label, sourceKey: `sub|${sc.classId}|fixed` });
  return acc;
}

/* ----------------------------------------------- caractéristiques, maîtrises */
function abilityTotals(c, acc = collect(c)) {
  const totals = {};
  for (const a of Object.keys(ABILITIES))
    totals[a] = Number(c.abilities[a] || 0) + acc.abilities[a] + Number(c.adjustments?.abilities?.[a] || 0);
  for (const l of c.levels)
    if (l.asi?.mode === "ability") for (const a of [l.asi.a, l.asi.b]) if (a in ABILITIES) totals[a]++;
  for (const trait of c.custom.traits)
    if (trait.active !== false) for (const a of Object.keys(ABILITIES)) totals[a] += Number(trait.bonuses?.[a] || 0);
  if (classLevel(c, "barbarian") >= 20) {
    totals.str += 4;
    totals.con += 4;
  }
  return totals;
}
function skillRanks(c, acc = collect(c)) {
  const ranks = Object.fromEntries(Object.keys(SKILLS).map((s) => [s, 0]));
  const all = [...c.skills, ...backgroundSkills(c), ...acc.skills, ...allChoices(c, "bonusSkills")];
  for (const s of all) if (s in ranks) ranks[s] = 1;
  for (const s of [...allChoices(c, "expertise"), ...acc.expertise]) if (ranks[s]) ranks[s] = 2;
  return ranks;
}
function toolProficiencies(c, acc = collect(c)) {
  const expertise = new Set(allChoices(c, "expertise").filter((x) => TOOLS?.[x]));
  return [...acc.tools].filter((t) => TOOLS?.[t]).map((t) => ({ id: t, name: TOOLS[t].name, expertise: expertise.has(t) }));
}
function languageList(c, acc = collect(c)) {
  return [...acc.languages].filter((l) => LANGUAGES?.[l]).map((l) => ({ id: l, name: LANGUAGES[l].name }));
}

/* ------------------------------------------------------------- incantation */
/** Classes (ou sous-classes) qui donnent l’incantation, avec leur niveau. */
function spellcasters(c) {
  const out = [];
  for (const { classId, level } of classLevels(c)) {
    const cls = CLASSES[classId];
    if (cls.caster && cls.caster !== "none") {
      if (cls.caster === "half" && level < 2) continue;
      out.push({ classId, level, ability: cls.ability, mode: cls.spellMode, list: classId, type: cls.caster, label: cls.name });
      continue;
    }
    const sub = subclassOf(c, classId),
      sc = sub?.data?.spellcasting;
    if (sc && level >= 3)
      out.push({ classId, level, ability: sc.ability || "int", mode: "known", list: sc.list || "wizard", type: "third", schools: sc.schools || [], label: sub.name, config: sc });
  }
  return out;
}
const _maxLevelFor = (type, level) =>
  type === "full"
    ? FULL_SLOTS[level].length
    : type === "half"
      ? level < 2
        ? 0
        : FULL_SLOTS[Math.ceil(level / 2)].length
      : type === "third"
        ? level < 3
          ? 0
          : FULL_SLOTS[Math.ceil(level / 3)].length
        : type === "pact"
          ? Math.min(5, Math.ceil(level / 2))
          : 0;
function spellSlots(c) {
  const casters = spellcasters(c).filter((s) => s.type !== "pact");
  if (!casters.length) return [];
  if (casters.length === 1) {
    const s = casters[0];
    if (s.type === "full") return [...FULL_SLOTS[s.level]];
    if (s.type === "half") return [...FULL_SLOTS[Math.ceil(s.level / 2)]];
    if (s.type === "third") return [...FULL_SLOTS[Math.ceil(s.level / 3)]];
  }
  let lvl = 0;
  for (const s of casters) lvl += s.type === "full" ? s.level : s.type === "half" ? Math.floor(s.level / 2) : Math.floor(s.level / 3);
  return lvl ? [...FULL_SLOTS[Math.min(20, lvl)]] : [];
}
function pactMagic(c) {
  const lvl = classLevel(c, "warlock");
  if (!lvl) return null;
  return { slotLevel: Math.min(5, Math.ceil(lvl / 2)), count: lvl === 1 ? 1 : lvl < 11 ? 2 : lvl < 17 ? 3 : 4 };
}
const _CANTRIP_TABLE = {
  bard: [2, 4, 10],
  druid: [2, 4, 10],
  warlock: [2, 4, 10],
  cleric: [3, 4, 10],
  wizard: [3, 4, 10],
  sorcerer: [4, 4, 10],
};
const _KNOWN_TABLES = {
  bard: [4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 15, 16, 18, 19, 19, 20, 22, 22, 22],
  sorcerer: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15],
  warlock: [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15],
  ranger: [0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11],
};
const _THIRD_KNOWN = [0, 0, 3, 4, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10, 10, 11, 11, 11, 12, 13];
function spellLimits(c, classId = spellcasters(c)[0]?.classId, acc = collect(c)) {
  const sc = spellcasters(c).find((s) => s.classId === classId);
  if (!sc) return { cantrips: 0, known: 0, prepared: 0, maxLevel: 0, mode: "none", arcana: [], secrets: 0, offSchool: 0, classId };
  const level = sc.level,
    scores = abilityTotals(c, acc);
  let cantrips = 0,
    known = 0,
    prepared = 0;
  const table = _CANTRIP_TABLE[classId];
  if (table && sc.type !== "third") cantrips = table[0] + (level >= 4 ? 1 : 0) + (level >= 10 ? 1 : 0);
  if (sc.type === "third") {
    const cfg = sc.config.cantrips || { 3: 2, 10: 3 };
    for (const [lvl, n] of Object.entries(cfg)) if (level >= Number(lvl)) cantrips = Number(n);
    known = (Array.isArray(sc.config.known) ? sc.config.known : _THIRD_KNOWN)[level - 1] || 0;
  }
  cantrips += acc.extraCantrips[classId] || 0;
  if (_KNOWN_TABLES[classId]) known = _KNOWN_TABLES[classId][level - 1];
  if (classId === "wizard") known = 6 + 2 * (level - 1);
  known += acc.spellsKnownBonus[classId] || 0;
  if (["prepared", "book"].includes(sc.mode))
    prepared = Math.max(1, mod(scores[sc.ability]) + (sc.type === "half" ? Math.floor(level / 2) : level));
  const lore = classId === "bard" && hasSubclass(c, "bard", "lore") && level >= 6 ? 2 : 0;
  return {
    classId,
    cantrips,
    known,
    prepared,
    maxLevel: _maxLevelFor(sc.type, level),
    mode: sc.mode || "none",
    arcana: classId === "warlock" ? [6, 7, 8, 9].filter((n) => level >= 2 * n - 1) : [],
    secrets: classId === "bard" ? (level >= 18 ? 6 : level >= 14 ? 4 : level >= 10 ? 2 : 0) + lore : 0,
    offSchool: sc.type === "third" ? [3, 8, 14, 20].filter((n) => level >= n).length : 0,
    schools: sc.schools || [],
    list: sc.list,
    ability: sc.ability,
    type: sc.type,
    level,
  };
}
function catalogue(c) {
  return [...SPELLS, ...c.custom.spells];
}
const spellById = (c, id) => catalogue(c).find((s) => s.id === id);
/** Sorts toujours préparés (domaine, serment, cercle de la Terre), avec la classe concernée. */
function alwaysPrepared(c) {
  const out = [];
  for (const { classId, level } of classLevels(c)) {
    const sub = subclassOf(c, classId);
    if (!sub?.data) continue;
    for (const row of sub.data.alwaysPrepared || [])
      if (row[0] <= level) for (const id of row.slice(1)) out.push({ id, classId });
    if (sub.data.landSpells) {
      const land = allChoices(c, "land")[0];
      for (const row of sub.data.landSpells[land] || []) if (row[0] <= level) for (const id of row.slice(1)) out.push({ id, classId });
    }
  }
  return out;
}
const domainSpells = (c) => alwaysPrepared(c).map((x) => x.id);
function expandedSpells(c, classId) {
  const sub = subclassOf(c, classId);
  return (sub?.data?.expandedSpells || []).flatMap((row) => row.slice(1));
}
/** Classe à laquelle un sort connu ou préparé est rattaché (multiclasse). */
function spellClassOf(c, id) {
  const casters = spellcasters(c);
  const stored = c.spells.sources?.[id];
  if (stored && casters.some((s) => s.classId === stored)) return stored;
  const spell = spellById(c, id);
  if (!spell) return casters[0]?.classId || primaryClassId(c);
  const match = casters.find(
    (s) => spell.custom || spell.classes.includes(s.list) || expandedSpells(c, s.classId).includes(id),
  );
  return match?.classId || casters[0]?.classId || primaryClassId(c);
}
function hasSpellAccess(c, spell, classId = spellcasters(c)[0]?.classId) {
  if (!spell) return false;
  if (spell.custom || c.spells.allowExceptions) return true;
  const sc = spellcasters(c).find((s) => s.classId === classId);
  if (!sc) return false;
  if (spell.classes.includes(sc.list)) return true;
  if (expandedSpells(c, classId).includes(spell.id)) return true;
  if (alwaysPrepared(c).some((x) => x.id === spell.id && x.classId === classId)) return true;
  if (classId === "bard" && spellLimits(c, "bard").secrets > 0) return spell.classes.length > 0;
  return false;
}
function canReadySpell(c, spell, classId = spellcasters(c)[0]?.classId) {
  if (!spell) return false;
  if (c.spells.allowExceptions) return true;
  const limit = spellLimits(c, classId);
  return (
    hasSpellAccess(c, spell, classId) &&
    (spell.level <= limit.maxLevel || (limit.arcana.includes(spell.level) && spell.classes.includes("warlock")))
  );
}
/** Sorts accordés hors classe : origine, dons, manifestations, sous-classes. */
function innateSpells(c, acc = collect(c)) {
  const out = [];
  for (const x of acc.cantrips)
    out.push({ id: x.id, ability: x.ability, label: x.source, resource: null, cantrip: true, sourceKey: x.sourceKey });
  for (const x of acc.innate)
    out.push({
      id: x.id,
      ability: x.ability,
      label: x.source,
      castLevel: x.castLevel,
      resource: x.reset ? `innate-${x.sourceKey}-${x.id}` : null,
      atWill: !x.reset,
      usesPactSlot: !!x.usesPactSlot,
      sourceKey: x.sourceKey,
    });
  for (const x of acc.rituals) out.push({ id: x.id, ability: x.ability, label: `${x.source} · rituel`, ritualOnly: true, sourceKey: x.sourceKey });
  return out;
}

/* ------------------------------------------------------------- calculs */
function equippedStyles(c) {
  return [...allChoices(c, "style"), ...allChoices(c, "secondStyle")];
}
function _monkWeapon(c, w, id) {
  if (!classLevel(c, "monk")) return false;
  const armor = ARMORS[c.equipment.armor] || ARMORS.none;
  if (armor.type !== "none" || c.equipment.shield) return false;
  return id === "unarmed" || id === "shortsword" || (w.group === "simple" && !w.ranged && !w.two && !w.heavy);
}
const _UNARMED = { name: "Frappe à mains nues", damage: "1", type: "contondants", group: "simple", weight: 0 };
function weaponOf(id) {
  return id === "unarmed" ? WEAPONS?.unarmed || _UNARMED : WEAPONS?.[id] || null;
}
function _attack(c, entry, ctx) {
  const id = entry.id,
    w = weaponOf(id);
  if (!w) return null;
  const { mods, prof, styles, acc } = ctx;
  const monk = _monkWeapon(c, w, id);
  const ability =
    w.finesse || monk ? (mods.dex > mods.str ? "dex" : "str") : w.ranged ? "dex" : "str";
  const proficient =
    id === "unarmed" || acc.weapons.has(id) || acc.weapons.has(w.group) || (w.group === "simple" && acc.weapons.has("simple"));
  const magic = Number(entry.magic) || 0;
  let dice = entry.twoHands && w.versatile ? w.versatile : w.damage;
  if (id === "unarmed" && dice === "1" && acc.feats.includes("tavernBrawler")) dice = "1d4";
  if (monk) {
    const ml = classLevel(c, "monk");
    const martial = ml >= 17 ? 10 : ml >= 11 ? 8 : ml >= 5 ? 6 : 4;
    const m = /^1d(\d+)$/.exec(dice);
    if (dice === "1" || (m && Number(m[1]) < martial)) dice = `1d${martial}`;
  }
  const dueling = styles.includes("dueling") && !w.ranged && !w.two && !entry.twoHands && id !== "unarmed" ? 2 : 0;
  const archery = styles.includes("archery") && w.ranged ? 2 : 0;
  const attack = mods[ability] + (proficient ? prof : 0) + magic + Number(c.adjustments.attack || 0) + archery;
  const damageBonus = mods[ability] + magic + Number(c.adjustments.damage || 0) + dueling;
  const props = [
    w.finesse && "finesse",
    w.light && "légère",
    w.heavy && "lourde",
    w.two && "à deux mains",
    w.versatile && `polyvalente (${w.versatile})`,
    w.reach && "allonge",
    w.thrown && "lancer",
    w.loading && "chargement",
    w.ammunition && "munitions",
    w.range && `portée ${w.range}`,
  ].filter(Boolean);
  return {
    id,
    name: w.name + (magic ? ` +${magic}` : ""),
    weapon: w,
    attack,
    ability,
    proficient,
    damageDice: dice,
    damageBonus,
    type: w.type,
    properties: props,
    monk,
    twoHands: !!entry.twoHands,
  };
}
function derive(c) {
  const level = levelOf(c),
    acc = collect(c),
    primary = primaryClassId(c),
    cls = CLASSES[primary],
    race = raceOf(c),
    bg = backgroundOf(c),
    scores = abilityTotals(c, acc),
    mods = Object.fromEntries(Object.entries(scores).map(([k, v]) => [k, mod(v)])),
    prof = 2 + Math.floor((level - 1) / 4),
    ranks = skillRanks(c, acc),
    styles = equippedStyles(c),
    armor = ARMORS[c.equipment.armor] || ARMORS.none,
    lv = (id) => classLevel(c, id);
  const classes = classLevels(c).map(({ classId, level: l }) => ({ classId, level: l, cls: CLASSES[classId], sub: subclassOf(c, classId) }));
  let traitHp = 0,
    traitAc = 0,
    traitSpeed = 0;
  for (const t of c.custom.traits)
    if (t.active !== false) {
      traitHp += Number(t.hp || 0);
      traitAc += Number(t.ac || 0);
      traitSpeed += Number(t.speed || 0);
    }
  const normalMaxHp = Math.max(
    1,
    c.levels.reduce((sum, l, i) => sum + Math.max(1, (i === 0 ? CLASSES[l.classId].die : Number(l.hpDie) || 1) + mods.con), 0) +
      acc.hpFlat +
      Number(c.adjustments.hp || 0) +
      traitHp,
  );
  const maxHp = c.state.exhaustion >= 4 ? Math.max(1, Math.floor(normalMaxHp / 2)) : normalMaxHp;
  // Classe d’armure : on retient la meilleure formule applicable.
  const formulas = [];
  if (armor.type === "none") {
    formulas.push({ value: 10 + mods.dex, text: `10 ${signed(mods.dex)} DEX` });
    if (lv("barbarian"))
      formulas.push({ value: 10 + mods.dex + mods.con, text: `10 ${signed(mods.dex)} DEX ${signed(mods.con)} CON (défense sans armure)` });
    if (lv("monk") && !c.equipment.shield)
      formulas.push({ value: 10 + mods.dex + mods.wis, text: `10 ${signed(mods.dex)} DEX ${signed(mods.wis)} SAG (défense sans armure)` });
    for (const u of acc.unarmored) {
      const value = (u.base || 10) + (u.abilities || ["dex"]).reduce((s, a) => s + (mods[a] || 0), 0);
      formulas.push({ value, text: `${u.base || 10} ${(u.abilities || ["dex"]).map((a) => `${signed(mods[a])} ${ABILITIES[a].short}`).join(" ")} (${u.source})` });
    }
    if (c.equipment.mageArmor) formulas.push({ value: 13 + mods.dex, text: `13 ${signed(mods.dex)} DEX (armure de mage)` });
  } else {
    const cap = armor.type === "medium" && acc.feats.includes("mediumArmorMaster") ? 3 : armor.dex;
    const dexPart = armor.type === "heavy" ? 0 : Math.min(cap, mods.dex);
    formulas.push({ value: armor.base + dexPart, text: `${armor.base} (${armor.name})${armor.type === "heavy" ? "" : ` ${signed(dexPart)} DEX`}` });
  }
  formulas.sort((a, b) => b.value - a.value);
  const shieldBonus = c.equipment.shield ? 2 : 0,
    styleDefense = styles.includes("defense") && armor.type !== "none" ? 1 : 0;
  const ac = formulas[0].value + shieldBonus + styleDefense + Number(c.equipment.armorBonus || 0) + Number(c.adjustments.ac || 0) + traitAc;
  let acExplanation = formulas[0].text + (shieldBonus ? " +2 bouclier" : "") + (styleDefense ? " +1 style Défense" : "");
  if (c.equipment.armorBonus || c.adjustments.ac || traitAc) acExplanation += " + ajustements";
  // Vitesse
  let speed = Number(race.speed) + acc.speed + Number(c.adjustments.speed || 0) + traitSpeed;
  if (lv("barbarian") >= 5 && armor.type !== "heavy") speed += 3;
  const ml = lv("monk");
  if (ml >= 2 && armor.type === "none" && !c.equipment.shield)
    speed += ml >= 18 ? 9 : ml >= 14 ? 7.5 : ml >= 10 ? 6 : ml >= 6 ? 4.5 : 3;
  const strTooLow = armor.str && scores.str < armor.str && !acc.heavyArmorNoSpeedPenalty;
  if (strTooLow) speed -= 3;
  if (c.state.exhaustion >= 2) speed /= 2;
  if (
    c.state.exhaustion >= 5 ||
    ["Agrippé", "Entravé", "Paralysé", "Étourdi", "Inconscient", "Pétrifié"].some((s) => c.state.conditions.includes(s))
  )
    speed = 0;
  speed = Math.max(0, Math.round(speed * 100) / 100);
  const jack = lv("bard") >= 2 ? Math.floor(prof / 2) : 0;
  const athlete = hasSubclass(c, "fighter", "champion") && lv("fighter") >= 7 ? Math.ceil(prof / 2) : 0;
  const skillValues = Object.fromEntries(
    Object.entries(SKILLS).map(([k, entry]) => [
      k,
      mods[entry[1]] + (ranks[k] ? ranks[k] * prof : Math.max(jack, ["str", "dex", "con"].includes(entry[1]) ? athlete : 0)),
    ]),
  );
  const saves = _uniq([...cls.saves, ...acc.saves]);
  if (ml >= 14) saves.push(...Object.keys(ABILITIES).filter((a) => !saves.includes(a)));
  if (lv("rogue") >= 15 && !saves.includes("wis")) saves.push("wis");
  const conscious = c.state.hp > 0 && !c.state.conditions.some((s) => ["Inconscient", "Pétrifié"].includes(s));
  const aura = lv("paladin") >= 6 && conscious ? Math.max(1, mods.cha) : 0;
  const saveValues = Object.fromEntries(
    Object.keys(ABILITIES).map((a) => [a, mods[a] + (saves.includes(a) ? prof : 0) + aura]),
  );
  const ctx = { mods, prof, styles, acc };
  const weaponEntries = c.equipment.weapons?.length ? c.equipment.weapons : [{ id: "unarmed", magic: 0, twoHands: false }];
  const attacks = weaponEntries.map((e) => _attack(c, e, ctx)).filter(Boolean);
  const main = attacks[0] || _attack(c, { id: "unarmed" }, ctx);
  const fl = lv("fighter");
  const extraAttacks = Math.max(
    acc.extraAttack,
    fl >= 20 ? 4 : fl >= 11 ? 3 : fl >= 5 ? 2 : 1,
    ["barbarian", "monk", "paladin", "ranger"].some((id) => lv(id) >= 5) ? 2 : 1,
  );
  const casting = spellcasters(c).map((s) => ({
    classId: s.classId,
    label: s.label,
    ability: s.ability,
    dc: 8 + prof + mods[s.ability],
    attack: prof + mods[s.ability],
    type: s.type,
    level: s.level,
  }));
  const innateAbilities = _uniq(innateSpells(c, acc).map((x) => x.ability).filter(Boolean));
  const armorProfs = [...acc.armor];
  const armorProficient =
    (armor.type === "none" || armorProfs.includes(armor.type)) && (!c.equipment.shield || armorProfs.includes("shield"));
  const hitDice = [];
  for (const l of c.levels) {
    const die = CLASSES[l.classId].die,
      entry = hitDice.find((h) => h.die === die);
    if (entry) entry.total++;
    else hitDice.push({ die, total: 1, spent: 0 });
  }
  for (const h of hitDice) h.spent = clamp(c.state.hitDiceSpent?.[h.die] || 0, 0, h.total);
  hitDice.sort((a, b) => b.die - a.die);
  const subChampion = hasSubclass(c, "fighter", "champion");
  return {
    level,
    cls,
    classes,
    multiclass: classes.length > 1,
    race,
    background: bg,
    acc,
    scores,
    mods,
    prof,
    maxHp,
    normalMaxHp,
    ac,
    acExplanation,
    speed,
    strTooLow,
    initiative: mods.dex + Math.max(jack, athlete) + acc.initiative + Number(c.adjustments.initiative || 0),
    skills: skillValues,
    ranks,
    saves: saveValues,
    saveProficiencies: saves,
    aura,
    passivePerception: 10 + skillValues.perception + acc.passive.perception + (c.state.exhaustion >= 1 ? -5 : 0),
    passiveInvestigation: 10 + skillValues.investigation + acc.passive.investigation + (c.state.exhaustion >= 1 ? -5 : 0),
    passiveInsight: 10 + skillValues.insight + (c.state.exhaustion >= 1 ? -5 : 0),
    slots: spellSlots(c),
    pact: pactMagic(c),
    casting,
    innateAbilities,
    spellDC: casting[0]?.dc ?? null,
    spellAttack: casting[0]?.attack ?? null,
    kiDC: 8 + prof + mods.wis,
    maneuverDC: 8 + prof + Math.max(mods.str, mods.dex),
    attacks,
    weapon: main.weapon,
    attack: main.attack,
    attackAbility: main.ability,
    damageDice: main.damageDice,
    damageBonus: main.damageBonus,
    weaponProficient: attacks.every((a) => a.proficient),
    armorProficient,
    armorProfs,
    weaponProfs: [...acc.weapons],
    tools: toolProficiencies(c, acc),
    languages: languageList(c, acc),
    darkvision: acc.darkvision,
    resistances: _uniq([...acc.resistances, ...(race.dragonChoice ? [(DRAGONS[picksOf(c, "race", "dragon")[0]] || DRAGONS.red)[1]] : [])]),
    immunities: _uniq([...acc.immunities, ...(ml >= 10 ? ["poison", "maladies"] : []), ...(lv("paladin") >= 3 ? ["maladies"] : [])]),
    extraAttacks,
    critThreshold: subChampion && fl >= 3 ? (fl >= 15 ? 18 : 19) : 20,
    sneakAttack: lv("rogue") ? Math.ceil(lv("rogue") / 2) : 0,
    martialDie: ml ? (ml >= 17 ? 10 : ml >= 11 ? 8 : ml >= 5 ? 6 : 4) : 0,
    nextXP: XP_THRESHOLDS[Math.min(level + 1, 20)],
    hitDice,
    hitDiceRemaining: hitDice.reduce((s, h) => s + h.total - h.spent, 0),
    carry: scores.str * 7.5,
  };
}

/* -------------------------------------------------------------- ressources */
function _resourceCtx(c, d, level) {
  return { level, charLevel: d.level, mods: d.mods, scores: d.scores, prof: d.prof };
}
const _evaluate = (value, ctx, fallback) => {
  try {
    return typeof value === "function" ? value(ctx) : value === undefined ? fallback : value;
  } catch {
    return fallback;
  }
};
function resources(c) {
  const d = derive(c),
    items = [],
    add = (id, name, max, reset, note = "") => {
      if (items.some((r) => r.id === id)) return;
      items.push({ id, name, max, reset, note, used: clamp(c.state.resourcesUsed[id] || 0, 0, max === null ? 99999 : max) });
    },
    lv = (id) => classLevel(c, id);
  let channel = 0;
  for (const { classId, level } of classLevels(c)) {
    switch (classId) {
      case "barbarian":
        add(
          "rage",
          "Rages",
          level >= 20 ? null : level >= 17 ? 6 : level >= 12 ? 5 : level >= 6 ? 4 : level >= 3 ? 3 : 2,
          "long",
          `Bonus aux dégâts de mêlée à la FOR : +${level >= 16 ? 4 : level >= 9 ? 3 : 2}. Résistance aux dégâts contondants, perforants et tranchants. Avantage aux tests et sauvegardes de FOR.`,
        );
        break;
      case "bard":
        add(
          "inspiration",
          `Inspiration bardique · d${level >= 15 ? 12 : level >= 10 ? 10 : level >= 5 ? 8 : 6}`,
          Math.max(1, d.mods.cha),
          level >= 5 ? "short" : "long",
          "Action bonus : une créature à 18 m qui t’entend gagne un dé à ajouter à un test, une attaque ou une sauvegarde dans les 10 minutes.",
        );
        break;
      case "cleric":
        if (level >= 2) channel = Math.max(channel, level >= 18 ? 3 : level >= 6 ? 2 : 1);
        if (level >= 10)
          add("divine-intervention", "Intervention divine", 1, "long", `Réussite si le d100 donne ${level >= 20 ? "n’importe quel résultat (réussite automatique)" : `${level} ou moins`}. En cas de réussite, attendre 7 jours avant de réessayer.`);
        break;
      case "druid":
        if (level >= 2) {
          const moon = hasSubclass(c, "druid", "moon");
          const cr = (moon ? (level >= 6 ? `FP ${Math.floor(level / 3)}` : "FP 1") : level >= 8 ? "FP 1" : level >= 4 ? "FP 1/2" : "FP 1/4") + (level < 4 ? ", ni vol ni nage" : level < 8 ? ", pas de vol" : "");
          add("wildshape", "Forme sauvage", level >= 20 ? null : 2, "short", `Bête jusqu’à ${cr}. Durée : ${Math.floor(level / 2)} heure(s).${moon ? " Action bonus (Cercle de la Lune)." : ""}`);
        }
        break;
      case "fighter":
        add("second-wind", "Second souffle", 1, "short", `Action bonus : récupère 1d10 + ${level} PV.`);
        if (level >= 2) add("action-surge", "Fougue", level >= 17 ? 2 : 1, "short", "Une action supplémentaire pendant ton tour (une seule fois par tour).");
        if (level >= 9) add("indomitable", "Inflexible", level >= 17 ? 3 : level >= 13 ? 2 : 1, "long", "Relance une sauvegarde ratée ; tu dois garder le nouveau résultat.");
        break;
      case "monk":
        if (level >= 2) add("ki", "Points de ki", level, "short", `DD des techniques : ${d.kiDC}. Déluge de coups, Défense patiente, Pas du vent : 1 ki chacun.`);
        break;
      case "paladin":
        add("lay-hands", "Imposition des mains", 5 * level, "long", "Rends des PV en puisant dans la réserve, ou dépense 5 points pour guérir une maladie ou neutraliser un poison.");
        add("divine-sense", "Sens divin", Math.max(1, 1 + d.mods.cha), "long", "Action : détecte célestes, fiélons et morts-vivants à 18 m jusqu’à la fin de ton prochain tour.");
        if (level >= 3) channel = Math.max(channel, 1);
        if (level >= 14) add("cleansing-touch", "Contact purifiant", Math.max(1, d.mods.cha), "long", "Action : mets fin à un sort qui t’affecte ou affecte une créature consentante touchée.");
        break;
      case "rogue":
        if (level >= 20) add("stroke-luck", "Coup de chance", 1, "short", "Transforme une attaque ratée en touche, ou un test raté en 20.");
        break;
      case "sorcerer":
        if (level >= 2) add("sorcery", "Points de sorcellerie", level, "long", "Convertis-les en emplacements ou dépense-les en métamagie. Un emplacement rend autant de points que son niveau.");
        break;
      case "warlock":
        for (const s of [6, 7, 8, 9]) if (level >= 2 * s - 1) add(`arcanum-${s}`, `Arcanum mystique · niveau ${s}`, 1, "long");
        if (level >= 20) add("eldritch-master", "Maître de l’Occulte", 1, "long", "Une minute de supplication : récupère tous tes emplacements de pacte.");
        break;
      case "wizard":
        add(
          "arcane-recovery",
          "Restauration magique",
          1,
          "long",
          `Une fois par jour, lors d’un repos court : récupère des emplacements dont la somme des niveaux vaut au plus ${Math.ceil(level / 2)}, aucun de niveau 6 ou plus.`,
        );
        break;
    }
    const sub = subclassOf(c, classId);
    for (const r of sub?.data?.resources || []) {
      if ((r.minLevel || 1) > level) continue;
      const ctx = _resourceCtx(c, d, level);
      const max = _evaluate(r.max, ctx, 1);
      if (max === 0) continue;
      add(r.id, _evaluate(r.name, ctx, r.id), max, r.reset || "long", _evaluate(r.note, ctx, ""));
    }
  }
  if (channel) add("channel", "Conduit divin", channel, "short", "Les options dépendent de ton domaine ou de ton serment.");
  if (lv("sorcerer") >= 20) {
    /* restauration de sorcellerie : gérée au repos court */
  }
  for (const r of d.acc.resources) {
    const ctx = _resourceCtx(c, d, r.ctxLevel || d.level);
    const max = _evaluate(r.max, ctx, 1);
    if (max === 0) continue;
    add(r.id, _evaluate(r.name, ctx, r.id), max, r.reset || "long", _evaluate(r.note, ctx, ""));
  }
  if (c.raceId === "dragonborn") {
    const dragon = DRAGONS[picksOf(c, "race", "dragon")[0]] || DRAGONS.red;
    add(
      "breath",
      "Souffle draconique",
      1,
      "short",
      `${dragon[2]}, dégâts de ${dragon[1]} : ${d.level >= 16 ? 5 : d.level >= 11 ? 4 : d.level >= 6 ? 3 : 2}d6, sauvegarde de ${dragon[3]} DD ${8 + d.prof + d.mods.con}, moitié en cas de réussite.`,
    );
  }
  for (const x of innateSpells(c, d.acc))
    if (x.resource) {
      const spell = spellById(c, x.id);
      add(
        x.resource,
        `${spell?.name || x.id}${x.usesPactSlot ? "" : " (inné)"}`,
        1,
        "long",
        x.usesPactSlot
          ? `${x.label}. Se lance en dépensant un emplacement de pacte, une fois par repos long.`
          : `${x.label}${x.castLevel ? `, lancé au niveau ${x.castLevel}` : ""}, sans emplacement.`,
      );
    }
  for (const t of c.custom.traits)
    if (t.active !== false && Number(t.maxUses) > 0) add(`custom-${t.id}`, t.name, Number(t.maxUses), t.reset || "long", t.description);
  return items;
}

/* ---------------------------------------------------- aptitudes et choix */
/** Aptitudes gagnées, par niveau de personnage. `onlyLevel` limite à un niveau de personnage. */
function features(c, onlyLevel = null) {
  const out = [];
  for (const l of c.levels) {
    if (onlyLevel && l.level !== onlyLevel) continue;
    const k = classLevelAt(c, l.level),
      classId = l.classId,
      cls = CLASSES[classId];
    for (const f of FEATURES?.[classId] || [])
      if (f[0] === k) out.push({ level: l.level, classLevel: k, classId, name: f[1], description: f[2], source: `${cls.name} ${k}` });
    const sub = subclassOf(c, classId, l.level);
    if (sub?.data)
      for (const f of sub.data.features || [])
        if (f[0] === k) out.push({ level: l.level, classLevel: k, classId, name: f[1], description: f[2], source: `${sub.name} · ${cls.name} ${k}` });
    if (sub?.custom && k === cls.subLevel)
      out.push({ level: l.level, classLevel: k, classId, name: sub.name, description: sub.description, source: "Sous-classe maison · effets manuels" });
    if (l.asi) {
      const feat = l.asi.mode === "feat" ? FEATS[l.asi.featId] : null;
      out.push({
        level: l.level,
        classLevel: k,
        classId,
        name:
          l.asi.mode === "ability"
            ? "Amélioration de caractéristiques"
            : `Don : ${feat?.name || l.asi.featName || "à préciser"}`,
        description:
          l.asi.mode === "ability"
            ? `${ABILITIES[l.asi.a]?.name} +1 ; ${ABILITIES[l.asi.b]?.name} +1. Inclus dans les scores.`
            : feat?.summary || l.asi.featDescription || "",
        source: l.asi.mode === "ability" ? "Classe" : feat ? "Don" : "Don de la table",
        kind: l.asi.mode === "feat" ? "feat" : "asi",
      });
    }
  }
  return out.sort((a, b) => a.level - b.level);
}
function _resolveOptions(options) {
  if (typeof options === "string") {
    const table = { MANEUVERS, DISCIPLINES, METAMAGIC, STYLES, PACT_BOONS }[options] || {};
    return Object.fromEntries(Object.entries(table).map(([k, v]) => [k, Array.isArray(v) ? v : [v.name, v.summary]]));
  }
  return options || {};
}
/** Choix de classe et de sous-classe à faire au niveau de personnage donné. */
function choicesFor(c, level) {
  const specs = [],
    entry = c.levels[level - 1];
  if (!entry) return specs;
  const cls = entry.classId,
    k = classLevelAt(c, level),
    add = (key, title, options, count = 1, help = "") =>
      specs.push({ key, title, options, count, help, type: count === 1 ? "one" : "many" });
  if ((cls === "fighter" && k === 1) || (["paladin", "ranger"].includes(cls) && k === 2)) {
    const ids =
      cls === "paladin"
        ? ["defense", "dueling", "greatWeapon", "protection"]
        : cls === "ranger"
          ? ["archery", "defense", "dueling", "twoWeapon"]
          : Object.keys(STYLES);
    const taken = allChoices(c, "style", level - 1);
    add("style", "Style de combat", Object.fromEntries(ids.filter((id) => STYLES[id] && !taken.includes(id)).map((id) => [id, STYLES[id]])));
  }
  if ((cls === "rogue" && [1, 6].includes(k)) || (cls === "bard" && [3, 10].includes(k))) {
    const before = clone(c);
    before.levels = c.levels.slice(0, level - 1).concat([{ ...entry, choices: { ...entry.choices, expertise: [] } }]);
    const ranks = skillRanks(before),
      previous = allChoices(c, "expertise", level - 1);
    const opts = Object.fromEntries(
      Object.entries(SKILLS)
        .filter(([key]) => ranks[key] && !previous.includes(key))
        .map(([key, v]) => [key, [v[0], "Double ton bonus de maîtrise pour cette compétence."]]),
    );
    if (cls === "rogue" && !previous.includes("thieves-tools"))
      opts["thieves-tools"] = ["Outils de voleur", "Double ton bonus de maîtrise avec les outils de voleur."];
    add("expertise", "Expertise", opts, 2, "Choisis parmi les compétences que tu maîtrises déjà.");
  }
  if (cls === "sorcerer" && [3, 10, 17].includes(k))
    add(
      "metamagic",
      "Métamagie",
      Object.fromEntries(Object.entries(METAMAGIC).filter(([id]) => !allChoices(c, "metamagic", level - 1).includes(id))),
      k === 3 ? 2 : 1,
    );
  if (cls === "warlock" && k === 3) add("pact", "Faveur de pacte", PACT_BOONS);
  if (cls === "warlock" && [2, 5, 7, 9, 12, 15, 18].includes(k)) {
    const previous = allChoices(c, "invocations", level - 1),
      pact = allChoices(c, "pact", level)[0],
      known = c.spells.known.includes("eldritch-blast");
    add(
      "invocations",
      "Manifestations occultes",
      Object.fromEntries(
        Object.entries(INVOCATIONS)
          .filter(([id, v]) => (v.minLevel || 1) <= k && !previous.includes(id) && (!v.pact || v.pact === pact))
          .map(([id, v]) => [
            id,
            [
              v.name,
              `${v.summary}${v.requires === "eldritch-blast" && !known ? " Nécessite Décharge occulte." : ""}${v.minLevel > 1 ? ` (niveau ${v.minLevel})` : ""}`,
            ],
          ]),
      ),
      k === 2 ? 2 : 1,
      "Tu peux aussi remplacer une manifestation connue en corrigeant un niveau précédent.",
    );
  }
  if (cls === "ranger") {
    if ([1, 6, 14].includes(k))
      specs.push({
        key: "enemy",
        title: "Ennemi juré",
        type: "text",
        help: "Un type de créatures (ex. morts-vivants), ou deux races d’humanoïdes. Tu apprends aussi une de leurs langues.",
      });
    if ([1, 6, 10].includes(k))
      add(
        "terrain",
        "Explorateur-né : terrain de prédilection",
        Object.fromEntries(
          ["Arctique", "Désert", "Forêt", "Littoral", "Marais", "Montagne", "Prairie", "Outreterre"]
            .filter((x) => !allChoices(c, "terrain", level - 1).includes(x))
            .map((x) => [x, [x, "Voyage facilité, vigilance et pistage améliorés dans ce terrain."]]),
        ),
      );
  }
  const sub = subclassOf(c, cls, level);
  for (const ch of sub?.data?.choices || []) {
    const count = Number(ch.levels?.[k] || 0);
    if (!count) continue;
    const taken = [...allChoices(c, ch.key, level - 1), ...(ch.options === "STYLES" ? allChoices(c, "style", level - 1) : [])];
    let options = _resolveOptions(ch.options);
    if (ch.options === "DISCIPLINES")
      options = Object.fromEntries(
        Object.entries(DISCIPLINES || {})
          .filter(([, v]) => (v[2] || 1) <= k)
          .map(([id, v]) => [id, [v[0], `${v[1]}${v[3] ? ` Coût : ${v[3]}.` : ""}`]]),
      );
    if (ch.key === "land" && sub.data.landSpells && !Object.keys(options).length)
      options = Object.fromEntries(Object.keys(sub.data.landSpells).map((id) => [id, [id, "Sorts de cercle liés à ce terrain."]]));
    options = Object.fromEntries(Object.entries(options).filter(([id]) => ch.repeatable || !taken.includes(id)));
    add(ch.key, ch.title, options, count, ch.help || "");
  }
  if (sub?.data?.dragonChoice && k === CLASSES[cls].subLevel)
    add(
      "dragon",
      "Ancêtre draconique",
      Object.fromEntries(Object.entries(DRAGONS).map(([id, v]) => [id, [v[0], `Type de dégâts associé : ${v[1]}.`]])),
    );
  return specs;
}

/** Sources de choix génériques (picks) et options admissibles, pour l’interface et la validation. */
function pickSpecs(c, filter = () => true) {
  const specs = [],
    acc = collect(c),
    owned = skillRanks(c, acc),
    sources = grantSources(c).filter(filter);
  const skillLabel = (s) => SKILLS[s]?.[0] || s;
  for (const src of sources) {
    const g = src.grants || {},
      push = (field, title, type, count, options, extra = {}) => {
        if (!count || _forcedFrom(g[field])) return;
        specs.push({ source: src, path: pickPath(src.key, field), field, title, type, count, options, selected: picksOf(c, src.key, field), ...extra });
      };
    if (g.abilityChoice)
      push(
        "abilityChoice",
        `${src.label} : caractéristique${g.abilityChoice.count > 1 ? "s" : ""} +${g.abilityChoice.amount ?? 1}`,
        "ability",
        g.abilityChoice.count,
        Object.fromEntries((g.abilityChoice.from || Object.keys(ABILITIES)).map((a) => [a, [ABILITIES[a].name, ""]])),
      );
    if (g.skillChoice) {
      const own = picksOf(c, src.key, "skillChoice");
      push(
        "skillChoice",
        `${src.label} : compétence${g.skillChoice.count > 1 ? "s" : ""}${g.skillChoice.expertise ? " (avec expertise)" : ""}`,
        "skill",
        g.skillChoice.count,
        Object.fromEntries((g.skillChoice.from || Object.keys(SKILLS)).map((s) => [s, [skillLabel(s), ""]])),
        { owned: Object.keys(owned).filter((s) => owned[s] && !own.includes(s)) },
      );
    }
    if (g.skillOrToolChoice)
      push("skillOrToolChoice", `${src.label} : compétences ou outils`, "skillOrTool", g.skillOrToolChoice.count, {
        ...Object.fromEntries(Object.keys(SKILLS).map((s) => [s, [skillLabel(s), "Compétence"]])),
        ...Object.fromEntries(Object.entries(TOOLS || {}).map(([id, t]) => [id, [t.name, "Outil"]])),
      });
    if (g.expertiseChoice)
      push(
        "expertiseChoice",
        `${src.label} : expertise`,
        "skill",
        g.expertiseChoice.count,
        Object.fromEntries((g.expertiseChoice.from || Object.keys(SKILLS)).filter((s) => owned[s]).map((s) => [s, [skillLabel(s), ""]])),
      );
    if (g.toolChoice)
      push(
        "toolChoice",
        `${src.label} : outil${g.toolChoice.count > 1 ? "s" : ""}`,
        "tool",
        g.toolChoice.count,
        Object.fromEntries(_resolveToolOptions(g.toolChoice.from).map((t) => [t, [TOOLS[t].name, ""]])),
      );
    if (g.languageChoice)
      push(
        "languageChoice",
        `${src.label} : langue${g.languageChoice.count > 1 ? "s" : ""}`,
        "language",
        g.languageChoice.count,
        Object.fromEntries(
          Object.entries(LANGUAGES || {})
            .filter(([id, l]) => (g.languageChoice.from ? g.languageChoice.from.includes(id) : l.type !== "secret"))
            .map(([id, l]) => [id, [l.name, l.type === "exotic" ? "Exotique" : ""]]),
        ),
        { owned: [...acc.languages].filter((l) => !picksOf(c, src.key, "languageChoice").includes(l)), optional: !!g.languageChoice.optional },
      );
    if (g.toolOrLanguageChoice)
      push("toolOrLanguageChoice", `${src.label} : langues ou outils`, "toolOrLanguage", g.toolOrLanguageChoice.count, {
        ...Object.fromEntries(Object.entries(LANGUAGES || {}).filter(([, l]) => l.type !== "secret").map(([id, l]) => [id, [l.name, "Langue"]])),
        ...Object.fromEntries(Object.entries(TOOLS || {}).map(([id, t]) => [id, [t.name, "Outil"]])),
      });
    if (g.weaponChoice)
      push(
        "weaponChoice",
        `${src.label} : armes`,
        "weapon",
        g.weaponChoice.count,
        Object.fromEntries(
          Object.entries(WEAPONS || {})
            .filter(([id, w]) => id !== "unarmed" && (g.weaponChoice.from === "any" || !g.weaponChoice.from || w.group === g.weaponChoice.from))
            .map(([id, w]) => [id, [w.name, w.group === "martial" ? "Arme de guerre" : "Arme courante"]]),
        ),
      );
    if (g.cantripChoice)
      push(
        "cantripChoice",
        `${src.label} : sort${g.cantripChoice.count > 1 ? "s" : ""} mineur${g.cantripChoice.count > 1 ? "s" : ""}`,
        "spell",
        g.cantripChoice.count,
        Object.fromEntries(
          SPELLS.filter((s) => s.level === 0 && (g.cantripChoice.list === "*" ? s.classes.length : s.classes.includes(g.cantripChoice.list || src.classId))).map((s) => [s.id, [s.name, s.description]]),
        ),
      );
    if (g.optionChoice) push(g.optionChoice.key, g.optionChoice.title || src.label, "option", g.optionChoice.count || 1, g.optionChoice.options || {});
    if (src.key === "race" && raceOf(c).dragonChoice)
      push(
        "dragon",
        "Ascendance draconique",
        "option",
        1,
        Object.fromEntries(Object.entries(DRAGONS).map(([id, v]) => [id, [v[0], `${v[1]} · ${v[2]} · sauvegarde de ${v[3]}`]])),
      );
    if (src.kind === "feat") {
      const feat = FEATS[src.featId] || {};
      if (["magicInitiate", "ritualCaster", "spellSniper"].includes(feat.special)) {
        push(
          "class",
          `${src.label} : liste de sorts`,
          "option",
          1,
          Object.fromEntries(_CASTER_CLASSES.map((id) => [id, [CLASSES[id].name, `Caractéristique : ${ABILITIES[CLASSES[id].ability].name}`]])),
        );
        const klass = picksOf(c, src.key, "class")[0];
        if (klass) {
          const list = SPELLS.filter((s) => s.classes.includes(klass));
          if (feat.special === "magicInitiate") {
            push("cantrips", `${src.label} : 2 sorts mineurs`, "spell", 2, Object.fromEntries(list.filter((s) => s.level === 0).map((s) => [s.id, [s.name, s.description]])));
            push("spells", `${src.label} : 1 sort de niveau 1`, "spell", 1, Object.fromEntries(list.filter((s) => s.level === 1).map((s) => [s.id, [s.name, s.description]])));
          }
          if (feat.special === "spellSniper")
            push(
              "cantrips",
              `${src.label} : sort mineur d’attaque`,
              "spell",
              1,
              Object.fromEntries(list.filter((s) => s.level === 0 && /attaque de sort/i.test(s.description)).map((s) => [s.id, [s.name, s.description]])),
            );
          if (feat.special === "ritualCaster")
            push("spells", `${src.label} : 2 rituels de niveau 1`, "spell", 2, Object.fromEntries(list.filter((s) => s.level === 1 && s.ritual).map((s) => [s.id, [s.name, s.description]])));
        }
      }
    }
  }
  return specs;
}

/* ------------------------------------------------- multiclasse et dons */
function meetsPrereq(c, prereq, scores = abilityTotals(c)) {
  if (!prereq) return { ok: true, reasons: [] };
  const reasons = [];
  if (prereq.abilities)
    for (const [a, n] of Object.entries(prereq.abilities))
      if ((scores[a] || 0) < n) reasons.push(`${ABILITIES[a].name} ${n}`);
  if (prereq.anyAbility) {
    const entries = Object.entries(prereq.anyAbility);
    if (!entries.some(([a, n]) => (scores[a] || 0) >= n))
      reasons.push(entries.map(([a, n]) => `${ABILITIES[a].name} ${n}`).join(" ou "));
  }
  if (prereq.armor) {
    const acc = collect(c);
    if (!acc.armor.has(prereq.armor))
      reasons.push(`maîtrise des armures ${{ light: "légères", medium: "intermédiaires", heavy: "lourdes" }[prereq.armor] || prereq.armor}`);
  }
  if (prereq.spellcaster && !spellcasters(c).length && !innateSpells(c).length) reasons.push("savoir lancer au moins un sort");
  return { ok: !reasons.length, reasons };
}
/** Classes accessibles au prochain niveau (règles de multiclassage 2014). */
function multiclassOptions(c) {
  const scores = abilityTotals(c),
    current = classLevels(c).map((x) => x.classId);
  return Object.keys(CLASSES).map((classId) => {
    if (current.includes(classId)) return { classId, ok: true, reasons: [], current: true };
    const reasons = [];
    for (const id of [...current, classId]) {
      const p = meetsPrereq(c, CLASS_EXTRAS?.[id]?.multiclass?.prereq, scores);
      if (!p.ok) reasons.push(`${CLASSES[id].name} : ${p.reasons.join(", ")}`);
    }
    return { classId, ok: !reasons.length, reasons, current: false };
  });
}
function featOptions(c) {
  return Object.entries(FEATS || {}).map(([id, f]) => ({ id, ...f, eligible: meetsPrereq(c, f.prereq) }));
}

/* ----------------------------------------------------------- validation */
function pointBuyCost(abilities) {
  const costs = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 };
  return Object.values(abilities).reduce((s, n) => s + (costs[n] ?? 999), 0);
}
function characterIssues(c, { strict = false } = {}) {
  const errors = [],
    warnings = [],
    d = derive(c),
    primary = primaryClassId(c),
    cls = CLASSES[primary],
    level = levelOf(c);
  if (!c.name.trim()) errors.push("Donne un nom à ton personnage.");
  if (c.name.length > 80) errors.push("Le nom est limité à 80 caractères.");
  if (Object.values(c.abilities).some((n) => !Number.isInteger(n) || n < 1 || n > 20))
    errors.push("Chaque caractéristique de base doit être un entier entre 1 et 20, avant les bonus.");
  if (c.abilityMethod === "standard" && Object.values(c.abilities).sort((a, b) => a - b).join(",") !== "8,10,12,13,14,15")
    errors.push("Répartis une fois chaque valeur de la série : 15, 14, 13, 12, 10 et 8.");
  if (c.abilityMethod === "points" && pointBuyCost(c.abilities) > 27) errors.push("L’achat de caractéristiques dépasse les 27 points.");
  if (c.abilityMethod === "points" && Object.values(c.abilities).some((n) => n < 8 || n > 15))
    errors.push("En achat de points, chaque valeur de base doit être entre 8 et 15.");
  if (c.skills.length !== cls.pick || new Set(c.skills).size !== cls.pick || c.skills.some((s) => !cls.skills.includes(s)))
    errors.push(`Choisis ${cls.pick} compétences de ${cls.name.toLowerCase()} admissibles et différentes.`);
  const bgSkills = backgroundSkills(c);
  if (new Set(bgSkills).size !== 2 || bgSkills.some((s) => !(s in SKILLS))) errors.push("L’historique doit apporter deux compétences différentes.");
  const fixed = [...c.skills, ...bgSkills, ...(raceOf(c).grants?.skills || [])];
  const duplicates = _uniq(fixed.filter((s, i) => fixed.indexOf(s) !== i));
  if (duplicates.length)
    warnings.push(
      `Compétence reçue deux fois : ${duplicates.map((s) => SKILLS[s]?.[0]).join(", ")}. La règle permet d’en choisir une autre à la place : change tes compétences de classe ou utilise un historique personnalisé.`,
    );
  for (const spec of pickSpecs(c)) {
    const valid = spec.selected.filter((x) => x in spec.options);
    if (valid.length < spec.count && !(spec.optional && !valid.length)) warnings.push(`${spec.title} : ${valid.length}/${spec.count} choix.`);
    if (valid.length !== spec.selected.length) warnings.push(`${spec.title} : un choix n’est plus admissible.`);
  }
  const race = raceOf(c);
  if (race.grants?.feat && !c.raceFeat) warnings.push(`${race.name} : choisis ton don.`);
  if (c.raceFeat && !FEATS[c.raceFeat]) warnings.push("Le don d’origine est inconnu.");
  for (const l of c.levels) {
    const k = classLevelAt(c, l.level),
      lc = CLASSES[l.classId];
    if (!lc) {
      errors.push(`Niveau ${l.level} : classe inconnue.`);
      continue;
    }
    if (l.level > 1 && (!Number.isInteger(l.hpDie) || l.hpDie < 1 || l.hpDie > lc.die))
      errors.push(`Niveau ${l.level} : le dé de PV doit être entre 1 et ${lc.die}.`);
    if (isASI(l.classId, k) && !l.asi) errors.push(`Il manque l’amélioration ou le don du niveau ${l.level}.`);
    if (l.asi?.mode === "ability") {
      const atLevel = clone(c);
      atLevel.levels = c.levels.filter((x) => x.level <= l.level);
      atLevel.adjustments.abilities = { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };
      atLevel.custom.traits = [];
      const totals = abilityTotals(atLevel);
      if (classLevel(atLevel, "barbarian") >= 20) {
        totals.str -= 4;
        totals.con -= 4;
      }
      for (const key of new Set([l.asi.a, l.asi.b]))
        if (totals[key] > 20)
          errors.push(`Niveau ${l.level} : l’amélioration fait dépasser 20 en ${ABILITIES[key]?.name}. Choisis une autre caractéristique.`);
    }
    if (l.asi?.mode === "feat") {
      if (!l.asi.featId) warnings.push(`Niveau ${l.level} : choisis un don.`);
      else if (l.asi.featId === "custom" && !l.asi.featName?.trim()) errors.push(`Nomme le don du niveau ${l.level}.`);
      else if (FEATS[l.asi.featId]) {
        const before = clone(c);
        before.levels = c.levels.filter((x) => x.level < l.level);
        if (before.levels.length) {
          const p = meetsPrereq(before, FEATS[l.asi.featId].prereq);
          if (!p.ok) warnings.push(`Don ${FEATS[l.asi.featId].name} (niveau ${l.level}) : prérequis non rempli (${p.reasons.join(", ")}).`);
        }
      }
    }
    if (k === lc.subLevel && !c.subclasses?.[l.classId]) warnings.push(`${lc.name} niveau ${k} : choisis ta sous-classe (${lc.subLabel.toLowerCase()}).`);
    if (k === 1 && l.level > 1) {
      const before = clone(c);
      before.levels = c.levels.filter((x) => x.level < l.level);
      const opt = multiclassOptions(before).find((o) => o.classId === l.classId);
      if (opt && !opt.ok) warnings.push(`Multiclasse ${lc.name} : prérequis non remplis (${opt.reasons.join(" ; ")}).`);
    }
    for (const choice of choicesFor(c, l.level)) {
      const v = l.choices?.[choice.key];
      if (choice.type === "text") {
        if (!String(v || "").trim()) warnings.push(`Niveau ${l.level} : ${choice.title} à préciser.`);
        continue;
      }
      const arr = _asArray(v);
      if (arr.length !== choice.count || new Set(arr).size !== arr.length)
        warnings.push(`Niveau ${l.level} : ${choice.title}, ${choice.count} choix attendu(s).`);
      if (arr.some((key) => !(key in choice.options)))
        warnings.push(`Niveau ${l.level} : un choix de ${choice.title} n’est plus admissible. Corrige-le dans Évolution.`);
    }
  }
  for (const id of allChoices(c, "invocations")) {
    const inv = INVOCATIONS?.[id];
    if (inv?.requires && !c.spells.known.includes(inv.requires)) warnings.push(`${inv.name} nécessite de connaître ${spellById(c, inv.requires)?.name || inv.requires}.`);
  }
  if (!d.armorProficient) warnings.push("Armure ou bouclier non maîtrisé : désavantage aux tests, attaques et sauvegardes de FOR et DEX, et aucun sort possible.");
  if (d.strTooLow) warnings.push("Force insuffisante pour cette armure : vitesse réduite de 3 m.");
  for (const a of d.attacks) if (!a.proficient) warnings.push(`${a.weapon.name} non maîtrisée : pas de bonus de maîtrise à l’attaque.`);
  if (c.equipment.shield && d.attacks[0] && (d.attacks[0].weapon.two || d.attacks[0].twoHands))
    warnings.push("Ton arme principale se tient à deux mains : elle ne s’utilise pas en même temps qu’un bouclier.");
  if (raceOf(c).size === "P" && d.attacks.some((a) => a.weapon.heavy)) warnings.push("Une créature de petite taille a le désavantage avec une arme lourde.");
  if (classLevel(c, "druid") && ["chain", "plate", "splint", "scale", "halfplate", "breastplate", "chainshirt", "ring"].includes(c.equipment.armor))
    warnings.push("Les druides ne portent ni armure ni bouclier en métal. Valide le matériau avec le MJ.");
  // Magie, classe par classe
  const list = catalogue(c),
    always = domainSpells(c);
  for (const sc of spellcasters(c)) {
    const limits = spellLimits(c, sc.classId),
      mine = (ids) => ids.filter((id) => spellClassOf(c, id) === sc.classId),
      known = list.filter((s) => mine(c.spells.known).includes(s.id)),
      cantrips = known.filter((s) => s.level === 0),
      leveled = known.filter((s) => s.level > 0),
      prepared = list.filter((s) => mine(c.spells.prepared).includes(s.id) && !always.includes(s.id));
    const label = spellcasters(c).length > 1 ? `${sc.label} : ` : "";
    if (cantrips.length !== limits.cantrips) warnings.push(`${label}sorts mineurs ${cantrips.length}/${limits.cantrips}.`);
    if (limits.mode === "known" && leveled.length !== limits.known) warnings.push(`${label}sorts connus ${leveled.length}/${limits.known}.`);
    if (limits.mode === "book" && leveled.length < limits.known)
      warnings.push(`${label}grimoire ${leveled.length}/${limits.known} (minimum, hors sorts copiés en aventure).`);
    if (["prepared", "book"].includes(limits.mode) && prepared.length > limits.prepared)
      warnings.push(`${label}${prepared.length} sorts préparés pour un maximum de ${limits.prepared}.`);
    if (limits.mode === "book" && prepared.some((s) => !c.spells.known.includes(s.id))) warnings.push("Un sort préparé n’est pas dans ton grimoire.");
    if (!c.spells.allowExceptions) {
      const outside = [...known, ...prepared].filter((s) => !canReadySpell(c, s, sc.classId));
      if (sc.classId === "bard") {
        const secrets = known.filter((s) => s.level > 0 && !s.classes.includes("bard") && !s.custom).length;
        if (secrets > limits.secrets) warnings.push(`Barde : ${secrets} sorts hors liste pour ${limits.secrets} secrets magiques.`);
      }
      if (outside.some((s) => sc.classId !== "bard" || s.level > limits.maxLevel))
        warnings.push(`${label}certains sorts ne correspondent plus à ta classe ou à ton niveau.`);
      if (sc.type === "third") {
        const off = leveled.filter((s) => !limits.schools.includes(s.school)).length;
        if (off > limits.offSchool) warnings.push(`${sc.label} : ${off} sorts hors des écoles ${limits.schools.join(" et ")} pour ${limits.offSchool} permis.`);
      }
    }
  }
  if (c.spells.allowExceptions) warnings.push("Exceptions du MJ activées : les quotas et listes de sorts ne sont pas bloquants.");
  for (const [classId, sub] of Object.entries(c.subclasses || {}))
    if (sub === "custom" && classLevel(c, classId) >= CLASSES[classId].subLevel && !c.customSubclasses?.[classId]?.name?.trim())
      warnings.push(`${CLASSES[classId].name} : nomme la sous-classe maison et décris ses aptitudes.`);
  if (strict) errors.push(...warnings.filter((w) => w.startsWith("Niveau ") && !w.includes("à préciser")));
  return { errors: _uniq(errors), warnings: _uniq(warnings) };
}

/* ---------------------------------------------------------- état de jeu */
function reconcileState(c, previous = null) {
  const d = derive(c);
  if (previous) {
    const oldMax = derive(previous).maxHp;
    c.state.hp = previous.state.hp <= 0 ? 0 : clamp(previous.state.hp + d.maxHp - oldMax, 0, d.maxHp);
  } else c.state.hp = clamp(c.state.hp, 0, d.maxHp);
  c.state.tempHp = clamp(c.state.tempHp, 0, 9999);
  const spent = {};
  for (const h of d.hitDice) if (h.spent) spent[h.die] = h.spent;
  c.state.hitDiceSpent = spent;
  for (const [k, v] of Object.entries(c.state.slotsUsed)) c.state.slotsUsed[k] = clamp(v, 0, d.slots[Number(k) - 1] || 0);
  c.state.pactUsed = clamp(c.state.pactUsed || 0, 0, d.pact?.count || 0);
  const res = resources(c);
  for (const key of Object.keys(c.state.resourcesUsed)) {
    const r = res.find((x) => x.id === key);
    if (r) c.state.resourcesUsed[key] = clamp(c.state.resourcesUsed[key], 0, r.max ?? 99999);
  }
  if (c.state.hp === 0 || c.state.conditions.some((s) => ["Inconscient", "Neutralisé", "Paralysé", "Étourdi", "Pétrifié"].includes(s)))
    c.state.concentration = null;
  c.classId = primaryClassId(c);
  c.updatedAt = new Date().toISOString();
  return c;
}
function restCharacter(c, type, { fed = true } = {}) {
  const next = clone(c),
    d = derive(next);
  if (type === "long" && next.state.hp <= 0) return reconcileState(next);
  for (const r of resources(next)) if ((type === "long" || r.reset === "short") && r.reset !== "none") next.state.resourcesUsed[r.id] = 0;
  next.state.pactUsed = 0;
  if (type === "long") {
    next.state.exhaustion = fed ? Math.max(0, next.state.exhaustion - 1) : next.state.exhaustion;
    next.state.hp = derive(next).maxHp;
    next.state.tempHp = 0;
    next.state.slotsUsed = {};
    let regain = Math.max(1, Math.floor(d.level / 2));
    const spent = { ...next.state.hitDiceSpent };
    for (const h of d.hitDice) {
      const back = Math.min(regain, spent[h.die] || 0);
      spent[h.die] = (spent[h.die] || 0) - back;
      regain -= back;
    }
    next.state.hitDiceSpent = spent;
    next.state.deathSuccess = 0;
    next.state.deathFailure = 0;
    next.state.concentration = null;
  } else if (classLevel(c, "sorcerer") >= 20)
    next.state.resourcesUsed.sorcery = Math.max(0, (next.state.resourcesUsed.sorcery || 0) - 4);
  return reconcileState(next);
}
function damageCharacter(c, amount) {
  const next = clone(c),
    damage = Math.max(0, Math.floor(amount)),
    absorbed = Math.min(damage, next.state.tempHp),
    remaining = damage - absorbed;
  next.state.tempHp -= absorbed;
  next.state.hp = Math.max(0, next.state.hp - remaining);
  if (next.state.hp === 0) next.state.concentration = null;
  return { character: next, absorbed, remaining, concentrationDC: Math.max(10, Math.floor(damage / 2)) };
}
function statDiff(before, after) {
  const b = before ? derive(before) : null,
    a = derive(after),
    rows = [];
  const add = (label, key) => {
    if (!b || a[key] !== b[key]) rows.push({ label, before: b?.[key], after: a[key] });
  };
  add("Niveau", "level");
  add("PV maximum", "maxHp");
  add("Classe d’armure", "ac");
  add("Bonus de maîtrise", "prof");
  add("Initiative", "initiative");
  add("Vitesse (m)", "speed");
  add("Attaque principale", "attack");
  if (a.spellDC !== null || (b && b.spellDC !== null)) add("DD des sorts", "spellDC");
  if (b && (a.damageDice !== b.damageDice || a.damageBonus !== b.damageBonus))
    rows.push({ label: "Dégâts principaux", before: `${b.damageDice} ${signed(b.damageBonus)}`, after: `${a.damageDice} ${signed(a.damageBonus)}` });
  if (b && a.extraAttacks !== b.extraAttacks) rows.push({ label: "Attaques par action", before: b.extraAttacks, after: a.extraAttacks });
  for (const key of Object.keys(ABILITIES))
    if (b && a.saves[key] !== b.saves[key]) rows.push({ label: `Sauvegarde ${ABILITIES[key].short}`, before: b.saves[key], after: a.saves[key] });
  for (const k of Object.keys(ABILITIES))
    if (!b || a.scores[k] !== b.scores[k]) rows.push({ label: ABILITIES[k].name, before: b?.scores[k], after: a.scores[k] });
  for (const [k, [name]] of Object.entries(SKILLS))
    if (b && a.skills[k] !== b.skills[k]) rows.push({ label: name, before: b.skills[k], after: a.skills[k] });
  const slots = Math.max(a.slots.length, b?.slots?.length || 0);
  for (let i = 0; i < slots; i++)
    if (!b || (a.slots[i] || 0) !== (b.slots[i] || 0))
      rows.push({ label: `Emplacements · niveau ${i + 1}`, before: b ? b.slots[i] || 0 : undefined, after: a.slots[i] || 0 });
  if (a.pact && (!b || !b.pact || a.pact.count !== b.pact.count || a.pact.slotLevel !== b.pact.slotLevel))
    rows.push({ label: "Emplacements de pacte", before: b?.pact ? `${b.pact.count} × niv. ${b.pact.slotLevel}` : undefined, after: `${a.pact.count} × niv. ${a.pact.slotLevel}` });
  for (const sc of spellcasters(after)) {
    const limits = spellLimits(after, sc.classId),
      old = before && spellcasters(before).some((x) => x.classId === sc.classId) ? spellLimits(before, sc.classId) : null;
    const prefix = spellcasters(after).length > 1 ? `${sc.label} · ` : "";
    for (const [k, label] of [
      ["cantrips", "sorts mineurs"],
      ["prepared", "sorts préparables"],
      ["known", limits.mode === "book" ? "grimoire (minimum)" : "sorts connus"],
    ])
      if ((limits[k] || old?.[k]) && (!old || limits[k] !== old[k]))
        rows.push({ label: prefix + label.charAt(0).toUpperCase() + label.slice(1), before: old?.[k], after: limits[k] });
  }
  return rows;
}

/* ------------------------------------------------------- forme sauvage */
const formatCR = (cr) => (cr === 0.125 ? "1/8" : cr === 0.25 ? "1/4" : cr === 0.5 ? "1/2" : String(cr));
/** Limites de la forme sauvage (2014) : FP maximum, nage dès le niveau 4, vol dès le niveau 8. */
function wildShapeRules(c) {
  const level = classLevel(c, "druid");
  if (level < 2) return null;
  const moon = hasSubclass(c, "druid", "moon");
  const base = level >= 8 ? 1 : level >= 4 ? 0.5 : 0.25;
  return {
    level,
    moon,
    maxCR: moon ? (level >= 6 ? Math.floor(level / 3) : 1) : base,
    swim: level >= 4,
    fly: level >= 8,
    hours: Math.floor(level / 2),
    uses: level >= 20 ? null : 2,
    elemental: moon && level >= 10,
  };
}
/** Statut d’une bête pour ce druide : vue ou non, et admissible ou non (avec les raisons). */
function beastStatus(c, beast, rules = wildShapeRules(c)) {
  const seen = beast.common ? !c.beasts?.unseen?.includes(beast.id) : !!c.beasts?.seen?.includes(beast.id);
  const reasons = [];
  if (!rules) reasons.push("forme sauvage au niveau 2 de druide");
  else {
    if (beast.cr > rules.maxCR) reasons.push(`FP ${formatCR(beast.cr)}, maximum ${formatCR(rules.maxCR)}`);
    if (beast.speed.swim && !rules.swim) reasons.push("nage : druide 4");
    if (beast.speed.fly && !rules.fly) reasons.push("vol : druide 8");
  }
  return { seen, eligible: !reasons.length, reasons };
}
function beastCatalogue() {
  return BEASTS;
}

/* -------------------------------------------------------------------- dés */
function rollDie(sides) {
  if (!Number.isInteger(sides) || sides < 2 || sides > 100) throw new Error("Dé invalide.");
  const values = new Uint32Array(1),
    limit = Math.floor(4294967296 / sides) * sides;
  let value;
  do {
    globalThis.crypto.getRandomValues(values);
    value = values[0];
  } while (value >= limit);
  return (value % sides) + 1;
}
function rollDamage(notation, bonus = 0) {
  const m = /^(\d{1,2})d(4|6|8|10|12|20|100)$/.exec(notation);
  if (!m) return { dice: [], total: Math.max(0, (Number(notation) || 0) + bonus) };
  const count = Number(m[1]);
  if (count > 30) throw new Error("Trop de dés.");
  const dice = Array.from({ length: count }, () => rollDie(Number(m[2])));
  return { dice, total: Math.max(0, dice.reduce((a, b) => a + b, 0) + bonus) };
}
/** 4d6, on garde les trois meilleurs. */
function rollAbilityScore() {
  const dice = [rollDie(6), rollDie(6), rollDie(6), rollDie(6)];
  const kept = [...dice].sort((a, b) => b - a).slice(0, 3);
  return { dice, total: kept.reduce((a, b) => a + b, 0) };
}

/* -------------------------------------------------- équipement de départ */
function itemInfo(id) {
  if (WEAPONS?.[id]) return { kind: "weapon", ...WEAPONS[id] };
  if (ARMORS?.[id]) return { kind: ARMORS[id].type === "shield" ? "shield" : "armor", ...ARMORS[id] };
  if (GEAR?.[id]) return { kind: GEAR[id].kind || "gear", ...GEAR[id] };
  if (TOOLS?.[id]) return { kind: "tool", ...TOOLS[id] };
  return null;
}
const _WILDCARD_PREFERRED = ["longsword", "battleaxe", "warhammer", "rapier", "mace", "quarterstaff", "spear", "handaxe", "lute", "smiths-tools", "dice-set"];
function wildcardOptions(token) {
  const list = _wildcardOptions(token);
  return list.sort((a, b) => {
    const pa = _WILDCARD_PREFERRED.indexOf(a[0]),
      pb = _WILDCARD_PREFERRED.indexOf(b[0]);
    return (pa < 0 ? 99 : pa) - (pb < 0 ? 99 : pb) || a[1].localeCompare(b[1], "fr");
  });
}
function _wildcardOptions(token) {
  const all = Object.entries(WEAPONS || {}).filter(([id]) => id !== "unarmed");
  const weapons = (group, melee) =>
    all.filter(([, w]) => w.group === group && (melee === undefined || !w.ranged === melee)).map(([id, w]) => [id, w.name]);
  switch (token) {
    case "@simple":
      return weapons("simple");
    case "@simple-melee":
      return weapons("simple", true);
    case "@martial":
      return weapons("martial");
    case "@martial-melee":
      return weapons("martial", true);
    case "@instrument":
      return Object.entries(TOOLS || {}).filter(([, t]) => t.kind === "music").map(([id, t]) => [id, t.name]);
    case "@artisan":
      return Object.entries(TOOLS || {}).filter(([, t]) => t.kind === "artisan").map(([id, t]) => [id, t.name]);
    case "@gaming":
      return Object.entries(TOOLS || {}).filter(([, t]) => t.kind === "gaming").map(([id, t]) => [id, t.name]);
    default:
      return [];
  }
}
/** Liste des objets du kit de départ selon les choix faits (classe). */
function startingItems(c) {
  const groups = CLASS_EXTRAS?.[primaryClassId(c)]?.startingEquipment || [],
    kit = c.startKit || { choices: {}, picks: {} },
    items = [];
  groups.forEach((group, g) => {
    const o = clamp(kit.choices?.[g] ?? 0, 0, group.options.length - 1),
      option = group.options[o];
    (option?.items || []).forEach(([id, qty = 1], i) => {
      if (id.startsWith("@")) {
        for (let n = 0; n < qty; n++) {
          const resolved = kit.picks?.[`${g}-${o}-${i}-${n}`] || wildcardOptions(id)[0]?.[0],
            info = itemInfo(resolved);
          if (info) items.push({ id: resolved, qty: 1, info });
        }
      } else {
        const info = itemInfo(id);
        if (info) items.push({ id, qty, info });
      }
    });
  });
  return items;
}
/** Applique le kit de départ : inventaire + équipement actif. */
function applyStartingKit(c) {
  const next = clone(c);
  if (next.startKit?.mode === "gold") {
    next.startKit.mode = "done";
    return next;
  }
  const items = startingItems(next),
    weapons = [],
    inventory = [];
  let armor = null,
    shield = false;
  for (const it of items) {
    if (it.info.kind === "armor" && !armor) armor = it.id;
    else if (it.info.kind === "shield") shield = true;
    else if (it.info.kind === "weapon" && weapons.length < 4 && !weapons.some((w) => w.id === it.id)) weapons.push({ id: it.id, magic: 0, twoHands: false });
    const existing = inventory.find((x) => x.ref === it.id);
    if (existing) existing.qty += it.qty;
    else
      inventory.push({
        id: uid(),
        ref: it.id,
        name: it.info.name,
        qty: it.qty,
        weight: Number(it.info.weight) || 0,
        description: it.info.contents || "",
      });
  }
  const bg = backgroundOf(next);
  if (bg.equipment) inventory.push({ id: uid(), ref: "", name: `Affaires d’historique (${bg.name})`, qty: 1, weight: 0, description: bg.equipment });
  next.inventory = [...inventory, ...next.inventory.filter((x) => !x.ref)];
  if (armor) next.equipment.armor = armor;
  next.equipment.shield = shield;
  if (weapons.length) next.equipment.weapons = weapons;
  next.gold = (Number(next.gold) || 0) + (Number(bg.gold) || 0);
  next.startKit.mode = "done";
  return next;
}

/* -------------------------------------------------------------- import */
// Validation explicite : refuse proprement plutôt que de réparer en silence.
function validateImport(input) {
  const plain = (o) => o !== null && typeof o === "object" && !Array.isArray(o);
  function safeTree(v, depth = 0) {
    if (depth > 24) throw new Error("Structure trop profonde.");
    if (typeof v === "string" && v.length > 50000) throw new Error("Texte trop long.");
    if (Array.isArray(v)) {
      if (v.length > 1500) throw new Error("Tableau trop grand.");
      v.forEach((x) => safeTree(x, depth + 1));
    } else if (plain(v)) {
      for (const [k, x] of Object.entries(v)) {
        if (["__proto__", "constructor", "prototype"].includes(k)) throw new Error("Clé interdite.");
        safeTree(x, depth + 1);
      }
    } else if (typeof v === "number" && !Number.isFinite(v)) throw new Error("Nombre invalide.");
  }
  safeTree(input);
  if (!plain(input) || ![1, SCHEMA_VERSION].includes(input.schemaVersion))
    throw new Error(`Version de personnage incompatible (versions 1 et ${SCHEMA_VERSION} acceptées).`);
  const raw = migrateCharacter(input);
  if (!(raw.raceId in RACES) && raw.raceId !== "custom") throw new Error("Origine inconnue.");
  const c = clone(raw),
    defaults = createCharacter(raw.levels?.[0]?.classId in CLASSES ? raw.levels[0].classId : "fighter");
  for (const key of Object.keys(defaults)) if (c[key] === undefined) c[key] = clone(defaults[key]);
  for (const key of ["picks", "customRace", "background", "subclasses", "customSubclasses", "details", "spells", "equipment", "startKit", "beasts", "custom", "adjustments", "state"])
    if (!plain(c[key])) throw new Error(`Objet manquant : ${key}.`);
  const errors = [];
  for (const key of ["name", "alignment", "languages", "biography", "notes", "id", "abilityMethod"])
    if (typeof c[key] !== "string") errors.push(`Texte invalide : ${key}.`);
  if (!Array.isArray(c.levels) || c.levels.length < 1 || c.levels.length > 20) errors.push("Un personnage doit avoir de 1 à 20 niveaux.");
  else
    c.levels.forEach((l, i) => {
      if (!plain(l) || l.level !== i + 1 || !(l.classId in CLASSES) || !Number.isInteger(l.hpDie) || l.hpDie < 1 || l.hpDie > CLASSES[l.classId].die || !plain(l.choices))
        errors.push("Historique de niveaux invalide.");
      if (l.asi && (!plain(l.asi) || !["ability", "feat"].includes(l.asi.mode) || (l.asi.mode === "ability" && (!(l.asi.a in ABILITIES) || !(l.asi.b in ABILITIES)))))
        errors.push("Amélioration invalide.");
      if (l.asi?.mode === "feat" && l.asi.featId && l.asi.featId !== "custom" && !FEATS[l.asi.featId]) errors.push("Don inconnu.");
    });
  if (!plain(c.abilities) || Object.keys(ABILITIES).some((a) => !Number.isInteger(c.abilities[a]) || c.abilities[a] < 1 || c.abilities[a] > 20))
    errors.push("Caractéristiques de base invalides.");
  for (const [arr, label] of [
    [c.skills, "compétences"],
    [c.background.skills, "historique"],
    [c.spells.known, "sorts connus"],
    [c.spells.prepared, "préparation"],
    [c.state.conditions, "états"],
    [c.equipment.weapons, "armes"],
  ])
    if (!Array.isArray(arr)) errors.push(`Liste invalide : ${label}.`);
  if (errors.length) throw new Error(_uniq(errors).join(" "));
  for (const [k, v] of Object.entries(c.picks))
    if (typeof k !== "string" || !Array.isArray(v) || v.some((x) => typeof x !== "string")) throw new Error("Choix invalides.");
  for (const [k, v] of Object.entries(c.subclasses))
    if (!(k in CLASSES) || typeof v !== "string" || (v !== "custom" && !SUBCLASSES?.[k]?.[v])) throw new Error("Sous-classe inconnue.");
  if (c.raceFeat !== null && (typeof c.raceFeat !== "string" || !FEATS[c.raceFeat])) throw new Error("Don d’origine inconnu.");
  for (const key of ["seen", "unseen"])
    if (!Array.isArray(c.beasts[key]) || c.beasts[key].length > 500 || c.beasts[key].some((v) => typeof v !== "string")) throw new Error("Liste de bêtes invalide.");
  if (c.background.id !== "custom" && !BACKGROUNDS[c.background.id]) throw new Error("Historique inconnu.");
  for (const list of [c.skills, c.background.skills]) if (list.some((s) => !Object.hasOwn(SKILLS, s))) throw new Error("Compétence inconnue.");
  for (const list of [c.skills, c.background.skills, c.spells.known, c.spells.prepared])
    if (list.some((v) => typeof v !== "string") || new Set(list).size !== list.length) throw new Error("Liste contenant des doublons.");
  if (c.state.conditions.some((s) => !Object.hasOwn(CONDITIONS, s))) throw new Error("État inconnu.");
  if (!(c.equipment.armor in ARMORS)) throw new Error("Armure inconnue.");
  if (c.equipment.weapons.length > 6 || c.equipment.weapons.some((w) => !plain(w) || !weaponOf(w.id) || !Number.isFinite(Number(w.magic || 0))))
    throw new Error("Arme inconnue.");
  for (const k of ["shield", "mageArmor"]) if (typeof c.equipment[k] !== "boolean") throw new Error("Option d’équipement invalide.");
  if (!Number.isFinite(c.equipment.armorBonus)) throw new Error("Bonus d’armure invalide.");
  if (!Array.isArray(c.inventory) || !Array.isArray(c.custom.traits) || !Array.isArray(c.custom.spells)) throw new Error("Inventaire ou contenu maison invalide.");
  if (!plain(c.spells.arcana) || !plain(c.spells.sources) || !plain(c.state.slotsUsed) || !plain(c.state.resourcesUsed) || !plain(c.state.hitDiceSpent) || !plain(c.adjustments.abilities))
    throw new Error("Compteurs invalides.");
  for (const k of ["hp", "tempHp", "exhaustion", "deathSuccess", "deathFailure", "pactUsed"])
    if (!Number.isFinite(c.state[k]) || c.state[k] < 0) throw new Error(`Compteur invalide : ${k}.`);
  if (c.state.exhaustion > 6 || c.state.deathSuccess > 3 || c.state.deathFailure > 3) throw new Error("État de jeu hors limites.");
  for (const values of [c.state.slotsUsed, c.state.resourcesUsed, c.state.hitDiceSpent])
    if (Object.values(values).some((v) => !Number.isInteger(v) || v < 0)) throw new Error("Dépenses de ressources invalides.");
  const text = (value, label, max = 20000) => {
    if (typeof value !== "string" || value.length > max) throw new Error(`Texte invalide : ${label}.`);
  };
  const finite = (value, label, min = -100000, max = 100000) => {
    if (!Number.isFinite(value) || value < min || value > max) throw new Error(`Nombre invalide : ${label}.`);
  };
  text(c.name, "nom", 80);
  if (!c.name.trim()) throw new Error("Le nom est vide.");
  if (!["standard", "points", "manual", "rolled"].includes(c.abilityMethod)) throw new Error("Méthode de caractéristiques invalide.");
  for (const k of ["name", "featureName", "feature", "equipment", "description", "tools", "languages"]) text(c.background[k] ?? "", `historique / ${k}`);
  for (const v of Object.values(c.customSubclasses)) if (!plain(v)) throw new Error("Sous-classe maison invalide.");
  for (const v of Object.values(c.details)) text(v, "détails", 4000);
  if (c.state.concentration !== null) text(c.state.concentration, "concentration", 300);
  finite(c.xp, "expérience", 0, 1e8);
  finite(c.gold, "monnaie", 0, 1e8);
  if (typeof c.spells.allowExceptions !== "boolean") throw new Error("Option de magie invalide.");
  for (const value of Object.values(c.spells.arcana)) text(value, "arcanum", 300);
  for (const value of Object.values(c.spells.sources)) if (!(value in CLASSES)) throw new Error("Classe de sort inconnue.");
  for (const key of ["hp", "ac", "speed", "initiative", "attack", "damage"]) if (!Number.isFinite(c.adjustments[key])) throw new Error("Ajustement invalide.");
  for (const a of Object.keys(ABILITIES)) if (!Number.isFinite(c.adjustments.abilities[a])) throw new Error("Bonus de caractéristique invalide.");
  if (c.raceId === "custom") {
    text(c.customRace.name, "origine", 100);
    text(c.customRace.description || "", "origine / description");
    if (!["M", "P"].includes(c.customRace.size)) throw new Error("Taille inconnue.");
    finite(Number(c.customRace.speed), "vitesse de l’origine", 0, 300);
    for (const a of Object.keys(ABILITIES)) finite(Number(c.customRace.bonuses?.[a] || 0), `bonus d’origine / ${a}`, -20, 20);
  }
  for (const s of c.custom.spells)
    if (!plain(s) || typeof s.id !== "string" || typeof s.name !== "string" || typeof s.description !== "string" || !Number.isInteger(s.level) || s.level < 0 || s.level > 9 || !Array.isArray(s.classes))
      throw new Error("Un sort maison est invalide.");
  const seenIds = new Set(SPELLS.map((s) => s.id));
  for (const spell of c.custom.spells) {
    if (seenIds.has(spell.id)) throw new Error("Deux sorts ont le même identifiant.");
    seenIds.add(spell.id);
    for (const key of ["school", "casting", "range", "duration", "components"]) text(spell[key], `sort / ${key}`, 1000);
    if (typeof spell.concentration !== "boolean" || typeof spell.ritual !== "boolean" || spell.classes.some((k) => !Object.hasOwn(CLASSES, k)))
      throw new Error("Options de sort invalides.");
    spell.custom = true;
    spell.source = "homebrew";
  }
  for (const t of c.custom.traits) {
    if (!plain(t) || typeof t.id !== "string" || typeof t.name !== "string" || typeof t.description !== "string") throw new Error("Une aptitude maison est invalide.");
    for (const k of ["hp", "ac", "speed"]) finite(t[k] ?? 0, `aptitude / ${k}`, -999, 999);
    finite(t.maxUses ?? 0, "compteur maison", 0, 9999);
    if (!plain(t.bonuses) || !["short", "long", "none"].includes(t.reset) || typeof t.active !== "boolean") throw new Error("Configuration d’aptitude invalide.");
  }
  for (const item of c.inventory) {
    if (!plain(item) || typeof item.id !== "string" || typeof item.name !== "string" || !Number.isFinite(item.qty) || item.qty < 0 || !Number.isFinite(item.weight) || item.weight < 0)
      throw new Error("Un objet est invalide.");
    text(item.description || "", "description d’objet");
  }
  for (const l of c.levels) {
    if (l.asi?.mode === "feat") {
      text(l.asi.featName || "", "nom du don", 150);
      text(l.asi.featDescription || "", "description du don");
    }
    for (const value of Object.values(l.choices))
      if (typeof value !== "string" && (!Array.isArray(value) || value.some((v) => typeof v !== "string"))) throw new Error("Choix de niveau invalide.");
  }
  c.classId = primaryClassId(c);
  const calculated = derive(c);
  if (["maxHp", "ac", "speed", "attack", "initiative"].some((k) => !Number.isFinite(calculated[k]))) throw new Error("La fiche contient un calcul invalide.");
  return c;
}


// Module : storage
const STORAGE_KEY = "compagnon-srd51-v1";
const emptyState = () => ({
  schemaVersion: SCHEMA_VERSION,
  revision: 0,
  characters: [],
  activeId: null,
  snapshots: [],
  draft: null,
  lastExport: null,
});
/** Met à niveau une sauvegarde complète (personnages, historique, brouillon) sans perte. */
function migrateState(data) {
  if (!data || data.schemaVersion === SCHEMA_VERSION) return data;
  if (data.schemaVersion !== 1) return data;
  const next = clone(data);
  next.characters = (next.characters || []).map(migrateCharacter);
  next.snapshots = (next.snapshots || []).map((s) => ({ ...s, character: migrateCharacter(s.character) }));
  next.draft = null;
  next.schemaVersion = SCHEMA_VERSION;
  return next;
}
class LocalStore {
  constructor() {
    this.db = null;
    this.mode = "memory";
    this.memory = emptyState();
  }
  async open() {
    try {
      this.db = await new Promise((resolve, reject) => {
        const request = indexedDB.open("compagnon-srd51", 1);
        request.onupgradeneeded = () => {
          if (!request.result.objectStoreNames.contains("app")) request.result.createObjectStore("app");
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
        request.onblocked = () => reject(new Error("Base locale bloquée par un autre onglet."));
      });
      this.mode = "indexeddb";
      this.db.onversionchange = () => this.db.close();
    } catch {
      try {
        localStorage.setItem(`${STORAGE_KEY}-probe`, "1");
        localStorage.removeItem(`${STORAGE_KEY}-probe`);
        this.mode = "localstorage";
      } catch {
        this.mode = "memory";
      }
    }
    return this.read();
  }
  async read() {
    let data;
    if (this.mode === "indexeddb")
      data = await new Promise((resolve, reject) => {
        const tx = this.db.transaction("app", "readonly"),
          r = tx.objectStore("app").get("state");
        r.onsuccess = () => resolve(r.result);
        r.onerror = () => reject(r.error);
      });
    else if (this.mode === "localstorage") {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          data = JSON.parse(raw);
        } catch {
          throw new Error("La sauvegarde locale est illisible. Ne vide pas le navigateur ; essaie un export ou une sauvegarde antérieure.");
        }
      }
    } else data = this.memory;
    if (data && ![1, SCHEMA_VERSION].includes(data.schemaVersion))
      throw new Error("Cette sauvegarde nécessite une version plus récente de Compagnon. Aucune donnée n’a été modifiée.");
    return clone(migrateState(data) || emptyState());
  }
  async write(state, expectedRevision) {
    const payload = clone(state);
    payload.revision = expectedRevision + 1;
    payload.schemaVersion = SCHEMA_VERSION;
    if (this.mode === "indexeddb")
      await new Promise((resolve, reject) => {
        const tx = this.db.transaction("app", "readwrite"),
          objectStore = tx.objectStore("app"),
          r = objectStore.get("state");
        let conflict = false;
        r.onsuccess = () => {
          if ((r.result?.revision || 0) !== expectedRevision) {
            conflict = true;
            tx.abort();
            return;
          }
          objectStore.put(payload, "state");
        };
        tx.oncomplete = resolve;
        tx.onerror = () => reject(tx.error || new Error("Échec de la sauvegarde."));
        tx.onabort = () => reject(new Error(conflict ? "CONFLICT" : "Sauvegarde interrompue. Vérifie l’espace disponible."));
      });
    else if (this.mode === "localstorage") {
      const current = await this.read();
      if (current.revision !== expectedRevision) throw new Error("CONFLICT");
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } else this.memory = payload;
    return payload;
  }
}


// Module : icons
/** Petites icônes vectorielles dessinées pour l’interface. Aucun fichier de police. */
const iconPaths={
 gem:'<path d="m12 2 9 6v8l-9 6-9-6V8Z"/><path d="m3 8 9 4 9-4M12 2v10m0 0v10M3 16l9-4 9 4"/>',
 user:'<circle cx="12" cy="8" r="4"/><path d="M4 22v-3a8 8 0 0 1 16 0v3"/>',users:'<circle cx="9" cy="8" r="3"/><path d="M2 21v-3a7 7 0 0 1 14 0v3m1-16a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 5v2"/>',
 swords:'<path d="m4 3 4 1 12 14-3 3L4 7Zm16 0-4 1-4 5m-4 4-4 5 3 3 5-6M2 17l5 5m10 0 5-5"/>',
 axe:'<path d="m5 21 13-17M12 4c3-3 7-2 9 0l-7 8c-3-1-4-4-2-8Z"/>',
 music:'<path d="M9 18V5l11-2v13M9 8l11-2"/><ellipse cx="6" cy="18" rx="3" ry="2"/><ellipse cx="17" cy="16" rx="3" ry="2"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
 paw:'<ellipse cx="5.5" cy="10.5" rx="2" ry="2.6"/><ellipse cx="9.5" cy="5.5" rx="2" ry="2.6"/><ellipse cx="14.5" cy="5.5" rx="2" ry="2.6"/><ellipse cx="18.5" cy="10.5" rx="2" ry="2.6"/><path d="M12 12.5c-3 0-6.5 4-6.5 6.6 0 2.2 2.6 2.6 6.5 1.6 3.9 1 6.5.6 6.5-1.6 0-2.6-3.5-6.6-6.5-6.6Z"/>',
 leaf:'<path d="M20 3C8 1 1 9 5 16s16 4 15-13Z"/><path d="m3 22 13-13M7 18v-7m5 2 6 1"/>',
 wind:'<path d="M3 8h12a3 3 0 1 0-3-3M2 12h17a3 3 0 1 1-3 3M3 16h6a3 3 0 1 1-3 3"/>',
 shield:'<path d="M12 2 3 6v6c0 5 9 10 9 10s9-5 9-10V6Z"/><path d="m8 12 3 3 5-6"/>',
 bow:'<path d="M5 2c15 6 15 14 0 20L16 12ZM3 12h19m-4-3 4 3-4 3"/>',
 dagger:'<path d="m15 3 6-1-1 6L9 19l-4-4Z"/><path d="m3 13 8 8M3 21l4-4"/>',
 flame:'<path d="M13 2c1 7-5 6-4 11-3-1-3-3-3-3-6 7-1 12 6 12 8 0 12-9 1-20Z"/>',
 moon:'<path d="M20 15A9 9 0 0 1 9 3a9 9 0 1 0 11 12Z"/><path d="M18 2v5m-2.5-2.5h5"/>',
 book:'<path d="M12 5C8 2 4 3 2 4v16c4-2 7-1 10 1 3-2 6-3 10-1V4c-2-1-6-2-10 1Zm0 0v16"/>',
 sparkles:'<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5ZM20 2v4m-2-2h4"/>',
 heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-8.8 1 5.5 5.5 0 0 0-8.8 7L12 21l8.8-8.4a5.5 5.5 0 0 0 0-8Z"/>',
 bag:'<path d="M7 7c1-3 1-4 0-5h10c-1 1-1 2 0 5L21 17c1 4-3 5-9 5S2 21 3 17Z"/><path d="M7 7h10m-7 8 2 2 2-2"/>',
 tree:'<path d="M5 3v13c0 3 3 4 6 4h8M5 9h12M5 15h8"/><circle cx="19" cy="9" r="2"/><circle cx="15" cy="15" r="2"/><circle cx="21" cy="20" r="2"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',check:'<path d="m4 12 5 5L20 6"/>',x:'<path d="m6 6 12 12M6 18 18 6"/>',
 arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',back:'<path d="M20 12H4m6-6-6 6 6 6"/>',chevron:'<path d="m9 5 7 7-7 7"/>',down:'<path d="m5 9 7 7 7-7"/>',
 edit:'<path d="m15 3 6 6-11 11-7 1 1-7ZM12 6l6 6"/>',trash:'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/>',
 download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',upload:'<path d="M12 16V4m-5 5 5-5 5 5M4 16v5h16v-5"/>',
 settings:'<path d="m9 3-.5 3-3 1-2-1-2 4 2 2-.5 3 2 3 3-1 3 1 1 3h4l1-3 3-1 2-3-1-3 2-2-2-4-3 1-2-1-.5-3Z"/><circle cx="12" cy="12" r="3"/>',
 more:'<circle cx="4" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="20" cy="12" r="1"/>',
 search:'<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/>',warning:'<path d="m12 3 10 18H2Z"/><path d="M12 9v5m0 3v1"/>',
 dice:'<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M7 7h.01M17 7h.01M12 12h.01M7 17h.01M17 17h.01" stroke-width="3"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',zap:'<path d="m13 2-9 12h7l-1 8 10-13h-7Z"/>',
 cloud:'<path d="M7 18a5 5 0 1 1 0-10 7 7 0 0 1 13 3 4 4 0 0 1-1 7Z"/>',
 lock:'<rect x="4" y="10" width="16" height="12" rx="3"/><path d="M7 10V7a5 5 0 0 1 10 0v3m-5 5v3"/>',
 phone:'<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 5h4m-3 14h2"/>',
 note:'<path d="M5 2h10l5 5v15H5Zm10 0v6h5M8 12h9m-9 4h9"/>',
 undo:'<path d="M3 10h12a6 6 0 0 1 0 12M3 10l5-5m-5 5 5 5"/>',
 compass:'<circle cx="12" cy="12" r="9"/><path d="m16 8-2 6-6 2 2-6Z"/>',eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
 flag:'<path d="M5 22V3m0 0c5-5 9 5 15 0v11c-6 5-10-5-15 0"/>',copy:'<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M5 16H3V3h13v2"/>',
 print:'<path d="M6 8V2h12v6M6 17H3V8h18v9h-3M6 14h12v8H6Z"/>'
};
function icon(name,size=22){return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name]||iconPaths.sparkles}</svg>`;}
const esc = value => String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));


// Module : app

const root = document.getElementById("app"),
  modalRoot = document.getElementById("modal-root"),
  toastRoot = document.getElementById("toast-root");
const localStore = new LocalStore();
let appData = emptyState(),
  saveQueue = Promise.resolve(),
  toastTimeout = null,
  draftTimeout = null,
  deferredInstall = null,
  swRegistration = null,
  lastFocus = null;
const ui = {
  route: "home",
  wizard: null,
  levelFlow: null,
  modal: null,
  form: null,
  pending: null,
  magic: null,
  spellQuery: "",
  spellLevel: "all",
  spellTab: "mine",
  editorQuery: "",
  editorLevel: "all",
  rollMode: "normal",
  saving: false,
  online: navigator.onLine,
  update: false,
  noteDraft: "",
  fatal: null,
  amount: 5,
  rest: null,
  cast: null,
  imported: null,
  featQuery: "",
  catalogQuery: "",
  catalogTab: "gear",
  editorClass: null,
  attackIndex: 0,
  exportText: "",
  importText: "",
  beastTab: "available",
  beastSort: { key: "cr", dir: -1 },
  beastQuery: "",
};
const navItems = [
  ["sheet", "user", "Fiche"],
  ["spells", "book", "Grimoire"],
  ["inventory", "bag", "Inventaire"],
  ["progression", "tree", "Évolution"],
  ["notes", "note", "Journal"],
  ["homebrew", "sparkles", "Maison"],
];
function navFor(c) {
  if (!c || classLevel(c, "druid") < 2) return navItems;
  const items = [...navItems];
  items.splice(2, 0, ["wildshape", "paw", "Formes animales"]);
  return items;
}
const routeNames = {
  home: "Mes personnages",
  sheet: "Fiche de personnage",
  spells: "Grimoire",
  inventory: "Inventaire",
  progression: "Évolution",
  notes: "Journal",
  homebrew: "Contenus maison",
  settings: "Réglages",
  more: "À portée de main",
  wildshape: "Formes animales",
};
const LIVERY = {
  barbarian: "#9b2f2b",
  bard: "#7d3a6f",
  cleric: "#8a6417",
  druid: "#2d6650",
  fighter: "#45536a",
  monk: "#a65a17",
  paladin: "#2b4a92",
  ranger: "#37613a",
  rogue: "#2a2f3a",
  sorcerer: "#a3402a",
  warlock: "#553672",
  wizard: "#1e4b76",
};
const liveryOf = (c) => (c ? LIVERY[primaryClassId(c)] || "#22356b" : "#22356b");
function blason() {
  return '<svg class="blason" viewBox="0 0 84 96" aria-hidden="true"><path d="M5 5h74v38c0 27-17 41-37 49C22 84 5 70 5 43z" fill="#c9962f"/><path d="M11 11h62v32c0 22-14 34-31 41-17-7-31-19-31-41z" fill="none" stroke="#1a2232" stroke-opacity=".28" stroke-width="1.5"/></svg>';
}
const IS_ARTIFACT = !!window.COMPANION_ARTIFACT;
function currentTheme() {
  try {
    return localStorage.getItem("compagnon-theme") || "auto";
  } catch {
    return "auto";
  }
}
function applyTheme(theme = currentTheme()) {
  if (theme === "light" || theme === "dark") document.documentElement.dataset.theme = theme;
  else delete document.documentElement.dataset.theme;
}
applyTheme();
const activeCharacter = () => appData.characters.find((c) => c.id === appData.activeId) || null;
const formId = (path) => "f-" + path.replaceAll(".", "-");
const dateLabel = (date) =>
  new Date(date).toLocaleString("fr-FR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
function button(label, action, extra = "", kind = "") {
  return `<button type="button" class="btn ${kind}" data-action="${action}" ${extra}>${label}</button>`;
}
function smallIcon(name, action, label, extra = "") {
  return `<button type="button" class="icon-btn" data-action="${action}" aria-label="${esc(label)}" title="${esc(label)}" ${extra}>${icon(name, 18)}</button>`;
}
function notice(text, type = "") {
  return `<div class="notice ${type}">${icon(type === "error" || type === "warning" ? "warning" : "info", 18)}<div>${text}</div></div>`;
}
function field(label, path, value, type = "text", help = "", attributes = "") {
  return `<label class="field" for="${formId(path)}"><span>${esc(label)}</span>${type === "textarea" ? `<textarea id="${formId(path)}" data-bind="${path}" ${attributes}>${esc(value)}</textarea>` : `<input id="${formId(path)}" data-bind="${path}" type="${type}" value="${esc(value)}" ${type === "number" ? 'inputmode="decimal"' : ""} ${attributes}>`}${help ? `<small>${help}</small>` : ""}</label>`;
}
function selectField(label, path, value, options, help = "", attributes = "") {
  return `<label class="field" for="${formId(path)}"><span>${esc(label)}</span><select id="${formId(path)}" data-bind="${path}" ${attributes}>${Object.entries(
    options,
  )
    .map(([k, v]) => `<option value="${esc(k)}" ${String(value) === String(k) ? "selected" : ""}>${esc(v)}</option>`)
    .join("")}</select>${help ? `<small>${help}</small>` : ""}</label>`;
}
function checkField(label, path, value, help = "") {
  return `<label class="check-field" for="${formId(path)}"><input id="${formId(path)}" type="checkbox" data-bind="${path}" ${value ? "checked" : ""}><span>${esc(label)}${help ? `<small>${help}</small>` : ""}</span></label>`;
}
function skillChips(c, path, selected, options, limit, taken = new Set()) {
  return `<div class="chip-grid">${options
    .map((k) => {
      const on = selected.includes(k),
        isTaken = taken.has(k) && !on;
      return `<label class="check-chip ${on ? "checked" : ""} ${isTaken ? "taken" : ""}" ${isTaken ? 'title="Déjà maîtrisée par ton origine ou ton historique"' : ""}><input type="checkbox" data-array="${path}" value="${esc(k)}" data-limit="${limit}" ${on ? "checked" : ""} ${(selected.length >= limit && !on) || isTaken ? "disabled" : ""}>${esc(SKILLS[k][0])}</label>`;
    })
    .join("")}</div>`;
}
function issueList(issues, type = "warning") {
  if (!issues.length) return "";
  return notice(
    issues
      .slice(0, 5)
      .map((s) => esc(s))
      .join("<br>") +
      (issues.length > 5
        ? `<details><summary>${issues.length - 5} autres points à vérifier</summary>${issues.slice(5).map(esc).join("<br>")}</details>`
        : ""),
    type,
  );
}
function impactHtml(before, after) {
  const rows = statDiff(before, after);
  return rows.length
    ? `<div class="impact-grid">${rows.map((r) => `<div class="impact-cell">${esc(r.label)}<div class="impact-numbers">${r.before !== undefined ? `<span class="before">${r.before ?? "∅"}</span>${icon("arrow", 15)}` : ""}<strong>${r.after ?? "∅"}</strong></div></div>`).join("")}</div>`
    : notice("Les valeurs calculées ne changent pas. Tes textes, choix ou sélections seront bien enregistrés.");
}
function miniPreview(c) {
  const d = derive(c);
  return `<aside class="preview-panel" style="--livery:${liveryOf(c)}"><div class="eyebrow">Aperçu du personnage</div><div class="preview-name">${esc(c.name || "Ton aventurier")}</div><div class="preview-meta">${esc(d.race.name)} · ${esc(classSummary(c))}</div><div class="preview-stats"><div class="preview-stat">${d.maxHp}<span>PV maximum</span></div><div class="preview-stat">${d.ac}<span>Classe d’armure</span></div><div class="preview-stat">${signed(d.initiative)}<span>Initiative</span></div><div class="preview-stat">${d.spellDC ?? signed(d.attack)}<span>${d.spellDC ? "DD des sorts" : "Attaque principale"}</span></div></div><div class="preview-abilities">${Object.entries(ABILITIES)
    .map(([a, v]) => `<span><small>${v.short}</small>${d.scores[a]}</span>`)
    .join("")}</div><div class="preview-tip">${icon("eye", 16)} Les valeurs suivent tes choix. Rien n’est enregistré avant validation.</div></aside>`;
}
function render() {
  const focused = document.activeElement,
    focusId = focused?.id,
    selection =
      focused && "selectionStart" in focused ? { start: focused.selectionStart, end: focused.selectionEnd } : null;
  const openDetails = [...document.querySelectorAll("details[data-detail][open]")].map((el) => el.dataset.detail),
    modalScroll = modalRoot.querySelector(".modal-body")?.scrollTop || 0;
  if (ui.fatal) {
    root.innerHTML = `<div class="fatal">${icon("warning", 35)}<h1>Les données restent à l’abri.</h1><p class="section-gap">${esc(ui.fatal)}</p>${button("Réessayer", "reload", "", "primary")}</div>`;
    return;
  }
  const c = activeCharacter(),
    wizardActive = !!ui.wizard || !!ui.levelFlow;
  root.innerHTML = `<a class="skip" href="#main-content">Aller au contenu</a><div class="app-shell" style="--livery:${liveryOf(c)}"><aside class="sidebar"><button class="brand" data-action="navigate" data-route="home"><span class="brand-mark">${icon("gem", 30)}</span><span><span class="brand-name">Compagnon</span><span class="brand-sub">L’aventure, en poche</span></span></button><div class="sidebar-label">À la table</div>${navFor(c).map(([route, ico, label]) => `<button class="nav-btn ${ui.route === route && !wizardActive ? "active" : ""}" data-action="navigate" data-route="${route}" ${!c ? "disabled" : ""}>${icon(ico, 20)}${label}</button>`).join("")}<div class="sidebar-bottom"><button class="nav-btn ${ui.route === "home" && !wizardActive ? "active" : ""}" data-action="navigate" data-route="home">${icon("users", 20)}Mes personnages</button><button class="nav-btn ${ui.route === "settings" ? "active" : ""}" data-action="navigate" data-route="settings">${icon("settings", 20)}Réglages & sauvegardes</button><div class="local-note">${icon("lock", 19)}<div><strong>Sur ton appareil.</strong>Sans compte. Sans publicité.<br>Tes fiches restent chez toi.</div></div><div class="side-footer"><span>SRD 5.1 · 2014</span><span>v${APP_VERSION}</span></div></div></aside><div class="main-shell"><header class="topbar"><div class="top-title">L’atelier <span>/</span> <strong>${wizardActive ? "Création & choix" : routeNames[ui.route]}</strong></div><button class="brand mobile-brand" data-action="navigate" data-route="home"><span class="brand-mark">${icon("gem", 26)}</span><span><span class="brand-name">Compagnon</span><span class="brand-sub">SRD 5.1 · 2014</span></span></button><div class="top-actions"><span class="save-status"><span class="status-dot" style="${localStore.mode === "memory" ? "background:#b85532" : ""}"></span><span class="status-text">${ui.saving ? "Enregistrement…" : localStore.mode === "memory" ? "Mémoire temporaire" : ui.online ? "Enregistré sur cet appareil" : "Hors ligne · données locales"}</span></span>${c ? smallIcon("download", "export-one", "Exporter ce personnage") : ""}${smallIcon("phone", "install", "Installer l’application")}</div></header>${ui.update ? `<div class="update-banner">Une nouvelle version est prête. Tes fiches seront conservées.${button("Mettre à jour", "update-app", "", "small-btn")}</div>` : ""}${localStore.mode === "memory" ? notice("Le navigateur bloque le stockage. <strong>Les changements ne survivront pas à la fermeture.</strong> Exporte tes fiches et ouvre l’application hors navigation privée.", "error") : ""}<main class="main ${wizardActive ? "wizard-active" : ""}" id="main-content" tabindex="-1">${ui.wizard ? renderWizard() : ui.levelFlow ? renderLevelFlow() : renderPage(c)}${c ? printSheet(c) : ""}</main></div></div><nav class="mobile-nav" aria-label="Navigation principale">${[
    ["sheet", "user", "Fiche"],
    ["spells", "book", "Sorts"],
    ["inventory", "bag", "Sac"],
    ["progression", "tree", "Évolution"],
    ["more", "more", "Plus"],
  ]
    .map(
      ([route, ico, label]) =>
        `<button data-action="navigate" data-route="${route}" class="${ui.route === route && !wizardActive ? "active" : ""}" ${!c && route !== "more" ? "disabled" : ""}>${icon(ico)}${label}</button>`,
    )
    .join("")}</nav>`;
  modalRoot.innerHTML = renderModal();
  document.body.classList.toggle("modal-open", !!ui.modal);
  for (const key of openDetails) {
    const detail = [...document.querySelectorAll("details[data-detail]")].find((el) => el.dataset.detail === key);
    if (detail) detail.open = true;
  }
  if (focusId) {
    const input = document.getElementById(focusId);
    if (input) {
      input.focus({ preventScroll: true });
      if (selection && selection.start !== null && typeof input.setSelectionRange === "function")
        try {
          input.setSelectionRange(selection.start, selection.end);
        } catch {}
    }
  }
  const mb = modalRoot.querySelector(".modal-body");
  if (mb) mb.scrollTop = modalScroll;
}
function renderPage(c) {
  if (ui.route === "home") return renderHome();
  if (ui.route === "settings") return renderSettings();
  if (ui.route === "more") return renderMore(c);
  if (!c) return renderHome();
  return (
    {
      sheet: renderSheet,
      spells: renderSpells,
      inventory: renderInventory,
      progression: renderProgression,
      notes: renderNotes,
      homebrew: renderHomebrew,
      wildshape: renderWildShape,
    }[ui.route] || renderSheet
  )(c);
}
function renderHome() {
  return `${IS_ARTIFACT ? notice("<strong>Version d’essai en ligne.</strong>Tes fiches restent dans ce navigateur, sans garantie de conservation. Pour jouer avec ta table, installe la version hébergée et transfère tes fiches avec « Copier la sauvegarde » puis « Coller une sauvegarde ».", "warning") + '<div class="spacer"></div>' : ""}<div class="page-head"><div><div class="eyebrow">Ton carnet d’aventures</div><h1>Mes personnages</h1><p class="page-subtitle">Des choix qui ont du sens. Une fiche qui te suit.</p></div>${appData.characters.length ? button(`${icon("plus", 18)} Nouveau`, "new-character", "", "primary") : ""}</div>${appData.draft && !ui.wizard ? `<div class="notice section-gap">${icon("note", 19)}<div><strong>Un brouillon t’attend : ${esc(appData.draft.draft?.name || "personnage sans nom")}</strong>La fiche validée n’a pas été modifiée.<div class="actions">${button("Reprendre", "resume-draft", "", "small-btn")}${button("Oublier le brouillon", "discard-draft", "", "small-btn ghost")}</div></div></div><div class="spacer"></div>` : ""}${
    !appData.characters.length
      ? `<section class="welcome"><div class="welcome-copy"><p class="welcome-kicker">Une histoire commence par un choix</p><h1>À toi d’écrire la prochaine page.</h1><p>Choisis une classe pour commencer, ou crée ton personnage pas à pas : origine, classe, historique, caractéristiques, équipement et sorts. Tout reste modifiable.</p><div class="actions">${button(`${icon("plus", 18)} Créer mon personnage`, "new-character", "", "primary")}${button("Voir un exemple", "demo", "", "ghost on-dark")}</div></div><div class="welcome-shields" role="list" aria-label="Commencer avec une classe">${Object.entries(CLASSES)
          .map(
            ([id, k]) =>
              `<button type="button" role="listitem" class="shield-btn" data-action="new-character" data-class="${id}" style="--livery:${LIVERY[id]}" aria-label="Créer un personnage ${esc(k.name.toLowerCase())}"><span class="shield-shape"><svg viewBox="0 0 84 96" aria-hidden="true"><path d="M5 5h74v38c0 27-17 41-37 49C22 84 5 70 5 43z" fill="var(--livery)" stroke="#c9962f" stroke-width="3"/></svg>${icon(k.icon, 22)}</span><span class="shield-name">${k.name}</span></button>`,
          )
          .join("")}</div></section><ul class="promise-list">${[
          ["eye", "Chaque choix montre son effet sur la fiche avant d’être validé."],
          ["tree", "Sous-classes, dons et multiclassage jusqu’au niveau 20."],
          ["lock", "Tout reste sur ton appareil, même sans connexion."],
        ]
          .map(([ico, text]) => `<li>${icon(ico, 20)}<span>${text}</span></li>`)
          .join("")}</ul>`
      : `<div class="grid-2">${appData.characters
          .map((c) => {
            const d = derive(c);
            return `<article class="char-card" style="--livery:${liveryOf(c)}"><div class="char-card-head"><div class="avatar small-avatar">${blason()}${icon(d.cls.icon, 22)}</div><div><h3>${esc(c.name)}</h3><div class="meta">${esc(d.race.name)} · ${esc(classSummary(c))}</div></div></div><div class="card-footer"><div class="card-stats"><span><strong>${c.state.hp}/${d.maxHp}</strong> PV</span><span><strong>${d.ac}</strong> CA</span><span><strong>${d.level}</strong> niv.</span></div>${button(`Ouvrir ${icon("arrow", 16)}`, "open-character", `data-id="${esc(c.id)}"`, "small-btn green")}</div></article>`;
          })
          .join("")}</div>`
  }<div class="actions section-gap">${button(`${icon("upload", 17)} Importer une sauvegarde`, "import", "", "ghost")}${appData.characters.length ? button(`${icon("download", 17)} Sauvegarder toutes mes fiches`, "export-all", "", "ghost") : ""}</div><div class="footnote">Règles de 2014 : 12 classes, ${Object.values(SUBCLASSES).reduce((n, x) => n + Object.keys(x).length, 0)} sous-classes, ${Object.keys(RACES).length} origines, ${Object.keys(BACKGROUNDS).length} historiques, ${Object.keys(FEATS).length} dons et ${SPELLS.length} sorts. Résumés originaux : une aide de jeu, pas le texte des livres.</div>`;
}
function renderSheet(c) {
  const d = derive(c),
    res = resources(c),
    issues = characterIssues(c),
    hpPercent = clamp((c.state.hp / d.maxHp) * 100, 0, 100),
    subs = subclassSummary(c);
  return `<section class="hero"><div class="hero-identity"><div class="avatar">${blason()}${icon(d.cls.icon, 36)}</div><div><div class="eyebrow">${esc(d.race.name)}, ${esc(d.background.name.toLocaleLowerCase("fr-FR"))}</div><h1>${esc(c.name)}</h1><p class="subtitle">${esc(classSummary(c))}${subs ? `, ${esc(subs)}` : ""}</p></div></div><div class="hero-actions">${button(`${icon("tree", 17)} ${d.level < 20 ? "Passer au niveau " + (d.level + 1) : "Niveau 20 atteint"}`, "level-up", d.level >= 20 ? "disabled" : "", "primary")}${button(`${icon("edit", 16)} Modifier`, "edit-character", "", "ghost")}</div></section><div class="stats-strip">${[
    ["shield", d.ac, "Classe d’armure", "ac-info"],
    ["zap", signed(d.initiative), "Initiative", "roll-initiative"],
    ["compass", `${String(d.speed).replace(".", ",")} <small>m</small>`, "Vitesse", ""],
    ["gem", signed(d.prof), "Maîtrise", ""],
  ]
    .map(
      ([ico, value, label, action]) =>
        `<${action ? `button type="button" data-action="${action}"` : "div"} class="stat-box"><span class="stat-symbol">${icon(ico, 20)}</span><div><div class="stat-value">${value}</div><div class="stat-label">${label}</div></div></${action ? "button" : "div"}>`,
    )
    .join("")}</div><div class="split sheet-panels"><div class="stack"><section class="panel hp-panel"><div class="panel-head"><h2 class="panel-title">${icon("heart", 19)} Points de vie</h2><span class="pill ${c.state.hp === 0 ? "red" : ""}">${c.state.hp === 0 ? "À 0 PV" : c.state.hp < d.maxHp / 2 ? "Blessé" : "Prêt à l’aventure"}</span></div><div class="hp-line"><div class="hp-reading"><strong class="hp-current">${c.state.hp}</strong><span class="hp-max">/ ${d.maxHp}</span></div><button class="link-btn hp-temp" data-action="temporary-hp"><span><strong>${c.state.tempHp ? `+${c.state.tempHp}` : "0"}</strong>PV temporaires ${icon("edit", 12)}</span></button></div><div class="bar ${hpPercent < 35 ? "low" : ""}"><span style="width:${hpPercent}%"></span></div><div class="small muted">Dés de vie : ${hitDiceLabel(d)}${c.state.exhaustion >= 4 ? " · maximum réduit par l’épuisement" : ""}</div><div class="hp-actions">${button(`${icon("minus", 18)} Dégâts`, "damage", "", "ghost")}${button(`${icon("plus", 18)} Soins`, "heal", "", "green")}</div>${c.state.hp === 0 ? renderDeathSaves(c) : ""}</section><section class="panel ability-panel"><div class="panel-head"><h2 class="panel-title">${icon("gem", 19)} Caractéristiques</h2><span class="tiny muted">Touche pour lancer</span></div><div class="ability-grid">${Object.entries(ABILITIES)
    .map(
      ([a, info]) =>
        `<button class="ability" data-action="roll-ability" data-key="${a}" aria-label="Test de ${info.name}, ${signed(d.mods[a])}"><div class="label">${info.short}</div><div class="modifier">${signed(d.mods[a])}</div><span class="score">${d.scores[a]}</span></button>`,
    )
    .join("")}</div><div class="section-title section-gap"><h3>Jets de sauvegarde</h3>${d.aura ? `<span class="pill">Aura +${d.aura} incluse</span>` : ""}</div><div class="save-grid">${Object.entries(ABILITIES)
    .map(
      ([a, v]) =>
        `<button class="save-btn ${d.saveProficiencies.includes(a) ? "proficient" : ""}" data-action="roll-save" data-key="${a}">${v.short}<strong>${signed(d.saves[a])}</strong></button>`,
    )
    .join("")}</div>${renderAttacks(c, d)}</section><section class="panel skills-panel"><div class="panel-head"><h2 class="panel-title">${icon("eye", 19)} Compétences</h2><span class="pill">Perception passive ${d.passivePerception}</span></div><div class="skill-columns">${[0, 9]
    .map(
      (start) =>
        `<div class="skill-list">${Object.entries(SKILLS)
          .slice(start, start + 9)
          .map(
            ([key, [name, ability]]) =>
              `<button class="skill-row" data-action="roll-skill" data-key="${key}"><span class="skill-rank ${d.ranks[key] === 2 ? "expert" : d.ranks[key] === 1 ? "proficient" : ""}"></span><span class="skill-ability">${ABILITIES[ability].short}</span><span class="skill-name">${name}</span><span class="skill-mod">${signed(d.skills[key])}</span></button>`,
          )
          .join("")}</div>`,
    )
    .join("")}</div><div class="tiny muted section-gap">Point vert : maîtrise. Point doré : expertise.</div></section>${renderProficiencies(d)}</div><div class="stack"><section class="panel resource-panel"><div class="panel-head"><h2 class="panel-title">${icon("sun", 19)} Ressources</h2><span class="tiny muted">Restantes</span></div><div class="resources">${
    res.length
      ? res
          .map(
            (r) =>
              `<div class="resource-row"><div><button class="link-btn resource-name" data-action="resource-info" data-key="${esc(r.id)}">${esc(r.name)}</button><div class="resource-reset">${r.reset === "short" ? "Repos court ou long" : r.reset === "long" ? "Repos long" : "Récupération manuelle"}</div></div><div class="counter">${r.max === null ? '<span class="counter-value">∞</span>' : `${smallIcon("minus", "resource-use", `Dépenser ${r.name}`, `data-key="${esc(r.id)}" data-delta="1" ${r.used >= r.max ? "disabled" : ""}`)}<span class="counter-value">${r.max - r.used}<small> / ${r.max}</small></span>${smallIcon("plus", "resource-use", `Récupérer ${r.name}`, `data-key="${esc(r.id)}" data-delta="-1" ${r.used <= 0 ? "disabled" : ""}`)}`}</div></div>`,
          )
          .join("")
      : '<p class="small muted">Pas de ressource à suivre à ce niveau.</p>'
  }</div>${wildShapeRules(c) ? `<button type="button" class="link-btn beast-link" data-action="navigate" data-route="wildshape">${icon("paw", 15)} Voir les formes animales disponibles</button>` : ""}<div class="rest-actions">${button(`${icon("clock", 16)} Repos court`, "rest-short")}${button(`${icon("moon", 16)} Repos long`, "rest-long")}</div></section>${
    d.slots.length || d.pact
      ? `<section class="panel magic-panel"><div class="panel-head"><h2 class="panel-title">${icon("sparkles", 18)} Emplacements de sorts</h2><button class="link-btn" data-action="navigate" data-route="spells">Grimoire ${icon("chevron", 13)}</button></div>${renderSlots(c)}${c.state.concentration ? `<div class="notice purple section-gap">${icon("sparkles", 17)}<div><strong>Concentration</strong>${esc(c.state.concentration)}<br><button class="link-btn" data-action="end-concentration">Mettre fin</button></div></div>` : ""}</section>`
      : ""
  }<section class="panel conditions-panel"><div class="panel-head"><h2 class="panel-title">${icon("flag", 18)} États & vigilance</h2><button class="link-btn" data-action="conditions">Gérer</button></div>${c.state.conditions.length ? `<div class="condition-chips">${c.state.conditions.map((s) => `<span class="pill red">${esc(s)}</span>`).join("")}</div>` : '<p class="small muted">Aucun état actif.</p>'}<div class="summary-row"><span>Épuisement</span><strong>${c.state.exhaustion} / 6</strong></div>${c.state.exhaustion ? `<p class="tiny muted">Effets cumulés : ${EXHAUSTION.slice(1, c.state.exhaustion + 1).join(" ; ")}.</p>` : ""}</section><section class="panel features-panel"><div class="panel-head"><h2 class="panel-title">${icon("book", 18)} Aptitudes</h2><span class="tiny muted">Touche pour lire</span></div>${featureGroups(c, d)
    .map(
      ([title, items], g) =>
        `<div class="feature-group-title">${esc(title)}</div>${items
          .map(
            (f, i) =>
              `<details class="feature-item" data-detail="feature-${c.id}-${g}-${i}"><summary><span>${esc(f.name)}${f.level ? `<span class="feature-meta"> · niv. ${f.classLevel ?? f.level}</span>` : ""}</span><span class="feature-arrow">${icon("chevron", 14)}</span></summary><div class="detail-copy">${esc(f.description)}<div class="tiny" style="margin-top:8px">${esc(f.source || "")}</div></div></details>`,
          )
          .join("")}`,
    )
    .join("")}</section></div></div>${issues.errors.length || issues.warnings.length ? `<details class="section-gap no-print issues-box" data-detail="issues"><summary class="small muted">${icon("info", 15)} ${issues.errors.length + issues.warnings.length} point(s) à vérifier sur la fiche</summary><div class="section-gap">${issueList(issues.errors, "error")}${issueList(issues.warnings)}</div></details>` : ""}`;
}
function renderDeathSaves(c) {
  return `<div class="section-gap"><div class="small"><strong>Sauvegardes contre la mort</strong></div><div class="summary-row"><span>Réussites</span><div class="actions">${[1, 2, 3].map((n) => `<button class="condition-chip ${c.state.deathSuccess >= n ? "active" : ""}" data-action="death-mark" data-kind="deathSuccess" data-value="${n}" aria-label="${n} réussite(s)">${c.state.deathSuccess >= n ? "●" : "○"}</button>`).join("")}</div></div><div class="summary-row"><span>Échecs</span><div class="actions">${[1, 2, 3].map((n) => `<button class="condition-chip ${c.state.deathFailure >= n ? "active" : ""}" data-action="death-mark" data-kind="deathFailure" data-value="${n}" aria-label="${n} échec(s)">${c.state.deathFailure >= n ? "●" : "○"}</button>`).join("")}</div></div>${button(`${icon("dice", 16)} Lancer la sauvegarde`, "death-roll", "", "small-btn")}<p class="tiny muted">${c.state.deathFailure >= 3 ? "Trois échecs : personnage mort. Vérifie les effets particuliers avec le MJ." : c.state.deathSuccess >= 3 ? "Stabilisé : plus de sauvegardes jusqu’à de nouveaux dégâts." : "Un 1 naturel vaut deux échecs. Un 20 naturel rend 1 PV."}</p></div>`;
}
function renderSlots(c) {
  const d = derive(c);
  const regular = d.slots
    .map((max, i) =>
      max
        ? `<div><div class="slot-label">Niveau ${i + 1}</div><div class="slots">${Array.from({ length: max }, (_, index) => `<button class="slot ${index < (c.state.slotsUsed[i + 1] || 0) ? "used" : ""}" data-action="toggle-slot" data-level="${i + 1}" data-index="${index}" aria-label="Emplacement niveau ${i + 1}, ${index < (c.state.slotsUsed[i + 1] || 0) ? "dépensé" : "disponible"}"></button>`).join("")}</div></div>`
        : "",
    )
    .join("");
  const pact = d.pact
    ? `<div class="pact-slots"><div class="slot-label">Pacte · niveau ${d.pact.slotLevel}</div><div class="slots">${Array.from({ length: d.pact.count }, (_, index) => `<button class="slot pact ${index < (c.state.pactUsed || 0) ? "used" : ""}" data-action="toggle-pact" data-index="${index}" aria-label="Emplacement de pacte, ${index < (c.state.pactUsed || 0) ? "dépensé" : "disponible"}"></button>`).join("")}</div></div>`
    : "";
  return `<div class="slot-groups">${regular}${pact}</div><div class="tiny muted" style="margin-top:13px">Losange plein : disponible. Touche un emplacement pour corriger sa dépense.${d.pact ? " Les emplacements de pacte reviennent au repos court." : ""}</div>`;
}
function spellCard(c, s, { editor = false, target = "", scope = "main", classId = null } = {}) {
  const st = spellStatus(c, s, editor ? classId : null),
    limits = classId ? spellLimits(c, classId) : spellLimits(c, st.owner),
    multi = spellcasters(c).length > 1;
  const selected = st.knownAny || st.preparedAny || st.always || st.arcanum || !!st.innate;
  let controls = "";
  if (editor) {
    const isArcanum = classId === "warlock" && s.level >= 6 && s.classes.includes("warlock") && limits.arcana.includes(s.level);
    if (st.always) controls = '<span class="pill purple">Toujours préparé</span>';
    else if (isArcanum)
      controls = button(st.arcanum ? `${icon("check", 13)} Arcanum choisi` : "Choisir cet arcanum", "select-spell", `data-id="${esc(s.id)}" data-target="${target}" data-kind="arcana"`, "small-btn " + (st.arcanum ? "active" : ""));
    else if ((st.knownAny || st.preparedAny) && !st.known && !st.prepared)
      controls = `<span class="tiny muted">Déjà choisi pour ${esc(CLASSES[st.owner]?.name || "une autre classe")}</span>`;
    else if (canReadySpell(c, s, classId)) {
      if (s.level === 0 || ["known", "book"].includes(limits.mode))
        controls += button(
          st.known ? `${icon("check", 13)} ${limits.mode === "book" && s.level > 0 ? "Au grimoire" : "Appris"}` : limits.mode === "book" && s.level > 0 ? "Ajouter au grimoire" : "Apprendre",
          "select-spell",
          `data-id="${esc(s.id)}" data-target="${target}" data-kind="known"`,
          "small-btn " + (st.known ? "active" : ""),
        );
      if (s.level > 0 && ["prepared", "book"].includes(limits.mode))
        controls += button(
          st.prepared ? `${icon("check", 13)} Préparé` : "Préparer",
          "select-spell",
          `data-id="${esc(s.id)}" data-target="${target}" data-kind="prepared" ${limits.mode === "book" && !st.known ? "disabled" : ""}`,
          "small-btn " + (st.prepared ? "active" : ""),
        );
    } else controls = '<span class="tiny muted">Hors de ta liste ou de ton niveau. Exception du MJ nécessaire.</span>';
  } else {
    const ownerMode = spellLimits(c, st.owner).mode;
    const ready =
      (s.level === 0 && (st.knownAny || st.innate)) ||
      (s.level > 0 && ownerMode === "known" && st.knownAny) ||
      st.preparedAny ||
      st.always ||
      st.arcanum ||
      (st.innate && !st.innate.ritualOnly);
    if (ready) controls = button(`${icon("sparkles", 14)} Lancer`, "cast", `data-id="${esc(s.id)}"`, "small-btn");
    else if (s.ritual && ((st.knownAny && ["wizard", "bard"].includes(st.owner)) || st.innate?.ritualOnly))
      controls = button("Lancer en rituel", "cast", `data-id="${esc(s.id)}" data-ritual="1"`, "small-btn");
    else controls = button(st.knownAny ? "Préparer ce sort" : "Gérer le grimoire", "edit-magic", `data-query="${esc(s.name)}"`, "small-btn ghost");
  }
  const tags = [
    s.concentration ? '<span class="pill purple">Concentration</span>' : "",
    s.ritual ? '<span class="pill outline">Rituel</span>' : "",
    s.custom ? '<span class="pill sand">Maison</span>' : "",
    st.always ? '<span class="pill purple">Toujours préparé</span>' : "",
    st.innate ? `<span class="pill sand">${esc(st.innate.label)}</span>` : "",
    !editor && st.preparedAny ? '<span class="pill">Préparé</span>' : "",
    !editor && multi && (st.knownAny || st.preparedAny) ? `<span class="pill outline">${esc(CLASSES[st.owner]?.name || "")}</span>` : "",
    !editor && st.knownAny && s.level > 0 && spellLimits(c, st.owner).mode === "book" && !st.preparedAny ? '<span class="pill outline">Non préparé</span>' : "",
  ].join("");
  return `<article class="spell-card ${selected ? "selected" : ""}"><details data-detail="${scope}-spell-${esc(s.id)}"><summary><span class="spell-level">${s.level === 0 ? "✧" : s.level}</span><div style="flex:1;min-width:0"><div class="spell-title">${esc(s.name)}</div><div class="spell-sub">${esc(s.school || "Sort maison")} · ${esc(s.casting || "1 action")}</div><div class="spell-tags">${tags}</div></div>${icon("down", 15)}</summary><div class="spell-copy"><div class="spell-data"><div><b>Portée</b>${esc(s.range)}</div><div><b>Durée</b>${esc(s.duration)}</div><div style="grid-column:1/-1"><b>Composantes</b>${esc(s.components || "À préciser")}</div><div style="grid-column:1/-1"><b>Classes</b>${esc(s.classes.map((k) => CLASSES[k]?.name).filter(Boolean).join(", ") || "Selon la table")}</div></div><p class="preserve">${esc(s.description)}</p><div class="tiny muted" style="margin-top:11px">${s.custom ? "Contenu personnalisé de ta table." : s.source === "phb" ? "Résumé original d’un sort du Manuel des joueurs 2014." : `Résumé adapté du SRD 5.1. <a href="${SRD_URL}" target="_blank" rel="noopener noreferrer">Texte officiel ↗</a>`}</div></div></details><div class="spell-controls">${controls}</div></article>`;
}
function renderSpells(c) {
  const d = derive(c),
    all = catalogue(c),
    innates = innateSpells(c).map((s) => s.id),
    always = domainSpells(c),
    ids = new Set([...c.spells.known, ...c.spells.prepared, ...always, ...innates, ...Object.values(c.spells.arcana)]),
    casters = spellcasters(c);
  const query = ui.spellQuery.toLocaleLowerCase("fr-FR");
  let list = all.filter(
    (s) =>
      (ui.spellTab === "mine" ? ids.has(s.id) : c.spells.allowExceptions || casters.some((sc) => hasSpellAccess(c, s, sc.classId))) &&
      (ui.spellLevel === "all" || s.level === Number(ui.spellLevel)) &&
      s.name.toLocaleLowerCase("fr-FR").includes(query),
  );
  list.sort((a, b) => a.level - b.level || a.name.localeCompare(b.name, "fr"));
  const metrics = d.casting
    .map(
      (m) =>
        `<div class="spell-metric-group">${d.casting.length > 1 ? `<div class="tiny upper">${esc(m.label)}</div>` : ""}<div class="spell-metrics"><div class="spell-metric"><strong>${m.dc}</strong><span>DD de sauvegarde</span></div><div class="spell-metric"><strong>${signed(m.attack)}</strong><span>Attaque de sort</span></div><div class="spell-metric"><strong>${d.scores[m.ability]}</strong><span>${ABILITIES[m.ability].name}</span></div></div></div>`,
    )
    .join("");
  const innateNote = d.innateAbilities.filter((a) => !d.casting.some((m) => m.ability === a));
  let lastLevel = -1;
  const grouped = list
    .map((s) => {
      const head = s.level !== lastLevel ? `<div class="spell-group-title">${s.level === 0 ? "Sorts mineurs" : `Niveau ${s.level}`}</div>` : "";
      lastLevel = s.level;
      return head + spellCard(c, s);
    })
    .join("");
  return `<div class="page-head mobile-stack"><div><div class="eyebrow">${esc(c.name)} · Magie & concentration</div><h1>Le grimoire</h1><p class="page-subtitle">Connaître un sort, le préparer, le lancer. Trois gestes distincts.</p></div><div class="actions">${casters.length ? button(`${icon("edit", 17)} Choisir mes sorts`, "edit-magic", "", "primary") : ""}</div></div>${metrics}${innateNote.length ? `<p class="tiny muted">Magie d’origine ou de don : ${innateNote.map((a) => `${ABILITIES[a].name} DD ${8 + d.prof + d.mods[a]}, attaque ${signed(d.prof + d.mods[a])}`).join(" · ")}.</p>` : ""}${
    d.slots.length || d.pact
      ? `<div class="panel"><div class="panel-head"><h2 class="panel-title">${icon("sparkles", 18)} Emplacements disponibles</h2></div>${renderSlots(c)}</div>`
      : notice(casters.length ? "Tes premiers emplacements arrivent avec le prochain niveau de ta classe." : "Ta classe ne lance pas de sorts. La magie d’origine, de don ou maison reste utilisable.")
  }${c.state.concentration ? `<div class="notice purple section-gap">${icon("sparkles", 19)}<div><strong>Concentration : ${esc(c.state.concentration)}</strong>Un seul sort de concentration à la fois.<button class="link-btn" data-action="end-concentration">Mettre fin à la concentration</button></div></div>` : ""}<div class="segmented section-gap"><button data-action="spell-tab" data-value="mine" class="${ui.spellTab === "mine" ? "active" : ""}">Mes sorts (${ids.size})</button><button data-action="spell-tab" data-value="catalogue" class="${ui.spellTab === "catalogue" ? "active" : ""}">Catalogue de ma classe</button></div><div class="spell-toolbar"><div class="search-wrap">${icon("search", 18)}<input id="spell-search" class="search-input" data-bind="ui.spellQuery" value="${esc(ui.spellQuery)}" placeholder="Rechercher un sort…" aria-label="Rechercher un sort"></div><select id="spell-filter" class="select-plain" data-bind="ui.spellLevel" aria-label="Niveau de sort"><option value="all">Tous niveaux</option>${Array.from({ length: 10 }, (_, i) => `<option value="${i}" ${ui.spellLevel === String(i) ? "selected" : ""}>${i === 0 ? "Sorts mineurs" : "Niveau " + i}</option>`).join("")}</select></div>${
    list.length
      ? `<div class="spell-grid">${grouped}</div>`
      : `<div class="panel empty"><span class="empty-icon">${icon("book", 29)}</span><h2>${ui.spellQuery ? "Aucun sort trouvé" : "Les premières pages sont vierges."}</h2><p>${ui.spellQuery ? "Essaie un autre nom ou ajoute un sort maison." : "Sélectionne tes sorts et découvre leurs usages avant de partir à l’aventure."}</p>${casters.length ? button("Choisir mes sorts", "edit-magic", "", "primary") : ""}</div>`
  }<div class="catalogue-note">${SPELLS.length} sorts des règles 2014 en résumés originaux. Les sorts d’autres livres et les créations de ta table s’ajoutent dans « Maison ».</div>`;
}
function magicDraft(target) {
  return target === "wizard" ? ui.wizard.draft : target === "level" ? ui.levelFlow.draft : ui.magic.draft;
}
function renderMagicEditor(c, target) {
  const casters = spellcasters(c);
  if (!casters.length) return notice("Aucune classe de lanceur de sorts pour l’instant.");
  if (!casters.some((s) => s.classId === ui.editorClass)) ui.editorClass = casters[0].classId;
  const classId = ui.editorClass,
    limits = spellLimits(c, classId),
    all = catalogue(c),
    always = domainSpells(c),
    mine = (ids) => ids.filter((id) => spellClassOf(c, id) === classId),
    known = all.filter((s) => mine(c.spells.known).includes(s.id)),
    query = ui.editorQuery.toLocaleLowerCase("fr-FR");
  let list = all
    .filter(
      (s) =>
        (canReadySpell(c, s, classId) || mine(c.spells.known).includes(s.id) || mine(c.spells.prepared).includes(s.id)) &&
        (ui.editorLevel === "all" || s.level === Number(ui.editorLevel)) &&
        s.name.toLocaleLowerCase("fr-FR").includes(query),
    )
    .sort((a, b) => a.level - b.level || a.name.localeCompare(b.name, "fr"));
  const prefix = target === "wizard" ? "wiz" : target === "level" ? "lvl" : "magic";
  const tabs =
    casters.length > 1
      ? `<div class="segmented">${casters.map((s) => `<button type="button" data-action="editor-class" data-value="${s.classId}" class="${s.classId === classId ? "active" : ""}">${esc(s.label)} ${s.level}</button>`).join("")}</div>`
      : "";
  const secrets = classId === "bard" && limits.secrets ? `<span class="pill sand">Secrets magiques : ${known.filter((s) => s.level > 0 && !s.classes.includes("bard") && !s.custom).length}/${limits.secrets}</span>` : "";
  const school = limits.type === "third" ? `<span class="pill sand">Hors ${limits.schools.join("/")} : ${known.filter((s) => s.level > 0 && !limits.schools.includes(s.school)).length}/${limits.offSchool}</span>` : "";
  const help =
    limits.mode === "book"
      ? "Ajoute des sorts à ton grimoire, puis prépare ceux que tu veux lancer aujourd’hui."
      : limits.mode === "prepared"
        ? "Toute la liste de ta classe t’est ouverte. Choisis les sorts préparés pour la journée ; les sorts mineurs restent connus."
        : "Les sorts appris sont toujours disponibles. Tu peux en remplacer un à chaque niveau gagné.";
  return `${tabs}<div class="sticky-tools"><div class="learn-counts"><span class="pill purple">Mineurs : ${known.filter((s) => s.level === 0).length}/${limits.cantrips}</span>${["known", "book"].includes(limits.mode) ? `<span class="pill purple">${limits.mode === "book" ? "Grimoire" : "Connus"} : ${known.filter((s) => s.level > 0).length}/${limits.known}${limits.mode === "book" ? " min." : ""}</span>` : ""}${["prepared", "book"].includes(limits.mode) ? `<span class="pill purple">Préparés : ${mine(c.spells.prepared).filter((id) => !always.includes(id)).length}/${limits.prepared}</span>` : ""}${always.length ? `<span class="pill">${always.length} toujours préparés</span>` : ""}<span class="pill outline">Jusqu’au niveau ${limits.maxLevel || 0}</span>${secrets}${school}</div><div class="spell-toolbar"><div class="search-wrap">${icon("search", 18)}<input id="editor-search" class="search-input" data-bind="ui.editorQuery" value="${esc(ui.editorQuery)}" placeholder="Nom du sort…" aria-label="Chercher dans les choix de sorts"></div><select id="editor-filter" class="select-plain" data-bind="ui.editorLevel" aria-label="Filtrer les choix par niveau"><option value="all">Tous niveaux</option>${Array.from({ length: 10 }, (_, i) => `<option value="${i}" ${ui.editorLevel === String(i) ? "selected" : ""}>${i === 0 ? "Sorts mineurs" : "Niveau " + i}</option>`).join("")}</select></div></div><div class="small muted" style="margin-bottom:16px">${help}</div>${list.length ? `<div class="spell-grid">${list.map((s) => spellCard(c, s, { editor: true, target, scope: "editor-" + target, classId })).join("")}</div>` : notice("Aucun sort dans ce filtre. Change le niveau ou la recherche.")}<div class="section-gap">${checkField("Autoriser les exceptions du MJ", `${prefix}.spells.allowExceptions`, c.spells.allowExceptions, "Affiche toutes les listes et tous les niveaux, sans bloquer les quotas. Utile pour les règles maison.")}</div>`;
}
function renderInventory(c) {
  const d = derive(c),
    armor = ARMORS[c.equipment.armor] || ARMORS.none,
    weight = c.inventory.reduce((s, i) => s + i.qty * i.weight, 0);
  return `<div class="page-head mobile-stack"><div><div class="eyebrow">${esc(c.name)} · Équipement & trésors</div><h1>Le sac d’aventure</h1><p class="page-subtitle">Ce que tu portes. Ce que tu gardes. Ce qui change ta défense.</p></div><div class="actions">${button(`${icon("plus", 17)} Objet du catalogue`, "catalog-item", "", "primary")}${button(`${icon("edit", 16)} Objet libre`, "new-item", "", "ghost")}</div></div><div class="grid-2"><section class="panel"><div class="panel-head"><h2 class="panel-title">${icon("shield", 19)} Équipement actif</h2><button class="link-btn" data-action="equipment">Modifier ${icon("edit", 14)}</button></div><div class="equipment-summary"><div><div class="item-label">Armure</div><div class="item-name">${esc(armor.name)}${c.equipment.shield ? " + bouclier" : ""}</div></div><span class="pill">CA ${d.ac}</span></div>${d.attacks
    .map(
      (a) =>
        `<div class="equipment-summary"><div><div class="item-label">Arme</div><div class="item-name">${esc(a.name)}</div></div><span class="pill">${signed(a.attack)} · ${esc(a.damageDice)} ${signed(a.damageBonus)}</span></div>`,
    )
    .join("")}<p class="tiny muted section-gap">CA : ${esc(d.acExplanation)}.</p>${armor.stealth ? notice("Cette armure impose le désavantage aux tests de Discrétion.", "warning") : ""}${!d.armorProficient ? notice("Armure ou bouclier non maîtrisé : tu ne peux pas lancer de sorts avec cet équipement.", "warning") : ""}${d.strTooLow ? notice(`Force insuffisante pour ${esc(armor.name)} : vitesse réduite de 3 m.`, "warning") : ""}</section><div class="stack"><div class="coins">${icon("gem", 28)}<div><strong>${c.gold.toLocaleString("fr-FR")}</strong><span> pièces d’or</span></div><button class="link-btn" style="margin-left:auto;color:inherit" data-action="gold">Ajuster</button></div><div class="panel"><div class="summary-row"><span>Poids du sac</span><strong>${String(Math.round(weight * 100) / 100).replace(".", ",")} kg</strong></div><div class="summary-row"><span>Capacité (FOR × 7,5 kg)</span><strong>${String(d.carry).replace(".", ",")} kg</strong></div><div class="bar ${weight > d.carry ? "low" : ""}"><span style="width:${clamp((weight / d.carry) * 100, 0, 100)}%"></span></div></div></div></div><section class="section-gap"><div class="section-title"><h2>Dans le sac</h2><span class="tiny muted">${c.inventory.length} entrée(s)</span></div>${
    c.inventory.length
      ? `<div class="inventory-list">${c.inventory
          .map(
            (item) =>
              `<div class="inventory-item"><div><div class="inventory-name">${esc(item.name)} <span class="pill outline">×${item.qty}</span></div><div class="inventory-meta">${String(item.weight).replace(".", ",")} kg / unité${item.description ? ` · ${esc(item.description)}` : ""}</div></div><div class="item-actions">${smallIcon("edit", "edit-item", "Modifier cet objet", `data-id="${esc(item.id)}"`)}${smallIcon("trash", "delete-item", "Retirer cet objet", `data-id="${esc(item.id)}"`)}</div></div>`,
          )
          .join("")}</div>`
      : `<div class="panel empty"><span class="empty-icon">${icon("bag", 28)}</span><h3>Il reste de la place.</h3><p>Ajoute provisions, cordes et trésors depuis le catalogue ou à la main.</p>${button("Ajouter un objet", "catalog-item", "", "small-btn")}</div>`
  }</section><div class="notice section-gap">${icon("info", 18)}<div><strong>Un objet magique ou une règle maison ?</strong>Utilise les ajustements du MJ pour un bonus ponctuel, ou une aptitude maison pour un effet durable.<div class="actions">${button("Ajustements du MJ", "adjustments", "", "small-btn")}${button("Contenus maison", "navigate", 'data-route="homebrew"', "small-btn ghost")}</div></div></div>`;
}
const BEAST_SIZES = { TP: "Très petite", P: "Petite", M: "Moyenne", G: "Grande", TG: "Très grande", Gig: "Gigantesque" };
function summarizeChoice(c, l) {
  const specs = choicesFor(c, l.level);
  const parts = specs
    .map((s) => {
      const value = l.choices[s.key];
      if (!value || (Array.isArray(value) && !value.length)) return "";
      const arr = Array.isArray(value) ? value : [value];
      return `<div class="level-choice"><strong>${esc(s.title)} :</strong> ${arr.map((v) => esc(s.options?.[v]?.[0] || v)).join(", ")}</div>`;
    })
    .join("");
  const k = classLevelAt(c, l.level);
  const sub = k === CLASSES[l.classId].subLevel ? subclassOf(c, l.classId) : null;
  const asi = l.asi
    ? `<div class="level-choice"><strong>${l.asi.mode === "ability" ? "Amélioration" : "Don"} :</strong> ${l.asi.mode === "ability" ? `${ABILITIES[l.asi.a].name} +1, ${ABILITIES[l.asi.b].name} +1` : esc(FEATS[l.asi.featId]?.name || l.asi.featName || "à choisir")}</div>`
    : "";
  return `${sub ? `<div class="level-choice"><strong>${esc(CLASSES[l.classId].subLabel)} :</strong> ${esc(sub.name)}</div>` : ""}${asi}${parts}`;
}
function renderProgression(c) {
  const d = derive(c);
  return `<div class="page-head mobile-stack"><div><div class="eyebrow">${esc(c.name)}, du premier pas aux légendes</div><h1>Ton parcours</h1><p class="page-subtitle">Chaque décision reste lisible, et chaque niveau peut être corrigé.</p></div><div class="actions">${button(`${icon("plus", 17)} Niveau ${Math.min(d.level + 1, 20)}`, "level-up", d.level >= 20 ? "disabled" : "", "primary")}</div></div><div class="panel" style="margin-bottom:25px"><div class="summary-row"><span>${esc(classSummary(c))}</span><strong>${c.xp.toLocaleString("fr-FR")} XP <button class="link-btn" data-action="xp" aria-label="Modifier l’expérience">${icon("edit", 14)}</button></strong></div><p class="small muted">${d.level < 20 ? `Prochain seuil : ${d.nextXP.toLocaleString("fr-FR")} XP. Le passage de niveau reste manuel, pour suivre les jalons décidés par le MJ.` : "Niveau maximal atteint."}</p><div class="bar"><span style="width:${d.level < 20 ? clamp((c.xp / d.nextXP) * 100, 0, 100) : 100}%"></span></div></div><div class="timeline">${[...c.levels]
    .reverse()
    .map((l) => {
      const fs = features(c, l.level),
        k = classLevelAt(c, l.level),
        cls = CLASSES[l.classId];
      return `<article class="level-card"><div class="level-marker">${l.level}</div><div class="level-body"><div class="level-head"><h3>${cls.name} ${k}${k === 1 && l.level > 1 ? ' <span class="pill sand">multiclasse</span>' : ""}</h3>${smallIcon("edit", "edit-level", `Corriger le niveau ${l.level}`, `data-level="${l.level}"`)}</div><div class="level-meta">PV : ${l.level === 1 ? `${cls.die} (maximum)` : `${l.hpDie} sur d${cls.die}`} ${signed(d.mods.con)} CON</div><div>${fs.map((f) => `<span class="feature-tag" title="${esc(f.description)}">${esc(f.name)}</span>`).join("") || '<span class="tiny muted">Progression des ressources et de la magie.</span>'}</div>${summarizeChoice(c, l)}</div></article>`;
    })
    .join("")}</div>${d.level > 1 ? `<div class="actions section-gap">${button(`${icon("undo", 16)} Retirer le dernier niveau`, "remove-level", "", "danger ghost")}</div>` : ""}<div class="notice section-gap">${icon("info", 18)}<div><strong>La Constitution compte pour tous les niveaux.</strong>Modifier sa valeur recalcule les PV de tous les niveaux. Les blessures sont conservées : une hausse du maximum s’ajoute aux PV actuels, sauf à 0 PV.</div></div>`;
}
function renderNotes(c) {
  const d = derive(c),
    details = c.details || {},
    bg = d.background;
  const detailRows = [
    ["Alignement", c.alignment],
    ["Âge", details.age],
    ["Taille", details.height],
    ["Poids", details.weight],
    ["Yeux", details.eyes],
    ["Cheveux", details.hair],
  ].filter(([, v]) => v);
  const persona = [
    ["Traits", details.traits],
    ["Idéaux", details.ideals],
    ["Liens", details.bonds],
    ["Défauts", details.flaws],
  ].filter(([, v]) => v);
  return `<div class="page-head"><div><div class="eyebrow">${esc(c.name)} · Ce qui ne tient pas dans une statistique</div><h1>Le journal</h1><p class="page-subtitle">Alliés, promesses, indices… et le nom de cette auberge.</p></div></div><div class="panel">${field("Notes de campagne", "ui.noteDraft", ui.noteDraft, "textarea", "Les notes ne sont enregistrées qu’après validation.", 'rows="12" maxlength="20000"')}${button(`${icon("check", 17)} Enregistrer mes notes`, "save-notes", "", "primary")}</div><div class="grid-2 section-gap"><div class="panel"><h3>Identité</h3>${detailRows.map(([k, v]) => `<div class="summary-row"><span>${k}</span><strong>${esc(v)}</strong></div>`).join("") || '<p class="small muted">Complète l’identité en modifiant le personnage.</p>'}${persona.map(([k, v]) => `<p class="small preserve section-gap"><strong>${k} :</strong> ${esc(v)}</p>`).join("")}<p class="small muted preserve section-gap">${esc(c.biography || "Ton histoire reste à écrire.")}</p></div><div class="panel"><h3>Historique : ${esc(bg.name)}</h3>${bg.feature?.[0] ? `<p class="small section-gap"><strong>${esc(bg.feature[0])}.</strong> ${esc(bg.feature[1] || "")}</p>` : ""}<div class="summary-row"><span>Langues</span><strong>${esc(d.languages.map((l) => l.name).join(", ") || "Commun")}</strong></div><div class="summary-row"><span>Outils</span><strong>${esc(d.tools.map((t) => t.name).join(", ") || "Aucun")}</strong></div>${c.languages ? `<p class="small muted preserve">${esc(c.languages)}</p>` : ""}</div></div>`;
}
function renderHomebrew(c) {
  return `<div class="page-head mobile-stack"><div><div class="eyebrow">${esc(c.name)} · Les règles de ta table</div><h1>Fait maison</h1><p class="page-subtitle">Ajoute une aptitude, un objet à effet ou un sort. Tu décides de ce qui est automatisé.</p></div><div class="actions">${button(`${icon("plus", 16)} Aptitude`, "new-trait", "", "primary")}${button(`${icon("book", 16)} Sort`, "new-custom-spell")}</div></div>${notice("Les effets chiffrés saisis sont appliqués. Le texte descriptif seul ne déclenche aucun calcul. Les contenus maison voyagent avec le personnage dans ses exports JSON.")}<div class="section-title section-gap"><h2>Aptitudes & effets</h2><span class="tiny muted">${c.custom.traits.length} création(s)</span></div>${
    c.custom.traits.length
      ? `<div class="grid-2">${c.custom.traits
          .map(
            (t) =>
              `<article class="homebrew-card"><div class="panel-head"><h3>${esc(t.name)}</h3><span class="pill ${t.active === false ? "outline" : "sand"}">${t.active === false ? "Inactif" : "Actif"}</span></div><p>${esc(t.description)}</p><div class="learn-counts">${[
                ["hp", "PV max."],
                ["ac", "CA"],
                ["speed", "Vitesse"],
              ]
                .filter(([key]) => t[key])
                .map(([key, label]) => `<span class="pill">${signed(t[key])} ${label}</span>`)
                .join("")}${Object.entries(t.bonuses || {})
                .filter(([, n]) => n)
                .map(([a, n]) => `<span class="pill">${signed(n)} ${ABILITIES[a]?.short || a}</span>`)
                .join(
                  "",
                )}${t.maxUses ? `<span class="pill purple">${t.maxUses} utilisation(s)</span>` : ""}</div><div class="homebrew-controls">${button(t.active === false ? "Activer" : "Désactiver", "toggle-trait", `data-id="${esc(t.id)}"`, "small-btn ghost")}<div class="actions">${smallIcon("edit", "edit-trait", "Modifier cette aptitude", `data-id="${esc(t.id)}"`)}${smallIcon("trash", "delete-trait", "Supprimer cette aptitude", `data-id="${esc(t.id)}"`)}</div></div></article>`,
          )
          .join("")}</div>`
      : `<div class="panel empty"><span class="empty-icon">${icon("sparkles", 28)}</span><h3>Une table, ses propres idées.</h3><p>Une bénédiction, une cicatrice magique, un don inventé : décris ses effets, puis vérifie leur impact sur la fiche.</p>${button("Créer une aptitude", "new-trait", "", "small-btn")}</div>`
  }<div class="section-title section-gap"><h2>Sorts personnalisés</h2></div>${c.custom.spells.length ? `<div class="spell-grid">${c.custom.spells.map((s) => `<div>${spellCard(c, s, { scope: "custom" })}<div class="actions">${button("Modifier", "edit-custom-spell", `data-id="${esc(s.id)}"`, "small-btn ghost")}${button("Supprimer", "delete-custom-spell", `data-id="${esc(s.id)}"`, "small-btn ghost danger")}</div></div>`).join("")}</div>` : `<div class="panel"><p class="small muted">Aucun sort maison. Tu peux aussi transcrire ici un sort SRD manquant dans le catalogue initial.</p></div>`}`;
}
function renderMore(c) {
  return `<div class="page-head"><div><div class="eyebrow">Tout le nécessaire</div><h1>À portée de main</h1></div></div><div class="mobile-more-grid">${[
    ["home", "users", "Mes personnages", "Changer d’aventurier"],
    ["notes", "note", "Journal", "Histoire & notes"],
    ...(c && classLevel(c, "druid") >= 2 ? [["wildshape", "paw", "Formes animales", "Bêtes de la forme sauvage"]] : []),
    ["homebrew", "sparkles", "Fait maison", "Aptitudes & sorts"],
    ["settings", "settings", "Réglages", "Installer & sauvegarder"],
  ]
    .map(
      ([route, ico, title, sub]) =>
        `<button class="menu-tile" data-action="navigate" data-route="${route}" ${!c && ["notes", "homebrew"].includes(route) ? "disabled" : ""}>${icon(ico, 25)}<span>${title}<small>${sub}</small></span></button>`,
    )
    .join(
      "",
    )}</div>${c ? `<div class="panel section-gap"><h3>${esc(c.name)}</h3><div class="actions section-gap">${button(`${icon("edit", 16)} Modifier`, "edit-character")}${button(`${icon("download", 16)} Exporter`, "export-one")}${IS_ARTIFACT ? "" : button(`${icon("print", 16)} Imprimer`, "print", "", "ghost")}</div></div>` : ""}`;
}
function renderSettings() {
  const c = activeCharacter(),
    history = appData.snapshots
      .filter((s) => !c || s.characterId === c.id)
      .slice(-12)
      .reverse();
  return `<div class="page-head"><div><div class="eyebrow">Tes données, tes choix</div><h1>Réglages & sauvegardes</h1><p class="page-subtitle">Le stockage local est pratique. Un export reste ta meilleure assurance.</p></div></div><div class="settings-stack"><section class="panel"><h3>Sur cet appareil</h3><div class="settings-row"><div><strong>Stockage ${localStore.mode === "indexeddb" ? "IndexedDB" : localStore.mode === "localstorage" ? "localStorage" : "temporaire"}</strong><p>Aucun serveur de fiches. Aucun compte. Aucun transfert automatique.</p></div><span class="pill">${appData.characters.length} fiche(s)</span></div><div class="settings-row"><div><strong>Exporter toutes les fiches</strong><p>${appData.lastExport ? "Dernier export : " + dateLabel(appData.lastExport) : "Aucun export effectué sur cet appareil."}</p></div>${button(`${icon("download", 16)} Export JSON`, "export-all", "", "small-btn green")}</div><div class="settings-row"><div><strong>Importer un fichier JSON</strong><p>Les fiches sont ajoutées en copie, jamais écrasées. Les sauvegardes de la version précédente sont converties.</p></div>${button(`${icon("upload", 16)} Importer`, "import", "", "small-btn")}</div><div class="settings-row"><div><strong>Copier ou coller une sauvegarde</strong><p>Pratique sur téléphone, sans passer par un fichier.</p></div><div class="actions">${button("Copier", "export-all", "", "small-btn")}${button("Coller", "paste-import", "", "small-btn")}</div></div><div class="settings-row"><div><strong>Demander un stockage persistant</strong><p>Le navigateur décide de l’accorder. Cela ne remplace pas une sauvegarde.</p></div>${button("Demander", "persist-storage", "", "small-btn")}</div>${notice("Effacer les données du site, changer de navigateur ou de téléphone peut supprimer les fiches. Exporte-les régulièrement.", "warning")}</section><section class="panel"><h3>Affichage</h3><div class="settings-row"><div><strong>Thème</strong><p>Le mode sombre ménage les yeux autour d’une table peu éclairée. « Auto » suit le réglage du téléphone.</p></div><div class="segmented">${[
    ["auto", "Auto"],
    ["light", "Clair"],
    ["dark", "Sombre"],
  ]
    .map(([id, label]) => `<button type="button" data-action="set-theme" data-value="${id}" class="${currentTheme() === id ? "active" : ""}">${label}</button>`)
    .join("")}</div></div></section><section class="panel"><h3>Installer Compagnon</h3><div class="settings-row"><div><strong>Comme une application</strong><p>Sur Android : menu du navigateur, Installer. Sur iPhone : Safari, Partager, Sur l’écran d’accueil. L’hébergement HTTPS est nécessaire.</p></div>${button(`${icon("phone", 16)} Installer`, "install", "", "small-btn")}</div><div class="settings-row"><div><strong>Hors connexion</strong><p>Ouvre la version hébergée une première fois en ligne ; ensuite tout fonctionne sans réseau.</p></div><span class="pill">${navigator.serviceWorker?.controller ? "Cache actif" : location.protocol === "file:" ? "Fichier local" : "Cache en préparation"}</span></div></section>${history.length ? `<section class="panel"><div class="panel-head"><h3>Retour en arrière</h3><span class="tiny muted">30 derniers changements, toutes fiches</span></div>${history.map((s) => `<div class="history-row"><div>${esc(s.label)}<small>${dateLabel(s.date)} · ${esc(s.character.name)}</small></div>${button("Restaurer", "restore-snapshot", `data-id="${esc(s.id)}"`, "small-btn ghost")}</div>`).join("")}</section>` : ""}<section class="panel"><h3>Ce que l’application calcule pour toi</h3><p class="small muted section-gap">Caractéristiques, maîtrises, expertise, langues et outils ; PV, CA (armures, défense sans armure, styles), initiative, vitesse ; attaques de chaque arme ; emplacements de sorts y compris multiclasse et pacte ; sorts connus, préparés et toujours préparés ; ressources de classe, de sous-classe, d’origine et de dons ; repos et dés de vie.</p><p class="small muted">Restent à appliquer à la table : avantages et désavantages contextuels, effets des sorts, profils de formes sauvages et de compagnons, interactions fines entre pouvoirs. Vérifie ta fiche avec ton MJ.</p></section><section class="panel"><h3>Sources & licences</h3><p class="small muted section-gap">Ce travail comprend du contenu du Document de Référence du Système 5.1 (« SRD 5.1 ») de Wizards of the Coast LLC, disponible à l’adresse <a href="https://dnd.wizards.com/fr/resources/systems-reference-document" target="_blank" rel="noopener noreferrer">Document de Référence du Système</a>, sous licence <a href="https://creativecommons.org/licenses/by/4.0/legalcode.fr" target="_blank" rel="noopener noreferrer">Creative Commons Attribution 4.0 International</a>.</p><p class="small muted">Les options du Manuel des joueurs 2014 hors SRD (sous-races, sous-classes, historiques, dons, sorts) sont présentées sous forme de résumés de règles originaux, sans reproduire le texte du livre ; elles sont marquées « Manuel ». Elles supposent que tu possèdes le Manuel des joueurs. Aucune affiliation avec Wizards of the Coast. Version ${APP_VERSION}.</p><p class="small"><a href="${SRD_URL}" target="_blank" rel="noopener noreferrer">Lire le SRD 5.1 français officiel ↗</a></p></section>${c ? `<section class="panel"><div class="settings-row"><div><strong>Supprimer ${esc(c.name)}</strong><p>Exporte d’abord sa fiche. Les autres personnages seront conservés.</p></div>${button("Supprimer", "delete-character", "", "small-btn danger")}</div></section>` : ""}</div>`;
}
function castOptions(c, d, s) {
  const st = spellStatus(c, s),
    owner = st.owner,
    mode = spellLimits(c, owner).mode,
    modes = {};
  if (s.level === 0) modes.free = "Sort mineur · aucun emplacement";
  if (st.innate?.resource && (c.state.resourcesUsed[st.innate.resource] || 0) < 1) {
    if (!st.innate.usesPactSlot) modes.innate = `${st.innate.label} · ${st.innate.castLevel ? `niveau ${st.innate.castLevel}, ` : ""}1 utilisation`;
    else if (d.pact && d.pact.count > (c.state.pactUsed || 0))
      modes.innate = `${st.innate.label} · emplacement de pacte (niveau ${d.pact.slotLevel}), 1 fois par repos long`;
  }
  if (st.innate?.atWill && s.level > 0) modes.free = `${st.innate.label} · à volonté`;
  if (st.arcanum && (c.state.resourcesUsed[`arcanum-${s.level}`] || 0) < 1) modes.arcanum = `Arcanum mystique de niveau ${s.level}`;
  const classReady = (mode === "known" && st.knownAny) || st.preparedAny || st.always || c.spells.allowExceptions;
  if (s.level > 0 && classReady) {
    d.slots.forEach((count, i) => {
      if (i + 1 >= s.level && count > (c.state.slotsUsed[i + 1] || 0)) modes[String(i + 1)] = `Emplacement niveau ${i + 1} · ${count - (c.state.slotsUsed[i + 1] || 0)} restant(s)`;
    });
    if (d.pact && d.pact.slotLevel >= s.level && d.pact.count > (c.state.pactUsed || 0))
      modes.pact = `Emplacement de pacte (niveau ${d.pact.slotLevel}) · ${d.pact.count - (c.state.pactUsed || 0)} restant(s)`;
  }
  const ritual = s.ritual && ((st.knownAny && ["wizard", "bard"].includes(owner)) || (["cleric", "druid"].includes(owner) && (st.preparedAny || st.always)) || st.innate?.ritualOnly);
  if (ritual) modes.ritual = "Rituel · +10 minutes, sans emplacement";
  if (c.spells.allowExceptions && s.level > 0) modes.manual = "Exception du MJ · sans consommer d’emplacement";
  return { modes, st };
}
function setStartLevel(c, n) {
  const classId = primaryClassId(c);
  n = clamp(n, 1, 20);
  const keep = c.levels.slice(0, n);
  for (let lvl = keep.length + 1; lvl <= n; lvl++) keep.push(defaultLevel(classId, lvl, lvl));
  c.levels = keep;
  if (n >= CLASSES[classId].subLevel && !c.subclasses[classId]) c.subclasses[classId] = DEFAULT_SUBCLASS[classId];
  if (n < CLASSES[classId].subLevel) delete c.subclasses[classId];
}
function levelDraft(prefix) {
  return prefix === "lvl" ? ui.levelFlow?.draft : ui.wizard?.draft;
}
function clearPicks(c, prefixes) {
  for (const key of Object.keys(c.picks || {})) if (prefixes.some((p) => key.startsWith(p))) delete c.picks[key];
}
function hitDiceLabel(d) {
  return d.hitDice.map((h) => `${h.total - h.spent}/${h.total} d${h.die}`).join(" · ");
}
function renderAttacks(c, d) {
  const extras = [
    d.extraAttacks > 1 ? `${d.extraAttacks} attaques avec l’action Attaquer` : "",
    d.sneakAttack ? `Attaque sournoise ${d.sneakAttack}d6` : "",
    d.martialDie ? `Arts martiaux d${d.martialDie}` : "",
    d.critThreshold < 20 ? `Critique sur ${d.critThreshold}-20` : "",
  ].filter(Boolean);
  return `<div class="section-title section-gap"><h3>Attaques</h3><button class="link-btn" data-action="equipment">Équiper ${icon("chevron", 13)}</button></div>${d.attacks
    .map(
      (a, i) =>
        `<div class="attack-card"><div class="attack-main"><div class="attack-title">${esc(a.name)}${a.proficient ? "" : ' <span class="pill red">non maîtrisée</span>'}</div><div class="attack-meta">${esc(a.damageDice)} ${signed(a.damageBonus)} ${esc(a.type)}${a.properties.length ? ` · ${esc(a.properties.join(", "))}` : ""}</div></div><button class="attack-roll" data-action="roll-attack" data-index="${i}" aria-label="Jet d’attaque ${esc(a.name)}"><strong>${signed(a.attack)}</strong><small>toucher</small></button><button class="attack-roll ghost" data-action="roll-damage" data-index="${i}" aria-label="Dégâts ${esc(a.name)}">${icon("dice", 18)}<small>dégâts</small></button></div>`,
    )
    .join("")}${extras.length ? `<p class="tiny muted attack-extras">${extras.map(esc).join(" · ")}</p>` : ""}`;
}
function renderProficiencies(d) {
  const armorNames = { light: "Légères", medium: "Intermédiaires", heavy: "Lourdes", shield: "Boucliers" };
  const weaponNames = d.weaponProfs.map((w) => (w === "simple" ? "Armes courantes" : w === "martial" ? "Armes de guerre" : WEAPONS[w]?.name || w));
  const rows = [
    ["Armures", d.armorProfs.map((a) => armorNames[a] || a).join(", ") || "Aucune"],
    ["Armes", weaponNames.join(", ") || "Aucune"],
    ["Outils", d.tools.map((t) => t.name + (t.expertise ? " (expertise)" : "")).join(", ") || "Aucun"],
    ["Langues", d.languages.map((l) => l.name).join(", ") || "Commun"],
    ["Sens", [d.darkvision ? `Vision dans le noir ${formatMeters(d.darkvision)}` : "", `Perception passive ${d.passivePerception}`, `Investigation passive ${d.passiveInvestigation}`, `Perspicacité passive ${d.passiveInsight}`].filter(Boolean).join(" · ")],
  ];
  if (d.resistances.length) rows.push(["Résistances", d.resistances.join(", ")]);
  if (d.immunities.length) rows.push(["Immunités", d.immunities.join(", ")]);
  return `<section class="panel prof-panel"><div class="panel-head"><h2 class="panel-title">${icon("compass", 19)} Maîtrises & sens</h2></div>${rows.map(([k, v]) => `<div class="summary-row"><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`).join("")}</section>`;
}
function featureGroups(c, d) {
  const list = features(c),
    groups = [];
  const byClass = {};
  for (const f of list) (byClass[f.classId] ||= []).push(f);
  for (const { classId } of classLevels(c)) groups.push([CLASSES[classId].name, byClass[classId] || []]);
  const bg = d.background;
  const origin = (d.race.traits || []).map(([name, description]) => ({ name, description, source: d.race.name, level: null }));
  if (bg.feature?.[0]) origin.push({ name: bg.feature[0], description: bg.feature[1] || "", source: `Historique : ${bg.name}`, level: null });
  if (c.raceFeat && FEATS[c.raceFeat]) origin.push({ name: `Don : ${FEATS[c.raceFeat].name}`, description: FEATS[c.raceFeat].summary, source: d.race.name, level: null });
  for (const key of ["style", "secondStyle"]) for (const id of allChoices(c, key)) if (STYLES[id]) origin.push({ name: `Style : ${STYLES[id][0]}`, description: STYLES[id][1], source: "Style de combat", level: null });
  for (const id of allChoices(c, "invocations")) if (INVOCATIONS[id]) origin.push({ name: `Manifestation : ${INVOCATIONS[id].name}`, description: INVOCATIONS[id].summary, source: "Occultiste", level: null });
  for (const id of allChoices(c, "metamagic")) if (METAMAGIC[id]) origin.push({ name: `Métamagie : ${METAMAGIC[id][0]}`, description: METAMAGIC[id][1], source: "Ensorceleur", level: null });
  const pact = allChoices(c, "pact")[0];
  if (pact && PACT_BOONS[pact]) origin.push({ name: PACT_BOONS[pact][0], description: PACT_BOONS[pact][1], source: "Faveur de pacte", level: null });
  groups.push(["Origine, historique & choix", origin]);
  return groups.filter(([, items]) => items.length);
}
function spellStatus(c, s, classId) {
  const always = alwaysPrepared(c).some((x) => x.id === s.id),
    knownAny = c.spells.known.includes(s.id),
    preparedAny = c.spells.prepared.includes(s.id),
    owner = spellClassOf(c, s.id),
    mine = !classId || owner === classId,
    innate = innateSpells(c).find((x) => x.id === s.id),
    arcanum = c.spells.arcana[s.level] === s.id;
  return { always, known: knownAny && mine, prepared: preparedAny && mine, knownAny, preparedAny, owner, innate, arcanum };
}
function classSummary(c) {
  return classLevels(c)
    .map(({ classId, level }) => `${CLASSES[classId].name} ${level}`)
    .join(" / ");
}
function subclassSummary(c) {
  return classLevels(c)
    .map(({ classId }) => subclassOf(c, classId)?.name)
    .filter(Boolean)
    .join(" · ");
}
function sourcePill(source) {
  if (source === "phb") return '<span class="pill outline source-pill" title="Manuel des joueurs 2014, résumé original">Manuel</span>';
  if (source === "srd") return '<span class="pill outline source-pill" title="SRD 5.1, licence CC BY 4.0">SRD</span>';
  if (source === "homebrew") return '<span class="pill sand source-pill">Maison</span>';
  return "";
}
function bonusLine(grants = {}) {
  const parts = Object.entries(grants.abilities || {}).map(([a, n]) => `${ABILITIES[a].short} ${signed(n)}`);
  if (grants.abilityChoice) parts.push(`+${grants.abilityChoice.amount ?? 1} à ${grants.abilityChoice.count} au choix`);
  return parts.join(" · ") || "Bonus libres";
}
function prereqText(prereq) {
  if (!prereq) return "";
  const out = [];
  if (prereq.abilities) out.push(Object.entries(prereq.abilities).map(([a, n]) => `${ABILITIES[a].name} ${n}`).join(", "));
  if (prereq.anyAbility) out.push(Object.entries(prereq.anyAbility).map(([a, n]) => `${ABILITIES[a].name} ${n}`).join(" ou "));
  if (prereq.armor) out.push(`maîtrise des armures ${{ light: "légères", medium: "intermédiaires", heavy: "lourdes" }[prereq.armor] || prereq.armor}`);
  if (prereq.spellcaster) out.push("savoir lancer au moins un sort");
  return out.join(" ; ");
}
function renderPickSpecs(c, specs, prefix, { empty = "" } = {}) {
  if (!specs.length) return empty;
  return specs
    .map((spec) => {
      const path = `${prefix}.picks.${spec.path}`,
        selected = spec.selected.filter((x) => x in spec.options),
        full = selected.length >= spec.count,
        owned = new Set(spec.owned || []);
      const counter = `<span class="pill ${full ? "" : "outline"}">${selected.length}/${spec.count}</span>`;
      if (PICK_CHIP_TYPES.includes(spec.type)) {
        const chips = Object.entries(spec.options)
          .map(([id, [label, hint]]) => {
            const on = selected.includes(id),
              taken = owned.has(id) && !on,
              disabled = !on && ((full && spec.count > 1) || taken);
            return `<label class="check-chip ${on ? "checked" : ""} ${taken ? "taken" : ""}" title="${esc(taken ? "Déjà acquise par ailleurs" : hint || label)}"><input type="checkbox" data-array="${esc(path)}" value="${esc(id)}" data-limit="${spec.count}" ${on ? "checked" : ""} ${disabled ? "disabled" : ""}>${esc(label)}${hint && spec.type !== "skill" ? `<small>${esc(hint)}</small>` : ""}</label>`;
          })
          .join("");
        return `<section class="choice-spec pick-spec"><h3>${esc(spec.title)} ${counter}</h3><div class="chip-grid">${chips}</div></section>`;
      }
      const rows = Object.entries(spec.options)
        .map(([id, [label, desc]]) => {
          const on = selected.includes(id),
            disabled = !on && full && spec.count > 1;
          return `<label class="option-row ${on ? "selected" : ""}"><input type="checkbox" data-array="${esc(path)}" value="${esc(id)}" data-limit="${spec.count}" ${on ? "checked" : ""} ${disabled ? "disabled" : ""}><span><strong>${esc(label)}</strong>${desc ? `<p>${esc(desc)}</p>` : ""}</span></label>`;
        })
        .join("");
      const long = Object.keys(spec.options).length > 8;
      return `<section class="choice-spec pick-spec"><h3>${esc(spec.title)} ${counter}</h3>${long ? `<div class="option-scroll">${rows}</div>` : rows}</section>`;
    })
    .join("");
}
function renderSubclassPicker(c, classId, prefix) {
  const cls = CLASSES[classId],
    subs = SUBCLASSES[classId] || {},
    current = c.subclasses?.[classId] || "";
  const cards = Object.entries(subs)
    .map(
      ([id, s]) =>
        `<button type="button" class="choice-card sub-card ${current === id ? "selected" : ""}" data-action="choose-subclass" data-prefix="${prefix}" data-class="${classId}" data-id="${esc(id)}">${current === id ? `<span class="selected-check">${icon("check", 14)}</span>` : ""}<span class="choice-name">${esc(s.name)}</span><span class="choice-meta">${esc(s.desc || "")}</span>${sourcePill(s.source)}</button>`,
    )
    .join("");
  const sel = subs[current];
  const detail = sel
    ? `<div class="selected-description"><strong>${esc(sel.name)}</strong>${esc(sel.desc || "")}<div class="feature-list">${(sel.features || [])
        .map(
          ([lvl, name, text], i) =>
            `<details class="feature-item" data-detail="sub-${classId}-${i}"><summary><span>${esc(name)}<span class="feature-meta"> · niv. ${lvl}</span></span><span class="feature-arrow">${icon("chevron", 14)}</span></summary><div class="detail-copy">${esc(text)}</div></details>`,
        )
        .join("")}</div></div>`
    : current === "custom"
      ? `<div class="form-grid">${field("Nom de la sous-classe", `${prefix}.customSubclasses.${classId}.name`, c.customSubclasses?.[classId]?.name || "", "text", "", 'maxlength="100"')}</div>${field("Aptitudes et niveaux", `${prefix}.customSubclasses.${classId}.description`, c.customSubclasses?.[classId]?.description || "", "textarea", "Effets descriptifs. Les bonus chiffrés et compteurs s’ajoutent dans Maison.", 'maxlength="10000"')}`
      : notice(`Choisis ${cls.subLabel.toLowerCase()} : ce choix définit une grande partie de tes aptitudes futures.`, "warning");
  return `<section class="choice-spec subclass-picker"><h3>${esc(cls.subLabel)} <span class="pill outline">${cls.name} ${cls.subLevel}</span></h3><div class="choice-grid sub-grid">${cards}<button type="button" class="choice-card sub-card ${current === "custom" ? "selected" : ""}" data-action="choose-subclass" data-prefix="${prefix}" data-class="${classId}" data-id="custom">${current === "custom" ? `<span class="selected-check">${icon("check", 14)}</span>` : ""}<span class="choice-name">Sous-classe maison</span><span class="choice-meta">Création de ta table, effets manuels.</span></button></div>${detail}</section>`;
}
function featCandidate(c, level) {
  const before = clone(c);
  if (level === "race") before.raceFeat = null;
  else before.levels = c.levels.filter((x) => x.level < level);
  if (!before.levels.length) before.levels = [clone(c.levels[0])];
  return before;
}
function renderFeatPicker(c, path, current, level) {
  const base = featCandidate(c, level),
    query = (ui.featQuery || "").toLocaleLowerCase("fr-FR");
  const rows = Object.entries(FEATS)
    .map(([id, f]) => ({ id, f, ok: meetsPrereq(base, f.prereq) }))
    .filter(({ f, id }) => !query || id === current || f.name.toLocaleLowerCase("fr-FR").includes(query))
    .sort((a, b) => a.f.name.localeCompare(b.f.name, "fr"))
    .map(({ id, f, ok }) => {
      const on = current === id;
      return `<label class="option-row ${on ? "selected" : ""} ${ok.ok ? "" : "locked"}"><input type="radio" name="${esc(path)}" data-bind="${esc(path)}" value="${esc(id)}" ${on ? "checked" : ""} ${!ok.ok && !on ? "disabled" : ""}><span><strong>${esc(f.name)}</strong>${f.prereq ? `<em class="prereq ${ok.ok ? "" : "bad"}">${ok.ok ? "Prérequis : " : "Prérequis non rempli : "}${esc(prereqText(f.prereq))}</em>` : ""}<p>${esc(f.summary || "")}</p></span></label>`;
    })
    .join("");
  const custom = `<label class="option-row ${current === "custom" ? "selected" : ""}"><input type="radio" name="${esc(path)}" data-bind="${esc(path)}" value="custom" ${current === "custom" ? "checked" : ""}><span><strong>Don maison ou d’un autre livre</strong><p>Nom et effets libres ; les bonus chiffrés se règlent dans Maison.</p></span></label>`;
  return `<div class="feat-picker"><div class="search-wrap">${icon("search", 18)}<input id="feat-search-${esc(String(level))}" class="search-input" data-bind="ui.featQuery" value="${esc(ui.featQuery || "")}" placeholder="Chercher un don…" aria-label="Chercher un don"></div><div class="option-scroll tall">${rows || '<p class="small muted">Aucun don ne correspond.</p>'}${custom}</div></div>`;
}
function renderAsiEditor(c, level, prefix) {
  const l = c.levels[level - 1],
    i = level - 1,
    path = `${prefix}.levels.${i}.asi`;
  let body = "";
  if (l.asi.mode === "ability")
    body = `<div class="form-grid">${selectField("Premier +1", `${path}.a`, l.asi.a, Object.fromEntries(Object.entries(ABILITIES).map(([k, v]) => [k, v.name])))}${selectField("Deuxième +1", `${path}.b`, l.asi.b, Object.fromEntries(Object.entries(ABILITIES).map(([k, v]) => [k, v.name])))}</div><p class="tiny muted">Choisis deux fois la même caractéristique pour +2. Maximum 20.</p>`;
  else {
    body = renderFeatPicker(c, `${path}.featId`, l.asi.featId, level);
    if (l.asi.featId === "custom")
      body += `${field("Nom du don", `${path}.featName`, l.asi.featName || "", "text", "", 'maxlength="120"')}${field("Effets et prérequis", `${path}.featDescription`, l.asi.featDescription || "", "textarea", "Les bonus chiffrés éventuels se définissent dans Maison.", 'maxlength="6000"')}`;
    body += renderPickSpecs(c, pickSpecs(c, (src) => src.key === `feat|L${level}`), prefix);
  }
  return `<section class="choice-spec"><h3>Amélioration ou don</h3><div class="segmented"><button type="button" data-action="asi-mode" data-prefix="${prefix}" data-level="${level}" data-value="ability" class="${l.asi.mode === "ability" ? "active" : ""}">+2 ou +1/+1</button><button type="button" data-action="asi-mode" data-prefix="${prefix}" data-level="${level}" data-value="feat" class="${l.asi.mode === "feat" ? "active" : ""}">Prendre un don</button></div>${body}</section>`;
}
function renderLevelEditor(c, level, prefix) {
  const l = c.levels[level - 1],
    classId = l.classId,
    cls = CLASSES[classId],
    k = classLevelAt(c, level),
    d = derive(c);
  let html = "";
  if (level === 1) html += notice(`Niveau 1 : dé de vie maximal (${cls.die}), plus ton modificateur de Constitution.`);
  else
    html += `<section class="choice-spec"><h3>Points de vie</h3><div class="hp-editor">${field(`Résultat du d${cls.die}`, `${prefix}.levels.${level - 1}.hpDie`, l.hpDie, "number", `Moyenne fixe : ${cls.die / 2 + 1}. Constitution ${signed(d.mods.con)} ajoutée automatiquement.`, `min="1" max="${cls.die}" step="1"`)}<div class="actions">${button(`Moyenne (${cls.die / 2 + 1})`, "level-hp-average", `data-prefix="${prefix}" data-level="${level}"`, "small-btn")}${button(`${icon("dice", 15)} Lancer le d${cls.die}`, "level-hp-roll", `data-prefix="${prefix}" data-level="${level}"`, "small-btn ghost")}</div></div></section>`;
  if (k === cls.subLevel) html += renderSubclassPicker(c, classId, prefix);
  if (l.asi) html += renderAsiEditor(c, level, prefix);
  html += renderChoiceSpecs(c, level, prefix);
  const keys = [`sub|${classId}|${k}`, `ranger|enemy|L${level}`];
  if (k === 1 && level > 1) keys.push(`class|${classId}`);
  if (classId === "warlock" && k === 3) keys.push("pact|tome");
  html += renderPickSpecs(c, pickSpecs(c, (src) => keys.includes(src.key)), prefix);
  const fs = features(c, level).filter((f) => f.kind !== "asi" && f.kind !== "feat");
  html += `<div class="section-title section-gap"><h3>Gagné à ce niveau</h3><span class="pill outline">${esc(cls.name)} ${k}</span></div>${
    fs
      .map(
        (ft, i) =>
          `<details class="feature-item" data-detail="lvl-${prefix}-${level}-${i}"><summary><span>${esc(ft.name)}<span class="feature-meta"> · ${esc(ft.source)}</span></span><span class="feature-arrow">${icon("chevron", 14)}</span></summary><div class="detail-copy">${esc(ft.description)}</div></details>`,
      )
      .join("") || '<p class="small muted">Progression des PV, des ressources ou de la magie, sans nouvelle aptitude nommée.</p>'
  }`;
  return html;
}
function wizardSteps(w) {
  const c = w.draft,
    steps = [
      ["race", "Origine"],
      ["class", "Classe"],
      ["background", "Historique"],
      ["abilities", "Caracs"],
      ["skills", "Compétences"],
    ];
  if (!w.original) steps.push(["gear", "Équipement"]);
  if (spellcasters(c).length || innateSpells(c).length) steps.push(["magic", "Magie"]);
  if (!w.original && levelOf(c) > 1) steps.push(["levels", "Niveaux"]);
  steps.push(["review", "Personnage"]);
  return steps;
}
function wizardPreview(w) {
  return !w.original && w.draft.startKit?.mode === "kit" ? applyStartingKit(w.draft) : w.draft;
}
function renderRaceStep(w, c) {
  const r = raceOf(c),
    groups = {};
  for (const [id, race] of Object.entries(RACES)) (groups[race.group || race.name] ||= []).push([id, race]);
  for (const g of Object.keys(groups))
    if (groups[g].length === 1) {
      (groups["Autres peuples"] ||= []).push(...groups[g]);
      delete groups[g];
    }
  const order = [...RACE_GROUP_ORDER.filter((g) => groups[g]), ...Object.keys(groups).filter((g) => !RACE_GROUP_ORDER.includes(g))];
  const card = (id, race) =>
    `<button type="button" class="choice-card race-card ${c.raceId === id ? "selected" : ""}" data-action="choose-race" data-id="${id}">${c.raceId === id ? `<span class="selected-check">${icon("check", 14)}</span>` : ""}<span class="choice-name">${esc(race.name)}</span><span class="choice-meta">${esc(race.subtitle || "")}</span><span class="choice-bonus">${esc(bonusLine(race.grants))}</span></button>`;
  const grid = order
    .map((g) => `<div class="race-group"><div class="race-group-label">${esc(g)}</div><div class="choice-grid compact">${groups[g].map(([id, race]) => card(id, race)).join("")}</div></div>`)
    .join("");
  const g = r.grants || {},
    langs = (g.languages || []).map((l) => LANGUAGES[l]?.name || l);
  if (g.languageChoice) langs.push(`${g.languageChoice.count} au choix`);
  const facts = [
    ["Vitesse", formatMeters(r.speed)],
    ["Taille", r.size === "P" ? "Petite" : "Moyenne"],
    g.darkvision ? ["Vision dans le noir", formatMeters(g.darkvision)] : null,
    ["Langues", langs.join(", ") || "À préciser"],
    g.resistances?.length ? ["Résistances", g.resistances.join(", ")] : null,
  ].filter(Boolean);
  const raceSpecs = pickSpecs(c, (src) => src.key === "race").filter((s) => ["ability", "spell", "option"].includes(s.type));
  const featSpecs = pickSpecs(c, (src) => src.key === "feat|race");
  const later = pickSpecs(c, (src) => src.key === "race").filter((s) => !["ability", "spell", "option"].includes(s.type));
  const custom =
    c.raceId === "custom"
      ? `<div class="form-grid">${field("Nom de l’origine", "wiz.customRace.name", c.customRace.name, "text", "", 'maxlength="80"')}${field("Vitesse (m)", "wiz.customRace.speed", c.customRace.speed, "number", "", 'min="0" max="90" step="0.5"')}${selectField("Taille", "wiz.customRace.size", c.customRace.size, { P: "Petite", M: "Moyenne" })}${field("Langues au choix", "wiz.customRace.languageCount", c.customRace.languageCount ?? 1, "number", "En plus du commun.", 'min="0" max="5" step="1"')}</div><div class="form-grid six">${Object.entries(ABILITIES)
          .map(([a, v]) => field(`${v.short}`, `wiz.customRace.bonuses.${a}`, c.customRace.bonuses?.[a] || 0, "number", "", 'min="-5" max="10" step="1"'))
          .join("")}</div>${field("Traits de cette origine", "wiz.customRace.description", c.customRace.description || "", "textarea", "Effets descriptifs. Les effets chiffrés s’ajoutent ensuite dans Maison.", 'maxlength="6000"')}`
      : "";
  return `<h2>D’où viens-tu ?</h2><p class="wizard-intro">Ton peuple apporte des bonus de caractéristiques, des sens et des talents. Règles du Manuel des joueurs 2014.</p>${grid}<div class="race-group"><div class="race-group-label">Maison</div><div class="choice-grid compact">${card("custom", { name: "Origine maison", subtitle: "Crée celle de ta table", grants: c.customRace ? { abilities: c.customRace.bonuses } : {} })}</div></div><div class="selected-description race-detail"><div class="detail-head"><strong>${esc(r.name)}</strong>${sourcePill(r.source)}</div>${esc(r.desc || "")}<div class="fact-row">${facts.map(([k, v]) => `<span><small>${esc(k)}</small>${esc(v)}</span>`).join("")}</div><div class="feature-list">${(r.traits || [])
    .map(
      ([name, desc], i) =>
        `<details class="feature-item" data-detail="wizard-race-${i}"><summary><span>${esc(name)}</span><span class="feature-arrow">${icon("chevron", 14)}</span></summary><div class="detail-copy">${esc(desc)}</div></details>`,
    )
    .join("")}</div></div>${custom}${renderPickSpecs(c, raceSpecs, "wiz")}${
    g.feat
      ? `<section class="choice-spec"><h3>Don de départ</h3><p class="help">L’humain variant commence avec un don de son choix.</p>${renderFeatPicker(c, "wiz.raceFeat", c.raceFeat, "race")}${renderPickSpecs(c, featSpecs, "wiz")}</section>`
      : ""
  }${later.length ? notice(`${later.map((s) => esc(s.title)).join(" · ")} : à choisir à l’étape Compétences.`) : ""}`;
}
function renderClassStep(w, c) {
  const d = derive(c),
    id = primaryClassId(c),
    cls = CLASSES[id],
    locked = !!w.original && d.multiclass,
    extra = CLASS_EXTRAS[id] || {};
  const cards = Object.entries(CLASSES)
    .map(
      ([cid, k]) =>
        `<button type="button" class="choice-card ${id === cid ? "selected" : ""}" data-action="choose-class" data-id="${cid}" ${locked && id !== cid ? "disabled" : ""}>${id === cid ? `<span class="selected-check">${icon("check", 14)}</span>` : ""}<div class="choice-icon">${icon(k.icon, 25)}</div><span class="choice-name">${k.name}</span><span class="choice-meta">${k.role}</span></button>`,
    )
    .join("");
  const casting = cls.caster === "none" ? "Aucune magie de classe" : `${{ full: "Lanceur complet", half: "Demi-lanceur (dès le niveau 2)", pact: "Magie de pacte" }[cls.caster]} · ${ABILITIES[cls.ability].name}`;
  const armorNames = { light: "légères", medium: "intermédiaires", heavy: "lourdes", shield: "boucliers" };
  const weaponText = cls.weapons.map((x) => (x === "simple" ? "armes courantes" : x === "martial" ? "armes de guerre" : WEAPONS[x]?.name.toLowerCase() || x)).join(", ");
  const startLevel = levelOf(c);
  const choices = choicesFor(c, 1).filter((s) => s.key !== "expertise");
  return `<h2>Quelle est ta vocation ?</h2><p class="wizard-intro">Choisis une classe pour la façon de jouer qu’elle propose. Tu pourras la combiner avec une autre plus tard (multiclassage).</p>${locked ? notice("Ce personnage est multiclassé : sa classe de départ se corrige depuis Évolution, niveau par niveau.", "warning") : ""}<div class="choice-grid">${cards}</div><div class="selected-description"><div class="detail-head"><strong>${cls.name}</strong><span class="pill">d${cls.die} de vie</span></div>${esc(cls.desc)}<div class="fact-row"><span><small>Sauvegardes</small>${cls.saves.map((a) => ABILITIES[a].name).join(", ")}</span><span><small>Armures</small>${cls.armors.map((a) => armorNames[a]).join(", ") || "aucune"}</span><span><small>Armes</small>${esc(weaponText)}</span><span><small>Magie</small>${casting}</span><span><small>${esc(cls.subLabel)}</small>niveau ${cls.subLevel}</span>${extra.multiclass?.prereq ? `<span><small>Multiclasse</small>${esc(prereqText(extra.multiclass.prereq))}</span>` : ""}</div></div>${
    w.original
      ? ""
      : `<section class="choice-spec"><h3>Niveau de départ</h3><p class="help">Ta campagne commence plus haut ? Les niveaux supplémentaires se règlent à l’étape Niveaux.</p>${selectField("Niveau", "ui.wizard.startLevel", startLevel, Object.fromEntries(Array.from({ length: 20 }, (_, i) => [i + 1, `Niveau ${i + 1}`])), "", 'data-number="1"')}</section>`
  }${cls.subLevel === 1 ? renderSubclassPicker(c, id, "wiz") : ""}${renderPickSpecs(c, pickSpecs(c, (src) => src.key === `sub|${id}|1`).filter((s) => !PICK_CHIP_TYPES.includes(s.type)), "wiz")}${choices.length ? renderChoiceSpecs(c, 1, "wiz", (s) => s.key !== "expertise") : ""}`;
}
function renderBackgroundStep(w, c) {
  const bg = backgroundOf(c),
    current = c.background.id || "custom";
  const cards = Object.entries(BACKGROUNDS)
    .map(
      ([id, b]) =>
        `<button type="button" class="choice-card ${current === id ? "selected" : ""}" data-action="choose-background" data-id="${id}">${current === id ? `<span class="selected-check">${icon("check", 14)}</span>` : ""}<span class="choice-name">${esc(b.name)}</span><span class="choice-meta">${(b.skills || []).map((s) => SKILLS[s]?.[0]).join(" · ")}</span></button>`,
    )
    .join("");
  const g = bg.grants || {},
    tools = [...(g.tools || []).map((t) => TOOLS[t]?.name || t)];
  if (g.toolChoice) tools.push(`${g.toolChoice.count} au choix`);
  const facts = [
    ["Compétences", bg.skills.map((s) => SKILLS[s]?.[0]).join(", ") || "à choisir"],
    tools.length ? ["Outils", tools.join(", ")] : null,
    g.languageChoice ? ["Langues", `${g.languageChoice.count} au choix`] : null,
    bg.gold ? ["Bourse", `${bg.gold} po`] : null,
  ].filter(Boolean);
  const custom =
    current === "custom"
      ? `<div class="form-grid">${field("Nom de l’historique", "wiz.background.name", c.background.name, "text", "", 'maxlength="80"')}${field("Nom de l’aptitude", "wiz.background.featureName", c.background.featureName || "", "text", "", 'maxlength="120"')}</div><h3 style="margin:6px 0 10px">Deux compétences</h3>${skillChips(c, "wiz.background.skills", c.background.skills, Object.keys(SKILLS), 2)}<div class="spacer"></div>${field("Aptitude d’historique", "wiz.background.feature", c.background.feature || "", "textarea", "Avantage narratif à valider avec le MJ.", 'maxlength="4000"')}${field("Équipement", "wiz.background.equipment", c.background.equipment || "", "text", "", 'maxlength="600"')}`
      : "";
  return `<h2>Quel a été ton passé ?</h2><p class="wizard-intro">L’historique raconte d’où tu viens : deux compétences, des outils ou des langues, et une aptitude utile en dehors des combats.</p><div class="choice-grid">${cards}<button type="button" class="choice-card ${current === "custom" ? "selected" : ""}" data-action="choose-background" data-id="custom">${current === "custom" ? `<span class="selected-check">${icon("check", 14)}</span>` : ""}<span class="choice-name">Personnalisé</span><span class="choice-meta">Compose le tien avec le MJ</span></button></div><div class="selected-description"><div class="detail-head"><strong>${esc(bg.name)}</strong>${sourcePill(bg.source)}</div>${esc(bg.desc || "")}<div class="fact-row">${facts.map(([k, v]) => `<span><small>${esc(k)}</small>${esc(v)}</span>`).join("")}</div>${
    bg.feature?.[0] ? `<details class="feature-item" open data-detail="bg-feature"><summary><span>Aptitude : ${esc(bg.feature[0])}</span><span class="feature-arrow">${icon("chevron", 14)}</span></summary><div class="detail-copy">${esc(bg.feature[1] || "")}</div></details>` : ""
  }${bg.equipment && current !== "custom" ? `<p class="tiny muted" style="margin-top:8px">Équipement : ${esc(bg.equipment)}</p>` : ""}${bg.variants?.length ? `<p class="tiny muted">Variantes : ${bg.variants.map((v) => esc(v.name)).join(", ")}.</p>` : ""}</div>${custom}${notice("Les compétences, langues et outils au choix se règlent à l’étape suivante, avec tous les autres.")}`;
}
function renderAbilitiesStep(w, c) {
  const d = derive(c),
    acc = d.acc,
    method = c.abilityMethod,
    pool = method === "rolled" ? w.rollPool || [] : [15, 14, 13, 12, 10, 8];
  const methodNotice =
    method === "points"
      ? notice(`<strong>${27 - pointBuyCost(c.abilities)} points restants sur 27</strong>Valeurs de base de 8 à 15. Monter à 14 ou 15 coûte deux points par palier.`, pointBuyCost(c.abilities) > 27 ? "error" : "")
      : method === "manual"
        ? notice("Saisis les valeurs autorisées par ton MJ. Les bonus raciaux s’ajoutent automatiquement : ne les compte pas deux fois.")
        : method === "rolled"
          ? `${notice("4d6 par caractéristique, on garde les trois meilleurs dés. Lance une série, puis répartis les six résultats.")}<div class="actions">${button(`${icon("dice", 16)} ${pool.length ? "Relancer les six valeurs" : "Lancer les six valeurs"}`, "roll-abilities", "", "small-btn")}</div>${pool.length ? `<div class="learn-counts">${(w.rollDetails || []).map((r) => `<span class="pill outline" title="${r.dice.join(", ")}">${r.total}</span>`).join("")}</div>` : ""}`
          : notice("Répartis 15, 14, 13, 12, 10 et 8. Choisir une valeur déjà utilisée échange les deux caractéristiques.");
  const asiBonus = (a) => c.levels.reduce((s, l) => s + (l.asi?.mode === "ability" ? (l.asi.a === a) + (l.asi.b === a) : 0), 0);
  const rows = Object.entries(ABILITIES)
    .map(([a, v]) => {
      const racial = acc.abilities[a],
        other = d.scores[a] - c.abilities[a] - racial;
      const breakdown = [`base ${c.abilities[a]}`, racial ? `origine ${signed(racial)}` : "", asiBonus(a) ? `niveaux ${signed(asiBonus(a))}` : "", other - asiBonus(a) ? `autres ${signed(other - asiBonus(a))}` : ""]
        .filter(Boolean)
        .join(" · ");
      const input =
        method === "standard" || method === "rolled"
          ? `<select id="score-${a}" data-bind="wiz.abilities.${a}" data-number="1" aria-label="Valeur de base de ${v.name}" ${method === "rolled" && !pool.length ? "disabled" : ""}>${(pool.length ? pool : [c.abilities[a]]).map((n, i) => `<option ${c.abilities[a] === n ? "selected" : ""} value="${n}">${n}</option>`).join("")}</select>`
          : `<div class="stepper"><button type="button" class="icon-btn" data-action="ability-step" data-key="${a}" data-delta="-1" aria-label="Diminuer ${v.name}">${icon("minus", 16)}</button><input id="score-${a}" type="number" inputmode="numeric" data-bind="wiz.abilities.${a}" min="${method === "points" ? 8 : 1}" max="${method === "points" ? 15 : 20}" value="${c.abilities[a]}" aria-label="Valeur de base de ${v.name}"><button type="button" class="icon-btn" data-action="ability-step" data-key="${a}" data-delta="1" aria-label="Augmenter ${v.name}">${icon("plus", 16)}</button></div>`;
      return `<div class="score-editor ${CLASSES[primaryClassId(c)].primary[0] === a ? "key-ability" : ""}"><div><div class="ability-name">${v.name}${CLASSES[primaryClassId(c)].primary[0] === a ? ' <span class="pill sand">clé</span>' : ""}</div><div class="ability-help">${breakdown}</div></div>${input}<div class="final-score">${d.scores[a]}<small>${signed(d.mods[a])}</small></div></div>`;
    })
    .join("");
  return `<h2>Trouve ton équilibre.</h2><p class="wizard-intro">À gauche, la valeur de base. À droite, le score final avec ton origine. Le modificateur change tous les deux points.</p><div class="segmented four">${[
    ["standard", "Série standard"],
    ["points", "27 points"],
    ["rolled", "4d6"],
    ["manual", "Libre"],
  ]
    .map(([id, label]) => `<button type="button" data-action="ability-method" data-value="${id}" class="${method === id ? "active" : ""}">${label}</button>`)
    .join("")}</div>${methodNotice}<div class="spacer"></div>${rows}<div class="actions">${method === "standard" || method === "points" ? button(`${icon("sparkles", 16)} Répartition conseillée pour ${CLASSES[primaryClassId(c)].name.toLowerCase()}`, "recommend-abilities", "", "small-btn ghost") : ""}</div>${pickSpecs(c, (src) => src.key === "race").some((s) => s.type === "ability") ? notice("Les bonus +1 au choix de ton origine se règlent à l’étape Origine.") : ""}`;
}
function renderSkillsStep(w, c) {
  const d = derive(c),
    cls = CLASSES[primaryClassId(c)],
    acc = d.acc;
  const fixedFrom = (list, label) => list.map((s) => [s, label]);
  const bg = backgroundOf(c);
  const granted = [
    ...fixedFrom(raceOf(c).grants?.skills || [], raceOf(c).name),
    ...fixedFrom(backgroundSkills(c), bg.name),
  ];
  const otherPicks = pickSpecs(c, (src) => ["race", "bg", `class|${primaryClassId(c)}`, `sub|${primaryClassId(c)}|1`, "ranger|enemy|L1"].includes(src.key)).filter((s) =>
    PICK_CHIP_TYPES.includes(s.type) && s.type !== "ability",
  );
  const pickedElsewhere = new Set([...granted.map(([s]) => s), ...otherPicks.filter((s) => s.type === "skill").flatMap((s) => s.selected)]);
  const languageText = d.languages.map((l) => l.name).join(", ") || "Commun";
  return `<h2>Ce que tu sais faire.</h2><p class="wizard-intro">Une maîtrise ajoute ${signed(d.prof)} au jet. Une compétence déjà acquise ne peut pas être prise deux fois : elle est grisée.</p>${
    granted.length
      ? `<div class="granted-row">${granted.map(([s, from]) => `<span class="pill" title="${esc(from)}">${esc(SKILLS[s]?.[0] || s)} <small>· ${esc(from)}</small></span>`).join("")}</div>`
      : ""
  }<section class="choice-spec"><h3>${cls.pick} compétences de ${cls.name.toLowerCase()} <span class="pill ${c.skills.length === cls.pick ? "" : "outline"}">${c.skills.length}/${cls.pick}</span></h3>${skillChips(c, "wiz.skills", c.skills, cls.skills, cls.pick, pickedElsewhere)}</section>${renderPickSpecs(c, otherPicks, "wiz")}${renderChoiceSpecs(c, 1, "wiz", (s) => s.key === "expertise")}<div class="panel soft section-gap"><div class="summary-row"><span>Langues</span><strong>${esc(languageText)}</strong></div><div class="summary-row"><span>Outils</span><strong>${esc(d.tools.map((t) => t.name).join(", ") || "Aucun")}</strong></div></div>`;
}
function renderGearStep(w, c) {
  const id = primaryClassId(c),
    extra = CLASS_EXTRAS[id] || {},
    kit = c.startKit || { mode: "kit", choices: {}, picks: {} },
    bg = backgroundOf(c);
  const groups = (extra.startingEquipment || [])
    .map((group, g) => {
      const chosen = clamp(kit.choices?.[g] ?? 0, 0, group.options.length - 1);
      const options = group.options
        .map((opt, o) => {
          const on = o === chosen;
          const wild = on
            ? opt.items
                .map(([item, qty = 1], i) =>
                  item.startsWith("@")
                    ? Array.from({ length: qty }, (_, n) => {
                        const key = `${g}-${o}-${i}-${n}`,
                          opts = wildcardOptions(item);
                        return selectField(`Choix ${qty > 1 ? n + 1 : ""}`.trim(), `wiz.startKit.picks.${key}`, kit.picks?.[key] || opts[0]?.[0], Object.fromEntries(opts));
                      }).join("")
                    : "",
                )
                .join("")
            : "";
          return `<label class="option-row ${on ? "selected" : ""}"><input type="radio" name="kit-${g}" data-bind="wiz.startKit.choices.${g}" data-number="1" value="${o}" ${on ? "checked" : ""}><span><strong>${esc(opt.label)}</strong>${wild ? `<div class="form-grid kit-picks">${wild}</div>` : ""}</span></label>`;
        })
        .join("");
      return `<section class="choice-spec kit-group">${group.title ? `<h3>${esc(group.title)}</h3>` : ""}${options}</section>`;
    })
    .join("");
  const preview = startingItems(c);
  return `<h2>Ton paquetage.</h2><p class="wizard-intro">Prends l’équipement de départ de ta classe, ou de l’or pour tout acheter toi-même avec le MJ.</p><div class="segmented"><button type="button" data-action="kit-mode" data-value="kit" class="${kit.mode !== "gold" ? "active" : ""}">Équipement de départ</button><button type="button" data-action="kit-mode" data-value="gold" class="${kit.mode === "gold" ? "active" : ""}">Or (${esc(extra.startingGold || "selon la classe")})</button></div>${
    kit.mode === "gold"
      ? `${field("Pièces d’or de départ", "wiz.gold", c.gold, "number", `Lance ${esc(extra.startingGold || "les dés indiqués par ta classe")} ou utilise le montant fixé par le MJ.`, 'min="0" max="100000" step="1"')}${extra.startingGold ? button(`${icon("dice", 15)} Lancer ${esc(extra.startingGold)}`, "roll-gold", "", "small-btn") : ""}`
      : `${groups || notice("Aucun équipement de départ n’est défini pour cette classe.")}<div class="panel soft section-gap"><h3>Dans ton sac au départ</h3><p class="small">${esc(preview.map((x) => `${x.info.name}${x.qty > 1 ? ` ×${x.qty}` : ""}`).join(", ") || "Rien")}</p>${bg.equipment ? `<p class="small muted">Historique : ${esc(bg.equipment)}${bg.gold ? `, ${bg.gold} po` : ""}.</p>` : ""}</div>`
  }`;
}
function renderMagicStep(w, c) {
  const casters = spellcasters(c),
    innate = innateSpells(c);
  return `<h2>Choisis ta magie.</h2><p class="wizard-intro">Ouvre un sort pour lire son effet. ${casters.length ? "Les compteurs indiquent ce que ta classe permet à ce niveau." : "Ta classe ne lance pas de sorts, mais ton origine ou un don t’en donne."}</p>${
    innate.length
      ? notice(`Magie d’origine ou de don, comptée à part : ${innate.map((x) => esc(spellById(c, x.id)?.name || x.id)).join(", ")}.`)
      : ""
  }${casters.length ? renderMagicEditor(c, "wizard") : ""}`;
}
function renderLevelsStep(w, c) {
  const n = levelOf(c);
  return `<h2>Les niveaux déjà franchis.</h2><p class="wizard-intro">Ton personnage commence au niveau ${n}. Règle chaque palier comme si tu l’avais vécu : PV, sous-classe, améliorations et choix de classe.</p>${c.levels
    .slice(1)
    .map((l) => {
      const issues = choicesFor(c, l.level).length + (l.asi ? 1 : 0);
      return `<details class="level-block" data-detail="wiz-level-${l.level}" ${l.level === 2 ? "open" : ""}><summary><span class="level-marker small">${l.level}</span><span><strong>Niveau ${l.level}</strong><small>${esc(CLASSES[l.classId].name)} ${classLevelAt(c, l.level)}${issues ? ` · ${issues} choix` : ""}</small></span><span class="feature-arrow">${icon("chevron", 14)}</span></summary><div class="level-block-body">${renderLevelEditor(c, l.level, "wiz")}</div></details>`;
    })
    .join("")}`;
}
function renderReviewStep(w, c) {
  const d = derive(wizardPreview(w)),
    issues = characterIssues(c),
    details = c.details || {};
  issues.errors = issues.errors.filter((e) => !e.startsWith("Donne un nom"));
  return `<h2>${w.original ? "Vérifie les changements." : "Qui part à l’aventure ?"}</h2><p class="wizard-intro">${w.original ? "Rien n’est encore remplacé. Compare les valeurs, puis valide." : "Un nom, un caractère, une histoire. Tout reste modifiable plus tard."}</p>${field("Nom du personnage", "wiz.name", c.name, "text", "", 'placeholder="Ex. : Élyra, Brann, Oren…" maxlength="80" autocomplete="off"')}<div class="form-grid">${selectField("Alignement", "wiz.alignment", c.alignment, { "": "Non précisé", ...Object.fromEntries(ALIGNMENTS.map((a) => [a, a])) })}${field("Âge", "wiz.details.age", details.age || "", "text", "", 'maxlength="40"')}${field("Taille", "wiz.details.height", details.height || "", "text", "", 'maxlength="40"')}${field("Poids", "wiz.details.weight", details.weight || "", "text", "", 'maxlength="40"')}${field("Yeux", "wiz.details.eyes", details.eyes || "", "text", "", 'maxlength="40"')}${field("Cheveux", "wiz.details.hair", details.hair || "", "text", "", 'maxlength="40"')}</div><details class="feature-item" data-detail="wiz-personality"><summary><span>Personnalité : traits, idéaux, liens, défauts</span><span class="feature-arrow">${icon("chevron", 14)}</span></summary><div class="form-grid">${field("Traits de personnalité", "wiz.details.traits", details.traits || "", "textarea", "", 'maxlength="1500" rows="3"')}${field("Idéaux", "wiz.details.ideals", details.ideals || "", "textarea", "", 'maxlength="1500" rows="3"')}${field("Liens", "wiz.details.bonds", details.bonds || "", "textarea", "", 'maxlength="1500" rows="3"')}${field("Défauts", "wiz.details.flaws", details.flaws || "", "textarea", "", 'maxlength="1500" rows="3"')}</div></details>${field("Histoire et apparence", "wiz.biography", c.biography, "textarea", "", 'placeholder="Ce qui te pousse à partir…" maxlength="6000" rows="4"')}<div class="review-section"><div class="summary-row"><span>Origine</span><strong>${esc(d.race.name)}</strong></div><div class="summary-row"><span>Classe</span><strong>${esc(classSummary(c))}${subclassSummary(c) ? ` · ${esc(subclassSummary(c))}` : ""}</strong></div><div class="summary-row"><span>Historique</span><strong>${esc(d.background.name)}</strong></div><div class="summary-row"><span>Compétences</span><strong>${Object.keys(d.ranks)
    .filter((s) => d.ranks[s])
    .map((s) => SKILLS[s][0] + (d.ranks[s] === 2 ? " (expertise)" : ""))
    .join(", ")}</strong></div><div class="summary-row"><span>Langues</span><strong>${esc(d.languages.map((l) => l.name).join(", "))}</strong></div><div class="summary-row"><span>Outils</span><strong>${esc(d.tools.map((t) => t.name).join(", ") || "Aucun")}</strong></div><div class="summary-row"><span>Attaques</span><strong>${esc(d.attacks.map((a) => `${a.name} ${signed(a.attack)}`).join(" · "))}</strong></div></div><div class="review-section"><h3>${w.original ? "Ce qui change sur la fiche" : "Tes valeurs de départ"}</h3>${impactHtml(w.original, wizardPreview(w))}</div>${issues.errors.length ? issueList(issues.errors, "error") : ""}${issues.warnings.length ? `<div class="review-section"><h3>À compléter ou à valider avec le MJ</h3>${issueList(issues.warnings)}</div>` : ""}`;
}
const PICK_CHIP_TYPES = ["ability", "skill", "language", "tool", "weapon", "skillOrTool", "toolOrLanguage"];
function renderWizard() {
  const w = ui.wizard,
    c = w.draft,
    steps = wizardSteps(w);
  if (!steps.some(([id]) => id === w.step)) w.step = steps[0][0];
  const index = steps.findIndex(([id]) => id === w.step),
    last = index === steps.length - 1,
    preview = wizardPreview(w);
  return `<div class="wizard-wrap"><div class="wizard-top"><span class="eyebrow">${w.original ? "Corriger" : "Créer un personnage"} · ${index + 1}/${steps.length} · ${steps[index][1]}</span>${button(`${icon("x", 15)} Quitter`, "leave-wizard", "", "small-btn ghost")}</div><div class="wizard-progress" style="--steps:${steps.length}">${steps
    .map(
      ([id, label], i) =>
        `<button type="button" class="wizard-step ${i === index ? "active" : i < index ? "done" : ""}" data-action="wizard-step" data-step="${id}" ${i > index && !w.visited?.includes(id) ? "disabled" : ""}><span class="step-number">${i < index ? icon("check", 13) : i + 1}</span><span class="step-label">${label}</span></button>`,
    )
    .join("")}</div><div class="wizard-layout"><div class="wizard-main">${renderWizardStep(w, c)}${w.error ? `<div class="wizard-error">${notice(esc(w.error), "error")}</div>` : ""}</div>${miniPreview(preview)}</div><div class="wizard-footer">${button(`${icon("back", 16)} ${index ? "Précédent" : "Annuler"}`, "wizard-prev", "", "ghost")}${
    last
      ? button(`${icon("check", 17)} ${w.original ? "Valider les corrections" : "Créer la fiche"}`, "wizard-save", "", "primary")
      : button(`${steps[index + 1][1]} ${icon("arrow", 16)}`, "wizard-next", "", "primary")
  }</div></div>`;
}
const RACE_GROUP_ORDER = ["Humain", "Nain", "Elfe", "Halfelin", "Gnome", "Demi-elfe", "Demi-orc", "Drakéide", "Tieffelin"];
function renderWizardStep(w, c) {
  switch (w.step) {
    case "race":
      return renderRaceStep(w, c);
    case "class":
      return renderClassStep(w, c);
    case "background":
      return renderBackgroundStep(w, c);
    case "abilities":
      return renderAbilitiesStep(w, c);
    case "skills":
      return renderSkillsStep(w, c);
    case "gear":
      return renderGearStep(w, c);
    case "magic":
      return renderMagicStep(w, c);
    case "levels":
      return renderLevelsStep(w, c);
    default:
      return renderReviewStep(w, c);
  }
}
function renderChoiceSpecs(c, level, prefix, filter = () => true) {
  return choicesFor(c, level)
    .filter(filter)
    .map((s) => {
      const path = `${prefix}.levels.${level - 1}.choices.${s.key}`,
        value = c.levels[level - 1].choices[s.key],
        arr = value == null ? [] : Array.isArray(value) ? value : [value];
      if (s.type === "text") return `<div class="choice-spec">${field(s.title, path, value || "", "text", s.help, 'maxlength="300"')}</div>`;
      const options = Object.entries(s.options);
      const rows =
        options
          .map(
            ([key, [label, desc]]) =>
              `<label class="option-row ${arr.includes(key) ? "selected" : ""}"><input type="${s.type === "one" ? "radio" : "checkbox"}" ${s.type === "one" ? `data-bind="${path}" name="${path}"` : `data-array="${path}" data-limit="${s.count}"`} value="${esc(key)}" ${arr.includes(key) ? "checked" : ""} ${s.type === "many" && arr.length >= s.count && !arr.includes(key) ? "disabled" : ""}><span><strong>${esc(label)}</strong><p>${esc(desc || "")}</p></span></label>`,
          )
          .join("") || notice("Aucune option admissible pour le moment. Vérifie tes maîtrises et les choix des niveaux précédents.", "warning");
      return `<section class="choice-spec"><h3>${esc(s.title)} ${s.count > 1 ? `<span class="pill ${arr.length >= s.count ? "" : "outline"}">${arr.length}/${s.count}</span>` : ""}</h3>${s.help ? `<p class="help">${esc(s.help)}</p>` : ""}${options.length > 8 ? `<div class="option-scroll">${rows}</div>` : rows}</section>`;
    })
    .join("");
}
function renderLevelFlow() {
  const f = ui.levelFlow,
    c = f.draft,
    level = f.level,
    l = c.levels[level - 1],
    issues = characterIssues(c);
  let content = "";
  if (f.step === 0) {
    let classPicker = "";
    if (f.isNew) {
      const opts = multiclassOptions(f.original);
      const current = opts.filter((o) => o.current),
        others = opts.filter((o) => !o.current);
      const card = (o) => {
        const k = classLevel(f.original, o.classId) + 1;
        return `<button type="button" class="choice-card ${l.classId === o.classId ? "selected" : ""} ${o.ok ? "" : "locked"}" data-action="level-class" data-id="${o.classId}" ${o.ok ? "" : "disabled"} title="${esc(o.reasons.join(" ; "))}">${l.classId === o.classId ? `<span class="selected-check">${icon("check", 14)}</span>` : ""}<div class="choice-icon">${icon(CLASSES[o.classId].icon, 22)}</div><span class="choice-name">${CLASSES[o.classId].name} ${k}</span><span class="choice-meta">${o.ok ? (o.current ? "Continuer" : "Multiclasser") : esc(o.reasons[0] || "Prérequis manquants")}</span></button>`;
      };
      classPicker = `<section class="choice-spec"><h3>Dans quelle classe progresser ?</h3><div class="choice-grid compact">${current.map(card).join("")}</div><details class="feature-item" data-detail="multiclass" ${current.some((o) => o.classId === l.classId) ? "" : "open"}><summary><span>Multiclasser vers une autre classe</span><span class="feature-arrow">${icon("chevron", 14)}</span></summary><p class="small muted">Prérequis 2014 : 13 dans la caractéristique principale de ta classe actuelle et de la nouvelle. Tu ne gagnes qu’une partie des maîtrises de la nouvelle classe.</p><div class="choice-grid compact">${others.map(card).join("")}</div></details></section>`;
    }
    content = `<h2>${f.isNew ? "Une nouvelle étape." : "Revenir sur un choix."}</h2><p class="wizard-intro">${f.isNew ? `Prépare le niveau ${level}. Rien n’est appliqué avant le récapitulatif.` : `Tu corriges le niveau ${level}. Les niveaux suivants sont conservés et recalculés ; les choix devenus invalides seront signalés.`}</p>${classPicker}${renderLevelEditor(c, level, "lvl")}`;
  } else if (f.step === 1)
    content = `<h2>Et côté magie ?</h2><p class="wizard-intro">Les nouveaux quotas et niveaux de sorts sont déjà comptés. Choisis maintenant, ou complète plus tard depuis le grimoire.</p>${spellcasters(c).length ? renderMagicEditor(c, "level") : notice("Aucune classe de lanceur de sorts à ce niveau. Passe à la vérification.")}`;
  else
    content = `<h2>Avant de tourner la page.</h2><p class="wizard-intro">${f.isNew ? "Voici les conséquences de cette montée de niveau." : "Voici les conséquences de la correction, sur toute la fiche."}</p>${impactHtml(f.original, c)}<div class="section-gap"><h3>Choix du niveau ${level}</h3>${summarizeChoice(c, l)}</div><div class="section-gap">${issueList(issues.errors, "error")}${issueList(issues.warnings)}</div><div class="notice section-gap">${icon("heart", 18)}<div><strong>Les blessures sont conservées.</strong>Les PV actuels suivent le maximum. Un personnage à 0 PV n’est pas relevé par la montée de niveau, et les ressources dépensées ne reviennent pas.</div></div>`;
  return `<div class="wizard-wrap"><div class="wizard-top"><span class="eyebrow">${esc(c.name)} · ${f.isNew ? "Niveau " + level : "Correction du niveau " + level}</span>${button(`${icon("x", 15)} Annuler`, "cancel-level", "", "small-btn ghost")}</div><div class="wizard-progress" style="--steps:3">${["Classe & choix", "Magie", "Vérification"]
    .map(
      (text, i) =>
        `<button type="button" class="wizard-step ${i === f.step ? "active" : i < f.step ? "done" : ""}" data-action="level-step" data-step="${i}" ${i > f.step ? "disabled" : ""}><span class="step-number">${i < f.step ? icon("check", 13) : i + 1}</span><span class="step-label">${text}</span></button>`,
    )
    .join("")}</div><div class="wizard-layout"><div class="wizard-main">${content}${f.error ? `<div class="wizard-error">${notice(esc(f.error), "error")}</div>` : ""}</div>${miniPreview(c)}</div><div class="wizard-footer">${button(`${icon("back", 16)} ${f.step ? "Précédent" : "Annuler"}`, "level-prev", "", "ghost")}${f.step < 2 ? button(`Continuer ${icon("arrow", 16)}`, "level-next", "", "primary") : button(`${icon("check", 17)} ${f.isNew ? "Valider le niveau " + level : "Valider la correction"}`, "level-save", issues.errors.length ? "disabled" : "", "primary")}</div></div>`;
}
function modalShell(title, body, footer = "", wide = false, eyebrow = "") {
  return `<div class="modal-backdrop" data-backdrop="1"><section class="modal ${wide ? "wide" : ""}" role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabindex="-1"><header class="modal-head"><div>${eyebrow ? `<div class="eyebrow">${esc(eyebrow)}</div>` : ""}<h2 id="dialog-title">${title}</h2></div>${smallIcon("x", "close-modal", "Fermer la fenêtre")}</header><div class="modal-body">${body}</div>${footer ? `<footer class="modal-footer">${footer}</footer>` : ""}</section></div>`;
}
function renderEquipmentFields(c) {
  const f = ui.form;
  const weaponOptions = { unarmed: "Frappe à mains nues", ...Object.fromEntries(Object.entries(WEAPONS).filter(([id]) => id !== "unarmed").sort((a, b) => a[1].name.localeCompare(b[1].name, "fr")).map(([id, w]) => [id, w.name])) };
  const armorOptions = Object.fromEntries(Object.entries(ARMORS).filter(([, a]) => a.type !== "shield").map(([id, a]) => [id, a.type === "none" ? a.name : `${a.name} · CA ${a.base}${a.type === "light" ? " + DEX" : a.type === "medium" ? " + DEX (max 2)" : ""}`]));
  const rows = f.weapons
    .map((w, i) => {
      const info = weaponOf(w.id);
      return `<div class="weapon-row"><div class="form-grid">${selectField(i === 0 ? "Arme principale" : `Arme ${i + 1}`, `form.weapons.${i}.id`, w.id, weaponOptions)}${field("Bonus magique", `form.weapons.${i}.magic`, w.magic || 0, "number", "", 'min="-5" max="10" step="1"')}</div>${info?.versatile ? checkField(`Tenue à deux mains (${info.versatile})`, `form.weapons.${i}.twoHands`, w.twoHands) : ""}${f.weapons.length > 1 ? button(`${icon("trash", 14)} Retirer`, "equip-remove-weapon", `data-index="${i}"`, "small-btn ghost") : ""}</div>`;
    })
    .join("");
  return `<div class="form-grid">${selectField("Armure", "form.armor", f.armor, armorOptions)}${field("Bonus magique de CA", "form.armorBonus", f.armorBonus, "number", "Armure, bouclier ou objets magiques.", 'min="-5" max="20" step="1"')}</div>${checkField("Bouclier équipé (+2 CA)", "form.shield", f.shield)}${checkField("Armure de mage active", "form.mageArmor", f.mageArmor, "Sans armure : CA de 13 + DEX. Les formules de défense ne s’additionnent pas.")}<h3 style="margin:14px 0 8px">Armes à portée de main</h3>${rows}${f.weapons.length < 6 ? button(`${icon("plus", 15)} Ajouter une arme`, "equip-add-weapon", "", "small-btn") : ""}`;
}
function candidateEquipment() {
  const c = clone(activeCharacter());
  c.equipment = clone(ui.form);
  c.equipment.weapons = c.equipment.weapons.map((w) => ({ id: w.id, magic: Number(w.magic) || 0, twoHands: !!w.twoHands && !!weaponOf(w.id)?.versatile }));
  c.equipment.armorBonus = Number(c.equipment.armorBonus) || 0;
  return c;
}
function traitCandidate() {
  const c = clone(activeCharacter()),
    idx = c.custom.traits.findIndex((t) => t.id === ui.form.id);
  if (idx >= 0) c.custom.traits[idx] = clone(ui.form);
  else c.custom.traits.push(clone(ui.form));
  return c;
}
function renderModal() {
  if (!ui.modal) return "";
  const c = activeCharacter(),
    d = c ? derive(c) : null,
    cancel = button("Annuler", "close-modal", "", "ghost");
  if (["damage", "heal", "temporary", "gold", "xp"].includes(ui.modal)) {
    const details = {
      damage: ["Subir des dégâts", "Les PV temporaires absorbent les dégâts en premier. Déduis d’abord résistances et immunités.", "Appliquer les dégâts"],
      heal: ["Recevoir des soins", "Les soins ne dépassent pas les PV maximum.", "Appliquer les soins"],
      temporary: ["PV temporaires", "Les PV temporaires ne s’additionnent pas : indique la nouvelle réserve (0 pour la retirer).", "Remplacer la réserve"],
      gold: ["Ajuster la bourse", "Indique le total de pièces d’or, pas la différence.", "Enregistrer"],
      xp: ["Points d’expérience", "Indique le total d’XP. Le niveau ne change jamais sans validation séparée.", "Enregistrer"],
    }[ui.modal];
    const projected = ui.modal === "damage" ? damageCharacter(c, ui.amount).character.state.hp : ui.modal === "heal" ? Math.min(d.maxHp, c.state.hp + Number(ui.amount || 0)) : null;
    return modalShell(
      details[0],
      `<p class="modal-copy">${details[1]}</p><label for="amount" class="sr-only">Montant</label><input id="amount" class="big-number-input" type="number" inputmode="decimal" min="0" max="${ui.modal === "xp" ? 99999999 : 999999}" step="${ui.modal === "gold" ? "0.01" : "1"}" data-bind="ui.amount" value="${ui.amount}">${["damage", "heal"].includes(ui.modal) ? `<div class="quick-values">${[1, 5, 10, 20].map((n) => button(String(n), "quick-amount", `data-value="${n}"`, "small-btn")).join("")}</div><div class="summary-row"><span>PV actuels après application</span><strong>${projected} / ${d.maxHp}</strong></div>${ui.modal === "damage" && c.state.concentration ? notice(`Concentration sur ${esc(c.state.concentration)} : sauvegarde de CON DD ${Math.max(10, Math.floor(ui.amount / 2))} si des dégâts sont subis.`, "warning") : ""}` : ""}`,
      cancel + button(details[2], "apply-amount", "", "primary"),
    );
  }
  if (ui.modal === "rest") {
    const long = ui.rest.type === "long",
      preview = restCharacter(c, long ? "long" : "short", { fed: ui.rest.fed }),
      rolls = ui.rest.rolls,
      healing = rolls.reduce((s, r) => s + Math.max(0, r.roll + d.mods.con), 0),
      nextHP = long ? (c.state.hp > 0 ? derive(preview).maxHp : 0) : Math.min(d.maxHp, c.state.hp + healing);
    const dice = d.hitDice
      .map((h) => {
        const left = h.total - h.spent - rolls.filter((r) => r.die === h.die).length;
        return button(`${icon("dice", 16)} d${h.die} · ${left} restant${left > 1 ? "s" : ""}`, "rest-die", `data-die="${h.die}" ${left <= 0 ? "disabled" : ""}`, "small-btn");
      })
      .join("");
    return modalShell(
      long ? "Un repos bien mérité." : "Reprendre son souffle.",
      `<p class="modal-copy">${long ? "Repos long de 8 heures, au plus une fois par 24 heures, en commençant avec au moins 1 PV." : "Repos court d’au moins 1 heure. Dépense des dés de vie pour récupérer des PV ; chaque dé ajoute ton modificateur de Constitution."}</p>${long && c.state.hp <= 0 ? notice("Un repos long ne rend rien si tu le commences à 0 PV. Stabilise-toi ou reçois des soins d’abord.", "error") : ""}${
        !long
          ? `<div class="panel"><h3>Dépenser des dés de vie</h3><p class="small muted" style="margin:8px 0">CON ${signed(d.mods.con)} par dé</p><div class="actions">${dice}</div>${rolls.length ? `<div class="learn-counts">${rolls.map((r) => `<span class="pill">d${r.die} : ${r.roll} ${signed(d.mods.con)} = ${Math.max(0, r.roll + d.mods.con)} PV</span>`).join("")}</div>${button("Annuler le dernier dé", "rest-undo-die", "", "small-btn ghost")}` : ""}</div>`
          : checkField("Nourriture et boisson suffisantes", "ui.rest.fed", ui.rest.fed, "Permet de réduire l’épuisement d’un niveau.")
      }<div class="summary-row"><span>PV après repos</span><strong>${nextHP} / ${derive(preview).maxHp}</strong></div><div class="summary-row"><span>Dés de vie restants</span><strong>${long ? derive(preview).hitDiceRemaining : d.hitDiceRemaining - rolls.length} / ${d.level}</strong></div>${long ? '<div class="summary-row"><span>Emplacements de sorts</span><strong>Tous récupérés</strong></div>' : d.pact ? '<div class="summary-row"><span>Magie de pacte</span><strong>Emplacements récupérés</strong></div>' : ""}<div class="small muted section-gap">Ressources récupérées : ${
        resources(c)
          .filter((r) => r.reset !== "none" && (long || r.reset === "short"))
          .map((r) => esc(r.name))
          .join(", ") || "aucune"
      }.</div>${notice("Les états, maladies et malédictions ne disparaissent pas tout seuls. Restauration magique et Récupération naturelle se notent à la main sur les emplacements.")}`,
      cancel + button("Valider le repos", "confirm-rest", long && c.state.hp <= 0 ? "disabled" : "", "primary"),
    );
  }
  if (ui.modal === "conditions") {
    const temp = clone(c);
    temp.state.conditions = ui.form.conditions;
    temp.state.exhaustion = ui.form.exhaustion;
    return modalShell(
      "États & épuisement",
      `<p class="modal-copy">Sélectionne les états actifs. Leurs effets sont rappelés ; vitesse, PV et concentration sont recalculés.</p><div class="condition-chips">${Object.keys(CONDITIONS)
        .map((name) => `<button class="condition-chip ${ui.form.conditions.includes(name) ? "active" : ""}" data-action="toggle-condition" data-value="${esc(name)}">${esc(name)}</button>`)
        .join("")}</div>${ui.form.conditions.map((name) => `<details class="feature-item" open><summary>${esc(name)}</summary><div class="detail-copy">${esc(CONDITIONS[name])}</div></details>`).join("")}<div class="spacer"></div>${selectField("Niveau d’épuisement (effets cumulés)", "form.exhaustion", ui.form.exhaustion, Object.fromEntries(EXHAUSTION.map((x, i) => [i, `${i} · ${x}`])), "Règles 2014, à six niveaux.", 'data-number="1"')}${impactHtml(c, temp)}`,
      cancel + button("Vérifier et appliquer", "review-conditions", "", "primary"),
    );
  }
  if (ui.modal === "roll") {
    const r = ui.roll;
    return modalShell(
      "Les dés sont jetés.",
      `<div class="dice-result"><div class="roll-name">${esc(r.name)}</div><div class="roll-number">${r.total}</div><div class="roll-detail">${r.dice.join(" · ")}${r.bonus ? ` ${signed(r.bonus)}` : ""}${r.adjusted ? ` · dé traité comme ${r.adjusted}` : ""}</div>${r.note ? `<div class="critical">${esc(r.note)}</div>` : ""}</div>${
        r.kind !== "damage" && r.kind !== "death"
          ? `<div class="segmented">${[
              ["normal", "Normal"],
              ["advantage", "Avantage"],
              ["disadvantage", "Désavantage"],
            ]
              .map(([id, text]) => `<button class="${ui.rollMode === id ? "active" : ""}" data-action="roll-mode" data-value="${id}">${text}</button>`)
              .join("")}</div><p class="tiny muted">Choisir un mode relance les dés.</p>`
          : ""
      }`,
      button("Fermer", "close-modal", "", "green") + (r.kind !== "death" ? button(`${icon("dice", 16)} Relancer`, "reroll", "", "ghost") : ""),
    );
  }
  if (ui.modal === "equipment") {
    const next = candidateEquipment(),
      bad = ui.form.shield && next.equipment.weapons.some((w) => w.twoHands || weaponOf(w.id)?.two) && next.equipment.weapons.length === 1;
    return modalShell(
      "Équiper, puis comparer.",
      `${renderEquipmentFields(c)}${bad ? notice("Un bouclier et une arme à deux mains ne s’utilisent pas en même temps. Retire le bouclier ou change d’arme.", "warning") : ""}<div class="section-gap">${impactHtml(c, next)}</div>`,
      cancel + button("Vérifier les changements", "review-equipment", "", "primary"),
      true,
    );
  }
  if (ui.modal === "item")
    return modalShell(
      ui.form.editing ? "Modifier cet objet" : "Ajouter au sac",
      `${field("Nom de l’objet", "form.name", ui.form.name, "text", "", 'maxlength="120"')}<div class="form-grid">${field("Quantité", "form.qty", ui.form.qty, "number", "", 'min="0" max="99999" step="1"')}${field("Poids unitaire (kg)", "form.weight", ui.form.weight, "number", "", 'min="0" max="10000" step="0.01"')}</div>${field("Notes et propriétés", "form.description", ui.form.description, "textarea", "Les objets du sac n’appliquent pas de bonus automatiquement.", 'maxlength="4000"')}`,
      cancel + button("Vérifier l’ajout", "review-item", "", "primary"),
    );
  if (ui.modal === "catalog") {
    const q = (ui.catalogQuery || "").toLocaleLowerCase("fr-FR"),
      tab = ui.catalogTab || "gear";
    const source = { weapons: WEAPONS, armor: ARMORS, gear: GEAR, tools: TOOLS }[tab] || GEAR;
    const rows = Object.entries(source)
      .filter(([id, x]) => id !== "unarmed" && id !== "none" && x.name.toLocaleLowerCase("fr-FR").includes(q))
      .sort((a, b) => a[1].name.localeCompare(b[1].name, "fr"))
      .map(
        ([id, x]) =>
          `<div class="catalog-row"><div><strong>${esc(x.name)}</strong><small>${[x.cost, x.weight ? `${String(x.weight).replace(".", ",")} kg` : "", x.damage ? `${x.damage} ${x.type}` : "", x.base ? `CA ${x.base}` : "", x.contents || ""].filter(Boolean).map(esc).join(" · ")}</small></div>${button(`${icon("plus", 14)} Ajouter`, "add-catalog-item", `data-id="${esc(id)}" data-tab="${tab}"`, "small-btn")}</div>`,
      )
      .join("");
    return modalShell(
      "Catalogue d’équipement",
      `<div class="segmented four">${[
        ["gear", "Matériel"],
        ["weapons", "Armes"],
        ["armor", "Armures"],
        ["tools", "Outils"],
      ]
        .map(([id, label]) => `<button type="button" data-action="catalog-tab" data-value="${id}" class="${tab === id ? "active" : ""}">${label}</button>`)
        .join("")}</div><div class="search-wrap">${icon("search", 18)}<input id="catalog-search" class="search-input" data-bind="ui.catalogQuery" value="${esc(ui.catalogQuery || "")}" placeholder="Chercher…" aria-label="Chercher un objet"></div><div class="catalog-list">${rows || '<p class="small muted">Aucun objet.</p>'}</div>`,
      button("Terminé", "close-modal", "", "green"),
      true,
    );
  }
  if (ui.modal === "trait")
    return modalShell(
      ui.form.editing ? "Modifier cette aptitude" : "Une idée de ta table",
      `${field("Nom", "form.name", ui.form.name, "text", "", 'maxlength="120"')}${field("Description, conditions et source", "form.description", ui.form.description, "textarea", "Explique quand l’effet s’applique. Ces mots ne déclenchent aucun calcul à eux seuls.", 'maxlength="12000"')}<h3 style="margin-bottom:14px">Effets chiffrés automatiques</h3><div class="form-grid">${field("Bonus fixe de PV maximum", "form.hp", ui.form.hp, "number", "Un total fixe, pas un gain par niveau.", 'min="-500" max="500" step="1"')}${field("Bonus de CA", "form.ac", ui.form.ac, "number", "", 'min="-20" max="20" step="1"')}${field("Bonus de vitesse (m)", "form.speed", ui.form.speed, "number", "", 'min="-90" max="90" step="0.5"')}${field("Utilisations maximum (0 = aucune)", "form.maxUses", ui.form.maxUses, "number", "", 'min="0" max="999" step="1"')}${selectField("Récupération du compteur", "form.reset", ui.form.reset, { long: "Repos long", short: "Repos court ou long", none: "Manuelle" })}</div><details class="feature-item"><summary>Bonus de caractéristiques ${icon("down", 14)}</summary><div class="form-grid">${Object.entries(ABILITIES)
        .map(([a, v]) => field(v.name, `form.bonuses.${a}`, ui.form.bonuses[a] || 0, "number", "", 'min="-20" max="20" step="1"'))
        .join("")}</div></details>${checkField("Effet actif", "form.active", ui.form.active)}<div class="section-gap">${impactHtml(c, traitCandidate())}</div>`,
      cancel + button("Vérifier les effets", "review-trait", "", "primary"),
      true,
    );
  if (ui.modal === "custom-spell")
    return modalShell(
      ui.form.editing ? "Modifier le sort" : "Ajouter un sort maison",
      `${field("Nom du sort", "form.name", ui.form.name, "text", "", 'maxlength="150"')}<div class="form-grid">${selectField("Niveau", "form.level", ui.form.level, Object.fromEntries(Array.from({ length: 10 }, (_, i) => [i, i === 0 ? "0 · Sort mineur" : String(i)])), "", 'data-number="1"')}${selectField("École", "form.school", ui.form.school, Object.fromEntries([...SPELL_SCHOOLS, "Maison"].map((x) => [x, x])))}${field("Temps d’incantation", "form.casting", ui.form.casting, "text", "", 'maxlength="150"')}${field("Portée", "form.range", ui.form.range, "text", "", 'maxlength="150"')}${field("Durée", "form.duration", ui.form.duration, "text", "", 'maxlength="150"')}${field("Composantes et coût", "form.components", ui.form.components, "text", "", 'maxlength="300"')}</div>${checkField("Concentration", "form.concentration", ui.form.concentration)}${checkField("Rituel", "form.ritual", ui.form.ritual)}<h3 style="margin:16px 0 10px">Classes qui y ont accès</h3><div class="chip-grid">${Object.entries(CLASSES)
        .map(([id, cls]) => `<label class="check-chip ${ui.form.classes.includes(id) ? "checked" : ""}"><input type="checkbox" data-array="form.classes" value="${id}" ${ui.form.classes.includes(id) ? "checked" : ""}>${cls.name}</label>`)
        .join("")}</div><div class="spacer"></div>${field("Effets, limites et source", "form.description", ui.form.description, "textarea", "Une création originale ou un texte que tu as le droit d’utiliser. Le sort apparaîtra dans ton catalogue local.", 'rows="7" maxlength="20000"')}`,
      cancel + button("Ajouter au catalogue local", "review-custom-spell", "", "primary"),
      true,
    );
  if (ui.modal === "adjustments")
    return modalShell(
      "Ajustements du MJ",
      `<p class="modal-copy">Ces bonus s’ajoutent aux calculs, restent visibles et modifiables. N’utilise pas un ajustement pour compter deux fois un effet déjà actif.</p><div class="form-grid">${[
        ["hp", "PV maximum"],
        ["ac", "Classe d’armure"],
        ["speed", "Vitesse (m)"],
        ["initiative", "Initiative"],
        ["attack", "Attaques"],
        ["damage", "Dégâts des armes"],
      ]
        .map(([k, label]) => field(label, `form.${k}`, ui.form[k], "number", "", 'min="-999" max="999" step="0.5"'))
        .join("")}</div><h3 style="margin:15px 0">Caractéristiques</h3><div class="form-grid">${Object.entries(ABILITIES)
        .map(([a, v]) => field(v.name, `form.abilities.${a}`, ui.form.abilities[a], "number", "", 'min="-20" max="20" step="1"'))
        .join("")}</div>${impactHtml(c, { ...clone(c), adjustments: clone(ui.form) })}`,
      cancel + button("Vérifier les ajustements", "review-adjustments", "", "primary"),
      true,
    );
  if (ui.modal === "magic")
    return modalShell("Choisir mes sorts", `${renderMagicEditor(ui.magic.draft, "modal")}`, cancel + button("Vérifier les choix", "review-magic", "", "primary"), true, "Grimoire · changements non enregistrés");
  if (ui.modal === "cast") {
    const cast = ui.cast,
      s = spellById(c, cast.id),
      { modes, st } = castOptions(c, d, s);
    if (!(cast.mode in modes)) cast.mode = Object.keys(modes)[0] || "";
    const ability = st.innate?.ability || spellLimits(c, st.owner).ability || d.casting[0]?.ability;
    const block = !d.armorProficient || c.state.hp === 0 || c.state.conditions.some((x) => ["Inconscient", "Neutralisé", "Paralysé", "Étourdi", "Pétrifié"].includes(x));
    return modalShell(
      esc(s.name),
      `<p class="modal-copy">${esc(s.description)}</p><div class="spell-data"><div><b>Temps</b>${esc(s.casting)}</div><div><b>Portée</b>${esc(s.range)}</div><div style="grid-column:1/-1"><b>Composantes</b>${esc(s.components)}</div></div>${ability ? `<p class="small section-gap">${ABILITIES[ability].name} : DD ${8 + d.prof + d.mods[ability]}, attaque de sort ${signed(d.prof + d.mods[ability])}.</p>` : ""}${Object.keys(modes).length ? selectField("Comment le lancer ?", "ui.cast.mode", cast.mode, modes) : notice("Aucun emplacement ou usage disponible. Prépare le sort, récupère une ressource ou fais un repos.", "warning")}${block ? notice("L’équipement non maîtrisé ou ton état actuel empêche normalement de lancer un sort.", "error") : ""}${s.concentration && c.state.concentration ? notice(`Ce sort remplacera ta concentration sur « ${esc(c.state.concentration)} ».`, "warning") : s.concentration ? notice("La concentration sera suivie sur ce sort.", "purple") : ""}`,
      cancel + button("Confirmer le lancement", "confirm-cast", !Object.keys(modes).length || block ? "disabled" : "", "primary"),
    );
  }
  if (ui.modal === "review") {
    const p = ui.pending,
      issues = characterIssues(p.character);
    return modalShell(
      "Vérifier avant d’appliquer",
      `<p class="modal-copy"><strong>${esc(p.label)}</strong><br>${esc(p.description || "La fiche n’a pas encore été modifiée. Sa version précédente restera dans les réglages.")}</p>${impactHtml(p.original, p.character)}${p.magicSummary ? `<div class="section-gap">${esc(p.magicSummary)}</div>` : ""}<div class="section-gap">${issueList(issues.errors, "error")}${issueList(issues.warnings)}</div>`,
      cancel + button("Valider les modifications", "commit-review", issues.errors.length ? "disabled" : "", "primary"),
    );
  }
  if (ui.modal === "confirm")
    return modalShell(esc(ui.confirm.title), `<p class="modal-copy preserve">${esc(ui.confirm.description)}</p>`, cancel + button(ui.confirm.label || "Confirmer", "confirm-action", "", ui.confirm.danger ? "danger" : "primary"));
  if (ui.modal === "import")
    return modalShell(
      "Ajouter ces personnages ?",
      `<p class="modal-copy">${ui.imported.length} fiche(s) valide(s). Chacune sera ajoutée comme une nouvelle copie ; aucun personnage existant ne sera remplacé.</p>${ui.imported.map((x) => `<div class="summary-row"><span>${esc(x.name)}</span><strong>${esc(classSummary(x))}</strong></div>`).join("")}`,
      cancel + button("Importer les fiches", "confirm-import", "", "primary"),
    );
  if (ui.modal === "install")
    return modalShell(
      "Compagnon, sur ton téléphone",
      `<p class="modal-copy">L’installation ajoute une icône et un accès hors ligne, après une première ouverture connectée.</p>${IS_ARTIFACT ? notice("Cette page d’essai ne s’installe pas comme une application. Publie le dossier « site » sur un hébergement HTTPS, puis ouvre son adresse sur ton téléphone.", "warning") : location.protocol === "file:" ? notice("Tu ouvres le fichier autonome. Pour installer l’application, publie le dossier « site » sur un hébergement HTTPS, puis ouvre son adresse sur ton téléphone.", "warning") : ""}<div class="summary-row"><span>iPhone / iPad</span><strong>Safari → Partager → Sur l’écran d’accueil</strong></div><div class="summary-row"><span>Android</span><strong>Chrome → menu ⋮ → Installer l’application</strong></div><div class="summary-row"><span>Ordinateur</span><strong>Icône d’installation dans la barre d’adresse</strong></div><p class="small muted section-gap">Les données sont propres au navigateur et à l’adresse utilisée. Exporte puis réimporte ta fiche pour changer d’appareil.</p>`,
      button("Compris", "close-modal", "", "green"),
    );
  if (ui.modal === "export-text")
    return modalShell(
      "Copier la sauvegarde",
      `<p class="modal-copy">Copie ce texte et colle-le dans « Coller une sauvegarde » sur l’autre appareil ou la version installée.</p><label class="sr-only" for="export-json">Sauvegarde JSON</label><textarea id="export-json" class="json-box" readonly rows="8">${esc(ui.exportText || "")}</textarea>`,
      button("Fermer", "close-modal", "", "ghost") + button(`${icon("check", 16)} Copier`, "copy-export", "", "primary"),
    );
  if (ui.modal === "import-text")
    return modalShell(
      "Coller une sauvegarde",
      `<p class="modal-copy">Colle ici le texte d’une sauvegarde Compagnon. Les fiches sont ajoutées en copie, jamais écrasées.</p><label class="sr-only" for="import-json">Sauvegarde JSON</label><textarea id="import-json" class="json-box" rows="8" data-bind="ui.importText" placeholder="{&quot;format&quot;:&quot;compagnon-srd51&quot;…}">${esc(ui.importText || "")}</textarea>`,
      button("Annuler", "close-modal", "", "ghost") + button("Vérifier la sauvegarde", "parse-import-text", "", "primary"),
    );
  if (ui.modal === "info")
    return modalShell(
      esc(ui.info.title),
      `<p class="modal-copy preserve">${esc(ui.info.text)}</p>`,
      (ui.info.link ? button(esc(ui.info.link.label), "navigate", `data-route="${esc(ui.info.link.route)}"`, "ghost") : "") + button("Compris", "close-modal", "", "green"),
    );
  return "";
}
function printSheet(c) {
  const d = derive(c),
    ids = new Set([...c.spells.known, ...c.spells.prepared, ...domainSpells(c), ...Object.values(c.spells.arcana), ...innateSpells(c).map((s) => s.id)]);
  return `<section class="print-only"><h1>${esc(c.name)}</h1><p>${esc(d.race.name)} · ${esc(classSummary(c))}${subclassSummary(c) ? ` (${esc(subclassSummary(c))})` : ""} · ${esc(d.background.name)}${c.alignment ? ` · ${esc(c.alignment)}` : ""} · Règles 2014</p><p>PV ${c.state.hp}/${d.maxHp} · CA ${d.ac} · Initiative ${signed(d.initiative)} · Vitesse ${String(d.speed).replace(".", ",")} m · Maîtrise ${signed(d.prof)} · Dés de vie ${hitDiceLabel(d)} · Perception passive ${d.passivePerception}</p><div class="print-grid"><div class="print-box"><h2>Caractéristiques & sauvegardes</h2><table>${Object.entries(ABILITIES)
    .map(([a, v]) => `<tr><td>${v.name}</td><td>${d.scores[a]} (${signed(d.mods[a])})</td><td>JS ${signed(d.saves[a])}${d.saveProficiencies.includes(a) ? " ●" : ""}</td></tr>`)
    .join("")}</table><h2>Attaques</h2>${d.attacks.map((a) => `<p>${esc(a.name)} : ${signed(a.attack)}, ${a.damageDice} ${signed(a.damageBonus)} ${esc(a.type)}</p>`).join("")}<h2>Maîtrises</h2><p>Langues : ${esc(d.languages.map((l) => l.name).join(", "))}</p><p>Outils : ${esc(d.tools.map((t) => t.name).join(", ") || "aucun")}</p><h2>Équipement</h2><p>${esc((ARMORS[c.equipment.armor] || ARMORS.none).name)}${c.equipment.shield ? " + bouclier" : ""} · ${c.gold} po</p>${c.inventory.map((i) => `<p>${esc(i.name)} ×${i.qty}</p>`).join("")}</div><div class="print-box"><h2>Compétences</h2><table>${Object.entries(SKILLS)
    .map(([k, v]) => `<tr><td>${v[0]}</td><td>${signed(d.skills[k])}</td><td>${d.ranks[k] === 2 ? "Expertise" : d.ranks[k] ? "Maîtrise" : ""}</td></tr>`)
    .join("")}</table></div></div><h2>Ressources</h2>${resources(c)
    .map((r) => `<p>${esc(r.name)} : ${r.max === null ? "à volonté" : `${r.max - r.used}/${r.max}`} · ${r.reset === "short" ? "repos court ou long" : r.reset === "long" ? "repos long" : "manuel"}</p>`)
    .join("")}<h2>Sorts</h2>${d.casting.map((m) => `<p>${esc(m.label)} : DD ${m.dc} · attaque ${signed(m.attack)}</p>`).join("")}<p>Emplacements : ${d.slots
    .map((n, i) => (n ? `${i + 1} : ${n - (c.state.slotsUsed[i + 1] || 0)}/${n}` : ""))
    .filter(Boolean)
    .join(" · ")}${d.pact ? ` · Pacte niv. ${d.pact.slotLevel} : ${d.pact.count - (c.state.pactUsed || 0)}/${d.pact.count}` : ""}</p>${catalogue(c)
    .filter((s) => ids.has(s.id))
    .sort((a, b) => a.level - b.level)
    .map((s) => `<p><b>${esc(s.name)}</b> · ${s.level === 0 ? "mineur" : "niveau " + s.level}${c.spells.prepared.includes(s.id) || domainSpells(c).includes(s.id) ? " · préparé" : ""}${s.concentration ? " · concentration" : ""}</p>`)
    .join("")}<h2>Aptitudes</h2>${featureGroups(c, d)
    .flatMap(([, items]) => items)
    .map((f) => `<p><b>${esc(f.name)}</b> : ${esc(f.description)}</p>`)
    .join("")}${c.custom.traits.map((t) => `<p><b>${esc(t.name)} (${t.active === false ? "inactif" : "actif"})</b> : ${esc(t.description)}</p>`).join("")}<h2>Notes</h2><p class="print-note">${esc(c.notes)}</p><p>Compagnon ${APP_VERSION}. Résumés de règles originaux ; contenu SRD 5.1 sous CC BY 4.0.</p></section>`;
}
// Writes are serialized and revision-checked. A second tab cannot silently overwrite a save.
function toast(message, action = null) {
  clearTimeout(toastTimeout);
  toastRoot.innerHTML = `<div class="toast" role="status"><span>${esc(message)}</span>${action ? `<button class="link-btn" data-action="${esc(action.action)}" ${action.id ? `data-id="${esc(action.id)}"` : ""}>${esc(action.label)}</button>` : ""}</div>`;
  toastTimeout = setTimeout(() => {
    toastRoot.innerHTML = "";
  }, 6500);
}
function reportError(error) {
  console.error(error);
  toast(
    error.message === "CONFLICT"
      ? "Une autre fenêtre a modifié les données. Elles ont été rechargées ; recommence cette modification."
      : `Impossible d’enregistrer : ${error.message || "erreur inconnue"}`,
  );
}
function mutateApp(mutator, { redraw = true } = {}) {
  const task = saveQueue.then(async () => {
    ui.saving = true;
    const next = clone(appData);
    await mutator(next);
    try {
      appData = await localStore.write(next, appData.revision);
    } catch (error) {
      if (error.message === "CONFLICT") appData = await localStore.read();
      throw error;
    } finally {
      ui.saving = false;
    }
    if (redraw) render();
    return appData;
  });
  saveQueue = task.catch(() => {});
  return task;
}
async function saveCharacter(character, label = "Modification", mode = "settings", original = null) {
  const result = validateImport(clone(character));
  await mutateApp(
    (next) => {
      const index = next.characters.findIndex((c) => c.id === result.id),
        previous = index >= 0 ? next.characters[index] : null;
      if (original && previous && previous.updatedAt !== original.updatedAt)
        throw new Error(
          "Cette fiche a changé depuis l’ouverture de l’éditeur. Ferme-le et recommence pour conserver les dernières modifications.",
        );
      if (previous) {
        next.snapshots.push({
          id: uid(),
          characterId: previous.id,
          label,
          date: new Date().toISOString(),
          character: clone(previous),
        });
        next.snapshots = next.snapshots.slice(-30);
      }
      if (!previous && mode !== "restore") result.state.hp = derive(result).maxHp;
      reconcileState(result, mode === "settings" && previous ? previous : null);
      if (index >= 0) next.characters[index] = result;
      else next.characters.push(result);
      next.activeId = result.id;
    },
    { redraw: false },
  );
  return result;
}
async function sessionChange(change, label) {
  const before = clone(activeCharacter()),
    next = clone(before);
  change(next);
  await saveCharacter(next, label, "session", before);
  render();
}
function openModal(type) {
  lastFocus = document.activeElement;
  ui.modal = type;
  render();
  requestAnimationFrame(() => {
    const input = modalRoot.querySelector("input:not([type=checkbox]),textarea,select");
    const focus = input || modalRoot.querySelector("button");
    focus?.focus({ preventScroll: true });
    if (input?.classList.contains("big-number-input")) input.select();
  });
}
function closeModal() {
  ui.modal = null;
  ui.pending = null;
  ui.magic = null;
  render();
  if (lastFocus?.id) document.getElementById(lastFocus.id)?.focus();
}
function openInfo(title, text) {
  ui.info = { title, text };
  openModal("info");
}
function openReview(character, label, description = "", mode = "settings", extra = {}) {
  ui.pending = { character: clone(character), original: clone(activeCharacter()), label, description, mode, ...extra };
  openModal("review");
}
function askConfirm(title, description, action, key = null, { label = "Confirmer", danger = false } = {}) {
  ui.confirm = { title, description, action, key, label, danger };
  openModal("confirm");
}
function queueDraft() {
  if (!ui.wizard) return;
  clearTimeout(draftTimeout);
  const copy = clone(ui.wizard);
  draftTimeout = setTimeout(
    () =>
      mutateApp(
        (s) => {
          s.draft = copy;
        },
        { redraw: false },
      ).catch(reportError),
    250,
  );
}
async function clearDraft() {
  clearTimeout(draftTimeout);
  await mutateApp(
    (s) => {
      s.draft = null;
    },
    { redraw: false },
  );
}
function resetEditorFilters() {
  ui.editorQuery = "";
  ui.editorLevel = "all";
}
function go(route) {
  ui.route = route;
  ui.spellQuery = "";
  if (route === "notes") ui.noteDraft = activeCharacter()?.notes || "";
  render();
  window.scrollTo({ top: 0 });
}
function startWizard(character = null, classId = null) {
  ui.levelFlow = null;
  ui.modal = null;
  ui.wizard = {
    draft: character ? clone(character) : createCharacter(CLASSES[classId] ? classId : "fighter"),
    original: character ? clone(character) : null,
    step: "race",
    visited: character ? ["race", "class", "background", "abilities", "skills", "magic", "review"] : ["race"],
    error: "",
    rollPool: [],
    rollDetails: [],
  };
  ui.featQuery = "";
  resetEditorFilters();
  queueDraft();
  render();
  window.scrollTo({ top: 0 });
}
function startLevel(level, isNew) {
  const original = clone(activeCharacter()),
    draft = clone(original);
  if (isNew) {
    const classId = draft.levels.at(-1).classId;
    draft.levels.push(defaultLevel(classId, level, classLevel(draft, classId) + 1));
  }
  ui.wizard = null;
  ui.featQuery = "";
  ui.levelFlow = { original, draft, level, isNew, step: 0, error: "" };
  resetEditorFilters();
  render();
  window.scrollTo({ top: 0 });
}
function getBinding(path) {
  const parts = path.split("."),
    base = parts.shift(),
    obj =
      base === "wiz"
        ? ui.wizard?.draft
        : base === "lvl"
          ? ui.levelFlow?.draft
          : base === "magic"
            ? ui.magic?.draft
            : base === "form"
              ? ui.form
              : base === "ui"
                ? ui
                : null;
  if (parts.some((k) => ["__proto__", "constructor", "prototype"].includes(k))) throw new Error("Champ non autorisé.");
  return { obj, parts };
}
function boundValue(path) {
  const { obj, parts } = getBinding(path);
  if (!obj) return undefined;
  return parts.reduce((v, k) => v?.[k], obj);
}
function setBinding(path, value) {
  const { obj, parts } = getBinding(path);
  if (!obj) return;
  let target = obj;
  for (const key of parts.slice(0, -1)) {
    if (target[key] == null) target[key] = {};
    target = target[key];
  }
  target[parts.at(-1)] = value;
}
function handleBinding(el, redraw) {
  const target = el.dataset.array || el.dataset.bind;
  if (!target || !getBinding(target).obj) return;
  if (el.dataset.array) {
    if (!redraw) return;
    const path = el.dataset.array,
      list = [...(boundValue(path) || [])],
      limit = Number(el.dataset.limit) || 1000;
    if (el.checked && !list.includes(el.value)) {
      if (limit === 1) list.splice(0, list.length);
      else if (list.length >= limit) {
        el.checked = false;
        toast(`Choisis au maximum ${limit} option(s).`);
        return;
      }
      list.push(el.value);
    } else if (!el.checked) {
      const i = list.indexOf(el.value);
      if (i >= 0) list.splice(i, 1);
    }
    setBinding(path, list);
    if (path.startsWith("wiz.")) queueDraft();
    render();
    return;
  }
  const path = el.dataset.bind;
  if (!path || (el.type === "radio" && !el.checked)) return;
  let value = el.type === "checkbox" ? el.checked : el.type === "number" || el.dataset.number === "1" ? Number(el.value) : el.value;
  if (typeof value === "number" && !Number.isFinite(value)) return;
  const previous = boundValue(path);
  if (path.startsWith("wiz.abilities.") && ["standard", "rolled"].includes(ui.wizard.draft.abilityMethod) && previous !== value) {
    value = Number(value);
    const key = path.split(".").at(-1),
      other = Object.keys(ABILITIES).find((a) => a !== key && ui.wizard.draft.abilities[a] === value);
    if (other) ui.wizard.draft.abilities[other] = Number(previous);
  }
  if (path === "ui.wizard.startLevel") {
    setStartLevel(ui.wizard.draft, value);
    queueDraft();
    render();
    return;
  }
  setBinding(path, value);
  const draft = path.startsWith("wiz.") ? ui.wizard?.draft : path.startsWith("lvl.") ? ui.levelFlow?.draft : null;
  if (draft && /\.asi\.featId$/.test(path) && previous !== value) {
    const level = Number(path.split(".")[2]) + 1;
    clearPicks(draft, [`feat|L${level}|`]);
  }
  if (draft && path === "wiz.raceFeat" && previous !== value) clearPicks(draft, ["feat|race|"]);
  if (path.startsWith("wiz.startKit.choices.")) ui.wizard.draft.startKit.picks = {};
  if (path.startsWith("wiz.")) queueDraft();
  const live = ["ui.spellQuery", "ui.editorQuery", "ui.featQuery", "ui.catalogQuery", "ui.beastQuery"].includes(path);
  if (live || (redraw && el.matches("select,[type=radio],[type=checkbox]"))) render();
}
function selectSpell(target, id, kind) {
  const c = magicDraft(target),
    s = spellById(c, id),
    classId = ui.editorClass || spellcasters(c)[0]?.classId,
    limits = spellLimits(c, classId);
  if (!s) return;
  if (kind === "arcana") {
    if (c.spells.arcana[s.level] === id) delete c.spells.arcana[s.level];
    else c.spells.arcana[s.level] = id;
  } else {
    const list = c.spells[kind],
      i = list.indexOf(id);
    if (i >= 0) {
      list.splice(i, 1);
      if (kind === "known") c.spells.prepared = c.spells.prepared.filter((x) => x !== id);
      if (!c.spells.known.includes(id) && !c.spells.prepared.includes(id)) delete c.spells.sources[id];
    } else {
      const all = catalogue(c),
        mine = (ids) => ids.filter((x) => spellClassOf(c, x) === classId);
      if (!c.spells.allowExceptions) {
        if (!canReadySpell(c, s, classId)) {
          toast("Ce sort ne correspond pas à ta classe ou à ton niveau.");
          return;
        }
        let max = Infinity,
          count = 0;
        if (kind === "known" && s.level === 0) {
          max = limits.cantrips;
          count = mine(list).filter((x) => all.find((y) => y.id === x)?.level === 0).length;
        } else if (kind === "known" && limits.mode === "known") {
          max = limits.known;
          count = mine(list).filter((x) => all.find((y) => y.id === x)?.level > 0).length;
        } else if (kind === "prepared") {
          max = limits.prepared;
          count = mine(list).filter((x) => !domainSpells(c).includes(x)).length;
        }
        if (count >= max) {
          toast(`Limite de ${max} atteinte. Retire d’abord un autre sort, ou autorise une exception du MJ.`);
          return;
        }
      }
      if (kind === "prepared" && limits.mode === "book" && !c.spells.known.includes(id)) {
        toast("Ajoute d’abord ce sort au grimoire.");
        return;
      }
      list.push(id);
      c.spells.sources[id] = classId;
    }
  }
  queueDraft();
  render();
}
function rollCheck(name, bonus, kind = "check", options = {}) {
  const dice = [rollDie(20)];
  if (ui.rollMode !== "normal") dice.push(rollDie(20));
  const natural =
    ui.rollMode === "advantage" ? Math.max(...dice) : ui.rollMode === "disadvantage" ? Math.min(...dice) : dice[0];
  const adjusted = options.reliable && natural < 10 ? 10 : natural;
  const notes = [
    options.note || "",
    adjusted !== natural ? "Savoir-faire : le résultat du dé est traité comme 10." : "",
  ];
  if (kind === "attack")
    notes.push(
      natural === 1
        ? "1 naturel : l’attaque rate."
        : natural >= derive(activeCharacter()).critThreshold
          ? "Critique potentiel : vérifie les conditions et double les dés de dégâts concernés."
          : "Le total ne décide pas à lui seul si la cible est touchée.",
    );
  ui.roll = {
    name,
    total: adjusted + bonus,
    dice,
    bonus,
    adjusted: adjusted !== natural ? adjusted : null,
    kind,
    note: notes.filter(Boolean).join(" "),
    reroll: { name, bonus, kind, options },
  };
  openModal("roll");
}
function downloadJson(value, name) {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: "application/json;charset=utf-8" }),
    url = URL.createObjectURL(blob),
    a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
async function exportCharacters(all) {
  const chars = all ? appData.characters : [activeCharacter()];
  if (!chars.length || !chars[0]) return;
  if (IS_ARTIFACT) {
    ui.exportText = JSON.stringify({ format: "compagnon-srd51", schemaVersion: SCHEMA_VERSION, exportedAt: new Date().toISOString(), characters: clone(chars) });
    openModal("export-text");
    return;
  }
  downloadJson(
    { format: "compagnon-srd51", schemaVersion: SCHEMA_VERSION, exportedAt: new Date().toISOString(), characters: clone(chars) },
    `compagnon-${
      all
        ? "mes-personnages"
        : chars[0].name
            .normalize("NFD")
            .replace(/[̀-ͯ]/g, "")
            .replace(/[^a-zA-Z0-9]+/g, "-")
            .toLowerCase()
    }-${new Date().toISOString().slice(0, 10)}.json`,
  );
  await mutateApp((s) => {
    s.lastExport = new Date().toISOString();
  });
  toast("Sauvegarde JSON préparée. Conserve le fichier hors de ce navigateur.");
}
function requestImport() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json,application/json";
  input.setAttribute("aria-label", "Importer une sauvegarde JSON");
  input.style.display = "none";
  document.body.append(input);
  input.addEventListener("change", async () => {
    try {
      const file = input.files[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) throw new Error("Le fichier dépasse 5 Mo.");
      const raw = JSON.parse(await file.text());
      let list;
      if (raw.format === "compagnon-srd51" && [1, SCHEMA_VERSION].includes(raw.schemaVersion) && Array.isArray(raw.characters)) list = raw.characters;
      else if ([1, SCHEMA_VERSION].includes(raw.schemaVersion) && (raw.classId || raw.levels)) list = [raw];
      else throw new Error("Ce fichier n’est pas une sauvegarde Compagnon.");
      if (list.length < 1 || list.length > 100) throw new Error("Importe entre 1 et 100 personnages à la fois.");
      ui.imported = list.map(validateImport);
      openModal("import");
    } catch (error) {
      openInfo("Import refusé", `${error.message} Aucune fiche existante n’a été modifiée.`);
    } finally {
      input.remove();
    }
  });
  input.click();
}
async function makeDemo() {
  const c = createCharacter("wizard");
  c.name = "Élyra Aubefeuille";
  c.raceId = "highElf";
  c.picks["race|cantripChoice"] = ["prestidigitation"];
  c.picks["race|languageChoice"] = ["draconic"];
  c.background = { id: "sage", name: "", skills: [], featureName: "", feature: "", equipment: "", description: "", tools: "", languages: "" };
  c.picks["bg|languageChoice"] = ["celestial", "sylvan"];
  c.abilities = { str: 8, dex: 14, con: 13, int: 15, wis: 12, cha: 10 };
  c.skills = ["investigation", "insight"];
  c.levels = [1, 2, 3, 4].map((n) => defaultLevel("wizard", n));
  c.levels[3].asi = { mode: "ability", a: "int", b: "con", featId: "", featName: "", featDescription: "" };
  c.subclasses = { wizard: "evocation" };
  c.alignment = "Neutre bon";
  c.details = { age: "112 ans", height: "1,70 m", weight: "55 kg", eyes: "Ambre", skin: "Pâle", hair: "Argent", traits: "Je cite des auteurs oubliés à la moindre occasion.", ideals: "Le savoir doit circuler.", bonds: "La bibliothèque de Valbrume m’a tout appris.", flaws: "Je néglige le danger quand un mystère m’intrigue." };
  c.biography = "Ancienne gardienne de bibliothèque, partie retrouver un atlas dont les cartes changent la nuit.";
  c.spells.known = ["fire-bolt", "mage-hand", "light", "minor-illusion", "magic-missile", "shield", "mage-armor", "detect-magic", "sleep", "find-familiar", "misty-step", "scorching-ray", "invisibility", "web"].filter((id) => SPELLS.some((s) => s.id === id));
  c.spells.prepared = ["magic-missile", "shield", "mage-armor", "misty-step", "scorching-ray", "web", "detect-magic"].filter((id) => c.spells.known.includes(id));
  c.equipment = { armor: "none", shield: false, weapons: [{ id: "quarterstaff", magic: 0, twoHands: false }, { id: "dagger", magic: 0, twoHands: false }], armorBonus: 0, mageArmor: false };
  c.inventory = [
    { id: uid(), ref: "", name: "Grimoire relié de cuir", qty: 1, weight: 1.5, description: "Notes d’étude, recettes d’encre et quelques taches de thé." },
    { id: uid(), ref: "", name: "Rations", qty: 5, weight: 1, description: "Pour cinq journées d’aventure." },
  ];
  c.startKit = { mode: "done", choices: {}, picks: {} };
  c.gold = 27;
  c.notes = "Retrouver l’atlas des routes oubliées.\nPréparer Bouclier avant chaque expédition.";
  await saveCharacter(c, "Création de l’exemple", "create");
  go("sheet");
  toast("Élyra est prête. Cet exemple est ta copie, modifiable et supprimable.");
}
async function perform(action, el) {
  const c = activeCharacter(),
    data = el?.dataset || {},
    d = c ? derive(c) : null;
  switch (action) {
    case "navigate":
      ui.modal = null;
      ui.pending = null;
      if (ui.wizard) {
        queueDraft();
        ui.wizard = null;
      }
      if (ui.levelFlow) {
        askConfirm(
          "Quitter la progression ?",
          "Les choix non validés de ce niveau seront abandonnés. La fiche actuelle ne change pas.",
          "leave-level",
          data.route,
        );
        break;
      }
      go(data.route);
      break;
    case "new-character":
      if (appData.draft)
        askConfirm(
          "Créer un autre brouillon ?",
          "Le brouillon précédent sera remplacé. Les fiches déjà validées ne changent pas.",
          "new-wizard",
          data.class || null,
        );
      else startWizard(null, data.class);
      break;
    case "edit-character":
      startWizard(c);
      break;
    case "demo":
      await makeDemo();
      break;
    case "open-character":
      await mutateApp(
        (s) => {
          s.activeId = data.id;
        },
        { redraw: false },
      );
      go("sheet");
      break;
    case "resume-draft":
      ui.wizard = clone(appData.draft);
      resetEditorFilters();
      render();
      break;
    case "discard-draft":
      askConfirm("Oublier ce brouillon ?", "Aucune fiche validée ne sera supprimée.", "discard-draft", null, {
        danger: true,
        label: "Oublier le brouillon",
      });
      break;
    case "leave-wizard":
      queueDraft();
      ui.wizard = null;
      go(activeCharacter() ? "sheet" : "home");
      toast("Brouillon conservé. Tu peux le reprendre depuis Mes personnages.");
      break;
    case "wizard-step":
      ui.wizard.step = data.step;
      render();
      window.scrollTo({ top: 0 });
      break;
    case "wizard-prev": {
      const steps = wizardSteps(ui.wizard).map(([id]) => id),
        i = steps.indexOf(ui.wizard.step);
      if (i <= 0) {
        await perform("leave-wizard", el);
        break;
      }
      ui.wizard.step = steps[i - 1];
      queueDraft();
      render();
      window.scrollTo({ top: 0 });
      break;
    }
    case "wizard-next": {
      const w = ui.wizard,
        steps = wizardSteps(w).map(([id]) => id),
        i = steps.indexOf(w.step);
      if (w.step === "abilities" && w.draft.abilityMethod === "rolled" && !(w.rollPool || []).length) {
        toast("Lance d’abord tes six valeurs, ou choisis une autre méthode.");
        break;
      }
      w.step = steps[Math.min(steps.length - 1, i + 1)];
      w.visited = [...new Set([...(w.visited || []), w.step])];
      w.error = "";
      queueDraft();
      render();
      window.scrollTo({ top: 0 });
      break;
    }
    case "wizard-save": {
      const w = ui.wizard;
      let candidate = clone(w.draft);
      if (!w.original) candidate = applyStartingKit(candidate);
      const issues = characterIssues(candidate);
      if (issues.errors.length) {
        w.error = issues.errors.join(" ");
        render();
        break;
      }
      await saveCharacter(candidate, w.original ? "Correction du personnage" : "Création du personnage", w.original ? "settings" : "create", w.original);
      await clearDraft();
      ui.wizard = null;
      go("sheet");
      toast(w.original ? "Tes corrections sont enregistrées." : "Ton personnage est prêt à jouer.");
      break;
    }
    case "choose-race": {
      const draft = ui.wizard.draft;
      if (draft.raceId === data.id) break;
      draft.raceId = data.id;
      draft.raceFeat = null;
      clearPicks(draft, ["race|", "feat|race|"]);
      if (RACES[data.id]?.dragonChoice) draft.picks["race|dragon"] = ["red"];
      queueDraft();
      render();
      break;
    }
    case "choose-class": {
      const w = ui.wizard,
        cc = w.draft,
        id = data.id;
      if (primaryClassId(cc) === id) break;
      const n = levelOf(cc),
        bgSkills = backgroundSkills(cc);
      cc.classId = id;
      cc.levels = [defaultLevel(id, 1)];
      cc.subclasses = {};
      cc.customSubclasses = {};
      setStartLevel(cc, w.original ? 1 : n);
      if (CLASSES[id].subLevel === 1) cc.subclasses[id] = DEFAULT_SUBCLASS[id];
      cc.skills = CLASSES[id].skills.filter((s) => !bgSkills.includes(s)).slice(0, CLASSES[id].pick);
      clearPicks(cc, ["class|", "sub|", "feat|L", "inv|"]);
      cc.spells = { known: [], prepared: [], sources: {}, arcana: {}, allowExceptions: cc.spells.allowExceptions };
      cc.equipment = defaultEquipment(id);
      cc.startKit = { mode: cc.startKit?.mode === "gold" ? "gold" : "kit", choices: {}, picks: {} };
      if (!w.original && cc.abilityMethod === "standard") cc.abilities = recommendedAbilities(id);
      queueDraft();
      render();
      toast("Classe changée : compétences, équipement et sorts réinitialisés pour ce brouillon.");
      break;
    }
    case "ability-method": {
      const w = ui.wizard;
      w.draft.abilityMethod = data.value;
      if (data.value === "standard" || data.value === "points") w.draft.abilities = data.value === "points" ? { str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8 } : recommendedAbilities(primaryClassId(w.draft));
      if (data.value === "rolled" && (w.rollPool || []).length) {
        const order = [...CLASSES[primaryClassId(w.draft)].primary, ...Object.keys(ABILITIES).filter((a) => !CLASSES[primaryClassId(w.draft)].primary.includes(a))];
        const sorted = [...w.rollPool].sort((a, b) => b - a);
        w.draft.abilities = Object.fromEntries(order.map((a, i) => [a, sorted[i]]));
      }
      queueDraft();
      render();
      break;
    }
    case "recommend-abilities":
      ui.wizard.draft.abilities = ui.wizard.draft.abilityMethod === "points" ? (() => {
        const order = [...CLASSES[primaryClassId(ui.wizard.draft)].primary, ...Object.keys(ABILITIES).filter((a) => !CLASSES[primaryClassId(ui.wizard.draft)].primary.includes(a))];
        return Object.fromEntries(order.map((a, i) => [a, [15, 15, 15, 8, 8, 8][i]]));
      })() : recommendedAbilities(primaryClassId(ui.wizard.draft));
      queueDraft();
      render();
      break;
    case "level-up":
      if (levelOf(c) < 20) startLevel(levelOf(c) + 1, true);
      break;
    case "edit-level":
      startLevel(Number(data.level), false);
      break;
    case "cancel-level":
      askConfirm(
        "Quitter sans valider ?",
        "Les changements de ce niveau ne seront pas enregistrés.",
        "leave-level",
        "progression",
      );
      break;
    case "level-step":
      ui.levelFlow.step = Number(data.step);
      render();
      break;
    case "level-prev":
      if (ui.levelFlow.step === 0) {
        await perform("cancel-level", el);
        break;
      }
      ui.levelFlow.step--;
      render();
      window.scrollTo({ top: 0 });
      break;
    case "level-next":
      ui.levelFlow.step++;
      render();
      window.scrollTo({ top: 0 });
      break;
    case "level-save": {
      const f = ui.levelFlow,
        issues = characterIssues(f.draft);
      if (issues.errors.length) {
        f.error = issues.errors.join(" ");
        render();
        break;
      }
      await saveCharacter(
        f.draft,
        `${f.isNew ? "Passage au" : "Correction du"} niveau ${f.level}`,
        "settings",
        f.original,
      );
      ui.levelFlow = null;
      go("progression");
      toast("Choix enregistrés. La fiche a été recalculée.");
      break;
    }
    case "level-hp-average": {
      const draft = levelDraft(data.prefix),
        l = draft.levels[Number(data.level) - 1];
      l.hpDie = CLASSES[l.classId].die / 2 + 1;
      if (data.prefix === "wiz") queueDraft();
      render();
      break;
    }
    case "level-hp-roll": {
      const draft = levelDraft(data.prefix),
        l = draft.levels[Number(data.level) - 1];
      l.hpDie = rollDie(CLASSES[l.classId].die);
      if (data.prefix === "wiz") queueDraft();
      render();
      break;
    }
    case "asi-mode": {
      const draft = levelDraft(data.prefix),
        a = draft.levels[Number(data.level) - 1].asi;
      a.mode = data.value;
      if (data.value === "ability") clearPicks(draft, [`feat|L${data.level}|`]);
      if (data.prefix === "wiz") queueDraft();
      render();
      break;
    }
    case "remove-level": {
      if (levelOf(c) <= 1) break;
      const next = clone(c);
      next.levels.pop();
      openReview(
        next,
        "Retirer le dernier niveau",
        "Les PV maximum, ressources et aptitudes seront recalculés. Les sorts sélectionnés restent visibles pour te permettre de corriger ceux devenus inadmissibles.",
      );
      break;
    }
    case "select-spell":
      selectSpell(data.target, data.id, data.kind);
      break;
    case "spell-tab":
      ui.spellTab = data.value;
      render();
      break;
    case "edit-magic":
      ui.magic = { draft: clone(c), original: clone(c) };
      resetEditorFilters();
      ui.editorQuery = data.query || "";
      openModal("magic");
      break;
    case "review-magic": {
      const candidate = clone(ui.magic.draft),
        all = catalogue(candidate),
        before = new Set([...c.spells.known, ...c.spells.prepared, ...Object.values(c.spells.arcana)]),
        after = new Set([
          ...candidate.spells.known,
          ...candidate.spells.prepared,
          ...Object.values(candidate.spells.arcana),
        ]);
      const describe = (ids) => ids.map((id) => all.find((s) => s.id === id)?.name || id).join(", ");
      openReview(
        candidate,
        "Choix de magie",
        "Connaissance, préparation et arcana seront sauvegardés. Les emplacements déjà dépensés ne sont pas récupérés.",
        "settings",
        {
          magicSummary: `Ajoutés : ${describe([...after].filter((id) => !before.has(id))) || "aucun"}. Retirés : ${describe([...before].filter((id) => !after.has(id))) || "aucun"}. Préparés : ${describe(candidate.spells.prepared) || "aucun"}.`,
        },
      );
      break;
    }
    case "damage":
    case "heal":
    case "gold":
    case "xp":
      ui.amount = action === "gold" ? c.gold : action === "xp" ? c.xp : 5;
      openModal(action);
      break;
    case "temporary-hp":
      ui.amount = c.state.tempHp;
      openModal("temporary");
      break;
    case "quick-amount":
      ui.amount = Number(data.value);
      render();
      break;
    case "apply-amount": {
      let amount = Number(ui.amount);
      if (!Number.isFinite(amount) || amount < 0 || amount > 1e8) {
        toast("Saisis un montant positif et raisonnable.");
        break;
      }
      const type = ui.modal;
      if (type !== "gold") amount = Math.floor(amount);
      let next = clone(c),
        message = "Modification enregistrée.";
      if (type === "damage") {
        const result = damageCharacter(c, amount);
        next = result.character;
        if (result.remaining > 0 && c.state.hp === 0) {
          next.state.deathFailure = clamp(next.state.deathFailure + 1, 0, 3);
          next.state.deathSuccess = 0;
        }
        if (result.remaining >= c.state.hp + d.maxHp && amount > 0) {
          next.state.deathFailure = 3;
          message =
            "Dégâts massifs : mort instantanée selon la règle standard. Vérifie les effets particuliers avec le MJ.";
        } else if (c.state.concentration && amount > 0 && next.state.hp > 0)
          message = `Concentration à vérifier : sauvegarde de Constitution DD ${result.concentrationDC}. Mets fin à la concentration en cas d’échec.`;
        else message = `${amount} dégâts appliqués, dont ${result.absorbed} absorbés par les PV temporaires.`;
      } else if (type === "heal") {
        next.state.hp = clamp(next.state.hp + amount, 0, d.maxHp);
        if (next.state.hp > 0) {
          next.state.deathSuccess = 0;
          next.state.deathFailure = 0;
        }
        message = "Soins appliqués. Vérifie les états manuels si tu reprends conscience.";
      } else if (type === "temporary") next.state.tempHp = amount;
      else if (type === "gold") next.gold = Math.round(amount * 100) / 100;
      else next.xp = amount;
      await saveCharacter(
        next,
        { damage: "Dégâts", heal: "Soins", temporary: "PV temporaires", gold: "Monnaie", xp: "Expérience" }[type],
        "session",
        c,
      );
      closeModal();
      toast(message);
      break;
    }
    case "resource-use": {
      const r = resources(c).find((r) => r.id === data.key);
      if (r && r.max !== null)
        await sessionChange((n) => {
          n.state.resourcesUsed[r.id] = clamp(r.used + Number(data.delta), 0, r.max);
        }, `Compteur : ${r.name}`);
      break;
    }
    case "resource-info": {
      const r = resources(c).find((r) => r.id === data.key);
      if (r) {
        openInfo(
          r.name,
          `${r.note || "Compteur de la capacité."}\n\nRécupération : ${r.reset === "short" ? "repos court ou long" : r.reset === "long" ? "repos long" : "manuelle"}. Utilisations : ${r.max === null ? "à volonté" : r.max - r.used + " / " + r.max}.`,
        );
        if (r.id === "wildshape") {
          ui.info.link = { label: "Voir les formes animales", route: "wildshape" };
          render();
        }
      }
      break;
    }
    case "toggle-slot": {
      const level = Number(data.level),
        spent = c.state.slotsUsed[level] || 0;
      await sessionChange((n) => {
        n.state.slotsUsed[level] = clamp(spent + (Number(data.index) < spent ? -1 : 1), 0, d.slots[level - 1]);
      }, `Emplacements de niveau ${level}`);
      break;
    }
    case "rest-short":
    case "rest-long":
      ui.rest = { type: action === "rest-long" ? "long" : "short", rolls: [], fed: true };
      openModal("rest");
      break;
    case "rest-die": {
      const die = Number(data.die),
        h = d.hitDice.find((x) => x.die === die);
      if (h && ui.rest.rolls.filter((r) => r.die === die).length < h.total - h.spent) ui.rest.rolls.push({ die, roll: rollDie(die) });
      render();
      break;
    }
    case "rest-undo-die":
      ui.rest.rolls.pop();
      render();
      break;
    case "confirm-rest": {
      if (ui.rest.type === "long" && c.state.hp <= 0) {
        toast("Un repos long récupérateur doit commencer avec au moins 1 PV.");
        break;
      }
      const next = restCharacter(c, ui.rest.type, { fed: ui.rest.fed });
      if (ui.rest.type === "short") {
        for (const r of ui.rest.rolls) next.state.hitDiceSpent[r.die] = (next.state.hitDiceSpent[r.die] || 0) + 1;
        next.state.hp = clamp(next.state.hp + ui.rest.rolls.reduce((sum, r) => sum + Math.max(0, r.roll + d.mods.con), 0), 0, derive(next).maxHp);
        if (next.state.hp > 0) {
          next.state.deathSuccess = 0;
          next.state.deathFailure = 0;
        }
      }
      await saveCharacter(next, ui.rest.type === "long" ? "Repos long" : "Repos court", "session", c);
      closeModal();
      toast("Repos enregistré.");
      break;
    }
    case "conditions":
      ui.form = { conditions: clone(c.state.conditions), exhaustion: c.state.exhaustion };
      openModal("conditions");
      break;
    case "toggle-condition": {
      const i = ui.form.conditions.indexOf(data.value);
      if (i >= 0) ui.form.conditions.splice(i, 1);
      else ui.form.conditions.push(data.value);
      render();
      break;
    }
    case "review-conditions": {
      const next = clone(c);
      next.state.conditions = clone(ui.form.conditions);
      next.state.exhaustion = Number(ui.form.exhaustion);
      openReview(
        next,
        "États et épuisement",
        `${next.state.conditions.join(", ") || "Aucun état"} ; épuisement ${next.state.exhaustion}. Les PV actuels seront limités au nouveau maximum, pas automatiquement rendus si ce maximum remonte.`,
        "session",
      );
      break;
    }
    case "end-concentration":
      await sessionChange((n) => {
        n.state.concentration = null;
      }, "Fin de concentration");
      toast("Concentration terminée.");
      break;
    case "cast":
      ui.cast = { id: data.id, mode: data.ritual ? "ritual" : "" };
      openModal("cast");
      break;
    case "confirm-cast": {
      const s = spellById(c, ui.cast.id),
        mode = ui.cast.mode;
      if (!mode || !s) break;
      const next = clone(c);
      if (/^\d+$/.test(mode)) {
        const n = Number(mode);
        if ((next.state.slotsUsed[n] || 0) >= (d.slots[n - 1] || 0)) throw new Error("Cet emplacement a déjà été consommé.");
        next.state.slotsUsed[n] = (next.state.slotsUsed[n] || 0) + 1;
      } else if (mode === "pact") {
        if ((next.state.pactUsed || 0) >= (d.pact?.count || 0)) throw new Error("Plus d’emplacement de pacte disponible.");
        next.state.pactUsed = (next.state.pactUsed || 0) + 1;
      } else if (mode === "innate") {
        const innate = innateSpells(c).find((x) => x.id === s.id && x.resource);
        if (innate?.usesPactSlot) {
          if ((next.state.pactUsed || 0) >= (d.pact?.count || 0)) throw new Error("Plus d’emplacement de pacte disponible.");
          next.state.pactUsed = (next.state.pactUsed || 0) + 1;
        }
        if (innate?.resource) next.state.resourcesUsed[innate.resource] = 1;
      } else if (mode === "arcanum") next.state.resourcesUsed[`arcanum-${s.level}`] = 1;
      if (s.concentration) next.state.concentration = s.name;
      await saveCharacter(next, `Sort : ${s.name}`, "session", c);
      closeModal();
      toast(`${s.name} ${mode === "ritual" ? "lancé en rituel" : "lancé"}. Résous ses effets à la table.`);
      break;
    }
    case "roll-ability":
      rollCheck(`Test de ${ABILITIES[data.key].name}`, d.mods[data.key]);
      break;
    case "roll-save":
      rollCheck(`Sauvegarde de ${ABILITIES[data.key].name}`, d.saves[data.key]);
      break;
    case "roll-skill":
      rollCheck(SKILLS[data.key][0], d.skills[data.key], "check", {
        reliable: classLevel(c, "rogue") >= 11 && d.ranks[data.key] > 0,
      });
      break;
    case "roll-attack": {
      const a = d.attacks[Number(data.index) || 0] || d.attacks[0];
      ui.attackIndex = Number(data.index) || 0;
      rollCheck(`Attaque · ${a.name}`, a.attack, "attack");
      break;
    }
    case "roll-damage": {
      const index = data.index !== undefined ? Number(data.index) : ui.attackIndex || 0,
        a = d.attacks[index] || d.attacks[0];
      ui.attackIndex = index;
      const result = rollDamage(a.damageDice, a.damageBonus);
      ui.roll = {
        ...result,
        name: `Dégâts · ${a.name}`,
        bonus: a.damageBonus,
        kind: "damage",
        note: `Dégâts de base (${a.damageDice} ${signed(a.damageBonus)} ${a.type}). Ajoute séparément les dés de critique${d.sneakAttack ? ", d’attaque sournoise" : ""}, de châtiment ou de rage.`,
      };
      openModal("roll");
      break;
    }
    case "roll-mode":
      ui.rollMode = data.value;
      if (ui.roll?.reroll) {
        const r = ui.roll.reroll;
        rollCheck(r.name, r.bonus, r.kind, r.options);
      }
      break;
    case "reroll":
      if (ui.roll?.kind === "damage") {
        await perform("roll-damage", el);
      } else if (ui.roll?.reroll) {
        const r = ui.roll.reroll;
        rollCheck(r.name, r.bonus, r.kind, r.options);
      }
      break;
    case "death-roll": {
      if (c.state.hp > 0 || c.state.deathSuccess >= 3 || c.state.deathFailure >= 3) {
        toast("Pas de nouveau jet : le personnage est conscient, stabilisé ou mort. Corrige les compteurs si nécessaire.");
        break;
      }
      const die = rollDie(20),
        bonus = classLevel(c, "monk") >= 14 ? d.prof : 0,
        next = clone(c);
      let note;
      if (die === 20) {
        next.state.hp = 1;
        next.state.deathSuccess = 0;
        next.state.deathFailure = 0;
        note = "20 naturel : tu récupères 1 PV.";
      } else if (die === 1) {
        next.state.deathFailure = Math.min(3, next.state.deathFailure + 2);
        note = "1 naturel : deux échecs.";
      } else if (die + bonus >= 10) {
        next.state.deathSuccess = Math.min(3, next.state.deathSuccess + 1);
        note = "Une réussite.";
      } else {
        next.state.deathFailure = Math.min(3, next.state.deathFailure + 1);
        note = "Un échec.";
      }
      if (next.state.deathSuccess >= 3) note += " Stabilisé : à 0 PV, sans nouveaux jets tant que tu restes stable.";
      if (next.state.deathFailure >= 3) note += " Trois échecs : le personnage meurt.";
      await saveCharacter(next, "Jet contre la mort", "session", c);
      ui.roll = { name: "Sauvegarde contre la mort", total: die + bonus, dice: [die], bonus, kind: "death", note };
      openModal("roll");
      break;
    }
    case "death-mark": {
      const key = data.kind === "deathSuccess" ? "deathSuccess" : "deathFailure",
        n = Number(data.value);
      await sessionChange((next) => {
        next.state[key] = next.state[key] >= n ? n - 1 : n;
      }, "Suivi des jets contre la mort");
      break;
    }
    case "equipment":
      ui.form = clone(c.equipment);
      if (!ui.form.weapons?.length) ui.form.weapons = [{ id: "unarmed", magic: 0, twoHands: false }];
      openModal("equipment");
      break;
    case "review-equipment":
      openReview(
        candidateEquipment(),
        "Équipement actif",
        "Les changements de CA, d’attaque, de dégâts et de déplacement seront appliqués. Les objets du sac ne s’équipent pas automatiquement.",
      );
      break;
    case "adjustments":
      ui.form = clone(c.adjustments);
      openModal("adjustments");
      break;
    case "review-adjustments": {
      const next = clone(c);
      next.adjustments = clone(ui.form);
      openReview(next, "Ajustements du MJ", "Ces bonus restent indépendants de tes scores de base et des aptitudes.");
      break;
    }
    case "new-item":
      ui.form = { id: uid(), name: "", qty: 1, weight: 0, description: "", editing: false };
      openModal("item");
      break;
    case "edit-item":
      ui.form = { ...clone(c.inventory.find((i) => i.id === data.id)), editing: true };
      openModal("item");
      break;
    case "review-item": {
      if (!ui.form.name.trim() || ui.form.qty < 0 || ui.form.weight < 0) {
        toast("Indique un nom et des quantités et poids positifs.");
        break;
      }
      const next = clone(c),
        item = clone(ui.form);
      delete item.editing;
      const i = next.inventory.findIndex((x) => x.id === item.id);
      if (i >= 0) next.inventory[i] = item;
      else next.inventory.push(item);
      openReview(
        next,
        `Objet : ${item.name}`,
        `${item.qty} exemplaire(s), ${item.weight} kg par unité. Aucun effet d’équipement n’est appliqué automatiquement.`,
      );
      break;
    }
    case "delete-item": {
      const next = clone(c),
        item = next.inventory.find((i) => i.id === data.id);
      next.inventory = next.inventory.filter((i) => i.id !== data.id);
      openReview(next, `Retirer ${item.name}`, "L’objet sera retiré du sac.");
      break;
    }
    case "new-trait":
      ui.form = {
        id: uid(),
        name: "",
        description: "",
        hp: 0,
        ac: 0,
        speed: 0,
        maxUses: 0,
        reset: "long",
        bonuses: Object.fromEntries(Object.keys(ABILITIES).map((a) => [a, 0])),
        active: true,
        editing: false,
      };
      openModal("trait");
      break;
    case "edit-trait":
      ui.form = { ...clone(c.custom.traits.find((t) => t.id === data.id)), editing: true };
      openModal("trait");
      break;
    case "review-trait":
      if (!ui.form.name.trim()) {
        toast("Nomme cette aptitude.");
        break;
      }
      openReview(
        traitCandidate(),
        `Aptitude : ${ui.form.name}`,
        "Seuls les effets chiffrés renseignés sont automatiques. La description reste un rappel pour la table.",
      );
      break;
    case "toggle-trait": {
      const next = clone(c),
        trait = next.custom.traits.find((t) => t.id === data.id);
      trait.active = trait.active === false;
      openReview(
        next,
        `${trait.active ? "Activer" : "Désactiver"} ${trait.name}`,
        "Les bonus chiffrés seront recalculés.",
      );
      break;
    }
    case "delete-trait": {
      const next = clone(c),
        t = next.custom.traits.find((t) => t.id === data.id);
      next.custom.traits = next.custom.traits.filter((t) => t.id !== data.id);
      openReview(next, `Retirer ${t.name}`, "Ses bonus et son compteur ne seront plus actifs.");
      break;
    }
    case "new-custom-spell":
      ui.form = {
        id: "custom-" + uid(),
        name: "",
        level: 1,
        school: "Maison",
        casting: "1 action",
        range: "18 m",
        duration: "Instantanée",
        components: "V, S",
        concentration: false,
        ritual: false,
        classes: [c.classId],
        description: "",
        custom: true,
        source: "homebrew",
        editing: false,
      };
      openModal("custom-spell");
      break;
    case "edit-custom-spell":
      ui.form = { ...clone(c.custom.spells.find((s) => s.id === data.id)), editing: true };
      openModal("custom-spell");
      break;
    case "review-custom-spell": {
      if (!ui.form.name.trim() || !ui.form.description.trim()) {
        toast("Donne un nom et une description au sort.");
        break;
      }
      const next = clone(c),
        spell = clone(ui.form);
      delete spell.editing;
      const i = next.custom.spells.findIndex((s) => s.id === spell.id);
      if (i >= 0) next.custom.spells[i] = spell;
      else next.custom.spells.push(spell);
      openReview(
        next,
        `Sort maison : ${spell.name}`,
        "Ajout au catalogue local de ce personnage. Choisis-le ensuite dans le grimoire pour l’apprendre ou le préparer.",
      );
      break;
    }
    case "delete-custom-spell": {
      const next = clone(c),
        spell = next.custom.spells.find((s) => s.id === data.id);
      next.custom.spells = next.custom.spells.filter((s) => s.id !== data.id);
      next.spells.known = next.spells.known.filter((id) => id !== data.id);
      next.spells.prepared = next.spells.prepared.filter((id) => id !== data.id);
      for (const [key, id] of Object.entries(next.spells.arcana)) if (id === data.id) delete next.spells.arcana[key];
      openReview(
        next,
        `Retirer ${spell.name}`,
        "Le sort sera retiré du catalogue, de tes sorts connus et de ta préparation.",
      );
      break;
    }
    case "save-notes": {
      const next = clone(c);
      next.notes = ui.noteDraft;
      await saveCharacter(next, "Journal", "session", c);
      render();
      toast("Journal enregistré sur cet appareil.");
      break;
    }
    case "commit-review": {
      const p = ui.pending,
        issues = characterIssues(p.character);
      if (issues.errors.length) {
        toast("Corrige les points bloquants avant de valider.");
        break;
      }
      await saveCharacter(p.character, p.label, p.mode || "settings", p.original);
      closeModal();
      toast("Changements enregistrés. Une version précédente reste dans les réglages.");
      break;
    }
    case "restore-snapshot": {
      const snapshot = appData.snapshots.find((s) => s.id === data.id);
      if (snapshot)
        openReview(
          snapshot.character,
          `Restaurer la version du ${dateLabel(snapshot.date)}`,
          "Cette restauration remplace la fiche concernée par sa version sauvegardée, y compris les compteurs et les PV. La fiche actuelle restera à son tour dans l’historique.",
          "restore",
          { original: appData.characters.find((x) => x.id === snapshot.characterId) || null },
        );
      break;
    }
    case "delete-character":
      askConfirm(
        `Supprimer ${c.name} ?`,
        "Sa fiche et ses versions précédentes seront supprimées de cet appareil. Fais un export avant de continuer.",
        "delete-character",
        c.id,
        { label: "Supprimer définitivement", danger: true },
      );
      break;
    case "confirm-action": {
      const f = ui.confirm;
      ui.modal = null;
      if (f.action === "discard-draft") {
        await clearDraft();
        render();
      } else if (f.action === "new-wizard") {
        await clearDraft();
        startWizard(null, f.key);
      } else if (f.action === "leave-level") {
        ui.levelFlow = null;
        go(f.key || "sheet");
      } else if (f.action === "delete-character") {
        await mutateApp(
          (s) => {
            s.characters = s.characters.filter((c) => c.id !== f.key);
            s.snapshots = s.snapshots.filter((x) => x.characterId !== f.key);
            if (s.activeId === f.key) s.activeId = s.characters[0]?.id || null;
            if (s.draft?.draft?.id === f.key) s.draft = null;
          },
          { redraw: false },
        );
        go("home");
      }
      break;
    }
    case "export-one":
      await exportCharacters(false);
      break;
    case "export-all":
      await exportCharacters(true);
      break;
    case "import":
      requestImport();
      break;
    case "confirm-import": {
      const list = clone(ui.imported);
      await mutateApp(
        (s) => {
          for (const item of list) {
            item.id = uid();
            item.name = item.name.slice(0, 70) + " (import)";
            item.updatedAt = new Date().toISOString();
            s.characters.push(reconcileState(item));
          }
          s.activeId = list[0].id;
        },
        { redraw: false },
      );
      closeModal();
      go("home");
      toast(`${list.length} fiche(s) importée(s), sans remplacer tes personnages.`);
      break;
    }
    case "persist-storage": {
      if (navigator.storage?.persist) {
        const granted = await navigator.storage.persist();
        toast(
          granted
            ? "Stockage persistant autorisé. Continue à faire des exports."
            : "Le navigateur n’a pas accordé la persistance. Tes fiches restent locales ; exporte-les régulièrement.",
        );
      } else toast("Ce navigateur ne propose pas cette option. Utilise les exports JSON.");
      break;
    }
    case "install":
      if (deferredInstall) {
        await deferredInstall.prompt();
        await deferredInstall.userChoice;
        deferredInstall = null;
      } else openModal("install");
      break;
    case "update-app":
      if (ui.levelFlow) {
        toast("Valide ou annule d’abord la progression en cours.");
        break;
      }
      if (ui.wizard) {
        clearTimeout(draftTimeout);
        const draft = clone(ui.wizard);
        await mutateApp(
          (s) => {
            s.draft = draft;
          },
          { redraw: false },
        );
      }
      if (swRegistration?.waiting) {
        await saveQueue;
        swRegistration.waiting.postMessage({ type: "SKIP_WAITING" });
      } else location.reload();
      break;
    case "beast-tab":
      ui.beastTab = data.value;
      render();
      break;
    case "beast-sort": {
      const current = ui.beastSort || { key: "cr", dir: -1 };
      ui.beastSort = current.key === data.key ? { key: data.key, dir: -current.dir } : { key: data.key, dir: data.key === "name" ? 1 : -1 };
      render();
      break;
    }
    case "beast-toggle": {
      const beast = beastCatalogue().find((b) => b.id === data.id);
      if (!beast) break;
      await sessionChange((n) => {
        n.beasts ||= { seen: [], unseen: [] };
        const listKey = beast.common ? "unseen" : "seen",
          list = n.beasts[listKey],
          i = list.indexOf(beast.id);
        if (i >= 0) list.splice(i, 1);
        else list.push(beast.id);
      }, `Formes animales : ${beast.name}`);
      const nowSeen = beastStatus(activeCharacter(), beast).seen;
      toast(nowSeen ? `${beast.name} ajouté à tes formes.` : `${beast.name} retiré de tes formes.`);
      break;
    }
    case "copy-export": {
      const box = document.getElementById("export-json");
      try {
        await navigator.clipboard.writeText(ui.exportText || "");
        toast("Sauvegarde copiée.");
      } catch {
        box?.focus();
        box?.select();
        toast("Le texte est sélectionné : copie-le avec le menu de ton appareil.");
      }
      break;
    }
    case "paste-import":
      ui.importText = "";
      openModal("import-text");
      break;
    case "parse-import-text":
      try {
        const raw = JSON.parse(ui.importText || "");
        let list;
        if (raw.format === "compagnon-srd51" && [1, SCHEMA_VERSION].includes(raw.schemaVersion) && Array.isArray(raw.characters)) list = raw.characters;
        else if ([1, SCHEMA_VERSION].includes(raw.schemaVersion) && (raw.classId || raw.levels)) list = [raw];
        else throw new Error("Ce texte n’est pas une sauvegarde Compagnon.");
        if (list.length < 1 || list.length > 100) throw new Error("Importe entre 1 et 100 personnages à la fois.");
        ui.imported = list.map(validateImport);
        openModal("import");
      } catch (error) {
        toast(error instanceof SyntaxError ? "Texte illisible : colle la sauvegarde complète, du premier au dernier caractère." : error.message);
      }
      break;
    case "set-theme":
      try {
        if (data.value === "auto") localStorage.removeItem("compagnon-theme");
        else localStorage.setItem("compagnon-theme", data.value);
      } catch {}
      applyTheme(data.value);
      render();
      break;
    case "print":
      window.print();
      break;
    case "choose-background": {
      const draft = ui.wizard.draft,
        id = data.id;
      if ((draft.background.id || "custom") === id) break;
      draft.background =
        id === "custom"
          ? { ...draft.background, id: "custom", name: draft.background.name || "Historique personnalisé", skills: [] }
          : { ...draft.background, id, name: "", skills: [] };
      clearPicks(draft, ["bg|"]);
      const bgSkills = backgroundSkills(draft),
        cls = CLASSES[primaryClassId(draft)];
      if (draft.skills.some((s) => bgSkills.includes(s)))
        draft.skills = [...draft.skills.filter((s) => !bgSkills.includes(s)), ...cls.skills.filter((s) => !bgSkills.includes(s) && !draft.skills.includes(s))].slice(0, cls.pick);
      queueDraft();
      render();
      break;
    }
    case "choose-subclass": {
      const draft = levelDraft(data.prefix),
        classId = data.class;
      if (!draft || draft.subclasses[classId] === data.id) break;
      const old = SUBCLASSES[classId]?.[draft.subclasses[classId]];
      draft.subclasses[classId] = data.id;
      clearPicks(draft, [`sub|${classId}|`]);
      const keys = (old?.choices || []).map((ch) => ch.key).concat(old?.dragonChoice ? ["dragon"] : []);
      for (const l of draft.levels) if (l.classId === classId) for (const k of keys) delete l.choices[k];
      if (data.id === "custom") draft.customSubclasses[classId] ||= { name: "", description: "" };
      if (data.prefix === "wiz") queueDraft();
      render();
      break;
    }
    case "roll-abilities": {
      const w = ui.wizard,
        results = Array.from({ length: 6 }, () => rollAbilityScore());
      w.rollDetails = results;
      w.rollPool = results.map((r) => r.total);
      const order = [...CLASSES[primaryClassId(w.draft)].primary, ...Object.keys(ABILITIES).filter((a) => !CLASSES[primaryClassId(w.draft)].primary.includes(a))];
      const sorted = [...w.rollPool].sort((a, b) => b - a);
      w.draft.abilities = Object.fromEntries(order.map((a, i) => [a, sorted[i]]));
      queueDraft();
      render();
      break;
    }
    case "ability-step": {
      const draft = ui.wizard.draft,
        method = draft.abilityMethod,
        min = method === "points" ? 8 : 1,
        max = method === "points" ? 15 : 20,
        value = clamp(draft.abilities[data.key] + Number(data.delta), min, max);
      const trial = { ...draft.abilities, [data.key]: value };
      if (method === "points" && pointBuyCost(trial) > 27) {
        toast("Plus assez de points pour cette hausse.");
        break;
      }
      draft.abilities[data.key] = value;
      queueDraft();
      render();
      break;
    }
    case "kit-mode":
      ui.wizard.draft.startKit.mode = data.value;
      queueDraft();
      render();
      break;
    case "roll-gold": {
      const text = CLASS_EXTRAS[primaryClassId(ui.wizard.draft)]?.startingGold || "",
        m = /(\d+)d(\d+)(?:\s*[×x*]\s*(\d+))?/.exec(text);
      if (!m) break;
      const total = Array.from({ length: Number(m[1]) }, () => rollDie(Number(m[2]))).reduce((a, b) => a + b, 0) * (Number(m[3]) || 1);
      ui.wizard.draft.gold = total;
      queueDraft();
      render();
      toast(`${total} po de départ.`);
      break;
    }
    case "level-class": {
      const f = ui.levelFlow,
        classId = data.id,
        base = clone(f.original);
      if (f.draft.levels[f.level - 1].classId === classId) break;
      f.draft.levels[f.level - 1] = defaultLevel(classId, f.level, classLevel(base, classId) + 1);
      if (CLASSES[classId].subLevel === 1 && !f.draft.subclasses[classId]) f.draft.subclasses[classId] = DEFAULT_SUBCLASS[classId];
      if (!classLevel(base, classId)) {
        clearPicks(f.draft, [`class|${classId}|`]);
        if (!f.original.subclasses?.[classId] && CLASSES[classId].subLevel > 1) delete f.draft.subclasses[classId];
      }
      render();
      break;
    }
    case "editor-class":
      ui.editorClass = data.value;
      render();
      break;
    case "toggle-pact": {
      const spent = c.state.pactUsed || 0;
      await sessionChange((n) => {
        n.state.pactUsed = clamp(spent + (Number(data.index) < spent ? -1 : 1), 0, d.pact?.count || 0);
      }, "Emplacements de pacte");
      break;
    }
    case "roll-initiative":
      rollCheck("Initiative", d.initiative, "check");
      break;
    case "ac-info":
      openInfo("Classe d’armure", `${d.ac} = ${d.acExplanation}.`);
      break;
    case "equip-add-weapon":
      ui.form.weapons.push({ id: "dagger", magic: 0, twoHands: false });
      render();
      break;
    case "equip-remove-weapon":
      ui.form.weapons.splice(Number(data.index), 1);
      render();
      break;
    case "catalog-item":
      ui.catalogQuery = "";
      ui.catalogTab = ui.catalogTab || "gear";
      openModal("catalog");
      break;
    case "catalog-tab":
      ui.catalogTab = data.value;
      render();
      break;
    case "add-catalog-item": {
      const info = itemInfo(data.id);
      if (!info) break;
      await sessionChange((n) => {
        const existing = n.inventory.find((x) => x.ref === data.id);
        if (existing) existing.qty += 1;
        else n.inventory.push({ id: uid(), ref: data.id, name: info.name, qty: 1, weight: Number(info.weight) || 0, description: info.contents || info.special || "" });
      }, `Sac : ${info.name}`);
      toast(`${info.name} ajouté au sac.`);
      break;
    }
    case "close-modal":
      closeModal();
      break;
    case "reload":
      location.reload();
      break;
  }
}

document.addEventListener("input", (event) => {
  const el = event.target;
  if (el.matches("[data-bind]") && !["checkbox", "radio"].includes(el.type))
    try {
      handleBinding(el, false);
    } catch (error) {
      reportError(error);
    }
});
document.addEventListener("change", (event) => {
  const el = event.target;
  if (el.matches("[data-bind],[data-array]"))
    try {
      handleBinding(el, true);
    } catch (error) {
      reportError(error);
    }
});
let actionBusy = false;
document.addEventListener("click", async (event) => {
  const el = event.target.closest("[data-action]");
  if (!el || el.disabled || actionBusy) return;
  event.preventDefault();
  actionBusy = true;
  try {
    await perform(el.dataset.action, el);
  } catch (error) {
    reportError(error);
    render();
  } finally {
    actionBusy = false;
  }
});
document.addEventListener("keydown", (event) => {
  if (!ui.modal) return;
  if (event.key === "Escape") {
    event.preventDefault();
    closeModal();
    return;
  }
  if (event.key === "Tab") {
    const nodes = [
      ...modalRoot.querySelectorAll(
        'button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),a[href],[tabindex="0"]',
      ),
    ].filter((x) => x.getClientRects().length);
    if (!nodes.length) return;
    const first = nodes[0],
      last = nodes.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});
window.addEventListener("online", () => {
  ui.online = true;
  render();
});
window.addEventListener("offline", () => {
  ui.online = false;
  render();
});
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstall = event;
});
window.addEventListener("appinstalled", () => {
  deferredInstall = null;
  toast("Compagnon est installé. Bonne aventure.");
});
async function setupServiceWorker() {
  if (window.COMPANION_STANDALONE || !("serviceWorker" in navigator) || !/^https?:$/.test(location.protocol)) return;
  try {
    swRegistration = await navigator.serviceWorker.register("./sw.js");
    if (swRegistration.waiting) {
      ui.update = true;
      render();
    }
    swRegistration.addEventListener("updatefound", () => {
      const worker = swRegistration.installing;
      worker?.addEventListener("statechange", () => {
        if (worker.state === "installed" && navigator.serviceWorker.controller) {
          ui.update = true;
          render();
        }
      });
    });
    let reloading = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!reloading && ui.update) {
        reloading = true;
        location.reload();
      }
    });
  } catch (error) {
    console.warn("Mode hors ligne non disponible :", error);
    toast("Le cache hors ligne n’a pas pu être installé. Vérifie la connexion et l’hébergement HTTPS.");
  }
}
(async () => {
  try {
    appData = await localStore.open();
    appData.characters.forEach(validateImport);
    if (!appData.characters.some((c) => c.id === appData.activeId))
      appData.activeId = appData.characters[0]?.id || null;
    ui.route = activeCharacter() ? "sheet" : "home";
    ui.noteDraft = activeCharacter()?.notes || "";
    render();
    await setupServiceWorker();
  } catch (error) {
    ui.fatal = error.message;
    render();
  }
})();

function beastSpeeds(b) {
  const s = b.speed || {},
    parts = [];
  if (s.walk) parts.push(formatMeters(s.walk));
  if (s.swim) parts.push(`nage ${formatMeters(s.swim)}`);
  if (s.fly) parts.push(`vol ${formatMeters(s.fly)}`);
  if (s.climb) parts.push(`escalade ${formatMeters(s.climb)}`);
  if (s.burrow) parts.push(`fouissement ${formatMeters(s.burrow)}`);
  return parts.join(", ");
}
function renderWildShape(c) {
  const rules = wildShapeRules(c);
  if (!rules)
    return `<div class="page-head"><div><div class="eyebrow">${esc(c.name)}</div><h1>Formes animales</h1></div></div>${notice("La forme sauvage s’obtient au niveau 2 de druide.")}`;
  const all = beastCatalogue().map((b) => ({ b, st: beastStatus(c, b, rules) }));
  const groups = {
    available: all.filter((x) => x.st.eligible && x.st.seen),
    discover: all.filter((x) => x.st.eligible && !x.st.seen),
    locked: all.filter((x) => !x.st.eligible),
  };
  const tab = groups[ui.beastTab] ? ui.beastTab : "available";
  const q = (ui.beastQuery || "").toLocaleLowerCase("fr-FR");
  const { key, dir } = ui.beastSort || { key: "cr", dir: -1 };
  const value = (x) => (key === "name" ? x.b.name : key === "cr" ? x.b.cr : key === "ac" ? x.b.ac : x.b.hp);
  const list = groups[tab]
    .filter((x) => !q || x.b.name.toLocaleLowerCase("fr-FR").includes(q))
    .sort((a, b) => {
      const va = value(a),
        vb = value(b);
      const cmp = typeof va === "string" ? va.localeCompare(vb, "fr") : va - vb;
      return cmp * dir || a.b.name.localeCompare(b.b.name, "fr");
    });
  const head = (k, label, cls = "") => {
    const active = key === k;
    return `<button type="button" class="beast-sort ${cls} ${active ? "active" : ""}" data-action="beast-sort" data-key="${k}" aria-label="Trier par ${label.toLowerCase()}${active ? (dir > 0 ? ", ordre croissant" : ", ordre décroissant") : ""}">${label}<span aria-hidden="true">${active ? (dir > 0 ? "▲" : "▼") : ""}</span></button>`;
  };
  const limitText = `Bêtes jusqu’au FP ${formatCR(rules.maxCR)}${rules.swim ? "" : ", sans vitesse de nage"}${rules.fly ? "" : ", sans vitesse de vol"}.`;
  const rows = list
    .map(({ b, st }) => {
      const action =
        tab === "discover"
          ? `<button type="button" class="icon-btn beast-add" data-action="beast-toggle" data-id="${b.id}" title="J’ai vu cette bête" aria-label="J’ai vu : ${esc(b.name)}, l’ajouter">${icon("plus", 16)}</button>`
          : tab === "available"
            ? `<button type="button" class="icon-btn beast-seen" data-action="beast-toggle" data-id="${b.id}" title="Retirer des bêtes vues" aria-label="Retirer ${esc(b.name)} des bêtes vues">${icon("check", 15)}</button>`
            : "";
      return `<div class="beast-row ${tab === "locked" ? "locked" : ""}"><div class="beast-name"><strong>${esc(b.name)}</strong><small>${esc(BEAST_SIZES[b.size] || b.size)}, ${esc(beastSpeeds(b))}${b.source === "mm" ? ", Bestiaire" : ""}</small>${tab === "locked" ? `<small class="beast-reason">${esc(st.reasons.join(", "))}</small>` : ""}</div><span class="beast-num">${formatCR(b.cr)}</span><span class="beast-num">${b.ac}</span><span class="beast-num">${b.hp}</span>${tab === "locked" ? "" : `<div class="beast-action">${action}</div>`}</div>`;
    })
    .join("");
  const emptyText = {
    available: "Aucune bête vue ne correspond. Ajoute celles que tu as rencontrées depuis l’onglet « À découvrir ».",
    discover: "Toutes les bêtes compatibles avec ton niveau sont déjà vues.",
    locked: "Aucune bête hors de portée : toutes te sont accessibles.",
  }[tab];
  return `<div class="page-head mobile-stack"><div><div class="eyebrow">${esc(c.name)}, druide ${rules.level}${rules.moon ? ", Cercle de la Lune" : ""}</div><h1>Formes animales</h1><p class="page-subtitle">${limitText} ${rules.uses ? `${rules.uses} utilisations par repos court ou long` : "Utilisations illimitées (Archidruide)"}, ${rules.hours} heure${rules.hours > 1 ? "s" : ""} au plus.</p></div></div>${
    rules.elemental ? notice("Forme élémentaire : en dépensant deux utilisations, tu peux devenir un élémentaire d’air, de terre, de feu ou d’eau.", "purple") : ""
  }<p class="small muted beast-intro">Les animaux courants comptent comme déjà vus. Les autres bêtes s’ajoutent quand ton druide en a rencontré une.</p><div class="segmented">${[
    ["available", "Disponibles"],
    ["discover", "À découvrir"],
    ["locked", "Hors de portée"],
  ]
    .map(([id, label]) => `<button type="button" data-action="beast-tab" data-value="${id}" class="${tab === id ? "active" : ""}">${label} <span class="count">${groups[id].length}</span></button>`)
    .join("")}</div><div class="search-wrap beast-search">${icon("search", 18)}<input id="beast-search" class="search-input" data-bind="ui.beastQuery" value="${esc(ui.beastQuery || "")}" placeholder="Chercher une bête…" aria-label="Chercher une bête"></div>${tab === "discover" ? '<p class="tiny muted beast-hint">Touche + quand ton druide a vu la bête : elle rejoint tes formes disponibles.</p>' : ""}<div class="beast-table ${tab === "locked" ? "no-action" : ""}" role="table" aria-label="Formes animales"><div class="beast-row beast-head" role="row">${head("name", "Nom", "left")}${head("cr", "FP")}${head("ac", "CA")}${head("hp", "PV")}${tab === "locked" ? "" : "<span></span>"}</div>${rows || `<p class="small muted beast-empty">${emptyText}</p>`}</div><p class="tiny muted section-gap">FP : facteur de puissance. Tu gardes tes caractéristiques d’Intelligence, de Sagesse et de Charisme ; les PV de la bête s’ajoutent aux tiens et tu reprends ta forme à 0 PV. Profils complets dans le Bestiaire ou le SRD.</p>`;
}

})();
