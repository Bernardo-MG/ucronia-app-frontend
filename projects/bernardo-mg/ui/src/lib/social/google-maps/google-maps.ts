import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'ui-google-maps',
  standalone: true,
  templateUrl: './google-maps.html'
})
export class GoogleMaps {

  private readonly sanitizer = inject(DomSanitizer);

  public readonly code = input<string>();
  public readonly height = input('400px');

  protected readonly url = computed(() => {
    const code = this.code();
    const rawUrl = code ? `https://www.google.com/maps/embed?pb=${code}` : '';
    return this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
  });

}
