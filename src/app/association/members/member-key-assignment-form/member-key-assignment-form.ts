import { Component, inject, input, Input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { PublicMember } from '@ucronia/domain';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'assoc-member-key-assignment-form',
  imports: [ReactiveFormsModule, DrawerFormActions, MessageModule, SelectModule],
  templateUrl: './member-key-assignment-form.html'
})
export class MemberKeyAssignmentForm {

  private readonly fb = inject(FormBuilder);

  public readonly formId = input<string | null>(null);
  public readonly showActions = input(true);
  public readonly failures = input(new FailureStore());
  public readonly members = input<PublicMember[]>([]);

  public readonly save = output<number>();
  public readonly cancelEdition = output<void>();

  public readonly form = this.fb.group({
    profile: this.fb.control<number | null>(null, Validators.required)
  });

  public readonly formStatus = new FormStatus(this.form);

  @Input() public set loading(value: boolean) {
    this.formStatus.loading = value;
  }

  public get options(): { number: number, label: string }[] {
    return this.members().map(member => ({
      number: member.number,
      label: member.memberNumber == null ? member.name.fullName : `#${member.memberNumber} - ${member.name.fullName}`
    }));
  }

  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled && this.members().some(member => member.number === this.form.controls.profile.value);
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || this.failures().hasFailures(property);
  }

  public onSave(): void {
    this.form.markAllAsTouched();

    if (this.saveEnabled) {
      this.save.emit(this.form.controls.profile.value!);
    }
  }

}
