import { Component, Input } from '@angular/core';
import { ReplaySubjectPaginationActuator } from '../../api/pagination/replay-subject-pagination-actuator';

@Component({
  selector: 'pagination-controller-navigation',
  templateUrl: './pagination-controller-navigation.component.html',
  styleUrls: ['./pagination-controller-navigation.component.sass']
})
export class PaginationPaginatorNavigationComponent {

  @Input() paginator: ReplaySubjectPaginationActuator = new ReplaySubjectPaginationActuator();

  constructor() { }

  public moveToPage(page: number) {
    this.paginator.toPage(page);
  }

  public movePrevious(page: number) {
    this.paginator.toPreviousPage();
  }

  public moveNext(page: number) {
    this.paginator.toNextPage();
  }

}
