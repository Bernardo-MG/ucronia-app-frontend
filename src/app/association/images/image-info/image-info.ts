import { AuditInfo } from '@app/shared/audit/audit-info/audit-info';
import { Component, inject, input } from '@angular/core';
import { Asset } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { ImageContent } from '../image-content/image-content';

@Component({
  selector: 'assoc-image-info',
  imports: [AuditInfo, ButtonModule, ImageContent, InputTextModule, SkeletonModule],
  templateUrl: './image-info.html'
})
export class ImageInfo {

  private readonly messages = inject(MessageService);

  public readonly data = input(new Asset());
  public readonly loading = input(false);
  public readonly source = input('');

  public async copyUrl(): Promise<void> {
    await navigator.clipboard.writeText(this.source());
    this.messages.add({
      severity: 'success',
      summary: 'URL copiada',
      detail: 'El enlace de la imagen se ha copiado al portapapeles',
      life: 3000
    });
  }

  public formatSize(size: number): string {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / 1024 / 1024).toFixed(1)} MB`;
  }
}
