import { Controller, Get, HttpException, HttpStatus, Inject, Param } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { catchError } from "rxjs";

enum Language {
  CHINESE = "chinese",
  MINNAN = "minnan",
  HAKKA = "hakka",
  BILATERAL = "bilateral",
}

// const languages = Object.values(Language);

const customCatchError = () =>
  catchError((err) => {
    throw new HttpException(err, err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR);
  });
@Controller(":lang")
export class AppController {
  @Inject("MOE_DICT")
  private readonly moeDictClient: ClientProxy;

  @Get("search/:keyword")
  search(@Param("lang") lang: Language, @Param("keyword") keyword: string) {
    return this.moeDictClient.send({ cmd: "search" }, { keyword, type: lang }).pipe(customCatchError());
  }

  @Get("categories")
  getCategories(@Param("lang") lang: Language) {
    return this.moeDictClient.send({ cmd: `getCategories` }, { type: lang }).pipe(customCatchError());
  }

  @Get("categories/:category")
  getItemsByCategory(@Param("lang") lang: Language, @Param("category") category: string) {
    return this.moeDictClient.send({ cmd: `searchCategory` }, { category, type: lang }).pipe(customCatchError());
  }

  @Get("proverbs")
  getProverbs(@Param("lang") lang: Language) {
    return this.moeDictClient
      .send({ cmd: `searchCategory` }, { type: lang, category: "諺語" })
      .pipe(customCatchError());
  }

  @Get("radicals")
  getRadicals(@Param("lang") lang: Language) {
    return this.moeDictClient.send({ cmd: `getRadicals` }, { type: lang }).pipe(customCatchError());
  }

  @Get("radicals/:radical")
  getItemsByRadical(@Param("lang") lang: Language, @Param("radical") radical: string) {
    return this.moeDictClient.send({ cmd: `searchRadical` }, { radical, type: lang }).pipe(customCatchError());
  }

  @Get("entries")
  getEntries(@Param("lang") lang: Language) {
    return this.moeDictClient.send({ cmd: `getEntries` }, { type: lang }).pipe(customCatchError());
  }
}
