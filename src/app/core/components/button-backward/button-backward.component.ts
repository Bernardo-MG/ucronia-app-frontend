import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faBackward } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'button-backward',
  templateUrl: './button-backward.component.html',
  styleUrls: ['./button-backward.component.sass']
})
export class ButtonBackwardComponent {

  @Input() disabled = false;

  @Output() action = new EventEmitter<number>();

  public icon = faBackward;

  constructor() { }

  public onAction() {
    this.action.emit();
  }

}
