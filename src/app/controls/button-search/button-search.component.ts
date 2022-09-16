import { Component, EventEmitter, Output } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'button-search',
  templateUrl: './button-search.component.html',
  styleUrls: ['./button-search.component.sass']
})
export class ButtonSearchComponent {

  @Output() search = new EventEmitter<number>();

  public icon = faMagnifyingGlass;

  constructor() { }

  public onAction() {
    this.search.emit();
  }

}
