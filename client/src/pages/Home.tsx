import { Link } from 'wouter';
import { ArrowRight, Globe, Truck, Shield, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              GLUTO INTERNATIONAL
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Premium Global Agricultural Products & Food Solutions
            </p>
            <p className="text-lg mb-10 text-primary-200 max-w-3xl mx-auto">
              Your trusted partner in international trade of high-quality agricultural products, 
              food & beverages, and specialized nutrition solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/catalog">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                  Browse Our Catalog
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Why Choose GLUTO International?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We provide comprehensive solutions for all your agricultural and food product needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <Globe className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Global Sourcing</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Premium products sourced from the best suppliers worldwide
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Rigorous quality control and certification processes
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Truck className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Reliable Logistics</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Efficient supply chain and timely delivery solutions
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Star className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Expert Service</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Professional support and industry expertise
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Our Product Categories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Discover our comprehensive range of premium products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-primary-600">Agri Fresh Products</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Premium rice, beans, fruits, seeds, and nuts from trusted global suppliers
                </p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <li>• Premium Thai Jasmine Rice</li>
                  <li>• Organic Black Beans</li>
                  <li>• Fresh Tropical Fruits</li>
                  <li>• Quality Seeds & Nuts</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-primary-600">Food & Beverage</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  FMCG products including snacks, drinks, and personal care items
                </p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <li>• Premium Snacks</li>
                  <li>• Beverages</li>
                  <li>• Toiletries</li>
                  <li>• Personal Care</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-primary-600">Meat & Poultry</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  High-quality protein sources including eggs, fish, and beef products
                </p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <li>• Fresh Eggs</li>
                  <li>• Premium Fish</li>
                  <li>• Quality Beef</li>
                  <li>• Poultry Products</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/catalog">
              <Button size="lg" className="bg-primary-600 hover:bg-primary-700">
                View All Categories
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Trading?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Get in touch with our team to discuss your requirements
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
              Contact Our Team
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
