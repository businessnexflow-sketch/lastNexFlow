import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MessageCircle, Linkedin, Copy } from "lucide-react";
import { SiFacebook } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";
import giorgiPhoto from "@assets/WhatsApp Image 2025-08-01 at 23.37.17_17286ac2 (29)_1758894082230.jpg";
import tornikePhoto from "@assets/1755198503835_1758901441709.png";

const teamMembers = [
  {
    id: "giorgi",
    name: "გიორგი ნაცვლიშვილი",
    role: "Business Development & Co-Founder",
    photo: giorgiPhoto,
    phone: "574099951",
    email: "giorginatsvlishvili2010@gmail.com",
    linkedin: "https://www.linkedin.com/in/giorgi-natsvlishvili-026186220/",
    facebook: "https://www.facebook.com/giorgi.natsvlishvili.342482",
    description: "გამოცდილი დეველოპერი ავტომატიზაციის მიმართულებით, სპეციალისტი AI ავტომატიზაციების შექმნაში და კომპლექსური ინტეგრაციების განხორციელებაში.",
    expertise: ["n8n Development", "API Integrations", "Workflow Automation", "Cloud Technologies"],
    experience: "3+ წლის გამოცდილება",
    languages: ["ქართული", "ინგლისური", "რუსული"],
    gradient: "from-primary to-secondary"
  },
  {
    id: "tornike",
    name: "თორნიკე სვიმონიშვილი",
    role: "n8n Developer & Co-Founder",
    photo: tornikePhoto,
    phone: "574201221",
    email: "svimonishvilitoka@gmail.com",
    linkedin: "https://www.linkedin.com/in/tornike-svimonishvili-150865289/",
    facebook: "https://www.facebook.com/tornike.svimonishvili.12",
    description: "აქვს გამოცდილება ბიზნეს პროცესების ანალიზისა და ავტომატიზაციის სტრატეგიების შექმნით, მდიდარი გამოცდილებით კლიენტებთან მუშაობისა და ბიზნესის საჭიროებების ზუსტად იდენტიფიცირების მიმართულებით.",
    expertise: ["Business Analysis", "Client Relations", "Strategy Development", "Project Management"],
    experience: "4+ წლის გამოცდილება",
    languages: ["ქართული", "ინგლისური"],
    gradient: "from-secondary to-accent"
  }
];

export default function Team() {
  const { toast } = useToast();

  const handleCopyPhone = async (phone: string) => {
    try {
      await navigator.clipboard.writeText(`+995${phone}`);
      toast({
        title: "ნომერი დაკოპირდა",
        description: `+995${phone} დაკოპირდა`,
      });
    } catch (err) {
      toast({
        title: "შეცდომა",
        description: "ნომერის კოპირება ვერ მოხერხდა",
        variant: "destructive",
      });
    }
  };

  const handleEmail = (email: string) => {
    window.open(`mailto:${email}`, '_blank');
  };

  const handleWhatsApp = (phone: string) => {
    window.open(`https://wa.me/995${phone}`, '_blank');
  };

  const handleLinkedIn = (linkedin: string) => {
    window.open(linkedin, '_blank');
  };

  const handleFacebook = (facebook: string) => {
    window.open(facebook, '_blank');
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
              ჩვენი გუნდი
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-firago">
              გაიცანით ჩვენი გუნდის წევრები - ექსპერტები, რომლებიც მზად არიან გადაწყვიტონ თქვენი ბიზნესის ავტომატიზაციის ყველა საჭიროება
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 justify-center max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="glass-card card-hover h-full">
                  <CardContent className="p-8">
                    {/* Profile Header */}
                    <div className="text-center mb-6">
                      <div className="relative mb-4">
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary/20 shadow-lg"
                          data-testid={`img-${member.id}-photo`}
                        />
                        <div className={`absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r ${member.gradient} rounded-full border-4 border-background`}></div>
                      </div>
                      <h2 className="text-2xl font-bold text-foreground mb-2 font-firago">
                        {member.name}
                      </h2>
                      <p className="text-lg text-muted-foreground mb-3 font-firago">
                        {member.role}
                      </p>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                      <p className="text-muted-foreground leading-relaxed font-firago text-center">
                        {member.description}
                      </p>
                    </div>

                    {/* Expertise */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-foreground mb-3 font-firago">
                        ექსპერტიზა
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill, skillIndex) => (
                          <Badge 
                            key={skillIndex} 
                            variant="outline" 
                            className="font-firago text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    

                    {/* Contact Information */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-3 text-muted-foreground">
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        <span className="font-firago" data-testid={`text-${member.id}-phone`}>
                          +995 {member.phone}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 text-muted-foreground">
                        <Mail className="w-4 h-4 flex-shrink-0" />
                        <span className="font-firago text-sm break-all" data-testid={`text-${member.id}-email`}>
                          {member.email}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopyPhone(member.phone)}
                        className="flex-1 min-w-0 font-firago"
                        data-testid={`button-copy-phone-${member.id}`}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        ნომრის კოპირება
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEmail(member.email)}
                        className="flex-1 min-w-0 font-firago"
                        data-testid={`button-email-${member.id}`}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        ელ-ფოსტა
                      </Button>
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleWhatsApp(member.phone)}
                        className="w-full bg-green-500 hover:bg-green-600 font-firago"
                        data-testid={`button-whatsapp-${member.id}`}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp
                      </Button>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleLinkedIn(member.linkedin)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white border-blue-600 font-firago"
                        data-testid={`button-linkedin-${member.id}`}
                      >
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleFacebook(member.facebook)}
                        className="flex-1 bg-blue-800 hover:bg-blue-900 text-white border-blue-800 font-firago"
                        data-testid={`button-facebook-${member.id}`}
                      >
                        <SiFacebook className="w-4 h-4 mr-2" />
                        Facebook
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
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
              ჩვენი ღირებულებები
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-firago">
              ჩვენი გუნდი ხელმძღვანელობს ღირებულებებით, რომლებიც განსაზღვრავს ჩვენს მიდგომას მუშაობისადმი
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "ინოვაცია",
                description: "ყოველთვის ვეძებთ ახალ და უკეთეს გზებს ავტომატიზაციის განსახორციელებლად",
                icon: "🚀"
              },
              {
                title: "ხარისხი",
                description: "ყოველი პროექტი არის უმაღლესი ხარისხის და სრულწმოვნადაა შესრულებული",
                icon: "⭐"
              },
              {
                title: "მხარდაჭერა",
                description: "24/7 მხარდაჭერით ვუზრუნველყოფთ ჩვენი კლიენტების წარმატებას",
                icon: "🤝"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card card-hover text-center h-full">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 font-firago">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground font-firago">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-firago">
              მზად ხართ დაიწყოთ მუშაობა ჩვენთან?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-firago">
              დაგვიკავშირდით დღესვე და გავარკვიოთ ერთად, როგორ შეგიძლიათ გააუტომატუროთ თქვენი ბიზნეს პროცესები
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