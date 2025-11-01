import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { campaignsApi, influencersApi } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search as SearchIcon, Filter, Instagram, Youtube, TrendingUp, Users, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PLATFORMS = [
  { name: 'Instagram', icon: Instagram, color: 'bg-pink-500', value: 'instagram' },
  { name: 'YouTube', icon: Youtube, color: 'bg-red-500', value: 'youtube' },
  { name: 'TikTok', icon: TrendingUp, color: 'bg-black', value: 'tiktok' },
  { name: 'Twitter', icon: TrendingUp, color: 'bg-blue-400', value: 'twitter' },
  { name: 'Facebook', icon: Users, color: 'bg-blue-600', value: 'facebook' },
];

export default function Search() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [searchType, setSearchType] = useState<'campaigns' | 'influencers'>('campaigns');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      if (searchType === 'campaigns') {
        const data: any = await campaignsApi.getAll({ q: searchQuery });
        let filtered = data.campaigns || data || [];
        
        if (selectedPlatforms.length > 0) {
          filtered = filtered.filter((campaign: any) =>
            campaign.platforms?.some((p: string) => selectedPlatforms.includes(p))
          );
        }
        
        setResults(filtered);
      } else {
        const data: any = await influencersApi.getAll();
        let filtered = data;
        
        if (searchQuery) {
          filtered = filtered.filter((influencer: any) =>
            influencer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            influencer.email?.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        setResults(filtered);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Search failed',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Advanced Search
            </h1>
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Box */}
        <Card className="mb-8 border-2 border-blue-100 shadow-lg">
          <CardContent className="p-6">
            {/* Search Type Tabs */}
            <div className="flex gap-2 mb-6">
              <Button
                variant={searchType === 'campaigns' ? 'default' : 'outline'}
                onClick={() => setSearchType('campaigns')}
                className={searchType === 'campaigns' ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : ''}
              >
                Search Campaigns
              </Button>
              <Button
                variant={searchType === 'influencers' ? 'default' : 'outline'}
                onClick={() => setSearchType('influencers')}
                className={searchType === 'influencers' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : ''}
              >
                Search Influencers
              </Button>
            </div>

            {/* Search Input */}
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder={`Search ${searchType}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10 h-12 text-lg"
                />
              </div>
              <Button
                onClick={handleSearch}
                className="h-12 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                disabled={isLoading}
              >
                {isLoading ? 'Searching...' : 'Search'}
              </Button>
            </div>

            {/* Platform Filters */}
            {searchType === 'campaigns' && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Filter by Platform:</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {PLATFORMS.map((platform) => {
                    const Icon = platform.icon;
                    const isSelected = selectedPlatforms.includes(platform.value);
                    return (
                      <button
                        key={platform.value}
                        onClick={() => togglePlatform(platform.value)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all transform hover:scale-105 ${
                          isSelected
                            ? `${platform.color} text-white border-transparent shadow-lg`
                            : 'bg-white border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{platform.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {results.length} {searchType === 'campaigns' ? 'Campaigns' : 'Influencers'} Found
            </h2>
          </div>

          {isLoading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Searching...</p>
            </div>
          ) : results.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <SearchIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No results found</p>
                <p className="text-gray-400 text-sm mt-2">Try different keywords or filters</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {searchType === 'campaigns' ? (
                results.map((campaign: any) => (
                  <Card
                    key={campaign._id}
                    className="border-2 hover:border-blue-300 transition-all hover:shadow-xl group animate-in fade-in duration-500"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                          {campaign.title}
                        </CardTitle>
                        <Badge className="bg-green-100 text-green-700">{campaign.status || 'open'}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{campaign.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {campaign.platforms?.map((platform: string) => (
                          <Badge key={platform} className="bg-purple-100 text-purple-700">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-green-50 rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            <span className="text-xs text-green-700">Budget</span>
                          </div>
                          <p className="text-lg font-bold text-green-700">${campaign.budget?.toLocaleString() || 0}</p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-blue-600" />
                            <span className="text-xs text-blue-700">Min Followers</span>
                          </div>
                          <p className="text-lg font-bold text-blue-700">{campaign.minFollowers?.toLocaleString() || 0}</p>
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                results.map((influencer: any) => (
                  <Card
                    key={influencer._id}
                    className="border-2 hover:border-purple-300 transition-all hover:shadow-xl group animate-in fade-in duration-500"
                  >
                    <CardHeader>
                      <CardTitle className="text-xl">{influencer.name}</CardTitle>
                      <p className="text-sm text-gray-600">{influencer.email}</p>
                      <Badge className="w-fit mt-2 capitalize">{influencer.role}</Badge>
                    </CardHeader>
                    <CardContent>
                      {influencer.socialProfiles?.length > 0 && (
                        <div className="space-y-2">
                          {influencer.socialProfiles.map((profile: any, idx: number) => (
                            <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                              <div>
                                <p className="font-semibold capitalize">{profile.platform}</p>
                                <p className="text-sm text-gray-600">@{profile.handle}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold text-blue-600">{profile.followersCount?.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">followers</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600">
                        Send Message
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
