import { useState } from 'react';
import type { SiteSettings } from '@/lib/siteTypes';

// Site images are set here. To change them permanently, replace these URLs.
const DEFAULT_SETTINGS: SiteSettings = {
  id: 'static',
  logo_url: 'https://ik.imagekit.io/weedadeveloper/cropped_image%20(29)%20(1)%20(1).png?updatedAt=1757370842213',
  cover_image_url: 'https://ik.imagekit.io/weedadeveloper/MY%20PERSONAL%20BRAND%20COVER%20(1).png?updatedAt=1757367870296',
  founder_image_url: 'https://ik.imagekit.io/weedadeveloper/Web%20&%20App%20Developer%20%20AI%20Consultant%20%20Video%20Creator%20%20Digital%20Marketer%20(1).png?updatedAt=1757367869139',
  updated_at: new Date().toISOString(),
};

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(DEFAULT_SETTINGS);

  const updateSetting = async (field: keyof Omit<SiteSettings, 'id' | 'updated_at'>, value: string) => {
    setSettings(prev => (prev ? { ...prev, [field]: value } : prev));
  };

  return { settings, loading: false, updateSetting, refetch: async () => setSettings(DEFAULT_SETTINGS) };
};
