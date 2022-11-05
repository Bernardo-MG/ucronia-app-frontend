import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '@app/security/models/role';

@Component({
  selector: 'security-role-form',
  templateUrl: './security-role-form.component.html',
  styleUrls: ['./security-role-form.component.sass']
})
export class SecurityRoleFormComponent implements OnChanges {

  @Input() public role = new Role();

  @Input() public disabledSave: boolean = false;

  @Input() public disabledDelete: boolean = false;

  @Output() public save = new EventEmitter<Role>();

  @Output() public delete = new EventEmitter<void>();

  public form: FormGroup = this.fb.group({
    id: [-1],
    name: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['role'].firstChange) {
      this.form.patchValue(this.role);
    }
  }

  public onSave() {
    this.save.emit(this.form.value);
  }

  public onDelete() {
    this.delete.emit();
  }

  public canSave(): boolean {
    return ((!this.disabledSave) && (this.form.valid));
  }

  public canDelete(): boolean {
    return ((!this.disabledDelete) && (this.form.valid));
  }

  public isFormInvalid(): boolean {
    return this.form.invalid && (this.form.dirty || this.form.touched);
  }

}
