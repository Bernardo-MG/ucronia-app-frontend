import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { SummaryCard, TextFilter } from '@bernardo-mg/ui';
import { MemberCount } from '@ucronia/api';
import { Member, PublicMember } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { finalize } from 'rxjs';
import { MemberList } from '../member-list/member-list';
import { MemberService } from '../member-service';

@Component({
  selector: 'assoc-member-view',
  imports: [FormsModule, PanelModule, DialogModule, ButtonModule, MemberList, TextFilter, SummaryCard],
  templateUrl: './member-view.html'
})
export class MemberView implements OnInit {

  private readonly service = inject(MemberService);

  public data = new Page<PublicMember>();

  public selectedData = new PublicMember();
  public memberContact = new Member();
  private memberCount = new MemberCount();

  public get active() {
    return this.memberCount.active;
  }

  public get notRenewing() {
    return this.memberCount.active - this.memberCount.renew;
  }

  private sort = new Sorting();

  public readonly status: Status = {
    loading: false,
    loadingSummary: false
  };

  public failures = new FailureStore();

  private nameFilter = '';

  public ngOnInit(): void {
    this.load();
    this.loadSummary();
  }

  // EVENT HANDLERS

  public onChangeDirection(sorting: SortingEvent) {
    if (sorting.field === 'fullName') {
      // TODO: should receive the actual direction, not a number
      const direction = sorting.order === 1
        ? SortingDirection.Ascending
        : SortingDirection.Descending;
      this.sort.addField(new SortingProperty('name.firstName', direction));
      this.sort.addField(new SortingProperty('name.lastName', direction));
    }

    this.load(this.data.page);
  }

  public onFilter(filter: string) {
    this.nameFilter = filter;
    this.load();
  }

  // DATA LOADING

  public load(page: number | undefined = undefined) {
    this.status.loading = true;

    this.service.getAll(page, this.sort, this.nameFilter)
      .pipe(finalize(() => this.status.loading = false))
      .subscribe(response => this.data = response);
  }

  private loadSummary() {
    this.status.loadingSummary = true;

    this.service.getSummary()
      .pipe(finalize(() => this.status.loadingSummary = false))
      .subscribe(summary => this.memberCount = summary);
  }

}

interface Status {
  loading: boolean;
  loadingSummary: boolean;
}
