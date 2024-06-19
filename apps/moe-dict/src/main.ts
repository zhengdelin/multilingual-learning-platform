import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { ExceptionFilter } from "./common/filters/rcp-exception.filter";
import { MoeDictModule } from "./moe-dict.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(MoeDictModule, {
    transport: Transport.TCP,
    options: {
      host: "0.0.0.0",
      port: +process.env.MOE_DICT_PORT,
    },
  });
  app.useGlobalFilters(new ExceptionFilter());
  await app.listen();
}
bootstrap();
