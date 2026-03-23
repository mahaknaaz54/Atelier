import { motion, AnimatePresence } from 'framer-motion';
import { useSceneStore, PRESETS, type PaletteMood } from '../store/sceneStore';
import { randomPreset } from '../lib/colorUtils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* ─── Design palette tokens ─ */
const PRIMARY      = '#FFB4AA';
const SECONDARY    = '#D8BAFA';
const ZINC_500     = '#71717a';
const ZINC_200     = '#e4e4e7';
const ZINC_800     = '#27272a';

const MOOD_ITEMS: { id: PaletteMood | 'all'; label: string; color: string }[] = [
  { id: 'all',    label: 'All',    color: '#e5e2e1' },
  { id: 'calm',   label: 'Calm',   color: '#7ec8c8' },
  { id: 'cozy',   label: 'Cozy',   color: '#e8a87c' },
  { id: 'luxury', label: 'Luxury', color: '#c4a0e8' },
  { id: 'fresh',  label: 'Fresh',  color: '#7ecba0' },
  { id: 'bold',   label: 'Bold',   color: '#e86080' },
];

type NavTab = 'palettes' | 'presets' | 'materials' | 'lighting';

const NAV_ITEMS: { id: NavTab; icon: string; label: string }[] = [
  { id: 'palettes',  icon: 'palette',    label: 'Palettes'  },
  { id: 'presets',   icon: 'style',      label: 'Presets'   },
  { id: 'materials', icon: 'texture',    label: 'Materials' },
  { id: 'lighting',  icon: 'light_mode', label: 'Lighting'  },
];

export default function LeftSidebar() {
  const [activeTab, setActiveTab] = useState<NavTab>('presets');
  const [activeMood, setActiveMood] = useState<PaletteMood | 'all'>('all');
  const navigate = useNavigate();

  const {
    activePreset, applyPreset,
    lightingMode, setLightingMode,
    wallColor, setWallColor,
    floorColor, setFloorColor,
    ceilingColor, setCeilingColor,
    activeMaterial, setActiveMaterial,
    setGlossiness, setReflectivity,
  } = useSceneStore();

  const filteredPresets = activeMood === 'all' ? PRESETS : PRESETS.filter(p => p.mood === activeMood);

  const handleSurprise = () => {
    const rnd = randomPreset();
    applyPreset(rnd);
  };

  return (
    <div style={{
      width: 260,
      height: '100%',
      background: 'rgba(18,18,22,0.55)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      flexShrink: 0,
    }}>

      {/* Header */}
      <div style={{ padding: '24px 22px 14px' }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: SECONDARY, marginBottom: 3, fontFamily: 'Space Grotesk, sans-serif' }}>
          Design Tools
        </p>
        <p style={{ fontSize: 17, fontWeight: 700, color: ZINC_200, fontFamily: 'Space Grotesk, sans-serif', lineHeight: 1.1, marginBottom: 2 }}>
          Color Studio
        </p>
        {/* Explorer link */}
        <button onClick={() => navigate('/palettes')} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          fontFamily: 'Space Grotesk, sans-serif', fontSize: 10, fontWeight: 600,
          color: `${SECONDARY}80`, letterSpacing: '0.06em',
          textDecoration: 'underline',
        }}>
          Open Explorer ↗
        </button>
      </div>

      {/* Navigation tabs */}
      <nav style={{ padding: '0 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV_ITEMS.map((item) => {
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '10px 12px',
                borderRadius: 8, border: 'none',
                background: active ? 'rgba(255,255,255,0.07)' : 'transparent',
                cursor: 'pointer', transition: 'all 0.2s',
                color: active ? SECONDARY : ZINC_500,
              }}
              onMouseEnter={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.color = ZINC_200; }}
              onMouseLeave={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.color = ZINC_500; }}
            >
              <span className="material-symbols-outlined" style={{ color: active ? SECONDARY : 'inherit', fontSize: 18 }}>{item.icon}</span>
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* ── Tab Content ── */}
      <div style={{ padding: '16px 16px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>

        {/* ─ PALETTES tab → active wall color quick swatches ─ */}
        {activeTab === 'palettes' && (
          <motion.div key="palettes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: ZINC_500, fontFamily: 'Space Grotesk, sans-serif' }}>
              Quick Color Swatches
            </p>
            {/* Wall color picker */}
            <div>
              <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: ZINC_500, fontFamily: 'Space Grotesk, sans-serif', marginBottom: 6 }}>Wall</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['#f0ede8','#d4e8e4','#e8d5f0','#1a1a1a','#c4a882','#dde5d9','#d0eaf0','#12100e','#1c1c2c','#18181e'].map(c => (
                  <button key={c} onClick={() => setWallColor(c)} style={{
                    width: 28, height: 28, borderRadius: '50%', background: c, border: 'none', cursor: 'pointer',
                    outline: wallColor === c ? '2px solid rgba(255,255,255,0.55)' : '2px solid transparent',
                    outlineOffset: 2, transition: 'transform 0.15s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.15)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                ))}
              </div>
            </div>
            {/* Floor color picker */}
            <div>
              <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: ZINC_500, fontFamily: 'Space Grotesk, sans-serif', marginBottom: 6 }}>Floor</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['#d5cec5','#6a9e97','#8fa88a','#2a2a2a','#7a5c3a','#c8a87a','#5b8ea6','#1e1a16','#2a2a3c','#2a2830'].map(c => (
                  <button key={c} onClick={() => setFloorColor(c)} style={{
                    width: 28, height: 28, borderRadius: '50%', background: c, border: 'none', cursor: 'pointer',
                    outline: floorColor === c ? '2px solid rgba(255,255,255,0.55)' : '2px solid transparent',
                    outlineOffset: 2, transition: 'transform 0.15s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.15)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                ))}
              </div>
            </div>
            {/* Ceiling color picker */}
            <div>
              <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: ZINC_500, fontFamily: 'Space Grotesk, sans-serif', marginBottom: 6 }}>Ceiling</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['#f8f6f4','#edf0eb','#f2f0f8','#111111','#ddd0bc','#edf0eb','#eaf5f8','#0a0906','#141420','#101014'].map(c => (
                  <button key={c} onClick={() => setCeilingColor(c)} style={{
                    width: 28, height: 28, borderRadius: '50%', background: c, border: 'none', cursor: 'pointer',
                    outline: ceilingColor === c ? '2px solid rgba(255,255,255,0.55)' : '2px solid transparent',
                    outlineOffset: 2, transition: 'transform 0.15s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.15)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ─ PRESETS tab ─ */}
        {activeTab === 'presets' && (
          <motion.div key="presets-list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

            {/* Surprise Me button */}
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={handleSurprise}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '10px 14px', borderRadius: 10,
                background: `linear-gradient(135deg, ${PRIMARY}18, ${SECONDARY}18)`,
                border: `1px solid ${PRIMARY}40`,
                color: PRIMARY, cursor: 'pointer',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
              }}
            >
              <span style={{ fontSize: 14 }}>🎲</span> Surprise Me
            </motion.button>

            {/* Mood filter chips */}
            <div>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: ZINC_500, fontFamily: 'Space Grotesk, sans-serif', marginBottom: 6 }}>
                Filter by Mood
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {MOOD_ITEMS.map(m => {
                  const active = activeMood === m.id;
                  return (
                    <button key={m.id} onClick={() => setActiveMood(m.id)} style={{
                      padding: '4px 10px', borderRadius: 20, cursor: 'pointer',
                      fontFamily: 'Space Grotesk, sans-serif', fontSize: 9, fontWeight: 700,
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      background: active ? `${m.color}20` : ZINC_800,
                      border: `1px solid ${active ? `${m.color}50` : 'rgba(255,255,255,0.06)'}`,
                      color: active ? m.color : ZINC_500,
                      transition: 'all 0.15s',
                    }}>
                      {m.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Preset list with swatch strips */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: ZINC_500, fontFamily: 'Space Grotesk, sans-serif', marginBottom: 2 }}>
                {filteredPresets.length} Palettes
              </p>
              <AnimatePresence mode="popLayout">
                {filteredPresets.map((preset) => {
                  const isActive = activePreset === preset.name;
                  return (
                    <motion.button
                      key={preset.name}
                      layout
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      onClick={() => applyPreset(preset)}
                      whileHover={{ x: 2 }}
                      style={{
                        textAlign: 'left', padding: '8px 0',
                        border: 'none', background: 'transparent',
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 10,
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: 0,
                      }}
                    >
                      {/* Swatch strip (4 colors) */}
                      <div style={{ display: 'flex', borderRadius: 6, overflow: 'hidden', flexShrink: 0 }}>
                        {[preset.wallColor, preset.floorColor, preset.ceilingColor, preset.accentColor].map((c, i) => (
                          <div key={i} style={{ width: 14, height: 28, background: c }} />
                        ))}
                      </div>
                      {/* Name */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span style={{
                          fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, fontWeight: 700,
                          textTransform: 'uppercase', letterSpacing: '0.06em',
                          color: isActive ? PRIMARY : ZINC_200,
                          display: 'block',
                        }}>
                          {preset.name}
                        </span>
                        <span style={{
                          fontFamily: 'Space Grotesk, sans-serif', fontSize: 9, fontWeight: 500,
                          color: ZINC_500, letterSpacing: '0.04em',
                          textTransform: 'capitalize',
                        }}>
                          {preset.mood} · {preset.lightingMode}
                        </span>
                      </div>
                      {/* Active dot */}
                      {isActive && (
                        <motion.div layoutId="active-dot" style={{
                          width: 6, height: 6, borderRadius: '50%', background: PRIMARY, flexShrink: 0,
                        }} />
                      )}
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* ─ MATERIALS tab ─ */}
        {activeTab === 'materials' && (
          <motion.div key="materials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: ZINC_500, fontFamily: 'Space Grotesk, sans-serif' }}>
              Surface Type
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                { id: 'matte',    label: 'Matte',    icon: '○', desc: 'No sheen'    },
                { id: 'glossy',   label: 'Glossy',   icon: '◉', desc: 'High shine'  },
                { id: 'metallic', label: 'Metallic', icon: '◈', desc: 'Mirror-like' },
                { id: 'concrete', label: 'Concrete', icon: '▣', desc: 'Textured'    },
              ].map((m) => {
                const active = activeMaterial === m.id as typeof activeMaterial;
                return (
                  <button key={m.id}
                    onClick={() => {
                      setActiveMaterial(m.id as typeof activeMaterial);
                      if (m.id === 'matte') { setGlossiness(10); setReflectivity(0); }
                      if (m.id === 'glossy') { setGlossiness(90); setReflectivity(10); }
                      if (m.id === 'metallic') { setGlossiness(70); setReflectivity(100); }
                      if (m.id === 'concrete') { setGlossiness(20); setReflectivity(5); }
                    }}
                    style={{
                      padding: '14px 10px', borderRadius: 10,
                      background: active ? `${SECONDARY}14` : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${active ? `${SECONDARY}40` : 'rgba(255,255,255,0.06)'}`,
                      color: active ? SECONDARY : ZINC_500, cursor: 'pointer',
                      fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, fontWeight: 700,
                      textAlign: 'center', transition: 'all 0.2s',
                    }}>
                    <div style={{ fontSize: 20, marginBottom: 4 }}>{m.icon}</div>
                    <div>{m.label}</div>
                    <div style={{ fontSize: 9, marginTop: 2, opacity: 0.6 }}>{m.desc}</div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ─ LIGHTING tab ─ */}
        {activeTab === 'lighting' && (
          <motion.div key="lighting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: ZINC_500, fontFamily: 'Space Grotesk, sans-serif' }}>
              Lighting Mode
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {([
                { id: 'day',    emoji: '☀️', label: 'Day Light',  desc: 'Warm diffuse sunlight' },
                { id: 'night',  emoji: '🌙', label: 'Night Mode', desc: 'Cool blue + neon accents' },
                { id: 'golden', emoji: '🌅', label: 'Golden Hour', desc: 'Warm amber glow' },
              ] as const).map((mode) => {
                const active = lightingMode === mode.id;
                return (
                  <button key={mode.id} onClick={() => setLightingMode(mode.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '12px 14px', borderRadius: 10, cursor: 'pointer',
                      fontFamily: 'Space Grotesk, sans-serif', transition: 'all 0.2s', textAlign: 'left',
                      background: active ? `${PRIMARY}14` : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${active ? `${PRIMARY}40` : 'rgba(255,255,255,0.06)'}`,
                      color: active ? PRIMARY : ZINC_500,
                    }}>
                    <span style={{ fontSize: 22 }}>{mode.emoji}</span>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{mode.label}</div>
                      <div style={{ fontSize: 9, marginTop: 1, opacity: 0.6, letterSpacing: '0.04em' }}>{mode.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
