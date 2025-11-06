import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { georgianContent } from "@/lib/georgian-content";

export default function About() {
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
    <main className="pt-20">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-firago">
              {georgianContent.about.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-firago">
              {georgianContent.about.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="animate-on-scroll">
            <Card className="glass-card">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-2xl font-semibold text-foreground mb-6 font-firago">
                  {georgianContent.about.story.title}
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed mb-4 font-firago">
                    {georgianContent.about.story.text1}
                  </p>
                  <p className="text-muted-foreground leading-relaxed font-firago">
                    {georgianContent.about.story.text2}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-firago">
              {georgianContent.about.team.title}
            </h2>
          </div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8 justify-center max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                name: `თორნიკე სვიმონიშვილი`,
                role: `n8n Developer & Co-Founder`,
                description: `აქვს გამოცდილება ბიზნეს პროცესების ანალიზისა და ავტომატიზაციის სტრატეგიების შექმნით, მდიდარი გამოცდილებით კლიენტებთან მუშაობისა და ბიზნესის საჭიროებების ზუსტად იდენტიფიცირების მიმართულებით.`,
                avatar: `თ`,
                gradient: `from-primary to-secondary`
              },
              {
                name: `გიორგი ნაცვლიშვილი`,
                role: `Business Development & Co-Founder`,
                description: `გამოცდილი დეველოპერი ავტომატიზაციის მიმართულებით, სპეციალისტი AI ავტომატიზაციების შექმნაში და კომპლექსური ინტეგრაციების განხორციელებაში.`,
                avatar: `გ`,
                gradient: `from-secondary to-accent`
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="card-hover text-center group"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="glass-card">
                  <CardContent className="p-6">
                    <div className={`w-24 h-24 bg-gradient-to-r ${member.gradient} rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {member.avatar}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2 font-firago">
                      {member.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 font-firago">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground font-firago">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-firago">
              {georgianContent.about.timeline.title}
            </h2>
          </div>

          <div className="relative animate-on-scroll">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              {[
                {
                  title: "კომპანიის დაფუძნება",
                  date: "2025 აგვისტო",
                  description: "ერთერთი პირველი n8n ავტომატიზაციები საქართველოში",
                  color: "bg-primary",
                  side: "right"
                },
                {
                  title: "3+ კლიენტი",
                  date: "კომანიის დაარსებიდან 1 კვირაში", 
                  description: "პირველი წარმატებული პროექტების დასრულება",
                  color: "bg-secondary",
                  side: "left"
                },
                {
                  title: "ჩვენი პირველი კლიენტი",
                  date: "2025 აგვისტო",
                  description: "ჩვენი პირველი კლიენტი",
                  color: "bg-accent",
                  side: "right"
                }
              ].map((item, index) => (
              <motion.div
                key={index}
                className="relative flex items-center"
                initial={{ opacity: 0, x: item.side === "right" ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {item.side === "right" ? (
                  <>
                    <div className="flex-1 pr-8"></div>
                    <div className={`w-4 h-4 ${item.color} rounded-full relative z-10`}></div>
                    <div className="flex-1 text-left pl-8">
                      <Card className="glass-card">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-foreground font-firago">{item.title}</h4>
                          <p className="text-sm text-muted-foreground font-firago">{item.date}</p>
                          <p className="text-muted-foreground mt-1 font-firago">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-1 text-right pr-8">
                      <Card className="glass-card">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-foreground font-firago">{item.title}</h4>
                          <p className="text-sm text-muted-foreground font-firago">{item.date}</p>
                          <p className="text-muted-foreground mt-1 font-firago">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className={`w-4 h-4 ${item.color} rounded-full relative z-10`}></div>
                    <div className="flex-1 pl-8"></div>
                  </>
                )}
              </motion.div>
            ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
