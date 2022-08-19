import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Member } from '@app/models/member';

@Component({
  selector: 'admin-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.sass']
})
export class MemberFormComponent implements OnInit, OnChanges {

  @Input() member: Member = new Member();

  @Input() disabledSave: boolean = false;

  @Input() disabledDelete: boolean = false;

  @Output() save = new EventEmitter<Member>();

  @Output() delete = new EventEmitter<Member>();

  form: FormGroup = this.fb.group({
    id: [-1],
    name: ['', Validators.required],
    surname: [''],
    identifier: [''],
    phone: [''],
    active: [false, Validators.required]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form.patchValue(this.member);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.form.patchValue(this.member);
  }

  public saveData() {
    this.save.emit(this.form.value);
  }

  public deleteData() {
    const id = this.form.get('id');

    if (id) {
      this.save.emit(id.value);
    }
  }

  public canSave(): boolean{
    return ((!this.disabledSave) && (this.form.valid));
  }

  public canDelete(): boolean{
    return ((!this.disabledDelete) && (this.form.valid));
  }

}
