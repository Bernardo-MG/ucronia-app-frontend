import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Failure } from '@app/core/api/models/failure';
import { User } from '@app/core/authentication/models/user';

@Component({
  selector: 'access-user-form',
  templateUrl: './access-user-form.component.html'
})
export class AccessUserFormComponent implements OnInit, OnChanges {

  @Input() public readonly = false;

  @Input() public failures: { [key: string]: Failure[] } = {};

  @Input() public data = new User();

  @Output() public save = new EventEmitter<User>();

  @Output() public valueChange = new EventEmitter<User>();

  @Output() public validityChange = new EventEmitter<boolean>();

  public form: FormGroup;

  constructor(
    fb: FormBuilder
  ) {
    this.form = fb.group({
      id: [null],
      username: ['', Validators.required],
      name: [''],
      email: [''],
      credentialsExpired: [true, Validators.required],
      enabled: [true, Validators.required],
      expired: [true, Validators.required],
      locked: [true, Validators.required]
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if ((changes['data']) && (!changes['data'].firstChange)) {
      this.form.patchValue(this.data);
    }
  }

  public ngOnInit(): void {
    // Listen for status changes
    this.form.statusChanges.subscribe(status => {
      const valid = (status === "VALID");
      this.validityChange.emit(valid);
    });

    // Listen for value changes
    this.form.valueChanges.subscribe(data => {
      this.valueChange.emit(data);
    });
  }

  public onSave() {
    this.save.emit(this.form.value);
  }

  public isInvalid(property: string): boolean {
    return (this.form.get(property)?.invalid) || (property in this.failures);
  }

  public getFailures(property: string): Failure[] {
    let failures: Failure[];

    const found = this.failures[property];
    if (found) {
      failures = (found as Failure[]);
    } else {
      failures = [];
    }

    return failures;
  }

}
