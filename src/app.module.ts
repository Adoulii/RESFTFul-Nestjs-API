import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import mongoose from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: async (configService: ConfigService)=>({
        uri:configService.get('MONGO_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
       inject:[ConfigService]
    }),

    BooksModule,

    AuthModule,
    UsersModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
 async onModuleInit() {
    mongoose.connection.on('connected', () => {
      console.log('connection established successfully');
    });

    mongoose.connection.on('error', (err) => {
      console.error('connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('connection disconnected');
    });  }

}
