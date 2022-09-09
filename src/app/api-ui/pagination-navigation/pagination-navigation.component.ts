import { Component, Input } from '@angular/core';
import { PaginationActuator } from '@app/api/pagination/actuator/pagination-actuator';
import { ReplaySubjectPaginationActuator } from '@app/api/pagination/actuator/replay-subject-pagination-actuator';
import { PaginationStatus } from '@app/api/pagination/pagination-status';

@Component({
  selector: 'pagination-navigation',
  templateUrl: './pagination-navigation.component.html',
  styleUrls: ['./pagination-navigation.component.sass']
})
export class PaginationNavigationComponent {

  @Input() public actuator: PaginationActuator = new ReplaySubjectPaginationActuator();

  @Input() public status: PaginationStatus = new PaginationStatus();

  constructor() { }

  public moveToPage(page: number) {
    this.actuator.toPage(page);
  }

  public movePrevious(page: number) {
    this.actuator.toPreviousPage();
  }

  public moveNext(page: number) {
    this.actuator.toNextPage();
  }

}
