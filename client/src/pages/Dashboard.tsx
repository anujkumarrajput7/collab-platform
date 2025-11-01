import { useAuth } from '@/lib/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { campaignsApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, TrendingUp, Users, DollarSign, Briefcase, Award, Bell, Settings, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Logo from '@/components/Logo';
import LiveStormDashboard from '@/components/LiveStormDashboard';
import CreateCampaignModal from '@/components/CreateCampaignModal';
import ApplyToCampaignModal from '@/components/ApplyToCampaignModal';

export default function Dashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Fetch campaigns
    const fetchCampaigns = async () => {
      try {
        const data: any = await campaignsApi.getAll();
        setCampaigns(data.campaigns || data || []);
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to fetch campaigns',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, [isAuthenticated, navigate, toast]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      {/* Modern Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Logo size="md" animated={true} />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  CREATERRA
                </h1>
                <p className="text-sm text-gray-300">Welcome back, <span className="font-semibold text-white">{user.name}</span></p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => {
                  // Scroll to campaigns section
                  document.querySelector('input[placeholder="Search campaigns..."]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  // Focus the search input
                  setTimeout(() => {
                    (document.querySelector('input[placeholder="Search campaigns..."]') as HTMLInputElement)?.focus();
                  }, 500);
                }}
                className="hover:bg-purple-500/20 text-gray-300 hover:text-white"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-purple-500/20 text-gray-300 hover:text-white"
                onClick={() => {
                  toast({
                    title: "Notifications",
                    description: "No new notifications",
                  });
                }}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/settings')}
                className="hover:bg-purple-500/20 text-gray-300 hover:text-white"
              >
                <Settings className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-purple-500/20">
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">{user.name}</p>
                  <span className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-0.5 rounded-full capitalize">
                    {user.role}
                  </span>
                </div>
                <Button 
                  onClick={handleLogout} 
                  className="ml-2 bg-gradient-to-r from-red-600/20 to-pink-600/20 border border-red-500/30 text-white hover:from-red-600/30 hover:to-pink-600/30 hover:border-red-500/50"
                  variant="outline"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Campaigns</p>
                  <h3 className="text-3xl font-bold mt-2">{campaigns.length}</h3>
                </div>
                <Briefcase className="h-12 w-12 text-blue-200 opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Active</p>
                  <h3 className="text-3xl font-bold mt-2">{campaigns.filter(c => c.status === 'open').length}</h3>
                </div>
                <TrendingUp className="h-12 w-12 text-green-200 opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Messages</p>
                  <h3 className="text-3xl font-bold mt-2">0</h3>
                </div>
                <MessageSquare className="h-12 w-12 text-purple-200 opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Total Budget</p>
                  <h3 className="text-3xl font-bold mt-2">${campaigns.reduce((sum, c) => sum + (c.budget || 0), 0).toLocaleString()}</h3>
                </div>
                <DollarSign className="h-12 w-12 text-orange-200 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Storm Dashboard */}
        <Card className="bg-slate-900/40 backdrop-blur-lg border-purple-500/20 p-6 mb-8 relative">
          <LiveStormDashboard />
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative">
          {user.role === 'company' && (
            <>
              <Card className="border-2 border-purple-500/30 hover:border-purple-500/50 transition-all hover:shadow-lg bg-slate-900/40 backdrop-blur-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-500/20 rounded-lg">
                      <Briefcase className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">Create Campaign</CardTitle>
                      <CardDescription className="text-gray-400">Launch a new marketing campaign</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CreateCampaignModal 
                    startupId={user.startupId || 'temp-startup-id'}
                    onSuccess={() => window.location.reload()}
                  />
                </CardContent>
              </Card>
              <Card className="border-2 border-green-500/30 hover:border-green-500/50 transition-all hover:shadow-lg bg-slate-900/40 backdrop-blur-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-500/20 rounded-lg">
                      <Users className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">Manage Startups</CardTitle>
                      <CardDescription className="text-gray-400">View and edit your startup profiles</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full border-purple-500/30 text-white hover:bg-purple-500/20" variant="outline">View Startups</Button>
                </CardContent>
              </Card>
            </>
          )}
          {user.role === 'influencer' && (
            <>
              <Card className="border-2 border-purple-500/30 hover:border-purple-500/50 transition-all hover:shadow-lg bg-slate-900/40 backdrop-blur-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-500/20 rounded-lg">
                      <Award className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">My Applications</CardTitle>
                      <CardDescription className="text-gray-400">Track your campaign applications</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={() => {
                      toast({
                        title: "Applications",
                        description: "Your applications will appear here. Apply to campaigns below!",
                      });
                    }}
                  >
                    View Applications
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-2 border-indigo-500/30 hover:border-indigo-500/50 transition-all hover:shadow-lg bg-slate-900/40 backdrop-blur-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-indigo-500/20 rounded-lg">
                      <Users className="h-6 w-6 text-indigo-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">Profile</CardTitle>
                      <CardDescription className="text-gray-400">Manage your social profiles</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700" 
                    onClick={() => navigate('/settings')}
                  >
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
          <Card className="border-2 border-orange-500/30 hover:border-orange-500/50 transition-all hover:shadow-lg bg-slate-900/40 backdrop-blur-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-500/20 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <CardTitle className="text-lg text-white">Messages</CardTitle>
                  <CardDescription className="text-gray-400">View your conversations</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600" onClick={() => navigate('/messages')}>Open Messages</Button>
            </CardContent>
          </Card>
        </div>

        {/* Campaigns List */}
        <Card className="border-0 shadow-lg bg-slate-900/40 backdrop-blur-lg border border-purple-500/20 relative">
          <CardHeader className="border-b border-purple-500/20 bg-slate-900/60">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-white">
                  {user.role === 'company' ? 'Recent Campaigns' : 'Available Campaigns'}
                </CardTitle>
                <p className="text-gray-400 text-sm mt-1">Discover exciting collaboration opportunities</p>
              </div>
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search campaigns..."
                  className="pl-10 bg-slate-800/50 border-purple-500/30 text-white placeholder:text-gray-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {isLoading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
                <p className="mt-4 text-gray-300">Loading campaigns...</p>
              </div>
            ) : campaigns.length === 0 ? (
              <div className="text-center py-16">
                <Briefcase className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg font-medium">No campaigns found</p>
                <p className="text-gray-500 text-sm mt-2">Check back later for new opportunities!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {campaigns
                  .filter(campaign => 
                    campaign.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    campaign.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    campaign.platforms?.some((p: string) => p.toLowerCase().includes(searchQuery.toLowerCase()))
                  )
                  .map((campaign: any) => (
                  <Card
                    key={campaign._id}
                    className="border-2 border-purple-500/30 hover:border-purple-500/50 transition-all hover:shadow-xl group bg-slate-800/50 backdrop-blur-lg"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl text-white group-hover:text-purple-400 transition-colors">
                            {campaign.title}
                          </CardTitle>
                          <p className="text-sm text-gray-400 mt-2 line-clamp-2">{campaign.description || 'No description provided'}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          campaign.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {campaign.status || 'open'}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {campaign.platforms?.map((platform: string) => (
                          <span
                            key={platform}
                            className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-green-50 rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            <span className="text-xs text-green-700 font-medium">Budget</span>
                          </div>
                          <p className="text-lg font-bold text-green-700 mt-1">${campaign.budget?.toLocaleString() || 0}</p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-blue-600" />
                            <span className="text-xs text-blue-700 font-medium">Min Followers</span>
                          </div>
                          <p className="text-lg font-bold text-blue-700 mt-1">{campaign.minFollowers?.toLocaleString() || 0}</p>
                        </div>
                      </div>
                      {user.role === 'influencer' && (
                        <ApplyToCampaignModal 
                          campaign={campaign}
                          onSuccess={() => window.location.reload()}
                        />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
