import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-google-maps',
  standalone: true,
  templateUrl: './google-maps.component.html'
})
export class GoogleMapsComponent implements OnChanges {

  @Input() public code: string | undefined;

  public url: SafeResourceUrl | undefined;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['code']) {
      if (this.code) {
        const rawUrl = `https://www.google.com/maps/embed?pb=${this.code}`;
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
      } else {
        this.url = undefined;
      }
    }
  }

}
