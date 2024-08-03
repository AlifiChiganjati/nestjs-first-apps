import { OmitType, PickType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class BookDto {
  @IsOptional()
  id?: number;

  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsNumber()
  release_date: number;

  @IsNumber()
  page: number;

  @IsString()
  summary: string;
}

export class CreateBookDto extends OmitType(BookDto, ['id']) {}
export class ProductIdDto extends PickType(BookDto, ['id']) {}
