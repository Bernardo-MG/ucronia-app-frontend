import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MemberService } from '@app/association/members/member-service';
import { Member } from '@app/domain/members/member';
import { PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { TableModule, TablePageEvent } from 'primeng/table';
import { finalize } from 'rxjs';
import { MemberInfo } from '../member-info/member-info';

@Component({
  selector: 'assoc-member-list',
  imports: [RouterModule, CardModule, TableModule, DialogModule, ButtonModule, MemberInfo],
  templateUrl: './member-list.html'
})
export class MemberList implements OnInit {

  private readonly router = inject(Router);

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
      let direction;
      if (sorting.order == 1) {
        direction = SortingDirection.Ascending;
      } else {
        direction = SortingDirection.Descending;
      }
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
    this.service.getOne(member.number)
      .subscribe(fee => this.selectedData = fee);
    this.showing = true;
  }

  private load(page: number) {
    this.loading = true;

    this.service.getAll(page, this.sort)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
  }

}
