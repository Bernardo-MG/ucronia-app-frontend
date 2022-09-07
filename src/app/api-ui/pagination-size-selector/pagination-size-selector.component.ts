import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'pagination-size-selector',
  templateUrl: './pagination-size-selector.component.html',
  styleUrls: ['./pagination-size-selector.component.sass']
})
export class PaginationSizeSelectorComponent implements OnInit {

  public sizes: number[] = [5, 10, 15, 20];

  @Output() select = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    this.select.emit(this.sizes[0]);
  }

  public selectSize(event: any) {
    if (event.value) {
      this.select.emit(event.value);
    }
  }

}
