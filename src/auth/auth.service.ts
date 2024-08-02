import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Helper } from 'src/helper/helper';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async checkUser(username, password) {
    const helper = new Helper();
    const user = await this.userService.findByUsername(username);

    if (user) {
      const valid = helper.compare(password, user.password);
      if (valid) {
        return user;
      } else {
        throw new BadRequestException({
          message: 'Wrong password',
        });
      }
    } else {
      throw new BadRequestException({
        message: 'Username not found',
      });
    }
  }

  async generateJwtToken(user: any) {
    const data_token = { id: user.id };
    const token = this.jwtService.sign(data_token);

    return { token };
  }
}
