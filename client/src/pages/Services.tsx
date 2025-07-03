import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BackToTop } from '@/components/BackToTop';

import { 
  Briefcase, 
  Globe, 
  Truck, 
  Box, 
  BarChart2, 
  ShieldCheck 
} from 'lucide-react';

export default function Services() {
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    document.documentElement.classList.toggle('dark', savedDarkMode);

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
  };

  const services = [
    {
      icon: <Globe className="w-8 h-8 text-emerald-600" />,
      title: "Global Sourcing",
      description: "We source premium agricultural products from trusted suppliers worldwide, ensuring quality and reliability."
    },
    {
      icon: <Truck className="w-8 h-8 text-emerald-600" />,
      title: "Logistics & Distribution",
      description: "Our efficient supply chain solutions ensure timely delivery of products to your doorstep."
    },
    {
      icon: <Box className="w-8 h-8 text-emerald-600" />,
      title: "Bulk Order Management",
      description: "Specialized services for large-scale orders with customized packaging solutions."
    },
    {
      icon: <BarChart2 className="w-8 h-8 text-emerald-600" />,
      title: "Market Insights",
      description: "Access to comprehensive market data and trends to help you make informed purchasing decisions."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
      title: "Quality Assurance",
      description: "Rigorous quality control processes to ensure products meet the highest standards."
    },
    {
      icon: <Briefcase className="w-8 h-8 text-emerald-600" />,
      title: "Business Solutions",
      description: "Customized services for restaurants, retailers, and food service providers."
    }
  ];

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${darkMode ? 'dark' : ''}`}>
      <Navbar 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        scrolled={scrolled} 
      />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Services
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            Comprehensive solutions for sourcing, distribution, and supply chain management of premium agricultural products
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our streamlined process ensures efficiency and quality at every step
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Consultation", description: "Understand your requirements" },
              { step: "2", title: "Sourcing", description: "Find the best products for your needs" },
              { step: "3", title: "Logistics", description: "Arrange efficient transportation" },
              { step: "4", title: "Delivery", description: "Receive your order on time" }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to transform your supply chain?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact us today to discuss how our services can benefit your business
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-white text-amber-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
          >
            Get in Touch
          </a>
        </div>
      </section>

      <Footer />
      <BackToTop/>
    </div>
  );
}  