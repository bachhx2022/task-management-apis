import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class GlobalErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const logger = new Logger('GlobalErrorInterceptor');

    return next.handle().pipe(
      catchError((error) => {
        logger.error(error);
        return throwError(() =>
          error instanceof HttpException
            ? throwError(() => error)
            : new InternalServerErrorException(error.message)
        );
      })
    );
  }
}
