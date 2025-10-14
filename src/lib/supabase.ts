import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type CarouselImage = {
  id: string;
  image_url: string;
  alt_text: string;
  display_order: number;
  quarter: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};