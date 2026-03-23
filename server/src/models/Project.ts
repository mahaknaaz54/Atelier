import mongoose, { Document, Schema } from 'mongoose';

export interface ISceneState {
  wallColor: string;
  floorColor: string;
  ceilingColor: string;
  activePreset: string;
  lightingMode: 'day' | 'night';
  glossiness: number;
  reflectivity: number;
  lightIntensity: number;
  surfaceToggles: {
    wallTextures: boolean;
    floorMapping: boolean;
    furnitureAO: boolean;
  };
  activeMaterial: string;
  furnitureVisible: boolean;
}

export interface IProject extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  thumbnail?: string;
  sceneState: ISceneState;
  isPublic: boolean;
  shareId: string;
  createdAt: Date;
  updatedAt: Date;
}

const SceneStateSchema = new Schema<ISceneState>(
  {
    wallColor: { type: String, default: '#2a2a2a' },
    floorColor: { type: String, default: '#1c1b1b' },
    ceilingColor: { type: String, default: '#131313' },
    activePreset: { type: String, default: 'Modern Luxury' },
    lightingMode: { type: String, enum: ['day', 'night'], default: 'day' },
    glossiness: { type: Number, default: 74 },
    reflectivity: { type: Number, default: 32 },
    lightIntensity: { type: Number, default: 88 },
    surfaceToggles: {
      wallTextures: { type: Boolean, default: true },
      floorMapping: { type: Boolean, default: true },
      furnitureAO: { type: Boolean, default: false },
    },
    activeMaterial: { type: String, default: 'Matte Paint' },
    furnitureVisible: { type: Boolean, default: true },
  },
  { _id: false }
);

const ProjectSchema = new Schema<IProject>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String },
    thumbnail: { type: String },
    sceneState: { type: SceneStateSchema, default: () => ({}) },
    isPublic: { type: Boolean, default: false },
    shareId: { type: String, default: () => Math.random().toString(36).substring(2, 10) },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>('Project', ProjectSchema);
