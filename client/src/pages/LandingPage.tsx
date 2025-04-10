import { Link } from "wouter";
import { Search, ArrowRight, Shield, Contact, DollarSign, Building2 } from "lucide-react";
import { useState } from "react";
import ProfessionalCard from "../components/professionals/ProfessionalCard";
import { useFeaturedProfessionals } from "../hooks/useProfessionals";

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [profession, setProfession] = useState("");
  
  const { data: featuredContractors, isLoading: loadingContractors } = useFeaturedProfessionals("contractor", 3);
  const { data: featuredArchitects, isLoading: loadingArchitects } = useFeaturedProfessionals("architect", 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to professionals page with search params
    window.location.href = `/professionals?search=${searchTerm}${profession ? `&profession=${profession}` : ''}`;
  };

  return (
    <>
      {/* Hero Section */}
      <div className="hero-bg h-[500px] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-black/60">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Find the Best Contractor for Your Dream Project</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Connect with trusted local contractors and architects in Kamshet for your construction needs</p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="bg-white rounded-lg p-4 shadow-lg max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input 
                  type="text" 
                  placeholder="What are you looking for?" 
                  className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="md:w-1/4">
                <select 
                  className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                >
                  <option value="">All Professionals</option>
                  <option value="contractor">Contractors</option>
                  <option value="architect">Architects</option>
                </select>
              </div>
              <button type="submit" className="bg-accent hover:bg-accent-dark text-white font-medium px-6 py-3 rounded transition">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Featured Contractors Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Contractors</h2>
          <Link href="/professionals?profession=contractor" className="text-primary font-medium flex items-center">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        {loadingContractors ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-3 w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-1/4"></div>
                  <div className="flex items-center justify-between">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : featuredContractors && featuredContractors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredContractors.map(contractor => (
              <ProfessionalCard key={contractor.id} professional={contractor} />
            ))}
          </div>
        ) : (
          <p className="text-center py-8 text-gray-500">No featured contractors available.</p>
        )}
      </div>
      
      {/* Featured Architects Section */}
      <div className="container mx-auto px-4 py-12 bg-gray-50">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Architects</h2>
          <Link href="/professionals?profession=architect" className="text-primary font-medium flex items-center">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        {loadingArchitects ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-3 w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-1/4"></div>
                  <div className="flex items-center justify-between">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : featuredArchitects && featuredArchitects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArchitects.map(architect => (
              <ProfessionalCard key={architect.id} professional={architect} />
            ))}
          </div>
        ) : (
          <p className="text-center py-8 text-gray-500">No featured architects available.</p>
        )}
      </div>
      
      {/* Why Choose Us Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Kamshet Platform</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-3xl text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Professionals</h3>
              <p className="text-gray-600">All contractors and architects on our platform are thoroughly vetted and verified.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Contact className="text-3xl text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Dedicated Support</h3>
              <p className="text-gray-600">Our team is available to help you connect with the right professional for your project.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="text-3xl text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Transparent Pricing</h3>
              <p className="text-gray-600">Get clear quotes and budgets upfront with no hidden fees or surprises.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
