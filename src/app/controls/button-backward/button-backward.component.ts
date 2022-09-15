import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'button-backward',
  templateUrl: './button-backward.component.html',
  styleUrls: ['./button-backward.component.sass']
})
export class ButtonBackwardComponent {

  @Output() backward = new EventEmitter<number>();

  constructor() { }

  public onAction() {
    this.backward.emit();
  }

}
