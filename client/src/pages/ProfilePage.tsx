import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ProfessionalCard from "@/components/ProfessionalCard";
import { Professional } from "@/lib/types";

const ProfilePage = () => {
  const { isAuthenticated, user } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  // Fetch bookmarked professionals
  const { data: bookmarkedProfessionals = [] } = useQuery<Professional[]>({
    queryKey: ['/api/user/bookmarks'],
    enabled: isAuthenticated,
  });
  
  // Fetch user profile data
  const { data: userProfile } = useQuery({
    queryKey: ['/api/user/profile'],
    enabled: isAuthenticated,
  });
  
  // Split bookmarked professionals by profession
  const bookmarkedContractors = bookmarkedProfessionals.filter(p => p.profession === 'contractor');
  const bookmarkedArchitects = bookmarkedProfessionals.filter(p => p.profession === 'architect');
  
  if (!isAuthenticated) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="bg-gray-50 py-12">
      <Helmet>
        <title>My Profile | Kamshet.Build</title>
        <meta name="description" content="Manage your Kamshet.Build profile, bookmarks, and account settings" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </Helmet>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Account</h1>
        
        <Tabs defaultValue="profile" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  {userProfile?.avatarUrl ? (
                    <img src={userProfile.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                      <i className="fas fa-user text-3xl"></i>
                    </div>
                  )}
                </div>
                
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">{userProfile?.fullName || 'User'}</h2>
                  <p className="text-gray-600">{userProfile?.email}</p>
                  <p className="text-gray-600 mt-1">Member since {userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString() : 'N/A'}</p>
                </div>
                
                <div className="md:ml-auto">
                  <Button variant="kamshetOutline" onClick={() => setActiveTab("settings")}>
                    Edit Profile
                  </Button>
                </div>
              </div>
              
              {(user?.userType === 'contractor' || user?.userType === 'architect') && (
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Professional Profile</h3>
                  <p className="text-gray-600 mb-4">
                    Manage your professional information, portfolio, and visibility to potential clients.
                  </p>
                  <Button variant="kamshet">
                    Manage Professional Profile
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Bookmarks Tab */}
          <TabsContent value="bookmarks">
            <div className="bg-white rounded-lg shadow-md p-6">
              <Tabs defaultValue="contractors">
                <div className="flex justify-between items-center mb-6">
                  <TabsList>
                    <TabsTrigger value="contractors">Contractors</TabsTrigger>
                    <TabsTrigger value="architects">Architects</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="contractors">
                  {bookmarkedContractors.length > 0 ? (
                    <div className="space-y-6">
                      {bookmarkedContractors.map(contractor => (
                        <ProfessionalCard key={contractor.id} professional={contractor} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        <i className="far fa-bookmark text-5xl"></i>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">No bookmarked contractors</h3>
                      <p className="text-gray-600 mb-6">
                        You haven't bookmarked any contractors yet. Browse our listings and save your favorites!
                      </p>
                      <Button variant="kamshet" onClick={() => navigate("/professionals?type=contractor")}>
                        Browse Contractors
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="architects">
                  {bookmarkedArchitects.length > 0 ? (
                    <div className="space-y-6">
                      {bookmarkedArchitects.map(architect => (
                        <ProfessionalCard key={architect.id} professional={architect} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        <i className="far fa-bookmark text-5xl"></i>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">No bookmarked architects</h3>
                      <p className="text-gray-600 mb-6">
                        You haven't bookmarked any architects yet. Browse our listings and save your favorites!
                      </p>
                      <Button variant="kamshet" onClick={() => navigate("/professionals?type=architect")}>
                        Browse Architects
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Account Settings</h2>
              
              <div className="space-y-6">
                {/* Personal Information */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input 
                        type="text" 
                        id="fullName" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:outline-none"
                        defaultValue={userProfile?.fullName || ''}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:outline-none"
                        defaultValue={userProfile?.email || ''}
                        disabled
                      />
                      <p className="mt-1 text-sm text-gray-500">Email address cannot be changed</p>
                    </div>
                  </div>
                </div>
                
                {/* Password Management */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Password Management</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input 
                        type="password" 
                        id="newPassword" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:outline-none"
                        placeholder="Enter new password"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input 
                        type="password" 
                        id="confirmPassword" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:outline-none"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Notification Preferences */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Notification Preferences</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="emailNotifs" 
                        className="h-4 w-4 text-[#3b82f6] focus:ring-[#3b82f6] border-gray-300 rounded"
                        defaultChecked
                      />
                      <label htmlFor="emailNotifs" className="ml-2 block text-sm text-gray-700">
                        Receive email notifications
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="marketingEmails" 
                        className="h-4 w-4 text-[#3b82f6] focus:ring-[#3b82f6] border-gray-300 rounded"
                        defaultChecked
                      />
                      <label htmlFor="marketingEmails" className="ml-2 block text-sm text-gray-700">
                        Receive marketing emails and updates
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 pt-6">
                  <Button variant="outline" onClick={() => setActiveTab("profile")}>
                    Cancel
                  </Button>
                  <Button variant="kamshet">
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
