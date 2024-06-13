import { HttpService } from "@nestjs/axios";
import { Test, TestingModule } from "@nestjs/testing";
import { MoeDictController } from "./moe-dict.controller";
import { MoeDictService } from "./moe-dict.service";

describe("MoeDictController", () => {
  let moeDictController: MoeDictController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MoeDictController],
      providers: [MoeDictService],
      imports: [HttpService],
    }).compile();

    moeDictController = app.get<MoeDictController>(MoeDictController);
  });

  describe("getChineseRadicals", () => {
    it("should return chinese radicals", () => {
      expect(moeDictController.getChineseRadicals()).toBeInstanceOf(Array);
    });
  });
});

// how to run this test
// npx jest apps/moe-dict/src/moe-dict.controller.spec.ts
