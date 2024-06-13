import { NestFactory } from '@nestjs/core';
import { RedisCacheModule } from './redis-cache.module';

async function bootstrap() {
  const app = await NestFactory.create(RedisCacheModule);
  await app.listen(3000);
}
bootstrap();
