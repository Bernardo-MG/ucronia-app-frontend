import { Component } from '@angular/core';
import { KeyListInnerView } from '../key-list-inner-view/key-list-inner-view';

@Component({
  selector: 'assoc-key-view',
  imports: [KeyListInnerView],
  templateUrl: './key-view.html'
})
export class KeyView {
}
