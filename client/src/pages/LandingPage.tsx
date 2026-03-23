import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/* ─── Tokens ── */
const P   = '#FFB4AA'; // coral
const CTR = '#FF5447'; // tomato red CTA
const OC  = '#5c0002'; // on-cta text
const SEC = '#D8BAFA'; // lavender
const SUR = '#131313'; // base bg
const S1  = '#1a1a1a'; // surface-low
const S2  = '#222222'; // surface-high
const T   = '#e5e2e1'; // on-surface text
const Z   = '#71717a'; // zinc-500 muted

/* ─── Nav ── */
function Nav() {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      height: 72,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 48px',
      background: 'rgba(19,19,19,0.7)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20, fontWeight: 700, color: T, letterSpacing: '-0.02em' }}>
        Atelier Visualizer
      </span>

      <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
        {['Projects', 'Explore'].map((l, i) => (
          <a key={l} href={i === 1 ? '#explore' : '#'} style={{
            fontFamily: 'Space Grotesk, sans-serif', fontSize: 12, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none',
            color: i === 0 ? P : Z,
            borderBottom: i === 0 ? `2px solid ${P}` : 'none',
            paddingBottom: i === 0 ? 3 : 0,
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => { if (i !== 0) e.currentTarget.style.color = T; }}
          onMouseLeave={e => { if (i !== 0) e.currentTarget.style.color = Z; }}>
            {l}
          </a>
        ))}
      </div>

      <Link to="/auth" style={{
        fontFamily: 'Space Grotesk, sans-serif', fontSize: 12, fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none',
        background: CTR, color: OC, padding: '10px 24px', borderRadius: 10,
        boxShadow: '0 0 24px rgba(255,84,71,0.2)',
        transition: 'filter 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
      onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}>
        Try for Free
      </Link>
    </nav>
  );
}

/* ─── Hero ── */
function Hero() {
  return (
    <section style={{
      minHeight: '100vh', paddingTop: 72, display: 'flex', alignItems: 'center',
      background: SUR, position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle radial glow */}
      <div style={{
        position: 'absolute', top: '20%', left: '5%', width: 600, height: 600,
        background: `radial-gradient(circle, ${P}12 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '30%', right: '10%', width: 400, height: 400,
        background: `radial-gradient(circle, ${SEC}0e 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 48px', display: 'flex', flexDirection: 'column', gap: 32 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: P, display: 'block', marginBottom: 24 }}>
            The Future of Spatial Design
          </span>
          <h1 style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800,
            fontSize: 'clamp(56px, 8vw, 96px)', lineHeight: 0.92,
            letterSpacing: '-0.03em', margin: 0, color: T,
          }}>
            DIGITAL<br />
            <span style={{ color: P }}>TONALISM.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'Manrope, sans-serif', fontSize: 18, lineHeight: 1.7,
            color: Z, maxWidth: 560, margin: 0,
          }}
        >
          An exploration of light, space, and emotion. Curate atmospheres,
          visualize luxury, and express your architectural vision with uncompromising aesthetic purity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}
        >
          <Link to="/auth" style={{
            fontFamily: 'Space Grotesk, sans-serif', fontSize: 13, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none',
            background: CTR, color: OC, padding: '14px 36px', borderRadius: 12,
            boxShadow: '0 8px 32px rgba(255,84,71,0.2)', transition: 'all 0.2s',
          }}>
            Enter Studio
          </Link>
          <a href="#explore" style={{
            fontFamily: 'Space Grotesk, sans-serif', fontSize: 13, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none',
            background: 'rgba(255,255,255,0.05)', color: T,
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '14px 36px', borderRadius: 12, transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.09)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
            View The Vision
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Showreel Animation ── */
function ShowreelAnimation() {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 0,
      background: '#111', overflow: 'hidden'
    }}>
      {/* Dynamic Background simulating the 'room' color changing */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, #FFB4AA40 0%, #111 70%)', // Coral
            'radial-gradient(circle at 50% 50%, #D8BAFA40 0%, #111 70%)', // Lavender
            'radial-gradient(circle at 50% 50%, #D7C3B040 0%, #111 70%)', // Beige
            'radial-gradient(circle at 50% 50%, #FFB4AA40 0%, #111 70%)', // Back to Coral
          ]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', inset: 0 }}
      />
      
      {/* Mock UI Panel */}
      <div style={{
        position: 'absolute', right: 40, top: '50%', transform: 'translateY(-50%)',
        width: 140, background: 'rgba(24,24,27,0.6)', backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 16,
        display: 'flex', flexDirection: 'column', gap: 12, boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
      }}>
        <div style={{ width: '100%', height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3 }} />
        <div style={{ width: '60%', height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, marginBottom: 8 }} />
        
        {/* Color Swatches */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div style={{ aspectRatio: '1', borderRadius: 8, background: '#FFB4AA' }} />
          <div style={{ aspectRatio: '1', borderRadius: 8, background: '#D8BAFA' }} />
          <div style={{ aspectRatio: '1', borderRadius: 8, background: '#D7C3B0' }} />
          <div style={{ aspectRatio: '1', borderRadius: 8, background: '#444' }} />
        </div>
      </div>

      {/* Animated Cursor */}
      <motion.div
        animate={{
          x: [20, 260, 260, 310, 310, 260, 260, 20], // X path connecting the swatches
          y: [20, 160, 160, 160, 160, 205, 205, 20], // Y path
          scale: [1, 1, 0.8, 1, 0.8, 1, 0.8, 1], // Click effect
        }}
        transition={{ duration: 6, repeat: Infinity, times: [0, 0.15, 0.2, 0.4, 0.45, 0.65, 0.7, 1], ease: 'easeInOut' }}
        style={{
          position: 'absolute', left: 0, top: 0, width: 20, height: 20,
          filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))'
        }}
      >
        {/* SVG Cursor Pointer */}
        <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 2l12 11.2-5.8.5 3.3 7.3-2.2 1-3.2-7.4-4.4 4.5V2z" stroke="#000" strokeWidth="1" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </div>
  );
}

/* ─── Vision / Explore ── */
function ExploreVision() {
  return (
    <section id="explore" style={{ background: S1, padding: '120px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ marginBottom: 80, textAlign: 'center' }}>
          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: P, marginBottom: 16 }}>
            The Philosophy
          </p>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', color: T, margin: 0, lineHeight: 1.1 }}>
            Design Without Compromise.
          </h2>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 18, color: Z, margin: '24px auto 0', maxWidth: 600, lineHeight: 1.7 }}>
            Atelier was born from a singular obsession: the absolute mastery of digital mood.
            It's not just software; it's a profound appreciation for the intersection of automotive sleakness, high-end architecture, and cinematic lighting.
          </p>
        </div>

        {/* Vision Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24, marginBottom: 24 }}>
          {/* Main Cinematic Video Block */}
          <div style={{ 
            background: '#0a0a0a', borderRadius: 24, border: '1px solid rgba(255,255,255,0.08)',
            position: 'relative', overflow: 'hidden', minHeight: 480, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 40
          }}>
            <ShowreelAnimation />
            
            <div style={{ position: 'relative', zIndex: 10 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,180,170,0.1)', border: `1px solid ${P}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, backdropFilter: 'blur(10px)' }}>
                <span className="material-symbols-outlined" style={{ color: P, fontSize: 24, marginLeft: 2 }}>play_arrow</span>
              </div>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, fontWeight: 700, color: T, margin: '0 0 12px', letterSpacing: '-0.01em' }}>
                The Atelier Cinematic Showreel
              </h3>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 15, color: '#a1a1aa', margin: 0, maxWidth: 400, lineHeight: 1.6 }}>
                Experience our design language in motion. Curvilinear forms, raw concrete texturing, and automotive-grade clear coat reflections.
              </p>
            </div>
          </div>

          {/* Typography / Focus Card */}
          <div style={{ 
            background: S2, borderRadius: 24, border: '1px solid rgba(255,255,255,0.04)',
            padding: 40, display: 'flex', flexDirection: 'column', gap: 24
          }}>
            <div style={{ flex: 1 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 32, color: SEC, marginBottom: 24 }}>auto_fix</span>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, fontWeight: 700, color: T, margin: '0 0 12px' }}>
                Obsessive Materiality
              </h3>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 15, color: Z, margin: 0, lineHeight: 1.6 }}>
                We believe that every pixel should exude quality. From the brushed titanium UI components to the deeply saturated blacks of our canvas. No fluff, no artificial metrics. Just pure visual fidelity.
              </p>
            </div>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />
            <div>
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: P, display: 'block', marginBottom: 8 }}>
                The Inspiration
              </span>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: Z, margin: 0, lineHeight: 1.5 }}>
                Bridging the gap between mid-century warmth and relentless futuristic precision.
              </p>
            </div>
          </div>
        </div>

        {/* Second Row of Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
          {[
            { title: 'The Silhouette', desc: 'Sleek, aerodynamic inspiration drawn directly from classic grand tourers.', icon: 'directions_car' },
            { title: 'The Light', desc: 'Crafting volumetric perfection, treating light itself as a physical, sculptable material.', icon: 'tungsten' },
            { title: 'The Purity', desc: 'A rejection of cluttered software. An interface that fades away, leaving only your art.', icon: 'lens_blur' }
          ].map((card, i) => (
            <div key={i} style={{ background: S2, borderRadius: 20, padding: 32, border: '1px solid rgba(255,255,255,0.04)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 24, color: i === 0 ? P : i === 1 ? SEC : Z, marginBottom: 16 }}>{card.icon}</span>
              <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 18, fontWeight: 700, color: T, margin: '0 0 12px' }}>{card.title}</h4>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 14, color: Z, margin: 0, lineHeight: 1.6 }}>{card.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─── CTA ── */
function CTA() {
  return (
    <section style={{ background: SUR, padding: '120px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>
        <div style={{
          background: S2, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24,
          padding: '80px 64px', textAlign: 'center', position: 'relative', overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.5)'
        }}>
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: `linear-gradient(to right, transparent, ${P}60, transparent)` }} />
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, letterSpacing: '-0.02em', color: T, margin: '0 0 20px', lineHeight: 1.15 }}>
            Ready to shape the atmosphere?
          </h2>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 16, lineHeight: 1.7, color: Z, margin: '0 auto 48px', maxWidth: 520 }}>
            Join the movement of visionary designers building the spaces of tomorrow.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/auth" style={{
              fontFamily: 'Space Grotesk, sans-serif', fontSize: 13, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none',
              background: CTR, color: OC, padding: '16px 40px', borderRadius: 12,
              boxShadow: '0 8px 32px rgba(255,84,71,0.2)', transition: 'all 0.2s',
            }}>
              Enter The Sandbox
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ── */
function Footer() {
  const cols = [
    { title: 'Navigation', links: ['Home', 'Projects', 'Explore'] },
    { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Settings'] },
    { title: 'Connect', links: ['Twitter / X', 'Instagram', 'Contact Us'] },
  ];
  return (
    <footer style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '64px 0 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
          <div>
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 18, fontWeight: 700, color: T, letterSpacing: '-0.02em', display: 'block', marginBottom: 16 }}>Atelier Visualizer</span>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 14, lineHeight: 1.7, color: Z, margin: 0, maxWidth: 280 }}>
              Defining the next era of high-end architectural rendering through digital tonalism.
            </p>
          </div>
          {cols.map(({ title, links }) => (
            <div key={title}>
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: T, display: 'block', marginBottom: 20 }}>{title}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {links.map(l => (
                  <a key={l} href="#" style={{ fontFamily: 'Manrope, sans-serif', fontSize: 14, color: Z, textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = SEC}
                    onMouseLeave={e => e.currentTarget.style.color = Z}>
                    {l}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: Z, margin: 0 }}>Atelier Visualizer. Digital Tonalism Excellence.</p>
          <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: P }}>v2.4.1</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ── */
export default function LandingPage() {
  return (
    <div style={{ background: SUR, color: T, fontFamily: 'Manrope, sans-serif', minHeight: '100vh' }}>
      <Nav />
      <Hero />
      <ExploreVision />
      <CTA />
      <Footer />
    </div>
  );
}
