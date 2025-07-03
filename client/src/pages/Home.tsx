import { Link } from 'wouter';
import { ArrowRight, Globe, Truck, Shield, Star, Menu, X, Sun, Moon, ChevronRight, Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState, useEffect, useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BackToTop } from '@/components/BackToTop';


export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const statsRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero slider data
  const slides = [
    {
      image: "../src/assets/freshly-ripe-vegetables-wooden-crate.jpg",
      title: "Premium Agricultural Products",
      subtitle: "Global sourcing of the highest quality produce",
      description: "Sourcing directly from trusted farms worldwide to bring you the freshest products"
    },
    {
      image: "../src/assets/biologist-forest.jpg",
      title: "Sustainable Food Solutions",
      subtitle: "Ethically sourced, environmentally conscious",
      description: "Committed to sustainable practices throughout our supply chain"
    },
    {
      image: "../src/assets/warehouse-employees.jpg",
      title: "Reliable Global Distribution",
      subtitle: "Efficient logistics network",
      description: "Temperature-controlled shipping with real-time tracking"
    }
  ];

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Scroll and dark mode effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      setShowBackToTop(window.scrollY > 300);
      
      // Animate stats when they come into view
      if (statsRef.current) {
        const rect = statsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          startCountAnimation();
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Counter animation for stats
  const startCountAnimation = () => {
    const statElements = document.querySelectorAll('.stat-number');
    const durations = [3000, 2500, 2000, 3500];
    const targetValues = [25, 50, 200, 5000];
    
    statElements.forEach((el, index) => {
      const duration = durations[index];
      const target = targetValues[index];
      const start = 0;
      const increment = target / (duration / 16);
      let current = start;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          clearInterval(timer);
          current = target;
        }
        el.textContent = Math.floor(current) + (index === 3 ? '+' : '+');
      }, 16);
    });
  };

  return (
  <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${darkMode ? 'dark' : ''}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} scrolled={scrolled} />
      {/* Hero Slider Section */}
      <section className="relative h-screen max-h-[800px] overflow-hidden">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-black/30"></div>
            <img 
              src={slide.image} 
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-white transform transition-all duration-1000">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-wave">
                  <span className="text-white">{slide.title}</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-emerald-100 text-fade-in">
                  {slide.subtitle}
                </p>
                <p className="text-lg mb-10 text-emerald-200 text-pulse">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/products">
                    <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 hover:text-glow transition-transform hover:scale-105">
                      Explore Products
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg"  className="bg-amber-600 hover:bg-amber-700 hover:text-glow transition-transform hover:scale-105">
                      Contact Our Team
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slider indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-6' : 'bg-white/50'} hover:scale-125`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-700 transition-all duration-500 hover:scale-105">
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 stat-number text-bounce">0+</p>
              <p className="text-gray-600 dark:text-gray-300">Years Experience</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-700 transition-all duration-500 hover:scale-105">
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 stat-number text-bounce">0+</p>
              <p className="text-gray-600 dark:text-gray-300">Countries Served</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-700 transition-all duration-500 hover:scale-105">
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 stat-number text-bounce">0+</p>
              <p className="text-gray-600 dark:text-gray-300">Product Varieties</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-700 transition-all duration-500 hover:scale-105">
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 stat-number text-bounce">0+</p>
              <p className="text-gray-600 dark:text-gray-300">Satisfied Clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="transition-all duration-500 hover:-translate-y-1">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-gradient">
                About <span className="text-emerald-600">GLUTO International</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 text-fade-in">
                Founded in 1995, GLUTO International has grown to become a leading global supplier of premium agricultural products and food solutions. 
                Our commitment to quality, sustainability, and customer satisfaction sets us apart in the industry.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-fade-in">
                We specialize in sourcing, processing, and distributing high-quality food products to markets worldwide, ensuring the highest standards 
                of food safety and quality control throughout our supply chain.
              </p>
              <Link href="/about">
                <Button className="bg-emerald-600 hover:bg-emerald-700 hover:text-glow transition-transform hover:scale-105">
                  Learn More About Us
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:scale-[1.02]">
              <img 
                src="../src/assets/about-us.jpg" 
                alt="GLUTO International Team" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold text-white hover:text-glow">Our Global Team</h3>
                  <p className="text-emerald-200 hover:text-glow">Dedicated professionals ensuring quality at every step</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 hover:text-glow">
              Why Choose <span className="text-emerald-600">GLUTO</span> International?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-fade-in">
              We provide comprehensive solutions for all your agricultural and food product needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="bg-emerald-100 dark:bg-emerald-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform">
                  <Globe className="w-8 h-8 text-emerald-600 dark:text-emerald-400 hover:text-glow" />
                </div>
                <h3 className="text-xl font-semibold mb-3 hover:text-glow">Global Sourcing Network</h3>
                <p className="text-gray-600 dark:text-gray-400 text-fade-in">
                  Direct partnerships with farmers and producers across 50+ countries ensuring premium quality at competitive prices.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="bg-emerald-100 dark:bg-emerald-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-emerald-600 dark:text-emerald-400 hover:text-glow" />
                </div>
                <h3 className="text-xl font-semibold mb-3 hover:text-glow">Quality Assurance</h3>
                <p className="text-gray-600 dark:text-gray-400 text-fade-in">
                  Rigorous quality control processes and certifications including ISO, HACCP, and GlobalG.A.P.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="bg-emerald-100 dark:bg-emerald-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform">
                  <Truck className="w-8 h-8 text-emerald-600 dark:text-emerald-400 hover:text-glow" />
                </div>
                <h3 className="text-xl font-semibold mb-3 hover:text-glow">Reliable Logistics</h3>
                <p className="text-gray-600 dark:text-gray-400 text-fade-in">
                  Temperature-controlled supply chain with real-time tracking for perishable goods.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="bg-emerald-100 dark:bg-emerald-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform">
                  <Star className="w-8 h-8 text-emerald-600 dark:text-emerald-400 hover:text-glow" />
                </div>
                <h3 className="text-xl font-semibold mb-3 hover:text-glow">Custom Solutions</h3>
                <p className="text-gray-600 dark:text-gray-400 text-fade-in">
                  Tailored product specifications, packaging, and logistics to meet your exact requirements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-pulse">
              Our <span className="text-emerald-600">Product</span> Categories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-fade-in">
              Comprehensive range of premium agricultural products and food solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="bg-emerald-100 dark:bg-emerald-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/20 transition-colors hover:scale-110">
                  <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors hover:text-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-emerald-600 dark:text-emerald-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors hover:text-glow">
                  Fresh Produce
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-fade-in">
                  Premium quality fresh fruits, vegetables, herbs and more from trusted global suppliers.
                </p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                  <li className="flex items-center hover:text-glow"><ChevronRight className="w-4 h-4 mr-2 text-emerald-500 hover:text-glow" /> Tropical Fruits</li>
                  <li className="flex items-center hover:text-glow"><ChevronRight className="w-4 h-4 mr-2 text-emerald-500 hover:text-glow" /> Organic Vegetables</li>
                  <li className="flex items-center hover:text-glow"><ChevronRight className="w-4 h-4 mr-2 text-emerald-500 hover:text-glow" /> Fresh Herbs</li>
                  <li className="flex items-center hover:text-glow"><ChevronRight className="w-4 h-4 mr-2 text-emerald-500 hover:text-glow" /> Exotic Varieties</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="bg-emerald-100 dark:bg-emerald-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/20 transition-colors hover:scale-110">
                  <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors hover:text-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-emerald-600 dark:text-emerald-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors hover:text-glow">
                  Processed Foods
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-fade-in">
                  High-quality processed and packaged food products for retail and food service.
                </p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                  <li className="flex items-center hover:text-glow"><ChevronRight className="w-4 h-4 mr-2 text-emerald-500 hover:text-glow" /> Frozen Fruits & Vegetables</li>
                  <li className="flex items-center hover:text-glow"><ChevronRight className="w-4 h-4 mr-2 text-emerald-500 hover:text-glow" /> Canned Goods</li>
                  <li className="flex items-center hover:text-glow"><ChevronRight className="w-4 h-4 mr-2 text-emerald-500 hover:text-glow" /> Dried Fruits & Nuts</li>
                  <li className="flex items-center hover:text-glow"><ChevronRight className="w-4 h-4 mr-2 text-emerald-500 hover:text-glow" /> Specialty Ingredients</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="bg-emerald-100 dark:bg-emerald-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/20 transition-colors hover:scale-110">
                  <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors hover:text-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-emerald-600 dark:text-emerald-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors hover:text-glow">
                  Protein Products
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-fade-in">
                  Premium quality meat, poultry, seafood and plant-based protein sources.
                </p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                  <li className="flex items-center hover:text-glow"><ChevronRight className="w-4 h-4 mr-2 text-emerald-500 hover:text-glow" /> Fresh & Frozen Meat</li>
                  <li className="flex items-center hover:text-glow"><ChevronRight className="w-4 h-4 mr-2 text-emerald-500 hover:text-glow" /> Poultry Products</li>
                  <li className="flex items-center hover:text-glow"><ChevronRight className="w-4 h-4 mr-2 text-emerald-500 hover:text-glow" /> Seafood</li>
                  <li className="flex items-center hover:text-glow"><ChevronRight className="w-4 h-4 mr-2 text-emerald-500 hover:text-glow" /> Plant-Based Proteins</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/catalogue">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 hover:text-glow transition-transform hover:scale-105">
                View Full Catalogue
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 transition-all duration-500 hover:-translate-y-1">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-typing">
                Our <span className="text-emerald-600">Sustainability</span> Commitment
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 text-fade-in">
                At GLUTO International, we're committed to sustainable and ethical sourcing practices that protect the environment 
                and support farming communities worldwide.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-emerald-100 dark:bg-emerald-900/20 rounded-full p-2 mt-1 hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 hover:text-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-800 dark:text-gray-200 font-medium hover:text-glow">Ethical Sourcing</p>
                    <p className="text-gray-600 dark:text-gray-400 text-fade-in">Fair trade partnerships with smallholder farmers</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-emerald-100 dark:bg-emerald-900/20 rounded-full p-2 mt-1 hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 hover:text-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-800 dark:text-gray-200 font-medium hover:text-glow">Reduced Carbon Footprint</p>
                    <p className="text-gray-600 dark:text-gray-400 text-fade-in">Optimized logistics and sustainable packaging</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-emerald-100 dark:bg-emerald-900/20 rounded-full p-2 mt-1 hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 hover:text-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-800 dark:text-gray-200 font-medium hover:text-glow">Waste Reduction</p>
                    <p className="text-gray-600 dark:text-gray-400 text-fade-in">Efficient processing and by-product utilization</p>
                  </div>
                </div>
              </div>
              <Link href="/sustainability">
                <Button className="bg-emerald-600 hover:bg-emerald-700 hover:text-glow transition-transform hover:scale-105">
                  Our Sustainability Initiatives
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:scale-[1.02]">
              <img 
                src="../src/assets/sustainability.jpg" 
                alt="Sustainable Farming" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold text-white hover:text-glow">Sustainable Farming</h3>
                  <p className="text-emerald-200 hover:text-glow">Partnering with farms that prioritize environmental stewardship</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-bounce">
              What Our <span className="text-emerald-600">Clients</span> Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-fade-in">
              Trusted by businesses worldwide for quality and reliability
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400 hover:scale-110 transition-transform" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 italic mb-6 text-fade-in">
                  "GLUTO International has been our trusted supplier for over a decade. Their quality control is unmatched in the industry and their team's expertise has helped us expand our product line significantly."
                </p>
                <div className="flex items-center">
                  <div className="bg-emerald-100 dark:bg-emerald-900/20 w-12 h-12 rounded-full flex items-center justify-center mr-4 hover:scale-110 transition-transform">
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium hover:text-glow">JD</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 hover:text-glow">John Doe</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-fade-in">CEO, FreshFoods Inc. (USA)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400 hover:scale-110 transition-transform" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 italic mb-6 text-fade-in">
                  "Their logistics network ensures we get our products on time, every time. The temperature-controlled shipping is perfect for our perishable goods. Highly recommended!"
                </p>
                <div className="flex items-center">
                  <div className="bg-emerald-100 dark:bg-emerald-900/20 w-12 h-12 rounded-full flex items-center justify-center mr-4 hover:scale-110 transition-transform">
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium hover:text-glow">AS</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 hover:text-glow">Anna Smith</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-fade-in">Procurement Manager, Global Foods (UK)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400 hover:scale-110 transition-transform" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 italic mb-6 text-fade-in">
                  "The team at GLUTO understands our needs and provides customized solutions that work for our business. Their sustainable sourcing aligns perfectly with our brand values."
                </p>
                <div className="flex items-center">
                  <div className="bg-emerald-100 dark:bg-emerald-900/20 w-12 h-12 rounded-full flex items-center justify-center mr-4 hover:scale-110 transition-transform">
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium hover:text-glow">MJ</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 hover:text-glow">Michael Johnson</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-fade-in">Director, AgriTrading Co. (Australia)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-shake">Ready to Partner With Us?</h2>
          <p className="text-xl mb-8 text-emerald-100 max-w-3xl mx-auto text-fade-in">
            Whether you're looking for reliable suppliers or need customized food solutions, our team is ready to assist you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 hover:text-glow transition-transform hover:scale-105">
                Contact Our Team
              </Button>
            </Link>
            <Link href="/catalogue">
              <Button size="lg"  className="bg-amber-600 hover:bg-amber-700 hover:text-glow transition-transform hover:scale-105">
                Browse Catalogue
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
        <Footer />

      {/* Back to Top Button */}
           <BackToTop />

    </div>
  );
}