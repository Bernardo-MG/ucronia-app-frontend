import { Component, Input } from '@angular/core';
import { Fee } from '@app/association/models/fee';

@Component({
  selector: 'assoc-fee-info',
  templateUrl: './fee-info.component.html',
  styleUrls: ['./fee-info.component.sass']
})
export class FeeInfoComponent {

  @Input() data = new Fee();

}
