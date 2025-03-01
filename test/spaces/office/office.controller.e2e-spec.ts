import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';

describe('OfficeController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/office/register (POST) - registration successful', async () => {
    await request(app.getHttpServer())
      .post('/office/register')
      .send({ number: 201, leasePeriod: 24, status: 'Active' })
      .expect(HttpStatus.CREATED)
      .expect((res) => {
        expect(res.body.number).toBe(201);
        expect(res.body.leasePeriod).toBe(24);
        expect(res.body.status).toBe('Active');
      });
  });

  it('/office/register (POST) - duplicate number error', async () => {
    await request(app.getHttpServer())
      .post('/office/register')
      .send({ number: 202, leasePeriod: 24 })
      .expect(HttpStatus.CREATED);

    await request(app.getHttpServer())
      .post('/office/register')
      .send({ number: 202, leasePeriod: 24 })
      .expect(HttpStatus.CONFLICT);
  });

  it('/office/register (POST) - invalid data error', async () => {
    await request(app.getHttpServer())
      .post('/office/register')
      .send({ number: 0, leasePeriod: 24 })
      .expect(HttpStatus.BAD_REQUEST);

    await request(app.getHttpServer())
      .post('/office/register')
      .send({ number: 203, leasePeriod: 6 })
      .expect(HttpStatus.BAD_REQUEST);
  });

  afterAll(async () => {
    await app.close();
  });
});
