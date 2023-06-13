import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Failure } from '@app/core/api/models/failure';

@Component({
  selector: 'access-user-form',
  templateUrl: './access-user-form.component.html'
})
export class AccessUserFormComponent {

  @Input() public readonly = false;

  @Input() public failures: Map<string, Failure[]> = new Map<string, Failure[]>();
  
  @Output() public save = new EventEmitter<any>();

  public form;

  constructor(
    fb: FormBuilder
  ) {
    this.form = fb.group({
      username: ['', Validators.required],
      name: [''],
      email: [''],
      credentialsExpired: [true, Validators.required],
      enabled: [true, Validators.required],
      expired: [true, Validators.required],
      locked: [true, Validators.required]
    });
  }

  public onSave(){
    this.save.emit();
  }
  
  public isInvalid(property: string): boolean {
    return (this.form.get(property)?.invalid) || (this.failures.has(property));
  }

  public getFailures(property: string): Failure[] {
    let failures: Failure[];

    const found = this.failures.get(property);
    if (found) {
      failures = (found as Failure[]);
    } else {
      failures = [];
    }

    return failures;
  }

}
