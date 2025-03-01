import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('MeetingRoomController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/meeting-room/register (POST) - registration successful', async () => {
    await request(app.getHttpServer())
      .post('/meeting-room/register')
      .send({ name: 'Meeting Room A', capacity: 10 })
      .expect(HttpStatus.CREATED)
      .expect((res) => {
        expect(res.body.name).toBe('Meeting Room A');
        expect(res.body.capacity).toBe(10);
      });
  });

  it('/meeting-room/register (POST) - duplicate name error', async () => {
    await request(app.getHttpServer())
      .post('/meeting-room/register')
      .send({ name: 'Meeting Room B', capacity: 20 })
      .expect(HttpStatus.CREATED);

    await request(app.getHttpServer())
      .post('/meeting-room/register')
      .send({ name: 'Meeting Room B', capacity: 20 })
      .expect(HttpStatus.CONFLICT);
  });

  it('/meeting-room/register (POST) - invalid data error', async () => {
    await request(app.getHttpServer())
      .post('/meeting-room/register')
      .send({ name: '', capacity: 10 })
      .expect(HttpStatus.BAD_REQUEST);

    await request(app.getHttpServer())
      .post('/meeting-room/register')
      .send({ name: 'Room Invalid', capacity: 0 })
      .expect(HttpStatus.BAD_REQUEST);
  });

  afterAll(async () => {
    await app.close();
  });
});
