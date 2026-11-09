import { Component, inject, input, Input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MemberSearch, MemberSearchEvent } from '@app/shared/member/member-search/member-search';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { PublicMember } from '@ucronia/domain';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-member-key-assignment-form',
  imports: [ReactiveFormsModule, MessageModule, MemberSearch],
  templateUrl: './member-key-assignment-form.html'
})
export class MemberKeyAssignmentForm {

  private readonly fb = inject(FormBuilder);
  public readonly form = inject(FormBuilder).group({
    profile: inject(FormBuilder).control<number | null>(null, Validators.required)
  });

  public readonly failures = input(new FailureStore());
  public readonly formId = input<string | null>(null);
  @Input() public set loading(value: boolean) {
    this.formStatus.loading = value;
  }
  public readonly members = input<PublicMember[]>([]);

  public readonly save = output<number>();
  public readonly searchMember = output<MemberSearchEvent>();

  public readonly formStatus = new FormStatus(this.form);
  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled && this.members().some(member => member.number === this.form.controls.profile.value);
  }

  // Event handlers
  public onClearMember(): void {
    this.form.controls.profile.setValue(null);
    this.form.controls.profile.markAsDirty();
  }

  public onSave(): void {
    this.form.markAllAsTouched();

    if (this.saveEnabled) {
      this.save.emit(this.form.controls.profile.value!);
    }
  }

  public onSelectMember(member: PublicMember): void {
    if (!member || !this.members().some(option => option.number === member.number)) {
      return;
    }
    this.form.controls.profile.setValue(member.number);
    this.form.controls.profile.markAsDirty();
  }

  // Public methods
  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || this.failures().hasFailures(property);
  }

}
