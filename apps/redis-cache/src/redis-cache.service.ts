import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  get(key: string) {
    return this.cache.get(key);
  }

  set(key: string, value: any, ttl?: number) {
    return this.cache.set(key, value, ttl);
  }

  del(key: string) {
    return this.cache.del(key);
  }

  reset() {
    return this.cache.reset();
  }
}
