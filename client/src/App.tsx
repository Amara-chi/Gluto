import { Switch, Route } from "wouter";
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
// import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ProductManagement from "@/pages/admin/ProductManagement";
import CategoryManagement from "@/pages/admin/CategoryManagement";

// function AdminRoutes() {
//   const { isAuthenticated, isLoading } = useAuth();

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
//           <p className="text-gray-600 dark:text-gray-400">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return <AdminLogin />;
//   }

//   return (
//     <Switch>
//       <Route path="/admin" component={AdminDashboard} />
//       <Route path="/admin/products" component={ProductManagement} />
//       <Route path="/admin/categories" component={CategoryManagement} />
//       <Route component={NotFound} />
//     </Switch>
//   );
// }



function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/" component={Home} />
      <Route path="/catalog" component={Catalog} />
      <Route path="/informations" component={Informations} />
      <Route path="/contact" component={Contact} />
      <Route path="/cart" component={Cart} />
      
  
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/products" component={ProductManagement} />
      <Route path="/admin/categories" component={CategoryManagement} />
      <Route component={NotFound} />
  
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
