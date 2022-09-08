import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'pagination-size-selector',
  templateUrl: './pagination-size-selector.component.html',
  styleUrls: ['./pagination-size-selector.component.sass']
})
export class PaginationSizeSelectorComponent implements OnInit, OnChanges {

  @Input() public selected: number = 5;

  @Output() private select = new EventEmitter<number>();

  public sizes: number[] = [5, 10, 15, 20];

  constructor() { }

  ngOnInit(): void {
    this.select.emit(this.selected);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.select.emit(this.selected);
  }

  public selectSize(event: any) {
    if (event.value) {
      this.select.emit(event.value);
    }
  }

}
