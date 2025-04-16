import { Component, inject, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-teamup-calendar',
  standalone: true,
  templateUrl: './teamup-calendar.component.html'
})
export class TeamupCalendarComponent {

  private readonly sanitizer = inject(DomSanitizer);

  @Input() public set code(value: string | undefined) {
    if (value) {
      const rawUrl = `https://teamup.com/${value}?showLogo=${this.parseBoolean(this.showLogo)}&showSearch=${this.parseBoolean(this.showSearch)}&showProfileAndInfo=${this.parseBoolean(this.showProfile)}&showSidepanel=${this.parseBoolean(this.showSidePanel)}&disableSidepanel=${this.parseBoolean(this.disableSidePanel)}&showViewSelector=${this.parseBoolean(this.showViewSelector)}&showMenu=${this.parseBoolean(this.showMenu)}&showAgendaHeader=${this.parseBoolean(this.showAgendaHeader)}&showAgendaDetails=${this.parseBoolean(this.showAgendaDetails)}&showYearViewHeader=${this.parseBoolean(this.showYearViewHeader)}&showTitle=0&view=m`;
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
    } else {
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl('');
    }
  }

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

  public url = this.sanitizer.bypassSecurityTrustResourceUrl('');

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
