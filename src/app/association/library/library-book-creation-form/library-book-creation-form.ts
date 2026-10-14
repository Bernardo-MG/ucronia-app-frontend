import { Component, inject, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { FormStatus, isbnValidator } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { Language, Title } from '@ucronia/domain';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { LibraryConfig } from '../library-config';

@Component({
  selector: 'assoc-library-book-creation-form',
  imports: [DrawerFormActions, ReactiveFormsModule, InputTextModule, MessageModule, SelectModule],
  templateUrl: './library-book-creation-form.html'
})
export class LibraryBookCreationForm implements OnChanges {

  public readonly formId = input<string | null>(null);
  public readonly showActions = input(true);

  public readonly loading = input(false);

  public readonly failures = input(new FailureStore());

  public readonly save = output<LibraryBookCreationFormData>();
  public readonly cancelEdition = output<void>();

  public formStatus: FormStatus;

  public form: FormGroup;

  public readonly languages: Language[] = [];

  public kind: 'fiction' | 'game' = 'game';

  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }

  constructor() {
    const fb = inject(FormBuilder);
    const config = inject(LibraryConfig);

    this.languages = config.getLanguages();

    this.form = fb.group({
      isbn: ['', isbnValidator],
      title: fb.group({
        supertitle: [''],
        title: ['', Validators.required],
        subtitle: ['']
      }),
      language: ['', Validators.required]
    });

    this.formStatus = new FormStatus(this.form);
  }

  public ngOnChanges({ loading }: SimpleChanges): void {
    if (loading) {
      this.formStatus.loading = this.loading();
    }
  }

  /**
   * Handler for the save event.
   */
  public onSave(): void {
    this.form.markAllAsTouched();

    if (this.saveEnabled) {
      this.save.emit({ book: this.form.value, kind: this.kind });
    }
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || this.failures().hasFailures(property);
  }

}

export class LibraryBookCreationFormData {
  public book = new LibraryBookCreationFormDataBook();
  public kind: 'fiction' | 'game' = 'fiction';
}

export class LibraryBookCreationFormDataBook {
  public title = new Title();
  public isbn = '';
  public language = '';
}
