import { ApiProperty } from '@nestjs/swagger';
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

export class CreateBookDto {
  @ApiProperty({ description: 'The title of the book' })
  title: string;

  @ApiProperty({ description: 'A brief description of the book' })
  description: string;

  @ApiProperty({ description: "The URL of the book's image" })
  imageUrl: string;
}
