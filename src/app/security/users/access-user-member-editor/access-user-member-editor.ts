
import { Component, inject, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Member } from '@app/domain/members/member';
import { PaginatedResponse } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { EMPTY, Observable } from 'rxjs';
import { AccessUserSelectMember } from '../access-user-select-member/access-user-select-member';

@Component({
  selector: 'access-user-member-editor',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, AccessUserSelectMember, InputTextModule],
  templateUrl: './access-user-member-editor.html'
})
export class AccessUserMemberEditor implements OnChanges {

  public readonly getSelection = input<(page: number) => Observable<PaginatedResponse<Member>>>((page: number) => EMPTY);
  public readonly getMember = input<(username: string) => Observable<Member>>((username: string) => EMPTY);
  public readonly username = input('');
  public readonly member = input(new Member());
  public readonly waitingMembersSelection = input(false);

  public readonly assignMember = output<Member>();

  public view: 'member' | 'select' = 'member';

  public form: FormGroup;

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      fullName: [{value: '', disabled: true}]
    });
  }

  public ngOnChanges({ member }: SimpleChanges): void {
    if (member) {
      this.form.get('fullName')?.setValue(member.currentValue.name.fullName);
    }
  }

  public onShowSelectMember() {
    this.view = "select";
  }

  public onCancelSelectMember() {
    this.view = "member";
  }

  public onSelectMember(member: Member): void {
    this.form.get('fullName')?.setValue(member.name.fullName);
    this.assignMember.emit(member);
    this.view = "member";
  }

}
