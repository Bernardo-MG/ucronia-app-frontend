import { Component, Input, OnInit } from '@angular/core';
import { AssociationStatsService } from '../../services/association-stats.service';
import { Member } from '@app/association/models/member';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';

@Component({
  selector: 'assoc-member-stats',
  templateUrl: './member-stats.component.html'
})
export class MemberStatsComponent implements OnInit {

  @Input() public members: Member[] = [];

  public activeCount = 0;

  public currentPage = 1;

  /**
   * Loading flag.
   */
  public readingMembers = false;

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
    this.readingMembers = true;
    this.service.getActiveMembers(pagination).subscribe({
      next: page => {
        this.members = page.content;

        this.totalPages = page.totalPages;

        this.activeCount = page.totalElements;
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
