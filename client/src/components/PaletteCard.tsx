import { motion } from 'framer-motion';
import { readableTextColor } from '../lib/colorUtils';
import type { Preset, PaletteMood } from '../store/sceneStore';

const MOOD_COLORS: Record<PaletteMood, string> = {
  calm:   '#7ec8c8',
  cozy:   '#e8a87c',
  luxury: '#c4a0e8',
  fresh:  '#7ecba0',
  bold:   '#e86080',
};

interface PaletteCardProps {
  preset: Preset;
  isActive: boolean;
  onClick: () => void;
}

export default function PaletteCard({ preset, isActive, onClick }: PaletteCardProps) {
  const swatches = [preset.wallColor, preset.floorColor, preset.ceilingColor, preset.accentColor];
  const moodColor = MOOD_COLORS[preset.mood];

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      style={{
        position: 'relative',
        background: 'rgba(28,27,27,0.55)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: 16,
        overflow: 'hidden',
        border: isActive
          ? `1.5px solid ${moodColor}80`
          : '1px solid rgba(255,255,255,0.07)',
        cursor: 'pointer',
        textAlign: 'left',
        width: '100%',
        padding: 0,
        boxShadow: isActive
          ? `0 0 28px ${moodColor}30, 0 8px 24px rgba(0,0,0,0.5)`
          : '0 4px 20px rgba(0,0,0,0.35)',
        transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
      }}
    >
      {/* Swatch strip */}
      <div style={{ display: 'flex', height: 88 }}>
        {swatches.map((color, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              background: color,
              position: 'relative',
              transition: 'flex 0.3s ease',
            }}
          >
            {/* Hex tooltip on last swatch */}
            {i === 3 && (
              <div style={{
                position: 'absolute',
                bottom: 6,
                right: 6,
                background: 'rgba(0,0,0,0.55)',
                borderRadius: 4,
                padding: '2px 5px',
                fontSize: 8,
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                letterSpacing: '0.04em',
                color: readableTextColor(color),
                opacity: 0.85,
              }}>
                {color.toUpperCase()}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Hover overlay — "Apply" prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.18 }}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 88,
          background: 'rgba(0,0,0,0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <span style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#fff',
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: 8,
          padding: '6px 14px',
        }}>
          Apply to Room
        </span>
      </motion.div>

      {/* Active indicator ring */}
      {isActive && (
        <motion.div
          layoutId="active-ring"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 16,
            border: `2px solid ${moodColor}`,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Card footer */}
      <div style={{ padding: '12px 14px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: 13,
            color: '#e5e2e1',
            letterSpacing: '-0.2px',
          }}>
            {preset.name}
          </span>
          {/* Mood badge */}
          <span style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: moodColor,
            background: `${moodColor}18`,
            border: `1px solid ${moodColor}40`,
            borderRadius: 6,
            padding: '2px 7px',
          }}>
            {preset.mood}
          </span>
        </div>
        {preset.description && (
          <p style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 11,
            color: 'rgba(200,196,192,0.65)',
            lineHeight: 1.4,
            margin: 0,
          }}>
            {preset.description}
          </p>
        )}
        {/* Color dots */}
        <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
          {swatches.map((c, i) => (
            <div key={i} style={{
              width: 10, height: 10,
              borderRadius: '50%',
              background: c,
              border: '1px solid rgba(255,255,255,0.12)',
            }} />
          ))}
        </div>
      </div>
    </motion.button>
  );
}
