import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Fee } from '@app/domain/fees/fee';
import { PaginatedResponse } from '@bernardo-mg/request';
import { CardModule } from 'primeng/card';
import { TableModule, TablePageEvent } from 'primeng/table';
import { finalize } from 'rxjs';
import { MyFeesService } from '../my-fees-service';

@Component({
  selector: 'app-my-fees-list',
  imports: [CommonModule, CardModule, TableModule],
  templateUrl: './my-fees-list.html'
})
export class MyFeesList implements OnInit {

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

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.data.size) + 1;
    this.load(page);
  }

  private load(page: number) {
    this.loading = true;

    this.service.getAll(page)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
  }

}
