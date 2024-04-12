import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { WaitingWrapperComponent } from '@app/shared/layout/components/waiting-wrapper/waiting-wrapper.component';

@Component({
  selector: 'app-teamup-calendar',
  standalone: true,
  imports: [WaitingWrapperComponent],
  templateUrl: './teamup-calendar.component.html'
})
export class TeamupCalendarComponent implements OnChanges {

  @Input() public id = '';

  public url = '';

  public get sanitizedUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  public get waiting() {
    return this.url.length === 0;
  }

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id']) {
      this.url = `https://teamup.com/${this.id}?showLogo=0&showSearch=1&showProfileAndInfo=0&showSidepanel=1&disableSidepanel=0&showViewSelector=1&showMenu=1&showAgendaHeader=1&showAgendaDetails=0&showYearViewHeader=1`;
    }
  }

}
