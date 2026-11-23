import { AuditInfo } from '@app/shared/audit/audit-info/audit-info';
import { Component, inject, input, ChangeDetectionStrategy } from '@angular/core';
import { Asset } from '@ucronia/domain';
import { MessageService } from '@openng/optimus-ui/api';
import { ButtonModule } from '@openng/optimus-ui/button';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { SkeletonModule } from '@openng/optimus-ui/skeleton';
import { ImageContent } from '../image-content/image-content';

@Component({
  selector: 'assoc-image-info',
  imports: [AuditInfo, ButtonModule, ImageContent, InputTextModule, SkeletonModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './image-info.html'
})
export class ImageInfo {

  private readonly messages = inject(MessageService);

  public readonly data = input(new Asset());
  public readonly loading = input(false);
  public readonly source = input('');

  // Event handlers
  public async copyUrl(): Promise<void> {
    await navigator.clipboard.writeText(this.source());
    this.messages.add({
      severity: 'success',
      summary: 'URL copiada',
      detail: 'El enlace de la imagen se ha copiado al portapapeles',
      life: 3000
    });
  }

  // Public methods
  public formatSize(size: number): string {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / 1024 / 1024).toFixed(1)} MB`;
  }

}
