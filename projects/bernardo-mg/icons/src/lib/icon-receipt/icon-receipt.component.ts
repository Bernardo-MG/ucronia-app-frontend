
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-receipt',
    imports: [FontAwesomeModule],
    templateUrl: './icon-receipt.component.html'
})
export class IconReceiptComponent {

  public icon = faReceipt;

}
