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
  async chineseEnglishToSpeech(text: string, lang: TextToSpeechLang) {
    // console.log("__dirname :>> ", __dirname);
    const audioFile = getSavePath(lang, `${text}.wav`);
    console.log("audioFile :>> ", audioFile);
    // This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
    const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.SPEECH_KEY, process.env.SPEECH_REGION);
    console.log(
      "🚀 ~ TextToSpeechService ~ chineseEnglishToSpeech ~ process.env.SPEECH_REGION:",
      process.env.SPEECH_REGION,
    );
    console.log("🚀 ~ TextToSpeechService ~ chineseEnglishToSpeech ~ process.env.SPEECH_KEY:", process.env.SPEECH_KEY);
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
        } else {
          console.error(
            "Speech synthesis canceled, " +
              result.errorDetails +
              "\nDid you set the speech resource key and region values?",
          );
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
  }
}
