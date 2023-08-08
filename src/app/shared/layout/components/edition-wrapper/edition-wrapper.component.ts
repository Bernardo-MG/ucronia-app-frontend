import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'layout-edition-wrapper',
  templateUrl: './edition-wrapper.component.html'
})
export class EditionWrapperComponent {

  /**
   * Saving flag.
   */
  @Input() public saving = false;

  @Input() public editable = false;

  @Input() public editing = false;

  @Input() public deletable = false;

  @Input() public valid = false;

  @Output() public edit = new EventEmitter<void>();

  @Output() public delete = new EventEmitter<void>();

  public onStartEditing(): void {
    this.edit.emit();
  }

  public onDelete(): void {
    this.delete.emit();
  }

  public isAbleToEdit() {
    return !this.saving && this.editable && this.editing;
  }

  public isAbleToDelete() {
    return !this.saving && this.deletable && !this.editing;
  }

  public isSaveDisabled() {
    return !this.editable || !this.editing || !this.isAbleToSave();
  }

  public isAbleToSave() {
    return ((this.valid) && (!this.saving));
  }

}
