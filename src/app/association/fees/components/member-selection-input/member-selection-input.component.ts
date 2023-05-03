import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Member } from '@app/association/models/member';

@Component({
  selector: 'assoc-member-selection-input',
  templateUrl: './member-selection-input.component.html',
  styleUrls: ['./member-selection-input.component.sass']
})
export class MemberSelectionFormComponent {

  @Input() public saving = false;
  
  @Input() public member = new Member();

  @Output() public requestMember = new EventEmitter<void>();
  
  constructor() { }

  public isMissingMember(): boolean {
    return this.member.id <= 0;
  }

  public onRequestMember() {
    this.requestMember.emit();
  }

  public getName(): string {
    return this.member.name + ' ' + this.member.surname;
  }

}
