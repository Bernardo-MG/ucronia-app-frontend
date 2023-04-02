import { Component, Input } from '@angular/core';

@Component({
  selector: 'admin-member-tabs',
  templateUrl: './member-tabs.component.html',
  styleUrls: ['./member-tabs.component.sass']
})
export class MemberTabsComponent {

  @Input() public listActive: boolean = false;

  @Input() public statsActive: boolean = false;

  constructor() { }

}
