import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pagination-navigation-template',
  templateUrl: './pagination-navigation-template.component.html',
  styleUrls: ['./pagination-navigation-template.component.sass']
})
export class PaginationNavigationTemplateComponent implements OnChanges {

  @Input() public page: number = 0;

  @Input() public totalPages: number = 0;

  @Input() public first: boolean = true;

  @Input() public last: boolean = true;

  @Output() goTo = new EventEmitter<number>();

  public currentPage: number = 0;
  
  public backwardIcon = faBackward;
  public forwardIcon = faForward;

  constructor() { }

  ngOnChanges(): void {
    this.currentPage = this.page + 1;
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
    this.goTo.emit(this.page - 1);
  }

  public onNext() {
    this.goTo.emit(this.page + 1);
  }

  public isPreviousDisabled() {
    return (this.first === undefined) || (this.first === null) || this.first
  }

  public isNextDisabled() {
    return (this.last === undefined) || (this.last === null) || this.last
  }

}
