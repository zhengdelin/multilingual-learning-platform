import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { MoeDictType } from "./constants/types";
import { MoeDictService } from "./moe-dict.service";

const PAYLOAD_TYPES = {
  chinese: MoeDictType.CHINESE,
  minnan: MoeDictType.MINNAN,
  hakka: MoeDictType.HAKKA,
  bilateral: MoeDictType.BILATERAL,
};

type PayloadType = keyof typeof PAYLOAD_TYPES;

@Controller()
export class MoeDictController {
  constructor(private readonly moeDictService: MoeDictService) {}

  @MessagePattern({ cmd: "search" })
  search(@Payload("keyword") kw: string, @Payload("type") type: PayloadType) {
    return this.moeDictService.search(kw, PAYLOAD_TYPES[type]);
  }

  @MessagePattern({ cmd: "searchCategory" })
  async searchCategory(@Payload("category") category: string, @Payload("type") type: PayloadType) {
    return this.moeDictService.searchCategory(category, PAYLOAD_TYPES[type]);
  }

  @MessagePattern({ cmd: "getCategories" })
  async getCategories(@Payload("type") type: PayloadType) {
    return this.moeDictService.getCategories(PAYLOAD_TYPES[type]);
  }

  @MessagePattern({ cmd: "searchRadical" })
  async searchRadical(@Payload("radical") radical: string, @Payload("type") type: PayloadType) {
    return this.moeDictService.searchRadical(radical, PAYLOAD_TYPES[type]);
  }

  @MessagePattern({ cmd: "getRadicals" })
  async getChineseRadicals(@Payload("type") type: PayloadType) {
    return this.moeDictService.getRadicals(PAYLOAD_TYPES[type]);
  }

  @MessagePattern({ cmd: "getEntries" })
  async getEntries(@Payload("type") type: PayloadType) {
    return this.moeDictService.getEntries(PAYLOAD_TYPES[type]);
  }

  @MessagePattern({ cmd: "getXref" })
  async getXref(@Payload("type") type: PayloadType) {
    return this.moeDictService.getXref(PAYLOAD_TYPES[type]);
  }
}
