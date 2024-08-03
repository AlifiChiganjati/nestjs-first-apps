import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userService: {
    findAll: () => ['test'];
  };

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(UserService)
      .useValue(userService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/GET users', async () => {
    return await request(app.getHttpServer())
      .get('/api/user/list')
      .expect(200)
      .expect(['test']);
  });
});
