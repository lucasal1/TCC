export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  type: 'client' | 'assembler';
  avatar?: string;
  isVerified: boolean;
  createdAt: Date;
  lastLoginAt?: Date;
  status: 'active' | 'inactive' | 'suspended';
}

export interface Client extends User {
  type: 'client';
  addresses: Address[];
  bookings: Booking[];
  reviews: Review[];
  preferences: ClientPreferences;
  totalSpent: number;
  loyaltyPoints: number;
}

export interface Assembler extends User {
  type: 'assembler';
  specialties: string[];
  experience: number;
  rating: number;
  totalJobs: number;
  portfolio: PortfolioItem[];
  availability: Availability[];
  reviews: Review[];
  hourlyRate: number;
  serviceArea: ServiceArea;
  certifications: Certification[];
  isVerified: boolean;
  responseTime: number; // in minutes
  completionRate: number; // percentage
  earnings: AssemblerEarnings;
}

export interface Address {
  id: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  isDefault: boolean;
}

export interface Booking {
  id: string;
  clientId: string;
  assemblerId?: string;
  serviceType: string;
  description: string;
  scheduledDate: Date;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'rescheduled';
  address: Address;
  estimatedPrice: number;
  actualPrice?: number;
  estimatedDuration: number;
  actualDuration?: number;
  urgency: 'low' | 'normal' | 'high';
  materials: Material[];
  photos: BookingPhoto[];
  timeline: BookingTimeline[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  bookingId: string;
  fromUserId: string;
  toUserId: string;
  rating: number;
  comment: string;
  photos?: string[];
  isVerified: boolean;
  helpfulVotes: number;
  createdAt: Date;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  completedAt: Date;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  clientTestimonial?: string;
  tags: string[];
}

export interface Availability {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  maxBookings: number;
}

export interface ServiceType {
  id: string;
  name: string;
  description: string;
  category: string;
  estimatedDuration: number;
  basePrice: number;
  complexity: 'simple' | 'medium' | 'complex';
  requiredTools: string[];
  icon: string;
}

export interface Material {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  providedBy: 'client' | 'assembler';
}

export interface BookingPhoto {
  id: string;
  url: string;
  type: 'before' | 'during' | 'after';
  caption?: string;
  uploadedAt: Date;
}

export interface BookingTimeline {
  id: string;
  status: string;
  description: string;
  timestamp: Date;
  actor: 'client' | 'assembler' | 'system';
}

export interface ClientPreferences {
  preferredTimeSlots: string[];
  communicationMethod: 'email' | 'sms' | 'whatsapp';
  notifications: {
    booking: boolean;
    reminders: boolean;
    promotions: boolean;
  };
}

export interface ServiceArea {
  cities: string[];
  maxDistance: number; // in km
  travelFee: number;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuedAt: Date;
  expiresAt?: Date;
  credentialUrl?: string;
}

export interface AssemblerEarnings {
  thisMonth: number;
  lastMonth: number;
  total: number;
  pending: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'booking' | 'payment' | 'review' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt: Date;
}

export interface SearchFilters {
  location?: string;
  serviceType?: string;
  priceRange?: [number, number];
  rating?: number;
  availability?: string;
  experience?: number;
  specialties?: string[];
}

export interface Analytics {
  totalBookings: number;
  completedBookings: number;
  averageRating: number;
  totalRevenue: number;
  growthRate: number;
  topServices: Array<{
    service: string;
    count: number;
  }>;
}