import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Package, FolderOpen, ShoppingCart, BarChart3, Users } from 'lucide-react';
import { LogOut as LogOutIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useThemeContext } from '@/components/ThemeProvider';
import { Header } from '@/components/adminheader'

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  const { theme, toggleTheme } = useThemeContext();

  const { data: productsData } = useQuery({
    queryKey: ['/api/admin/products', { limit: 1 }],
    queryFn: async () => {
      const response = await fetch('/api/admin/products?limit=1');
      if (!response.ok) throw new Error('Failed to fetch products count');
      return response.json();
    },
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['/api/admin/categories'],
  });

  const { data: orders = [] } = useQuery({
    queryKey: ['/api/admin/orders'],
  });

  const totalProducts = productsData?.total || 0;
  const totalCategories = categories.length || 0;
  const totalOrders = orders.length || 0;
  const pendingOrders = orders.filter((order: any) => order.status === 'pending').length || 0;

  const handleLogout = () => {
     logout(); // ✅ Just one call, not logout();();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Admin Header */}
      < Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Dashboard Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your products, categories, and orders from this central hub.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{totalProducts}</p>
                </div>
                <Package className="w-8 h-8 text-primary-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{totalCategories}</p>
                </div>
                <FolderOpen className="w-8 h-8 text-primary-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{totalOrders}</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-primary-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Orders</p>
                  <p className="text-3xl font-bold text-amber-600">{pendingOrders}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-6 h-6 mr-2 text-primary-600" />
                Product Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Add, edit, and manage your product catalog. Update availability, pricing, and product details.
              </p>
              <Link href="/admin/products">
                <Button className="w-full bg-primary-600 hover:bg-primary-700">
                  Manage Products
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FolderOpen className="w-6 h-6 mr-2 text-primary-600" />
                Category Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Organize your products by creating and managing categories and subcategories.
              </p>
              <Link href="/admin/categories">
                <Button className="w-full bg-primary-600 hover:bg-primary-700">
                  Manage Categories
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="w-6 h-6 mr-2 text-primary-600" />
                Order Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                View and manage customer orders. Update order status and process inquiries.
              </p>
              <Button className="w-full bg-primary-600 hover:bg-primary-700" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        {orders.length > 0 && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order: any) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {order.companyName} - {order.fullName}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${order.totalAmount}</p>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          order.status === 'pending' 
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <a href="/" target="_blank" rel="noopener noreferrer">
              View Public Website
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
