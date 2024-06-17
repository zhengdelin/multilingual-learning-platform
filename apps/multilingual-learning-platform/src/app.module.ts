import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CacheModule } from "./cache/cache.module";
import { LoggerMiddleware } from "./common/middleware/logger.middleware";
import { MoeDictModule } from "./moe-dict/moe-dict.module";
import { TextToSpeechModule } from "./text-to-speech/text-to-speech.module";

@Module({
  imports: [
    MoeDictModule,
    TextToSpeechModule,
    CacheModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "public"),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
