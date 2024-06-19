import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CacheService } from "./cache.service";

@Controller("cache")
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}
  @Post("reset")
  reset() {
    return this.cacheService.reset();
  }

  @Post("set/:key")
  set(@Param("key") key: string, @Body("value") value: any, @Body("ttl") ttl?: number) {
    return this.cacheService.set(key, value, ttl);
  }

  @Get("store")
  store() {
    return this.cacheService.getStore();
  }

  @Get(":key")
  get(@Param("key") key: string) {
    return this.cacheService.get(key);
  }
}
