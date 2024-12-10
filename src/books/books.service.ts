import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from 'src/models/book.model';

@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}


  async create(createBookDto: { title: string; description: string; imageUrl: string }): Promise<Book> {
    const createdBook = new this.bookModel(createBookDto);
    return createdBook.save();
  }
  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findOne(id: string): Promise<Book> {
    return this.bookModel.findById(id).exec();
  }

  async update(id: string, updateBookDto: { title: string; description: string; imageUrl: string }): Promise<Book> {
    return this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.bookModel.findByIdAndDelete(id).exec();
  }

}
