import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/crete_book.dto';
import { UpdateBookDto } from './dto/update_book.dto';
import { JwtGuard } from 'src/auth/jwt.guard';

@UseGuards(JwtGuard)
@Controller('/api/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('')
  async create(@Body() createBookDto: CreateBookDto) {
    const data = await this.bookService.create(createBookDto);
    return { status: 201, message: 'Success Book successfully', data };
  }

  @Get('/list')
  async findAll() {
    const data = await this.bookService.findAll();
    return { status: 200, message: 'Success Get All Book', data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.bookService.findOne(+id);
    return { status: 200, message: 'Success Get Book', data };
  }

  @Patch('/update/:id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    const data = this.bookService.update(+id, updateBookDto);
    return { status: 200, message: 'Update book successfully', data };
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    this.bookService.remove(+id);
    return { status: 200, message: 'Delete book successfully' };
  }
}
