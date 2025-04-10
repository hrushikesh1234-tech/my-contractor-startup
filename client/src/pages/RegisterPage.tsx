import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Step 1: Account Details Schema
const accountDetailsSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" })
    .regex(/.*[0-9].*/, { message: "Password must contain at least one number" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Step 2: Professional Details Schema
const professionalDetailsSchema = z.object({
  companyName: z.string().optional(),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  professionalType: z.enum(["contractor", "architect"], {
    required_error: "Please select a professional type",
  }),
  experience: z.string({ required_error: "Please select years of experience" }),
  addressLine1: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  pincode: z.string().min(6, { message: "Please enter a valid pincode" }),
});

// Step 3: Expertise Schema
const expertiseSchema = z.object({
  specializations: z.array(z.string()).min(1, { message: "Please select at least one specialization" }),
  about: z.string().min(20, { message: "Please provide a description of at least 20 characters" }),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type AccountDetailsValues = z.infer<typeof accountDetailsSchema>;
type ProfessionalDetailsValues = z.infer<typeof professionalDetailsSchema>;
type ExpertiseValues = z.infer<typeof expertiseSchema>;

// Specialization options
const specializations = [
  { id: "residential", label: "Residential Construction" },
  { id: "commercial", label: "Commercial Buildings" },
  { id: "renovation", label: "Renovations" },
  { id: "interior", label: "Interior Design" },
  { id: "eco", label: "Eco-friendly Construction" },
  { id: "structural", label: "Structural Design" },
  { id: "landscaping", label: "Landscaping" },
  { id: "restoration", label: "Heritage Restoration" },
];

const RegisterPage = () => {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [location] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    accountDetails: {} as AccountDetailsValues,
    professionalDetails: {} as ProfessionalDetailsValues,
    expertise: {} as ExpertiseValues,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isProfessional, setIsProfessional] = useState(false);

  // Check if user wants to register as a professional
  useEffect(() => {
    const params = new URLSearchParams(location.split("?")[1] || "");
    setIsProfessional(params.get("type") === "professional");
  }, [location]);
  
  // Account Details Form
  const accountDetailsForm = useForm<AccountDetailsValues>({
    resolver: zodResolver(accountDetailsSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  // Professional Details Form
  const professionalDetailsForm = useForm<ProfessionalDetailsValues>({
    resolver: zodResolver(professionalDetailsSchema),
    defaultValues: {
      companyName: "",
      phone: "",
      professionalType: "contractor",
      experience: "",
      addressLine1: "",
      city: "Kamshet",
      state: "Maharashtra",
      pincode: "",
    },
  });
  
  // Expertise Form
  const expertiseForm = useForm<ExpertiseValues>({
    resolver: zodResolver(expertiseSchema),
    defaultValues: {
      specializations: [],
      about: "",
      terms: false,
    },
  });

  const handleAccountDetailsSubmit = async (data: AccountDetailsValues) => {
    setFormData(prev => ({ ...prev, accountDetails: data }));
    if (isProfessional) {
      setCurrentStep(2);
    } else {
      // If registering as a customer, submit now
      setIsLoading(true);
      try {
        await apiRequest('POST', '/api/auth/register', {
          ...data,
          userType: 'customer',
        });
        
        toast({
          title: "Registration successful",
          description: "Your account has been created successfully. Please log in.",
        });
        
        navigate('/login');
      } catch (error) {
        toast({
          title: "Registration failed",
          description: "There was an error creating your account. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const handleProfessionalDetailsSubmit = (data: ProfessionalDetailsValues) => {
    setFormData(prev => ({ ...prev, professionalDetails: data }));
    setCurrentStep(3);
  };
  
  const handleExpertiseSubmit = async (data: ExpertiseValues) => {
    setFormData(prev => ({ ...prev, expertise: data }));
    setIsLoading(true);
    
    // Combine all form data
    const registrationData = {
      ...formData.accountDetails,
      ...formData.professionalDetails,
      ...data,
      userType: 'professional',
    };
    
    try {
      await apiRequest('POST', '/api/auth/register', registrationData);
      
      toast({
        title: "Registration successful",
        description: "Your account has been created successfully. Please log in.",
      });
      
      navigate('/login');
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{isProfessional ? "Register as Professional" : "Register"} | Kamshet.Build</title>
        <meta 
          name="description" 
          content={isProfessional 
            ? "Create your professional profile to showcase your services to clients in Kamshet" 
            : "Register for a Kamshet.Build account to connect with construction professionals"
          } 
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </Helmet>
      
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 font-inter">
            {isProfessional ? "Register as a Professional" : "Create Your Account"}
          </h2>
          <p className="mt-2 text-gray-600">
            {isProfessional 
              ? "Create your professional profile to showcase your services to clients in Kamshet" 
              : "Register for a Kamshet.Build account to connect with construction professionals"
            }
          </p>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            {/* Progress Steps */}
            {isProfessional && (
              <div className="flex mb-8">
                <div className="flex-1">
                  <div className="relative">
                    <div className={`w-10 h-10 mx-auto rounded-full ${currentStep >= 1 ? "bg-[#3b82f6]" : "bg-gray-300"} text-white flex items-center justify-center font-bold`}>
                      1
                    </div>
                    <div className={`text-center mt-2 text-sm font-medium ${currentStep >= 1 ? "text-[#3b82f6]" : "text-gray-500"}`}>Account Details</div>
                    <div className="absolute top-5 w-full flex justify-center">
                      <div className={`h-0.5 w-full ${currentStep >= 2 ? "bg-[#3b82f6]" : "bg-gray-300"}`}></div>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <div className={`w-10 h-10 mx-auto rounded-full ${currentStep >= 2 ? "bg-[#3b82f6]" : "bg-gray-300"} text-white flex items-center justify-center font-bold`}>
                      2
                    </div>
                    <div className={`text-center mt-2 text-sm font-medium ${currentStep >= 2 ? "text-[#3b82f6]" : "text-gray-500"}`}>Professional Details</div>
                    <div className="absolute top-5 w-full flex justify-center">
                      <div className={`h-0.5 w-full ${currentStep >= 3 ? "bg-[#3b82f6]" : "bg-gray-300"}`}></div>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <div className={`w-10 h-10 mx-auto rounded-full ${currentStep >= 3 ? "bg-[#3b82f6]" : "bg-gray-300"} text-white flex items-center justify-center font-bold`}>
                      3
                    </div>
                    <div className={`text-center mt-2 text-sm font-medium ${currentStep >= 3 ? "text-[#3b82f6]" : "text-gray-500"}`}>Expertise</div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Account Details Form */}
            {currentStep === 1 && (
              <Form {...accountDetailsForm}>
                <form onSubmit={accountDetailsForm.handleSubmit(handleAccountDetailsSubmit)}>
                  <h3 className="text-xl font-semibold mb-4">Account Details</h3>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <FormField
                      control={accountDetailsForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="Enter your full name" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={accountDetailsForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="email" 
                              placeholder="Enter your email address" 
                            />
                          </FormControl>
                          <FormDescription>
                            We'll send a verification link to this email
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={accountDetailsForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="password" 
                              placeholder="Create a password" 
                            />
                          </FormControl>
                          <FormDescription>
                            Minimum 8 characters with at least one number
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={accountDetailsForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="password" 
                              placeholder="Confirm your password" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <Button 
                      type="submit" 
                      variant="kamshet"
                      disabled={isLoading}
                    >
                      {isProfessional ? "Continue" : (isLoading ? "Creating Account..." : "Register")}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
            
            {/* Professional Details Form */}
            {currentStep === 2 && (
              <Form {...professionalDetailsForm}>
                <form onSubmit={professionalDetailsForm.handleSubmit(handleProfessionalDetailsSubmit)}>
                  <h3 className="text-xl font-semibold mb-4">Professional Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={professionalDetailsForm.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name <span className="text-gray-500">(Optional)</span></FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="Enter your company name" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={professionalDetailsForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="tel" 
                              placeholder="Enter your phone number" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={professionalDetailsForm.control}
                      name="professionalType"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Professional Type</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex space-x-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="contractor" id="contractor" />
                                <label htmlFor="contractor">Contractor</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="architect" id="architect" />
                                <label htmlFor="architect">Architect</label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={professionalDetailsForm.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Years of Experience</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select experience" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1-3">1-3 years</SelectItem>
                              <SelectItem value="4-7">4-7 years</SelectItem>
                              <SelectItem value="8-12">8-12 years</SelectItem>
                              <SelectItem value="13+">13+ years</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="md:col-span-2">
                      <FormField
                        control={professionalDetailsForm.control}
                        name="addressLine1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="Address Line 1" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={professionalDetailsForm.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={professionalDetailsForm.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={professionalDetailsForm.control}
                      name="pincode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pin Code</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="Enter pin code" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      variant="kamshet"
                    >
                      Continue
                    </Button>
                  </div>
                </form>
              </Form>
            )}
            
            {/* Expertise Form */}
            {currentStep === 3 && (
              <Form {...expertiseForm}>
                <form onSubmit={expertiseForm.handleSubmit(handleExpertiseSubmit)}>
                  <h3 className="text-xl font-semibold mb-4">Areas of Expertise</h3>
                  
                  <div className="space-y-6">
                    <FormField
                      control={expertiseForm.control}
                      name="specializations"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-base">Select your specializations (up to 5)</FormLabel>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {specializations.map((item) => (
                              <FormField
                                key={item.id}
                                control={expertiseForm.control}
                                name="specializations"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={item.id}
                                      className="flex flex-row items-start space-x-3 space-y-0 p-3 border border-gray-300 rounded-md hover:bg-gray-50"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(item.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, item.id])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== item.id
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {item.label}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={expertiseForm.control}
                      name="about"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>About Your Services</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              placeholder="Describe your services, experience, and what makes you unique..." 
                              rows={4}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={expertiseForm.control}
                      name="terms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm text-gray-600">
                              I agree to the <Link href="/terms" className="text-[#3b82f6] hover:text-[#2563eb]">Terms of Service</Link> and <Link href="/privacy" className="text-[#3b82f6] hover:text-[#2563eb]">Privacy Policy</Link>
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setCurrentStep(2)}
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      variant="kamshet"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Account..." : "Complete Registration"}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account? <Link href="/login" className="text-[#3b82f6] hover:text-[#2563eb] font-medium">Log in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
