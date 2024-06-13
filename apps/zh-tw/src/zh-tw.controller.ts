import { Controller } from "@nestjs/common";
import { MessagePattern, Payload, RpcException } from "@nestjs/microservices";
import { ZhTwService } from "./zh-tw.service";

@Controller()
export class ZhTwController {
  constructor(private readonly zhTwService: ZhTwService) {}

  @MessagePattern("search")
  async search(@Payload("keyword") kw: string) {
    try {
      return await this.zhTwService.search(kw);
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
