import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create_user.dto';
import { Helper } from 'src/helper/helper';
import { UpdateUserDto } from './dto/update_user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    const helper = new Helper();
    if (createUserDto.password) {
      createUserDto.password = helper.hash(createUserDto.password);
    }
    return this.userRepo.save(createUserDto);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  findByUsername(username: string) {
    return this.userRepo.findOne({
      where: { username },
      select: ['id', 'password'],
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    updateUserDto.id = id;
    const helper = new Helper();
    if (updateUserDto.password) {
      updateUserDto.password = helper.hash(updateUserDto.password);
    }
    return this.userRepo.save(updateUserDto);
  }

  async remove(id: any) {
    const user = await this.userRepo.findOne(id);
    return this.userRepo.remove(user);
  }
}
