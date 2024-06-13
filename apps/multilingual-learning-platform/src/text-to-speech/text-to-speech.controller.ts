import { Controller, Get, Inject, Param } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Controller(":lang/text-to-speech")
export class TextToSpeechController {
  @Inject("TEXT_TO_SPEECH")
  private readonly ttsClient: ClientProxy;

  @Get()
  test() {
    return "text success";
  }
  @Get(":text")
  textToSpeech(@Param("text") text: string, @Param("lang") lang: string) {
    return this.ttsClient.send("textToSpeech", { text, lang });
  }
}
