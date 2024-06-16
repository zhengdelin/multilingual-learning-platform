import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { MoeDictType } from "./constants/types";

const BASE_URL = "https://www.moedict.tw";
@Injectable()
export class MoeDictService {
  constructor(private readonly httpService: HttpService) {}
  async search(kw: string, type: MoeDictType) {
    try {
      const { data } = await firstValueFrom(this.httpService.get(`${BASE_URL}/${type}/${kw}.json`));
      return data;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  async searchCategory(category: string, type: MoeDictType) {
    try {
      const { data } = await firstValueFrom(this.httpService.get(`${BASE_URL}/${type}/=${category}.json`));
      return data;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  async getCategories(type: MoeDictType) {
    try {
      const { data } = await firstValueFrom(this.httpService.get(`${BASE_URL}/${type}/=.json`));
      return data;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  async searchRadical(radical: string, type: MoeDictType) {
    try {
      const { data } = await firstValueFrom(this.httpService.get(`${BASE_URL}/${type}/@${radical}.json`));
      return data;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  async getRadicals(type: MoeDictType) {
    try {
      const { data } = await firstValueFrom(this.httpService.get(`${BASE_URL}/${type}/@.json`));
      return data;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  async getEntries(type: MoeDictType) {
    try {
      const { data } = await firstValueFrom(this.httpService.get(`${BASE_URL}/${type}/index.json`));
      return data;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  async getXref(type: MoeDictType) {
    try {
      const { data } = await firstValueFrom(this.httpService.get(`${BASE_URL}/${type}/xref.json`));
      return data;
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
