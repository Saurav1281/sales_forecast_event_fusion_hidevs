# Getting Started with SalesForge

## 🚀 Quick Start (5 minutes)

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Start Development Server

```bash
pnpm dev
```

### 3. Open in Browser

Navigate to `http://localhost:5173`

You should see the SalesForge Dashboard! 🎉

## 📖 First Steps

### Explore the Dashboard

1. Click "Dashboard" in the sidebar (already selected)
2. Try uploading sample sales data (CSV/Excel format)
3. Upload sample event data (CSV/JSON format)
4. Click "Generate Forecast" to see predictions

### Check Other Pages

- **Event Fusion** - Add and analyze events
- **AI Assistant** - Ask questions about your data
- **Data Explorer** - View and filter processed data
- **Settings** - Configure models and parameters

## 📊 Using Sample Data

### Sample Sales Data (CSV)

```csv
date,product,sales,quantity,region,category
2024-01-01,Product A,5000,25,North,Electronics
2024-01-01,Product B,3500,18,South,Clothing
2024-01-02,Product A,6200,31,East,Electronics
2024-01-02,Product C,4100,20,West,Home
```

### Sample Event Data (JSON)

```json
[
  {
    "name": "Diwali Festival",
    "date": "2024-01-15",
    "type": "festival",
    "description": "Major shopping festival"
  },
  {
    "name": "Black Friday Sale",
    "date": "2024-02-01",
    "type": "marketing",
    "description": "Annual discount event"
  }
]
```

## 🛠️ Development

### Available Commands

```bash
# Development
pnpm dev              # Start dev server (both client + server)
pnpm typecheck        # Check TypeScript errors

# Building
pnpm build            # Full production build
pnpm build:client     # Build frontend only
pnpm build:server     # Build backend only

# Testing
pnpm test             # Run tests with Vitest

# Code Quality
pnpm format.fix       # Format code with Prettier

# Production
pnpm start            # Start production server (after build)
```

### Development Server Details

The dev server runs on:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5173/api (proxied through Vite)
- **Hot Reload**: Automatic for both client and server code

## 📱 Using the Dashboard

### Upload Sales Data

1. Click "Choose File" under "Upload Sales Data"
2. Select a CSV or Excel file with columns: `date`, `product`, `sales`, `quantity`, `region`
3. The app automatically preprocesses and displays preview

### Upload Event Data

1. Click "Choose File" under "Upload Event Data"
2. Select CSV or JSON with event information
3. Events will be processed and stored

### Generate Forecast

1. Click "Generate Forecast" button
2. Select forecasting model (Prophet/ARIMA/XGBoost)
3. View the forecast chart with confidence intervals

### View KPI Cards

- **Growth Rate**: Percentage change in sales
- **Anomalies**: Number of unusual data points detected
- **Avg Forecast**: Average predicted sales for next 30 days
- **Event Impact**: Average sales lift from events

## 💬 Using the AI Assistant

### Ask Questions

Type any question about your sales data:

- "Why did sales rise last month?"
- "What's the impact of Diwali?"
- "Predict next 30 days for Product A"
- "Show weather-related impacts"

The AI will:

1. Search relevant documents in the database
2. Retrieve context
3. Generate response using Llama 3
4. Show which documents were used

### Upload Documents

1. Go to AI Assistant page
2. Upload PDF, DOCX, TXT files (LangChain will process)
3. Documents are automatically chunked and embedded
4. Available for retrieval in chat

## 📊 Using Event Fusion

### Add an Event

1. Fill in event name (e.g., "Diwali Festival")
2. Select date
3. Choose event type (festival, marketing, weather, competition, holiday)
4. Click "Add Event"

### View Event Analysis

- **Recent Events**: List of events with impact percentages
- **Timeline**: See sales alongside events
- **Correlation**: Understand event-sales relationships
- **Impact Heatmap**: Visualize event contributions

## 🔍 Using Data Explorer

### Filter Data

1. Use search to find specific dates, products, or regions
2. Filter by product dropdown
3. Filter by region dropdown
4. Sort by date, sales, or quantity

### Export Data

1. Click "Download CSV" button
2. Filtered data downloads as CSV file
3. Use in Excel, Python, or other tools

### View Statistics

- Total Sales sum
- Total Quantity sum
- Average Sale value

## ⚙️ Configuring Settings

### Forecasting Engine

- **Model**: Choose Prophet, ARIMA, XGBoost, or Ensemble
- **Horizon**: Set number of days to forecast

### Vector Database

- **Type**: ChromaDB (recommended), FAISS, Pinecone, Weaviate
- **Embedding Model**: all-MiniLM-L6-v2 (recommended)

### RAG Parameters

- **Chunk Size**: 512 tokens (default)
- **Top K**: 5 documents to retrieve
- **Semantic Splitting**: Toggle context-aware chunking

### LLM Settings

- **Model**: Llama 3 (via Groq API)
- **Temperature**: 0.7 (balanced creativity)

## 🔌 Connecting to External Services

### Groq API (for LLM)

1. Sign up at https://console.groq.com
2. Create API key
3. Set environment variable:
   ```env
   GROQ_API_KEY=your_key_here
   ```

### MongoDB (for chat history)

1. Create cluster at https://mongodb.com
2. Get connection string
3. Set environment variable:
   ```env
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/salesforge
   ```

### ChromaDB (for vector storage)

- Works out-of-the-box
- Stores embeddings locally in `./chroma` directory
- No additional setup required

## 📱 Mobile Usage

The app is responsive and works on mobile devices:

1. Sidebar collapses on small screens
2. Charts adapt to viewport size
3. Forms stack vertically
4. Touch-friendly buttons

## 🐛 Troubleshooting

### Dev Server Won't Start

```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm dev
```

### Port Already in Use

```bash
# Kill process on port 5173
lsof -i :5173
kill -9 <PID>
```

### TypeScript Errors

```bash
# Check types
pnpm typecheck

# Fix common issues
pnpm format.fix
```

### API Not Responding

```bash
# Check if backend is running
curl http://localhost:5173/api/health

# Restart dev server
Ctrl+C
pnpm dev
```

## 📚 Learn More

- **Full Documentation**: See [README.md](README.md)
- **API Reference**: See [API_REFERENCE.md](API_REFERENCE.md)
- **Deployment**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Development**: See [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)
- **Project Overview**: See [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

## 🎯 Next Steps

### Immediate (30 minutes)

- [ ] Run `pnpm install`
- [ ] Run `pnpm dev`
- [ ] Explore all 5 pages
- [ ] Upload sample data
- [ ] Generate forecast

### Short Term (1-2 hours)

- [ ] Create sample CSV/JSON files
- [ ] Test all API endpoints
- [ ] Review API documentation
- [ ] Configure settings

### Medium Term (1 day)

- [ ] Connect Groq API
- [ ] Set up MongoDB
- [ ] Deploy to Netlify/Vercel
- [ ] Create custom data

### Long Term (ongoing)

- [ ] Integrate real forecasting models
- [ ] Add authentication
- [ ] Implement database persistence
- [ ] Deploy to production
- [ ] Monitor performance

## ✅ Verification Checklist

- [ ] `pnpm install` completes successfully
- [ ] `pnpm dev` starts without errors
- [ ] Dashboard page loads
- [ ] Event Fusion page loads
- [ ] AI Assistant page loads
- [ ] Data Explorer page loads
- [ ] Settings page loads
- [ ] Navigation works
- [ ] Charts display correctly
- [ ] File uploads work
- [ ] All buttons are clickable

## 💡 Tips & Tricks

### Keyboard Shortcuts

- `Ctrl+K` or `Cmd+K` - Open command palette (if implemented)
- `Esc` - Close any open dialogs

### Browser DevTools

- **F12** or **Ctrl+Shift+I** - Open DevTools
- **Console** tab - See error messages
- **Network** tab - Monitor API calls
- **Elements** tab - Inspect DOM

### Terminal Shortcuts

- `Ctrl+C` - Stop dev server
- `↑` - Previous command
- `pnpm dev -- --port 5174` - Use different port

## 🆘 Getting Help

1. **Check Documentation** - See 5 detailed guides
2. **Review API Reference** - All endpoints documented
3. **Check Error Messages** - Browser console and terminal
4. **Review Code Comments** - Well-commented source code
5. **Try Sample Data** - Use provided examples

## 📞 Support

If you get stuck:

1. Check error messages in browser console
2. Review relevant documentation file
3. Ensure all dependencies installed (`pnpm install`)
4. Try restarting dev server (`Ctrl+C`, then `pnpm dev`)
5. Check API endpoints with `curl` or Postman

## 🎓 Learning Resources

- **React Docs**: https://react.dev
- **Express Guide**: https://expressjs.com
- **TailwindCSS**: https://tailwindcss.com
- **TypeScript**: https://www.typescriptlang.org
- **Recharts**: https://recharts.org
- **Radix UI**: https://radix-ui.com

---

You're all set! Start with `pnpm dev` and explore the application. Happy forecasting! 🚀
