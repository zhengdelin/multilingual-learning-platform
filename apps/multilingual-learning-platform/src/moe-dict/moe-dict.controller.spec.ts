import { Test, TestingModule } from "@nestjs/testing";
import { MoeDictController } from "./moe-dict.controller";

describe("MoeDictController", () => {
  let controller: MoeDictController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoeDictController],
    }).compile();

    controller = module.get<MoeDictController>(MoeDictController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
