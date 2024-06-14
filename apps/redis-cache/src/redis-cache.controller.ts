import { Controller, Logger } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { RedisCacheService } from "./redis-cache.service";

const log = (text: string) => Logger.log(text, "MSRedisCache");
@Controller()
export class RedisCacheController {
  constructor(private readonly redisCacheService: RedisCacheService) {}

  @MessagePattern({ cmd: "get" })
  get(@Payload() key: string) {
    log(`Get Key: ${key}`);
    return this.redisCacheService.get(key);
  }

  @MessagePattern({ cmd: "set" })
  set(@Payload("key") key: string, @Payload("value") value: any, @Payload("ttl") ttl?: number) {
    log(`Set Key: ${key}, Value: ${value}, TTL: ${ttl}`);
    return this.redisCacheService.set(key, value, ttl);
  }

  @MessagePattern({ cmd: "del" })
  del(@Payload() key: string) {
    log(`Del Key: ${key}`);
    return this.redisCacheService.del(key);
  }

  @MessagePattern({ cmd: "reset" })
  reset() {
    log(`Reset`);
    return this.redisCacheService.reset();
  }
}
