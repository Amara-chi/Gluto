// components/Footer.tsx
import { Link } from 'wouter';
import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-bold text-white mb-6 hover:text-glow">GLUTO International</h3>
            <p className="mb-6 text-fade-in">
              Your trusted partner in international trade of high-quality agricultural products and food solutions since 1995.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors hover:scale-110">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors hover:scale-110">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors hover:scale-110">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6 hover:text-glow">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="hover:text-emerald-400 transition-colors hover:text-glow">Home</Link></li>
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors hover:text-glow">About Us</Link></li>
              <li><Link href="/catalogue" className="hover:text-emerald-400 transition-colors hover:text-glow">Catalogue</Link></li>
              <li><Link href="/services" className="hover:text-emerald-400 transition-colors hover:text-glow">Services</Link></li>
              <li><Link href="/sustainability" className="hover:text-emerald-400 transition-colors hover:text-glow">Sustainability</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition-colors hover:text-glow">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6 hover:text-glow">Products</h3>
            <ul className="space-y-3">
              <li><Link href="/products/fresh-produce" className="hover:text-emerald-400 transition-colors hover:text-glow">Fresh Produce</Link></li>
              <li><Link href="/products/processed-foods" className="hover:text-emerald-400 transition-colors hover:text-glow">Processed Foods</Link></li>
              <li><Link href="/products/protein-products" className="hover:text-emerald-400 transition-colors hover:text-glow">Protein Products</Link></li>
              <li><Link href="/products/beverages" className="hover:text-emerald-400 transition-colors hover:text-glow">Beverages</Link></li>
              <li><Link href="/products/specialty-items" className="hover:text-emerald-400 transition-colors hover:text-glow">Specialty Items</Link></li>
              <li><Link href="/products/organic-range" className="hover:text-emerald-400 transition-colors hover:text-glow">Organic Range</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6 hover:text-glow">Contact Us</h3>
            <address className="not-italic">
              <div className="flex items-start mb-4">
                <MapPin className="flex-shrink-0 h-5 w-5 text-emerald-400 mt-1 hover:text-glow" />
                <div className="ml-3">
                  <p className="hover:text-glow">123 Agricultural Avenue</p>
                  <p className="hover:text-glow">Food Business Park</p>
                  <p className="hover:text-glow">Amsterdam, Netherlands</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <Phone className="flex-shrink-0 h-5 w-5 text-emerald-400 hover:text-glow" />
                <a href="tel:+31201234567" className="ml-3 hover:text-emerald-400 transition-colors hover:text-glow">+31 20 123 4567</a>
              </div>
              <div className="flex items-center">
                <Mail className="flex-shrink-0 h-5 w-5 text-emerald-400 hover:text-glow" />
                <a href="mailto:info@glutointernational.com" className="ml-3 hover:text-emerald-400 transition-colors hover:text-glow">info@glutointernational.com</a>
              </div>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 text-fade-in">
            &copy; {new Date().getFullYear()} GLUTO International. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors hover:text-glow">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors hover:text-glow">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors hover:text-glow">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}