import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faFloppyDisk, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'layout-form-controls',
  templateUrl: './form-controls.component.html',
  styleUrls: ['./form-controls.component.sass']
})
export class FormControlsComponent {

  @Input() disabledSave = false;

  @Input() disabledDelete = false;

  @Input() disabledAdd = false;

  @Output() save = new EventEmitter<void>();

  @Output() delete = new EventEmitter<void>();

  @Output() add = new EventEmitter<void>();

  public saveIcon = faFloppyDisk;
  public deleteIcon = faTrashCan;
  public addIcon = faPlus;

  public onSave() {
    this.save.emit();
  }

  public onDelete() {
    this.delete.emit();
  }

  public onAdd() {
    this.add.emit();
  }

  public showSave() {
    return this.save.observed;
  }

  public showDelete() {
    return this.delete.observed;
  }

  public showAdd() {
    return this.add.observed;
  }

}
