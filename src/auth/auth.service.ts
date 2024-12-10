import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async generateAccessToken(userId: string): Promise<string> {
    return this.jwtService.sign({ userId }, { expiresIn: '1h' });
  }

  async generateRefreshToken(userId: string): Promise<string> {
    return this.jwtService.sign({ userId }, { expiresIn: '7d' });
  }

  async login(username: string, password: string) {
    const user = await this.userService.findOne(username);

    if (user && (await this.userService.validatePassword(user, password))) {
      const payload = { username: user.username, sub: user.id };
      const accessToken = await this.generateAccessToken(user.id);
      const refreshToken = await this.generateRefreshToken(user.id);

      return { accessToken, refreshToken };
    }
    throw new Error('Invalid credentials');
  }

  async refreshToken(refreshToken: string) {
    const payload = this.jwtService.verify(refreshToken); 

    if (!payload) {
      throw new Error('Invalid or expired refresh token');
    }

    const userId = payload.userId;

    const newAccessToken = await this.generateAccessToken(userId); 
    const newRefreshToken = await this.generateRefreshToken(userId); 

    return { newAccessToken, newRefreshToken };
  }
}
