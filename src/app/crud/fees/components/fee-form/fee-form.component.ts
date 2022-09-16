import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fee } from '@app/models/fee';
import { Member } from '@app/models/member';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'crud-form-fee',
  templateUrl: './fee-form.component.html',
  styleUrls: ['./fee-form.component.sass']
})
export class FeeFormComponent implements OnChanges {

  @Input() public data = new Fee();

  @Input() public member = new Member();

  @Input() public disabledSave: boolean = false;

  @Input() public disabledDelete: boolean = false;

  @Output() public save = new EventEmitter<Fee>();

  @Output() public delete = new EventEmitter<number>();

  @Output() public selectMember = new EventEmitter<void>();

  public searchIcon = faMagnifyingGlass;

  form: FormGroup = this.fb.group({
    id: [-1],
    memberId: [0, Validators.required],
    date: [new Date(), Validators.required],
    paid: [true, Validators.required]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['data'].firstChange) {
      // Create the date from the year and month
      let date;

      if (this.data.month >= 10) {
        date = `${this.data.year}-${this.data.month}`;
      } else {
        date = `${this.data.year}-0${this.data.month}`;
      }
      const update: any = {
        ...this.data,
        date
      }
      this.form.patchValue(update);
    }
  }

  public saveData() {
    const fee: Fee = { ...this.form.value };

    const date = new Date(this.form.value.date);
    // Correct the month index, which starts at 0
    fee.month = date.getMonth() + 1;
    fee.year = date.getFullYear();

    this.save.emit(fee);
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

  public onSelectMember() {
    this.selectMember.emit();
  }

}
