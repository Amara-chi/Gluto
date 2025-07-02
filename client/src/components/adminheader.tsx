import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, ShoppingCart, Sun, Moon, Menu, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useThemeContext } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { LogOut as LogOutIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';


interface HeaderProps {
  onSearch?: (query: string) => void;
}


export function Header({ onSearch }: HeaderProps) {
  const { user, logout } = useAuth();

//   const { theme, toggleTheme } = useThemeContext();

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

  const handleLogout = () => {
     logout(); // ✅ Just one call, not logout();();
  };

interface HeaderProps {
  onSearch?: (query: string) => void;
}

  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const { theme, toggleTheme } = useThemeContext();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const isActiveRoute = (path: string) => location === path;

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between gap-10 items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">GLUTO</h1>
              <span className="text-sm text-gray-500 dark:text-gray-400">Admin Dashboard</span>
            </div>
            
                      {/* Desktop Navigation */}
          <div className='flex items-center justify-between'>
          <nav className="hidden  md:flex space-x-8">
            <Link href="/admin">
              <a className={`font-medium pb-2 transition-colors ${
                isActiveRoute('/admin') 
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
              }`}>
                Dashboard
              </a>
            </Link>
            <Link href="/admin/categories">
              <a className={`font-medium pb-2 transition-colors ${
                isActiveRoute('/admin/categories') 
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
              }`}>
                Categories
              </a>
            </Link>
            <Link href="/admin/products">
              <a className={`font-medium pb-2 transition-colors ${
                isActiveRoute('/admin/products') 
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
              }`}>
                Products
              </a>
            </Link>
          </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === 'dark' ? '☀️' : '🌙'}
              </Button>
              
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Welcome Admin
              </span>
              
              <Button className='flex items-center' variant="outline" onClick={handleLogout}>
                <Link href="/admin/login">
              <a className={`font-medium pb-2 transition-colors`}>
                Logout
              </a>
            </Link>
              </Button>
            </div>
              
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            </div>
    
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link href="/">
              <a className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                Home
              </a>
            </Link>
            <Link href="/catalog">
              <a className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                Catalog
              </a>
            </Link>
            <Link href="/informations">
              <a className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                Informations
              </a>
            </Link>
            <Link href="/contact">
              <a className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                Contact
              </a>
            </Link>
          </div>
        )}
        </div>
        </div>
    </header>
  );
}
