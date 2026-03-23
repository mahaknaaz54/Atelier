import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { useSceneStore } from '../store/sceneStore';
import { projectsApi } from '../lib/api';
import SceneCanvas from '../scene/SceneCanvas';
import LeftSidebar from '../components/LeftSidebar';
import RightPanel from '../components/RightPanel';

/* ─── Design palette tokens ─ */
const PRIMARY      = '#FFB4AA';
const PRIMARY_CTR  = '#FF5447';
const ON_CTR       = '#5c0002';
const SECONDARY    = '#D8BAFA';
const ZINC_100     = '#f4f4f5';
const ZINC_400     = '#a1a1aa';

// ── TopBar ─────────────────────────────────────────────────
function TopBar({
  onSave,
  saving,
  onToggleLeft,
  onToggleRight,
  leftOpen,
  rightOpen,
}: {
  onSave: () => void;
  saving: boolean;
  onToggleLeft: () => void;
  onToggleRight: () => void;
  leftOpen: boolean;
  rightOpen: boolean;
}) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };
  const handleScreenshot = () => {
    const fn = (window as Window & { atelierScreenshot?: () => void }).atelierScreenshot;
    if (fn) fn();
  };

  return (
    <header style={{
      height: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 16px',
      background: 'rgba(24,24,27,0.4)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      boxShadow: `0 20px 40px rgba(255,180,170,0.08)`,
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      flexShrink: 0,
      gap: 8,
    }}>
      {/* Mobile: sidebar toggle buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {/* Left sidebar toggle (mobile only) */}
        <button
          onClick={onToggleLeft}
          title="Toggle left panel"
          style={{
            display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            width: 36, height: 36, borderRadius: 8,
            background: leftOpen ? 'rgba(255,180,170,0.1)' : 'transparent',
            border: leftOpen ? `1px solid ${PRIMARY}40` : '1px solid rgba(255,255,255,0.1)',
            cursor: 'pointer',
            color: leftOpen ? PRIMARY : ZINC_400,
          }}
          className="lg:hidden"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>menu</span>
        </button>

        {/* Logo */}
        <Link to="/" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 18, fontWeight: 700, letterSpacing: '-0.03em', color: ZINC_100, textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Atelier
          <span style={{ color: PRIMARY }}>.</span>
        </Link>
      </div>

      {/* Desktop nav links */}
      <nav style={{ display: 'flex', gap: 32, alignItems: 'center', flex: 1, justifyContent: 'center' }} className="hidden lg:flex">
        <Link to="/dashboard" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: PRIMARY, borderBottom: `2px solid ${PRIMARY}`, paddingBottom: 3, textDecoration: 'none' }}>
          Projects
        </Link>
        <a href="#" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: ZINC_400, textDecoration: 'none' }}
          onMouseEnter={e => (e.currentTarget.style.color = ZINC_100)}
          onMouseLeave={e => (e.currentTarget.style.color = ZINC_400)}>
          Explore
        </a>

      </nav>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        {/* Screenshot — hidden on very small */}
        <button onClick={handleScreenshot} title="Export Screenshot"
          className="hidden sm:flex"
          style={{ height: 34, padding: '0 12px', borderRadius: 8, background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', alignItems: 'center', gap: 5, color: ZINC_400, fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', transition: 'all 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = PRIMARY; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = ZINC_400; }}>
          <span className="material-symbols-outlined" style={{ fontSize: 15 }}>photo_camera</span>
          <span className="hidden md:inline">Export</span>
        </button>

        {/* Save */}
        <button onClick={onSave} disabled={saving}
          style={{ height: 34, padding: '0 16px', borderRadius: 8, background: PRIMARY_CTR, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, color: ON_CTR, fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', transition: 'all 0.15s', opacity: saving ? 0.6 : 1, boxShadow: '0 0 20px rgba(255,84,71,0.25)' }}
          onMouseEnter={e => { if (!saving) (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1.1)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1)'; }}>
          <span className="material-symbols-outlined" style={{ fontSize: 15 }}>save</span>
          <span className="hidden sm:inline">{saving ? 'Saving...' : 'Save'}</span>
        </button>

        {/* Right panel toggle (mobile) */}
        <button
          onClick={onToggleRight}
          title="Toggle right panel"
          style={{
            display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            width: 34, height: 34, borderRadius: 8,
            background: rightOpen ? 'rgba(255,180,170,0.1)' : 'transparent',
            border: rightOpen ? `1px solid ${PRIMARY}40` : '1px solid rgba(255,255,255,0.1)',
            cursor: 'pointer',
            color: rightOpen ? PRIMARY : ZINC_400,
          }}
          className="lg:hidden"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>tune</span>
        </button>

        {/* User avatar */}
        <div style={{ position: 'relative' }}
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: `${SECONDARY}25`, border: `1px solid ${SECONDARY}50`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Space Grotesk, sans-serif', fontSize: 13, fontWeight: 700, color: SECONDARY }}>
            {user?.name?.[0]?.toUpperCase() ?? 'U'}
          </div>
          <AnimatePresence>
            {menuOpen && (
              <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ position: 'absolute', right: 0, top: 42, background: '#1c1b1b', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 12, width: 192, boxShadow: '0 8px 32px rgba(0,0,0,0.5)', zIndex: 100 }}>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 14, fontWeight: 700, color: ZINC_100, marginBottom: 2 }}>{user?.name}</div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: ZINC_400, marginBottom: 12, overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email}</div>
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: SECONDARY, padding: 0 }}>
                  Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

// ── Viewport Controls (floating bottom bar) ─────────────────
function ViewportControls() {
  const handleScreenshot = () => {
    const fn = (window as Window & { atelierScreenshot?: () => void }).atelierScreenshot;
    if (fn) fn();
  };

  return (
    <div style={{
      position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
      display: 'flex', alignItems: 'center', gap: 12,
      background: 'rgba(24,24,27,0.6)', backdropFilter: 'blur(20px)',
      padding: '8px 16px', borderRadius: 9999, border: '1px solid rgba(255,255,255,0.05)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    }}>
      <button
        title="Capture Screenshot"
        onClick={handleScreenshot}
        style={{
          width: 44, height: 44, borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
          background: PRIMARY,
          boxShadow: `0 0 16px ${PRIMARY}4d`,
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1.1)'; (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1)'; (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}>
        <span className="material-symbols-outlined" style={{ fontSize: 20, color: ON_CTR }}>photo_camera</span>
      </button>
    </div>
  );
}

// ── Scene Label ─────────────────────────────────────────────
function SceneLabel() {
  const activePreset = useSceneStore(s => s.activePreset);
  return (
    <div style={{ position: 'absolute', top: 24, left: 24, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(12px)', padding: '8px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)' }}>
      <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: PRIMARY, display: 'block', marginBottom: 2 }}>
        Live Preview
      </span>
      <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 16, fontWeight: 700, color: '#fff', margin: 0 }}>
        {activePreset ?? 'Stockholm Penthouse'}
      </h2>
    </div>
  );
}

// ── Mobile Sidebar Overlay ────────────────────────────────
function MobileSidebarOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      className="lg:hidden"
      style={{
        position: 'fixed', inset: 0, zIndex: 39,
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(2px)',
      }}
    />
  );
}

// ── AppPage ─────────────────────────────────────────────────
export default function AppPage() {
  const getSceneSnapshot = useSceneStore((s) => s.getSceneSnapshot);
  const [saveNotification, setSaveNotification] = useState('');
  const [saving, setSaving] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  const handleSave = useCallback(async () => {
    const sceneState = getSceneSnapshot();
    const name = `Room Design — ${new Date().toLocaleDateString()}`;
    setSaving(true);
    try {
      await projectsApi.create({ name, sceneState });
      setSaveNotification('Design saved! ✓');
      setTimeout(() => setSaveNotification(''), 3000);
    } catch {
      setSaveNotification('Save failed — check connection');
      setTimeout(() => setSaveNotification(''), 3000);
    } finally {
      setSaving(false);
    }
  }, [getSceneSnapshot]);

  const TOPBAR_HEIGHT = 64;

  return (
    <div style={{ height: '100vh', background: '#131313', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <TopBar
        onSave={handleSave}
        saving={saving}
        onToggleLeft={() => { setLeftOpen(o => !o); setRightOpen(false); }}
        onToggleRight={() => { setRightOpen(o => !o); setLeftOpen(false); }}
        leftOpen={leftOpen}
        rightOpen={rightOpen}
      />

      {/* Save notification */}
      <AnimatePresence>
        {saveNotification && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{ position: 'fixed', top: TOPBAR_HEIGHT + 12, left: '50%', transform: 'translateX(-50%)', zIndex: 60, background: '#1c1b1b', border: '1px solid rgba(255,255,255,0.08)', padding: '10px 18px', borderRadius: 12, fontFamily: 'Space Grotesk, sans-serif', fontSize: 13, fontWeight: 700, color: PRIMARY, boxShadow: '0 8px 32px rgba(0,0,0,0.4)', whiteSpace: 'nowrap' }}>
            {saveNotification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main layout */}
      <div style={{ display: 'flex', flex: 1, paddingTop: TOPBAR_HEIGHT, overflow: 'hidden', position: 'relative' }}>

        {/* ── Left Sidebar ── */}
        {/* Desktop: always visible */}
        <div className="hidden lg:flex" style={{ flexShrink: 0 }}>
          <LeftSidebar />
        </div>

        {/* Mobile: slide-in overlay */}
        <AnimatePresence>
          {leftOpen && (
            <>
              <MobileSidebarOverlay onClose={() => setLeftOpen(false)} />
              <motion.div
                initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                className="lg:hidden"
                style={{ position: 'fixed', top: TOPBAR_HEIGHT, left: 0, bottom: 0, zIndex: 40, flexShrink: 0 }}
              >
                <LeftSidebar />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ── Center: 3D Viewport ── */}
        <main style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <SceneCanvas />
          <SceneLabel />
          <ViewportControls />
        </main>

        {/* ── Right Panel ── */}
        {/* Desktop: always visible */}
        <div className="hidden lg:flex" style={{ flexShrink: 0 }}>
          <RightPanel />
        </div>

        {/* Mobile: slide-in overlay */}
        <AnimatePresence>
          {rightOpen && (
            <>
              <MobileSidebarOverlay onClose={() => setRightOpen(false)} />
              <motion.div
                initial={{ x: 300 }} animate={{ x: 0 }} exit={{ x: 300 }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                className="lg:hidden"
                style={{ position: 'fixed', top: TOPBAR_HEIGHT, right: 0, bottom: 0, zIndex: 40, flexShrink: 0 }}
              >
                <RightPanel />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
