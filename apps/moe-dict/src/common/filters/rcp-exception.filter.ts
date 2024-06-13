import { Catch, HttpStatus, RpcExceptionFilter } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { ApiResponse } from "apps/multilingual-learning-platform/src/dto/api-response.dto";
import { AxiosError } from "axios";
import { Observable, throwError } from "rxjs";

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException): Observable<ApiResponse<any>> {
    console.log("ExceptionFilter");

    return throwError(() => {
      const err = exception.getError();
      if (err instanceof AxiosError) {
        const statusCode = err.response.status;
        let message = err.message;
        if (statusCode === HttpStatus.NOT_FOUND) {
          message = "查無資料";
        }

        return {
          message,
          statusCode,
        };
      }

      if (typeof err === "string") {
        return {
          message: err,
          statusCode: 500,
        };
      }

      if (err instanceof Error) {
        return {
          message: err.message,
          statusCode: 500,
        };
      }

      console.log(err);
      return err;
    });
  }
}
