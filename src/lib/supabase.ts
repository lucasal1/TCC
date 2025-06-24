import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          phone: string;
          type: 'client' | 'assembler';
          avatar_url?: string;
          is_verified: boolean;
          created_at: string;
          updated_at: string;
          status: 'active' | 'inactive' | 'suspended';
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          phone: string;
          type: 'client' | 'assembler';
          avatar_url?: string;
          is_verified?: boolean;
          created_at?: string;
          updated_at?: string;
          status?: 'active' | 'inactive' | 'suspended';
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          phone?: string;
          type?: 'client' | 'assembler';
          avatar_url?: string;
          is_verified?: boolean;
          created_at?: string;
          updated_at?: string;
          status?: 'active' | 'inactive' | 'suspended';
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: 'booking' | 'payment' | 'review' | 'system';
          title: string;
          message: string;
          is_read: boolean;
          action_url?: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: 'booking' | 'payment' | 'review' | 'system';
          title: string;
          message: string;
          is_read?: boolean;
          action_url?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: 'booking' | 'payment' | 'review' | 'system';
          title?: string;
          message?: string;
          is_read?: boolean;
          action_url?: string;
          created_at?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          client_id: string;
          assembler_id?: string;
          service_type: string;
          description: string;
          scheduled_date: string;
          time_slot: string;
          status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
          estimated_price: number;
          actual_price?: number;
          urgency: 'low' | 'normal' | 'high';
          address: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          assembler_id?: string;
          service_type: string;
          description: string;
          scheduled_date: string;
          time_slot: string;
          status?: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
          estimated_price: number;
          actual_price?: number;
          urgency?: 'low' | 'normal' | 'high';
          address: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          assembler_id?: string;
          service_type?: string;
          description?: string;
          scheduled_date?: string;
          time_slot?: string;
          status?: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
          estimated_price?: number;
          actual_price?: number;
          urgency?: 'low' | 'normal' | 'high';
          address?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}