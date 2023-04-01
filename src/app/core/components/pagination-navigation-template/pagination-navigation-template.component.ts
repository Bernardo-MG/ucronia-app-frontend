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

  @Input() public disabled = false;

  private _first: boolean = true;

  @Input()
  get first(): boolean {
    return this._first;
  }

  set first(value: boolean) {
    this._first = (value === undefined) || (value === null) || value;
  }

  private _last: boolean = true;

  @Input()
  get last(): boolean {
    return this._last;
  }

  set last(value: boolean) {
    this._last = (value === undefined) || (value === null) || value;
  }

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

  public isAbleToGoPrevious(): boolean {
    return (!this.first) && (!this.disabled);
  }

  public isAbleToGoNext(): boolean {
    return (!this.last) && (!this.disabled);
  }

}
