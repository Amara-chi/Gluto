// components/Navbar.tsx
import { Link } from 'wouter';
import { Menu, X, Sun, Moon, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  scrolled: boolean;
}

export function Navbar({ darkMode, toggleDarkMode, scrolled }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3); // Sample cart count

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white dark:bg-gray-800 shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <img 
                src="../src/assets/Gluto Logo w stoke.png" 
                alt="GLUTO International Logo" 
                className="h-10 w-auto hover:scale-105 transition-transform"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors px-3 py-2 hover:text-glow">
              Home
            </Link>
            <Link href="/about" className="text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors px-3 py-2 hover:text-glow">
              About Us
            </Link>
            <Link href="/catalogue" className="text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors px-3 py-2 hover:text-glow">
              Catalogue
            </Link>
            <Link href="/services" className="text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors px-3 py-2 hover:text-glow">
              Services
            </Link>
            <Link href="/sustainability" className="text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors px-3 py-2 hover:text-glow">
              Sustainability
            </Link>
            <Link href="/contact" className="text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors px-3 py-2 hover:text-glow">
              Contact
            </Link>
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors hover:scale-110"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors hover:scale-110"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 focus:outline-none hover:scale-110"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-glow"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-glow"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              href="/catalogue" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-glow"
              onClick={() => setIsMenuOpen(false)}
            >
              Catalogue
            </Link>
            <Link 
              href="/services" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-glow"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              href="/sustainability" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-glow"
              onClick={() => setIsMenuOpen(false)}
            >
              Sustainability
            </Link>
            <Link 
              href="/contact" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-glow"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="px-3 py-2">
              <Link href="/cart" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-amber-600 hover:bg-amber-700 hover:text-glow flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Cart ({cartCount})
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}