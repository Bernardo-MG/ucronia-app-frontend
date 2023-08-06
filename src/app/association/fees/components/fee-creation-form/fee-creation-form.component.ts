import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeePayment } from '@app/association/models/fee-payment';
import { Failure } from '@app/core/api/models/failure';

@Component({
  selector: 'assoc-fee-form',
  templateUrl: './fee-creation-form.component.html'
})
export class FeeCreationFormComponent implements OnInit, OnChanges {

  @Input() public readonly = false;

  @Input() public failures: { [key: string]: Failure[] } = {};

  @Input() public data = new FeePayment();

  @Output() public save = new EventEmitter<FeePayment>();

  @Output() public valueChange = new EventEmitter<FeePayment>();

  @Output() public validityChange = new EventEmitter<boolean>();

  public form: FormGroup;

  constructor(
    fb: FormBuilder
  ) {
    this.form = fb.group({
      id: [-1],
      memberId: [null, Validators.required],
      paymentDate: [new Date(), Validators.required],
      amount: [0, Validators.required],
      description: ['', Validators.required],
      feeDates: [[], Validators.required]
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
