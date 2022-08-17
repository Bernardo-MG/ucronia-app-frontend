import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Member } from '@app/models/member';

@Component({
  selector: 'admin-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.sass']
})
export class MemberFormComponent {

  @Input() member: FormGroup = this.fb.group({
    name: ['', Validators.required],
    surname: [''],
    identifier: [''],
    phone: [''],
    active: [false, Validators.required]
  });

  @Output() save = new EventEmitter<Member>();

  constructor(
    private fb: FormBuilder
  ) { }

  public saveData() {
    this.save.emit(this.member.value);
  }

}
