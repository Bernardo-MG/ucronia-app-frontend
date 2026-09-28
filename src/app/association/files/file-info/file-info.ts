import { DatePipe } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { StoredFile } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'assoc-file-info',
  imports: [ButtonModule, DatePipe, InputTextModule, SkeletonModule],
  templateUrl: './file-info.html'
})
export class FileInfo {

  private readonly messages = inject(MessageService);

  public readonly data = input(new StoredFile());
  public readonly loading = input(false);
  public readonly source = input('');
  public readonly download = output<StoredFile>();

  public async copyUrl(): Promise<void> {
    await navigator.clipboard.writeText(this.source());
    this.messages.add({
      severity: 'success',
      summary: 'URL copiada',
      detail: 'El enlace del archivo se ha copiado al portapapeles',
      life: 3000
    });
  }

  public formatSize(size: number): string {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / 1024 / 1024).toFixed(1)} MB`;
  }
}
