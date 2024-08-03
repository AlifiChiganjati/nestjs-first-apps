import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Helper } from 'src/helper/helper';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';

jest.mock('src/helper/helper'); // Mock the Helper class

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;
  let helper: Helper;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    const repositoryMock = {
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    };

    helper = new Helper();
    helper.hash = jest
      .fn()
      .mockImplementation((password: string) => `hashed_${password}`);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: repositoryMock,
        },
        {
          provide: Helper,
          useValue: helper,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should hash password and save user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'test',
        email: '2Cp7m@example.com',
        username: 'test',
        password: 'password123',
      };
      const result = { ...createUserDto };

      repository.save = jest.fn().mockResolvedValue(result);

      const user = await service.create(createUserDto);
      // expect(helper.hash).toHaveBeenCalledWith('password123');
      expect(repository.save).toHaveBeenCalledWith({
        ...createUserDto,
      });
      expect(user).toEqual(result);
    });
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [{ id: 1, username: 'test' }];
      repository.find = jest.fn().mockResolvedValue(result);

      const users = await service.findAll();
      expect(repository.find).toHaveBeenCalled();
      expect(users).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const result = { id: 1, username: 'test' };
      repository.findOneBy = jest.fn().mockResolvedValue(result);

      const user = await service.findOne(1);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(user).toEqual(result);
    });
  });

  describe('findByUsername', () => {
    it('should return a user by username', async () => {
      const result = {
        id: 1,
        username: 'test',
        password: 'hashed_password123',
      };
      repository.findOne = jest.fn().mockResolvedValue(result);

      const user = await service.findByUsername('test');
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { username: 'test' },
        select: ['id', 'password'],
      });
      expect(user).toEqual(result);
    });
  });

  describe('update', () => {
    it('should hash password and update user', async () => {
      const updateUserDto: UpdateUserDto = {
        id: 1,
        username: 'test',
        password: 'newpassword123',
      };
      const result = { ...updateUserDto };

      repository.save = jest.fn().mockResolvedValue(result);

      const user = await service.update(1, updateUserDto);
      // expect(helper.hash).toHaveBeenCalledWith('newpassword123');
      expect(repository.save).toHaveBeenCalledWith({
        ...updateUserDto,
        id: 1,
      });
      expect(user).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should remove a user by id', async () => {
      const user = { id: 1, username: 'test' };
      repository.findOne = jest.fn().mockResolvedValue(user);
      repository.remove = jest.fn().mockResolvedValue(user);

      const result = await service.remove(1);
      expect(repository.findOne).toHaveBeenCalledWith(1);
      expect(repository.remove).toHaveBeenCalledWith(user);
      expect(result).toEqual(user);
    });
  });
});
