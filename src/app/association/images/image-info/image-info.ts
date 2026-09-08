import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Image } from '@ucronia/domain';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'assoc-image-info',
  imports: [DatePipe, SkeletonModule],
  templateUrl: './image-info.html'
})
export class ImageInfo {
  public readonly data = input(new Image());
  public readonly loading = input(false);
  public readonly source = input('');

  public formatSize(size: number): string {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / 1024 / 1024).toFixed(1)} MB`;
  }
}
