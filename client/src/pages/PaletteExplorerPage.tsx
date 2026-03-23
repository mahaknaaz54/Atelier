import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSceneStore, PRESETS, type PaletteMood } from '../store/sceneStore';
import {
  generateHarmonyPalette,
  randomGeneratedPalette,
  randomPreset,
  type HarmonyType,
  type GeneratedPalette,
} from '../lib/colorUtils';
import PaletteCard from '../components/PaletteCard';

/* ── Constants ────────────────────────────────────────────────────── */
const PRIMARY   = '#FFB4AA';
const SECONDARY = '#D8BAFA';
const ZINC_500  = '#71717a';
const ZINC_800  = '#27272a';

const MOODS: { id: PaletteMood | 'all'; label: string; emoji: string; color: string }[] = [
  { id: 'all',    label: 'All',    emoji: '✦', color: '#e5e2e1' },
  { id: 'calm',   label: 'Calm',   emoji: '🌿', color: '#7ec8c8' },
  { id: 'cozy',   label: 'Cozy',   emoji: '🕯️', color: '#e8a87c' },
  { id: 'luxury', label: 'Luxury', emoji: '💎', color: '#c4a0e8' },
  { id: 'fresh',  label: 'Fresh',  emoji: '🌊', color: '#7ecba0' },
  { id: 'bold',   label: 'Bold',   emoji: '⚡', color: '#e86080' },
];

const HARMONY_TYPES: { id: HarmonyType; label: string }[] = [
  { id: 'complementary',       label: 'Complementary'  },
  { id: 'analogous',           label: 'Analogous'       },
  { id: 'triadic',             label: 'Triadic'         },
  { id: 'split-complementary', label: 'Split-Comp'      },
];

/* ── PaletteExplorerPage ──────────────────────────────────────────── */
export default function PaletteExplorerPage() {
  const navigate   = useNavigate();
  const { activePreset, applyPreset, setWallColor, setFloorColor, setCeilingColor, setAccentColor } = useSceneStore();

  // Mood filter
  const [activeMood, setActiveMood]   = useState<PaletteMood | 'all'>('all');

  // Color harmony generator
  const [baseColor,    setBaseColor]       = useState('#7868a8');
  const [harmonyType,  setHarmonyType]     = useState<HarmonyType>('analogous');
  const [generatedPalette, setGeneratedPalette] = useState<GeneratedPalette | null>(null);

  // Surprise Me
  const [surprisePalette, setSurprisePalette] = useState<GeneratedPalette | null>(null);


  const filteredPresets = activeMood === 'all' ? PRESETS : PRESETS.filter(p => p.mood === activeMood);

  /* Apply a full preset then navigate */
  const handleApplyPreset = useCallback((preset: typeof PRESETS[number]) => {
    applyPreset(preset);
    navigate('/app');
  }, [applyPreset, navigate]);

  /* Apply 4 generated colors then navigate */
  const applyGeneratedColors = useCallback((colors: string[]) => {
    const [wall, floor, ceiling, accent] = colors;
    setWallColor(wall);
    setFloorColor(floor);
    setCeilingColor(ceiling);
    setAccentColor(accent);
    navigate('/app');
  }, [setWallColor, setFloorColor, setCeilingColor, setAccentColor, navigate]);

  /* Generate harmony from base color */
  const handleGenerate = () => {
    setGeneratedPalette(generateHarmonyPalette(baseColor, harmonyType));
    setSurprisePalette(null);
  };

  /* Surprise Me */
  const handleSurprise = () => {
    const rnd = Math.random() < 0.45 ? null : randomGeneratedPalette();
    if (rnd) {
      setSurprisePalette(rnd);
      setGeneratedPalette(null);
    } else {
      const preset = randomPreset();
      applyPreset(preset);
      navigate('/app');
    }
  };

  const activeMoodColor = MOODS.find(m => m.id === activeMood)?.color ?? '#e5e2e1';

  return (
    <div className="page" style={{ overflowY: 'auto', background: 'var(--surface)' }}>

      {/* ── Top Nav ── */}
      <div style={{
        height: 60, display: 'flex', alignItems: 'center',
        padding: '0 32px', borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(14,14,15,0.85)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        gap: 20, flexShrink: 0, position: 'sticky', top: 0, zIndex: 40,
      }}>
        <button onClick={() => navigate('/')} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 18,
          color: 'var(--text)',
        }}>
          Atelier<span style={{ color: PRIMARY }}>.</span>
        </button>
        <div style={{ display: 'flex', gap: 4 }}>
          {[['Visualizer', '/app'], ['Dashboard', '/dashboard'], ['Palettes', '/palettes']].map(([l, p]) => (
            <button key={p} onClick={() => navigate(p)} style={{
              background: p === '/palettes' ? 'rgba(255,255,255,0.06)' : 'none',
              border: 'none',
              color: p === '/palettes' ? 'var(--text)' : ZINC_500,
              cursor: 'pointer',
              fontFamily: 'Space Grotesk, sans-serif', fontSize: 12, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.1em',
              padding: '7px 14px', borderRadius: 8, transition: 'all 0.15s',
            }}>{l}</button>
          ))}
        </div>
      </div>

      {/* ── Hero Header ── */}
      <div style={{ maxWidth: 1180, width: '100%', margin: '0 auto', padding: '48px 32px 0' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <p style={{
            fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.16em', textTransform: 'uppercase', color: SECONDARY, marginBottom: 8,
          }}>
            Color Studio
          </p>
          <h1 style={{
            fontFamily: 'Space Grotesk, sans-serif', fontSize: 40, fontWeight: 700,
            letterSpacing: '-1.5px', lineHeight: 1.1, color: 'var(--text)', marginBottom: 12,
          }}>
            Palette Explorer
          </h1>
          <p style={{
            fontFamily: 'Manrope, sans-serif', fontSize: 14, color: ZINC_500, marginBottom: 36,
          }}>
            Discover curated palettes, generate color harmonies, or let us surprise you.
          </p>

          {/* ── Action Strip ── */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
            {/* Surprise Me */}
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSurprise}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 20px', borderRadius: 12,
                background: `linear-gradient(135deg, ${PRIMARY}22, ${SECONDARY}22)`,
                border: `1px solid ${PRIMARY}50`,
                color: PRIMARY, cursor: 'pointer',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: 16 }}>🎲</span> Surprise Me
            </motion.button>

            {/* Harmony Generator toggle */}
            <button
              onClick={handleGenerate}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 20px', borderRadius: 12,
                background: 'rgba(216,186,250,0.1)', border: `1px solid ${SECONDARY}40`,
                color: SECONDARY, cursor: 'pointer',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
              }}
            >
              <span style={{ fontSize: 16 }}>✦</span> Generate Harmony
            </button>
          </div>
        </motion.div>

        {/* ── Harmony Generator Panel ── */}
        <AnimatePresence>
          <motion.div
            key="harmony-panel"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'rgba(28,27,27,0.6)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 20,
              padding: '24px 28px',
              marginBottom: 40,
            }}
          >
            <p style={{
              fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase', color: SECONDARY, marginBottom: 18,
            }}>
              Color Harmony Generator
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: 20 }}>
              {/* Color Picker */}
              <div>
                <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: ZINC_500, marginBottom: 8 }}>
                  Base Color
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input
                    type="color"
                    value={baseColor}
                    onChange={e => setBaseColor(e.target.value)}
                    style={{
                      width: 48, height: 48, borderRadius: 12, cursor: 'pointer',
                      border: '2px solid rgba(255,255,255,0.14)', background: 'none', padding: 2,
                    }}
                  />
                  <span style={{
                    fontFamily: 'Space Grotesk, sans-serif', fontSize: 12, fontWeight: 600,
                    color: 'var(--text)', background: ZINC_800, borderRadius: 8, padding: '6px 12px',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}>
                    {baseColor.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Harmony Type */}
              <div>
                <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: ZINC_500, marginBottom: 8 }}>
                  Harmony Type
                </p>
                <div style={{ display: 'flex', gap: 6 }}>
                  {HARMONY_TYPES.map(h => (
                    <button key={h.id} onClick={() => setHarmonyType(h.id)} style={{
                      padding: '7px 12px', borderRadius: 8, cursor: 'pointer',
                      fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, fontWeight: 600,
                      letterSpacing: '0.06em',
                      background: harmonyType === h.id ? `${SECONDARY}20` : ZINC_800,
                      border: `1px solid ${harmonyType === h.id ? `${SECONDARY}50` : 'rgba(255,255,255,0.06)'}`,
                      color: harmonyType === h.id ? SECONDARY : ZINC_500,
                      transition: 'all 0.15s',
                    }}>
                      {h.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={handleGenerate}
                style={{
                  padding: '10px 22px', borderRadius: 10, cursor: 'pointer',
                  background: SECONDARY, color: '#1a1020',
                  fontFamily: 'Space Grotesk, sans-serif', fontSize: 12, fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  border: 'none', transition: 'all 0.2s',
                  boxShadow: '0 4px 18px rgba(216,186,250,0.25)',
                }}
              >
                Generate
              </motion.button>
            </div>

            {/* Generated palette preview */}
            <AnimatePresence>
              {(generatedPalette || surprisePalette) && (() => {
                const pal = generatedPalette || surprisePalette!;
                return (
                  <motion.div
                    key="generated-preview"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    style={{ marginTop: 24 }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                      <p style={{
                        fontFamily: 'Space Grotesk, sans-serif', fontSize: 10, fontWeight: 700,
                        letterSpacing: '0.1em', textTransform: 'uppercase', color: ZINC_500,
                      }}>
                        {surprisePalette ? 'Surprise Palette' : `${pal.name} Harmony`} — Base: {pal.baseColor.toUpperCase()}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                      {/* Color swatch strip */}
                      <div style={{ display: 'flex', borderRadius: 12, overflow: 'hidden', height: 56, flex: '0 0 auto' }}>
                        {pal.colors.map((c, i) => (
                          <div key={i} style={{ width: 80, background: c, position:'relative' }}>
                            <span style={{
                              position: 'absolute', bottom: 4, left: 0, right: 0,
                              textAlign: 'center', fontSize: 8,
                              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                              color: 'rgba(255,255,255,0.65)',
                            }}>
                              {['Wall','Floor','Ceil','Accent'][i]}
                            </span>
                          </div>
                        ))}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                        onClick={() => applyGeneratedColors(pal.colors)}
                        style={{
                          padding: '10px 18px', borderRadius: 10, cursor: 'pointer',
                          background: `${PRIMARY}18`, border: `1px solid ${PRIMARY}50`,
                          color: PRIMARY, fontFamily: 'Space Grotesk, sans-serif',
                          fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                        }}
                      >
                        Apply to Room →
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* ── Mood Filter Bar ── */}
        <div style={{ marginBottom: 32 }}>
          <p style={{
            fontFamily: 'Space Grotesk, sans-serif', fontSize: 10, fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: ZINC_500, marginBottom: 12,
          }}>
            Filter by Mood
          </p>
          <div style={{ display: 'flex', flex: 'wrap', gap: 8 }}>
            {MOODS.map(m => {
              const active = activeMood === m.id;
              return (
                <motion.button
                  key={m.id}
                  onClick={() => setActiveMood(m.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '7px 16px', borderRadius: 40, cursor: 'pointer',
                    fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, fontWeight: 700,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    background: active ? `${m.color}22` : ZINC_800,
                    border: `1px solid ${active ? `${m.color}60` : 'rgba(255,255,255,0.07)'}`,
                    color: active ? m.color : ZINC_500,
                    transition: 'all 0.2s',
                    boxShadow: active ? `0 0 14px ${m.color}25` : 'none',
                  }}
                >
                  <span style={{ fontSize: 13 }}>{m.emoji}</span> {m.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ── Designer Themes Grid ── */}
        <section style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 }}>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif', fontSize: 20, fontWeight: 700,
              letterSpacing: '-0.5px', color: 'var(--text)',
            }}>
              Designer Themes
            </h2>
            <span style={{
              fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, fontWeight: 600,
              color: activeMoodColor, letterSpacing: '0.06em',
            }}>
              {filteredPresets.length} palettes
            </span>
          </div>

          <AnimatePresence mode="popLayout">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
              {filteredPresets.map((preset, i) => (
                <motion.div
                  key={preset.name}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ delay: i * 0.04, type: 'spring', stiffness: 260, damping: 24 }}
                >
                  <PaletteCard
                    preset={preset}
                    isActive={activePreset === preset.name}
                    onClick={() => handleApplyPreset(preset)}
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </section>

        {/* ── Footer padding ── */}
        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}
