import { Injectable } from "@nestjs/common";
import { readFileSync } from "fs";

import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { join } from "path";

const langMap = {
  chinese: "zh-TW",
  english: "en-US",
};
@Injectable()
export class SpeechToTextService {
  private speechConfig: sdk.SpeechConfig;
  constructor() {
    this.speechConfig = sdk.SpeechConfig.fromSubscription(process.env.SPEECH_KEY, process.env.SPEECH_REGION);
  }
  recognizeFromFile(lang: string, filepath: string) {
    // return join(process.cwd(), filepath);

    // console.log("file, lang :>> ", file, lang);
    return new Promise<string>((resolve, reject) => {
      // const fullFilepath =
      //   "C:\\coding\\multilingual-learning-platform\\multilingual-learning-platform\\public\\temp\\ed3c5f6e39c51bb8917a6e688972e709.wav";
      const fullFilepath = join(process.cwd(), filepath);
      this.speechConfig.speechRecognitionLanguage = langMap[lang] || "zh-TW";
      const audioConfig = sdk.AudioConfig.fromWavFileInput(readFileSync(fullFilepath));
      const speechRecognizer = new sdk.SpeechRecognizer(this.speechConfig, audioConfig);
      speechRecognizer.recognizeOnceAsync((result) => {
        switch (result.reason) {
          case sdk.ResultReason.RecognizedSpeech:
            console.log(`成功辨識文字: ${result.text}`);
            resolve(result.text);
            break;
          case sdk.ResultReason.NoMatch:
            console.log("沒有匹配: 無法辨識語音。");
            resolve("");
            break;
          case sdk.ResultReason.Canceled:
            const cancellation = sdk.CancellationDetails.fromResult(result);
            console.log(`已取消: 原因=${cancellation.reason}`);

            if (cancellation.reason == sdk.CancellationReason.Error) {
              console.log(`已取消: 錯誤代碼=${cancellation.ErrorCode}`);
              console.log(`已取消: 錯誤信息=${cancellation.errorDetails}`);
              console.log("已取消: 請檢查您的環境變數(resource key and region values)");
            }
            resolve("");
            break;
          default:
            console.log("result :>> ", result);
            reject(result);
        }
        speechRecognizer.close();
      });
    });
  }
}
