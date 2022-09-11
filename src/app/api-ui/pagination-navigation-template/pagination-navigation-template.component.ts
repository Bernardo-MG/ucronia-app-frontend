import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PageInfo } from '@app/api/models/page-info';
import { PaginationCalculator } from '@app/api/pagination/pagination-calculator';

@Component({
  selector: 'pagination-navigation-template',
  templateUrl: './pagination-navigation-template.component.html',
  styleUrls: ['./pagination-navigation-template.component.sass']
})
export class PaginationNavigationTemplateComponent implements OnChanges {

  @Input() public pageInfo: PageInfo = new PageInfo();

  @Output() goTo = new EventEmitter<number>();

  public pages: number[] = [];

  public skipBefore: boolean = false;

  public skipAfter: boolean = false;

  private paginationCalculator = new PaginationCalculator();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    const info = this.paginationCalculator.calculate({ currentPage: this.pageInfo.page, totalPages: this.pageInfo.totalPages });

    this.pages = info.pages;
    this.skipBefore = info.skipBefore;
    this.skipAfter = info.skipAfter;
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
