import { PartialType } from '@nestjs/mapped-types';
import { BookDto } from './crete_book.dto';

export class UpdateBookDto extends PartialType(BookDto) {}
