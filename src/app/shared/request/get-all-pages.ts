import { Page } from '@bernardo-mg/request';
import { EMPTY, expand, Observable, reduce } from 'rxjs';

export function getAllPages<T>(
  loadPage: (page: number | undefined, size: number) => Observable<Page<T>>
): Observable<T[]> {
  const pageSize = 100;

  return loadPage(undefined, pageSize).pipe(
    expand(page => page.last ? EMPTY : loadPage(page.page + 1, pageSize)),
    reduce((items, page) => items.concat(page.content), [] as T[])
  );
}
