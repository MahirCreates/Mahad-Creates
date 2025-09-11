import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MessageCircle, Clock, DollarSign, CheckCircle2, X } from 'lucide-react';

interface ServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    id: number;
    title: string;
    description: string;
    price: string;
    icon: React.ComponentType<any>;
  } | null;
}

const ServiceRequestModal = ({ isOpen, onClose, service }: ServiceRequestModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectDescription: '',
    timeline: '',
    budget: '',
    priority: 'medium',
    contactMethod: 'whatsapp'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceGuidance = {
    1: { // Website Development
      requirements: ['Domain name preference', 'Number of pages needed', 'Design style preferences', 'Content management needs'],
      timeline: '2-4 weeks',
      deliverables: ['Responsive website', 'SEO optimization', 'Content management system', 'Mobile compatibility']
    },
    2: { // App Development
      requirements: ['Platform preference (iOS/Android)', 'Key features list', 'Target audience', 'Integration needs'],
      timeline: '4-8 weeks',
      deliverables: ['Cross-platform app', 'User interface design', 'Backend integration', 'App store deployment']
    },
    3: { // AI Automation
      requirements: ['Current workflow description', 'Automation goals', 'Data sources', 'Integration points'],
      timeline: '1-3 weeks',
      deliverables: ['Automated workflow', 'AI chatbot/assistant', 'Integration setup', 'Training & documentation']
    },
    4: { // Graphic Design
      requirements: ['Brand guidelines', 'Design specifications', 'File formats needed', 'Usage rights'],
      timeline: '3-7 days',
      deliverables: ['High-resolution files', 'Multiple formats', 'Brand assets', 'Usage guidelines']
    },
    5: { // Commercial Video
      requirements: ['Video concept/script', 'Location preferences', 'Duration target', 'Talent needs'],
      timeline: '1-2 weeks',
      deliverables: ['Professional video', 'Multiple formats', 'Raw footage', 'Social media cuts']
    },
    6: { // Brand Marketing
      requirements: ['Current marketing challenges', 'Target market', 'Campaign goals', 'Budget allocation'],
      timeline: '2-4 weeks',
      deliverables: ['Marketing strategy', 'Campaign materials', 'Performance tracking', 'Optimization plan']
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create WhatsApp message
    const whatsappMessage = `
🌟 *New Service Request - ${service?.title}*

👤 *Client Details:*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company || 'N/A'}

📋 *Project Information:*
Service: ${service?.title}
Budget Range: ${formData.budget}
Timeline: ${formData.timeline}
Priority: ${formData.priority}

📝 *Project Description:*
${formData.projectDescription}

💬 *Preferred Contact:* ${formData.contactMethod}

---
Sent via Mahad Creates website
    `.trim();

    const whatsappURL = `https://wa.me/252615240484?text=${encodeURIComponent(whatsappMessage)}`;
    
    toast({
      title: "Request Submitted!",
      description: "Your service request has been prepared. Click OK to send via WhatsApp.",
    });

    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    setIsSubmitting(false);
    onClose();
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      projectDescription: '',
      timeline: '',
      budget: '',
      priority: 'medium',
      contactMethod: 'whatsapp'
    });
  };

  if (!service) return null;

  const guidance = serviceGuidance[service.id as keyof typeof serviceGuidance];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-purple-500/20 text-white">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <service.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl text-white">{service.title}</DialogTitle>
              <DialogDescription className="text-purple-200">
                Request professional {service.title.toLowerCase()} services
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Service Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-200 mb-3">Service Overview</h3>
              <p className="text-gray-300 mb-4">{service.description}</p>
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-green-400" />
                <span className="text-xl font-bold text-green-400">{service.price}</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-purple-200 mb-3">What We Need From You</h3>
              <div className="space-y-2">
                {guidance.requirements.map((req, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-purple-200 mb-3">Deliverables</h3>
              <div className="space-y-2">
                {guidance.deliverables.map((deliverable, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{deliverable}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" />
              <span className="text-purple-200">Estimated Timeline: {guidance.timeline}</span>
            </div>
          </div>

          {/* Request Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-purple-200">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-slate-800 border-slate-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-purple-200">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-slate-800 border-slate-600 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-purple-200">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-slate-800 border-slate-600 text-white"
                  required
                />
              </div>

              <div>
                <Label htmlFor="company" className="text-purple-200">Company/Organization</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="projectDescription" className="text-purple-200">Project Description *</Label>
                <Textarea
                  id="projectDescription"
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                  className="bg-slate-800 border-slate-600 text-white min-h-[100px]"
                  placeholder="Please describe your project requirements, goals, and any specific features you need..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-purple-200">Timeline Preference</Label>
                  <Select value={formData.timeline} onValueChange={(value) => setFormData({ ...formData, timeline: value })}>
                    <SelectTrigger className="bg-slate-800 border-slate-600">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="urgent">ASAP (Rush order)</SelectItem>
                      <SelectItem value="standard">Standard timeline</SelectItem>
                      <SelectItem value="flexible">Flexible timing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-purple-200">Budget Range</Label>
                  <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                    <SelectTrigger className="bg-slate-800 border-slate-600">
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="starter">Starter ($50-200)</SelectItem>
                      <SelectItem value="professional">Professional ($200-500)</SelectItem>
                      <SelectItem value="premium">Premium ($500-1000)</SelectItem>
                      <SelectItem value="enterprise">Enterprise ($1000+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-purple-200 mb-3 block">Project Priority</Label>
                <RadioGroup value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="low" />
                    <Label htmlFor="low" className="text-gray-300">Low - Take your time</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium" className="text-gray-300">Medium - Standard priority</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" />
                    <Label htmlFor="high" className="text-gray-300">High - Urgent project</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-purple-200 mb-3 block">Preferred Contact Method</Label>
                <RadioGroup value={formData.contactMethod} onValueChange={(value) => setFormData({ ...formData, contactMethod: value })}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="whatsapp" id="whatsapp" />
                    <Label htmlFor="whatsapp" className="text-gray-300 flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-green-400" />
                      WhatsApp (Recommended)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="email" />
                    <Label htmlFor="email" className="text-gray-300 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-400" />
                      Email
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="phone" id="phone" />
                    <Label htmlFor="phone" className="text-gray-300 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-purple-400" />
                      Phone Call
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Submit Request
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceRequestModal;