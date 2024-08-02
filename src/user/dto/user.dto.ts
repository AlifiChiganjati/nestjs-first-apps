import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(30)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(30)
  password: string;
}
