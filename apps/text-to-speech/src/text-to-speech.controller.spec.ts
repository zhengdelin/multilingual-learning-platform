import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { TextToSpeechLang } from "./common/constants/types";
import { TextToSpeechController } from "./text-to-speech.controller";
import { TextToSpeechService } from "./text-to-speech.service";

describe("TextToSpeechController", () => {
  let textToSpeechController: TextToSpeechController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TextToSpeechController],
      providers: [TextToSpeechService],
      imports: [ConfigModule.forRoot()],
    }).compile();

    textToSpeechController = app.get<TextToSpeechController>(TextToSpeechController);
  });

  describe("root", () => {
    it('should return "Hello World!"', () => {
      expect(textToSpeechController.transformTextToSpeech("test", TextToSpeechLang.CHINESE)).toBe("txt");
    });
  });
});

// how to run this test
// npx jest apps/text-to-speech/src/text-to-speech.controller.spec.ts
