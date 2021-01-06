import { Test, TestingModule } from '@nestjs/testing';
import { OilController } from './oil.controller';

describe('OilController', () => {
  let controller: OilController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OilController],
    }).compile();

    controller = module.get<OilController>(OilController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
