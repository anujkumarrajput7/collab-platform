import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Play,
  Star,
  Users,
  TrendingUp,
  Camera,
  Video,
  Mic,
  Palette
} from "lucide-react";
import heroImage from "@/assets/hero-collaboration.jpg";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-subtle py-20 lg:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          {/* Content */}
          <div className="max-w-xl">
            <Badge variant="secondary" className="mb-6 bg-accent-soft text-accent">
              <Star className="w-3 h-3 mr-1" />
              Where Creativity Meets Commerce
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Connect. 
              <span className="text-gradient"> Collaborate.</span>
              <br />
              Create Success.
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              CREATERRA bridges the gap between talented content creators and innovative businesses. 
              Build meaningful partnerships, showcase your creativity, and grow your brand through 
              authentic collaborations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button variant="hero" size="lg" className="group">
                <Play className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                Start Collaborating
              </Button>
              <Button variant="glass" size="lg">
                <Video className="w-4 h-4 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Active Creators</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-accent">5K+</div>
                <div className="text-sm text-muted-foreground">Businesses</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-success">98%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="mt-12 lg:mt-0 relative">
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Creative collaboration between influencers and businesses on CREATERRA platform"
                className="rounded-2xl shadow-elegant w-full h-auto"
              />
              
              {/* Floating Cards */}
              <Card className="absolute -top-6 -left-6 w-48 shadow-glow animate-float">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Camera className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Photo Campaign</div>
                      <div className="text-xs text-muted-foreground">+250% Engagement</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="absolute -bottom-6 -right-6 w-52 shadow-glow animate-float" style={{ animationDelay: "2s" }}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Revenue Growth</div>
                      <div className="text-xs text-muted-foreground">₹2.5M Generated</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}