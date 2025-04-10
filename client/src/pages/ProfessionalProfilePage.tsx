import { useParams, Link } from "wouter";
import { useState } from "react";
import { MapPin, Heart, MessageCircle } from "lucide-react";
import Rating from "../components/ui/Rating";
import ReviewItem from "../components/professionals/ReviewItem";
import ProjectCard from "../components/projects/ProjectCard";
import { useProfessional, useProfessionalReviews } from "../hooks/useProfessionals";
import { useCreateBookmark, useDeleteBookmark, useBookmarks } from "../hooks/useBookmarks";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const ProfessionalProfilePage = () => {
  const { id } = useParams();
  const { data: professional, isLoading: loadingProfessional } = useProfessional(id);
  const { data: reviews, isLoading: loadingReviews } = useProfessionalReviews(id);
  const { data: bookmarks } = useBookmarks();
  const createBookmark = useCreateBookmark();
  const deleteBookmark = useDeleteBookmark();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  // Check if professional is bookmarked
  const bookmarkEntry = bookmarks?.find(b => b.professional.id === Number(id));
  const isBookmarked = !!bookmarkEntry;
  
  const handleBookmarkToggle = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to bookmark professionals",
        variant: "destructive",
      });
      return;
    }

    if (isBookmarked && bookmarkEntry) {
      deleteBookmark.mutate(bookmarkEntry.bookmarkId);
    } else if (!isBookmarked && professional) {
      createBookmark.mutate(professional.id);
    }
  };

  if (loadingProfessional) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-pulse">
          <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-6"></div>
          <div className="flex gap-4">
            <div className="h-10 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!professional) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Professional Not Found</h2>
          <p className="text-gray-600 mb-6">The professional you're looking for doesn't exist or has been removed.</p>
          <Link href="/professionals" className="text-primary font-medium">
            Browse All Professionals
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 mb-6 md:mb-0">
            {professional.profileImage ? (
              <img 
                src={professional.profileImage} 
                alt={professional.companyName || professional.fullName || "Professional"} 
                className="w-40 h-40 object-cover rounded-lg mx-auto md:mx-0"
              />
            ) : (
              <div className="w-40 h-40 bg-gray-200 rounded-lg flex items-center justify-center mx-auto md:mx-0">
                <span className="text-gray-400 text-lg">No Image</span>
              </div>
            )}
          </div>
          
          <div className="md:w-3/4 md:pl-8">
            <div className="flex flex-wrap items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-1">
                  {professional.companyName || professional.fullName}
                </h1>
                <p className="text-gray-600 mb-2">
                  {professional.specializations?.[0] || professional.profession}
                </p>
                <Rating 
                  value={professional.rating}
                  reviewCount={professional.reviewCount}
                  className="mb-2"
                />
              </div>
              
              <div className="flex gap-2 mt-2 md:mt-0">
                <button
                  onClick={handleBookmarkToggle}
                  className={`px-4 py-2 border ${isBookmarked ? 'bg-accent text-white border-accent' : 'border-gray-300 text-gray-600'} rounded flex items-center hover:bg-gray-50`}
                >
                  <Heart className={`mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                  {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                </button>
                <button className="px-4 py-2 bg-accent text-white rounded flex items-center hover:bg-accent-dark">
                  <MessageCircle className="mr-2" /> Contact
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <span className="text-gray-600 text-sm">Location</span>
                <p className="font-medium">{professional.location}, Maharashtra</p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">Experience</span>
                <p className="font-medium">{professional.experience} Years</p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">Phone</span>
                <p className="font-medium">{professional.phone}</p>
              </div>
            </div>
            
            {professional.specializations && professional.specializations.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-2">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {professional.specializations.map((specialization, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-primary rounded-full text-sm">
                      {specialization}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* About Section */}
      {professional.about && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <p className="text-gray-600 mb-4">{professional.about}</p>
        </div>
      )}
      
      {/* Portfolio Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Portfolio</h2>
          {professional.projects && professional.projects.length > 4 && (
            <Link href={`/professionals/${professional.id}/projects`} className="text-primary font-medium">
              View All Projects
            </Link>
          )}
        </div>
        
        {professional.projects && professional.projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {professional.projects.slice(0, 4).map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No portfolio projects available.</p>
        )}
      </div>
      
      {/* Reviews Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Client Reviews</h2>
        
        {loadingReviews ? (
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="border-b pb-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/5 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-1 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : reviews && reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.slice(0, 3).map(review => (
              <ReviewItem key={review.id} review={review} />
            ))}
            
            {reviews.length > 3 && (
              <div className="mt-6 text-center">
                <Link href={`/professionals/${professional.id}/reviews`} className="text-primary font-medium">
                  Read all {professional.reviewCount} reviews
                </Link>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfessionalProfilePage;
