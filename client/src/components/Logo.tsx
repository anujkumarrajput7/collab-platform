interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export default function Logo({ size = 'md', animated = true }: LogoProps) {
  const sizes = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
  };

  return (
    <img 
      src="/logo.png" 
      alt="CREATERRA Logo" 
      className={`${sizes[size]} w-auto object-contain ${animated ? 'hover:scale-105 transition-transform' : ''}`}
    />
  );
}
