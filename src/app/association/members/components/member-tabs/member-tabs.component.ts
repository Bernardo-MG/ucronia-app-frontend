import { Component, Input } from '@angular/core';

@Component({
  selector: 'admin-member-tabs',
  templateUrl: './member-tabs.component.html',
  styleUrls: ['./member-tabs.component.sass']
})
export class MemberTabsComponent {

  @Input() public listActive = false;

  @Input() public statsActive = false;

}
