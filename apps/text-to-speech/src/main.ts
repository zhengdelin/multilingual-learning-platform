import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { TextToSpeechModule } from "./text-to-speech.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(TextToSpeechModule, {
    transport: Transport.TCP,
    options: {
      host: "0.0.0.0",
      port: +process.env.TEXT_TO_SPEECH_PORT,
    },
  });
  await app.listen();
}
bootstrap();
