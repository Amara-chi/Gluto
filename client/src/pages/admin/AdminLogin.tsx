import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminLogin() {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/admin';
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    window.location.href = '/api/login';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-primary-600">GLUTO</h1>
              <p className="text-sm text-gray-500">INTERNATIONAL ADMIN</p>
            </div>
            Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-gray-600 dark:text-gray-400">
            Access the admin dashboard to manage products, categories, and orders.
          </p>
          
          <Button 
            onClick={handleLogin}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white"
            size="lg"
          >
            Login with Replit Auth
          </Button>

          <div className="text-center">
            <Button variant="ghost" asChild>
              <a href="/">← Back to Website</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
