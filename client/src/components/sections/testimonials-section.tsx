import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Fashion Influencer",
    followers: "250K",
    avatar: "/api/placeholder/64/64",
    content: "CREATERRA transformed my influencer career. I've partnered with 15+ brands this year and increased my income by 400%. The platform makes finding authentic brand partnerships so easy!",
    rating: 5,
    category: "Creator",
    earnings: "₹8.5L earned"
  },
  {
    name: "Rajesh Kumar", 
    role: "Marketing Director",
    company: "TechStart Solutions",
    avatar: "/api/placeholder/64/64",
    content: "We found our perfect brand ambassadors through CREATERRA. The ROI on our influencer campaigns increased by 300%. The quality of creators and ease of collaboration is unmatched.",
    rating: 5,
    category: "Business",
    result: "300% ROI increase"
  },
  {
    name: "Ananya Gupta",
    role: "Content Creator",
    followers: "180K",
    avatar: "/api/placeholder/64/64", 
    content: "The AI matching on CREATERRA is incredible. It connected me with brands that perfectly align with my values and audience. I've built long-term partnerships that feel authentic.",
    rating: 5,
    category: "Creator",
    earnings: "₹6.2L earned"
  },
  {
    name: "Vikram Patel",
    role: "Founder",
    company: "GreenEco Products",
    avatar: "/api/placeholder/64/64",
    content: "As a startup, CREATERRA helped us compete with bigger brands. We found micro-influencers who genuinely loved our products. Our social media engagement grew by 500%!",
    rating: 5,
    category: "Business", 
    result: "500% engagement boost"
  },
  {
    name: "Shreya Reddy",
    role: "Lifestyle Blogger",
    followers: "320K",
    avatar: "/api/placeholder/64/64",
    content: "I love how CREATERRA handles all the business side - contracts, payments, everything. I can focus on creating great content while they ensure I get paid fairly and on time.",
    rating: 5,
    category: "Creator",
    earnings: "₹12.3L earned"
  },
  {
    name: "Amit Saxena",
    role: "Brand Manager", 
    company: "Fitness First India",
    avatar: "/api/placeholder/64/64",
    content: "The analytics and reporting on CREATERRA are fantastic. We can track every aspect of our campaigns and see real results. It's helped us optimize our influencer marketing strategy.",
    rating: 5,
    category: "Business",
    result: "250% conversion boost"
  }
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4 bg-accent-soft text-accent">
            Success Stories
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Trusted by 
            <span className="text-gradient"> 15,000+ Creators</span>
            <br />and Businesses
          </h2>
          <p className="text-lg text-muted-foreground">
            See how CREATERRA has helped creators and businesses build successful 
            partnerships and achieve their goals.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-card transition-smooth border-0 shadow-sm animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="flex justify-between items-start mb-4">
                  <Quote className="w-8 h-8 text-primary/20" />
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      testimonial.category === 'Creator' 
                        ? 'bg-primary/10 text-primary border-primary/20' 
                        : 'bg-accent/10 text-accent border-accent/20'
                    }`}
                  >
                    {testimonial.category}
                  </Badge>
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground text-sm">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.role}
                        {testimonial.company && ` at ${testimonial.company}`}
                      </div>
                      {testimonial.followers && (
                        <div className="text-xs text-primary font-medium">
                          {testimonial.followers} followers
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="mt-4 pt-4 border-t border-border">
                  {testimonial.earnings && (
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/20 text-xs">
                      {testimonial.earnings}
                    </Badge>
                  )}
                  {testimonial.result && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
                      {testimonial.result}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-gradient mb-2">₹50Cr+</div>
              <div className="text-sm text-muted-foreground">Creator Earnings</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-gradient mb-2">25K+</div>
              <div className="text-sm text-muted-foreground">Successful Collaborations</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-gradient mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-gradient mb-2">48h</div>
              <div className="text-sm text-muted-foreground">Avg. Match Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}