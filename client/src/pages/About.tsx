import { Link } from 'wouter';
import { ArrowRight, Globe, Users, Leaf, Award, Shield, Truck, Factory, Sun, Moon } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BackToTop } from '@/components/BackToTop';

export default function About() {
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Check for saved user preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    document.documentElement.classList.toggle('dark', savedDarkMode);

    // Scroll handler
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

  // ... rest of your component code ...
  const teamMembers = [
    {
      name: "John Smith",
      role: "CEO & Founder",
      bio: "With over 25 years in agricultural trade, John established GLUTO to bridge global food markets.",
      image: "/team-john.jpg"
    },
    {
      name: "Maria Garcia",
      role: "Director of Operations",
      bio: "Maria oversees our global supply chain with expertise in logistics and quality control.",
      image: "/team-maria.jpg"
    },
    {
      name: "David Chen",
      role: "Head of Sustainability",
      bio: "David leads our environmental initiatives and sustainable sourcing programs.",
      image: "/team-david.jpg"
    },
    {
      name: "Sarah Johnson",
      role: "Quality Assurance Manager",
      bio: "Sarah ensures all products meet our rigorous international quality standards.",
      image: "/team-sarah.jpg"
    }
  ];

  const milestones = [
    { year: "1995", event: "Company founded in Amsterdam" },
    { year: "2002", event: "Expanded to Asian markets" },
    { year: "2008", event: "Achieved ISO 9001 certification" },
    { year: "2015", event: "Launched sustainability program" },
    { year: "2020", event: "Reached 50+ countries served" }
  ];

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${darkMode ? 'dark' : ''}`}>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} scrolled={scrolled} />
      
      {/* Navigation}

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 text-wave">
              About <span className="text-emerald-600">GLUTO</span> International
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-fade-in">
              Connecting global agriculture since 1995 through quality, sustainability, and innovation
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-gradient">
                Our <span className="text-emerald-600">Story</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 text-fade-in">
                Founded in 1995 in Amsterdam, GLUTO International began as a small trading company specializing in European agricultural products. 
                Our founder, John Smith, recognized the growing need for reliable global food supply chains.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-fade-in">
                Today, we operate in over 50 countries, working directly with farmers, producers, and distributors to bring high-quality food products 
                to markets worldwide while maintaining our commitment to sustainable practices.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-emerald-600 hover:bg-emerald-700 hover:text-glow transition-transform hover:scale-105">
                  Our Sustainability Commitment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" className="border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400 hover:text-glow transition-transform hover:scale-105">
                  Download Company Profile
                </Button>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:scale-[1.02]">
              <img 
                src="/about-story.jpg" 
                alt="GLUTO International early days" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold text-white hover:text-glow">Our Humble Beginnings</h3>
                  <p className="text-emerald-200 hover:text-glow">Amsterdam, 1995</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-bounce">
              Our <span className="text-emerald-600">Journey</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-fade-in">
              Key milestones in our company's history
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden sm:block absolute left-1/2 h-full w-1 bg-emerald-200 dark:bg-emerald-800"></div>
            
            {/* Timeline items */}
            <div className="space-y-8 sm:space-y-16">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`relative flex flex-col sm:flex-row ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'} items-center transition-all duration-500 hover:-translate-y-1`}
                >
                  <div className="flex-shrink-0 w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xl border-4 border-white dark:border-gray-800 shadow-md hover:scale-110 transition-transform">
                    {milestone.year}
                  </div>
                  <div className={`sm:w-1/2 mt-4 sm:mt-0 sm:px-8 ${index % 2 === 0 ? 'sm:text-right' : 'sm:text-left'}`}>
                    <p className="text-lg font-medium text-gray-900 dark:text-white hover:text-glow">
                      {milestone.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-typing">
              Our Core <span className="text-emerald-600">Values</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-fade-in">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="bg-emerald-100 dark:bg-emerald-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-emerald-600 dark:text-emerald-400 hover:text-glow" />
                </div>
                <h3 className="text-xl font-semibold mb-3 hover:text-glow">Integrity</h3>
                <p className="text-gray-600 dark:text-gray-400 text-fade-in">
                  We conduct business with honesty, transparency, and ethical practices at every level.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="bg-emerald-100 dark:bg-emerald-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform">
                  <Leaf className="w-8 h-8 text-emerald-600 dark:text-emerald-400 hover:text-glow" />
                </div>
                <h3 className="text-xl font-semibold mb-3 hover:text-glow">Sustainability</h3>
                <p className="text-gray-600 dark:text-gray-400 text-fade-in">
                  We prioritize environmental stewardship and sustainable sourcing in all operations.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="bg-emerald-100 dark:bg-emerald-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform">
                  <Award className="w-8 h-8 text-emerald-600 dark:text-emerald-400 hover:text-glow" />
                </div>
                <h3 className="text-xl font-semibold mb-3 hover:text-glow">Quality</h3>
                <p className="text-gray-600 dark:text-gray-400 text-fade-in">
                  We maintain the highest standards through rigorous quality control processes.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="bg-emerald-100 dark:bg-emerald-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-emerald-600 dark:text-emerald-400 hover:text-glow" />
                </div>
                <h3 className="text-xl font-semibold mb-3 hover:text-glow">Partnership</h3>
                <p className="text-gray-600 dark:text-gray-400 text-fade-in">
                  We build long-term relationships based on mutual trust and shared success.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-pulse">
              Meet Our <span className="text-emerald-600">Leadership</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-fade-in">
              The experienced professionals guiding GLUTO International
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-emerald-100 dark:border-emerald-900/20 hover:scale-110 transition-transform">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 hover:text-glow">{member.name}</h3>
                  <p className="text-emerald-600 dark:text-emerald-400 mb-4 hover:text-glow">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-fade-in">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400 hover:text-glow transition-transform hover:scale-105">
              View All Team Members
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Global Presence Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-gradient">
                Global <span className="text-emerald-600">Presence</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 text-fade-in">
                With offices in 12 countries and partnerships spanning 50+ nations, GLUTO International has established 
                a truly global network for agricultural trade.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-emerald-100 dark:bg-emerald-900/20 rounded-full p-2 mt-1 hover:scale-110 transition-transform">
                    <Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-400 hover:text-glow" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-800 dark:text-gray-200 font-medium hover:text-glow">Regional Offices</p>
                    <p className="text-gray-600 dark:text-gray-400 text-fade-in">Amsterdam, Singapore, Dubai, Miami, and Johannesburg</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-emerald-100 dark:bg-emerald-900/20 rounded-full p-2 mt-1 hover:scale-110 transition-transform">
                    <Truck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 hover:text-glow" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-800 dark:text-gray-200 font-medium hover:text-glow">Logistics Network</p>
                    <p className="text-gray-600 dark:text-gray-400 text-fade-in">Strategic partnerships with major shipping and logistics providers</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-emerald-100 dark:bg-emerald-900/20 rounded-full p-2 mt-1 hover:scale-110 transition-transform">
                    <Factory className="w-5 h-5 text-emerald-600 dark:text-emerald-400 hover:text-glow" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-800 dark:text-gray-200 font-medium hover:text-glow">Processing Facilities</p>
                    <p className="text-gray-600 dark:text-gray-400 text-fade-in">Owned and partner facilities in key agricultural regions</p>
                  </div>
                </div>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700 hover:text-glow transition-transform hover:scale-105">
                Our Global Network
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:scale-[1.02]">
              <img 
                src="/global-map.jpg" 
                alt="GLUTO International global presence" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold text-white hover:text-glow">Worldwide Reach</h3>
                  <p className="text-emerald-200 hover:text-glow">Serving customers across six continents</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-shake">
            Ready to Partner With Us?
          </h2>
          <p className="text-xl mb-8 text-emerald-100 max-w-3xl mx-auto text-fade-in">
            Whether you're a producer looking for new markets or a buyer seeking reliable suppliers, 
            our team is ready to assist you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 hover:text-glow transition-transform hover:scale-105">
                Contact Our Team
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="accent" className="bg-amber-600 hover:bg-amber-700 hover:text-glow transition-transform hover:scale-105">
                Explore Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - Same as Home page */}
            {/* Footer */}
              <Footer />
      
            {/* Back to Top Button */}
                 <BackToTop />
                                                                 
    </div>
  );
}