import { Test, TestingModule } from '@nestjs/testing';
import { TransformationController } from './transformation.controller';

describe('Transformation Controller', () => {
  let controller: TransformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransformationController],
    }).compile();

    controller = module.get<TransformationController>(TransformationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
