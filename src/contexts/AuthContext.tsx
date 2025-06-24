import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Client, Assembler } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: 'client' | 'assembler') => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User>) => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Enhanced mock data with more realistic information
const mockUsers: (Client | Assembler)[] = [
  {
    id: '1',
    email: 'cliente@email.com',
    name: 'João Silva',
    phone: '(11) 99999-9999',
    type: 'client',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    isVerified: true,
    createdAt: new Date('2023-06-15'),
    lastLoginAt: new Date(),
    status: 'active',
    addresses: [
      {
        id: '1',
        street: 'Rua das Flores',
        number: '123',
        neighborhood: 'Vila Madalena',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
        coordinates: { lat: -23.5505, lng: -46.6333 },
        isDefault: true
      }
    ],
    bookings: [],
    reviews: [],
    preferences: {
      preferredTimeSlots: ['14:00 - 16:00', '16:00 - 18:00'],
      communicationMethod: 'whatsapp',
      notifications: {
        booking: true,
        reminders: true,
        promotions: false
      }
    },
    totalSpent: 1250,
    loyaltyPoints: 125
  },
  {
    id: '2',
    email: 'montador@email.com',
    name: 'Carlos Mendes',
    phone: '(11) 88888-8888',
    type: 'assembler',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    isVerified: true,
    createdAt: new Date('2022-03-10'),
    lastLoginAt: new Date(),
    status: 'active',
    specialties: ['Cozinhas Planejadas', 'Guarda-roupas', 'Móveis de Escritório'],
    experience: 8,
    rating: 4.9,
    totalJobs: 247,
    hourlyRate: 55,
    serviceArea: {
      cities: ['São Paulo', 'Osasco', 'Barueri'],
      maxDistance: 25,
      travelFee: 15
    },
    certifications: [
      {
        id: '1',
        name: 'Montador Certificado SENAI',
        issuer: 'SENAI-SP',
        issuedAt: new Date('2020-05-15'),
        expiresAt: new Date('2025-05-15')
      }
    ],
    responseTime: 45,
    completionRate: 98.5,
    earnings: {
      thisMonth: 4200,
      lastMonth: 3800,
      total: 89500,
      pending: 650
    },
    portfolio: [
      {
        id: '1',
        title: 'Cozinha Planejada Completa - Residencial Alto Padrão',
        description: 'Montagem completa de cozinha planejada com 18 módulos, incluindo ilha central, adega e sistema de iluminação LED integrado.',
        images: [
          'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        category: 'Cozinha',
        completedAt: new Date('2024-01-15'),
        duration: 12,
        difficulty: 'hard',
        clientTestimonial: 'Trabalho impecável! Superou todas as expectativas.',
        tags: ['Cozinha Planejada', 'Alto Padrão', 'LED', 'Ilha Central']
      },
      {
        id: '2',
        title: 'Guarda-roupa Casal com Closet',
        description: 'Montagem de guarda-roupa de 8 portas com closet integrado, sistema de gavetas telescópicas e espelhos bisotados.',
        images: [
          'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        category: 'Quarto',
        completedAt: new Date('2024-01-10'),
        duration: 6,
        difficulty: 'medium',
        tags: ['Guarda-roupa', 'Closet', 'Espelhos']
      }
    ],
    availability: [
      { id: '1', dayOfWeek: 1, startTime: '08:00', endTime: '18:00', isAvailable: true, maxBookings: 2 },
      { id: '2', dayOfWeek: 2, startTime: '08:00', endTime: '18:00', isAvailable: true, maxBookings: 2 },
      { id: '3', dayOfWeek: 3, startTime: '08:00', endTime: '18:00', isAvailable: true, maxBookings: 2 },
      { id: '4', dayOfWeek: 4, startTime: '08:00', endTime: '18:00', isAvailable: true, maxBookings: 2 },
      { id: '5', dayOfWeek: 5, startTime: '08:00', endTime: '18:00', isAvailable: true, maxBookings: 2 },
      { id: '6', dayOfWeek: 6, startTime: '08:00', endTime: '16:00', isAvailable: true, maxBookings: 1 }
    ],
    reviews: []
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useLocalStorage<User | null>('cc_user', null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string, userType: 'client' | 'assembler') => {
    setIsLoading(true);
    try {
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const foundUser = mockUsers.find(u => u.email === email && u.type === userType);
      if (foundUser) {
        const updatedUser = { ...foundUser, lastLoginAt: new Date() };
        setUser(updatedUser);
      } else {
        throw new Error('Credenciais inválidas. Verifique email, senha e tipo de conta.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (userData: Partial<User>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email!,
        name: userData.name!,
        phone: userData.phone!,
        type: userData.type!,
        isVerified: false,
        createdAt: new Date(),
        status: 'active'
      };
      
      setUser(newUser);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (user) {
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      register, 
      updateProfile,
      isLoading,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};