import { Module } from "@nestjs/common";
import { SpeechToTextController } from "./speech-to-text.controller";
import { SpeechToTextService } from "./speech-to-text.service";

@Module({
  imports: [],
  controllers: [SpeechToTextController],
  providers: [SpeechToTextService],
})
export class SpeechToTextModule {}
