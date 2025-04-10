import { Link } from "wouter";
import { MapPin, Heart } from "lucide-react";
import Rating from "../ui/Rating";
import { Professional } from "@/lib/types";

interface ProfessionalCardProps {
  professional: Professional;
  bookmarkId?: number;
  showProfessionTag?: boolean;
}

const ProfessionalCard = ({ professional, bookmarkId, showProfessionTag = true }: ProfessionalCardProps) => {
  // Simplified version without authentication functionality
  
  // Use first specialization as primary if available
  const primarySpecialization = professional.specializations && professional.specializations.length > 0
    ? professional.specializations[0]
    : "Construction Professional";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 bg-gray-200 relative">
        {professional.profileImage ? (
          <img 
            src={professional.profileImage} 
            alt={professional.companyName || professional.fullName || "Professional"} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-4xl">No Image</span>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white p-1 rounded-full shadow">
          <button 
            className="text-gray-400 hover:text-accent"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.location.href = '/login';
            }}
          >
            <Heart className="text-xl" />
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center mb-2">
          <h3 className="text-xl font-bold mr-2">
            {professional.companyName || professional.fullName || "Professional"}
          </h3>
          {showProfessionTag && (
            <span className="bg-blue-100 text-xs text-primary px-2 py-1 rounded capitalize">
              {professional.profession}
            </span>
          )}
        </div>
        <p className="text-gray-600 mb-3">{primarySpecialization}</p>
        <Rating 
          value={professional.rating} 
          reviewCount={professional.reviewCount} 
          className="mb-4"
        />
        <div className="flex items-center justify-between">
          <span className="text-sm bg-blue-100 text-primary px-3 py-1 rounded-full">
            <MapPin className="inline-block mr-1 h-4 w-4" /> {professional.location}
          </span>
          <Link href={`/professionals/${professional.id}`} className="text-primary font-medium">
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCard;
