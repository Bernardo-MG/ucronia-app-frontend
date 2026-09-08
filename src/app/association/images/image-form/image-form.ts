import { Component, inject, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { Image } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TextareaModule } from 'primeng/textarea';

export interface ImageFormData {
  image: Image;
  file?: File;
}

@Component({
  selector: 'assoc-image-form',
  imports: [ButtonModule, InputTextModule, MessageModule, ReactiveFormsModule, TextareaModule],
  templateUrl: './image-form.html'
})
export class ImageForm implements OnChanges {
  private readonly fb = inject(FormBuilder);

  public readonly data = input<Image | undefined>();
  public readonly loading = input(false);
  public readonly failures = input(new FailureStore());
  public readonly save = output<ImageFormData>();
  public readonly cancelEdition = output<void>();

  public readonly form: FormGroup;
  public readonly formStatus: FormStatus;
  public file?: File;

  constructor() {
    this.form = this.fb.group({
      number: [0],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(500)]
    });
    this.formStatus = new FormStatus(this.form);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.form.reset(this.data() || new Image());
      this.file = undefined;
    }
    if (changes['loading']) this.formStatus.loading = this.loading();
  }

  public onFileSelected(event: Event): void {
    this.file = (event.target as HTMLInputElement).files?.[0];
    this.form.markAsDirty();
  }

  public onSave(): void {
    if (!this.formStatus.saveEnabled || (!this.data() && !this.file)) return;
    this.save.emit({ image: Object.assign(new Image(), this.form.value), file: this.file });
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || this.failures().hasFailures(property);
  }
}
