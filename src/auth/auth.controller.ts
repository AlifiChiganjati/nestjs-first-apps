import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create_user.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get()
  @UseGuards(JwtGuard)
  checkUser(@Request() req) {
    return req.user;
  }

  @Post('/login')
  // @ApiResponse({
  //   status: 200,
  //   description: 'The record has been successfully created.',
  // })
  async login(@Body() authDto: AuthDto) {
    console.log(authDto);
    const user = await this.authService.checkUser(
      authDto.username,
      authDto.password,
    );
    const token = await this.authService.generateJwtToken({ id: user.id });
    return { Status: 200, message: 'Login successfully', token };
  }

  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto) {
    const data = await this.userService.create(createUserDto);
    return { status: 201, message: 'Success Create User', data };
  }
}
