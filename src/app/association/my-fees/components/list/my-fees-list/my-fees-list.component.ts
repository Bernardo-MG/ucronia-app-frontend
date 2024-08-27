import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Fee } from '@app/association/fees/shared/models/fee';
import { IconsModule } from '@app/shared/icons/icons.module';

@Component({
  selector: 'assoc-my-fees-list',
  standalone: true,
  imports: [CommonModule, IconsModule],
  templateUrl: './my-fees-list.component.html'
})
export class MyFeesListComponent {

  @Input() public fees: Fee[] = [];

}
