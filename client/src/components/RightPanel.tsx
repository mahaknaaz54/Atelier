import { motion } from 'framer-motion';
import { useSceneStore, type LightingMode } from '../store/sceneStore';

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
    showAccentWall, toggleAccentWall,
    lightingMode, setLightingMode,
    activeMaterial, wallColor, floorColor, ceilingColor,
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
          <Toggle id="toggle-textures"  label="Wall Textures"  checked={showFurniture}  onChange={toggleFurniture}   />
          <Toggle id="toggle-floor"     label="Floor Mapping"  checked={showAccentWall} onChange={toggleAccentWall}  />
          <Toggle id="toggle-furniture" label="Furniture AO"   checked={false}           onChange={() => {}}          />
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

        {/* Active Material card – bottom */}
        <section style={{ marginTop: 'auto', padding: '0 20px 20px' }}>
          <div style={{ borderRadius: 12, padding: '16px 16px 0', background: SURFACE_HIGH, border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
              {/* Wood texture swatch */}
              <div style={{ width: 48, height: 48, borderRadius: 8, overflow: 'hidden', background: 'linear-gradient(135deg, #c9a87a, #8b6240)', flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: ZINC_500, fontFamily: 'Space Grotesk, sans-serif', marginBottom: 4 }}>
                  Active Material
                </p>
                <p style={{ fontSize: 14, fontWeight: 700, color: ZINC_100, fontFamily: 'Space Grotesk, sans-serif' }}>
                  {activeMaterial.charAt(0).toUpperCase() + activeMaterial.slice(1)} Finish
                </p>
              </div>
            </div>
            {/* Color summary mini */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
              {[wallColor, floorColor, ceilingColor].map((c, i) => (
                <div key={i} style={{ flex: 1, height: 4, borderRadius: 9999, background: c }} title={c} />
              ))}
            </div>
            <button style={{ width: 'calc(100% + 32px)', padding: '10px', background: SURFACE_LOW, border: 'none', borderRadius: '0 0 8px 8px', cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: ZINC_400, transition: 'background 0.2s', marginLeft: '-16px' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#292929')}
              onMouseLeave={e => (e.currentTarget.style.background = SURFACE_LOW)}>
              Change Material
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
