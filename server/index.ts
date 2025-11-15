import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import { handleDemo } from "./routes/demo";
import {
  uploadSalesData,
  uploadEventData,
  getUploadMiddleware,
} from "./routes/data-pipeline";
import {
  generateForecast,
  getTrendDecomposition,
  getAnomalyDetection,
} from "./routes/forecasting";
import {
  addEvent,
  getEventImpacts,
  getEventCorrelation,
  getEventForecast,
} from "./routes/event-fusion";
import { handleChat, uploadDocuments, getChatHistory } from "./routes/chat";
import {
  downloadData,
  saveSettings,
  getSettings,
  getHealthCheck,
} from "./routes/utility";

const upload = multer({ storage: multer.memoryStorage() });

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // Health check
  app.get("/api/health", getHealthCheck);

  // Example API route
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Data Pipeline Routes
  app.post("/api/upload-sales", upload.single("file"), uploadSalesData);
  app.post("/api/upload-events", upload.single("file"), uploadEventData);

  // Forecasting Routes
  app.post("/api/forecast", generateForecast);
  app.get("/api/trend-decomposition", getTrendDecomposition);
  app.get("/api/anomaly-detection", getAnomalyDetection);

  // Event Fusion Routes
  app.post("/api/events", addEvent);
  app.get("/api/event-impacts", getEventImpacts);
  app.get("/api/event-correlation", getEventCorrelation);
  app.post("/api/event-forecast", getEventForecast);

  // Chat & RAG Routes
  app.post("/api/chat", handleChat);
  app.post("/api/upload-documents", upload.single("file"), uploadDocuments);
  app.get("/api/chat-history", getChatHistory);

  // Utility Routes
  app.post("/api/download-data", downloadData);
  app.post("/api/settings", saveSettings);
  app.get("/api/settings", getSettings);

  return app;
}
