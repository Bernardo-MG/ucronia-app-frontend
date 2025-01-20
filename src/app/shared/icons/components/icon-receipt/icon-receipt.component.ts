import { Component } from '@angular/core';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-receipt',
    templateUrl: './icon-receipt.component.html',
    standalone: false
})
export class IconReceiptComponent {

  public icon = faReceipt;

}
