import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Power } from '../entity/power.entity';
import { Repository } from 'typeorm';
import { PowerController } from './power.controller';
import { PowerService } from './power.service';
import * as request from 'supertest';

describe('PowerController', () => {
  let app: INestApplication;
  let controller: PowerController;
  let service: PowerService;
  let repo: Repository<Power>;
  let testPower: Power;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PowerService,
        {
          provide: getRepositoryToken(Power),
          useClass: Repository,
        },
      ],
      controllers: [PowerController],
    }).compile();

    controller = module.get<PowerController>(PowerController);
    service = module.get<PowerService>(PowerService);
    repo = module.get<Repository<Power>>(getRepositoryToken(Power));
    testPower = {
      id: 1,
      date: new Date(),
      kwh: 120,
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

  it('repo should be defined', () => {
    expect(repo).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all Power on GET request', () => {
    jest.spyOn(service, 'powers').mockResolvedValueOnce([testPower]);
    request(app.getHttpServer()).get('/power').expect(200).expect([testPower]);
  });

  it('should return the posted Power on POST request', () => {
    jest.spyOn(service, 'create').mockResolvedValueOnce(testPower);
    request(app.getHttpServer())
      .post('/power')
      .send(testPower)
      .expect(201)
      .expect(testPower);
  });
});
