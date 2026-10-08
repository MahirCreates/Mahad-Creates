import { supabase as realClient } from "@/integrations/supabase/client";

// Use the real, connected Supabase client
export const supabase = realClient as any;
export const isSupabaseConfigured = true;

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
