import { Component } from '@angular/core';
import { FeeTypeListInnerView } from '@app/association/directory/fee-type-list-inner-view/fee-type-list-inner-view';

@Component({
  selector: 'assoc-fee-type-view',
  imports: [FeeTypeListInnerView],
  templateUrl: './fee-type-view.html'
})
export class FeeTypeView {
}
