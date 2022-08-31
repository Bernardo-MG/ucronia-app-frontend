import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Member } from '@app/models/member';

@Component({
  selector: 'member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.sass']
})
export class MemberFormComponent implements OnInit, OnChanges {

  @Input() public member: Member = new Member();

  @Input() public disabledSave: boolean = false;

  @Input() public disabledDelete: boolean = false;

  @Output() public save = new EventEmitter<Member>();

  @Output() public delete = new EventEmitter<number>();

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
