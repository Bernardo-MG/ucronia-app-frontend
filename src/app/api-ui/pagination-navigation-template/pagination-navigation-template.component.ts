import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PageInfo } from '@app/api/models/page-info';

@Component({
  selector: 'pagination-navigation-template',
  templateUrl: './pagination-navigation-template.component.html',
  styleUrls: ['./pagination-navigation-template.component.sass']
})
export class PaginationNavigationTemplateComponent implements OnChanges {

  @Input() public pageInfo: PageInfo = new PageInfo();

  @Output() goTo = new EventEmitter<number>();

  public currentPage: number = 0;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentPage = this.pageInfo.page + 1;
  }

  public onChoosePage(event: any) {
    if (event.target.value) {
      this.goTo.emit(event.target.value - 1);
    }
  }

  public onGoTo(page: number) {
    this.goTo.emit(page);
  }

  public onPrevious() {
    this.goTo.emit(this.pageInfo.page - 1);
  }

  public onNext() {
    this.goTo.emit(this.pageInfo.page + 1);
  }

}
