import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faArrowLeftLong, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'form-create-controls',
  templateUrl: './form-create-controls.component.html',
  styleUrls: ['./form-create-controls.component.sass']
})
export class FormCreateControlsComponent {

  @Input() disabled: boolean = false;
  
  @Output() save = new EventEmitter<void>();

  public backIcon = faArrowLeftLong;
  public saveIcon = faFloppyDisk;

  constructor() { }

  public saveData() {
    this.save.emit();
  }

}
