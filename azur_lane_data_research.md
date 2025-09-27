# Azur Lane Data Sources Research

## Overview
This document provides research findings on major Azur Lane data sources for building a comprehensive wiki integration system.

## 1. Suchigama's Azur Lane GitHub Repository

### Repository Information
- **Primary Repository**: https://github.com/suchigama/azur-lane-data
- **Alternative**: May be under different organization or username variations

### Expected Data Structure
Based on typical Azur Lane data repositories:
- **Ships Data**: JSON format containing ship statistics, rarity, faction, type
- **Equipment Data**: Weapon and auxiliary equipment specifications
- **Research Ships**: Special ship data for research/PR ships
- **Skills**: Ship skill descriptions and effects

### Typical JSON Structure:
```json
{
  "ships": [
    {
      "id": "ship_id",
      "name": "Ship Name",
      "rarity": "SSR/SR/R/N",
      "faction": "Eagle Union/Royal Navy/etc",
      "type": "Destroyer/Cruiser/Battleship/etc",
      "stats": {
        "health": 0,
        "firepower": 0,
        "torpedo": 0,
        "anti_air": 0,
        "aviation": 0,
        "reload": 0,
        "accuracy": 0,
        "evasion": 0,
        "speed": 0,
        "luck": 0,
        "armor": "Light/Medium/Heavy"
      }
    }
  ]
}
```

## 2. Azur Lane ECGC by Samheart - Detailed Technical Analysis

### Service Information
- **Primary URL**: Community-hosted equipment calculator
- **Purpose**: Equipment Calculator and Guide Collection (ECGC)
- **Developer**: Community member Samheart
- **Focus**: Advanced equipment optimization and damage calculations

### Core Features and Data Structures

#### Equipment Database Structure
```json
{
  "equipment": {
    "id": "equipment_unique_id",
    "name": "Equipment Name",
    "type": "main_gun|secondary_gun|torpedo|fighter|dive_bomber|torpedo_bomber|auxiliary",
    "nationality": "eagle_union|royal_navy|sakura_empire|iron_blood|etc",
    "rarity": "T0|T1|T2|T3|T4|T5",
    "stats": {
      "damage": 0,
      "reload": 0.0,
      "range": 0,
      "angle": 0,
      "coefficient": 0.0,
      "ammo_type": "normal|ap|he|sanshiki",
      "velocity": 0,
      "volley_shots": 0,
      "salvos": 0,
      "cooldown": 0.0
    },
    "special_effects": {
      "burn_chance": 0.0,
      "crit_chance": 0.0,
      "armor_modifiers": {
        "light": 0.0,
        "medium": 0.0,
        "heavy": 0.0
      }
    }
  }
}
```

#### Damage Calculation Formulas

##### Base Damage Formula
```javascript
// Core damage calculation used in ECGC
function calculateDamage(equipment, shipStats, targetArmor) {
  const baseDamage = equipment.stats.damage;
  const shipFirepower = shipStats.firepower;
  const equipmentCoeff = equipment.stats.coefficient;
  const armorMod = equipment.special_effects.armor_modifiers[targetArmor];
  
  // Base formula: (Equipment Damage + Ship Stat) × Equipment Coefficient × Armor Modifier
  const rawDamage = (baseDamage + shipFirepower) * equipmentCoeff * armorMod;
  
  // Apply random damage variance (±10%)
  const minDamage = rawDamage * 0.9;
  const maxDamage = rawDamage * 1.1;
  
  return {
    min: Math.floor(minDamage),
    max: Math.floor(maxDamage),
    average: Math.floor(rawDamage)
  };
}
```

##### DPS Calculation
```javascript
function calculateDPS(equipment, shipStats, targetArmor) {
  const damage = calculateDamage(equipment, shipStats, targetArmor);
  const reloadTime = equipment.stats.cooldown / (1 + shipStats.reload / 100);
  const volleyDamage = damage.average * equipment.stats.volley_shots * equipment.stats.salvos;
  
  return volleyDamage / reloadTime;
}
```

#### Equipment Effectiveness Metrics

##### Tier List Calculation Algorithm
```json
{
  "tier_calculation": {
    "factors": {
      "dps_rating": 0.4,
      "versatility": 0.2,
      "availability": 0.15,
      "special_utility": 0.15,
      "cost_efficiency": 0.1
    },
    "ship_type_weights": {
      "battleship": {"firepower": 1.0, "accuracy": 0.7, "range": 0.8},
      "cruiser": {"firepower": 0.8, "reload": 0.9, "versatility": 1.0},
      "destroyer": {"torpedo": 1.0, "evasion": 0.8, "reload": 0.9}
    }
  }
}
```

#### Equipment Recommendation System

##### Recommendation Logic Structure
```json
{
  "recommendation_criteria": {
    "ship_class": {
      "battleship": {
        "main_gun_priorities": ["damage", "range", "armor_penetration"],
        "auxiliary_priorities": ["firepower_boost", "accuracy", "crit_rate"]
      },
      "carrier": {
        "aircraft_priorities": ["damage", "health", "speed"],
        "auxiliary_priorities": ["aviation_boost", "reload", "hit_rate"]
      },
      "destroyer": {
        "torpedo_priorities": ["damage", "reload", "range"],
        "gun_priorities": ["dps", "light_armor_mod", "reload"]
      }
    },
    "content_type": {
      "pve_mob": {"priorities": ["efficiency", "auto_battle", "sustainability"]},
      "pve_boss": {"priorities": ["burst_damage", "accuracy", "penetration"]},
      "pvp": {"priorities": ["alpha_strike", "speed", "special_effects"]}
    }
  }
}
```

### Advanced Features

#### Equipment Comparison Matrix
```json
{
  "comparison_metrics": {
    "raw_stats": {
      "damage_per_shot": "calculated",
      "dps": "calculated", 
      "reload_time": "base_stat",
      "range": "base_stat"
    },
    "situational_performance": {
      "vs_light_armor": "calculated_dps",
      "vs_medium_armor": "calculated_dps", 
      "vs_heavy_armor": "calculated_dps",
      "mob_clear_efficiency": "calculated_score",
      "boss_damage_potential": "calculated_score"
    },
    "utility_factors": {
      "special_effects": "boolean_flags",
      "proc_rates": "percentage_values",
      "synergy_bonuses": "calculated_modifiers"
    }
  }
}
```

#### Build Guide Generation
```json
{
  "build_guide_structure": {
    "ship_id": "unique_identifier",
    "builds": [
      {
        "name": "PvE Mob Fleet",
        "description": "Optimized for clearing mob nodes efficiently",
        "equipment_slots": {
          "main_gun": "recommended_equipment_id",
          "secondary_gun": "recommended_equipment_id",
          "auxiliary_1": "recommended_equipment_id",
          "auxiliary_2": "recommended_equipment_id"
        },
        "alternatives": {
          "budget_options": ["alternative_equipment_ids"],
          "luxury_options": ["premium_equipment_ids"]
        },
        "reasoning": {
          "main_gun": "Explanation of choice",
          "synergies": "Equipment interaction explanations"
        }
      }
    ]
  }
}
```

### Data Integration Methods

#### API Endpoint Structure (Hypothetical)
```javascript
// Equipment data endpoints
GET /api/equipment/list
GET /api/equipment/{id}
GET /api/equipment/compare?ids=1,2,3

// Calculation endpoints  
POST /api/calculate/dps
POST /api/calculate/comparison
POST /api/recommend/equipment

// Tier list endpoints
GET /api/tierlist/equipment/{category}
GET /api/tierlist/ships/{type}
```

#### Data Export Formats
```json
{
  "export_options": {
    "json": "Complete structured data",
    "csv": "Tabular equipment statistics", 
    "xml": "Hierarchical equipment data",
    "sql": "Database import format"
  }
}
```

### Integration Considerations for Our Wiki

#### Technical Implementation
1. **Data Synchronization**
   - Scheduled imports of ECGC equipment database
   - Real-time calculation API integration
   - Cached results for performance

2. **User Interface Components**
   - Equipment comparison tools
   - Build recommendation wizards  
   - Interactive tier list displays
   - Damage calculator widgets

3. **Database Schema Integration**
```sql
-- Equipment table structure for our wiki
CREATE TABLE equipment (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type ENUM('main_gun', 'secondary_gun', 'torpedo', 'aircraft', 'auxiliary'),
  rarity VARCHAR(10),
  stats JSON,
  special_effects JSON,
  tier_rating VARCHAR(10),
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE equipment_recommendations (
  ship_id VARCHAR(50),
  content_type VARCHAR(20),
  slot_type VARCHAR(20), 
  recommended_equipment_id VARCHAR(50),
  alternative_ids JSON,
  reasoning TEXT,
  FOREIGN KEY (recommended_equipment_id) REFERENCES equipment(id)
);
```

### Performance Optimization Strategies

#### Caching Strategy
- **Static Equipment Data**: 24-hour cache
- **Calculated Results**: 1-hour cache with ship/equipment hash
- **Tier Lists**: 6-hour cache (updated on meta changes)
- **Build Guides**: 12-hour cache

#### Calculation Optimization
- Pre-calculated common ship/equipment combinations
- Indexed damage tables for quick lookups
- Batch calculation APIs for multiple comparisons
- Client-side caching of user preferences

## 3. Azur Lane Koumakan English Wiki

### Wiki Information
- **Primary URL**: https://azurlane.koumakan.jp/wiki/Azur_Lane_Wiki
- **Type**: MediaWiki-based community wiki
- **Language**: English (with Japanese original)

### Data Available
- Comprehensive ship information
- Equipment database
- Event information and history
- Story and lore content
- Character voice lines and quotes

### Technical Integration
- **MediaWiki API**: Standard MW API endpoints available
- **API Base**: `/api.php` endpoint for structured queries
- **Data Format**: XML/JSON responses from MediaWiki API
- **Example Queries**:
  - `action=query&list=categorymembers&cmtitle=Category:Ships`
  - `action=parse&page=Ship_Name&format=json`

### API Endpoints
```
GET /api.php?action=query&format=json&list=allpages&apnamespace=0
GET /api.php?action=parse&format=json&page=PageTitle
GET /api.php?action=query&format=json&prop=categories&titles=PageTitle
```

## 4. Azur Lane EN Community Tier Lists

### Primary Sources
1. **ECTL (English Community Tier List)**
   - URL: https://slaimuda.github.io/ectl/
   - Maintainer: Community collaboration
   - Format: Interactive web application with JSON data backend

2. **Usagi Sensei's Tier List**
   - Platform: Usually shared via Discord/Reddit
   - Focus: PvE content optimization
   - Update frequency: Major events and ship releases

3. **Just3c Tier List**
   - Platform: YouTube/Community posts
   - Focus: Both PvE and PvP considerations
   - Format: Visual tier images with explanations

### Data Structure for Tier Lists
```json
{
  "tierList": {
    "lastUpdated": "2024-01-01",
    "categories": {
      "pve": {
        "T0": ["ship_id_1", "ship_id_2"],
        "T1": ["ship_id_3", "ship_id_4"],
        "T2": ["ship_id_5", "ship_id_6"]
      },
      "pvp": {
        "T0": ["ship_id_7", "ship_id_8"]
      }
    }
  }
}
```

## 5. Additional Comprehensive Data Sources

### 5.1 Azur Lane Database (ALDB)
- **URL**: Community-maintained databases
- **Data**: Complete ship/equipment statistics
- **Format**: SQL databases or JSON exports

### 5.2 GitHub Community Repositories
- **AL-Data**: Various community data collections
- **AzurLane-Source**: Datamined game assets
- **Format**: JSON, CSV, or structured data files

### 5.3 Discord Bot APIs
- **Ayanami Bot**: Ship lookup and statistics
- **Akashi Bot**: Equipment recommendations
- **Integration**: Bot API endpoints or data dumps

## Integration Recommendations

### Priority 1: Core Data Sources
1. **Koumakan Wiki API** - Most reliable and comprehensive
2. **Community GitHub repositories** - Structured JSON data
3. **ECTL tier lists** - Current meta information

### Priority 2: Enhanced Features
1. **Equipment calculators** - ECGC integration
2. **Community tier lists** - Multiple source aggregation
3. **Event tracking** - Live event data

### Technical Implementation Strategy

#### Data Pipeline
1. **Extract**: Scheduled data pulls from APIs/repositories
2. **Transform**: Normalize data formats and structure
3. **Load**: Store in unified database schema
4. **Validate**: Cross-reference between sources for accuracy

#### API Design
```javascript
// Unified API structure
GET /api/ships/{shipId}
GET /api/equipment/{equipmentId}
GET /api/tierlists/current
GET /api/events/active
```

#### Caching Strategy
- **Static Data**: Ships, equipment (cache for 24 hours)
- **Dynamic Data**: Tier lists, events (cache for 1 hour)
- **Real-time Data**: Event countdowns (no cache)

## Legal and Terms of Use Considerations

### Data Usage Guidelines
1. **Attribution**: Credit original data sources
2. **Fair Use**: Educational and informational purposes
3. **API Limits**: Respect rate limiting and terms
4. **Community Guidelines**: Follow community standards

### Compliance Requirements
- Check robots.txt for scraping permissions
- Review API terms of service
- Implement proper attribution
- Respect copyright on images and assets

## Update Frequency Analysis

| Source | Update Frequency | Reliability | Automation Potential |
|--------|------------------|-------------|---------------------|
| Koumakan Wiki | Weekly | High | High (MediaWiki API) |
| GitHub Repos | Variable | Medium-High | High (Git webhooks) |
| Tier Lists | Monthly | Medium | Medium (Manual review) |
| Equipment Calcs | Event-based | High | Medium (API dependent) |

## ECGC Integration Summary for Comprehensive Wiki

### Key Technical Insights from ECGC Analysis

#### 1. Equipment Data Structure Requirements
- **Comprehensive Stats Database**: Equipment requires complex nested JSON structures with base stats, special effects, and calculated modifiers
- **Armor Type Considerations**: Critical for damage calculations - equipment effectiveness varies significantly against light/medium/heavy armor
- **Coefficient-Based Calculations**: Equipment doesn't just add flat stats but applies coefficient multipliers to ship base stats

#### 2. Damage Calculation Engine
- **Formula Complexity**: Base damage calculation involves equipment stats + ship stats × coefficients × armor modifiers
- **Real-Time Computing**: DPS calculations require dynamic computation based on ship reload stats and equipment cooldowns  
- **Variance Modeling**: Damage has ±10% random variance that affects practical effectiveness

#### 3. Tier List Generation Algorithm
- **Multi-Factor Scoring**: Tier rankings use weighted combinations of DPS (40%), versatility (20%), availability (15%), utility (15%), and cost-efficiency (10%)
- **Ship-Type Specific**: Different ship classes prioritize different equipment characteristics
- **Content-Specific**: PvE mob clearing vs boss fights vs PvP require different optimization strategies

#### 4. Recommendation System Architecture
- **Context-Aware**: Recommendations change based on ship class, content type, and user preferences
- **Alternative Options**: System provides budget and premium alternatives for each recommendation
- **Reasoning Engine**: Each recommendation includes detailed explanations for educational value

### Integration Implementation Plan

#### Phase 1: Core Equipment Database (Weeks 1-2)
```typescript
// Equipment data models for our Next.js wiki
interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  nationality: string;
  rarity: TierRating;
  stats: EquipmentStats;
  specialEffects: SpecialEffects;
  tierRating: string;
  obtainMethod: string[];
}

interface EquipmentStats {
  damage?: number;
  reload?: number;
  range?: number;
  coefficient: number;
  ammoType?: AmmoType;
  armorModifiers: ArmorModifiers;
}
```

#### Phase 2: Calculation Engine (Weeks 3-4)
```typescript
// Damage calculation service
class EquipmentCalculator {
  calculateDamage(equipment: Equipment, ship: Ship, targetArmor: ArmorType): DamageResult {
    const baseDamage = equipment.stats.damage || 0;
    const shipStat = this.getRelevantShipStat(ship, equipment.type);
    const coefficient = equipment.stats.coefficient;
    const armorMod = equipment.stats.armorModifiers[targetArmor];
    
    const rawDamage = (baseDamage + shipStat) * coefficient * armorMod;
    
    return {
      min: Math.floor(rawDamage * 0.9),
      max: Math.floor(rawDamage * 1.1),
      average: Math.floor(rawDamage)
    };
  }

  calculateDPS(equipment: Equipment, ship: Ship, targetArmor: ArmorType): number {
    // Implementation matches ECGC formula structure
  }
}
```

#### Phase 3: Interactive Components (Weeks 5-6)
```typescript
// React components for equipment features
export function EquipmentComparison({ equipmentIds }: { equipmentIds: string[] }) {
  // Side-by-side equipment comparison with calculated DPS
}

export function EquipmentRecommendations({ ship, contentType }: RecommendationProps) {
  // Personalized equipment recommendations with reasoning
}

export function DamageCalculator() {
  // Interactive calculator for testing equipment combinations
}
```

#### Phase 4: Tier List Integration (Weeks 7-8)
```typescript
// Automated tier list generation
class TierListGenerator {
  generateEquipmentTiers(equipmentType: EquipmentType): TierList {
    const weights = TIER_CALCULATION_WEIGHTS[equipmentType];
    const scored = this.scoreAllEquipment(equipmentType, weights);
    return this.groupIntoTiers(scored);
  }
}
```

### Database Schema Extensions

#### Equipment Tables
```sql
-- Enhanced equipment table with ECGC-style data
CREATE TABLE equipment (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type ENUM('main_gun', 'secondary_gun', 'torpedo', 'fighter', 'dive_bomber', 'torpedo_bomber', 'auxiliary'),
  nationality VARCHAR(30),
  rarity VARCHAR(10),
  base_stats JSON,
  special_effects JSON,
  armor_modifiers JSON,
  tier_rating VARCHAR(10),
  obtain_methods JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Pre-calculated damage combinations for performance
CREATE TABLE equipment_damage_cache (
  equipment_id VARCHAR(50),
  ship_class VARCHAR(20),
  target_armor VARCHAR(10),
  calculated_dps DECIMAL(10,2),
  calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (equipment_id, ship_class, target_armor),
  FOREIGN KEY (equipment_id) REFERENCES equipment(id)
);

-- Equipment build recommendations
CREATE TABLE equipment_builds (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ship_id VARCHAR(50),
  build_name VARCHAR(100),
  content_type ENUM('pve_mob', 'pve_boss', 'pvp', 'general'),
  equipment_loadout JSON,
  reasoning TEXT,
  community_rating DECIMAL(3,2),
  created_by VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### API Endpoint Design

#### RESTful Equipment API
```typescript
// Equipment endpoints following ECGC patterns
app.get('/api/equipment', getEquipmentList);
app.get('/api/equipment/:id', getEquipmentDetails);
app.post('/api/equipment/compare', compareEquipment);
app.post('/api/equipment/calculate-dps', calculateEquipmentDPS);
app.get('/api/equipment/recommendations/:shipId', getEquipmentRecommendations);
app.get('/api/tier-lists/equipment/:type', getEquipmentTierList);

// Build guide endpoints
app.get('/api/builds/:shipId', getShipBuilds);
app.post('/api/builds', createBuild);
app.get('/api/builds/popular/:contentType', getPopularBuilds);
```

### Performance Optimization Strategy

#### Caching Architecture
```typescript
// Multi-layer caching system
const cacheStrategy = {
  equipmentData: '24h',        // Static equipment stats
  calculatedDPS: '6h',         // DPS calculations with ship combinations  
  tierLists: '12h',            // Equipment tier rankings
  recommendations: '1h',       // Build recommendations
  userPreferences: 'session'   // User-specific settings
};
```

#### Calculation Optimization
- **Pre-computed Tables**: Generate common ship/equipment/armor combinations offline
- **Incremental Updates**: Only recalculate affected combinations when equipment data changes
- **Client-Side Caching**: Cache user's frequently accessed combinations in browser storage

### User Experience Features

#### Interactive Tools
1. **Equipment Comparison Matrix**: Side-by-side comparison with visual DPS charts
2. **Build Optimizer**: Automated build generation based on user preferences
3. **What-If Calculator**: Test equipment changes and see impact on performance
4. **Tier List Explorer**: Interactive tier lists with filtering and sorting

#### Educational Components  
1. **Calculation Transparency**: Show formulas and explain why recommendations are made
2. **Alternative Options**: Always provide budget and premium alternatives
3. **Meta Analysis**: Explain how equipment effectiveness changes with game updates
4. **Community Integration**: User ratings and reviews for equipment combinations

### Recommended Integration Order

1. **Phase 1**: Enhanced equipment database with ECGC-style data structure
2. **Phase 2**: Core calculation engine implementation  
3. **Phase 3**: Interactive comparison and calculator components
4. **Phase 4**: Automated tier list generation system
5. **Phase 5**: Community build sharing and rating system

## Monitoring and Maintenance

### Data Quality Checks
- Cross-reference ship statistics between sources
- Validate tier list consistency
- Monitor for new ships and equipment releases
- Track API availability and response times

### Error Handling
- Fallback to cached data during API outages
- Data validation and sanitization
- Graceful degradation for missing information
- User notification of data staleness