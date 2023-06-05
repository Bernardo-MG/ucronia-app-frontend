import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Member } from '@app/association/models/member';
import { Failure } from '@app/core/api/models/failure';
import { FormDescription } from '@app/shared/edition/models/form-description';

@Component({
  selector: 'assoc-member-form',
  templateUrl: './member-form.component.html'
})
export class MemberFormComponent {

  /**
   * Loading flag.
   */
  @Input() public saving = false;

  @Input() public failures: Failure[] = [];

  @Input() public fields: FormDescription[] = [];

  @Output() public save = new EventEmitter<Member>();

  @Output() public delete = new EventEmitter<Member>();

  public onSave(data: Member): void {
    this.save.emit(data);
  }

}
