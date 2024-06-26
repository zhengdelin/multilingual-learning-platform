import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.on("finish", () => {
      // console.log(`${req.method} ${req.url} ${res.statusCode}`);
      Logger.log(`${req.method} ${req.url} ${res.statusCode}`, "HTTP");
    });
    next();
  }
}
