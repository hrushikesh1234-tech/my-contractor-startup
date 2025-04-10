import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardPage = () => {
  const { isAuthenticated, user } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("projects");
  
  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="bg-gray-50 py-12">
      <Helmet>
        <title>Dashboard | Kamshet.Build</title>
        <meta name="description" content="Manage your Kamshet.Build dashboard, projects, and messages" />
      </Helmet>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back, {user?.fullName || 'User'}!
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button variant="outline" className="mr-2">
              View Public Profile
            </Button>
            <Button variant="kamshet">
              {user?.userType === 'customer' ? 'Post a Project' : 'Add New Project'}
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mb-8">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          {/* Projects Tab */}
          <TabsContent value="projects">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample project cards */}
              {[1, 2, 3].map((item) => (
                <Card key={item}>
                  <CardHeader>
                    <CardTitle>Sample Project {item}</CardTitle>
                    <CardDescription>Last updated 3 days ago</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40 bg-gray-200 rounded-md mb-3 flex items-center justify-center text-gray-400">
                      Project Image
                    </div>
                    <p className="text-gray-600 text-sm">
                      This is a sample project description. In the full app, this would show the actual project details.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="kamshet" size="sm">Edit</Button>
                  </CardFooter>
                </Card>
              ))}
              
              {/* Add New Project Card */}
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center h-full py-10">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-800 mb-1">Add a New Project</h3>
                  <p className="text-gray-500 text-sm text-center mb-4">
                    Create a new project or portfolio item
                  </p>
                  <Button variant="kamshet">
                    Create Project
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Messages Tab */}
          <TabsContent value="messages">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Conversations</h2>
                  <Button variant="outline" size="sm">
                    New Message
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="p-4 border rounded-md hover:border-blue-500 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                          <div className="ml-3">
                            <h3 className="font-medium text-gray-800">John Doe</h3>
                            <p className="text-gray-600 text-sm">Sample message preview here...</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-500">2 days ago</span>
                          {item === 1 && (
                            <div className="mt-1">
                              <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">New</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Favorites</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="border rounded-md p-4 flex">
                    <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0"></div>
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-800">Professional Name</h3>
                      <p className="text-gray-600 text-sm">Architect</p>
                      <div className="flex mt-2">
                        <Button variant="outline" size="sm" className="mr-2">View Profile</Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Account Settings</h2>
              
              <div className="space-y-6">
                {/* Profile Section */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Profile Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        defaultValue={user?.fullName || ''}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
                        defaultValue={user?.email || ''}
                        disabled
                      />
                      <p className="mt-1 text-sm text-gray-500">Email address cannot be changed</p>
                    </div>
                  </div>
                </div>
                
                {/* Password Section */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input 
                        type="password" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter current password"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input 
                        type="password" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter new password"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Notification Settings */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Notification Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="emailNotifs" 
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        defaultChecked
                      />
                      <label htmlFor="marketingEmails" className="ml-2 block text-sm text-gray-700">
                        Receive marketing emails and updates
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button variant="outline" className="mr-2">
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

export default DashboardPage;