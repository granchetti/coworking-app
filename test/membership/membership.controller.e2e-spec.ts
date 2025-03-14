import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { Uuid } from '../../src/common/value-objects/entity-id.value-object';

describe('MembershipController (e2e)', () => {
  let app: INestApplication;
  let userId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userId = new Uuid().getValue();
  });

  it('/memberships/create (POST) - should create a membership successfully', async () => {
    const response = await request(app.getHttpServer())
      .post('/memberships/create')
      .send({ userId })
      .expect(HttpStatus.CREATED);

    expect(response.body).toHaveProperty('id');
    expect(response.body.userId).toBe(userId);
    expect(response.body.active).toBe(true);
    expect(response.body.createdAt).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
