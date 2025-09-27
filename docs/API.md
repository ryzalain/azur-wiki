# API Documentation

This document describes the API endpoints and data structures used in the Azur Lane Wiki.

## Base URL
```
https://api.azurlanewiki.com/v1
```

## Authentication
Most endpoints are public and don't require authentication. Some endpoints may require API keys for rate limiting.

## Endpoints

### Ships

#### Get All Ships
```http
GET /ships
```

**Query Parameters:**
- `faction` - Filter by faction (e.g., "Eagle Union", "Royal Navy")
- `rarity` - Filter by rarity (e.g., "SSR", "SR", "R")
- `type` - Filter by ship type (e.g., "Destroyer", "Cruiser")
- `limit` - Number of results (default: 50, max: 100)
- `offset` - Pagination offset

**Response:**
```json
{
  "ships": [
    {
      "id": "ship_001",
      "name": "Enterprise",
      "faction": "Eagle Union",
      "rarity": "SSR",
      "type": "Aircraft Carrier",
      "stats": {
        "health": 1282,
        "firepower": 85,
        "aviation": 303
      },
      "tierRatings": {
        "pve": "T0",
        "pvp": "T1"
      }
    }
  ],
  "total": 150,
  "limit": 50,
  "offset": 0
}
```

#### Get Ship by ID
```http
GET /ships/{id}
```

**Response:**
```json
{
  "id": "ship_001",
  "name": "Enterprise",
  "faction": "Eagle Union",
  "rarity": "SSR",
  "type": "Aircraft Carrier",
  "stats": {
    "base": {
      "health": 248,
      "firepower": 18,
      "aviation": 64
    },
    "max": {
      "health": 1282,
      "firepower": 85,
      "aviation": 303
    }
  },
  "skills": [
    {
      "name": "Lucky E",
      "description": "When this ship launches an airstrike: 70% chance to deal 2x damage",
      "cooldown": 20
    }
  ],
  "tierRatings": {
    "pve": "T0",
    "pvp": "T1",
    "operation_siren": "T0"
  }
}
```

### Equipment

#### Get All Equipment
```http
GET /equipment
```

**Query Parameters:**
- `category` - Filter by category (e.g., "Main Gun", "Torpedo")
- `rarity` - Filter by rarity
- `compatible` - Filter by compatible ship types

#### Get Equipment by ID
```http
GET /equipment/{id}
```

### Tier Lists

#### Get Current Tier Lists
```http
GET /tierlists
```

**Response:**
```json
{
  "lastUpdated": "2024-01-15T00:00:00Z",
  "ships": {
    "pve": {
      "T0": ["ship_001", "ship_002"],
      "T1": ["ship_003", "ship_004"]
    },
    "pvp": {
      "T0": ["ship_005", "ship_006"]
    }
  },
  "equipment": {
    "main_guns": {
      "T0": ["equip_001", "equip_002"]
    }
  }
}
```

### Events

#### Get Current Events
```http
GET /events/current
```

#### Get Event History
```http
GET /events/history
```

### Build Recommendations

#### Get Ship Builds
```http
GET /builds/ship/{shipId}
```

**Query Parameters:**
- `mode` - Game mode (e.g., "pve", "pvp", "boss")
- `priority` - Build priority (e.g., "budget", "optimal", "luxury")

## Data Models

### Ship
```typescript
interface Ship {
  id: string;
  name: string;
  faction: string;
  rarity: 'N' | 'R' | 'SR' | 'SSR' | 'UR';
  type: string;
  stats: {
    base: BaseStats;
    max: BaseStats;
  };
  skills: Skill[];
  tierRatings: TierRatings;
  imageUrl?: string;
  chibiUrl?: string;
}
```

### Equipment
```typescript
interface Equipment {
  id: string;
  name: string;
  category: string;
  rarity: string;
  stats: EquipmentStats;
  compatibleShipTypes: string[];
  tierRating: string;
  imageUrl?: string;
}
```

### Tier Rating
```typescript
interface TierRating {
  tier: 'T0' | 'T1' | 'T2' | 'T3' | 'T4';
  reasoning?: string;
  lastUpdated: string;
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request parameters",
  "message": "The 'limit' parameter must be between 1 and 100"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found",
  "message": "Ship with ID 'invalid_id' not found"
}
```

### 429 Too Many Requests
```json
{
  "error": "Rate limit exceeded",
  "message": "Too many requests. Please try again later.",
  "retryAfter": 60
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "An unexpected error occurred"
}
```

## Rate Limiting

- **Free tier**: 100 requests per hour
- **Authenticated**: 1000 requests per hour
- **Premium**: 10000 requests per hour

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## SDKs and Libraries

### JavaScript/TypeScript
```bash
npm install @azurlanewiki/sdk
```

```typescript
import { AzurLaneWiki } from '@azurlanewiki/sdk';

const wiki = new AzurLaneWiki({
  apiKey: 'your-api-key'
});

const ships = await wiki.ships.getAll();
const enterprise = await wiki.ships.getById('ship_001');
```

### Python
```bash
pip install azurlanewiki
```

```python
from azurlanewiki import AzurLaneWiki

wiki = AzurLaneWiki(api_key='your-api-key')
ships = wiki.ships.get_all()
enterprise = wiki.ships.get_by_id('ship_001')
```

## Changelog

### v1.0.0 (2024-01-15)
- Initial API release
- Ships and equipment endpoints
- Tier list integration
- Basic authentication

### v1.1.0 (2024-02-01)
- Event endpoints
- Build recommendations
- Enhanced filtering
- Rate limiting

## Support

For API support and questions:
- 📧 Email: api@azurlanewiki.com
- 💬 Discord: [Community Server](https://discord.gg/azurlanewiki)
- 📖 Documentation: [docs.azurlanewiki.com](https://docs.azurlanewiki.com)
