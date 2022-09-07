import { Component } from '@angular/core';
import { ReplaySubjectPaginationActuator } from '../../api/pagination/replay-subject-pagination-actuator';

@Component({
  selector: 'pagination-actuator-navigation',
  templateUrl: './pagination-actuator-navigation.component.html',
  styleUrls: ['./pagination-actuator-navigation.component.sass']
})
export class PaginationActuatorNavigationComponent {

  public actuator: ReplaySubjectPaginationActuator = new ReplaySubjectPaginationActuator();

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
