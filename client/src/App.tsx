import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import NotFound from "@/pages/not-found";

// Public pages
import Home from "@/pages/Home";
import Catalog from "@/pages/Catalog";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Sustainability from "@/pages/Sustainability";
import Cart from "@/pages/Cart";

// Admin pages
import AdminRegister from "@/pages/admin/Register";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ProductManagement from "@/pages/admin/ProductManagement";
import CategoryManagement from "@/pages/admin/CategoryManagement";

function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/catalogue" component={Catalog} />
      <Route path="/services" component={Services} />
      <Route path="/sustainability" component={Sustainability} />
      <Route path="/contact" component={Contact} />
      <Route path="/cart" component={Cart} />
      
      {/* Admin routes */}
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/register" component={AdminRegister} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/products" component={ProductManagement} />
      <Route path="/admin/categories" component={CategoryManagement} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
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