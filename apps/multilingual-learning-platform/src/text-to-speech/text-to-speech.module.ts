import { Module } from "@nestjs/common";
import { TextToSpeechController } from "./text-to-speech.controller";

@Module({
  imports: [],
  controllers: [TextToSpeechController],
  providers: [],
})
export class TextToSpeechModule {}
