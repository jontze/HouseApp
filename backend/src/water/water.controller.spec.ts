import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Water } from 'src/entity/water.entity';
import { Repository } from 'typeorm';
import { WaterController } from './water.controller';
import { WaterService } from './water.service';

describe('WaterController', () => {
  let controller: WaterController;
  let repo: Repository<Water>;
  let service: WaterService;

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
});
