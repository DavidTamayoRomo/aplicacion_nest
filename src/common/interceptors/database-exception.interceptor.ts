import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { catchError, Observable, throwError } from 'rxjs';
  
  @Injectable()
  export class DatabaseExceptionInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        catchError((err) => {
          if (err.name === 'ConnectionError' || err.name === 'TypeORMError') {
            // Customize the error message and status code as needed
            return throwError(
              () =>
                new HttpException(
                  'Could not connect to the database. Please try again later.',
                  HttpStatus.SERVICE_UNAVAILABLE,
                ),
            );
          }
          return throwError(() => err);
        }),
      );
    }
  }