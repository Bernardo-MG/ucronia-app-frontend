import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Failure } from '@app/core/api/models/failure';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent<Data> implements OnInit {

  @Input() public readonly = false;

  @Input() public failures: { [key: string]: Failure[] } = {};

  @Input() public set data(value: Data) {
    this.form.patchValue(value as any);
  }

  @Output() public save = new EventEmitter<Data>();

  @Output() public valueChange = new EventEmitter<Data>();

  @Output() public validityChange = new EventEmitter<boolean>();

  constructor(
    public form: FormGroup<any>
  ) {}

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
    this.save.emit();
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
