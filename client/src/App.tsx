import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './lib/AuthContext';
import { SocketProvider } from './lib/SocketContext';

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Messages from "./pages/Messages";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import Feed from "./pages/Feed";
import Reels from "./pages/Reels";
import AdminReview from "./pages/AdminReview";
import Startups from "./pages/Startups";
import Applications from "./pages/Applications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SocketProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/search" element={<Search />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/admin" element={<AdminReview />} />
            <Route path="/startups" element={<Startups />} />
            <Route path="/applications" element={<Applications />} />
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SocketProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
