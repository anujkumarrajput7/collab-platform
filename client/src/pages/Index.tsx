import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { leaderboardApi } from '@/lib/api';
import { formatINR } from '@/lib/currency';

export default function Index() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ campaigns: 500, budget: 2_000_000, success: 95 });
  const [activity, setActivity] = useState<any[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // load recent activity (marquee)
  useEffect(() => {
    (async () => {
      try {
        const items = await leaderboardApi.getLiveActivity?.(20);
        if (Array.isArray(items)) setActivity(items);
      } catch {}
    })();
  }, []);

  // gentle animated counters on mount
  useEffect(() => {
    let t = 0; const dur = 1500; const start = performance.now();
    const from = { c: 420, b: 1_000_000, s: 88 };
    const to = { c: 780, b: 3_700_000, s: 96 };
    const af = () => {
      t = (performance.now() - start) / dur; const e = Math.min(1, t);
      const ease = (x:number)=>1-Math.pow(1-x,3);
      setStats({
        campaigns: Math.round(from.c + (to.c-from.c)*ease(e)),
        budget: Math.round(from.b + (to.b-from.b)*ease(e)),
        success: Math.round(from.s + (to.s-from.s)*ease(e)),
      });
      if (e < 1) requestAnimationFrame(af);
    };
    requestAnimationFrame(af);
  }, []);

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
        <nav className="container mx-auto px-4 py-4 sticky top-0 z-50 backdrop-blur-xl bg-slate-900/40 border-b border-white/10">
          <div className="flex justify-between items-center">
            <img src="/logo.png" alt="CREATERRA" className="h-10 w-auto object-contain drop-shadow-[0_4px_20px_rgba(99,102,241,0.5)]" />
            <div className="flex gap-2">
              <Link to="/reels"><Button variant="ghost" className="text-white hover:bg-white/10">Reels</Button></Link>
              <Link to="/feed"><Button variant="ghost" className="text-white hover:bg-white/10">Feed</Button></Link>
              <Link to="/login">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-[0_10px_30px_rgba(99,102,241,.45)]">Sign Up</Button>
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
                <p className="text-4xl font-bold text-white mb-2">{stats.campaigns.toLocaleString()}+</p>
                <p className="text-gray-400">Active Campaigns</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-white mb-2">{formatINR(stats.budget)}</p>
                <p className="text-gray-400">Total Budget</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-white mb-2">{stats.success}%</p>
                <p className="text-gray-400">Success Rate</p>
              </div>
            </div>

            {/* Live activity marquee */}
            {activity.length > 0 && (
              <div className="mt-10 overflow-hidden">
                <div className="animate-[marquee_25s_linear_infinite] whitespace-nowrap text-gray-300/90">
                  {activity.map((a:any, i:number)=> (
                    <span key={i} className="mx-6">⚡ {a.influencer?.name || 'An influencer'} {a.status.replace('_',' ')} “{a.campaign?.title}”</span>
                  ))}
                </div>
              </div>
            )}
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
        
        {/* CTA stripe */}
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-r from-indigo-600/40 to-purple-600/40 border border-white/10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white">Ready to launch your next creator campaign?</h3>
            <div className="mt-4 flex justify-center gap-4">
              <Link to="/signup"><Button className="bg-white text-slate-900 hover:bg-slate-100">Get Started</Button></Link>
              <Link to="/login"><Button variant="outline" className="border-white/20 text-white hover:bg-white/10">Sign In</Button></Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-12 border-t border-white/10 mt-10">
          <div className="text-center text-gray-400">
            <p className="mb-2">© 2025 CREATERRA. All rights reserved.</p>
            <p className="text-sm">Built with ❤️ for creators and brands worldwide</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
