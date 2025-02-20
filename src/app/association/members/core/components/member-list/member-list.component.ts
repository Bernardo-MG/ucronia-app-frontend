import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Member } from '@app/models/members/member';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { SortProperty } from '@bernardo-mg/request';

@Component({
    selector: 'assoc-member-list',
    imports: [CommonModule, RouterModule, SortingButtonComponent],
    templateUrl: './member-list.component.html'
})
export class MemberListComponent {

  @Input() public members: Member[] = [];

  @Input() public routeLinkAdapter: (data: Member) => string = (data) => '';

  @Output() public changeDirection = new EventEmitter<SortProperty>();

}
