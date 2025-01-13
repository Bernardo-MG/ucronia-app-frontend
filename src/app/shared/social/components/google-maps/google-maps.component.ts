import { Component, Input, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-google-maps',
  standalone: true,
  templateUrl: './google-maps.component.html'
})
export class GoogleMapsComponent {

  @Input() public code = '';
  
  public url = '';

  public width = 600;
  
  public height = 450;

  public get sanitizedUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['code']) {
      if(this.code) {
        this.url = `https://www.google.com/maps/embed?pb=${this.code}`;
      } else {
        this.url = '';
      }
    }
  }

}
