import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";

const BASE_URL = "https://www.moedict.tw";
@Injectable()
export class ZhTwService {
  constructor(private readonly httpService: HttpService) {}
  async search(kw: string) {
    const { data } = await firstValueFrom(this.httpService.get(`${BASE_URL}/a/${kw}.json`));
    return data;
  }
}
