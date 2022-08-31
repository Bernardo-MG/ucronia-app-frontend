import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fee } from '@app/models/fee';
import { Member } from '@app/models/member';

@Component({
  selector: 'fee-form',
  templateUrl: './fee-form.component.html',
  styleUrls: ['./fee-form.component.sass']
})
export class FeeFormComponent {

  @Input() public members: Member[] = [];

  @Output() public save = new EventEmitter<Fee>();

  form: FormGroup = this.fb.group({
    memberId: [0, Validators.required],
    month: [new Date().getMonth(), Validators.required],
    year: [new Date().getFullYear(), Validators.required],
    paid: [true, Validators.required]
  });

  constructor(
    private fb: FormBuilder
  ) {
  }

  public saveData() {
    this.save.emit(this.form.value);
  }

  public canSave(): boolean {
    return this.form.valid;
  }

}
