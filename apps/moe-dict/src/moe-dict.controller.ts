import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { MoeDictType } from "./constants/types";
import { MoeDictService } from "./moe-dict.service";

const PAYLOAD_TYPES = {
  chinese: MoeDictType.CHINESE,
  minnan: MoeDictType.MINNAN,
  hakka: MoeDictType.HAKKA,
  bilateral: MoeDictType.BILATERAL,
  raw: MoeDictType.RAW,
};

type PayloadType = keyof typeof PAYLOAD_TYPES;
const MoeDictTypeToPayloadType = Object.entries(PAYLOAD_TYPES).reduce(
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {} as Record<MoeDictType, PayloadType>,
);

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
    const xref = await this.moeDictService.getXref(PAYLOAD_TYPES[type]);

    return Object.entries(xref).reduce(
      (acc, [key, value]) => {
        acc[MoeDictTypeToPayloadType[key]] = value;
        return acc;
      },
      {} as Record<PayloadType, any>,
    );
  }
}
