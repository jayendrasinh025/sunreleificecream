import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'color';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = 'h-10',
  variant = 'color',
  showTagline = false,
}) => {
  const isDark = variant === 'dark';
  const isLight = variant === 'light';

  const textColor = isLight ? '#FFFFFF' : '#123B75';
  const sunColor = '#F5C542';
  const redDotColor = '#E94B35';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Sun & Cone Rays Icon Mark */}
      <svg
        className="w-10 h-10 shrink-0"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Sun Relief Logo Symbol"
      >
        {/* Soft background glow */}
        <circle cx="50" cy="50" r="44" fill={isLight ? 'rgba(255,255,255,0.12)' : 'rgba(245,197,66,0.18)'} />

        {/* Rising Semi-Sun */}
        <path
          d="M26 62C26 48.7452 36.7452 38 50 38C63.2548 38 74 48.7452 74 62H26Z"
          fill={sunColor}
        />
        {/* Inner Sun Glow Highlight */}
        <path
          d="M32 62C32 52.0589 40.0589 44 50 44C59.9411 44 68 52.0589 68 62H32Z"
          fill="#FDE68A"
        />

        {/* 3 Radiating Ice Cream Cone Rays */}
        {/* Left Cone Ray (tilted -30 deg) */}
        <g transform="translate(30, 26) rotate(-32)">
          <path d="M0 0 L6 0 L3 12 Z" fill={sunColor} />
          <circle cx="3" cy="-3" r="4.5" fill="#E94B35" />
        </g>
        {/* Center Top Cone Ray (vertical) */}
        <g transform="translate(47, 14)">
          <path d="M0 0 L6 0 L3 12 Z" fill={sunColor} />
          <circle cx="3" cy="-3" r="4.5" fill={isLight ? '#FFFFFF' : '#123B75'} />
        </g>
        {/* Right Cone Ray (tilted +30 deg) */}
        <g transform="translate(68, 22) rotate(32)">
          <path d="M0 0 L6 0 L3 12 Z" fill={sunColor} />
          <circle cx="3" cy="-3" r="4.5" fill="#E94B35" />
        </g>

        {/* Playful mini sprinkles / dots */}
        <circle cx="24" cy="42" r="2.2" fill={sunColor} />
        <circle cx="76" cy="42" r="2.2" fill={sunColor} />

        {/* Base cream wave */}
        <path
          d="M20 62C25 58 35 66 50 62C65 58 75 66 80 62L80 68L20 68Z"
          fill={redDotColor}
        />
      </svg>

      {/* Typography Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-baseline leading-none">
          <span
            style={{ color: textColor }}
            className="font-heading font-bold text-xl tracking-tight"
          >
            Sun
          </span>
          <span
            style={{ color: '#E94B35' }}
            className="font-heading font-bold text-xl tracking-tight ml-1"
          >
            Relief
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span
            style={{ color: isLight ? '#F5C542' : '#123B75' }}
            className="text-[10px] uppercase font-bold tracking-[0.2em] leading-none"
          >
            Ice Cream
          </span>
          <span className="w-1 h-1 rounded-full bg-[#E94B35] inline-block" />
          <span className="text-[9px] uppercase font-medium tracking-wider text-slate-400">
            Gujarat
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] text-slate-500 mt-1 italic font-serif">
            Naturally Delicious
          </span>
        )}
      </div>
    </div>
  );
};
