import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '@app/association/models/member';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { AuthService } from '@app/core/authentication/services/auth.service';
import { PaginationRequestRouteObserver } from '@app/shared/utils/api/route/observer/pagination-request-route-observer';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'assoc-member-frontpage',
  templateUrl: './member-frontpage.component.html'
})
export class MemberFrontpageComponent implements OnInit {

  public members: Member[] = [];

  /**
   * Loading flag.
   */
  public readingMembers = false;

  public createPermission = false;

  public onlyActive = true;

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

  public onFilterActiveMembers(event: any) {
    this.onlyActive = event.checked;
  }

  private load(pagination: PaginationRequest | undefined) {
    this.readingMembers = true;
    this.service.getAll(pagination).subscribe({
      next: page => {
        this.members = page.content;

        this.totalPages = page.totalPages;
        // Reactivate view
        this.readingMembers = false;
      },
      error: error => {
        // Reactivate view
        this.readingMembers = false;
      }
    });
  }

}
