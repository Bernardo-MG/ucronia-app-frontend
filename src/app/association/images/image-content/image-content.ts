import { Directive, DestroyRef, HostBinding, inject, input, OnChanges, OnDestroy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';
import { ImageService } from '../image-service';

@Directive({ selector: 'img[assocImageContent]' })
export class ImageContent implements OnChanges, OnDestroy {

  private readonly destroyRef = inject(DestroyRef);
  private readonly service = inject(ImageService);

  public readonly assocImageContent = input.required<number>();

  @HostBinding('src') public source = '';

  private objectUrl?: string;
  private subscription?: Subscription;

  // Lifecycle hooks
  public ngOnChanges(): void {
    this.releaseContent();
    this.subscription = this.service.content(this.assocImageContent())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(content => {
        this.objectUrl = URL.createObjectURL(content);
        this.source = this.objectUrl;
      });
  }

  public ngOnDestroy(): void {
    this.releaseContent();
  }

  // Private methods
  private releaseContent(): void {
    this.subscription?.unsubscribe();
    this.subscription = undefined;
    if (this.objectUrl) URL.revokeObjectURL(this.objectUrl);
    this.objectUrl = undefined;
    this.source = '';
  }
}
