import { motion } from 'framer-motion';
import { useSceneStore, type LightingMode } from '../store/sceneStore';
import { HexColorPicker } from 'react-colorful';

/* ─── Design palette tokens ─ */
const PRIMARY      = '#FFB4AA';
const ZINC_100     = '#f4f4f5';
const ZINC_300     = '#d4d4d8';
const ZINC_400     = '#a1a1aa';
const ZINC_500     = '#71717a';
const SURFACE_HIGH = '#2a2a2a';
const SURFACE_LOW  = '#1c1b1b';

/* ─── Toggle Component ─────── */
function Toggle({ label, checked, onChange, id }: { label: string; checked: boolean; onChange: () => void; id: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <label htmlFor={id} style={{ fontSize: 14, color: checked ? ZINC_300 : ZINC_500, cursor: 'pointer', fontFamily: 'Manrope, sans-serif' }}>{label}</label>
      <div
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        style={{
          width: 40, height: 22, borderRadius: 9999,
          background: checked ? `${PRIMARY}30` : SURFACE_HIGH,
          cursor: 'pointer', position: 'relative', transition: 'background 0.25s', flexShrink: 0,
          border: `1px solid ${checked ? `${PRIMARY}50` : 'rgba(255,255,255,0.08)'}`,
        }}
      >
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 600, damping: 30 }}
          style={{
            position: 'absolute', top: 3,
            left: checked ? undefined : 3,
            right: checked ? 3 : undefined,
            width: 14, height: 14, borderRadius: '50%',
            background: checked ? PRIMARY : '#555',
          }}
        />
      </div>
    </div>
  );
}

/* ─── Slider Component ─────── */
function LabeledSlider({ label, value, onChange, min = 0, max = 100, id }: { label: string; value: number; onChange: (v: number) => void; min?: number; max?: number; id: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <label htmlFor={id} style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: ZINC_500, fontFamily: 'Space Grotesk, sans-serif' }}>
          {label}
        </label>
        <span style={{ fontSize: 12, fontWeight: 700, color: PRIMARY, fontFamily: 'Space Grotesk, sans-serif' }}>{value}%</span>
      </div>
      <input id={id} type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  );
}

const LIGHT_MODES: { id: LightingMode; label: string }[] = [
  { id: 'day',    label: 'Day'    },
  { id: 'night',  label: 'Night'  },
  { id: 'golden', label: 'Golden' },
];

export default function RightPanel() {
  const {
    glossiness, setGlossiness,
    reflectivity, setReflectivity,
    lightIntensity, setLightIntensity,
    showFurniture, toggleFurniture,
    furnitureAO, toggleFurnitureAO,
    lightingMode, setLightingMode,
    wallColor, leftWallColor, rightWallColor, floorColor, ceilingColor,
    activeSurface, setActiveSurface, setSurfaceColor,
    floorMaterial, setFloorMaterial,
  } = useSceneStore();

  return (
    <div style={{
      width: 300,
      height: '100%',
      background: 'rgba(14,14,18,0.4)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderLeft: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      flexShrink: 0,
    }}>
      {/* Header */}
      <div style={{ padding: '32px 32px 24px' }}>
        <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: ZINC_400, marginBottom: 6, fontFamily: 'Space Grotesk, sans-serif' }}>
          Parameter Control
        </p>
        <p style={{ fontSize: 21, fontWeight: 700, color: ZINC_100, fontFamily: 'Space Grotesk, sans-serif', lineHeight: 1.15 }}>
          Customization
        </p>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>

        {/* Surface Elements toggles */}
        <section style={{ padding: '0 32px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: ZINC_500, marginBottom: 2, fontFamily: 'Space Grotesk, sans-serif' }}>
            Surface Elements
          </p>
          <Toggle id="toggle-furniture" label="Show Furniture" checked={showFurniture} onChange={toggleFurniture}   />
          <Toggle id="toggle-ao"        label="Furniture AO"   checked={furnitureAO}   onChange={toggleFurnitureAO} />
        </section>

        {/* Sliders */}
        <section style={{ padding: '28px 32px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: 28 }}>
          <LabeledSlider id="slider-glossiness"   label="Glossiness"      value={glossiness}    onChange={setGlossiness}    />
          <LabeledSlider id="slider-reflectivity" label="Reflectivity"     value={reflectivity}  onChange={setReflectivity}  />
          <LabeledSlider id="slider-light"        label="Light Intensity"  value={lightIntensity} onChange={setLightIntensity} />
        </section>

        {/* Lighting mode */}
        <section style={{ padding: '28px 32px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: ZINC_500, fontFamily: 'Space Grotesk, sans-serif' }}>
            Lighting Mode
          </p>
          <div style={{ display: 'flex', gap: 6 }}>
            {LIGHT_MODES.map((m) => (
              <button key={m.id} onClick={() => setLightingMode(m.id)}
                style={{
                  flex: 1, padding: '8px 4px', borderRadius: 8, cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'center', transition: 'all 0.2s', border: 'none',
                  background: lightingMode === m.id ? `${PRIMARY}18` : SURFACE_HIGH,
                  outline: lightingMode === m.id ? `1px solid ${PRIMARY}50` : 'none',
                  color: lightingMode === m.id ? PRIMARY : ZINC_500,
                }}>
                {m.label}
              </button>
            ))}
          </div>
        </section>

        {/* Global Flooring Options */}
        <section style={{ padding: '28px 32px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: ZINC_500, fontFamily: 'Space Grotesk, sans-serif' }}>
            Global Flooring
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { id: 'french_oak', label: 'French Oak', emoji: '🪵' },
              { id: 'italian_terrazzo', label: 'Italian Terrazzo', emoji: '✨' },
              { id: 'brazilian_walnut', label: 'Brazilian Walnut', emoji: '🌳' },
              { id: 'polished_concrete', label: 'Polished Concrete', emoji: '🏢' },
              { id: 'moroccan_tile', label: 'Moroccan Tile', emoji: '💠' },
            ].map((m) => (
              <button key={m.id} onClick={() => setFloorMaterial(m.id as any)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px',
                  borderRadius: 10, cursor: 'pointer', border: 'none', textAlign: 'left',
                  transition: 'all 0.2s', outline: floorMaterial === m.id ? `1px solid ${PRIMARY}50` : 'none',
                  background: floorMaterial === m.id ? `${PRIMARY}18` : SURFACE_HIGH,
                  gridColumn: m.id === 'moroccan_tile' ? '1 / -1' : 'auto', // last one spans full
                }}
              >
                <span style={{ fontSize: 16 }}>{m.emoji}</span>
                <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, fontWeight: 600, color: floorMaterial === m.id ? PRIMARY : ZINC_400 }}>{m.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Custom Color picker */}
        <section style={{ marginTop: 'auto', padding: '0 20px 20px' }}>
          <div style={{ borderRadius: 12, padding: '16px', background: SURFACE_HIGH, border: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: ZINC_500, fontFamily: 'Space Grotesk, sans-serif', marginBottom: 12 }}>
              Custom Color
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <select
                value={activeSurface}
                onChange={(e) => setActiveSurface(e.target.value as any)}
                style={{
                  width: '100%', padding: '10px 12px', borderRadius: 8,
                  background: SURFACE_LOW, border: '1px solid rgba(255,255,255,0.08)',
                  color: ZINC_100, fontFamily: 'Space Grotesk, sans-serif', fontSize: 12, fontWeight: 600, outline: 'none', cursor: 'pointer'
                }}
              >
                <option value="backWall">Back Wall</option>
                <option value="leftWall">Left Wall</option>
                <option value="rightWall">Right Wall</option>
                <option value="floor">Floor</option>
                <option value="ceiling">Ceiling</option>
              </select>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <HexColorPicker
                  color={
                    activeSurface === 'backWall' ? wallColor :
                    activeSurface === 'leftWall' ? leftWallColor :
                    activeSurface === 'rightWall' ? rightWallColor :
                    activeSurface === 'floor' ? floorColor : ceilingColor
                  }
                  onChange={setSurfaceColor}
                  style={{ width: '100%', height: 140 }}
                />
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
