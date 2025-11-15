import { useState } from "react";
import { Save, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Settings() {
  const [settings, setSettings] = useState({
    forecastingModel: "prophet",
    vectorDb: "chromadb",
    chunkSize: "512",
    semanticSplitting: true,
    topKRetrieval: "5",
    llmModel: "llama3",
    temperature: "0.7",
    embeddingModel: "all-MiniLM-L6-v2",
  });

  const [saved, setSaved] = useState(false);

  const handleSaveSettings = async () => {
    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        toast.success("Settings saved successfully");
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        toast.error("Failed to save settings");
      }
    } catch (error) {
      toast.error("Error saving settings");
      console.error(error);
    }
  };

  const handleResetSettings = () => {
    setSettings({
      forecastingModel: "prophet",
      vectorDb: "chromadb",
      chunkSize: "512",
      semanticSplitting: true,
      topKRetrieval: "5",
      llmModel: "llama3",
      temperature: "0.7",
      embeddingModel: "all-MiniLM-L6-v2",
    });
    toast.success("Settings reset to defaults");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-2">
          Configure your forecasting and AI models
        </p>
      </div>

      {/* Forecasting Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Forecasting Engine</CardTitle>
          <CardDescription>
            Configure time-series forecasting parameters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="model">Forecasting Model</Label>
              <Select
                value={settings.forecastingModel}
                onValueChange={(value) =>
                  setSettings({ ...settings, forecastingModel: value })
                }
              >
                <SelectTrigger id="model">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prophet">Prophet (Facebook)</SelectItem>
                  <SelectItem value="arima">ARIMA</SelectItem>
                  <SelectItem value="xgboost">XGBoost</SelectItem>
                  <SelectItem value="ensemble">Ensemble (All)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500">
                Prophet handles seasonality well. ARIMA for stationary data.
                XGBoost for complex patterns.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="horizon">Forecast Horizon (Days)</Label>
              <Input
                id="horizon"
                type="number"
                defaultValue="30"
                className="w-full"
              />
              <p className="text-xs text-slate-500">
                Number of days to forecast ahead
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vector Database Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Vector Database & Embeddings</CardTitle>
          <CardDescription>
            Configure document storage and retrieval
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="vectordb">Vector Database</Label>
              <Select
                value={settings.vectorDb}
                onValueChange={(value) =>
                  setSettings({ ...settings, vectorDb: value })
                }
              >
                <SelectTrigger id="vectordb">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chromadb">
                    ChromaDB (Recommended)
                  </SelectItem>
                  <SelectItem value="faiss">FAISS</SelectItem>
                  <SelectItem value="pinecone">Pinecone</SelectItem>
                  <SelectItem value="weaviate">Weaviate</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500">
                ChromaDB is recommended for local deployment
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="embedding">Embedding Model</Label>
              <Select
                value={settings.embeddingModel}
                onValueChange={(value) =>
                  setSettings({ ...settings, embeddingModel: value })
                }
              >
                <SelectTrigger id="embedding">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-MiniLM-L6-v2">
                    all-MiniLM-L6-v2 (Recommended)
                  </SelectItem>
                  <SelectItem value="all-mpnet-base-v2">
                    all-mpnet-base-v2
                  </SelectItem>
                  <SelectItem value="paraphrase-MiniLM-L6-v2">
                    paraphrase-MiniLM-L6-v2
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500">
                Uses sentence-transformers for embedding
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="chunk">Chunk Size</Label>
              <Input
                id="chunk"
                type="number"
                value={settings.chunkSize}
                onChange={(e) =>
                  setSettings({ ...settings, chunkSize: e.target.value })
                }
              />
              <p className="text-xs text-slate-500">
                Number of tokens per chunk
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topk">Top K Retrieval</Label>
              <Input
                id="topk"
                type="number"
                value={settings.topKRetrieval}
                onChange={(e) =>
                  setSettings({ ...settings, topKRetrieval: e.target.value })
                }
              />
              <p className="text-xs text-slate-500">
                Number of documents to retrieve
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <Label htmlFor="semantic" className="font-semibold">
                Semantic Splitting
              </Label>
              <p className="text-xs text-slate-500 mt-1">
                Split documents by semantic meaning
              </p>
            </div>
            <Switch
              id="semantic"
              checked={settings.semanticSplitting}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, semanticSplitting: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* LLM Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Language Model (LLM)</CardTitle>
          <CardDescription>Configure Groq API and Llama 3</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="llm">LLM Model</Label>
              <Select
                value={settings.llmModel}
                onValueChange={(value) =>
                  setSettings({ ...settings, llmModel: value })
                }
              >
                <SelectTrigger id="llm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="llama3">Llama 3 (Groq)</SelectItem>
                  <SelectItem value="llama2">Llama 2 (Groq)</SelectItem>
                  <SelectItem value="mixtral">Mixtral (Groq)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500">
                Groq provides fast inference
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature</Label>
              <Input
                id="temperature"
                type="number"
                min="0"
                max="1"
                step="0.1"
                value={settings.temperature}
                onChange={(e) =>
                  setSettings({ ...settings, temperature: e.target.value })
                }
              />
              <p className="text-xs text-slate-500">
                0 = deterministic, 1 = creative
              </p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> Ensure your Groq API key is configured in
              your environment variables.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Data Pipeline Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Data Pipeline</CardTitle>
          <CardDescription>
            File upload and preprocessing options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-600" />
              <span>CSV files: Supported</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-600" />
              <span>Excel files: Supported</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-600" />
              <span>JSON files: Supported</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-600" />
              <span>PDF documents: Supported (LangChain)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-600" />
              <span>DOCX documents: Supported (LangChain)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-600" />
              <span>Web pages: Supported (LangChain)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button onClick={handleSaveSettings} className="flex gap-2">
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : "Save Settings"}
        </Button>
        <Button
          onClick={handleResetSettings}
          variant="outline"
          className="flex gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset to Defaults
        </Button>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader>
            <CardTitle className="text-lg text-purple-900">
              RAG Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-purple-800">
            <p>
              Retrieval-Augmented Generation combines document search with LLM
              responses for context-aware answers about your sales data.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg text-blue-900">
              Event Fusion
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-800">
            <p>
              Analyze how external events (festivals, campaigns, weather) impact
              your sales and adjust forecasts accordingly.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
