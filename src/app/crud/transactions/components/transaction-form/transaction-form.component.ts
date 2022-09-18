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

  @Input() public disabledSave: boolean = false;

  @Input() public disabledDelete: boolean = false;

  @Output() public save = new EventEmitter<Transaction>();

  @Output() public delete = new EventEmitter<number>();

  public form: FormGroup = this.fb.group({
    id: [-1],
    description: ['', Validators.required],
    payDate: [new Date(), Validators.required],
    amount: [0, Validators.required]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['data'].firstChange) {
      // Create the date
      let date;
      let month;
      let day;

      const payDate = new Date(this.data.payDate);

      if (payDate.getMonth() >= 9) {
        month = `${payDate.getMonth() + 1}`;
      } else {
        month = `0${payDate.getMonth() + 1}`;
      }

      if (payDate.getDate() >= 10) {
        day = `${payDate.getDate()}`;
      } else {
        day = `0${payDate.getDate()}`;
      }

      date = `${payDate.getFullYear()}-${month}-${day}`;
      const update: any = {
        ...this.data,
        payDate: date
      }
      this.form.patchValue(update);
    }
  }

  public saveData() {
    this.save.emit(this.form.value);
  }

  public deleteData() {
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

}
