import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { Client, ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
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
  async textToSpeech(@Req() request, @Body("text") text: string, @Param("lang") lang: string) {
    return await this.cacheService.with(
      `tts:${lang}-${text.toLowerCase()}`,
      async () => {
        const path = await firstValueFrom(this.client.send({ cmd: "textToSpeech" }, { text, lang }));
        // const path = "audio\\chinese\\5d7c5e05-f136-48f4-aa82-4c23ba198326.wav";
        return path;
      },
      {
        transform(path) {
          const url = new URL(path, request.protocol + "://" + request.get("Host"));
          return url.href;
        },
      },
    );
  }
}
