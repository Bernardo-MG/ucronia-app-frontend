import { Component, inject, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ui-google-maps',
  standalone: true,
  templateUrl: './google-maps.html'
})
export class GoogleMaps {

  private readonly sanitizer = inject(DomSanitizer);

  @Input() public set code(value: string | undefined) {
    if (value) {
      const rawUrl = `https://www.google.com/maps/embed?pb=${value}`;
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
    } else {
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl('');
    }
  }

  public url = this.sanitizer.bypassSecurityTrustResourceUrl('');

}
