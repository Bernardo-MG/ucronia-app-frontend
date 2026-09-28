import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { StoredFile } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'assoc-file-info',
  imports: [ButtonModule, DatePipe, SkeletonModule],
  templateUrl: './file-info.html'
})
export class FileInfo {

  public readonly data = input(new StoredFile());
  public readonly loading = input(false);
  public readonly download = output<StoredFile>();

  public formatSize(size: number): string {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / 1024 / 1024).toFixed(1)} MB`;
  }
}
