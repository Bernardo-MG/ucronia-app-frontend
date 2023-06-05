import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'edition-form-frame',
  templateUrl: './form-frame.component.html'
})
export class FormFrameComponent {

  @Input() public saving = false;

  @Input() public saveDisabled = false;

  @Output() public save = new EventEmitter<void>();

  @Output() public cancel = new EventEmitter<void>();

  public saveIcon = faFloppyDisk;

  public onSave(): void {
    this.save.emit();
  }

}
