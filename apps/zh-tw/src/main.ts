import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { ExceptionFilter } from "./common/filters/rcp-exception.filter";
import { ZhTwModule } from "./zh-tw.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ZhTwModule, {
    transport: Transport.TCP,
    options: {
      port: 3001,
    },
  });
  app.useGlobalFilters(new ExceptionFilter());
  await app.listen();
}
bootstrap();
