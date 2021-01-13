import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Power } from 'src/entity/power.entity';
import { Repository } from 'typeorm';
import { PowerService } from './power.service';

describe('PowerService', () => {
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
    }).compile();

    service = module.get<PowerService>(PowerService);
    repo = module.get<Repository<Power>>(getRepositoryToken(Power));
    testPower = {
      id: 1,
      date: new Date(),
      kwh: 8080,
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

  it('should return for powers', async () => {
    jest.spyOn(repo, 'find').mockResolvedValueOnce([testPower]);
    expect(await service.powers()).toEqual([testPower]);
  });

  it('should return for power', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(testPower);
    expect(await service.power('1')).toEqual(testPower);
  });

  it('should return created power', async () => {
    jest.spyOn(repo, 'save').mockResolvedValueOnce(testPower);
    expect(await service.create(testPower)).toEqual(testPower);
  });
});
