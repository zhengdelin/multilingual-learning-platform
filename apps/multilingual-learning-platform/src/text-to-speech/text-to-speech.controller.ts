import { Controller, Get, Param } from "@nestjs/common";
import { Client, ClientProxy } from "@nestjs/microservices";
import { CacheService } from "../cache/cache.service";
import { MSTextToSpeech } from "../common/constants/microservices";

@Controller(":lang/text-to-speech")
export class TextToSpeechController {
  @Client(MSTextToSpeech)
  private readonly client: ClientProxy;
  constructor(private readonly cacheService: CacheService) {}

  @Get()
  test() {
    return "text success";
  }
  @Get(":text")
  async textToSpeech(@Param("text") text: string, @Param("lang") lang: string) {
    return await this.cacheService.with(`tts:${lang}-${text}`, () => {
      return this.client.send({ cmd: "textToSpeech" }, { text, lang });
    });
  }
}
