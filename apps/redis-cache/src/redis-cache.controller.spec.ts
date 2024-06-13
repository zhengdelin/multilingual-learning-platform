import { Test, TestingModule } from '@nestjs/testing';
import { RedisCacheController } from './redis-cache.controller';
import { RedisCacheService } from './redis-cache.service';

describe('RedisCacheController', () => {
  let redisCacheController: RedisCacheController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RedisCacheController],
      providers: [RedisCacheService],
    }).compile();

    redisCacheController = app.get<RedisCacheController>(RedisCacheController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(redisCacheController.getHello()).toBe('Hello World!');
    });
  });
});
