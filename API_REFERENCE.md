# API Reference

## Base URL

- **Development**: `http://localhost:5173` (proxied through Vite)
- **Production**: `https://your-domain.com`

## Authentication

Currently, no authentication is required. For production, add middleware:

```typescript
app.use((req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  // Validate token
  next();
});
```

## Health & Status

### GET /api/health

Check service health and connectivity.

**Response:**

```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "services": {
    "database": "connected",
    "vectorDb": "connected",
    "llm": "connected",
    "cache": "connected"
  }
}
```

### GET /api/ping

Simple ping endpoint.

**Response:**

```json
{
  "message": "ping"
}
```

---

## Data Pipeline

### POST /api/upload-sales

Upload sales data (CSV or Excel format).

**Request:**

- **Content-Type**: `multipart/form-data`
- **Body**:
  - `file`: Binary file (CSV/XLSX)

**Response:**

```json
{
  "success": true,
  "recordsProcessed": 150,
  "data": [
    {
      "date": "2024-01-01",
      "product": "Product A",
      "sales": 5000,
      "quantity": 25,
      "region": "North"
    }
  ]
}
```

**Example:**

```javascript
const formData = new FormData();
formData.append("file", fileInput.files[0]);
const response = await fetch("/api/upload-sales", {
  method: "POST",
  body: formData,
});
```

### POST /api/upload-events

Upload event data (CSV or JSON format).

**Request:**

- **Content-Type**: `multipart/form-data`
- **Body**:
  - `file`: Binary file (CSV/JSON)

**Response:**

```json
{
  "success": true,
  "recordsProcessed": 10,
  "data": [
    {
      "name": "Diwali Festival",
      "date": "2024-01-15",
      "type": "festival",
      "description": "Major festival period"
    }
  ]
}
```

**CSV Format:**

```
name,date,type,description
Diwali Festival,2024-01-15,festival,Major festival
Christmas Sale,2024-02-01,marketing,Annual sale
```

**JSON Format:**

```json
[
  {
    "name": "Diwali Festival",
    "date": "2024-01-15",
    "type": "festival"
  }
]
```

---

## Forecasting

### POST /api/forecast

Generate sales forecast.

**Request:**

```json
{
  "days": 30,
  "model": "prophet"
}
```

**Response:**

```json
{
  "success": true,
  "model": "prophet",
  "forecast": [
    {
      "date": "2024-02-15",
      "predicted": 28500,
      "upperBound": 31350,
      "lowerBound": 25650,
      "confidence": 0.92
    }
  ],
  "metrics": {
    "rmse": 1250.5,
    "mae": 980.2,
    "mape": 5.2
  }
}
```

**Parameters:**

- `days` (integer): Number of days to forecast (default: 30)
- `model` (string): "prophet", "arima", "xgboost", or "ensemble"

### GET /api/trend-decomposition

Get trend, seasonal, and residual components.

**Response:**

```json
{
  "success": true,
  "decomposition": [
    {
      "date": "2024-01-01",
      "trend": 20000,
      "seasonal": 500,
      "residual": -200
    }
  ]
}
```

### GET /api/anomaly-detection

Detect anomalies in sales data.

**Response:**

```json
{
  "success": true,
  "anomalies": [
    {
      "date": "2024-01-15",
      "value": 35000,
      "expectedValue": 22000,
      "anomalyScore": 0.92,
      "reason": "Potential festival impact"
    }
  ],
  "totalDetected": 3
}
```

---

## Event Fusion

### POST /api/events

Create a new event.

**Request:**

```json
{
  "name": "Diwali Festival",
  "date": "2024-01-15",
  "type": "festival"
}
```

**Response:**

```json
{
  "success": true,
  "event": {
    "id": "evt_123456",
    "name": "Diwali Festival",
    "date": "2024-01-15",
    "type": "festival",
    "impact": 35.2,
    "confidence": 0.92
  }
}
```

**Event Types:**

- `festival` - Festival/Holiday
- `marketing` - Marketing Campaign
- `weather` - Weather Event
- `competition` - Competitor Activity
- `holiday` - Public Holiday

### GET /api/event-impacts

Get event impact analysis.

**Response:**

```json
{
  "success": true,
  "impacts": [
    {
      "event": "Diwali Festival",
      "date": "2024-01-15",
      "type": "festival",
      "impact": 35,
      "confidence": 0.92,
      "affectedProducts": ["Product A", "Product B"],
      "estimatedRevenueLift": 125000
    }
  ],
  "totalEvents": 3
}
```

### GET /api/event-correlation

Get event-sales correlations.

**Response:**

```json
{
  "success": true,
  "correlation": [
    {
      "event": "Diwali",
      "correlation": 0.85
    },
    {
      "event": "Christmas",
      "correlation": 0.72
    }
  ]
}
```

**Correlation Scale:**

- 0.0-0.2: Very weak
- 0.2-0.4: Weak
- 0.4-0.6: Moderate
- 0.6-0.8: Strong
- 0.8-1.0: Very strong

### POST /api/event-forecast

Generate event-aware forecast.

**Request:**

```json
{
  "startDate": "2024-02-01",
  "endDate": "2024-02-28"
}
```

**Response:**

```json
{
  "success": true,
  "forecast": [
    {
      "date": "2024-02-14",
      "predictedSales": 38000,
      "eventInfluence": "Valentine's Day",
      "eventLift": 12000
    }
  ]
}
```

---

## Chat & RAG

### POST /api/chat

Send message to AI assistant.

**Request:**

```json
{
  "message": "Why did sales rise last month?",
  "history": [
    {
      "role": "user",
      "content": "What's my sales trend?"
    }
  ]
}
```

**Response:**

```json
{
  "success": true,
  "response": "Based on your sales data, the recent rise in sales can be attributed to multiple factors including festival impacts and marketing campaigns.",
  "context": [
    "Sales data shows significant growth in Q1 2024...",
    "Diwali festival impact analysis..."
  ]
}
```

**Suggested Queries:**

- "Why did sales rise last month?"
- "What's the impact of Diwali?"
- "Predict next 30 days for Product A"
- "Show weather-related impacts"

### POST /api/upload-documents

Upload documents for RAG pipeline.

**Request:**

- **Content-Type**: `multipart/form-data`
- **Body**:
  - `file`: Binary file (PDF, DOCX, TXT, or JSON)

**Response:**

```json
{
  "success": true,
  "document": {
    "name": "sales_report.pdf",
    "size": 245632,
    "chunks": 48,
    "embedded": true,
    "vectorStored": "chromadb"
  }
}
```

**Supported Formats:**

- `.pdf` - PDF documents
- `.docx` - Word documents
- `.txt` - Text files
- `.json` - JSON data
- Web pages (via URL loading)

### GET /api/chat-history

Get conversation history.

**Response:**

```json
{
  "success": true,
  "history": [
    {
      "timestamp": "2024-01-15T10:30:00Z",
      "message": "What's my forecast?",
      "response": "Based on Prophet model...",
      "context": ["Document 1", "Document 2"]
    }
  ],
  "totalMessages": 45
}
```

---

## Data Management

### POST /api/download-data

Download processed data in CSV or JSON format.

**Request:**

```json
{
  "data": [
    {
      "date": "2024-01-01",
      "product": "Product A",
      "sales": 5000
    }
  ],
  "format": "csv"
}
```

**Response:**

- **Content-Type**: `text/csv` or `application/json`
- **Content-Disposition**: `attachment; filename=sales_data.csv`
- **Body**: CSV or JSON content

**Formats:**

- `csv` - Comma-separated values (default)
- `json` - JSON array

### POST /api/settings

Save user settings.

**Request:**

```json
{
  "forecastingModel": "prophet",
  "vectorDb": "chromadb",
  "chunkSize": 512,
  "semanticSplitting": true,
  "topKRetrieval": 5,
  "llmModel": "llama3",
  "temperature": 0.7,
  "embeddingModel": "all-MiniLM-L6-v2"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Settings saved successfully",
  "settings": {
    "forecastingModel": "prophet",
    "vectorDb": "chromadb"
  }
}
```

### GET /api/settings

Load user settings.

**Response:**

```json
{
  "success": true,
  "settings": {
    "forecastingModel": "prophet",
    "vectorDb": "chromadb",
    "chunkSize": 512,
    "semanticSplitting": true,
    "topKRetrieval": 5,
    "llmModel": "llama3",
    "temperature": 0.7,
    "embeddingModel": "all-MiniLM-L6-v2"
  }
}
```

---

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Description of what went wrong"
}
```

### HTTP Status Codes

| Code | Meaning      | Example                |
| ---- | ------------ | ---------------------- |
| 200  | OK           | Request succeeded      |
| 400  | Bad Request  | Missing required field |
| 404  | Not Found    | Endpoint doesn't exist |
| 500  | Server Error | Internal error         |

### Common Errors

```json
{
  "error": "No file provided"
}
```

```json
{
  "error": "Missing required fields"
}
```

```json
{
  "error": "Failed to process file"
}
```

---

## Rate Limiting

No rate limiting is currently implemented. For production, add:

```typescript
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests",
});

app.use(limiter);
```

---

## CORS Policy

CORS is enabled for all origins in development. For production:

```typescript
app.use(
  cors({
    origin: "https://your-domain.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
```

---

## Testing Endpoints

### Using cURL

```bash
# Health check
curl http://localhost:5173/api/health

# Upload file
curl -X POST -F "file=@sales.csv" http://localhost:5173/api/upload-sales

# Chat
curl -X POST http://localhost:5173/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What is my forecast?"}'
```

### Using JavaScript/Fetch

```javascript
// GET request
const response = await fetch("/api/health");
const data = await response.json();

// POST request with JSON
const response = await fetch("/api/forecast", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ days: 30, model: "prophet" }),
});

// POST request with file
const formData = new FormData();
formData.append("file", file);
const response = await fetch("/api/upload-sales", {
  method: "POST",
  body: formData,
});
```

### Using Postman

1. Import the API endpoints
2. Set base URL: `http://localhost:5173`
3. Create requests for each endpoint
4. Test with sample data

---

## Pagination (Future)

Future versions will support pagination:

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1000,
    "pages": 50
  }
}
```

---

## Versioning

Current API version: **v1.0.0**

Future versions might use URL versioning:

- `/api/v1/forecast`
- `/api/v2/forecast`

---

## Webhook Support (Future)

Future implementation for real-time updates:

```typescript
app.post("/api/webhooks", (req, res) => {
  // Handle incoming webhooks
});
```

---

For more information, see:

- [README.md](README.md) - Project overview
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) - Development guide
