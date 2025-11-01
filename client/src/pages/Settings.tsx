import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Instagram, Youtube, Music, Twitter, Facebook, Plus, Trash2, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { influencersApi } from '@/lib/api';

const SOCIAL_PLATFORMS = [
  { name: 'Instagram', icon: Instagram, color: 'text-pink-500', value: 'instagram' },
  { name: 'YouTube', icon: Youtube, color: 'text-red-500', value: 'youtube' },
  { name: 'TikTok', icon: Music, color: 'text-black', value: 'tiktok' },
  { name: 'Twitter', icon: Twitter, color: 'text-blue-400', value: 'twitter' },
  { name: 'Facebook', icon: Facebook, color: 'text-blue-600', value: 'facebook' },
];

export default function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Profile State
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');

  // Social Media State
  const [socialProfiles, setSocialProfiles] = useState<any[]>(user?.socialProfiles || []);
  const [newSocial, setNewSocial] = useState({
    platform: 'instagram',
    handle: '',
    followersCount: 0,
    proofUrl: '',
  });
  const [showAddSocial, setShowAddSocial] = useState(false);

  const handleUpdateProfile = async () => {
    try {
      // API call to update profile
      toast({
        title: 'Success',
        description: 'Profile updated successfully!',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update profile',
        variant: 'destructive',
      });
    }
  };

  const handleAddSocial = async () => {
    if (!newSocial.handle || newSocial.followersCount < 500) {
      toast({
        title: 'Error',
        description: 'Minimum 500 followers required to join the platform',
        variant: 'destructive',
      });
      return;
    }

    try {
      await influencersApi.addSocialProfile(newSocial);
      setSocialProfiles([...socialProfiles, newSocial]);
      setNewSocial({ platform: 'instagram', handle: '', followersCount: 0, proofUrl: '' });
      setShowAddSocial(false);
      toast({
        title: 'Success',
        description: 'Social account added! Pending verification.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to add social account',
        variant: 'destructive',
      });
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Settings
            </h1>
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="border-2 border-blue-100 shadow-lg">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user.email} disabled className="mt-2 bg-gray-50" />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" value={user.role} disabled className="mt-2 bg-gray-50 capitalize" />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="mt-2 w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <Button
                  onClick={handleUpdateProfile}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Media Tab */}
          <TabsContent value="social">
            <Card className="border-2 border-purple-100 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Social Media Accounts</CardTitle>
                    <CardDescription>Connect your social media profiles (Min. 500 followers required)</CardDescription>
                  </div>
                  {!showAddSocial && (
                    <Button
                      onClick={() => setShowAddSocial(true)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Account
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add New Social */}
                {showAddSocial && (
                  <div className="border-2 border-purple-200 rounded-lg p-4 bg-purple-50 space-y-4">
                    <h3 className="font-semibold text-lg">Add New Social Account</h3>
                    
                    <div>
                      <Label>Platform</Label>
                      <div className="grid grid-cols-5 gap-2 mt-2">
                        {SOCIAL_PLATFORMS.map((platform) => {
                          const Icon = platform.icon;
                          return (
                            <button
                              key={platform.value}
                              onClick={() => setNewSocial({ ...newSocial, platform: platform.value })}
                              className={`p-4 rounded-lg border-2 transition-all ${
                                newSocial.platform === platform.value
                                  ? 'border-purple-600 bg-purple-100'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <Icon className={`h-6 w-6 mx-auto ${platform.color}`} />
                              <p className="text-xs mt-1">{platform.name}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Username/Handle</Label>
                        <Input
                          placeholder="@username"
                          value={newSocial.handle}
                          onChange={(e) => setNewSocial({ ...newSocial, handle: e.target.value })}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label>Followers Count</Label>
                        <Input
                          type="number"
                          placeholder="e.g., 1000"
                          value={newSocial.followersCount || ''}
                          onChange={(e) => setNewSocial({ ...newSocial, followersCount: parseInt(e.target.value) || 0 })}
                          className="mt-2"
                        />
                        {newSocial.followersCount > 0 && newSocial.followersCount < 500 && (
                          <p className="text-xs text-red-500 mt-1">Minimum 500 followers required</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label>Proof URL (Screenshot/Analytics Link)</Label>
                      <Input
                        placeholder="https://..."
                        value={newSocial.proofUrl}
                        onChange={(e) => setNewSocial({ ...newSocial, proofUrl: e.target.value })}
                        className="mt-2"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handleAddSocial} className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600">
                        <Check className="h-4 w-4 mr-2" />
                        Add Account
                      </Button>
                      <Button variant="outline" onClick={() => setShowAddSocial(false)} className="flex-1">
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {/* Existing Social Accounts */}
                {socialProfiles.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p>No social accounts connected yet</p>
                    <p className="text-sm mt-2">Add your social accounts to increase visibility</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {socialProfiles.map((profile, idx) => {
                      const platform = SOCIAL_PLATFORMS.find(p => p.value === profile.platform);
                      const Icon = platform?.icon || Instagram;
                      return (
                        <div key={idx} className="flex items-center justify-between p-4 border-2 rounded-lg hover:border-purple-300 transition-all">
                          <div className="flex items-center gap-4">
                            <Icon className={`h-8 w-8 ${platform?.color}`} />
                            <div>
                              <p className="font-semibold capitalize">{profile.platform}</p>
                              <p className="text-sm text-gray-600">@{profile.handle}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-bold text-lg">{profile.followersCount?.toLocaleString()}</p>
                              <p className="text-xs text-gray-500">followers</p>
                            </div>
                            {profile.verified ? (
                              <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                Verified
                              </div>
                            ) : (
                              <div className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                                Pending
                              </div>
                            )}
                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account">
            <Card className="border-2 border-red-100 shadow-lg">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Password</h3>
                  <Button variant="outline" className="w-full">
                    Change Password
                  </Button>
                </div>

                <div className="border-t pt-6 space-y-4">
                  <h3 className="font-semibold text-lg text-red-600">Danger Zone</h3>
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                        // Delete account logic
                      }
                    }}
                  >
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
