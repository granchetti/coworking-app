import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { Uuid } from '../../../src/spaces/domain/value-objects/shared/entity-id.value-object';

describe('MeetingRoomController (e2e)', () => {
  let app: INestApplication;
  let meetingRoomId: string;
  let userId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const createResponse = await request(app.getHttpServer())
      .post('/meeting-rooms/register')
      .send({ name: 'Meeting Room A', capacity: 10 })
      .expect(HttpStatus.CREATED);

    meetingRoomId = createResponse.body.id;
    userId = new Uuid().getValue();
  });

  describe('Registration', () => {
    it('/meeting-rooms/register (POST) - registration successful', async () => {
      const response = await request(app.getHttpServer())
        .post('/meeting-rooms/register')
        .send({ name: 'Meeting Room B', capacity: 20 })
        .expect(HttpStatus.CREATED);
      expect(response.body.name).toBe('Meeting Room B');
      expect(response.body.capacity).toBe(20);
    });

    it('/meeting-rooms/register (POST) - duplicate name error', async () => {
      await request(app.getHttpServer())
        .post('/meeting-rooms/register')
        .send({ name: 'Meeting Room C', capacity: 20 })
        .expect(HttpStatus.CREATED);

      await request(app.getHttpServer())
        .post('/meeting-rooms/register')
        .send({ name: 'Meeting Room C', capacity: 20 })
        .expect(HttpStatus.CONFLICT);
    });

    it('/meeting-rooms/register (POST) - invalid data error', async () => {
      await request(app.getHttpServer())
        .post('/meeting-rooms/register')
        .send({ name: '', capacity: 10 })
        .expect(HttpStatus.BAD_REQUEST);

      await request(app.getHttpServer())
        .post('/meeting-rooms/register')
        .send({ name: 'Room Invalid', capacity: 0 })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('Reservation', () => {
    it('/meeting-rooms/reserve (POST) - should reserve a meeting room successfully', async () => {
      const input = {
        meetingRoomId,
        date: '2099-12-31',
        hour: 10,
        duration: 2,
        userId,
      };

      const response = await request(app.getHttpServer())
        .post('/meeting-rooms/reserve')
        .send(input)
        .expect(HttpStatus.CREATED);

      expect(response.body).toHaveProperty('id');
      expect(response.body.meetingRoomId).toBe(meetingRoomId);
      expect(response.body.hour).toBe(10);
      expect(response.body.duration).toBe(2);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
