import { Directive, HostBinding, inject, Input, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from '../image-service';

@Directive({ selector: 'img[assocImageContent]' })
export class ImageContent implements OnChanges, OnDestroy {

  private readonly service = inject(ImageService);
  private subscription?: Subscription;
  private objectUrl?: string;

  @Input({ required: true }) public assocImageContent = 0;
  @HostBinding('src') public source = '';

  public ngOnChanges(): void {
    this.releaseContent();
    this.subscription = this.service.content(this.assocImageContent)
      .subscribe(content => {
        this.objectUrl = URL.createObjectURL(content);
        this.source = this.objectUrl;
      });
  }

  public ngOnDestroy(): void {
    this.releaseContent();
  }

  private releaseContent(): void {
    this.subscription?.unsubscribe();
    this.subscription = undefined;
    if (this.objectUrl) URL.revokeObjectURL(this.objectUrl);
    this.objectUrl = undefined;
    this.source = '';
  }
}
