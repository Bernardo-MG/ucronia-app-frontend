import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/core/authentication/models/user';

@Component({
  selector: 'access-user-form',
  templateUrl: './access-user-form.component.html'
})
export class AccessUserFormComponent implements OnInit, OnChanges {

  @Input() public user = new User();

  @Output() public save = new EventEmitter<User>();

  @Output() public valueChange = new EventEmitter<User>();

  @Output() public validChange = new EventEmitter<boolean>();

  public form: FormGroup = this.fb.group({
    id: [-1],
    username: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', Validators.required],
    credentialsExpired: [false, Validators.required],
    enabled: [false, Validators.required],
    expired: [false, Validators.required],
    locked: [false, Validators.required]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form.patchValue(this.user);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['user'].firstChange) {
      this.form.patchValue(this.user);
    }
  }

  public onSave() {
    this.save.emit(this.form.value);
  }

}
