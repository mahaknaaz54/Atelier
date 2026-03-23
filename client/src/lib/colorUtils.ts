import tinycolor from 'tinycolor2';
import { PRESETS, type Preset } from '../store/sceneStore';

export type HarmonyType = 'complementary' | 'analogous' | 'triadic' | 'split-complementary';

export interface GeneratedPalette {
  name: string;
  colors: string[]; // [wall, floor, ceiling, accent]
  harmonyType: HarmonyType;
  baseColor: string;
}

/**
 * Adjust lightness so we get distinct wall/floor/ceiling shades from a single base.
 */
function toHex(c: tinycolor.Instance): string {
  return c.toHexString();
}

export function getComplementaryPalette(hex: string): GeneratedPalette {
  const base = tinycolor(hex);
  const complement = base.complement();
  const wall      = toHex(base.clone().lighten(20).desaturate(10));
  const floor     = toHex(base.clone().darken(15));
  const ceiling   = toHex(base.clone().lighten(30).desaturate(15));
  const accent    = toHex(complement.clone().saturate(10));
  return { name: 'Complementary', colors: [wall, floor, ceiling, accent], harmonyType: 'complementary', baseColor: hex };
}

export function getAnalogousPalette(hex: string): GeneratedPalette {
  const base = tinycolor(hex);
  const results = base.analogous(6, 20);
  const wall    = toHex(results[0].clone().lighten(18).desaturate(8));
  const floor   = toHex(results[2].clone().darken(12));
  const ceiling = toHex(results[1].clone().lighten(25).desaturate(12));
  const accent  = toHex(results[4].clone().saturate(15));
  return { name: 'Analogous', colors: [wall, floor, ceiling, accent], harmonyType: 'analogous', baseColor: hex };
}

export function getTriadicPalette(hex: string): GeneratedPalette {
  const base = tinycolor(hex);
  const triadic = base.triad();
  const wall    = toHex(triadic[0].clone().lighten(22).desaturate(12));
  const floor   = toHex(triadic[1].clone().darken(10).desaturate(5));
  const ceiling = toHex(triadic[0].clone().lighten(32).desaturate(18));
  const accent  = toHex(triadic[2].clone().saturate(10));
  return { name: 'Triadic', colors: [wall, floor, ceiling, accent], harmonyType: 'triadic', baseColor: hex };
}

export function getSplitComplementaryPalette(hex: string): GeneratedPalette {
  const base = tinycolor(hex);
  const split = base.splitcomplement();
  const wall    = toHex(split[0].clone().lighten(20).desaturate(10));
  const floor   = toHex(split[1].clone().darken(10));
  const ceiling = toHex(split[0].clone().lighten(30).desaturate(18));
  const accent  = toHex(split[2].clone().saturate(12));
  return { name: 'Split-Comp', colors: [wall, floor, ceiling, accent], harmonyType: 'split-complementary', baseColor: hex };
}

export function generateHarmonyPalette(hex: string, type: HarmonyType): GeneratedPalette {
  switch (type) {
    case 'complementary':       return getComplementaryPalette(hex);
    case 'analogous':           return getAnalogousPalette(hex);
    case 'triadic':             return getTriadicPalette(hex);
    case 'split-complementary': return getSplitComplementaryPalette(hex);
  }
}

/** Returns a random preset from PRESETS */
export function randomPreset(): Preset {
  return PRESETS[Math.floor(Math.random() * PRESETS.length)];
}

/** Generates a random base color and a random harmony type, returns a GeneratedPalette */
export function randomGeneratedPalette(): GeneratedPalette {
  const randomHue = Math.floor(Math.random() * 360);
  const randomSat = 20 + Math.floor(Math.random() * 50); // 20–70%
  const randomLit = 35 + Math.floor(Math.random() * 30); // 35–65%
  const base  = tinycolor({ h: randomHue, s: randomSat, l: randomLit }).toHexString();
  const types: HarmonyType[] = ['complementary', 'analogous', 'triadic', 'split-complementary'];
  const type  = types[Math.floor(Math.random() * types.length)];
  return generateHarmonyPalette(base, type);
}

/** Returns a readable luminance-based text color for a given background */
export function readableTextColor(hex: string): string {
  return tinycolor(hex).isLight() ? '#1a1a1a' : '#f0f0f0';
}

/** Returns true if a hex string is a valid color */
export function isValidColor(hex: string): boolean {
  return tinycolor(hex).isValid();
}
