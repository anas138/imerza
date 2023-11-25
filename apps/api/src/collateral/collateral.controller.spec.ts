import { Test, TestingModule } from '@nestjs/testing';
import { CollateralController } from './collateral.controller';

describe('CollateralController', () => {
  let controller: CollateralController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollateralController],
    }).compile();

    controller = module.get<CollateralController>(CollateralController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
