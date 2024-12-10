import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { bookSchema } from 'src/models/book.model';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'Book',schema:bookSchema}])
  ],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
