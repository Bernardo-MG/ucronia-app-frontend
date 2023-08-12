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

  @Input() public readonly = false;

  @Output() public edit = new EventEmitter<void>();

  @Output() public delete = new EventEmitter<void>();

  public onStartEditing(): void {
    this.edit.emit();
  }

  public onDelete(): void {
    this.delete.emit();
  }

  public isAbleToEdit() {
    return (!this.readonly) && !this.saving && this.editable && this.editing;
  }

  public isAbleToDelete() {
    return (!this.readonly) && !this.saving && this.deletable && !this.editing;
  }

}
