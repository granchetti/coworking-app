import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('HotDeskController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/hotdesk/register (POST) - registration successful', () => {
    return request(app.getHttpServer())
      .post('/hotdesk/register')
      .send({ number: 10 })
      .expect(HttpStatus.CREATED)
      .expect((res) => {
        expect(res.body.number).toBe(10);
      });
  });

  it('/hotdesk/register (POST) - duplicate number error', async () => {
    await request(app.getHttpServer())
      .post('/hotdesk/register')
      .send({ number: 15 })
      .expect(HttpStatus.CREATED);

    await request(app.getHttpServer())
      .post('/hotdesk/register')
      .send({ number: 15 })
      .expect(HttpStatus.CONFLICT);
  });

  it('/hotdesk/register (POST) - Invalid number error', () => {
    return request(app.getHttpServer())
      .post('/hotdesk/register')
      .send({ number: 0 })
      .expect(HttpStatus.BAD_REQUEST);
  });

  afterAll(async () => {
    await app.close();
  });
});
