import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { PaginationCalculator } from '@app/api/pagination/pagination-calculator';

@Component({
  selector: 'pagination-navigation-template',
  templateUrl: './pagination-navigation-template.component.html',
  styleUrls: ['./pagination-navigation-template.component.sass']
})
export class PaginationNavigationTemplateComponent implements OnChanges {

  @Input() previousEnabled: boolean = false;

  @Input() nextEnabled: boolean = false;

  @Input() totalPages: number = 0;

  @Input() currentPage: number = 0;

  @Output() previousPage = new EventEmitter<number>();

  @Output() nextPage = new EventEmitter<number>();

  @Output() toPage = new EventEmitter<number>();

  public pages: number[] = [];

  public skipBefore: boolean = false;

  public skipAfter: boolean = false;

  private paginationCalculator = new PaginationCalculator();

  constructor() { }

  ngOnChanges(): void {
    const info = this.paginationCalculator.calculate({ currentPage: this.currentPage, totalPages: this.totalPages });

    this.pages = info.pages;
    this.skipBefore = info.skipBefore;
    this.skipAfter = info.skipAfter;
  }

  public moveToPage(page: number) {
    this.toPage.emit(page);
  }

  public movePrevious() {
    this.previousPage.emit(this.currentPage);
  }

  public moveNext() {
    this.nextPage.emit(this.currentPage);
  }

}
