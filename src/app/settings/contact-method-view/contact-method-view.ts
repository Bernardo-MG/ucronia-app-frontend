import { Component } from '@angular/core';
import { ContactMethodListInnerView } from '../contact-method-list-inner-view/contact-method-list-inner-view';

@Component({
  selector: 'assoc-contact-method-view',
  imports: [ContactMethodListInnerView],
  templateUrl: './contact-method-view.html'
})
export class ContactMethodView {
}
