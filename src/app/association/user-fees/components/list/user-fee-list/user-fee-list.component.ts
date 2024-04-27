import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Fee } from '@app/association/fees/models/fee';

@Component({
  selector: 'assoc-user-fee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-fee-list.component.html'
})
export class UserFeeListComponent {

  @Input() public fees: Fee[] = [];

}
