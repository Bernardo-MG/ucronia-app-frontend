import { PaginatedResponse } from "@bernardo-mg/request";
import { Observable, expand, of, reduce } from "rxjs";

export function getAllPages<T>(page : (number: number | undefined, size: number | undefined) => Observable<PaginatedResponse<T>>): Observable<T[]> {
    const pageSize = 100;

    return page(1, pageSize)
      .pipe(
        expand(response => {
          if (!response.last) {
            const nextPage = response.page + 1;
            return page(nextPage, pageSize);
          }
          return of();
        }),
        // accumulate from all pages into one array
        reduce((data: T[], res?: PaginatedResponse<T>) => {
          return res ? [...data, ...res.content] : data;
        }, [])
      );
}