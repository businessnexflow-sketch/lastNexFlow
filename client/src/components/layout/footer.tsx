import { Link } from "wouter";
import { georgianContent } from "@/lib/georgian-content";
import NexFlowLogo from "./07da2836-21bb-40da-a81a-bef79cc863c9.png";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src={NexFlowLogo} alt="NexFlow logo" className="w-8 h-8 rounded" />
              <span className="text-xl font-bold font-firago">NexFlow</span>
            </div>
            <p className="text-background/80 mb-4 max-w-md font-firago">
              {georgianContent.footer.description}
            </p>
            <div className="flex space-x-4">
              {/* Social Icons */}
              <a 
                href="https://www.facebook.com/profile.php?id=61582405322799" 
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 bg-gradient-to-br from-[#1877F2] to-[#0D5DBF] hover:from-[#0D5DBF] hover:to-[#1877F2] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30"
                data-testid="footer-facebook"
              >
                <svg className="w-5 h-5 text-white transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 font-firago">{georgianContent.footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-background/80 hover:text-background transition-colors duration-200 font-firago">{georgianContent.nav.home}</Link></li>
              <li><Link href="/services" className="text-background/80 hover:text-background transition-colors duration-200 font-firago">{georgianContent.nav.services}</Link></li>
              <li><Link href="/about" className="text-background/80 hover:text-background transition-colors duration-200 font-firago">{georgianContent.nav.about}</Link></li>
              <li><Link href="/contact" className="text-background/80 hover:text-background transition-colors duration-200 font-firago">{georgianContent.nav.contact}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4 font-firago">{georgianContent.footer.services}</h3>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-background/80 hover:text-background transition-colors duration-200 font-firago">WhatsApp ბოტები</Link></li>
              <li><Link href="/services" className="text-background/80 hover:text-background transition-colors duration-200 font-firago">CRM ინტეგრაცია</Link></li>
              <li><Link href="/services" className="text-background/80 hover:text-background transition-colors duration-200 font-firago">ელფოსტის ავტომატიზაცია</Link></li>
              <li><Link href="/services" className="text-background/80 hover:text-background transition-colors duration-200 font-firago">მონაცემების სინქრონიზაცია</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-background/60 text-sm font-firago">
              {georgianContent.footer.copyright}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-background/60 hover:text-background/80 text-sm transition-colors duration-200 font-firago">{georgianContent.footer.privacy}</a>
              <a href="#" className="text-background/60 hover:text-background/80 text-sm transition-colors duration-200 font-firago">{georgianContent.footer.terms}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
