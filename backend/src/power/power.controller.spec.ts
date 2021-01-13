import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Power } from 'src/entity/power.entity';
import { Repository } from 'typeorm';
import { PowerController } from './power.controller';
import { PowerService } from './power.service';

describe('PowerController', () => {
  let controller: PowerController;
  let service: PowerService;
  let repo: Repository<Power>;

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
});
