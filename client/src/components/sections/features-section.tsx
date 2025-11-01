import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users,
  MessageSquare,
  Star,
  Shield,
  TrendingUp,
  Zap,
  Search,
  CreditCard,
  Award
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "AI-Powered Matching",
    description: "Our intelligent algorithm connects creators with the perfect brand partnerships based on audience, style, and goals.",
    category: "Discovery",
    gradient: "bg-gradient-primary"
  },
  {
    icon: MessageSquare,
    title: "Seamless Communication",
    description: "Built-in messaging system with file sharing, project management, and real-time collaboration tools.",
    category: "Collaboration",
    gradient: "bg-gradient-accent"
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Integrated payment processing with escrow protection, milestone payments, and transparent fee structure.",
    category: "Security",
    gradient: "bg-gradient-primary"
  },
  {
    icon: Star,
    title: "Portfolio Showcase",
    description: "Beautiful portfolio builder to showcase your best work, analytics, and social proof to attract brands.",
    category: "Profile",
    gradient: "bg-gradient-accent"
  },
  {
    icon: TrendingUp,
    title: "Analytics Dashboard",
    description: "Comprehensive insights into campaign performance, audience engagement, and revenue tracking.",
    category: "Analytics",
    gradient: "bg-gradient-primary"
  },
  {
    icon: Award,
    title: "Verified Community",
    description: "Verified creator and business profiles ensure authentic partnerships and maintain platform quality.",
    category: "Trust",
    gradient: "bg-gradient-accent"
  },
  {
    icon: Zap,
    title: "Quick Proposals",
    description: "Streamlined proposal system allows creators to apply for opportunities in just a few clicks.",
    category: "Efficiency",
    gradient: "bg-gradient-primary"
  },
  {
    icon: CreditCard,
    title: "Flexible Pricing",
    description: "Support for both paid collaborations and brand partnerships with flexible pricing models.",
    category: "Monetization",
    gradient: "bg-gradient-accent"
  },
  {
    icon: Users,
    title: "Community Network",
    description: "Connect with other creators, share resources, and learn from successful collaboration stories.",
    category: "Community",
    gradient: "bg-gradient-primary"
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4 bg-accent-soft text-accent">
            Platform Features
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Everything You Need for 
            <span className="text-gradient"> Successful Collaborations</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            CREATERRA provides all the tools, security, and community features needed 
            to build lasting partnerships between creators and businesses.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-card transition-smooth border-0 shadow-sm hover:shadow-lg animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl ${feature.gradient} flex items-center justify-center group-hover:shadow-glow transition-smooth`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {feature.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-smooth">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="inline-block p-8 rounded-2xl bg-gradient-subtle border border-border/50">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Creative Business?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Join thousands of creators and businesses already building successful 
              partnerships on CREATERRA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                <Star className="w-3 h-3 mr-1" />
                Free to join
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Shield className="w-3 h-3 mr-1" />
                Secure payments
              </Badge>
              <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                <Award className="w-3 h-3 mr-1" />
                Verified community
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}