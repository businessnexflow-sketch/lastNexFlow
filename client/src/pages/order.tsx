import { motion } from "framer-motion";
import OrderWizard from "@/components/order/order-wizard";
import { georgianContent } from "@/lib/georgian-content";

// ✅ GeorgianContent ტიპი (თუ ჯერ არ გაქვს, შეგიძლია გადაამოწმო)
interface GeorgianOrderContent {
  title: string;
  subtitle: string;
}

interface GeorgianContentType {
  order: GeorgianOrderContent;
}

export default function Order() {
  // დარწმუნდით, რომ georgianContent ტიპიზებულია
  const content: GeorgianContentType = georgianContent;

  return (
    <main className="pt-20">
      {/* Order Section - Multi-step Wizard */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 min-h-screen relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <svg width="100%" height="100%" className="absolute inset-0 opacity-10">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" className="text-muted/30" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Order Wizard Container */}
          <motion.div
            className="glass-card rounded-2xl p-8 md:p-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-firago">
                {content.order.title}
              </h1>
              <p className="text-xl text-muted-foreground font-firago">
                {content.order.subtitle}
              </p>
            </div>

            {/* Order Wizard */}
            <OrderWizard />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
