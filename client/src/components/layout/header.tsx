import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { georgianContent } from "@/lib/georgian-content";
import NexFlowLogo from "./07da2836-21bb-40da-a81a-bef79cc863c9.png";

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: georgianContent.nav.home, href: "/" },
    { name: georgianContent.nav.services, href: "/services" },
    { name: georgianContent.nav.order, href: "/order" },
    { name: georgianContent.nav.about, href: "/about" },
    { name: georgianContent.nav.team, href: "/team" },
    { name: georgianContent.nav.contact, href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <img src={NexFlowLogo} alt="NexFlow logo" className="w-8 h-8 rounded" />
              <span className="text-xl font-bold font-firago">NexFlow</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={`relative group transition-colors duration-200 font-firago ${
                    location === item.href 
                      ? 'text-primary' 
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    location === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button & Social */}
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild className="font-firago">
              <Link href="/order" data-testid="button-order-header">
                {georgianContent.hero.primaryCta}
              </Link>
            </Button>
            
            {/* Facebook Button */}
            <a
              href="https://www.facebook.com/profile.php?id=61582405322799"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center space-x-2 px-4 py-2 h-10 rounded-md bg-gradient-to-r from-[#1877F2] via-[#1565D8] to-[#0D5DBF] hover:from-[#0D5DBF] hover:via-[#1565D8] hover:to-[#1877F2] text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 border border-blue-600/30"
              data-testid="button-facebook"
            >
              <svg 
                className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="font-firago font-semibold">NexFlow</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-lg font-medium transition-colors duration-200 font-firago ${
                        location === item.href ? 'text-primary' : 'text-foreground hover:text-primary'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Button asChild className="mt-4 font-firago">
                    <Link href="/order" onClick={() => setIsOpen(false)}>
                      {georgianContent.hero.primaryCta}
                    </Link>
                  </Button>
                  
                  {/* Facebook Button Mobile */}
                  <a
                    href="https://www.facebook.com/profile.php?id=61582405322799"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-3 px-6 py-3 mt-4 rounded-lg bg-gradient-to-r from-[#1877F2] to-[#0D5DBF] hover:from-[#0D5DBF] hover:to-[#1877F2] text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg 
                      className="w-5 h-5" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="font-firago">Facebook</span>
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
