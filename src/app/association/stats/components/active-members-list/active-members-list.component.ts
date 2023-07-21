import { Component, Input, OnInit } from '@angular/core';
import { Member } from '@app/association/models/member';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';
import { AssociationStatsService } from '../../services/association-stats.service';

@Component({
  selector: 'assoc-active-members-list',
  templateUrl: './active-members-list.component.html',
  styleUrls: ['./active-members-list.component.sass']
})
export class ActiveMembersListComponent implements OnInit {

  @Input() public members: Member[] = [];

  public currentPage = 1;

  /**
   * Loading flag.
   */
  public waiting = false;

  public totalPages = 0;

  constructor(
    private service: AssociationStatsService
  ) { }

  ngOnInit(): void {
    const pagination = new PaginationRequest();
    // TODO: Should be handled automatically
    pagination.sort = [new Sort("name")];
    this.load(pagination);
  }

  public onGoTo(page: number) {
    this.currentPage = page;
    const pagination = new PaginationRequest();
    pagination.page = page;
    // TODO: Should be handled automatically
    pagination.sort = [new Sort("name")];
    this.load(pagination);
  }

  private load(pagination: PaginationRequest) {
    this.service.getActiveMembers(pagination).subscribe({
      next: page => {

        this.members = page.content;

        this.totalPages = page.totalPages;
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
