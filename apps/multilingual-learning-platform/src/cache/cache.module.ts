import { Module } from "@nestjs/common";
import { CacheController } from "./cache.controller";
import { CacheService } from "./cache.service";

@Module({
  imports: [],
  providers: [CacheService],
  exports: [CacheService],
  controllers: [CacheController],
})
export class CacheModule {}
