import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import EventFusion from "./pages/EventFusion";
import ChatBot from "./pages/ChatBot";
import DataExplorer from "./pages/DataExplorer";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => (
  <Layout>{children}</Layout>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LayoutWrapper>
                <Dashboard />
              </LayoutWrapper>
            }
          />
          <Route
            path="/events"
            element={
              <LayoutWrapper>
                <EventFusion />
              </LayoutWrapper>
            }
          />
          <Route
            path="/chat"
            element={
              <LayoutWrapper>
                <ChatBot />
              </LayoutWrapper>
            }
          />
          <Route
            path="/data"
            element={
              <LayoutWrapper>
                <DataExplorer />
              </LayoutWrapper>
            }
          />
          <Route
            path="/settings"
            element={
              <LayoutWrapper>
                <Settings />
              </LayoutWrapper>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
