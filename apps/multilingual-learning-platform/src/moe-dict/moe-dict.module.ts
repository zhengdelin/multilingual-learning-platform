import { Module } from "@nestjs/common";
import { MoeDictController } from "./moe-dict.controller";

@Module({
  imports: [],
  controllers: [MoeDictController],
  providers: [],
})
export class MoeDictModule {}
