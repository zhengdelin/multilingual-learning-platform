import { ClientOptions, Transport } from "@nestjs/microservices";

export const MSMoeDict: ClientOptions = {
  //   name: "MOE_DICT",
  transport: Transport.TCP,
  options: {
    port: 3001,
  },
};

export const MSTextToSpeech: ClientOptions = {
  // name: "TEXT_TO_SPEECH",
  transport: Transport.TCP,
  options: {
    port: 3002,
  },
};
