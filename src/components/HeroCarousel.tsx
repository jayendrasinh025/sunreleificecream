import React, { useEffect, useRef, useState, useCallback } from 'react';
import { HERO_CAROUSEL_ITEMS } from '../data/products';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroCarouselProps {
  onExploreProducts: () => void;
  onBecomeDistributor: () => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  onExploreProducts,
  onBecomeDistributor,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // Carousel physics state
  const offsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startOffsetRef = useRef(0);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const [, forceRender] = useState({});

  // 10 Hero items
  const items = HERO_CAROUSEL_ITEMS;
  const numCards = items.length; // 10
  const basePitch = 196; // base pitch units
  const totalTrack = numCards * basePitch; // 1960 units
  const autoSpeed = 48; // frame units per second right-to-left

  // Responsive scale factor: u = min(100vw / 1440, 100vh / 1080) for desktop
  const updateDimensions = useCallback(() => {
    if (!containerRef.current) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const mobile = vw < 820;
    setIsMobile(mobile);

    if (mobile) {
      // Mobile reference width 640
      const uMobile = Math.min(vw / 640, 1);
      setScale(Math.max(uMobile, 0.52));
    } else {
      // Desktop reference 1440 x 1080
      const uDesktop = Math.min(vw / 1440, vh / 1020);
      setScale(Math.max(Math.min(uDesktop, 1.05), 0.65));
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  // Animation Loop using requestAnimationFrame with delta-time
  useEffect(() => {
    let animId: number;

    const animate = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.1); // clamp to 100ms
      lastTimeRef.current = time;

      if (!isDraggingRef.current) {
        // Apply momentum decay ~95% per second
        if (Math.abs(velocityRef.current) > autoSpeed) {
          velocityRef.current *= Math.pow(0.08, dt);
          offsetRef.current += velocityRef.current * dt;
        } else {
          // Resume steady automatic movement from right to left
          offsetRef.current += autoSpeed * dt;
        }

        // Loop seamlessly
        if (offsetRef.current >= totalTrack) {
          offsetRef.current %= totalTrack;
        } else if (offsetRef.current < 0) {
          offsetRef.current = (offsetRef.current % totalTrack) + totalTrack;
        }
      }

      forceRender({});
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [totalTrack]);

  // Pointer drag event handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    startOffsetRef.current = offsetRef.current;
    velocityRef.current = 0;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const currentX = e.clientX;
    const deltaPixel = currentX - lastXRef.current;
    lastXRef.current = currentX;

    // Convert pixel movement to base units (inverted because right-to-left)
    const unitDelta = deltaPixel / scale;
    offsetRef.current -= unitDelta;

    // Instant velocity in units/second
    velocityRef.current = -unitDelta * 60;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      offsetRef.current -= 80;
    } else if (e.key === 'ArrowRight') {
      offsetRef.current += 80;
    }
  };

  // Geometry calculations for a card with index i
  const calculateCardGeometry = (cardIndex: number) => {
    // Current track position of card
    const cardTrackPos = cardIndex * basePitch - (offsetRef.current % totalTrack);

    // Normalize t to range [-totalTrack/2, +totalTrack/2]
    let t = cardTrackPos;
    const halfTrack = totalTrack / 2;
    while (t < -halfTrack) t += totalTrack;
    while (t > halfTrack) t -= totalTrack;

    // Formula from spec:
    // x = 720 + t * (1 + 0.083 * (t / 706)^2)
    const tNorm = t / 706;
    const xCenter = 720 + t * (1 + 0.083 * tNorm * tNorm);

    // Normalized distance d = |x - 720| / 706
    const d = Math.abs(xCenter - 720) / 706;

    // width = (170 + 48 * d^2)
    const cardWidth = 170 + 48 * d * d;

    // Left and right edges
    const leftX = xCenter - cardWidth / 2;
    const rightX = xCenter + cardWidth / 2;

    const qL = Math.abs(leftX - 720) / 706;
    const qR = Math.abs(rightX - 720) / 706;

    // edgeHeight = (280 + 92 * q^2.6)
    const heightL = 280 + 92 * Math.pow(qL, 2.6);
    const heightR = 280 + 92 * Math.pow(qR, 2.6);

    // yCentre = 687 - 12 * d^2
    const yCenter = 687 - 12 * d * d;

    // 4 corners:
    const topL = { x: leftX, y: yCenter - heightL / 2 };
    const topR = { x: rightX, y: yCenter - heightR / 2 };
    const botR = { x: rightX, y: yCenter + heightR / 2 };
    const botL = { x: leftX, y: yCenter + heightL / 2 };

    // Corner radius r = 15
    const r = Math.min(15, cardWidth * 0.12);

    // SVG path string for rounded trapezoid
    const path = `
      M ${topL.x + r} ${topL.y}
      L ${topR.x - r} ${topR.y}
      Q ${topR.x} ${topR.y} ${topR.x} ${topR.y + r}
      L ${botR.x} ${botR.y - r}
      Q ${botR.x} ${botR.y} ${botR.x - r} ${botR.y}
      L ${botL.x + r} ${botL.y}
      Q ${botL.x} ${botL.y} ${botL.x} ${botL.y - r}
      L ${topL.x} ${topL.y + r}
      Q ${topL.x} ${topL.y} ${topL.x + r} ${topL.y}
      Z
    `.replace(/\s+/g, ' ').trim();

    // Check visibility within viewport bounds plus padding
    const isVisible = rightX >= -60 && leftX <= 1500;

    return {
      xCenter,
      yCenter,
      cardWidth,
      heightL,
      heightR,
      d,
      path,
      isVisible,
      leftX,
      rightX,
      topL,
      botL,
    };
  };

  // Reference frame dimensions
  const frameWidth = 1440 * scale;
  const frameHeight = isMobile ? 740 * scale : 1000 * scale;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#FDF8F3] via-[#FFF9F2] to-white flex flex-col items-center justify-start select-none pt-4 pb-12 md:pb-20"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Sun Relief Ice Cream interactive showcase"
    >
      {/* Decorative Warm Ambient Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] bg-gradient-to-b from-[#F8DCE8]/40 via-[#F5C542]/15 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-48 left-12 w-64 h-64 bg-[#F5C542]/20 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-48 right-12 w-64 h-64 bg-[#F8DCE8]/40 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Hero Master Container (1440-based scaled container) */}
      <div
        className="relative flex flex-col items-center w-full max-w-[1440px] px-4 md:px-8 z-10"
        style={{
          transformOrigin: 'top center',
        }}
      >
        {/* Top Badge: “Your Sweet Escape, Naturally Delicious.” */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5C542] text-[#123B75] font-semibold text-xs md:text-sm shadow-sm transition-all duration-300 hover:shadow-md cursor-default mb-4 md:mb-6 animate-in fade-in zoom-in-95 duration-700"
          style={{
            border: '1.5px solid rgba(18, 59, 117, 0.15)',
          }}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#123B75]" />
          <span>Your Sweet Escape, Naturally Delicious.</span>
        </div>

        {/* Headline: “Discover Your Sweet Escape” */}
        <h1 className="text-center font-heading font-bold text-[#123B75] text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.08] max-w-4xl mx-auto drop-shadow-sm mb-4 md:mb-5">
          <span>Discover Your</span>
          <br />
          <span className="text-[#E94B35] relative inline-block">
            Sweet Escape
            {/* Subtle playful under-curve accent */}
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-[#F5C542]"
              viewBox="0 0 100 12"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M2 9 C 25 3, 75 3, 98 9"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        {/* Centered Supporting Paragraph */}
        <p className="text-center text-slate-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans mb-6 md:mb-8 text-balance">
          Discover ice cream moments made for every craving. Explore our product
          range, learn about our brand and connect with us for customer
          enquiries, distribution and franchise opportunities.
        </p>

        {/* Hand-Drawn Annotations (Desktop: Positioned playfully around headline) */}
        {!isMobile && (
          <>
            {/* Note 1: Top Left - “A little scoop of happiness” */}
            <div
              className="absolute left-8 lg:left-16 top-16 hidden md:flex flex-col items-start pointer-events-none transition-opacity duration-700"
              style={{
                fontFamily: 'var(--font-sans)',
              }}
            >
              <div className="bg-white/90 backdrop-blur-sm border border-[#123B75]/15 px-3 py-1.5 rounded-xl shadow-sm text-xs font-semibold text-[#123B75] rotate-[-6deg]">
                A little scoop of happiness ✨
              </div>
              {/* Curved SVG Doodle Arrow */}
              <svg
                width="64"
                height="48"
                viewBox="0 0 64 48"
                fill="none"
                className="text-[#E94B35] mt-1 ml-4"
              >
                <path
                  d="M10 4 C 18 24, 38 32, 54 36"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="60"
                  className="animate-draw-stroke"
                />
                <path
                  d="M44 32 L 55 36 L 47 44"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Note 2: Top Right - “Find your favourite” */}
            <div
              className="absolute right-8 lg:right-16 top-16 hidden md:flex flex-col items-end pointer-events-none transition-opacity duration-700"
              style={{
                fontFamily: 'var(--font-sans)',
              }}
            >
              <div className="bg-[#F8DCE8] border border-[#E94B35]/20 px-3 py-1.5 rounded-xl shadow-sm text-xs font-semibold text-[#123B75] rotate-[5deg]">
                Find your favourite 🍦
              </div>
              {/* Curved SVG Doodle Arrow pointing down */}
              <svg
                width="64"
                height="48"
                viewBox="0 0 64 48"
                fill="none"
                className="text-[#F5C542] mt-1 mr-4"
              >
                <path
                  d="M54 4 C 44 22, 24 30, 8 36"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="60"
                  className="animate-draw-stroke"
                />
                <path
                  d="M18 30 L 7 36 L 15 44"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </>
        )}

        {/* Curved Continuous Interactive Carousel Container */}
        <div
          className={`relative w-full overflow-hidden cursor-grab active:cursor-grabbing select-none my-2 ${
            isMobile ? 'h-[270px]' : 'h-[360px] md:h-[430px] lg:h-[470px]'
          }`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ touchAction: 'pan-y' }}
        >
          {/* SVG Canvas for True Inside-of-Cylinder Curved quadrilateral cards */}
          <svg
            className="w-full h-full"
            viewBox={`0 ${isMobile ? 480 : 490} 1440 ${isMobile ? 420 : 450}`}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {items.map((_, i) => {
                const geo = calculateGeometryCached(i);
                return (
                  <clipPath key={`clip-${i}`} id={`reelmark-clip-${i}`}>
                    <path d={geo.path} />
                  </clipPath>
                );
              })}
              {/* Frosted badge filter */}
              <filter id="frosted-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.18" />
              </filter>
              {/* Linear gradients for card overlays */}
              <linearGradient id="bottom-vignette" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#123B75" stopOpacity="0" />
                <stop offset="100%" stopColor="#0c274e" stopOpacity="0.92" />
              </linearGradient>
              <linearGradient id="top-vignette" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Render 10 curved cards */}
            {items.map((item, i) => {
              const geo = calculateGeometryCached(i);
              if (!geo.isVisible) return null;

              const isHovered = activeCard === i;

              return (
                <g
                  key={item.id}
                  className="transition-transform duration-200"
                  onMouseEnter={() => setActiveCard(i)}
                  onMouseLeave={() => setActiveCard(null)}
                  onClick={onExploreProducts}
                  role="button"
                  tabIndex={0}
                  aria-label={`${item.name} - ${item.category}`}
                >
                  {/* Subtle card outline / border */}
                  <path
                    d={geo.path}
                    fill="#123B75"
                    opacity={0.06}
                    stroke="#123B75"
                    strokeWidth={isHovered ? 2.5 : 1}
                    className="transition-colors duration-200"
                  />

                  {/* Card Interior Clipped to Precise Curved Quadrilateral */}
                  <g clipPath={`url(#reelmark-clip-${i})`}>
                    {/* Background solid tone */}
                    <rect
                      x={geo.leftX - 10}
                      y={geo.yCenter - geo.heightL / 2 - 20}
                      width={geo.cardWidth + 20}
                      height={Math.max(geo.heightL, geo.heightR) + 40}
                      fill={isHovered ? '#FEF3C7' : '#FFFFFF'}
                      className="transition-colors duration-300"
                    />

                    {/* SVG Image Fallback Pattern behind image */}
                    <g opacity={0.4}>
                      <circle cx={geo.xCenter} cy={geo.yCenter - 25} r={28} fill="#123B75" opacity={0.08} />
                      <text
                        x={geo.xCenter}
                        y={geo.yCenter - 20}
                        textAnchor="middle"
                        fill="#123B75"
                        fontSize="10"
                        fontWeight="600"
                        fontFamily="var(--font-heading)"
                      >
                        Sun Relief
                      </text>
                    </g>

                    {/* Authentic Sun Relief Ice Cream High-Res Photo (preserveAspectRatio="xMidYMid meet" avoids packaging cropping) */}
                    <image
                      href={item.image}
                      xlinkHref={item.image}
                      x={geo.leftX + 6}
                      y={geo.topL.y + 14}
                      width={geo.cardWidth - 12}
                      height={Math.min(geo.heightL, geo.heightR) - 75}
                      preserveAspectRatio="xMidYMid meet"
                      className="transition-transform duration-300"
                      style={{
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                        transformOrigin: `${geo.xCenter}px ${geo.yCenter - 25}px`,
                      }}
                    >
                      <title>{item.name} - Sun Relief {item.category}</title>
                    </image>

                    {/* Top gradient for legibility */}
                    <rect
                      x={geo.leftX}
                      y={geo.topL.y}
                      width={geo.cardWidth}
                      height={40}
                      fill="url(#top-vignette)"
                      opacity={0.35}
                    />

                    {/* Bottom gradient overlay for caption */}
                    <rect
                      x={geo.leftX}
                      y={geo.botL.y - 65}
                      width={geo.cardWidth}
                      height={65}
                      fill="url(#bottom-vignette)"
                      opacity={0.7}
                    />

                    {/* Card Title & Category at Bottom */}
                    <text
                      x={geo.leftX + 44}
                      y={geo.botL.y - 24}
                      fill="#FFFFFF"
                      fontSize={Math.max(12, 13 * (geo.cardWidth / 170))}
                      fontWeight="bold"
                      fontFamily="var(--font-heading)"
                      filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.6))"
                    >
                      {item.name}
                    </text>

                    <text
                      x={geo.leftX + 44}
                      y={geo.botL.y - 10}
                      fill="#F5C542"
                      fontSize={Math.max(9.5, 10 * (geo.cardWidth / 170))}
                      fontWeight="600"
                      fontFamily="var(--font-sans)"
                      letterSpacing="0.05em"
                    >
                      {item.category.toUpperCase()} • {item.tag}
                    </text>

                    {/* Frosted circular play-style / scoop indicator at bottom-left */}
                    <g transform={`translate(${geo.leftX + 22}, ${geo.botL.y - 20})`}>
                      {/* Frosted circle */}
                      <circle
                        cx="0"
                        cy="0"
                        r="14"
                        fill="rgba(18, 59, 117, 0.85)"
                        stroke="rgba(245, 197, 66, 0.8)"
                        strokeWidth="1.5"
                      />
                      {/* Mini Ice Cream Scoop / Sparkle glyph inside */}
                      <path
                        d="M-4 1 C -4 -4, 4 -4, 4 1 C 4 3, -4 3, -4 1 Z"
                        fill="#F5C542"
                      />
                      <path
                        d="M-2.5 2 L 0 6 L 2.5 2 Z"
                        fill="#FFFFFF"
                      />
                    </g>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Drag Helper Tip */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-sans mt-1 mb-4 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E94B35] animate-ping" />
          <span>Drag or swipe smoothly to explore flavours • Looping cylinder carousel</span>
        </div>

        {/* Hero Calls To Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mt-2 mb-4 w-full max-w-md">
          {/* Primary CTA: “Explore Our Products” with signature dashed pill outline */}
          <div className="p-1 rounded-full border-2 border-dashed border-[#F5C542] hover:border-[#123B75] transition-colors duration-300 w-full sm:w-auto">
            <button
              onClick={onExploreProducts}
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#123B75] hover:bg-[#0a244b] text-white font-semibold text-sm md:text-base shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Explore Our Products</span>
              <ArrowRight className="w-4 h-4 text-[#F5C542] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Secondary CTA: “Become a Distributor” */}
          <button
            onClick={onBecomeDistributor}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-[#F8DCE8]/40 text-[#123B75] border-2 border-[#123B75]/25 hover:border-[#123B75] font-semibold text-sm md:text-base shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Become a Distributor</span>
          </button>
        </div>

        {/* Note 3: Bottom Accent - “Let's grow together” */}
        <div className="flex items-center gap-2 mt-2 text-xs md:text-sm font-medium text-slate-600 bg-white/70 backdrop-blur-sm px-4 py-1.5 rounded-full border border-slate-200 shadow-2xs">
          <span className="text-[#E94B35] font-bold">●</span>
          <span>Wholesale & parlour opportunities across Gujarat</span>
          <span className="text-slate-300">|</span>
          <span className="text-[#123B75] font-semibold">“Let's grow together”</span>
        </div>
      </div>
    </div>
  );

  // Helper to memoize/compute geometry per render
  function calculateGeometryCached(cardIndex: number) {
    return calculateCardGeometry(cardIndex);
  }
};
