import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { georgianContent } from "@/lib/georgian-content";
import { MapPin, Phone, Mail, User } from "lucide-react";
import giorgiPhoto from "@assets/WhatsApp Image 2025-08-01 at 23.37.17_17286ac2 (29)_1758894082230.jpg";
import tornikePhoto from "@assets/1755198503835_1758901441709.png";

export default function Contact() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/995599123456', '_blank');
  };

  return (
    <main className="pt-20 flex flex-col items-center">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-firago">
              {georgianContent.contact.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-firago">
              {georgianContent.contact.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-background">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-8 h-full flex flex-col justify-center items-center"
            >
              {/* Office Info */}
                <Card className="glass-card card-hover w-full max-w-xl mx-auto">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2 font-firago">
                        {georgianContent.contact.office}
                      </h3>
                      <p className="text-muted-foreground font-firago">
                        ჩვენ ვმუშაობთ სრულად ონლაინ რეჟიმში.<br/>
                        📍  საქართველო<br/>
                        📧 business.nexflow@gmail.com
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Phone Info */}
              <Card className="glass-card card-hover w-full max-w-xl mx-auto">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2 font-firago">
                        {georgianContent.contact.phone}
                      </h3>
                      <p className="text-muted-foreground font-firago">
                        +995 574 20 12 21<br/>
                        <span className="text-sm">სამუშაო საათები: 24/7</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email Info */}
              <Card className="glass-card card-hover w-full max-w-xl mx-auto">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2 font-firago">
                        {georgianContent.contact.email}
                      </h3>
                      <p className="text-muted-foreground font-firago">
                        business.nexflow@gmail.com
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp Button */}
              <div className="w-full max-w-xl mx-auto">
              <Button 
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-3 font-firago"
                data-testid="button-whatsapp"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
                </svg>
                <span>{georgianContent.contact.whatsapp}</span>
              </Button>
              </div>
            </motion.div>

            <div className="h-full flex items-center justify-center" aria-hidden>
              {/* intentionally left blank to preserve two-column layout */}
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-firago">
              ჩვენი გუნდი
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-firago">
              გაიცანით ჩვენი გუნდის წევრები, რომლებიც მზად არიან დაგეხმარონ თქვენი ავტომატიზაციის საჭიროებებში
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 justify-center items-center max-w-4xl mx-auto">
            {/* Giorgi Natsvlishvili */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card card-hover h-full">
                <CardContent className="p-6 text-center">
                  <div className="mb-6">
                    <img 
                      src={giorgiPhoto} 
                      alt="გიორგი ნაცვლიშვილი"
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary/20"
                      data-testid="img-giorgi-photo"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 font-firago">
                    გიორგი ნაცვლიშვილი
                  </h3>
                  
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center justify-center space-x-3 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span className="font-firago" data-testid="text-giorgi-phone">574099951</span>
                    </div>
                    <div className="flex items-center justify-center space-x-3 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span className="font-firago text-sm" data-testid="text-giorgi-email">giorginatsvlishvili2010@gmail.com</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tornike Svimonishvili */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card card-hover h-full">
                <CardContent className="p-6 text-center">
                  <div className="mb-6">
                    <img 
                      src={tornikePhoto} 
                      alt="თორნიკე სვიმონიშვილი"
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary/20"
                      data-testid="img-tornike-photo"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 font-firago">
                    თორნიკე სვიმონიშვილი
                  </h3>
                  
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center justify-center space-x-3 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span className="font-firago" data-testid="text-tornike-phone">574201221</span>
                    </div>
                    <div className="flex items-center justify-center space-x-3 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span className="font-firago text-sm" data-testid="text-tornike-email">svimonishvilitoka@gmail.com</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-firago">
              მზად ხართ დაიწყოთ?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-firago">
              დაგვიკავშირდით დღესვე და მიიღეთ უფასო კონსულტაცია თქვენი ბიზნესის ავტომატიზაციისთვის.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="font-firago" data-testid="button-start-project">
                <Link href="/order">
                  პროექტის დაწყება
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-firago" data-testid="button-consultation">
                <Link href="/contact">
                  უფასო კონსულტაცია
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
