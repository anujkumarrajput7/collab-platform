import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { startupsApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface CreateStartupModalProps {
  onCreated?: (startup: any) => void;
}

const CreateStartupModal = ({ onCreated }: CreateStartupModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    location: '',
    description: '',
    website: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.industry) {
      toast({ title: 'Missing Fields', description: 'Name and industry are required', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const startup = await startupsApi.create(formData);
      toast({ title: '✅ Startup Created', description: `${startup.name} created successfully` });
      setOpen(false);
      onCreated?.(startup);
      setFormData({ name: '', industry: '', location: '', description: '', website: '' });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Failed to create startup', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
          Create Startup
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-slate-900/95 backdrop-blur-xl border-purple-500/20 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create Startup</DialogTitle>
          <DialogDescription className="text-gray-400">Add your company profile</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-slate-800/50 border-purple-500/30 text-white" required />
          </div>
          <div>
            <Label htmlFor="industry">Industry *</Label>
            <Input id="industry" value={formData.industry} onChange={(e) => setFormData({ ...formData, industry: e.target.value })} className="bg-slate-800/50 border-purple-500/30 text-white" required />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="bg-slate-800/50 border-purple-500/30 text-white" />
          </div>
          <div>
            <Label htmlFor="website">Website</Label>
            <Input id="website" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className="bg-slate-800/50 border-purple-500/30 text-white" />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className="bg-slate-800/50 border-purple-500/30 text-white" />
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-12 text-lg font-bold">
            {loading ? 'Creating...' : 'Create'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStartupModal;
