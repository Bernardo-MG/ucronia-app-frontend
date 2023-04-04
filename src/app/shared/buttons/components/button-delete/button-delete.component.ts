import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'button-delete',
  templateUrl: './button-delete.component.html',
  styleUrls: ['./button-delete.component.sass']
})
export class ButtonDeleteComponent {

  @Output() action = new EventEmitter<number>();

  public onAction() {
    this.action.emit();
  }

}
