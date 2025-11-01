import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { applicationsApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export default function Applications() {
  const { toast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const load = async () => setItems(await applicationsApi.list());
  useEffect(() => { load(); }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-slate-200">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Applications</h1>
        {items.length === 0 ? (
          <Card className="bg-slate-900/40 border-purple-500/20"><CardContent className="p-6">No applications</CardContent></Card>
        ) : (
          <div className="space-y-4">
            {items.map((a) => (
              <Card key={a._id} className="bg-slate-900/40 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-lg">{a.campaign?.title} • {a.influencer?.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Status: {a.status}</p>
                    {a.coverMessage && <p className="text-sm text-gray-400">“{a.coverMessage}”</p>}
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={async()=>{ await applicationsApi.decide(a._id,'accept'); toast({title:'Accepted'}); load(); }} className="bg-emerald-600 hover:bg-emerald-700">Accept</Button>
                    <Button onClick={async()=>{ await applicationsApi.decide(a._id,'reject'); toast({title:'Rejected'}); load(); }} variant="destructive">Reject</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
