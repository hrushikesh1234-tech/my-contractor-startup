import { useState, FormEvent } from 'react';
import { useLocation } from 'wouter';

interface SearchBarProps {
  className?: string;
  compact?: boolean;
}

const SearchBar = ({ className = '', compact = false }: SearchBarProps) => {
  const [, navigate] = useLocation();
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [professionalType, setProfessionalType] = useState('');
  const [budget, setBudget] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (keyword) params.append('keyword', keyword);
    if (location) params.append('location', location);
    if (professionalType) params.append('type', professionalType);
    if (budget) params.append('budget', budget);
    
    navigate(`/professionals?${params.toString()}`);
  };

  if (compact) {
    return (
      <div className={`bg-white bg-opacity-40 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-md ${className}`}>
        <div className="grid gap-4 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search professionals..." 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full py-3 px-4 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:outline-none" 
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
            </div>
          </div>
          
          <div>
            <select 
              className="w-full py-3 px-4 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:outline-none"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              <option value="kamshet">Kamshet</option>
              <option value="lonavla">Lonavla</option>
              <option value="pune">Pune</option>
            </select>
          </div>
          
          <div>
            <select 
              className="w-full py-3 px-4 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:outline-none"
              value={professionalType}
              onChange={(e) => setProfessionalType(e.target.value)}
            >
              <option value="">All Professionals</option>
              <option value="contractor">Contractors</option>
              <option value="architect">Architects</option>
            </select>
          </div>
          
          <div>
            <button 
              onClick={handleSearch}
              className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white py-3 px-4 rounded-md font-medium transition-colors duration-200"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white bg-opacity-40 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg ${className}`}>
      <form onSubmit={handleSearch}>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="md:col-span-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="What are you looking for? e.g. Bungalow Construction" 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full py-3 px-4 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:outline-none" 
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
            </div>
          </div>
          <div>
            <select 
              className="w-full py-3 px-4 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:outline-none"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Location</option>
              <option value="kamshet">Kamshet</option>
              <option value="lonavla">Lonavla</option>
              <option value="pune">Pune</option>
            </select>
          </div>
          <div>
            <select 
              className="w-full py-3 px-4 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:outline-none"
              value={professionalType}
              onChange={(e) => setProfessionalType(e.target.value)}
            >
              <option value="">Professional Type</option>
              <option value="contractor">Contractor</option>
              <option value="architect">Architect</option>
            </select>
          </div>
          <div>
            <select 
              className="w-full py-3 px-4 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:outline-none"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            >
              <option value="">Budget Range</option>
              <option value="500000-1000000">₹5L - ₹10L</option>
              <option value="1000000-2500000">₹10L - ₹25L</option>
              <option value="2500000-5000000">₹25L - ₹50L</option>
              <option value="5000000-10000000">₹50L - ₹1Cr</option>
              <option value="10000000-50000000">₹1Cr - ₹5Cr</option>
            </select>
          </div>
          <div>
            <button 
              type="submit"
              className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white py-3 px-4 rounded-md font-medium transition-colors duration-200"
            >
              Find Professionals
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
