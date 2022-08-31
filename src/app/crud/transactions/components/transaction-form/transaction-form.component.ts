import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '@app/models/transaction';

@Component({
  selector: 'transaction-form',
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
    day: [new Date().getDay(), Validators.required],
    month: [new Date().getMonth(), Validators.required],
    year: [new Date().getFullYear(), Validators.required],
    quantity: [0, Validators.required]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.form.patchValue(this.data);
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

  public canSave(): boolean{
    return ((!this.disabledSave) && (this.form.valid));
  }

  public canDelete(): boolean{
    return ((!this.disabledDelete) && (this.form.valid));
  }

}
