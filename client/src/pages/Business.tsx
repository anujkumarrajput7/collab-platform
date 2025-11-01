import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Target, TrendingUp, Users, Zap, Shield, BarChart } from "lucide-react";

const Business = () => {
  const benefits = [
    {
      icon: Target,
      title: "Targeted Reach",
      description: "Connect with creators whose audience matches your target demographic"
    },
    {
      icon: TrendingUp,
      title: "Measurable Results",
      description: "Track campaign performance with detailed analytics and ROI metrics"
    },
    {
      icon: Users,
      title: "Verified Creators",
      description: "Work with authenticated influencers with proven engagement rates"
    },
    {
      icon: Zap,
      title: "Quick Launch",
      description: "Start campaigns in minutes with our streamlined process"
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Protected transactions with milestone-based payment system"
    },
    {
      icon: BarChart,
      title: "Performance Tracking",
      description: "Real-time campaign monitoring and detailed reporting"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Grow Your <span className="text-gradient">Business</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Leverage the power of influencer marketing to reach your target audience and drive real business results
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">Start a Campaign</Button>
            <Button variant="outline" size="lg">Schedule Demo</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="hover:shadow-glow transition-smooth">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-subtle rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to scale your brand?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of businesses using CREATERRA to connect with top creators and drive growth
          </p>
          <Button variant="hero" size="lg">Get Started Today</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Business;
