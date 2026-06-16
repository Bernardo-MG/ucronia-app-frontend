import { Component, input, output } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { ButtonModule } from 'primeng/button';
import { TableModule, TablePageEvent } from 'primeng/table';
import { FullProfile } from '../model/full-profile';

@Component({
  selector: 'assoc-sponsor-list',
  imports: [ButtonModule, TableModule],
  templateUrl: './sponsor-list.html'
})
export class SponsorList {

  public readonly loading = input(false);
  public readonly profiles = input<FullProfile[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);

  public readonly show = output<FullProfile>();
  public readonly changeDirection = output<SortingEvent>();
  public readonly changePage = output<number>();

  public get first() {
    return (this.page() - 1) * this.rows();
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / event.rows) + 1;
    this.changePage.emit(page);
  }

}
