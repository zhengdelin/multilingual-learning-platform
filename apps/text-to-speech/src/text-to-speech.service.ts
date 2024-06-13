import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { join } from "path";
import { TextToSpeechLang } from "./common/constants/types";

function getSavePath(lang: TextToSpeechLang, fullFilename: string) {
  const path = join(process.cwd(), `public/audio/${lang}`);
  if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });

  return `${path}/${fullFilename}`;
}

@Injectable()
export class TextToSpeechService {
  transformTextToSpeech(text: string, lang: TextToSpeechLang) {
    return new Promise<string>((resolve, reject) => {
      const audioFile = getSavePath(lang, `${text}.wav`);
      // This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
      const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.SPEECH_KEY, process.env.SPEECH_REGION);
      const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audioFile);

      // The language of the voice that speaks.
      speechConfig.speechSynthesisVoiceName = "en-US-AvaMultilingualNeural";
      // Create the speech synthesizer.
      let synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

      synthesizer.speakTextAsync(
        text,
        function (result) {
          if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
            console.log("synthesis finished.");
            resolve(audioFile);
          } else {
            console.error(
              "Speech synthesis canceled, " +
                result.errorDetails +
                "\nDid you set the speech resource key and region values?",
            );
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
      console.log("Now synthesizing to: " + audioFile);
    });
  }
}
