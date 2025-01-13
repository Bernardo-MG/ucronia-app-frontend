import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-teamup-calendar',
  standalone: true,
  templateUrl: './teamup-calendar.component.html'
})
export class TeamupCalendarComponent implements OnChanges {

  @Input() public code: string | undefined;

  @Input() public showLogo = false;

  @Input() public showSearch = false;

  @Input() public showProfile = false;

  @Input() public showSidePanel = false;

  @Input() public disableSidePanel = false;

  @Input() public showViewSelector = false;

  @Input() public showMenu = false;

  @Input() public showAgendaHeader = false;

  @Input() public showAgendaDetails = false;

  @Input() public showYearViewHeader = false;

  public url: SafeResourceUrl | undefined;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['code']) {
      if (this.code) {
        const rawUrl = `https://teamup.com/${this.code}?showLogo=${this.parseBoolean(this.showLogo)}&showSearch=${this.parseBoolean(this.showSearch)}&showProfileAndInfo=${this.parseBoolean(this.showProfile)}&showSidepanel=${this.parseBoolean(this.showSidePanel)}&disableSidepanel=${this.parseBoolean(this.disableSidePanel)}&showViewSelector=${this.parseBoolean(this.showViewSelector)}&showMenu=${this.parseBoolean(this.showMenu)}&showAgendaHeader=${this.parseBoolean(this.showAgendaHeader)}&showAgendaDetails=${this.parseBoolean(this.showAgendaDetails)}&showYearViewHeader=${this.parseBoolean(this.showYearViewHeader)}&showTitle=0&view=m`;
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
      } else {
        this.url = undefined;
      }
    }
  }

  private parseBoolean(flag: boolean): string {
    let value;

    if (flag) {
      value = '1';
    } else {
      value = '0';
    }

    return value;
  }

}
