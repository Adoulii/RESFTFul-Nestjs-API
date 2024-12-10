
import { Schema, Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { isStringObject } from 'util/types';
import { IsString, IsEmail, MinLength } from 'class-validator';

export const UserSchema = new Schema(
    {
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
    },
    { timestamps: true },
  );
  
export interface User extends Document {
    id: string;
    username: string;
    password: string;
  }


export class LoginDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class SignupDto {
    @ApiProperty({ description: 'The username of the user' })
    @IsString()
    @MinLength(4)
    username: string;
  
    @ApiProperty({ description: 'The email of the user' })
    @IsEmail()
    email: string;
  
    @ApiProperty({ description: 'The password of the user' })
    @IsString()
    @MinLength(6)
    password: string;
  }