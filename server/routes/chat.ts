import { RequestHandler } from "express";

// Simulated chat memory store (in production, use MongoDB)
const chatHistory: any[] = [];

export const handleChat: RequestHandler = async (req, res) => {
  const { message, history = [] } = req.body;

  if (!message) {
    res.status(400).json({ error: "Message is required" });
    return;
  }

  // Simulate document retrieval
  const retrievedContext = simulateDocumentRetrieval(message);

  // Build context for LLM
  const context = buildContext(message, retrievedContext);

  // Simulate Groq API call with Llama 3
  const llmResponse = generateLLMResponse(message, context);

  // Store in chat memory
  chatHistory.push({
    timestamp: new Date(),
    message,
    response: llmResponse,
    context: retrievedContext.map((doc) => doc.content),
  });

  res.json({
    success: true,
    response: llmResponse,
    context: retrievedContext.map((doc) => doc.content),
  });
};

export const uploadDocuments: RequestHandler = (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No file provided" });
    return;
  }

  // Simulate document processing with LangChain
  const { originalname, size } = req.file;

  res.json({
    success: true,
    document: {
      name: originalname,
      size,
      chunks: Math.ceil(size / 512),
      embedded: true,
      vectorStored: "chromadb",
    },
  });
};

export const getChatHistory: RequestHandler = (req, res) => {
  res.json({
    success: true,
    history: chatHistory,
    totalMessages: chatHistory.length,
  });
};

// Helper functions
function simulateDocumentRetrieval(query: string) {
  // Simulate document retrieval based on query
  const documents: Record<string, any[]> = {
    sales: [
      {
        id: "doc1",
        content:
          "Sales data shows significant growth in Q1 2024, with a 24.5% increase compared to Q4 2023. Product A leads with 45% of total revenue.",
        source: "Sales Report Q1 2024",
        relevance: 0.95,
      },
    ],
    event: [
      {
        id: "doc2",
        content:
          "Diwali festival in January drove a 35% spike in sales. The festival impact lasted for 7 days with elevated customer engagement.",
        source: "Event Impact Analysis",
        relevance: 0.88,
      },
    ],
    diwali: [
      {
        id: "doc2",
        content:
          "Diwali festival in January drove a 35% spike in sales. The festival impact lasted for 7 days with elevated customer engagement.",
        source: "Event Impact Analysis",
        relevance: 0.92,
      },
    ],
    forecast: [
      {
        id: "doc3",
        content:
          "Forecast models predict 30% growth for the next 30 days with confidence interval of 85%. Prophet model shows strong seasonal patterns.",
        source: "Forecast Report",
        relevance: 0.87,
      },
    ],
  };

  const lowerQuery = query.toLowerCase();
  let results: any[] = [];

  for (const [key, docs] of Object.entries(documents)) {
    if (lowerQuery.includes(key)) {
      results = [...results, ...docs];
    }
  }

  return results.length > 0
    ? results
    : [
        {
          id: "default",
          content:
            "Your sales data shows consistent growth trends with seasonal patterns. Consider analyzing event impacts for better forecasts.",
          source: "General Sales Intelligence",
          relevance: 0.65,
        },
      ];
}

function buildContext(query: string, documents: any[]): string {
  const docContext = documents
    .slice(0, 3)
    .map((doc) => doc.content)
    .join("\n\n");
  return `Based on the following context about your sales data:\n\n${docContext}\n\nAnswer the question: ${query}`;
}

function generateLLMResponse(query: string, context: string): string {
  // Simulated LLM responses based on query type
  const responses: Record<string, string> = {
    "why did sales rise": `Based on your sales data, the recent rise in sales can be attributed to multiple factors:

1. **Festival Impact**: Diwali festival in January drove a significant 35% spike in sales
2. **Marketing Campaigns**: Active promotional campaigns contributed an estimated 15% lift
3. **Seasonal Growth**: Normal seasonal patterns contributed approximately 8% growth
4. **Product Performance**: Product A showed particularly strong performance with 45% of total revenue

The combined effect resulted in the 24.5% growth you observed compared to the previous period.`,

    diwali: `The Diwali festival had a substantial impact on your sales:

- **Sales Lift**: +35% during the festival period
- **Duration**: Peak impact lasted 7 days
- **Affected Products**: Primarily Product A and B
- **Revenue Impact**: Estimated ₹125,000 additional revenue
- **Customer Engagement**: Elevated conversion rates during the period

This represents one of your strongest event-driven performance increases in the available data.`,

    "predict next 30": `Based on the current forecast models, here's the prediction for the next 30 days:

- **Average Daily Sales**: ₹28,500 (±15%)
- **Total Projected Revenue**: ₹855,000
- **Confidence Level**: 85%
- **Key Factors**: Includes seasonal adjustments and recent event impacts
- **Trend**: Continued upward trajectory with seasonal fluctuations

Consider the upcoming holiday season which may introduce additional growth opportunities.`,

    weather: `Weather events have shown moderate impact on your sales:

- **Negative Impact Events**: Identified 2 instances of weather-related sales dips
- **Average Impact**: -15% during adverse weather
- **Affected Products**: Primarily delivery-dependent categories
- **Recovery Time**: Typically 3-5 days post-event

Recommendations: Build inventory buffers during rainy seasons and plan promotions accordingly.`,
  };

  let response = responses["default"];
  for (const [key, value] of Object.entries(responses)) {
    if (query.toLowerCase().includes(key)) {
      response = value;
      break;
    }
  }

  return (
    response ||
    `Based on your sales data and the Llama 3 model analysis, I can help you understand trends and make predictions. However, for the specific query "${query}", I recommend uploading relevant documents or providing more context about what you'd like to analyze.`
  );
}
