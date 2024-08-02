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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(JwtGuard)
  checkUser(@Request() req) {
    return req.user;
  }

  @Post()
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
    return this.authService.generateJwtToken({ id: user.id });
  }
}
