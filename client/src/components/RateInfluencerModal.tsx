import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { reviewsApi } from '@/lib/reviews';
import { useToast } from '@/hooks/use-toast';

interface Props {
  campaignId: string;
  influencerId: string;
}

export default function RateInfluencerModal({ campaignId, influencerId }: Props) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const { toast } = useToast();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700">Rate Influencer</Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900/95 border-purple-500/20 text-white">
        <DialogHeader>
          <DialogTitle>Leave a Review</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>Rating (1-5)</Label>
            <Input type="number" min={1} max={5} value={rating} onChange={(e)=>setRating(Number(e.target.value))} className="bg-slate-800/50 border-purple-500/30" />
          </div>
          <div>
            <Label>Comment</Label>
            <Input value={comment} onChange={(e)=>setComment(e.target.value)} className="bg-slate-800/50 border-purple-500/30" />
          </div>
          <Button onClick={async()=>{
            try {
              await reviewsApi.create({ campaign: campaignId, reviewee: influencerId, rating, comment });
              toast({ title: 'Thanks for your review!' });
              setOpen(false);
            } catch (e:any) { toast({ title: 'Error', description: e.message, variant: 'destructive' }); }
          }} className="bg-gradient-to-r from-blue-600 to-purple-600">Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
