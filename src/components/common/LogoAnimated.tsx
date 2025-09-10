/** 
 * LogoAnimated.tsx
 * High Country Gear — premium animated banner logo with:
 * - Always-visible neon text that continuously color-shifts (no crossfades).
 * - Cinematic aurora sweep, improved sky and light accents.
 * - Smooth SVG mountain layers with subtle gradients and snow caps.
 * - Seasonal meadow palette and gentle stream shimmer.
 * - Accessibility: respects reduced motion (slows ambient animations, keeps gentle color drift).
 *
 * API unchanged for drop-in use across the site.
 */

import { Link } from 'react-router'
import { useMemo } from 'react'

/** Props for the animated banner logo (API preserved for drop-in replacement) */
interface LogoAnimatedProps {
  /** Pixel height of the banner (width auto-scales by aspect ratio) */
  height?: number
  /** Optional wrapper className */
  className?: string
  /** Unused (kept for API compatibility with older image logo) */
  src: string
  /** Accessible label for the home link */
  ariaLabel?: string
}

/** getSeason - Returns a coarse season bucket based on the current month. */
function getSeason(date = new Date()): 'winter' | 'spring' | 'summer' | 'fall' {
  const m = date.getMonth() // 0..11
  if (m === 11 || m <= 1) return 'winter' // Dec–Feb
  if (m <= 4) return 'spring' // Mar–May
  if (m <= 7) return 'summer' // Jun–Aug
  return 'fall' // Sep–Nov
}

/**
 * LogoAnimated - Inline-animated rectangular banner logo with brand text overlay.
 * - Base design space ~340x100 for predictable scaling via transform.
 * - All styles scoped to 'hcg-anim-' prefix to avoid leakage.
 */
export default function LogoAnimated({
  height = 96,
  className = '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  src,
  ariaLabel = 'highcountrygear.shop home',
}: LogoAnimatedProps) {
  // Logical design space (width x height)
  const BASE_W = 340
  const BASE_H = 100
  const scale = height / BASE_H
  const width = Math.round((height * BASE_W) / BASE_H)

  // Seasonal palette + winter detection
  const season = getSeason()
  const isWinter = season === 'winter'

  // Precompute randomized particles (snow) and birds
  const snowflakes = useMemo(() => {
    if (!isWinter) return []
    const count = 20
    return Array.from({ length: count }, (_, i) => {
      const size = 1 + Math.random() * 2.5
      const left = Math.random() * 100
      const delay = Math.random() * 6 + i * 0.15
      const duration = 8 + Math.random() * 6
      const opacity = 0.5 + Math.random() * 0.5
      return { id: i, size, left, delay, duration, opacity }
    })
  }, [isWinter])

  const birdFlocks = useMemo(() => {
    return [
      { id: 1, top: 12, scale: 1, delay: 0 },
      { id: 2, top: 20, scale: 0.9, delay: 6.5 },
      { id: 3, top: 9, scale: 1.1, delay: 12.5 },
    ]
  }, [])

  // Seasonal color variables injected on the banner for CSS consumption
  const styleVars: React.CSSProperties = (() => {
    switch (season) {
      case 'spring':
        return {
          '--valley-a': '#1d7a1d',
          '--valley-b': '#2FAF2F',
          '--valley-c': '#7BD87B',
          '--tree-1': '#0b5b0b',
          '--tree-2': '#1f8c1f',
          '--tree-3': '#48c248',
          '--accent-flower-1': '#f06292',
          '--accent-flower-2': '#ffd54f',
          '--accent-flower-3': '#9ccc65',
        } as React.CSSProperties
      case 'summer':
        return {
          '--valley-a': '#136b13',
          '--valley-b': '#2F9E2F',
          '--valley-c': '#65D065',
          '--tree-1': '#064f06',
          '--tree-2': '#1c7a1c',
          '--tree-3': '#3fb83f',
          '--accent-flower-1': '#ff8a65',
          '--accent-flower-2': '#ffd54f',
          '--accent-flower-3': '#81c784',
        } as React.CSSProperties
      case 'fall':
        return {
          '--valley-a': '#2c6a1f',
          '--valley-b': '#4c8f2f',
          '--valley-c': '#86c26d',
          '--tree-1': '#2e5d17',
          '--tree-2': '#6d8f1f',
          '--tree-3': '#b58c2f',
          '--accent-flower-1': '#ff7043',
          '--accent-flower-2': '#ffca28',
          '--accent-flower-3': '#ffb74d',
        } as React.CSSProperties
      default: // winter
        return {
          '--valley-a': '#1f5e1f',
          '--valley-b': '#2f7f2f',
          '--valley-c': '#5aa65a',
          '--tree-1': '#194d19',
          '--tree-2': '#2f6f2f',
          '--tree-3': '#4d8f4d',
          '--accent-flower-1': '#cfd8dc',
          '--accent-flower-2': '#eceff1',
          '--accent-flower-3': '#b0bec5',
        } as React.CSSProperties
    }
  })()

  return (
    <Link
      to="/"
      className={`inline-flex items-center focus:outline-none focus:ring-2 focus:ring-[#2F5D3A] ${className}`}
      aria-label={ariaLabel}
    >
      {/* Scoped CSS for the banner */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&display=swap');

          :root {
            /* Brand neon palette tuned for legibility over dark backdrops */
            --hcg-green: #39FF14; /* neon green */
            --hcg-orange: #FF6A00; /* neon orange */
            --hcg-gold-1: #FEEBC8; /* warm highlight 1 */
            --hcg-gold-2: #FFF4CC; /* warm highlight 2 */
            --hcg-cyan: #8ED3FF;   /* cool accent for stream/sky */
          }

          .hcg-anim-wrap { position: relative; display: inline-block; }
          .hcg-anim-banner {
            position: relative;
            width: ${BASE_W}px; height: ${BASE_H}px;
            overflow: hidden; border-radius: 12px;
            background: radial-gradient(120% 140% at 50% -30%, #15271D 0%, #0E1A12 50%, #09140D 100%);
            box-shadow:
              0 2px 6px rgba(0,0,0,0.25),
              inset 0 0 0 1px rgba(0,0,0,0.08);
            isolation: isolate; /* enable blending */
          }

          /* Subtle star field, revealed slightly on hover */
          .hcg-anim-stars {
            position: absolute; inset: 0; opacity: .25;
            background-image:
              radial-gradient(1px 1px at 12% 22%, rgba(255,255,255,0.9) 50%, transparent 51%),
              radial-gradient(1px 1px at 38% 16%, rgba(255,255,255,0.7) 50%, transparent 51%),
              radial-gradient(1.5px 1.5px at 64% 24%, rgba(255,255,255,0.85) 50%, transparent 51%),
              radial-gradient(1px 1px at 82% 12%, rgba(255,255,255,0.7) 50%, transparent 51%),
              radial-gradient(1px 1px at 72% 30%, rgba(255,255,255,0.7) 50%, transparent 51%);
            pointer-events: none;
            transition: opacity .6s ease;
          }
          .hcg-anim-wrap:hover .hcg-anim-stars { opacity: .4; }

          /* Cinematic aurora sweep */
          .hcg-anim-aurora {
            position: absolute; left: -20%; right: -20%; top: -20px; height: 80px;
            background:
              radial-gradient(60% 100% at 20% 80%, rgba(57,255,20,0.18) 0%, transparent 70%),
              radial-gradient(50% 100% at 60% 30%, rgba(142,211,255,0.16) 0%, transparent 70%),
              radial-gradient(60% 100% at 85% 50%, rgba(255,106,0,0.14) 0%, transparent 70%);
            mix-blend-mode: screen;
            filter: blur(4px) saturate(120%);
            animation: hcg-anim-aurora-drift 22s ease-in-out infinite;
            pointer-events: none;
          }
          .hcg-anim-wrap:hover .hcg-anim-aurora { filter: blur(3px) saturate(130%); }

          /* Ambient soft glow & slow rays for premium sheen */
          .hcg-anim-glow {
            position: absolute; top: -28px; left: -10px; width: 220px; height: 220px;
            background: radial-gradient(circle at 40% 20%, rgba(255, 215, 160, 0.25) 0%, rgba(255, 215, 160, 0.12) 35%, transparent 60%);
            filter: blur(1px);
            animation: hcg-anim-pulse 5.5s ease-in-out infinite;
            pointer-events: none;
          }
          .hcg-anim-rays {
            position: absolute; top: -30px; left: -30px; width: 220px; height: 220px;
            background: conic-gradient(from 220deg at 30% 30%, rgba(255,245,210,0.18), rgba(255,245,210,0.00) 35%);
            filter: blur(2px); opacity: .55;
            animation: hcg-anim-ray-rotate 24s linear infinite;
            pointer-events: none;
          }
          .hcg-anim-wrap:hover .hcg-anim-rays { opacity: .2; }

          /* Clouds drifting across the sky */
          .hcg-anim-cloud {
            position: absolute; top: 10px;
            width: 84px; height: 32px; opacity: .9;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,.14));
            /* Multi‑lobe cloud built from overlapping puffs (scaled ~70%) */
            background:
              radial-gradient(25px 17px at 25% 60%, rgba(255,255,255,.98) 60%, rgba(255,255,255,0) 62%),
              radial-gradient(29px 20px at 45% 45%, rgba(255,255,255,.98) 60%, rgba(255,255,255,0) 62%),
              radial-gradient(24px 15px at 66% 62%, rgba(255,255,255,.98) 60%, rgba(255,255,255,0) 62%),
              radial-gradient(20px 14px at 82% 55%, rgba(255,255,255,.98) 60%, rgba(255,255,255,0) 62%),
              /* soft fill for the body */
              linear-gradient(180deg, rgba(255,255,255,.96) 0%, rgba(255,255,255,.9) 60%, rgba(255,255,255,0) 100%);
            border-radius: 22px;
            animation: hcg-anim-drift 36s linear infinite;
          }
          /* Extra puffs to lose the pill silhouette */
          .hcg-anim-cloud::before,
          .hcg-anim-cloud::after {
            content: "";
            position: absolute;
            background: radial-gradient(circle at 50% 50%, rgba(255,255,255,.98) 65%, rgba(255,255,255,0) 66%);
            filter: blur(.2px);
            border-radius: 999px;
          }
          .hcg-anim-cloud::before { width: 38px; height: 24px; left: 6px; top: -6px; }
          .hcg-anim-cloud::after  { width: 31px; height: 20px; right: 10px; top: -4px; }
          .hcg-anim-cloud--sm { transform: scale(.8); opacity: .85; animation-duration: 42s; }
          .hcg-anim-cloud--lg { transform: scale(1.15); opacity: .95; animation-duration: 30s; }

          /* Mist layer near mountains */
          .hcg-anim-mist {
            position: absolute; left: -20%; right: -20%; bottom: 47px; height: 40px;
            background: linear-gradient(180deg, rgba(255,255,255,.18), rgba(255,255,255,.05));
            filter: blur(3px); opacity: .35;
            animation: hcg-anim-mist-drift 28s ease-in-out infinite;
            pointer-events: none;
          }
          .hcg-anim-wrap:hover .hcg-anim-mist { opacity: .22; }

          /* SVG mountain layers for crisp geometry */
          .hcg-anim-mountains {
            position: absolute; left: 0; right: 0; bottom: 12px; height: 68px;
            filter: drop-shadow(2px 4px 8px rgba(0,0,0,0.30));
            z-index: 1;
          }
          .hcg-anim-mountains .layer { animation: hcg-anim-float 9s ease-in-out infinite; }
          .hcg-anim-mountains .layer.mid { animation-delay: .8s; }
          .hcg-anim-mountains .layer.front { animation-delay: 1.6s; }

          /* Trees (foreground, simple but elegant) */
          .hcg-anim-tree {
            position: absolute; bottom: 26px;
            filter: drop-shadow(1px 2px 4px rgba(0,0,0,0.30));
            transform-origin: bottom center;
            animation: hcg-anim-sway 6s ease-in-out infinite;
          }
          .hcg-anim-tree--1 { right: 80px; }
          .hcg-anim-tree--2 { right: 44px; transform: scale(1.08); animation-delay: .8s; }
          .hcg-anim-tree--3 { left: 58px; transform: scale(0.92); animation-delay: 1.6s; }
          .hcg-anim-tree--bg1 { left: 98px; bottom: 30px; transform: scale(0.75); opacity: .9; animation-delay: 2.2s; }
          .hcg-anim-tree--bg2 { right: 110px; bottom: 29px; transform: scale(0.68); opacity: .85; animation-delay: 3s; }
          .hcg-anim-tree-trunk { width: 6px; height: 12px; background: #8B4513; margin: 0 auto; border-radius: 0 0 3px 3px; }
          .hcg-anim-tree-layer { width: 0; height: 0; margin: 0 auto 3px; }
          .hcg-anim-tree-layer--1 { border-left: 12px solid transparent; border-right: 12px solid transparent; border-bottom: 18px solid var(--tree-1); }
          .hcg-anim-tree-layer--2 { border-left: 10px solid transparent; border-right: 10px solid transparent; border-bottom: 15px solid var(--tree-2); margin-bottom: -2px; }
          .hcg-anim-tree-layer--3 { border-left: 8px solid transparent; border-right: 8px solid transparent; border-bottom: 12px solid var(--tree-3); margin-bottom: -2px; }

          /* Meadow band with wildflowers near valley edge */
          .hcg-anim-meadow {
            position: absolute; left: 14px; right: 14px; bottom: 24px; height: 10px; pointer-events: none;
            background:
              radial-gradient(2px 2px at 10% 60%, var(--accent-flower-1), transparent 60%),
              radial-gradient(1.5px 1.5px at 22% 70%, var(--accent-flower-2), transparent 60%),
              radial-gradient(2px 2px at 34% 65%, var(--accent-flower-3), transparent 60%),
              radial-gradient(1.5px 1.5px at 48% 72%, var(--accent-flower-2), transparent 60%),
              radial-gradient(2px 2px at 62% 66%, var(--accent-flower-1), transparent 60%),
              radial-gradient(1.5px 1.5px at 74% 70%, var(--accent-flower-3), transparent 60%),
              radial-gradient(2px 2px at 86% 64%, var(--accent-flower-2), transparent 60%);
            opacity: .85;
          }

          /* Stream/path with subtle shimmer */
          .hcg-anim-stream {
            position: absolute; left: 0; right: 0; bottom: 6px; height: 40px; pointer-events: none;
          }
          .hcg-anim-stream path {
            stroke: url(#hcg-stream-grad);
            stroke-width: 3; fill: none; opacity: .7;
            filter: drop-shadow(0 1px 2px rgba(0,0,0,.2));
            stroke-dasharray: 6 10; animation: hcg-anim-flow 8s linear infinite;
          }

          /* Winter snowfall (only Dec–Feb) */
          .hcg-anim-snowfield { position: absolute; inset: 0; pointer-events: none; }
          .hcg-anim-snowflake {
            position: absolute; top: -6px; border-radius: 999px; background: rgba(255,255,255,0.95);
            animation-name: hcg-anim-snow; animation-iteration-count: infinite; animation-timing-function: linear;
            will-change: transform, opacity;
          }

          /* BRAND TEXT OVERLAY -------------------------------------------- */
          .hcg-anim-text {
            position: absolute; inset: 0; pointer-events: none; display: block; z-index: 60;
          }
          .hcg-anim-text-backdrop {
            position: absolute; left: 6%; right: 6%; top: 12px; height: 78px;
            background: radial-gradient(60% 120% at 50% 40%, rgba(0,0,0,0.45), rgba(0,0,0,0.12));
            border-radius: 10px; filter: blur(0.5px); z-index: 0;
          }
          .hcg-anim-text-inner {
            position: absolute; left: 50%; transform: translateX(-50%); top: 16px; width: 98%; text-align: center;
            line-height: 1.05; font-family: 'Sora', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            white-space: nowrap;
          }
          .hcg-anim-mainline {
            font-size: clamp(1.25rem, 2.5vw, 2.5rem); font-weight: 300; letter-spacing: 0.125em; text-transform: uppercase;
            opacity: 0.95; margin-bottom: 0.7rem;
            text-shadow: 0 2px 6px rgba(0,0,0,0.6), 0 0 8px rgba(0,0,0,0.35);
          }
          .hcg-anim-tagline {
            font-size: 1rem; font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase;
            text-shadow: 0 2px 6px rgba(0,0,0,0.6), 0 0 6px rgba(0,0,0,0.3);
          }

          /* Always-on premium neon gradient with subtle specular highlights */
          .hcg-anim-mainline,
          .hcg-anim-tagline {
            background-image:
              linear-gradient(90deg,
                var(--hcg-green) 0%,
                var(--hcg-gold-1) 14%,
                var(--hcg-orange) 32%,
                var(--hcg-gold-2) 50%,
                var(--hcg-green) 68%,
                var(--hcg-gold-1) 86%,
                var(--hcg-orange) 100%);
            background-size: 300% 100%;
            background-position: 0% 50%;
            -webkit-background-clip: text; background-clip: text; color: transparent;
            -webkit-text-stroke: 0.4px rgba(0,0,0,0.35);
            text-shadow: 0 2px 6px rgba(0,0,0,0.65), 0 0 8px rgba(0,0,0,0.35);
            animation: hcg-anim-grad-shift 14s ease-in-out infinite;
          }
          .hcg-anim-tagline { animation-duration: 18s; animation-delay: 3s; }

          /* PREMIUM MICRO‑EFFECTS ---------------------------------------- */
          /* Lens grain: barely there, adds tactile depth to the sky */
          .hcg-anim-grain {
            position: absolute; inset: 0; pointer-events: none; z-index: 5;
            opacity: .055;
            mix-blend-mode: overlay;
            background-image:
              radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,.8) 40%, transparent 41%),
              radial-gradient(1px 1px at 30% 80%, rgba(255,255,255,.7) 40%, transparent 41%),
              radial-gradient(1px 1px at 60% 35%, rgba(255,255,255,.6) 40%, transparent 41%),
              radial-gradient(1px 1px at 80% 60%, rgba(255,255,255,.8) 40%, transparent 41%),
              radial-gradient(1px 1px at 50% 50%, rgba(255,255,255,.7) 40%, transparent 41%);
            filter: blur(.2px);
          }

          /* Text gleam: specular sweep that runs only on hover */
          .hcg-anim-text-gleam {
            position: absolute; left: 6%; right: 6%; top: 12px; height: 78px;
            pointer-events: none; z-index: 2;
            background: linear-gradient(100deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 65%);
            filter: blur(1.5px) saturate(130%);
            mix-blend-mode: screen;
            opacity: 0;
            transform: translateX(-120%);
            animation: hcg-anim-gleam 3.6s ease-in-out infinite;
            animation-play-state: paused; /* default paused */
          }
          .hcg-anim-wrap:hover .hcg-anim-text-gleam {
            animation-play-state: running;
            opacity: .28;
          }

          /* KEYFRAMES ----------------------------------------------------- */
          @keyframes hcg-anim-grad-shift {
            0%   { background-position:   0% 50%; }
            50%  { background-position: 100% 50%; }
            100% { background-position:   0% 50%; }
          }
          @keyframes hcg-anim-float { 0% { transform: translateY(0px);} 50% { transform: translateY(-2px);} 100% { transform: translateY(0px);} }
          @keyframes hcg-anim-sway  { 0% { transform: rotate(0deg);}   50% { transform: rotate(-4deg);}   100% { transform: rotate(0deg);} }
          @keyframes hcg-anim-pulse { 0% { opacity: 0.35;} 50% { opacity: 0.55;} 100% { opacity: 0.35;} }
          @keyframes hcg-anim-drift { 0% { transform: translateX(-120%) translateZ(0);} 100% { transform: translateX(120%) translateZ(0);} }
          @keyframes hcg-anim-mist-drift { 0% { transform: translateX(0px);} 50% { transform: translateX(16px);} 100% { transform: translateX(0px);} }
          @keyframes hcg-anim-flow { 0% { stroke-dashoffset: 0;} 100% { stroke-dashoffset: -160;} }
          @keyframes hcg-anim-flight { 0% { transform: translateX(0%) translateZ(0); opacity: .0;} 10% { opacity: .9;} 90% { opacity: .9;} 100% { transform: translateX(920%) translateZ(0); opacity: 0;} }
          @keyframes hcg-anim-snow { 0% { transform: translateY(-4px); opacity: 0;} 10% { opacity: 1;} 100% { transform: translateY(${BASE_H + 12}px); opacity: .9;} }
          @keyframes hcg-anim-ray-rotate { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }
          @keyframes hcg-anim-aurora-drift {
            0%   { transform: translateX(0%) translateY(0); opacity: .55; }
            50%  { transform: translateX(6%) translateY(-2px); opacity: .7; }
            100% { transform: translateX(0%) translateY(0); opacity: .55; }
          }
          @keyframes hcg-anim-gleam {
            0%   { transform: translateX(-120%); }
            100% { transform: translateX(120%); }
          }

          /* Reduced motion: freeze heavy scene motion, keep gentle color drift slower */
          @media (prefers-reduced-motion: reduce) {
            .hcg-anim-glow,
            .hcg-anim-rays,
            .hcg-anim-cloud,
            .hcg-anim-mist,
            .hcg-anim-mountains .layer,
            .hcg-anim-tree,
            .hcg-anim-birds,
            .hcg-anim-snowflake,
            .hcg-anim-stream path,
            .hcg-anim-aurora,
            .hcg-anim-text-gleam {
              animation-duration: 0s !important;
              animation: none !important;
            }
            .hcg-anim-mainline,
            .hcg-anim-tagline {
              animation-duration: 20s !important; /* gentler text drift remains */
            }
          }
        `}
      </style>

      {/* Wrapper sized via height and computed width to preserve banner ratio */}
      <div
        className="hcg-anim-wrap"
        style={{ height, width }}
        role="img"
        aria-label="High Country Gear animated banner logo"
      >
        {/* Scaled banner canvas */}
        <div
          className="hcg-anim-banner"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            ...styleVars,
          }}
        >
          {/* Stars + Aurora + Light Accents */}
          <div className="hcg-anim-stars" />
          <div className="hcg-anim-aurora" />
          <div className="hcg-anim-glow" />
          <div className="hcg-anim-rays" />
          {/* Ultra‑subtle lens grain for tactile depth */}
          <div className="hcg-anim-grain" />

          {/* Clouds */}
          <div className="hcg-anim-cloud" style={{ top: 14, left: '-20%' }} />
          <div className="hcg-anim-cloud hcg-anim-cloud--sm" style={{ top: 8, left: '10%' }} />
          <div className="hcg-anim-cloud hcg-anim-cloud--lg" style={{ top: 18, left: '40%' }} />
          <div className="hcg-anim-cloud hcg-anim-cloud--sm" style={{ top: 26, left: '75%' }} />

          {/* Mist across the mid-line */}
          <div className="hcg-anim-mist" />

          {/* SVG Mountains with subtle gradient layers and snowcaps */}
          <svg className="hcg-anim-mountains" viewBox="0 0 340 68" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              {/* Back mountain gradient: richer base tone */}
              <linearGradient id="hcg-mtn-back" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8B5E3C" />
                <stop offset="100%" stopColor="#6E442B" />
              </linearGradient>
              {/* Mid mountain gradient */}
              <linearGradient id="hcg-mtn-mid" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#A36C43" />
                <stop offset="100%" stopColor="#7D4D2F" />
              </linearGradient>
              {/* Front mountain gradient */}
              <linearGradient id="hcg-mtn-front" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#C9854F" />
                <stop offset="100%" stopColor="#9A633A" />
              </linearGradient>
              {/* Snow highlight gradient */}
              <linearGradient id="hcg-snow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#EDEDED" />
              </linearGradient>
            </defs>

            {/* Back layer */}
            <g className="layer back" style={{ animationDelay: '0s' }}>
              <polygon fill="url(#hcg-mtn-back)" points="60,65 130,20 200,65" />
              <polygon fill="url(#hcg-snow)" points="123,30 130,20 137,30 130,27" />
            </g>

            {/* Mid layer */}
            <g className="layer mid">
              <polygon fill="url(#hcg-mtn-mid)" points="10,65 70,28 130,65" />
              <polygon fill="url(#hcg-snow)" points="64,37 70,28 76,37 70,34" />
            </g>

            {/* Front layer */}
            <g className="layer front">
              <polygon fill="url(#hcg-mtn-front)" points="210,65 270,24 330,65" />
              <polygon fill="url(#hcg-snow)" points="264,33 270,24 276,33 270,30" />
            </g>
          </svg>

          {/* Trees (foreground) */}
          <div className="hcg-anim-tree hcg-anim-tree--1">
            <div className="hcg-anim-tree-layer hcg-anim-tree-layer--1" />
            <div className="hcg-anim-tree-layer hcg-anim-tree-layer--2" />
            <div className="hcg-anim-tree-layer hcg-anim-tree-layer--3" />
            <div className="hcg-anim-tree-trunk" />
          </div>
          <div className="hcg-anim-tree hcg-anim-tree--2">
            <div className="hcg-anim-tree-layer hcg-anim-tree-layer--1" />
            <div className="hcg-anim-tree-layer hcg-anim-tree-layer--2" />
            <div className="hcg-anim-tree-layer hcg-anim-tree-layer--3" />
            <div className="hcg-anim-tree-trunk" />
          </div>
          <div className="hcg-anim-tree hcg-anim-tree--3">
            <div className="hcg-anim-tree-layer hcg-anim-tree-layer--1" />
            <div className="hcg-anim-tree-layer hcg-anim-tree-layer--2" />
            <div className="hcg-anim-tree-layer hcg-anim-tree-layer--3" />
            <div className="hcg-anim-tree-trunk" />
          </div>

          {/* Depth trees */}
          <div className="hcg-anim-tree hcg-anim-tree--bg1">
            <div className="hcg-anim-tree-layer hcg-anim-tree-layer--1" />
            <div className="hcg-anim-tree-layer hcg-anim-tree-layer--2" />
            <div className="hcg-anim-tree-layer hcg-anim-tree-layer--3" />
            <div className="hcg-anim-tree-trunk" />
          </div>
          <div className="hcg-anim-tree hcg-anim-tree--bg2">
            <div className="hcg-anim-tree-layer hcg-anim-tree-layer--1" />
            <div className="hcg-anim-tree-layer hcg-anim-tree-layer--2" />
            <div className="hcg-anim-tree-layer hcg-anim-tree-layer--3" />
            <div className="hcg-anim-tree-trunk" />
          </div>

          {/* Meadow band with wildflowers */}
          <div className="hcg-anim-meadow" />

          {/* Stream/path overlay */}
          <svg className="hcg-anim-stream" viewBox="0 0 340 40" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="hcg-stream-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--hcg-cyan)" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#b5e8ff" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <path d="M10 28 C 80 20, 120 36, 180 30 S 260 36, 330 30" />
          </svg>

          {/* Winter snowfall (only Dec–Feb) */}
          {isWinter && (
            <div className="hcg-anim-snowfield" aria-hidden="true">
              {snowflakes.map((flake) => (
                <div
                  key={flake.id}
                  className="hcg-anim-snowflake"
                  style={{
                    left: `${flake.left}%`,
                    width: flake.size,
                    height: flake.size,
                    opacity: flake.opacity,
                    animationDuration: `${flake.duration}s`,
                    animationDelay: `${flake.delay}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Birds: occasional flocks */}
          {birdFlocks.map((f) => (
            <svg
              key={f.id}
              className="hcg-anim-birds"
              style={{
                position: 'absolute',
                left: '-12%',
                top: f.top,
                width: 120,
                height: 30,
                opacity: 0.9,
                animation: 'hcg-anim-flight 22s linear infinite',
                transform: `scale(${f.scale})`,
                animationDelay: `${f.delay}s`,
              }}
              viewBox="0 0 100 30"
              aria-hidden="true"
            >
              <path d="M10 18 q 6 -6 12 0" stroke="rgba(255,255,255,.9)" strokeWidth="1.2" fill="none" />
              <path d="M26 18 q 6 -6 12 0" stroke="rgba(255,255,255,.9)" strokeWidth="1.2" fill="none" />
              <path d="M42 18 q 6 -6 12 0" stroke="rgba(255,255,255,.9)" strokeWidth="1.2" fill="none" />
            </svg>
          ))}

          {/* BRAND TEXT: single stack, always visible, continuous gradient */}
          <div className="hcg-anim-text" aria-hidden="true">
            <div className="hcg-anim-text-backdrop" />
            {/* Premium gleam sweep (hover‑only) */}
            <div className="hcg-anim-text-gleam" />
            <div className="hcg-anim-text-inner">
              <div className="hcg-anim-mainline">HIGH COUNTRY GEAR</div>
              <div className="hcg-anim-tagline">PREMIUM OUTDOOR EQUIPMENT</div>
            </div>
          </div>

          {/* Valley foreground (placed last to overlap mountain bases) */}
          <div
            style={{
              position: 'absolute',
              left: 10,
              right: 10,
              bottom: 0,
              height: 28,
              background: 'linear-gradient(135deg, var(--valley-a), var(--valley-b), var(--valley-c))',
              borderRadius: '12px 12px 0 0',
              filter: 'drop-shadow(0px 2px 6px rgba(0,0,0,0.25))',
              zIndex: 2,
            }}
          />
        </div>
      </div>
    </Link>
  )
}
