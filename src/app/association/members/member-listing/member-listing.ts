import { Component, inject, OnInit } from '@angular/core';
import { Member } from '@app/domain/members/member';
import { PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { TableModule, TablePageEvent } from 'primeng/table';
import { finalize } from 'rxjs';
import { MemberInfo } from '../member-info/member-info';
import { MemberService } from '../member-service';

@Component({
  selector: 'assoc-member-listing',
  imports: [CardModule, TableModule, DialogModule, ButtonModule, MemberInfo],
  templateUrl: './member-listing.html'
})
export class MemberListing implements OnInit {

  private readonly service = inject(MemberService);

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

  public data = new PaginatedResponse<Member>();

  public selectedData = new Member();

  private sort = new Sorting();

  /**
   * Loading flag.
   */
  public loading = false;
  public showing = false;

  public ngOnInit(): void {
    this.load(0);
  }

  public onChangeDirection(sorting: { field: string, order: number }) {
    if (sorting.field === 'fullName') {
    const direction = sorting.order === 1
      ? SortingDirection.Ascending
      : SortingDirection.Descending;
      this.sort.addField(new SortingProperty('firstName', direction));
      this.sort.addField(new SortingProperty('lastName', direction));
    }

    this.load(this.data.page);
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.data.size) + 1;
    this.load(page);
  }

  public onShowInfo(member: Member) {
    this.loading = true;
    this.service.getOne(member.number)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.selectedData = response);
    this.showing = true;
  }

  private load(page: number) {
    this.loading = true;

    this.service.getAll(page, this.sort)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
  }

}
