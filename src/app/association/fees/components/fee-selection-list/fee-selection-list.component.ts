import { Component, Input } from '@angular/core';
import { Fee } from '@app/association/models/fee';

@Component({
  selector: 'assoc-fee-selection-list',
  templateUrl: './fee-selection-list.component.html'
})
export class FeeSelectionListComponent {

  @Input() public fees: Fee[] = [];

}
