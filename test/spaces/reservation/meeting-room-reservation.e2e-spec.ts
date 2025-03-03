import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { Uuid } from '../../../src/spaces/domain/value-objects/shared/entity-id.value-object';

describe('MeetingRoomReservationController (e2e)', () => {
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
      .send({ name: 'New Meeting Room', capacity: 10 })
      .expect(HttpStatus.CREATED);

    meetingRoomId = createResponse.body.id;
    userId = new Uuid().getValue();
  });

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

  afterAll(async () => {
    await app.close();
  });
});
