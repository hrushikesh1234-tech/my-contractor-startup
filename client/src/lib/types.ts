export interface Professional {
  id: number;
  userId: number;
  fullName?: string;
  companyName?: string;
  address: string;
  pincode: string;
  phone: string;
  profession: 'contractor' | 'architect';
  experience: number;
  profileImage?: string;
  about?: string;
  rating: number;
  reviewCount: number;
  location: string;
  specializations?: string[];
}

export interface Project {
  id: number;
  professionalId: number;
  title: string;
  description?: string;
  propertyType: string;
  budget?: string;
  completionYear?: string;
  area?: string;
  coverImage?: string;
  images?: ProjectImage[];
}

export interface ProjectImage {
  id: number;
  projectId: number;
  imageUrl: string;
  sortOrder: number;
}

export interface Review {
  id: number;
  professionalId: number;
  userId: number;
  userFullName?: string;
  rating: number;
  content?: string;
  createdAt: Date;
}

export interface Bookmark {
  bookmarkId: number;
  professional: Professional;
}

export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  userType: 'customer' | 'contractor' | 'architect';
}

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterData = {
  username: string;
  password: string;
  email: string;
  fullName: string;
  userType: 'customer' | 'contractor' | 'architect';
};

export type ProfessionalData = {
  companyName?: string;
  address: string;
  pincode: string;
  phone: string;
  experience: number;
  profileImage?: string;
  about?: string;
  location: string;
  specializations?: string[];
};

export type ProfessionalFilter = {
  profession?: string;
  location?: string;
  specialization?: string;
  sortBy?: string;
  search?: string;
};
