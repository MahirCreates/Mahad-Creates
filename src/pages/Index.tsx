
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  Play, 
  Copy, 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  Code, 
  Smartphone, 
  Bot, 
  Palette, 
  Video, 
  TrendingUp,
  Facebook,
  Youtube,
  Linkedin,
  Globe,
  Languages,
  Check,
  ExternalLink
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [language, setLanguage] = useState('en');
  const [logoUrl, setLogoUrl] = useState('/placeholder.svg');
  const [coverImageUrl, setCoverImageUrl] = useState('https://images.unsplash.com/photo-1518770660439-4636190af475');
  const [founderImageUrl, setFounderImageUrl] = useState('/placeholder.svg');
  const [portfolioImages, setPortfolioImages] = useState({
    project1: '/placeholder.svg',
    project2: '/placeholder.svg',
    project3: '/placeholder.svg',
    project4: '/placeholder.svg',
    project5: '/placeholder.svg',
    project6: '/placeholder.svg'
  });

  const services = [
    {
      id: 1,
      title: 'Website Development',
      description: 'Custom websites with modern design, full responsiveness, and SEO optimization.',
      price: '$300 - $800',
      icon: Code
    },
    {
      id: 2,
      title: 'App Development',
      description: 'Cross-platform mobile applications with intuitive UI/UX and powerful functionality.',
      price: '$500 - $1200',
      icon: Smartphone
    },
    {
      id: 3,
      title: 'AI Automation',
      description: 'Intelligent chatbots, workflow automation, and AI-powered business solutions.',
      price: '$200 - $600',
      icon: Bot
    },
    {
      id: 4,
      title: 'Graphic Design',
      description: 'Brand identity, logos, marketing materials, and visual content creation.',
      price: '$50 - $200',
      icon: Palette
    },
    {
      id: 5,
      title: 'Commercial Video Creation',
      description: 'Professional video production, editing, and commercial advertising content.',
      price: '$150 - $500',
      icon: Video
    },
    {
      id: 6,
      title: 'Brand Marketing & Consulting',
      description: 'Digital marketing strategies, brand consulting, and growth optimization.',
      price: '$100 - $400',
      icon: TrendingUp
    }
  ];

  const portfolioProjects = [
    {
      id: 'project1',
      title: 'Somali Business E-commerce',
      description: 'Complete online store with payment integration and inventory management for local Somali business.',
      category: 'Web Development'
    },
    {
      id: 'project2',
      title: 'Logistics App UI/UX',
      description: 'Modern logistics tracking application with real-time updates and user-friendly interface.',
      category: 'App Development'
    },
    {
      id: 'project3',
      title: 'AI Chatbot for Customer Support',
      description: 'Intelligent customer service bot with multilingual support for Somali businesses.',
      category: 'AI Solutions'
    },
    {
      id: 'project4',
      title: 'Video Ad Campaign',
      description: 'Commercial video production featuring Mahad as actor for local business promotion.',
      category: 'Video Production'
    },
    {
      id: 'project5',
      title: 'Diaspora Marketing Campaign',
      description: 'Comprehensive digital marketing strategy targeting Somali diaspora communities.',
      category: 'Digital Marketing'
    },
    {
      id: 'project6',
      title: 'Online Course Platform',
      description: 'Educational platform with course management, student tracking, and payment integration.',
      category: 'Web Development'
    }
  ];

  const paymentMethods = [
    { name: 'EVC', number: '00252615240484', ussd: '*712*615240484*' },
    { name: 'Salaam Bank', number: '35578154', ussd: null },
    { name: 'IBAN', number: 'SO850001102300035578154', ussd: null },
    { name: 'Edahab', number: '00252625240484', ussd: '*770*625240484*' },
    { name: 'Dahabshiil Bank', number: 'MUQD0080734', ussd: null },
    { name: 'Waafi Mastercard', number: '5291 8234 6508 8294', ussd: null }
  ];

  const handleImageUpload = (type: string, projectId?: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        if (type === 'logo') {
          setLogoUrl(url);
        } else if (type === 'cover') {
          setCoverImageUrl(url);
        } else if (type === 'founder') {
          setFounderImageUrl(url);
        } else if (type === 'portfolio' && projectId) {
          setPortfolioImages(prev => ({ ...prev, [projectId]: url }));
        }
        toast({
          title: "Image uploaded successfully",
          description: "Your image has been updated."
        });
      }
    };
    input.click();
  };

  const copyPaymentInfo = (service: any) => {
    const paymentText = `Service: ${service.title}\nPrice: ${service.price}\n\nPayment Methods:\n${paymentMethods.map(method => `${method.name}: ${method.number}`).join('\n')}\n\nPlease send payment with your full name as reference.`;
    navigator.clipboard.writeText(paymentText);
    toast({
      title: "Payment info copied!",
      description: "All payment details have been copied to clipboard."
    });
  };

  const dialUSSD = (ussd: string, amount: string) => {
    if (ussd) {
      window.open(`tel:${ussd}${amount}#`, '_self');
    }
  };

  const text = {
    en: {
      hero: {
        title: "Mahad Creates",
        subtitle: "AI-Powered Web & App Development",
        description: "Expert digital solutions for modern businesses",
        cta: "Explore Services"
      },
      about: {
        title: "About Mahad",
        subtitle: "Digital Content Creator | Ad Maker | Actor | Video Producer | Digital Marketing Expert | Educator",
        description: "With over a decade of experience in creative technology and digital transformation, Mahad combines technical expertise with creative vision to deliver exceptional results. From acting in commercial videos to developing cutting-edge AI solutions, Mahad brings a unique perspective to every project, ensuring that technology serves creativity and business goals align with innovative solutions."
      }
    },
    so: {
      hero: {
        title: "Mahad Creates",
        subtitle: "AI ku dhisan Web iyo App Development",
        description: "Xalalka dijital ee casri ah ee ganacsiga",
        cta: "Eeg Adeegyada"
      },
      about: {
        title: "Ku saabsan Mahad",
        subtitle: "Sameeyaha Nuxurka Dijital | Sameeyaha Xayeysiiska | Jilaa | Soo saare Fiidiyow | Khabiir Suuq geyn Dijital | Macalin",
        description: "Waayo-aragnimo toban sano ah oo teknoolojiyada hal-abuurka ah iyo isbeddelka dijital ah, Mahad wuxuu isku dhafaa khibradda farsamada iyo aragtida hal-abuurka si uu u bixiyo natiijooyin heer sare ah."
      }
    }
  };

  const currentText = text[language as keyof typeof text];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div 
              className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
              onClick={() => handleImageUpload('logo')}
            >
              {logoUrl === '/placeholder.svg' ? (
                <Upload className="w-6 h-6 text-white" />
              ) : (
                <img src={logoUrl} alt="Logo" className="w-full h-full object-cover rounded-xl" />
              )}
            </div>
            <h1 className="text-2xl font-bold text-white">{currentText.hero.title}</h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === 'en' ? 'so' : 'en')}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Languages className="w-4 h-4 mr-2" />
            {language === 'en' ? 'SO' : 'EN'}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${coverImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="mb-8">
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleImageUpload('cover')}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 mb-8"
            >
              <Upload className="w-5 h-5 mr-2" />
              Change Cover Image
            </Button>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {currentText.hero.title}
          </h1>
          <p className="text-2xl md:text-3xl text-purple-200 mb-4">{currentText.hero.subtitle}</p>
          <p className="text-xl text-gray-300 mb-8">{currentText.hero.description}</p>
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg">
            {currentText.hero.cta}
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{currentText.about.title}</h2>
              <p className="text-xl text-purple-200 mb-6">{currentText.about.subtitle}</p>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">{currentText.about.description}</p>
              <div className="flex flex-wrap gap-3">
                {['Actor', 'Developer', 'AI Expert', 'Creative Director', 'Educator'].map((badge) => (
                  <Badge key={badge} variant="secondary" className="bg-purple-500/20 text-purple-200 px-4 py-2">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform border border-white/10"
                onClick={() => handleImageUpload('founder')}
              >
                {founderImageUrl === '/placeholder.svg' ? (
                  <div className="text-center">
                    <Upload className="w-12 h-12 text-purple-300 mx-auto mb-4" />
                    <p className="text-purple-200">Upload Founder Photo</p>
                  </div>
                ) : (
                  <img src={founderImageUrl} alt="Mahad" className="w-full h-full object-cover rounded-2xl" />
                )}
              </div>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Play className="w-4 h-4 mr-2" />
                Upload Intro Video
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">Services & Pricing</h2>
          <p className="text-xl text-gray-300 text-center mb-12">Professional solutions tailored for the Somali market</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card key={service.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-white text-xl">{service.title}</CardTitle>
                    <div className="text-2xl font-bold text-purple-300">{service.price}</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-6">{service.description}</p>
                    <div className="space-y-3">
                      <Button 
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        onClick={() => copyPaymentInfo(service)}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Payment Info
                      </Button>
                      <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                        Request Service
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Payment Methods</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {paymentMethods.map((method, index) => (
              <Card key={index} className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{method.name}</h3>
                      <p className="text-purple-200 font-mono text-lg">{method.number}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                        onClick={() => {
                          navigator.clipboard.writeText(method.number);
                          toast({ title: "Copied!", description: `${method.name} number copied` });
                        }}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      {method.ussd && (
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => dialUSSD(method.ussd!, '25')}
                        >
                          <Phone className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-300">Send payment with your full name as reference</p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">Portfolio</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioProjects.map((project) => (
              <Card key={project.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div 
                  className="h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center cursor-pointer hover:from-purple-500/30 hover:to-pink-500/30 transition-all"
                  onClick={() => handleImageUpload('portfolio', project.id)}
                >
                  {portfolioImages[project.id as keyof typeof portfolioImages] === '/placeholder.svg' ? (
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-purple-300 mx-auto mb-2" />
                      <p className="text-purple-200 text-sm">Upload Image</p>
                    </div>
                  ) : (
                    <img 
                      src={portfolioImages[project.id as keyof typeof portfolioImages]} 
                      alt={project.title} 
                      className="w-full h-full object-cover" 
                    />
                  )}
                </div>
                <CardContent className="p-6">
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-200 mb-3">
                    {project.category}
                  </Badge>
                  <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-300">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Latest Insights</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Why Somali Businesses Need Online Presence</h3>
                <p className="text-gray-300 mb-6">In today's digital age, Somali businesses can no longer afford to ignore the power of online presence. From reaching diaspora communities to expanding local market share, a strong digital footprint is essential for growth and sustainability...</p>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Read More
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">How AI Can Boost Freelancing in East Africa</h3>
                <p className="text-gray-300 mb-6">Artificial Intelligence is revolutionizing the freelancing landscape in East Africa. From automated customer service to intelligent content creation, AI tools are empowering local freelancers to compete on a global scale...</p>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Read More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white mb-12">Get In Touch</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <p className="text-white font-semibold">Phone/WhatsApp</p>
              <a href="tel:+252615240484" className="text-purple-300 hover:text-purple-200">+252 615240484</a>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <p className="text-white font-semibold">Email</p>
              <a href="mailto:hello.mahadcreates@gmail.com" className="text-purple-300 hover:text-purple-200">hello.mahadcreates@gmail.com</a>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <p className="text-white font-semibold">Location</p>
              <p className="text-purple-300">Mogadishu, Somalia</p>
            </div>
          </div>
          <div className="flex justify-center space-x-6">
            <Button size="lg" variant="outline" className="bg-blue-600 hover:bg-blue-700 border-blue-600 text-white">
              <Facebook className="w-5 h-5 mr-2" />
              Facebook
            </Button>
            <Button size="lg" variant="outline" className="bg-red-600 hover:bg-red-700 border-red-600 text-white">
              <Youtube className="w-5 h-5 mr-2" />
              YouTube
            </Button>
            <Button size="lg" variant="outline" className="bg-blue-700 hover:bg-blue-800 border-blue-700 text-white">
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">© 2024 Mahad Creates. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
