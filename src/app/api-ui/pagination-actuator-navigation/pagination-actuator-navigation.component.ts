import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PaginationActuator } from '@app/api/pagination/pagination-actuator';
import { PaginationStatus } from '@app/api/pagination/pagination-status';
import { ReplaySubjectPaginationActuator } from '@app/api/pagination/replay-subject-pagination-actuator';

@Component({
  selector: 'pagination-actuator-navigation',
  templateUrl: './pagination-actuator-navigation.component.html',
  styleUrls: ['./pagination-actuator-navigation.component.sass']
})
export class PaginationActuatorNavigationComponent {

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
