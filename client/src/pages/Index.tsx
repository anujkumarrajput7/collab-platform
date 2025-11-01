import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Index() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <img src="/logo.png" alt="CREATERRA" className="h-12 w-auto object-contain" />
            <div className="flex gap-4">
              <Link to="/login">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">Sign Up</Button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full">
              <p className="text-blue-300 text-sm font-medium">🚀 Join 1000+ Creators & Brands</p>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Real-Time Creator
              </span>
              <br />
              <span className="text-white">Brand Collaboration</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              The ultimate platform for influencers and companies to collaborate on marketing campaigns.
              Build partnerships, grow your brand, and achieve your goals together.
            </p>
            <div className="flex justify-center gap-4 mb-16">
              <Link to="/signup">
                <Button size="lg" className="text-lg px-10 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-blue-500/50 transition-all">
                  Get Started Free →
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-white/20 text-white hover:bg-white/10">
                  Sign In
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-20">
              <div className="text-center">
                <p className="text-4xl font-bold text-white mb-2">500+</p>
                <p className="text-gray-400">Active Campaigns</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-white mb-2">$2M+</p>
                <p className="text-gray-400">Total Budget</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-white mb-2">95%</p>
                <p className="text-gray-400">Success Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose CREATERRA?</h2>
            <p className="text-gray-400 text-lg">Everything you need to build successful brand collaborations</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 p-8 rounded-2xl hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">For Companies</h3>
              <p className="text-gray-300 leading-relaxed">
                Create campaigns, find the perfect influencers, and manage collaborations all in one place.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 p-8 rounded-2xl hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">For Influencers</h3>
              <p className="text-gray-300 leading-relaxed">
                Discover brand partnerships that align with your values and grow your influence.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 p-8 rounded-2xl hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Secure Payments</h3>
              <p className="text-gray-300 leading-relaxed">
                Safe and reliable payment processing for all collaborations and campaigns.
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="container mx-auto px-4 py-12 border-t border-white/10">
          <div className="text-center text-gray-400">
            <p className="mb-2">© 2025 CREATERRA. All rights reserved.</p>
            <p className="text-sm">Built with ❤️ for creators and brands worldwide</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
