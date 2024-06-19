import { ClientOptions, Transport } from "@nestjs/microservices";

export const MSMoeDict: ClientOptions = {
  //   name: "MOE_DICT",
  transport: Transport.TCP,
  options: {
    host: process.env.MOE_DICT_HOST,
    port: +process.env.MOE_DICT_PORT,
  },
};

export const MSTextToSpeech: ClientOptions = {
  // name: "TEXT_TO_SPEECH",
  transport: Transport.TCP,
  options: {
    host: process.env.TEXT_TO_SPEECH_HOST,
    port: +process.env.TEXT_TO_SPEECH_PORT,
  },
};

export const MSCache: ClientOptions = {
  transport: Transport.TCP,
  options: {
    host: process.env.CACHE_HOST,
    port: +process.env.CACHE_PORT,
  },
};

export const MSSpeechToText: ClientOptions = {
  transport: Transport.TCP,
  options: {
    host: process.env.SPEECH_TO_TEXT_HOST,
    port: +process.env.SPEECH_TO_TEXT_PORT,
  },
};
