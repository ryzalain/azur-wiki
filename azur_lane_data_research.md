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

## 2. Azur Lane ECGC by Samheart

### Service Information
- **Primary URL**: Likely https://ecgc.azurlane.tools or similar
- **Purpose**: Equipment Calculator and Gear Comparison tool
- **Developer**: Community member Samheart

### Expected Data Provided
- Equipment statistics and comparisons
- Optimal gear recommendations
- DPS calculations and analysis
- Equipment efficiency ratings

### Data Format
- Likely uses JSON APIs for equipment data
- May have REST endpoints for calculations
- Possible integration through API calls

### Integration Considerations
- May require API key or authentication
- Rate limiting considerations
- Terms of use for data access

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

## Recommended Integration Order

1. **Phase 1**: Koumakan Wiki API integration for base data
2. **Phase 2**: GitHub repository data for structured information
3. **Phase 3**: Tier list aggregation and display
4. **Phase 4**: Equipment calculator integration
5. **Phase 5**: Real-time event and news integration

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