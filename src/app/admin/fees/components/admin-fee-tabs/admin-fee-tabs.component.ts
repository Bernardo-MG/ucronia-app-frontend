import { Component, Input } from '@angular/core';

@Component({
  selector: 'admin-fee-tabs',
  templateUrl: './admin-fee-tabs.component.html',
  styleUrls: ['./admin-fee-tabs.component.sass']
})
export class AdminFeeTabsComponent {

  @Input() public yearActive: boolean = false;

  @Input() public listActive: boolean = false;

  constructor() { }

}
