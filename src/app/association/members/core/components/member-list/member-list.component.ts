import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SortProperty } from '@app/core/api/models/sort-field';
import { IconsModule } from '@app/shared/icons/icons.module';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { Member } from '../../../models/member';

@Component({
  selector: 'assoc-member-list',
  standalone: true,
  imports: [CommonModule, RouterModule, IconsModule, SortingButtonComponent],
  templateUrl: './member-list.component.html'
})
export class MemberListComponent {

  @Input() public members: Member[] = [];

  @Input() public routeLinkAdapter: (data: Member) => string = (data) => '';

  @Output() public changeDirection = new EventEmitter<SortProperty>();

}
