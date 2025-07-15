
import { useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadImage = async (file: File, bucket: string, path: string) => {
    setUploading(true);
    try {
      if (!isSupabaseConfigured) {
        // Return a temporary URL when Supabase is not configured
        const tempUrl = URL.createObjectURL(file);
        toast({
          title: "Temporary upload",
          description: "Image uploaded temporarily. Connect to Supabase to save permanently."
        });
        return tempUrl;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${path}-${Date.now()}.${fileExt}`;
      const filePath = `${bucket}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      toast({
        title: "Image uploaded",
        description: "Your image has been saved permanently."
      });

      return publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading };
};
