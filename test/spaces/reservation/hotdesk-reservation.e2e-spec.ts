import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { Uuid } from '../../../src/spaces/domain/value-objects/shared/entity-id.value-object';

describe('HotDeskReservationController (e2e)', () => {
  let app: INestApplication;
  let userId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    userId = new Uuid().getValue();
  });

  it('/hotdesks/reserve (POST) - should reserve a hotdesk successfully', async () => {
    const input = {
      userId,
      date: '2099-12-31',
    };

    const response = await request(app.getHttpServer())
      .post('/hotdesks/reserve')
      .send(input)
      .expect(HttpStatus.CREATED);

    expect(response.body).toHaveProperty('id');
    expect(response.body.userId).toBe(userId);
    expect(response.body.date).toBe('2099-12-31');
    expect(response.body.status).toBe('Active');
    expect(response.body.includedInMembership).toBe(true);
  });

  it('/hotdesks/reserve (POST) - should return conflict if user already has a hotdesk reservation for that date', async () => {
    const input = {
      userId,
      date: '2099-12-31',
    };

    await request(app.getHttpServer())
      .post('/hotdesks/reserve')
      .send(input)
      .expect(HttpStatus.CREATED);

    await request(app.getHttpServer())
      .post('/hotdesks/reserve')
      .send(input)
      .expect(HttpStatus.CONFLICT);
  });

  afterAll(async () => {
    await app.close();
  });
});
