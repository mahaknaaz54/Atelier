import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useSceneStore } from '../store/sceneStore';

interface TopBarProps {
  onSave: () => void;
  onScreenshot: () => void;
  saving: boolean;
}

export default function TopBar({ onSave, onScreenshot, saving }: TopBarProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const activePreset = useSceneStore((s) => s.activePreset);

  return (
    <div style={{
      height: '56px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      background: 'var(--surface-1)',
      borderBottom: '1px solid var(--border)',
      flexShrink: 0,
      gap: '16px',
    }}>
      {/* Left: Logo + preset badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '18px', color: 'var(--text)', letterSpacing: '-0.5px' }}>
          Atelier<span style={{ color: 'var(--primary)' }}>.</span>
        </button>
        {activePreset && (
          <div className="glass-sm" style={{ padding: '3px 10px', fontSize: '11px', fontWeight: 600, color: 'var(--primary)' }}>
            {activePreset}
          </div>
        )}
      </div>

      {/* Center: Nav */}
      <div style={{ display: 'flex', gap: '4px' }}>
        {[['Visualizer', '/app'], ['Dashboard', '/dashboard'], ['Palettes', '/palettes']].map(([label, path]) => (
          <button key={path} onClick={() => navigate(path)}
            style={{ background: 'none', border: 'none', color: window.location.pathname === path ? 'var(--text)' : 'var(--text-muted)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, padding: '6px 12px', borderRadius: 'var(--r-sm)', transition: 'all 0.15s' }}>
            {label}
          </button>
        ))}
      </div>

      {/* Right: Actions + avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button id="topbar-screenshot" className="btn btn-ghost" onClick={onScreenshot} style={{ padding: '7px 14px', fontSize: '12px' }}>
          📸 Screenshot
        </button>
        <button id="topbar-save" className="btn btn-primary" onClick={onSave} disabled={saving} style={{ padding: '7px 16px', fontSize: '12px', opacity: saving ? 0.7 : 1 }}>
          {saving ? '…' : '💾 Save'}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 10px', borderRadius: 'var(--r-md)', background: 'var(--surface-2)', cursor: 'pointer' }}
          onClick={() => { logout(); navigate('/'); }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px', color: '#0e0e0f' }}>
            {user?.name?.[0]?.toUpperCase() ?? 'A'}
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</span>
        </div>
      </div>
    </div>
  );
}
