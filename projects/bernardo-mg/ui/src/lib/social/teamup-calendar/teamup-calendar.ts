import { Component, inject, Input, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ui-teamup-calendar',
  standalone: true,
  templateUrl: './teamup-calendar.html'
})
export class TeamupCalendar {

  private readonly sanitizer = inject(DomSanitizer);

  @Input() public set code(value: string | undefined) {
    if (value) {
      const rawUrl = `https://teamup.com/${value}?showLogo=${this.parseBoolean(this.showLogo())}&showSearch=${this.parseBoolean(this.showSearch())}&showProfileAndInfo=${this.parseBoolean(this.showProfile())}&showSidepanel=${this.parseBoolean(this.showSidePanel())}&disableSidepanel=${this.parseBoolean(this.disableSidePanel())}&showViewSelector=${this.parseBoolean(this.showViewSelector())}&showMenu=${this.parseBoolean(this.showMenu())}&showAgendaHeader=${this.parseBoolean(this.showAgendaHeader())}&showAgendaDetails=${this.parseBoolean(this.showAgendaDetails())}&showYearViewHeader=${this.parseBoolean(this.showYearViewHeader())}&showTitle=0&view=m`;
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
    } else {
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl('');
    }
  }

  public readonly showLogo = input(false);

  public readonly showSearch = input(false);

  public readonly showProfile = input(false);

  public readonly showSidePanel = input(false);

  public readonly disableSidePanel = input(false);

  public readonly showViewSelector = input(false);

  public readonly showMenu = input(false);

  public readonly showAgendaHeader = input(false);

  public readonly showAgendaDetails = input(false);

  public readonly showYearViewHeader = input(false);

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
