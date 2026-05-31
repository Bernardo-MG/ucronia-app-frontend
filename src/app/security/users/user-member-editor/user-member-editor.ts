
import { Component, inject, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Member } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { FormStatus } from 'projects/bernardo-mg/form/src/lib/status/form-status';
import { FailureStore } from 'projects/bernardo-mg/request/src/lib/models/failure-store';
import { EMPTY, Observable } from 'rxjs';
import { UserMemberSearch, UserSearchEvent } from '../user-member-search/user-member-search';

@Component({
  selector: 'access-user-member-editor',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, TableModule, MessageModule, UserMemberSearch],
  templateUrl: './user-member-editor.html'
})
export class UserMemberEditor implements OnChanges {

  public readonly member = input(new Member());
  public readonly members = input<Member[]>([]);
  public readonly failures = input(new FailureStore());

  public readonly assignMember = output<Member>();
  public readonly searchMember = output<UserSearchEvent>();

  public selected: Member[] = [];

  public formStatus: FormStatus;
  public form: FormGroup;

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      fullName: [{ value: '', disabled: true }]
    });
    
    this.formStatus = new FormStatus(this.form);
  }

  public ngOnChanges({ member }: SimpleChanges): void {
    if (member) {
      this.form.get('fullName')?.setValue(member.currentValue.name.fullName);
    }
  }

  public onSelectMember(member: Member): void {
    this.form.get('fullName')?.setValue(member.name.fullName);
    this.assignMember.emit(member);
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || (this.failures().hasFailures(property));
  }

}
