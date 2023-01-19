import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '@app/security/models/role';

@Component({
  selector: 'security-role-form',
  templateUrl: './security-role-form.component.html',
  styleUrls: ['./security-role-form.component.sass']
})
export class SecurityRoleFormComponent implements OnInit, OnChanges {

  @Input() public role = new Role();

  @Output() public save = new EventEmitter<Role>();

  @Output() public valueChange = new EventEmitter<Role>();

  @Output() public validChange = new EventEmitter<boolean>();

  public form: FormGroup = this.fb.group({
    id: [-1],
    name: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder
  ) {
    this.form.statusChanges.subscribe(status => {
      if (status === "VALID") {
        this.validChange.emit(true);
      } else {
        this.validChange.emit(false);
      }
    });
    this.form.valueChanges.subscribe(value => {
      this.valueChange.emit(value);
    });
  }

  ngOnInit(): void {
    this.form.patchValue(this.role);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['role'].firstChange) {
      this.form.patchValue(this.role);
    }
  }

  public onSave() {
    this.save.emit(this.form.value);
  }

}
