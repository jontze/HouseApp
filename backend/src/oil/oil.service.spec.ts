import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Oil } from 'src/entity/oil.entity';
import { Repository } from 'typeorm';
import { OilService } from './oil.service';

describe('OilService', () => {
  let service: OilService;
  let repo: Repository<Oil>;
  let testOil: Oil;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OilService,
        {
          // how you provide the injection token in a test instance
          provide: getRepositoryToken(Oil),
          // as a class value, Repository needs no generics
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<OilService>(OilService);
    // Save the instance of the repository and set the correct generics
    repo = module.get<Repository<Oil>>(getRepositoryToken(Oil));
    testOil = {
      id: 1,
      date: new Date(),
      filled: 120,
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

  it('should return for oils', async () => {
    // mock file for reuse
    // notice we are pulling the repo variable and using jest.spyOn with no issues
    jest.spyOn(repo, 'find').mockResolvedValueOnce([testOil]);
    expect(await service.oils()).toEqual([testOil]);
  });

  it('should return for oil', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(testOil);
    expect(await service.oil('sdfsdf')).toEqual(testOil);
  });

  it('should return for create', async () => {
    jest.spyOn(repo, 'save').mockResolvedValueOnce(testOil);
    expect(await service.create(testOil)).toEqual(testOil);
  });
});
