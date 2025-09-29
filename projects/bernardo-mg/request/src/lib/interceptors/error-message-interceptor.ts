import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorInterceptor = (): HttpInterceptorFn => {
  return (req, next) => {
    const messageService = inject(MessageService);

    return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Only show a toast if it's not a 4xx error
        if (error.status < 400 || error.status >= 500) {
          messageService.add({
            severity: 'error',
            summary: 'Fallo',
            detail: `Error en la petición (HTTP ${error.status}): ${error.message}`,
            life: 3000
          });
        }
        return throwError(() => error);
      })
    );
  };
};
