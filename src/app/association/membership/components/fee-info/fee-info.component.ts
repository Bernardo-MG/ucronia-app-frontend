import { Component, Input } from '@angular/core';
import { Fee } from '../../models/fee';

@Component({
  selector: 'assoc-fee-info',
  templateUrl: './fee-info.component.html'
})
export class FeeInfoComponent {

  @Input() data = new Fee();

}
