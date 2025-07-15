
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type SiteSettings = {
  id: string;
  logo_url: string | null;
  cover_image_url: string | null;
  founder_image_url: string | null;
  updated_at: string;
};

export type PortfolioProject = {
  id: string;
  project_id: string;
  title: string;
  description: string;
  category: string;
  image_url: string | null;
  order_index: number;
  updated_at: string;
};
