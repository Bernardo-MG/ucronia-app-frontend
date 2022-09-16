import { Component, EventEmitter, Output } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'button-delete',
  templateUrl: './button-delete.component.html',
  styleUrls: ['./button-delete.component.sass']
})
export class ButtonDeleteComponent {

  @Output() public save = new EventEmitter<void>();

  public icon = faTrashCan;

  constructor() { }

  public onAction() {
    this.save.emit();
  }

}
