import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Bell, 
  MessageSquare, 
  Users, 
  Briefcase,
  Menu,
  X,
  ChevronDown  // ADD THIS IMPORT
} from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false); // ADD THIS STATE

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <span className="text-sm font-bold text-primary-foreground">CT</span>
            </div>
            <span className="text-xl font-bold text-gradient">CREATERRA</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#discover" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth">
              Discover
            </a>
            <a href="#creators" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth">
              Creators
            </a>
            <a href="#businesses" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth">
              Businesses
            </a>
            <a href="#marketplace" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth">
              Marketplace
            </a>
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
            
            {/* REPLACE THIS SIGN IN BUTTON WITH DROPDOWN */}
            <div className="relative">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsSignInOpen(!isSignInOpen)}
                className="flex items-center space-x-1"
              >
                <span>Sign In</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
              
              {isSignInOpen && (
                <div className="absolute right-0 top-full mt-2 w-32 bg-background border border-border rounded-md shadow-lg z-50">
                  <div className="py-1">
                    <a 
                      href="/login" 
                      className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
                    >
                      Login
                    </a>
                    <a 
                      href="/signup" 
                      className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
                    >
                      Sign Up
                    </a>
                  </div>
                </div>
              )}
            </div>

            <Button variant="hero" size="sm">
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
              <a href="#discover" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth py-2">
                Discover
              </a>
              <a href="#creators" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth py-2">
                Creators
              </a>
              <a href="#businesses" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth py-2">
                Businesses
              </a>
              <a href="#marketplace" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth py-2">
                Marketplace
              </a>
            </div>
            <div className="flex flex-col space-y-2 pt-4 border-t border-border/40">
              {/* Mobile Sign In Options */}
              <div className="space-y-2">
                <a href="/login" className="block">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </a>
                <a href="/signup" className="block">
                  <Button variant="outline" className="w-full">
                    Sign Up
                  </Button>
                </a>
              </div>
              <Button variant="hero" className="w-full">
                Join CREATERRA
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
