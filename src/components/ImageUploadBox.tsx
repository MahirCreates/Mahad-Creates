
import React from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useImageUpload } from '@/hooks/useImageUpload';

interface ImageUploadBoxProps {
  currentImage?: string | null;
  onImageUploaded: (url: string) => void;
  className?: string;
  uploadPath: string;
  placeholder?: string;
  aspectRatio?: 'square' | 'landscape' | 'portrait';
}

export const ImageUploadBox: React.FC<ImageUploadBoxProps> = ({
  currentImage,
  onImageUploaded,
  className = '',
  uploadPath,
  placeholder = 'Click to upload image',
  aspectRatio = 'landscape'
}) => {
  const { uploadImage, uploading } = useImageUpload();

  const handleImageUpload = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const url = await uploadImage(file, 'site-images', uploadPath);
        if (url) {
          onImageUploaded(url);
        }
      }
    };
    input.click();
  };

  const aspectClasses = {
    square: 'aspect-square',
    landscape: 'aspect-[16/9]',
    portrait: 'aspect-[3/4]'
  };

  return (
    <div 
      className={`${aspectClasses[aspectRatio]} bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center cursor-pointer hover:from-purple-500/30 hover:to-pink-500/30 transition-all border border-white/10 ${className}`}
      onClick={handleImageUpload}
    >
      {uploading ? (
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-purple-300 mx-auto mb-2 animate-spin" />
          <p className="text-purple-200 text-sm">Uploading...</p>
        </div>
      ) : currentImage ? (
        <img 
          src={currentImage} 
          alt="Uploaded content" 
          className="w-full h-full object-cover rounded-2xl" 
        />
      ) : (
        <div className="text-center">
          <Upload className="w-8 h-8 text-purple-300 mx-auto mb-2" />
          <p className="text-purple-200 text-sm">{placeholder}</p>
        </div>
      )}
    </div>
  );
};
