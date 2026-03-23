import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Design Tokens ── */
const PRIMARY       = '#FFB4AA';
const PRIMARY_CTR   = '#FF5447';
const ON_CTR        = '#5c0002';
const SECONDARY     = '#D8BAFA';
const SURFACE       = '#131313';
const SURFACE_LOW   = '#1c1b1b';
const SURFACE_HIGH  = '#2a2a2a';
const SURFACE_HIGHEST = '#353534';
const ON_SURFACE    = '#e5e2e1';
const ZINC_400      = '#a1a1aa';

/* ─── NavBar ─────────────────────────────────── */
function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed top-0 w-full z-50 flex justify-between items-center px-6 sm:px-8 h-20"
        style={{
          background: 'rgba(24,24,27,0.4)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 20px 40px rgba(255,180,170,0.08)',
        }}
      >
        {/* Logo */}
        <div className="font-headline text-xl sm:text-2xl font-bold tracking-tighter" style={{ color: ON_SURFACE }}>
          Atelier Visualizer
        </div>

        {/* Desktop Nav links */}
        <div className="hidden md:flex gap-10 items-center">
          <a href="#"
            className="font-headline tracking-tight text-sm uppercase font-bold transition-colors"
            style={{ color: PRIMARY, borderBottom: `2px solid ${PRIMARY}`, paddingBottom: '4px' }}>
            Projects
          </a>
          <a href="#explore"
            className="font-headline tracking-tight text-sm uppercase font-bold transition-colors"
            style={{ color: ZINC_400 }}
            onMouseEnter={e => (e.currentTarget.style.color = ON_SURFACE)}
            onMouseLeave={e => (e.currentTarget.style.color = ZINC_400)}>
            Explore
          </a>
          <a href="#community"
            className="font-headline tracking-tight text-sm uppercase font-bold transition-colors"
            style={{ color: ZINC_400 }}
            onMouseEnter={e => (e.currentTarget.style.color = ON_SURFACE)}
            onMouseLeave={e => (e.currentTarget.style.color = ZINC_400)}>
            Community
          </a>
        </div>

        {/* Desktop CTA */}
        <Link to="/auth"
          className="hidden md:inline-flex font-headline font-bold text-sm uppercase tracking-wider px-6 py-2.5 rounded-xl transition-all active:scale-90 hover:brightness-110"
          style={{ background: PRIMARY_CTR, color: ON_CTR, boxShadow: '0 0 20px rgba(255,84,71,0.25)' }}>
          Try for Free
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
            className="block w-6 h-0.5"
            style={{ background: ON_SURFACE }}
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1 }}
            className="block w-6 h-0.5"
            style={{ background: ON_SURFACE }}
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
            className="block w-6 h-0.5"
            style={{ background: ON_SURFACE }}
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-0 right-0 z-40 flex flex-col gap-2 px-6 py-6 md:hidden"
            style={{ background: 'rgba(18,18,22,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
          >
            {['Projects', 'Explore', 'Community'].map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="font-headline text-sm uppercase font-bold py-3 border-b transition-colors"
                style={{ color: ZINC_400, borderColor: 'rgba(255,255,255,0.06)' }}
                onMouseEnter={e => (e.currentTarget.style.color = ON_SURFACE)}
                onMouseLeave={e => (e.currentTarget.style.color = ZINC_400)}
              >
                {item}
              </a>
            ))}
            <Link
              to="/auth"
              onClick={() => setMenuOpen(false)}
              className="mt-3 text-center font-headline font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-xl transition-all"
              style={{ background: PRIMARY_CTR, color: ON_CTR }}
            >
              Try for Free
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── LandingPage ──────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: SURFACE, color: ON_SURFACE, fontFamily: 'Manrope, sans-serif' }}>
      <NavBar />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background image with tonal overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfhQEE_JVJa-v5Ub2WyeC9Kol6wPTgxjH4JVL9zy0kC_H-JnyI8Fblo_VBWWjvYmaD7j9foIcUr2XBCZQyVeDmj_hFHUtpCp4VOO8AA0Hh_iNv8_iyWSowrvDIscNdJetKJsJmYg_Kg5emOiC_CmTqfKBwEb3qMCYPfMn2am0FLyQypSIY9srijrhwh4lWjYVQ9dvBW2xO6SFufKW0M_0uuHt63QdcyYCEKwQ0dswFDy5sdahan9gMrPFd5RvF9Gaj7SLLSlOFgw"
            alt="Luxurious modern interior"
            className="w-full h-full object-cover"
            style={{ opacity: 0.6, filter: 'grayscale(30%)' }}
          />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${SURFACE} 0%, ${SURFACE}cc 40%, transparent 100%)` }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${SURFACE} 0%, transparent 50%)` }} />
        </div>

        <div className="container mx-auto px-6 sm:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: headline + CTAs */}
          <motion.div
            className="lg:col-span-7 flex flex-col py-12 lg:py-0"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-headline text-xs sm:text-sm uppercase tracking-[0.3em] font-bold mb-4 sm:mb-6 block" style={{ color: PRIMARY }}>
              The Future of Spatial Design
            </span>
            <h1 className="font-headline font-bold tracking-tighter leading-none mb-6 sm:mb-8"
              style={{ fontSize: 'clamp(3rem, 9vw, 7rem)', lineHeight: 0.9, color: ON_SURFACE }}>
              DIGITAL <br />
              <span style={{ color: PRIMARY }}>TONALISM.</span>
            </h1>
            <p className="font-body text-base sm:text-lg max-w-xl mb-8 sm:mb-12 leading-relaxed" style={{ color: ZINC_400 }}>
              Experience hyper-realistic interior color visualization. Our AI-driven engine renders light and texture
              with architectural precision, allowing you to curate atmospheres with a single click.
            </p>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              <Link to="/auth"
                className="font-headline font-bold uppercase tracking-widest px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl transition-all hover:brightness-110 active:scale-95"
                style={{ background: PRIMARY_CTR, color: ON_CTR, boxShadow: '0 20px 40px rgba(255,84,71,0.15)' }}>
                Try for Free
              </Link>
              <a href="#explore"
                className="font-headline font-bold uppercase tracking-widest px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl transition-all hover:bg-white/10"
                style={{ border: `1px solid ${SURFACE_HIGHEST}`, background: 'rgba(255,255,255,0.05)', color: ON_SURFACE }}>
                Explore Designs
              </a>
            </div>
          </motion.div>

          {/* Right: floating preset card — hidden on mobile / tablet */}
          <motion.div
            className="hidden lg:flex lg:col-span-5 items-center justify-end"
            initial={{ opacity: 0, x: 40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 48 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="p-8 rounded-xl w-80"
              style={{ background: 'rgba(28,27,27,0.4)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(255,180,170,0.08)' }}>
              <div className="flex justify-between items-center mb-6">
                <span className="font-headline text-xs font-bold uppercase tracking-widest" style={{ color: ZINC_400 }}>Active Preset</span>
                <span className="material-symbols-outlined" style={{ color: PRIMARY }}>auto_awesome</span>
              </div>
              <h3 className="font-headline text-xl font-bold mb-2" style={{ color: ON_SURFACE }}>Nordic Dusk</h3>
              <p className="font-body text-sm mb-6" style={{ color: ZINC_400 }}>Muted lavenders and deep charcoals for high-end serenity.</p>
              <div className="flex gap-3 mb-8">
                {[SURFACE_HIGHEST, '#543b71', PRIMARY].map((c, i) => (
                  <div key={i} className="w-10 h-10 rounded-full"
                    style={{ background: c, boxShadow: i === 2 ? `0 0 15px ${PRIMARY}` : undefined }} />
                ))}
              </div>
              <div className="h-1 w-full rounded-full overflow-hidden" style={{ background: '#3a3a3a' }}>
                <div className="h-full rounded-full" style={{ background: PRIMARY, width: '66%' }} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Feature Bento Grid ────────────────────────────── */}
      <section id="explore" className="py-20 sm:py-32" style={{ background: SURFACE_LOW }}>
        <div className="container mx-auto px-6 sm:px-8">
          <div className="mb-12 sm:mb-20 max-w-2xl">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight mb-4 sm:mb-6" style={{ color: ON_SURFACE }}>
              Engineered for Creative Precision.
            </h2>
            <p className="font-body text-base sm:text-lg" style={{ color: ZINC_400 }}>
              Beyond a simple renderer. Atelier is an ecosystem where light meets logic.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Large card — AI Material Sync */}
            <div className="sm:col-span-2 p-8 sm:p-12 rounded-2xl relative overflow-hidden group"
              style={{ background: SURFACE_HIGH }}>
              <div className="relative z-10 max-w-md">
                <h3 className="font-headline text-2xl sm:text-3xl font-bold mb-4" style={{ color: ON_SURFACE }}>AI-Assisted Material Sync</h3>
                <p className="font-body mb-6 sm:mb-8" style={{ color: ZINC_400 }}>
                  Our neural network analyzes your room's natural lighting and automatically suggests material finishes that maintain the designer's intent.
                </p>
                <Link to="/auth" className="font-headline text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors" style={{ color: PRIMARY }}>
                  Discover Engine <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
                </Link>
              </div>
              <img
                className="absolute top-0 right-0 w-1/2 h-full object-cover opacity-20 grayscale group-hover:opacity-40 transition-opacity"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTJjnGD-iGSVQrSOqrkaxx9RaEzvK8G500mkkytzlKPk-8RWUXbiFdo_TrArDs6bxz3N32bncRr43dqxYzWoFeQ2mNS4zuqu3AW8UizNUAwmDMznIrARseeXgjT2PP8ciyVYYrDVOsH-XniV-CFJs4VHwI107sKC5WQQGHif9C6YUWrhI-rOBJ9Hyn9KttHBCD1bilWcN1vzsyNLuo5K5-w2hhHH9aJ1K69BZG5IfsQ9NGM9oAjeOpYIjhyWP9whMTWx7vOgZnoQ"
                alt="Fabric textures"
              />
            </div>

            {/* Card 2 — Ultra-HD Library */}
            <div className="p-8 sm:p-12 rounded-2xl hover:-translate-y-2 transition-all duration-300"
              style={{ background: SURFACE_HIGH, borderBottom: `4px solid ${SECONDARY}` }}>
              <span className="material-symbols-outlined mb-4 sm:mb-6 block" style={{ fontSize: 36, color: SECONDARY }}>texture</span>
              <h3 className="font-headline text-xl sm:text-2xl font-bold mb-4" style={{ color: ON_SURFACE }}>Ultra-HD Library</h3>
              <p className="font-body" style={{ color: ZINC_400 }}>8K texture maps with full PBR properties for realistic interaction with scene lighting.</p>
            </div>

            {/* Card 3 — Ray-Traced Precision */}
            <div className="p-8 sm:p-12 rounded-2xl hover:-translate-y-2 transition-all duration-300"
              style={{ background: SURFACE_HIGH, borderBottom: `4px solid ${PRIMARY_CTR}` }}>
              <span className="material-symbols-outlined mb-4 sm:mb-6 block" style={{ fontSize: 36, color: PRIMARY }}>light_mode</span>
              <h3 className="font-headline text-xl sm:text-2xl font-bold mb-4" style={{ color: ON_SURFACE }}>Ray-Traced Precision</h3>
              <p className="font-body" style={{ color: ZINC_400 }}>Real-time path tracing for global illumination that mirrors physical reality perfectly.</p>
            </div>

            {/* Large card 2 — Cloud Compute Rendering */}
            <div className="sm:col-span-2 rounded-2xl relative overflow-hidden flex flex-col justify-end min-h-[300px] sm:min-h-[400px]"
              style={{ background: '#0d0d0d' }}>
              <div className="absolute inset-0">
                <img
                  className="w-full h-full object-cover opacity-30"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYG-hu2oRgHV2u3MUsqUNITYNfGZp8sSqaSCmzAMXqYodnp_zx_k_EzakCZSum0w37s1DP21OCs0oB7I3R7z3O8y6b2I6JT7H6tLTVzYZ6hh2lDhC-kwN-0DxH-8ke0jvu75iRUWxoeLaw8sh3p8MFsTJkkPyVSHd-KEm-4QPEqO7-1TZDZKAGR_2DpYUJHL91ag4oaMCb080I0ZjINPEt4IaXumOrJaJ9qxSm9mp9mbAyLFB2eA_vq6RWeouaQjpTZevaRwezKQ"
                  alt="Dark bedroom"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0d0d0d 20%, transparent)' }} />
              </div>
              <div className="relative z-10 p-8 sm:p-12">
                <h3 className="font-headline text-2xl sm:text-3xl font-bold mb-4" style={{ color: ON_SURFACE }}>Cloud Compute Rendering</h3>
                <p className="font-body max-w-lg" style={{ color: ZINC_400 }}>Finish complex 4K animations in minutes, not hours, using our distributed GPU network.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pro-Grade Tools ───────────────────────────────── */}
      <section className="py-20 sm:py-32" style={{ background: SURFACE }}>
        <div className="container mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight mb-8 sm:mb-10 leading-tight" style={{ color: ON_SURFACE }}>
                Pro-Grade Tools for <br />
                <span style={{ color: SECONDARY }}>Visionary Designers.</span>
              </h2>
              <div className="space-y-8 sm:space-y-12">
                {[
                  { icon: 'palette', title: 'Adaptive Palettes', desc: 'Create color schemes that intelligently react to room volume and window placement.', color: PRIMARY },
                  { icon: 'style', title: 'Preset Ecosystem', desc: 'Access thousands of pre-curated designer themes or build your own proprietary library.', color: SECONDARY },
                ].map(({ icon, title, desc, color }) => (
                  <div key={title} className="flex gap-4 sm:gap-6">
                    <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded flex items-center justify-center" style={{ background: SURFACE_HIGH }}>
                      <span className="material-symbols-outlined" style={{ color }}>{icon}</span>
                    </div>
                    <div>
                      <h4 className="font-headline text-lg sm:text-xl font-bold mb-2" style={{ color: ON_SURFACE }}>{title}</h4>
                      <p className="font-body text-sm sm:text-base" style={{ color: ZINC_400 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulated interface */}
            <div className="relative mt-4 lg:mt-0">
              <div className="rounded-2xl p-4 shadow-2xl overflow-hidden"
                style={{ background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 20px 40px rgba(255,180,170,0.08)' }}>
                <div className="flex items-center gap-2 mb-4 px-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#3a3a3a' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#3a3a3a' }} />
                  <span className="ml-auto font-headline" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#555' }}>Renderer v4.2 Stable</span>
                </div>
                <img
                  className="w-full aspect-video object-cover rounded-lg mb-6"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_bTt-6nd-VDQwi2Wgv6609Cx67nFLvSJpDPqi--qPAyjA0eQ_IcDQ2S5h0LBiM0OZYen0RAlL3VtkVbEA8oegdSVhOhltkAX5Et6BLoVZgGdVBVSZ75Za9kz6el4Tf9zf59MrBZ_bZKhmWbwMjfPhQJNzH86UvMGzRr7Kq3jQ1sDAeQydvNFAHfsiYBaQMArEj0IJ9j0MwWY9Ur446hJrOHPF7nBnGMToaf9d1pBd0xmqOdT7liqKv-yH5eBGo5XxSi0zUwfxmA"
                  alt="Renderer interface"
                />
                <div className="grid grid-cols-4 gap-3 sm:gap-4 p-2">
                  {[
                    { icon: 'layers', active: true },
                    { icon: 'blur_on', active: false },
                    { icon: 'view_in_ar', active: false },
                    { icon: 'play_arrow', active: true, cta: true },
                  ].map(({ icon, active, cta }, i) => (
                    <div key={i} className="h-14 sm:h-16 rounded-lg flex items-center justify-center"
                      style={{ background: cta ? PRIMARY_CTR : SURFACE_HIGH, border: active && !cta ? `1px solid ${PRIMARY}40` : undefined }}>
                      <span className="material-symbols-outlined" style={{ color: cta ? ON_CTR : active ? PRIMARY : '#555' }}>{icon}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="py-24 sm:py-40" style={{ background: SURFACE }}>
        <div className="container mx-auto px-6 sm:px-8">
          <div className="p-8 sm:p-16 lg:p-24 rounded-2xl sm:rounded-3xl relative overflow-hidden text-center"
            style={{ background: `linear-gradient(135deg, ${SURFACE_HIGH} 0%, ${SURFACE_LOW} 100%)`, border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="absolute top-0 left-0 w-full h-px" style={{ background: `linear-gradient(to right, transparent, ${PRIMARY}80, transparent)` }} />
            <h2 className="font-headline font-bold mb-6 sm:mb-8 max-w-3xl mx-auto leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 5vw, 3.75rem)', color: ON_SURFACE }}>
              Elevate your visualization workflow today.
            </h2>
            <p className="font-body text-base sm:text-lg mb-8 sm:mb-12 max-w-xl mx-auto" style={{ color: ZINC_400 }}>
              Join over 15,000 architectural studios pushing the boundaries of tonal spatial design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Link to="/auth"
                className="w-full sm:w-auto font-headline font-bold uppercase tracking-widest px-10 sm:px-12 py-4 sm:py-5 rounded-xl transition-all hover:scale-105 hover:brightness-110 text-center"
                style={{ background: PRIMARY_CTR, color: ON_CTR, boxShadow: '0 20px 40px rgba(255,84,71,0.2)' }}>
                Create Free Project
              </Link>
              <a href="#"
                className="w-full sm:w-auto font-headline font-bold uppercase tracking-widest px-10 sm:px-12 py-4 sm:py-5 rounded-xl transition-all hover:bg-white/10 text-center"
                style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${SURFACE_HIGHEST}`, color: ON_SURFACE }}>
                Book a Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="py-12 sm:py-16 px-6 sm:px-8" style={{ background: '#0a0a0a', borderTop: `1px solid ${SURFACE_HIGH}60` }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="font-headline text-lg font-bold mb-4 sm:mb-6" style={{ color: ON_SURFACE }}>Atelier Visualizer</div>
            <p className="font-body text-sm leading-relaxed" style={{ color: ZINC_400 }}>
              Defining the next era of high-end architectural rendering through digital tonalism and neural lighting.
            </p>
          </div>
          {[
            { title: 'Navigation', links: ['Home', 'Projects', 'Explore', 'Community'] },
            { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Settings'] },
            { title: 'Connect', links: ['Twitter / X', 'Instagram', 'Contact Us'] },
          ].map(({ title, links }) => (
            <div key={title}>
              <h5 className="font-headline text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6" style={{ color: ON_SURFACE }}>{title}</h5>
              <ul className="space-y-3 sm:space-y-4">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="font-body text-sm transition-colors"
                      style={{ color: ZINC_400 }}
                      onMouseEnter={e => (e.currentTarget.style.color = SECONDARY)}
                      onMouseLeave={e => (e.currentTarget.style.color = ZINC_400)}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto mt-12 sm:mt-16 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6"
          style={{ borderTop: `1px solid ${SURFACE_HIGH}50` }}>
          <p className="font-body text-sm" style={{ color: ZINC_400 }}>© 2024 Atelier Visualizer. Digital Tonalism Excellence.</p>
          <span className="font-headline uppercase" style={{ fontSize: 10, color: PRIMARY, letterSpacing: '0.2em' }}>
            Stable Release 2.4.1
          </span>
        </div>
      </footer>
    </div>
  );
}
