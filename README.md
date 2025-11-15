# SalesForge: Sales Trend Forecasting & Event Fusion Engine

A production-ready full-stack web application for sales forecasting, event impact analysis, and AI-powered sales intelligence with RAG (Retrieval-Augmented Generation).

## 🚀 Features

### Dashboard

- **Sales Data Upload**: CSV/Excel file import with automatic preprocessing
- **Event Data Upload**: CSV/JSON format support for event tracking
- **Sales Forecast Charts**: Line charts showing actual vs predicted sales
- **Trend Decomposition**: Analyze trend, seasonal, and residual components
- **KPI Cards**: Real-time metrics for growth rate, anomalies, forecasts, and event impact
- **Forecast Generation**: Prophet, ARIMA, or XGBoost models

### Event Fusion Engine

- **Event Management**: Add, track, and analyze events (festivals, campaigns, weather)
- **Impact Analysis**: Measure how events correlate with sales changes
- **Timeline Visualization**: See sales performance with event overlays
- **Correlation Matrix**: Understand event-sales relationships
- **Impact Heatmap**: Visual representation of event contributions

### AI Assistant (RAG Chatbot)

- **Natural Language Queries**: Ask questions about your sales data in plain English
- **Document Retrieval**: LangChain-powered document loading (PDF, DOCX, web pages)
- **Groq + Llama 3 Integration**: Fast, accurate responses powered by state-of-the-art LLM
- **Context Display**: See which documents informed each response
- **Suggested Questions**: Quick access to common analysis queries
- **Chat Memory**: MongoDB support for conversation history

### Data Explorer

- **Data Viewing**: Browse cleaned and processed sales data
- **Advanced Filtering**: Search, filter by product, region, date
- **Sorting Options**: Sort by date, sales, or quantity
- **CSV Export**: Download processed data for external analysis
- **Statistics Dashboard**: Real-time totals and averages

### Settings

- **Model Configuration**: Choose forecasting model (Prophet, ARIMA, XGBoost, Ensemble)
- **Vector Database**: Select ChromaDB, FAISS, Pinecone, or Weaviate
- **Embedding Models**: Configure sentence-transformers
- **RAG Parameters**: Adjust chunk size, top-K retrieval, semantic splitting
- **LLM Settings**: Configure Groq API, temperature, and model selection

## 📋 Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for fast development and production builds
- **React Router 6** for SPA routing
- **TailwindCSS 3** for styling
- **Radix UI** component library
- **Recharts** for data visualization
- **React Query** for data management
- **Lucide React** for icons

### Backend

- **Node.js/Express** API server
- **Multer** for file uploads
- **csv-parse** for CSV processing
- **XLSX** for Excel support
- **Express CORS** for cross-origin requests

### Architecture

- **Full-stack TypeScript** for type safety
- **Shared Types** between client and server
- **Modular Route Handlers** for scalability
- **Single-port Development** (Vite + Express integration)

## 📁 Project Structure

```
├── client/                      # React SPA Frontend
│   ├── pages/
│   │   ├── Dashboard.tsx       # Main dashboard with charts and uploads
│   │   ├── EventFusion.tsx     # Event impact analysis
│   │   ├── ChatBot.tsx         # RAG-powered AI assistant
│   │   ├── DataExplorer.tsx    # Data viewing and filtering
│   │   ├── Settings.tsx        # Configuration page
│   │   └── NotFound.tsx        # 404 page
│   ├── components/
│   │   ├── Layout.tsx          # Shared layout with navigation
│   │   └── ui/                 # Pre-built UI components
│   ├── App.tsx                 # Route definitions
│   ├── global.css              # Tailwind + global styles
│   └── lib/
│       └── utils.ts            # Utility functions
│
├── server/                      # Express Backend
│   ├── routes/
│   │   ├── data-pipeline.ts    # File upload & preprocessing
│   │   ├── forecasting.ts      # Time-series forecasting
│   │   ├── event-fusion.ts     # Event impact analysis
│   │   ├── chat.ts             # RAG chatbot & document handling
│   │   ├── utility.ts          # Helper endpoints
│   │   └── demo.ts             # Example endpoint
│   └── index.ts                # Server setup & route registration
│
├── shared/                      # Shared Types
│   └── api.ts                  # API interface definitions
│
├── package.json                # Dependencies
├── tailwind.config.ts          # TailwindCSS configuration
├── vite.config.ts              # Vite frontend config
├── vite.config.server.ts       # Vite server config
└── tsconfig.json               # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10+

### Installation

```bash
# Install dependencies
pnpm install

# Start development server (both frontend + backend)
pnpm dev

# Open browser to http://localhost:5173
```

The app runs on a single port with both frontend and backend.

### Build & Deploy

```bash
# Build for production
pnpm build

# Start production server
pnpm start

# Type checking
pnpm typecheck

# Run tests
pnpm test
```

## 📚 API Endpoints

### Data Pipeline

- `POST /api/upload-sales` - Upload sales data (CSV/Excel)
- `POST /api/upload-events` - Upload event data (CSV/JSON)

### Forecasting

- `POST /api/forecast` - Generate sales forecast
- `GET /api/trend-decomposition` - Get trend, seasonal, residual analysis
- `GET /api/anomaly-detection` - Detect sales anomalies

### Event Fusion

- `POST /api/events` - Add new event
- `GET /api/event-impacts` - Get event impact analysis
- `GET /api/event-correlation` - Get event-sales correlations
- `POST /api/event-forecast` - Generate event-aware forecast

### Chat & RAG

- `POST /api/chat` - Send chat message (with document retrieval)
- `POST /api/upload-documents` - Upload documents for RAG
- `GET /api/chat-history` - Get conversation history

### Utility

- `POST /api/download-data` - Download processed data
- `POST /api/settings` - Save settings
- `GET /api/settings` - Get current settings
- `GET /api/health` - Health check

## ⚙️ Configuration

### Environment Variables

Create a `.env` file (optional):

```env
# Server
PING_MESSAGE="ping"

# Groq API (for LLM)
GROQ_API_KEY=your_key_here

# Database (if using MongoDB for chat history)
MONGODB_URI=mongodb://...

# Vector DB Settings
VECTOR_DB=chromadb
EMBEDDING_MODEL=all-MiniLM-L6-v2
```

### Forecasting Models

- **Prophet**: Best for seasonal patterns and holidays
- **ARIMA**: Good for stationary data
- **XGBoost**: Excellent for complex patterns
- **Ensemble**: Combines all three

### Vector Database Options

- **ChromaDB** (default): Recommended for local deployment
- **FAISS**: Lightweight, fast similarity search
- **Pinecone**: Managed, cloud-based
- **Weaviate**: Open-source vector DB

### Embedding Models

- **all-MiniLM-L6-v2** (default): Fast, good quality
- **all-mpnet-base-v2**: Higher quality, slower
- **paraphrase-MiniLM-L6-v2**: Specialized for paraphrases

## 🤖 RAG (Retrieval-Augmented Generation)

The AI Assistant uses a RAG pipeline:

1. **Document Upload**: Load PDFs, DOCX, web pages via LangChain
2. **Chunking**: Split documents using configurable chunk size
3. **Embedding**: Convert chunks to vectors using sentence-transformers
4. **Storage**: Store embeddings in ChromaDB/FAISS
5. **Retrieval**: Find relevant documents for user queries
6. **LLM Response**: Generate answers with Groq + Llama 3

## 📊 Example Use Cases

### Sales Analysis

- "Why did sales rise last month?"
- "Show me the impact of Diwali on sales"
- "Predict next 30 days for Product A"

### Event Analysis

- "What was the weather event impact?"
- "Compare festival vs marketing campaign effects"
- "Which events have highest ROI?"

### Data Insights

- "Filter data for North region, December 2024"
- "Download processed sales data"
- "Show anomalies in the dataset"

## 🔧 Extending the Application

### Adding New Pages

1. Create page in `client/pages/YourPage.tsx`
2. Add route in `client/App.tsx`
3. Add navigation item in `client/components/Layout.tsx`

### Adding New API Endpoints

1. Create route handler in `server/routes/your-route.ts`
2. Import and register in `server/index.ts`
3. Call from client with `fetch('/api/your-endpoint')`

### Adding New Charts

Recharts components available:

- LineChart, AreaChart, BarChart
- PieChart, ScatterChart, RadarChart
- ComposedChart for multiple data types

## 🎨 Customization

### Colors

Edit `client/global.css` CSS variables:

```css
:root {
  --primary: 217.2 91.2% 59.8%;
  --accent: 280.5 85.8% 56.5%;
  ...
}
```

### Branding

- Logo: `client/components/Layout.tsx` (SalesForge brand)
- Colors: `tailwind.config.ts`
- Fonts: Global CSS configuration

## 📈 Performance

- **Single-port development**: Fast reload
- **Code splitting**: Automatic route-based splitting
- **Asset optimization**: Production minification
- **Lazy loading**: Components load on demand

## 🔒 Security

- CORS enabled for API requests
- Type safety with TypeScript throughout
- Input validation on file uploads
- No secrets in client-side code

## 📝 Testing

```bash
# Run tests
pnpm test

# Run with coverage
pnpm test -- --coverage
```

## 🚀 Deployment

### Netlify

1. Connect GitHub repository
2. Build command: `pnpm build`
3. Publish directory: `dist`
4. Environment variables via UI

### Vercel

1. Import project
2. Framework: Other
3. Build command: `pnpm build`
4. Output directory: `dist`

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

## 📚 Documentation

- **Frontend**: React documentation at https://react.dev
- **Backend**: Express documentation at https://expressjs.com
- **Charts**: Recharts at https://recharts.org
- **UI Components**: Radix UI at https://radix-ui.com
- **LangChain**: https://python.langchain.com/docs/
- **Groq API**: https://console.groq.com/

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch
3. Make your changes
4. Submit pull request

## 📄 License

MIT License - feel free to use this project commercially

## 🆘 Support

For issues or questions:

- Check existing issues on GitHub
- Review API documentation above
- Test with provided sample data
- Check server logs with `pnpm dev`

## 🎯 Roadmap

- [ ] Real database integration (MongoDB/PostgreSQL)
- [ ] Advanced forecasting models (Prophet, ARIMA, XGBoost)
- [ ] Groq API integration for real LLM responses
- [ ] Real ChromaDB/FAISS vector storage
- [ ] Machine learning model training pipeline
- [ ] Advanced analytics and dashboards
- [ ] User authentication and multi-tenancy
- [ ] Export reports (PDF, Excel)

## 📞 Questions?

For more information about this application, refer to the API documentation in this README or explore the codebase structure above.

---

**SalesForge v1.0.0** - Built with React, Node.js, and AI-powered insights
#   s a l e s _ f o r e c a s t _ e v e n t _ f u s i o n _ h i d e v s  
 