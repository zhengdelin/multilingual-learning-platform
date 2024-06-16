import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { SpeechToTextModule } from "./speech-to-text.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(SpeechToTextModule, {
    transport: Transport.TCP,
    options: {
      port: 3003,
    },
  });
  await app.listen();
}
bootstrap();
