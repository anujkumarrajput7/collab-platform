import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  Star,
  Users,
  Shield,
  Zap
} from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Header */}
          <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
            <Star className="w-3 h-3 mr-1" />
            Join the Revolution
          </Badge>
          
          <h2 className="text-3xl lg:text-6xl font-bold mb-6 leading-tight">
            Ready to Transform Your
            <br />
            <span className="text-primary-glow">Creative Journey?</span>
          </h2>
          
          <p className="text-lg lg:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of successful creators and innovative businesses who are already 
            building meaningful partnerships and growing their brands on CREATERRA.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button variant="secondary" size="lg" className="group bg-white text-primary hover:bg-white/90">
              <Users className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Join as Creator
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="glass" size="lg" className="group text-white border-white/30 hover:bg-white/10">
              <Shield className="w-5 h-5 mr-2" />
              Join as Business
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Quick Setup</h3>
                <p className="text-sm text-white/70">
                  Get started in under 5 minutes with our intuitive onboarding process.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Secure Platform</h3>
                <p className="text-sm text-white/70">
                  Bank-level security with escrow payments and verified profiles.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">24/7 Support</h3>
                <p className="text-sm text-white/70">
                  Dedicated customer success team to help you succeed.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/60 text-sm">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>4.9/5 rating from 2,000+ reviews</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span>ISO 27001 certified platform</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span>15,000+ active community members</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}