import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MoeDictController } from "./moe-dict.controller";
import { MoeDictService } from "./moe-dict.service";

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  controllers: [MoeDictController],
  providers: [MoeDictService],
})
export class MoeDictModule {}
