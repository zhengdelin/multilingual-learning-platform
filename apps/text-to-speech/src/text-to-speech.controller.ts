import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { TextToSpeechLang } from "./common/constants/types";
import { TextToSpeechService } from "./text-to-speech.service";

// async function withCache({
//   cache,
//   key,
//   transform = (value: any) => value,
//   handler,
// }: {
//   cache: Cache;
//   key: string;
//   transform?: (value: any) => any;
//   handler: (setCache: (value: any, tts?: Milliseconds) => void, removeCache: () => void, resetAll: () => void) => any;
// }) {
//   const cacheValue = await cache.get(key);
//   if (cacheValue) {
//     return transform(cacheValue);
//   }

//   const value = await handler(
//     cache.set.bind(cache, key),
//     // (value, tts = undefined) => {
//     //   cache.set(key, value, tts);
//     // },
//     () => cache.del(key),
//     () => cache.reset(),
//   );
//   return transform(value);
// }

@Controller()
export class TextToSpeechController {
  constructor(private readonly textToSpeechService: TextToSpeechService) {}

  @MessagePattern({ cmd: "textToSpeech" })
  async transformTextToSpeech(@Payload("text") text: string, @Payload("lang") lang: TextToSpeechLang) {
    const audioFile = await this.textToSpeechService.transformTextToSpeech(text, lang);
    return audioFile;
  }
}
