import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CacheModule } from "./cache/cache.module";
import { LoggerMiddleware } from "./common/middleware/logger.middleware";
import { MoeDictModule } from "./moe-dict/moe-dict.module";
import { SpeechToTextModule } from "./speech-to-text/speech-to-text.module";
import { TextToSpeechModule } from "./text-to-speech/text-to-speech.module";

@Module({
  imports: [
    MoeDictModule,
    TextToSpeechModule,
    CacheModule,
    SpeechToTextModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "public"),
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
