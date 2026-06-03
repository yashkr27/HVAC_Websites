// ============================================================
// AAA Heating & Air Conditioning — Supabase Database Types
// Auto-generated from Supabase schema. Do not edit manually.
// ============================================================

// ---------- ENUM TYPES ----------

export type UserRole = 'customer' | 'technician' | 'admin';
export type EstimateStatus = 'pending' | 'reviewed' | 'scheduled' | 'completed' | 'cancelled';
export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type ReviewStatus = 'pending' | 'approved' | 'rejected';
export type UrgencyLevel = 'emergency' | 'within_24hrs' | 'this_week' | 'just_browsing';

// ---------- TABLE INTERFACES ----------

export interface Profile {
  id: string;                    // uuid — matches auth.users.id
  role: UserRole;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  created_at: string;            // ISO 8601 timestamptz
}

export interface Estimate {
  id: string;                    // uuid
  user_id: string | null;        // nullable — allows guest submissions
  full_name: string;
  email: string;
  phone: string;
  service_type: string;
  urgency: UrgencyLevel;
  notes: string | null;
  status: EstimateStatus;
  admin_response: string | null;
  created_at: string;
}

export interface Appointment {
  id: string;                    // uuid
  customer_id: string;
  technician_id: string | null;  // nullable — assigned later
  service_type: string;
  scheduled_time: string;        // ISO 8601 timestamptz
  status: AppointmentStatus;
  notes: string | null;
  created_at: string;
}

export interface Review {
  id: string;                    // uuid
  user_id: string;
  appointment_id: string | null; // nullable — can review without appointment ref
  rating: number;                // integer 1–5
  comments: string;
  status: ReviewStatus;
  created_at: string;
}

export interface GalleryItem {
  id: string;                    // uuid
  image_url: string;
  title: string | null;
  description: string | null;
  category: string | null;       // e.g. 'AC Install', 'Furnace Repair', 'Maintenance'
  created_at: string;
}

// ---------- DATABASE TYPE WRAPPER (for typed Supabase client) ----------

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at'> & { created_at?: string };
        Update: Partial<Omit<Profile, 'id'>>;
      };
      estimates: {
        Row: Estimate;
        Insert: Omit<Estimate, 'id' | 'created_at' | 'status' | 'admin_response'> & {
          id?: string;
          created_at?: string;
          status?: EstimateStatus;
          admin_response?: string | null;
        };
        Update: Partial<Omit<Estimate, 'id'>>;
      };
      appointments: {
        Row: Appointment;
        Insert: Omit<Appointment, 'id' | 'created_at' | 'status'> & {
          id?: string;
          created_at?: string;
          status?: AppointmentStatus;
        };
        Update: Partial<Omit<Appointment, 'id'>>;
      };
      reviews: {
        Row: Review;
        Insert: Omit<Review, 'id' | 'created_at' | 'status'> & {
          id?: string;
          created_at?: string;
          status?: ReviewStatus;
        };
        Update: Partial<Omit<Review, 'id'>>;
      };
      gallery: {
        Row: GalleryItem;
        Insert: Omit<GalleryItem, 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Omit<GalleryItem, 'id'>>;
      };
    };
    Enums: {
      user_role: UserRole;
      estimate_status: EstimateStatus;
      appointment_status: AppointmentStatus;
      review_status: ReviewStatus;
      urgency_level: UrgencyLevel;
    };
  };
}
