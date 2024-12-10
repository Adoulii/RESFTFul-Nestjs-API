import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignupDto, UserSchema } from 'src/models/user.model';



@ApiTags('Users')
@Controller('users')
export class UsersController {
  /**
   *
   */
  constructor(private readonly usersService: UsersService) {}
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created', type: 'User' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async register(@Body() createUserDto: SignupDto) {
    const { username, password } = createUserDto;
    return this.usersService.create(username, password);
  }
}
