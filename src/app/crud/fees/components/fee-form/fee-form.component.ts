import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fee } from '@app/models/fee';
import { Member } from '@app/models/member';

@Component({
  selector: 'fee-form',
  templateUrl: './fee-form.component.html',
  styleUrls: ['./fee-form.component.sass']
})
export class FeeFormComponent implements OnChanges {

  @Input() public data: Fee = new Fee();

  @Input() public members: Member[] = [];

  @Input() public disabledSave: boolean = false;

  @Input() public disabledDelete: boolean = false;

  @Output() public save = new EventEmitter<Fee>();

  @Output() public delete = new EventEmitter<number>();

  form: FormGroup = this.fb.group({
    memberId: [0, Validators.required],
    month: [new Date().getMonth(), Validators.required],
    year: [new Date().getFullYear(), Validators.required],
    paid: [true, Validators.required]
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
