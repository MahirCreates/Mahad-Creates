
import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured, type SiteSettings } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      if (!isSupabaseConfigured) {
        // Use local state when Supabase is not configured
        const localSettings = {
          id: 'local',
          logo_url: null,
          cover_image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
          founder_image_url: null,
          updated_at: new Date().toISOString()
        };
        setSettings(localSettings);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setSettings(data);
      } else {
        // Create default settings if none exist
        const defaultSettings = {
          logo_url: null,
          cover_image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
          founder_image_url: null
        };
        
        const { data: newSettings, error: createError } = await supabase
          .from('site_settings')
          .insert(defaultSettings)
          .select()
          .single();

        if (createError) throw createError;
        setSettings(newSettings);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: "Connect to Supabase",
        description: "To save your uploaded images permanently, please connect to Supabase using the button in the top right."
      });
      
      // Fallback to local settings
      const fallbackSettings = {
        id: 'local',
        logo_url: null,
        cover_image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
        founder_image_url: null,
        updated_at: new Date().toISOString()
      };
      setSettings(fallbackSettings);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (field: keyof Omit<SiteSettings, 'id' | 'updated_at'>, value: string) => {
    try {
      if (!isSupabaseConfigured) {
        // Update local state only
        setSettings(prev => prev ? { ...prev, [field]: value } : null);
        toast({
          title: "Temporary update",
          description: "Changes are temporary. Connect to Supabase to save permanently."
        });
        return;
      }

      const { data, error } = await supabase
        .from('site_settings')
        .update({ [field]: value })
        .eq('id', settings?.id)
        .select()
        .single();

      if (error) throw error;
      setSettings(data);
      
      toast({
        title: "Settings updated",
        description: "Your changes have been saved."
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: "Update failed",
        description: "Failed to save changes. Please try again.",
        variant: "destructive"
      });
    }
  };

  return { settings, loading, updateSetting, refetch: fetchSettings };
};
