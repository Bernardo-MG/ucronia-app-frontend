import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fee } from '@app/association/models/fee';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'assoc-form-fee',
  templateUrl: './fee-form.component.html',
  styleUrls: ['./fee-form.component.sass']
})
export class FeeFormComponent implements OnInit, OnChanges {

  @Input() public data = new Fee();

  @Input() public memberId = 0;

  @Input() public memberName = '';

  @Output() public save = new EventEmitter<Fee>();

  @Output() public valueChange = new EventEmitter<Fee>();

  @Output() public validChange = new EventEmitter<boolean>();

  @Output() public selectMember = new EventEmitter<void>();

  public searchIcon = faMagnifyingGlass;

  public form: FormGroup = this.fb.group({
    id: [-1],
    memberId: [0, Validators.required],
    date: [new Date(), Validators.required],
    paid: [true, Validators.required]
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
      const date = new Date(this.form.value.date);

      this.valueChange.emit({
        ...this.form.value,
        memberId: this.memberId,
        date
      });
    });
  }

  ngOnInit(): void {
    this.reload();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['data'].firstChange) {
      this.reload();
    }
  }

  public onSave() {
    const date = new Date(this.form.value.date);

    this.save.emit({
      ...this.form.value,
      memberId: this.memberId,
      date
    });
  }

  public onSelectMember() {
    this.selectMember.emit();
  }

  public isFormInvalid(): boolean {
    return this.form.invalid && (this.form.dirty || this.form.touched);
  }

  private reload() {
    // Create the date from the year and month
    let month;

    const date = new Date(this.data.date);

    if (date.getMonth() >= 9) {
      month = `${date.getMonth() + 1}`;
    } else {
      month = `0${date.getMonth() + 1}`;
    }

    const formattedDate = `${date.getFullYear()}-${month}`;
    const update: any = {
      ...this.data,
      date: formattedDate
    }
    this.form.patchValue(update);
  }

}
