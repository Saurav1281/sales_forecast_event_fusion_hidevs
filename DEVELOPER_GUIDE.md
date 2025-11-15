# Developer Guide

## Project Overview

**SalesForge** is a full-stack application for sales forecasting and event impact analysis with AI-powered insights.

- **Frontend**: React 18 + TypeScript + TailwindCSS
- **Backend**: Node.js/Express
- **Data**: Sample data with CSV/Excel upload support
- **AI**: RAG pipeline with Groq + Llama 3 integration

## Getting Started

### Initial Setup

```bash
# Clone repository
git clone your-repo
cd salesforge

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:5173
```

The dev server automatically handles:

- Frontend hot reload
- Backend hot reload
- Proxy between frontend and backend API

## Project Structure Deep Dive

### Frontend Architecture

```
client/
├── pages/
│   ├── Dashboard.tsx        # Main dashboard
│   ├── EventFusion.tsx      # Event analysis
│   ├── ChatBot.tsx          # RAG chatbot
│   ├── DataExplorer.tsx     # Data viewing
│   ├── Settings.tsx         # Configuration
│   └── NotFound.tsx         # 404 page
├── components/
│   ├── Layout.tsx           # Shared navigation layout
│   └── ui/                  # Radix UI components
├── App.tsx                  # Route definitions
├── global.css               # Global styles & theme
└── lib/
    └── utils.ts             # Utility functions
```

### Backend Architecture

```
server/
├── routes/
│   ├── data-pipeline.ts     # File upload & preprocessing
│   ├── forecasting.ts       # Time-series forecasting
│   ├── event-fusion.ts      # Event impact analysis
│   ├── chat.ts              # RAG & chatbot
│   ├── utility.ts           # Helper endpoints
│   └── demo.ts              # Example endpoint
├── index.ts                 # Server setup
└── node-build.ts            # Production build handler
```

## Key Components Explained

### Dashboard Component

**Features:**

- Sales data upload
- Event data upload
- KPI cards (Growth, Anomalies, Forecast, Event Impact)
- Sales forecast chart
- Trend decomposition visualization

**API Calls:**

- `POST /api/upload-sales` - Upload CSV/Excel
- `POST /api/upload-events` - Upload event data
- `POST /api/forecast` - Generate forecast
- `GET /api/trend-decomposition` - Get decomposition data

**File:** `client/pages/Dashboard.tsx`

### Event Fusion Component

**Features:**

- Add/manage events
- View event list with impact percentages
- Sales timeline with event overlays
- Correlation matrix
- Event impact insights

**API Calls:**

- `POST /api/events` - Create event
- `GET /api/event-impacts` - Get impact data
- `GET /api/event-correlation` - Correlation analysis
- `POST /api/event-forecast` - Event-aware forecast

**File:** `client/pages/EventFusion.tsx`

### ChatBot Component

**Features:**

- Chat interface
- Suggested questions
- Context display
- Message history

**API Calls:**

- `POST /api/chat` - Send message & get response
- `POST /api/upload-documents` - Upload documents
- `GET /api/chat-history` - Retrieve history

**File:** `client/pages/ChatBot.tsx`

### Data Explorer Component

**Features:**

- Advanced filtering
- Search functionality
- Data table display
- CSV export
- Statistics

**API Calls:**

- `POST /api/download-data` - Export data
- Filtering done client-side with sample data

**File:** `client/pages/DataExplorer.tsx`

### Settings Component

**Features:**

- Forecasting model selection
- Vector DB configuration
- Embedding model selection
- RAG parameters
- LLM settings

**API Calls:**

- `POST /api/settings` - Save settings
- `GET /api/settings` - Load settings

**File:** `client/pages/Settings.tsx`

## Adding Features

### Add a New Page

1. **Create Component**

   ```typescript
   // client/pages/MyPage.tsx
   export default function MyPage() {
     return <div>My New Page</div>;
   }
   ```

2. **Add Route**

   ```typescript
   // client/App.tsx
   import MyPage from "./pages/MyPage";

   // Inside Routes:
   <Route path="/mypage" element={<LayoutWrapper><MyPage /></LayoutWrapper>} />
   ```

3. **Add Navigation**
   ```typescript
   // client/components/Layout.tsx
   const navItems = [
     // ... existing items
     { path: "/mypage", label: "My Page", icon: MyIcon },
   ];
   ```

### Add a New API Endpoint

1. **Create Route Handler**

   ```typescript
   // server/routes/my-feature.ts
   import { RequestHandler } from "express";

   export const handleMyFeature: RequestHandler = (req, res) => {
     res.json({ message: "Hello from my endpoint" });
   };
   ```

2. **Register Route**

   ```typescript
   // server/index.ts
   import { handleMyFeature } from "./routes/my-feature";

   app.post("/api/my-feature", handleMyFeature);
   ```

3. **Call from Frontend**
   ```typescript
   const response = await fetch("/api/my-feature", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ data: "value" }),
   });
   const data = await response.json();
   ```

## Styling Guide

### TailwindCSS Classes

The app uses TailwindCSS 3. Common patterns:

```typescript
// Button styling
className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"

// Card styling
className="border border-slate-200 rounded-lg p-6 bg-white"

// Responsive grid
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"

// Conditional classes
className={cn(
  "base-classes",
  { "conditional-class": condition },
  props.className
)}
```

### Color System

**Primary Colors:**

- `bg-primary` / `text-primary` - Main brand color (blue)
- `bg-accent` / `text-accent` - Accent color (purple)

**Semantic Colors:**

- `bg-green-600` - Success/Growth
- `bg-red-600` - Error/Decline
- `bg-orange-600` - Warning
- `bg-blue-600` - Info

### Creating Custom Components

```typescript
// client/components/MyComponent.tsx
import { cn } from "@/lib/utils";

interface MyComponentProps {
  variant?: "primary" | "secondary";
  className?: string;
  children: React.ReactNode;
}

export function MyComponent({
  variant = "primary",
  className,
  children
}: MyComponentProps) {
  return (
    <div className={cn(
      "px-4 py-2 rounded-lg font-semibold",
      variant === "primary" && "bg-primary text-primary-foreground",
      variant === "secondary" && "bg-secondary text-secondary-foreground",
      className
    )}>
      {children}
    </div>
  );
}
```

## Charts & Visualizations

### Using Recharts

```typescript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { date: "2024-01-01", sales: 12000, forecast: 11500 },
  { date: "2024-01-08", sales: 15000, forecast: 14800 },
];

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="sales" stroke="#3b82f6" />
    <Line type="monotone" dataKey="forecast" stroke="#ef4444" strokeDasharray="5 5" />
  </LineChart>
</ResponsiveContainer>
```

### Available Charts

- **LineChart** - Time series, trends
- **AreaChart** - Stacked areas, trends with volume
- **BarChart** - Comparisons, categorical data
- **PieChart** - Proportions, distributions
- **ComposedChart** - Multiple data types
- **ScatterChart** - Correlations
- **RadarChart** - Multi-dimensional data

## State Management

### Using React State

```typescript
const [data, setData] = useState<DataType[]>([]);
const [loading, setLoading] = useState(false);

const fetchData = async () => {
  setLoading(true);
  try {
    const response = await fetch("/api/data");
    const json = await response.json();
    setData(json);
  } finally {
    setLoading(false);
  }
};
```

### Using React Query

```typescript
import { useQuery, useMutation } from "@tanstack/react-query";

const { data, isLoading } = useQuery({
  queryKey: ["sales"],
  queryFn: () => fetch("/api/sales").then((r) => r.json()),
});

const { mutate } = useMutation({
  mutationFn: (newData) =>
    fetch("/api/sales", { method: "POST", body: JSON.stringify(newData) }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["sales"] });
  },
});
```

## Handling File Uploads

### Frontend

```typescript
const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload-sales", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    toast.success("File uploaded");
  }
};
```

### Backend

```typescript
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

app.post("/api/upload-sales", upload.single("file"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No file" });
    return;
  }

  // Process file
  const buffer = req.file.buffer;
  const content = buffer.toString();

  res.json({ success: true });
});
```

## Error Handling

### Frontend

```typescript
import { toast } from "sonner";

try {
  const response = await fetch("/api/data");
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const data = await response.json();
} catch (error) {
  console.error(error);
  toast.error("Failed to load data");
}
```

### Backend

```typescript
export const handleRequest: RequestHandler = (req, res) => {
  try {
    if (!req.body.required_field) {
      res.status(400).json({ error: "Missing required field" });
      return;
    }

    const result = processData(req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
```

## Testing

### Running Tests

```bash
pnpm test
```

### Writing Tests

```typescript
import { describe, it, expect } from "vitest";

describe("MyComponent", () => {
  it("renders correctly", () => {
    expect(true).toBe(true);
  });

  it("handles user interaction", async () => {
    // Test logic
  });
});
```

## Performance Tips

1. **Lazy Load Pages**

   ```typescript
   const Dashboard = lazy(() => import("./pages/Dashboard"));

   <Suspense fallback={<Loading />}>
     <Dashboard />
   </Suspense>
   ```

2. **Memoize Components**

   ```typescript
   const MyComponent = memo(function MyComponent(props) {
     return <div>{props.children}</div>;
   });
   ```

3. **Use React Query Caching**
   - Automatic cache invalidation
   - Background refetching
   - Optimistic updates

4. **Optimize Re-renders**
   - Use `useCallback` for handlers
   - Use `useMemo` for expensive calculations
   - Avoid inline object literals

## Debugging

### Browser DevTools

```typescript
// Log to console
console.log("Value:", value);
console.table(arrayOfObjects);
console.time("timer");
// ... code
console.timeEnd("timer");
```

### Server Logs

```bash
# Watch logs in development
pnpm dev

# Check production logs
tail -f logs/error.log
```

### Network Inspector

- Open DevTools → Network tab
- Monitor API calls
- Check request/response headers
- Inspect payload data

## Best Practices

1. **Type Safety**
   - Always use TypeScript types
   - Define interfaces for API responses
   - Avoid `any` type

2. **Code Organization**
   - Keep components small
   - Separate concerns
   - Use helper functions
   - Document complex logic

3. **Error Handling**
   - Always handle errors
   - Show user-friendly messages
   - Log errors for debugging

4. **Performance**
   - Minimize re-renders
   - Use lazy loading
   - Optimize images
   - Cache data appropriately

5. **Security**
   - Validate input
   - Sanitize output
   - Use HTTPS in production
   - Never expose secrets

## Useful Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm typecheck        # Check TypeScript errors

# Building
pnpm build            # Build for production
pnpm build:client     # Build frontend only
pnpm build:server     # Build backend only

# Production
pnpm start            # Start production server

# Testing & Formatting
pnpm test             # Run tests
pnpm format.fix       # Format code with Prettier
```

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Recharts Examples](https://recharts.org/examples)
- [Express Documentation](https://expressjs.com)
- [React Query Docs](https://tanstack.com/query/latest)

---

Happy coding! 🚀
