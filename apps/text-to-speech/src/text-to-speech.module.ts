import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-store";
import { TextToSpeechController } from "./text-to-speech.controller";
import { TextToSpeechService } from "./text-to-speech.service";
@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore as any,
        host: configService.get("REDIS_HOST"),
        port: configService.get("REDIS_PORT"),
        ttl: configService.get("REDIS_TTL"),
      }),
    }),
  ],
  controllers: [TextToSpeechController],
  providers: [TextToSpeechService],
})
export class TextToSpeechModule {}
