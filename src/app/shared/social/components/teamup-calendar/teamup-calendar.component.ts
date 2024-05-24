import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';

@Component({
  selector: 'app-teamup-calendar',
  standalone: true,
  imports: [WaitingOverlayComponent],
  templateUrl: './teamup-calendar.component.html'
})
export class TeamupCalendarComponent implements OnChanges {

  @Input() public id = '';

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
      this.url = `https://teamup.com/${this.id}?showLogo=${this.convert(this.showLogo)}&showSearch=${this.convert(this.showSearch)}&showProfileAndInfo=${this.convert(this.showProfile)}&showSidepanel=${this.convert(this.showSidePanel)}&disableSidepanel=${this.convert(this.disableSidePanel)}&showViewSelector=${this.convert(this.showViewSelector)}&showMenu=${this.convert(this.showMenu)}&showAgendaHeader=${this.convert(this.showAgendaHeader)}&showAgendaDetails=${this.convert(this.showAgendaDetails)}&showYearViewHeader=${this.convert(this.showYearViewHeader)}&showTitle=0&view=m`;
    }
  }

  private convert(flag: boolean) {
    let value;

    if (flag) {
      value = '1';
    } else {
      value = '0';
    }

    return value;
  }

}
