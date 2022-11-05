import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Privilege } from '@app/security/models/privilege';

@Component({
  selector: 'security-role-privilege-form',
  templateUrl: './security-role-privilege-form.component.html',
  styleUrls: ['./security-role-privilege-form.component.sass']
})
export class SecurityRolePrivilegeFormComponent {

  @Input() public privileges: Privilege[] = [];

  @Output() public save = new EventEmitter<Privilege[]>();

  public form: FormGroup = this.fb.group({
    privileges: [[]]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  public onSave() {
    this.save.emit(this.form.value);
  }

}
