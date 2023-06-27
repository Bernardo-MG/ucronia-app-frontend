import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Role } from '@app/core/authentication/models/role';

@Component({
  selector: 'access-user-roles',
  templateUrl: './access-user-roles.component.html'
})
export class AccessUserRoleFormComponent {

  @Input() public roles: Role[] = [];

  @Output() public addRole = new EventEmitter<void>();

  @Output() public removeRole = new EventEmitter<Role>();

  public form: FormGroup = this.fb.group({
    roles: [[]]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  public onAdd() {
    this.addRole.emit();
  }

  public onRemove(privilege: Role) {
    this.removeRole.emit(privilege);
  }

}
