import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faFloppyDisk, faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'form-update-controls',
  templateUrl: './form-update-controls.component.html',
  styleUrls: ['./form-update-controls.component.sass']
})
export class FormUpdateControlsComponent {

  @Input() disabled: boolean = false;
  
  @Output() save = new EventEmitter<void>();
  
  @Output() delete = new EventEmitter<void>();

  public saveIcon = faFloppyDisk;
  public deleteIcon = faTrashCan;

  constructor() { }

  public saveData() {
    this.save.emit();
  }

  public deleteData() {
    this.save.emit();
  }

}
