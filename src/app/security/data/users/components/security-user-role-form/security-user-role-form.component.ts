import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Role } from '@app/security/models/role';

@Component({
  selector: 'security-user-role-form',
  templateUrl: './security-user-role-form.component.html',
  styleUrls: ['./security-user-role-form.component.sass']
})
export class SecurityUserRoleFormComponent {

  @Input() public roles: Role[] = [];

  @Output() public save = new EventEmitter<Role[]>();

  public form: FormGroup = this.fb.group({
    roles: [[]]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  public onSave() {
    this.save.emit(this.form.value);
  }

  public canSave(): boolean {
    return this.form.valid;
  }

  public onDeleteAt(index: number) {
    
  }

}
