import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { SpeechToTextController } from "./speech-to-text.controller";
import { SpeechToTextService } from "./speech-to-text.service";

describe("SpeechToTextController", () => {
  let speechToTextController: SpeechToTextController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SpeechToTextController],
      providers: [SpeechToTextService],
      imports: [ConfigModule.forRoot()],
    }).compile();

    speechToTextController = app.get<SpeechToTextController>(SpeechToTextController);
  });

  describe("root", () => {
    it('should return "Hello World!"', () => {
      expect(speechToTextController.speechToText("en-US")).toBe("hello");
    });
  });
});

// how to run this test
// npx jest apps/speech-to-text/src/speech-to-text.controller.spec.ts
