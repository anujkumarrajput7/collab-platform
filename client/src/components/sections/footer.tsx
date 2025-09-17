import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

const footerLinks = {
  platform: [
    { name: "For Creators", href: "#creators" },
    { name: "For Businesses", href: "#businesses" },
    { name: "Marketplace", href: "#marketplace" },
    { name: "Success Stories", href: "#testimonials" },
    { name: "Pricing", href: "#pricing" }
  ],
  resources: [
    { name: "Help Center", href: "#help" },
    { name: "Creator Guide", href: "#guide" },
    { name: "Business Resources", href: "#resources" },
    { name: "API Documentation", href: "#api" },
    { name: "Community", href: "#community" }
  ],
  company: [
    { name: "About Us", href: "#about" },
    { name: "Careers", href: "#careers" },
    { name: "Press Kit", href: "#press" },
    { name: "Contact", href: "#contact" },
    { name: "Blog", href: "#blog" }
  ],
  legal: [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Cookie Policy", href: "#cookies" },
    { name: "Security", href: "#security" },
    { name: "Compliance", href: "#compliance" }
  ]
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-500" },
  { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-blue-400" },
  { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-600" },
  { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-500" }
];

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary">
                  <span className="text-lg font-bold text-primary-foreground">CT</span>
                </div>
                <span className="text-2xl font-bold text-gradient">CREATERRA</span>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed max-w-md">
                The global collaboration platform connecting creative professionals with innovative 
                businesses. Build meaningful partnerships, showcase your talent, and grow together.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>hello@createrra.com</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>+91 9876543210</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Kanpur, Uttar Pradesh, India</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon"
                    className={`transition-smooth ${social.color}`}
                    asChild
                  >
                    <a href={social.href} aria-label={social.label}>
                      <social.icon className="w-5 h-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-3">
                {footerLinks.platform.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3 mb-6">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>

              <h5 className="font-semibold mb-3 text-sm">Legal</h5>
              <ul className="space-y-2">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-xs text-muted-foreground hover:text-foreground transition-smooth"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Section */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 CREATERRA. All rights reserved. Made with ❤️ in India.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>🌍 Global Platform</span>
              <span>🔒 Secure Payments</span>
              <span>⚡ 24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}