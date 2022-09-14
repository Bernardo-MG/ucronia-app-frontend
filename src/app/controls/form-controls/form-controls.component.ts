import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faFloppyDisk, faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'form-controls',
  templateUrl: './form-controls.component.html',
  styleUrls: ['./form-controls.component.sass']
})
export class FormControlsComponent {

  @Input() disabledSave: boolean = false;

  @Input() disabledDelete: boolean = false;
  
  @Output() save = new EventEmitter<void>();
  
  @Output() delete = new EventEmitter<void>();

  public saveIcon = faFloppyDisk;
  public deleteIcon = faTrashCan;

  constructor() { }

  public saveData() {
    this.save.emit();
  }

  public deleteData() {
    this.delete.emit();
  }

}
