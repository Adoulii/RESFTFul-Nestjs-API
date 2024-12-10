import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('books')
export class BooksController {
  /**
   *
   */
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.booksService.findAll();
  }

  @Post()
  async addBook(@Body() createBookDto : {title:string;description:string; imageUrl: string}) {
    return this.booksService.create(createBookDto);
  }

  @Get(':id')
  async getOne(@Param('id') bookId:string) {
    return this.booksService.findOne(bookId);
  }
}
