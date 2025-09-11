import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle, Clock, DollarSign, Shield, Rocket, Users } from 'lucide-react';

const FAQSection = () => {
  const faqs = [
    {
      id: "faq-1",
      question: "How long does it take to complete a website project?",
      answer: "Website development typically takes 2-4 weeks depending on complexity. Simple websites (5-10 pages) take 1-2 weeks, while complex e-commerce or custom applications may take 4-8 weeks. We provide detailed timelines during consultation.",
      icon: Clock
    },
    {
      id: "faq-2", 
      question: "What's included in your service packages?",
      answer: "All packages include initial consultation, design mockups, development, testing, launch support, and 30 days of free maintenance. Premium packages also include SEO optimization, analytics setup, and extended support.",
      icon: Rocket
    },
    {
      id: "faq-3",
      question: "Do you provide ongoing support after project completion?",
      answer: "Yes! We offer 30 days of free support after launch, followed by affordable monthly maintenance packages. This includes updates, backups, security monitoring, and technical support.",
      icon: Shield
    },
    {
      id: "faq-4",
      question: "How do payments work?",
      answer: "We accept multiple payment methods including EVC, Edahab, Salaam Bank, and international transfers. Payment is typically split: 50% upfront to start, 50% upon completion. We provide detailed invoices and payment tracking.",
      icon: DollarSign
    },
    {
      id: "faq-5",
      question: "Can you work with international clients?",
      answer: "Absolutely! We work with clients globally, especially in the Somali diaspora. We use modern collaboration tools, provide regular updates, and accommodate different time zones for meetings and support.",
      icon: Users
    },
    {
      id: "faq-6",
      question: "What if I'm not satisfied with the final result?",
      answer: "Client satisfaction is our priority. We include revision rounds in all packages and work closely with you throughout the process. If you're not satisfied, we'll continue refining until you're happy with the result.",
      icon: HelpCircle
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-300">Everything you need to know about our services</p>
        </div>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardContent className="p-8">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq) => {
                const IconComponent = faq.icon;
                return (
                  <AccordionItem 
                    key={faq.id} 
                    value={faq.id}
                    className="border border-white/10 rounded-lg px-6 data-[state=open]:bg-white/5"
                  >
                    <AccordionTrigger className="text-white hover:text-purple-200 text-left py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold">{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pb-6 leading-relaxed ml-11">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-gray-300 mb-4">Still have questions?</p>
          <div className="flex justify-center gap-4">
            <a 
              href="https://wa.me/252615240484?text=I have a question about your services"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <Users className="w-4 h-4" />
              Chat with us
            </a>
            <a 
              href="mailto:hello.mahadcreates@gmail.com?subject=Question about services"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              Email us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;