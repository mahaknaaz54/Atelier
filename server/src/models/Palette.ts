import mongoose, { Document, Schema } from 'mongoose';

export interface IPalette extends Document {
  name: string;
  colors: string[];
  theme: string;
  description?: string;
  isBuiltIn: boolean;
  userId?: mongoose.Types.ObjectId;
}

const PaletteSchema = new Schema<IPalette>(
  {
    name: { type: String, required: true },
    colors: [{ type: String }],
    theme: { type: String, required: true },
    description: { type: String },
    isBuiltIn: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model<IPalette>('Palette', PaletteSchema);
