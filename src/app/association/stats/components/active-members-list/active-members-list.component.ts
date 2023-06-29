import { Component, Input, OnInit } from '@angular/core';
import { Member } from '@app/association/models/member';
import { AssociationStatsService } from '../../services/association-stats.service';
import { PaginationRequest } from '@app/core/api/models/pagination-request';

@Component({
  selector: 'app-active-members-list',
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
    this.load(new PaginationRequest());
  }

  public onGoTo(page: number) {
    this.currentPage = page;
    const pagination = new PaginationRequest();
    pagination.page = page;
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
