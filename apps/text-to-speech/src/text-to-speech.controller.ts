import { Controller } from "@nestjs/common";
import { Ctx, MessagePattern, Payload, RedisContext } from "@nestjs/microservices";
import { TextToSpeechLang } from "./common/constants/types";
import { TextToSpeechService } from "./text-to-speech.service";

@Controller()
export class TextToSpeechController {
  constructor(private readonly textToSpeechService: TextToSpeechService) {}

  @MessagePattern("textToSpeech")
  async textToSpeech(@Payload("text") text: string, @Payload("lang") lang: TextToSpeechLang, @Ctx() ctx: RedisContext) {
    console.log("ctx :>> ", ctx);
    // console.log(text, lang);
    await this.textToSpeechService.chineseEnglishToSpeech(text, lang);
    return 1;
    // if ([TextToSpeechLang.CHINESE, TextToSpeechLang.ENGLISH].includes(lang))

    return null;
  }
}
