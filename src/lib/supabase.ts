
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock client when Supabase is not configured
const createMockClient = () => ({
  from: (table: string) => ({
    select: (columns?: string) => ({
      order: (column: string, options?: any) => Promise.resolve({ data: [], error: null }),
      single: () => Promise.resolve({ data: null, error: { code: 'PGRST116' } })
    }),
    insert: (values: any) => {
      const baseResult = Promise.resolve({ data: null, error: new Error('Supabase not configured') });
      return Object.assign(baseResult, {
        select: (columns?: string) => {
          const selectResult = Promise.resolve({ data: null, error: new Error('Supabase not configured') });
          return Object.assign(selectResult, {
            single: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') })
          });
        }
      });
    },
    update: (values: any) => ({
      eq: (column: string, value: any) => ({
        select: (columns?: string) => ({
          single: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') })
        })
      })
    })
  }),
  storage: {
    from: (bucket: string) => ({
      upload: (path: string, file: File, options?: any) => Promise.resolve({ error: new Error('Supabase not configured') }),
      getPublicUrl: (path: string) => ({ data: { publicUrl: '' } })
    })
  }
});

export const supabase = (!supabaseUrl || !supabaseAnonKey) 
  ? createMockClient() 
  : createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

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
