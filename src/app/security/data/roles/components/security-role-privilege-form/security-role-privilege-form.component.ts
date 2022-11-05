import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Privilege } from '@app/security/models/privilege';

@Component({
  selector: 'security-role-privilege-form',
  templateUrl: './security-role-privilege-form.component.html',
  styleUrls: ['./security-role-privilege-form.component.sass']
})
export class SecurityRolePrivilegeFormComponent {

  @Input() public privileges: Privilege[] = [];

  @Input() public selection: Privilege[] = [];

  @Output() public addPrivilege = new EventEmitter<Privilege>();

  constructor() { }

  public onAdd() {
    this.addPrivilege.emit();
  }

  public onDeleteAt(index: number) {
    this.privileges.splice(index, 1);
  }

}
