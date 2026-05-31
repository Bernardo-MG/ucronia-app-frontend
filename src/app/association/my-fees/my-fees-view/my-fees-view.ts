import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Page } from '@bernardo-mg/request';
import { Fee } from '@ucronia/domain';
import { CardModule } from 'primeng/card';
import { finalize, of, switchMap, tap } from 'rxjs';
import { MyFeesList } from '../my-fees-list/my-fees-list';
import { MyFeesService } from '../my-fees-service';

@Component({
  selector: 'app-my-fees-view',
  imports: [CommonModule, CardModule, MyFeesList],
  templateUrl: './my-fees-view.html'
})
export class MyFeesView implements OnInit {

  private readonly service = inject(MyFeesService);

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

  public data = new Page<Fee>();
  public hasFees = false;

  /**
   * Loading flag.
   */
  public loading = false;

  public ngOnInit(): void {
    this.load();
    this.service.hasFees().subscribe(response => this.hasFees = response);
    this.loading = true;
    this.service.hasFees().pipe(
      tap(hasFees => this.hasFees = hasFees),
      switchMap(hasFees =>
        hasFees ? this.service.getAll() : of(null)
      ),
      finalize(() => this.loading = false)
    ).subscribe(response => {
      if (response) {
        this.data = response;
      }
    });
  }

  public load(page: number | undefined = undefined) {
    this.loading = true;

    // TODO: check if the user has a member assigned and show a message if not
    this.service.getAll(page)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
  }

}
