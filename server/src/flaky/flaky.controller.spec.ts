import { Test, TestingModule } from '@nestjs/testing';
import { FlakyController } from './flaky.controller';

describe('Flaky Controller', () => {
  let controller: FlakyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlakyController],
    }).compile();

    controller = module.get<FlakyController>(FlakyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
