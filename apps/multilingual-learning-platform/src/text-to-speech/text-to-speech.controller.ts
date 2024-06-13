import { Controller, Get, Param } from "@nestjs/common";
import { Client, ClientProxy } from "@nestjs/microservices";
import { MSTextToSpeech } from "../common/constants/microservices";

@Controller(":lang/text-to-speech")
export class TextToSpeechController {
  @Client(MSTextToSpeech)
  private readonly client: ClientProxy;

  @Get()
  test() {
    return "text success";
  }
  @Get(":text")
  textToSpeech(@Param("text") text: string, @Param("lang") lang: string) {
    return this.client.send("textToSpeech", { text, lang });
  }
}
