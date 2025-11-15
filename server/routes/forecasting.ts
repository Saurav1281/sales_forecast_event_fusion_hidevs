import { RequestHandler } from "express";

export const generateForecast: RequestHandler = (req, res) => {
  const { days = 30, model = "prophet" } = req.body;

  // Simulated forecast data
  const baseDate = new Date();
  const forecast = [];

  for (let i = 1; i <= days; i++) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + i);
    const value = 25000 + Math.random() * 10000 + i * 200;
    const upper = value * 1.1;
    const lower = value * 0.9;

    forecast.push({
      date: date.toISOString().split("T")[0],
      predicted: Math.round(value),
      upperBound: Math.round(upper),
      lowerBound: Math.round(lower),
      confidence: 0.85 + Math.random() * 0.1,
    });
  }

  res.json({
    success: true,
    model,
    forecast,
    metrics: {
      rmse: 1250.5,
      mae: 980.2,
      mape: 5.2,
    },
  });
};

export const getTrendDecomposition: RequestHandler = (req, res) => {
  const decomposition = [
    {
      date: "2024-01-01",
      trend: 20000,
      seasonal: 500,
      residual: -200,
    },
    {
      date: "2024-01-08",
      trend: 21000,
      seasonal: 300,
      residual: 100,
    },
    {
      date: "2024-01-15",
      trend: 22000,
      seasonal: 800,
      residual: 200,
    },
    {
      date: "2024-01-22",
      trend: 23000,
      seasonal: 1200,
      residual: 500,
    },
    {
      date: "2024-01-29",
      trend: 24000,
      seasonal: 1500,
      residual: 2500,
    },
  ];

  res.json({
    success: true,
    decomposition,
  });
};

export const getAnomalyDetection: RequestHandler = (req, res) => {
  const anomalies = [
    {
      date: "2024-01-15",
      value: 35000,
      expectedValue: 22000,
      anomalyScore: 0.92,
      reason: "Potential festival impact",
    },
    {
      date: "2024-01-22",
      value: 18000,
      expectedValue: 23000,
      anomalyScore: 0.78,
      reason: "Unexpected dip",
    },
    {
      date: "2024-02-01",
      value: 42000,
      expectedValue: 25000,
      anomalyScore: 0.88,
      reason: "Marketing campaign spike",
    },
  ];

  res.json({
    success: true,
    anomalies,
    totalDetected: anomalies.length,
  });
};
