import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Role } from '@app/core/models/role';

@Component({
  selector: 'security-user-role-form',
  templateUrl: './security-user-role-form.component.html',
  styleUrls: ['./security-user-role-form.component.sass']
})
export class SecurityUserRoleFormComponent {

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
