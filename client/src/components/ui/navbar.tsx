import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Bell, 
  MessageSquare, 
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <span className="text-sm font-bold text-primary-foreground">CT</span>
            </div>
            <span className="text-xl font-bold text-gradient">CREATERRA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/discover" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth">
              Discover
            </Link>
            <Link to="/creators" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth">
              Creators
            </Link>
            <Link to="/business" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth">
              Businesses
            </Link>
            <Link to="/marketplace" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth">
              Marketplace
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-accent text-accent-foreground text-xs">
                3
              </Badge>
            </Button>
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate("/auth")}>
              Sign In
            </Button>
            <Button variant="hero" size="sm" onClick={() => navigate("/auth")}>
              Join CREATERRA
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border/40">
            <div className="flex flex-col space-y-2">
              <Link to="/discover" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth py-2">
                Discover
              </Link>
              <Link to="/creators" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth py-2">
                Creators
              </Link>
              <Link to="/business" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth py-2">
                Businesses
              </Link>
              <Link to="/marketplace" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth py-2">
                Marketplace
              </Link>
            </div>
            <div className="flex flex-col space-y-2 pt-4 border-t border-border/40">
              <Button variant="outline" className="w-full" onClick={() => navigate("/auth")}>
                Sign In
              </Button>
              <Button variant="hero" className="w-full" onClick={() => navigate("/auth")}>
                Join CREATERRA
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}