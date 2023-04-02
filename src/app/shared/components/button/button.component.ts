import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dnd5-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})
export class ButtonComponent {

  @Input() disabled = false;
  
  @Input() current = false;
  
  @Input() class = '';

  @Output() public action = new EventEmitter<number>();

  public onClick() {
    this.action.emit();
  }

}
