import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  // Post,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update_user.dto';
// import { CreateUserDto } from './dto/create_user.dto';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/jwt.guard';

@Controller('/api/user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post('/register')
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  @Get()
  async findAll() {
    const data = await this.userService.findAll();
    return { status: 200, message: 'Success Get All User', data };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.userService.findOne(+id);
    return { status: 200, message: 'Success get user', data };
  }

  @Patch('/update/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const data = await this.userService.update(+id, updateUserDto);
    return { status: 200, message: 'Update user successfully', data };
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    this.userService.remove(+id);
    return { status: 200, message: 'Delete user successfully' };
  }
}
