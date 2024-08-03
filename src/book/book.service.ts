import { Injectable } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/crete_book.dto';
import { UpdateBookDto } from './dto/update_book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  create(createBookDto: CreateBookDto) {
    return this.bookRepository.save(createBookDto);
  }

  findAll() {
    return this.bookRepository.find();
  }

  findOne(id: any) {
    return this.bookRepository.findOneBy({ id: id });
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    updateBookDto.id = id;
    return this.bookRepository.save(updateBookDto);
  }

  async remove(id: any) {
    const book = await this.bookRepository.findOneBy({ id: id });
    return this.bookRepository.remove(book);
  }
}
