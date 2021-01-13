import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Water } from 'src/entity/water.entity';
import { Repository } from 'typeorm';
import { WaterController } from './water.controller';
import { WaterService } from './water.service';
import * as request from 'supertest';

describe('WaterController', () => {
  let app: INestApplication;
  let controller: WaterController;
  let repo: Repository<Water>;
  let service: WaterService;
  let testWater: Water;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WaterService,
        {
          provide: getRepositoryToken(Water),
          useClass: Repository,
        },
      ],
      controllers: [WaterController],
    }).compile();

    controller = module.get<WaterController>(WaterController);
    service = module.get<WaterService>(WaterService);
    repo = module.get<Repository<Water>>(getRepositoryToken(Water));
    testWater = {
      id: 1,
      date: new Date(),
      cubicmeter: 120,
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

  it('should return all Water on GET request', () => {
    jest.spyOn(service, 'waters').mockResolvedValueOnce([testWater]);
    request(app.getHttpServer()).get('/water').expect(200).expect([testWater]);
  });

  it('should return the posted Water on POST request', () => {
    jest.spyOn(service, 'create').mockResolvedValueOnce(testWater);
    request(app.getHttpServer())
      .post('/water')
      .send(testWater)
      .expect(201)
      .expect(testWater);
  });
});
