import { Component, Input } from '@angular/core';

@Component({
  selector: 'admin-fee-tabs',
  templateUrl: './fee-tabs.component.html',
  styleUrls: ['./fee-tabs.component.sass']
})
export class FeeTabsComponent {

  @Input() public calendarActive = false;

  @Input() public listActive = false;

}
