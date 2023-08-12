import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Fee } from '@app/association/models/fee';
import { Member } from '@app/association/models/member';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'assoc-fee-creation-form',
  templateUrl: './fee-creation-form.component.html'
})
export class FeeCreationFormComponent extends FormComponent<Fee> {

  @Input() public waitingMembers = false;

  @Input() public members: Member[] = [];

  @Input() public membersPage = 0;

  @Input() public membersTotalPages = 0;

  @Output() public goToMembersPage = new EventEmitter<number>();

  public selectingMember = false;

  public member = new Member();

  public searchIcon = faMagnifyingGlass;

  constructor(
    private fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      id: [-1],
      memberId: [null, [Validators.required, Validators.min(0)]],
      paymentDate: [null, Validators.required],
      feeDates: fb.array([], Validators.required),
      amount: [0, Validators.required],
      description: ['', Validators.required]
    });
  }

  public onSelectMember(member: Member) {
    this.member = member;
    this.data = { ...this.data, memberId: member.id };
    this.selectingMember = false;
  }

  public onStartSelectingMember() {
    this.onGoToMembersPage(0);
    this.selectingMember = true;
  }

  public onCancelSelectMember() {
    this.selectingMember = false;
  }

  public onGoToMembersPage(page: number) {
    this.goToMembersPage.emit(page);
  }

  public getMemberName() {
    return this.member.name + ' ' + this.member.surname;
  }

  public addDate() {
    const dates = this.form.get('feeDates') as FormArray;
    dates.push(this.fb.control(''));
  }

  public removeDate(index: number): void {
    const feeDatesArray = this.form.get('feeDates') as FormArray;
    feeDatesArray.removeAt(index);
  }

}
