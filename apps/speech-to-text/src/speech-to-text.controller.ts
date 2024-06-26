import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { SpeechToTextService } from "./speech-to-text.service";

@Controller()
export class SpeechToTextController {
  constructor(private readonly speechToTextService: SpeechToTextService) {}

  @MessagePattern({ cmd: "speechToText" })
  async speechToText(
    @Payload("lang") lang: string,
    @Payload("file") file: Express.Multer.File,
    @Payload("filepath") filepath: string,
  ) {
    return await this.speechToTextService.recognizeFromFile(lang, filepath);
  }
}
