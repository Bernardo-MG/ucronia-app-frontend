import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Privilege } from '@app/core/authentication/models/privilege';

@Component({
  selector: 'access-role-privilege-form',
  templateUrl: './access-role-privilege-form.component.html',
  styleUrls: ['./access-role-privilege-form.component.sass']
})
export class AccessRolePrivilegeFormComponent {

  @Input() public privileges: Privilege[] = [];

  @Input() public selection: Privilege[] = [];

  @Output() public addPrivilege = new EventEmitter<void>();

  @Output() public removePrivilege = new EventEmitter<Privilege>();

  public onAdd() {
    this.addPrivilege.emit();
  }

  public onRemove(privilege: Privilege) {
    this.removePrivilege.emit(privilege);
  }

}
