import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fee } from '@app/association/models/fee';
import { Failure } from '@app/core/api/models/failure';

@Component({
  selector: 'assoc-fee-form',
  templateUrl: './fee-form.component.html',
  styleUrls: ['./fee-form.component.sass']
})
export class FeeFormComponent implements OnInit, OnChanges {

  @Input() public readonly = false;

  @Input() public failures: { [key: string]: Failure[] } = {};

  @Input() public data = new Fee();

  @Output() public save = new EventEmitter<Fee>();

  @Output() public valueChange = new EventEmitter<Fee>();

  @Output() public validityChange = new EventEmitter<boolean>();

  public form: FormGroup;

  constructor(
    fb: FormBuilder
  ) {
    this.form = fb.group({
      id: [-1],
      memberId: [null, Validators.required],
      date: [new Date(), Validators.required],
      paid: [false, Validators.required]
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
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
