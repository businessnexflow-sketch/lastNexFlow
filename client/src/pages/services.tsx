import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { georgianContent } from "@/lib/georgian-content";
import { 
  MessageSquare, 
  Users, 
  Mail, 
  FileText,
  Webhook,
  Settings,
  Bot,
  Database
} from "lucide-react";

export default function Services() {
  const [activeFilter, setActiveFilter] = useState("all");

  const services = [
    {
      title: georgianContent.services.items[0].title,
      description: georgianContent.services.items[0].description,
      icon: MessageSquare,
      category: "messaging",
      detailedDescription: "WhatsApp და Messenger ჩატბოტების შექმნა, რომლებიც ავტომატურად პასუხობენ კლიენტების შეკითხვებს, ამუშავებენ შეკვეთებს და აკეთებენ შეთავაზებებს.",
      features: [
        "24/7 ავტომატური პასუხები",
        "მულტი-ენოვანი მხარდაჭერა",
        "შეკვეთების დამუშავება",
        "CRM ინტეგრაცია",
        "ანალიტიკა და რეპორტები"
      ]
    },
    {
      title: georgianContent.services.items[1].title,
      description: georgianContent.services.items[1].description,
      icon: Users,
      category: "crm",
      detailedDescription: "CRM სისტემების დაკავშირება სხვადასხვა პლატფორმებთან, მონაცემების ავტომატური სინქრონიზაცია და workflow-ების ოპტიმიზაცია.",
      features: [
        "Real-time მონაცემების სინქრონიზაცია",
        "მულტი-პლატფორმა ინტეგრაცია",
        "ავტომატური კონტაქტების განახლება",
        "Sales Pipeline ავტომატიზაცია",
        "რეპორტინგი და ანალიტიკა"
      ]
    },
    {
      title: georgianContent.services.items[2].title,
      description: georgianContent.services.items[2].description,
      icon: Mail,
      category: "email",
      detailedDescription: "ელფოსტის მარკეტინგის კამპანიების ავტომატიზაცია, პერსონალიზებული შეტყობინებები და ტრიგერ-დაფუძნებული კომუნიკაცია.",
      features: [
        "დრაფტიარული კამპანიები",
        "პერსონალიზაცია",
        "A/B ტესტირება",
        "ავტომატური Follow-up",
        "კონვერტაციის ტრეკინგი"
      ]
    },
    {
      title: georgianContent.services.items[3].title,
      description: georgianContent.services.items[3].description,
      icon: FileText,
      category: "data",
      detailedDescription: "ფაილების და მონაცემების ავტომატური სინქრონიზაცია Google Sheets, Airtable, databases და სხვა სისტემებს შორის.",
      features: [
        "Real-time სინქრონიზაცია",
        "მონაცემების ვალიდაცია",
        "ერრორების შეტყობინებები",
        "Backup და Recovery",
        "მრავალი ფორმატის მხარდაჭერა"
      ]
    },
    {
      title: "Webhook ავტომატიზაცია",
      description: "Real-time მონაცემების გადაცემა და ავტომატური პროცესების გააქტიურება",
      icon: Webhook,
      category: "data",
      detailedDescription: "Webhook-ების მეშვეობით სისტემებს შორის რეალ-დროში მონაცემების გადაცემა და ავტომატური პროცესების ტრიგერი.",
      features: [
        "Real-time Event Handling",
        "Secure Webhook Endpoints",
        "Error Handling და Retry Logic",
        "Payload Transformation",
        "Monitoring და Logging"
      ]
    },
    {
      title: "მორგებული Workflow",
      description: "სრულად კონფიგურირებადი ავტომატიზაციები თქვენი უნიკალური საჭიროებისთვის",
      icon: Settings,
      category: "custom",
      detailedDescription: "სრულად მორგებული n8n workflow-ები, რომლებიც შექმნილია თქვენი ბიზნესის სპეციფიკური მოთხოვნების შესაბამისად.",
      features: [
        "კონსულტაცია და დაგეგმვა",
        "მორგებული ლოგიკა",
        "ინტეგრაცია ნებისმიერ API-სთან",
        "ტესტირება და ოპტიმიზაცია",
        "დოკუმენტაცია და ტრენინგი"
      ]
    }
    ,
    {
      title: "Facebook / Instagram / YouTube Auto Poster ავტომატიზაციის Workflow",
      description: "ავტომატურად გააზიარე პოსტები, ვიდეოები და სტორიები ერთიანი პანელიდან Facebook, Instagram და YouTube-ზე.",
      icon: Bot,
      category: "custom",
      detailedDescription: `ეს სისტემა საშუალებას გაძლევთ ავტომატურად გააზიაროთ პოსტები, ვიდეოები და სტორიები Facebook-ზე, Instagram-ზე და YouTube-ზე ერთიანი მართვის პანელიდან. იგი შექმნილია დროის დასაზოგად და კონტენტის მართვის პროცესის გასამარტივებლად — განსაკუთრებით იმ ბიზნესებისა და კონტენტ-კრეატორებისთვის, რომლებიც რამდენიმე პლატფორმაზე ერთდროულად აქტიურობენ.`,
      features: [
        "დაგეგმილი პოსტინგი — კონტენტის წინასწარ დაგეგმვა ზუსტად მითითებულ დღესა და საათზე",
        "ავტომატური გადაზიარება — ერთი პლატფორმაზე ატვირთული პოსტი ავტომატურად ქვეყნდება დანარჩენ არხებზე",
        "Smart Caption Generator (AI) — ავტომატურად გენერირებული აღწერები და ჰეშთეგები",
        "ანალიტიკა და რეპორტები — ნახვები, ჩართულობა, მოწონებები და კომენტარები ერთ პანელში",
        "სოციალური მედიის API-ებთან ინტეგრაცია (Meta, YouTube) — უსაფრთხო და ოფიციალური კავშირი",
        "სურათების და ვიდეოების ოპტიმიზაცია — ფორმატების ავტომატური მორგება (16:9, 1:1, 9:16)",
        "კონტენტის ბიბლიოთეკა — თქვენი ფოტოები, ვიდეოები და ტექსტები ინახება უსაფრთხოდ",
        "Auto Hashtag Generator — თემის მიხედვით ჰეშთეგების გენერაცია",
        "შეტყობინებები და შეცდომების მონიტორინგი — ასისტირება თუ პოსტი ვერ გამოაქვეყნდა ან საჭიროა ახალი ავტორიზაცია"
      ]
    }
  ];

  const filters = [
    { key: "all", label: georgianContent.services.filters.all },
    { key: "messaging", label: georgianContent.services.filters.messaging },
    { key: "crm", label: georgianContent.services.filters.crm },
    { key: "email", label: georgianContent.services.filters.email },
    { key: "data", label: georgianContent.services.filters.data },
    { key: "custom", label: "მორგებული" }
  ];

  const filteredServices = activeFilter === "all" 
    ? services 
    : services.filter(service => service.category === activeFilter);

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
              {georgianContent.services.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-firago">
              {georgianContent.services.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Service Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <Button
                key={filter.key}
                variant={activeFilter === filter.key ? "default" : "outline"}
                onClick={() => setActiveFilter(filter.key)}
                className="font-firago"
                data-testid={`filter-${filter.key}`}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Services Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.title}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="card-hover glass-card rounded-xl p-6 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                
                <Badge variant="secondary" className="mb-3 font-firago">
                  {filters.find(f => f.key === service.category)?.label}
                </Badge>

                <h3 className="text-xl font-semibold text-foreground mb-2 font-firago">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4 font-firago">
                  {service.description}
                </p>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="text-primary hover:text-primary/80 font-medium p-0 h-auto font-firago transition-transform duration-200 hover:scale-105 hover:-translate-y-0.5"
                      data-testid={`button-learn-more-${index}`}
                    >
                      {georgianContent.services.items[0].cta} →
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[70vh] overflow-auto">
                    <DialogHeader className="sticky top-0 bg-background/60 backdrop-blur-sm">
                      <DialogTitle className="text-2xl font-bold font-firago">
                        {service.title}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 p-4">
                      <p className="text-muted-foreground font-firago">
                        {service.detailedDescription}
                      </p>
                      
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 font-firago">
                          ძირითადი თვისებები:
                        </h4>
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-muted-foreground font-firago">
                              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <Button asChild className="font-firago transition-transform duration-200 hover:scale-105" data-testid={`button-order-${index}`}>
                          <Link href="/order">შეკვეთის გაფორმება</Link>
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </motion.div>
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
              ვერ იპოვეთ რასაც ეძებდით?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-firago">
              ჩვენ ვქმნით მორგებულ ავტომატიზაციებს ნებისმიერი სირთულის. მოგვწერეთ თქვენი საჭიროებების შესახებ.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="font-firago" data-testid="button-custom-order">
                <Link href="/order">
                  მორგებული შეკვეთა
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
