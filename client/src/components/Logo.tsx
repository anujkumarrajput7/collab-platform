interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export default function Logo({ size = 'md', animated = true }: LogoProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className={`${sizes[size]} relative`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Background Circle with Gradient */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#EC4899', stopOpacity: 1 }} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Outer Circle */}
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="url(#logoGradient)" 
          className={animated ? "animate-pulse" : ""}
        />
        
        {/* Inner Connection Symbol - represents collaboration */}
        <g filter="url(#glow)">
          {/* Left Person */}
          <circle cx="35" cy="40" r="8" fill="white" opacity="0.9" />
          <path d="M 35 48 Q 35 55 28 58 L 28 70 L 42 70 L 42 58 Q 35 55 35 48" fill="white" opacity="0.9" />
          
          {/* Right Person */}
          <circle cx="65" cy="40" r="8" fill="white" opacity="0.9" />
          <path d="M 65 48 Q 65 55 58 58 L 58 70 L 72 70 L 72 58 Q 65 55 65 48" fill="white" opacity="0.9" />
          
          {/* Connection Line */}
          <path 
            d="M 42 65 L 58 65" 
            stroke="white" 
            strokeWidth="3" 
            strokeLinecap="round"
            opacity="0.9"
          />
          
          {/* Star - representing success/achievement */}
          <path 
            d="M 50 25 L 52 31 L 58 31 L 53 35 L 55 41 L 50 37 L 45 41 L 47 35 L 42 31 L 48 31 Z" 
            fill="white" 
            opacity="0.95"
            className={animated ? "animate-pulse" : ""}
          />
        </g>
      </svg>
    </div>
  );
}
