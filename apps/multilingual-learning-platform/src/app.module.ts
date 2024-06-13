import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { LoggerMiddleware } from "apps/global/common/middleware/logger.middleware";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TextToSpeechController } from "./text-to-speech/text-to-speech.controller";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "MOE_DICT",
        transport: Transport.TCP,
        options: {
          port: 3001,
        },
      },
      {
        name: "TEXT_TO_SPEECH",
        transport: Transport.REDIS,
        options: {
          port: 3002,
        },
      },
    ]),
  ],
  controllers: [AppController, TextToSpeechController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
