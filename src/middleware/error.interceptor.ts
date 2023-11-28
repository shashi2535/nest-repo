import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface IcustomeResponse<T> {
  statusCode: number;
  result: T;
  error?: T;
}

@Injectable()
export class ResponseHandlerInterceptor<T>
  implements NestInterceptor<T, IcustomeResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IcustomeResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        const statusCode = data?.statusCode
          ? data?.statusCode
          : data?.data
            ? 200
            : 400;
        context.switchToHttp().getResponse().statusCode = statusCode;
        return {
          statusCode,
          message: data?.message,
          ...(data?.data && { result: data?.data }),
        };
      }),
    );
  }
}
