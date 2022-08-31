import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '@app/models/transaction';

@Component({
  selector: 'transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.sass']
})
export class TransactionFormComponent {

  @Output() public save = new EventEmitter<Transaction>();

  public form: FormGroup = this.fb.group({
    id: [-1],
    description: ['', Validators.required],
    day: [new Date().getDay(), Validators.required],
    month: [new Date().getMonth(), Validators.required],
    year: [new Date().getFullYear(), Validators.required],
    quantity: [0, Validators.required]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  public saveData() {
    this.save.emit(this.form.value);
  }

  public canSave(): boolean {
    return this.form.valid;
  }

}
