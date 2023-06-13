import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '@app/association/models/transaction';
import { Failure } from '@app/core/api/models/failure';

@Component({
  selector: 'assoc-transaction-form',
  templateUrl: './transaction-form.component.html'
})
export class TransactionFormComponent implements OnInit, OnChanges {

  @Input() public readonly = false;

  @Input() public failures = new Map<string, Failure[]>();

  @Input() public data = new Transaction();

  @Output() public save = new EventEmitter<any>();

  @Output() public valueChange = new EventEmitter<Transaction>();

  @Output() public validityChange = new EventEmitter<boolean>();

  public form: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      id: [-1],
      description: ['', Validators.required],
      date: [null, Validators.required],
      amount: [0, Validators.required]
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
