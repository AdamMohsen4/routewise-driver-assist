
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import RoutesPage from "./pages/Routes";
import Compliance from "./pages/Compliance";
import UpdatesPage from "./pages/Updates";
import Profile from "./pages/Profile";
import PaymentPage from "./pages/PaymentPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RouterRoutes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/updates" element={<UpdatesPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/payment" element={<PaymentPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
