
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Fee } from '@app/models/fees/fee';
import { PaginatedResponse } from '@bernardo-mg/request';
import { CardModule } from 'primeng/card';
import { TableModule, TablePageEvent } from 'primeng/table';
import { MyFeesService } from '../../services/my-fees.service';

@Component({
  selector: 'app-my-fees-list',
  imports: [CommonModule, CardModule, TableModule],
  templateUrl: './my-fees-list.container.html'
})
export class MyFeesFrontpageContainer {

  private readonly service = inject(MyFeesService);

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

  public data = new PaginatedResponse<Fee>();

  /**
   * Loading flag.
   */
  public loading = false;

  constructor() {
    this.load(0);
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.data.size) + 1;
    this.load(page);
  }

  private load(page: number) {
    this.loading = true;

    this.service.getAll(page).subscribe({
      next: response => {
        this.data = response;

        // Reactivate view
        this.loading = false;
      },
      error: error => {
        // Reactivate view
        this.loading = false;
      }
    });
  }

}
