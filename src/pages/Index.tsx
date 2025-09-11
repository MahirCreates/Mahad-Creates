import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ServiceRequestModal from '@/components/ServiceRequestModal';
import ContactForm from '@/components/ContactForm';
import FAQSection from '@/components/FAQSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BlogModal from '@/components/BlogModal';
import { 
  Upload, 
  Play, 
  Copy, 
  Phone, 
  Mail, 
  MapPin, 
  Code, 
  Smartphone, 
  Bot, 
  Palette, 
  Video, 
  TrendingUp,
  Facebook,
  Youtube,
  Linkedin,
  Languages,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { usePortfolio } from '@/hooks/usePortfolio';
import { ImageUploadBox } from '@/components/ImageUploadBox';

const Index = () => {
  const { toast } = useToast();
  const [language, setLanguage] = useState('en');
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [selectedBlogArticle, setSelectedBlogArticle] = useState<any>(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const { settings, loading: settingsLoading, updateSetting } = useSiteSettings();
  const { projects, loading: projectsLoading, updateProject } = usePortfolio();

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

  const paymentMethods = [
    { name: 'EVC', number: '00252615240484', ussd: '*712*615240484*' },
    { name: 'Salaam Bank', number: '35578154', ussd: null },
    { name: 'IBAN', number: 'SO850001102300035578154', ussd: null },
    { name: 'Edahab', number: '00252625240484', ussd: '*770*625240484*' },
    { name: 'Dahabshiil Bank', number: 'MUQD0080734', ussd: null },
    { name: 'Waafi Mastercard', number: '5291 8234 6508 8294', ussd: null }
  ];

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

  // Blog articles data
  const blogArticles = [
    {
      id: 1,
      title: "Why Somali Businesses Need Online Presence",
      excerpt: "In today's digital age, Somali businesses can no longer afford to ignore the power of online presence. From reaching diaspora communities to expanding local market share, a strong digital footprint is essential for growth and sustainability...",
      content: `In today's digital age, Somali businesses can no longer afford to ignore the power of online presence. The digital revolution has transformed how customers discover, interact with, and purchase from businesses worldwide, and Somalia is no exception.

**Reaching the Diaspora Community**

One of the most significant advantages of having an online presence is the ability to connect with the vast Somali diaspora spread across the globe. With over 2 million Somalis living abroad, primarily in the United States, Canada, UK, and other European countries, these communities represent a massive untapped market for Somali businesses.

Online platforms allow businesses to:
- Showcase authentic Somali products to diaspora communities
- Accept international payments and arrange shipping
- Build brand loyalty among overseas Somalis
- Create cultural connections through digital storytelling

**Local Market Expansion**

Even within Somalia, internet penetration has grown dramatically. Mobile money services like EVC and Edahab have made online transactions commonplace, creating a foundation for e-commerce growth.

**Cost-Effective Marketing**

Traditional advertising methods like radio and print can be expensive and have limited reach. Digital marketing offers:
- Targeted advertising to specific demographics
- Measurable results and analytics
- Lower costs compared to traditional media
- Ability to adjust campaigns in real-time

**Building Trust and Credibility**

A professional website and active social media presence signal legitimacy and trustworthiness to potential customers. This is particularly important for businesses looking to:
- Attract international partnerships
- Build customer confidence
- Establish thought leadership in their industry

**The Path Forward**

Successful digital transformation requires:
1. Professional website development
2. Social media strategy and management
3. Search engine optimization (SEO)
4. Online payment integration
5. Customer service automation

The businesses that embrace digital transformation today will be the market leaders of tomorrow. Don't let your competition get ahead – start building your online presence now.`,
      author: "Mahad Hassan",
      date: "December 15, 2024",
      readTime: "5 min read",
      category: "Digital Marketing",
      tags: ["business", "digital", "somalia", "marketing", "ecommerce"]
    },
    {
      id: 2,
      title: "How AI Can Boost Freelancing in East Africa",
      excerpt: "Artificial Intelligence is revolutionizing the freelancing landscape in East Africa. From automated customer service to intelligent content creation, AI tools are empowering local freelancers to compete on a global scale...",
      content: `Artificial Intelligence is revolutionizing the freelancing landscape in East Africa, creating unprecedented opportunities for skilled professionals to compete on a global scale. As AI tools become more accessible and affordable, freelancers in Somalia, Kenya, Ethiopia, and other East African countries are leveraging these technologies to enhance their services and increase their earning potential.

**Current Freelancing Landscape in East Africa**

East Africa has emerged as a significant player in the global freelancing market, with countries like Kenya leading in tech innovation and Somalia showing rapid growth in digital services. The region's advantages include:
- High English proficiency rates
- Growing internet infrastructure
- Competitive pricing compared to Western markets
- Strong cultural work ethic and client service focus

**AI Tools Transforming Freelance Work**

**1. Content Creation and Writing**
AI writing assistants help freelancers:
- Generate ideas and outlines quickly
- Improve grammar and style
- Translate content for multilingual clients
- Create content at scale while maintaining quality

**2. Design and Creative Services**
AI-powered design tools enable:
- Rapid prototype creation
- Automated image editing and enhancement
- Logo and brand identity generation
- Video editing assistance

**3. Programming and Development**
AI coding assistants provide:
- Code generation and debugging
- Documentation creation
- Testing automation
- Architecture planning

**4. Customer Service and Communication**
AI chatbots and tools help freelancers:
- Provide 24/7 client support
- Handle multiple projects simultaneously
- Automate routine communications
- Manage project timelines effectively

**Opportunities for East African Freelancers**

**Virtual Assistance 2.0**
Traditional virtual assistance is evolving with AI integration. Freelancers can now offer:
- Intelligent email management
- Automated social media posting
- Data analysis and reporting
- Customer relationship management

**AI Training and Consultation**
As businesses worldwide adopt AI, there's growing demand for:
- AI implementation consulting
- Training on AI tool usage
- Custom AI solution development
- AI ethics and compliance advice

**Niche Specializations**
AI enables freelancers to develop expertise in:
- AI prompt engineering
- Machine learning model training
- Natural language processing applications
- Computer vision projects

**Overcoming Challenges**

**Infrastructure Development**
- Reliable internet connectivity remains crucial
- Access to high-performance computing resources
- Payment gateway integration for international clients

**Skill Development**
- Continuous learning about new AI tools
- Understanding AI limitations and best practices
- Building technical expertise alongside creative skills

**Market Positioning**
- Highlighting unique cultural insights and perspectives
- Demonstrating AI-enhanced capabilities to clients
- Building strong online portfolios and personal brands

**Success Stories**

Many East African freelancers are already seeing significant success:
- Content creators increasing output by 300% using AI writing tools
- Designers completing projects 50% faster with AI assistance
- Developers building more complex applications with AI code generation

**The Future Outlook**

The combination of AI tools and East African talent creates a powerful competitive advantage. As AI continues to evolve, freelancers who adapt and integrate these technologies will find themselves at the forefront of the global digital economy.

**Getting Started**

For freelancers looking to integrate AI into their workflow:
1. Start with free AI tools to understand capabilities
2. Focus on one or two AI applications initially
3. Invest time in learning prompt engineering
4. Build a portfolio showcasing AI-enhanced work
5. Network with other AI-savvy freelancers

The future of freelancing in East Africa is bright, and AI is the catalyst that will accelerate this growth. Those who embrace these changes today will be the industry leaders of tomorrow.`,
      author: "Mahad Hassan",
      date: "December 10, 2024",
      readTime: "7 min read",
      category: "Artificial Intelligence",
      tags: ["AI", "freelancing", "east-africa", "technology", "automation"]
    }
  ];

  const openServiceModal = (service: any) => {
    setSelectedService(service);
    setIsServiceModalOpen(true);
  };

  const openBlogModal = (article: any) => {
    setSelectedBlogArticle(article);
    setIsBlogModalOpen(true);
  };

  const handleIntroVideoUpload = () => {
    // Create a file input dynamically
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'video/*';
    fileInput.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        // Here you would typically upload to your storage service
        toast({
          title: "Video Selected",
          description: `Selected: ${file.name}. Upload functionality will be implemented with your storage service.`
        });
      }
    };
    fileInput.click();
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

  if (settingsLoading || projectsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-300 mx-auto mb-4 animate-spin" />
          <p className="text-purple-200 text-lg">Loading Mahad Creates...</p>
        </div>
      </div>
    );
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Fixed Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <ImageUploadBox
                currentImage={settings?.logo_url}
                onImageUploaded={(url) => updateSetting('logo_url', url)}
                className="w-10 h-10"
                uploadPath="logo"
                placeholder="Logo"
                aspectRatio="square"
              />
              <h1 className="text-xl font-bold text-white">{currentText.hero.title}</h1>
            </div>
            
            {/* Navigation Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-white/80 hover:text-white transition-colors duration-200 hover:scale-105"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="text-white/80 hover:text-white transition-colors duration-200 hover:scale-105"
              >
                Portfolio
              </button>
              <button 
                onClick={() => scrollToSection('featured-work')}
                className="text-white/80 hover:text-white transition-colors duration-200 hover:scale-105"
              >
                Featured Work
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-white/80 hover:text-white transition-colors duration-200 hover:scale-105"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('blog')}
                className="text-white/80 hover:text-white transition-colors duration-200 hover:scale-105"
              >
                Blog
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-white/80 hover:text-white transition-colors duration-200 hover:scale-105"
              >
                Contact
              </button>
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
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="home"
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center pt-20"
        style={{ backgroundImage: `url(${settings?.cover_image_url || 'https://images.unsplash.com/photo-1518770660439-4636190af475'})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="mb-8">
            <ImageUploadBox
              currentImage={settings?.cover_image_url}
              onImageUploaded={(url) => updateSetting('cover_image_url', url)}
              className="inline-block"
              uploadPath="cover"
              placeholder="Change Cover Image"
              aspectRatio="landscape"
            />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {currentText.hero.title}
          </h1>
          <p className="text-2xl md:text-3xl text-purple-200 mb-4">{currentText.hero.subtitle}</p>
          <p className="text-xl text-gray-300 mb-8">{currentText.hero.description}</p>
          <Button 
            size="lg" 
            onClick={() => scrollToSection('services')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg hover:scale-105 transition-all duration-300"
          >
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
              <ImageUploadBox
                currentImage={settings?.founder_image_url}
                onImageUploaded={(url) => updateSetting('founder_image_url', url)}
                className="w-80 h-80"
                uploadPath="founder"
                placeholder="Upload Founder Photo"
                aspectRatio="square"
              />
              <Button 
                variant="outline" 
                onClick={handleIntroVideoUpload}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300"
              >
                <Play className="w-4 h-4 mr-2" />
                Upload Intro Video
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4 bg-black/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">Portfolio</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
                <ImageUploadBox
                  currentImage={project.image_url}
                  onImageUploaded={(url) => updateProject(project.project_id, { image_url: url })}
                  className="h-48"
                  uploadPath={`portfolio-${project.project_id}`}
                  placeholder="Upload Project Image"
                  aspectRatio="landscape"
                />
                <CardContent className="p-6">
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-200 mb-3 group-hover:bg-purple-400/30 transition-colors">
                    {project.category}
                  </Badge>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-200 transition-colors">{project.title}</h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Commercial Work Section */}
      <section id="featured-work" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">Featured Commercial Work</h2>
          <p className="text-xl text-gray-300 text-center mb-12">Professional video productions and commercial projects</p>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video 1 */}
            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
              <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-t-lg relative overflow-hidden">
                <video 
                  className="w-full h-full object-cover rounded-t-lg"
                  controls
                  muted
                  loop
                  preload="metadata"
                  poster=""
                >
                  <source src="https://ik.imagekit.io/weedadeveloper/Kuwait%20Specialist%20Hospital.mp4?updatedAt=1757468714438" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Kuwait Specialist Hospital</h3>
                <p className="text-gray-300">Professional healthcare commercial showcasing advanced medical facilities and patient-centered care excellence.</p>
              </CardContent>
            </Card>

            {/* Video 2 */}
            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
              <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-t-lg relative overflow-hidden">
                <video 
                  className="w-full h-full object-cover rounded-t-lg"
                  controls
                  muted
                  loop
                  preload="metadata"
                  poster=""
                >
                  <source src="https://ik.imagekit.io/weedadeveloper/Century%20Perfumes%20and%20Gifts.mp4?updatedAt=1757468537228" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Century Perfumes and Gifts</h3>
                <p className="text-gray-300">Premium retail commercial highlighting luxury fragrances and gift collections with elegant presentation.</p>
              </CardContent>
            </Card>

            {/* Video 3 */}
            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
              <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-t-lg relative overflow-hidden">
                <video 
                  className="w-full h-full object-cover rounded-t-lg"
                  controls
                  muted
                  loop
                  preload="metadata"
                  poster=""
                >
                  <source src="https://ik.imagekit.io/weedadeveloper/commercial%20video%20on%20Hilaal%20Milk%20Powder.mp4?updatedAt=1757468529777" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Hilaal Milk Powder</h3>
                <p className="text-gray-300">Food industry commercial emphasizing nutritional quality and family values with authentic storytelling.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-black/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">Services & Pricing</h2>
          <p className="text-xl text-gray-300 text-center mb-12">Professional solutions tailored for the Somali market</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card key={service.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <IconComponent className="w-8 h-8 text-white group-hover:animate-pulse" />
                    </div>
                    <CardTitle className="text-white text-xl group-hover:text-purple-200 transition-colors duration-300">{service.title}</CardTitle>
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
                      {service.price}
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-gray-300 mb-6 group-hover:text-gray-200 transition-colors duration-300">{service.description}</p>
                    <div className="space-y-3">
                      <Button 
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                        onClick={() => copyPaymentInfo(service)}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Payment Info
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => openServiceModal(service)}
                        className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300"
                      >
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
              <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
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

      {/* Blog Section */}
      <section id="blog" className="py-20 px-4 bg-black/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Latest Insights</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {blogArticles.map((article) => (
              <Card key={article.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <CardContent className="p-8">
                  <div className="mb-4">
                    <Badge className="bg-purple-500/20 text-purple-200 mb-2">
                      {article.category}
                    </Badge>
                    <div className="text-sm text-gray-400">
                      {article.date} • {article.readTime}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{article.title}</h3>
                  <p className="text-gray-300 mb-6">{article.excerpt}</p>
                  <Button 
                    variant="outline" 
                    onClick={() => openBlogModal(article)}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-300">Ready to start your project? Let's discuss your ideas</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center p-6 bg-white/5 rounded-lg border border-white/10">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-white font-semibold mb-2">Phone/WhatsApp</p>
                  <a 
                    href="https://wa.me/252615240484" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-300 hover:text-purple-200 transition-colors"
                  >
                    +252 615240484
                  </a>
                </div>
                <div className="text-center p-6 bg-white/5 rounded-lg border border-white/10">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-white font-semibold mb-2">Email</p>
                  <a 
                    href="mailto:hello.mahadcreates@gmail.com" 
                    className="text-purple-300 hover:text-purple-200 transition-colors"
                  >
                    hello.mahadcreates@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="text-center p-6 bg-white/5 rounded-lg border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <p className="text-white font-semibold mb-2">Location</p>
                <p className="text-purple-300">Mogadishu, Somalia</p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  onClick={() => window.open('https://facebook.com/mahadcreates', '_blank')}
                  className="bg-blue-600 hover:bg-blue-700 border-blue-600 text-white hover:scale-105 transition-all duration-300"
                >
                  <Facebook className="w-5 h-5 mr-2" />
                  Facebook
                </Button>
                <Button 
                  size="lg" 
                  onClick={() => window.open('https://youtube.com/@mahadcreates', '_blank')}
                  className="bg-red-600 hover:bg-red-700 border-red-600 text-white hover:scale-105 transition-all duration-300"
                >
                  <Youtube className="w-5 h-5 mr-2" />
                  YouTube
                </Button>
                <Button 
                  size="lg" 
                  onClick={() => window.open('https://linkedin.com/in/mahadcreates', '_blank')}
                  className="bg-blue-700 hover:bg-blue-800 border-blue-700 text-white hover:scale-105 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">© 2024 Mahad Creates. All rights reserved.</p>
        </div>
      </footer>

      {/* Modals */}
      <ServiceRequestModal 
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        service={selectedService}
      />
      
      <BlogModal 
        isOpen={isBlogModalOpen}
        onClose={() => setIsBlogModalOpen(false)}
        article={selectedBlogArticle}
      />
    </div>
  );
};

export default Index;
