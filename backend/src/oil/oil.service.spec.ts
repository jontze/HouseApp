import { Test, TestingModule } from '@nestjs/testing';
import { OilService } from './oil.service';

describe('OilService', () => {
  let service: OilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OilService],
    }).compile();

    service = module.get<OilService>(OilService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
