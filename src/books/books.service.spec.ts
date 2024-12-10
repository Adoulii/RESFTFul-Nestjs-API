import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { Model } from 'mongoose';
import { Book } from 'src/models/book.model';
import { getModelToken } from '@nestjs/mongoose';
import { BooksController } from './books.controller';

describe('BooksService', () => {
  let service: BooksService;
  let model: Model<Book>;

  const mockedBook = {
    title: 'Test Book',
    description: 'This is a test book description',
    imageUrl: 'http://testbookimage.com',
  };


  const mockBookModel = {
    create: jest.fn().mockResolvedValue(mockedBook),
    find: jest.fn().mockResolvedValue([mockedBook]),
    findById: jest.fn().mockResolvedValue(mockedBook),
    save: jest.fn().mockResolvedValue(mockedBook), 
  };

  const mockBooksService = {
    addBook: jest.fn().mockResolvedValue(mockedBook),
    getAllBooks: jest.fn().mockResolvedValue([mockedBook]),
    getBookById: jest.fn().mockResolvedValue(mockedBook),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers:[BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: mockBooksService,  
        },
        {
          provide: getModelToken('Book'),
          useValue: mockBookModel,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    model = module.get<Model<Book>>(getModelToken('Book'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addBook', () => {
    it('should add a new book', async () => {
      const result = await service.create(mockedBook);
      expect(result).toEqual(mockedBook);
      expect(model.create).toHaveBeenCalledWith(mockedBook);
    });
  });

  describe('getAllBooks', () => {
    it('should return an array of books', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockedBook]);
      expect(model.find).toHaveBeenCalled();
    });
  });
});
