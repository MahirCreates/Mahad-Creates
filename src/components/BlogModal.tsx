import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Share2, ExternalLink } from 'lucide-react';

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    tags: string[];
  } | null;
}

const BlogModal = ({ isOpen, onClose, article }: BlogModalProps) => {
  if (!article) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`${article.title}\n\n${article.excerpt}\n\n${window.location.href}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-purple-500/20 text-white">
        <DialogHeader>
          <div className="space-y-4">
            <Badge className="bg-purple-500/20 text-purple-200 w-fit">
              {article.category}
            </Badge>
            <DialogTitle className="text-3xl font-bold text-white leading-tight">
              {article.title}
            </DialogTitle>
            
            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            <div className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">
              {article.content}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="bg-white/5 border-white/20 text-white"
              >
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
            <Button
              onClick={handleShare}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Article
            </Button>
            
            <Button
              onClick={() => window.open('https://wa.me/252615240484?text=I read your article about ' + encodeURIComponent(article.title) + ' and would like to discuss it further', '_blank')}
              className="bg-green-600 hover:bg-green-700"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Discuss on WhatsApp
            </Button>
          </div>

          {/* Related CTA */}
          <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-lg p-6 border border-purple-500/20">
            <h3 className="text-lg font-semibold text-white mb-2">Need Help Implementing These Ideas?</h3>
            <p className="text-gray-300 mb-4">
              Get expert guidance and professional implementation of the strategies discussed in this article.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  onClose();
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                View Services
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  onClose();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Get Consultation
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogModal;