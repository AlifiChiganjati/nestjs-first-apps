import { PickType } from '@nestjs/mapped-types';
// import { CreateUserDto } from 'src/user/dto/create_user.dto';
import { UserDto } from 'src/user/dto/user.dto';

export class AuthDto extends PickType(UserDto, ['username', 'password']) {}
