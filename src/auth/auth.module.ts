import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({

    imports:[
        PassportModule,
        JwtModule.registerAsync({
        imports:[ConfigModule],
        useFactory: async(configService:ConfigService) =>({
            secret: configService.get('JWT_SECRET'),
            signOptions:{expiresIn:'60m'},

        }), 
        inject:[ConfigService]
        }), 
        UsersModule
    ],

    providers:[AuthService, JwtStrategy], 
    controllers:[AuthController],
    exports:[AuthService],
    
})
export class AuthModule {


}
