import { Module } from "@nestjs/common";
import { CacheModule } from "../cache/cache.module";
import { TextToSpeechController } from "./text-to-speech.controller";

@Module({
  imports: [CacheModule],
  controllers: [TextToSpeechController],
  providers: [],
})
export class TextToSpeechModule {}
