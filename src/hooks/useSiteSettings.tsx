
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
          logo_url: 'https://ik.imagekit.io/weedadeveloper/cropped_image%20(29)%20(1)%20(1).png?updatedAt=1757370842213',
          cover_image_url: 'https://ik.imagekit.io/weedadeveloper/MY%20PERSONAL%20BRAND%20COVER%20(1).png?updatedAt=1757367870296',
          founder_image_url: 'https://ik.imagekit.io/weedadeveloper/Web%20&%20App%20Developer%20%20AI%20Consultant%20%20Video%20Creator%20%20Digital%20Marketer%20(1).png?updatedAt=1757367869139',
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
          logo_url: 'https://ik.imagekit.io/weedadeveloper/cropped_image%20(29)%20(1)%20(1).png?updatedAt=1757370842213',
          cover_image_url: 'https://ik.imagekit.io/weedadeveloper/MY%20PERSONAL%20BRAND%20COVER%20(1).png?updatedAt=1757367870296',
          founder_image_url: 'https://ik.imagekit.io/weedadeveloper/Web%20&%20App%20Developer%20%20AI%20Consultant%20%20Video%20Creator%20%20Digital%20Marketer%20(1).png?updatedAt=1757367869139'
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
        logo_url: 'https://ik.imagekit.io/weedadeveloper/cropped_image%20(29)%20(1)%20(1).png?updatedAt=1757370842213',
        cover_image_url: 'https://ik.imagekit.io/weedadeveloper/MY%20PERSONAL%20BRAND%20COVER%20(1).png?updatedAt=1757367870296',
        founder_image_url: 'https://ik.imagekit.io/weedadeveloper/Web%20&%20App%20Developer%20%20AI%20Consultant%20%20Video%20Creator%20%20Digital%20Marketer%20(1).png?updatedAt=1757367869139',
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
