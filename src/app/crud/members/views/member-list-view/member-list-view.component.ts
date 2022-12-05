import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageInfo } from '@app/api/models/page-info';
import { RoutePaginationRequestObserver } from '@app/api/route/observer/route-pagination-request-observer';
import { MemberService } from '@app/crud/members/services/member.service';
import { Member } from '@app/models/member';
import { mergeMap, tap } from 'rxjs';

@Component({
  selector: 'crud-member-list-view',
  templateUrl: './member-list-view.component.html',
  styleUrls: ['./member-list-view.component.sass']
})
export class MemberListViewComponent implements OnInit {

  /**
   * Loading flag.
   */
  public loading = false;

  public members: Member[] = [];

  public pageInfo = new PageInfo();

  public selected = new Member();

  private formValid = false;

  private routePaginationObserver: RoutePaginationRequestObserver;

  constructor(
    private service: MemberService,
    route: ActivatedRoute
  ) {
    this.routePaginationObserver = new RoutePaginationRequestObserver(route);
  }

  ngOnInit(): void {
    this.routePaginationObserver.pagination.pipe(
      tap(p => this.loading = true),
      mergeMap(p => this.service.getAll(p)))
      .subscribe({
        next: page => {
          this.members = page.content;
          this.pageInfo = page;
          // Reactivate view
          this.loading = false;
        },
        error: error => {
          // Reactivate view
          this.loading = false;
        }
      });
  }

  onSave(): void {
    this.service.create(this.selected).subscribe();
  }

  public onFormValidChange(valid: boolean): void {
    this.formValid = valid;
  }

  public onStartCreate() {
    this.selected = new Member();
  }

  public onFormChange(value: Member) {
    this.selected = value;
  }

  public isLoading(): boolean {
    return this.loading;
  }

  public isAbleToSave() {
    return this.formValid;
  }

}
