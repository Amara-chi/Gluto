import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";

// Public pages
import Home from "@/pages/Home";
import Catalog from "@/pages/Catalog";
import Contact from "@/pages/Contact";
import Informations from "@/pages/Informations";
import Cart from "@/pages/Cart";

// Admin pages
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminRegister from "@/pages/admin/Register"; // 🔐 Not a public route
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ProductManagement from "@/pages/admin/ProductManagement";
import CategoryManagement from "@/pages/admin/CategoryManagement";

// 🔁 Redirect helper
function Redirect({ to }: { to: string }) {
  const [, setLocation] = useLocation();
  useEffect(() => setLocation(to), [to]);
  return null;
}

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {/* Temporary route to start registration (can be removed later) */}
      <Route path="/" component={() => <Redirect to="/register" />} />

      {/* Public routes */}
      <Route path="/catalog" component={Catalog} />
      <Route path="/informations" component={Informations} />
      <Route path="/contact" component={Contact} />
      <Route path="/cart" component={Cart} />

      {/* 🔐 Admin register (NOT public) */}
      <Route path="/register">
        {isLoading ? (
          <LoadingScreen />
        ) : isAuthenticated ? (
          <Redirect to="/admin" />
        ) : (
          <AdminRegister />
        )}
      </Route>

      {/* 🔐 Admin login & dashboard */}
      <Route path="/admin">
        {isLoading ? (
          <LoadingScreen />
        ) : isAuthenticated ? (
          <AdminDashboard />
        ) : (
          <AdminLogin />
        )}
      </Route>

      <Route path="/admin/products">
        {isLoading ? (
          <LoadingScreen />
        ) : isAuthenticated ? (
          <ProductManagement />
        ) : (
          <AdminLogin />
        )}
      </Route>

      <Route path="/admin/categories">
        {isLoading ? (
          <LoadingScreen />
        ) : isAuthenticated ? (
          <CategoryManagement />
        ) : (
          <AdminLogin />
        )}
      </Route>

      {/* Catch-all */}
      <Route component={NotFound} />
    </Switch>
  );
}

// ⏳ Simple loading screen
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Checking login...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
