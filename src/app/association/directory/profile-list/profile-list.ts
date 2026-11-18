import { Component, input, output } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { ButtonModule } from 'primeng/button';
import { TableModule, TablePageEvent } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FullProfile } from '../model/full-profile';
import { ProfileTypeTag } from '../profile-type-tag/profile-type-tag';

@Component({
  selector: 'assoc-profile-list',
  imports: [ButtonModule, TableModule, TagModule, ProfileTypeTag],
  templateUrl: './profile-list.html'
})
export class ProfileList {

  public readonly loading = input(false);
  public readonly page = input(0);
  public readonly profiles = input<FullProfile[]>([]);
  public readonly rows = input(0);
  public readonly totalRecords = input(0);

  public readonly changeDirection = output<SortingEvent>();
  public readonly changePage = output<number>();
  public readonly show = output<FullProfile>();

  public get first() {
    return Math.max(0, (this.page() - 1) * this.rows());
  }

  // Event handlers
  public onPageChange(event: TablePageEvent) {
    const page = (event.first / event.rows) + 1;
    this.changePage.emit(page);
  }

}
