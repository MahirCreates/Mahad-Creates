
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

  const validateFile = (file: File): string | null => {
    // File size validation (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return 'File size must be less than 5MB';
    }

    // File type validation
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return 'Only JPEG, PNG, WebP, and GIF images are allowed';
    }

    // File name validation (prevent path traversal)
    const fileName = file.name.toLowerCase();
    if (fileName.includes('..') || fileName.includes('/') || fileName.includes('\\')) {
      return 'Invalid file name';
    }

    return null;
  };

  const handleImageUpload = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/jpeg,image/jpg,image/png,image/webp,image/gif';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Validate file before upload
        const validationError = validateFile(file);
        if (validationError) {
          console.error('File validation failed:', validationError);
          return;
        }

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
