import { Controller, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { Client, ClientProxy } from "@nestjs/microservices";
import { FileInterceptor } from "@nestjs/platform-express";
import * as fs from "fs";
import { firstValueFrom } from "rxjs";
import { MSSpeechToText } from "../common/constants/microservices";
import { SpeechToTextService } from "./speech-to-text.service";
@Controller(":lang/speech-to-text")
export class SpeechToTextController {
  @Client(MSSpeechToText)
  private readonly client: ClientProxy;

  constructor(private readonly speechToTextService: SpeechToTextService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      dest: "public/temp",
    }),
  )
  async transform(@UploadedFile() file: Express.Multer.File, @Param("lang") lang: string) {
    const path = file.path;
    const data = await firstValueFrom(this.client.send({ cmd: "speechToText" }, { filepath: path, lang }));

    // remove temp file
    fs.unlinkSync(path);
    return data;
  }
}
