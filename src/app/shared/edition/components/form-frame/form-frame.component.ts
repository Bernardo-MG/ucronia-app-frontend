import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'edition-form-frame',
  templateUrl: './form-frame.component.html'
})
export class FormFrameComponent {

  @Input() public saving = false;

  @Input() public saveDisabled = false;

  @Output() public save = new EventEmitter<void>();

  @Output() public cancel = new EventEmitter<void>();

  public onSave(): void {
    this.save.emit();
  }

}
