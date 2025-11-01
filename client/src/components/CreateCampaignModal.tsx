import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { campaignsApi } from '@/lib/api';
import { formatINR, RUPEE } from '@/lib/currency';
import { useToast } from '@/hooks/use-toast';
import { Zap, IndianRupee, Clock, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface CreateCampaignModalProps {
  startupId?: string;
  onSuccess?: () => void;
}

const CreateCampaignModal = ({ startupId, onSuccess }: CreateCampaignModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: 100,
    platforms: [] as string[],
    minFollowers: 1000,
    category: 'general',
    fastestWins: false,
    deliveryTime: 24,
    urgency: 'medium',
    coinsReward: 10,
    requirements: ''
  });

  const platformOptions = ['Instagram', 'YouTube', 'TikTok', 'Twitter', 'LinkedIn'];

  const togglePlatform = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || formData.platforms.length === 0) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in title and select at least one platform',
        variant: 'destructive'
      });
      return;
    }
    if (!startupId) {
      toast({
        title: 'No startup linked',
        description: 'Create/select a startup before creating a campaign.',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    try {
      await campaignsApi.create({
        ...formData,
        startupId
      });
      
      toast({
        title: '🚀 Campaign Created!',
        description: 'Your campaign is now live',
      });
      
      setOpen(false);
      onSuccess?.();
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        budget: 100,
        platforms: [],
        minFollowers: 1000,
        category: 'general',
        fastestWins: false,
        deliveryTime: 24,
        urgency: 'medium',
        coinsReward: 10,
        requirements: ''
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create campaign',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Zap className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </DialogTrigger>
      
      <DialogContent className="bg-slate-900/95 backdrop-blur-xl border-purple-500/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            ⚡ Create Lightning Campaign
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Launch your campaign in under 60 seconds
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <Label htmlFor="title">Campaign Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Instagram Story for New Product Launch"
              className="bg-slate-800/50 border-purple-500/30 text-white"
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what you need..."
              className="bg-slate-800/50 border-purple-500/30 text-white"
              rows={3}
            />
          </div>

          {/* Budget */}
          <div>
            <Label htmlFor="budget">Budget ({RUPEE})</Label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-green-400" />
              <Input
                id="budget"
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                className="bg-slate-800/50 border-purple-500/30 text-white pl-10"
                min="0"
              />
            </div>
          </div>

          {/* Platforms */}
          <div>
            <Label>Platforms * (Select at least one)</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {platformOptions.map(platform => (
                <Badge
                  key={platform}
                  variant={formData.platforms.includes(platform) ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    formData.platforms.includes(platform)
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                      : 'border-purple-500/30 hover:border-purple-500'
                  }`}
                  onClick={() => togglePlatform(platform)}
                >
                  {platform}
                </Badge>
              ))}
            </div>
          </div>

          {/* Fastest Wins Toggle */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                <Label htmlFor="fastestWins" className="text-lg font-bold">
                  ⚡ Fastest Wins
                </Label>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                Auto-accept first influencer to apply
              </p>
            </div>
            <Switch
              id="fastestWins"
              checked={formData.fastestWins}
              onCheckedChange={(checked) => setFormData({ ...formData, fastestWins: checked })}
            />
          </motion.div>

          {/* Urgency */}
          <div>
            <Label htmlFor="urgency">Urgency</Label>
            <Select value={formData.urgency} onValueChange={(value: any) => setFormData({ ...formData, urgency: value })}>
              <SelectTrigger className="bg-slate-800/50 border-purple-500/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-purple-500/30">
                <SelectItem value="low">🟢 Low</SelectItem>
                <SelectItem value="medium">🟡 Medium</SelectItem>
                <SelectItem value="high">🔴 High</SelectItem>
                <SelectItem value="urgent">🔥 URGENT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Delivery Time */}
          <div>
            <Label>
              <Clock className="inline h-4 w-4 mr-1" />
              Delivery Time: {formData.deliveryTime} hours
            </Label>
            <Slider
              value={[formData.deliveryTime]}
              onValueChange={(value) => setFormData({ ...formData, deliveryTime: value[0] })}
              min={1}
              max={72}
              step={1}
              className="mt-2"
            />
          </div>

          {/* Coins Reward */}
          <div>
            <Label htmlFor="coinsReward">
              <TrendingUp className="inline h-4 w-4 mr-1" />
              Bonus Coins Reward
            </Label>
            <Input
              id="coinsReward"
              type="number"
              value={formData.coinsReward}
              onChange={(e) => setFormData({ ...formData, coinsReward: Number(e.target.value) })}
              className="bg-slate-800/50 border-purple-500/30 text-white"
              min="0"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12 text-lg font-bold"
          >
            {loading ? '🚀 Creating...' : '⚡ Launch Campaign'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCampaignModal;
