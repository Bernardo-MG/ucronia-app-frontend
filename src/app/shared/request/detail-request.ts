import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MonoTypeOperatorFunction, pipe, Subject, takeUntil } from 'rxjs';

/** One cancellation scope for the detail reads belonging to a drawer. */
export class DetailRequest {

  private readonly destroyRef = inject(DestroyRef);
  private readonly cancelled = new Subject<void>();

  /** Call before setting loading flags or starting a replacement request. */
  public cancel(): void {
    this.cancelled.next();
  }

  public untilCancelled<T>(): MonoTypeOperatorFunction<T> {
    return pipe(
      takeUntil<T>(this.cancelled),
      takeUntilDestroyed<T>(this.destroyRef)
    );
  }

}
