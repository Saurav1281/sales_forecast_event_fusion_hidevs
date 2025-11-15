import { RequestHandler } from "express";
import multer from "multer";
import { parse } from "csv-parse/sync";
import * as XLSX from "xlsx";

const upload = multer({ storage: multer.memoryStorage() });

export const uploadSalesData: RequestHandler = (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No file provided" });
    return;
  }

  try {
    let data: any[] = [];
    const fileExt = req.file.originalname.split(".").pop()?.toLowerCase();

    if (fileExt === "csv") {
      data = parse(req.file.buffer.toString(), {
        columns: true,
        skip_empty_lines: true,
      });
    } else if (fileExt === "xlsx" || fileExt === "xls") {
      const workbook = XLSX.read(req.file.buffer);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      data = XLSX.utils.sheet_to_json(worksheet);
    }

    // Data cleaning and preprocessing
    const cleaned = data.map((row: any) => ({
      date: row.date || row.Date,
      product: row.product || row.Product,
      sales: parseFloat(row.sales || row.Sales || 0),
      quantity: parseInt(row.quantity || row.Quantity || 0),
      region: row.region || row.Region || "Unknown",
    }));

    res.json({
      success: true,
      recordsProcessed: cleaned.length,
      data: cleaned.slice(0, 5), // Return first 5 for preview
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to process file" });
    console.error(error);
  }
};

export const uploadEventData: RequestHandler = (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No file provided" });
    return;
  }

  try {
    let data: any[] = [];
    const fileExt = req.file.originalname.split(".").pop()?.toLowerCase();

    if (fileExt === "csv") {
      data = parse(req.file.buffer.toString(), {
        columns: true,
        skip_empty_lines: true,
      });
    } else if (fileExt === "json") {
      data = JSON.parse(req.file.buffer.toString());
    }

    // Validate event data
    const cleaned = data.map((row: any) => ({
      name: row.name || row.Name,
      date: row.date || row.Date,
      type: row.type || row.Type || "marketing",
      description: row.description || row.Description || "",
    }));

    res.json({
      success: true,
      recordsProcessed: cleaned.length,
      data: cleaned,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to process event file" });
    console.error(error);
  }
};

export const getUploadMiddleware = () => upload.single("file");
