
import { Component, EventEmitter, Output, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Member } from '@app/models/members/member';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { SortingProperty } from '@bernardo-mg/request';

@Component({
  selector: 'assoc-member-list',
  imports: [RouterModule, SortingButtonComponent],
  templateUrl: './member-list.component.html'
})
export class MemberListComponent {

  public readonly members = input<Member[]>([]);

  public readonly routeLinkAdapter = input<(data: Member) => string>((data) => '');

  @Output() public changeDirection = new EventEmitter<SortingProperty>();

}
