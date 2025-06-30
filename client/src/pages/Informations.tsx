import { FileText, Shield, Truck, Award, Globe, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Informations() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Company Information
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Learn more about GLUTO International, our services, certifications, and commitment to excellence in global trade.
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="quality">Quality</TabsTrigger>
            <TabsTrigger value="logistics">Logistics</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="w-6 h-6 mr-2 text-primary-600" />
                    About GLUTO International
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    GLUTO International Limited is a leading global trading company specializing in high-quality 
                    agricultural products, food and beverages, and specialized nutrition solutions. Established with 
                    a vision to bridge global markets, we connect premium suppliers with discerning customers worldwide.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our extensive network spans across multiple continents, enabling us to source the finest products 
                    from their countries of origin while ensuring consistent quality and competitive pricing.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-6 h-6 mr-2 text-primary-600" />
                    Our Mission & Vision
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Mission</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      To provide premium agricultural and food products to global markets while maintaining the 
                      highest standards of quality, sustainability, and customer service.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Vision</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      To be the world's most trusted partner in international food and agricultural trade, 
                      fostering global food security and economic growth.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Key Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-600">50+</div>
                      <div className="text-gray-600 dark:text-gray-400">Countries Served</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-600">1000+</div>
                      <div className="text-gray-600 dark:text-gray-400">Products</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-600">500+</div>
                      <div className="text-gray-600 dark:text-gray-400">Partners</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-600">15+</div>
                      <div className="text-gray-600 dark:text-gray-400">Years Experience</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="services" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Sourcing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Global sourcing of premium agricultural and food products from certified suppliers.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>• Direct relationships with farmers and producers</li>
                    <li>• Quality assessment and verification</li>
                    <li>• Competitive pricing negotiations</li>
                    <li>• Seasonal availability planning</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Supply Chain Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    End-to-end supply chain solutions ensuring efficient and timely delivery.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>• Inventory management</li>
                    <li>• Logistics coordination</li>
                    <li>• Customs and documentation</li>
                    <li>• Real-time tracking</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quality Control</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Comprehensive quality assurance programs to ensure product excellence.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>• Pre-shipment inspections</li>
                    <li>• Laboratory testing</li>
                    <li>• Certification verification</li>
                    <li>• Compliance monitoring</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quality" className="mt-8">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-6 h-6 mr-2 text-primary-600" />
                    Quality Standards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    At GLUTO International, quality is not just a commitment—it's our foundation. We maintain 
                    rigorous quality standards throughout our supply chain to ensure that every product meets 
                    international specifications and customer expectations.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Quality Control Process</h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li>• Supplier qualification and auditing</li>
                        <li>• Raw material inspection</li>
                        <li>• Production monitoring</li>
                        <li>• Pre-shipment quality verification</li>
                        <li>• Customer feedback integration</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Testing Standards</h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li>• Microbiological testing</li>
                        <li>• Chemical residue analysis</li>
                        <li>• Nutritional content verification</li>
                        <li>• Physical quality assessment</li>
                        <li>• Packaging integrity checks</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Food Safety Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    We adhere to international food safety standards and maintain comprehensive traceability 
                    throughout our supply chain.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Award className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                      <h5 className="font-semibold">HACCP Certified</h5>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Award className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                      <h5 className="font-semibold">ISO 22000</h5>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Award className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                      <h5 className="font-semibold">BRC Compliant</h5>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="logistics" className="mt-8">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="w-6 h-6 mr-2 text-primary-600" />
                    Global Logistics Network
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Our sophisticated logistics network ensures efficient and cost-effective transportation 
                    of products from origin to destination, maintaining product integrity throughout the journey.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Transportation Modes</h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li>• Ocean freight (FCL/LCL)</li>
                        <li>• Air freight for urgent shipments</li>
                        <li>• Land transportation</li>
                        <li>• Intermodal solutions</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Warehousing</h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li>• Temperature-controlled facilities</li>
                        <li>• Strategic global locations</li>
                        <li>• Inventory management systems</li>
                        <li>• Cross-docking capabilities</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Documentation</h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li>• Export/import documentation</li>
                        <li>• Customs clearance</li>
                        <li>• Insurance coverage</li>
                        <li>• Certificate of origin</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lead Times by Region</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h5 className="font-semibold">North America</h5>
                      <p className="text-primary-600 font-bold">14-21 days</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h5 className="font-semibold">Europe</h5>
                      <p className="text-primary-600 font-bold">18-25 days</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h5 className="font-semibold">Asia</h5>
                      <p className="text-primary-600 font-bold">10-18 days</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h5 className="font-semibold">Africa</h5>
                      <p className="text-primary-600 font-bold">21-35 days</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="certifications" className="mt-8">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-primary-600" />
                    Certifications & Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    GLUTO International maintains various certifications and compliances to ensure we meet 
                    international standards and regulatory requirements across all our operations.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="border-primary-200 dark:border-primary-800">
                      <CardContent className="p-4 text-center">
                        <Award className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                        <h4 className="font-semibold mb-2">ISO 22000</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Food Safety Management System certification ensuring systematic approach to food safety.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-primary-200 dark:border-primary-800">
                      <CardContent className="p-4 text-center">
                        <Award className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                        <h4 className="font-semibold mb-2">HACCP</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Hazard Analysis Critical Control Points system for food safety management.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-primary-200 dark:border-primary-800">
                      <CardContent className="p-4 text-center">
                        <Award className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                        <h4 className="font-semibold mb-2">BRC Global Standards</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          British Retail Consortium certification for food safety and quality.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-primary-200 dark:border-primary-800">
                      <CardContent className="p-4 text-center">
                        <Award className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                        <h4 className="font-semibold mb-2">Organic Certification</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          USDA Organic and EU Organic certifications for organic product lines.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-primary-200 dark:border-primary-800">
                      <CardContent className="p-4 text-center">
                        <Award className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                        <h4 className="font-semibold mb-2">Fair Trade</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Fair Trade certification ensuring ethical sourcing practices.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-primary-200 dark:border-primary-800">
                      <CardContent className="p-4 text-center">
                        <Award className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                        <h4 className="font-semibold mb-2">Kosher & Halal</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Religious dietary certifications for specialized market requirements.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regulatory Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">International Standards</h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li>• FDA (United States)</li>
                        <li>• EFSA (European Union)</li>
                        <li>• Health Canada</li>
                        <li>• FSANZ (Australia/New Zealand)</li>
                        <li>• FSSAI (India)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Trade Compliance</h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li>• WTO trade agreements</li>
                        <li>• Customs union regulations</li>
                        <li>• Anti-dumping compliance</li>
                        <li>• Sanctions screening</li>
                        <li>• Export/import licensing</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
