import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { adminApi, applicationsApi, proofApi } from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function AdminReview() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [pendingProfiles, setPendingProfiles] = useState<any[]>([]);
  const [pendingProofs, setPendingProofs] = useState<any[]>([]);

  const load = async () => {
    try {
      const prof = await adminApi.listPendingVerifications();
      setPendingProfiles(prof);
      const apps: any[] = await applicationsApi.list();
      setPendingProofs((apps || []).filter(a => a.status === 'proof_submitted'));
    } catch (e: any) {}
  };

  useEffect(() => { load(); }, []);

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-200 bg-slate-900">Admins only</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-slate-200">
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        <Card className="bg-slate-900/40 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-slate-200">Pending Social Verifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingProfiles.length === 0 ? (
              <p className="text-gray-400">None</p>
            ) : pendingProfiles.map((u) => (
              <div key={u._id} className="p-3 border border-purple-500/20 rounded-lg">
                <p className="font-semibold">{u.name} • {u.email}</p>
                <div className="mt-2 grid md:grid-cols-2 gap-3">
                  {u.profiles.map((p: any) => (
                    <div key={p.index} className="p-3 bg-slate-800/60 rounded-lg">
                      <p className="text-sm capitalize">{p.platform} @{p.handle}</p>
                      <p className="text-xs text-gray-400">Followers: {p.followersCount?.toLocaleString()}</p>
                      {p.proofUrl && <a href={p.proofUrl} target="_blank" className="text-xs text-blue-300 underline">Proof</a>}
                      <div className="mt-2">
                        <Button onClick={async () => {
                          await adminApi.verifySocialProfile(u._id, p.index);
                          toast({ title: 'Verified' });
                          load();
                        }} className="bg-emerald-600 hover:bg-emerald-700">Approve</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-slate-900/40 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-slate-200">Pending Proofs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingProofs.length === 0 ? (
              <p className="text-gray-400">None</p>
            ) : pendingProofs.map((a) => (
              <div key={a._id} className="p-3 border border-purple-500/20 rounded-lg">
                <p className="font-semibold">{a.influencer?.name} • {a.campaign?.title}</p>
                {a.proof?.url && <a href={a.proof.url} target="_blank" className="text-xs text-blue-300 underline">Open proof</a>}
                <div className="mt-2 flex gap-2">
                  <Button onClick={async () => { await proofApi.verify(a._id, true); toast({ title: 'Approved' }); load(); }} className="bg-emerald-600 hover:bg-emerald-700">Approve</Button>
                  <Button onClick={async () => { await proofApi.verify(a._id, false); toast({ title: 'Sent Back' }); load(); }} variant="destructive">Reject</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
