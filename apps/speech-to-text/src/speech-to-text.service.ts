import { Injectable } from "@nestjs/common";

import * as fs from "fs";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { join } from "path";
@Injectable()
export class SpeechToTextService {
  private speechConfig: sdk.SpeechConfig;
  constructor() {
    this.speechConfig = sdk.SpeechConfig.fromSubscription(process.env.SPEECH_KEY, process.env.SPEECH_REGION);
  }
  recognizeFromFile(lang: string) {
    return new Promise<string>((resolve, reject) => {
      this.speechConfig.speechRecognitionLanguage = lang;
      const audioConfig = sdk.AudioConfig.fromWavFileInput(
        fs.readFileSync(join(process.cwd(), "public/audio/chinese/f552e9f2-423f-43a7-8268-985e3f4f8fd2.wav")),
      );
      const speechRecognizer = new sdk.SpeechRecognizer(this.speechConfig, audioConfig);

      speechRecognizer.recognizeOnceAsync((result) => {
        switch (result.reason) {
          case sdk.ResultReason.RecognizedSpeech:
            console.log(`成功辨識文字: ${result.text}`);
            resolve(result.text);
            break;
          case sdk.ResultReason.NoMatch:
            console.log("沒有匹配: 無法辨識語音。");
            break;
          case sdk.ResultReason.Canceled:
            const cancellation = sdk.CancellationDetails.fromResult(result);
            console.log(`已取消: 原因=${cancellation.reason}`);

            if (cancellation.reason == sdk.CancellationReason.Error) {
              console.log(`已取消: 錯誤代碼=${cancellation.ErrorCode}`);
              console.log(`已取消: 錯誤信息=${cancellation.errorDetails}`);
              console.log("已取消: 請檢查您的環境變數(resource key and region values)");
            }
            break;
        }
        speechRecognizer.close();
      });
    });
  }
}
