import { Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { catchError, of } from "rxjs";

@Injectable()
export class AppService {
  send<T>(client: ClientProxy, pattern: any, data: any) {
    return client.send<T>(pattern, data).pipe(
      catchError((err) => {
        return of(err);
      }),
    );
  }
}
