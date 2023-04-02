import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Privilege } from '@app/core/authentication/models/privilege';

@Component({
  selector: 'security-role-privilege-form',
  templateUrl: './security-role-privilege-form.component.html',
  styleUrls: ['./security-role-privilege-form.component.sass']
})
export class SecurityRolePrivilegeFormComponent {

  @Input() public privileges: Privilege[] = [];

  @Input() public selection: Privilege[] = [];

  @Output() public addPrivilege = new EventEmitter<void>();

  @Output() public removePrivilege = new EventEmitter<Privilege>();

  constructor() { }

  public onAdd() {
    this.addPrivilege.emit();
  }

  public onRemove(privilege: Privilege) {
    this.removePrivilege.emit(privilege);
  }

}
