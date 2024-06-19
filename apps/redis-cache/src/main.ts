import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { RedisCacheModule } from "./redis-cache.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(RedisCacheModule, {
    transport: Transport.TCP,
    options: {
      host: "0.0.0.0",
      port: +process.env.CACHE_PORT,
    },
  });
  await app.listen();
}
bootstrap();
