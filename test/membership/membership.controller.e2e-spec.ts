import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { Uuid } from '../../src/common/value-objects/entity-id.value-object';

describe('MembershipController (e2e)', () => {
  let app: INestApplication;
  let userId: string;
  let membershipId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userId = new Uuid().getValue();
    const createResponse = await request(app.getHttpServer())
      .post('/memberships/create')
      .send({ userId })
      .expect(HttpStatus.CREATED);
    membershipId = createResponse.body.id;
  });

  describe('Membership Creation', () => {
    it('/memberships/create (POST) - should create a membership successfully', async () => {
      const response = await request(app.getHttpServer())
        .post('/memberships/create')
        .send({ userId: new Uuid().getValue() })
        .expect(HttpStatus.CREATED);

      expect(response.body).toHaveProperty('id');
      expect(response.body.userId).toBeDefined();
      expect(response.body.active).toBe(true);
      expect(response.body.createdAt).toBeDefined();
    });
  });

  describe('Membership Package Subscription', () => {
    it('/memberships/register-package (POST) - should subscribe a package successfully', async () => {
      const input = {
        membershipId,
        credits: 31,
        year: 2050,
        month: 1,
      };

      const response = await request(app.getHttpServer())
        .post('/memberships/register-package')
        .send(input)
        .expect(HttpStatus.CREATED);

      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toBe(membershipId);
      expect(response.body.userId).toBe(userId);
      expect(response.body.active).toBe(true);
      expect(response.body.createdAt).toBeDefined();
      expect(response.body.packages).toBeDefined();
      expect(Array.isArray(response.body.packages)).toBe(true);
      expect(response.body.packages.length).toBeGreaterThan(0);
      const pkg = response.body.packages[0];
      expect(pkg.credits).toBe(31);
      expect(pkg.startDate).toBeDefined();
      expect(pkg.endDate).toBeDefined();
    });
  });

  describe('Membership Summary', () => {
    it('/memberships/summary (GET) - should return membership summary', async () => {
      const response = await request(app.getHttpServer())
        .get('/memberships/summary')
        .query({ userId })
        .expect(HttpStatus.OK);

      expect(response.body).toHaveProperty('id');
      expect(response.body.userId).toBe(userId);
    });

    it('/memberships/summary (GET) - should return 400 for invalid userId', async () => {
      await request(app.getHttpServer())
        .get('/memberships/summary')
        .query({ userId: '' })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('/memberships/summary (GET) - should return 404 if membership is not found', async () => {
      const unknownUserId = new Uuid().getValue();
      await request(app.getHttpServer())
        .get('/memberships/summary')
        .query({ userId: unknownUserId })
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
