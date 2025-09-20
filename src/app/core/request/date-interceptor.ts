import { HttpEvent, HttpInterceptorFn, HttpResponse } from "@angular/common/http";
import { Observable, map } from "rxjs";


// Helper function to recursively convert ISO strings to Date
function reviveDates(obj: any): any {
  if (obj === null || obj === undefined) return obj;

  if (typeof obj === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/.test(obj)) {
    return new Date(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(reviveDates);
  }

  if (typeof obj === 'object') {
    for (const key of Object.keys(obj)) {
      obj[key] = reviveDates(obj[key]);
    }
    return obj;
  }

  return obj;
}

// Date interceptor
export const dateInterceptor = (): HttpInterceptorFn => {
  return (req, next): Observable<HttpEvent<any>> => {
    return next(req).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          // Recursively convert all ISO strings in the response body to Date
          const body = reviveDates(event.body);
          return event.clone({ body });
        }
        return event;
      })
    );
  };
};