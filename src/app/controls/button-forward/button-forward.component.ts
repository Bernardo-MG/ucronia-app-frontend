import { Component, EventEmitter, Output } from '@angular/core';
import { faForward } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'button-forward',
  templateUrl: './button-forward.component.html',
  styleUrls: ['./button-forward.component.sass']
})
export class ButtonForwardComponent {

  @Output() forward = new EventEmitter<number>();

  public icon = faForward;

  constructor() { }

  public onAction() {
    this.forward.emit();
  }

}
