import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'layout-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.sass']
})
export class DataFormComponent {

  /**
   * Saving flag.
   */
  @Input() public saving = false;

  @Input() public formValid = false;

  @Output() public save = new EventEmitter<void>();

  @Output() public cancel = new EventEmitter<void>();

  public saveIcon = faFloppyDisk;

  public onSave(): void {
    this.save.emit();
  }

  public isAbleToSave() {
    return ((this.formValid) && (!this.saving));
  }

}
