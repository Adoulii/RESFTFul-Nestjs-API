import { Schema, Document } from 'mongoose';

export const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
  },
  { timestamps: true },
);

export interface Book extends Document {
    title: string;
    description: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
  }