
import { Component, inject, input, Input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookInfo } from '@app/domain/library/book-info';
import { Language } from '@app/domain/library/language';
import { FormStatus, isbnValidator } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { LibraryConfig } from '../library-config';

@Component({
  selector: 'assoc-library-book-edition-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, DatePickerModule, FloatLabelModule, ButtonModule, MessageModule, SelectModule],
  templateUrl: './library-book-edition-form.html'
})
export class LibraryBookEditionForm implements OnChanges {

  public readonly loading = input(false);

  public readonly failures = input(new FailureStore());

  @Input() public set data(value: BookInfo) {
    this.form.patchValue(value as any);
  }

  public readonly save = output<BookInfo>();

  public formStatus: FormStatus;

  public form: FormGroup;

  public readonly languages: Language[] = [];

  public view = 'form';

  constructor() {
    const fb = inject(FormBuilder);
    const config = inject(LibraryConfig);

    this.languages = config.getLanguages();

    this.form = fb.group({
      number: [undefined],
      index: [-1],
      isbn: ['', isbnValidator],
      title: fb.group({
        supertitle: [''],
        title: ['', Validators.required],
        subtitle: ['']
      }),
      language: ['', Validators.required],
      publishDate: [''],
      authors: [[]],
      donation: fb.group({
        date: [''],
        donors: [[]]
      }),
      bookType: [],
      publishers: [[]],
      gameSystem: []
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
      this.save.emit(this.form.value);
    }
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || (this.failures().hasFailures(property));
  }

}
