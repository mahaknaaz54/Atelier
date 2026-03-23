import { Request, Response } from 'express';
import Palette from '../models/Palette';
import { AuthRequest } from '../middleware/auth';

const BUILT_IN_PALETTES = [
  {
    name: 'Boho Minimal',
    theme: 'boho',
    colors: ['#C9B99A', '#E8D5B7', '#A0856C', '#7A6552', '#F5ECD7'],
    description: 'Warm terracotta tones and natural hemp fibers for a grounded retreat.',
    isBuiltIn: true,
  },
  {
    name: 'Modern Luxury',
    theme: 'luxury',
    colors: ['#1A1A2E', '#16213E', '#0F3460', '#533483', '#E94560'],
    description: 'Deep midnight blues with amethyst and ruby accents for opulent drama.',
    isBuiltIn: true,
  },
  {
    name: 'Earthy Warm',
    theme: 'earthy',
    colors: ['#8B5E3C', '#C4883F', '#D4A853', '#E8C98A', '#F5E6C8'],
    description: 'Sun-baked ochres and clay earth tones for organic warmth.',
    isBuiltIn: true,
  },
  {
    name: 'Pastel Soft',
    theme: 'pastel',
    colors: ['#FFD1DC', '#FFDAB9', '#E0BBE4', '#B5EAD7', '#C7CEEA'],
    description: 'Cloud-like blush tones and airy mints for serene lightness.',
    isBuiltIn: true,
  },
  {
    name: 'Nordic Dusk',
    theme: 'nordic',
    colors: ['#967BB6', '#543b71', '#353534', '#2a2a2a', '#D7C3B0'],
    description: 'Muted lavenders and deep charcoals for high-end serenity.',
    isBuiltIn: true,
  },
  {
    name: 'Industrial Loft',
    theme: 'industrial',
    colors: ['#3A3A3A', '#5C5C5C', '#8A8A8A', '#C4A882', '#1A1A1A'],
    description: 'Raw steel and weathered concrete with warm copper accents.',
    isBuiltIn: true,
  },
];

export const getPalettes = async (_req: Request, res: Response): Promise<void> => {
  try {
    let dbPalettes = await Palette.find({ isBuiltIn: true });
    if (dbPalettes.length === 0) {
      await Palette.insertMany(BUILT_IN_PALETTES);
      dbPalettes = await Palette.find({ isBuiltIn: true });
    }
    res.json({ palettes: dbPalettes });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: (err as Error).message });
  }
};

export const createPalette = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, colors, theme, description } = req.body;
    if (!name || !colors || !Array.isArray(colors)) {
      res.status(400).json({ message: 'Name and colors array are required' });
      return;
    }
    const palette = await Palette.create({ name, colors, theme, description, userId: req.userId });
    res.status(201).json({ palette });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: (err as Error).message });
  }
};
