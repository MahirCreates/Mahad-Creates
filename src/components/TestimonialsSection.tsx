import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote, MapPin, Briefcase } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ahmed Hassan",
      role: "Restaurant Owner",
      location: "Mogadishu, Somalia",
      service: "Website Development",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      testimonial: "Mahad created an amazing website for my restaurant. The online ordering system has increased our sales by 40%. Professional work and great communication throughout the project.",
      projectResult: "40% sales increase"
    },
    {
      id: 2,
      name: "Fatima Ali",
      role: "Fashion Designer", 
      location: "Hargeisa, Somaliland",
      service: "Brand Marketing",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face",
      testimonial: "The brand marketing campaign Mahad designed helped me reach customers across East Africa. My Instagram followers grew from 500 to 15,000 in just 3 months!",
      projectResult: "2,900% follower growth"
    },
    {
      id: 3,
      name: "Omar Jama",
      role: "Tech Startup Founder",
      location: "London, UK",
      service: "App Development",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      testimonial: "Working with Mahad on our mobile app was fantastic. He understood our vision perfectly and delivered a polished product on time. The AI features work flawlessly.",
      projectResult: "App launched successfully"
    },
    {
      id: 4,
      name: "Khadija Mohamed",
      role: "NGO Director",
      location: "Nairobi, Kenya", 
      service: "AI Automation",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      testimonial: "The chatbot system Mahad built has revolutionized how we handle donor inquiries. We can now respond to questions 24/7 and our response time improved by 80%.",
      projectResult: "80% faster response time"
    },
    {
      id: 5,
      name: "Abdi Rahman",
      role: "Import/Export Business",
      location: "Dubai, UAE",
      service: "Commercial Video",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      testimonial: "The commercial video Mahad produced for our company showcased our products beautifully. It's been viewed over 100K times and brought us many new international clients.",
      projectResult: "100K+ video views"
    },
    {
      id: 6,
      name: "Sahra Osman",
      role: "Online Store Owner",
      location: "Minneapolis, USA",
      service: "Graphic Design",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      testimonial: "Mahad designed our complete brand identity including logo, packaging, and marketing materials. The designs are professional and culturally authentic. Sales increased 60%!",
      projectResult: "60% sales increase"
    }
  ];

  const serviceColors = {
    "Website Development": "bg-blue-500/20 text-blue-300",
    "App Development": "bg-green-500/20 text-green-300", 
    "AI Automation": "bg-purple-500/20 text-purple-300",
    "Graphic Design": "bg-pink-500/20 text-pink-300",
    "Commercial Video": "bg-red-500/20 text-red-300",
    "Brand Marketing": "bg-yellow-500/20 text-yellow-300"
  };

  return (
    <section className="py-20 px-4 bg-black/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Client Success Stories</h2>
          <p className="text-xl text-gray-300">Real results from real clients across the globe</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-400"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{testimonial.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Briefcase className="w-3 h-3" />
                      {testimonial.role}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <MapPin className="w-3 h-3" />
                      {testimonial.location}
                    </div>
                  </div>
                </div>

                {/* Service Badge */}
                <Badge 
                  className={`${serviceColors[testimonial.service as keyof typeof serviceColors]} mb-4 text-xs`}
                >
                  {testimonial.service}
                </Badge>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial */}
                <div className="relative mb-4">
                  <Quote className="w-6 h-6 text-purple-400 absolute -top-2 -left-2 opacity-50" />
                  <p className="text-gray-300 italic leading-relaxed pl-4">
                    "{testimonial.testimonial}"
                  </p>
                </div>

                {/* Result Badge */}
                <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-3 border border-purple-500/20">
                  <div className="text-center">
                    <p className="text-xs text-purple-200 uppercase tracking-wide mb-1">Project Result</p>
                    <p className="text-white font-bold">{testimonial.projectResult}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl p-8 border border-purple-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Join Our Success Stories?</h3>
            <p className="text-gray-300 mb-6">Let's create something amazing together and achieve real results for your business.</p>
            <div className="flex justify-center gap-4">
              <a 
                href="https://wa.me/252615240484?text=I'd like to discuss a project and create a success story!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
              >
                Start Your Project
              </a>
              <a 
                href="#services"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white hover:bg-white/20 px-8 py-3 rounded-lg transition-all duration-300"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;