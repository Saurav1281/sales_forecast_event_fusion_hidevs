import { useState } from "react";
import { Plus, Trash2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts";
import { toast } from "sonner";

interface Event {
  id: string;
  name: string;
  date: string;
  type: string;
  impact: number;
}

export default function EventFusion() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      name: "Diwali Festival",
      date: "2024-01-15",
      type: "festival",
      impact: 35,
    },
    {
      id: "2",
      name: "Christmas Sale",
      date: "2024-02-01",
      type: "marketing",
      impact: 28,
    },
    {
      id: "3",
      name: "Weather Event",
      date: "2024-01-22",
      type: "weather",
      impact: -15,
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    type: "marketing",
  });

  // Sample correlation data
  const correlationData = [
    { event: "Diwali", correlation: 0.85 },
    { event: "Christmas", correlation: 0.72 },
    { event: "New Year", correlation: 0.68 },
    { event: "Black Friday", correlation: 0.91 },
    { event: "Valentine's", correlation: 0.45 },
  ];

  // Timeline data
  const timelineData = [
    { date: "2024-01-01", sales: 12000, events: 0 },
    { date: "2024-01-08", sales: 15000, events: 0 },
    { date: "2024-01-15", sales: 25000, events: 1 },
    { date: "2024-01-22", sales: 22000, events: 1 },
    { date: "2024-01-29", sales: 28000, events: 0 },
    { date: "2024-02-01", sales: 35000, events: 1 },
    { date: "2024-02-12", sales: 32000, events: 0 },
  ];

  // Correlation matrix data
  const eventImpactData = [
    { name: "Diwali", impact: 35, confidence: 0.92 },
    { name: "Christmas", impact: 28, confidence: 0.85 },
    { name: "Marketing Campaign", impact: 22, confidence: 0.78 },
    { name: "Weather Event", impact: -15, confidence: 0.65 },
    { name: "Competition Sale", impact: -12, confidence: 0.72 },
  ];

  const handleAddEvent = async () => {
    if (!formData.name || !formData.date) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newEvent = {
          id: Date.now().toString(),
          ...formData,
          impact: Math.random() * 40 - 10,
        };
        setEvents([...events, newEvent]);
        setFormData({ name: "", date: "", type: "marketing" });
        toast.success("Event added successfully");
      } else {
        toast.error("Failed to add event");
      }
    } catch (error) {
      toast.error("Error adding event");
      console.error(error);
    }
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
    toast.success("Event deleted");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Event Fusion Engine
        </h1>
        <p className="text-slate-600 mt-2">
          Analyze event impacts on sales and discover hidden correlations
        </p>
      </div>

      {/* Add Event Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Event
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Event Name</Label>
              <Input
                placeholder="e.g., Diwali Festival"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Event Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="festival">Festival</SelectItem>
                  <SelectItem value="marketing">Marketing Campaign</SelectItem>
                  <SelectItem value="weather">Weather Event</SelectItem>
                  <SelectItem value="competition">Competition</SelectItem>
                  <SelectItem value="holiday">Holiday</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button onClick={handleAddEvent} className="w-full">
                Add Event
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Events</CardTitle>
          <CardDescription>
            Events affecting your sales performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
              >
                <div>
                  <p className="font-semibold text-slate-900">{event.name}</p>
                  <p className="text-sm text-slate-600">
                    {event.date} • {event.type}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={`text-lg font-bold ${event.impact > 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {event.impact > 0 ? "+" : ""}
                    {event.impact.toFixed(1)}%
                  </div>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Event Impact Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Timeline with Events</CardTitle>
          <CardDescription>
            Sales performance with event overlays
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="stepAfter"
                dataKey="events"
                stroke="#ef4444"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Correlation Matrix */}
        <Card>
          <CardHeader>
            <CardTitle>Event-Sales Correlation</CardTitle>
            <CardDescription>
              How strongly events correlate with sales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={correlationData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 1]} />
                <YAxis dataKey="event" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="correlation" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Event Impact Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle>Event Impact Insights</CardTitle>
            <CardDescription>
              Impact magnitude and confidence level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {eventImpactData.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p
                      className={`text-sm font-bold ${item.impact > 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {item.impact > 0 ? "+" : ""}
                      {item.impact}%
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.impact > 0 ? "bg-green-500" : "bg-red-500"}`}
                        style={{ width: `${Math.abs(item.impact)}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-600 w-12">
                      {(item.confidence * 100).toFixed(0)}% conf
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contribution Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Event Contribution Summary
          </CardTitle>
          <CardDescription>
            Weighted impact of all events on overall sales growth
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-slate-600">Total Event Impact</p>
              <p className="text-3xl font-bold text-green-600">+58%</p>
              <p className="text-xs text-slate-600 mt-1">
                Combined lift from all events
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Strongest Event</p>
              <p className="text-3xl font-bold text-blue-600">Diwali</p>
              <p className="text-xs text-slate-600 mt-1">+35% sales lift</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Prediction Accuracy</p>
              <p className="text-3xl font-bold text-purple-600">87%</p>
              <p className="text-xs text-slate-600 mt-1">
                Event-aware forecast
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
