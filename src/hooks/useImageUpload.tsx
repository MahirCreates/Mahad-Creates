import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

// Static site: uploads show as a preview in the current browser only.
export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadImage = async (file: File, _bucket: string, _path: string) => {
    setUploading(true);
    try {
      if (!file.type.startsWith('image/')) throw new Error('Please choose an image file');
      return URL.createObjectURL(file);
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading };
};
