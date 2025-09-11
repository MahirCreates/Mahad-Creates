import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Send, MessageCircle, Mail, Phone } from 'lucide-react';

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    contactMethod: 'email'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (formData.contactMethod === 'whatsapp') {
      const whatsappMessage = `
🌟 *Contact Form Submission*

👤 *Contact Details:*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

📋 *Subject:* ${formData.subject}

💬 *Message:*
${formData.message}

---
Sent via Mahad Creates website
      `.trim();

      const whatsappURL = `https://wa.me/252615240484?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappURL, '_blank');
    } else {
      // For email, create mailto link
      const emailSubject = `Contact Form: ${formData.subject}`;
      const emailBody = `
Name: ${formData.name}
Phone: ${formData.phone}

Message:
${formData.message}
      `.trim();

      const mailtoURL = `mailto:hello.mahadcreates@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.open(mailtoURL, '_blank');
    }

    toast({
      title: "Message Sent!",
      description: `Your message has been sent via ${formData.contactMethod === 'whatsapp' ? 'WhatsApp' : 'email'}.`,
    });

    setIsSubmitting(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      contactMethod: 'email'
    });
  };

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">Send us a Message</h3>
          <p className="text-gray-300">Get in touch for any inquiries or project discussions</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact-name" className="text-purple-200">Full Name *</Label>
              <Input
                id="contact-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-slate-800/50 border-slate-600 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="contact-phone" className="text-purple-200">Phone Number</Label>
              <Input
                id="contact-phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-slate-800/50 border-slate-600 text-white"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="contact-email" className="text-purple-200">Email Address *</Label>
            <Input
              id="contact-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-slate-800/50 border-slate-600 text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="contact-subject" className="text-purple-200">Subject *</Label>
            <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
              <SelectTrigger className="bg-slate-800/50 border-slate-600">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="project">Project Discussion</SelectItem>
                <SelectItem value="collaboration">Collaboration Proposal</SelectItem>
                <SelectItem value="support">Technical Support</SelectItem>
                <SelectItem value="quote">Request Quote</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="contact-message" className="text-purple-200">Message *</Label>
            <Textarea
              id="contact-message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="bg-slate-800/50 border-slate-600 text-white min-h-[120px]"
              placeholder="Tell us about your project or inquiry..."
              required
            />
          </div>

          <div>
            <Label className="text-purple-200 mb-3 block">Preferred Response Method</Label>
            <div className="flex gap-4">
              <Button
                type="button"
                variant={formData.contactMethod === 'email' ? 'default' : 'outline'}
                onClick={() => setFormData({ ...formData, contactMethod: 'email' })}
                className={formData.contactMethod === 'email' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
              <Button
                type="button"
                variant={formData.contactMethod === 'whatsapp' ? 'default' : 'outline'}
                onClick={() => setFormData({ ...formData, contactMethod: 'whatsapp' })}
                className={formData.contactMethod === 'whatsapp' 
                  ? 'bg-gradient-to-r from-green-600 to-green-500' 
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !formData.name || !formData.email || !formData.subject || !formData.message}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;