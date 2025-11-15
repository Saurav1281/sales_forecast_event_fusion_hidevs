import { useState } from "react";
import { Upload, TrendingUp, AlertCircle, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { toast } from "sonner";

export default function Dashboard() {
  const [salesData, setEventData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Sample data for demonstration
  const sampleSalesData = [
    { date: "2024-01-01", actual: 12000, forecast: 11500 },
    { date: "2024-01-08", actual: 15000, forecast: 14800 },
    { date: "2024-01-15", actual: 18000, forecast: 17600 },
    { date: "2024-01-22", actual: 22000, forecast: 21200 },
    { date: "2024-01-29", actual: 28000, forecast: 26800 },
    { date: "2024-02-05", actual: 25000, forecast: 25400 },
    { date: "2024-02-12", actual: 32000, forecast: 30200 },
  ];

  const trendDecompositionData = [
    { date: "2024-01-01", trend: 12000, seasonal: 500, residual: 100 },
    { date: "2024-01-08", trend: 14500, seasonal: 300, residual: 200 },
    { date: "2024-01-15", trend: 17000, seasonal: 800, residual: -100 },
    { date: "2024-01-22", trend: 19500, seasonal: 1200, residual: 800 },
    { date: "2024-01-29", trend: 22000, seasonal: 1500, residual: 4500 },
    { date: "2024-02-05", trend: 24500, seasonal: 800, residual: 200 },
    { date: "2024-02-12", trend: 27000, seasonal: 1200, residual: 3800 },
  ];

  const handleUploadSales = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload-sales", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Sales data uploaded successfully");
        // In a real app, fetch the processed data
      } else {
        toast.error("Failed to upload sales data");
      }
    } catch (error) {
      toast.error("Error uploading sales data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadEvents = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload-events", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Event data uploaded successfully");
      } else {
        toast.error("Failed to upload event data");
      }
    } catch (error) {
      toast.error("Error uploading event data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateForecast = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/forecast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ days: 30, model: "prophet" }),
      });

      if (response.ok) {
        const data = await response.json();
        setForecastData(data);
        toast.success("Forecast generated successfully");
      } else {
        toast.error("Failed to generate forecast");
      }
    } catch (error) {
      toast.error("Error generating forecast");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Sales Dashboard</h1>
        <p className="text-slate-600 mt-2">
          Upload data, view forecasts, and analyze sales trends with event
          correlation
        </p>
      </div>

      {/* Upload Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Sales Data
            </CardTitle>
            <CardDescription>CSV or Excel format</CardDescription>
          </CardHeader>
          <CardContent>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleUploadSales}
              className="hidden"
              id="sales-upload"
            />
            <label htmlFor="sales-upload">
              <Button asChild className="w-full cursor-pointer">
                <span>Choose File</span>
              </Button>
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Event Data
            </CardTitle>
            <CardDescription>CSV, JSON, or manual entry</CardDescription>
          </CardHeader>
          <CardContent>
            <input
              type="file"
              accept=".csv,.json"
              onChange={handleUploadEvents}
              className="hidden"
              id="event-upload"
            />
            <label htmlFor="event-upload">
              <Button asChild className="w-full cursor-pointer">
                <span>Choose File</span>
              </Button>
            </label>
          </CardContent>
        </Card>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-600" />
              Growth Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">+24.5%</div>
            <p className="text-xs text-slate-600 mt-1">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4 text-orange-600" />
              Anomalies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">3</div>
            <p className="text-xs text-slate-600 mt-1">Detected</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Target className="w-4 h-4 text-blue-600" />
              Avg Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">$28.5K</div>
            <p className="text-xs text-slate-600 mt-1">Next 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              Event Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">+18%</div>
            <p className="text-xs text-slate-600 mt-1">Average lift</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Sales Forecast</CardTitle>
              <CardDescription>
                Actual vs Predicted sales over time
              </CardDescription>
            </div>
            <Button onClick={handleGenerateForecast} disabled={loading}>
              {loading ? "Generating..." : "Generate Forecast"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sampleSalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#3b82f6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#ef4444"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Trend Decomposition */}
      <Card>
        <CardHeader>
          <CardTitle>Trend Decomposition</CardTitle>
          <CardDescription>
            Trend, seasonal, and residual components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trendDecompositionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="trend"
                stackId="1"
                fill="#3b82f6"
              />
              <Area
                type="monotone"
                dataKey="seasonal"
                stackId="1"
                fill="#f59e0b"
              />
              <Area
                type="monotone"
                dataKey="residual"
                stackId="1"
                fill="#ec4899"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
