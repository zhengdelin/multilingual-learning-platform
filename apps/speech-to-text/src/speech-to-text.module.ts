import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SpeechToTextController } from "./speech-to-text.controller";
import { SpeechToTextService } from "./speech-to-text.service";

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [SpeechToTextController],
  providers: [SpeechToTextService],
})
export class SpeechToTextModule {}
