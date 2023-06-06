import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'edition-waiting-button',
  templateUrl: './waiting-button.component.html',
  styleUrls: ['./waiting-button.component.sass']
})
export class WaitingButtonComponent {

  @Input() public waiting = false;

  @Input() public disabled = false;

  @Input() public name = '';

  @Output() public click = new EventEmitter<void>();

  public onClick(): void {
    this.click.emit();
  }

}
