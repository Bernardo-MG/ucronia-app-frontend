import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { MemberCount } from '@ucronia/api';
import { Member, PublicMember } from '@ucronia/domain';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { debounceTime, distinctUntilChanged, finalize, of, Subject, switchMap } from 'rxjs';
import { PublicMemberList } from '../public-member-list/public-member-list';
import { PublicMemberService } from '../public-member-service';

@Component({
  selector: 'assoc-public-member-view',
  imports: [FormsModule, CardModule, IconFieldModule, InputIconModule, InputTextModule, PublicMemberList],
  templateUrl: './public-member-view.html'
})
export class PublicMemberView implements OnInit {

  private readonly service = inject(PublicMemberService);

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
  public filterValue = '';
  private readonly filterSubject = new Subject<string>();

  constructor() {
    const destroyRef = inject(DestroyRef);

    this.filterSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(destroyRef)
      )
      .subscribe(filter => this.onFilter(filter));
  }

  public ngOnInit(): void {
    this.refresh();
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
    } else {
      const direction = sorting.order === 1
        ? SortingDirection.Ascending
        : SortingDirection.Descending;
      this.sort.addField(new SortingProperty(sorting.field, direction));
    }

    this.load(this.data.page);
  }

  public onFilter(filter: string) {
    this.nameFilter = filter;
    this.load();
  }

  public onFilterChange(filter: string): void {
    this.filterSubject.next(filter);
  }

  // DATA LOADING

  /** Reload the list and counters after a successful member save. */
  public refresh(): void {
    this.load(this.data.page > 0 ? this.data.page : undefined);
    this.loadSummary();
  }

  public load(page: number | undefined = undefined) {
    this.status.loading = true;

    this.service.getAll(page, this.sort, this.nameFilter)
      .pipe(
        switchMap(response => {
          if (response.content.length === 0 && response.page > 1) {
            const previousPage = Math.max(1, Math.min(response.page - 1, response.totalPages));
            return this.service.getAll(previousPage, this.sort, this.nameFilter);
          }
          return of(response);
        }),
        finalize(() => this.status.loading = false)
      )
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
