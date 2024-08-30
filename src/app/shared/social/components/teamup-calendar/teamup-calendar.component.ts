import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BlockUiDirective } from '@app/shared/layout/directives/block-ui.directive';

@Component({
  selector: 'app-teamup-calendar',
  standalone: true,
  imports: [BlockUiDirective],
  templateUrl: './teamup-calendar.component.html'
})
export class TeamupCalendarComponent implements OnChanges {

  @Input() public code = '';

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

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['code']) {
      this.url = `https://teamup.com/${this.code}?showLogo=${this.convert(this.showLogo)}&showSearch=${this.convert(this.showSearch)}&showProfileAndInfo=${this.convert(this.showProfile)}&showSidepanel=${this.convert(this.showSidePanel)}&disableSidepanel=${this.convert(this.disableSidePanel)}&showViewSelector=${this.convert(this.showViewSelector)}&showMenu=${this.convert(this.showMenu)}&showAgendaHeader=${this.convert(this.showAgendaHeader)}&showAgendaDetails=${this.convert(this.showAgendaDetails)}&showYearViewHeader=${this.convert(this.showYearViewHeader)}&showTitle=0&view=m`;
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
