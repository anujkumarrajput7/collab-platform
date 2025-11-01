import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Instagram, Youtube, Twitter, TrendingUp } from "lucide-react";

const Creators = () => {
  const creators = [
    {
      id: 1,
      name: "Priya Sharma",
      category: "Fashion & Lifestyle",
      followers: "125K",
      engagement: "8.5%",
      platforms: ["instagram", "youtube"],
      avatar: ""
    },
    {
      id: 2,
      name: "Rahul Verma",
      category: "Technology",
      followers: "85K",
      engagement: "6.2%",
      platforms: ["youtube", "twitter"],
      avatar: ""
    },
    {
      id: 3,
      name: "Ananya Gupta",
      category: "Food & Travel",
      followers: "200K",
      engagement: "9.1%",
      platforms: ["instagram"],
      avatar: ""
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Top <span className="text-gradient">Creators</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with verified influencers and content creators
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map((creator) => (
            <Card key={creator.id} className="hover:shadow-glow transition-smooth">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xl">
                      {creator.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold mb-2">{creator.name}</h3>
                  <Badge variant="secondary" className="mb-4">{creator.category}</Badge>
                  
                  <div className="w-full space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Followers</span>
                      <span className="font-semibold">{creator.followers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Engagement</span>
                      <span className="font-semibold text-success">{creator.engagement}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-4">
                    {creator.platforms.includes('instagram') && (
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                        <Instagram className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                    {creator.platforms.includes('youtube') && (
                      <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center">
                        <Youtube className="w-4 h-4 text-accent-foreground" />
                      </div>
                    )}
                    {creator.platforms.includes('twitter') && (
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                        <Twitter className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>

                  <Button variant="hero" className="w-full">View Profile</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Creators;
