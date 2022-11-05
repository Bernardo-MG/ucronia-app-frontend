import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fee } from '@app/models/fee';
import { Member } from '@app/models/member';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'crud-form-fee',
  templateUrl: './fee-form.component.html',
  styleUrls: ['./fee-form.component.sass']
})
export class FeeFormComponent implements OnInit, OnChanges {

  @Input() public data = new Fee();

  @Input() public member = new Member();

  @Input() public disabledSave: boolean = false;

  @Input() public disabledDelete: boolean = false;

  @Output() public save = new EventEmitter<Fee>();

  @Output() public delete = new EventEmitter<number>();

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
  ) { }

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
      memberId: this.member.id,
      date
    });
  }

  public onDelete() {
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

  public isFormInvalid(): boolean {
    return this.form.invalid && (this.form.dirty || this.form.touched);
  }

  private reload() {
    // Create the date from the year and month
    let formattedDate;
    let month;

    const date = new Date(this.data.date);

    if (date.getMonth() >= 9) {
      month = `${date.getMonth() + 1}`;
    } else {
      month = `0${date.getMonth() + 1}`;
    }

    formattedDate = `${date.getFullYear()}-${month}`;
    const update: any = {
      ...this.data,
      date: formattedDate
    }
    this.form.patchValue(update);
  }

}
