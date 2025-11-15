import { RequestHandler } from "express";

export const addEvent: RequestHandler = (req, res) => {
  const { name, date, type } = req.body;

  if (!name || !date || !type) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  // Simulate event impact calculation
  const impact = Math.random() * 40 - 10;

  res.json({
    success: true,
    event: {
      id: Date.now().toString(),
      name,
      date,
      type,
      impact: Math.round(impact * 10) / 10,
      confidence: Math.random() * 0.3 + 0.65,
    },
  });
};

export const getEventImpacts: RequestHandler = (req, res) => {
  const impacts = [
    {
      event: "Diwali Festival",
      date: "2024-01-15",
      type: "festival",
      impact: 35,
      confidence: 0.92,
      affectedProducts: ["Product A", "Product B"],
      estimatedRevenueLift: 125000,
    },
    {
      event: "Christmas Sale",
      date: "2024-02-01",
      type: "marketing",
      impact: 28,
      confidence: 0.85,
      affectedProducts: ["All"],
      estimatedRevenueLift: 98000,
    },
    {
      event: "Weather Event",
      date: "2024-01-22",
      type: "weather",
      impact: -15,
      confidence: 0.65,
      affectedProducts: ["Product C"],
      estimatedRevenueLift: -42000,
    },
  ];

  res.json({
    success: true,
    impacts,
    totalEvents: impacts.length,
  });
};

export const getEventCorrelation: RequestHandler = (req, res) => {
  const correlation = [
    { event: "Diwali", correlation: 0.85 },
    { event: "Christmas", correlation: 0.72 },
    { event: "New Year", correlation: 0.68 },
    { event: "Black Friday", correlation: 0.91 },
    { event: "Valentine's", correlation: 0.45 },
  ];

  res.json({
    success: true,
    correlation,
  });
};

export const getEventForecast: RequestHandler = (req, res) => {
  const { startDate, endDate } = req.body;

  // Generate event-aware forecast
  const forecast = [
    {
      date: "2024-02-14",
      predictedSales: 38000,
      eventInfluence: "Valentine's Day",
      eventLift: 12000,
    },
    {
      date: "2024-03-08",
      predictedSales: 32000,
      eventInfluence: "Women's Day Sale",
      eventLift: 6000,
    },
    {
      date: "2024-03-25",
      predictedSales: 29000,
      eventInfluence: "None",
      eventLift: 0,
    },
  ];

  res.json({
    success: true,
    forecast,
  });
};
