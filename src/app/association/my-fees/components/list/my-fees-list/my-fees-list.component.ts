import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Fee } from '@app/association/fees/models/fee';

@Component({
  selector: 'assoc-my-fees-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-fees-list.component.html'
})
export class MyFeesListComponent {

  @Input() public fees: Fee[] = [];

}
