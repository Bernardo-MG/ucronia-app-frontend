import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'admin-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.sass']
})
export class MemberFormComponent {

  @Input() member: FormGroup = new FormGroup({});

  @Output() save = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder
  ) { }

  public saveData() {
    this.save.emit();
  }

}
