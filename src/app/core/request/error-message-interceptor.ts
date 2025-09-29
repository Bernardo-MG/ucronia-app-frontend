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
        messageService.add({
          severity: 'error',
          summary: 'Fallo',
          detail: 'Error en la petición: ' + error.message,
          life: 3000
        });
        return throwError(() => error);
      })
    );
  };
};
