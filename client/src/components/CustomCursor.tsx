import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailing, setTrailing] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    let trailId = 0;
    
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add trailing effect
      setTrailing(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: trailId++ }];
        return newTrail.slice(-15); // Keep last 15 positions
      });
    };

    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  return (
    <>
      {/* Main cursor - crosshair style */}
      <div
        className="pointer-events-none fixed z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Horizontal line */}
        <div className="absolute w-6 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        {/* Vertical line */}
        <div className="absolute h-6 w-0.5 bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
        {/* Center dot */}
        <div className="absolute w-1 h-1 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Trailing lines effect */}
      {trailing.map((pos, index) => {
        const opacity = (index / trailing.length) * 0.6;
        const length = 20 + (index / trailing.length) * 20;
        
        return (
          <div
            key={pos.id}
            className="pointer-events-none fixed z-40"
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              transform: 'translate(-50%, -50%)',
              opacity: opacity,
            }}
          >
            {/* Horizontal trail line */}
            <div 
              className="absolute bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transition-all duration-200"
              style={{
                width: `${length}px`,
                height: '2px',
                transform: 'translateX(-50%)',
              }}
            />
          </div>
        );
      })}
    </>
  );
}
