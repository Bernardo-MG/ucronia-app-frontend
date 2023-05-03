import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { Failure } from '@app/core/api/models/failure';
import { FormDescription } from '@app/shared/edition/models/form-description';

@Component({
  selector: 'access-role-form',
  templateUrl: './access-role-form.component.html'
})
export class AccessRoleFormComponent {

  @Input() public data: any;

  @Input() public failures: Failure[] = [];

  @Input() public saving = false;

  @Output() public save = new EventEmitter<any>();

  public fields: FormDescription[] = [
    new FormDescription('Name', 'name', 'string', Validators.required)
  ];

  public onSave(data: any): void {
    this.save.emit(data);
  }

}
