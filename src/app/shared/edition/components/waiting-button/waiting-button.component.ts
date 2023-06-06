import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'edition-waiting-button',
  templateUrl: './waiting-button.component.html',
  styleUrls: ['./waiting-button.component.sass']
})
export class WaitingButtonComponent {

  @Input() public saving = false;

  @Input() public disabled = false;

  @Output() public save = new EventEmitter<void>();

  public onSave(): void {
    this.save.emit();
  }

}
