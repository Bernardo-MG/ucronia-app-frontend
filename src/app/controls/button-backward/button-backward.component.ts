import { Component, EventEmitter, Output } from '@angular/core';
import { faBackward } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'button-backward',
  templateUrl: './button-backward.component.html',
  styleUrls: ['./button-backward.component.sass']
})
export class ButtonBackwardComponent {

  @Output() backward = new EventEmitter<number>();

  public icon = faBackward;

  constructor() { }

  public onAction() {
    this.backward.emit();
  }

}
