import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '@app/association/models/member';
import { RouteParametersActuator } from '@app/shared/utils/route/actuator/route-parameters-actuator';
import { MemberService } from '../../services/member.service';
import { PaginationRequestParametersParser } from '@app/shared/utils/api/route/observer/parser/pagination-request-parameters-parser';
import { Active } from '../../models/active';
import { ActiveParametersParser } from '../../observer/active-parameters-parser';
import { PaginationRequest } from '@app/core/api/models/pagination-request';

@Component({
  selector: 'assoc-member-selection-list',
  templateUrl: './member-selection-list.component.html'
})
export class MemberSelectionListComponent implements OnInit, OnChanges {

  @Input() public activeFilter = Active.Active;

  public members: Member[] = [];

  /**
   * Loading flag.
   */
  public readingMembers = false;
  
  public totalPages = 0;

  public totalMembers = 0;

  private routeActuator;

  constructor(
    private service: MemberService,
    private route: ActivatedRoute,
    router: Router
  ) {
    this.routeActuator = new RouteParametersActuator(router);
  }
  
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeFilter']) {
      this.routeActuator.addParameters({ page: undefined, active: this.activeFilter });
    }
  }

  public ngOnInit(): void {
    // TODO: both observers should be merged into a single component
    const paginationParser = new PaginationRequestParametersParser();
    const activeParser = new ActiveParametersParser();
    this.route.queryParamMap.subscribe(params => {
      const active = activeParser.parse(params);
      if (active) {
        this.activeFilter = active as Active;
      } else {
        this.activeFilter = Active.Active;
      }

      const pagination = paginationParser.parse(params);
      this.load(pagination);
    });
  }

  private load(pagination: PaginationRequest | undefined) {
    this.readingMembers = true;

    this.service.getAll(pagination, this.activeFilter).subscribe({
      next: page => {
        this.members = page.content;

        this.totalPages = page.totalPages;
        this.totalMembers = page.totalElements;
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
