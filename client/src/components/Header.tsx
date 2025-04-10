import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { isAuthenticated, user } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0a192f] text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left section: Profile icon, Dashboard, Bookmarked links */}
          <div className="flex items-center space-x-4 w-1/5">
            {isAuthenticated && (
              <div className="flex items-center">
                {/* Profile icon */}
                <Link href="/profile" className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                  <User size={18} />
                </Link>
                
                {/* Dashboard and Bookmarked links */}
                <div className="flex ml-4 space-x-4">
                  <Link href="/dashboard" className="text-white hover:text-[#3b82f6] font-medium text-sm">
                    Dashboard
                  </Link>
                  <Link href="/bookmarked" className="text-white hover:text-[#3b82f6] font-medium text-sm">
                    Bookmarked
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          {/* Center section: Logo (centered) */}
          <div className="flex justify-center w-1/4">
            <div className="text-2xl font-bold text-white font-inter">
              Kamshet<span className="text-[#f97316]">.Build</span>
            </div>
          </div>
          
          {/* Right section: Main navigation and auth buttons (increased width) */}
          <div className="flex justify-end items-center w-3/5">
            {/* Navigation Menu - Desktop */}
            <nav className="hidden md:flex items-center">
              <div className="flex space-x-8 mr-6">
                <Link href="/" className={`text-white hover:text-[#3b82f6] font-medium text-sm ${location === "/" ? "text-[#3b82f6]" : ""}`}>
                  Home
                </Link>
                <Link href="/professionals?type=contractor" className={`text-white hover:text-[#3b82f6] font-medium text-sm ${location.includes("professionals") && location.includes("contractor") ? "text-[#3b82f6]" : ""}`}>
                  Contractors
                </Link>
                <Link href="/professionals?type=architect" className={`text-white hover:text-[#3b82f6] font-medium text-sm ${location.includes("professionals") && location.includes("architect") ? "text-[#3b82f6]" : ""}`}>
                  Architects
                </Link>
              </div>
            
              {/* Auth Buttons (always show regardless of auth status) */}
              <div className="flex items-center space-x-2">
                <Link href="/login" className="text-white hover:text-[#3b82f6] font-medium text-sm">
                  Login
                </Link>
                <Link href="/register?type=professional">
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-md rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5">
                    Register as Professional
                  </Button>
                </Link>
              </div>
            </nav>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={toggleMobileMenu} 
                className="text-white hover:text-[#3b82f6]"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {isAuthenticated && (
                <>
                  <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-[#3b82f6] hover:bg-gray-800">
                    Dashboard
                  </Link>
                  <Link href="/bookmarked" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-[#3b82f6] hover:bg-gray-800">
                    Bookmarked
                  </Link>
                </>
              )}
              <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-[#3b82f6] hover:bg-gray-800">
                Home
              </Link>
              <Link href="/professionals?type=contractor" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-[#3b82f6] hover:bg-gray-800">
                Contractors
              </Link>
              <Link href="/professionals?type=architect" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-[#3b82f6] hover:bg-gray-800">
                Architects
              </Link>
              <div className="pt-4 pb-3 border-t border-gray-700">
                <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-[#3b82f6] hover:bg-gray-800">
                  Login
                </Link>
                <Link 
                  href="/register?type=professional" 
                  className="block px-4 py-3 rounded-md text-base font-medium bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 mt-2 shadow-md"
                >
                  Register as Professional
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
