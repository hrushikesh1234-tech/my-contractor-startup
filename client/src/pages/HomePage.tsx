import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import SearchBar from "@/components/SearchBar";
import FeaturedSection from "@/components/FeaturedSection";
import { Professional } from "@/lib/types";
import houseImg from "../assets/images/house.png";

const HomePage = () => {
  const { data: featuredContractors = [] } = useQuery<Professional[]>({
    queryKey: ['/api/professionals/featured?type=contractor'],
  });
  
  const { data: featuredArchitects = [] } = useQuery<Professional[]>({
    queryKey: ['/api/professionals/featured?type=architect'],
  });

  return (
    <>
      <Helmet>
        <title>Kamshet.Build - Find the Best Construction Professionals</title>
        <meta name="description" content="Connect with trusted contractors and architects in Kamshet for your construction and design needs" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Helmet>

      {/* Hero Section */}
      <div className="relative py-24 sm:py-32">
        <div className="absolute inset-0">
          <img 
            src={houseImg} 
            alt="Modern luxury house with swimming pool" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-3xl p-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-black font-inter mb-6 drop-shadow-md">
              Find the Best Contractor for Your Dream Project
            </h1>
            <p className="text-xl text-black mb-8 drop-shadow-md">
              Connect with trusted professionals in Kamshet for your construction and design needs
            </p>
            
            {/* Search Bar */}
            <SearchBar />
          </div>
        </div>
      </div>
      
      {/* Featured Contractors */}
      <FeaturedSection 
        title="Featured Contractors"
        professionals={featuredContractors}
        viewAllLink="/professionals?type=contractor"
      />
      
      {/* Featured Architects */}
      <FeaturedSection 
        title="Featured Architects"
        professionals={featuredArchitects}
        viewAllLink="/professionals?type=architect"
        className="bg-gray-50"
      />
      
      {/* Why Choose Us */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 font-inter mb-4">Why Choose Kamshet.Build</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We connect you with the best local construction professionals to bring your project to life
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-[#eff6ff] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-user-check text-2xl text-[#3b82f6]"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Verified Professionals</h3>
            <p className="text-gray-600">
              All contractors and architects on our platform are thoroughly verified for quality and reliability.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-[#eff6ff] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-rupee-sign text-2xl text-[#3b82f6]"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
            <p className="text-gray-600">
              Get clear estimates upfront so you can budget effectively for your construction project.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-[#eff6ff] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-home text-2xl text-[#3b82f6]"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Local Expertise</h3>
            <p className="text-gray-600">
              Our professionals understand Kamshet's terrain, regulations, and building styles.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
