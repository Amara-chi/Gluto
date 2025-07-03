import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BackToTop } from '@/components/BackToTop';
import { 
  Leaf, 
  Droplet, 
  Users, 
  Shield, 
  TrendingUp,
  Globe
} from 'lucide-react';

export default function Sustainability() {
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

  const initiatives = [
    {
      icon: <Leaf className="w-8 h-8 text-emerald-600" />,
      title: "Regenerative Agriculture",
      description: "Supporting farming practices that restore soil health and biodiversity"
    },
    {
      icon: <Droplet className="w-8 h-8 text-emerald-600" />,
      title: "Water Conservation",
      description: "Implementing water-efficient practices across our supply chain"
    },
    {
      icon: <Users className="w-8 h-8 text-emerald-600" />,
      title: "Fair Trade Partnerships",
      description: "Ensuring fair wages and working conditions for all workers"
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-600" />,
      title: "Organic Certification",
      description: "Prioritizing organic products to reduce chemical use"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-emerald-600" />,
      title: "Carbon Footprint Reduction",
      description: "Minimizing emissions through efficient logistics"
    },
    {
      icon: <Globe className="w-8 h-8 text-emerald-600" />,
      title: "Biodiversity Protection",
      description: "Preserving natural habitats and ecosystems"
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
            Sustainability Commitment
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            Building a resilient and eco-friendly agricultural supply chain for future generations
          </p>
        </div>
      </div>

      {/* Our Approach */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Sustainable Approach
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                At Gluto, we believe that sustainable agriculture is not just an option - 
                it's essential for the health of our planet and future generations.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                We've integrated sustainability into every aspect of our operations, from sourcing 
                practices to distribution. Our commitment extends beyond environmental stewardship 
                to include social responsibility and economic viability for farming communities.
              </p>
              <div className="bg-emerald-600 text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">2030 Sustainability Goals</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">✓</span> 100% traceable supply chain
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span> 50% reduction in carbon footprint
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span> 100% sustainable packaging
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span> Support 500+ smallholder farmers
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96" />
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Key Initiatives
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our comprehensive sustainability program focuses on these core areas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initiatives.map((initiative, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-6">
                  {initiative.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {initiative.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {initiative.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Measuring our progress toward a more sustainable future
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: "85%", label: "Sustainable Sourcing" },
              { value: "120+", label: "Partner Farms" },
              { value: "40%", label: "Carbon Reduction" }
            ].map((stat, index) => (
              <div key={index} className="text-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
                <div className="text-5xl font-bold text-emerald-600 dark:text-emerald-400 mb-3">
                  {stat.value}
                </div>
                <div className="text-xl text-gray-900 dark:text-white">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop/>
    </div>
  );
}