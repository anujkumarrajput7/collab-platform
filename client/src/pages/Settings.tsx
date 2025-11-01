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
import { assetUrl } from '@/lib/url';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-slate-200">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Settings
            </h1>
            <Button variant="glass" className="text-slate-200 border border-purple-500/30" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-900/60 border border-purple-500/20">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="bg-slate-900/40 backdrop-blur-lg border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-slate-200">Profile Information</CardTitle>
                <CardDescription className="text-gray-400">Update your profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="p-[3px] rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-yellow-500">
                    <div className="rounded-full bg-slate-900 p-1">
                      {(() => { const u = (user as any)?.avatarUrl || ''; const src = assetUrl(u) || 'https://placehold.co/80x80?text=Avatar'; return <img src={src} alt="avatar" className="h-16 w-16 rounded-full object-cover" /> })()}
                    </div>
                  </div>
                  <div>
                    <input id="avatarFile" type="file" accept="image/*" className="hidden" onChange={async (e:any)=>{
                      const f = e.target.files?.[0];
                      if (!f) return;
                      const { uploadApi } = await import('@/lib/api');
                      
                      const { url } = await uploadApi.upload(f);
                      const absoluteUrl = assetUrl(url);
                      await influencersApi.updateMe({ avatarUrl: absoluteUrl });
                      localStorage.setItem('user', JSON.stringify({ ...user, avatarUrl: absoluteUrl }));
                      toast({ title: 'Profile photo updated' });
                      window.location.reload();
                    }} />
                    <Button onClick={()=>document.getElementById('avatarFile')?.click()} className="bg-gradient-to-r from-blue-600 to-purple-600">Change Photo</Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 bg-slate-800/50 border-purple-500/30 text-slate-200"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user.email} disabled className="mt-2 bg-slate-800/50 border-purple-500/30 text-slate-400" />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" value={user.role} disabled className="mt-2 bg-slate-800/50 border-purple-500/30 text-slate-400 capitalize" />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="mt-2 w-full min-h-[100px] px-3 py-2 bg-slate-800/50 border border-purple-500/30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-slate-200"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <Button
                  onClick={async ()=>{
                    await influencersApi.updateMe({ name, bio });
                    localStorage.setItem('user', JSON.stringify({ ...user, name, bio }));
                    toast({ title: 'Saved' });
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Media Tab */}
          <TabsContent value="social">
            <Card className="bg-slate-900/40 backdrop-blur-lg border-purple-500/20">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-slate-200">Social Media Accounts</CardTitle>
                    <CardDescription className="text-gray-400">Connect your social media profiles (Min. 500 followers required)</CardDescription>
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
                  <div className="border border-purple-500/30 rounded-lg p-4 bg-slate-900/60 space-y-4">
                    <h3 className="font-semibold text-lg text-slate-200">Add New Social Account</h3>
                    
                    <div>
                      <Label>Platform</Label>
                      <div className="grid grid-cols-5 gap-2 mt-2">
                        {SOCIAL_PLATFORMS.map((platform) => {
                          const Icon = platform.icon;
                          return (
                            <button
                              key={platform.value}
                              onClick={() => setNewSocial({ ...newSocial, platform: platform.value })}
                              className={`p-4 rounded-lg border transition-all ${
                                newSocial.platform === platform.value
                                  ? 'border-purple-500/70 bg-purple-500/10'
                                  : 'border-purple-500/20 hover:border-purple-500/40'
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
                          className="mt-2 bg-slate-800/50 border-purple-500/30 text-slate-200"
                        />
                      </div>
                      <div>
                        <Label>Followers Count</Label>
                        <Input
                          type="number"
                          placeholder="e.g., 1000"
                          value={newSocial.followersCount || ''}
                          onChange={(e) => setNewSocial({ ...newSocial, followersCount: parseInt(e.target.value) || 0 })}
                          className="mt-2 bg-slate-800/50 border-purple-500/30 text-slate-200"
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
                          className="mt-2 bg-slate-800/50 border-purple-500/30 text-slate-200"
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
                  <div className="text-center py-12 text-gray-400">
                    <p>No social accounts connected yet</p>
                    <p className="text-sm mt-2">Add your social accounts to increase visibility</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {socialProfiles.map((profile, idx) => {
                      const platform = SOCIAL_PLATFORMS.find(p => p.value === profile.platform);
                      const Icon = platform?.icon || Instagram;
                      return (
                        <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:border-purple-500/50 transition-all border-purple-500/20 bg-slate-900/60">
                          <div className="flex items-center gap-4">
                            <Icon className={`h-8 w-8 ${platform?.color}`} />
                            <div>
                              <p className="font-semibold capitalize text-slate-200">{profile.platform}</p>
                              <p className="text-sm text-gray-400">@{profile.handle}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-bold text-lg text-slate-200">{profile.followersCount?.toLocaleString()}</p>
                              <p className="text-xs text-gray-400">followers</p>
                            </div>
                            {profile.verified ? (
                              <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                                Verified
                              </div>
                            ) : (
                              <div className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs font-semibold">
                                Pending
                              </div>
                            )}
                            <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300">
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
            <Card className="bg-slate-900/40 backdrop-blur-lg border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-slate-200">Account Settings</CardTitle>
                <CardDescription className="text-gray-400">Manage your account preferences</CardDescription>
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
