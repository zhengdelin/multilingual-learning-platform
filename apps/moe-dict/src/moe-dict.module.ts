import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { MoeDictController } from "./moe-dict.controller";
import { MoeDictService } from "./moe-dict.service";

@Module({
  imports: [HttpModule],
  controllers: [MoeDictController],
  providers: [MoeDictService],
})
export class MoeDictModule {}
