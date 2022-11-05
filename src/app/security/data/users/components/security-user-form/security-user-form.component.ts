import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/security/models/user';

@Component({
  selector: 'security-user-form',
  templateUrl: './security-user-form.component.html',
  styleUrls: ['./security-user-form.component.sass']
})
export class SecurityUserFormComponent implements OnChanges {

  @Input() public user = new User();

  @Input() public disabledSave: boolean = false;

  @Input() public disabledDelete: boolean = false;

  @Output() public save = new EventEmitter<User>();

  @Output() public delete = new EventEmitter<number>();

  public form: FormGroup = this.fb.group({
    id: [-1],
    username: ['', Validators.required],
    email: ['', Validators.required],
    credentialsExpired: [false, Validators.required],
    enabled: [false, Validators.required],
    expired: [false, Validators.required],
    locked: [false, Validators.required]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['user'].firstChange) {
      this.form.patchValue(this.user);
    }
  }

  public onSave() {
    this.save.emit(this.form.value);
  }

  public onDelete() {
    const id = this.form.get('id');

    if (id) {
      this.delete.emit(id.value);
    }
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
