import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { Member } from '@app/association/models/member';
import { Failure } from '@app/core/api/models/failure';
import { FormDescription } from '@app/shared/edition/models/form-description';

@Component({
  selector: 'assoc-member-edit-form',
  templateUrl: './member-edit-form.component.html',
  styleUrls: ['./member-edit-form.component.sass']
})
export class MemberEditFormComponent {

  @Input() public data: Member | null = null;

  @Input() public failures: Failure[] = [];

  @Input() public saving = false;

  @Input() public editable = false;

  @Input() public deletable = false;

  @Output() public save = new EventEmitter<Member>();

  @Output() public delete = new EventEmitter<Member>();

  public fields: FormDescription[] = [
    new FormDescription('Name', 'name', 'string', Validators.required),
    new FormDescription('Surname', 'surname', 'string'),
    new FormDescription('Identifier', 'identifier', 'string'),
    new FormDescription('Phone', 'phone', 'string'),
    new FormDescription('Active', 'active', 'boolean', Validators.required)
  ];

  public onSave(data: Member): void {
    this.save.emit(data);
  }

  public onDelete(data: Member): void {
    this.delete.emit(data);
  }

}
