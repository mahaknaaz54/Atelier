import { create } from 'zustand';

export type LightingMode = 'day' | 'night' | 'golden';
export type ActiveSurface = 'wall' | 'floor' | 'ceiling' | 'accent';
export type ActiveMaterial = 'matte' | 'glossy' | 'metallic' | 'concrete';
export type PaletteMood = 'calm' | 'cozy' | 'luxury' | 'fresh' | 'bold';

export interface SceneSnapshot {
  wallColor: string;
  floorColor: string;
  ceilingColor: string;
  accentColor: string;
  lightingMode: LightingMode;
  activeMaterial: ActiveMaterial;
  glossiness: number;
  reflectivity: number;
  lightIntensity: number;
  showFurniture: boolean;
  showAccentWall: boolean;
}

export interface Preset {
  name: string;
  wallColor: string;
  floorColor: string;
  ceilingColor: string;
  accentColor: string;
  lightingMode: LightingMode;
  activeMaterial: ActiveMaterial;
  mood: PaletteMood;
  description?: string;
}

export const PRESETS: Preset[] = [
  // ── CALM ───────────────────────────────────────────────────────────────
  {
    name: 'Polar Linen',
    wallColor: '#f0ede8', floorColor: '#d5cec5', ceilingColor: '#f8f6f4', accentColor: '#b8a99a',
    lightingMode: 'day',    activeMaterial: 'matte',    mood: 'calm',
    description: 'Soft nordic whites with linen undertones',
  },
  {
    name: 'Misted Sage',
    wallColor: '#dde5d9', floorColor: '#8fa88a', ceilingColor: '#edf0eb', accentColor: '#5d7a58',
    lightingMode: 'day',    activeMaterial: 'matte',    mood: 'calm',
    description: 'Gentle sage greens inspired by morning fog',
  },
  {
    name: 'Cloud Bloom',
    wallColor: '#e8e4f0', floorColor: '#b0a8cc', ceilingColor: '#f2f0f8', accentColor: '#7868a8',
    lightingMode: 'day',    activeMaterial: 'matte',    mood: 'calm',
    description: 'Dreamy lavender haze and soft lilac tones',
  },
  {
    name: 'Sea Mist',
    wallColor: '#d4e8e4', floorColor: '#6a9e97', ceilingColor: '#eaf4f3', accentColor: '#3a7268',
    lightingMode: 'day',    activeMaterial: 'glossy',   mood: 'calm',
    description: 'Coastal aqua greens with seafoam freshness',
  },

  // ── COZY ───────────────────────────────────────────────────────────────
  {
    name: 'Boho Minimal',
    wallColor: '#f5ede0', floorColor: '#c8a87a', ceilingColor: '#faf5ee', accentColor: '#8b6349',
    lightingMode: 'golden', activeMaterial: 'matte',    mood: 'cozy',
    description: 'Sun-warmed terracotta and natural woven textures',
  },
  {
    name: 'Earthy Warm',
    wallColor: '#c4a882', floorColor: '#7a5c3a', ceilingColor: '#ddd0bc', accentColor: '#5b4034',
    lightingMode: 'day',    activeMaterial: 'concrete',  mood: 'cozy',
    description: 'Rich earthy browns and raw concrete warmth',
  },
  {
    name: 'Muted Clay',
    wallColor: '#d4b4a0', floorColor: '#a07060', ceilingColor: '#e8d0c0', accentColor: '#7a4838',
    lightingMode: 'golden', activeMaterial: 'matte',    mood: 'cozy',
    description: 'Warm Mediterranean clay and dusty terracotta',
  },
  {
    name: 'Amber Hearth',
    wallColor: '#f0d5a8', floorColor: '#9a6030', ceilingColor: '#f8ecd4', accentColor: '#6a3818',
    lightingMode: 'golden', activeMaterial: 'concrete',  mood: 'cozy',
    description: 'Fireplace glow with amber pine and oak floors',
  },
  {
    name: 'Desert Dusk',
    wallColor: '#e0c8a8', floorColor: '#b08060', ceilingColor: '#ede4d4', accentColor: '#884828',
    lightingMode: 'golden', activeMaterial: 'matte',    mood: 'cozy',
    description: 'Warm sands fading into a desert sunset',
  },

  // ── LUXURY ─────────────────────────────────────────────────────────────
  {
    name: 'Modern Luxury',
    wallColor: '#1a1a1a', floorColor: '#2a2a2a', ceilingColor: '#111111', accentColor: '#FFB4AA',
    lightingMode: 'night',  activeMaterial: 'metallic',  mood: 'luxury',
    description: 'Obsidian black with rose-gold accents',
  },
  {
    name: 'Midnight Studio',
    wallColor: '#0d0d1a', floorColor: '#1a1a2e', ceilingColor: '#080812', accentColor: '#6a4acf',
    lightingMode: 'night',  activeMaterial: 'metallic',  mood: 'luxury',
    description: 'Deep midnight blue with electric violet',
  },
  {
    name: 'Onyx Velvet',
    wallColor: '#12100e', floorColor: '#1e1a16', ceilingColor: '#0a0906', accentColor: '#c4962a',
    lightingMode: 'night',  activeMaterial: 'metallic',  mood: 'luxury',
    description: 'Darkest onyx with burnished gold',
  },
  {
    name: 'Noir Marble',
    wallColor: '#1e1c1c', floorColor: '#2e2c2c', ceilingColor: '#141212', accentColor: '#D8BAFA',
    lightingMode: 'night',  activeMaterial: 'glossy',   mood: 'luxury',
    description: 'Polished noir marble with soft amethyst',
  },
  {
    name: 'Royal Indigo',
    wallColor: '#0e0c1e', floorColor: '#1a1830', ceilingColor: '#080614', accentColor: '#9878e8',
    lightingMode: 'night',  activeMaterial: 'metallic',  mood: 'luxury',
    description: 'Deep royal indigo with glowing purple accents',
  },

  // ── FRESH ──────────────────────────────────────────────────────────────
  {
    name: 'Ocean Breeze',
    wallColor: '#d0eaf0', floorColor: '#5b8ea6', ceilingColor: '#eaf5f8', accentColor: '#2a6d8a',
    lightingMode: 'day',    activeMaterial: 'glossy',   mood: 'fresh',
    description: 'Clear coastal blues with bright ocean light',
  },
  {
    name: 'Pastel Soft',
    wallColor: '#e8d5f0', floorColor: '#b8a0d0', ceilingColor: '#f5eef8', accentColor: '#D8BAFA',
    lightingMode: 'day',    activeMaterial: 'matte',    mood: 'fresh',
    description: 'Light pastel florals with airy freshness',
  },
  {
    name: 'Mint Atelier',
    wallColor: '#d4f0e8', floorColor: '#68c4a0', ceilingColor: '#eaf8f4', accentColor: '#2a9868',
    lightingMode: 'day',    activeMaterial: 'glossy',   mood: 'fresh',
    description: 'Cool mint leaves and fresh botanical green',
  },
  {
    name: 'Arctic Glow',
    wallColor: '#d8eef8', floorColor: '#80b8d8', ceilingColor: '#ecf6fc', accentColor: '#3888b8',
    lightingMode: 'day',    activeMaterial: 'glossy',   mood: 'fresh',
    description: 'Crisp arctic ice blue and pristine whites',
  },

  // ── BOLD ───────────────────────────────────────────────────────────────
  {
    name: 'Urban Night',
    wallColor: '#1c1c2c', floorColor: '#2a2a3c', ceilingColor: '#141420', accentColor: '#e04060',
    lightingMode: 'night',  activeMaterial: 'concrete',  mood: 'bold',
    description: 'City after dark with neon red-pink pulse',
  },
  {
    name: 'Chromatic Edge',
    wallColor: '#18181e', floorColor: '#2a2830', ceilingColor: '#101014', accentColor: '#28e0b0',
    lightingMode: 'night',  activeMaterial: 'metallic',  mood: 'bold',
    description: 'Dark tech surfaces with electric teal',
  },
];

export interface SceneState extends SceneSnapshot {
  activePreset: string | null;
  activeSurface: ActiveSurface;

  setWallColor:     (c: string) => void;
  setFloorColor:    (c: string) => void;
  setCeilingColor:  (c: string) => void;
  setAccentColor:   (c: string) => void;
  setActiveSurface: (s: ActiveSurface) => void;
  setSurfaceColor:  (c: string) => void;
  setLightingMode:  (m: LightingMode) => void;
  setActiveMaterial:(m: ActiveMaterial) => void;
  setGlossiness:    (v: number) => void;
  setReflectivity:  (v: number) => void;
  setLightIntensity:(v: number) => void;
  toggleFurniture:  () => void;
  toggleAccentWall: () => void;
  applyPreset:      (p: Preset) => void;
  getSceneSnapshot: () => SceneSnapshot;
  loadSceneSnapshot:(s: SceneSnapshot) => void;
}

export const useSceneStore = create<SceneState>((set, get) => ({
  wallColor:      '#e8e4dc',
  floorColor:     '#8a7560',
  ceilingColor:   '#f0ece4',
  accentColor:    '#FFB4AA',
  lightingMode:   'day',
  activeMaterial: 'matte',
  glossiness:     30,
  reflectivity:   20,
  lightIntensity: 50,
  showFurniture:  true,
  showAccentWall: false,
  activePreset:   null,
  activeSurface:  'wall',

  setWallColor:    (c) => set({ wallColor: c, activePreset: null }),
  setFloorColor:   (c) => set({ floorColor: c, activePreset: null }),
  setCeilingColor: (c) => set({ ceilingColor: c, activePreset: null }),
  setAccentColor:  (c) => set({ accentColor: c, activePreset: null }),
  setActiveSurface:(s) => set({ activeSurface: s }),

  setSurfaceColor: (c) => {
    const s = get().activeSurface;
    if (s === 'wall')    set({ wallColor: c, activePreset: null });
    if (s === 'floor')   set({ floorColor: c, activePreset: null });
    if (s === 'ceiling') set({ ceilingColor: c, activePreset: null });
    if (s === 'accent')  set({ accentColor: c, activePreset: null });
  },

  setLightingMode:  (m) => set({ lightingMode: m }),
  setActiveMaterial:(m) => set({ activeMaterial: m }),
  setGlossiness:    (v) => set({ glossiness: v }),
  setReflectivity:  (v) => set({ reflectivity: v }),
  setLightIntensity:(v) => set({ lightIntensity: v }),
  toggleFurniture:  ()  => set((s) => ({ showFurniture: !s.showFurniture })),
  toggleAccentWall: ()  => set((s) => ({ showAccentWall: !s.showAccentWall })),

  applyPreset: (p) => set({
    wallColor:      p.wallColor,
    floorColor:     p.floorColor,
    ceilingColor:   p.ceilingColor,
    accentColor:    p.accentColor,
    lightingMode:   p.lightingMode,
    activeMaterial: p.activeMaterial,
    activePreset:   p.name,
  }),

  getSceneSnapshot: (): SceneSnapshot => {
    const s = get();
    return {
      wallColor:      s.wallColor,
      floorColor:     s.floorColor,
      ceilingColor:   s.ceilingColor,
      accentColor:    s.accentColor,
      lightingMode:   s.lightingMode,
      activeMaterial: s.activeMaterial,
      glossiness:     s.glossiness,
      reflectivity:   s.reflectivity,
      lightIntensity: s.lightIntensity,
      showFurniture:  s.showFurniture,
      showAccentWall: s.showAccentWall,
    };
  },

  loadSceneSnapshot: (snap) => set({ ...snap, activePreset: null }),
}));
