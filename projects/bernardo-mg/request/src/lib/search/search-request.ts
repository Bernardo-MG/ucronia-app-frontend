import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, defer, EMPTY, Observable, of, startWith, Subject, takeUntil } from 'rxjs';

/** A separate instance owns each autocomplete field's pending read. */
export class SearchRequest {

  private readonly destroyRef = inject(DestroyRef);
  private readonly cancelled = new Subject<void>();

  public cancel(): void {
    this.cancelled.next();
  }

  public search<T>(
    value: string,
    load: (query: string) => Observable<T[]>,
    onError: (error: unknown) => void = () => undefined
  ): Observable<T[]> {
    this.cancel();
    const query = value.trim();

    return defer(() => query ? load(query) : EMPTY).pipe(
      catchError(error => {
        onError(error);
        return of([] as T[]);
      }),
      startWith([] as T[]),
      takeUntil(this.cancelled),
      takeUntilDestroyed(this.destroyRef)
    );
  }

}
