import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Oil } from '../entity/oil.entity';
import { Repository } from 'typeorm';
import { OilController } from './oil.controller';
import { OilService } from './oil.service';
import * as request from 'supertest';

describe('OilController', () => {
  let app: INestApplication;
  let controller: OilController;
  let service: OilService;
  let repo: Repository<Oil>;
  let testOil: Oil;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OilService,
        {
          provide: getRepositoryToken(Oil),
          useClass: Repository,
        },
      ],
      controllers: [OilController],
    }).compile();

    controller = module.get<OilController>(OilController);
    service = module.get<OilService>(OilService);
    repo = module.get<Repository<Oil>>(getRepositoryToken(Oil));
    testOil = {
      id: 1,
      date: new Date(),
      filled: 120,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('repo should be defined', () => {
    expect(repo).toBeDefined();
  });

  it('should return all Oil on GET request', () => {
    jest.spyOn(service, 'oils').mockResolvedValueOnce([testOil]);
    request(app.getHttpServer()).get('/oil').expect(200).expect([testOil]);
  });

  it('should return the posted Oil on POST request', () => {
    jest.spyOn(service, 'create').mockResolvedValueOnce(testOil);
    request(app.getHttpServer())
      .post('/oil')
      .send(testOil)
      .expect(201)
      .expect(testOil);
  });
});
