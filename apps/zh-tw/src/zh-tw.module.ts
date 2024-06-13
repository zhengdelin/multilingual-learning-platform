import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ZhTwController } from "./zh-tw.controller";
import { ZhTwService } from "./zh-tw.service";

@Module({
  imports: [HttpModule],
  controllers: [ZhTwController],
  providers: [ZhTwService],
})
export class ZhTwModule {}
