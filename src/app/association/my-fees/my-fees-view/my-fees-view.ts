import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Page } from '@bernardo-mg/request';
import { Fee } from '@ucronia/domain';
import { finalize, of, Subscription, switchMap, tap } from 'rxjs';
import { MyFeesList } from '../my-fees-list/my-fees-list';
import { MyFeesService } from '../my-fees-service';

@Component({
  selector: 'app-my-fees-view',
  imports: [MyFeesList],
  templateUrl: './my-fees-view.html'
})
export class MyFeesView implements OnInit {

  private readonly destroyRef = inject(DestroyRef);

  private readonly service = inject(MyFeesService);

  public data = new Page<Fee>();

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }
  public hasFees = false;

  /**
   * Loading flag.
   */
  public loading = false;
  private listRequest?: Subscription;

  public ngOnInit(): void {
    this.loading = true;
    this.listRequest = this.service.hasFees().pipe(
      tap(hasFees => this.hasFees = hasFees),
      switchMap(hasFees =>
        hasFees ? this.service.getAll() : of(null)
      ),
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.loading = false)
    ).subscribe(response => {
      if (response) {
        this.data = response;
      }
    });
  }

  public load(page: number | undefined = undefined) {
    this.listRequest?.unsubscribe();
    this.loading = true;

    this.listRequest = this.service.getAll(page)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading = false)
      )
      .subscribe(response => this.data = response);
  }

}
