import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import WorkflowBackground from "@/components/animations/workflow-bg";
import { georgianContent } from "@/lib/georgian-content";
import { 
  Zap, 
  CheckCircle, 
  Clock, 
  MessageSquare, 
  Users, 
  Mail, 
  FileText,
  Star
} from "lucide-react";

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="hero-bg relative min-h-screen flex items-center">
        <WorkflowBackground />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight font-dachi">
                გახადე ავტომატიზირებული<br/>
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-dachi">
                  შენი ბიზნეს პროცესები
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed font-firago">
                {georgianContent.hero.subheadline}
              </p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button asChild size="lg" className="text-lg font-firago" data-testid="button-order-hero">
                <Link href="/order">
                  {georgianContent.hero.primaryCta}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg font-firago" data-testid="button-services-hero">
                <Link href="/services">
                  {georgianContent.hero.secondaryCta}
                </Link>
              </Button>
            </motion.div>

            {/* Floating elements */}
            <div className="absolute top-20 left-10 animate-float hidden lg:block" style={{animationDelay: '1s'}}>
              <div className="w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-xl opacity-20"></div>
            </div>
            <div className="absolute top-40 right-20 animate-float hidden lg:block" style={{animationDelay: '2s'}}>
              <div className="w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-full opacity-30"></div>
            </div>
            <div className="absolute bottom-40 left-1/4 animate-float hidden lg:block" style={{animationDelay: '3s'}}>
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg opacity-25"></div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
            <div className="w-1 h-2 bg-muted-foreground rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-firago">
              {georgianContent.whyUs.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-firago">
              {georgianContent.whyUs.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {georgianContent.whyUs.cards.map((card, index) => (
              <motion.div
                key={index}
                className="animate-on-scroll card-hover glass-card rounded-xl p-6 text-center group"
                style={{animationDelay: `${0.1 * (index + 1)}s`}}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {index === 0 && <Zap className="w-8 h-8 text-primary-foreground" />}
                  {index === 1 && <CheckCircle className="w-8 h-8 text-primary-foreground" />}
                  {index === 2 && <Clock className="w-8 h-8 text-primary-foreground" />}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2 font-firago">{card.title}</h3>
                <p className="text-muted-foreground font-firago">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-firago">
              {georgianContent.howItWorks.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-firago">
              {georgianContent.howItWorks.subtitle}
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border transform -translate-y-1/2 hidden md:block"></div>
            <div className="absolute top-1/2 left-0 w-1/3 h-0.5 bg-primary transform -translate-y-1/2 hidden md:block animate-pulse"></div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {georgianContent.howItWorks.steps.map((step, index) => (
                <div key={index} className="animate-on-scroll text-center" style={{animationDelay: `${0.1 * (index + 1)}s`}}>
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto mb-4 relative z-10 ${
                      index === 0 ? 'bg-primary' : index === 1 ? 'bg-secondary' : 'bg-accent'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 font-firago">{step.title}</h3>
                  <p className="text-muted-foreground font-firago">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-firago">
              {georgianContent.services.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-firago">
              {georgianContent.services.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {georgianContent.services.items.slice(0, 4).map((service, index) => (
              <motion.div
                key={index}
                className="animate-on-scroll card-hover glass-card rounded-xl p-6 group"
                style={{animationDelay: `${0.1 * (index + 1)}s`}}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {index === 0 && <MessageSquare className="w-6 h-6 text-primary-foreground" />}
                  {index === 1 && <Users className="w-6 h-6 text-primary-foreground" />}
                  {index === 2 && <Mail className="w-6 h-6 text-primary-foreground" />}
                  {index === 3 && <FileText className="w-6 h-6 text-primary-foreground" />}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 font-firago">{service.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 font-firago">
                  {service.description}
                </p>
                <Button variant="ghost" className="text-primary hover:text-primary/80 font-medium transition-colors duration-200 p-0 h-auto font-firago">
                  {service.cta} →
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg" className="font-firago" data-testid="button-all-services">
              <Link href="/services">
                ყველა სერვისის ნახვა
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-firago">
              მომხმარებელთა გამოხმაურება
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-firago">
              ნახეთ რას ამბობენ ჩვენი კლიენტები ჩვენ შესახებ
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "გიორგი მელაძე",
                role: "CEO, TechStart",
                text: "ჩვენმა ავტომატიზაციამ დაგვზოგა 10+ საათი კვირაში. CRM და WhatsApp ინტეგრაცია სრულყოფილია.",
                avatar: "გ"
              },
              {
                name: "ნინო ხარაბაძე", 
                role: "მარკეტინგის მენეჯერი",
                text: "ელფოსტის ავტომატიზაციამ ჩვენი მარკეტინგის ეფექტურობა 300%-ით გაზარდა. შესანიშნავი მხარდაჭერა!",
                avatar: "ნ"
              },
              {
                name: "ლევან გიორგაძე",
                role: "ბიზნეს ანალიტიკოსი", 
                text: "მონაცემების სინქრონიზაცია Google Sheets-თან ავტომატური გახდა. ეს არის ყველაზე საუკეთესო ინვესტიცია!",
                avatar: "ლ"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="animate-on-scroll card-hover glass-card rounded-xl p-6"
                style={{animationDelay: `${0.1 * (index + 1)}s`}}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-primary-foreground font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground font-firago">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground font-firago">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic mb-4 font-firago">
                  "{testimonial.text}"
                </p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-secondary to-accent">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="animate-on-scroll">
            <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6 font-firago">
              {georgianContent.cta.title}
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto font-firago">
              {georgianContent.cta.subtitle}
            </p>
            <Button asChild size="lg" variant="secondary" className="text-lg font-firago" data-testid="button-order-cta">
              <Link href="/order">
                {georgianContent.cta.button}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
