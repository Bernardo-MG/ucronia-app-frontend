import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'button-forward',
  templateUrl: './button-forward.component.html',
  styleUrls: ['./button-forward.component.sass']
})
export class ButtonForwardComponent {

  @Output() forward = new EventEmitter<number>();

  constructor() { }

  public onAction() {
    this.forward.emit();
  }

}
