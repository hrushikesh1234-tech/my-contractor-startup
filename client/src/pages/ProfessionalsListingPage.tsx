import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import SearchBar from "@/components/SearchBar";
import ProfessionalCard from "@/components/ProfessionalCard";
import { Professional } from "@/lib/types";

const ProfessionalsListingPage = () => {
  const [location, setLocation] = useState('');
  const [professionalType, setProfessionalType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useLocation();
  const queryParams = new URLSearchParams(searchParams.split('?')[1] || '');
  
  useEffect(() => {
    const locParam = queryParams.get('location');
    const typeParam = queryParams.get('type');
    if (locParam) setLocation(locParam);
    if (typeParam) setProfessionalType(typeParam);
    setCurrentPage(1);
  }, [searchParams]);

  const buildApiUrl = () => {
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (professionalType) params.append('type', professionalType);
    params.append('page', currentPage.toString());
    
    const keyword = queryParams.get('keyword');
    const budget = queryParams.get('budget');
    if (keyword) params.append('keyword', keyword);
    if (budget) params.append('budget', budget);
    
    return `/api/professionals?${params.toString()}`;
  };

  const { data: professionalsData } = useQuery<{
    professionals: Professional[],
    totalPages: number,
    totalCount: number
  }>({
    queryKey: [buildApiUrl()],
  });

  const professionals = professionalsData?.professionals || [];
  const totalPages = professionalsData?.totalPages || 1;
  const totalCount = professionalsData?.totalCount || 0;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const clearFilter = (filter: string) => {
    if (filter === 'location') setLocation('');
    if (filter === 'type') setProfessionalType('');
    if (filter === 'all') {
      setLocation('');
      setProfessionalType('');
    }
  };

  const titleText = professionalType 
    ? `${professionalType.charAt(0).toUpperCase() + professionalType.slice(1)}s in ${location ? location.charAt(0).toUpperCase() + location.slice(1) : 'Kamshet'}`
    : `Professionals in ${location ? location.charAt(0).toUpperCase() + location.slice(1) : 'Kamshet'}`;

  return (
    <div className="bg-gray-50 py-8">
      <Helmet>
        <title>{titleText} | Kamshet.Build</title>
        <meta name="description" content={`Find the best ${professionalType || 'construction professionals'} in ${location || 'Kamshet'} for your project`} />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </Helmet>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filters */}
        <SearchBar compact className="mb-8" />
        
        {/* Active Filters */}
        {(location || professionalType) && (
          <div className="mt-4 flex flex-wrap gap-2 mb-6">
            {location && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                {location.charAt(0).toUpperCase() + location.slice(1)} 
                <button 
                  className="ml-1 text-gray-500 hover:text-gray-700"
                  onClick={() => clearFilter('location')}
                  aria-label="Remove location filter"
                >
                  <i className="fas fa-times"></i>
                </button>
              </span>
            )}
            
            {professionalType && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                {professionalType.charAt(0).toUpperCase() + professionalType.slice(1)} 
                <button 
                  className="ml-1 text-gray-500 hover:text-gray-700"
                  onClick={() => clearFilter('type')}
                  aria-label="Remove professional type filter"
                >
                  <i className="fas fa-times"></i>
                </button>
              </span>
            )}
            
            <button 
              className="text-[#3b82f6] hover:text-[#2563eb] text-sm font-medium"
              onClick={() => clearFilter('all')}
            >
              Clear All
            </button>
          </div>
        )}
        
        {/* Results Title */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 font-inter">
            {titleText} ({totalCount})
          </h1>
        </div>
        
        {/* Results List */}
        <div className="space-y-6">
          {professionals.length > 0 ? (
            professionals.map((professional) => (
              <ProfessionalCard key={professional.id} professional={professional} />
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-600">No professionals found matching your criteria.</p>
              <p className="mt-2">Try adjusting your filters or search terms.</p>
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="inline-flex rounded-md shadow">
                <button 
                  className={`px-4 py-2 ${currentPage === 1 ? 'bg-gray-200 text-gray-500' : 'bg-white text-gray-800 hover:bg-gray-100'} rounded-l-md`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button 
                    key={page}
                    className={`px-4 py-2 ${page === currentPage ? 'bg-[#3b82f6] text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
                
                <button 
                  className={`px-4 py-2 ${currentPage === totalPages ? 'bg-gray-200 text-gray-500' : 'bg-white text-gray-800 hover:bg-gray-100'} rounded-r-md`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalsListingPage;
