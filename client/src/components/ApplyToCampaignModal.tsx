import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { applicationsApi } from '@/lib/api';
import { RUPEE, formatINR } from '@/lib/currency';
import { useToast } from '@/hooks/use-toast';
import { Zap, IndianRupee, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface ApplyToCampaignModalProps {
  campaign: any;
  onSuccess?: () => void;
}

const ApplyToCampaignModal = ({ campaign, onSuccess }: ApplyToCampaignModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [coverMessage, setCoverMessage] = useState('');
  const [proposedPrice, setProposedPrice] = useState(campaign.budget || 0);

  const handleApply = async () => {
    setLoading(true);
    try {
      await applicationsApi.create({
        campaignId: campaign._id,
        coverMessage,
        proposedPrice
      });
      
      toast({
        title: campaign.fastestWins ? '⚡ Instantly Accepted!' : '✅ Application Submitted!',
        description: campaign.fastestWins ? 'You won! Start working now.' : 'Wait for brand response',
      });
      
      setOpen(false);
      onSuccess?.();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to apply',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          {campaign.fastestWins && <Zap className="mr-2 h-4 w-4 animate-pulse" />}
          Apply Now
        </Button>
      </DialogTrigger>
      
      <DialogContent className="bg-slate-900/95 backdrop-blur-xl border-purple-500/20 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{campaign.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Campaign Details */}
          <div className="p-4 bg-slate-800/50 border border-purple-500/30 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Budget</span>
              <span className="text-green-400 font-bold flex items-center gap-1">
                <IndianRupee className="h-4 w-4" />
                {formatINR(campaign.budget)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Delivery Time</span>
              <span className="text-blue-400 font-bold flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {campaign.deliveryTime || 24}h
              </span>
            </div>
            {campaign.platforms && campaign.platforms.length > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Platforms</span>
                <span className="text-purple-400 font-bold">
                  {campaign.platforms.join(', ')}
                </span>
              </div>
            )}
          </div>

          {/* Fastest Wins Alert */}
          {campaign.fastestWins && (
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
                <p className="text-yellow-400 text-sm font-bold">⚡ FASTEST WINS MODE</p>
              </div>
              <p className="text-yellow-300 text-xs">
                You'll be instantly accepted! No waiting for approval.
              </p>
            </motion.div>
          )}

          {/* Cover Message */}
          <div>
            <Label htmlFor="coverMessage">Cover Message (Optional)</Label>
            <Textarea
              id="coverMessage"
              value={coverMessage}
              onChange={(e) => setCoverMessage(e.target.value)}
              placeholder="Tell them why you're perfect for this campaign..."
              className="bg-slate-800/50 border-purple-500/30 text-white mt-2"
              rows={4}
            />
          </div>

          {/* Proposed Price */}
          <div>
            <Label htmlFor="proposedPrice">Your Bid ({RUPEE})</Label>
            <div className="relative mt-2">
              <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-green-400" />
              <Input
                id="proposedPrice"
                type="number"
                value={proposedPrice}
                onChange={(e) => setProposedPrice(Number(e.target.value))}
                className="bg-slate-800/50 border-purple-500/30 text-white pl-10"
                min="0"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Suggested: {formatINR(campaign.budget)}
            </p>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleApply}
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-12 text-lg font-bold"
          >
            {loading ? '🚀 Applying...' : campaign.fastestWins ? '⚡ Apply & Win Instantly' : '🚀 Submit Application'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyToCampaignModal;
