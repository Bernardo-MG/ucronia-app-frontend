
import { Component, inject, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookInfo } from '@app/domain/library/book-info';
import { Language } from '@app/domain/library/language';
import { FormStatus, isbnValidator } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { LibraryConfig } from '../library-config';

@Component({
  selector: 'assoc-library-book-creation-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, FloatLabelModule, ButtonModule, MessageModule, SelectModule],
  templateUrl: './library-book-creation-form.html'
})
export class LibraryBookCreationForm implements OnChanges {

  public readonly loading = input(false);

  public readonly failures = input(new FailureStore());

  public readonly save = output<{ book: BookInfo, kind: 'fiction' | 'game' }>();

  public formStatus: FormStatus;

  public form: FormGroup;

  public readonly languages: Language[] = [];

  public options: { name: string, value: string }[] = [];

  public kind: 'fiction' | 'game' = 'game';

  constructor() {
    const fb = inject(FormBuilder);
    const config = inject(LibraryConfig);

    this.options = [
      { name: 'Juego', value: 'game' },
      { name: 'Ficción', value: 'fiction' }
    ];

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
  public onSave() {
    if (this.form.valid) {
      // Valid form, can emit data
      this.save.emit({ book: this.form.value, kind: this.kind });
    }
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || (this.failures().hasFailures(property));
  }

}
