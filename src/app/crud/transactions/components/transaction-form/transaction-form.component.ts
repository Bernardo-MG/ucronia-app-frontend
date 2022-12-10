import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '@app/models/transaction';

@Component({
  selector: 'crud-form-transaction',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.sass']
})
export class TransactionFormComponent implements OnChanges {

  @Input() public data: Transaction = new Transaction();

  @Output() public save = new EventEmitter<Transaction>();

  @Output() public valueChange = new EventEmitter<Transaction>();

  @Output() public validChange = new EventEmitter<boolean>();

  public form: FormGroup = this.fb.group({
    id: [-1],
    description: ['', Validators.required],
    date: [new Date(), Validators.required],
    amount: [0, Validators.required]
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

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['data'].firstChange) {
      // Create the date
      let formattedDate;
      let month;
      let day;

      const date = new Date(this.data.date);

      if (date.getMonth() >= 9) {
        month = `${date.getMonth() + 1}`;
      } else {
        month = `0${date.getMonth() + 1}`;
      }

      if (date.getDate() >= 10) {
        day = `${date.getDate()}`;
      } else {
        day = `0${date.getDate()}`;
      }

      formattedDate = `${date.getFullYear()}-${month}-${day}`;
      const update: any = {
        ...this.data,
        date: formattedDate
      }
      this.form.patchValue(update);
    }
  }

  public onSave() {
    this.save.emit(this.form.value);
  }

}
