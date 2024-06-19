import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { SpeechToTextModule } from "./speech-to-text.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(SpeechToTextModule, {
    transport: Transport.TCP,
    options: {
      host: "0.0.0.0",
      port: +process.env.SPEECH_TO_TEXT_PORT,
    },
  });
  await app.listen();
}
bootstrap();
