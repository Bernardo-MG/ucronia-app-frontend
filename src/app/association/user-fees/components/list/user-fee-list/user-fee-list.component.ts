import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Fee } from '@app/association/fees/models/fee';
import { IconsModule } from '@app/shared/icons/icons.module';

@Component({
  selector: 'assoc-user-fee-list',
  standalone: true,
  imports: [CommonModule, IconsModule],
  templateUrl: './user-fee-list.component.html'
})
export class UserFeeListComponent {

  @Input() public fees: Fee[] = [];

}
