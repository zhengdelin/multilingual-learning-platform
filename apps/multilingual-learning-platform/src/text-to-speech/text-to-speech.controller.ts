import { Body, Controller, Get, Param, Post } from "@nestjs/common";
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
    return "Hello TextToSpeech!";
  }
  @Post()
  async textToSpeech(@Body("text") text: string, @Param("lang") lang: string) {
    return await this.cacheService.with(`tts:${lang}-${text}`, () => {
      return this.client.send({ cmd: "textToSpeech" }, { text, lang });
    });
  }
}
