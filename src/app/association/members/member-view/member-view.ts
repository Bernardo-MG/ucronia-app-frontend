import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { SummaryCard } from '@app/shared/summary/summary-card/summary-card';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { TextFilter } from '@bernardo-mg/ui';
import { Member, MemberProfile } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { TablePageEvent } from 'primeng/table';
import { MemberSummary } from 'projects/ucronia/api/src/lib/members/member-summary';
import { finalize, Subject } from 'rxjs';
import { MemberList } from '../member-list/member-list';
import { MemberService } from '../member-service';

@Component({
  selector: 'assoc-member-view',
  imports: [FormsModule, PanelModule, DialogModule, ButtonModule, MemberList, TextFilter, SummaryCard],
  templateUrl: './member-view.html'
})
export class MemberView implements OnInit {

  private readonly service = inject(MemberService);

  public data = new Page<Member>();

  public selectedData = new Member();
  public memberContact = new MemberProfile();
  private memberSummary = new MemberSummary();

  public get active() {
    return this.memberSummary.active;
  }

  public get notRenewing() {
    return this.memberSummary.active - this.memberSummary.renew;
  }

  private sort = new Sorting();

  public loading = false;
  public loadingSummary = false;

  public failures = new FailureStore();

  public nameFilterSubject = new Subject<string>();
  public nameFilter = '';

  constructor() {
    const authService = inject(AuthService);
  }

  public ngOnInit(): void {
    this.load();
    this.loadSummary();
  }

  // EVENT HANDLERS

  public onChangeDirection(sorting: SortingEvent) {
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
    const page = (event.first / event.rows) + 1;
    this.load(page);
  }

  public onFilter(filter: string) {
    this.nameFilter = filter;
    this.load();
  }

  // DATA LOADING

  public load(page: number | undefined = undefined) {
    this.loading = true;

    this.service.getAll(page, this.sort, this.nameFilter)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
  }

  private loadSummary() {
    this.loadingSummary = true;
    this.service.getSummary()
      .pipe(finalize(() => this.loadingSummary = false))
      .subscribe(summary => this.memberSummary = summary);
  }

}
