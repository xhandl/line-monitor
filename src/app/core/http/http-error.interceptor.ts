import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { LoggerService } from '../logging/logger.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const logger = inject(LoggerService);

  return next(req).pipe(
    tap({
      error: (error: unknown) => {
        if (error instanceof HttpErrorResponse) {
          logger.error(
            `HTTP ${req.method} ${req.urlWithParams} failed with ${error.status}`,
            error,
          );
        }
      },
    }),
  );
};
