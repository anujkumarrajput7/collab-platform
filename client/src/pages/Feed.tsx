import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { postsApi, uploadApi } from '@/lib/api';
import { assetUrl } from '@/lib/url';
import { useAuth } from '@/lib/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function Feed() {
  const [posts, setPosts] = useState<any[]>([]);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [openComments, setOpenComments] = useState<{open:boolean; postId?:string; items:any[]}>({open:false, items:[]});
  const [text, setText] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [type, setType] = useState<'post' | 'reel'>('post');
  const [audioUrl, setAudioUrl] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [songArtist, setSongArtist] = useState('');
  const { toast } = useToast();

  const load = async () => {
    const data = await postsApi.feed();
    setPosts(Array.isArray(data) ? data : []);
  };
  useEffect(() => { load(); }, []);

  const submit = async () => {
    try {
      await postsApi.create({ text, mediaUrl, type, audioUrl, songTitle, songArtist });
      setText(''); setMediaUrl(''); setAudioUrl(''); setSongTitle(''); setSongArtist('');
      toast({ title: 'Posted' });
      load();
    } catch (e: any) { toast({ title: 'Error', description: e.message, variant: 'destructive' }); }
  };

  const toggleLike = async (id: string) => {
    try {
      const res: any = await postsApi.like(id);
      setLiked(prev => { const n = new Set(prev); res.liked ? n.add(id) : n.delete(id); return n; });
    } catch {}
  };

  const openCommentDrawer = async (id: string) => {
    const items = await postsApi.getComments(id);
    setOpenComments({ open: true, postId: id, items });
  };

  const addComment = async (text: string) => {
    if (!openComments.postId) return; if (!text.trim()) return;
    const c = await postsApi.addComment(openComments.postId, text);
    setOpenComments(s => ({ ...s, items: [...s.items, c] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-slate-200">
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <Card className="bg-slate-900/40 backdrop-blur-lg border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-slate-200">Create Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Share something..." className="bg-slate-800/50 border-purple-500/30" />
            <Input value={mediaUrl} onChange={(e) => setMediaUrl(e.target.value)} placeholder="Image/Video URL (optional)" className="bg-slate-800/50 border-purple-500/30" />
            <div className="flex items-center gap-2">
              <input type="file" accept="image/*,video/*" onChange={async (e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                const { url } = await uploadApi.upload(f);
                setMediaUrl(url);
              }} />
              {mediaUrl && <span className="text-xs text-gray-400">Attached</span>}
            </div>

            {/* Audio attachment */}
            <div className="grid md:grid-cols-3 gap-2 items-center">
              <input type="file" accept="audio/*" onChange={async (e)=>{
                const f = e.target.files?.[0]; if (!f) return;
                const { url } = await uploadApi.upload(f);
                setAudioUrl(url);
              }} />
              <Input value={songTitle} onChange={(e)=>setSongTitle(e.target.value)} placeholder="Song title (optional)" className="bg-slate-800/50 border-purple-500/30" />
              <Input value={songArtist} onChange={(e)=>setSongArtist(e.target.value)} placeholder="Artist (optional)" className="bg-slate-800/50 border-purple-500/30" />
            </div>
            {audioUrl ? (
              <audio src={assetUrl(audioUrl)} controls className="w-full" />
            ) : null}

            <div className="flex gap-2">
              <Button onClick={() => setType('post')} variant={type==='post'?'default':'glass'}>Post</Button>
              <Button onClick={() => setType('reel')} variant={type==='post'?'glass':'default'}>Reel</Button>
              <div className="flex-1" />
              <Button onClick={submit} className="bg-gradient-to-r from-blue-600 to-purple-600">Share</Button>
            </div>
          </CardContent>
        </Card>

        {posts.map((p, idx) => (
          <Card key={p._id} className="relative overflow-hidden bg-slate-900/40 backdrop-blur-lg border-purple-500/20 group">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="p-[2px] rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-yellow-500">
                  <div className="rounded-full bg-slate-900 p-[2px]">
                    {(() => { const { assetUrl } = require('@/lib/url'); return <img src={assetUrl(p.author?.avatarUrl)} className="h-8 w-8 rounded-full object-cover" /> })()}
                  </div>
                </div>
                <div>
                  <CardTitle className="text-slate-200 text-sm">{p.author?.name} • {p.type}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {p.text && <p>{p.text}</p>}
              {p.mediaUrl && (
                p.mediaUrl.match(/\.mp4|\.webm/i) ? (
                  <div className="relative" onDoubleClick={async()=>{ await postsApi.like(p._id); (document.getElementById(`like-${p._id}`) as HTMLDivElement)?.classList.add('like-burst'); setTimeout(()=> (document.getElementById(`like-${p._id}`) as HTMLDivElement)?.classList.remove('like-burst'), 650); }}>
                    <video src={assetUrl(p.mediaUrl)} controls className="w-full rounded-lg" />
                    <div id={`like-${p._id}`} className="pointer-events-none absolute inset-0 grid place-items-center text-white text-6xl opacity-0">❤</div>
                  </div>
                ) : (
                  <div className="relative" onDoubleClick={async()=>{ await postsApi.like(p._id); (document.getElementById(`like-${p._id}`) as HTMLDivElement)?.classList.add('like-burst'); setTimeout(()=> (document.getElementById(`like-${p._id}`) as HTMLDivElement)?.classList.remove('like-burst'), 650); }}>
                    <img src={assetUrl(p.mediaUrl)} className="w-full rounded-lg" />
                    <div id={`like-${p._id}`} className="pointer-events-none absolute inset-0 grid place-items-center text-white text-6xl opacity-0">❤</div>
                  </div>
                )
              )}
              {p.audioUrl && (
                <div className="space-y-1">
                  {(p.songTitle || p.songArtist) && (
                    <p className="text-sm text-gray-400">🎵 {p.songTitle || 'Track'} {p.songArtist ? `• ${p.songArtist}` : ''}</p>
                  )}
                  <audio src={assetUrl(p.audioUrl)} controls className="w-full" />
                </div>
              )}
            </CardContent>
            {/* Action bar */}
            <div className="absolute bottom-3 left-3 flex gap-3">
              <button
                onClick={async()=>{ await toggleLike(p._id); }}
                className={`h-9 w-9 rounded-full grid place-items-center border border-white/20 ${liked.has(p._id) ? 'bg-pink-600/70 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                title="Like"
              >❤</button>
              <button onClick={()=> openCommentDrawer(p._id)} className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center border border-white/20" title="Comment">💬</button>
              <button
                onClick={() => { localStorage.setItem('sharePostId', p._id); window.location.assign('/messages'); }}
                className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center border border-white/20"
                title="Share"
              >➦</button>
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
              <button
                onClick={() => { localStorage.setItem('sharePostId', p._id); window.location.assign('/messages'); }}
                className="px-3 py-1 rounded-full text-xs bg-white/10 hover:bg-white/20 text-white border border-white/20"
              >
                Share
              </button>
              <button
                onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/api/posts/${p._id}`); }}
                className="px-3 py-1 rounded-full text-xs bg-white/10 hover:bg-white/20 text-white border border-white/20"
              >
                Copy Link
              </button>
            </div>
            {p.songTitle || p.songArtist ? (
              <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2 bg-black/40 backdrop-blur rounded-full px-3 py-1">
                <span className="text-white text-xs">🎵 {p.songTitle || 'Track'} {p.songArtist ? `• ${p.songArtist}` : ''}</span>
              </div>
            ) : null}
          </Card>
        ))}
      </div>
      {/* Comments Drawer */}
      {openComments.open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center p-4" onClick={()=> setOpenComments({open:false, items:[]})}>
          <div className="w-full max-w-lg bg-slate-900/90 border border-purple-500/30 rounded-2xl p-4" onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-semibold">Comments</h4>
              <button className="text-gray-400 hover:text-white" onClick={()=> setOpenComments({open:false, items:[]})}>✕</button>
            </div>
            <div className="max-h-64 overflow-y-auto space-y-3">
              {openComments.items.length === 0 ? (
                <p className="text-gray-400 text-sm">No comments yet</p>
              ) : openComments.items.map((c:any, i:number)=> (
                <div key={i} className="flex items-start gap-2">
                  <img src={assetUrl(c.user?.avatarUrl)} className="h-8 w-8 rounded-full object-cover" />
                  <div>
                    <p className="text-sm text-white"><span className="font-semibold">{c.user?.name || 'User'}</span> {c.text}</p>
                    <p className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              <input id="comment-input" className="flex-1 bg-slate-800/60 border border-purple-500/30 rounded-md px-3 py-2 text-white" placeholder="Add a comment..." />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 rounded-md text-white" onClick={()=> { const el = document.getElementById('comment-input') as HTMLInputElement; addComment(el.value); el.value=''; }}>Post</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
