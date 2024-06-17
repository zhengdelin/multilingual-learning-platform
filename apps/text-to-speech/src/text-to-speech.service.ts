import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { join } from "path";
import { v4 as uuidV4 } from "uuid";
import { TextToSpeechLang } from "./common/constants/types";

function getSavePath(lang: TextToSpeechLang, fullFilename: string) {
  const relativeDirPath = `audio/${lang}`;
  const absoluteDirPath = join(process.cwd(), `public/${relativeDirPath}`);
  if (!fs.existsSync(absoluteDirPath)) fs.mkdirSync(absoluteDirPath, { recursive: true });

  return {
    absolute: join(absoluteDirPath, fullFilename),
    relative: join(relativeDirPath, fullFilename),
  };
}

@Injectable()
export class TextToSpeechService {
  private speechConfig: sdk.SpeechConfig;
  constructor() {
    this.speechConfig = sdk.SpeechConfig.fromSubscription(process.env.SPEECH_KEY, process.env.SPEECH_REGION);
  }
  transformTextToSpeech(text: string, lang: TextToSpeechLang) {
    return new Promise<string>((resolve, reject) => {
      const filename = `${uuidV4()}.wav`;
      const { absolute: audioFile, relative: relativeAudioFile } = getSavePath(lang, filename);
      // This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
      const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audioFile);

      // The language of the voice that speaks.
      this.speechConfig.speechSynthesisVoiceName = "en-US-AvaMultilingualNeural";
      // Create the speech synthesizer.
      let synthesizer = new sdk.SpeechSynthesizer(this.speechConfig, audioConfig);

      synthesizer.speakTextAsync(
        text,
        function (result) {
          if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
            console.log(`語音生成完畢: ${audioFile}`);
            resolve(relativeAudioFile);
          } else {
            console.error(`語音生成錯誤，${result.errorDetails}，請檢查您的環境變數(resource key and region values)。`);
            reject();
          }
          synthesizer.close();
          synthesizer = null;
        },
        function (err) {
          console.trace("err - " + err);
          synthesizer.close();
          synthesizer = null;
        },
      );
      console.log("正在生成語音: " + audioFile);
    });
  }
}
