import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, TrendingUp, Star, Users } from "lucide-react";

const Discover = () => {
  const campaigns = [
    {
      id: 1,
      title: "Summer Fashion Campaign",
      company: "StyleHub",
      budget: "₹50,000 - ₹1,00,000",
      category: "Fashion",
      followers: "10K+",
      engagement: "High"
    },
    {
      id: 2,
      title: "Tech Product Launch",
      company: "TechCorp",
      budget: "₹1,00,000 - ₹2,50,000",
      category: "Technology",
      followers: "50K+",
      engagement: "Medium"
    },
    {
      id: 3,
      title: "Fitness Challenge",
      company: "FitLife",
      budget: "₹25,000 - ₹75,000",
      category: "Health & Fitness",
      followers: "5K+",
      engagement: "High"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Discover <span className="text-gradient">Opportunities</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find collaboration opportunities that match your style and audience
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search campaigns..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="hover:shadow-glow transition-smooth">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="secondary">{campaign.category}</Badge>
                  <Badge className="bg-accent-soft text-accent">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {campaign.engagement}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
                <p className="text-muted-foreground mb-4">{campaign.company}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <Star className="w-4 h-4 mr-2 text-primary" />
                    Budget: {campaign.budget}
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 mr-2 text-accent" />
                    Required: {campaign.followers} followers
                  </div>
                </div>
                <Button variant="hero" className="w-full">Apply Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Discover;
