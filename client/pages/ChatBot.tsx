import { useState, useRef, useEffect } from "react";
import { Send, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  context?: string[];
  timestamp: Date;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your Sales Intelligence Assistant powered by Llama 3. I can help you understand your sales trends, analyze event impacts, and forecast future performance. Try asking me questions like: 'Why did sales rise last month?' or 'What's the impact of Diwali festival?'",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedContext, setSelectedContext] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const exampleQueries = [
    "Why did sales rise last month?",
    "What's the impact of the Diwali festival?",
    "Predict next 30 days for Product A",
    "Show me weather-related sales impacts",
  ];

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          history: messages,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.response,
          context: data.context,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        toast.error("Failed to get response");
      }
    } catch (error) {
      toast.error("Error sending message");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 h-screen flex flex-col">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          AI Sales Assistant
        </h1>
        <p className="text-slate-600 mt-2">
          Ask questions about your sales data, trends, and forecasts powered by
          Groq API & Llama 3
        </p>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle>Sales Intelligence Chat</CardTitle>
              <CardDescription>
                Ask anything about your sales data
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
                        message.role === "user"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-slate-100 text-slate-900 rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      {message.context && message.context.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-slate-300 text-xs opacity-75">
                          <p className="font-semibold mb-1">Context used:</p>
                          <ul className="space-y-1">
                            {message.context.slice(0, 3).map((ctx, idx) => (
                              <li key={idx}>• {ctx.substring(0, 50)}...</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 text-slate-900 px-4 py-2 rounded-lg rounded-bl-none">
                      <Loader className="w-5 h-5 animate-spin" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about your sales data..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  disabled={loading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={loading || !input.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Suggested Questions */}
        <div className="hidden lg:block w-80">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Suggested Questions</CardTitle>
              <CardDescription>Try asking these</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {exampleQueries.map((query, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInput(query);
                  }}
                  className="w-full text-left p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition text-sm text-slate-700 hover:text-slate-900 border border-slate-200"
                >
                  {query}
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Context Panel */}
          {selectedContext && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Document Context</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600 space-y-2 max-h-48 overflow-y-auto">
                <p>{selectedContext}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
