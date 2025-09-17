import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  UserPlus,
  Search,
  MessageSquare,
  Handshake,
  TrendingUp,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Create Your Profile",
    description: "Build a compelling profile showcasing your skills, portfolio, and collaboration preferences.",
    userType: "Both",
    gradient: "bg-gradient-primary"
  },
  {
    step: "02", 
    icon: Search,
    title: "Discover Opportunities",
    description: "Browse curated collaboration opportunities or let our AI match you with perfect partners.",
    userType: "Creator",
    gradient: "bg-gradient-accent"
  },
  {
    step: "03",
    icon: MessageSquare,
    title: "Connect & Negotiate",
    description: "Use our secure messaging system to discuss project details, timelines, and compensation.",
    userType: "Both",
    gradient: "bg-gradient-primary"
  },
  {
    step: "04",
    icon: Handshake,
    title: "Collaborate & Create",
    description: "Work together using our project management tools while we handle contracts and payments.",
    userType: "Both",
    gradient: "bg-gradient-accent"
  },
  {
    step: "05",
    icon: TrendingUp,
    title: "Track & Grow",
    description: "Monitor campaign performance, collect feedback, and build long-term partnerships.",
    userType: "Both",
    gradient: "bg-gradient-primary"
  }
];

const benefits = [
  "No upfront costs - only pay when you succeed",
  "Verified profiles ensure quality partnerships",
  "Integrated payment protection and escrow",
  "24/7 customer support for all users",
  "Analytics and performance tracking tools",
  "Community forums and networking events"
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            How It Works
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Simple Steps to 
            <span className="text-gradient"> Successful Collaborations</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Getting started on CREATERRA is easy. Follow these simple steps to begin 
            your journey toward meaningful creator-business partnerships.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 mb-20">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="lg:flex lg:items-center lg:space-x-8">
                {/* Step Card */}
                <Card className="lg:w-2/3 shadow-card border-0 animate-slide-up" style={{ animationDelay: `${index * 200}ms` }}>
                  <CardHeader className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 rounded-2xl ${step.gradient} flex items-center justify-center shadow-glow`}>
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-2xl font-bold text-gradient">{step.step}</span>
                          <Badge variant="outline" className="text-xs">
                            {step.userType}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl">{step.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Arrow (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex lg:w-1/3 justify-center">
                    <ArrowRight className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                )}
              </div>

              {/* Mobile Arrow */}
              {index < steps.length - 1 && (
                <div className="lg:hidden flex justify-center py-4">
                  <ArrowRight className="w-6 h-6 text-muted-foreground/50 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold mb-6">
              Why Choose CREATERRA?
            </h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button variant="hero" size="lg">
                Get Started Today
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          <Card className="p-8 bg-gradient-subtle border-border/50 shadow-elegant">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-4">Success Guarantee</h4>
              <p className="text-muted-foreground mb-6">
                We're so confident in our platform that we offer a success guarantee. 
                If you don't find meaningful collaborations within your first month, 
                we'll work with you personally to ensure success.
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-success">98%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">24h</div>
                  <div className="text-sm text-muted-foreground">Avg. Response</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}