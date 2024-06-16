import { Controller, Get, Param, Post } from "@nestjs/common";
import { CacheService } from "./cache.service";

@Controller("cache")
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}
  @Post("reset")
  reset() {
    return this.cacheService.reset();
  }

  @Get(":key")
  get(@Param("key") key: string) {
    return this.cacheService.get(key);
  }
}
