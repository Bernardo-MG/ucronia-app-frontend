import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'layout-edition-wrapper',
  templateUrl: './edition-wrapper.component.html'
})
export class EditionWrapperComponent {

  @Input() public waiting = false;

  @Input() public editable = false;

  @Input() public deletable = false;

  @Input() public error = false;

  @Output() public delete = new EventEmitter<void>();

  public editing = false;

  public onStartEditing(): void {
    this.editing = true;
  }

  public onDelete(): void {
    this.delete.emit();
  }

  public isAbleToEdit() {
    return (!this.error) && (!this.waiting) && this.editable && this.editing;
  }

  public isAbleToDelete() {
    return (!this.error) && (!this.waiting) && this.deletable && (!this.editing);
  }

}
