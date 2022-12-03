import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Member } from '@app/models/member';

@Component({
  selector: 'crud-form-member',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.sass']
})
export class MemberFormComponent implements OnChanges {

  @Input() public data: Member = new Member();

  @Output() public save = new EventEmitter<Member>();

  @Output() public validChange = new EventEmitter<boolean>();

  public form: FormGroup = this.fb.group({
    id: [-1],
    name: ['', Validators.required],
    surname: [''],
    identifier: [''],
    phone: [''],
    active: [false, Validators.required]
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['data'].firstChange) {
      this.form.patchValue(this.data);
    }
  }

  public onSave() {
    this.save.emit(this.form.value);
  }

}
