import { Component } from '@angular/core';
import { faCoins } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-coins',
    templateUrl: './icon-coins.component.html',
    standalone: false
})
export class IconCoinsComponent {

  public icon = faCoins;

}
