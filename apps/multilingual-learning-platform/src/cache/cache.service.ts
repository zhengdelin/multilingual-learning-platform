import { Injectable } from "@nestjs/common";
import { Client, ClientProxy } from "@nestjs/microservices";
import { defaultIfEmpty, firstValueFrom, Observable } from "rxjs";
import { MSCache } from "../common/constants/microservices";

interface CacheWithConfig {
  ttl?: number;
  transform?: (value: any) => any;
}

type CacheWithHandler = (setCache: (value: any, ttl?: number) => void) => any;

@Injectable()
export class CacheService {
  @Client(MSCache)
  private readonly client: ClientProxy;

  async get<T>(key: string) {
    return await firstValueFrom(this.client.send<T>({ cmd: "get" }, key).pipe(defaultIfEmpty(null)));
  }

  async set(key: string, value: any, ttl?: number) {
    await firstValueFrom(this.client.send({ cmd: "set" }, { key, value, ttl }).pipe(defaultIfEmpty(null)));
  }

  async getStore() {
    return await firstValueFrom(this.client.send({ cmd: "getStore" }, {}).pipe(defaultIfEmpty(null)));
  }

  async with(key: string, handler: CacheWithHandler, { ttl, transform = (value: any) => value }: CacheWithConfig = {}) {
    const cacheValue = await this.get(key);
    if (cacheValue) {
      console.log(`從快取取得 ${key}: ${cacheValue}`);
      return transform(cacheValue);
    }

    let setCache = async (value: any, ttl?: number) => {
      await this.set(key, value, ttl);
      setCache = null;
    };
    let value = await handler(setCache);

    // is rxjs observable
    if (value instanceof Observable) {
      value = await firstValueFrom(value);
    }

    if (setCache) {
      console.log(`設置快取 ${key}`, value);
      await setCache(value, ttl);
    }
    return transform(value);
  }

  reset() {
    return firstValueFrom(this.client.send({ cmd: "reset" }, {}));
  }

  del(key: string) {
    return firstValueFrom(this.client.send({ cmd: "del" }, key));
  }
}
