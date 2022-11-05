import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faFloppyDisk, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'form-controls',
  templateUrl: './form-controls.component.html',
  styleUrls: ['./form-controls.component.sass']
})
export class FormControlsComponent implements OnInit {

  @Input() disabledSave: boolean = false;

  @Input() disabledDelete: boolean = false;

  @Input() disabledAdd: boolean = false;

  @Output() save = new EventEmitter<void>();

  @Output() delete = new EventEmitter<void>();

  @Output() add = new EventEmitter<void>();

  public canSave = false;
  public canDelete = false;
  public canAdd = false;

  public saveIcon = faFloppyDisk;
  public deleteIcon = faTrashCan;
  public addIcon = faPlus;

  constructor() { }

  ngOnInit(): void {
    this.canSave = this.save.observed;
    this.canDelete = this.delete.observed;
    this.canAdd = this.add.observed;
  }

  public onSave() {
    this.save.emit();
  }

  public onDelete() {
    this.delete.emit();
  }

  public onAdd() {
    this.add.emit();
  }

}
