// Core game entity types for Azur Lane Wiki

export interface Ship {
  id: string;
  name: string;
  nationality: string;
  shipType: ShipType;
  rarity: Rarity;
  stats: ShipStats;
  skills: Skill[];
  retrofitAvailable: boolean;
  obtainMethods: string[];
  icon: string;
  chibi: string;
  fullArt: string;
  voiceLines: VoiceLine[];
  skins: Skin[];
  tierRatings: TierRatings;
  buildRecommendations: BuildRecommendation[];
}

export interface ShipStats {
  level1: BaseStats;
  level100: BaseStats;
  level120: BaseStats;
  level125?: BaseStats;
  affection: {
    like: StatModifiers;
    love: StatModifiers;
  };
  oathBonus?: StatModifiers;
}

export interface BaseStats {
  hp: number;
  firepower: number;
  torpedo: number;
  antiAir: number;
  aviation: number;
  reload: number;
  hit: number;
  evasion: number;
  speed: number;
  luck: number;
  antiSubmarine: number;
  oilConsumption: number;
}

export interface StatModifiers {
  hp?: number;
  firepower?: number;
  torpedo?: number;
  antiAir?: number;
  aviation?: number;
  reload?: number;
  hit?: number;
  evasion?: number;
  speed?: number;
  luck?: number;
  antiSubmarine?: number;
}

export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  rarity: Rarity;
  nation: string;
  stats: EquipmentStats;
  skills: Skill[];
  ammunition: AmmunitionType;
  armorEffectiveness: ArmorEffectiveness;
  icon: string;
  tierRating: EquipmentTierRating;
  compatibility: EquipmentCompatibility[];
  obtainMethods: string[];
  enhancementLevels: EnhancementLevel[];
}

export interface EquipmentStats {
  base: BaseStats;
  maxEnhanced: BaseStats;
}

export interface EnhancementLevel {
  level: number;
  stats: BaseStats;
  materials: Material[];
  cost: number;
}

export interface ArmorEffectiveness {
  light: number;
  medium: number;
  heavy: number;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: SkillType;
  cooldown?: number;
  activation: SkillActivation;
  levels: SkillLevel[];
}

export interface SkillLevel {
  level: number;
  description: string;
  values: Record<string, number>;
}

export interface TierRatings {
  campaign: TierRating;
  arbiters: TierRating;
  bosses: TierRating;
  operationSiren: TierRating;
  pvp: TierRating;
  monthlyChallenge: TierRating;
}

export interface TierRating {
  tier: 'T0' | 'T1' | 'T2' | 'T3' | 'T4';
  rating: number;
  notes: string;
  lastUpdated: string;
}

export interface BuildRecommendation {
  mode: GameMode;
  priority: number;
  equipment: {
    main?: string;
    secondary?: string;
    antiAir?: string;
    auxiliary1?: string;
    auxiliary2?: string;
  };
  notes: string;
  alternatives: string[];
}

export interface CampaignNode {
  id: string;
  world: string;
  chapter: string;
  node: string;
  name: string;
  enemies: Enemy[];
  drops: Drop[];
  requirements: Requirements;
  rewards: Reward[];
  threatLevel: number;
  recommendedLevel: number;
  oilCost: number;
  experience: number;
  hazardLevel?: number;
}

export interface Drop {
  item: string;
  type: DropType;
  rarity: Rarity;
  rate: number;
  guaranteed?: boolean;
}

export interface ResearchProject {
  id: string;
  season: string;
  ship: string;
  type: ResearchType;
  duration: number;
  requirements: ResearchRequirement[];
  rewards: Reward[];
  priority: number;
  notes: string;
}

export interface FarmingGuide {
  id: string;
  target: string;
  type: FarmingType;
  locations: FarmingLocation[];
  efficiency: number;
  requirements: string[];
  notes: string;
  lastUpdated: string;
}

export interface FarmingLocation {
  node: string;
  dropRate: number;
  oilEfficiency: number;
  timeEfficiency: number;
  requirements: string[];
}

// Enums
export enum ShipType {
  DESTROYER = 'DD',
  LIGHT_CRUISER = 'CL',
  HEAVY_CRUISER = 'CA',
  BATTLECRUISER = 'BC',
  BATTLESHIP = 'BB',
  AIRCRAFT_CARRIER = 'CV',
  LIGHT_CARRIER = 'CVL',
  SUBMARINE = 'SS',
  SUBMARINE_CARRIER = 'SSV',
  MONITOR = 'BM',
  LARGE_CRUISER = 'CB',
  REPAIR_SHIP = 'AR',
  MUNITION_SHIP = 'AE',
}

export enum Rarity {
  COMMON = 'Common',
  RARE = 'Rare',
  ELITE = 'Elite',
  SUPER_RARE = 'Super Rare',
  ULTRA_RARE = 'Ultra Rare',
  PRIORITY = 'Priority',
  DECISIVE = 'Decisive',
}

export enum EquipmentType {
  DESTROYER_GUN = 'DD Gun',
  LIGHT_CRUISER_GUN = 'CL Gun',
  HEAVY_CRUISER_GUN = 'CA Gun',
  BATTLESHIP_GUN = 'BB Gun',
  TORPEDO = 'Torpedo',
  FIGHTER = 'Fighter',
  DIVE_BOMBER = 'Dive Bomber',
  TORPEDO_BOMBER = 'Torpedo Bomber',
  ANTI_AIR = 'Anti-Air',
  AUXILIARY = 'Auxiliary',
  SUBMARINE_TORPEDO = 'Sub Torpedo',
}

export enum AmmunitionType {
  NORMAL = 'Normal',
  HIGH_EXPLOSIVE = 'HE',
  ARMOR_PIERCING = 'AP',
  SEMI_ARMOR_PIERCING = 'SAP',
}

export enum SkillType {
  OFFENSE = 'Offense',
  DEFENSE = 'Defense',
  SUPPORT = 'Support',
  SPECIAL = 'Special',
}

export enum SkillActivation {
  PASSIVE = 'Passive',
  ON_BATTLE_START = 'Battle Start',
  MAIN_GUN_FIRE = 'Main Gun Fire',
  TORPEDO_FIRE = 'Torpedo Fire',
  AIRSTRIKE = 'Airstrike',
  TAKING_DAMAGE = 'Taking Damage',
  LOW_HP = 'Low HP',
  ENEMY_DEFEATED = 'Enemy Defeated',
}

export enum GameMode {
  CAMPAIGN = 'Campaign',
  ARBITERS = 'Arbiters',
  BOSSES = 'Bosses',
  OPERATION_SIREN = 'Operation Siren',
  PVP = 'PVP',
  MONTHLY_CHALLENGE = 'Monthly Challenge',
}

export enum DropType {
  SHIP = 'Ship',
  EQUIPMENT = 'Equipment',
  MATERIAL = 'Material',
  BLUEPRINT = 'Blueprint',
  CURRENCY = 'Currency',
}

export enum ResearchType {
  COMBAT = 'Combat',
  COMMISSION = 'Commission',
  TECH_BOX = 'Tech Box',
  COIN = 'Coin',
  OIL = 'Oil',
}

export enum FarmingType {
  SHIP = 'Ship',
  EQUIPMENT = 'Equipment',
  MATERIAL = 'Material',
  EXPERIENCE = 'Experience',
  GOLD = 'Gold',
}

// Additional interfaces
export interface VoiceLine {
  event: string;
  text: string;
  audioFile?: string;
}

export interface Skin {
  id: string;
  name: string;
  type: 'Default' | 'Retrofit' | 'Costume' | 'Wedding';
  cost?: number;
  currency?: string;
  limited?: boolean;
  image: string;
  chibi?: string;
}

export interface EquipmentTierRating {
  overall: TierRating;
  byShipType: Record<ShipType, TierRating>;
}

export interface EquipmentCompatibility {
  shipType: ShipType;
  rating: number;
  notes: string;
}

export interface Enemy {
  name: string;
  level: number;
  type: string;
  hp: number;
  abilities: string[];
}

export interface Requirements {
  playerLevel?: number;
  fleetPower?: number;
  previousNode?: string;
  stars?: number;
}

export interface Reward {
  type: string;
  item: string;
  quantity: number;
  guaranteed: boolean;
}

export interface ResearchRequirement {
  type: string;
  quantity: number;
  description: string;
}

export interface Material {
  id: string;
  name: string;
  type: string;
  rarity: Rarity;
  icon: string;
  description: string;
  obtainMethods: string[];
}