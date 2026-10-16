import { Component, inject, input, OnChanges, output, SimpleChanges, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { Asset, AssetFolder } from '@ucronia/domain';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

export interface FileFormData {
  metadata: Asset;
  content?: File;
}

@Component({
  selector: 'assoc-file-form',
  imports: [DrawerFormActions, InputTextModule, MessageModule, ReactiveFormsModule, SelectModule, TextareaModule, ToggleSwitchModule],
  templateUrl: './file-form.html'
})
export class FileForm implements OnChanges {
  private readonly fb = inject(FormBuilder);

  public readonly data = input<Asset | undefined>();
  public readonly folders = input<AssetFolder[]>([]);
  public readonly formId = input<string | null>(null);
  public readonly showActions = input(true);

  @Input() public set loading(loading: boolean) {
    this.formStatus.loading = loading;
  }

  public readonly failures = input(new FailureStore());
  public readonly save = output<FileFormData>();
  public readonly cancelEdition = output<void>();

  public readonly form: FormGroup;
  public readonly formStatus: FormStatus;
  public file?: File;

  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled && (!!this.data() || !!this.file);
  }

  constructor() {
    this.form = this.fb.group({
      number: [0],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(500)],
      publicAccess: [true],
      folderNumber: [null]
    });
    this.formStatus = new FormStatus(this.form);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.form.reset(this.data() || new Asset());
      this.file = undefined;
    }
  }

  public onFileSelected(event: Event): void {
    this.file = (event.target as HTMLInputElement).files?.[0];
    this.form.markAsDirty();
  }

  public onSave(): void {
    this.form.markAllAsTouched();

    if (this.saveEnabled) {
      this.save.emit({ metadata: Object.assign(new Asset(), this.form.value), content: this.file });
    }
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || this.failures().hasFailures(property);
  }

  public get folderOptions(): FolderOption[] {
    return [
      { name: 'Sin carpeta', number: null },
      ...this.folders().map(folder => ({ name: this.folderPath(folder), number: folder.number }))
    ];
  }

  private folderPath(folder: AssetFolder): string {
    const names = [folder.name];
    let parent = this.folders().find(item => item.number === folder.parentNumber);
    while (parent) {
      names.unshift(parent.name);
      parent = this.folders().find(item => item.number === parent?.parentNumber);
    }
    return names.join(' / ');
  }

}

interface FolderOption {
  name: string;
  number: number | null;
}
