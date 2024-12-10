import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBookDto } from 'src/models/book.model';


@ApiTags('Books')
@Controller('books')
export class BooksController {
  /**
   *
   */
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Retrieve all books' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all books' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll() {
    return this.booksService.findAll();
  }


  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Add a new book' })
  @ApiResponse({ status: 201, description: 'Successfully added a new book' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async addBook(@Body() createBookDto : CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get details of a specific book' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved the book details' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async getOne(@Param('id') bookId:string) {
    return this.booksService.findOne(bookId);
  }
}
