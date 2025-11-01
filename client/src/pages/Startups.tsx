import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { startupsApi } from '@/lib/api';
import CreateStartupModal from '@/components/CreateStartupModal';

export default function Startups() {
  const [items, setItems] = useState<any[]>([]);
  const load = async () => setItems(await startupsApi.mine());
  useEffect(() => { load(); }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-slate-200">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Startups</h1>
          <CreateStartupModal onCreated={load} />
        </div>
        {items.length === 0 ? (
          <Card className="bg-slate-900/40 border-purple-500/20"><CardContent className="p-6">No startups yet</CardContent></Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {items.map((s) => (
              <Card key={s._id} className="bg-slate-900/40 border-purple-500/20">
                <CardHeader><CardTitle>{s.name}</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">{s.industry}</p>
                  <p className="text-sm text-gray-400">{s.website}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
