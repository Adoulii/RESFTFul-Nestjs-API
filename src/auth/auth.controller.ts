import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/models/user.model';



@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @ApiOperation({ summary: 'Login to the system' })
  @ApiResponse({ status: 200, description: 'Successfully logged in.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.username, body.password);
  }
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh the JWT token' })
  @ApiResponse({ status: 200, description: 'Successfully refreshed the token.' })
  @ApiResponse({ status: 401, description: 'Unauthorized or invalid refresh token.' })
  async refresh(@Body() body: { refreshToken: string }) {
    return this.authService.refreshToken(body.refreshToken);
  }
}
