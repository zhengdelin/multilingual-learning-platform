import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { ExceptionFilter } from "./common/filters/rcp-exception.filter";
import { MoeDictModule } from "./moe-dict.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(MoeDictModule, {
    transport: Transport.TCP,
    options: {
      port: 3001,
    },
  });
  app.useGlobalFilters(new ExceptionFilter());
  await app.listen();
}
bootstrap();
