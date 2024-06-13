import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { TextToSpeechModule } from "./text-to-speech.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(TextToSpeechModule, {
    transport: Transport.REDIS,
    options: {
      port: 3002,
    },
  });
  await app.listen();
}
bootstrap();
