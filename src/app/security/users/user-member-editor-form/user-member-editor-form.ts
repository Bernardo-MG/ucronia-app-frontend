
import { Component, inject, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PublicMember } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { FormStatus } from 'projects/bernardo-mg/form/src/lib/status/form-status';
import { FailureStore } from 'projects/bernardo-mg/request/src/lib/models/failure-store';
import { MemberSearch, MemberSearchEvent } from '../../../shared/member/member-search/member-search';

@Component({
  selector: 'access-user-member-editor-form',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, MessageModule, MemberSearch],
  templateUrl: './user-member-editor-form.html'
})
export class UserMemberEditorForm implements OnChanges {

  public readonly loading = input(false);
  public readonly member = input(new PublicMember());
  public readonly members = input<PublicMember[]>([]);
  public readonly failures = input(new FailureStore());

  public readonly assignMember = output<PublicMember>();
  public readonly searchMember = output<MemberSearchEvent>();

  public selected: PublicMember[] = [];

  public formStatus: FormStatus;
  public form: FormGroup;

  public selectedMember = new PublicMember();

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      fullName: [null, Validators.required]
    });

    this.formStatus = new FormStatus(this.form);
  }

  public ngOnChanges({ member }: SimpleChanges): void {
    if (member) {
      if (member.currentValue) {
        this.selectedMember = member.currentValue;
        this.form.get('fullName')?.setValue(member.currentValue.name.fullName);
      } else {
        this.selectedMember = new PublicMember();
        this.form.get('fullName')?.setValue(null);
      }
    }
  }

  public onSelectMember(member: PublicMember): void {
    this.selectedMember = member;
    this.form.get('fullName')?.setValue(member.name.fullName);
    // TODO: this shouldn't be needed
    this.form.markAsDirty();
  }

  public onRemoveMember(): void {
    this.selectedMember = new PublicMember();
    this.form.get('fullName')?.setValue(null);
    // TODO: this shouldn't be needed
    this.form.markAsDirty();
    this.assignMember.emit(this.selectedMember);
  }

  public onSave(): void {
    if (this.form.valid) {
      // Valid form, can emit data
      this.assignMember.emit(this.selectedMember);
    }
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || (this.failures().hasFailures(property));
  }

}
