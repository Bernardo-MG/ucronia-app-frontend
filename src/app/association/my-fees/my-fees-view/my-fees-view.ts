import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Fee } from '@app/domain/fees/fee';
import { PaginatedResponse } from '@bernardo-mg/request';
import { CardModule } from 'primeng/card';
import { finalize } from 'rxjs';
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

  public data = new PaginatedResponse<Fee>();

  /**
   * Loading flag.
   */
  public loading = false;

  public ngOnInit(): void {
    this.load(0);
  }

  public load(page: number) {
    this.loading = true;

    this.service.getAll(page)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
  }

}
