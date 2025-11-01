import { useEffect, useRef, useState } from 'react';
import { postsApi } from '@/lib/api';
import { assetUrl } from '@/lib/url';
import { Card } from '@/components/ui/card';

export default function Reels() {
  const [reels, setReels] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    (async () => {
      const data: any[] = await postsApi.feed();
      const onlyReels = (data || []).filter(p => (p.type === 'reel') || /\.(mp4|webm)$/i.test(p.mediaUrl || ''));
      setReels(onlyReels);
    })();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const vids = videoRefs.current.filter(Boolean);
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const el = entry.target as HTMLVideoElement;
          if (entry.isIntersecting && entry.intersectionRatio > 0.75) {
            el.play().catch(()=>{});
          } else {
            el.pause();
          }
        });
      },
      { threshold: [0.0, 0.75, 1.0] }
    );
    vids.forEach(v => io.observe(v));
    return () => io.disconnect();
  }, [reels]);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black"
    >
      {reels.map((p, idx) => (
        <section key={p._id || idx} className="relative h-screen w-full snap-start flex items-center justify-center" onDoubleClick={async()=>{ try { await postsApi.like(p._id); } catch(e){} }}>
          <video
            ref={el => { if (el) videoRefs.current[idx] = el; }}
            src={assetUrl(p.mediaUrl)}
            className="h-full w-auto max-w-full object-cover"
            muted
            playsInline
            controls={false}
            loop
          />
          {/* Overlays */}
          <div className="absolute top-4 left-4 flex items-center gap-3">
            <div className="p-[2px] rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-yellow-500">
              <div className="rounded-full bg-black/40 p-[2px]">
                <img src={assetUrl(p.author?.avatarUrl)} className="h-10 w-10 rounded-full object-cover" />
              </div>
            </div>
            <div className="text-white/90 font-semibold">{p.author?.name}</div>
          </div>
          {(p.songTitle || p.songArtist) && (
            <div className="absolute bottom-20 left-4 right-4 text-white/90 text-sm bg-black/40 px-3 py-1 rounded-full w-fit">
              🎵 {p.songTitle || 'Track'} {p.songArtist ? `• ${p.songArtist}` : ''}
            </div>
          )}
          {/* Controls */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <button
              onClick={() => { localStorage.setItem('sharePostId', p._id); window.location.assign('/messages'); }}
              className="px-3 py-1 rounded-full text-xs bg-white/10 hover:bg-white/20 text-white border border-white/20"
            >
              Share
            </button>
          </div>
          <Card className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/30 border-white/10 text-white px-4 py-2">Swipe up/down for next</Card>
        </section>
      ))}
    </div>
  );
}
