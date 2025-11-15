import { RequestHandler } from "express";

export const downloadData: RequestHandler = (req, res) => {
  const { data, format = "csv" } = req.body;

  if (format === "csv") {
    // Convert to CSV
    if (!data || data.length === 0) {
      res.status(400).json({ error: "No data to download" });
      return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map((row: any) => headers.map((h) => row[h]).join(",")),
    ].join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=sales_data.csv");
    res.send(csvContent);
  } else if (format === "json") {
    res.json(data);
  }
};

export const saveSettings: RequestHandler = (req, res) => {
  const settings = req.body;

  // In production, save to database or config file
  res.json({
    success: true,
    message: "Settings saved successfully",
    settings,
  });
};

export const getSettings: RequestHandler = (req, res) => {
  const defaultSettings = {
    forecastingModel: "prophet",
    vectorDb: "chromadb",
    chunkSize: 512,
    semanticSplitting: true,
    topKRetrieval: 5,
    llmModel: "llama3",
    temperature: 0.7,
    embeddingModel: "all-MiniLM-L6-v2",
  };

  res.json({
    success: true,
    settings: defaultSettings,
  });
};

export const getHealthCheck: RequestHandler = (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date(),
    services: {
      database: "connected",
      vectorDb: "connected",
      llm: "connected",
      cache: "connected",
    },
  });
};
