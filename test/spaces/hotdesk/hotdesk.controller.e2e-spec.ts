import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { Uuid } from '../../../src/spaces/domain/value-objects/shared/entity-id.value-object';

describe('HotDeskController (e2e)', () => {
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

  describe('Registration Endpoints', () => {
    it('/hotdesks/register (POST) - registration successful', async () => {
      const response = await request(app.getHttpServer())
        .post('/hotdesks/register')
        .send({ number: 10 })
        .expect(HttpStatus.CREATED);

      expect(response.body).toHaveProperty('id');
      expect(response.body.number).toBe(10);
    });

    it('/hotdesks/register (POST) - duplicate number error', async () => {
      await request(app.getHttpServer())
        .post('/hotdesks/register')
        .send({ number: 15 })
        .expect(HttpStatus.CREATED);

      await request(app.getHttpServer())
        .post('/hotdesks/register')
        .send({ number: 15 })
        .expect(HttpStatus.CONFLICT);
    });

    it('/hotdesks/register (POST) - Invalid number error', async () => {
      await request(app.getHttpServer())
        .post('/hotdesks/register')
        .send({ number: 0 })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('Reservation Endpoints', () => {
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
  });

  afterAll(async () => {
    await app.close();
  });
});
