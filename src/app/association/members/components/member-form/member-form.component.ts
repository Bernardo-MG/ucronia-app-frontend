import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { Failure } from '@app/core/api/models/failure';
import { FormDescription } from '@app/shared/edition/models/form-description';

@Component({
  selector: 'assoc-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.sass']
})
export class MemberFormComponent {

  @Input() public data: any;

  @Input() public failures: Failure[] = [];

  @Input() public saving = false;

  @Output() public save = new EventEmitter<any>();

  public fields: FormDescription[] = [
    new FormDescription('Name', 'name', 'string', Validators.required),
    new FormDescription('Surname', 'surname', 'string'),
    new FormDescription('Identifier', 'identifier', 'string'),
    new FormDescription('Phone', 'phone', 'string'),
    new FormDescription('Active', 'active', 'boolean', Validators.required)
  ];

  public onSave(data: any): void {
    this.save.emit(data);
  }

}
