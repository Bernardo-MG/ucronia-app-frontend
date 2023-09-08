import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '@app/association/models/member';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { AuthService } from '@app/core/authentication/services/auth.service';
import { PaginationRequestRouteObserver } from '@app/shared/utils/api/route/observer/pagination-request-route-observer';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'assoc-member-list',
  templateUrl: './member-list.component.html'
})
export class MemberListComponent implements OnInit {

  public members: Member[] = [];

  /**
   * Loading flag.
   */
  public waiting = false;

  public createPermission = false;

  public totalPages = 0;

  private routePaginationObserver: PaginationRequestRouteObserver;

  public addIcon = faPlus;

  constructor(
    private service: MemberService,
    route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.routePaginationObserver = new PaginationRequestRouteObserver(route);
  }

  public ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authService.hasPermission("member", "create");

    this.routePaginationObserver.subject.subscribe(p => {
      this.load(p);
    });
  }

  private load(pagination: PaginationRequest | undefined) {
    this.waiting = true;
    this.service.getAll(pagination).subscribe({
      next: page => {
        this.members = page.content;

        this.totalPages = page.totalPages - 1;
        // Reactivate view
        this.waiting = false;
      },
      error: error => {
        // Reactivate view
        this.waiting = false;
      }
    });
  }

}
