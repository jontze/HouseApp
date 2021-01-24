import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Water } from '../entity/water.entity';
import { Repository } from 'typeorm';
import { WaterService } from './water.service';

describe('WaterService', () => {
  let service: WaterService;
  let repo: Repository<Water>;
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
    }).compile();

    service = module.get<WaterService>(WaterService);
    repo = module.get<Repository<Water>>(getRepositoryToken(Water));
    testWater = {
      id: 1,
      date: new Date(),
      cubicmeter: 120,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('repo should be defined', () => {
    expect(repo).toBeDefined();
  });

  it('should return Water for waters', async () => {
    jest.spyOn(repo, 'find').mockResolvedValueOnce([testWater]);
    expect(await service.waters()).toEqual([testWater]);
  });

  it('should return Water for water', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(testWater);
    expect(await service.water('1')).toEqual(testWater);
  });

  it('should return created water', async () => {
    jest.spyOn(repo, 'save').mockResolvedValueOnce(testWater);
    expect(await service.create(testWater)).toEqual(testWater);
  });
});
