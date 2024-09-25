import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PublicMember } from '@app/models/members/public-member';
import { SortProperty } from '@app/core/api/models/sort-field';
import { IconsModule } from '@app/shared/icons/icons.module';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';

@Component({
  selector: 'assoc-public-member-list',
  standalone: true,
  imports: [CommonModule, RouterModule, IconsModule, SortingButtonComponent],
  templateUrl: './public-member-list.component.html'
})
export class PublicMemberListComponent {

  @Input() public members: PublicMember[] = [];

  @Input() public routeLinkAdapter: (data: PublicMember) => string = (data) => '';

  @Output() public changeDirection = new EventEmitter<SortProperty>();

}
