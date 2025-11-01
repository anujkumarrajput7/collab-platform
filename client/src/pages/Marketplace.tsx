import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Star, TrendingUp } from "lucide-react";

const Marketplace = () => {
  const services = [
    {
      id: 1,
      title: "Instagram Post Package",
      creator: "Priya Sharma",
      price: "₹15,000",
      category: "Social Media",
      rating: 4.9,
      reviews: 127
    },
    {
      id: 2,
      title: "YouTube Video Integration",
      creator: "Rahul Verma",
      price: "₹50,000",
      category: "Video Content",
      rating: 4.8,
      reviews: 89
    },
    {
      id: 3,
      title: "Brand Story Package",
      creator: "Ananya Gupta",
      price: "₹35,000",
      category: "Content Creation",
      rating: 5.0,
      reviews: 156
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Creator <span className="text-gradient">Marketplace</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse and purchase ready-made collaboration packages from top creators
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="hover:shadow-glow transition-smooth">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="secondary">{service.category}</Badge>
                  <Badge className="bg-success-soft text-success">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Popular
                  </Badge>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4">by {service.creator}</p>
                
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="font-semibold">{service.rating}</span>
                  <span className="text-sm text-muted-foreground">({service.reviews} reviews)</span>
                </div>

                <div className="border-t border-border/40 pt-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Starting at</span>
                    <span className="text-2xl font-bold text-primary">{service.price}</span>
                  </div>
                </div>

                <Button variant="hero" className="w-full">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Purchase Package
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Marketplace;
